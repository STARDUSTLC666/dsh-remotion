/**
 * dsh-remotion: packaged video skills with disk and registry health checks.
 * The portable implementation lives in skill-bundle.ts; this entry only
 * supplies the package identity, skill names and resource directory.
 */
import { fileURLToPath } from 'node:url'
import { createSkillBundle, type SkillsPluginContext } from './skill-bundle.js'

export { parseSkillFile } from './skill-bundle.js'
export type { SkillRegistration, SkillsPluginContext } from './skill-bundle.js'

export const name = 'remotion-skills'
export const inject = ['skills', 'tools']

export const SKILL_NAMES = [
  "remotion-best-practices",
  "remotion-captions",
  "remotion-create",
  "remotion-docs",
  "remotion-interactivity",
  "remotion-maps",
  "remotion-markup",
  "remotion-multimedia",
  "remotion-render",
  "remotion-saas",
  "remotion-studio",
  "remotion-upgrade",
] as const

/** Absolute resource root shipped in this independently installable package. */
export function bundledSkillsDir(): string {
  return fileURLToPath(new URL('../skills/', import.meta.url))
}

const bundle = createSkillBundle({
  plugin: 'dsh-remotion',
  healthTool: 'remotion_health',
  names: SKILL_NAMES,
  directory: bundledSkillsDir,
})

/** Re-read and validate disk resources; runtime state is checked by the health tool. */
export function checkBundledSkills() { return bundle.checkFiles() }

/** Register this package's skills and its read-only health tool. */
export function apply(ctx: SkillsPluginContext): void { bundle.apply(ctx) }
