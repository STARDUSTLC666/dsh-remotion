function mediaFormatTc(seconds) {
  const safe = Math.max(0, Number.isFinite(seconds) ? seconds : 0);
  const mins = Math.floor(safe / 60);
  const secs = Math.floor(safe % 60);
  const tenths = Math.floor((safe - Math.floor(safe)) * 10);
  return 'TC 00:' + String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0') + '.' + tenths;
}

function buildDirectorScenes(fields, project, t) {
  const duration = Number.isInteger(fields.duration) && fields.duration >= 3 && fields.duration <= 30 ? fields.duration : 8;
  const rawLines = String(fields.body || '').split('\n').map(line => line.trim()).filter(Boolean);
  const imageAssets = (project?.assets || []).filter(asset => asset.kind === 'image');
  const count = fields.template === 'slideshow'
    ? Math.max(rawLines.length, imageAssets.length, 3)
    : Math.max(rawLines.length, 3);
  const fallbackLabels = [
    t('开场标题卡', 'Opening Title'),
    t('核心内容帧', 'Core Visual'),
    t('收尾落版', 'Closing Card'),
  ];
  const scenes = [];
  const step = duration / count;
  for (let i = 0; i < count; i++) {
    const start = Number((i * step).toFixed(2));
    const end = i === count - 1 ? duration : Number(((i + 1) * step).toFixed(2));
    const text = rawLines[i] || (rawLines.length === 1 && i > 0 ? rawLines[0] : '') || fallbackLabels[i % fallbackLabels.length];
    scenes.push({
      index: i,
      start,
      end,
      label: rawLines[i] ? rawLines[i].slice(0, 18) : fallbackLabels[i % fallbackLabels.length],
      caption: text,
      colorIndex: i % 4,
      imageAsset: imageAssets[i] || (imageAssets.length && fields.template === 'slideshow' ? imageAssets[i % imageAssets.length] : null),
    });
  }
  return { duration, rawLines, imageAssets, scenes };
}

