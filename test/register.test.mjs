import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { apply, inject, SKILL_NAMES, bundledSkillsDir, parseSkillFile } from '../lib/index.js'

function makeFakeCtx() {
  const registered = []
  const listeners = {}
  const ctx = {
    skills: {
      register(definition) {
        registered.push(definition)
        return () => {
          const index = registered.indexOf(definition)
          if (index >= 0) registered.splice(index, 1)
        }
      },
    },
    on(event, listener) {
      (listeners[event] ??= []).push(listener)
      return () => {}
    },
  }
  return { ctx, registered, listeners }
}

test('inject 声明 skills', () => {
  assert.deepEqual(inject, ['skills', 'tools'])
})

test('apply 注册 1 个技能且字段完整', () => {
  const { ctx, registered } = makeFakeCtx()
  apply(ctx)
  assert.equal(registered.length, 1)
  const names = registered.map((s) => s.name).sort()
  assert.deepEqual(names, ["remotion"])
  for (const skill of registered) {
    assert.ok(skill.description.length > 20, skill.name + ' 有描述')
    assert.ok(skill.content.length > 200, skill.name + ' 有正文')
    assert.equal(skill.resourceBase.kind, 'directory')
    assert.ok(existsSync(skill.resourceBase.path), skill.name + ' resourceBase 存在')
    assert.ok(existsSync(join(skill.resourceBase.path, 'SKILL.md')), skill.name + ' SKILL.md 存在')
  }
})

test('dispose 卸载全部技能', () => {
  const { ctx, registered, listeners } = makeFakeCtx()
  apply(ctx)
  assert.equal(registered.length, 1)
  for (const listener of listeners.dispose ?? []) listener()
  assert.equal(registered.length, 0)
})

test('bundledSkillsDir 指向打包目录', () => {
  assert.ok(bundledSkillsDir().replace(/[\\/]+$/, '').endsWith('skills'))
  assert.ok(existsSync(bundledSkillsDir()))
})

test('parseSkillFile 处理真实文件', () => {
  const text = readFileSync(join(bundledSkillsDir(), 'remotion', 'SKILL.md'), 'utf8')
  const parsed = parseSkillFile(text)
  assert.equal(parsed.name, 'remotion')
  assert.ok(parsed.description.length > 10)
  assert.ok(parsed.content.includes('## ') || parsed.content.includes('# '))
})
