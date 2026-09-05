/**
 * Portable skill-bundle implementation. Canonical source: dsh-hyperframes.
 * dsh-remotion vendors this exact file; scripts/sync-skill-bundle.mjs and
 * test/shared-source.test.mjs prevent drift without a runtime dependency.
 */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import YAML from 'yaml'

export interface SkillRegistration {
  name: string
  description: string
  content: string
  resourceBase: { kind: 'directory'; path: string }
  source?: string
}

export interface SkillsPluginContext {
  skills: {
    register(definition: SkillRegistration): () => void
    get?(name: string): Promise<SkillRegistration | undefined> | SkillRegistration | undefined
  }
  tools?: { register(definition: Record<string, unknown>): () => void }
  on?(event: string, listener: () => void): (() => void) | void
  logger?: { warn(message: string): void }
}

export interface ParsedSkillFile { name: string; description: string; content: string }
export interface SkillFileCheck {
  name: string
  ok: boolean
  detail: string
  file: string
  code: 'valid' | 'unreadable' | 'invalid'
}
export interface SkillHealthCheck extends Omit<SkillFileCheck, 'code'> {
  code: SkillFileCheck['code'] | 'ready' | 'not_registered' | 'registration_failed' | 'changed' | 'inactive' | 'registry_unavailable' | 'disposed'
  fileOk: boolean
  registered: boolean
  registryChecked: boolean
  reloadRequired: boolean
}
export interface SkillBundleOptions {
  plugin: string
  healthTool: string
  names: readonly string[]
  directory: () => string
}
interface Inspection {
  check: SkillFileCheck
  parsed?: ParsedSkillFile
  fingerprint?: string
}
interface Registration {
  definition?: SkillRegistration
  fingerprint?: string
  error?: string
}

// Matches Harness 0.1.3-alpha.1's public skill-name grammar.
const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
function message(error: unknown): string { return error instanceof Error ? error.message : String(error) }

/** One parser for the public helper, disk validation and runtime registration. */
function analyze(text: string): { parsed: ParsedSkillFile; error?: string } {
  const match = /^\uFEFF?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(text)
  const parsed = { name: '', description: '', content: match ? text.slice(match[0].length).trimStart() : text }
  if (!match) return { parsed, error: '缺少完整的 YAML frontmatter（--- 分隔行）。' }
  try {
    const doc = YAML.parseDocument(match[1], { prettyErrors: false, uniqueKeys: true })
    if (doc.errors.length || doc.warnings.length) throw new Error([...doc.errors, ...doc.warnings].map((error) => error.message).join('; '))
    const value: unknown = doc.toJS({ maxAliasCount: 100 })
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return { parsed, error: 'frontmatter 必须是 YAML 对象。' }
    const fields = value as Record<string, unknown>
    if (typeof fields.name === 'string') parsed.name = fields.name
    if (typeof fields.description === 'string') parsed.description = fields.description
  } catch (error) {
    return { parsed, error: 'frontmatter YAML 无效：' + message(error) }
  }
  if (!SKILL_NAME.test(parsed.name)) return { parsed, error: 'name 必须为非空小写 kebab-case 名称。' }
  if (!parsed.description.trim()) return { parsed, error: 'description 必须为非空字符串。' }
  if (!parsed.content.trim()) return { parsed, error: '技能正文为空。' }
  return { parsed }
}

/** Preserve the original non-throwing public parsing helper and return shape. */
export function parseSkillFile(text: string): ParsedSkillFile { return analyze(text).parsed }

function inspect(directory: string, name: string): Inspection {
  const file = join(directory, name, 'SKILL.md')
  let text: string
  try { text = readFileSync(file, 'utf8') }
  catch (error) { return { check: { name, file, ok: false, code: 'unreadable', detail: 'SKILL.md 不可读取：' + message(error) } } }
  const result = analyze(text)
  const error = result.error ?? (result.parsed.name === name ? undefined : 'frontmatter name 与技能目录名称不一致：' + result.parsed.name)
  if (error) return { check: { name, file, ok: false, code: 'invalid', detail: error } }
  return {
    check: { name, file, ok: true, code: 'valid', detail: file },
    parsed: result.parsed,
    fingerprint: createHash('sha256').update(text).digest('hex'),
  }
}

function matches(actual: SkillRegistration | undefined, expected: SkillRegistration): boolean {
  return actual !== undefined && actual.name === expected.name && actual.description === expected.description
    && actual.content === expected.content && actual.resourceBase?.kind === 'directory'
    && resolve(actual.resourceBase.path) === resolve(expected.resourceBase.path)
}

