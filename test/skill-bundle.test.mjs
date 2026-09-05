// Shared regression suite, vendored with src/skill-bundle.ts.
import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createSkillBundle, parseSkillFile } from '../lib/skill-bundle.js'

function document(name, body = '# Instructions\nUse this skill.', description = 'A useful skill') {
  return `---\nname: ${name}\ndescription: ${description}\n---\n${body}\n`
}

function world(t, names = ['alpha', 'beta'], behavior = {}) {
  const directory = mkdtempSync(join(tmpdir(), 'dsh-skill-bundle-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const write = (name, text) => {
    mkdirSync(join(directory, name), { recursive: true })
    writeFileSync(join(directory, name, 'SKILL.md'), text)
  }
  for (const name of names) write(name, document(name))
  const registered = new Map()
  const tools = new Map()
  const listeners = []
  const removed = []
  const warnings = []
  let calls = 0
  const ctx = {
    skills: {
      register(definition) {
        calls += 1
        if (behavior.fail === definition.name) throw new Error('Registry refused ' + definition.name)
        if (behavior.noop === definition.name) return () => {}
        registered.set(definition.name, definition)
        return () => {
          removed.push(definition.name)
          if (behavior.failDispose === definition.name) throw new Error('Disposal failed')
          registered.delete(definition.name)
        }
      },
      get(name) { return registered.get(name) },
    },
    tools: {
      register(definition) {
        if (behavior.failHealth) throw new Error('Health registration failed')
        tools.set(definition.name, definition)
        return () => tools.delete(definition.name)
      },
    },
    on(event, listener) { if (event === 'dispose') listeners.push(listener); return () => {} },
    logger: { warn(message) { warnings.push(message) } },
  }
  const bundle = createSkillBundle({ plugin: 'fixture-bundle', healthTool: 'fixture_health', names, directory: () => directory })
  const apply = () => bundle.apply(ctx)
  const dispose = () => { for (const listener of listeners) listener() }
  const health = () => tools.get('fixture_health').execute({})
  return { directory, write, bundle, ctx, registered, tools, removed, warnings, apply, dispose, health, calls: () => calls }
}

test('public parser preserves its return shape and supports BOM/CRLF/multiline YAML', () => {
  const source = '\uFEFF---\r\nname: alpha\r\ndescription: |\r\n  first line\r\n  second line\r\n---\r\n# Body\r\n'
  assert.deepEqual(parseSkillFile(source), { name: 'alpha', description: 'first line\nsecond line\n', content: '# Body\r\n' })
  assert.deepEqual(parseSkillFile('just a body'), { name: '', description: '', content: 'just a body' })
  assert.doesNotThrow(() => parseSkillFile('---\nname: [invalid\n---\nbody'))
})

test('validation rejects unreadable files, broken YAML and incomplete skill content', (t) => {
  const names = ['missing', 'folder', 'broken', 'duplicate', 'blank-body', 'blank-description', 'wrong-name', 'invalid-name', 'not-object']
  const state = world(t, names)
  rmSync(join(state.directory, 'missing', 'SKILL.md'))
  rmSync(join(state.directory, 'folder', 'SKILL.md'))
  mkdirSync(join(state.directory, 'folder', 'SKILL.md'))
  state.write('broken', '---\nname: [invalid\n---\nbody')
  state.write('duplicate', '---\nname: duplicate\nname: duplicate\ndescription: test\n---\nbody')
  state.write('blank-body', document('blank-body', '  \n\t'))
  state.write('blank-description', document('blank-description', 'body', '"   "'))
  state.write('wrong-name', document('other'))
  state.write('invalid-name', document('Bad_Name'))
  state.write('not-object', '---\n- item\n---\nbody')
  const checks = state.bundle.checkFiles()
  assert.equal(checks.length, names.length)
  assert.ok(checks.every((check) => !check.ok))
  assert.equal(checks[0].code, 'unreadable')
  assert.equal(checks[1].code, 'unreadable')
  for (const check of checks.slice(2)) assert.equal(check.code, 'invalid', check.name)
  state.apply()
  assert.equal(state.calls(), 0)
  assert.ok(state.warnings.length >= names.length)
})

test('registration failure is reported while the remaining skills load', async (t) => {
  const state = world(t, undefined, { fail: 'alpha' })
  state.apply()
  assert.ok(state.bundle.checkFiles().every((check) => check.ok))
  const result = await state.health()
  assert.equal(result.ok, false)
  assert.equal(result.skills[0].code, 'registration_failed')
  assert.equal(result.skills[0].registered, false)
  assert.equal(result.skills[1].code, 'ready')
  assert.equal(result.skills[1].registryChecked, true)
  assert.deepEqual(JSON.parse(JSON.stringify(result)), result)
})

test('a repaired initially invalid file requires reload; health never registers it', async (t) => {
  const state = world(t, ['alpha'])
  state.write('alpha', document('alpha', ''))
  state.apply()
  assert.equal((await state.health()).skills[0].code, 'invalid')
  state.write('alpha', document('alpha'))
  const repaired = (await state.health()).skills[0]
  assert.equal(repaired.fileOk, true)
  assert.equal(repaired.code, 'not_registered')
  assert.equal(repaired.reloadRequired, true)
  assert.equal(state.calls(), 0)
  state.dispose()
  state.apply()
  assert.equal((await state.health()).ok, true)
})

test('changed files stay unhealthy until reload; restored original bytes stay current', async (t) => {
  const state = world(t, ['alpha'])
  state.apply()
  state.write('alpha', document('alpha', '# New instructions'))
  const changed = (await state.health()).skills[0]
  assert.equal(changed.code, 'changed')
  assert.equal(changed.registered, true)
  assert.equal(changed.reloadRequired, true)
  assert.equal(state.calls(), 1)
  rmSync(join(state.directory, 'alpha', 'SKILL.md'))
  assert.equal((await state.health()).skills[0].code, 'unreadable')
  state.write('alpha', document('alpha'))
  assert.equal((await state.health()).ok, true)
})

test('registry removal/replacement and no-op registration cannot produce false health', async (t) => {
  const state = world(t, ['alpha'])
  state.apply()
  const original = state.registered.get('alpha')
  state.registered.delete('alpha')
  assert.equal((await state.health()).skills[0].code, 'inactive')
  state.registered.set('alpha', { ...original, content: 'another plugin' })
  assert.equal((await state.health()).ok, false)
  state.registered.set('alpha', original)
  assert.equal((await state.health()).ok, true)
  const duplicate = world(t, ['alpha'], { noop: 'alpha' })
  duplicate.registered.set('alpha', { ...original, resourceBase: { kind: 'directory', path: '/another-plugin' } })
  duplicate.apply()
  assert.equal((await duplicate.health()).skills[0].code, 'inactive')
})

test('missing or failed registry lookup reports unavailable instead of assuming registration', async (t) => {
  const state = world(t, ['alpha'])
  state.apply()
  delete state.ctx.skills.get
  assert.equal((await state.health()).skills[0].code, 'registry_unavailable')
  state.ctx.skills.get = () => { throw new Error('Registry unavailable') }
  const check = (await state.health()).skills[0]
  assert.equal(check.ok, false)
  assert.equal(check.registryChecked, false)
  assert.match(check.detail, /Registry unavailable/)
})

test('dispose is idempotent, releases every registration despite an error, and invalidates health', async (t) => {
  const state = world(t, undefined, { failDispose: 'beta' })
  state.apply()
  const health = state.tools.get('fixture_health')
  state.dispose()
  state.dispose()
  assert.deepEqual(state.removed.sort(), ['alpha', 'beta'])
  assert.equal(state.tools.size, 0)
  assert.equal(state.registered.has('alpha'), false)
  assert.ok(state.warnings.some((warning) => warning.includes('Disposal failed')))
  const result = await health.execute({})
  assert.equal(result.ok, false)
  assert.ok(result.skills.every((check) => check.code === 'disposed'))
})

test('health cannot report ready if disposal happens during a registry lookup', async (t) => {
  const state = world(t, ['alpha'])
  state.apply()
  const original = state.registered.get('alpha')
  let settle
  state.ctx.skills.get = () => new Promise((resolve) => { settle = resolve })
  const pending = state.health()
  state.dispose()
  settle(original)
  assert.equal((await pending).ok, false)
})

test('health registration failure releases already registered skills', (t) => {
  const state = world(t, undefined, { failHealth: true })
  assert.throws(() => state.apply(), /Health registration failed/)
  assert.equal(state.registered.size, 0)
  state.dispose()
  assert.deepEqual(state.removed.sort(), ['alpha', 'beta'])
})
