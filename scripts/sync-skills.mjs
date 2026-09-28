#!/usr/bin/env node
/**
 * Vendor the official Remotion Agent Skills into this package.
 *
 * Source of truth: https://github.com/remotion-dev/skills at a pinned version.
 * The upstream skill bodies are the product content; only the frontmatter is
 * ours: an Agent Skills `name`/`description` plus the upstream `version`, with
 * every other upstream key (e.g. allowed-tools) dropped so DSH registration
 * stays on the documented keys.
 *
 * Usage:
 *   node scripts/sync-skills.mjs --upstream <path-to-remotion-dev/skills> [--check]
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

const packageRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const { values } = parseArgs({ options: { upstream: { type: 'string' }, check: { type: 'boolean', default: false } } })
if (!values.upstream) throw new Error('--upstream <path to a remotion-dev/skills checkout> is required')

const upstreamSkills = resolve(values.upstream, 'skills')
if (!existsSync(upstreamSkills)) throw new Error('No skills/ directory under ' + values.upstream)
const targetSkills = join(packageRoot, 'skills')
const meta = JSON.parse(readFileSync(join(packageRoot, 'scripts', '.skill-port-meta.json'), 'utf8'))

/** Upstream frontmatter -> our frontmatter: keep only the documented keys. */
const portFrontmatter = (text, fallback) => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text)
  if (!match) throw new Error('Missing frontmatter for ' + fallback.name)
  const version = /^version:\s*(.+)$/m.exec(match[1])?.[1]?.trim()
  const name = /^name:\s*(.+)$/m.exec(match[1])?.[1]?.trim() ?? fallback.name
  const description = /^description:\s*(.+)$/m.exec(match[1])?.[1]?.trim() ?? fallback.description
  if (!version) throw new Error('Missing upstream version for ' + name)
  return ['---', 'name: ' + name, 'description: ' + description, 'version: ' + version, '---', '', text.slice(match[0].length).replace(/^\n+/, '')].join('\n')
}

if (!values.check) rmSync(targetSkills, { recursive: true, force: true })
mkdirSync(targetSkills, { recursive: true })

const skills = readdirSync(upstreamSkills, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort()
const drift = []
for (const skill of skills) {
  const from = join(upstreamSkills, skill)
  const to = join(targetSkills, skill)
  if (!values.check) cpSync(from, to, { recursive: true })
  const fallback = meta[skill]
  if (!fallback) throw new Error('No port metadata for upstream skill ' + skill + '; add it to scripts/.skill-port-meta.json')
  const skillFile = join(to, 'SKILL.md')
  if (!values.check) writeFileSync(skillFile, portFrontmatter(readFileSync(skillFile, 'utf8'), fallback))
}

// --check: the ported tree must match a fresh port of the same upstream
if (values.check) {
  for (const skill of skills) {
    const ported = readFileSync(join(targetSkills, skill, 'SKILL.md'), 'utf8')
    const expected = portFrontmatter(readFileSync(join(upstreamSkills, skill, 'SKILL.md'), 'utf8'), meta[skill])
    if (ported.replace(/\r\n/g, '\n') !== expected.replace(/\r\n/g, '\n')) drift.push(skill)
  }
  if (drift.length) throw new Error('Ported skills drift from upstream: ' + drift.join(', '))
  console.log('Ported skills match upstream ' + join(values.upstream, 'package.json') + ' (' + skills.length + ' skills).')
} else {
  console.log('Ported ' + skills.length + ' skills from ' + upstreamSkills + '. Rebuild and publish.')
}