function MediaDirectorConsole({
  engine, title, project, fields, setFields, durationText, setDurationText, setDurationTouched, durationValid,
  dirty, setDirty, setError, syncFields, fieldsOf, templates, lang, render, stale, job, running, ready, busy,
  start, perform, setNotice, setEditorTab, setExportReview, slideshowWarning, exportHint, controlId, t
}) {
  const [playhead, setPlayhead] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [scriptOpen, setScriptOpen] = useState(false);
  const [stageView, setStageView] = useState('monitor');
  const [scrubbing, setScrubbing] = useState(false);
  const trackRef = useRef(null);

  const { duration, rawLines, scenes } = buildDirectorScenes(fields, project, t);
  const clampedPlayhead = Math.max(0, Math.min(duration, playhead));
  const activeScene = scenes.find(scene => clampedPlayhead >= scene.start && clampedPlayhead < scene.end) || scenes[scenes.length - 1];
  const progressRatio = duration > 0 ? Math.max(0, Math.min(1, clampedPlayhead / duration)) : 0;
  const activeLedIndex = Math.min(23, Math.floor(progressRatio * 24));
  const previewing = job?.kind === 'preview' && job.state === 'running';
  const ratioCss = fields.format === 'portrait' ? '9 / 16' : fields.format === 'square' ? '1 / 1' : '16 / 9';
  const [videoWidth, videoHeight] = fields.format === 'portrait' ? [720, 1280] : fields.format === 'square' ? [720, 720] : [1280, 720];
  const audioAsset = (project?.assets || []).find(asset => asset.kind === 'audio');
  const videoAsset = (project?.assets || []).find(asset => asset.kind === 'video');
  const templateList = templates?.length ? templates : [{ id: fields.template || 'title', zh: '标题卡', en: 'Title card' }];
  const activeTemplateLabel = templateList.find(row => row.id === fields.template)?.[lang === 'en' ? 'en' : 'zh'] || fields.template;
  const formatOptions = [
    { id: 'landscape', label: '16:9', title: t('横屏 16:9', 'Landscape 16:9') },
    { id: 'portrait', label: '9:16', title: t('竖屏 9:16', 'Portrait 9:16') },
    { id: 'square', label: '1:1', title: t('正方形 1:1', 'Square 1:1') },
  ];

  useEffect(() => {
    setPlayhead(prev => (prev > duration ? duration : prev));
  }, [duration]);

  useEffect(() => {
    if (!playing) return undefined;
    let lastTime = Date.now();
    let timerId = null;
    let rafId = null;
    const tick = () => {
      const now = Date.now();
      const dt = Math.min(0.1, Math.max(0, (now - lastTime) / 1000));
      lastTime = now;
      setPlayhead(prev => {
        const next = prev + dt;
        return next >= duration ? 0 : next;
      });
      if (typeof requestAnimationFrame === 'function') {
        rafId = requestAnimationFrame(tick);
      }
    };
    if (typeof requestAnimationFrame === 'function') {
      rafId = requestAnimationFrame(tick);
    } else {
      timerId = setInterval(tick, 50);
    }
    return () => {
      if (rafId !== null && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(rafId);
      if (timerId !== null) clearInterval(timerId);
    };
  }, [playing, duration]);

  function scrubFromClientX(clientX) {
    const el = trackRef.current;
    if (!el || typeof el.getBoundingClientRect !== 'function') return;
    const rect = el.getBoundingClientRect();
    if (!rect || rect.width <= 0) return;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setPlayhead(Number((ratio * duration).toFixed(2)));
  }

  function onTrackPointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return;
    setPlaying(false);
    setScrubbing(true);
    try { event.currentTarget.setPointerCapture?.(event.pointerId); } catch {}
    scrubFromClientX(event.clientX);
  }

  function onTrackPointerMove(event) {
    if (!scrubbing) return;
    scrubFromClientX(event.clientX);
  }

  function onTrackPointerEnd(event) {
    if (!scrubbing) return;
    setScrubbing(false);
    try { event.currentTarget.releasePointerCapture?.(event.pointerId); } catch {}
  }

  function stepScene(delta) {
    setPlaying(false);
    const nextIdx = Math.max(0, Math.min(scenes.length - 1, (activeScene?.index ?? 0) + delta));
    setPlayhead(scenes[nextIdx]?.start ?? 0);
  }

  const sceneProgress = activeScene && activeScene.end > activeScene.start
    ? Math.max(0, Math.min(1, (clampedPlayhead - activeScene.start) / (activeScene.end - activeScene.start)))
    : 0;

  return h('div', { className: 'media-director-console', 'data-director-console': 'true', 'data-engine': engine },
    h('div', { className: 'media-director-upper' },
      h('section', { className: 'media-director-stage', 'data-tour': 'media-preview', 'aria-label': t('实时导演监看台', 'Live stage monitor') },
        h('div', { className: 'media-stage-hud' },
          h('div', { className: 'media-stage-tc-group' },
            h('span', { className: 'media-stage-dot', 'data-live': playing || previewing ? 'true' : 'false', 'aria-hidden': 'true' }),
            h('span', { className: 'media-stage-tc', 'data-stage-timecode': '' }, mediaFormatTc(clampedPlayhead) + ' / ' + mediaFormatTc(duration).replace('TC ', '')),
            h('span', { className: 'media-stage-badge' }, activeTemplateLabel + ' · ' + (formatOptions.find(f => f.id === fields.format)?.label || '16:9'))),
          h('div', { className: 'media-led-matrix', role: 'group', 'aria-label': t('24点渲染矩阵', '24-LED Render Matrix') },
            Array.from({ length: 24 }, (_, idx) => {
              const lit = idx <= activeLedIndex;
              const isHead = idx === activeLedIndex;
              return h('button', {
                key: idx,
                type: 'button',
                className: 'media-led-dot',
                'data-led-index': idx,
                'data-lit': lit ? 'true' : 'false',
                'data-head': isHead ? 'true' : 'false',
                title: t('跳转到 ', 'Jump to ') + ((idx / 24) * duration).toFixed(1) + 's',
                'aria-label': t('矩阵时间点 ', 'Matrix step ') + (idx + 1) + ' / 24',
                onClick: () => { setPlaying(false); setPlayhead(Number(((idx / 24) * duration).toFixed(2))); },
              });
            })),
          render ? h('div', { className: 'media-stage-view-pills' },
            h('button', { type: 'button', className: 'media-mini-pill', 'aria-pressed': stageView === 'monitor', onClick: () => setStageView('monitor') }, t('实时监看', 'Monitor')),
            h('button', { type: 'button', className: 'media-mini-pill', 'aria-pressed': stageView === 'mp4', onClick: () => setStageView('mp4') }, t('成片 MP4', 'MP4'))) : null),
        h('div', { className: 'media-stage-bezel' },
          render && stageView === 'mp4'
            ? h('div', { className: 'media-stage-video-wrap' },
                h('video', { key: render.id, controls: true, preload: 'metadata', width: videoWidth, height: videoHeight, src: urlFor(project, 'mp4', { render: render.id }), 'aria-label': t('已导出视频', 'Exported video') }))
            : h('div', {
                className: 'media-stage-frame',
                'data-format': fields.format,
                'data-template': fields.template,
                style: { aspectRatio: ratioCss },
              },
                activeScene?.imageAsset && project
                  ? h('img', {
                      className: 'media-stage-bg-img',
                      src: urlFor(project, 'asset', { asset: activeScene.imageAsset.id }),
                      alt: activeScene.imageAsset.name,
                    })
                  : null,
                h('div', { className: 'media-stage-grid', 'aria-hidden': 'true' }),
                h('div', { className: 'media-stage-frame-top' },
                  h('span', { className: 'media-stage-scene-tag' }, 'SCENE ' + String((activeScene?.index ?? 0) + 1).padStart(2, '0') + ' / ' + String(scenes.length).padStart(2, '0')),
                  h('span', { className: 'media-stage-engine-tag' }, title.toUpperCase() + (project ? ' · R' + project.revision : ' · DRAFT'))),
                h('div', {
                  className: 'media-stage-frame-body',
                  style: { transform: `translate3d(0, ${((0.5 - sceneProgress) * 4).toFixed(1)}px, 0)` },
                },
                  h('div', { className: 'media-stage-title', 'data-dsh-serif': '' }, fields.title.trim() || t('未命名视频工程', 'Untitled Video Project')),
                  h('p', { className: 'media-stage-caption', 'data-stage-active-line': '' }, activeScene?.caption || '')),
                h('div', { className: 'media-stage-progress-track', 'aria-hidden': 'true' },
                  h('div', { className: 'media-stage-progress-fill', style: { width: (progressRatio * 100).toFixed(2) + '%' } })))),
        h('div', { className: 'media-stage-footer' },
          h('span', { className: 'media-stage-status' },
            ready ? t('渲染引擎就绪', 'Renderer ready') : t('需在「环境」准备渲染器', 'Prepare renderer in Environment'),
            render ? ' · ' + (dirty ? t('成片基于已保存修订', 'MP4 from saved revision') : stale ? t('有新修改待重新导出', 'New edits pending export') : t('最新修订已导出', 'Latest revision exported')) : ''),
          render ? h('a', { className: 'media-stage-download-link', href: urlFor(project, 'mp4', { render: render.id, download: '1' }), download: '' }, h(W.Icon, { name: 'download', size: 14 }), t('下载 MP4', 'Download MP4')) : null)),
      h('aside', { className: 'media-director-strip', 'data-tour': 'media-inspector', 'data-dsh-card': '', 'aria-label': t('实体参数控制台', 'Tactile parameter strip') },
        h('div', { className: 'media-strip-block' },
          h('label', { className: 'media-strip-label', htmlFor: controlId + '-director-title' }, t('工程标题', 'Project title')),
          h(W.Input, {
            id: controlId + '-director-title',
            value: fields.title,
            disabled: running,
            maxLength: 72,
            placeholder: t('输入视频标题…', 'Enter video title…'),
            onChange: e => { setFields({ ...fields, title: e.target.value }); setDirty(true); },
          })),
        h('div', { className: 'media-strip-block' },
          h('span', { className: 'media-strip-label' }, t('画幅比例', 'Aspect ratio')),
          h('div', { className: 'media-keycap-row', role: 'group', 'aria-label': t('画幅切换', 'Aspect ratio keys') },
            formatOptions.map(opt => h('button', {
              key: opt.id,
              type: 'button',
              className: 'media-mech-key',
              'aria-pressed': fields.format === opt.id,
              title: opt.title,
              disabled: running,
              onClick: () => { setFields({ ...fields, format: opt.id }); setDirty(true); },
            }, h('span', { className: 'media-mech-led', 'aria-hidden': 'true' }), opt.label)))),
        h('div', { className: 'media-strip-block' },
          h('span', { className: 'media-strip-label' }, t('视觉模板', 'Template')),
          h('div', { className: 'media-pill-grid', role: 'group', 'aria-label': t('模板选择', 'Template pills') },
            templateList.map(row => h('button', {
              key: row.id,
              type: 'button',
              className: 'media-tpl-pill',
              'aria-pressed': fields.template === row.id,
              disabled: running,
              onClick: () => { setFields({ ...fields, template: row.id }); setDirty(true); },
            }, lang === 'en' ? row.en : row.zh)))),
        h('div', { className: 'media-strip-block' },
          h('div', { className: 'media-strip-row-head' },
            h('label', { className: 'media-strip-label', htmlFor: controlId + '-director-duration' }, t('时长', 'Duration')),
            h('span', { className: 'media-duration-badge' }, (durationValid ? fields.duration : duration) + 's')),
          h('div', { className: 'media-slider-row' },
            h('button', {
              type: 'button',
              className: 'media-step-key',
              disabled: running || duration <= 3,
              'aria-label': t('减少 1 秒', 'Decrease 1 second'),
              onClick: () => { const next = Math.max(3, duration - 1); setDurationText(String(next)); setFields({ ...fields, duration: next }); setDirty(true); },
            }, '−'),
            h('input', {
              id: controlId + '-director-duration',
              className: 'media-tactile-slider',
              type: 'range',
              min: 3,
              max: 30,
              step: 1,
              value: durationValid ? fields.duration : duration,
              disabled: running,
              onChange: e => {
                const next = Number(e.target.value);
                setDurationText(String(next));
                setDurationTouched(true);
                setFields({ ...fields, duration: next });
                setDirty(true);
              },
            }),
            h('button', {
              type: 'button',
              className: 'media-step-key',
              disabled: running || duration >= 30,
              'aria-label': t('增加 1 秒', 'Increase 1 second'),
              onClick: () => { const next = Math.min(30, duration + 1); setDurationText(String(next)); setFields({ ...fields, duration: next }); setDirty(true); },
            }, '+'))),
        h('div', { className: 'media-strip-block' },
          h('div', { className: 'media-strip-inline-actions' },
            h(W.Button, {
              size: 'sm',
              icon: 'edit',
              'aria-expanded': scriptOpen,
              onClick: () => setScriptOpen(prev => !prev),
            }, t('分镜脚本', 'Script') + ' (' + (rawLines.length || 0) + ')'),
            h(W.Button, {
              size: 'sm',
              icon: 'image',
              disabled: !project || running || dirty,
              onClick: () => setEditorTab('assets'),
            }, t('素材', 'Media') + ' (' + (project?.assets.length || 0) + ')')),
          scriptOpen ? h('div', { className: 'media-inline-script-box' },
            h('textarea', {
              id: controlId + '-director-body',
              value: fields.body,
              disabled: running,
              maxLength: 360,
              rows: 4,
              placeholder: t('每行对应一个分镜场景…', 'One line per scene…'),
              onChange: e => { setFields({ ...fields, body: e.target.value }); setDirty(true); },
            })) : null),
        slideshowWarning ? h(W.Status, { tone: 'warn' }, slideshowWarning) : null,
        h('div', { className: 'media-strip-actions' },
          h(W.Button, {
            icon: 'play',
            disabled: !project || running || dirty || !ready,
            title: !ready ? t('先在“环境”页准备渲染工具。', 'Prepare the renderer in Environment first.') : undefined,
            onClick: () => start('preview'),
          }, t('启动 Studio 预览', 'Start Studio preview')),
          previewing ? h(W.Button, {
            icon: 'close',
            disabled: busy,
            onClick: () => perform(async () => { await api({ action: 'cancel', job: job.id }); setNotice(t('已请求停止；正在关闭本次任务。', 'Stopping this job.')); }),
          }, t('停止预览', 'Stop preview')) : null,
          previewing && job.url ? h('a', { className: 'w-button', href: job.url, target: '_blank', rel: 'noopener noreferrer' }, h(W.Icon, { name: 'external', size: 16 }), t('打开 Studio', 'Open Studio')) : null,
          project ? h(W.Button, {
            variant: 'primary',
            icon: 'download',
            disabled: running || dirty || !ready,
            title: exportHint,
            onClick: () => setExportReview(true),
          }, t('导出 MP4', 'Export MP4')) : null,
          project && dirty ? h(W.Button, {
            variant: 'ghost',
            icon: 'close',
            disabled: running,
            onClick: () => { syncFields(fieldsOf(project)); setDirty(false); setError(''); },
          }, t('取消修改', 'Discard changes')) : null))),
    h('section', { className: 'media-timeline-deck', 'data-tour': 'media-timeline', 'data-dsh-card': '', 'aria-label': t('非线性多轨时间线', 'Multi-track hardware timeline') },
      h('div', { className: 'media-transport-bar' },
        h('div', { className: 'media-transport-controls' },
          h('button', {
            type: 'button',
            className: 'media-transport-play',
            'data-playing': playing ? 'true' : 'false',
            onClick: () => setPlaying(prev => !prev),
          }, playing ? t('❚❚ 暂停', '❚❚ Pause') : t('▶ 播放', '▶ Play')),
          h('button', {
            type: 'button',
            className: 'media-transport-key',
            'aria-label': t('回到起点', 'Rewind to start'),
            onClick: () => { setPlaying(false); setPlayhead(0); },
          }, '|<'),
          h('button', {
            type: 'button',
            className: 'media-transport-key',
            'aria-label': t('上一镜', 'Previous scene'),
            onClick: () => stepScene(-1),
          }, '◀'),
          h('button', {
            type: 'button',
            className: 'media-transport-key',
            'aria-label': t('下一镜', 'Next scene'),
            onClick: () => stepScene(1),
          }, '▶')),
        h('div', { className: 'media-transport-meta' },
          h('span', { className: 'media-stage-tc' }, mediaFormatTc(clampedPlayhead)),
          h('span', { className: 'w-muted' }, scenes.length + t(' 镜 · ', ' scenes · ') + duration + 's'))),
      h('div', { className: 'media-tracks-wrap' },
        h('div', { className: 'media-track-labels', 'aria-hidden': 'true' },
          h('span', { className: 'media-track-label-spacer' }, 'TIME'),
          h('span', { className: 'media-track-label' }, t('画面轨', 'VIDEO')),
          h('span', { className: 'media-track-label' }, t('字幕轨', 'CAPTION')),
          h('span', { className: 'media-track-label' }, t('节奏轨', 'PACE'))),
        h('div', {
          ref: trackRef,
          className: 'media-tracks-lane',
          role: 'slider',
          tabIndex: 0,
          'aria-label': t('时间线指针拖动条', 'Timeline playhead scrubber'),
          'aria-valuemin': 0,
          'aria-valuemax': duration,
          'aria-valuenow': Number(clampedPlayhead.toFixed(1)),
          onPointerDown: onTrackPointerDown,
          onPointerMove: onTrackPointerMove,
          onPointerUp: onTrackPointerEnd,
          onPointerCancel: onTrackPointerEnd,
          onKeyDown: e => {
            if (e.key === 'ArrowRight') { e.preventDefault(); setPlaying(false); setPlayhead(p => Math.min(duration, Number((p + 0.5).toFixed(2)))); }
            else if (e.key === 'ArrowLeft') { e.preventDefault(); setPlaying(false); setPlayhead(p => Math.max(0, Number((p - 0.5).toFixed(2)))); }
          },
        },
          h('div', { className: 'media-ruler', 'aria-hidden': 'true' },
            Array.from({ length: 5 }, (_, i) => h('span', { key: i, className: 'media-ruler-tick' }, Math.round((i / 4) * duration) + 's'))),
          h('div', { className: 'media-track-row media-track-video' },
            scenes.map(scene => h('div', {
              key: scene.index,
              className: 'media-clip-block',
              'data-color': scene.colorIndex,
              'data-active': activeScene?.index === scene.index ? 'true' : 'false',
              style: { width: (((scene.end - scene.start) / duration) * 100).toFixed(3) + '%' },
              title: scene.label + ' (' + scene.start.toFixed(1) + 's–' + scene.end.toFixed(1) + 's)',
            }, h('span', { className: 'media-clip-index' }, 'S' + String(scene.index + 1).padStart(2, '0')), h('span', { className: 'media-clip-name' }, scene.label)))),
          h('div', { className: 'media-track-row media-track-caption' },
            scenes.map(scene => h('div', {
              key: scene.index,
              className: 'media-caption-pill',
              'data-active': activeScene?.index === scene.index ? 'true' : 'false',
              style: { width: (((scene.end - scene.start) / duration) * 100).toFixed(3) + '%' },
            }, scene.caption))),
          h('div', { className: 'media-track-row media-track-pace' },
            h('div', { className: 'media-pace-bars', 'aria-hidden': 'true' },
              Array.from({ length: 24 }, (_, idx) => h('span', {
                key: idx,
                className: 'media-pace-bar',
                'data-lit': idx <= activeLedIndex ? 'true' : 'false',
                style: { height: (38 + ((idx * 17 + rawLines.length * 11) % 52)) + '%' },
              }))),
            h('span', { className: 'media-pace-tag' },
              audioAsset ? '♪ ' + audioAsset.name : videoAsset ? '▣ ' + videoAsset.name : t('节拍同步 · 120 BPM', 'Sync · 120 BPM'))),
          h('div', {
            className: 'media-playhead-needle',
            'data-playhead-needle': 'true',
            style: { left: (progressRatio * 100).toFixed(3) + '%' },
            'aria-hidden': 'true',
          }, h('span', { className: 'media-playhead-cap' }))))));
}

