import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const normalize = value => value.replace(/\r\n/g, '\n')
function compactCssText(css) {
  let out = ''
  let quote = ''
  for (let i = 0; i < css.length; i++) {
    const ch = css[i]
    if (quote) {
      out += ch
      if (ch === '\\' && i + 1 < css.length) { out += css[++i]; continue }
      if (ch === quote) quote = ''
      continue
    }
    if (ch === '"' || ch === "'") { quote = ch; out += ch; continue }
    if (ch === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2)
      if (end < 0) break
      i = end + 1
      continue
    }
    out += ch
  }
  return out.split('\n').map(line => line.trim()).filter(Boolean).join('\n')
}
function compactWorkbenchKit(source) {
  const startMarker = '  const styles = `\n'
  const endMarker = '\n`;\n'
  const start = source.indexOf(startMarker)
  if (start < 0) return source
  const bodyStart = start + startMarker.length
  const end = source.indexOf(endMarker, bodyStart)
  if (end < 0) return source
  return source.slice(0, bodyStart) + compactCssText(source.slice(bodyStart, end)) + source.slice(end)
}
const kit = compactWorkbenchKit(normalize(readFileSync(join(root, 'templates/workbench-ui.js'), 'utf8')))
let client = normalize(readFileSync(join(root, 'templates/client.js'), 'utf8'))
if (client.includes('__ENGINE__')) {
  const name = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).name
  if (!['dsh-hyperframes', 'dsh-remotion'].includes(name)) throw new Error('Unknown media engine package')
  client = client.replaceAll('__ENGINE__', name.slice(4))
}
const directory = join(root, 'templates/panels')
const parts = existsSync(directory) ? readdirSync(directory).filter(name => name.endsWith('.js')).sort().map(name => normalize(readFileSync(join(directory, name), 'utf8'))).join('\n') : ''
const marker = client.includes('const W = createWorkbenchUI(React, require);')
  ? 'const W = createWorkbenchUI(React, require);'
  : 'const W = createWorkbenchUI(React);'
if (!client.includes(marker)) throw new Error('Workbench source marker missing')
client = client.replace(marker, () => marker + '\n' + parts)
mkdirSync(join(root, 'lib'), { recursive: true })
writeFileSync(join(root, 'lib/client.js'), '// Generated from templates/client.js, templates/panels/ and templates/workbench-ui.js. Edit the sources.\n(function () {\n' + kit + '\n' + client + '\n})();\n')
