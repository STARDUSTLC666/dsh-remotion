import { randomUUID } from 'node:crypto'
import { mkdir, readFile, writeFile, rename, readdir, stat, lstat, unlink, realpath } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join, resolve, relative, isAbsolute, extname } from 'node:path'
import lockfile from 'proper-lockfile'
import { validateFields, type MediaEngine, type MediaProject, type MediaAsset } from './media-templates.js'

export function mediaId(value: unknown): string {
  if (typeof value !== 'string' || !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(value)) throw new Error('项目或任务编号无效。')
  return value
}
export class MediaConflict extends Error { status = 409 }
export class MediaStore {
  readonly root: string
  constructor(engine: MediaEngine, root?: string) { this.root = resolve(root ?? join(process.env.DSH_HOME || join(homedir(), '.dsh'), 'data', 'dsh-' + engine)) }
  async init(): Promise<void> { await mkdir(join(this.root, 'projects'), { recursive: true, mode: 0o700 }) }
  async path(id: string, archived = false): Promise<string> {
    await this.init()
    const dir = join(this.root, archived ? 'archives' : 'projects', mediaId(id))
    if ((await lstat(dir)).isSymbolicLink()) throw new Error('项目目录不能是符号链接。')
    await this.checkPath(dir)
    return dir
  }
  async checkPath(path: string): Promise<void> {
    const base = await realpath(this.root), actual = await realpath(path), rel = relative(base, actual)
    if (rel === '..' || rel.startsWith('..' + (process.platform === 'win32' ? '\\' : '/')) || isAbsolute(rel)) throw new Error('文件不在本插件项目目录内。')
  }
  async get(id: string, archived = false): Promise<MediaProject> {
    const file = join(await this.path(id, archived), 'project.json'); await this.checkPath(file)
    if ((await stat(file)).size > 65536) throw new Error('工程记录过大，请保留文件后检查。')
    const p = JSON.parse(await readFile(file, 'utf8')) as MediaProject
    validateFields(p)
    if (p.id !== id || !Number.isInteger(p.revision) || p.revision < 1 || !Array.isArray(p.assets) || p.assets.length > 12 || !Array.isArray(p.renders)) throw new Error('工程记录损坏；原文件已保留。')
    for (const a of p.assets) { mediaId(a.id); if (!new RegExp('^' + a.id + '\\.(png|jpg|mp3|wav|mp4)$').test(a.file)) throw new Error('素材记录无效。') }
    for (const r of p.renders) mediaId(r.id)
    return p
  }
  async list(archived = false): Promise<MediaProject[]> {
    await this.init(); const result = []
    const folder = join(this.root, archived ? 'archives' : 'projects')
    const ids = await readdir(folder).catch(error => { if (archived && error.code === 'ENOENT') return []; throw error })
    for (const id of ids) { if (/^[0-9a-f-]{36}$/.test(id)) result.push(await this.get(id, archived)) }
    return result.sort((a, b) => b.updated.localeCompare(a.updated))
  }
  /** Move a complete managed project without deleting sources, assets or renders. */
  async archive(id: string, revision: unknown, restore = false): Promise<MediaProject> {
    await this.init()
    const unlock = await lockfile.lock(join(this.root, 'projects'), { retries: { retries: 8, minTimeout: 30, maxTimeout: 60 } })
    let release: (() => Promise<void>) | undefined
    try {
      const source = await this.path(id, restore)
      release = await lockfile.lock(source, { retries: { retries: 8, minTimeout: 30, maxTimeout: 60 } })
      const p = await this.get(id, restore)
      if (revision !== p.revision) throw new MediaConflict('工程已更新，请重新读取后再归档或恢复。')
      if (restore && (await this.list()).length >= 30) throw new MediaConflict('当前项目已达 30 个，请先归档其他项目再恢复。')
      const folder = join(this.root, restore ? 'projects' : 'archives')
      await mkdir(folder, { recursive: true }); await this.checkPath(folder)
      const target = join(folder, mediaId(id))
      if (await lstat(target).then(() => true, error => { if (error.code === 'ENOENT') return false; throw error })) throw new Error('目标已有同编号工程，已保留两份文件，请先备份检查。')
      await rename(source, target)
      return p
    } finally { if (release) await release(); await unlock() }
  }
  private async write(p: MediaProject): Promise<void> {
    const dir = await this.path(p.id), temp = join(dir, randomUUID() + '.tmp')
    try { await writeFile(temp, JSON.stringify(p, null, 2), { flag: 'wx', mode: 0o600 }); await rename(temp, join(dir, 'project.json')) }
    finally { await unlink(temp).catch(() => {}) }
  }
  async create(value: unknown): Promise<MediaProject> {
    await this.init()
    const unlock = await lockfile.lock(join(this.root, 'projects'), { retries: { retries: 8, minTimeout: 30, maxTimeout: 60 } })
    try {
      if ((await this.list()).length >= 30) throw new Error('工作台最多保存 30 个当前项目，请先归档现有工程。')
      const p: MediaProject = { ...validateFields(value), id: randomUUID(), revision: 1, updated: new Date().toISOString(), assets: [], renders: [] }
      await mkdir(join(this.root, 'projects', p.id), { mode: 0o700 }); await this.write(p); return p
    } finally { await unlock() }
  }
  async edit(id: string, revision: unknown, fn: (p: MediaProject) => Promise<void> | void, bump = true): Promise<MediaProject> {
    const dir = await this.path(id)
    const unlock = await lockfile.lock(dir, { retries: { retries: 8, minTimeout: 30, maxTimeout: 60 } })
    try {
      const p = await this.get(id)
      if (revision !== undefined && revision !== p.revision) throw new MediaConflict('工程已在另一窗口更新。你的输入仍保留，请重新打开最新版本后比较。')
      await fn(p); if (bump) p.revision++; p.updated = new Date().toISOString(); await this.write(p); return p
    } finally { await unlock() }
  }
  async update(id: string, revision: unknown, value: unknown): Promise<MediaProject> { return this.edit(id, revision, p => { Object.assign(p, validateFields(value)) }) }
  async assetBytes(id: string, asset: MediaAsset): Promise<Buffer> {
    const file = join(await this.path(id), 'assets', asset.file); await this.checkPath(file)
    if ((await stat(file)).size !== asset.bytes || asset.bytes > 20 * 1024 * 1024) throw new Error('素材已改变，请重新上传并检查。')
    return readFile(file)
  }
  async upload(id: string, revision: unknown, name: string, bytes: Buffer): Promise<MediaProject> {
    if (!bytes.length || bytes.length > 20 * 1024 * 1024) throw new Error('单个素材需为 1 字节–20 MB。')
    const ext = extname(name).toLowerCase(), isPng = bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))
    const isJpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
    let kind: MediaAsset['kind'], suffix: string
    if (ext === '.png' && isPng) { kind = 'image'; suffix = '.png' }
    else if (['.jpg','.jpeg'].includes(ext) && isJpg) { kind = 'image'; suffix = '.jpg' }
    else if (ext === '.wav' && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WAVE') { kind = 'audio'; suffix = '.wav' }
    else if (ext === '.mp3' && (bytes.toString('ascii', 0, 3) === 'ID3' || bytes[0] === 255 && (bytes[1] & 224) === 224)) { kind = 'audio'; suffix = '.mp3' }
    else if (ext === '.mp4' && bytes.toString('ascii', 4, 8) === 'ftyp') { kind = 'video'; suffix = '.mp4' }
    else throw new Error('仅支持内容与扩展名一致的 PNG、JPEG、MP3、WAV 或 MP4。')
    return this.edit(id, revision, async p => {
      if (p.assets.length >= 12 || p.assets.reduce((n, a) => n + a.bytes, 0) + bytes.length > 40 * 1024 * 1024) throw new Error('每个项目最多 12 个素材、合计 40 MB。')
      if (kind !== 'image' && p.assets.some(a => a.kind === kind)) throw new Error(kind === 'audio' ? '已有背景音频，请先移除再替换。' : '已有背景视频，请先移除再替换。')
      const assetId = randomUUID(), dir = join(await this.path(id), 'assets'); await mkdir(dir, { recursive: true })
      const asset = { id: assetId, name: name.replace(/[\x00-\x1f/\\]/g, '_').slice(0, 100), file: assetId + suffix, kind, bytes: bytes.length }
      await writeFile(join(dir, asset.file), bytes, { flag: 'wx', mode: 0o600 }); p.assets.push(asset)
    })
  }
  async removeAsset(id: string, revision: unknown, assetId: string): Promise<MediaProject> {
    let file: string | undefined
    const p = await this.edit(id, revision, async p => { const a = p.assets.find(a => a.id === mediaId(assetId)); if (!a) throw new Error('素材不存在。'); file = join(await this.path(id), 'assets', a.file); p.assets = p.assets.filter(a => a.id !== assetId) })
    // Unlink only this managed upload, never a source file or a resolved link target.
    if (file) await unlink(file).catch(() => {}); return p
  }
  async snapshot(id: string, revision: unknown): Promise<{ project: MediaProject; assets: Map<string, Buffer> }> {
    const dir = await this.path(id), unlock = await lockfile.lock(dir, { retries: { retries: 8, minTimeout: 30, maxTimeout: 60 } })
    try { const project = await this.get(id); if (project.revision !== revision) throw new MediaConflict('项目已更新，请保存并重新预览。'); const assets = new Map<string, Buffer>(); for (const a of project.assets) assets.set(a.file, await this.assetBytes(id, a)); return { project, assets } }
    finally { await unlock() }
  }
}
