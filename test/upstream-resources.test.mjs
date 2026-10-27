import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url)), provenance = JSON.parse(readFileSync(join(root, 'skills/UPSTREAM.json'), 'utf8'))
test('the recorded upstream skill resources are complete and retain their verified contents', () => {
  for (const [name, expected] of Object.entries(provenance.files)) {
    const raw = readFileSync(join(root, 'skills', name)), bytes = /\.(?:md|mjs|js|ts|tsx|yaml|yml|json|geojson|html|css|py|txt|cjs|svg|csv|sh|jsx)$/.test(name) ? Buffer.from(raw.toString().replaceAll('\r\n', '\n')) : raw
    assert.equal(createHash('sha256').update(bytes).digest('hex'), expected, name)
  }
})
