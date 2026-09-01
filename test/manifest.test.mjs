import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

test('dsh.bundle.patch 指向存在的补丁文件', () => {
  const pkg = require('../package.json')
  assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml')
  assert.ok(existsSync(new URL('../cordis.patch.yml', import.meta.url)))
})

test('files 白名单包含 lib、skills、双 README', () => {
  const pkg = require('../package.json')
  for (const entry of ['lib', 'skills', 'cordis.patch.yml', 'README.md', 'README.en.md']) {
    assert.ok(pkg.files.includes(entry), entry + ' 应在白名单')
  }
})

test('cordis.patch.yml 插入行名为 dsh-remotion', () => {
  const patch = readFileSync(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
  assert.match(patch, /name: 'dsh-remotion'/)
  assert.match(patch, /- insert:/)
})

test('技能目录随包分发', () => {
  const root = fileURLToPath(new URL('../skills/', import.meta.url))
  let count = 0
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry)
      if (statSync(full).isDirectory()) walk(full)
      else count += 1
    }
  }
  walk(root)
  assert.ok(count >= 39, '文件数 ' + count)
})

test('名称与版本', () => {
  const pkg = require('../package.json')
  assert.equal(pkg.name, 'dsh-remotion')
  assert.match(pkg.version, /^\d+\.\d+\.\d+$/)
})
