// Editable browser entry. Build with node scripts/build-client.mjs.
// Shared original browser source. build-client substitutes the engine identity.
window.__ModuleLoader__.load({ id: 'dsh-__ENGINE__', factory: require => {
        const React = require('react'), { useState, useEffect, useRef } = React, h = React.createElement;
        const W = createWorkbenchUI(React, require);
        const engine = '__ENGINE__', title = engine === 'hyperframes' ? 'HyperFrames' : 'Remotion', route = 'api/dsh-' + engine + '/workbench';
        function mediaError(error, en) {
            const message = typeof error === 'string' ? error : error?.message || String(error || '');
            const code = typeof error === 'object' && error ? error.code : undefined;
            if (!en || (!code && !/[\u3400-\u9fff]/.test(message)))
                return message;
            if (error?.status === 401)
                return 'Your session expired. Reopen DSH and try again.';
            const byCode = {
                SLIDESHOW_DURATION: 'Slideshow needs at least 2 seconds per image. Increase the duration.',
                TEXT_OVERFLOW: 'Text exceeds the readable area for this canvas. Shorten the body or split it into slideshow pages.',
                SLIDESHOW_LINES: 'Body has more lines than slideshow images. Add images or merge lines.',
                TITLE_INVALID: 'Enter a title between 1 and 72 characters.',
                BODY_TOO_LONG: 'Use body text up to 360 characters.',
                DURATION_INVALID: 'Set a duration between 3 and 30 whole seconds.',
                REORDER_REVISION_REQUIRED: 'Reload the project before changing its image order.',
                REORDER_INVALID: 'Use every current image exactly once. Reload the project before trying again.',
                PROJECT_LIMIT: 'The 30 active project slots are full. Archive another project before creating or restoring one.',
                PROJECT_NOT_FOUND: 'This project folder no longer exists on disk. The list has been refreshed.',
                PROJECT_NOT_CORRUPT: 'This project is healthy and cannot be removed as a damaged folder.',
                CONFIRM_REQUIRED: 'Confirm this action before continuing.',
                CONFLICT: 'The project changed. Reopen the latest version and compare it with your preserved input.',
                JOB_CONFLICT: 'A similar job is already running. Wait for it to finish or cancel it first.',
                JOB_TIMEOUT: 'The job timed out and was stopped. Your project is preserved.',
                PREVIEW_TIMEOUT: 'Official preview did not become ready within 90 seconds. Check the job log and retry.',
                LOCK_LOST: 'The runtime lock was lost and the job stopped safely. Your project is preserved.',
                ENV_NOT_READY: 'Prepare the render environment first before previewing or exporting.',
                ASSET_SIZE: 'Each asset must be between 1 byte and 20 MB.',
                ASSET_FORMAT: 'Use PNG, JPEG, WebP, MP3, WAV, M4A or MP4 files whose contents match their extension.',
                ASSET_LIMIT: 'A project supports at most 12 assets and 40 MB total.',
                AUDIO_EXISTS: 'Background audio already exists. Remove it before uploading a replacement.',
                VIDEO_EXISTS: 'Background video already exists. Remove it before uploading a replacement.',
            };
            if (code && byCode[code])
                return byCode[code];
            if (/调整图片顺序需要/.test(message))
                return 'Reload the project before changing its image order.';
            if (/图片顺序/.test(message))
                return 'Use every current image exactly once. Reload the project before trying again.';
            if (/先归档|已达 30/.test(message))
                return 'The 30 active project slots are full. Archive another project before creating or restoring one.';
            if (/已有预览或渲染/.test(message))
                return 'Stop the active preview or cancel the render before archiving, restoring or trashing a project.';
            if (/网络共享路径/.test(message))
                return 'Network share paths do not support the system Recycle Bin. Clean them up manually.';
            if (/回收站/.test(message))
                return 'Could not move the folder to the Recycle Bin. Close any app using its files and try again.';
            if (error?.status === 409 || /已.*更新|另一窗口|修订/.test(message))
                return 'The project changed. Reopen the latest version and compare it with your preserved input.';
            if (/轮播 .*至少需要/.test(message))
                return byCode.SLIDESHOW_DURATION;
            if (/可读空间/.test(message))
                return byCode.TEXT_OVERFLOW;
            if (/正文行数/.test(message))
                return byCode.SLIDESHOW_LINES;
            if (/标题/.test(message))
                return byCode.TITLE_INVALID;
            if (/时长/.test(message))
                return byCode.DURATION_INVALID;
            if (/正文/.test(message))
                return byCode.BODY_TOO_LONG;
            if (/素材|PNG|JPEG|WebP|MP3|WAV|M4A|MP4/.test(message))
                return 'Check the media format and file contents. Each asset must be ≤20 MB; a project supports 12 assets and 40 MB total, with one audio and one video background.';
            if (/启动超时/.test(message))
                return byCode.PREVIEW_TIMEOUT;
            if (/执行超时/.test(message))
                return byCode.JOB_TIMEOUT;
            if (/运行锁失效/.test(message))
                return byCode.LOCK_LOST;
            if (/任务|官方|FFmpeg|FFprobe|Chrome|环境/.test(message))
                return 'The official task did not finish. Open the job log and check the render environment, then retry. Your project is preserved.';
            if (/工程记录|项目目录|文件/.test(message))
                return 'The project files could not be read safely. Back them up and check their location and permissions before retrying.';
            return 'The operation failed. Check the DSH logs and reload the project before retrying; your input is preserved.';
        }
        let cache = { project: null, fields: null, dirty: false, job: null, creating: false };
        const empty = () => ({ template: 'title', title: '', body: '', format: 'landscape', duration: 8 });
        const fieldsOf = p => ({ template: p.template, title: p.title, body: p.body, format: p.format, duration: p.duration });
        // Official stage codes are mapped per engine instead of inventing percentages or showing another engine's steps.
        const jobSteps = engine === 'hyperframes'
            ? { prepare: ['init', 'ffmpeg', 'ffprobe', 'install', 'verify-cli', 'browser', 'browser-download'], preview: ['snapshot', 'preview-start', 'preview-ready'], render: ['snapshot', 'lint', 'render', 'done'] }
            : { prepare: ['init', 'install', 'verify-cli', 'browser'], preview: ['snapshot', 'preview-start', 'preview-ready'], render: ['snapshot', 'render', 'done'] };
        const stageNameToCode = { '下载环境': 'init', '检查 FFmpeg': 'ffmpeg', '检查 FFprobe': 'ffprobe', '下载官方依赖': 'install', '检查官方环境': 'verify-cli', '检查或下载 Chrome': 'browser', '准备修订快照': 'snapshot', '启动官方预览': 'preview-start', '官方预览已就绪': 'preview-ready', '检查合成': 'lint', '渲染 MP4': 'render', '已完成': 'done' };
        const jobStepOf = step => {
            const steps = jobSteps[step?.kind] || [];
            const code = step?.stageCode || stageNameToCode[step?.stage] || (/^下载专用渲染浏览器/.test(step?.stage || '') ? 'browser-download' : '');
            const index = steps.indexOf(code);
            return { index: index < 0 ? 0 : index, total: steps.length || 1 };
        };
        const css = `.dmw{color:var(--fg);min-width:0}.dmw *{box-sizing:border-box}.dmw h2{margin:0;font-size:20px}.dmw h3{font-size:15.5px;margin:8px 0}.dmw .muted{color:var(--fg-muted);font-size:12.5px}.dmw .bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:10px 0}.dmw button:not(.w-button):not(.dsh-style-trigger):not(.dsh-font-trigger):not(.dsh-style-fallback-item):not([role=tab]):not(.w-row-button){font:inherit;color:inherit;background:var(--bg-surface);border:var(--dsh-control-border-width,1px) solid var(--border);border-radius:var(--dsw-radius-sm,8px);padding:6px 11px;cursor:pointer;white-space:normal;text-decoration:none}.dmw button:disabled{opacity:.48;cursor:not-allowed}.dmw input:not([type=file]):not([type=checkbox]):not([type=radio]),.dmw textarea,.dmw select{font:inherit;color:inherit;width:100%;border:var(--dsh-control-border-width,1px) solid var(--border);border-radius:var(--dsw-radius-sm,8px);padding:7px 10px;background:var(--bg)}.dmw .w-input>input{border:0!important;background:transparent!important;padding:5px 0!important}.dmw label:not(.w-checkbox){display:block;margin:10px 0 4px}.dmw pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:12px;margin:8px 0;max-height:220px;overflow:auto}.dmw [aria-invalid=true]{border-color:var(--dsw-alias-state-error-primary,#c83240)!important}.w-dialog-modal.media-dialog,.dsh-fallback-modal-dialog.media-dialog{width:min(560px,calc(100dvw - 32px));container-type:normal}[role=dialog]:has(.dmw.w-page){width:min(1160px,calc(100dvw - 40px))!important;max-width:1160px!important}@media(max-width:700px){[role=dialog]:has(.dmw.w-page){width:100%!important;max-width:100%!important;flex-direction:column!important}[role=dialog]:has(.dmw.w-page)>nav+div{min-width:0;width:100%}[role=dialog]:has(.dmw.w-page)>nav+div>div:has(.dmw.w-page){padding:12px!important;min-width:0}[role=dialog]:has(.dmw.w-page) nav{width:100%!important;flex-basis:auto!important;border-right:0;max-height:170px;overflow:auto}[role=dialog]:has(.dmw.w-page) nav>div:has(>button){display:flex;flex-direction:row!important;flex-wrap:wrap;gap:4px}}`;
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
                if (data.code)
                    error.code = data.code;
                throw error;
            }
            return data.value;
        }
        function urlFor(project, kind, extra = {}) { const url = new URL(route, document.baseURI); url.search = new URLSearchParams({ id: project.id, kind, ...extra }); return url.href; }
        function Workbench({locale,workbench=false}={}) {
            const [editorTab,setEditorTab]=useState('content'),[libraryTab,setLibraryTab]=useState('projects'),[editorMode,setEditorMode]=useState('director');const controlId=React.useId();
            const [lang, setLang] = useState('zh'), [projects, setProjects] = useState([]), [archived, setArchived] = useState([]), [corruptedCount, setCorruptedCount] = useState(0), [corruptedProjects, setCorruptedProjects] = useState([]), [corruptedDialog, setCorruptedDialog] = useState(false), [clearArchivedDialog, setClearArchivedDialog] = useState(false), [archiveReview, setArchiveReview] = useState(false), [archiveTarget, setArchiveTarget] = useState(null), [trashTarget, setTrashTarget] = useState(null), [environment, setEnvironment] = useState(null), [templates, setTemplates] = useState([]);
            const initialFields = cache.fields || empty();
            const [project, setProject] = useState(cache.project), [fields, setFields] = useState(initialFields), [durationText, setDurationText] = useState(String(initialFields.duration ?? 8)), [durationTouched, setDurationTouched] = useState(false), [dirty, setDirty] = useState(cache.dirty), [creating, setCreating] = useState(cache.creating);
            const [job, setJob] = useState(cache.job), [busy, setBusy] = useState(false), [error, setError] = useState(''), [notice, setNotice] = useState(''), [pending, setPending] = useState(null), [conflict, setConflict] = useState(false), [exportReview, setExportReview] = useState(false);
            const fieldsSplit = W.useResizableSplit({ key: 'dsh-' + engine + ':fields-width', initial: 272, min: 210, max: 420 });
            const inspectorSplit = W.useResizableSplit({ key: 'dsh-' + engine + ':inspector-width', initial: 244, min: 196, max: 380, reverse: true });
            const busyRef = useRef(false), fileRef = useRef(null), latest = useRef({ project, fields, dirty });
            latest.current = { project, fields, dirty };
            const t = (zh, en) => lang === 'en' ? en : zh, activeJob = job?.state === 'running', running = busy || activeJob && job.kind !== 'prepare', jobStep = jobStepOf(job);
// Update protection: dsh-__ENGINE__
__stardustUpdatesGuard(React, "dsh-__ENGINE__", { dirty, busy: busy || activeJob, retainOnClose: true });

            const enStageByCode = {
                init: 'Preparing environment',
                ffmpeg: 'Checking FFmpeg',
                ffprobe: 'Checking FFprobe',
                install: 'Downloading official dependencies',
                'verify-cli': 'Checking official CLI',
                browser: 'Checking or downloading browser',
                'browser-download': 'Downloading the official rendering browser',
                snapshot: 'Preparing saved revision',
                'preview-start': 'Starting official preview',
                'preview-ready': 'Official preview is ready',
                lint: 'Checking composition',
                render: 'Rendering MP4',
                done: 'Completed',
                cancelled: 'Cancelled; project preserved',
                timeout: 'The job timed out and was stopped; your project is preserved.',
                'startup-timeout': 'Official preview did not become ready within 90 seconds. Check the job log and retry.',
                'lock-lost': 'The runtime lock was lost and the job stopped safely; your project is preserved.',
            };
            const stage = lang === 'en' ? (enStageByCode[job?.stageCode] || ({ '下载环境': 'Preparing environment', '检查 FFmpeg': 'Checking FFmpeg', '检查 FFprobe': 'Checking FFprobe', '下载官方依赖': 'Downloading official dependencies', '检查官方环境': 'Checking official CLI', '检查或下载 Chrome': 'Checking or downloading browser', '下载专用渲染浏览器': 'Downloading the official rendering browser', '准备修订快照': 'Preparing saved revision', '启动官方预览': 'Starting official preview', '官方预览已就绪': 'Official preview is ready', '检查合成': 'Checking composition', '渲染 MP4': 'Rendering MP4', '已完成': 'Completed', '已取消': 'Cancelled', '已取消；工程已保留': 'Cancelled; project preserved', '官方任务未完成，请展开运行记录后重试。工程已保留。': 'The official task failed. Open the job log and retry; your project is preserved.', '未找到 FFmpeg，请安装并加入 PATH，重启 DSH 后重试。工程已保留。': 'FFmpeg was not found. Install it, add it to PATH, then restart DSH and retry; your project is preserved.', '未找到 FFprobe。请安装包含 FFmpeg 和 FFprobe 的完整工具包并加入 PATH，重启 DSH 后重新准备环境。工程已保留。': 'FFprobe was not found. Install the full FFmpeg + FFprobe bundle, add it to PATH, restart DSH and retry; your project is preserved.' }[job?.stage] || mediaError(job?.stage, true))) : job?.stage;
            useEffect(() => { const update = () => setLang(String(locale?.getSnapshot?.().active || '').startsWith('en') ? 'en' : 'zh'); update(); return locale?.subscribe?.(update); }, [locale]);
            useEffect(() => { cache = { project, fields, dirty, job, creating }; }, [project, fields, dirty, job, creating]);
            useEffect(() => { const exit = e => { if (latest.current.dirty) {
                e.preventDefault();
                e.returnValue = '';
            } }; window.addEventListener('beforeunload', exit); return () => window.removeEventListener('beforeunload', exit); }, []);
            function syncFields(nextFields) {
                setFields(nextFields);
                setDurationText(String(nextFields.duration ?? 8));
                setDurationTouched(false);
            }
            async function refresh() {
                const data = await api({ action: 'list' });
                setProjects(data.projects);
                setArchived(data.archivedProjects || []);
                setCorruptedCount(Number(data.corruptedCount || 0));
                setCorruptedProjects(Array.isArray(data.corruptedProjects) ? data.corruptedProjects : []);
                setEnvironment(data.environment);
                setTemplates(data.templates);
                const current = latest.current, saved = !current.dirty && data.projects.find(row => row.id === current.project?.id);
                if (saved) {
                    setProject(saved);
                    syncFields(fieldsOf(saved));
                }
                setJob(previous => data.jobs.find(row => row.id === previous?.id) || data.jobs.filter(row => row.state === 'running').at(-1) || data.jobs.at(-1) || null);
            }
            useEffect(() => { refresh().catch(e => setError(e)); }, []);
            useEffect(() => {
                if (project || creating || archiveTarget || trashTarget || corruptedDialog || clearArchivedDialog)
                    return;
                let inflight = false, cancelled = false;
                function syncLibrary() {
                    if (cancelled || inflight || busyRef.current || (typeof document !== 'undefined' && document.visibilityState === 'hidden'))
                        return;
                    inflight = true;
                    refresh().catch(() => { /* silent background sync */ }).finally(() => { inflight = false; });
                }
                const onFocus = () => syncLibrary();
                const onVisibility = () => { if (typeof document === 'undefined' || document.visibilityState !== 'hidden') syncLibrary(); };
                if (typeof window !== 'undefined' && window.addEventListener)
                    window.addEventListener('focus', onFocus);
                if (typeof document !== 'undefined' && document.addEventListener)
                    document.addEventListener('visibilitychange', onVisibility);
                const timer = typeof setInterval === 'function' ? setInterval(syncLibrary, 8000) : null;
                timer?.unref?.();
                return () => {
                    cancelled = true;
                    if (timer != null && typeof clearInterval === 'function') clearInterval(timer);
                    if (typeof window !== 'undefined' && window.removeEventListener)
                        window.removeEventListener('focus', onFocus);
                    if (typeof document !== 'undefined' && document.removeEventListener)
                        document.removeEventListener('visibilitychange', onVisibility);
                };
            }, [!!project, creating, !!archiveTarget, !!trashTarget, corruptedDialog, clearArchivedDialog]);
            useEffect(() => {
                if (!job || job.state !== 'running')
                    return;
                let live = true, polling = false, consecutiveFailures = 0;
                const timer = setInterval(async () => {
                    if (polling)
                        return;
                    polling = true;
                    try {
                        const next = await api({ action: 'job', job: job.id });
                        if (!live)
                            return;
                        consecutiveFailures = 0;
                        // Refresh output before the terminal state tears down this polling effect.
                        if (next.state !== 'running')
                            await refresh();
                        else
                            setJob(next);
                    }
                    catch (e) {
                        if (!live)
                            return;
                        consecutiveFailures++;
                        const gone = e?.code === 'JOB_NOT_FOUND' || /任务不存在/.test(e?.message || '');
                        if (gone || consecutiveFailures >= 3) {
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
            async function open(id) {
                try {
                    const next = await api({ action: 'get', id });
                    setProject(next); syncFields(fieldsOf(next)); setCreating(false); setDirty(false); setConflict(false); setPending(null); setArchiveReview(false);
                } catch (e) {
                    if (e?.status === 404 || e?.code === 'PROJECT_NOT_FOUND') {
                        await refresh().catch(() => {});
                        if (latest.current.project?.id === id) { setProject(null); setCreating(false); setDirty(false); }
                    }
                    throw e;
                }
            }
            function navigate(target) { if (dirty) {
                setPending(target);
                return;
            } perform(() => move(target)); }
            async function move(target) { if (target === 'new') {
                setProject(null);
                syncFields(empty());
                setCreating(true);setEditorTab('content');
            }
            else if (target === 'list') {
                setProject(null);
                setCreating(false);
                await refresh();
            }
            else
                await open(target); setDirty(false); setPending(null); }
            async function save() { const next = await api(project ? { action: 'update', id: project.id, revision: project.revision, fields } : { action: 'create', fields }); setProject(next); syncFields(fieldsOf(next)); setCreating(false); setDirty(false); setConflict(false); setNotice(t('工程已保存。', 'Project saved.')); await refresh(); return next; }
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
                    let result;
                    try {
                        result = await response.json();
                    }
                    catch {
                        throw new Error('无法读取上传响应，请检查是否已经重启 DSH。');
                    }
                    if (!response.ok || !result.ok) {
                        const e = new Error(result.message || '上传未完成');
                        e.status = response.status;
                        if (result.code)
                            e.code = result.code;
                        throw e;
                    }
                    setProject(result.value);
                    setNotice(t('素材副本已保存，原文件未改变。', 'A media copy was saved; your original is unchanged.'));
                });
                event.target.value = '';
            }
            async function start(action) { await perform(async () => { if (action !== 'prepare' && dirty)
                throw new Error(t('请先保存修改。', 'Save changes first.')); setJob(await api({ action, id: project?.id, revision: project?.revision })); }); }
            async function archiveProject(target = project) {
                if (!target) return;
                try {
                    await api({ action: 'archive', id: target.id, revision: target.revision, confirmed: true });
                } catch (e) {
                    if (e?.status === 404 || e?.code === 'PROJECT_NOT_FOUND') {
                        setArchiveReview(false); setArchiveTarget(null);
                        if (project?.id === target.id) { setProject(null); setCreating(false); setDirty(false); }
                        await refresh().catch(() => {});
                    }
                    throw e;
                }
                setArchiveReview(false);
                setArchiveTarget(null);
                if (project?.id === target.id) {
                    setProject(null);
                    setCreating(false);
                    setDirty(false);
                }
                await refresh();
                setNotice(t('工程已归档，素材和成品均保留，可在下方恢复。', 'Project archived. Media and output are preserved; restore it below.'));
            }
            async function trashProject(target = trashTarget) {
                if (!target?.project) return;
                const row = target.project;
                let alreadyMissing = false;
                try {
                    await api({ action: 'trash', id: row.id, revision: row.revision, archived: Boolean(target.archived), confirmed: true });
                } catch (e) {
                    if (e?.status === 404 || e?.code === 'PROJECT_NOT_FOUND') {
                        alreadyMissing = true;
                    } else {
                        throw e;
                    }
                }
                setTrashTarget(null);
                setArchiveReview(false);
                setArchiveTarget(null);
                if (project?.id === row.id) {
                    setProject(null);
                    setCreating(false);
                    setDirty(false);
                }
                await refresh().catch(() => {});
                setNotice(alreadyMissing
                    ? t('原工程目录已不存在，已从列表清理。', 'Project folder was already missing on disk; removed the stale entry from the list.')
                    : t('工程已移入系统回收站，可在系统回收站还原。', 'Project moved to the system Recycle Bin. Restore it from your OS Recycle Bin if needed.'));
            }
            async function trashAllArchived() {
                const result = await api({ action: 'trashArchived', confirmed: true });
                setClearArchivedDialog(false);
                await refresh().catch(() => {});
                setNotice(result?.trashedCount > 0
                    ? t(`已将 ${result.trashedCount} 个已归档工程移入系统回收站，可在系统回收站还原。`, `Moved ${result.trashedCount} archived project(s) to the system Recycle Bin.`)
                    : t('没有需要清理的已归档工程。', 'No archived projects to clean up.'));
            }
            async function trashCorruptedFolders() {
                const result = await api({ action: 'trashCorrupted', confirmed: true });
                setCorruptedDialog(false);
                await refresh().catch(() => {});
                setNotice(result?.trashedCount > 0
                    ? t(`已将 ${result.trashedCount} 个损坏工程目录移入系统回收站，黄色提示已清除。`, `Moved ${result.trashedCount} damaged project folder(s) to the system Recycle Bin.`)
                    : t('损坏工程目录已不存在，列表已自动同步。', 'Damaged project folders were already gone; list refreshed.'));
            }
            const render=project?.renders?.[0],stale=render && (dirty || render.revision!==project.revision);
            const durationValid = Number.isInteger(fields.duration) && fields.duration >= 3 && fields.duration <= 30;
            const canSave = fields.title.trim().length > 0 && fields.title.length <= 72 && fields.body.length <= 360 && durationValid;
            const saveHint = !fields.title.trim() ? t('先填写标题再保存。', 'Enter a title before saving.')
                : fields.title.length > 72 ? t('标题最多 72 字符。', 'Titles are limited to 72 characters.')
                : fields.body.length > 360 ? t('正文最多 360 字符。', 'Body text is limited to 360 characters.')
                : !durationValid ? t('时长需在 3–30 整秒之间。', 'Set a duration between 3 and 30 whole seconds.')
                : project && !dirty ? t('没有需要保存的修改。', 'There is nothing to save yet.') : null;
            const imageCount = project ? project.assets.filter(a => a.kind === 'image').length : 0;
            const slideshowCount = fields.template === 'slideshow' ? Math.max(imageCount, 1) : 1;
            const slideshowWarning = fields.template === 'slideshow' && imageCount > 0
                ? (durationValid && fields.duration < slideshowCount * 2
                    ? t(`轮播 ${slideshowCount} 张图片至少需要 ${slideshowCount * 2} 秒，导出前请增加时长。`, `Slideshow with ${slideshowCount} images requires at least ${slideshowCount * 2} seconds before exporting.`)
                    : slideshowCount > 1 && fields.body.split('\n').length > slideshowCount
                        ? t(`正文行数超过当前 ${slideshowCount} 张图片，导出前请合并文字或补充图片。`, `Body lines exceed the ${slideshowCount} slideshow images. Merge lines or add images before exporting.`)
                        : '')
                : '';
            const exportHint=!environment?.ready?t('先在“环境”页准备渲染工具，再导出。','Prepare the renderer in Environment before exporting.'):dirty?t('先保存修改；导出使用已保存的修订。','Save your changes first; exports use the saved revision.'):t('先检查导出内容，再开始渲染。','Review the export summary before rendering.');
            const studioIcon = engine === 'hyperframes' ? 'layers' : 'play';
            const tourStorageKey = 'dsh-' + engine + '.tour.v1';
            async function copyTourPrompt(text) {
                try {
                    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
                        await navigator.clipboard.writeText(text);
                        setNotice(t('已复制对话提示词，可直接粘贴到聊天框发送。', 'Prompt copied. Paste it into chat to generate.'));
                        return true;
                    }
                }
                catch (_) { /* fall through */ }
                try {
                    const ta = document.createElement('textarea');
                    ta.value = String(text);
                    ta.setAttribute('readonly', '');
                    ta.style.position = 'fixed';
                    ta.style.opacity = '0';
                    document.body.append?.(ta);
                    ta.select?.();
                    const ok = typeof document.execCommand === 'function' ? document.execCommand('copy') : true;
                    ta.remove?.();
                    if (ok) setNotice(t('已复制对话提示词，可直接粘贴到聊天框发送。', 'Prompt copied. Paste it into chat to generate.'));
                    return ok;
                }
                catch (_) {
                    return false;
                }
            }
            const mediaTourSteps = [
                {
                    id: 'create',
                    selector: project || creating ? '[data-tour="media-mode"]' : '[data-tour="media-create"]',
                    fallback: '.w-header-actions',
                    side: 'bottom',
                    title: t('新建视频工程 · 导演台 / 表单一键切换', 'New video project · Director / Form toggle'),
                    desc: t('点击顶栏「新建视频」或打开工程，默认进入 OP-DSH 实体导演台（可随时切回「表单」模式），也可复制下方指令让助手自动编排分镜。', 'Click New video or open a project to launch the OP-DSH Director Console by default (toggle to Form anytime), or copy the prompt below into chat.'),
                    prompt: t('帮我制作一段 30 秒的产品亮点展示动画视频，配置好镜头节奏并准备导出 MP4', 'Create a 30-second product highlight motion video with clean scene pacing ready for MP4 export'),
                    promptLabel: t('复制视频生成指令', 'Copy video prompt'),
                },
                {
                    id: 'preview',
                    selector: '[data-tour="media-preview"]',
                    fallback: '[data-tour="media-tab-preview"], [data-tour="media-tab-projects"], .w-empty',
                    side: 'bottom',
                    title: t('凹陷实时监看台与 24-LED 渲染矩阵', 'Live Stage Monitor & 24-LED Render Matrix'),
                    desc: t('暗色监看屏按 16:9 / 9:16 / 1:1 实时渲染当前分镜、标题与时间码（TC），点击 24 点 LED 矩阵即可快速定位帧位，导出后还可切至成片 MP4 回放。', 'The recessed dark-bezel stage previews live scenes, title, and timecode (TC) in 16:9 / 9:16 / 1:1. Click any LED in the 24-LED Render Matrix to jump frames, or switch to exported MP4 playback.'),
                },
                {
                    id: 'timeline',
                    selector: '[data-tour="media-timeline"]',
                    fallback: '[data-tour="media-projects"], .w-tabs',
                    side: 'top',
                    title: t('朱红播放键与多轨指针擦洗时间线', 'Vermilion Play Key & Scrubbable Multi-Track Timeline'),
                    desc: t('按下朱红「▶ 播放」键顺滑推进时间线，或直接按住拖动指针擦洗「画面轨 / 字幕轨 / 节奏轨」，实时联动上方监看画面。', 'Press the vermilion ▶ Play key to advance playback smoothly, or drag the orange playhead across Video, Caption, and Pace tracks to scrub live.'),
                },
                {
                    id: 'inspector',
                    selector: project || creating ? '[data-tour="media-inspector"]' : '.dsh-style-switcher',
                    fallback: '.w-tabs',
                    side: project || creating ? 'left' : 'bottom',
                    title: t('实体参数条、分镜脚本与 13 风格 / 8 字体', 'Tactile Parameter Strip, Script & 13 Styles / 8 Fonts'),
                    desc: t('在右侧机械键区一键切换画幅比例、视觉模板、3–30s 时长滑杆与内联分镜脚本；顶栏可切换 13 套明亮风格与 8 套双层字体。', 'Use the right tactile strip for mechanical aspect keys, template pills, 3–30s duration slider, and inline script editing; switch 13 bright styles & 8 fonts in the header.'),
                },
                {
                    id: 'export',
                    selector: '[data-tour="media-export"]',
                    fallback: '[role="tab"][data-tab-id="environment"], .w-header-actions',
                    side: 'bottom',
                    title: t('Studio 预览与本地渲染导出高清 MP4', 'Official Studio Preview & Local HD MP4 Export'),
                    desc: t('首次导出前在「环境」页一键准备本地渲染工具，启动官方 Studio 核对效果后，即可核对修订摘要并在本地渲染下载高清 MP4。', 'Prepare the local renderer once in Environment, verify motion in official Studio, review the revision summary, and export HD MP4 files locally.'),
                },
            ];
            const activeViewTab = project || creating ? editorTab : libraryTab;
            const headerTabsConfig = {
                label: t('视频工作台视图', 'Video workbench views'),
                value: activeViewTab,
                onChange: project || creating ? setEditorTab : setLibraryTab,
                items: project || creating
                    ? [{ id: 'content', icon: 'play', 'data-tour': 'media-tab-preview', label: t('内容与预览', 'Content') }, { id: 'assets', icon: 'image', label: t('素材', 'Media') }, { id: 'exports', icon: 'download', label: t('导出记录', 'Exports') }, { id: 'environment', icon: 'settings', label: t('环境', 'Environment') }]
                    : [{ id: 'projects', icon: 'video', 'data-tour': 'media-tab-projects', label: t('当前工程', 'Projects'), count: projects.length }, { id: 'archives', icon: 'folder', label: t('已归档', 'Archived'), count: archived.length }, { id: 'environment', icon: 'settings', label: t('环境', 'Environment') }],
            };
            const headerMeta = (project || creating)
                ? h('span', { className: 'w-tag media-header-meta' }, project ? (dirty ? t('未保存', 'Unsaved') : 'R' + project.revision) : t('新建', 'New'))
                : null;
            const mediaClientCss = css + '\n' + MEDIA_WORKBENCH_CSS;
            if(!environment) return h(W.Page,{workbench,lang,icon:studioIcon,tourSteps:mediaTourSteps,tourStorageKey,onTourCopyPrompt:copyTourPrompt,title,subtitle:t('编辑视频工程，预览并导出 MP4。','Edit video projects, preview and export MP4.'),className:'dmw media-workbench','aria-busy':busy?'true':undefined},h(W.Styles,{id:'dsh-media-workbench-styles',cssText:mediaClientCss}),error?h(W.Empty,{title:t('暂时无法读取工程','Projects are unavailable'),action:h(W.Button,{icon:'refresh','aria-busy':busy?'true':undefined,disabled:busy,onClick:()=>perform(refresh)},t('重新读取项目','Reload projects'))},mediaError(error,lang==='en')):h('div',{className:'media-loading-skeleton'},h(W.Skeleton,{variant:'card',label:t('正在读取工程与渲染环境…','Loading projects and render environment…')}),h(W.Skeleton,{variant:'row'}),h(W.Skeleton,{variant:'row'}),h(W.Skeleton,{variant:'row'})));
            return h(W.Page,{workbench,lang,icon:studioIcon,headerMeta,tabs:headerTabsConfig,tourSteps:mediaTourSteps,tourStorageKey,onTourCopyPrompt:copyTourPrompt,title,subtitle:t('编辑视频工程，预览并导出 MP4。','Edit video projects, preview and export MP4.'),className:'dmw media-workbench','aria-busy':running?'true':undefined,actions:h(React.Fragment,null,
 project || creating ? h(W.Button,{icon:'left','data-tour':'media-create',disabled:running,title:t('返回项目','Back to projects'),onClick:()=>navigate('list')},t('返回项目','Back')) : h(W.Button,{icon:'plus','data-tour':'media-create',variant:'primary',disabled:running,onClick:()=>navigate('new')},t('新建视频','New video')),
 project || creating ? h(W.Button,{variant:'primary',icon:'check',disabled:running || !canSave || !!project && !dirty,title:saveHint || t('保存工程','Save project'),onClick:()=>perform(save)},t('保存工程','Save')) : h(W.IconButton,{icon:'refresh',label:t('刷新项目','Refresh projects'),'aria-busy':busy?'true':undefined,disabled:running,onClick:()=>perform(refresh)}),
 project ? h(W.Button,{icon:'download','data-tour':'media-export',disabled:running || dirty || !environment.ready,title:exportHint,onClick:()=>setExportReview(true)},t('导出 MP4','Export MP4')) : null)},
 h(W.Styles,{id:'dsh-media-workbench-styles',cssText:mediaClientCss}),h(W.Status,{tone:'error'},conflict ? t('工程已在别处更新，当前输入尚未保存。先复制需要的修改，再重新载入最新修订。', 'The project changed elsewhere and your input is not saved yet. Copy what you need, then reload the latest revision.') : error && mediaError(error,lang==='en')),h(W.Status,{tone:'success'},notice),corruptedCount > 0 ? h(W.Status,{tone:'warn'},t(`发现 ${corruptedCount} 个损坏工程目录（原文件已保留），其余工程不受影响。`, `Found ${corruptedCount} damaged project folder(s) (original files preserved). Other projects remain available.`),' ',h(W.Button,{size:'sm',variant:'ghost',icon:'trash',disabled:busy || activeJob,onClick:()=>{setError('');setCorruptedDialog(true);}},t('查看并移入回收站清理','Inspect & move to Recycle Bin'))) : null,conflict && project ? h('div',{className:'w-toolbar'},h(W.Button,{icon:'refresh',disabled:running,onClick:()=>setPending(project.id)},t('重新载入最新版本（放弃我的输入）','Reload the latest version (discard my input)')),h(W.Button,{variant:'ghost',disabled:running,onClick:()=>setConflict(false)},t('保留我的输入，稍后处理','Keep my input for now'))) : null,
 (project || creating) && !environment.ready ? h(W.Status,null,t('首次导出前需要准备本地渲染环境；内容可以先编辑和保存。','Prepare the local renderer before your first export. You can edit and save content now.'),' ',h(W.Button,{variant:'ghost',icon:'right',onClick:()=>setEditorTab('environment')},t('查看环境','View environment'))) : null,
 job ? h('div',{className:'media-job','data-dsh-card':'',role:job.state==='failed'?'alert':'status','data-state':job.state,'aria-live':job.state==='failed'?'assertive':'polite'},h('strong',null,t('任务状态：','Job status: ')+stage),job.state==='running'?h('span',{className:'w-muted'},t('步骤 '+(jobStep.index+1)+' / '+jobStep.total,'Step '+(jobStep.index+1)+' / '+jobStep.total)):null,
 job.state==='running'?h('div',{className:'dsh-progress media-job-progress',role:'progressbar','aria-valuemin':0,'aria-valuemax':jobStep.total,'aria-valuenow':jobStep.index+1,'aria-label':t('任务步骤进度','Job step progress')},h('div',{className:'dsh-progress-bar',style:{'--dsh-progress-value':Math.round(((jobStep.index+1)/jobStep.total)*100)+'%'}})):null,
 job.url?h('a',{className:'w-button',href:job.url,target:'_blank',rel:'noopener noreferrer'},h(W.Icon,{name:'external',size:16}),t('打开官方 Studio 预览','Open official Studio preview')):null,
 job.state==='running'?h(W.Button,{icon:'close',disabled:busy,onClick:()=>perform(async()=>{await api({action:'cancel',job:job.id});setNotice(t('已请求停止；正在关闭本次任务。','Stopping this job.'));})},job.kind==='preview'?t('停止预览，返回编辑','Stop preview and return to editing'):t('取消任务','Cancel job')):null,
 job.state==='failed'?h(W.Button,{variant:'primary',icon:'refresh',disabled:running || dirty || job.kind!=='prepare' && !project,title:dirty?t('先保存修改，再用同一修订重试。','Save your changes before retrying the same revision.'):job.kind!=='prepare' && !project?t('先在工程库打开工程，再重试本次任务。','Open the project from the list before retrying this task.'):t('重试失败的官方任务；工程已保留。','Retry the failed official task; your project is preserved.'),onClick:()=>start(job.kind==='prepare'?'prepare':job.kind)},t('重试本次任务','Retry this task')):null,
 h('details',null,h('summary',null,t('查看运行记录','Show job log')),h('pre',null,job.lines.join('\n')))) : null,
 h('div',{key:(project||creating?'ed:':'lib:')+activeViewTab,className:'w-tab-panel dsh-tab-panel','data-dsh-tab-panel':'',role:'tabpanel'},
 !project && !creating ? libraryTab === 'environment' ? h(MediaEnvironment,{engine,environment,activeJob,job,busy,start,t}) : libraryTab === 'archives' ? archived.length ? h('section',{className:'media-project-list'},h('div', { className: 'bar', style: { justifyContent: 'space-between' } }, h('p', { className: 'muted', style: { margin: 0 } }, t('归档保留素材与成品，不占当前 30 个工程名额。恢复后可以继续编辑。', 'Archives retain media and output, freeing an active project slot. Restore to edit again.')), h(W.Button, { variant: 'danger', icon: 'trash', disabled: busy || dirty || activeJob, onClick: () => { setError(''); setClearArchivedDialog(true); } }, t('清空已归档（全部移入回收站）', 'Clear archived (Recycle Bin)'))),
h(ProjectLibrary,{items:archived,scope:'archives',language:lang,t,searchHint:t('搜索归档工程','Search archived projects'),searchText:p=>[p.title,p.body,p.template].join(' '),updatedAt:p=>p.updated,renderItem:p=>h('div', { className: 'bar dsh-row', 'data-dsh-row': '', 'data-dsh-card': '', key: p.id }, h('strong', { 'data-dsh-serif': '' }, p.title), h('div', { className: 'dsh-row-actions', 'data-window-drag-exclude': '' }, h(W.Button, { icon: 'reply', disabled: busy || dirty || activeJob, onClick: () => perform(async () => { try { await api({ action: 'restore', id: p.id, revision: p.revision, confirmed: true }); } catch (e) { if (e?.status === 404 || e?.code === 'PROJECT_NOT_FOUND') await refresh().catch(() => {}); throw e; } await refresh(); await open(p.id); setNotice(t('工程已恢复。', 'Project restored.')); }) }, t('恢复工程', 'Restore project')), h(W.Button, { variant: 'danger', icon: 'trash', disabled: busy || dirty || activeJob, onClick: () => setTrashTarget({ project: p, archived: true }) }, t('移入回收站', 'Move to Recycle Bin'))))})) : h(W.Empty,{title:t('没有归档工程','No archived projects'),icon:'folder'}) : projects.length ? h('div',{className:'media-project-list','data-tour':'media-projects'},h(ProjectLibrary,{items:projects,language:lang,t,searchHint:t('搜索标题、正文或模板','Search titles, text or templates'),searchText:p=>[p.title,p.body,p.template,templates.find(row=>row.id===p.template)?.[lang==='en'?'en':'zh']].join(' '),updatedAt:p=>p.updated,renderItem:p=>h(W.Row,{key:p.id,title:p.title,disabled:running,meta:p.duration+t(' 秒 · 修订 ',' sec · revision ')+p.revision,description:(templates.find(row=>row.id===p.template)?.[lang==='en'?'en':'zh'] || p.template),actions:h(React.Fragment,null,h(W.Button,{size:'sm',icon:'edit',disabled:running,onClick:()=>{setEditorTab('content');navigate(p.id);}},t('编辑','Open')),h(W.Button,{size:'sm',variant:'ghost',icon:'folder',disabled:busy||dirty||activeJob,onClick:()=>setArchiveTarget(p)},t('归档','Archive')),h(W.Button,{size:'sm',variant:'ghost',icon:'trash',disabled:busy||dirty||activeJob,onClick:()=>setTrashTarget({project:p,archived:false})},t('移入回收站','Trash'))),onClick:()=>{setEditorTab('content');navigate(p.id);}})})) : h(W.Empty,{title:t('还没有视频工程','No video projects yet'),icon:'video',action:h(W.Button,{variant:'primary',icon:'plus',disabled:running,onClick:()=>navigate('new')},t('新建视频','New video'))},t('点击“新建视频”，选择模板并保存。环境可以稍后准备。','Choose New video, select a template and save. The renderer can be prepared later.')) :
 editorTab === 'environment' ? h(MediaEnvironment,{engine,environment,activeJob,job,busy,start,t}) : editorTab === 'assets' ? h(MediaAssets,{project,dirty,running,fileRef,upload,perform,setProject,t}) : editorTab === 'exports' ? h(MediaExports,{project,dirty,running,activeJob,busy,setArchiveReview,onTrash:()=>setTrashTarget({project,archived:false}),t}) :
 h(React.Fragment,null,
  h('div',{className:'media-console-bar'},
   h('div',{className:'media-console-id'},
    h('span',{className:'media-console-chip'},'OP-DSH · '+title.toUpperCase()),
    h('span',null,project?(dirty?t('有未保存修改','Unsaved changes'):t('已保存 · 修订 ','Saved · revision ')+project.revision):t('新建视频工程','New video project'))),
   h('div',{className:'media-mode-switch','data-tour':'media-mode',role:'group','aria-label':t('编辑模式切换','Editor mode switch')},
    h('button',{type:'button',className:'media-mode-btn','data-director-mode':'director','aria-pressed':editorMode==='director',onClick:()=>setEditorMode('director')},t('导演台','Director')),
    h('button',{type:'button',className:'media-mode-btn','data-director-mode':'form','aria-pressed':editorMode==='form',onClick:()=>setEditorMode('form')},t('表单','Form')))),
  editorMode === 'director'
   ? h(MediaDirectorConsole,{engine,title,project,fields,setFields,durationText,setDurationText,setDurationTouched,durationValid,dirty,setDirty,setError,syncFields,fieldsOf,templates,lang,render,stale,job,running,ready:environment.ready,busy,start,perform,setNotice,setEditorTab,setExportReview,slideshowWarning,exportHint,controlId,t})
   : h('div',{className:'media-editor',style:{'--media-fields-width':fieldsSplit.size+'px','--media-inspector-width':inspectorSplit.size+'px'}},h('section',{className:'media-content-fields','data-dsh-card':''},h('h3',{'data-dsh-serif':''},t('模板与内容','Template and content')),h('div',{className:'media-field'},h('label', { htmlFor: controlId+'-template' }, t('模板', 'Template')),h('select', { id: controlId+'-template', disabled: running, value: fields.template, onChange: e => { setFields({ ...fields, template: e.target.value }); setDirty(true); } }, templates.map(row => h('option', { key: row.id, value: row.id }, lang === 'en' ? row.en : row.zh)))),
h('div',{className:'media-field'},h('label', { htmlFor: controlId+'-title' }, t('标题（最多 72 字符）', 'Title (up to 72 characters)')),h(W.Input, { id: controlId+'-title', value: fields.title, disabled: running, maxLength: 72, onChange: e => { setFields({ ...fields, title: e.target.value }); setDirty(true); } })),
h('div',{className:'media-field'},h('label', { htmlFor: controlId+'-body' }, t('正文（轮播时每行对应一页）', 'Body (one line per slideshow page)')),h('textarea', { id: controlId+'-body', value: fields.body, disabled: running, maxLength: 360, rows: 4, onChange: e => { setFields({ ...fields, body: e.target.value }); setDirty(true); } })),slideshowWarning ? h(W.Status,{tone:'warn'},slideshowWarning) : null,dirty?h('p',{className:'w-muted'},t('有未保存修改；切换工程前会提醒。','Unsaved changes. You will be asked before switching projects.')):project?h('p',{className:'w-muted'},t('已保存 · 修订 ','Saved · revision ')+project.revision):null,project && h(W.Button, { icon: 'close', disabled: running || !dirty, onClick: () => { syncFields(fieldsOf(project)); setDirty(false); setError(''); } }, t('取消修改', 'Discard changes'))),
 h(W.SplitResizer,{...fieldsSplit.resizerProps,className:'media-split-resizer media-split-resizer-left',label:t('调整内容栏宽度','Resize content column')}),
 h(MediaCanvas,{project,fields,render,dirty,stale,job,running,ready:environment.ready,busy,start,perform,setNotice,t}),
 h(W.SplitResizer,{...inspectorSplit.resizerProps,className:'media-split-resizer media-split-resizer-right',label:t('调整设置栏宽度','Resize inspector column')}),
 h('aside',{className:'media-properties','data-tour':'media-inspector','data-dsh-card':''},h('h3',{'data-dsh-serif':''},t('视频设置','Video settings')),h('div',{className:'media-field'},h('label', { htmlFor: controlId+'-format' }, t('画幅', 'Canvas')),h('select', { id: controlId+'-format', value: fields.format, disabled: running, onChange: e => { setFields({ ...fields, format: e.target.value }); setDirty(true); } }, ['landscape', 'portrait', 'square'].map((key, i) => h('option', { key, value: key }, [t('横屏 16:9', 'Landscape 16:9'), t('竖屏 9:16', 'Portrait 9:16'), t('正方形', 'Square')][i])))),
h('div',{className:'media-field'},h('label', { htmlFor: controlId+'-duration' }, t('时长（3–30 秒）', 'Duration (3–30 seconds)')),h(W.Input, { id: controlId+'-duration', type: 'number', inputMode: 'numeric', min: 3, max: 30, step: 1, value: durationText, disabled: running, 'aria-invalid': durationTouched && !durationValid ? 'true' : 'false', onBlur: () => setDurationTouched(true), onChange: e => { const raw = e.target.value; setDurationText(raw); setFields({ ...fields, duration: raw.trim() === '' ? NaN : Number(raw) }); setDirty(true); } })),
 h('section',{className:'w-section'},h('p',null,t('已上传素材 ','Uploaded media ')+(project?.assets.length || 0)),h(W.Button,{icon:'upload',disabled:!project || running || dirty,onClick:()=>setEditorTab('assets')},t('上传素材','Upload media')),project?h('a',{className:'w-button',href:urlFor(project,'source'),download:''},h(W.Icon,{name:'download',size:16}),t('下载可编辑工程','Download editable project')):null),
 h('p',{className:'w-muted'},t('导出使用本地 ','Exports use the local ')+title+t(' 引擎。',' engine.')),h('p',{className:'w-muted'},t('图片、音频和无声视频；单文件 20 MB，工程合计 40 MB。','Images, audio and muted video; 20 MB per file, 40 MB per project.')),engine==='remotion'?h('a',{href:'https://www.remotion.dev/license',target:'_blank',rel:'noopener noreferrer'},t('Remotion 许可说明','Remotion license')):null)))),
 project && exportReview ? h(W.Dialog,{className:'dmw media-dialog',title:t('导出前检查','Check before export'),closeLabel:t('取消导出','Cancel export'),busy:running,onClose:()=>setExportReview(false)},
 h('p', null, t('确认后启动官方渲染，生成新 MP4；工程内容不会被修改。', 'Rendering starts after you confirm and produces a new MP4. Your project is not modified.')),
 h('ul', { className: 'media-export-checks' }, h('li', null, t('标题：', 'Title: ') + project.title), h('li', null, t('画幅与时长：', 'Canvas and duration: ') + ({ landscape: t('横屏 16:9', 'Landscape 16:9'), portrait: t('竖屏 9:16', 'Portrait 9:16'), square: t('正方形', 'Square') }[project.format] || project.format) + ' · ' + project.duration + t(' 秒', ' sec')), h('li', null, t('素材：', 'Media: ') + project.assets.length + t(' 个', ' items')), h('li', null, t('修订：', 'Revision: ') + project.revision), h('li', null, t('渲染环境：', 'Renderer: ') + (environment.ready ? t('已准备', 'ready') : t('未准备', 'not ready'))), h('li', null, t('上次导出：', 'Last export: ') + (render ? t('修订 ', 'revision ') + render.revision : t('尚未导出', 'none yet')))),
 !project.assets.length ? h(W.Status, null, t('没有上传素材，本次只渲染模板内容。', 'No media uploaded; this export renders the template only.')) : null,
 render && render.revision !== project.revision ? h(W.Status, null, t('上一份 MP4 对应修订 ', 'The last MP4 uses revision ') + render.revision + t('，本次会生成修订 ', '; this export creates revision ') + project.revision + t(' 的新成品；旧成品保留在导出记录中。', '. Older files stay in Exports.')) : null,
 h('div', { className: 'w-toolbar' }, h(W.Button, { variant: 'primary', icon: 'download', disabled: running || dirty || !environment.ready, title: exportHint, onClick: () => { setExportReview(false); start('render'); } }, t('开始导出', 'Start export')), h(W.Button, { disabled: running, onClick: () => setExportReview(false) }, t('取消导出', 'Cancel export')))) : null,
 pending ? h(W.Dialog,{className:'dmw media-dialog',title:t('有未保存的修改','Unsaved changes'),closeLabel:t('留在当前','Stay here'),busy:running,onClose:()=>setPending(null)},h('p', null, t('有未保存内容，如何继续？', 'You have unsaved changes.')),
conflict ? h(W.Status, { tone: 'error' }, t('此工程已在别处更新，直接保存会再次冲突。请选择放弃修改并载入最新版本，或留在当前复制需要的输入。', 'This project changed elsewhere, so saving again would conflict. Discard and load the latest revision, or stay here to copy your input.')) : null,
 h('div', { className: 'w-toolbar' }, h(W.Button, { variant: 'primary', icon: 'check', disabled: running || conflict, title: conflict ? t('工程已更新，无法直接保存。', 'The project changed, so saving is blocked.') : undefined, onClick: () => perform(async () => { await save(); await move(pending); }) }, t('保存后继续', 'Save and continue')), h(W.Button, { icon: 'close', disabled: running, onClick: () => perform(() => move(pending)) }, t('放弃修改并继续', 'Discard and continue')), h(W.Button, { variant: 'ghost', onClick: () => setPending(null) }, t('留在当前', 'Stay here')))) : null,
 (archiveTarget || (project && archiveReview)) ? h(W.Dialog,{className:'dmw media-dialog',title:t('归档此工程','Archive this project'),closeLabel:t('取消归档','Cancel archive'),busy:busy || activeJob,onClose:()=>{setArchiveReview(false);setArchiveTarget(null);}},h('p', null, t('归档后将从当前项目列表移走；工程、上传素材和已导出 MP4 全部保留，可随时恢复。未保存修改需先处理。', 'Archiving removes this project from the active list. The project, uploaded media and exported MP4s are preserved and can be restored. Save or discard pending edits first.')),
h('div', { className: 'w-toolbar' }, h(W.Button, { variant: 'primary', icon: 'folder', disabled: busy || dirty || activeJob, onClick: () => perform(() => archiveProject(archiveTarget || project)) }, t('确认归档', 'Confirm archive')), h(W.Button, { disabled: busy, onClick: () => {setArchiveReview(false);setArchiveTarget(null);} }, t('取消归档', 'Cancel archive')))) : null,
 trashTarget ? h(W.Dialog,{className:'dmw media-dialog',title:t('移入系统回收站','Move project to Recycle Bin'),closeLabel:t('取消','Cancel'),busy:busy || activeJob,onClose:()=>setTrashTarget(null)},
  h('p', null, h('strong', null, trashTarget.project.title)),
  h('p', { className: 'w-muted' }, t('将把该工程目录（含工程配置、已上传素材副本和已导出 MP4）移入系统回收站，可在系统回收站中还原；未保存修改需先处理。', 'Moves this project folder (settings, uploaded media copies and exported MP4s) to the system Recycle Bin / Trash so you can restore it later. Save or discard pending edits first.')),
  error ? h(W.Status, { tone: 'error' }, mediaError(error, lang === 'en')) : null,
  h('div', { className: 'w-toolbar' }, h(W.Button, { variant: 'danger', icon: 'trash', disabled: busy || dirty || activeJob, onClick: () => perform(() => trashProject(trashTarget)) }, t('确认移入回收站', 'Move to Recycle Bin')), h(W.Button, { disabled: busy, onClick: () => setTrashTarget(null) }, t('取消', 'Cancel')))) : null,
 clearArchivedDialog ? h(W.Dialog,{className:'dmw media-dialog',title:t('清空已归档工程','Clear all archived projects'),closeLabel:t('取消','Cancel'),busy:busy || activeJob,onClose:()=>setClearArchivedDialog(false)},
  h('p', null, t(`确定将全部 ${archived.length} 个已归档工程一次性移入系统回收站吗？移入后仍可在系统回收站中还原。`, `Move all ${archived.length} archived project(s) to the system Recycle Bin in one batch? You can restore them from your OS Recycle Bin later.`)),
  archived.length > 0 ? h('ul', { className: 'media-export-checks' }, archived.slice(0, 8).map(item => h('li', { key: item.id }, item.title)), archived.length > 8 ? h('li', { key: 'more', className: 'w-muted' }, t(`以及其余 ${archived.length - 8} 个已归档工程…`, `and ${archived.length - 8} more archived project(s)…`)) : null) : null,
  error ? h(W.Status, { tone: 'error' }, mediaError(error, lang === 'en')) : null,
  h('div', { className: 'w-toolbar' }, h(W.Button, { variant: 'danger', icon: 'trash', disabled: busy || dirty || activeJob, onClick: () => perform(trashAllArchived) }, t('确认全部移入回收站', 'Move all to Recycle Bin')), h(W.Button, { disabled: busy, onClick: () => setClearArchivedDialog(false) }, t('取消', 'Cancel')))) : null,
 corruptedDialog ? h(W.Dialog,{className:'dmw media-dialog',title:t('清理损坏工程目录','Clean up damaged project folders'),closeLabel:t('取消','Cancel'),busy:busy || activeJob,onClose:()=>setCorruptedDialog(false)},
  h('p', null, t(`共检测到 ${corruptedProjects.length || corruptedCount} 个损坏工程目录。移入系统回收站后黄色提醒将消除，且可在系统回收站中找回原始文件。`, `Found ${corruptedProjects.length || corruptedCount} damaged project folder(s). Moving them to the OS Recycle Bin clears the warning while keeping the original files recoverable.`)),
  corruptedProjects.length > 0 ? h('ul', { className: 'media-export-checks' }, corruptedProjects.map(item => h('li', { key: (item.archived ? 'a:' : 'p:') + item.id }, h('code', null, (item.archived ? 'archives/' : 'projects/') + item.id), ' — ', item.detail))) : null,
  error ? h(W.Status, { tone: 'error' }, mediaError(error, lang === 'en')) : null,
  h('div', { className: 'w-toolbar' }, h(W.Button, { variant: 'danger', icon: 'trash', disabled: busy || activeJob, onClick: () => perform(trashCorruptedFolders) }, t('全部移入系统回收站', 'Move all to Recycle Bin')), h(W.Button, { disabled: busy, onClick: () => setCorruptedDialog(false) }, t('取消', 'Cancel')))) : null);
        }
        function apply(ctx) { let locale; try {
            locale = ctx.get?.('locale') || ctx.locale;
        }
        catch { } W.register(ctx,{id:'dsh-'+engine+'.workbench',label:()=>title,icon:engine==='hyperframes'?'layers':'play',component:Workbench,inject:()=>({locale}),order:engine==='hyperframes'?65:66});
ctx.slots.inject('settings.section', () => ctx.slots.register({ name: 'settings.section', id: 'dsh-__ENGINE__', order: engine === 'hyperframes' ? 62 : 63, label: () => title, inject: () => ({ locale }) }, Workbench)); }
        return { inject: ['slots', 'locale'], apply };
    } });
