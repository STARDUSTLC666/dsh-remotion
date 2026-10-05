import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, readFile, stat, rm, symlink } from 'node:fs/promises'
import { join, resolve, dirname, relative, isAbsolute } from 'node:path'
import { fileURLToPath } from 'node:url'
import { unzipSync } from 'fflate'
import { MediaStore } from '../lib/media-store.js'
import { MediaWorkbench, installMediaWorkbench } from '../lib/media-workbench.js'
import { projectSources, validateFields, MEDIA_VERSIONS } from '../lib/media-templates.js'
const testRoot = dirname(fileURLToPath(import.meta.url))
const fields = { template: 'title', title: '清晰交付', body: '编辑、预览、导出。', format: 'landscape', duration: 3 }
test('official host output contract permits both media tools and keeps uninstall hooks', () => {
  const registered = [], cleanup = [], carriers = []
  const ctx = {
    tools: { register(tool) {
      assert.ok(tool.output?.schema && typeof tool.output.render === 'function', 'DSH requires structured output with a renderer')
      registered.push(tool); return () => registered.splice(registered.indexOf(tool), 1)
    } },
    on(event, fn) { if (event === 'dispose') cleanup.push(fn) },
    inject(_deps, fn) { fn({ connection: { fetch: { register(route) { carriers.push(route) } } } }) },
  }
  installMediaWorkbench(ctx, 'hyperframes')
  assert.deepEqual(registered.map(t => t.name), ['hyperframes_project', 'hyperframes_render'])
  assert.equal(carriers.length, 2)
  assert.match(registered[0].output.render({}, { projects: [], environment: { ready: false } })[0].text, /显式准备/)
  for (const fn of cleanup) fn()
  assert.equal(registered.length, 0)
})
const png = Buffer.from([137,80,78,71,13,10,26,10,1,2,3])
test('archiving is reversible, preserves media and rendered bytes, and requires confirmation and current revision', async t => {
  const {store,workbench:w} = await fixture(t)
  const p = await store.create(fields), uploaded = await store.upload(p.id,p.revision,'sample.png',png)
  const renderId = 'e0ce5e94-fc3a-4e8f-9e63-398baf289347', runDir = join(await store.path(p.id),'runs',renderId)
  await mkdir(runDir,{recursive:true});await writeFile(join(runDir,'final.mp4'),'preserved rendered bytes')
  assert.equal((await request(w,{action:'archive',id:p.id,revision:uploaded.revision})).status,400)
  assert.equal((await request(w,{action:'archive',id:p.id,revision:p.revision,confirmed:true})).status,409)
  const archived = await request(w,{action:'archive',id:p.id,revision:uploaded.revision,confirmed:true});assert.equal(archived.status,200)
  assert.equal((await store.list()).length,0);assert.equal((await store.list(true))[0].revision,uploaded.revision)
  assert.deepEqual(await readFile(join(await store.path(p.id,true),'assets',uploaded.assets[0].file)),png)
  assert.equal(await readFile(join(await store.path(p.id,true),'runs',renderId,'final.mp4'),'utf8'),'preserved rendered bytes')
  assert.equal((await request(w,{action:'restore',id:p.id,revision:uploaded.revision,confirmed:true})).status,200)
  assert.equal((await store.list(true)).length,0);assert.equal((await store.list()).length,1)
  assert.equal(await readFile(join(runDir,'final.mp4'),'utf8'),'preserved rendered bytes')
  assert.equal((await request(w,{action:'archive',id:'../../outside',revision:1,confirmed:true})).status,400)
})
async function fixture(t, engine = 'remotion') {
  const root = await mkdtemp(join(testRoot, '.media-fixture-')), workbench = new MediaWorkbench(engine, root)
  t.after(async () => { workbench.dispose(); for (let i = 0; i < 100 && [...workbench.jobs.values()].some(j => j.view.state === 'running'); i++) await new Promise(r => setTimeout(r, 20)); const rel = relative(resolve(testRoot), resolve(root)); assert.ok(rel && !rel.startsWith('..') && !isAbsolute(rel)); await rm(root, { recursive: true, force: true }) })
  return { root, store: workbench.store, workbench }
}
const request = (w, body, extra = {}) => w.fetch(new Request('http://dsh.test' + w.route, { method: 'POST', headers: { 'content-type': 'application/json', 'x-dsh-media': '1', ...extra }, body: JSON.stringify(body) }))
async function finished(w, id) { for (let i = 0; i < 300; i++) { const j = w.job(id); if (j.state !== 'running') return j; await new Promise(r => setTimeout(r, 10)) } throw new Error('Fixture job did not finish') }
async function fakeRuntime(w, source) {
  const pkg = join(w.runtime, 'node_modules/@remotion/cli'); await mkdir(pkg, { recursive: true })
  const browserPath = join(w.runtime, 'fake-browser'); await writeFile(browserPath, 'owned browser fixture')
  await writeFile(join(pkg, 'package.json'), JSON.stringify({ version: MEDIA_VERSIONS.remotion })); await writeFile(join(w.runtime, 'ready.json'), JSON.stringify({ version: MEDIA_VERSIONS.remotion, browserPath }))
  await writeFile(join(pkg, 'remotion-cli.js'), source)
}
test('project revisions persist and competing writers cannot silently overwrite', async t => {
  const { store, root } = await fixture(t), p = await store.create(fields), other = new MediaStore('remotion', root)
  const results = await Promise.allSettled([store.update(p.id, p.revision, { ...fields, title: '窗口一' }), other.update(p.id, p.revision, { ...fields, title: '窗口二' })])
  assert.equal(results.filter(r => r.status === 'fulfilled').length, 1); assert.equal(results.filter(r => r.status === 'rejected')[0].reason.status, 409)
  assert.equal((await other.get(p.id)).revision, 2)
})