function MediaEnvironment({ engine, environment, activeJob, job, busy, start, t }) {
  return h('section', { className: 'media-environment card', 'data-dsh-card': '' },
    h('h3', { 'data-dsh-serif': '' }, t('渲染环境', 'Render environment') + (environment.ready ? t(' · 已准备', ' · ready') : t(' · 首次需下载', ' · first download required'))),
    h('p', { className: 'muted' }, t(environment?.hint, 'First use downloads the official CLI. ' + (engine === 'hyperframes' ? 'Windows uses the official rendering browser; other platforms reuse installed Chrome when available. FFmpeg and FFprobe must be in PATH.' : 'Downloads the official CLI and bundled chrome-headless-shell browser. Set REMOTION_BROWSER_EXECUTABLE to use a custom browser. Remotion retains its official license.'))),
    engine === 'remotion' && h('p', null, h('a', { href: 'https://www.remotion.dev/license', target: '_blank', rel: 'noreferrer' }, t('查看 Remotion 使用许可证', 'Read the Remotion license'))),
    h(W.Button, { variant: 'primary', icon: 'refresh', 'aria-busy': activeJob && job?.kind === 'prepare' ? 'true' : undefined, disabled: busy || activeJob, onClick: () => start('prepare') }, environment?.ready ? t('重新检查 / 修复环境', 'Check / repair environment') : t('准备渲染环境', 'Prepare render environment')));
}

