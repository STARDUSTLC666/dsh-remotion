import { readFileSync, writeFileSync } from 'node:fs'
const engine = JSON.parse(readFileSync('package.json', 'utf8')).name.slice(4)
if (!['hyperframes','remotion'].includes(engine)) throw new Error('Unexpected package')
writeFileSync('lib/client.js', readFileSync('templates/client.js', 'utf8').replaceAll('__ENGINE__', engine))