test('归档释放 30 项上限；满额恢复失败时归档原件保持完整', async t => {
  const { store } = await fixture(t), p = await store.create(fields)
  await store.archive(p.id, p.revision)
  for (let i = 0; i < 30; i++) await store.create({ ...fields, title: '工程 ' + i })
  await assert.rejects(store.create(fields), /先归档/)
  await assert.rejects(store.archive(p.id, p.revision, true), error => error.status === 409)
  assert.equal((await store.get(p.id, true)).title, fields.title)
  const active = (await store.list())[0]; await store.archive(active.id, active.revision)
  await store.archive(p.id, p.revision, true)
  assert.equal((await store.list()).length, 30)
})
test('bad and oversized fields fail before creating projects; damaged records are preserved', async t => {
  const { store } = await fixture(t)
  for (const input of [{ ...fields, title: '' }, { ...fields, duration: 31 }, { ...fields, template: '__proto__' }, { ...fields, format: '__proto__' }, { ...fields, body: 'x'.repeat(361) }]) assert.throws(() => validateFields(input))
  const p = await store.create(fields), path = join(await store.path(p.id), 'project.json'); await writeFile(path, '{bad')
  await assert.rejects(store.get(p.id)); assert.equal(await readFile(path, 'utf8'), '{bad')
})
test('uploads validate content, enforce one music/video, and never use supplied paths', async t => {
  const { store } = await fixture(t), p = await store.create(fields)
  await assert.rejects(store.upload(p.id, p.revision, 'page.png', Buffer.from('<html>')), /PNG/)
  const updated = await store.upload(p.id, p.revision, '../hero.png', png)
  assert.match(updated.assets[0].file, /^[a-f0-9-]+\.png$/); assert.deepEqual(await store.assetBytes(p.id, updated.assets[0]), png)
  const wav = Buffer.alloc(44); wav.write('RIFF'); wav.write('WAVE', 8)
  const music = await store.upload(p.id, updated.revision, 'music.wav', wav)
  await assert.rejects(store.upload(p.id, music.revision, 'other.wav', wav), /背景音频/)
  const removed = await store.removeAsset(p.id, music.revision, updated.assets[0].id); assert.equal(removed.assets.length, 1)
})
test('managed upload removal unlinks its own reference without deleting a symlink target', async t => {
  const { store, root } = await fixture(t), p = await store.create(fields), updated = await store.upload(p.id, p.revision, 'hero.png', png)
  const file = join(await store.path(p.id), 'assets', updated.assets[0].file), original = join(root, 'original.png'); await writeFile(original, png); await rm(file)
  try { await symlink(original, file) } catch (e) { if (e.code === 'EPERM') { t.skip('Windows file symlink creation is unavailable'); return } throw e }
  await store.removeAsset(p.id, updated.revision, updated.assets[0].id); assert.deepEqual(await readFile(original), png)
})
test('snapshots preserve exact assets while later edits leave prior output visibly stale', async t => {
  const { store } = await fixture(t), p = await store.create(fields), uploaded = await store.upload(p.id, p.revision, 'hero.png', png)
  const snapshot = await store.snapshot(p.id, uploaded.revision); await store.removeAsset(p.id, uploaded.revision, uploaded.assets[0].id)
  assert.deepEqual(snapshot.assets.get(uploaded.assets[0].file), png)
  await assert.rejects(store.snapshot(p.id, uploaded.revision), e => e.status === 409)
})
test('templates escape user text, stay offline and reject an unreadably fast slideshow', async t => {
  const { store } = await fixture(t), p = await store.create({ ...fields, title: '<script>alert(1)</script>' })
  const source = projectSources(p, 'hyperframes'), html = source['compositions/scene-0.html']; assert.ok(html.includes('&lt;script&gt;')); assert.ok(!html.includes('<script>alert(1)</script>')); assert.ok(!html.includes('https://'))
  assert.match(source['index.html'], /class="clip" data-composition-id="scene-0" data-composition-src=/)
  // The official subcomposition scoper special-cases #root. A root class selector is rejected by its lint.
  assert.match(html, /<div id="root" data-composition-id="scene-0"/)
  assert.match(html, /#root\{position:relative/)
  assert.doesNotMatch(html, /class="canvas"/)
  assert.doesNotMatch(html, /src="\.\.\//)
  // Compiled subcompositions share the page. Initializing a child must retain parent and sibling timelines.
  assert.match(html, /window\.__timelines=window\.__timelines\|\|\{\};/)
  assert.match(source['index.html'], /window\.__timelines=window\.__timelines\|\|\{\};/)
  assert.match(projectSources(p, 'remotion')['src/index.jsx'], /useCurrentFrame/)
  p.template = 'slideshow'; p.assets = Array.from({ length: 4 }, (_, i) => ({ id: String(i), kind: 'image', file: 'a.png' })); assert.throws(() => projectSources(p, 'hyperframes'), /至少需要 8 秒/)
})
test('dense text is fitted or rejected before rendering, with no silently omitted slideshow lines', async t => {
  const { store } = await fixture(t), p = await store.create({ ...fields, title: '标题'.repeat(36), body: '正文'.repeat(180) })
  p.assets = [{ id: 'image', kind: 'image', file: 'a.png' }]
  const data = JSON.parse(projectSources(p, 'remotion')['data.json'])
  assert.ok(data.bodySize < 21)
  p.body = Array.from({ length: 180 }, () => '长').join('\n')
  assert.throws(() => projectSources(p, 'hyperframes'), /可读空间/)
  p.body = '一\n二\n三'; p.template = 'slideshow'; p.duration = 6; p.assets.push({ id: 'image2', kind: 'image', file: 'b.png' })
  assert.throws(() => projectSources(p, 'remotion'), /正文行数/)
})
test('carrier rejects cross-origin and invalid headers, and backups contain editable sources', async t => {
  const { workbench: w, store } = await fixture(t), p = await store.create(fields)
  assert.equal((await request(w, { action: 'list' }, { origin: 'http://other.test' })).status, 400)
  assert.equal((await request(w, { action: 'list' }, { origin: 'http://127.0.0.1:12345', host: '127.0.0.1:12345', 'sec-fetch-site': 'same-origin' })).status, 200)
  assert.equal((await request(w, { action: 'list' }, { origin: 'http://other.test', host: '127.0.0.1:12345', 'sec-fetch-site': 'same-origin' })).status, 400)
  assert.equal((await request(w, { action: 'list' }, { 'x-dsh-media': '0' })).status, 400)
  const response = await w.fetch(new Request('http://dsh.test' + w.route + '?kind=source&id=' + p.id)), files = unzipSync(new Uint8Array(await response.arrayBuffer()))
  for (const name of ['src/index.jsx','project.json','DESIGN.md','package.json']) assert.ok(files[name], name)
  assert.equal((await request(w, { action: 'get', id: '../outside' })).status, 400)
})
test('missing dependency gives a useful failure and starts no child process', async t => {
  const { workbench: w, store } = await fixture(t), p = await store.create(fields)
  await assert.rejects(w.start('render', p.id, p.revision), /准备渲染环境/); assert.equal(w.jobs.size, 0)
})
test('a missing prepared browser disables export and does not spawn a renderer', async t => {
  const { workbench: w, store } = await fixture(t), p = await store.create(fields)
  await fakeRuntime(w, 'process.exit(0)'); assert.equal((await w.environment()).ready, true)
  await rm(join(w.runtime, 'fake-browser')); assert.equal((await w.environment()).ready, false)
  await assert.rejects(w.start('render', p.id, p.revision), /准备渲染环境/); assert.equal(w.jobs.size, 0)
})
test('one runtime slot prevents another DSH process from changing dependencies during rendering', async t => {
  const { workbench: w, store, root } = await fixture(t), p = await store.create(fields), other = new MediaWorkbench('remotion', root)
  t.after(() => other.dispose())
  await fakeRuntime(w, `console.log('slot held');setInterval(()=>{},1000);`)
  const render = await w.start('render', p.id, p.revision)
  for(let i=0;i<100&&!w.job(render.id).lines.includes('slot held');i++)await new Promise(r=>setTimeout(r,10))
  const prepare = await other.start('prepare'), end = await finished(other, prepare.id)
  assert.equal(end.state, 'failed'); assert.match(end.stage, /另一个 DSH 实例/)
  assert.equal((await w.environment()).ready, true); w.cancel(render.id); await finished(w, render.id)
})

test('另一个实例渲染期间拒绝归档，取消完成后可以归档', async t => {
  const { workbench: w, store, root } = await fixture(t), p = await store.create(fields), other = new MediaWorkbench('remotion', root)
  t.after(() => other.dispose())
  await fakeRuntime(w, `console.log('archive slot held');setInterval(()=>{},1000);`)
  const render = await w.start('render', p.id, p.revision)
  for (let i=0; i<100 && !w.job(render.id).lines.includes('archive slot held'); i++) await new Promise(r=>setTimeout(r,10))
  const result = await request(other, { action: 'archive', id: p.id, revision: p.revision, confirmed: true })
  assert.notEqual(result.status, 200)
  assert.equal((await store.get(p.id)).title, fields.title)
  w.cancel(render.id); await finished(w, render.id)
  assert.equal((await request(other, { action: 'archive', id: p.id, revision: p.revision, confirmed: true })).status, 200)
})
test('background output is recorded against the rendered revision, with range downloads', async t => {
  const { workbench: w, store } = await fixture(t), p = await store.create(fields)
  await fakeRuntime(w, `const fs=require('node:fs');const b=Buffer.alloc(256);b.write('ftyp',4);setTimeout(()=>fs.writeFileSync('final.mp4',b),100);`)
  const j = await w.start('render', p.id, p.revision); await store.update(p.id, p.revision, { ...fields, title: '较新的编辑' })
  const end = await finished(w, j.id); assert.equal(end.state, 'done'); const current = await store.get(p.id); assert.equal(current.revision, 2); assert.equal(current.renders[0].revision, 1)
  const response = await w.fetch(new Request(`http://dsh.test${w.route}?kind=mp4&id=${p.id}&render=${end.output}`, { headers: { range: 'bytes=4-7' } })); assert.equal(response.status, 206); assert.equal(await response.text(), 'ftyp')
})
test('failed outputs never become downloadable successful renders', async t => {
  const { workbench: w, store } = await fixture(t), p = await store.create(fields)
  await fakeRuntime(w, `require('node:fs').writeFileSync('final.mp4','not an MP4'.repeat(100));`)
  const job = await w.start('render', p.id, p.revision), end = await finished(w, job.id); assert.equal(end.state, 'failed'); assert.equal((await store.get(p.id)).renders.length, 0)
})
test('cancel and disposal terminate only their child; projects survive with no output receipt', async t => {
  const { workbench: w, store } = await fixture(t), p = await store.create(fields)
  await fakeRuntime(w, `console.log('fixture ready');setInterval(()=>{},1000);`)
  const job = await w.start('render', p.id, p.revision)
  for (let i=0;i<100&&!w.job(job.id).lines.includes('fixture ready');i++) await new Promise(r=>setTimeout(r,10))
  await assert.rejects(w.start('render', p.id, p.revision), /已有/)
  w.cancel(job.id); assert.equal((await finished(w, job.id)).state, 'cancelled'); assert.equal((await store.get(p.id)).renders.length, 0)
  w.dispose(); await assert.rejects(w.start('render', p.id, p.revision), /卸载/)
})
test('renderer child does not inherit model or mailbox secrets', async t => {
  const { workbench: w, store } = await fixture(t), p = await store.create(fields), old = process.env.DEEPSEEK_API_KEY; process.env.DEEPSEEK_API_KEY = 'synthetic-secret'
  t.after(() => { if (old === undefined) delete process.env.DEEPSEEK_API_KEY; else process.env.DEEPSEEK_API_KEY = old })
  await fakeRuntime(w, `console.log(process.env.DEEPSEEK_API_KEY||'no-model-secret');console.log(JSON.stringify({home:require('node:os').homedir(),nodeMode:process.env.ELECTRON_RUN_AS_NODE,userConfig:process.env.npm_config_userconfig}));process.exit(2);`)
  const job = await w.start('render', p.id, p.revision), end = await finished(w, job.id); assert.ok(end.lines.some(line=>line.includes('no-model-secret'))); assert.ok(!JSON.stringify(end).includes('synthetic-secret'))
  const env = JSON.parse(end.lines.find(line => line.startsWith('{')))
  assert.equal(env.home, join(w.store.root, 'user-home')); assert.equal(env.nodeMode, '1'); assert.equal(env.userConfig, join(w.store.root, 'local.npmrc'))
})
