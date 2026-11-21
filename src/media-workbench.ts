import { randomUUID } from 'node:crypto'
import { spawn, execFile, type ChildProcess } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile, stat, lstat, symlink, copyFile, open, unlink, realpath, rm } from 'node:fs/promises'
import { cpus } from 'node:os'
import { basename, dirname, join, toNamespacedPath } from 'node:path'
import { createServer } from 'node:net'
import { Readable } from 'node:stream'
import { StringDecoder } from 'node:string_decoder'
import lockfile from 'proper-lockfile'
import { zip, strToU8, type AsyncZippable } from 'fflate'
import { MediaStore, mediaId, MediaConflict } from './media-store.js'
import { MediaError, MEDIA_VERSIONS, MEDIA_TEMPLATES, projectSources, type MediaEngine, type MediaProject } from './media-templates.js'
import { resolveNpmCli } from './npm-cli.js'

type AbortReason = 'user' | 'timeout' | 'startup-timeout' | 'lock-lost' | 'dispose'
interface MediaJob {
  id: string
  kind: 'prepare' | 'preview' | 'render'
  projectId?: string
  revision?: number
  state: 'running' | 'done' | 'failed' | 'cancelled'
  stage: string
  stageCode?: string
  lines: string[]
  url?: string
  output?: string
}
interface RunningJob { view: MediaJob; controller: AbortController; child?: ChildProcess; abortReason?: AbortReason }
const mime: Record<string, string> = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp', mp3: 'audio/mpeg', wav: 'audio/wav', m4a: 'audio/mp4', mp4: 'video/mp4' }
const PRECOMPRESSED_ASSET_RE = /\.(?:png|jpg|webp|mp3|m4a|mp4)$/i
const RUN_INTERMEDIATES = ['public', 'src', 'compositions', 'vendor', 'node_modules', 'loopback.cjs', 'index.html', 'package.json', 'data.json', 'project.json', 'meta.json', 'hyperframes.json', 'DESIGN.md', 'README.md', 'setup.mjs']
const BROWSER_PATH_MARKER = '__DSH_BROWSER_PATH__='
const clean = (text: string) => text.replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '').replace(/(https?:\/\/)[^\s/@]+:[^\s/@]+@/gi, '$1[redacted]@').replace(/(token|password|authorization)(\s*[=:]\s*)[^\s,;]+/gi, '$1$2[redacted]').slice(0, 1600)
const errorMessage = (e: unknown) => clean(e instanceof Error ? e.message : String(e))
function installedChromePaths(): string[] {
  if (process.platform === 'darwin') return ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
  if (process.platform !== 'win32') return ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser']
  return [join(process.env.ProgramFiles || 'C:/Program Files', 'Google/Chrome/Application/chrome.exe'), join(process.env['ProgramFiles(x86)'] || 'C:/Program Files (x86)', 'Google/Chrome/Application/chrome.exe'), ...(process.env.LOCALAPPDATA ? [join(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe')] : [])]
}
function remotionConcurrency(): number {
  const configured = Number(process.env.DSH_REMOTION_CONCURRENCY)
  if (Number.isInteger(configured) && configured >= 1 && configured <= 16) return configured
  return Math.min(4, Math.max(1, Math.floor(cpus().length / 2)))
}
function zipAsync(files: AsyncZippable): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    zip(files, (error, data) => { if (error) reject(error); else resolve(data) })
  })
}
function childEnv(root: string): NodeJS.ProcessEnv {
  const result: NodeJS.ProcessEnv = {}
  for (const [key, value] of Object.entries(process.env)) if (/^(path|pathext|systemroot|windir|userprofile|home|appdata|localappdata|https?_proxy|all_proxy|no_proxy|comspec|programfiles|programfiles\(x86\)|hyperframes_browser_path|remotion_browser_executable|puppeteer_download_base_url)$/i.test(key)) result[key] = value
  return { ...result, ELECTRON_RUN_AS_NODE: '1', DSH_DESKTOP_NODE_EXECUTABLE: process.execPath, HOME: join(root, 'user-home'), USERPROFILE: join(root, 'user-home'), APPDATA: join(root, 'user-home', 'AppData/Roaming'), LOCALAPPDATA: join(root, 'user-home', 'AppData/Local'), CI: '1', NO_COLOR: '1', BROWSER: 'none', TEMP: join(root, 'tmp'), TMP: join(root, 'tmp'), TMPDIR: join(root, 'tmp'), npm_config_userconfig: join(root, 'local.npmrc'), npm_config_cache: join(root, 'npm-cache'), PUPPETEER_CACHE_DIR: join(root, 'browser'), HYPERFRAMES_NO_UPDATE_CHECK: '1', HYPERFRAMES_SKIP_SKILLS: '1', HYPERFRAMES_TELEMETRY_DISABLED: '1', DO_NOT_TRACK: '1', HYPERFRAMES_EXTRACT_CACHE_DIR: join(root, 'frames') }
}
async function freePort(): Promise<number> {
  return new Promise((resolve, reject) => { const server = createServer(); server.once('error', reject); server.listen(0, '127.0.0.1', () => { const address = server.address(); const port = typeof address === 'object' && address ? address.port : 0; server.close(() => resolve(port)) }) })
}
/** Restrict all servers in our renderer child to loopback using Node's public API. */
const LOOPBACK = `const net=require('node:net');const listen=net.Server.prototype.listen;net.Server.prototype.listen=function(...args){if(args[0]&&typeof args[0]==='object'&&'port'in args[0])args[0]={...args[0],host:'127.0.0.1'};else if(typeof args[0]==='number'){if(typeof args[1]==='string')args[1]='127.0.0.1';else args.splice(1,0,'127.0.0.1')}return listen.apply(this,args)};\n`

export class MediaWorkbench {
  readonly store: MediaStore
  readonly route: string
  readonly runtime: string
  private jobs = new Map<string, RunningJob>()
  private starting = new Set<MediaJob['kind']>()
  private disposed = false
  constructor(readonly engine: MediaEngine, root?: string) { this.store = new MediaStore(engine, root); this.route = '/api/dsh-' + engine + '/workbench'; this.runtime = join(this.store.root, 'runtime') }
  private explicitBrowserEnv(): string {
    return (this.engine === 'hyperframes' ? process.env.HYPERFRAMES_BROWSER_PATH : process.env.REMOTION_BROWSER_EXECUTABLE)?.trim() || ''
  }
  private setStage(job: RunningJob, stageCode: string, stage: string): void {
    job.view.stageCode = stageCode
    job.view.stage = stage
  }
  private async safeRemoveRunDir(projectDir: string, runId: string): Promise<void> {
    try {
      const target = join(projectDir, 'runs', mediaId(runId))
      const info = await lstat(target).catch(() => null)
      if (!info || info.isSymbolicLink()) return
      await this.store.checkPath(target)
      await rm(target, { recursive: true, force: true, maxRetries: 4, retryDelay: 50 })
    } catch { /* best-effort cleanup of owned run directories */ }
  }
  private async pruneRunWorkdir(runDir: string): Promise<void> {
    await Promise.all(RUN_INTERMEDIATES.map(name => rm(join(runDir, name), { recursive: true, force: true, maxRetries: 3, retryDelay: 40 }).catch(() => {})))
  }
  private async browserFile(value: unknown): Promise<string> {
    if (typeof value !== 'string' || !value.trim()) throw new MediaError('请重新准备渲染环境，浏览器路径尚未验证。', 'BROWSER_UNVERIFIED')
    const file = await realpath(value.trim()), normalize = (p: string) => process.platform === 'win32' ? p.toLowerCase() : p
    const known = await Promise.all(installedChromePaths().map(p => realpath(p).catch(() => '')))
    const configured = this.explicitBrowserEnv()
    const explicit = configured ? await realpath(configured).catch(() => '') : ''
    if (!known.some(p => normalize(p) === normalize(file)) && (!explicit || normalize(explicit) !== normalize(file))) await this.store.checkPath(file)
    if (!(await stat(file)).isFile()) throw new MediaError('浏览器文件不存在，请重新准备环境。', 'BROWSER_MISSING')
    return file
  }
  async environment(): Promise<{ ready: boolean; version: string; node: string; hint: string }> {
    const version = MEDIA_VERSIONS[this.engine]
    let ready = false
    try {
      const pkg = JSON.parse(await readFile(join(this.runtime, 'node_modules', this.engine === 'hyperframes' ? 'hyperframes' : '@remotion/cli', 'package.json'), 'utf8'))
      const stamp = JSON.parse(await readFile(join(this.runtime, 'ready.json'), 'utf8'))
      const file = await this.browserFile(stamp.browserPath)
      const explicit = this.explicitBrowserEnv()
      const configured = explicit ? await realpath(explicit).catch(() => '') : ''
      ready = pkg.version === version && stamp.version === version && (this.engine !== 'hyperframes' || (stamp.prerequisites === 2 && (process.platform !== 'win32' || /^chrome-headless-shell\.exe$/i.test(basename(file)) || configured === file)))
    } catch {}
    return { ready, version, node: process.version, hint: this.engine === 'hyperframes' ? '首次下载官方 CLI；Windows 使用官方专用渲染浏览器，其他系统优先复用 Chrome。还需 PATH 中的 FFmpeg 和 FFprobe。可用 HYPERFRAMES_BROWSER_PATH 指定已有浏览器；下载代理沿用系统设置；浏览器下载受限时可先手动安装。' : '首次下载官方 CLI 与官方专用渲染浏览器（chrome-headless-shell）。可用 REMOTION_BROWSER_EXECUTABLE 指定本机浏览器。Remotion 使用官方许可证：https://www.remotion.dev/license' }
  }
  job(id: string): MediaJob { const job = this.jobs.get(mediaId(id)); if (!job) throw new MediaError('任务不存在或 DSH 已重启。工程仍保留，请检查成品后重新操作。', 'JOB_NOT_FOUND'); return structuredClone(job.view) }
  private logLine(job: RunningJob, rawLine: string): void {
    const line = clean(rawLine)
    if (!line) return
    const normalize = (value: string) => value.replace(/^[◓◑◒◐]\s*/, '').replace(/[. ]+$/, '')
    if (normalize(line) === normalize(job.view.lines.at(-1) || '')) return
    job.view.lines.push(line)
    if (job.view.lines.length > 40) job.view.lines.shift()
  }
  private log(job: RunningJob, text: string): void {
    for (const line of text.split(/[\r\n]+/).filter(Boolean)) this.logLine(job, line)
  }
  private stopChild(job: RunningJob): void {
    const child = job.child; if (!child?.pid || child.exitCode !== null || child.signalCode !== null) return
    if (process.platform === 'win32') execFile(join(process.env.SystemRoot || 'C:/Windows', 'System32/taskkill.exe'), ['/PID', String(child.pid), '/T', '/F'], { windowsHide: true }, () => {})
    else { try { process.kill(-child.pid, 'SIGKILL') } catch { child.kill('SIGKILL') } }
  }
  private async run(job: RunningJob, file: string, args: string[], cwd: string, environment: NodeJS.ProcessEnv = {}, options: { captureStdout?: boolean } = {}): Promise<string> {
    job.controller.signal.throwIfAborted()
    await mkdir(join(this.store.root, 'tmp'), { recursive: true })
    await mkdir(join(this.store.root, 'user-home/AppData/Roaming'), { recursive: true })
    await mkdir(join(this.store.root, 'user-home/AppData/Local'), { recursive: true })
    job.controller.signal.throwIfAborted()
    return new Promise((resolve, reject) => {
      const child = spawn(file, args, { cwd, env: { ...childEnv(this.store.root), ...environment }, windowsHide: true, shell: false, detached: process.platform !== 'win32', stdio: ['ignore', 'pipe', 'pipe'] }); job.child = child
      const abort = () => this.stopChild(job); job.controller.signal.addEventListener('abort', abort, { once: true })
      const capturedStdout: string[] = []
      const attachStream = (stream: NodeJS.ReadableStream | null, isStdout: boolean) => {
        if (!stream) return () => {}
        const decoder = new StringDecoder('utf8')
        let pending = ''
        const emit = (rawLine: string) => {
          if (isStdout && options.captureStdout) capturedStdout.push(rawLine)
          if (!rawLine.startsWith(BROWSER_PATH_MARKER)) this.logLine(job, rawLine)
        }
        stream.on('data', (chunk: Buffer | string) => {
          pending += typeof chunk === 'string' ? chunk : decoder.write(chunk)
          const parts = pending.split(/\r\n|\n|\r/)
          pending = parts.pop() ?? ''
          for (const part of parts) emit(part)
        })
        return () => {
          pending += decoder.end()
          if (pending) { emit(pending); pending = '' }
        }
      }
      const flushStdout = attachStream(child.stdout, true)
      const flushStderr = attachStream(child.stderr, false)
      const finish = () => {
        flushStdout(); flushStderr()
        job.controller.signal.removeEventListener('abort', abort)
        if (job.child === child) job.child = undefined
      }
      child.once('error', e => { finish(); reject(e) })
      child.once('close', code => {
        finish()
        if (job.controller.signal.aborted) {
          const reason = job.abortReason
          if (reason === 'timeout') reject(new MediaError('任务执行超时，已自动停止；工程已保留。', 'JOB_TIMEOUT'))
          else if (reason === 'startup-timeout') reject(new MediaError('官方预览启动超时（90 秒），请查看运行记录后重试。', 'PREVIEW_TIMEOUT'))
          else if (reason === 'lock-lost') reject(new MediaError('运行锁失效，任务已安全停止；工程已保留。', 'LOCK_LOST'))
          else reject(new MediaError('操作已取消。', 'JOB_CANCELLED'))
        } else if (code !== 0) {
          const useful = job.view.lines.filter(line => /^(?:\w*Error:|npm error)|\b(?:ENOENT|EACCES|ECONNRESET)\b|Unknown flag|Failed to |DevTools remote debugging/.test(line))
          reject(new MediaError(`官方 ${this.engine} 命令未完成（退出码 ${code}）。\n` + (useful.length ? useful.slice(0, 3) : job.view.lines.slice(-5)).join('\n'), 'CLI_FAILED'))
        } else resolve(capturedStdout.join('\n'))
      })
    })
  }
  private cli(): string { return join(this.runtime, 'node_modules', this.engine === 'hyperframes' ? 'hyperframes/bin/hyperframes.mjs' : '@remotion/cli/remotion-cli.js') }
  async start(kind: MediaJob['kind'], id?: string, revision?: unknown): Promise<MediaJob> {
    if (this.disposed) throw new MediaError('插件已卸载，请重新加载。', 'PLUGIN_DISPOSED')
    const conflicts = (other: MediaJob['kind']) => other === kind || other === 'prepare' || kind === 'prepare'
    if ([...this.starting].some(conflicts) || [...this.jobs.values()].some(j => j.view.state === 'running' && conflicts(j.view.kind))) throw new MediaError('已有同类任务运行，请等待完成或明确取消。', 'JOB_CONFLICT', 409)
    // Reserve before asynchronous checks so competing requests cannot both start.
    this.starting.add(kind)
    try {
      if (kind !== 'prepare' && !(await this.environment()).ready) throw new MediaError('请先点击“准备渲染环境”，完成首次下载。', 'ENV_NOT_READY')
      const snapshot = kind === 'prepare' ? undefined : await this.store.snapshot(mediaId(id), revision)
      if (snapshot) projectSources(snapshot.project, this.engine)
      if (this.disposed) throw new MediaError('插件已卸载，请重新加载。', 'PLUGIN_DISPOSED')
      const job: RunningJob = {
        view: {
          id: randomUUID(),
          kind,
          projectId: snapshot?.project.id,
          revision: snapshot?.project.revision,
          state: 'running',
          stage: kind === 'prepare' ? '下载环境' : '准备修订快照',
          stageCode: kind === 'prepare' ? 'init' : 'snapshot',
          lines: [],
        },
        controller: new AbortController(),
      }
      if (this.jobs.size >= 30) { const old = [...this.jobs.values()].find(j => j.view.state !== 'running'); if (old) this.jobs.delete(old.view.id); else throw new MediaError('运行任务过多。', 'JOB_LIMIT') }
      this.jobs.set(job.view.id, job)
      void this.execute(job, snapshot)
      return structuredClone(job.view)
    } finally { this.starting.delete(kind) }
  }
  private async execute(job: RunningJob, snapshot?: { project: MediaProject; assets: Map<string, Buffer> }): Promise<void> {
    let unlock: (() => Promise<void>) | undefined
    let projectDir: string | undefined
    let runDir: string | undefined
    let finalState: MediaJob['state'] = 'failed'
    let finalStageCode = 'failed'
    let finalStage = '任务未完成'
    const timeout = setTimeout(() => { job.abortReason ??= 'timeout'; job.controller.abort() }, job.view.kind === 'preview' ? 30 * 60000 : 20 * 60000); timeout.unref()
    try {
      await this.store.init(); await mkdir(this.runtime, { recursive: true })
      const slot = join(this.store.root, 'workbench-slot'); await mkdir(slot, { recursive: true })
      unlock = await lockfile.lock(slot, { retries: 0, stale: 30000, update: 10000, onCompromised: () => { job.abortReason ??= 'lock-lost'; job.controller.abort() } })
      if (job.view.kind === 'prepare') {
        await unlink(join(this.runtime, 'ready.json')).catch(() => {})
        if (this.engine === 'hyperframes') {
          this.setStage(job, 'ffmpeg', '检查 FFmpeg'); await this.run(job, 'ffmpeg', ['-version'], this.runtime)
          this.setStage(job, 'ffprobe', '检查 FFprobe'); await this.run(job, 'ffprobe', ['-version'], this.runtime)
        }
        const dependencies = this.engine === 'hyperframes' ? { hyperframes: MEDIA_VERSIONS.hyperframes, gsap: MEDIA_VERSIONS.gsap } : { '@remotion/cli': MEDIA_VERSIONS.remotion, remotion: MEDIA_VERSIONS.remotion, react: '18.3.1', 'react-dom': '18.3.1' }
        await writeFile(join(this.runtime, 'package.json'), JSON.stringify({ private: true, dependencies }))
        this.setStage(job, 'install', '下载官方依赖')
        await this.run(job, process.execPath, [resolveNpmCli(), 'install', '--ignore-scripts', '--no-audit', '--no-fund', '--registry=https://registry.npmjs.org'], this.runtime)
        this.setStage(job, 'verify-cli', '检查官方环境')
        await this.run(job, process.execPath, [this.cli(), ...(this.engine === 'hyperframes' ? ['--version'] : ['versions'])], this.runtime)
        this.setStage(job, 'browser', '检查或下载 Chrome')
        let resolvedBrowser = ''
        if (this.engine === 'hyperframes') {
          const configured = this.explicitBrowserEnv()
          if (configured) {
            // An explicit operator path is validated before use, never downloaded over.
            resolvedBrowser = await this.browserFile(configured)
            job.view.lines.push(resolvedBrowser)
          } else {
            let available = ''
            try {
              const out = (await this.run(job, process.execPath, [this.cli(), 'browser', 'path'], this.runtime, {}, { captureStdout: true })) ?? ''
              const candidate = out.split(/\r?\n/).map(s => s.trim()).filter(Boolean).at(-1) || job.view.lines.at(-1)?.trim() || ''
              available = await this.browserFile(candidate)
            } catch { job.controller.signal.throwIfAborted() }
            if (!available || (process.platform === 'win32' && !/^chrome-headless-shell\.exe$/i.test(basename(available)))) {
              this.setStage(job, 'browser-download', '下载专用渲染浏览器；可取消后设置 HYPERFRAMES_BROWSER_PATH 使用本机浏览器')
              await this.run(job, process.execPath, [this.cli(), 'browser', 'ensure'], this.runtime)
              const out = (await this.run(job, process.execPath, [this.cli(), 'browser', 'path'], this.runtime, {}, { captureStdout: true })) ?? ''
              resolvedBrowser = out.split(/\r?\n/).map(s => s.trim()).filter(Boolean).at(-1) || job.view.lines.at(-1)?.trim() || ''
            } else resolvedBrowser = available
          }
        } else {
          const configured = this.explicitBrowserEnv()
          if (configured) {
            resolvedBrowser = await this.browserFile(configured)
            job.view.lines.push(resolvedBrowser)
          } else {
            const out = (await this.run(job, process.execPath, ['-e', "require('@remotion/renderer').ensureBrowser({logLevel:'error',browserExecutable:null}).then(v=>console.log('" + BROWSER_PATH_MARKER + "'+require('node:fs').realpathSync(v.path))).catch(e=>{console.error(e.message);process.exitCode=1})"], this.runtime, {}, { captureStdout: true })) ?? ''
            const markerLine = out.split(/\r?\n/).find(line => line.startsWith(BROWSER_PATH_MARKER))
            resolvedBrowser = markerLine ? markerLine.slice(BROWSER_PATH_MARKER.length).trim() : (job.view.lines.at(-1)?.trim() || '')
          }
        }
        const browserPath = await this.browserFile(resolvedBrowser)
        await writeFile(join(this.runtime, 'ready.json'), JSON.stringify({ version: MEDIA_VERSIONS[this.engine], browserPath, ...(this.engine === 'hyperframes' ? { prerequisites: 2 } : {}) }))
      } else if (snapshot) {
        const p = snapshot.project
        projectDir = await this.store.path(p.id)
        const dir = join(projectDir, 'runs', job.view.id)
        runDir = dir
        await mkdir(dirname(dir), { recursive: true })
        if (this.engine === 'hyperframes') await this.run(job, process.execPath, [this.cli(), 'init', dir, '--example', 'blank', '--non-interactive', '--skip-transcribe'], dirname(dir))
        await mkdir(join(dir, 'public/assets'), { recursive: true })
        for (const [file, bytes] of snapshot.assets) await writeFile(join(dir, 'public/assets', file), bytes, { flag: 'wx' })
        for (const [file, content] of Object.entries(projectSources(p, this.engine))) { await mkdir(dirname(join(dir, file)), { recursive: true }); await writeFile(join(dir, file), content) }
        if (this.engine === 'hyperframes') await writeFile(join(dir, 'meta.json'), JSON.stringify({ id: job.view.id, name: p.title, createdAt: p.updated }))
        await writeFile(join(dir, 'loopback.cjs'), LOOPBACK)
        await symlink(join(this.runtime, 'node_modules'), join(dir, 'node_modules'), process.platform === 'win32' ? 'junction' : 'dir')
        if (this.engine === 'hyperframes') { await mkdir(join(dir, 'vendor'), { recursive: true }); await copyFile(join(this.runtime, 'node_modules/gsap/dist/gsap.min.js'), join(dir, 'vendor/gsap.min.js')) }
        if (job.view.kind === 'preview') {
          const port = await freePort(), url = `http://127.0.0.1:${port}/`
          this.setStage(job, 'preview-start', '启动官方预览')
          const args = this.engine === 'hyperframes' ? ['preview', '.', '--port', String(port), '--no-open', '--foreground'] : ['studio', 'src/index.jsx', '--port', String(port), '--no-open', '--ipv4', '--disable-ask-ai']
          let exited = false
          const running = this.run(job, process.execPath, ['--require', join(dir, 'loopback.cjs'), this.cli(), ...args], dir).finally(() => { exited = true })
          // Poll the actual server; a chosen port or spawned process is not readiness.
          const poll = async () => {
            for (let i = 0; i < 180; i++) {
              job.controller.signal.throwIfAborted(); if (exited) return
              try { const response = await fetch(url, { signal: AbortSignal.timeout(1500) }); if (response.ok) { job.view.url = this.engine === 'hyperframes' ? url + '#project/' + job.view.id : url; this.setStage(job, 'preview-ready', '官方预览已就绪'); return } } catch {}
              await new Promise(resolve => setTimeout(resolve, 500))
            }
            job.abortReason ??= 'startup-timeout'
            job.controller.abort()
          }
          await Promise.all([running, poll()])
        } else {
          if (this.engine === 'hyperframes') { this.setStage(job, 'lint', '检查合成'); await this.run(job, process.execPath, [this.cli(), 'lint', '.', '--json'], dir) }
          this.setStage(job, 'render', '渲染 MP4')
          const output = join(dir, 'final.mp4')
          const browserFile = await this.browserFile(JSON.parse(await readFile(join(this.runtime, 'ready.json'), 'utf8')).browserPath)
          const browserPath = browserFile.length >= 240 ? toNamespacedPath(browserFile) : browserFile
          const chromeMode = /^chrome-headless-shell(?:\.exe)?$/i.test(basename(browserFile)) ? 'headless-shell' : 'chrome-for-testing'
          const args = this.engine === 'hyperframes'
            ? ['render', '.', '--output', output, '--fps', '24', '--quality', 'draft', '--workers', '1', '--strict', '--no-best-effort', '--no-browser-gpu']
            : ['render', 'src/index.jsx', 'ManagedVideo', output, '--codec', 'h264', '--concurrency', String(remotionConcurrency()), '--browser-executable', browserPath, '--chrome-mode', chromeMode]
          await this.run(job, process.execPath, ['--require', join(dir, 'loopback.cjs'), this.cli(), ...args], dir, this.engine === 'hyperframes' ? { HYPERFRAMES_BROWSER_PATH: browserPath } : {})
          const bytes = (await stat(output)).size
          if (bytes < 100 || bytes > 200 * 1024 * 1024) throw new MediaError('MP4 输出为空或超过 200 MB，请检查运行记录。原工程已保留。', 'OUTPUT_INVALID')
          const handle = await open(output, 'r'), header = Buffer.alloc(12)
          try { await handle.read(header, 0, 12, 0) } finally { await handle.close() }
          if (header.toString('ascii', 4, 8) !== 'ftyp') throw new MediaError('渲染器输出不是 MP4 文件，原工程已保留。', 'OUTPUT_INVALID')
          job.controller.signal.throwIfAborted()
          let evictedIds: string[] = []
          await this.store.edit(p.id, undefined, current => {
            const next = [{ id: job.view.id, revision: p.revision, bytes, created: new Date().toISOString() }, ...current.renders]
            const kept = new Set(next.slice(0, 5).map(r => r.id))
            evictedIds = next.slice(5).map(r => r.id).filter(id => !kept.has(id))
            current.renders = next.slice(0, 5)
          }, false)
          job.view.output = job.view.id
          await this.pruneRunWorkdir(dir)
          for (const oldId of evictedIds) await this.safeRemoveRunDir(projectDir, oldId)
        }
      }
      const userCancelled = job.controller.signal.aborted && (job.abortReason === 'user' || job.abortReason === 'dispose' || !job.abortReason)
      finalState = userCancelled ? 'cancelled' : 'done'
      finalStageCode = userCancelled ? 'cancelled' : 'done'
      finalStage = userCancelled ? '已取消' : '已完成'
    } catch (e) {
      const message = (e as any)?.code === 'ELOCKED' ? '另一个 DSH 实例正在运行本插件任务，请等待完成或在那个实例中停止任务。' : errorMessage(e)
      const isUserCancel = job.controller.signal.aborted && (job.abortReason === 'user' || job.abortReason === 'dispose' || !job.abortReason)
      finalState = isUserCancel ? 'cancelled' : 'failed'
      finalStageCode = isUserCancel ? 'cancelled' : (job.abortReason || 'failed')
      finalStage = isUserCancel
        ? '已取消；工程已保留'
        : /^官方 .*命令未完成/.test(message)
          ? '官方任务未完成，请展开运行记录后重试。工程已保留。'
          : /spawn ffprobe ENOENT/.test(message)
            ? '未找到 FFprobe。请安装包含 FFmpeg 和 FFprobe 的完整工具包并加入 PATH，重启 DSH 后重新准备环境。工程已保留。'
            : /spawn ffmpeg ENOENT/.test(message)
              ? '未找到 FFmpeg，请安装并加入 PATH，重启 DSH 后重试。工程已保留。'
              : message
      this.log(job, message)
    }
    finally {
      clearTimeout(timeout)
      if (runDir && projectDir && (job.view.kind === 'preview' || !job.view.output)) {
        await this.safeRemoveRunDir(projectDir, job.view.id)
      }
      if (unlock) await unlock().catch(() => {})
      job.view.url = undefined
      this.setStage(job, finalStageCode, finalStage)
      job.view.state = finalState
    }
  }
  cancel(id: string): MediaJob {
    const job = this.jobs.get(mediaId(id))
    if (!job) throw new MediaError('任务不存在。', 'JOB_NOT_FOUND')
    if (job.view.state === 'running') { job.abortReason = 'user'; job.controller.abort() }
    return structuredClone(job.view)
  }
  dispose(): void {
    this.disposed = true
    for (const job of this.jobs.values()) {
      if (job.view.state === 'running') { job.abortReason = 'dispose'; job.controller.abort() }
    }
  }
  private guard(request: Request): void {
    const url = new URL(request.url), origin = request.headers.get('origin'), site = request.headers.get('sec-fetch-site')
    // The official carrier keeps Host but rewrites Request.url to its internal URL.
    if (site && !['same-origin', 'none'].includes(site)) throw new MediaError('请从 DSH 页面操作。', 'ORIGIN_FORBIDDEN')
    if (origin) {
      const source = new URL(origin)
      if (!['http:', 'https:'].includes(source.protocol) || source.host !== (request.headers.get('host') || url.host)) throw new MediaError('请从 DSH 页面操作。', 'ORIGIN_FORBIDDEN')
    }
    if (request.method === 'POST' && request.headers.get('x-dsh-media') !== '1') throw new MediaError('操作来源无效。', 'ORIGIN_FORBIDDEN')
  }
  async fetch(request: Request): Promise<Response> {
    try {
      this.guard(request)
      const url = new URL(request.url)
      if (request.method === 'GET') {
        const id = mediaId(url.searchParams.get('id')), p = await this.store.get(id), kind = url.searchParams.get('kind')
        if (kind === 'source') {
          const snapshot = await this.store.snapshot(id, p.revision), files: AsyncZippable = {}
          for (const [file, content] of Object.entries(projectSources(p, this.engine))) files[file] = [strToU8(content), { level: 6 }]
          for (const [file, bytes] of snapshot.assets) files['public/assets/' + file] = [bytes, { level: PRECOMPRESSED_ASSET_RE.test(file) ? 0 : 1 }]
          const bytes = await zipAsync(files)
          return new Response(bytes as any, { headers: { 'content-type': 'application/zip', 'content-disposition': `attachment; filename="${this.engine}-${id}.zip"`, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' } })
        }
        let file: string, type: string
        if (kind === 'asset') {
          const a = p.assets.find(a => a.id === mediaId(url.searchParams.get('asset'))); if (!a) throw new MediaError('素材不存在。', 'ASSET_NOT_FOUND')
          file = join(await this.store.path(id), 'assets', a.file); type = mime[a.file.split('.').at(-1) || ''] || 'application/octet-stream'
        } else if (kind === 'mp4') {
          const r = p.renders.find(r => r.id === mediaId(url.searchParams.get('render'))); if (!r) throw new MediaError('成品不存在。', 'RENDER_NOT_FOUND')
          file = join(await this.store.path(id), 'runs', r.id, 'final.mp4'); type = mime.mp4
        } else throw new MediaError('下载类型无效。', 'DOWNLOAD_INVALID')
        await this.store.checkPath(file)
        const handle = await open(file, 'r')
        let streaming = false
        try {
          const info = await handle.stat(), size = info.size
          if (!info.isFile()) throw new MediaError('下载目标不是普通文件。', 'DOWNLOAD_INVALID')
          if (size > 200 * 1024 * 1024) throw new MediaError('成品过大，请从本地工程目录取回。', 'OUTPUT_TOO_LARGE')
          const range = request.headers.get('range'), headers: Record<string, string> = { 'content-type': type, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', 'accept-ranges': 'bytes' }
          if (url.searchParams.get('download') === '1') headers['content-disposition'] = `attachment; filename="${this.engine}-${id}.${kind === 'mp4' ? 'mp4' : file.split('.').at(-1)}"`
          let start = 0, end = size - 1
          if (range) {
            const match = /^bytes=(\d*)-(\d*)$/.exec(range)
            const invalid = () => new Response(null, { status: 416, headers: { ...headers, 'content-range': `bytes */${size}` } })
            if (!match || (!match[1] && !match[2]) || !size) return invalid()
            const first = Number(match[1]), last = Number(match[2])
            if (!Number.isSafeInteger(first) || !Number.isSafeInteger(last)) return invalid()
            if (!match[1]) { if (!last) return invalid(); start = Math.max(0, size - last) }
            else { start = first; if (match[2]) end = Math.min(last, end) }
            if (start > end || start >= size) return invalid()
            headers['content-range'] = `bytes ${start}-${end}/${size}`
          }
          headers['content-length'] = String(size ? end - start + 1 : 0)
          if (!size) return new Response(null, { headers })
          // The stream owns the handle and closes it on completion, abort or cancel.
          const body = Readable.toWeb(handle.createReadStream({ start, end, highWaterMark: 64 * 1024, signal: request.signal }), { strategy: { highWaterMark: 64 * 1024, size: chunk => chunk.byteLength } })
          const response = new Response(body as any, { status: range ? 206 : 200, headers })
          streaming = true
          return response
        } finally { if (!streaming) await handle.close() }
      }
      if (request.method !== 'POST') return new Response(null, { status: 405 })
      let value: unknown
      if (url.pathname.endsWith('/upload')) {
        const reader = request.body?.getReader(), chunks: Uint8Array[] = []; let size = 0
        if (!reader) throw new MediaError('请选择素材。', 'ASSET_REQUIRED')
        try { while (true) { const chunk = await reader.read(); if (chunk.done) break; size += chunk.value.length; if (size > 20 * 1024 * 1024) throw new MediaError('单个素材不能超过 20 MB。', 'ASSET_SIZE'); chunks.push(chunk.value) } } finally { await reader.cancel().catch(() => {}) }
        let fileName = ''
        try { fileName = decodeURIComponent(request.headers.get('x-file-name') || '') } catch { throw new MediaError('文件名编码无效。', 'ASSET_FORMAT') }
        value = await this.store.upload(mediaId(request.headers.get('x-project-id')), Number(request.headers.get('x-project-revision')), fileName, Buffer.concat(chunks))
      } else {
        if (!request.headers.get('content-type')?.startsWith('application/json')) throw new MediaError('请求格式无效。', 'BAD_REQUEST')
        const text = await request.text(); if (Buffer.byteLength(text) > 16384) throw new MediaError('请求过大。', 'BAD_REQUEST')
        const v = JSON.parse(text)
        switch (v.action) {
          case 'list': {
            const [active, archived] = await Promise.all([this.store.listWithWarnings(false), this.store.listWithWarnings(true)])
            const corruptedCount = active.corrupted.length + archived.corrupted.length
            value = {
              projects: active.projects,
              archivedProjects: archived.projects,
              ...(corruptedCount ? { corruptedCount } : {}),
              templates: MEDIA_TEMPLATES,
              environment: await this.environment(),
              jobs: [...this.jobs.values()].map(j => structuredClone(j.view)),
            }
            break
          }
          case 'create': value = await this.store.create(v.fields); break
          case 'get': value = await this.store.get(mediaId(v.id)); break
          case 'update': value = await this.store.update(mediaId(v.id), v.revision, v.fields); break
          case 'removeAsset': value = await this.store.removeAsset(mediaId(v.id), v.revision, mediaId(v.asset)); break
          case 'reorderImages': value = await this.store.reorderImages(mediaId(v.id), v.revision, v.imageIds); break
          case 'archive': case 'restore': {
            if (v.confirmed !== true) throw new MediaError('请明确确认归档或恢复。', 'CONFIRM_REQUIRED')
            // The same slot covers jobs from another DSH process, so a project
            // cannot move while its render or preview still writes into it.
            const slot = join(this.store.root, 'workbench-slot'); await this.store.init(); await mkdir(slot, { recursive: true })
            const unlock = await lockfile.lock(slot, { retries: 0, stale: 30000, update: 10000 }).catch(error => {
              if (error.code === 'ELOCKED') throw new MediaConflict('已有预览或渲染正在运行，请先关闭预览或取消渲染，再归档或恢复工程。')
              throw error
            })
            try { value = await this.store.archive(mediaId(v.id), v.revision, v.action === 'restore') } finally { await unlock() }
            break
          }
          case 'prepare': value = await this.start('prepare'); break
          case 'preview': case 'render': value = await this.start(v.action, mediaId(v.id), v.revision); break
          case 'job': value = this.job(mediaId(v.job)); break
          case 'cancel': value = this.cancel(mediaId(v.job)); break
          default: throw new MediaError('操作无效。', 'BAD_ACTION')
        }
      }
      return Response.json({ ok: true, value }, { headers: { 'cache-control': 'no-store' } })
    } catch (e) {
      const status = e instanceof MediaConflict ? 409 : (e instanceof MediaError ? e.status : 400)
      const code = e instanceof MediaError ? e.code : undefined
      return Response.json({ ok: false, message: errorMessage(e), ...(code ? { code } : {}) }, { status, headers: { 'cache-control': 'no-store' } })
    }
  }
}
export function installMediaWorkbench(ctx: any, engine: MediaEngine): MediaWorkbench {
  const workbench = new MediaWorkbench(engine)
  const disposers: Array<() => void> = [() => workbench.dispose()]
  ctx.inject?.(['connection'], (host: any) => {
    const r1 = host.connection?.fetch?.register({ path: workbench.route, methods: ['GET', 'POST'], requestBody: 'buffered', fetch: (request: Request) => workbench.fetch(request) })
    const r2 = host.connection?.fetch?.register({ path: workbench.route + '/upload', methods: ['POST'], requestBody: 'streaming', fetch: (request: Request) => workbench.fetch(request) })
    host.effect?.(() => () => { r2?.(); r1?.() })
  })
  for (const action of ['project', 'render']) {
    const dispose = ctx.tools?.register({
      name: engine + '_' + action,
      description: action === 'project' ? '创建或读取本插件受管理视频工程，列出模板与环境。不会自动安装依赖或渲染。' : '准备官方渲染环境、启动预览/MP4任务、查询进度或取消。工程保存在 DSH 本地数据目录；首次准备环境会下载依赖。',
      parameters: { type: 'object', properties: { action: { type: 'string', enum: action === 'project' ? ['list', 'create', 'get', 'update'] : ['prepare', 'preview', 'render', 'job', 'cancel'] }, id: { type: 'string' }, revision: { type: 'number' }, job: { type: 'string' }, fields: { type: 'object', properties: { template: { type: 'string', enum: ['title', 'product', 'slideshow'] }, title: { type: 'string' }, body: { type: 'string' }, format: { type: 'string', enum: ['landscape', 'portrait', 'square'] }, duration: { type: 'number' } }, required: ['template', 'title', 'body', 'format', 'duration'] } }, required: ['action'] },
      output: {
        schema: { type: 'object', additionalProperties: true },
        render(_args: unknown, value: any) {
          const lines = [engine === 'hyperframes' ? 'HyperFrames 视频工作台' : 'Remotion 视频工作台']
          if (Array.isArray(value.projects)) {
            lines.push('已保存工程：' + value.projects.length)
            for (const project of value.projects) lines.push('- ' + project.title + '（版本 ' + project.revision + '；项目编号：' + project.id + '）')
            if (value.corruptedCount) lines.push('注意：发现 ' + value.corruptedCount + ' 个损坏工程目录（原文件已保留，未影响其他工程）。')
            lines.push(value.environment?.ready ? '渲染环境已就绪。' : '首次预览或导出前，请显式准备渲染环境。')
          } else if (value.title) lines.push('工程：' + value.title + '（版本 ' + value.revision + '）', '项目编号：' + value.id)
          else if (value.state) {
            lines.push('任务状态：' + value.state, '任务编号：' + value.id, value.stage || '')
            if (value.projectId) lines.push('项目编号：' + value.projectId)
            if (value.state === 'running') lines.push('可用 action: job 查询，或 action: cancel 取消；job 参数使用上述任务编号。')
            if (value.url) lines.push('预览：' + value.url)
            if (value.state === 'done' && value.output) {
              lines.push('成品编号：' + value.output)
              if (value.projectId) lines.push('成品路径：' + join(workbench.store.root, 'projects', value.projectId, 'runs', value.output, 'final.mp4'))
            }
            if (value.state === 'failed' && Array.isArray(value.lines) && value.lines.length) {
              lines.push('最近日志：\n' + value.lines.slice(-5).join('\n'))
            }
            if (value.message) lines.push(value.message)
          }
          return [{ type: 'text', text: lines.filter(Boolean).join('\n') }]
        },
      },
      async execute(args: any) {
        const allowed = action === 'project' ? ['list', 'create', 'get', 'update'] : ['prepare', 'preview', 'render', 'job', 'cancel']
        if (!allowed.includes(args.action)) throw new Error('操作无效。')
        const response = await workbench.fetch(new Request('http://dsh.internal' + workbench.route, { method: 'POST', headers: { 'content-type': 'application/json', 'x-dsh-media': '1' }, body: JSON.stringify(args) }))
        const result: any = await response.json(); if (!result.ok) throw new Error(result.message); return result.value
      },
    })
    if (typeof dispose === 'function') disposers.push(dispose)
  }
  let cleaned = false
  const cleanup = () => {
    if (cleaned) return
    cleaned = true
    for (const fn of disposers.splice(0).reverse()) fn()
  }
  ctx.effect?.(() => cleanup)
  ctx.on?.('dispose', cleanup)
  return workbench
}