function MediaCanvas({ project, fields, render, dirty, stale, job, running, ready, busy, start, perform, setNotice, t }) {
  const previewing = job?.kind === 'preview' && job.state === 'running';
  const ratio = fields.format === 'portrait' ? '9 / 16' : fields.format === 'square' ? '1 / 1' : '16 / 9';
  const [videoWidth, videoHeight] = fields.format === 'portrait' ? [720, 1280] : fields.format === 'square' ? [720, 720] : [1280, 720];
  return h('div', { className: 'media-preview-workspace', 'data-tour': 'media-preview' },
    h('div', { className: 'w-toolbar' },
      h(W.Button, { icon: 'play', disabled: !project || running || dirty || !ready, title: !ready ? t('先在“环境”页准备渲染工具。', 'Prepare the renderer in Environment first.') : undefined, onClick: () => start('preview') }, t('启动 Studio 预览', 'Start Studio preview')),
      h(W.Button, { icon: 'close', disabled: busy || !previewing, onClick: () => perform(async () => { await api({ action: 'cancel', job: job.id }); setNotice(t('已请求停止；正在关闭本次任务。', 'Stopping this job.')); }) }, t('停止预览', 'Stop preview')),
      previewing && job.url ? h('a', { className: 'w-button', href: job.url, target: '_blank', rel: 'noopener noreferrer' }, h(W.Icon, { name: 'external', size: 16 }), t('打开 Studio', 'Open Studio')) : null),
    render ? h('div', { className: 'media-player-wrap', 'data-dsh-card': '' }, h('video', { key: render.id, controls: true, preload: 'metadata', width: videoWidth, height: videoHeight, src: urlFor(project, 'mp4', { render: render.id }), 'aria-label': t('已导出视频', 'Exported video') })) :
      job?.state === 'running' ? h('div', { className: 'w-preview-empty media-empty-preview', 'data-dsh-card': '', style: { aspectRatio: ratio, width: fields.format === 'portrait' ? 'min(100%, 240px)' : fields.format === 'square' ? 'min(100%, 440px)' : 'min(100%, 960px)', maxHeight: 'none', minHeight: '0px', alignSelf: 'center' } }, h(W.Skeleton, { variant: 'card', label: t('正在准备预览或渲染视频…', 'Preparing preview or rendering video…'), style: { width: '100%', maxWidth: '380px' } }), h('p', { className: 'w-muted' }, t('任务运行中，完成后可在此播放 MP4。', 'Job in progress. Play the MP4 here once complete.'))) :
      h('div', { className: 'w-preview-empty media-empty-preview', 'data-dsh-card': '', style: { aspectRatio: ratio, width: fields.format === 'portrait' ? 'min(100%, 240px)' : fields.format === 'square' ? 'min(100%, 440px)' : 'min(100%, 960px)', maxHeight: 'none', minHeight: '0px', alignSelf: 'center' } }, h(W.Icon, { name: 'video', size: 32 }), h('strong', { 'data-dsh-serif': '' }, t('导出 MP4 后可在这里播放', 'Play the MP4 here after exporting')), h('p', { className: 'w-muted' }, t('Studio 预览会在单独页面打开。', 'Studio preview opens in a separate page.'))),
    h('p', { className: 'w-muted media-render-caption' }, render ? dirty ? t('此 MP4 反映已保存修订；当前编辑尚未保存。', 'This MP4 reflects a saved revision. Current edits are not saved.') : t('此 MP4 来自修订 ', 'This MP4 uses revision ') + render.revision + (stale ? t('，工程已有更新，请重新导出。', '; your project has newer changes. Export again.') : t('，请播放检查最终画面。', '. Play it to check the final output.')) : t('尚未导出本次修改。', 'No export for these changes yet.')),
    render ? h('a', { className: 'w-button', href: urlFor(project, 'mp4', { render: render.id, download: '1' }), download: '' }, h(W.Icon, { name: 'download', size: 16 }), t('下载这份 MP4', 'Download this MP4')) : null);
}

function MediaAssets({ project, dirty, running, fileRef, upload, perform, setProject, t }) {
  const [remove, setRemove] = useState(null);
  if (!project) return h(W.Empty, { title: t('先保存工程，再添加素材', 'Save the project before adding media'), icon: 'video' }, t('填写标题并点击上方“保存工程”。', 'Enter a title and choose Save project above.'));
  const imageIds = project.assets.filter(asset => asset.kind === 'image').map(asset => asset.id);
  const move = (asset, offset) => perform(async () => {
    const order = [...imageIds], index = order.indexOf(asset.id), next = index + offset;
    if (index < 0 || next < 0 || next >= order.length) return;
    [order[index], order[next]] = [order[next], order[index]];
    setProject(await api({ action: 'reorderImages', id: project.id, revision: project.revision, imageIds: order }));
  });
  return h('section', { className: 'media-assets-view' },
    h('div', { className: 'w-toolbar' }, h('h3', null, t('工程素材', 'Project media') + ' · ' + project.assets.length), h(W.Button, { icon: 'upload', variant: 'primary', disabled: running || dirty, onClick: () => fileRef.current?.click() }, t('上传素材', 'Upload media'))),
    h('p', { className: 'w-muted' }, t('PNG/JPEG/WebP 图片、一个背景音频（MP3/WAV/M4A）和一个静音背景视频（MP4）；每个 ≤20 MB，总共 ≤40 MB。轮播按下方图片顺序，每张至少两秒。', 'PNG/JPEG/WebP images, one background audio (MP3/WAV/M4A) and one muted background video (MP4); each ≤20 MB, total ≤40 MB. Slideshow follows the image order below, at least two seconds per image.')),
    imageIds.length > 1 ? h('p', { className: 'w-muted' }, t('上移或下移图片后立即保存。已导出的 MP4 保持原样，请重新导出以应用新顺序。', 'Moving an image saves its order immediately. Existing MP4s are preserved; export again to apply the new order.')) : null,
    dirty ? h(W.Status, null, t('请先保存修改，再上传或移除素材副本。', 'Save changes before uploading or removing media copies.')) : null,
    h('input', { ref: fileRef, type: 'file', accept: '.png,.jpg,.jpeg,.webp,.mp3,.wav,.m4a,.mp4', disabled: running || dirty, onChange: upload, 'aria-label': t('上传素材副本', 'Upload a media copy'), style: { display: 'none' } }),
    project.assets.length ? h('ul', { className: 'media-asset-list' }, project.assets.map(asset => h('li', { key: asset.id, className: 'media-asset-card dsh-row', 'data-dsh-row': '', 'data-dsh-card': '' }, asset.kind === 'image' ? h('img', { src: urlFor(project, 'asset', { asset: asset.id }), alt: asset.name, width: 80, height: 60, loading: 'lazy' }) : h(W.Icon, { name: asset.kind === 'video' ? 'video' : 'file', size: 28 }),
      h('div', null, h('strong', { 'data-dsh-serif': '' }, asset.name), h('p', { className: 'w-muted' }, (asset.kind === 'image' ? t('图片 ', 'Image ') + (imageIds.indexOf(asset.id) + 1) + ' / ' + imageIds.length : asset.kind === 'audio' ? t('背景音频', 'Background audio') : t('背景视频', 'Background video')) + ' · ' + Math.ceil(asset.bytes / 1024) + ' KB')),
      h('div', { className: 'dsh-row-actions', 'data-window-drag-exclude': '' },
        asset.kind === 'image' && imageIds.length > 1 ? h('div', { className: 'w-toolbar media-asset-order' },
          h(W.Button, { variant: 'ghost', icon: 'up', disabled: running || dirty || imageIds.indexOf(asset.id) === 0, 'aria-label': t('上移图片：', 'Move image up: ') + asset.name, onClick: () => move(asset, -1) }, t('上移', 'Move up')),
          h(W.Button, { variant: 'ghost', icon: 'down', disabled: running || dirty || imageIds.indexOf(asset.id) === imageIds.length - 1, 'aria-label': t('下移图片：', 'Move image down: ') + asset.name, onClick: () => move(asset, 1) }, t('下移', 'Move down'))) : null,
        h(W.Button, { variant: 'danger', icon: 'trash', disabled: running || dirty, onClick: () => setRemove(asset) }, t('移除上传副本', 'Remove uploaded copy')))))) : h(W.Empty, { title: t('还没有上传素材', 'No media uploaded yet'), icon: 'video' }, t('标题卡可以直接导出。需要图片或配乐时，再上传自己的素材。', 'Title cards can be exported as they are. Upload your own media when you need images or music.')),
    remove ? h(W.Dialog, { className: 'dmw media-dialog', title: t('移除素材副本', 'Remove media copy'), closeLabel: t('取消', 'Cancel'), busy: running, onClose: () => setRemove(null) }, h('p', null, remove.name), h('p', { className: 'w-muted' }, t('仅移除本工程中的上传副本，原文件保留。', 'Only the uploaded project copy is removed. Your original file is preserved.')), h('div', { className: 'w-toolbar' }, h(W.Button, { variant: 'danger', icon: 'trash', disabled: running || dirty, onClick: () => perform(async () => { setProject(await api({ action: 'removeAsset', id: project.id, revision: project.revision, asset: remove.id })); setRemove(null); }) }, t('确认移除副本', 'Confirm removal')), h(W.Button, { disabled: running, onClick: () => setRemove(null) }, t('取消', 'Cancel')))) : null);
}

