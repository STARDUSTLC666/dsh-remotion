import { randomUUID } from 'node:crypto';
import { spawn, execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile, stat, symlink, copyFile, open, unlink, realpath } from 'node:fs/promises';
import { basename, dirname, join, delimiter, toNamespacedPath } from 'node:path';
import { createServer } from 'node:net';
import lockfile from 'proper-lockfile';
import { zipSync, strToU8 } from 'fflate';
import { MediaStore, mediaId, MediaConflict } from './media-store.js';
import { MEDIA_VERSIONS, MEDIA_TEMPLATES, projectSources } from './media-templates.js';
const mime = { png: 'image/png', jpg: 'image/jpeg', mp3: 'audio/mpeg', wav: 'audio/wav', mp4: 'video/mp4' };
const clean = (text) => text.replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '').replace(/(https?:\/\/)[^\s/@]+:[^\s/@]+@/gi, '$1[redacted]@').replace(/(token|password|authorization)(\s*[=:]\s*)[^\s,;]+/gi, '$1$2[redacted]').slice(0, 1600);
const errorMessage = (e) => clean(e instanceof Error ? e.message : String(e));
function installedChromePaths() {
    if (process.platform === 'darwin')
        return ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'];
    if (process.platform !== 'win32')
        return ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'];
    return [join(process.env.ProgramFiles || 'C:/Program Files', 'Google/Chrome/Application/chrome.exe'), join(process.env['ProgramFiles(x86)'] || 'C:/Program Files (x86)', 'Google/Chrome/Application/chrome.exe'), ...(process.env.LOCALAPPDATA ? [join(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe')] : [])];
}
function npmCli() {
    const paths = [join(dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js'), join(dirname(process.execPath), '../lib/node_modules/npm/bin/npm-cli.js')];
    for (const path of (process.env.PATH || '').split(delimiter))
        paths.push(join(path, 'node_modules/npm/bin/npm-cli.js'), join(path, '../node_modules/npm/bin/npm-cli.js'));
    if (process.env.APPDATA)
        paths.push(join(process.env.APPDATA, 'npm/node_modules/npm/bin/npm-cli.js'));
    const file = paths.find(existsSync);
    if (!file)
        throw new Error('没有找到 npm。请安装 Node.js 22.19+ 或 24+，重启 DSH 后再准备环境。');
    return file;
}
function childEnv(root) {
    const result = {};
    for (const [key, value] of Object.entries(process.env))
        if (/^(path|pathext|systemroot|windir|userprofile|home|appdata|localappdata|https?_proxy|all_proxy|no_proxy|comspec|programfiles|programfiles\(x86\))$/i.test(key))
            result[key] = value;
    return { ...result, ELECTRON_RUN_AS_NODE: '1', DSH_DESKTOP_NODE_EXECUTABLE: process.execPath, HOME: join(root, 'user-home'), USERPROFILE: join(root, 'user-home'), APPDATA: join(root, 'user-home', 'AppData/Roaming'), LOCALAPPDATA: join(root, 'user-home', 'AppData/Local'), CI: '1', NO_COLOR: '1', BROWSER: 'none', TEMP: join(root, 'tmp'), TMP: join(root, 'tmp'), TMPDIR: join(root, 'tmp'), npm_config_userconfig: join(root, 'local.npmrc'), npm_config_cache: join(root, 'npm-cache'), PUPPETEER_CACHE_DIR: join(root, 'browser'), HYPERFRAMES_NO_UPDATE_CHECK: '1', HYPERFRAMES_SKIP_SKILLS: '1', HYPERFRAMES_TELEMETRY_DISABLED: '1', DO_NOT_TRACK: '1', HYPERFRAMES_EXTRACT_CACHE_DIR: join(root, 'frames') };
}
async function freePort() {
    return new Promise((resolve, reject) => { const server = createServer(); server.once('error', reject); server.listen(0, '127.0.0.1', () => { const address = server.address(); const port = typeof address === 'object' && address ? address.port : 0; server.close(() => resolve(port)); }); });
}
/** Restrict all servers in our renderer child to loopback using Node's public API. */
const LOOPBACK = `const net=require('node:net');const listen=net.Server.prototype.listen;net.Server.prototype.listen=function(...args){if(args[0]&&typeof args[0]==='object'&&'port'in args[0])args[0]={...args[0],host:'127.0.0.1'};else if(typeof args[0]==='number'){if(typeof args[1]==='string')args[1]='127.0.0.1';else args.splice(1,0,'127.0.0.1')}return listen.apply(this,args)};\n`;
export class MediaWorkbench {
    engine;
    store;
    route;
    runtime;
    jobs = new Map();
    disposed = false;
    constructor(engine, root) {
        this.engine = engine;
        this.store = new MediaStore(engine, root);
        this.route = '/api/dsh-' + engine + '/workbench';
        this.runtime = join(this.store.root, 'runtime');
    }
    async browserFile(value) {
        if (typeof value !== 'string')
            throw new Error('请重新准备渲染环境，浏览器路径尚未验证。');
        const file = await realpath(value), normalize = (p) => process.platform === 'win32' ? p.toLowerCase() : p;
        const known = await Promise.all(installedChromePaths().map(p => realpath(p).catch(() => '')));
        if (!known.some(p => normalize(p) === normalize(file)))
            await this.store.checkPath(file);
        if (!(await stat(file)).isFile())
            throw new Error('浏览器文件不存在，请重新准备环境。');
        return file;
    }
    async environment() {
        const version = MEDIA_VERSIONS[this.engine];
        let ready = false;
        try {
            const pkg = JSON.parse(await readFile(join(this.runtime, 'node_modules', this.engine === 'hyperframes' ? 'hyperframes' : '@remotion/cli', 'package.json'), 'utf8'));
            const stamp = JSON.parse(await readFile(join(this.runtime, 'ready.json'), 'utf8'));
            const file = await this.browserFile(stamp.browserPath);
            ready = pkg.version === version && stamp.version === version && !(this.engine === 'hyperframes' && process.platform === 'win32' && !/^chrome-headless-shell\.exe$/i.test(basename(file)));
        }
        catch { }
        return { ready, version, node: process.version, hint: this.engine === 'hyperframes' ? '首次下载官方 CLI；Windows 使用官方专用渲染浏览器，其他系统优先复用 Chrome。还需 PATH 中的 FFmpeg。' : '首次下载官方 CLI。优先使用已安装的 Chrome，没有时下载浏览器。Remotion 使用官方许可证：https://www.remotion.dev/license' };
    }
    job(id) { const job = this.jobs.get(mediaId(id)); if (!job)
        throw new Error('任务不存在或 DSH 已重启。工程仍保留，请检查成品后重新操作。'); return structuredClone(job.view); }
    log(job, text) {
        const normalize = (line) => line.replace(/^[◓◑◒◐]\s*/, '').replace(/[. ]+$/, '');
        for (const line of text.split(/[\r\n]+/).filter(Boolean).map(clean)) {
            if (normalize(line) === normalize(job.view.lines.at(-1) || ''))
                continue;
            job.view.lines.push(line);
            if (job.view.lines.length > 40)
                job.view.lines.shift();
        }
    }
    stopChild(job) {
        const child = job.child;
        if (!child?.pid || child.exitCode !== null || child.signalCode !== null)
            return;
        if (process.platform === 'win32')
            execFile(join(process.env.SystemRoot || 'C:/Windows', 'System32/taskkill.exe'), ['/PID', String(child.pid), '/T', '/F'], { windowsHide: true }, () => { });
        else {
            try {
                process.kill(-child.pid, 'SIGKILL');
            }
            catch {
                child.kill('SIGKILL');
            }
        }
    }
    async run(job, file, args, cwd, environment = {}) {
        job.controller.signal.throwIfAborted();
        await mkdir(join(this.store.root, 'tmp'), { recursive: true });
        await mkdir(join(this.store.root, 'user-home/AppData/Roaming'), { recursive: true });
        await mkdir(join(this.store.root, 'user-home/AppData/Local'), { recursive: true });
        return new Promise((resolve, reject) => {
            const child = spawn(file, args, { cwd, env: { ...childEnv(this.store.root), ...environment }, windowsHide: true, shell: false, detached: process.platform !== 'win32', stdio: ['ignore', 'pipe', 'pipe'] });
            job.child = child;
            const abort = () => this.stopChild(job);
            job.controller.signal.addEventListener('abort', abort, { once: true });
            child.stdout?.on('data', data => this.log(job, data.toString()));
            child.stderr?.on('data', data => this.log(job, data.toString()));
            const finish = () => { job.controller.signal.removeEventListener('abort', abort); if (job.child === child)
                job.child = undefined; };
            child.once('error', e => { finish(); reject(e); });
            child.once('close', code => { finish(); if (job.controller.signal.aborted)
                reject(new Error('操作已取消。'));
            else if (code !== 0) {
                const useful = job.view.lines.filter(line => /^(?:\w*Error:|npm error)|\b(?:ENOENT|EACCES|ECONNRESET)\b|Unknown flag|Failed to |DevTools remote debugging/.test(line));
                reject(new Error(`官方 ${this.engine} 命令未完成（退出码 ${code}）。\n` + (useful.length ? useful.slice(0, 3) : job.view.lines.slice(-5)).join('\n')));
            }
            else
                resolve(); });
        });
    }
    cli() { return join(this.runtime, 'node_modules', this.engine === 'hyperframes' ? 'hyperframes/bin/hyperframes.mjs' : '@remotion/cli/remotion-cli.js'); }
    async start(kind, id, revision) {
        if (this.disposed)
            throw new Error('插件已卸载，请重新加载。');
        if ([...this.jobs.values()].some(j => j.view.state === 'running' && (j.view.kind === kind || j.view.kind === 'prepare' || kind === 'prepare')))
            throw new Error('已有同类任务运行，请等待完成或明确取消。');
        if (kind !== 'prepare' && !(await this.environment()).ready)
            throw new Error('请先点击“准备渲染环境”，完成首次下载。');
        const snapshot = kind === 'prepare' ? undefined : await this.store.snapshot(mediaId(id), revision);
        if (snapshot)
            projectSources(snapshot.project, this.engine);
        const job = { view: { id: randomUUID(), kind, projectId: snapshot?.project.id, revision: snapshot?.project.revision, state: 'running', stage: kind === 'prepare' ? '下载环境' : '准备修订快照', lines: [] }, controller: new AbortController() };
        if (this.jobs.size >= 30) {
            const old = [...this.jobs.values()].find(j => j.view.state !== 'running');
            if (old)
                this.jobs.delete(old.view.id);
            else
                throw new Error('运行任务过多。');
        }
        this.jobs.set(job.view.id, job);
        void this.execute(job, snapshot);
        return structuredClone(job.view);
    }
    async execute(job, snapshot) {
        let unlock;
        const timeout = setTimeout(() => job.controller.abort(), job.view.kind === 'preview' ? 30 * 60000 : 20 * 60000);
        timeout.unref();
        try {
            await this.store.init();
            await mkdir(this.runtime, { recursive: true });
            const slot = join(this.store.root, 'workbench-slot');
            await mkdir(slot, { recursive: true });
            unlock = await lockfile.lock(slot, { retries: 0, stale: 30000, update: 10000, onCompromised: () => job.controller.abort() });
            if (job.view.kind === 'prepare') {
                await unlink(join(this.runtime, 'ready.json')).catch(() => { });
                if (this.engine === 'hyperframes') {
                    job.view.stage = '检查 FFmpeg';
                    await this.run(job, 'ffmpeg', ['-version'], this.runtime);
                }
                const dependencies = this.engine === 'hyperframes' ? { hyperframes: MEDIA_VERSIONS.hyperframes, gsap: MEDIA_VERSIONS.gsap } : { '@remotion/cli': MEDIA_VERSIONS.remotion, remotion: MEDIA_VERSIONS.remotion, react: '18.3.1', 'react-dom': '18.3.1' };
                await writeFile(join(this.runtime, 'package.json'), JSON.stringify({ private: true, dependencies }));
                job.view.stage = '下载官方依赖';
                await this.run(job, process.execPath, [npmCli(), 'install', '--ignore-scripts', '--no-audit', '--no-fund', '--registry=https://registry.npmjs.org'], this.runtime);
                job.view.stage = '检查官方环境';
                await this.run(job, process.execPath, [this.cli(), ...(this.engine === 'hyperframes' ? ['--version'] : ['versions'])], this.runtime);
                job.view.stage = '检查或下载 Chrome';
                if (this.engine === 'hyperframes') {
                    if (process.platform === 'win32') {
                        job.view.stage = '下载专用渲染浏览器';
                        // ensure prefers the managed shell; path alone would fall back to desktop Chrome.
                        // Avoid --force: the pinned CLI leaves its first spinner running after a forced install.
                        await this.run(job, process.execPath, [this.cli(), 'browser', 'ensure'], this.runtime);
                    }
                    await this.run(job, process.execPath, [this.cli(), 'browser', 'path'], this.runtime);
                }
                else {
                    const installed = installedChromePaths().find(existsSync);
                    if (!installed)
                        await this.run(job, process.execPath, [this.cli(), 'browser', 'ensure'], this.runtime);
                    await this.run(job, process.execPath, ['-e', "require('@remotion/renderer').ensureBrowser({logLevel:'error',browserExecutable:process.argv[1]||null}).then(v=>console.log(require('node:fs').realpathSync(v.path))).catch(e=>{console.error(e.message);process.exitCode=1})", installed || ''], this.runtime);
                }
                const browserPath = await this.browserFile(job.view.lines.at(-1).trim());
                await writeFile(join(this.runtime, 'ready.json'), JSON.stringify({ version: MEDIA_VERSIONS[this.engine], browserPath }));
            }
            else if (snapshot) {
                const p = snapshot.project, dir = join(await this.store.path(p.id), 'runs', job.view.id);
                await mkdir(dirname(dir), { recursive: true });
                if (this.engine === 'hyperframes')
                    await this.run(job, process.execPath, [this.cli(), 'init', dir, '--example', 'blank', '--non-interactive', '--skip-transcribe'], dirname(dir));
                await mkdir(join(dir, 'public/assets'), { recursive: true });
                for (const [file, bytes] of snapshot.assets)
                    await writeFile(join(dir, 'public/assets', file), bytes, { flag: 'wx' });
                for (const [file, content] of Object.entries(projectSources(p, this.engine))) {
                    await mkdir(dirname(join(dir, file)), { recursive: true });
                    await writeFile(join(dir, file), content);
                }
                if (this.engine === 'hyperframes')
                    await writeFile(join(dir, 'meta.json'), JSON.stringify({ id: job.view.id, name: p.title, createdAt: p.updated }));
                await writeFile(join(dir, 'loopback.cjs'), LOOPBACK);
                await symlink(join(this.runtime, 'node_modules'), join(dir, 'node_modules'), process.platform === 'win32' ? 'junction' : 'dir');
                if (this.engine === 'hyperframes') {
                    await mkdir(join(dir, 'vendor'), { recursive: true });
                    await copyFile(join(this.runtime, 'node_modules/gsap/dist/gsap.min.js'), join(dir, 'vendor/gsap.min.js'));
                }
                if (job.view.kind === 'preview') {
                    const port = await freePort(), url = `http://127.0.0.1:${port}/`;
                    job.view.stage = '启动官方预览';
                    const args = this.engine === 'hyperframes' ? ['preview', '.', '--port', String(port), '--no-open', '--foreground'] : ['studio', 'src/index.jsx', '--port', String(port), '--no-open', '--ipv4', '--disable-ask-ai'];
                    let exited = false;
                    const running = this.run(job, process.execPath, ['--require', join(dir, 'loopback.cjs'), this.cli(), ...args], dir).finally(() => { exited = true; });
                    // Poll the actual server; a chosen port or spawned process is not readiness.
                    const poll = async () => {
                        for (let i = 0; i < 180; i++) {
                            job.controller.signal.throwIfAborted();
                            if (exited)
                                return;
                            try {
                                const response = await fetch(url, { signal: AbortSignal.timeout(1500) });
                                if (response.ok) {
                                    job.view.url = this.engine === 'hyperframes' ? url + '#project/' + job.view.id : url;
                                    job.view.stage = '官方预览已就绪';
                                    return;
                                }
                            }
                            catch { }
                            await new Promise(resolve => setTimeout(resolve, 500));
                        }
                        job.controller.abort();
                    };
                    await Promise.all([running, poll()]);
                }
                else {
                    if (this.engine === 'hyperframes') {
                        job.view.stage = '检查合成';
                        await this.run(job, process.execPath, [this.cli(), 'lint', '.', '--json'], dir);
                    }
                    job.view.stage = '渲染 MP4';
                    const output = join(dir, 'final.mp4');
                    const browserFile = await this.browserFile(JSON.parse(await readFile(join(this.runtime, 'ready.json'), 'utf8')).browserPath);
                    const browserPath = browserFile.length >= 240 ? toNamespacedPath(browserFile) : browserFile;
                    const chromeMode = /^chrome-headless-shell(?:\.exe)?$/i.test(basename(browserFile)) ? 'headless-shell' : 'chrome-for-testing';
                    const args = this.engine === 'hyperframes' ? ['render', '.', '--output', output, '--fps', '24', '--quality', 'draft', '--workers', '1', '--strict', '--no-best-effort', '--no-browser-gpu'] : ['render', 'src/index.jsx', 'ManagedVideo', output, '--codec', 'h264', '--concurrency', '1', '--browser-executable', browserPath, '--chrome-mode', chromeMode];
                    await this.run(job, process.execPath, ['--require', join(dir, 'loopback.cjs'), this.cli(), ...args], dir, this.engine === 'hyperframes' ? { HYPERFRAMES_BROWSER_PATH: browserPath } : {});
                    const bytes = (await stat(output)).size;
                    if (bytes < 100 || bytes > 200 * 1024 * 1024)
                        throw new Error('MP4 输出为空或超过 200 MB，请检查运行记录。原工程已保留。');
                    const handle = await open(output, 'r'), header = Buffer.alloc(12);
                    try {
                        await handle.read(header, 0, 12, 0);
                    }
                    finally {
                        await handle.close();
                    }
                    if (header.toString('ascii', 4, 8) !== 'ftyp')
                        throw new Error('渲染器输出不是 MP4 文件，原工程已保留。');
                    job.controller.signal.throwIfAborted();
                    await this.store.edit(p.id, undefined, current => { current.renders = [{ id: job.view.id, revision: p.revision, bytes, created: new Date().toISOString() }, ...current.renders].slice(0, 5); }, false);
                    job.view.output = job.view.id;
                }
            }
            job.view.state = job.controller.signal.aborted ? 'cancelled' : 'done';
            job.view.stage = job.view.state === 'done' ? '已完成' : '已取消';
        }
        catch (e) {
            const message = e?.code === 'ELOCKED' ? '另一个 DSH 实例正在运行本插件任务，请等待完成或在那个实例中停止任务。' : errorMessage(e);
            job.view.state = job.controller.signal.aborted ? 'cancelled' : 'failed';
            job.view.stage = job.view.state === 'cancelled' ? '已取消；工程已保留' : /^官方 .*命令未完成/.test(message) ? '官方任务未完成，请展开运行记录后重试。工程已保留。' : /spawn ffmpeg ENOENT/.test(message) ? '未找到 FFmpeg，请安装并加入 PATH，重启 DSH 后重试。工程已保留。' : message;
            this.log(job, message);
        }
        finally {
            clearTimeout(timeout);
            if (unlock)
                await unlock().catch(() => { });
            job.view.url = job.view.state === 'running' ? job.view.url : undefined;
        }
    }
    cancel(id) { const job = this.jobs.get(mediaId(id)); if (!job)
        throw new Error('任务不存在。'); if (job.view.state === 'running')
        job.controller.abort(); return structuredClone(job.view); }
    dispose() { this.disposed = true; for (const job of this.jobs.values())
        if (job.view.state === 'running')
            job.controller.abort(); }
    guard(request) {
        const url = new URL(request.url), origin = request.headers.get('origin'), site = request.headers.get('sec-fetch-site');
        // The official carrier keeps Host but rewrites Request.url to its internal URL.
        if (site && !['same-origin', 'none'].includes(site))
            throw new Error('请从 DSH 页面操作。');
        if (origin) {
            const source = new URL(origin);
            if (!['http:', 'https:'].includes(source.protocol) || source.host !== (request.headers.get('host') || url.host))
                throw new Error('请从 DSH 页面操作。');
        }
        if (request.method === 'POST' && request.headers.get('x-dsh-media') !== '1')
            throw new Error('操作来源无效。');
    }
    async fetch(request) {
        try {
            this.guard(request);
            const url = new URL(request.url);
            if (request.method === 'GET') {
                const id = mediaId(url.searchParams.get('id')), p = await this.store.get(id), kind = url.searchParams.get('kind');
                if (kind === 'source') {
                    const snapshot = await this.store.snapshot(id, p.revision), files = {};
                    for (const [file, content] of Object.entries(projectSources(p, this.engine)))
                        files[file] = strToU8(content);
                    for (const [file, bytes] of snapshot.assets)
                        files['public/assets/' + file] = bytes;
                    const bytes = zipSync(files, { level: 1 });
                    return new Response(bytes, { headers: { 'content-type': 'application/zip', 'content-disposition': `attachment; filename="${this.engine}-${id}.zip"`, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' } });
                }
                let file, type;
                if (kind === 'asset') {
                    const a = p.assets.find(a => a.id === mediaId(url.searchParams.get('asset')));
                    if (!a)
                        throw new Error('素材不存在。');
                    file = join(await this.store.path(id), 'assets', a.file);
                    type = mime[a.file.split('.').at(-1)];
                }
                else if (kind === 'mp4') {
                    const r = p.renders.find(r => r.id === mediaId(url.searchParams.get('render')));
                    if (!r)
                        throw new Error('成品不存在。');
                    file = join(await this.store.path(id), 'runs', r.id, 'final.mp4');
                    type = mime.mp4;
                }
                else
                    throw new Error('下载类型无效。');
                await this.store.checkPath(file);
                const size = (await stat(file)).size;
                if (size > 200 * 1024 * 1024)
                    throw new Error('成品过大，请从本地工程目录取回。');
                const bytes = await readFile(file), range = request.headers.get('range'), headers = { 'content-type': type, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', 'accept-ranges': 'bytes' };
                if (range) {
                    const match = /^bytes=(\d+)-(\d*)$/.exec(range);
                    if (!match)
                        return new Response(null, { status: 416, headers: { 'content-range': `bytes */${size}` } });
                    const start = Number(match[1]), end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
                    if (start > end || start >= size)
                        return new Response(null, { status: 416, headers: { 'content-range': `bytes */${size}` } });
                    return new Response(bytes.subarray(start, end + 1), { status: 206, headers: { ...headers, 'content-range': `bytes ${start}-${end}/${size}`, 'content-length': String(end - start + 1) } });
                }
                if (url.searchParams.get('download') === '1')
                    headers['content-disposition'] = `attachment; filename="${this.engine}-${id}.${kind === 'mp4' ? 'mp4' : file.split('.').at(-1)}"`;
                return new Response(bytes, { headers: { ...headers, 'content-length': String(size) } });
            }
            if (request.method !== 'POST')
                return new Response(null, { status: 405 });
            let value;
            if (url.pathname.endsWith('/upload')) {
                const reader = request.body?.getReader(), chunks = [];
                let size = 0;
                if (!reader)
                    throw new Error('请选择素材。');
                try {
                    while (true) {
                        const chunk = await reader.read();
                        if (chunk.done)
                            break;
                        size += chunk.value.length;
                        if (size > 20 * 1024 * 1024)
                            throw new Error('单个素材不能超过 20 MB。');
                        chunks.push(chunk.value);
                    }
                }
                finally {
                    await reader.cancel().catch(() => { });
                }
                value = await this.store.upload(mediaId(request.headers.get('x-project-id')), Number(request.headers.get('x-project-revision')), decodeURIComponent(request.headers.get('x-file-name') || ''), Buffer.concat(chunks));
            }
            else {
                if (!request.headers.get('content-type')?.startsWith('application/json'))
                    throw new Error('请求格式无效。');
                const text = await request.text();
                if (Buffer.byteLength(text) > 16384)
                    throw new Error('请求过大。');
                const v = JSON.parse(text);
                switch (v.action) {
                    case 'list':
                        value = { projects: await this.store.list(), templates: MEDIA_TEMPLATES, environment: await this.environment(), jobs: [...this.jobs.values()].map(j => structuredClone(j.view)) };
                        break;
                    case 'create':
                        value = await this.store.create(v.fields);
                        break;
                    case 'get':
                        value = await this.store.get(mediaId(v.id));
                        break;
                    case 'update':
                        value = await this.store.update(mediaId(v.id), v.revision, v.fields);
                        break;
                    case 'removeAsset':
                        value = await this.store.removeAsset(mediaId(v.id), v.revision, mediaId(v.asset));
                        break;
                    case 'prepare':
                        value = await this.start('prepare');
                        break;
                    case 'preview':
                    case 'render':
                        value = await this.start(v.action, mediaId(v.id), v.revision);
                        break;
                    case 'job':
                        value = this.job(mediaId(v.job));
                        break;
                    case 'cancel':
                        value = this.cancel(mediaId(v.job));
                        break;
                    default: throw new Error('操作无效。');
                }
            }
            return Response.json({ ok: true, value }, { headers: { 'cache-control': 'no-store' } });
        }
        catch (e) {
            return Response.json({ ok: false, message: errorMessage(e) }, { status: e instanceof MediaConflict ? 409 : 400, headers: { 'cache-control': 'no-store' } });
        }
    }
}
export function installMediaWorkbench(ctx, engine) {
    const workbench = new MediaWorkbench(engine);
    ctx.inject?.(['connection'], (host) => {
        host.connection?.fetch?.register({ path: workbench.route, methods: ['GET', 'POST'], requestBody: 'buffered', fetch: (request) => workbench.fetch(request) });
        host.connection?.fetch?.register({ path: workbench.route + '/upload', methods: ['POST'], requestBody: 'streaming', fetch: (request) => workbench.fetch(request) });
    });
    ctx.on?.('dispose', () => workbench.dispose());
    for (const action of ['project', 'render']) {
        const dispose = ctx.tools?.register({
            name: engine + '_' + action,
            description: action === 'project' ? '创建或读取本插件受管理视频工程，列出模板与环境。不会自动安装依赖或渲染。' : '准备官方渲染环境、启动预览/MP4任务、查询进度或取消。工程保存在 DSH 本地数据目录；首次准备环境会下载依赖。',
            parameters: { type: 'object', properties: { action: { type: 'string', enum: action === 'project' ? ['list', 'create', 'get', 'update'] : ['prepare', 'preview', 'render', 'job', 'cancel'] }, id: { type: 'string' }, revision: { type: 'number' }, job: { type: 'string' }, fields: { type: 'object', properties: { template: { type: 'string', enum: ['title', 'product', 'slideshow'] }, title: { type: 'string' }, body: { type: 'string' }, format: { type: 'string', enum: ['landscape', 'portrait', 'square'] }, duration: { type: 'number' } }, required: ['template', 'title', 'body', 'format', 'duration'] } }, required: ['action'] },
            output: {
                schema: { type: 'object', additionalProperties: true },
                render(_args, value) {
                    const lines = [engine === 'hyperframes' ? 'HyperFrames 视频工作台' : 'Remotion 视频工作台'];
                    if (Array.isArray(value.projects)) {
                        lines.push('已保存工程：' + value.projects.length);
                        for (const project of value.projects)
                            lines.push('- ' + project.title + '（版本 ' + project.revision + '）');
                        lines.push(value.environment?.ready ? '渲染环境已就绪。' : '首次预览或导出前，请显式准备渲染环境。');
                    }
                    else if (value.title)
                        lines.push('工程：' + value.title + '（版本 ' + value.revision + '）');
                    else if (value.state) {
                        lines.push('任务状态：' + value.state, value.stage || '');
                        if (value.url)
                            lines.push('预览：' + value.url);
                        if (value.message)
                            lines.push(value.message);
                    }
                    return [{ type: 'text', text: lines.filter(Boolean).join('\n') }];
                },
            },
            async execute(args) {
                const allowed = action === 'project' ? ['list', 'create', 'get', 'update'] : ['prepare', 'preview', 'render', 'job', 'cancel'];
                if (!allowed.includes(args.action))
                    throw new Error('操作无效。');
                const response = await workbench.fetch(new Request('http://dsh.internal' + workbench.route, { method: 'POST', headers: { 'content-type': 'application/json', 'x-dsh-media': '1' }, body: JSON.stringify(args) }));
                const result = await response.json();
                if (!result.ok)
                    throw new Error(result.message);
                return result.value;
            },
        });
        if (typeof dispose === 'function')
            ctx.on?.('dispose', dispose);
    }
    return workbench;
}
