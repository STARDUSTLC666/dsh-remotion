import assert from 'node:assert/strict'
import { createHash, randomUUID } from 'node:crypto'
import { chmodSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, resolve, sep } from 'node:path'
import YAML from 'yaml'

const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const textFile = /\.(?:md|mjs|js|ts|tsx|yaml|yml|json|geojson|html|css|py|txt|cjs|svg|csv|sh|jsx)$/
function safeName(name) {
  assert.ok(typeof name === 'string' && name && !/[\x00-\x1f:]/.test(name) && !name.includes('\\') && !name.startsWith('/') && !name.split('/').some(part => !part || part === '.' || part === '..'), 'Unsafe source-relative path')
  return name
}
function walk(root, prefix = '') {
  const files = []
  for (const entry of readdirSync(join(root, prefix), { withFileTypes: true })) {
    const name = prefix ? prefix + '/' + entry.name : entry.name
    assert.equal(entry.isSymbolicLink(), false, 'Symlinked skill source: ' + name)
    if (entry.isDirectory()) files.push(...walk(root, name))
    else { assert.ok(entry.isFile(), 'Non-file skill source: ' + name); files.push(name) }
  }
  return files.sort()
}
function frontmatter(bytes, name) {
  const text = bytes.toString('utf8').replaceAll('\r\n', '\n')
  const match = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(text)
  assert.ok(match, 'Missing skill frontmatter: ' + name)
  const doc = YAML.parseDocument(match[1], { uniqueKeys: true })
  assert.equal(doc.errors.length, 0, 'Invalid skill frontmatter: ' + name)
  const value = doc.toJS()
  assert.ok(value && typeof value === 'object' && !Array.isArray(value))
  assert.equal(value.name, name, 'Skill name does not match directory')
  assert.ok(typeof value.description === 'string' && value.description.trim(), 'Missing description: ' + name)
  assert.ok(text.slice(match[0].length).trim(), 'Empty skill body: ' + name)
  return { value, body: text.slice(match[0].length).trimStart() }
}
export function dshContext(engine, version) {
  const lines = ['## DSH package context', '',
    `Apply this DSH section only when an ancestor package.json identifies the installed dsh-${engine} package. A standalone copy without that DSH package follows the official standalone instructions below. In DSH, plugin management owns updates: do not run standalone skills add/update, remotion skills, or hyperframes skills to replace this bundle. Treat the installed plugin as read-only, preserve existing projects and lockfiles, and upgrade a user project only when requested. These DSH rules override standalone setup and launcher examples for this installed package.`, '',
    `For DSH-managed template videos use ${engine}_project (list/create/get/update) and ${engine}_render (prepare/preview/render/job/cancel). Check readiness; explicitly prepare on first use and poll the job until done before preview/export. Use the saved project id and current revision; query/cancel with the job id. Dependency installation alone is not readiness. Never fabricate ready.json or edit the managed runtime. The workbench pins ${engine} ${version}; its local templates do not implement every advanced upstream workflow.`, '',
    'Preparation needs Node.js 22.19+ or 24+ with npm visible to the desktop app. Homebrew commonly uses /opt/homebrew/bin (Apple Silicon) or /usr/local/bin (Intel), with npm in prefix/lib/node_modules. Linux symlinks and Windows paths with spaces are supported. A terminal PATH can differ from an already running desktop app: restart DSH after changing its launch environment and retry the saved job. Do not reinstall over this plugin, execute shell wrappers as JavaScript, or copy secrets/whole environment dumps into diagnostics.', '']
  if (engine === 'hyperframes') lines.push('For an advanced user-owned project, replace every upstream npx/bare hyperframes or plugin-cli.mjs example with `node "<PLUGIN_ROOT>/scripts/dsh-hyperframes-cli.mjs" <command> <args...>`. Resolve <PLUGIN_ROOT> from this installed bundle, never a source checkout. Run bundled helpers through the same wrapper using `--script <absolute-path-to-the-helper-in-this-installed-bundle> ...`; nested helpers keep this pinned CLI and the official safe npm working directory. Run from the user project, not the plugin directory; do not fall back to a project-local CLI. FFmpeg and FFprobe are required; HYPERFRAMES_BROWSER_PATH selects an explicitly validated rendering browser.', '')
  else lines.push('For advanced user-owned React projects, follow their existing package manager and installed Remotion version in the project directory. The managed runtime is separate: do not change it to match another project. Export/render only when the user requests the resulting video.', '')
  return lines.join('\n')
}
function portSkill(bytes, name, engine, version) {
  const { value, body } = frontmatter(bytes, name)
  if (engine === 'remotion') assert.equal(String(value.version), version, 'Skill/runtime version mismatch: ' + name)
  return Buffer.from(['---', 'name: ' + JSON.stringify(name), 'description: ' + JSON.stringify(value.description), 'version: ' + JSON.stringify(version), '---', '', dshContext(engine, version), body].join('\n').replace(/\n*$/, '\n'))
}