function MediaExports({ project, dirty, running, activeJob, busy, setArchiveReview, onTrash, t }) {
  if (!project) return h(W.Empty, { title: t('工程尚未保存', 'Project not saved yet'), icon: 'video' }, t('保存后才能导出视频和可编辑工程。', 'Save the project to export video and editable source.'));
  return h('section', { className: 'media-exports-view' },
    h('h3', null, t('已导出成品', 'Exported videos')),
    h('p', { className: 'w-muted' }, t('每份 MP4 对应已保存的工程修订。修改内容后，需要重新导出。', 'Each MP4 corresponds to a saved project revision. Export again after editing.')),
    project.renders.length ? h('ul', { className: 'media-export-list' }, project.renders.map(render => h('li', { key: render.id, className: 'media-export-card dsh-row', 'data-dsh-row': '', 'data-dsh-card': '' },
      h('div', null, h('strong', { 'data-dsh-serif': '' }, t('修订 ', 'Revision ') + render.revision), h('p', { className: 'w-muted' }, new Date(render.created).toLocaleString() + ' · ' + Math.ceil(render.bytes / 1024) + ' KB'), render.revision === project.revision && !dirty ? h('span', { className: 'w-tag' }, t('当前已保存版本', 'Current saved version')) : null),
      h('div', { className: 'dsh-row-actions', 'data-window-drag-exclude': '' },
        h('a', { className: 'w-button', href: urlFor(project, 'mp4', { render: render.id, download: '1' }), download: '' }, h(W.Icon, { name: 'download', size: 16 }), t('下载 MP4', 'Download MP4')))))) : h(W.Empty, { title: t('尚无 MP4 成品', 'No MP4 yet'), icon: 'video' }, t('先准备环境、保存并预览工程，再点击“导出 MP4”。', 'Prepare the renderer, save and preview the project, then choose Export MP4.')),
    h('section', { className: 'w-section' }, h('h3', null, t('工程备份', 'Editable project backup')), h('a', { className: 'w-button', href: urlFor(project, 'source'), download: '' }, h(W.Icon, { name: 'download', size: 16 }), t('下载可编辑工程', 'Download editable project'))),
    h('section', { className: 'w-section' }, h('h3', null, t('归档与移入回收站', 'Archive & Recycle Bin')), h('p', { className: 'w-muted' }, t('归档保留素材与成品，不占当前 30 个工程名额；移入回收站会将该工程目录送入系统回收站，可在系统回收站还原。', 'Archiving preserves media and exports while freeing a slot; moving to the Recycle Bin sends the project folder to your OS Recycle Bin where it can be restored.')), h('div', { className: 'w-toolbar' }, h(W.Button, { icon: 'folder', disabled: busy || dirty || activeJob, onClick: () => setArchiveReview(true) }, t('归档此工程', 'Archive this project')), onTrash ? h(W.Button, { variant: 'danger', icon: 'trash', disabled: busy || dirty || activeJob, onClick: onTrash }, t('移入回收站', 'Move to Recycle Bin')) : null)));
}

