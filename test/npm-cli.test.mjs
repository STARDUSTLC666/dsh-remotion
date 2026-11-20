import test from 'node:test'
import assert from 'node:assert/strict'
import { posix, win32 } from 'node:path'
import { resolveNpmCli } from '../lib/npm-cli.js'

function fixture({ platform='darwin', execPath='/Applications/DSH NEXT.app/Contents/MacOS/DSH NEXT', env={}, files=[], directories=[], links={} }={}) {
  const paths=platform==='win32'?win32:posix, probes=[]
  const key=value=>{const normalized=paths.normalize(value);return platform==='win32'?normalized.toLowerCase():normalized}
  const knownFiles=new Set(files.map(key)),knownDirectories=new Set(directories.map(key)),knownLinks=new Map(Object.entries(links).map(([a,b])=>[key(a),b]))
  const fileSystem={
    realpathSync(value){probes.push(value);const resolved=knownLinks.get(key(value))??value;if(knownFiles.has(key(resolved))||knownDirectories.has(key(resolved)))return resolved;throw new Error('private-path-token=fixture-secret')},
    statSync(value){if(!knownFiles.has(key(value))&&!knownDirectories.has(key(value)))throw new Error('private-path-token=fixture-secret');return{isFile:()=>knownFiles.has(key(value))}},
  }
  return {resolve:()=>resolveNpmCli({platform,execPath,env,fileSystem}),probes}
}

for(const prefix of ['/opt/homebrew','/usr/local']) test('Electron discovers Homebrew prefix/lib npm at '+prefix,()=>{
  const npm=prefix+'/lib/node_modules/npm/bin/npm-cli.js'
  const f=fixture({env:{PATH:prefix+'/bin:/usr/bin:/bin'},files:[npm]})
  assert.equal(f.resolve(),npm)
})
test('a PATH npm symlink resolves a distro-specific npm CLI without running its wrapper',()=>{
  const npm='/usr/share/nodejs/npm/bin/npm-cli.js'
  const f=fixture({platform:'linux',env:{PATH:'/usr/bin'},files:[npm],links:{'/usr/bin/npm':npm}})
  assert.equal(f.resolve(),npm)
})
test('version-manager symlinked executable and CLI directories are resolved',()=>{
  const node='/opt/node/v24/bin/node',npm='/opt/node/v24/lib/node_modules/npm/bin/npm-cli.js'
  assert.equal(fixture({platform:'linux',execPath:'/usr/local/bin/node',env:{PATH:''},files:[node,npm],links:{'/usr/local/bin/node':node}}).resolve(),npm)
})
test('Windows Node sibling and quoted case-insensitive Path retain spaces as one directory',()=>{
  const npm='C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js'
  assert.equal(fixture({platform:'win32',execPath:'C:\\Apps\\DSH NEXT.exe',env:{Path:'"C:\\Program Files\\nodejs";C:\\Windows'},files:[npm]}).resolve(),npm)
})
test('Windows roaming npm prefix remains supported',()=>{
  const npm='C:\\Users\\Fixture\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js'
  assert.equal(fixture({platform:'win32',execPath:'C:\\Apps\\DSH.exe',env:{APPDATA:'C:\\Users\\Fixture\\AppData\\Roaming'},files:[npm]}).resolve(),npm)
})
test('a candidate directory is rejected and another valid PATH entry still works',()=>{
  const bad='/opt/invalid/lib/node_modules/npm/bin/npm-cli.js',good='/opt/valid/lib/node_modules/npm/bin/npm-cli.js'
  assert.equal(fixture({env:{PATH:'/opt/invalid/bin:/opt/valid/bin'},directories:[bad],files:[good]}).resolve(),good)
})
test('empty and relative PATH entries never cause current-directory probing',()=>{
  const f=fixture({env:{PATH:':.:relative::'},files:['node_modules/npm/bin/npm-cli.js']})
  assert.throws(f.resolve,/定位 npm CLI/)
  assert.ok(f.probes.every(path=>posix.isAbsolute(path)))
  assert.equal(f.probes.some(path=>path==='node_modules/npm/bin/npm-cli.js'),false)
})
test('a regular npm shell wrapper is not accepted or executed',()=>{
  const f=fixture({env:{PATH:'/bin'},files:['/bin/npm']})
  assert.throws(f.resolve,/定位 npm CLI/)
})
test('missing, unreadable and directory candidates fail with useful guidance and no environment secrets',()=>{
  const env={PATH:'/private/token=path-secret/bin',DEEPSEEK_API_KEY:'model-secret'},before=JSON.stringify(env)
  const f=fixture({env,directories:['/private/token=path-secret/lib/node_modules/npm/bin/npm-cli.js']})
  assert.throws(f.resolve,error=>/PATH/.test(error.message)&&!/path-secret|model-secret|fixture-secret|\/private/.test(error.message))
  assert.equal(JSON.stringify(env),before)
})
