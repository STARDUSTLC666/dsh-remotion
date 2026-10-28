// Editable browser entry. Build with node scripts/build-client.mjs.
// Shared original browser source. build-client substitutes the engine identity.
window.__ModuleLoader__.load({ id: 'dsh-__ENGINE__', factory: require => {
        const React = require('react'), { useState, useEffect, useRef } = React, h = React.createElement;
        const W = createWorkbenchUI(React);
        const engine = '__ENGINE__', title = engine === 'hyperframes' ? 'HyperFrames' : 'Remotion', route = 'api/dsh-' + engine + '/workbench';
        function mediaError(error, en) {
            const message = typeof error === 'string' ? error : error?.message || String(error || '');
            if (!en || !/[\u3400-\u9fff]/.test(message))
                return message;
            if (error?.status === 401)
                return 'Your session expired. Reopen DSH and try again.';
            if (/调整图片顺序需要/.test(message))
                return 'Reload the project before changing its image order.';
            if (/图片顺序/.test(message))
                return 'Use every current image exactly once. Reload the project before trying again.';
            if (/先归档|已达 30/.test(message))
                return 'The 30 active project slots are full. Archive another project before creating or restoring one.';
            if (/已有预览或渲染/.test(message))
                return 'Stop the active preview or cancel the render before archiving or restoring a project.';
            if (error?.status === 409 || /已.*更新|另一窗口|修订/.test(message))
                return 'The project changed. Reopen the latest version and compare it with your preserved input.';
            if (/标题/.test(message))
                return 'Enter a title up to 72 characters.';
            if (/时长/.test(message))
                return 'Set a duration between 3 and 30 seconds.';
            if (/正文/.test(message))
                return 'Use body text up to 360 characters.';
            if (/素材|PNG|JPEG|MP3|WAV|MP4/.test(message))
                return 'Check the media format and file contents. Each asset must be ≤20 MB; a project supports 12 assets and 40 MB total, with one audio and one video background.';
            if (/任务|官方|FFmpeg|Chrome|环境/.test(message))
                return 'The official task did not finish. Open the job log and check the render environment, then retry. Your project is preserved.';
            if (/工程记录|项目目录|文件/.test(message))
                return 'The project files could not be read safely. Back them up and check their location and permissions before retrying.';
            return 'The operation failed. Check the DSH logs and reload the project before retrying; your input is preserved.';
        }
        let cache = { project: null, fields: null, dirty: false, job: null, creating: false };
        const empty = () => ({ template: 'title', title: '', body: '', format: 'landscape', duration: 8 });
        const fieldsOf = p => ({ template: p.template, title: p.title, body: p.body, format: p.format, duration: p.duration });
        const css = `.dmw{font:14px/1.6 system-ui,sans-serif;color:var(--fg,#142D39);min-width:0;padding:8px}.dmw *{box-sizing:border-box}.dmw h2{margin:0;font-size:23px}.dmw h3{font-size:17px;margin:8px 0}.dmw .muted{color:var(--fg-muted,#677881);font-size:13px}.dmw .bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:12px 0}.dmw button,.dmw .button{font:inherit;color:inherit;background:var(--bg-surface,#fff);border:1px solid var(--border,#c8d6d9);border-radius:9px;padding:8px 12px;cursor:pointer;white-space:normal;text-decoration:none}.dmw button.primary{background:#df5639;border-color:#df5639;color:white}.dmw button:disabled{opacity:.45;cursor:default}.dmw input:not([type=file]),.dmw textarea,.dmw select{font:inherit;color:inherit;width:100%;border:1px solid var(--border,#b9cccd);border-radius:8px;padding:9px;background:var(--bg,#fff)}.dmw label{display:block;margin:10px 0 4px}.dmw .card{border:1px solid var(--border,#ccd7d6);border-radius:12px;padding:14px;margin:12px 0;min-width:0;background:var(--bg-surface,#fff)}.dmw .notice{border-radius:8px;padding:10px;margin:10px 0;background:#eef5ed;color:#28573e;overflow-wrap:anywhere}.dmw .error{background:#fff0ec;color:#943b27}.dmw .row{display:grid;grid-template-columns:1fr 1fr;gap:14px}.dmw .projects{display:grid;gap:8px}.dmw .projects button{text-align:left;width:100%}.dmw img{width:90px;height:70px;object-fit:contain}.dmw .assets{display:flex;flex-direction:column;gap:8px}.dmw .asset{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.dmw video{width:100%;max-height:400px;background:#142D39;border-radius:10px}.dmw pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:12px;margin:8px 0;max-height:220px;overflow:auto}.dmw :focus-visible{outline:3px solid #79CDB4;outline-offset:2px}[role=dialog]:has(.dmw){width:min(1160px,calc(100vw - 40px))!important;max-width:1160px!important}@media(max-width:700px){.dmw{padding:3px}.dmw .row{grid-template-columns:1fr}[role=dialog]:has(.dmw){width:100%!important;max-width:100%!important;flex-direction:column!important}[role=dialog]:has(.dmw)>nav+div{min-width:0;width:100%}[role=dialog]:has(.dmw)>nav+div>div:has(.dmw){padding:12px!important;min-width:0}[role=dialog]:has(.dmw) nav{width:100%!important;flex-basis:auto!important;border-right:0;max-height:170px;overflow:auto}[role=dialog]:has(.dmw) nav>div:has(>button){display:flex;flex-direction:row!important;flex-wrap:wrap;gap:4px}}`;
        async function api(body) {
            const response = await fetch(new URL(route, document.baseURI), { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json', 'x-dsh-media': '1' }, body: JSON.stringify(body) });
            let data;
            try {
                data = await response.json();
            }
            catch {
                throw new Error('无法读取插件响应，请检查是否已经重启 DSH。');
            }
            if (!response.ok || !data.ok) {
                const error = new Error(data.message || '操作未完成');
                error.status = response.status;
                throw error;
            }
            return data.value;
        }
        function urlFor(project, kind, extra = {}) { const url = new URL(route, document.baseURI); url.search = new URLSearchParams({ id: project.id, kind, ...extra }); return url.href; }
        function Workbench({locale,workbench=false}={}) {
const [editorTab,setEditorTab]=useState('content'),[libraryTab,setLibraryTab]=useState('projects');const controlId=React.useId();
            const [lang, setLang] = useState('zh'), [projects, setProjects] = useState([]), [archived, setArchived] = useState([]), [archiveReview, setArchiveReview] = useState(false), [environment, setEnvironment] = useState(null), [templates, setTemplates] = useState([]);
            const [project, setProject] = useState(cache.project), [fields, setFields] = useState(cache.fields || empty()), [dirty, setDirty] = useState(cache.dirty), [creating, setCreating] = useState(cache.creating);
            const [job, setJob] = useState(cache.job), [busy, setBusy] = useState(false), [error, setError] = useState(''), [notice, setNotice] = useState(''), [pending, setPending] = useState(null), [conflict, setConflict] = useState(false);
            const busyRef = useRef(false), fileRef = useRef(null), latest = useRef({ project, fields, dirty });
            latest.current = { project, fields, dirty };
            const t = (zh, en) => lang === 'en' ? en : zh, activeJob = job?.state === 'running', running = busy || activeJob && job.kind !== 'prepare';
// Update protection: dsh-__ENGINE__
__stardustUpdatesGuard(React, "dsh-__ENGINE__", { dirty, busy: busy || activeJob, retainOnClose: true });

            const stage = lang === 'en' ? ({ '下载环境': 'Preparing environment', '检查 FFmpeg': 'Checking FFmpeg', '下载官方依赖': 'Downloading official dependencies', '检查官方环境': 'Checking official CLI', '检查或下载 Chrome': 'Checking or downloading Chrome', '下载专用渲染浏览器': 'Downloading the official rendering browser', '准备修订快照': 'Preparing saved revision', '启动官方预览': 'Starting official preview', '官方预览已就绪': 'Official preview is ready', '检查合成': 'Checking composition', '渲染 MP4': 'Rendering MP4', '已完成': 'Completed', '已取消': 'Cancelled', '已取消；工程已保留': 'Cancelled; project preserved', '官方任务未完成，请展开运行记录后重试。工程已保留。': 'The official task failed. Open the job log and retry; your project is preserved.', '未找到 FFmpeg，请安装并加入 PATH，重启 DSH 后重试。工程已保留。': 'FFmpeg was not found. Install it, add it to PATH, then restart DSH and retry; your project is preserved.' }[job?.stage] || mediaError(job?.stage, true)) : job?.stage;
            useEffect(() => { const update = () => setLang(String(locale?.getSnapshot?.().active || '').startsWith('en') ? 'en' : 'zh'); update(); return locale?.subscribe?.(update); }, [locale]);
            useEffect(() => { cache = { project, fields, dirty, job, creating }; }, [project, fields, dirty, job, creating]);
            useEffect(() => { const exit = e => { if (latest.current.dirty) {
                e.preventDefault();
                e.returnValue = '';
            } }; window.addEventListener('beforeunload', exit); return () => window.removeEventListener('beforeunload', exit); }, []);
            async function refresh() {
                const data = await api({ action: 'list' });
                setProjects(data.projects);
                setArchived(data.archivedProjects || []);
                setEnvironment(data.environment);
                setTemplates(data.templates);
                const current = latest.current, saved = !current.dirty && data.projects.find(row => row.id === current.project?.id);
                if (saved) {
                    setProject(saved);
                    setFields(fieldsOf(saved));
                }
                setJob(previous => data.jobs.find(row => row.id === previous?.id) || data.jobs.filter(row => row.state === 'running').at(-1) || data.jobs.at(-1) || null);
            }
            useEffect(() => { refresh().catch(e => setError(e)); }, []);
            useEffect(() => {
                if (!job || job.state !== 'running')
                    return;
                let live = true, polling = false;
                const timer = setInterval(async () => {
                    if (polling)
                        return;
                    polling = true;
                    try {
                        const next = await api({ action: 'job', job: job.id });
                        if (!live)
                            return;
                        // Refresh output before the terminal state tears down this polling effect.
                        if (next.state !== 'running')
                            await refresh();
                        else
                            setJob(next);
                    }
                    catch (e) {
                        if (live) {
                            setError(e);
                            setJob(null);
                        }
                    }
                    finally {
                        polling = false;
                    }
                }, 1000);
                return () => { live = false; clearInterval(timer); };
            }, [job?.id, job?.state]);
            async function perform(fn) { if (busyRef.current)
                return; busyRef.current = true; setBusy(true); setError(''); setNotice(''); try {
                return await fn();
            }
            catch (e) {
                setError(e);
                setConflict(e.status === 409);
            }
            finally {
                busyRef.current = false;
                setBusy(false);
            } }
            async function open(id) { const next = await api({ action: 'get', id }); setProject(next); setFields(fieldsOf(next)); setCreating(false); setDirty(false); setConflict(false); setPending(null); setArchiveReview(false); }
            function navigate(target) { if (dirty) {
                setPending(target);
                return;
            } perform(() => move(target)); }
            async function move(target) { if (target === 'new') {
                setProject(null);
                setFields(empty());
                setCreating(true);setEditorTab('content');
            }
            else if (target === 'list') {
                setProject(null);
                setCreating(false);
                await refresh();
            }
            else
                await open(target); setDirty(false); setPending(null); }
            async function save() { const next = await api(project ? { action: 'update', id: project.id, revision: project.revision, fields } : { action: 'create', fields }); setProject(next); setFields(fieldsOf(next)); setCreating(false); setDirty(false); setConflict(false); setNotice(t('工程已保存。', 'Project saved.')); await refresh(); return next; }
            async function upload(event) {
                const file = event.target.files?.[0];
                if (!file)
                    return;
                await perform(async () => {
                    if (!project || dirty)
                        throw new Error(t('请先保存工程，再上传素材。', 'Save your project before uploading media.'));
                    if (file.size > 20 * 1024 * 1024)
                        throw new Error(t('单个素材不能超过 20 MB。', 'Each asset must be at most 20 MB.'));
                    const response = await fetch(new URL(route + '/upload', document.baseURI), { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/octet-stream', 'x-dsh-media': '1', 'x-project-id': project.id, 'x-project-revision': String(project.revision), 'x-file-name': encodeURIComponent(file.name) }, body: file });
                    const result = await response.json();
                    if (!response.ok || !result.ok) {
                        const e = new Error(result.message);
                        e.status = response.status;
                        throw e;
                    }
                    setProject(result.value);
                    setNotice(t('素材副本已保存，原文件未改变。', 'A media copy was saved; your original is unchanged.'));
                });
                event.target.value = '';
            }
            async function start(action) { await perform(async () => { if (action !== 'prepare' && dirty)
                throw new Error(t('请先保存修改。', 'Save changes first.')); setJob(await api({ action, id: project?.id, revision: project?.revision })); }); }
            async function archiveProject() { await api({ action: 'archive', id: project.id, revision: project.revision, confirmed: true }); setArchiveReview(false); setProject(null); setCreating(false); setDirty(false); await refresh(); setNotice(t('工程已归档，素材和成品均保留，可在下方恢复。', 'Project archived. Media and output are preserved; restore it below.')); }
            const render=project?.renders?.[0],stale=render && (dirty || render.revision!==project.revision);
const canSave=fields.title.trim().length>0 && fields.title.length<=72 && Number.isInteger(fields.duration) && fields.duration>=3 && fields.duration<=30;
            if(!environment) return h(W.Page,{workbench,title,subtitle:t('编辑视频工程，预览并导出 MP4。','Edit video projects, preview and export MP4.'),className:'dmw media-workbench'},h('style',null,MEDIA_WORKBENCH_CSS),error?h(W.Empty,{title:t('暂时无法读取工程','Projects are unavailable'),action:h(W.Button,{disabled:busy,onClick:()=>perform(refresh)},t('重新读取项目','Reload projects'))},mediaError(error,lang==='en')):h(W.Empty,{title:t('正在读取工程与渲染环境…','Loading projects and render environment…'),icon:'video'}));
            return h(W.Page,{workbench,title,subtitle:t('编辑视频工程，预览并导出 MP4。','Edit video projects, preview and export MP4.'),className:'dmw media-workbench',actions:h(React.Fragment,null,
 project || creating ? h(W.Button,{icon:'left',disabled:running,onClick:()=>navigate('list')},t('返回项目','Back to projects')) : h(W.Button,{icon:'plus',variant:'primary',disabled:running,onClick:()=>navigate('new')},t('新建视频','New video')),
 project || creating ? h(W.Button,{variant:'primary',disabled:running || !canSave || !!project && !dirty,onClick:()=>perform(save)},t('保存工程','Save project')) : h(W.IconButton,{icon:'refresh',label:t('刷新项目','Refresh projects'),disabled:running,onClick:()=>perform(refresh)}),
 project ? h(W.Button,{icon:'download',disabled:running || dirty || !environment.ready,onClick:()=>start('render')},t('导出 MP4','Export MP4')) : null)},
 h('style',null,css),h('style',null,MEDIA_WORKBENCH_CSS),h(W.Status,{tone:'error'},error && mediaError(error,lang==='en')),h(W.Status,{tone:'success'},notice),conflict && project && h('button', { disabled: running, onClick: () => { setPending(project.id); } }, t('重新打开最新版本（先处理当前输入）', 'Reopen latest version (review your current input first)')),
 (project || creating) && !environment.ready ? h(W.Status,null,t('首次导出前需要准备本地渲染环境；内容可以先编辑和保存。','Prepare the local renderer before your first export. You can edit and save content now.'),h(W.Button,{variant:'ghost',onClick:()=>setEditorTab('environment')},t('查看环境','View environment'))) : null,
 job ? h('div',{className:'media-job',role:job.state==='failed'?'alert':'status'},h('strong',null,t('任务状态：','Job status: ')+stage),job.url?h('a',{className:'w-button',href:job.url,target:'_blank',rel:'noopener noreferrer'},t('打开官方 Studio 预览','Open official Studio preview')):null,
 job.state==='running'?h(W.Button,{disabled:busy,onClick:()=>perform(async()=>{await api({action:'cancel',job:job.id});setNotice(t('已请求停止；正在关闭本次任务。','Stopping this job.'));})},job.kind==='preview'?t('停止预览，返回编辑','Stop preview and return to editing'):t('取消任务','Cancel job')):null,
 h('details',null,h('summary',null,t('查看运行记录','Show job log')),h('pre',null,job.lines.join('\n')))) : null,
 h(W.Tabs,{label:t('视频工作台视图','Video workbench views'),value:project || creating ? editorTab : libraryTab,onChange:project || creating ? setEditorTab : setLibraryTab,items:project || creating ? [{id:'content',label:t('内容与预览','Content and preview')},{id:'assets',label:t('素材','Media')},{id:'exports',label:t('导出记录','Exports')},{id:'environment',label:t('环境','Environment')}] : [{id:'projects',label:t('当前工程','Projects'),count:projects.length},{id:'archives',label:t('已归档','Archived'),count:archived.length},{id:'environment',label:t('环境','Environment')}]},
 !project && !creating ? libraryTab === 'environment' ? h('section',{className:'media-environment'},h('h3',null,t('渲染环境','Render environment')+(environment.ready?t(' · 已准备',' · ready'):t(' · 首次需下载',' · first download required'))),h('p', { className: 'muted' }, t(environment?.hint, 'First use downloads the official CLI. ' + (engine === 'hyperframes' ? 'Windows uses the official rendering browser; other platforms reuse installed Chrome when available. FFmpeg must be in PATH.' : 'Installed Chrome is reused; a browser is downloaded when needed. Remotion retains its official license.'))),
engine === 'remotion' && h('p', null, h('a', { href: 'https://www.remotion.dev/license', target: '_blank', rel: 'noreferrer' }, t('查看 Remotion 使用许可证', 'Read the Remotion license'))),
h('button', { disabled: busy || activeJob, onClick: () => start('prepare') }, environment?.ready ? t('重新检查 / 修复环境', 'Check / repair environment') : t('准备渲染环境', 'Prepare render environment'))) : libraryTab === 'archives' ? archived.length ? h('section',{className:'media-project-list'},h('p', { className: 'muted' }, t('归档保留素材与成品，不占当前 30 个工程名额。恢复后可以继续编辑。', 'Archives retain media and output, freeing an active project slot. Restore to edit again.')),
archived.map(p => h('div', { className: 'bar', key: p.id }, h('strong', null, p.title), h('button', { disabled: busy || dirty || activeJob, onClick: () => perform(async () => { await api({ action: 'restore', id: p.id, revision: p.revision, confirmed: true }); await refresh(); await open(p.id); setNotice(t('工程已恢复。', 'Project restored.')); }) }, t('恢复工程', 'Restore project'))))) : h(W.Empty,{title:t('没有归档工程','No archived projects'),icon:'folder'}) : projects.length ? h('div',{className:'media-project-list'},projects.map(p=>h(W.Row,{key:p.id,title:p.title,disabled:running,meta:p.duration+t(' 秒 · 修订 ',' sec · revision ')+p.revision,description:(templates.find(row=>row.id===p.template)?.[lang==='en'?'en':'zh'] || p.template),onClick:()=>{setEditorTab('content');navigate(p.id);}}))) : h(W.Empty,{title:t('还没有视频工程','No video projects yet'),icon:'video'},t('点击“新建视频”，选择模板并保存。环境可以稍后准备。','Choose New video, select a template and save. The renderer can be prepared later.')) :
 editorTab === 'environment' ? h('section',{className:'media-environment'},h('h3',null,t('渲染环境','Render environment')+(environment.ready?t(' · 已准备',' · ready'):t(' · 首次需下载',' · first download required'))),h('p', { className: 'muted' }, t(environment?.hint, 'First use downloads the official CLI. ' + (engine === 'hyperframes' ? 'Windows uses the official rendering browser; other platforms reuse installed Chrome when available. FFmpeg must be in PATH.' : 'Installed Chrome is reused; a browser is downloaded when needed. Remotion retains its official license.'))),
engine === 'remotion' && h('p', null, h('a', { href: 'https://www.remotion.dev/license', target: '_blank', rel: 'noreferrer' }, t('查看 Remotion 使用许可证', 'Read the Remotion license'))),
h('button', { disabled: busy || activeJob, onClick: () => start('prepare') }, environment?.ready ? t('重新检查 / 修复环境', 'Check / repair environment') : t('准备渲染环境', 'Prepare render environment'))) : editorTab === 'assets' ? h(MediaAssets,{project,dirty,running,fileRef,upload,perform,setProject,t}) : editorTab === 'exports' ? h(MediaExports,{project,dirty,running,activeJob,busy,setArchiveReview,t}) :
 h('div',{className:'media-editor'},h('section',{className:'media-content-fields'},h('h3',null,t('模板与内容','Template and content')),h('div',{className:'media-field'},h('label', { htmlFor: controlId+'-template' }, t('模板', 'Template')),h('select', { id: controlId+'-template', disabled: running, value: fields.template, onChange: e => { setFields({ ...fields, template: e.target.value }); setDirty(true); } }, templates.map(row => h('option', { key: row.id, value: row.id }, lang === 'en' ? row.en : row.zh)))),
h('div',{className:'media-field'},h('label', { htmlFor: controlId+'-title' }, t('标题（最多 72 字符）', 'Title (up to 72 characters)')),h('input', { id: controlId+'-title', value: fields.title, disabled: running, maxLength: 72, onChange: e => { setFields({ ...fields, title: e.target.value }); setDirty(true); } })),
h('div',{className:'media-field'},h('label', { htmlFor: controlId+'-body' }, t('正文（轮播时每行对应一页）', 'Body (one line per slideshow page)')),h('textarea', { id: controlId+'-body', value: fields.body, disabled: running, maxLength: 360, rows: 4, onChange: e => { setFields({ ...fields, body: e.target.value }); setDirty(true); } })),dirty?h('p',{className:'w-muted'},t('有未保存修改；切换工程前会提醒。','Unsaved changes. You will be asked before switching projects.')):project?h('p',{className:'w-muted'},t('已保存 · 修订 ','Saved · revision ')+project.revision):null,project && h('button', { disabled: running || !dirty, onClick: () => { setFields(fieldsOf(project)); setDirty(false); setError(''); } }, t('取消修改', 'Discard changes'))),
 h(MediaCanvas,{project,fields,render,dirty,stale,job,running,ready:environment.ready,busy,start,perform,setNotice,t}),
 h('aside',{className:'media-properties'},h('h3',null,t('视频设置','Video settings')),h('div',{className:'media-field'},h('label', { htmlFor: controlId+'-format' }, t('画幅', 'Canvas')),h('select', { id: controlId+'-format', value: fields.format, disabled: running, onChange: e => { setFields({ ...fields, format: e.target.value }); setDirty(true); } }, ['landscape', 'portrait', 'square'].map((key, i) => h('option', { key, value: key }, [t('横屏 16:9', 'Landscape 16:9'), t('竖屏 9:16', 'Portrait 9:16'), t('正方形', 'Square')][i])))),
h('div',{className:'media-field'},h('label', { htmlFor: controlId+'-duration' }, t('时长（3–30 秒）', 'Duration (3–30 seconds)')),h('input', { id: controlId+'-duration', type: 'number', min: 3, max: 30, value: fields.duration, disabled: running, onChange: e => { setFields({ ...fields, duration: Number(e.target.value) }); setDirty(true); } })),
 h('section',{className:'w-section'},h('p',null,t('已上传素材 ','Uploaded media ')+(project?.assets.length || 0)),h(W.Button,{icon:'upload',disabled:!project || running || dirty,onClick:()=>setEditorTab('assets')},t('上传素材','Upload media')),project?h('a',{className:'w-button',href:urlFor(project,'source'),download:''},t('下载可编辑工程','Download editable project')):null),
 h('p',{className:'w-muted'},t('导出使用本地 ','Exports use the local ')+title+t(' 引擎。',' engine.')),h('p',{className:'w-muted'},t('图片、音频和无声视频；单文件 20 MB，工程合计 40 MB。','Images, audio and muted video; 20 MB per file, 40 MB per project.')),engine==='remotion'?h('a',{href:'https://www.remotion.dev/license',target:'_blank',rel:'noopener noreferrer'},t('Remotion 许可说明','Remotion license')):null))),
 pending ? h(W.Dialog,{title:t('有未保存的修改','Unsaved changes'),closeLabel:t('留在当前','Stay here'),busy:running,onClose:()=>setPending(null)},h('p', null, t('有未保存内容，如何继续？', 'You have unsaved changes.')),
h('div', { className: 'bar' }, h('button', { disabled: running, onClick: () => perform(async () => { await save(); await move(pending); }) }, t('保存后继续', 'Save and continue')), h('button', { disabled: running, onClick: () => perform(() => move(pending)) }, t('放弃修改并继续', 'Discard and continue')), h('button', { onClick: () => setPending(null) }, t('留在当前', 'Stay here')))) : null,
 project && archiveReview ? h(W.Dialog,{title:t('归档此工程','Archive this project'),closeLabel:t('取消归档','Cancel archive'),busy:busy || activeJob,onClose:()=>setArchiveReview(false)},h('p', null, t('归档后将从当前项目列表移走；工程、上传素材和已导出 MP4 全部保留，可随时恢复。未保存修改需先处理。', 'Archiving removes this project from the active list. The project, uploaded media and exported MP4s are preserved and can be restored. Save or discard pending edits first.')),
h('div', { className: 'bar' }, h('button', { disabled: busy || dirty || activeJob, onClick: () => perform(archiveProject) }, t('确认归档', 'Confirm archive')), h('button', { disabled: busy, onClick: () => setArchiveReview(false) }, t('取消归档', 'Cancel archive')))) : null);
        }
        function apply(ctx) { let locale; try {
            locale = ctx.get?.('locale') || ctx.locale;
        }
        catch { } W.register(ctx,{id:'dsh-'+engine+'.workbench',label:()=>title,icon:engine==='hyperframes'?'layers':'play',component:Workbench,inject:()=>({locale}),order:engine==='hyperframes'?65:66});
ctx.slots.inject('settings.section', () => ctx.slots.register({ name: 'settings.section', id: 'dsh-' + engine, order: engine === 'hyperframes' ? 62 : 63, label: () => title, inject: () => ({ locale }) }, Workbench)); }
        return { inject: ['slots', 'locale'], apply };
    } });
