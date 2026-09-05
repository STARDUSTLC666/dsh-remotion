import { test } from 'node:test'
import assert from 'node:assert/strict'
import { apply, checkBundledSkills, inject } from '../lib/index.js'

test('checkBundledSkills 随包技能资源完整', () => {
  const result = checkBundledSkills()
  assert.ok(result.length >= 1)
  for (const item of result) assert.equal(item.ok, true, item.detail)
})

test('apply 注册 remotion_health 工具且自检通过', async () => {
  const defs = []
  const registered = new Map()
  const ctx = {
    skills: {
      register(def) { registered.set(def.name, def); return () => registered.delete(def.name) },
      get(name) { return registered.get(name) },
    },
    tools: { register(def) { defs.push(def); return () => {} } },
    on: () => () => {},
  }
  apply(ctx)
  assert.ok(inject.includes('tools'))
  const health = defs.find((d) => d.name === 'remotion_health')
  assert.ok(health)
  const value = await health.execute({})
  assert.equal(value.ok, true)
  assert.ok(value.skills.every((skill) => skill.registered && skill.registryChecked && skill.fileOk))
  const blocks = health.output.render({}, value)
  assert.match(blocks[0].text, /资源完整/)
})
