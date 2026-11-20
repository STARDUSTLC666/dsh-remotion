import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { applyBundle, checkBundle, planBundle } from '../scripts/lib/upstream-sync.mjs'

const hash = value => createHash('sha256').update(value).digest('hex')
const save = (file, value) => { mkdirSync(dirname(file), {recursive:true}); writeFileSync(file,typeof value==='string'?value:JSON.stringify(value)) }
function fixture(t) {
  const root=mkdtempSync(join(dirname(fileURLToPath(import.meta.url)),'.upstream-fixture-'))
  t.after(()=>rmSync(root,{recursive:true,force:true}))
  const packageRoot=join(root,'package'),upstreamRoot=join(root,'upstream'),engine='remotion',name='remotion-example'
  save(join(packageRoot,'package.json'),{name:'dsh-remotion',version:'0.0.0'})
  save(join(packageRoot,'scripts/.skill-port-meta.json'),{canonical:{[name]:{name,description:'A reviewed upstream example skill'}},aliases:{}})
  save(join(packageRoot,'skills/keep.txt'),'The previous installed bundle must survive invalid input.\n')
  const skill='---\nname: '+name+'\ndescription: A reviewed upstream example skill\nversion: 4.0.545\n---\n\n# Original official body\nPreserve the upstream instructions.\n'
  save(join(upstreamRoot,'skills',name,'SKILL.md'),skill)
  save(join(upstreamRoot,'skills',name,'reference.md'),'Original reference bytes.\n')
  const files=Object.fromEntries([['SKILL.md',skill],['reference.md','Original reference bytes.\n']].map(([file,bytes])=>[name+'/'+file,{kind:'git',commit:'a'.repeat(40),sha256:hash(bytes)}]))
  const release={schemaVersion:1,engine,version:'4.0.545',repository:'https://github.com/remotion-dev/skills',commit:'a'.repeat(40),checkedAt:'2026-11-21',canonical:[name],npm:{name:engine,version:'4.0.545',tarball:'https://registry.npmjs.org/remotion/-/remotion-4.0.545.tgz',integrity:'sha512-Zml4dHVyZQ=='},files}
  save(join(upstreamRoot,'source-release.json'),release)
  return {root,packageRoot,upstreamRoot,engine,name,release,options:{packageRoot,upstreamRoot,engine}}
}
function unchanged(f) {
  assert.equal(readFileSync(join(f.packageRoot,'skills/keep.txt'),'utf8'),'The previous installed bundle must survive invalid input.\n')
  assert.equal(readdirSync(f.packageRoot).some(name=>name.startsWith('.skills-')),false)
}

test('sync preflight rejects a newly added skill before changing the installed bundle',t=>{
  const f=fixture(t);f.release.canonical.push('remotion-new-unreviewed');save(join(f.upstreamRoot,'source-release.json'),f.release)
  assert.throws(()=>planBundle(f.options),/Review port metadata/);unchanged(f)
})
test('sync preflight rejects corrupt resource bytes without leaving a partial bundle',t=>{
  const f=fixture(t);save(join(f.upstreamRoot,'skills',f.name,'reference.md'),'unexpected changed bytes')
  assert.throws(()=>planBundle(f.options),/source integrity/);unchanged(f)
})
test('sync preflight refuses a skill/runtime mismatch and a forged per-file commit',t=>{
  const f=fixture(t);f.release.npm.version='4.0.544';save(join(f.upstreamRoot,'source-release.json'),f.release)
  assert.throws(()=>planBundle(f.options));unchanged(f)
  f.release.npm.version='4.0.545';f.release.files[f.name+'/SKILL.md'].commit='b'.repeat(40);save(join(f.upstreamRoot,'source-release.json'),f.release)
  assert.throws(()=>planBundle(f.options),/Git snapshot differs/);unchanged(f)
})
test('a complete sync regenerates provenance and records only the documented DSH adaptations',t=>{
  const f=fixture(t),plan=planBundle(f.options);unchanged(f);applyBundle(plan);checkBundle(plan)
  assert.equal(existsSync(join(f.packageRoot,'skills/keep.txt')),false)
  const provenance=JSON.parse(readFileSync(join(f.packageRoot,'skills/UPSTREAM.json'),'utf8'))
  assert.equal(provenance.version,'4.0.545');assert.equal(provenance.canonical.length,1)
  assert.equal(provenance.sourceFiles[f.name+'/reference.md'].sha256,provenance.files[f.name+'/reference.md'])
  assert.equal(provenance.adaptedFiles[f.name+'/SKILL.md'].packagedSha256,provenance.files[f.name+'/SKILL.md'])
  assert.match(readFileSync(join(f.packageRoot,'skills',f.name,'SKILL.md'),'utf8'),/remotion_render/)
  assert.equal(readdirSync(f.packageRoot).some(name=>name.startsWith('.skills-')),false)
})
test('read-only sync checking detects resource and file-list drift without silently repairing it',t=>{
  const f=fixture(t),plan=planBundle(f.options);applyBundle(plan)
  const file=join(f.packageRoot,'skills',f.name,'reference.md');save(file,'edited resource\n')
  assert.throws(()=>checkBundle(plan),/content drift/);assert.equal(readFileSync(file,'utf8'),'edited resource\n')
  save(file,'Original reference bytes.\n');save(join(f.packageRoot,'skills/unlisted.txt'),'extra')
  assert.throws(()=>checkBundle(plan),/file list drift/)
})
test('malformed compatibility aliases fail preflight and never escape the skills staging tree',t=>{
  const f=fixture(t),file=join(f.packageRoot,'scripts/.skill-port-meta.json')
  const meta=JSON.parse(readFileSync(file,'utf8'))
  meta.aliases={'../unexpected-outside-skills':{target:f.name,description:'A malicious alias path'}};save(file,meta)
  assert.throws(()=>planBundle(f.options),/Unsafe source-relative path/);unchanged(f)
  assert.equal(existsSync(join(f.packageRoot,'unexpected-outside-skills')),false)
  meta.aliases={};save(file,meta)
  const plan=planBundle(f.options);plan.tree.set('../escaped.txt',Buffer.from('outside'))
  assert.throws(()=>applyBundle(plan),/Unsafe source-relative path/);unchanged(f)
  assert.equal(existsSync(join(f.packageRoot,'escaped.txt')),false)
})
test('a post-write verification failure restores the complete previous bundle before cleanup',t=>{
  const f=fixture(t),plan=planBundle(f.options)
  assert.throws(()=>applyBundle(plan,{verify:()=>{throw new Error('injected post-write verification failure')}}),/injected post-write/)
  unchanged(f)
  assert.deepEqual(readdirSync(join(f.packageRoot,'skills')),['keep.txt'])
})