/** Pure preflight: validate all metadata and source bytes before touching skills/. */
export function planBundle({ packageRoot, upstreamRoot, engine }) {
  packageRoot = resolve(packageRoot); upstreamRoot = resolve(upstreamRoot)
  assert.ok(['remotion', 'hyperframes'].includes(engine))
  assert.equal(JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8')).name, 'dsh-' + engine)
  const release = JSON.parse(readFileSync(join(upstreamRoot, 'source-release.json'), 'utf8'))
  const meta = JSON.parse(readFileSync(join(packageRoot, 'scripts/.skill-port-meta.json'), 'utf8'))
  assert.equal(release.schemaVersion, 1); assert.equal(release.engine, engine)
  assert.match(release.version, /^\d+\.\d+\.\d+$/)
  assert.equal(release.npm?.name, engine); assert.equal(release.npm?.version, release.version)
  assert.match(release.npm?.integrity ?? '', /^sha512-[A-Za-z0-9+/]+=*$/)
  const sourceRoot = join(upstreamRoot, 'skills'), names = [...release.canonical].sort()
  assert.equal(new Set(names).size, names.length)
  for (const name of names) assert.match(name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid canonical skill name')
  assert.deepEqual(names, Object.keys(meta.canonical).sort(), 'Review port metadata before accepting added/removed official skills')
  const sourceNames = walk(sourceRoot)
  assert.deepEqual(sourceNames, Object.keys(release.files).sort(), 'Source manifest must cover every upstream file')
  const tree = new Map(), origins = {}, adaptations = {}, packagedPaths = {}, modes = {}
  for (const name of sourceNames) {
    safeName(name)
    const source = join(sourceRoot, ...name.split('/'))
    assert.ok(lstatSync(source).isFile())
    const bytes = readFileSync(source), origin = release.files[name]
    assert.equal(hash(bytes), origin.sha256, 'Upstream source integrity mismatch: ' + name)
    assert.ok(['git', 'npm'].includes(origin.kind), 'Missing per-file origin')
    if (origin.kind === 'npm') {
      assert.equal(origin.package, engine); assert.equal(origin.version, release.version)
      assert.equal(origin.integrity, release.npm.integrity, 'Per-file npm release integrity differs')
    } else {
      assert.match(origin.commit ?? '', /^[a-f0-9]{40}$/)
      assert.equal(origin.commit, release.commit ?? release.gitHead, 'Per-file Git snapshot differs')
    }
    const match = /^([^/]+)\/SKILL\.md$/.exec(name)
    let final = textFile.test(name) ? Buffer.from(bytes.toString('utf8').replaceAll('\r\n', '\n')) : bytes
    if (match) { assert.ok(names.includes(match[1]), 'Unlisted skill entry'); final = portSkill(bytes, match[1], engine, release.version) }
    tree.set(name, final); origins[name] = origin; modes[name] = origin.mode ?? 0o644
    if (!bytes.equals(final)) adaptations[name] = { sourceSha256: hash(bytes), packagedSha256: hash(final), reason: match ? 'Documented DSH frontmatter and managed-runtime context; upstream body retained.' : 'Normalize text line endings to LF.' }
    if (basename(name) === '.gitignore') {
      const alias = name.slice(0, -'.gitignore'.length) + 'UPSTREAM.gitignore'
      tree.set(alias, final); packagedPaths[name] = alias; modes[alias] = modes[name]
    }
  }
  for (const name of names) assert.ok(tree.has(name + '/SKILL.md'), 'Missing reviewed skill entry: ' + name)
  const aliases = Object.keys(meta.aliases ?? {}).sort()
  for (const name of aliases) {
    const alias = meta.aliases[name]
    safeName(name)
    assert.match(name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid compatibility skill name')
    assert.ok(!names.includes(name) && names.includes(alias.target), 'Invalid compatibility alias: ' + name)
    tree.set(name + '/SKILL.md', Buffer.from(['---', 'name: ' + JSON.stringify(name), 'description: ' + JSON.stringify(alias.description), 'version: ' + JSON.stringify(release.version), '---', '', dshContext(engine, release.version), '## Compatibility entry', '', `The current official release merged this workflow into the \`${alias.target}\` skill. Load \`${alias.target}\` from the DSH skill registry and follow its bundled instructions. Preserve existing projects and dependencies. This entry retains the previous DSH skill name; do not recreate the retired workflow or download a standalone skill.`, ''].join('\n')))
    modes[name + '/SKILL.md'] = 0o644
  }
  for (const [name, content] of Object.entries(meta.extraFiles ?? {})) { safeName(name); tree.set(name, Buffer.from(content)); modes[name] = 0o644 }
  const npm = release.npm
  const provenance = { name: engine, version: release.version, repository: release.repository,
    ...(release.commit ? { commit: release.commit } : {}), ...(release.gitHead ? { gitHead: release.gitHead } : {}),
    tarball: npm.tarball, integrity: npm.integrity, npmGitHead: npm.npmGitHead ?? null,
    checkedAt: release.checkedAt, canonical: names, compatibilityAliases: aliases,
    adaptation: 'Official pinned release resources with DSH frontmatter/context adaptations and preserved compatibility names. Per-file origins and adapted hashes are explicit.',
    distribution: { npm: { name: engine, version: release.version, tarball: npm.tarball, integrity: npm.integrity, sha256: npm.archiveSha256 }, policy: release.sourcePolicy ?? 'Pinned official skills repository snapshot paired with the same runtime version; repository and npm commits are not claimed identical.' },
    ...(release.sourceArchive ? { sourceArchive: release.sourceArchive } : {}),
    files: Object.fromEntries([...tree].filter(([name]) => !Object.values(packagedPaths).includes(name)).map(([name, bytes]) => [name, hash(bytes)])),
    sourceFiles: origins, adaptedFiles: adaptations, packagedPaths,
    packagingNote: 'npm-filtered .gitignore files ship under recorded UPSTREAM.gitignore aliases with identical bytes.' }
  tree.set('UPSTREAM.json', Buffer.from(JSON.stringify(provenance, null, 2) + '\n')); modes['UPSTREAM.json'] = 0o644
  return { packageRoot, engine, version: release.version, names: [...names, ...aliases].sort(), tree, modes, provenance }
}

export function checkBundle(plan) {
  const target = join(plan.packageRoot, 'skills')
  assert.ok(existsSync(target), 'Missing packaged skills directory')
  assert.deepEqual(walk(target), [...plan.tree.keys()].sort(), 'Packaged skill file list drift')
  for (const [name, bytes] of plan.tree) {
    const current = readFileSync(join(target, ...name.split('/')))
    const normalized = textFile.test(name) ? Buffer.from(current.toString('utf8').replaceAll('\r\n', '\n')) : current
    assert.ok(normalized.equals(bytes), 'Packaged skill content drift: ' + name)
  }
}

/** Swap a fully validated tree, restoring the old tree if installation fails. */
export function applyBundle(plan, { verify = checkBundle } = {}) {
  const id = randomUUID(), stage = join(plan.packageRoot, '.skills-stage-' + id), backup = join(plan.packageRoot, '.skills-backup-' + id), rejected = join(plan.packageRoot, '.skills-rejected-' + id), target = join(plan.packageRoot, 'skills')
  const removeOwned = path => { assert.equal(dirname(resolve(path)), plan.packageRoot); assert.ok(/^\.skills-(?:stage|backup|rejected)-/.test(basename(path))); rmSync(path, {recursive:true,force:true}) }
  // Validate the complete write set again at the filesystem boundary, including
  // callers that changed a previously prepared plan before applying it.
  for (const name of plan.tree.keys()) safeName(name)
  let moved = false
  try {
    if (existsSync(target)) assert.equal(lstatSync(target).isSymbolicLink(), false, 'Refuse a symlinked target skills directory')
    mkdirSync(stage)
    for (const [name, bytes] of plan.tree) {
      const file=resolve(stage,...name.split('/'))
      assert.ok(file.startsWith(stage+sep), 'Skill destination escapes the owned stage')
      mkdirSync(dirname(file),{recursive:true}); writeFileSync(file,bytes); chmodSync(file,plan.modes[name]??0o644)
    }
    if (existsSync(target)) { renameSync(target, backup); moved = true }
    try { renameSync(stage, target) } catch (error) { if(moved){renameSync(backup,target);moved=false} throw error }
    try { verify(plan) }
    catch (error) {
      // Keep the old tree until post-write verification passes. A rejected new
      // tree is moved aside before restoring the original, never merged into it.
      renameSync(target, rejected)
      if (moved) { renameSync(backup, target); moved = false }
      removeOwned(rejected)
      throw error
    }
    if (moved) removeOwned(backup)
  } finally {
    if (existsSync(stage)) removeOwned(stage)
    // On an exceptional rollback/rename error, retain backup/rejected trees
    // for recovery instead of deleting the only remaining original bundle.
  }
}
export function syncBundle(options) {
  const plan = planBundle(options)
  if (options.check) checkBundle(plan)
  else applyBundle(plan)
  return {ok:true,check:Boolean(options.check),engine:plan.engine,version:plan.version,registeredSkills:plan.names.length,canonicalSkills:plan.provenance.canonical.length,compatibilityAliases:plan.provenance.compatibilityAliases.length,files:plan.tree.size}
}