const MEDIA_WORKBENCH_CSS = `
.media-workbench.dmw{--fg:var(--w-text);--fg-muted:var(--w-muted);--border:var(--w-border);--bg:var(--w-canvas);--bg-surface:var(--w-bg)}
.media-workbench .media-loading-skeleton{display:flex;flex-direction:column;gap:12px;max-width:860px;padding:18px 0}
.media-workbench .media-header-meta{font-variant-numeric:tabular-nums;font-weight:600}
.media-workbench .media-editor{display:flex;align-items:stretch;min-height:480px;flex:1 1 auto;min-width:0}
.media-workbench .media-content-fields{flex:none;width:var(--media-fields-width,272px);padding:16px 14px 16px 14px;margin:8px 4px 8px 0;border:var(--dsh-control-border-width,0.5px) solid var(--w-border);border-radius:var(--dsw-radius-md,10px);background:var(--dsw-alias-settings-card-fill,var(--w-canvas));min-width:0;overflow:auto}
.media-workbench .media-properties{flex:none;width:var(--media-inspector-width,244px);padding:16px 14px;margin:8px 0 8px 4px;border:var(--dsh-control-border-width,0.5px) solid var(--w-border);border-radius:var(--dsw-radius-md,10px);background:var(--dsw-alias-settings-card-fill,var(--w-canvas));min-width:0;overflow:auto}
.media-workbench .media-content-fields h3,.media-workbench .media-properties h3{margin-bottom:14px}
.media-workbench .media-field{display:grid;gap:6px;margin:0 0 14px;font-size:12.5px}
.media-workbench .media-field label{margin:0;color:var(--w-muted)}
.media-workbench .media-field input,.media-workbench .media-field select,.media-workbench .media-field textarea{width:100%;font-size:13.5px}
.media-workbench .media-field textarea{min-height:140px}
.media-workbench .media-preview-workspace{display:flex;flex-direction:column;align-items:stretch;gap:14px;padding:16px 18px;background:var(--w-bg);flex:1 1 auto;min-width:0;border-radius:var(--dsw-radius-md,10px);margin:8px 0}
.media-workbench .media-preview-workspace>.w-toolbar{justify-content:flex-start}
.media-workbench .media-empty-preview{margin:auto 0;max-height:600px;min-height:180px;width:100%;justify-content:center;background:var(--dsw-alias-settings-card-fill,var(--w-canvas));border-radius:var(--dsw-radius-md,10px);box-shadow:var(--dsh-card-shadow,var(--dsw-elevation-panel,0 4px 14px rgba(15,23,42,0.05)))}
.media-workbench .media-player-wrap{display:flex;justify-content:center;align-items:center;min-height:220px;flex:1;min-width:0;padding:8px;border:var(--dsh-control-border-width,1px) solid var(--w-border);border-radius:var(--dsw-radius-md,10px);background:var(--dsw-alias-settings-card-fill,var(--w-canvas))}
.media-workbench .media-player-wrap video{width:100%;height:auto;max-height:calc(100dvh - 340px);object-fit:contain;border-radius:var(--dsw-radius-sm,8px);background:var(--dsw-alias-bg-document-preview,#272c36)}
.media-workbench .media-render-caption{margin-top:0}
.media-workbench .media-preview-workspace>.w-button{align-self:flex-start}
.media-workbench .media-properties .w-section{padding:14px 0}
.media-workbench .media-properties .w-button{width:100%;margin-top:8px}
.media-workbench .media-properties p{margin:10px 0}
.media-workbench .media-job{border:var(--dsh-control-border-width,0.5px) solid var(--w-border);padding:10px 14px;margin:8px 0;border-radius:var(--dsw-radius-sm,8px);background:var(--dsw-alias-settings-card-fill,var(--w-bg));font-size:13px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.media-workbench .media-job details{width:100%}
.media-workbench .media-job pre{font-size:12px;max-height:240px}
.media-workbench .media-job .media-job-progress{width:180px;flex:none}
.media-workbench .media-job[data-state=failed]>strong{color:var(--dsw-alias-state-error-primary,#c83240)}
.media-workbench .media-job[data-state=done]>strong{color:var(--dsw-alias-state-success-primary,#24794a)}
:is(.media-workbench,.media-dialog) .media-export-checks{list-style:none;padding:0;margin:12px 0;display:grid;gap:6px;font-size:13px;overflow-wrap:anywhere}
.media-workbench .media-project-list{max-width:960px;padding:8px 0 24px}
.media-workbench .media-project-list .w-row-button{padding:14px 16px;border:0;border-radius:0;background:transparent}
.media-workbench .media-assets-view,.media-workbench .media-exports-view,.media-workbench .media-environment{padding:16px 0;width:min(940px,100%)}
.media-workbench .media-environment{padding:18px 20px}
.media-workbench .media-assets-view>.w-muted,.media-workbench .media-exports-view>.w-muted{margin-top:10px}
.media-workbench .media-asset-list,.media-workbench .media-export-list{list-style:none;padding:0;margin:16px 0;display:flex;flex-direction:column;gap:10px}
.media-workbench .media-asset-list>li,.media-workbench .media-export-list>li{display:flex;align-items:center;gap:14px;flex-wrap:wrap;min-width:0;padding:12px 16px;border:var(--dsh-control-border-width,1px) solid var(--w-border);border-radius:var(--dsw-radius-md,10px);background:var(--dsw-alias-settings-card-fill,var(--w-canvas))}
.media-workbench .media-asset-list>li>div:first-of-type,.media-workbench .media-export-list>li>div:first-of-type{flex:1;min-width:180px;overflow-wrap:anywhere}
.media-workbench .media-asset-list img{width:80px;height:60px;object-fit:contain;border-radius:var(--dsw-radius-xs,6px);background:var(--w-soft)}
.media-workbench .media-export-list p{margin-top:4px}
.media-workbench .media-export-list .w-tag{margin-top:6px}
.media-workbench .media-environment>p{margin:12px 0}
.media-workbench .media-environment>.w-button{margin-top:10px}
.media-workbench.dmw button.primary,:is(.media-workbench,.media-dialog) button.primary{background:var(--w-primary);border-color:var(--w-primary);color:var(--w-on-primary)}
.media-workbench .card{border:var(--dsh-control-border-width,1px) solid var(--w-border);border-radius:var(--dsw-radius-md,10px);padding:16px;background:var(--dsw-alias-settings-card-fill,var(--w-canvas));box-shadow:var(--dsh-card-shadow,none)}
:is(.media-workbench,.media-dialog) .notice{background:var(--w-bg);color:var(--w-text);border:var(--dsh-control-border-width,1px) solid var(--w-border);border-radius:var(--dsw-radius-sm,8px)}
:is(.media-workbench,.media-dialog) .notice.error{color:var(--dsw-alias-state-error-primary,#c83240);background:var(--dsw-alias-interactive-bg-hover-danger,var(--w-bg))}
.media-workbench .media-project-list .bar{display:flex;align-items:center;justify-content:space-between;gap:12px;border:var(--dsh-control-border-width,1px) solid var(--w-border);border-radius:var(--dsw-radius-sm,8px);background:var(--dsw-alias-settings-card-fill,var(--w-canvas));padding:12px 16px;margin:0}
.media-workbench .media-exports-view .w-section h3{margin-bottom:10px}
.media-workbench .media-properties a:not(.w-button){font-size:12px}
.media-workbench :focus-visible{outline:2px solid var(--w-accent);outline-offset:2px}
@container dsh-workbench (max-width:1050px){.media-workbench .media-editor{flex-wrap:wrap}.media-workbench .media-content-fields{width:var(--media-fields-width,250px)}.media-workbench .media-preview-workspace{flex:1 1 320px;margin-inline-end:0}.media-workbench .media-split-resizer-right{display:none}.media-workbench .media-properties{width:100%;margin:8px 0 0;display:grid;grid-template-columns:1fr 1fr;gap:18px}.media-workbench .media-properties>h3{grid-column:1/-1;margin:0}.media-workbench .media-properties>.w-section{padding:0;border:0}}
@container dsh-workbench (max-width:760px){.media-workbench .media-editor{flex-direction:column}.media-workbench .media-split-resizer{display:none}.media-workbench .media-content-fields{width:100%;margin:8px 0}.media-workbench .media-preview-workspace{order:-1;padding:14px 0;background:var(--w-canvas);margin:0}.media-workbench .media-properties{width:100%;display:block;margin:8px 0}.media-workbench .media-properties>.w-section{padding:16px 0;border-top:var(--dsh-control-border-width,0.5px) solid var(--w-border)}.media-workbench .media-empty-preview{max-height:440px}.media-workbench .media-player-wrap video{max-height:480px}.media-workbench .media-asset-list>li>div:first-of-type{min-width:120px}}
.media-workbench .media-console-bar{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:4px 0 8px;padding:4px 2px}
.media-workbench .media-console-id{display:inline-flex;align-items:center;gap:8px;font-size:12px;color:var(--w-muted)}
.media-workbench .media-console-chip{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;border:var(--dsh-control-border-width,1px) solid var(--w-border);background:var(--w-bg);font-family:var(--dsh-font-mono,ui-monospace,monospace);font-size:11px;font-weight:700;letter-spacing:0.04em;color:var(--w-text)}
.media-workbench .media-mode-switch{display:inline-flex;align-items:center;gap:3px;padding:3px;border-radius:var(--dsw-radius-md,10px);border:var(--dsh-control-border-width,1px) solid var(--w-border);background:var(--w-bg)}
.media-workbench .media-mode-btn{border:0!important;border-radius:var(--dsw-radius-sm,7px)!important;padding:4px 11px!important;font-size:12px!important;font-weight:600;background:transparent!important;color:var(--w-muted)!important}
.media-workbench .media-mode-btn[aria-pressed=true]{background:var(--w-canvas)!important;color:var(--w-text)!important;box-shadow:0 1px 3px rgba(15,23,42,0.1)}
.media-workbench .media-director-console{display:flex;flex-direction:column;gap:12px;min-width:0}
.media-workbench .media-director-upper{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(272px,336px);gap:12px;align-items:stretch;min-width:0}
.media-workbench .media-director-stage{display:flex;flex-direction:column;gap:10px;padding:12px 14px;border-radius:var(--dsw-radius-lg,14px);background:#1f242d;color:#eef2f7;border:1px solid #343b49;box-shadow:inset 0 1px 0 rgba(255,255,255,0.06),0 8px 24px rgba(15,23,42,0.14);min-width:0}
.media-workbench .media-stage-hud{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;min-width:0}
.media-workbench .media-stage-tc-group{display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;min-width:0}
.media-workbench .media-stage-dot{width:8px;height:8px;border-radius:50%;background:#6b7280;flex:none}
.media-workbench .media-stage-dot[data-live=true]{background:#e85d2a;box-shadow:0 0 8px rgba(232,93,42,0.75)}
.media-workbench .media-stage-tc{font-family:var(--dsh-font-mono,ui-monospace,monospace);font-variant-numeric:tabular-nums;font-size:12px;font-weight:700;letter-spacing:0.03em;color:#f3f6fb}
.media-workbench .media-stage-badge{font-size:11px;padding:2px 7px;border-radius:999px;background:#2b323f;border:1px solid #3f4859;color:#cbd5e1;white-space:nowrap}
.media-workbench .media-led-matrix{display:grid;grid-template-columns:repeat(12,8px);gap:3px;padding:4px 6px;border-radius:6px;background:#181c23;border:1px solid #2e3542;flex:none}
.media-workbench .media-led-dot{width:8px;height:8px;padding:0!important;border:0!important;border-radius:2px!important;background:#323946!important;cursor:pointer;display:block;min-width:0;min-height:0}
.media-workbench .media-led-dot[data-lit=true]{background:#4ea88a!important;box-shadow:0 0 4px rgba(78,168,138,0.45)}
.media-workbench .media-led-dot[data-head=true]{background:#e85d2a!important;box-shadow:0 0 6px rgba(232,93,42,0.85)}
.media-workbench .media-stage-view-pills{display:inline-flex;gap:4px}
.media-workbench .media-mini-pill{padding:2px 8px!important;font-size:11px!important;border-radius:6px!important;background:#2a313e!important;border:1px solid #3f4859!important;color:#cbd5e1!important}
.media-workbench .media-mini-pill[aria-pressed=true]{background:#e85d2a!important;border-color:#e85d2a!important;color:#ffffff!important}
.media-workbench .media-stage-bezel{flex:1 1 auto;display:flex;align-items:center;justify-content:center;padding:12px;border-radius:10px;background:#262c37;border:1px solid #363e4d;min-height:240px;min-width:0;overflow:hidden}
.media-workbench .media-stage-frame{position:relative;width:100%;max-width:520px;max-height:290px;margin:0 auto;border-radius:8px;background:linear-gradient(145deg,#2b3342 0%,#1f2530 100%);border:1px solid rgba(255,255,255,0.12);overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;padding:14px 16px;box-shadow:0 10px 26px rgba(15,23,42,0.35)}
.media-workbench .media-stage-frame[data-format=portrait]{width:auto;height:280px;max-width:170px}
.media-workbench .media-stage-frame[data-format=square]{width:auto;height:270px;max-width:270px}
.media-workbench .media-stage-bg-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.35;pointer-events:none}
.media-workbench .media-stage-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);background-size:20px 20px;pointer-events:none}
.media-workbench .media-stage-frame-top{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:8px;font-family:var(--dsh-font-mono,ui-monospace,monospace);font-size:10.5px;color:#94a3b8}
.media-workbench .media-stage-scene-tag{padding:2px 6px;border-radius:4px;background:rgba(232,93,42,0.18);border:1px solid rgba(232,93,42,0.42);color:#ffb092;font-weight:700}
.media-workbench .media-stage-engine-tag{opacity:0.85}
.media-workbench .media-stage-frame-body{position:relative;z-index:1;margin:auto 0;padding:10px 0;text-align:center}
.media-workbench .media-stage-title{font-size:clamp(16px,2.2vw,23px);line-height:1.25;font-weight:700;color:#f8fafc;text-shadow:0 2px 10px rgba(15,23,42,0.45);overflow-wrap:anywhere}
.media-workbench .media-stage-caption{margin:8px auto 0;max-width:44ch;font-size:13px;line-height:1.5;color:#cbd5e1;overflow-wrap:anywhere}
.media-workbench .media-stage-progress-track{position:relative;z-index:1;height:4px;border-radius:999px;background:rgba(255,255,255,0.12);overflow:hidden}
.media-workbench .media-stage-progress-fill{height:100%;border-radius:999px;background:#e85d2a}
.media-workbench .media-stage-video-wrap{width:100%;display:flex;justify-content:center}
.media-workbench .media-stage-video-wrap video{max-width:100%;max-height:280px;border-radius:6px}
.media-workbench .media-stage-footer{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:11.5px;color:#94a3b8;flex-wrap:wrap}
.media-workbench .media-stage-download-link{display:inline-flex;align-items:center;gap:5px;color:#ffb092;text-decoration:none;font-weight:600}
.media-workbench .media-director-strip{display:flex;flex-direction:column;gap:10px;padding:12px 14px;border:var(--dsh-control-border-width,1px) solid var(--w-border);border-radius:var(--dsw-radius-lg,14px);background:var(--dsw-alias-settings-card-fill,var(--w-canvas));min-width:0}
.media-workbench .media-strip-block{display:flex;flex-direction:column;gap:5px;min-width:0}
.media-workbench .media-strip-label{margin:0!important;font-size:11.5px;font-weight:600;color:var(--w-muted)}
.media-workbench .media-strip-row-head{display:flex;align-items:center;justify-content:space-between;gap:8px}
.media-workbench .media-duration-badge{font-family:var(--dsh-font-mono,ui-monospace,monospace);font-variant-numeric:tabular-nums;font-size:12px;font-weight:700;padding:1px 7px;border-radius:6px;background:var(--w-bg);border:1px solid var(--w-border)}
.media-workbench .media-keycap-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
.media-workbench .media-mech-key{display:inline-flex!important;align-items:center;justify-content:center;gap:6px;padding:7px 8px!important;font-size:12px!important;font-weight:650;border-radius:var(--dsw-radius-sm,8px)!important;background:var(--w-bg)!important;border:var(--dsh-control-border-width,1px) solid var(--w-border)!important;box-shadow:0 2px 0 var(--w-border)}
.media-workbench .media-mech-key[aria-pressed=true]{background:var(--w-selected)!important;border-color:var(--w-accent)!important;color:var(--w-accent)!important;box-shadow:inset 0 1px 2px rgba(15,23,42,0.12)}
.media-workbench .media-mech-led{width:6px;height:6px;border-radius:50%;background:var(--w-border);flex:none}
.media-workbench .media-mech-key[aria-pressed=true] .media-mech-led{background:#e85d2a;box-shadow:0 0 5px rgba(232,93,42,0.75)}
.media-workbench .media-pill-grid{display:flex;flex-wrap:wrap;gap:5px}
.media-workbench .media-tpl-pill{padding:4px 9px!important;font-size:11.5px!important;font-weight:600;border-radius:999px!important;background:var(--w-bg)!important;border:var(--dsh-control-border-width,1px) solid var(--w-border)!important}
.media-workbench .media-tpl-pill[aria-pressed=true]{background:var(--w-primary)!important;border-color:var(--w-primary)!important;color:var(--w-on-primary)!important}
.media-workbench .media-slider-row{display:flex;align-items:center;gap:6px}
.media-workbench .media-tactile-slider{flex:1;min-width:0;accent-color:#e85d2a;cursor:pointer}
.media-workbench .media-step-key{width:26px;height:26px;padding:0!important;display:inline-grid;place-items:center;font-weight:700;flex:none}
.media-workbench .media-strip-inline-actions{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.media-workbench .media-inline-script-box textarea{min-height:84px;font-size:12.5px}
.media-workbench .media-strip-actions{margin-top:auto;display:flex;flex-wrap:wrap;gap:6px;padding-top:4px;border-top:var(--dsh-control-border-width,0.5px) solid var(--w-border)}
.media-workbench .media-strip-actions .w-button{flex:1 1 auto;justify-content:center}
.media-workbench .media-timeline-deck{display:flex;flex-direction:column;gap:10px;padding:12px 14px;border:var(--dsh-control-border-width,1px) solid var(--w-border);border-radius:var(--dsw-radius-lg,14px);background:var(--dsw-alias-settings-card-fill,var(--w-canvas));min-width:0}
.media-workbench .media-transport-bar{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
.media-workbench .media-transport-controls{display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap}
.media-workbench .media-transport-play{background:#e85d2a!important;border-color:#d65020!important;color:#ffffff!important;font-weight:700!important;padding:6px 14px!important;border-radius:var(--dsw-radius-sm,8px)!important;box-shadow:0 2px 0 #b84118}
.media-workbench .media-transport-play[data-playing=true]{background:#d65020!important}
.media-workbench .media-transport-key{padding:5px 10px!important;font-family:var(--dsh-font-mono,ui-monospace,monospace);font-size:12px!important;font-weight:700}
.media-workbench .media-transport-meta{display:inline-flex;align-items:center;gap:10px;font-size:12px}
.media-workbench .media-transport-meta .media-stage-tc{color:var(--w-text)}
.media-workbench .media-tracks-wrap{display:grid;grid-template-columns:64px minmax(0,1fr);gap:8px;align-items:stretch;min-width:0}
.media-workbench .media-track-labels{display:grid;grid-template-rows:18px 34px 26px 26px;gap:5px;font-family:var(--dsh-font-mono,ui-monospace,monospace);font-size:10.5px;font-weight:700;color:var(--w-muted);align-items:center}
.media-workbench .media-track-label-spacer{opacity:0.7}
.media-workbench .media-tracks-lane{position:relative;display:grid;grid-template-rows:18px 34px 26px 26px;gap:5px;min-width:0;cursor:ew-resize;touch-action:none;user-select:none;padding:0 2px;border-radius:var(--dsw-radius-sm,8px);background:var(--w-bg);border:var(--dsh-control-border-width,1px) solid var(--w-border)}
.media-workbench .media-ruler{display:flex;justify-content:space-between;align-items:center;padding:0 4px;font-family:var(--dsh-font-mono,ui-monospace,monospace);font-size:10px;color:var(--w-muted);border-bottom:1px solid var(--w-border)}
.media-workbench .media-track-row{display:flex;align-items:stretch;gap:3px;min-width:0;padding:2px 3px}
.media-workbench .media-clip-block{display:flex;align-items:center;gap:5px;min-width:0;padding:0 7px;border-radius:5px;font-size:11px;font-weight:600;overflow:hidden;white-space:nowrap;border:1px solid transparent}
.media-workbench .media-clip-block[data-color="0"]{background:color-mix(in oklab,#3b82f6 18%,var(--w-canvas));border-color:color-mix(in oklab,#3b82f6 38%,transparent)}
.media-workbench .media-clip-block[data-color="1"]{background:color-mix(in oklab,#10b981 18%,var(--w-canvas));border-color:color-mix(in oklab,#10b981 38%,transparent)}
.media-workbench .media-clip-block[data-color="2"]{background:color-mix(in oklab,#f59e0b 20%,var(--w-canvas));border-color:color-mix(in oklab,#f59e0b 40%,transparent)}
.media-workbench .media-clip-block[data-color="3"]{background:color-mix(in oklab,#8b5cf6 18%,var(--w-canvas));border-color:color-mix(in oklab,#8b5cf6 38%,transparent)}
.media-workbench .media-clip-block[data-active=true]{outline:2px solid #e85d2a;outline-offset:-1px}
.media-workbench .media-clip-index{font-family:var(--dsh-font-mono,ui-monospace,monospace);font-size:10px;opacity:0.75;flex:none}
.media-workbench .media-clip-name{overflow:hidden;text-overflow:ellipsis}
.media-workbench .media-caption-pill{display:flex;align-items:center;min-width:0;padding:0 7px;border-radius:4px;background:var(--w-canvas);border:1px solid var(--w-border);font-size:11px;color:var(--w-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.media-workbench .media-caption-pill[data-active=true]{color:var(--w-text);border-color:#e85d2a}
.media-workbench .media-track-pace{position:relative;align-items:center;justify-content:space-between;background:color-mix(in oklab,var(--w-soft) 50%,transparent);border-radius:4px}
.media-workbench .media-pace-bars{display:grid;grid-template-columns:repeat(24,minmax(0,1fr));gap:3px;align-items:end;width:100%;height:18px;padding:0 4px}
.media-workbench .media-pace-bar{border-radius:2px;background:var(--w-border);opacity:0.55}
.media-workbench .media-pace-bar[data-lit=true]{background:#e85d2a;opacity:0.85}
.media-workbench .media-pace-tag{position:absolute;right:6px;font-size:10px;font-family:var(--dsh-font-mono,ui-monospace,monospace);padding:1px 6px;border-radius:4px;background:var(--w-canvas);border:1px solid var(--w-border);color:var(--w-muted);pointer-events:none}
.media-workbench .media-playhead-needle{position:absolute;top:0;bottom:0;width:2px;background:#e85d2a;pointer-events:none;transform:translateX(-1px);z-index:3}
.media-workbench .media-playhead-cap{position:absolute;top:0;left:-5px;width:12px;height:8px;border-radius:2px 2px 4px 4px;background:#e85d2a}
@media(prefers-reduced-motion:no-preference){.media-workbench .media-stage-frame-body{transition:transform 120ms linear}.media-workbench .media-led-dot{transition:background-color 120ms ease,box-shadow 120ms ease}}
.media-workbench>.dsh-header .w-tabs>button{padding:4px 8px;flex:none}
.media-workbench>.dsh-header .w-header-actions{gap:5px}
.media-workbench>.dsh-header .w-header-actions .w-button{padding-inline:9px}
@container dsh-workbench (max-width:1060px){.media-workbench>.dsh-header{flex-wrap:wrap;height:auto;min-height:48px;padding-block:6px;row-gap:6px;column-gap:8px;overflow:visible}.media-workbench>.dsh-header>.dsh-header-leading{flex:0 1 auto;max-width:100%;overflow:visible;flex-wrap:wrap;gap:6px 8px}.media-workbench>.dsh-header .dsh-header-tabs{flex:0 1 auto;overflow:visible}.media-workbench>.dsh-header .w-tabs{flex-wrap:wrap;overflow:visible}.media-workbench>.dsh-header>.w-header-actions{margin-inline-start:auto;flex-wrap:wrap;gap:4px}}
@container dsh-workbench (max-width:920px){.media-workbench .media-director-upper{grid-template-columns:1fr}.media-workbench .media-tracks-wrap{grid-template-columns:52px minmax(0,1fr)}}
`;
