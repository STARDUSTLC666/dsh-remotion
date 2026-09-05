import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const name = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).name
const peer = join(root, '..', name === 'dsh-hyperframes' ? 'dsh-remotion' : 'dsh-hyperframes')
test('vendored skill-bundle runtime and regression tests stay in sync', {
  skip: !existsSync(join(peer, 'package.json')) && 'Standalone checkout: sibling development source is unavailable',
}, () => {
  for (const file of ['src/skill-bundle.ts', 'test/skill-bundle.test.mjs', 'test/shared-source.test.mjs']) {
    const normalize = (path) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n')
    assert.equal(normalize(join(root, file)), normalize(join(peer, file)), file + ': run dsh-hyperframes/scripts/sync-skill-bundle.mjs')
  }
})