/** File validation is shared by initial loading and every later health call. */
export function createSkillBundle(options: SkillBundleOptions) {
  const names = [...options.names]
  if (new Set(names).size !== names.length || names.some((name) => !SKILL_NAME.test(name))) throw new Error('Skill bundle requires unique kebab-case directory names')
  const inspectAll = () => names.map((name) => inspect(resolve(options.directory()), name))

  return {
    /** Disk-only check; does not imply that any plugin instance registered the skills. */
    checkFiles(): SkillFileCheck[] { return inspectAll().map((result) => result.check) },

    apply(ctx: SkillsPluginContext): void {
      const registrations = new Map<string, Registration>()
      const disposers: Array<() => void> = []
      let disposed = false
      const warn = (detail: string) => {
        const text = '[' + options.plugin + '] ' + detail
        if (ctx.logger?.warn) ctx.logger.warn(text)
        else console.warn(text)
      }
      const dispose = () => {
        if (disposed) return
        disposed = true
        for (const remove of disposers.splice(0).reverse()) {
          try { remove() } catch (error) { warn('卸载失败：' + message(error)) }
        }
      }
      ctx.on?.('dispose', dispose)

      for (const result of inspectAll()) {
        const registration: Registration = {}
        registrations.set(result.check.name, registration)
        if (!result.parsed || !result.fingerprint) { warn(result.check.name + '：' + result.check.detail); continue }
        const definition: SkillRegistration = {
          ...result.parsed,
          resourceBase: { kind: 'directory', path: join(resolve(options.directory()), result.check.name) },
          source: 'runtime',
        }
        try {
          const remove = ctx.skills.register(definition)
          if (typeof remove !== 'function') throw new Error('skills.register 未返回卸载函数。')
          disposers.push(remove)
          registration.definition = definition
          registration.fingerprint = result.fingerprint
        } catch (error) {
          registration.error = message(error)
          warn(result.check.name + ' 注册失败：' + registration.error)
        }
      }

      const health = async (): Promise<{ ok: boolean; plugin: string; skills: SkillHealthCheck[] }> => {
        const skills: SkillHealthCheck[] = []
        for (const result of inspectAll()) {
          const registration = registrations.get(result.check.name)!
          let registered = false
          let registryChecked = false
          let registryError: string | undefined
          if (!disposed && registration.definition) {
            if (typeof ctx.skills.get !== 'function') registryError = '宿主未提供 skills.get，无法确认技能是否实际生效。'
            else {
              try {
                registered = matches(await ctx.skills.get(result.check.name), registration.definition)
                registryChecked = true
              } catch (error) { registryError = '读取宿主技能注册表失败：' + message(error) }
            }
          }
          let code: SkillHealthCheck['code'] = 'ready'
          let detail = result.check.file
          let reloadRequired = false
          if (disposed) { code = 'disposed'; registered = false; detail = '插件已卸载。'; reloadRequired = true }
          else if (!result.check.ok) { code = result.check.code; detail = result.check.detail }
          else if (registration.error) { code = 'registration_failed'; detail = '加载时注册失败：' + registration.error; reloadRequired = true }
          else if (!registration.definition) { code = 'not_registered'; detail = '文件现已有效，但加载时未注册；请重载插件。'; reloadRequired = true }
          else if (result.fingerprint !== registration.fingerprint) { code = 'changed'; detail = '文件已变化，当前注册仍是加载时版本；请重载插件。'; reloadRequired = true }
          else if (registryError) { code = 'registry_unavailable'; detail = registryError }
          else if (!registered) { code = 'inactive'; detail = '宿主注册表中的技能缺失或已被其他内容替代；请重载插件。'; reloadRequired = true }
          skills.push({ ...result.check, ok: code === 'ready', code, detail, fileOk: result.check.ok, registered, registryChecked, reloadRequired })
        }
        return { ok: !disposed && skills.every((skill) => skill.ok), plugin: options.plugin, skills }
      }

      if (typeof ctx.tools?.register === 'function') {
        try {
          const remove = ctx.tools.register({
            name: options.healthTool,
            description: options.plugin + ' 自检：重新验证技能文件、内容与当前宿主注册状态。文件变化或修复后提示重载；自检不修改注册表。',
            parameters: { type: 'object', properties: {} },
            output: {
              schema: { type: 'object', additionalProperties: true },
              render(_args: unknown, value: unknown) {
                const result = value as Awaited<ReturnType<typeof health>>
                const lines = [options.plugin + ' 自检' + (result.ok ? '：技能资源完整且已注册。' : '：发现技能文件或注册状态异常。')]
                for (const skill of result.skills) lines.push('- ' + skill.name + '：' + (skill.ok ? '✅' : '❌ ' + skill.detail))
                return [{ type: 'text', text: lines.join('\n') }]
              },
            },
            execute: health,
          })
          if (typeof remove !== 'function') throw new Error('tools.register 未返回卸载函数。')
          disposers.push(remove)
        } catch (error) { dispose(); throw error }
      }
    },
  }
}
