import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { MEDIA_VERSIONS, SKILL_NAMES, checkBundledSkills } from '../lib/index.js'

const root=fileURLToPath(new URL('../',import.meta.url))
const pkg=JSON.parse(readFileSync(join(root,'package.json'),'utf8'))
const engine=pkg.name.slice('dsh-'.length)
const provenance=JSON.parse(readFileSync(join(root,'skills/UPSTREAM.json'),'utf8'))

test('official skill entries, preserved aliases, registration and managed runtime use the same release',()=>{
  assert.equal(provenance.version,MEDIA_VERSIONS[engine])
  assert.deepEqual([...SKILL_NAMES].sort(),[...provenance.canonical,...provenance.compatibilityAliases].sort())
  assert.equal(SKILL_NAMES.length,engine==='remotion'?13:23)
  assert.ok(checkBundledSkills().every(item=>item.ok))
  for(const name of SKILL_NAMES){
    const text=readFileSync(join(root,'skills',name,'SKILL.md'),'utf8')
    assert.ok(text.includes('version: '+JSON.stringify(provenance.version)),name)
    assert.ok(text.includes(engine+'_project')&&text.includes(engine+'_render'),name+' managed workflow')
    assert.match(text,/Homebrew|\/opt\/homebrew\/bin/)
  }
  if(engine==='hyperframes'){
    assert.equal(JSON.parse(readFileSync(join(root,'plugin.json'),'utf8')).version,provenance.version)
    for(const name of ['figma','hyperframes-registry','remotion-to-hyperframes','slideshow','reverse-any-video','style-sampling'])assert.ok(SKILL_NAMES.includes(name))
    assert.equal(provenance.compatibilityAliases.length,14)
  }else assert.ok(SKILL_NAMES.includes('remotion-license'))
})
test('provenance distinguishes immutable upstream bytes from documented DSH adaptations',()=>{
  assert.ok(Object.keys(provenance.sourceFiles).length>0)
  for(const[name,origin]of Object.entries(provenance.sourceFiles)){
    assert.ok(['git','npm'].includes(origin.kind),name)
    if(origin.kind==='npm')assert.equal(origin.version,provenance.version)
    const adaptation=provenance.adaptedFiles[name]
    if(adaptation){assert.equal(adaptation.sourceSha256,origin.sha256);assert.equal(adaptation.packagedSha256,provenance.files[name])}
    else assert.equal(provenance.files[name],origin.sha256,name+' exact upstream bytes')
  }
  if(engine==='hyperframes'){
    const origins=Object.values(provenance.sourceFiles)
    assert.equal(origins.filter(item=>item.kind==='npm').length,239)
    assert.equal(origins.filter(item=>item.kind==='git').length,101)
  }
})
test('DSH advanced CLI instructions point to the installed wrapper and keep source checkouts out of execution',()=>{
  for(const name of provenance.canonical){
    const text=readFileSync(join(root,'skills',name,'SKILL.md'),'utf8')
    assert.doesNotMatch(text,/E:[\\/]deepseek[\\/]work[\\/]/i)
    if(engine==='hyperframes')assert.ok(text.includes('<PLUGIN_ROOT>/scripts/dsh-hyperframes-cli.mjs'))
    assert.match(text,/installed plugin as read-only/)
  }
})
