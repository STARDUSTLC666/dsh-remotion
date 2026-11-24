import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile, rename, readdir, stat, lstat, unlink, realpath, rmdir } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join, resolve, relative, isAbsolute, extname } from 'node:path';
import lockfile from 'proper-lockfile';
import { MediaError, validateFields } from './media-templates.js';
import { movePathsToTrash } from './trash.js';
const MEDIA_ID_RE = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/;
const ASSET_EXT_RE = '(?:png|jpg|webp|mp3|wav|m4a|mp4)';
export function mediaId(value) {
    if (typeof value !== 'string' || !MEDIA_ID_RE.test(value))
        throw new MediaError('项目或任务编号无效。', 'ID_INVALID');
    return value;
}
export class MediaConflict extends MediaError {
    constructor(message) { super(message, 'CONFLICT', 409); }
}
export class MediaStore {
    root;
    customTrashPath;
    customTrashPaths;
    constructor(engine, root, options) {
        this.root = resolve(root ?? join(process.env.DSH_HOME || join(homedir(), '.dsh'), 'data', 'dsh-' + engine));
        this.customTrashPath = options?.trashPath;
        this.customTrashPaths = options?.trashPaths;
    }
    async trashDirs(dirs) {
        if (dirs.length === 0)
            return;
        if (this.customTrashPaths) {
            await this.customTrashPaths(dirs);
            return;
        }
        if (this.customTrashPath) {
            for (const dir of dirs)
                await this.customTrashPath(dir);
            return;
        }
        await movePathsToTrash(dirs);
    }
    async detachRunJunctions(dir) {
        const runsDir = join(dir, 'runs');
        const runEntries = await readdir(runsDir).catch(() => []);
        for (const runId of runEntries) {
            if (!MEDIA_ID_RE.test(runId))
                continue;
            const linkPath = join(runsDir, runId, 'node_modules');
            const linkInfo = await lstat(linkPath).catch(() => null);
            if (linkInfo?.isSymbolicLink())
                await unlink(linkPath).catch(() => { });
        }
    }
    async init() { await mkdir(join(this.root, 'projects'), { recursive: true, mode: 0o700 }); }
    async path(id, archived = false) {
        await this.init();
        const dir = join(this.root, archived ? 'archives' : 'projects', mediaId(id));
        let info;
        try {
            info = await lstat(dir);
        }
        catch (error) {
            if (error?.code === 'ENOENT') {
                throw new MediaError('工程不存在或原目录已被移除，列表已自动同步。', 'PROJECT_NOT_FOUND', 404);
            }
            throw error;
        }
        if (info.isSymbolicLink())
            throw new MediaError('项目目录不能是符号链接。', 'STORAGE_UNSAFE');
        await this.checkPath(dir);
        return dir;
    }
    async checkPath(path) {
        const base = await realpath(this.root), actual = await realpath(path), rel = relative(base, actual);
        if (rel === '..' || rel.startsWith('..' + (process.platform === 'win32' ? '\\' : '/')) || isAbsolute(rel))
            throw new MediaError('文件不在本插件项目目录内。', 'STORAGE_UNSAFE');
    }
    async get(id, archived = false) {
        const file = join(await this.path(id, archived), 'project.json');
        try {
            await this.checkPath(file);
            if ((await stat(file)).size > 65536)
                throw new MediaError('工程记录过大，请保留文件后检查。', 'PROJECT_CORRUPT');
        }
        catch (error) {
            if (error?.code === 'ENOENT') {
                throw new MediaError('工程不存在或原文件已被移除，列表已自动同步。', 'PROJECT_NOT_FOUND', 404);
            }
            throw error;
        }
        const p = JSON.parse(await readFile(file, 'utf8'));
        validateFields(p);
        if (p.id !== id || !Number.isInteger(p.revision) || p.revision < 1 || !Array.isArray(p.assets) || p.assets.length > 12 || !Array.isArray(p.renders))
            throw new MediaError('工程记录损坏；原文件已保留。', 'PROJECT_CORRUPT');
        for (const a of p.assets) {
            mediaId(a.id);
            if (!new RegExp('^' + a.id + '\\.' + ASSET_EXT_RE + '$').test(a.file))
                throw new MediaError('素材记录无效。', 'PROJECT_CORRUPT');
        }
        for (const r of p.renders)
            mediaId(r.id);
        return p;
    }
    async listWithWarnings(archived = false) {
        await this.init();
        const folder = join(this.root, archived ? 'archives' : 'projects');
        const entries = await readdir(folder).catch(error => { if (archived && error.code === 'ENOENT')
            return []; throw error; });
        const ids = entries.filter(id => MEDIA_ID_RE.test(id));
        const projects = [];
        const corrupted = [];
        const batchSize = 6;
        for (let i = 0; i < ids.length; i += batchSize) {
            const batch = ids.slice(i, i + batchSize);
            const settled = await Promise.allSettled(batch.map(id => this.get(id, archived)));
            for (let j = 0; j < settled.length; j++) {
                const outcome = settled[j];
                if (outcome.status === 'fulfilled')
                    projects.push(outcome.value);
                else {
                    const reasonCode = outcome.reason?.code;
                    if (reasonCode !== 'ENOENT' && reasonCode !== 'PROJECT_NOT_FOUND') {
                        corrupted.push({ id: batch[j], detail: outcome.reason instanceof Error ? outcome.reason.message : String(outcome.reason) });
                    }
                }
            }
        }
        projects.sort((a, b) => b.updated.localeCompare(a.updated));
        return { projects, corrupted };
    }
    async list(archived = false) {
        return (await this.listWithWarnings(archived)).projects;
    }
    /** Move a complete managed project without deleting sources, assets or renders. */
    async archive(id, revision, restore = false) {
        await this.init();
        const unlock = await lockfile.lock(join(this.root, 'projects'), { retries: { retries: 8, minTimeout: 30, maxTimeout: 60 } });
        let release;
        try {
            const source = await this.path(id, restore);
            release = await lockfile.lock(source, { retries: { retries: 8, minTimeout: 30, maxTimeout: 60 } });
            const p = await this.get(id, restore);
            if (revision !== p.revision)
                throw new MediaConflict('工程已更新，请重新读取后再归档或恢复。');
            if (restore && (await this.list()).length >= 30)
                throw new MediaConflict('当前项目已达 30 个，请先归档其他项目再恢复。');
            const folder = join(this.root, restore ? 'projects' : 'archives');
            await mkdir(folder, { recursive: true });
            await this.checkPath(folder);
            const target = join(folder, mediaId(id));
            if (await lstat(target).then(() => true, error => { if (error.code === 'ENOENT')
                return false; throw error; }))
                throw new MediaError('目标已有同编号工程，已保留两份文件，请先备份检查。', 'PROJECT_EXISTS');
            await rename(source, target);
            return p;
        }
        finally {
            if (release)
                await release();
            await unlock();
        }
    }
    /** Move a managed project directory (active or archived) into the OS Recycle Bin / Trash. */
    async trash(id, revision, archived = true) {
        await this.init();
        const unlock = await lockfile.lock(join(this.root, 'projects'), { retries: { retries: 8, minTimeout: 30, maxTimeout: 60 } });
        let release;
        try {
            const source = await this.path(id, archived);
            release = await lockfile.lock(source, { retries: { retries: 8, minTimeout: 30, maxTimeout: 60 } });
            const p = await this.get(id, archived);
            if (revision !== p.revision)
                throw new MediaConflict('工程已更新，请重新读取后再移入回收站。');
            // Detach any leftover run node_modules symlink/junction before trashing so shared runtime files are never touched.
            await this.detachRunJunctions(source);
            // Release the per-project lock before handing the directory to the OS Recycle Bin (prevents Windows handle/lock conflicts).
            await release();
            release = undefined;
            await this.trashDirs([source]);
            return p;
        }
        finally {
            if (release)
                await release().catch(() => { });
            await unlock();
        }
    }
    /** Move all currently archived project directories into the OS Recycle Bin / Trash in a single batch. */
    async trashArchived() {
        await this.init();
        const unlock = await lockfile.lock(join(this.root, 'projects'), { retries: { retries: 8, minTimeout: 30, maxTimeout: 60 } });
        try {
            const { projects } = await this.listWithWarnings(true);
            if (projects.length === 0)
                return { trashedCount: 0, ids: [] };
            const dirs = [];
            const ids = [];
            for (const p of projects) {
                const source = await this.path(p.id, true);
                const release = await lockfile.lock(source, { retries: { retries: 8, minTimeout: 30, maxTimeout: 60 } });
                try {
                    await this.detachRunJunctions(source);
                }
                finally {
                    await release();
                }
                dirs.push(source);
                ids.push(p.id);
            }
            await this.trashDirs(dirs);
            return { trashedCount: ids.length, ids };
        }
        finally {
            await unlock();
        }
    }
    /** Move verified corrupted project directories into the OS Recycle Bin / Trash; refuses healthy projects and symlinks. */
    async trashCorrupted(items) {
        await this.init();
        const unlock = await lockfile.lock(join(this.root, 'projects'), { retries: { retries: 8, minTimeout: 30, maxTimeout: 60 } });
        try {
            const candidates = [];
            const seen = new Set();
            const addCandidate = (id, archived) => {
                const validId = mediaId(id);
                const key = (archived ? 'a:' : 'p:') + validId;
                if (seen.has(key))
                    return;
                seen.add(key);
                candidates.push({ id: validId, archived });
            };
            if (items !== undefined) {
                if (!Array.isArray(items) || items.length > 100)
                    throw new MediaError('损坏工程列表格式无效。', 'BAD_REQUEST');
                for (const item of items) {
                    if (!item || typeof item !== 'object')
                        throw new MediaError('损坏工程项格式无效。', 'BAD_REQUEST');
                    addCandidate(item.id, Boolean(item.archived));
                }
            }
            else {
                const [active, archived] = await Promise.all([this.listWithWarnings(false), this.listWithWarnings(true)]);
                for (const c of active.corrupted)
                    addCandidate(c.id, false);
                for (const c of archived.corrupted)
                    addCandidate(c.id, true);
            }
            const dirs = [];
            const ids = [];
            for (const candidate of candidates) {
                const dir = join(this.root, candidate.archived ? 'archives' : 'projects', candidate.id);
                let info;
                try {
                    info = await lstat(dir);
                }
                catch (error) {
                    if (error?.code === 'ENOENT')
                        continue;
                    throw error;
                }
                if (info.isSymbolicLink())
                    throw new MediaError('项目目录不能是符号链接。', 'STORAGE_UNSAFE');
                if (!info.isDirectory())
                    throw new MediaError('清理目标必须是损坏工程目录。', 'STORAGE_UNSAFE');
                await this.checkPath(dir);
                let isCorrupt = false;
                try {
                    await this.get(candidate.id, candidate.archived);
                }
                catch (error) {
                    const code = error?.code;
                    if (code === 'ENOENT' || code === 'PROJECT_NOT_FOUND')
                        continue;
                    isCorrupt = true;
                }
                if (!isCorrupt)
                    throw new MediaError('该工程当前完好，拒绝作为损坏目录清理。', 'PROJECT_NOT_CORRUPT');
                await this.detachRunJunctions(dir);
                dirs.push(dir);
                ids.push(candidate.id);
            }
            if (dirs.length === 0)
                return { trashedCount: 0, ids: [] };
            await this.trashDirs(dirs);
            return { trashedCount: ids.length, ids };
        }
        finally {
            await unlock();
        }
    }
    async write(p) {
        const dir = await this.path(p.id), temp = join(dir, randomUUID() + '.tmp');
        try {
            await writeFile(temp, JSON.stringify(p, null, 2), { flag: 'wx', mode: 0o600 });
            await rename(temp, join(dir, 'project.json'));
        }
        finally {
            await unlink(temp).catch(() => { });
        }
    }
    async create(value) {
        await this.init();
        const unlock = await lockfile.lock(join(this.root, 'projects'), { retries: { retries: 8, minTimeout: 30, maxTimeout: 60 } });
        try {
            if ((await this.list()).length >= 30)
                throw new MediaError('工作台最多保存 30 个当前项目，请先归档现有工程。', 'PROJECT_LIMIT');
            const p = { ...validateFields(value), id: randomUUID(), revision: 1, updated: new Date().toISOString(), assets: [], renders: [] };
            const dir = join(this.root, 'projects', p.id);
            await mkdir(dir, { mode: 0o700 });
            try {
                await this.write(p);
                return p;
            }
            catch (error) {
                // Remove only this empty newly created directory. Preserve any written data.
                await rmdir(dir).catch(() => { });
                throw error;
            }
        }
        finally {
            await unlock();
        }
    }
    async edit(id, revision, fn, bump = true) {
        const dir = await this.path(id);
        const unlock = await lockfile.lock(dir, { retries: { retries: 8, minTimeout: 30, maxTimeout: 60 } });
        try {
            const p = await this.get(id);
            if (revision !== undefined && revision !== p.revision)
                throw new MediaConflict('工程已在另一窗口更新。你的输入仍保留，请重新打开最新版本后比较。');
            await fn(p);
            if (bump)
                p.revision++;
            p.updated = new Date().toISOString();
            await this.write(p);
            return p;
        }
        finally {
            await unlock();
        }
    }
    async update(id, revision, value) { return this.edit(id, revision, p => { Object.assign(p, validateFields(value)); }); }
    /** Reorder existing images atomically; audio/video slots and uploaded bytes stay intact. */
    async reorderImages(id, revision, order) {
        if (!Number.isInteger(revision) || Number(revision) < 1)
            throw new MediaError('调整图片顺序需要当前工程修订号。', 'REORDER_REVISION_REQUIRED');
        return this.edit(id, revision, p => {
            const images = p.assets.filter(a => a.kind === 'image'), byId = new Map(images.map(a => [a.id, a]));
            if (!Array.isArray(order) || order.length !== images.length || new Set(order).size !== images.length || order.some(id => typeof id !== 'string' || !byId.has(id)))
                throw new MediaError('图片顺序必须包含当前项目的全部图片，且每张只出现一次。', 'REORDER_INVALID');
            if (images.every((asset, index) => asset.id === order[index]))
                return;
            let index = 0;
            p.assets = p.assets.map(asset => asset.kind === 'image' ? byId.get(order[index++]) : asset);
            p.revision++;
        }, false);
    }
    async assetBytes(id, asset) {
        const file = join(await this.path(id), 'assets', asset.file);
        await this.checkPath(file);
        if ((await stat(file)).size !== asset.bytes || asset.bytes > 20 * 1024 * 1024)
            throw new MediaError('素材已改变，请重新上传并检查。', 'ASSET_CHANGED');
        return readFile(file);
    }
    async upload(id, revision, name, bytes) {
        if (!bytes.length || bytes.length > 20 * 1024 * 1024)
            throw new MediaError('单个素材需为 1 字节–20 MB。', 'ASSET_SIZE');
        const ext = extname(name).toLowerCase();
        const isPng = bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
        const isJpg = bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
        const isWebp = bytes.length >= 12 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
        const isWav = bytes.length >= 12 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WAVE';
        const isMp3 = bytes.length >= 3 && (bytes.toString('ascii', 0, 3) === 'ID3' || (bytes[0] === 255 && (bytes[1] & 224) === 224));
        const isIsoBmff = bytes.length >= 12 && bytes.toString('ascii', 4, 8) === 'ftyp';
        let kind, suffix;
        if (ext === '.png' && isPng) {
            kind = 'image';
            suffix = '.png';
        }
        else if (['.jpg', '.jpeg'].includes(ext) && isJpg) {
            kind = 'image';
            suffix = '.jpg';
        }
        else if (ext === '.webp' && isWebp) {
            kind = 'image';
            suffix = '.webp';
        }
        else if (ext === '.wav' && isWav) {
            kind = 'audio';
            suffix = '.wav';
        }
        else if (ext === '.mp3' && isMp3) {
            kind = 'audio';
            suffix = '.mp3';
        }
        else if (ext === '.m4a' && isIsoBmff) {
            kind = 'audio';
            suffix = '.m4a';
        }
        else if (ext === '.mp4' && isIsoBmff) {
            kind = 'video';
            suffix = '.mp4';
        }
        else
            throw new MediaError('仅支持内容与扩展名一致的 PNG、JPEG、WebP、MP3、WAV、M4A 或 MP4。', 'ASSET_FORMAT');
        let writtenFile;
        try {
            return await this.edit(id, revision, async (p) => {
                if (p.assets.length >= 12 || p.assets.reduce((n, a) => n + a.bytes, 0) + bytes.length > 40 * 1024 * 1024)
                    throw new MediaError('每个项目最多 12 个素材、合计 40 MB。', 'ASSET_LIMIT');
                if (kind !== 'image' && p.assets.some(a => a.kind === kind))
                    throw new MediaError(kind === 'audio' ? '已有背景音频，请先移除再替换。' : '已有背景视频，请先移除再替换。', kind === 'audio' ? 'AUDIO_EXISTS' : 'VIDEO_EXISTS');
                const assetId = randomUUID(), dir = join(await this.path(id), 'assets');
                await mkdir(dir, { recursive: true });
                if ((await lstat(dir)).isSymbolicLink())
                    throw new MediaError('素材目录不能是符号链接或目录联接。', 'STORAGE_UNSAFE');
                await this.checkPath(dir);
                const asset = { id: assetId, name: name.replace(/[\x00-\x1f/\\]/g, '_').slice(0, 100), file: assetId + suffix, kind, bytes: bytes.length };
                const destination = join(dir, asset.file);
                await writeFile(destination, bytes, { flag: 'wx', mode: 0o600 });
                writtenFile = destination;
                p.assets.push(asset);
            });
        }
        catch (error) {
            if (writtenFile)
                await unlink(writtenFile).catch(() => { });
            throw error;
        }
    }
    async removeAsset(id, revision, assetId) {
        let file;
        const p = await this.edit(id, revision, async (p) => { const a = p.assets.find(a => a.id === mediaId(assetId)); if (!a)
            throw new MediaError('素材不存在。', 'ASSET_NOT_FOUND'); file = join(await this.path(id), 'assets', a.file); p.assets = p.assets.filter(a => a.id !== assetId); });
        // Unlink only this managed upload, never a source file or a resolved link target.
        if (file)
            await unlink(file).catch(() => { });
        return p;
    }
    async snapshot(id, revision) {
        const dir = await this.path(id), unlock = await lockfile.lock(dir, { retries: { retries: 8, minTimeout: 30, maxTimeout: 60 } });
        try {
            const project = await this.get(id);
            if (project.revision !== revision)
                throw new MediaConflict('项目已更新，请保存并重新预览。');
            const assets = new Map();
            for (const a of project.assets)
                assets.set(a.file, await this.assetBytes(id, a));
            return { project, assets };
        }
        finally {
            await unlock();
        }
    }
}
