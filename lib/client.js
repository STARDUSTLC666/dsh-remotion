// Generated: shared optional update controls; edit the original client templates.
(function(){
/* DSH workbench UI v1. MIT. Canonical source: dsh-suite/ui/workbench-ui.js.
 * Vendored into each plugin: no Suite or extra runtime dependency is required.
 * Styles are scoped to .dshw and never replace the host chrome or theme.
 */
function createWorkbenchUI(React) {
  const h = React.createElement;
  const { useEffect, useId, useRef } = React;
  const cx = (...values) => values.filter(Boolean).join(' ');
  const paths = {
    book: ['M4 4h6a3 3 0 0 1 2 2v15a4 4 0 0 0-4-2H4z', 'M20 4h-6a3 3 0 0 0-2 2v15a4 4 0 0 1 4-2h4z'],
    calendar: ['M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z', 'M7 3v4M17 3v4M3 10h18'],
    mail: ['M3 5h18v14H3z', 'm3 6 9 7 9-7'],
    rss: ['M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16', 'M4 19h.01'],
    slides: ['M3 4h18v13H3z', 'M12 17v4M8 21h8'],
    shield: ['m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6z', 'm8 12 3 3 5-6'],
    layers: ['M5 3h16v16H5z', 'M2 7v15h15'],
    play: ['m9 6 9 6-9 6Z'],
    video: ['M3 5h12v14H3z', 'm15 10 6-4v12l-6-4'],
    search: ['M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z', 'm16 16 5 5'],
    plus: ['M12 5v14M5 12h14'],
    refresh: ['M20 7a9 9 0 1 0 1 8', 'M20 2v5h-5'],
    settings: ['m9 3-.7 2.4-2 .9L4 5.8 2.5 8.4l1.7 1.8v2.3L2.5 14 4 17l2.5-.4 1.9 1L9 20h3l.8-2.4 2-1 2.5.4 1.5-2.7-1.7-1.9v-2.2l1.7-1.8-1.5-2.6-2.5.4-2-1L12 3Z', 'M14 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'],
    close: ['m6 6 12 12M18 6 6 18'],
    left: ['m14 5-7 7 7 7'],
    right: ['m10 5 7 7-7 7'],
    down: ['m5 9 7 7 7-7'],
    filter: ['M4 5h16M7 12h10M10 19h4'],
    download: ['M12 3v12m-5-5 5 5 5-5', 'M4 16v5h16v-5'],
    upload: ['M12 16V4m-5 5 5-5 5 5', 'M4 16v5h16v-5'],
    copy: ['M8 8h13v13H8z', 'M16 8V3H3v13h5'],
    external: ['M14 3h7v7m0-7L10 14', 'M10 3H3v18h18v-7'],
    file: ['M4 3h10l6 6v12H4z', 'M14 3v6h6M8 13h8M8 17h6'],
    folder: ['M3 5h7l2 3h9v12H3z'],
    edit: ['m15 4 5 5-10 10-6 1 1-6Z', 'm13 6 5 5'],
    trash: ['M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7'],
    more: ['M5 12h.01M12 12h.01M19 12h.01'],
    info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 11v6M12 7h.01'],
    check: ['m5 12 4 4L19 6'],
    quote: ['M4 12h6v7H3v-7c0-4 2-6 5-7M15 12h6v7h-7v-7c0-4 2-6 5-7'],
    star: ['m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z'],
    reply: ['m9 5-7 7 7 7v-5h6c3 0 5 2 6 5 0-8-4-11-12-11Z'],
    link: ['m10 13 4-4M8 16l-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0', 'm14 8 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0'],
  };
  function Icon({ name = 'file', size = 20, ...props }) {
    return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false, ...props },
      (paths[name] || paths.file).map((d, index) => h('path', { key: index, d })));
  }
  function Button({ children, icon, variant, className, ...props }) {
    return h('button', { type: 'button', ...props, className: cx('w-button', variant && 'w-' + variant, className) }, icon ? h(Icon, { name: icon, size: 18 }) : null, children);
  }
  function IconButton({ label, icon, ...props }) {
    return h(Button, { ...props, icon, className: cx('w-icon-button', props.className), 'aria-label': label, title: label });
  }
  function Page({ title, subtitle, actions, children, workbench = false, className, rootRef, ...props }) {
    return h('section', { ...props, ref: rootRef, className: cx('dshw', 'w-page', className), 'data-main': workbench ? 'true' : 'false' },
      h(Styles, { key: 'styles' }),
      h('header', { className: 'w-page-header' }, h('div', { className: 'w-heading' }, h('h1', null, title), subtitle ? h('p', { className: 'w-subtitle' }, subtitle) : null), actions ? h('div', { className: 'w-header-actions' }, actions) : null),
      h('div', { className: 'w-body' }, children));
  }
  function Tabs({ items, value, onChange, label, children }) {
    const id = useId();
    const active = items.some(item => item.id === value) ? value : items[0]?.id;
    function keys(event, index) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
      const node = event.currentTarget.parentElement?.querySelectorAll('[role=tab]')[next];
      if (node) { onChange(items[next].id); node.focus(); }
    }
    return h('div', { className: 'w-tabs-layout' },
      h('div', { className: 'w-tabs', role: 'tablist', 'aria-label': label }, items.map((item, index) => h('button', {
        type: 'button', role: 'tab', key: item.id, id: id + '-' + item.id, 'aria-controls': id + '-panel', 'aria-selected': active === item.id, tabIndex: active === item.id ? 0 : -1,
        onClick: () => onChange(item.id), onKeyDown: event => keys(event, index),
      }, item.label, item.count !== undefined ? h('span', { className: 'w-count' }, item.count) : null))),
      h('div', { className: 'w-tab-panel', id: id + '-panel', role: 'tabpanel', 'aria-labelledby': id + '-' + active }, children));
  }
  function Status({ children, tone = 'info', className }) {
    if (!children) return null;
    return h('div', { className: cx('dshw', 'w-status', 'w-status-' + tone, className), role: tone === 'error' ? 'alert' : 'status', 'aria-live': tone === 'error' ? 'assertive' : 'polite' }, h(Icon, { name: tone === 'success' ? 'check' : 'info', size: 18 }), h('div', null, children));
  }
  function Empty({ title, children, action, icon = 'file' }) {
    return h('div', { className: 'dshw w-empty' }, h(Styles, { key: 'styles' }), h(Icon, { name: icon, size: 32 }), h('h2', null, title), children ? h('div', { className: 'w-muted' }, children) : null, action ? h('div', { className: 'w-toolbar' }, action) : null);
  }
  function Split({ list, detail, selected, onBack, backLabel, className, listWidth = 360 }) {
    const ref = useRef(null);
    useEffect(() => {
      if (!selected || !ref.current || ref.current.clientWidth > 760) return;
      const heading = ref.current.querySelector('.w-detail h2');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    }, [selected]);
    return h('div', { ref, className: cx('w-split', className), 'data-selected': selected ? 'true' : 'false', style: { '--w-list-width': listWidth + 'px' } },
      h('div', { className: 'w-master' }, list),
      h('div', { className: 'w-detail' }, selected ? h(Button, { className: 'w-back', icon: 'left', variant: 'ghost', onClick: onBack }, backLabel) : null, detail));
  }
  function Row({ title, meta, description, active, onClick, children, status, className, disabled }) {
    return h('div', { className: cx('w-row', active && 'w-selected', className) },
      children ? h('div', { className: 'w-row-select' }, children) : null,
      h('button', { type: 'button', className: 'w-row-button', onClick, disabled, 'aria-pressed': !!active },
        h('span', { className: 'w-row-head' }, h('strong', null, title), status ? h('span', { className: 'w-tag' }, status) : null),
        meta ? h('span', { className: 'w-row-meta' }, meta) : null,
        description ? h('span', { className: 'w-row-description' }, description) : null));
  }
  function Search({ label, value, onChange, ...props }) {
    const id = useId();
    return h('div', { className: 'w-search' }, h(Icon, { name: 'search', size: 18 }), h('input', { type: 'search', id, 'aria-label': label, placeholder: label, value, onChange, ...props }));
  }
  function Switch({ label, checked, onChange, disabled }) {
    return h('label', { className: 'w-switch-label' }, h('span', null, label), h('input', { type: 'checkbox', role: 'switch', checked, disabled, onChange, 'aria-label': label }), h('span', { className: 'w-switch-track', 'aria-hidden': true }));
  }
  function Dialog({ title, children, onClose, closeLabel, className, busy = false }) {
    const id = useId(), panel = useRef(null);
    useEffect(() => {
      const previous = document.activeElement;
      panel.current?.querySelector('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')?.focus();
      return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }); };
    }, []);
    function keydown(event) {
      if (event.key === 'Escape' && !event.isComposing) { event.preventDefault(); event.stopPropagation(); if (!busy) onClose(); return; }
      if (event.key !== 'Tab') return;
      const controls = [...panel.current.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]')].filter(node => node.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (!controls.length) { event.preventDefault(); panel.current.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    return h('div', { className: 'dshw w-overlay', onClick: event => { if (!busy && event.target === event.currentTarget) onClose(); } },
      h(Styles, { key: 'styles' }),
      h('section', { ref: panel, className: cx('w-dialog', className), role: 'dialog', 'aria-modal': true, 'aria-labelledby': id, tabIndex: -1, onKeyDown: keydown },
        h('header', { className: 'w-dialog-header' }, h('h2', { id }, title), h(IconButton, { icon: 'close', label: closeLabel, disabled: busy, onClick: onClose })), h('div', { className: 'w-dialog-body' }, children)));
  }
  function register(ctx, { id, label, icon, component, inject, order = 50 }) {
    // The two slots are optional. Existing settings and manual tools still load
    // in hosts without a workbench, while RC.3 owns navigation/pinning itself.
    ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: id, inject: () => ({ ...(inject?.() || {}), workbench: true }) }, component));
    ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id, order, label }, function WorkbenchIcon({ size }) { return h(Icon, { name: icon, size }); }));
  }
  const styles = `
.dshw{--w-bg:var(--dsw-alias-bg-layer-1,#fff);--w-soft:var(--dsw-alias-bg-layer-2,#f7f8fa);--w-text:var(--dsw-alias-label-primary,#18202c);--w-muted:var(--dsw-alias-label-secondary,#667085);--w-border:var(--dsw-alias-border-l3,#e7e9ef);--w-accent:var(--dsh-plugin-workbench-accent,#4f6bdb);--w-selected:color-mix(in srgb,var(--w-accent) 10%,var(--w-bg));--w-primary:var(--w-text);--w-on-primary:var(--w-bg);container-type:inline-size;container-name:dsh-workbench;color:var(--w-text);font:14px/1.65 var(--dsh-font-family-content,system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif);min-width:0;max-width:100%;box-sizing:border-box;text-align:start;color-scheme:inherit}
.dshw *,.dshw *:before,.dshw *:after{box-sizing:border-box}.dshw h1,.dshw h2,.dshw h3,.dshw h4,.dshw p{margin:0}.dshw h1{font-size:30px;line-height:1.25;letter-spacing:-.025em;font-weight:650}.dshw h2{font-size:24px;line-height:1.35;font-weight:650;letter-spacing:-.015em;overflow-wrap:anywhere}.dshw h3,.dshw h4{font-size:16px;line-height:1.4;font-weight:600}.dshw a{color:var(--w-accent);text-underline-offset:3px;overflow-wrap:anywhere}.dshw button,.dshw input,.dshw select,.dshw textarea{font:inherit;color:inherit;max-width:100%}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select,.dshw textarea{background:var(--dsw-specific-input-major,var(--w-bg));border:1px solid var(--w-border);border-radius:8px;padding:8px 11px;min-width:0;line-height:1.5}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select{min-height:38px}.dshw textarea{resize:vertical}.dshw input[type=checkbox],.dshw input[type=radio]{width:16px;height:16px;flex-shrink:0;accent-color:var(--w-accent)}.dshw :focus-visible{outline:2px solid var(--w-accent);outline-offset:3px}.dshw button:disabled,.dshw input:disabled,.dshw select:disabled,.dshw textarea:disabled{opacity:.5;cursor:not-allowed}.dshw label{font-size:13px}.dshw fieldset{min-width:0;border:1px solid var(--w-border);border-radius:8px}.dshw summary{cursor:pointer;font-weight:550;list-style:none;display:flex;align-items:center;gap:8px}.dshw summary::-webkit-details-marker{display:none}.dshw summary:after{content:'';display:block;margin-inline-start:auto;width:7px;height:7px;border-inline-end:1.75px solid currentColor;border-bottom:1.75px solid currentColor;transform:rotate(45deg);flex-shrink:0}.dshw details[open]>summary:after{transform:rotate(225deg)}.dshw details>summary+*{margin-top:12px}.dshw pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.7 ui-monospace,SFMono-Regular,Consolas,monospace;max-width:100%;background:var(--w-soft);border-radius:6px;padding:14px}.dshw img,.dshw video,.dshw iframe{max-width:100%}
.w-page{display:flex;flex-direction:column;position:relative;padding:0;min-height:540px;gap:0}.w-page[data-main=true]{height:100%;min-height:0;padding:calc(24px + var(--dsh-frame-top-clearance,0px)) 28px 0 max(28px,var(--dsh-frame-leading-clearance,0px));overflow:auto}.dshw[data-main=true]{background:var(--w-bg)}.dshw.w-page,.dshw .w-body,.dshw .w-tab-panel{overflow-x:clip}.w-page-header{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;padding-bottom:22px;flex-shrink:0}.w-heading{min-width:0}.w-subtitle{margin-top:8px!important;font-size:14px;color:var(--w-muted);line-height:1.6}.w-header-actions,.w-toolbar,.w-actions{display:flex;align-items:center;flex-wrap:wrap;gap:8px;min-width:0}.w-header-actions{justify-content:flex-end}.w-body,.w-tabs-layout{display:flex;flex-direction:column;flex:1;min-height:0;min-width:0}.w-body{overflow:auto}.w-tab-panel{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;overflow:auto}.w-tabs{display:flex;align-items:stretch;gap:20px;border-bottom:1px solid var(--w-border);flex-shrink:0;overflow-x:auto;scrollbar-width:thin}.dshw .w-tabs>button{border:0;border-bottom:2px solid transparent;background:transparent;padding:11px 8px 13px;white-space:nowrap;font-size:14px;font-weight:550;cursor:pointer;color:var(--w-muted);display:flex;align-items:center;gap:7px}.dshw .w-tabs>button[aria-selected=true]{border-bottom-color:var(--w-accent);color:var(--w-accent)}.w-count,.w-tag{font-size:12px;line-height:1.5;display:inline-flex;align-items:center;flex-shrink:0;background:var(--w-soft);border-radius:5px;padding:1px 6px;color:var(--w-muted)}.w-tabs [aria-selected=true] .w-count,.w-selected .w-tag{color:var(--w-accent);background:var(--w-selected)}
.dshw .w-button{display:inline-flex;justify-content:center;align-items:center;gap:7px;background:var(--w-bg);border:1px solid var(--w-border);border-radius:8px;padding:8px 12px;min-height:36px;line-height:1.4;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;white-space:normal}.dshw .w-button:not(:disabled):hover{background:var(--w-soft)}.dshw .w-primary{background:var(--w-primary);border-color:var(--w-primary);color:var(--w-on-primary)}.dshw .w-primary:not(:disabled):hover{background:var(--w-primary);opacity:.9}.dshw .w-ghost{background:transparent;border-color:transparent}.dshw .w-danger{color:var(--dsw-alias-state-error-primary,#b43c3c)}.dshw .w-icon-button{width:36px;min-width:36px;padding:8px}.dshw .w-button svg{flex-shrink:0}.w-muted{color:var(--w-muted);font-size:12px;line-height:1.6}.w-section{padding:24px 0;border-bottom:1px solid var(--w-border);min-width:0}.w-section>h3{margin-bottom:12px}.w-section>p+p{margin-top:8px}.w-fields{display:grid;gap:16px;min-width:0}.w-field{display:grid;gap:6px;min-width:0}.w-field>input,.w-field>select,.w-field>textarea{width:100%}.w-status{display:flex;align-items:flex-start;gap:8px;padding:11px 13px;margin:12px 0;border:1px solid var(--w-border);border-radius:8px;background:var(--w-soft);font-size:13px;overflow-wrap:anywhere;flex-shrink:0}.w-status>svg{flex-shrink:0;margin-top:2px}.w-status-error{color:var(--dsw-alias-state-error-primary,#ad3636)}.w-status-success{color:var(--dsw-alias-state-success-primary,#24794a)}.w-status-warn{color:var(--dsw-alias-state-warning-primary,#8a5a00)}.w-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px;width:100%;max-width:580px;padding:48px 24px;margin:auto;min-height:280px;overflow-wrap:anywhere}.w-empty>svg{color:var(--w-muted)}.w-empty h2{font-size:20px}.w-empty .w-muted{font-size:14px}.w-empty .w-toolbar{justify-content:center}
.w-split{display:grid;grid-template-columns:minmax(240px,var(--w-list-width)) minmax(0,1fr);min-height:460px;flex:1;min-width:0}.w-master{min-width:0;border-inline-end:1px solid var(--w-border);overflow:auto;padding-bottom:24px}.w-detail{min-width:0;padding:26px 28px;overflow:auto;overflow-wrap:anywhere;display:flex;flex-direction:column}.w-master-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:20px 16px}.w-search{display:flex;align-items:center;gap:8px;border:1px solid var(--w-border);border-radius:8px;padding:0 10px;min-width:0;flex:1;background:var(--w-bg)}.w-search>svg{color:var(--w-muted);flex-shrink:0}.dshw .w-search>input{border:0!important;background:transparent!important;padding:8px 0!important;width:100%;outline-offset:0}.w-row{display:flex;gap:0;min-width:0;position:relative;border-bottom:1px solid var(--w-border);border-inline-start:3px solid transparent}.w-row-select{display:flex;align-items:flex-start;padding:21px 0 0 14px}.dshw .w-row-button{display:flex;flex-direction:column;align-items:stretch;gap:7px;text-align:start;width:100%;padding:18px 18px 18px 16px;border:0;background:transparent;color:inherit;min-width:0;cursor:pointer;line-height:1.5}.dshw .w-row-button:hover{background:var(--w-soft)}.w-row-head{display:flex;align-items:flex-start;gap:10px;justify-content:space-between;min-width:0}.w-row-head>strong{font-size:14px;line-height:1.5;font-weight:600;overflow-wrap:anywhere}.w-row-meta,.w-row-description{color:var(--w-muted);font-size:12px;line-height:1.6;overflow-wrap:anywhere}.w-row-description{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.w-selected{background:var(--w-selected);border-inline-start-color:var(--w-accent)}.w-back{display:none!important}.w-detail-title{margin-bottom:12px!important}.w-detail-meta{color:var(--w-muted);font-size:13px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}.w-detail-footer{padding:24px 0;display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:auto;border-top:1px solid var(--w-border)}.w-detail-footer .w-muted{flex:1;min-width:160px}.w-definition{display:grid;grid-template-columns:minmax(80px,120px) minmax(0,1fr);gap:8px 16px;font-size:14px;margin:20px 0}.w-definition dt{color:var(--w-muted)}.w-definition dd{margin:0;min-width:0;overflow-wrap:anywhere}
.w-switch-label{display:inline-flex;align-items:center;gap:8px;font-size:13px;position:relative;cursor:pointer}.w-switch-label>input{position:absolute;opacity:0;inset-inline-end:0;width:36px!important;height:22px!important;margin:0;cursor:pointer}.w-switch-track{width:36px;height:22px;border-radius:12px;display:block;background:var(--w-border);border:1px solid var(--w-border);pointer-events:none;padding:2px;transition:background .15s}.w-switch-track:before{content:'';display:block;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 2px #0002;transition:transform .15s}.w-switch-label>input:checked+.w-switch-track{background:var(--w-accent);border-color:var(--w-accent)}.w-switch-label>input:checked+.w-switch-track:before{transform:translateX(14px)}.w-switch-label>input:focus-visible+.w-switch-track{outline:2px solid var(--w-accent);outline-offset:3px}.w-switch-label:has(>input:disabled){opacity:.5;cursor:not-allowed}
.w-overlay{position:fixed;inset:0;background:#0005;display:flex;justify-content:flex-end;z-index:1000;padding:12px;overflow:auto}.w-dialog{width:min(620px,100%);max-height:100%;display:flex;flex-direction:column;min-height:0;background:var(--w-bg);color:var(--w-text);border:1px solid var(--w-border);border-radius:12px;box-shadow:0 18px 70px #0003}.w-dialog-header{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;border-bottom:1px solid var(--w-border);flex-shrink:0}.w-dialog-header>h2{font-size:20px}.w-dialog-body{overflow:auto;padding:20px 24px;min-height:0}.w-editor-grid{display:grid;grid-template-columns:210px minmax(0,1fr) 300px;min-height:500px;flex:1}.w-editor-list{padding:20px 12px;border-inline-end:1px solid var(--w-border);min-width:0}.w-editor-canvas{background:var(--w-soft);padding:20px;min-width:0;display:flex;flex-direction:column;gap:14px}.w-editor-inspector{padding:24px;border-inline-start:1px solid var(--w-border);min-width:0;overflow:auto}.w-editor-inspector h3{margin-bottom:18px}.w-preview-empty{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;aspect-ratio:16/9;min-height:180px;background:var(--w-soft);border:1px solid var(--w-border);border-radius:8px;padding:24px;color:var(--w-muted)}.w-content-pad{padding:24px 0}.w-stack{display:flex;flex-direction:column;gap:16px;min-width:0}.w-scroll-x{overflow:auto;max-width:100%}
@container dsh-workbench (max-width:1000px){.w-editor-grid{grid-template-columns:160px minmax(0,1fr)}.w-editor-inspector{grid-column:1/-1;border-inline-start:0;border-top:1px solid var(--w-border)}.w-header-actions{max-width:60%}.w-split{grid-template-columns:minmax(240px,32%) minmax(0,1fr)}}
@container dsh-workbench (max-width:760px){.w-page-header{gap:14px;flex-wrap:wrap;padding-bottom:18px}.w-heading{flex:1;min-width:170px}.dshw h1{font-size:24px}.w-header-actions{max-width:100%;justify-content:flex-start}.w-subtitle{font-size:13px}.w-tabs{gap:12px}.dshw .w-tabs>button{padding:10px 4px 12px}.w-split{display:block;min-height:360px}.w-split[data-selected=false]>.w-detail{display:none}.w-split[data-selected=true]>.w-master{display:none}.w-master{border-inline-end:0}.w-detail{padding:20px 0}.w-back{display:inline-flex!important;align-self:flex-start;margin:0 0 16px!important}.w-detail h2{font-size:22px}.w-master-toolbar{padding:16px 0}.dshw .w-row-button{padding:16px 10px}.w-detail-footer{position:static}.w-detail-footer .w-muted{flex-basis:100%}.w-editor-grid{display:flex;flex-direction:column}.w-editor-list{border-inline-end:0;border-bottom:1px solid var(--w-border);padding:16px 0}.w-editor-canvas{padding:16px 0;background:var(--w-bg)}.w-editor-inspector{padding:20px 0}.w-dialog-header,.w-dialog-body{padding:16px}.w-button{min-height:40px}.w-definition{grid-template-columns:80px minmax(0,1fr)}}
@media(max-width:700px){.w-page[data-main=true]{padding:calc(16px + var(--dsh-frame-top-clearance,0px)) 16px 0 max(16px,var(--dsh-frame-leading-clearance,0px))}.w-overlay{padding:8px}.w-dialog{width:100%}}
@media(prefers-reduced-motion:reduce){.dshw *,.dshw *:before{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
`;
  function Styles() { return h('style', null, styles); }
  return { Icon, Button, IconButton, Page, Tabs, Status, Empty, Split, Row, Search, Switch, Dialog, Styles, register, styles };
}

/* One update control per plugin. Only transport, idle guards and installation
 * coordination are shared; no global update page or update-all action exists. */
function __stardustUpdatesGuards() {
  const key = Symbol.for('stardustlc.plugin-updates.guards.v1');
  return globalThis[key] ||= { values: new Map(), listeners: new Set(), viewListeners: new Set(), clients: new Set() };
}
function __stardustUpdatesGuard(React, name, { dirty = false, busy = false, retainOnClose = false } = {}) {
  const token = React.useRef(null);
  if (!token.current) token.current = {};
  React.useLayoutEffect(() => {
    const pool = __stardustUpdatesGuards();
    if (!dirty && !busy) for (const [key, value] of pool.values) if (value.name === name && value.orphan) pool.values.delete(key);
    pool.values.set(token.current, { name, dirty: !!dirty, busy: !!busy, retainOnClose, orphan: false });
    for (const listener of pool.listeners) listener();
  }, [name, !!dirty, !!busy, retainOnClose]);
  React.useEffect(() => () => {
    const pool = __stardustUpdatesGuards(), value = pool.values.get(token.current);
    if (value?.retainOnClose && (value.dirty || value.busy)) value.orphan = true;
    else pool.values.delete(token.current);
    for (const listener of pool.listeners) listener();
  }, []);
}
function __StardustPluginUpdatesFooter({ React, name }) {
  const [, render] = React.useState(0), pool = __stardustUpdatesGuards();
  React.useEffect(() => { const fn = () => render(value => value + 1); pool.viewListeners.add(fn); return () => pool.viewListeners.delete(fn); }, []);
  const client = [...pool.clients].find(client => typeof client.Footer === 'function' && client.has(name));
  if (!client) return null;
  return React.createElement(client.Footer, { name });
}
function __stardustUpdatesInlinePage(React, element, name) {
  return React.cloneElement(element, null, element.props.children, React.createElement(__StardustPluginUpdatesFooter, { key: 'plugin-updates', React, name }));
}
function __stardustUpdatesDetailName(subject, rows) {
  if (!subject || !['bundle', 'row'].includes(subject.kind)) return null;
  if (subject.kind === 'row' && subject.pkg?.name === '@stardustlc/dsh-suite') {
    const component = rows.find(row => row.bundledBy === subject.pkg.name && (subject.row?.moduleName === row.name || subject.row?.moduleName?.startsWith(row.name + '/')));
    if (component) return component.name;
  }
  return rows.some(row => row.name === subject.pkg?.name) ? subject.pkg.name : null;
}
function __stardustUpdatesNativeFormState(document) {
  let dirty = false, busy = false;
  for (const scope of document.querySelectorAll('[data-plugin-detail],[data-plugin-row-detail]')) for (const button of scope.querySelectorAll('button')) {
    if (!button.getClientRects().length || button.closest('.plugin-updates-footer')) continue;
    const label = (button.getAttribute('aria-label') || button.textContent || '').trim();
    if (/^(?:正在保存|保存中|Saving)(?:[.…\s]|$)/i.test(label) || button.getAttribute('aria-busy') === 'true') busy = true;
    if (!button.disabled && button.getAttribute('aria-disabled') !== 'true' && /^(?:保存(?:更改|设置|配置)?|Save(?: changes| settings| configuration)?)(?:\s+(?:Ctrl|⌘|Enter|↵).*)?$/i.test(label)) dirty = true;
  }
  return { dirty, busy };
}
function __stardustUpdatesDisplayRows(next, known) {
  for (const row of next.rows) known.set(row.name, row);
  if (!['verifying', 'installing', 'cancelling', 'unknown', 'restore-failed'].includes(next.job?.state)) return next;
  const rows = [...next.rows];
  for (const row of known.values()) if ((row.name === next.job.name || row.bundledBy === next.job.name) && !rows.some(item => item.name === row.name)) rows.push({ ...row, updating: true });
  return { ...next, rows };
}
function __stardustUpdatesSuiteRows(next, participants) {
  // The official manager lists top-level dependencies, not Suite's transitive
  // components. Project active, build-identified clients for display only.
  // Installation and preferences still use the real Suite row from the host.
  const suite = next.rows.find(row => row.name === '@stardustlc/dsh-suite' && row.enabled);
  if (!suite) return next;
  const rows = [...next.rows], names = new Set(rows.map(row => row.name));
  for (const item of participants) if (item.suiteComponent && item.packageVersion && item.label && !names.has(item.name)) {
    names.add(item.name);
    rows.push({ name: item.name, version: item.packageVersion, enabled: true, sourceKind: 'suite', loadError: false, label: item.label, labelEn: item.labelEn, bundledBy: suite.name });
  }
  return { ...next, rows };
}
function __stardustUpdatesWrap(definition, participant) {
  return { ...definition, factory(require) {
    const original = definition.factory(require);
    if (!original || typeof original !== 'object') return original;
    const React = require('react');
    return { ...original, apply(ctx, ...args) {
      const result = original.apply?.call(this, ctx, ...args);
      // The optional alpha.3 slot stays dormant in older hosts; its scoped
      // injection unregisters naturally when the plugin is unloaded.
      if (participant.iconData && participant.sectionIds?.length && typeof ctx.inject === 'function') ctx.inject(['slots'], host => {
        for (const id of new Set(participant.sectionIds)) host.slots.inject('settings.section.icon', () => host.slots.register({ name: 'settings.section.icon', id }, function PluginSettingsIcon({ size = 20 }) {
          return React.createElement('img', { src: participant.iconData, alt: '', 'aria-hidden': true, width: size, height: size, style: { objectFit: 'contain', display: 'block', flexShrink: 0 } });
        }));
      });
      if (typeof ctx.inject === 'function') ctx.inject(['slots', 'locale', 'remote', 'remote.pluginManager'], host => __stardustUpdatesJoin(host, React, require, participant));
      return result;
    } };
  } };
}
function __stardustUpdatesJoin(host, React, require, participant) {
  const key = Symbol.for('stardustlc.plugin-updates.client.v1'), pools = globalThis[key] ||= new WeakMap(), root = host.root || host;
  if (typeof root.plugin !== 'function') return;
  let record = pools.get(root);
  if (!record) {
    record = { refs: new Map(), timer: null, version: participant.version, alive: true, hold: false, uiRevision: 2 };
    pools.set(root, record);
    __stardustUpdatesActivate(record, pools, root, React, require);
  } else if (record.uiRevision !== 2 && !record.migration) {
    // The first loaded participant may still own a pre-footer client. Keep
    // its references and draft guards, wait for any admitted install, then
    // replace that one client fiber instead of running two window heartbeats.
    const shared = record;
    record.migration = Promise.resolve().then(async () => {
      while (shared.alive && shared.hold) await new Promise(resolve => setTimeout(resolve, 500));
      if (!shared.alive || !shared.refs.size) return;
      await shared.fiber?.dispose?.();
      if (!shared.refs.size) return;
      shared.alive = true; shared.uiRevision = 2; pools.set(root, shared);
      __stardustUpdatesActivate(shared, pools, root, React, require);
    }).catch(() => { /* The original page remains usable if host disposal fails. */ });
  }
  clearTimeout(record.timer);
  const ref = {}; record.refs.set(ref, participant);
  host.effect(() => () => {
    record.refs.delete(ref);
    const stop = () => {
      if (record.refs.size || !record.alive) return;
      if (record.hold) { record.timer = setTimeout(stop, 1000); return; }
      record.alive = false; Promise.resolve(record.fiber?.dispose?.()).catch(() => {});
    };
    if (!record.refs.size) record.timer = setTimeout(stop, 1000);
  });
}
function __stardustUpdatesActivate(shared, pools, root, React, require) {
  shared.fiber = root.plugin({ name: 'stardustlc-plugin-updates-client', inject: ['slots', 'locale', 'remote', 'remote.pluginManager'], apply(ctx) {
    const client = __stardustUpdatesClient(ctx, React, require, shared);
    ctx.effect(() => () => { shared.alive = false; client.dispose(); if (pools.get(root) === shared) pools.delete(root); });
  } });
  Promise.resolve(shared.fiber).catch(() => { shared.alive = false; if (pools.get(root) === shared) pools.delete(root); });
}
function __stardustUpdatesClient(ctx, React, require, shared) {
  const h = React.createElement, W = createWorkbenchUI(React), route = new URL('api/stardustlc/plugin-updates', document.baseURI);
  const { useState, useEffect } = React, id = crypto.randomUUID(), listeners = new Set(), pool = __stardustUpdatesGuards(), requests = new Set(), notified = new Set(), knownRows = new Map();
  let alive = true, registered = false, state = null, lastInteraction = Date.now(), inPoll = false, manualOperation = false, legacyHint = null;
  const language = () => String(ctx.locale?.getSnapshot?.().active || '').startsWith('en') ? 'en' : 'zh';
  const t = (zh, en) => language() === 'en' ? en : zh;
  const preferences = name => state?.preferences.packages[name] || { checkEnabled: true, autoInstall: false, deferredUntil: 0, ignoredVersion: null };
  const originalRow = name => state?.rows.find(row => row.name === name);
  const rowFor = name => { const row = originalRow(name); return row?.bundledBy ? originalRow(row.bundledBy) : row; };
  const activeJob = () => ['verifying', 'installing', 'cancelling'].includes(state?.job?.state);
  function notify() { shared.hold = manualOperation || activeJob(); for (const listener of listeners) listener(); for (const listener of pool.viewListeners) listener(); }
  async function api(body = { action: 'state' }) {
    const controller = new AbortController(); requests.add(controller);
    const timeout = setTimeout(() => controller.abort(), body.action === 'check' ? 95000 : 45000);
    try {
      const response = await fetch(route, { method: 'POST', credentials: 'same-origin', cache: 'no-store', signal: controller.signal, headers: { 'content-type': 'application/json', 'x-stardustlc-updates': '1' }, body: JSON.stringify(body) });
      let data; try { data = await response.json(); } catch { throw new Error('service-unavailable'); }
      if (!response.ok || !data.ok) throw new Error(response.status === 403 ? 'owner-required' : data.code || 'service-unavailable');
      return data.value;
    } catch (error) { if (error?.name === 'AbortError') throw new Error('service-unavailable'); throw error; }
    finally { clearTimeout(timeout); requests.delete(controller); }
  }
  function pageState(manual = manualOperation) {
    const values = [...pool.values.values()], nativeForm = __stardustUpdatesNativeFormState(document);
    const dialog = [...document.querySelectorAll('[role="dialog"],dialog[open]')].some(node => node.getClientRects().length && !(manual && (node.closest('.plugin-updates-footer') || node.querySelector('.plugin-updates-footer'))));
    return { action: 'heartbeat', id, dirty: nativeForm.dirty || values.some(value => value.dirty), busy: nativeForm.busy || values.some(value => value.busy) || dialog, idleForMs: Math.min(86400000, Math.max(0, Date.now() - lastInteraction)) };
  }
  const heartbeat = () => api(pageState());
  function interaction() { lastInteraction = Date.now(); if (registered && alive) void heartbeat().catch(() => {}); }
  const guardChanged = () => { if (registered && alive) void heartbeat().catch(() => {}); };
  for (const event of ['pointerdown', 'keydown', 'input']) document.addEventListener(event, interaction, { capture: true, passive: true });
  pool.listeners.add(guardChanged);
  const close = () => { void fetch(route, { method: 'POST', credentials: 'same-origin', keepalive: true, headers: { 'content-type': 'application/json', 'x-stardustlc-updates': '1' }, body: JSON.stringify({ action: 'client-close', id }) }).catch(() => {}); };
  window.addEventListener('pagehide', close);
  async function refresh() { const next = await api(); if (alive) { state = __stardustUpdatesDisplayRows(__stardustUpdatesSuiteRows(next, shared.refs.values()), knownRows); notify(); } return next; }
  function useSnapshot() {
    const [, render] = useState(0);
    useEffect(() => { const fn = () => render(value => value + 1); listeners.add(fn); const stop = ctx.locale?.subscribe?.(fn); return () => { listeners.delete(fn); stop?.(); }; }, []);
    return state;
  }
  function message(code) {
    return ({
      'page-dirty': t('有未保存的修改。请先保存或放弃修改，再更新。', 'Save or discard unsaved changes before updating.'),
      'page-busy': t('有页面操作或对话框尚未结束，请完成后再试。', 'Finish the active page operation or close its dialog, then retry.'),
      'page-not-ready': t('还有窗口状态未确认，或旧版插件尚未提供状态保护。请刷新相关窗口，必要时先手动更新旧版插件。', 'A window state is unknown or an older plugin lacks state protection. Refresh the affected windows and manually update legacy plugins if needed.'),
      busy: t('DSH 正在执行任务或安装，请等操作结束。', 'DSH is running a task or installation. Wait for it to finish.'),
      'activity-unknown': t('无法确认任务是否空闲，已暂停安装。', 'Installation paused because task activity is unknown.'),
      'restart-required': t('更新服务需要重启后继续。请在方便时手动重启 DSH。', 'The updater needs a restart. Restart DSH manually when convenient.'),
      'operation-unconfirmed': t('上次安装未确认或恢复失败。请在官方插件管理中检查并修复，之后手动重启 DSH。', 'The last installation is unconfirmed or recovery failed. Check and repair it in native plugin management, then restart DSH manually.'),
      'check-first': t('检查结果已过期，请重新检查。', 'This check expired. Check again.'),
      'release-changed': t('发布信息已变化，本次未安装。请重新检查。', 'Release metadata changed. Nothing was installed; check again.'),
      'preferences-conflict': t('另一个窗口修改了偏好，已刷新，请重试。', 'Preferences changed in another window. They have been refreshed; retry.'),
      'preferences-unreadable': t('更新偏好文件无法读取，自动安装已关闭。请检查当前 profile 的 stardustlc-plugin-updates.json。', 'Preferences could not be read. Automatic installation is off. Check stardustlc-plugin-updates.json in this profile.'),
      'no-update': t('版本已变化或暂不兼容，请重新检查。', 'The version changed or is incompatible. Check again.'),
      'source-not-registry': t('本地源码、Git 等安装，请通过原安装方式更新。', 'Update local, Git and other external sources through their original installation method.'),
      'managed-by-suite': t('这个插件随 Suite 安装，通过 Suite 更新。', 'This plugin was installed through Suite and is updated through Suite.'),
      'owner-required': t('只有 profile 拥有者能管理更新。', 'Only the profile owner can manage updates.'),
    })[code] || t('操作未完成，请刷新后重试。DSH 不会因此自动重启。', 'The operation could not be completed. Refresh and retry. DSH will not restart automatically.');
  }
  // releaseOf() keeps the failing engine/peer range check as a stable code; say which
  // environment has to change instead of only reporting that the release is incompatible.
  function requirement(release) {
    return ({
      'dsh-version': t('需要换成与该版本匹配的 DSH 本体', 'it needs a different DSH version'),
      'node-version': t('需要换成与该版本匹配的 Node.js', 'it needs a different Node.js version'),
      deprecated: t('作者已把这个版本标记为弃用', 'the author marked this release as deprecated'),
      'not-bundle': t('这个版本不是可加载的 DSH 插件包', 'this release is not a loadable DSH plugin bundle'),
    })[release?.reason] || t('发布元数据的兼容范围与当前环境不符', 'its published compatibility range does not match this environment');
  }
  function jobLabel(job) {
    return ({ verifying: t('正在核对版本', 'Verifying release'), installing: t('正在安装', 'Installing'), cancelling: t('正在请求取消', 'Requesting cancellation'), complete: t('已更新', 'Updated'), 'restart-required': t('已安装，等待你手动重启', 'Installed; manual restart needed'), restored: t('更新未成功，已恢复原版本', 'Update failed; previous version restored'), 'restore-failed': t('恢复未成功，请检查官方插件管理', 'Recovery failed; check native plugin management'), unknown: t('结果未确认，请检查官方插件管理', 'Result unconfirmed; check native plugin management'), cancelled: t('已取消', 'Cancelled'), failed: t('更新未成功', 'Update failed') })[job.state] || job.state;
  }
  function FooterFrame({ name, label, subtitle, actions, children }) {
    return h('section', { className: 'dshw plugin-updates-footer', 'data-plugin-update-footer': name, 'aria-label': label + t(' · 版本与更新', ' · Version and updates') },
      h('style', null, W.styles),
      h('style', null, '.plugin-updates-footer{box-sizing:border-box;flex-shrink:0;margin-top:28px;padding-top:18px;border-top:1px solid var(--dsw-alias-border-l3,#e5e7eb);min-width:0;max-width:100%;color:var(--dsw-alias-label-primary,#202124)}.plugin-updates-footer .updates-head{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px}.plugin-updates-footer h2{font-size:14px;line-height:22px;margin:0;font-weight:600}.plugin-updates-footer .updates-subtitle,.plugin-updates-footer .updates-version{font:12px/1.6 ui-monospace,monospace;overflow-wrap:anywhere;margin:4px 0}.plugin-updates-footer .updates-options{margin-top:12px}.plugin-updates-footer .updates-options>summary{cursor:pointer;font-size:12px;line-height:22px;color:var(--dsw-alias-label-secondary,#657080)}.plugin-updates-footer .updates-options>summary:focus-visible{outline:2px solid var(--dsw-focus-ring-color,#6b79df);outline-offset:4px}.plugin-updates-footer .updates-settings{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:16px;padding:14px 0 0}.plugin-updates-footer .updates-note{margin:5px 0 0;font-size:12px;line-height:1.6}.plugin-updates-footer>.w-section{margin:10px 0 0;padding:0;border:0}.plugin-updates-footer .w-toolbar{margin-top:10px!important}.plugin-updates-footer .w-switch-label{max-width:100%;gap:12px;align-items:flex-start}.plugin-updates-footer .w-switch-track{flex-shrink:0}.plugin-updates-footer .updates-notes{margin-top:12px;padding:12px;border:1px solid var(--dsw-alias-border-l3,#e5e7eb);border-radius:10px}.plugin-updates-footer .updates-notes pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:240px;overflow:auto;font:12px/1.7 ui-monospace,monospace}.plugin-updates-footer .w-overlay{z-index:1002}@media(max-width:600px){.plugin-updates-footer .updates-head{gap:8px}.plugin-updates-footer .w-toolbar{gap:6px;flex-wrap:wrap}.plugin-updates-footer .w-button{max-width:100%}}'),
      h('div', { className: 'updates-head' }, h('div', null, h('h2', null, t('版本与更新', 'Version and updates')), h('p', { className: 'updates-subtitle w-muted' }, subtitle)), actions), children);
  }
  function Panel({ name }) {
    const snapshot = useSnapshot(), [error, setError] = useState(''), [working, setWorking] = useState(false), [checking, setChecking] = useState(false), [dialog, setDialog] = useState(null), [notes, setNotes] = useState(null), [notesOpen, setNotesOpen] = useState(false), [loadingNotes, setLoadingNotes] = useState(false);
    const row = rowFor(name), original = originalRow(name), target = row?.name || name, prefs = preferences(target), job = snapshot?.job?.name === target ? snapshot.job : null;
    async function perform(callback) { setError(''); setWorking(true); try { await callback(); await refresh(); } catch (error) { setError(error.message); await refresh().catch(() => {}); } finally { setWorking(false); } }
    async function save(changes, consent) { await api({ action: 'preferences', name: target, revision: state.preferences.revision, changes, consent }); }
    async function check() { setError(''); setChecking(true); try { await api({ action: 'check', name: target }); await refresh(); } catch (error) { setError(error.message); } finally { setChecking(false); } }
    async function install() {
      setDialog(null); manualOperation = true; notify();
      await perform(async () => {
        try {
          await heartbeat();
          const started = await api({ action: 'install', name: row.name, version: row.release.version, confirmation: 'update-installed-plugin' });
          while (alive) {
            await new Promise(resolve => setTimeout(resolve, 800)); await heartbeat(); await refresh();
            if (state.job?.id !== started.id) throw new Error('operation-unconfirmed');
            if (!activeJob()) break;
          }
        } finally { manualOperation = false; notify(); }
      });
    }
    async function showNotes() {
      if (notesOpen) { setNotesOpen(false); return; }
      setNotesOpen(true); setNotes(null); setLoadingNotes(true); setError('');
      try { setNotes(await api({ action: 'notes', name: target, version: row.release.version })); } catch (error) { setError(error.message); } finally { setLoadingNotes(false); }
    }
    if (!snapshot || !row) return h(W.Status, null, t('此插件尚未安装或已从当前 profile 移除。', 'This plugin is not installed in the current profile.'));
    const title = language() === 'en' ? original.labelEn : original.label;
    const ownPage = pageState(true), unconfirmed = ['unknown', 'restore-failed'].includes(snapshot.job?.state), pageBusy = ownPage.busy || (snapshot.pages.clients || []).some(client => client.id !== id && client.busy), installLocked = working || activeJob() || unconfirmed || snapshot.updaterRestart || snapshot.preferenceError || !snapshot.activity.known || snapshot.activity.busy || snapshot.pages.dirty || ownPage.dirty || pageBusy || !snapshot.pages.known;
    const checkingThis = checking || snapshot.checkingNames?.includes(target);
    const status = row.sourceKind !== 'registry' ? t('本地 / 外部来源，保留原安装方式', 'Local / external source; keep original install method') : row.loadError ? t('加载异常，请先检查官方插件管理', 'Loading error; check native plugin management') : row.error ? t('检查失败，可以重试', 'Check failed; retry available') : row.release && !row.release.compatible ? t('新版本暂不兼容当前环境：', 'Latest release is incompatible with this environment: ') + requirement(row.release) : row.available ? (prefs.ignoredVersion === row.release.version ? t('已忽略提醒，仍可手动更新', 'Reminder ignored; manual update available') : t('有新版本', 'Update available')) : row.checkedAt ? t('当前已是最新稳定版', 'Latest stable version') : t('尚未检查', 'Not checked yet');
    return h(FooterFrame, { name, label: title, subtitle: original.name + ' · ' + original.version, actions: h(W.Button, { icon: 'refresh', disabled: checkingThis || row.sourceKind !== 'registry', onClick: check }, checkingThis ? t('正在检查…', 'Checking…') : target === '@stardustlc/dsh-suite' ? t('检查整包更新', 'Check Suite updates') : t('检查更新', 'Check for updates')) },
      original.bundledBy && h(W.Status, null, t('此插件随 Suite 安装。以下设置与安装作用于 Suite 整包，以保持组件版本一致。单独安装的插件可以独立更新。', 'This plugin was installed through Suite. These controls update Suite as a package so its components stay consistent. Independently installed plugins update individually.')),
      h('section', { className: 'w-section' }, (original.bundledBy || row.available) && h('p', { className: 'updates-version' }, target + ' · ' + row.version, row.release?.version && row.release.version !== row.version ? ' → ' + row.release.version : ''), h('p', { className: 'w-muted updates-note' }, status), !row.enabled && h('p', { className: 'w-muted' }, t('当前已停用，更新后仍保持停用。', 'Currently disabled; it will remain disabled after updating.')), row.checkedAt && h('p', { className: 'w-muted updates-note' }, t('上次检查：', 'Last checked: ') + new Date(row.checkedAt).toLocaleString(language() === 'en' ? 'en-US' : 'zh-CN')),
        h('div', { className: 'w-toolbar' }, row.available && row.sourceKind === 'registry' && h(W.Button, { variant: 'primary', icon: 'download', disabled: installLocked || row.loadError, onClick: () => setDialog('install') }, target === '@stardustlc/dsh-suite' ? t('更新 Suite 整包', 'Update whole Suite') : t('更新此插件', 'Update this plugin')), row.release && h(W.Button, { variant: 'ghost', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')), row.available && h(W.Button, { variant: 'ghost', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')), row.available && prefs.ignoredVersion !== row.release.version && h(W.Button, { variant: 'ghost', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版本提醒', 'Ignore this reminder')))),
      notesOpen && h('section', { className: 'updates-notes', 'aria-label': t('更新记录', 'Release notes') }, h('strong', null, target + ' · ' + (notes?.version || row.release?.version || '')), loadingNotes ? h('p', null, t('正在读取…', 'Loading…')) : notes?.text ? h('pre', null, notes.text) : h('p', null, t('未找到此版本的独立更新记录。', 'No separate notes were found for this version.')), notes?.url && h('a', { href: notes.url, target: '_blank', rel: 'noreferrer noopener' }, t('查看仓库更新记录', 'View repository changelog'))),
      h('details', { className: 'updates-options' }, h('summary', null, t('更新选项', 'Update options'), ' · ', prefs.checkEnabled ? t('自动检查：开', 'Checks: on') : t('自动检查：关', 'Checks: off'), ' · ', prefs.autoInstall ? t('自动安装：开', 'Install: on') : t('自动安装：关', 'Install: off')), h('section', { className: 'updates-settings', 'aria-label': t('这个插件的更新偏好', 'Update preferences for this plugin') },
        h('div', null, h(W.Switch, { label: t('自动检查这个插件的更新', 'Automatically check this plugin'), checked: prefs.checkEnabled, disabled: working || !!snapshot.preferenceError || row.sourceKind !== 'registry', onChange: event => perform(() => save({ checkEnabled: event.target.checked })) }), h('p', { className: 'w-muted updates-note' }, t('默认开启，每天最多一次。只影响这个插件，关闭后仍可手动检查。', 'On by default, at most once daily. This affects only this plugin; manual checks remain available.'))),
        h('div', null, h(W.Switch, { label: t('空闲时自动安装这个插件的补丁', 'Install patches for this plugin while idle'), checked: prefs.autoInstall, disabled: working || !!snapshot.preferenceError || row.sourceKind !== 'registry', onChange: event => event.target.checked ? setDialog('automatic') : perform(() => save({ autoInstall: false })) }), h('p', { className: 'w-muted updates-note' }, t('默认关闭。明确开启后，仅空闲且没有未保存修改时安装兼容补丁。其他插件的开关不变。', 'Off by default. Explicitly enable compatible patches while idle with no unsaved changes. Other plugins’ settings stay unchanged.'))))),
      error && h(W.Status, { tone: 'error' }, message(error)), snapshot.preferenceError && h(W.Status, { tone: 'error' }, message('preferences-unreadable')),
      snapshot.pendingRestart && h(W.Status, null, snapshot.updaterRestart ? message('restart-required') : t('已有更新等待手动重启后生效。你可以继续工作，自动安装已暂停。', 'Some updates need a manual restart. Continue your work; automatic installation is paused.')),
      prefs.autoInstall && snapshot.autoReady === false && h(W.Status, null, message('page-not-ready')),
      snapshot.pages.clients.some(client => !client.fresh) && h(W.Status, null, h('p', null, t('有窗口已断开，无法确认是否还有未保存修改。仍在使用的窗口请先保存并刷新；已关闭的窗口可以手动重新确认。', 'A disconnected window may contain unsaved changes. Save and refresh windows still in use. If they are closed, you can confirm that manually.')), h(W.Button, { onClick: () => setDialog('windows') }, t('重新确认已关闭的窗口', 'Confirm closed windows'))),
      (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')), (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
      prefs.deferredUntil > Date.now() && h(W.Status, null, t('此插件已推迟提醒和自动安装 24 小时，仍可手动更新。', 'Reminders and automatic installation for this plugin are deferred for 24 hours. Manual updates remain available.')),
      unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
      job && h('section', { className: 'w-section', 'aria-label': t('这个插件的更新进度', 'Update progress for this plugin') }, h('h3', null, jobLabel(job)), h('p', { className: 'w-muted' }, job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动补丁更新', ' · Automatic patch') : '')), (job.reason || job.outcome?.result?.error?.code) && h(W.Status, { tone: 'error' }, message(job.reason || job.outcome.result.error.code)), activeJob() && h(W.Button, { disabled: job.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消更新', 'Cancel update')), h('p', { className: 'w-muted updates-note' }, t('安装开始后，取消由官方包管理器处理；已落盘的写入以实际结果或恢复状态为准。', 'After installation starts, the native package manager handles cancellation. Completed writes and recovery are reported as they occur.'))),
      dialog && h(W.Dialog, { title: dialog === 'windows' ? t('断开的窗口都已关闭？', 'Are the disconnected windows closed?') : dialog === 'automatic' ? t('允许这个插件自动安装补丁？', 'Allow automatic patches for this plugin?') : t('确认更新此插件', 'Confirm this plugin update'), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
        target === '@stardustlc/dsh-suite' && h('p', null, t('此处操作的是 Suite 整包，包含 18 个组件。独立安装的其他插件不受影响。', 'This action applies to the whole Suite, including its 18 components. Other independently installed plugins are unaffected.')),
        dialog === 'windows' ? h('div', { className: 'w-stack' }, h('p', null, t('只清除超过 45 秒未回应的其他窗口记录。请先确认它们已经关闭；仍在使用的窗口请保存修改并刷新。当前或仍在回应的窗口保护会保留。', 'Only other windows silent for over 45 seconds are cleared. Confirm that they are closed; save and refresh windows still in use. Current and responsive windows remain protected.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')), h(W.Button, { onClick: () => { setDialog(null); void perform(() => api({ ...pageState(true), action: 'reconfirm-windows', confirmation: 'other-stale-windows-are-closed' })); } }, t('已关闭，重新确认状态', 'They are closed; reconfirm')))) :
        dialog === 'automatic' ? h('div', { className: 'w-stack' }, h('p', null, (language() === 'en' ? row.labelEn : row.label) + ' · ' + target), h('p', null, t('你正在主动启用这个插件的自动安装。只处理兼容的稳定补丁；有任务、未保存修改、未知窗口或等待重启时暂停。', 'You are explicitly enabling automatic installation for this plugin. Only compatible stable patches qualify; running tasks, unsaved changes, unknown windows or a pending restart pause it.')), h('p', null, t('不会自动重启 DSH，其他插件不会跟着开启。可随时关闭。', 'DSH will not restart automatically, and other plugins will not be enabled for automatic updates. Turn it off anytime.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('保持关闭', 'Keep off')), h(W.Button, { variant: 'primary', onClick: () => { setDialog(null); void perform(() => save({ checkEnabled: true, autoInstall: true }, 'enable-idle-patch-updates')); } }, t('允许此插件自动安装补丁', 'Allow patches for this plugin')))) :
        h('div', { className: 'w-stack' }, h('p', { className: 'updates-version' }, target + ': ' + row.version + ' → ' + row.release.version), h('p', null, t('通过 DSH 官方插件管理器安装。需要重启时，由你手动决定时间；停用状态会保留。', 'Install through DSH’s native plugin manager. Choose when to restart if needed; disabled status is preserved.')), h('p', { className: 'w-muted' }, t('来源：npm 官方 registry，网络不可达时回退 npmmirror。安装前再次核对版本与完整性。', 'Source: official npm registry, with npmmirror fallback if unreachable. Version and integrity are checked again before installation.')), (ownPage.dirty || snapshot.pages.dirty) && h(W.Status, null, message('page-dirty')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')), h(W.Button, { variant: 'primary', disabled: installLocked || row.loadError, onClick: install }, t('确认安装此版本', 'Install this version')))))
    );
  }
  function NativeFooter({ subject }) {
    const snapshot = useSnapshot(), name = __stardustUpdatesDetailName(subject, snapshot?.rows || []);
    return name ? h(Panel, { name }) : null;
  }
  function Reminder() {
    useSnapshot();
    const row = state?.rows.find(row => { const prefs = preferences(row.name); return row.available && !row.updating && !row.bundledBy && prefs.checkEnabled && prefs.deferredUntil <= Date.now() && prefs.ignoredVersion !== row.release.version && !notified.has(row.name + '@' + row.release.version); });
    if (!row && !legacyHint) return null;
    let Toast; try { Toast = require('@deepseek-ai/dsh-client-ui-primitives').Toast; } catch { return null; }
    if (!Toast) return null;
    const hint = legacyHint, key = hint ? 'legacy-' + hint : row.name + '@' + row.release.version;
    return h(Toast, { key, text: hint ? hint + t('：请打开「插件」中的此插件详情页，在底部管理更新。', ': open its details in Plugins to manage updates at the bottom.') : (language() === 'en' ? row.labelEn : row.label) + t('有新版本，可在页面底部查看。', ' has an update. Review it at the bottom of its page.'), icon: h(W.Icon, { name: 'refresh', size: 18 }), holdMs: 7000, onDone: () => { if (hint) legacyHint = null; else notified.add(key); notify(); } });
  }
  function register() {
    if (!alive) return;
    if (!registered) {
      registered = true; pool.clients.add(client);
      ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({ name: 'plugins.detail.section', id: 'stardustlc.plugin-update-footer', order: 1000 }, NativeFooter));
      ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'stardustlc.plugin-update-reminder' }, Reminder));
      notify();
    }
  }
  async function poll() {
    if (inPoll || !alive || !shared.refs.size) return;
    inPoll = true;
    try { await refresh(); register(); await heartbeat(); }
    catch { /* Owner-only controls stay absent for guests and unsupported hosts. */ }
    finally { inPoll = false; }
  }
  const timer = setInterval(() => { void poll(); }, 15000), first = setTimeout(() => { void poll(); }, 100);
  const client = { t, Footer: Panel, Button: W.Button, open(name) { const footer = [...document.querySelectorAll('[data-plugin-update-footer]')].find(node => node.getAttribute('data-plugin-update-footer') === name); if (footer) footer.scrollIntoView({ block: 'end', behavior: 'smooth' }); else { legacyHint = name; notify(); } }, has: name => registered && !!originalRow(name), row: rowFor, dispose() {
    close(); alive = false; clearTimeout(first); clearInterval(timer); pool.clients.delete(client);
    pool.listeners.delete(guardChanged); listeners.clear();
    for (const event of ['pointerdown', 'keydown', 'input']) document.removeEventListener(event, interaction, true);
    window.removeEventListener('pagehide', close);
    for (const controller of requests) controller.abort();
    for (const listener of pool.viewListeners) listener();
  } };
  return client;
}

/* STARDUSTLC_UPDATE_CLIENT_BODY_START */
// Generated from templates/client.js, templates/panels/ and templates/workbench-ui.js. Edit the sources.
(function () {
/* DSH workbench UI v1. MIT. Canonical source: dsh-suite/ui/workbench-ui.js.
 * Vendored into each plugin: no Suite or extra runtime dependency is required.
 * Styles are scoped to .dshw and never replace the host chrome or theme.
 */
function createWorkbenchUI(React) {
  const h = React.createElement;
  const { useEffect, useId, useRef } = React;
  const cx = (...values) => values.filter(Boolean).join(' ');
  const paths = {
    book: ['M4 4h6a3 3 0 0 1 2 2v15a4 4 0 0 0-4-2H4z', 'M20 4h-6a3 3 0 0 0-2 2v15a4 4 0 0 1 4-2h4z'],
    calendar: ['M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z', 'M7 3v4M17 3v4M3 10h18'],
    mail: ['M3 5h18v14H3z', 'm3 6 9 7 9-7'],
    rss: ['M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16', 'M4 19h.01'],
    slides: ['M3 4h18v13H3z', 'M12 17v4M8 21h8'],
    shield: ['m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6z', 'm8 12 3 3 5-6'],
    layers: ['M5 3h16v16H5z', 'M2 7v15h15'],
    play: ['m9 6 9 6-9 6Z'],
    video: ['M3 5h12v14H3z', 'm15 10 6-4v12l-6-4'],
    search: ['M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z', 'm16 16 5 5'],
    plus: ['M12 5v14M5 12h14'],
    refresh: ['M20 7a9 9 0 1 0 1 8', 'M20 2v5h-5'],
    settings: ['m9 3-.7 2.4-2 .9L4 5.8 2.5 8.4l1.7 1.8v2.3L2.5 14 4 17l2.5-.4 1.9 1L9 20h3l.8-2.4 2-1 2.5.4 1.5-2.7-1.7-1.9v-2.2l1.7-1.8-1.5-2.6-2.5.4-2-1L12 3Z', 'M14 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'],
    close: ['m6 6 12 12M18 6 6 18'],
    left: ['m14 5-7 7 7 7'],
    right: ['m10 5 7 7-7 7'],
    down: ['m5 9 7 7 7-7'],
    filter: ['M4 5h16M7 12h10M10 19h4'],
    download: ['M12 3v12m-5-5 5 5 5-5', 'M4 16v5h16v-5'],
    upload: ['M12 16V4m-5 5 5-5 5 5', 'M4 16v5h16v-5'],
    copy: ['M8 8h13v13H8z', 'M16 8V3H3v13h5'],
    external: ['M14 3h7v7m0-7L10 14', 'M10 3H3v18h18v-7'],
    file: ['M4 3h10l6 6v12H4z', 'M14 3v6h6M8 13h8M8 17h6'],
    folder: ['M3 5h7l2 3h9v12H3z'],
    edit: ['m15 4 5 5-10 10-6 1 1-6Z', 'm13 6 5 5'],
    trash: ['M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7'],
    more: ['M5 12h.01M12 12h.01M19 12h.01'],
    info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 11v6M12 7h.01'],
    check: ['m5 12 4 4L19 6'],
    quote: ['M4 12h6v7H3v-7c0-4 2-6 5-7M15 12h6v7h-7v-7c0-4 2-6 5-7'],
    star: ['m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z'],
    reply: ['m9 5-7 7 7 7v-5h6c3 0 5 2 6 5 0-8-4-11-12-11Z'],
    link: ['m10 13 4-4M8 16l-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0', 'm14 8 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0'],
  };
  function Icon({ name = 'file', size = 20, ...props }) {
    return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false, ...props },
      (paths[name] || paths.file).map((d, index) => h('path', { key: index, d })));
  }
  function Button({ children, icon, variant, className, ...props }) {
    return h('button', { type: 'button', ...props, className: cx('w-button', variant && 'w-' + variant, className) }, icon ? h(Icon, { name: icon, size: 18 }) : null, children);
  }
  function IconButton({ label, icon, ...props }) {
    return h(Button, { ...props, icon, className: cx('w-icon-button', props.className), 'aria-label': label, title: label });
  }
  function Page({ title, subtitle, actions, children, workbench = false, className, rootRef, ...props }) {
    return h('section', { ...props, ref: rootRef, className: cx('dshw', 'w-page', className), 'data-main': workbench ? 'true' : 'false' },
      h(Styles, { key: 'styles' }),
      h('header', { className: 'w-page-header' }, h('div', { className: 'w-heading' }, h('h1', null, title), subtitle ? h('p', { className: 'w-subtitle' }, subtitle) : null), actions ? h('div', { className: 'w-header-actions' }, actions) : null),
      h('div', { className: 'w-body' }, children));
  }
  function Tabs({ items, value, onChange, label, children }) {
    const id = useId();
    const active = items.some(item => item.id === value) ? value : items[0]?.id;
    function keys(event, index) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
      const node = event.currentTarget.parentElement?.querySelectorAll('[role=tab]')[next];
      if (node) { onChange(items[next].id); node.focus(); }
    }
    return h('div', { className: 'w-tabs-layout' },
      h('div', { className: 'w-tabs', role: 'tablist', 'aria-label': label }, items.map((item, index) => h('button', {
        type: 'button', role: 'tab', key: item.id, id: id + '-' + item.id, 'aria-controls': id + '-panel', 'aria-selected': active === item.id, tabIndex: active === item.id ? 0 : -1,
        onClick: () => onChange(item.id), onKeyDown: event => keys(event, index),
      }, item.label, item.count !== undefined ? h('span', { className: 'w-count' }, item.count) : null))),
      h('div', { className: 'w-tab-panel', id: id + '-panel', role: 'tabpanel', 'aria-labelledby': id + '-' + active }, children));
  }
  function Status({ children, tone = 'info', className }) {
    if (!children) return null;
    return h('div', { className: cx('dshw', 'w-status', 'w-status-' + tone, className), role: tone === 'error' ? 'alert' : 'status', 'aria-live': tone === 'error' ? 'assertive' : 'polite' }, h(Icon, { name: tone === 'success' ? 'check' : 'info', size: 18 }), h('div', null, children));
  }
  function Empty({ title, children, action, icon = 'file' }) {
    return h('div', { className: 'dshw w-empty' }, h(Styles, { key: 'styles' }), h(Icon, { name: icon, size: 32 }), h('h2', null, title), children ? h('div', { className: 'w-muted' }, children) : null, action ? h('div', { className: 'w-toolbar' }, action) : null);
  }
  function Split({ list, detail, selected, onBack, backLabel, className, listWidth = 360 }) {
    const ref = useRef(null);
    useEffect(() => {
      if (!selected || !ref.current || ref.current.clientWidth > 760) return;
      const heading = ref.current.querySelector('.w-detail h2');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    }, [selected]);
    return h('div', { ref, className: cx('w-split', className), 'data-selected': selected ? 'true' : 'false', style: { '--w-list-width': listWidth + 'px' } },
      h('div', { className: 'w-master' }, list),
      h('div', { className: 'w-detail' }, selected ? h(Button, { className: 'w-back', icon: 'left', variant: 'ghost', onClick: onBack }, backLabel) : null, detail));
  }
  function Row({ title, meta, description, active, onClick, children, status, className, disabled }) {
    return h('div', { className: cx('w-row', active && 'w-selected', className) },
      children ? h('div', { className: 'w-row-select' }, children) : null,
      h('button', { type: 'button', className: 'w-row-button', onClick, disabled, 'aria-pressed': !!active },
        h('span', { className: 'w-row-head' }, h('strong', null, title), status ? h('span', { className: 'w-tag' }, status) : null),
        meta ? h('span', { className: 'w-row-meta' }, meta) : null,
        description ? h('span', { className: 'w-row-description' }, description) : null));
  }
  function Search({ label, value, onChange, ...props }) {
    const id = useId();
    return h('div', { className: 'w-search' }, h(Icon, { name: 'search', size: 18 }), h('input', { type: 'search', id, 'aria-label': label, placeholder: label, value, onChange, ...props }));
  }
  function Switch({ label, checked, onChange, disabled }) {
    return h('label', { className: 'w-switch-label' }, h('span', null, label), h('input', { type: 'checkbox', role: 'switch', checked, disabled, onChange, 'aria-label': label }), h('span', { className: 'w-switch-track', 'aria-hidden': true }));
  }
  function Dialog({ title, children, onClose, closeLabel, className, busy = false }) {
    const id = useId(), panel = useRef(null);
    useEffect(() => {
      const previous = document.activeElement;
      panel.current?.querySelector('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')?.focus();
      return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }); };
    }, []);
    function keydown(event) {
      if (event.key === 'Escape' && !event.isComposing) { event.preventDefault(); event.stopPropagation(); if (!busy) onClose(); return; }
      if (event.key !== 'Tab') return;
      const controls = [...panel.current.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]')].filter(node => node.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (!controls.length) { event.preventDefault(); panel.current.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    return h('div', { className: 'dshw w-overlay', onClick: event => { if (!busy && event.target === event.currentTarget) onClose(); } },
      h(Styles, { key: 'styles' }),
      h('section', { ref: panel, className: cx('w-dialog', className), role: 'dialog', 'aria-modal': true, 'aria-labelledby': id, tabIndex: -1, onKeyDown: keydown },
        h('header', { className: 'w-dialog-header' }, h('h2', { id }, title), h(IconButton, { icon: 'close', label: closeLabel, disabled: busy, onClick: onClose })), h('div', { className: 'w-dialog-body' }, children)));
  }
  function register(ctx, { id, label, icon, component, inject, order = 50 }) {
    // The two slots are optional. Existing settings and manual tools still load
    // in hosts without a workbench, while RC.3 owns navigation/pinning itself.
    ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: id, inject: () => ({ ...(inject?.() || {}), workbench: true }) }, component));
    ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id, order, label }, function WorkbenchIcon({ size }) { return h(Icon, { name: icon, size }); }));
  }
  const styles = `
.dshw{--w-bg:var(--dsw-alias-bg-layer-1,#fff);--w-soft:var(--dsw-alias-bg-layer-2,#f7f8fa);--w-text:var(--dsw-alias-label-primary,#18202c);--w-muted:var(--dsw-alias-label-secondary,#667085);--w-border:var(--dsw-alias-border-l3,#e7e9ef);--w-accent:var(--dsh-plugin-workbench-accent,#4f6bdb);--w-selected:color-mix(in srgb,var(--w-accent) 10%,var(--w-bg));--w-primary:var(--w-text);--w-on-primary:var(--w-bg);container-type:inline-size;container-name:dsh-workbench;color:var(--w-text);font:14px/1.65 var(--dsh-font-family-content,system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif);min-width:0;max-width:100%;box-sizing:border-box;text-align:start;color-scheme:inherit}
.dshw *,.dshw *:before,.dshw *:after{box-sizing:border-box}.dshw h1,.dshw h2,.dshw h3,.dshw h4,.dshw p{margin:0}.dshw h1{font-size:30px;line-height:1.25;letter-spacing:-.025em;font-weight:650}.dshw h2{font-size:24px;line-height:1.35;font-weight:650;letter-spacing:-.015em;overflow-wrap:anywhere}.dshw h3,.dshw h4{font-size:16px;line-height:1.4;font-weight:600}.dshw a{color:var(--w-accent);text-underline-offset:3px;overflow-wrap:anywhere}.dshw button,.dshw input,.dshw select,.dshw textarea{font:inherit;color:inherit;max-width:100%}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select,.dshw textarea{background:var(--dsw-specific-input-major,var(--w-bg));border:1px solid var(--w-border);border-radius:8px;padding:8px 11px;min-width:0;line-height:1.5}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select{min-height:38px}.dshw textarea{resize:vertical}.dshw input[type=checkbox],.dshw input[type=radio]{width:16px;height:16px;flex-shrink:0;accent-color:var(--w-accent)}.dshw :focus-visible{outline:2px solid var(--w-accent);outline-offset:3px}.dshw button:disabled,.dshw input:disabled,.dshw select:disabled,.dshw textarea:disabled{opacity:.5;cursor:not-allowed}.dshw label{font-size:13px}.dshw fieldset{min-width:0;border:1px solid var(--w-border);border-radius:8px}.dshw summary{cursor:pointer;font-weight:550;list-style:none;display:flex;align-items:center;gap:8px}.dshw summary::-webkit-details-marker{display:none}.dshw summary:after{content:'';display:block;margin-inline-start:auto;width:7px;height:7px;border-inline-end:1.75px solid currentColor;border-bottom:1.75px solid currentColor;transform:rotate(45deg);flex-shrink:0}.dshw details[open]>summary:after{transform:rotate(225deg)}.dshw details>summary+*{margin-top:12px}.dshw pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.7 ui-monospace,SFMono-Regular,Consolas,monospace;max-width:100%;background:var(--w-soft);border-radius:6px;padding:14px}.dshw img,.dshw video,.dshw iframe{max-width:100%}
.w-page{display:flex;flex-direction:column;position:relative;padding:0;min-height:540px;gap:0}.w-page[data-main=true]{height:100%;min-height:0;padding:calc(24px + var(--dsh-frame-top-clearance,0px)) 28px 0 max(28px,var(--dsh-frame-leading-clearance,0px));overflow:auto}.dshw[data-main=true]{background:var(--w-bg)}.dshw.w-page,.dshw .w-body,.dshw .w-tab-panel{overflow-x:clip}.w-page-header{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;padding-bottom:22px;flex-shrink:0}.w-heading{min-width:0}.w-subtitle{margin-top:8px!important;font-size:14px;color:var(--w-muted);line-height:1.6}.w-header-actions,.w-toolbar,.w-actions{display:flex;align-items:center;flex-wrap:wrap;gap:8px;min-width:0}.w-header-actions{justify-content:flex-end}.w-body,.w-tabs-layout{display:flex;flex-direction:column;flex:1;min-height:0;min-width:0}.w-body{overflow:auto}.w-tab-panel{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;overflow:auto}.w-tabs{display:flex;align-items:stretch;gap:20px;border-bottom:1px solid var(--w-border);flex-shrink:0;overflow-x:auto;scrollbar-width:thin}.dshw .w-tabs>button{border:0;border-bottom:2px solid transparent;background:transparent;padding:11px 8px 13px;white-space:nowrap;font-size:14px;font-weight:550;cursor:pointer;color:var(--w-muted);display:flex;align-items:center;gap:7px}.dshw .w-tabs>button[aria-selected=true]{border-bottom-color:var(--w-accent);color:var(--w-accent)}.w-count,.w-tag{font-size:12px;line-height:1.5;display:inline-flex;align-items:center;flex-shrink:0;background:var(--w-soft);border-radius:5px;padding:1px 6px;color:var(--w-muted)}.w-tabs [aria-selected=true] .w-count,.w-selected .w-tag{color:var(--w-accent);background:var(--w-selected)}
.dshw .w-button{display:inline-flex;justify-content:center;align-items:center;gap:7px;background:var(--w-bg);border:1px solid var(--w-border);border-radius:8px;padding:8px 12px;min-height:36px;line-height:1.4;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;white-space:normal}.dshw .w-button:not(:disabled):hover{background:var(--w-soft)}.dshw .w-primary{background:var(--w-primary);border-color:var(--w-primary);color:var(--w-on-primary)}.dshw .w-primary:not(:disabled):hover{background:var(--w-primary);opacity:.9}.dshw .w-ghost{background:transparent;border-color:transparent}.dshw .w-danger{color:var(--dsw-alias-state-error-primary,#b43c3c)}.dshw .w-icon-button{width:36px;min-width:36px;padding:8px}.dshw .w-button svg{flex-shrink:0}.w-muted{color:var(--w-muted);font-size:12px;line-height:1.6}.w-section{padding:24px 0;border-bottom:1px solid var(--w-border);min-width:0}.w-section>h3{margin-bottom:12px}.w-section>p+p{margin-top:8px}.w-fields{display:grid;gap:16px;min-width:0}.w-field{display:grid;gap:6px;min-width:0}.w-field>input,.w-field>select,.w-field>textarea{width:100%}.w-status{display:flex;align-items:flex-start;gap:8px;padding:11px 13px;margin:12px 0;border:1px solid var(--w-border);border-radius:8px;background:var(--w-soft);font-size:13px;overflow-wrap:anywhere;flex-shrink:0}.w-status>svg{flex-shrink:0;margin-top:2px}.w-status-error{color:var(--dsw-alias-state-error-primary,#ad3636)}.w-status-success{color:var(--dsw-alias-state-success-primary,#24794a)}.w-status-warn{color:var(--dsw-alias-state-warning-primary,#8a5a00)}.w-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px;width:100%;max-width:580px;padding:48px 24px;margin:auto;min-height:280px;overflow-wrap:anywhere}.w-empty>svg{color:var(--w-muted)}.w-empty h2{font-size:20px}.w-empty .w-muted{font-size:14px}.w-empty .w-toolbar{justify-content:center}
.w-split{display:grid;grid-template-columns:minmax(240px,var(--w-list-width)) minmax(0,1fr);min-height:460px;flex:1;min-width:0}.w-master{min-width:0;border-inline-end:1px solid var(--w-border);overflow:auto;padding-bottom:24px}.w-detail{min-width:0;padding:26px 28px;overflow:auto;overflow-wrap:anywhere;display:flex;flex-direction:column}.w-master-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:20px 16px}.w-search{display:flex;align-items:center;gap:8px;border:1px solid var(--w-border);border-radius:8px;padding:0 10px;min-width:0;flex:1;background:var(--w-bg)}.w-search>svg{color:var(--w-muted);flex-shrink:0}.dshw .w-search>input{border:0!important;background:transparent!important;padding:8px 0!important;width:100%;outline-offset:0}.w-row{display:flex;gap:0;min-width:0;position:relative;border-bottom:1px solid var(--w-border);border-inline-start:3px solid transparent}.w-row-select{display:flex;align-items:flex-start;padding:21px 0 0 14px}.dshw .w-row-button{display:flex;flex-direction:column;align-items:stretch;gap:7px;text-align:start;width:100%;padding:18px 18px 18px 16px;border:0;background:transparent;color:inherit;min-width:0;cursor:pointer;line-height:1.5}.dshw .w-row-button:hover{background:var(--w-soft)}.w-row-head{display:flex;align-items:flex-start;gap:10px;justify-content:space-between;min-width:0}.w-row-head>strong{font-size:14px;line-height:1.5;font-weight:600;overflow-wrap:anywhere}.w-row-meta,.w-row-description{color:var(--w-muted);font-size:12px;line-height:1.6;overflow-wrap:anywhere}.w-row-description{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.w-selected{background:var(--w-selected);border-inline-start-color:var(--w-accent)}.w-back{display:none!important}.w-detail-title{margin-bottom:12px!important}.w-detail-meta{color:var(--w-muted);font-size:13px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}.w-detail-footer{padding:24px 0;display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:auto;border-top:1px solid var(--w-border)}.w-detail-footer .w-muted{flex:1;min-width:160px}.w-definition{display:grid;grid-template-columns:minmax(80px,120px) minmax(0,1fr);gap:8px 16px;font-size:14px;margin:20px 0}.w-definition dt{color:var(--w-muted)}.w-definition dd{margin:0;min-width:0;overflow-wrap:anywhere}
.w-switch-label{display:inline-flex;align-items:center;gap:8px;font-size:13px;position:relative;cursor:pointer}.w-switch-label>input{position:absolute;opacity:0;inset-inline-end:0;width:36px!important;height:22px!important;margin:0;cursor:pointer}.w-switch-track{width:36px;height:22px;border-radius:12px;display:block;background:var(--w-border);border:1px solid var(--w-border);pointer-events:none;padding:2px;transition:background .15s}.w-switch-track:before{content:'';display:block;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 2px #0002;transition:transform .15s}.w-switch-label>input:checked+.w-switch-track{background:var(--w-accent);border-color:var(--w-accent)}.w-switch-label>input:checked+.w-switch-track:before{transform:translateX(14px)}.w-switch-label>input:focus-visible+.w-switch-track{outline:2px solid var(--w-accent);outline-offset:3px}.w-switch-label:has(>input:disabled){opacity:.5;cursor:not-allowed}
.w-overlay{position:fixed;inset:0;background:#0005;display:flex;justify-content:flex-end;z-index:1000;padding:12px;overflow:auto}.w-dialog{width:min(620px,100%);max-height:100%;display:flex;flex-direction:column;min-height:0;background:var(--w-bg);color:var(--w-text);border:1px solid var(--w-border);border-radius:12px;box-shadow:0 18px 70px #0003}.w-dialog-header{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;border-bottom:1px solid var(--w-border);flex-shrink:0}.w-dialog-header>h2{font-size:20px}.w-dialog-body{overflow:auto;padding:20px 24px;min-height:0}.w-editor-grid{display:grid;grid-template-columns:210px minmax(0,1fr) 300px;min-height:500px;flex:1}.w-editor-list{padding:20px 12px;border-inline-end:1px solid var(--w-border);min-width:0}.w-editor-canvas{background:var(--w-soft);padding:20px;min-width:0;display:flex;flex-direction:column;gap:14px}.w-editor-inspector{padding:24px;border-inline-start:1px solid var(--w-border);min-width:0;overflow:auto}.w-editor-inspector h3{margin-bottom:18px}.w-preview-empty{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;aspect-ratio:16/9;min-height:180px;background:var(--w-soft);border:1px solid var(--w-border);border-radius:8px;padding:24px;color:var(--w-muted)}.w-content-pad{padding:24px 0}.w-stack{display:flex;flex-direction:column;gap:16px;min-width:0}.w-scroll-x{overflow:auto;max-width:100%}
@container dsh-workbench (max-width:1000px){.w-editor-grid{grid-template-columns:160px minmax(0,1fr)}.w-editor-inspector{grid-column:1/-1;border-inline-start:0;border-top:1px solid var(--w-border)}.w-header-actions{max-width:60%}.w-split{grid-template-columns:minmax(240px,32%) minmax(0,1fr)}}
@container dsh-workbench (max-width:760px){.w-page-header{gap:14px;flex-wrap:wrap;padding-bottom:18px}.w-heading{flex:1;min-width:170px}.dshw h1{font-size:24px}.w-header-actions{max-width:100%;justify-content:flex-start}.w-subtitle{font-size:13px}.w-tabs{gap:12px}.dshw .w-tabs>button{padding:10px 4px 12px}.w-split{display:block;min-height:360px}.w-split[data-selected=false]>.w-detail{display:none}.w-split[data-selected=true]>.w-master{display:none}.w-master{border-inline-end:0}.w-detail{padding:20px 0}.w-back{display:inline-flex!important;align-self:flex-start;margin:0 0 16px!important}.w-detail h2{font-size:22px}.w-master-toolbar{padding:16px 0}.dshw .w-row-button{padding:16px 10px}.w-detail-footer{position:static}.w-detail-footer .w-muted{flex-basis:100%}.w-editor-grid{display:flex;flex-direction:column}.w-editor-list{border-inline-end:0;border-bottom:1px solid var(--w-border);padding:16px 0}.w-editor-canvas{padding:16px 0;background:var(--w-bg)}.w-editor-inspector{padding:20px 0}.w-dialog-header,.w-dialog-body{padding:16px}.w-button{min-height:40px}.w-definition{grid-template-columns:80px minmax(0,1fr)}}
@media(max-width:700px){.w-page[data-main=true]{padding:calc(16px + var(--dsh-frame-top-clearance,0px)) 16px 0 max(16px,var(--dsh-frame-leading-clearance,0px))}.w-overlay{padding:8px}.w-dialog{width:100%}}
@media(prefers-reduced-motion:reduce){.dshw *,.dshw *:before{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
`;
  function Styles() { return h('style', null, styles); }
  return { Icon, Button, IconButton, Page, Tabs, Status, Empty, Split, Row, Search, Switch, Dialog, Styles, register, styles };
}

// Editable browser entry. Build with node scripts/build-client.mjs.
// Shared original browser source. build-client substitutes the engine identity.
window.__ModuleLoader__.load(__stardustUpdatesWrap({ id: 'dsh-remotion', factory: require => {
        const React = require('react'), { useState, useEffect, useRef } = React, h = React.createElement;
        const W = createWorkbenchUI(React);
// Per-view preferences stay in this plugin instance; user files are never changed.
const projectLibraryPreferences = new Map();
function ProjectLibrary({ items, scope = 'projects', language = 'zh', searchText, updatedAt, renderItem, t, searchHint }) {
  const saved = projectLibraryPreferences.get(scope);
  const [query, setQuery] = React.useState(saved?.query || '');
  const [order, setOrder] = React.useState(saved?.order || 'updated');
  const controlId = React.useId();
  const normalize = text => String(text ?? '').normalize('NFKC').toLocaleLowerCase(language);
  const words = normalize(query).trim().split(/\s+/).filter(Boolean);
  const collator = new Intl.Collator(language, { numeric: true, sensitivity: 'base' });
  const timestamp = row => { const value = Date.parse(updatedAt(row)); return Number.isFinite(value) ? value : 0; };
  const visible = items.filter(row => words.every(word => normalize(searchText(row)).includes(word))).sort((a, b) => {
    const tie = collator.compare(String(a.title || ''), String(b.title || '')) || String(a.id).localeCompare(String(b.id));
    return order === 'title' ? tie : (order === 'oldest' ? timestamp(a) - timestamp(b) : timestamp(b) - timestamp(a)) || tie;
  });
  function change(nextQuery, nextOrder) {
    projectLibraryPreferences.set(scope, { query: nextQuery, order: nextOrder });
    setQuery(nextQuery); setOrder(nextOrder);
  }
  return h('section', { className: 'project-library', 'aria-label': t('工程查找', 'Find projects') },
    h('style', null, PROJECT_LIBRARY_CSS),
    h('div', { className: 'project-library-controls' },
      h('label', { htmlFor: controlId + '-query' }, t('搜索工程', 'Search projects'),
        h('input', { id: controlId + '-query', type: 'search', value: query, placeholder: searchHint, maxLength: 200,
          onChange: e => change(e.target.value, order), onKeyDown: e => { if (e.key === 'Escape' && query) { e.preventDefault(); e.stopPropagation(); change('', order); } } })),
      h('label', { htmlFor: controlId + '-order' }, t('排序', 'Sort by'),
        h('select', { id: controlId + '-order', value: order, onChange: e => change(query, e.target.value) },
          h('option', { value: 'updated' }, t('最近更新', 'Recently updated')),
          h('option', { value: 'oldest' }, t('最早更新', 'Oldest updated')),
          h('option', { value: 'title' }, t('标题', 'Title')))),
      query ? h(W.Button, { variant: 'ghost', onClick: () => change('', order) }, t('清空搜索', 'Clear search')) : null),
    h('p', { className: 'w-muted project-library-count', role: 'status', 'aria-live': 'polite' },
      t('显示 ', 'Showing ') + visible.length + ' / ' + items.length + t(' 个工程', ' projects')),
    visible.length ? visible.map(renderItem) : h(W.Empty, { title: t('没有匹配的工程', 'No matching projects'), icon: 'folder' },
      t('换个关键词，或清空搜索查看全部工程。', 'Try another keyword or clear the search to show all projects.')));
}
const PROJECT_LIBRARY_CSS = `.project-library{min-width:0}.project-library-controls{display:flex;gap:12px;align-items:end;flex-wrap:wrap;padding:12px 0}.project-library-controls>label{display:grid;gap:6px;margin:0!important;min-width:0;color:var(--w-muted);font-size:13px}.project-library-controls>label:first-child{flex:1 1 240px}.project-library-controls>label:nth-child(2){flex:0 1 180px}.project-library-controls input,.project-library-controls select{width:100%;min-width:0;min-height:38px;font:inherit;color:var(--w-text);background:var(--w-bg);border:1px solid var(--w-border);border-radius:8px;padding:8px 10px}.project-library-count{margin:4px 0 12px;font-size:12px}.project-library-controls :focus-visible{outline:2px solid var(--w-accent);outline-offset:3px}@media(max-width:520px){.project-library-controls>label:first-child{flex-basis:100%}.project-library-controls>label:nth-child(2){flex:1 1 160px}}`;

function MediaCanvas({ project, fields, render, dirty, stale, job, running, ready, busy, start, perform, setNotice, t }) {
  const previewing = job?.kind === 'preview' && job.state === 'running';
  const ratio = fields.format === 'portrait' ? '9 / 16' : fields.format === 'square' ? '1 / 1' : '16 / 9';
  return h('div', { className: 'media-preview-workspace' },
    h('div', { className: 'w-toolbar' }, h(W.Button, { icon: 'play', disabled: !project || running || dirty || !ready, title: !ready ? t('先在“环境”页准备渲染工具。', 'Prepare the renderer in Environment first.') : undefined, onClick: () => start('preview') }, t('启动 Studio 预览', 'Start Studio preview')),
      h(W.Button, { disabled: busy || !previewing, onClick: () => perform(async () => { await api({ action: 'cancel', job: job.id }); setNotice(t('已请求停止；正在关闭本次任务。', 'Stopping this job.')); }) }, t('停止预览', 'Stop preview')),
      previewing && job.url ? h('a', { className: 'w-button', href: job.url, target: '_blank', rel: 'noopener noreferrer' }, t('打开 Studio', 'Open Studio')) : null),
    render ? h('div', { className: 'media-player-wrap' }, h('video', { key: render.id, controls: true, preload: 'metadata', src: urlFor(project, 'mp4', { render: render.id }), 'aria-label': t('已导出视频', 'Exported video') })) :
      h('div', { className: 'w-preview-empty media-empty-preview', style: { aspectRatio: ratio, width: fields.format === 'portrait' ? 'min(100%, 240px)' : fields.format === 'square' ? 'min(100%, 440px)' : 'min(100%, 960px)', maxHeight: 'none', minHeight: '0px', alignSelf: 'center' } }, h(W.Icon, { name: 'video', size: 32 }), h('strong', null, t('导出 MP4 后可在这里播放', 'Play the MP4 here after exporting')), h('p', { className: 'w-muted' }, t('Studio 预览会在单独页面打开。', 'Studio preview opens in a separate page.'))),
    h('p', { className: 'w-muted media-render-caption' }, render ? dirty ? t('此 MP4 反映已保存修订；当前编辑尚未保存。', 'This MP4 reflects a saved revision. Current edits are not saved.') : t('此 MP4 来自修订 ', 'This MP4 uses revision ') + render.revision + (stale ? t('，工程已有更新，请重新导出。', '; your project has newer changes. Export again.') : t('，请播放检查最终画面。', '. Play it to check the final output.')) : t('尚未导出本次修改。', 'No export for these changes yet.')),
    render ? h('a', { className: 'w-button', href: urlFor(project, 'mp4', { render: render.id, download: '1' }), download: '' }, t('下载这份 MP4', 'Download this MP4')) : null);
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
    h('div', { className: 'w-toolbar' }, h('h3', null, t('工程素材', 'Project media') + ' · ' + project.assets.length), h(W.Button, { icon: 'upload', disabled: running || dirty, onClick: () => fileRef.current?.click() }, t('上传素材', 'Upload media'))),
    h('p', { className: 'w-muted' }, t('PNG/JPEG 图片、一个背景音频和一个静音背景视频；每个 ≤20 MB，总共 ≤40 MB。轮播按下方图片顺序，每张至少两秒。', 'PNG/JPEG images, one background audio and one muted background video; each ≤20 MB, total ≤40 MB. Slideshow follows the image order below, at least two seconds per image.')),
    imageIds.length > 1 ? h('p', { className: 'w-muted' }, t('上移或下移图片后立即保存。已导出的 MP4 保持原样，请重新导出以应用新顺序。', 'Moving an image saves its order immediately. Existing MP4s are preserved; export again to apply the new order.')) : null,
    dirty ? h(W.Status, null, t('请先保存修改，再上传或移除素材副本。', 'Save changes before uploading or removing media copies.')) : null,
    h('input', { ref: fileRef, type: 'file', accept: '.png,.jpg,.jpeg,.mp3,.wav,.mp4', disabled: running || dirty, onChange: upload, 'aria-label': t('上传素材副本', 'Upload a media copy'), style: { display: 'none' } }),
    project.assets.length ? h('ul', { className: 'media-asset-list' }, project.assets.map(asset => h('li', { key: asset.id }, asset.kind === 'image' ? h('img', { src: urlFor(project, 'asset', { asset: asset.id }), alt: asset.name }) : h(W.Icon, { name: asset.kind === 'video' ? 'video' : 'file', size: 28 }),
      h('div', null, h('strong', null, asset.name), h('p', { className: 'w-muted' }, (asset.kind === 'image' ? t('图片 ', 'Image ') + (imageIds.indexOf(asset.id) + 1) + ' / ' + imageIds.length : asset.kind === 'audio' ? t('背景音频', 'Background audio') : t('背景视频', 'Background video')) + ' · ' + Math.ceil(asset.bytes / 1024) + ' KB')),
      asset.kind === 'image' && imageIds.length > 1 ? h('div', { className: 'w-toolbar media-asset-order' },
        h(W.Button, { variant: 'ghost', disabled: running || dirty || imageIds.indexOf(asset.id) === 0, 'aria-label': t('上移图片：', 'Move image up: ') + asset.name, onClick: () => move(asset, -1) }, t('上移', 'Move up')),
        h(W.Button, { variant: 'ghost', disabled: running || dirty || imageIds.indexOf(asset.id) === imageIds.length - 1, 'aria-label': t('下移图片：', 'Move image down: ') + asset.name, onClick: () => move(asset, 1) }, t('下移', 'Move down'))) : null,
      h(W.Button, { variant: 'ghost', icon: 'trash', disabled: running || dirty, onClick: () => setRemove(asset) }, t('移除上传副本', 'Remove uploaded copy'))))) : h(W.Empty, { title: t('还没有上传素材', 'No media uploaded yet'), icon: 'video' }, t('标题卡可以直接导出。需要图片或配乐时，再上传自己的素材。', 'Title cards can be exported as they are. Upload your own media when you need images or music.')),
    remove ? h(W.Dialog, { title: t('移除素材副本', 'Remove media copy'), closeLabel: t('取消', 'Cancel'), busy: running, onClose: () => setRemove(null) }, h('p', null, remove.name), h('p', { className: 'w-muted' }, t('仅移除本工程中的上传副本，原文件保留。', 'Only the uploaded project copy is removed. Your original file is preserved.')), h('div', { className: 'w-toolbar' }, h(W.Button, { variant: 'danger', disabled: running || dirty, onClick: () => perform(async () => { setProject(await api({ action: 'removeAsset', id: project.id, revision: project.revision, asset: remove.id })); setRemove(null); }) }, t('确认移除副本', 'Confirm removal')), h(W.Button, { disabled: running, onClick: () => setRemove(null) }, t('取消', 'Cancel')))) : null);
}

function MediaExports({ project, dirty, running, activeJob, busy, setArchiveReview, t }) {
  if (!project) return h(W.Empty, { title: t('工程尚未保存', 'Project not saved yet'), icon: 'video' }, t('保存后才能导出视频和可编辑工程。', 'Save the project to export video and editable source.'));
  return h('section', { className: 'media-exports-view' },
    h('h3', null, t('已导出成品', 'Exported videos')),
    h('p', { className: 'w-muted' }, t('每份 MP4 对应已保存的工程修订。修改内容后，需要重新导出。', 'Each MP4 corresponds to a saved project revision. Export again after editing.')),
    project.renders.length ? h('ul', { className: 'media-export-list' }, project.renders.map(render => h('li', { key: render.id },
      h('div', null, h('strong', null, t('修订 ', 'Revision ') + render.revision), h('p', { className: 'w-muted' }, new Date(render.created).toLocaleString() + ' · ' + Math.ceil(render.bytes / 1024) + ' KB'), render.revision === project.revision && !dirty ? h('span', { className: 'w-tag' }, t('当前已保存版本', 'Current saved version')) : null),
      h('a', { className: 'w-button', href: urlFor(project, 'mp4', { render: render.id, download: '1' }), download: '' }, t('下载 MP4', 'Download MP4'))))) : h(W.Empty, { title: t('尚无 MP4 成品', 'No MP4 yet'), icon: 'video' }, t('先准备环境、保存并预览工程，再点击“导出 MP4”。', 'Prepare the renderer, save and preview the project, then choose Export MP4.')),
    h('section', { className: 'w-section' }, h('h3', null, t('工程备份', 'Editable project backup')), h('a', { className: 'w-button', href: urlFor(project, 'source'), download: '' }, t('下载可编辑工程', 'Download editable project'))),
    h('section', { className: 'w-section' }, h('h3', null, t('归档', 'Archive')), h('p', { className: 'w-muted' }, t('归档保留素材与成品，不占当前 30 个工程名额。', 'Archiving preserves media and exports and frees an active project slot.')), h(W.Button, { disabled: busy || dirty || activeJob, onClick: () => setArchiveReview(true) }, t('归档此工程', 'Archive this project'))));
}

const MEDIA_WORKBENCH_CSS = `
.media-workbench.dmw{--fg:var(--w-text);--fg-muted:var(--w-muted);--border:var(--w-border);--bg:var(--w-bg);--bg-surface:var(--w-bg);padding:0}.media-workbench.dmw[data-main=true]{padding:calc(24px + var(--dsh-frame-top-clearance,0px)) 28px 0 max(28px,var(--dsh-frame-leading-clearance,0px))}.media-workbench .media-editor{display:grid;grid-template-columns:260px minmax(0,1fr) 220px;min-height:500px;flex:1}.media-workbench .media-content-fields{border-inline-end:1px solid var(--w-border);padding:24px 20px 24px 0;min-width:0}.media-workbench .media-properties{border-inline-start:1px solid var(--w-border);padding:24px 0 24px 20px;min-width:0}.media-workbench .media-content-fields h3,.media-workbench .media-properties h3{margin-bottom:20px}.media-workbench .media-field{display:grid;gap:7px;margin:0 0 18px;font-size:13px}.media-workbench .media-field label{margin:0;color:var(--w-muted)}.media-workbench .media-field input,.media-workbench .media-field select,.media-workbench .media-field textarea{width:100%;font-size:14px}.media-workbench .media-field textarea{min-height:160px}.media-workbench .media-preview-workspace{display:flex;flex-direction:column;align-items:stretch;gap:16px;padding:24px;min-width:0}.media-workbench .media-preview-workspace>.w-toolbar{justify-content:flex-start}.media-workbench .media-empty-preview{margin:auto 0;max-height:600px;min-height:180px;width:100%;justify-content:center;background:var(--w-soft);border-radius:8px}.media-workbench .media-player-wrap{display:flex;justify-content:center;align-items:center;min-height:220px;flex:1;min-width:0}.media-workbench .media-player-wrap video{width:100%;height:auto;max-height:calc(100dvh - 360px);object-fit:contain;border-radius:8px;background:#14171c}.media-workbench .media-render-caption{margin-top:0}.media-workbench .media-preview-workspace>.w-button{align-self:flex-start}.media-workbench .media-properties .w-section{padding:20px 0}.media-workbench .media-properties .w-button{width:100%;margin-top:10px}.media-workbench .media-properties p{margin:12px 0}.media-workbench .media-job{border-bottom:1px solid var(--w-border);padding:14px 0;font-size:13px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}.media-workbench .media-job details{width:100%}.media-workbench .media-job pre{font-size:12px;max-height:240px}.media-workbench .media-job progress{width:180px;height:10px;accent-color:var(--w-accent)}.media-workbench .media-job[data-state=failed]>strong{color:var(--dsw-alias-state-error-primary,#ad3636)}.media-workbench .media-job[data-state=done]>strong{color:var(--dsw-alias-state-success-primary,#24794a)}.media-workbench .media-export-checks{list-style:none;padding:0;margin:14px 0;display:grid;gap:6px;font-size:13px;overflow-wrap:anywhere}.media-workbench .media-project-list{max-width:900px;padding:12px 0 24px}.media-workbench .media-project-list .w-row-button{padding:20px 16px;border:0;border-radius:0;background:transparent}.media-workbench .media-assets-view,.media-workbench .media-exports-view,.media-workbench .media-environment{padding:24px 0;width:min(900px,100%)}.media-workbench .media-assets-view>.w-muted,.media-workbench .media-exports-view>.w-muted{margin-top:12px}.media-workbench .media-asset-list,.media-workbench .media-export-list{list-style:none;padding:0;margin:20px 0;display:flex;flex-direction:column}.media-workbench .media-asset-list>li,.media-workbench .media-export-list>li{display:flex;align-items:center;gap:16px;flex-wrap:wrap;min-width:0;padding:18px 0;border-bottom:1px solid var(--w-border)}.media-workbench .media-asset-list>li>div,.media-workbench .media-export-list>li>div{flex:1;min-width:180px;overflow-wrap:anywhere}.media-workbench .media-asset-list img{width:80px;height:60px;object-fit:contain;border-radius:6px;background:var(--w-soft)}.media-workbench .media-export-list p{margin-top:5px}.media-workbench .media-export-list .w-tag{margin-top:8px}.media-workbench .media-environment>p{margin:14px 0}.media-workbench .media-environment>button{margin-top:12px}.media-workbench.dmw button.primary{background:var(--w-primary);border-color:var(--w-primary);color:var(--w-on-primary)}.media-workbench .card{border:0;border-bottom:1px solid var(--w-border);border-radius:0;padding:20px 0;background:transparent;box-shadow:none}.media-workbench .notice{background:var(--w-soft);color:var(--w-text);border:1px solid var(--w-border)}.media-workbench .notice.error{color:var(--dsw-alias-state-error-primary,#ad3636)}.media-workbench .media-project-list .bar{justify-content:space-between;border-bottom:1px solid var(--w-border);padding:16px 0}.media-workbench .media-exports-view .w-section h3{margin-bottom:12px}.media-workbench .media-environment button{border:1px solid var(--w-border);border-radius:8px;background:var(--w-primary);color:var(--w-on-primary);padding:8px 12px;font-size:14px;min-height:36px}.media-workbench .media-properties a{font-size:12px}.media-workbench :focus-visible{outline:2px solid var(--w-accent);outline-offset:3px}
@container dsh-workbench (max-width:1050px){.media-workbench .media-editor{grid-template-columns:240px minmax(0,1fr)}.media-workbench .media-properties{grid-column:1/-1;border-inline-start:0;border-top:1px solid var(--w-border);padding:20px 0;display:grid;grid-template-columns:1fr 1fr;gap:20px}.media-workbench .media-properties>h3{grid-column:1/-1;margin:0}.media-workbench .media-properties>.w-section{padding:0;border:0}.media-workbench .media-preview-workspace{padding-inline-end:0}}
@container dsh-workbench (max-width:760px){.media-workbench .media-editor{display:flex;flex-direction:column}.media-workbench .media-content-fields{border-inline-end:0;padding:20px 0}.media-workbench .media-preview-workspace{order:-1;padding:20px 0}.media-workbench .media-properties{display:block}.media-workbench .media-properties>.w-section{padding:20px 0;border-top:1px solid var(--w-border)}.media-workbench .media-empty-preview{max-height:440px}.media-workbench .media-player-wrap video{max-height:480px}.media-workbench .media-asset-list>li>div{min-width:120px}}
@media(max-width:700px){.media-workbench.dmw[data-main=true]{padding:calc(16px + var(--dsh-frame-top-clearance,0px)) 16px 0 max(16px,var(--dsh-frame-leading-clearance,0px))}}
`;

        const engine = 'remotion', title = engine === 'hyperframes' ? 'HyperFrames' : 'Remotion', route = 'api/dsh-' + engine + '/workbench';
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
        // Official stage names are the only progress signal the engines expose; map them to steps instead of inventing percentages.
        const jobSteps = { prepare: ['下载环境', '检查 FFmpeg', '下载官方依赖', '检查官方环境', '检查或下载 Chrome', '下载专用渲染浏览器'], preview: ['准备修订快照', '启动官方预览', '官方预览已就绪'], render: ['准备修订快照', '检查合成', '渲染 MP4', '已完成'] };
        const jobStepOf = step => { const steps = jobSteps[step?.kind] || [], index = steps.indexOf(step?.stage); return { index: index < 0 ? 0 : index, total: steps.length || 1 }; };
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
            const [job, setJob] = useState(cache.job), [busy, setBusy] = useState(false), [error, setError] = useState(''), [notice, setNotice] = useState(''), [pending, setPending] = useState(null), [conflict, setConflict] = useState(false), [exportReview, setExportReview] = useState(false);
            const busyRef = useRef(false), fileRef = useRef(null), latest = useRef({ project, fields, dirty });
            latest.current = { project, fields, dirty };
            const t = (zh, en) => lang === 'en' ? en : zh, activeJob = job?.state === 'running', running = busy || activeJob && job.kind !== 'prepare', jobStep = jobStepOf(job);
// Update protection: dsh-remotion
__stardustUpdatesGuard(React, "dsh-remotion", { dirty, busy: busy || activeJob, retainOnClose: true });

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
            const saveHint=!fields.title.trim()?t('先填写标题再保存。','Enter a title before saving.'):fields.title.length>72?t('标题最多 72 字符。','Titles are limited to 72 characters.'):!(Number.isInteger(fields.duration)&&fields.duration>=3&&fields.duration<=30)?t('时长需在 3–30 秒之间。','Set a duration between 3 and 30 seconds.'):project&&!dirty?t('没有需要保存的修改。','There is nothing to save yet.'):null;
            const exportHint=!environment?.ready?t('先在“环境”页准备渲染工具，再导出。','Prepare the renderer in Environment before exporting.'):dirty?t('先保存修改；导出使用已保存的修订。','Save your changes first; exports use the saved revision.'):t('先检查导出内容，再开始渲染。','Review the export summary before rendering.');
            if(!environment) return __stardustUpdatesInlinePage(React,h(W.Page,{workbench,title,subtitle:t('编辑视频工程，预览并导出 MP4。','Edit video projects, preview and export MP4.'),className:'dmw media-workbench'},h('style',null,MEDIA_WORKBENCH_CSS),error?h(W.Empty,{title:t('暂时无法读取工程','Projects are unavailable'),action:h(W.Button,{disabled:busy,onClick:()=>perform(refresh)},t('重新读取项目','Reload projects'))},mediaError(error,lang==='en')):h(W.Empty,{title:t('正在读取工程与渲染环境…','Loading projects and render environment…'),icon:'video'})),"dsh-remotion");
            return __stardustUpdatesInlinePage(React,h(W.Page,{workbench,title,subtitle:t('编辑视频工程，预览并导出 MP4。','Edit video projects, preview and export MP4.'),className:'dmw media-workbench',actions:h(React.Fragment,null,
 project || creating ? h(W.Button,{icon:'left',disabled:running,onClick:()=>navigate('list')},t('返回项目','Back to projects')) : h(W.Button,{icon:'plus',variant:'primary',disabled:running,onClick:()=>navigate('new')},t('新建视频','New video')),
 project || creating ? h(W.Button,{variant:'primary',disabled:running || !canSave || !!project && !dirty,title:saveHint || undefined,onClick:()=>perform(save)},t('保存工程','Save project')) : h(W.IconButton,{icon:'refresh',label:t('刷新项目','Refresh projects'),disabled:running,onClick:()=>perform(refresh)}),
 project ? h(W.Button,{icon:'download',disabled:running || dirty || !environment.ready,title:exportHint,onClick:()=>setExportReview(true)},t('导出 MP4','Export MP4')) : null)},
 h('style',null,css),h('style',null,MEDIA_WORKBENCH_CSS),h(W.Status,{tone:'error'},conflict ? t('工程已在别处更新，当前输入尚未保存。先复制需要的修改，再重新载入最新修订。', 'The project changed elsewhere and your input is not saved yet. Copy what you need, then reload the latest revision.') : error && mediaError(error,lang==='en')),h(W.Status,{tone:'success'},notice),conflict && project ? h('div',{className:'w-toolbar'},h(W.Button,{icon:'refresh',disabled:running,onClick:()=>setPending(project.id)},t('重新载入最新版本（放弃我的输入）','Reload the latest version (discard my input)')),h(W.Button,{variant:'ghost',disabled:running,onClick:()=>setConflict(false)},t('保留我的输入，稍后处理','Keep my input for now'))) : null,
 (project || creating) && !environment.ready ? h(W.Status,null,t('首次导出前需要准备本地渲染环境；内容可以先编辑和保存。','Prepare the local renderer before your first export. You can edit and save content now.'),h(W.Button,{variant:'ghost',onClick:()=>setEditorTab('environment')},t('查看环境','View environment'))) : null,
 job ? h('div',{className:'media-job',role:job.state==='failed'?'alert':'status','data-state':job.state,'aria-live':job.state==='failed'?'assertive':'polite'},h('strong',null,t('任务状态：','Job status: ')+stage),job.state==='running'?h('span',{className:'w-muted'},t('步骤 '+(jobStep.index+1)+' / '+jobStep.total,'Step '+(jobStep.index+1)+' / '+jobStep.total)):null,
 job.state==='running'?h('progress',{className:'media-job-progress',max:jobStep.total,value:jobStep.index+1,'aria-label':t('任务步骤进度','Job step progress')}):null,
 job.url?h('a',{className:'w-button',href:job.url,target:'_blank',rel:'noopener noreferrer'},t('打开官方 Studio 预览','Open official Studio preview')):null,
 job.state==='running'?h(W.Button,{disabled:busy,onClick:()=>perform(async()=>{await api({action:'cancel',job:job.id});setNotice(t('已请求停止；正在关闭本次任务。','Stopping this job.'));})},job.kind==='preview'?t('停止预览，返回编辑','Stop preview and return to editing'):t('取消任务','Cancel job')):null,
 job.state==='failed'?h(W.Button,{variant:'primary',icon:'refresh',disabled:running || dirty || job.kind!=='prepare' && !project,title:dirty?t('先保存修改，再用同一修订重试。','Save your changes before retrying the same revision.'):job.kind!=='prepare' && !project?t('先在工程库打开工程，再重试本次任务。','Open the project from the list before retrying this task.'):t('重试失败的官方任务；工程已保留。','Retry the failed official task; your project is preserved.'),onClick:()=>start(job.kind==='prepare'?'prepare':job.kind)},t('重试本次任务','Retry this task')):null,
 h('details',null,h('summary',null,t('查看运行记录','Show job log')),h('pre',null,job.lines.join('\n')))) : null,
 h(W.Tabs,{label:t('视频工作台视图','Video workbench views'),value:project || creating ? editorTab : libraryTab,onChange:project || creating ? setEditorTab : setLibraryTab,items:project || creating ? [{id:'content',label:t('内容与预览','Content and preview')},{id:'assets',label:t('素材','Media')},{id:'exports',label:t('导出记录','Exports')},{id:'environment',label:t('环境','Environment')}] : [{id:'projects',label:t('当前工程','Projects'),count:projects.length},{id:'archives',label:t('已归档','Archived'),count:archived.length},{id:'environment',label:t('环境','Environment')}]},
 !project && !creating ? libraryTab === 'environment' ? h('section',{className:'media-environment'},h('h3',null,t('渲染环境','Render environment')+(environment.ready?t(' · 已准备',' · ready'):t(' · 首次需下载',' · first download required'))),h('p', { className: 'muted' }, t(environment?.hint, 'First use downloads the official CLI. ' + (engine === 'hyperframes' ? 'Windows uses the official rendering browser; other platforms reuse installed Chrome when available. FFmpeg must be in PATH.' : 'Installed Chrome is reused; a browser is downloaded when needed. Remotion retains its official license.'))),
engine === 'remotion' && h('p', null, h('a', { href: 'https://www.remotion.dev/license', target: '_blank', rel: 'noreferrer' }, t('查看 Remotion 使用许可证', 'Read the Remotion license'))),
h('button', { disabled: busy || activeJob, onClick: () => start('prepare') }, environment?.ready ? t('重新检查 / 修复环境', 'Check / repair environment') : t('准备渲染环境', 'Prepare render environment'))) : libraryTab === 'archives' ? archived.length ? h('section',{className:'media-project-list'},h('p', { className: 'muted' }, t('归档保留素材与成品，不占当前 30 个工程名额。恢复后可以继续编辑。', 'Archives retain media and output, freeing an active project slot. Restore to edit again.')),
h(ProjectLibrary,{items:archived,scope:'archives',language:lang,t,searchHint:t('搜索归档工程','Search archived projects'),searchText:p=>[p.title,p.body,p.template].join(' '),updatedAt:p=>p.updated,renderItem:p=>h('div', { className: 'bar', key: p.id }, h('strong', null, p.title), h('button', { disabled: busy || dirty || activeJob, onClick: () => perform(async () => { await api({ action: 'restore', id: p.id, revision: p.revision, confirmed: true }); await refresh(); await open(p.id); setNotice(t('工程已恢复。', 'Project restored.')); }) }, t('恢复工程', 'Restore project')))})) : h(W.Empty,{title:t('没有归档工程','No archived projects'),icon:'folder'}) : projects.length ? h('div',{className:'media-project-list'},h(ProjectLibrary,{items:projects,language:lang,t,searchHint:t('搜索标题、正文或模板','Search titles, text or templates'),searchText:p=>[p.title,p.body,p.template,templates.find(row=>row.id===p.template)?.[lang==='en'?'en':'zh']].join(' '),updatedAt:p=>p.updated,renderItem:p=>h(W.Row,{key:p.id,title:p.title,disabled:running,meta:p.duration+t(' 秒 · 修订 ',' sec · revision ')+p.revision,description:(templates.find(row=>row.id===p.template)?.[lang==='en'?'en':'zh'] || p.template),onClick:()=>{setEditorTab('content');navigate(p.id);}})})) : h(W.Empty,{title:t('还没有视频工程','No video projects yet'),icon:'video',action:h(W.Button,{variant:'primary',icon:'plus',disabled:running,onClick:()=>navigate('new')},t('新建视频','New video'))},t('点击“新建视频”，选择模板并保存。环境可以稍后准备。','Choose New video, select a template and save. The renderer can be prepared later.')) :
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
 project && exportReview ? h(W.Dialog,{title:t('导出前检查','Check before export'),closeLabel:t('取消导出','Cancel export'),busy:running,onClose:()=>setExportReview(false)},
 h('p', null, t('确认后启动官方渲染，生成新 MP4；工程内容不会被修改。', 'Rendering starts after you confirm and produces a new MP4. Your project is not modified.')),
 h('ul', { className: 'media-export-checks' }, h('li', null, t('标题：', 'Title: ') + project.title), h('li', null, t('画幅与时长：', 'Canvas and duration: ') + ({ landscape: t('横屏 16:9', 'Landscape 16:9'), portrait: t('竖屏 9:16', 'Portrait 9:16'), square: t('正方形', 'Square') }[project.format] || project.format) + ' · ' + project.duration + t(' 秒', ' sec')), h('li', null, t('素材：', 'Media: ') + project.assets.length + t(' 个', ' items')), h('li', null, t('修订：', 'Revision: ') + project.revision), h('li', null, t('渲染环境：', 'Renderer: ') + (environment.ready ? t('已准备', 'ready') : t('未准备', 'not ready'))), h('li', null, t('上次导出：', 'Last export: ') + (render ? t('修订 ', 'revision ') + render.revision : t('尚未导出', 'none yet')))),
 !project.assets.length ? h(W.Status, null, t('没有上传素材，本次只渲染模板内容。', 'No media uploaded; this export renders the template only.')) : null,
 render && render.revision !== project.revision ? h(W.Status, null, t('上一份 MP4 对应修订 ', 'The last MP4 uses revision ') + render.revision + t('，本次会生成修订 ', '; this export creates revision ') + project.revision + t(' 的新成品；旧成品保留在导出记录中。', '. Older files stay in Exports.')) : null,
 h('div', { className: 'w-toolbar' }, h(W.Button, { variant: 'primary', icon: 'download', disabled: running || dirty || !environment.ready, title: exportHint, onClick: () => { setExportReview(false); start('render'); } }, t('开始导出', 'Start export')), h(W.Button, { disabled: running, onClick: () => setExportReview(false) }, t('取消导出', 'Cancel export')))) : null,
 pending ? h(W.Dialog,{title:t('有未保存的修改','Unsaved changes'),closeLabel:t('留在当前','Stay here'),busy:running,onClose:()=>setPending(null)},h('p', null, t('有未保存内容，如何继续？', 'You have unsaved changes.')),
conflict ? h(W.Status, { tone: 'error' }, t('此工程已在别处更新，直接保存会再次冲突。请选择放弃修改并载入最新版本，或留在当前复制需要的输入。', 'This project changed elsewhere, so saving again would conflict. Discard and load the latest revision, or stay here to copy your input.')) : null,
 h('div', { className: 'w-toolbar' }, h(W.Button, { variant: 'primary', disabled: running || conflict, title: conflict ? t('工程已更新，无法直接保存。', 'The project changed, so saving is blocked.') : undefined, onClick: () => perform(async () => { await save(); await move(pending); }) }, t('保存后继续', 'Save and continue')), h(W.Button, { disabled: running, onClick: () => perform(() => move(pending)) }, t('放弃修改并继续', 'Discard and continue')), h(W.Button, { variant: 'ghost', onClick: () => setPending(null) }, t('留在当前', 'Stay here')))) : null,
 project && archiveReview ? h(W.Dialog,{title:t('归档此工程','Archive this project'),closeLabel:t('取消归档','Cancel archive'),busy:busy || activeJob,onClose:()=>setArchiveReview(false)},h('p', null, t('归档后将从当前项目列表移走；工程、上传素材和已导出 MP4 全部保留，可随时恢复。未保存修改需先处理。', 'Archiving removes this project from the active list. The project, uploaded media and exported MP4s are preserved and can be restored. Save or discard pending edits first.')),
h('div', { className: 'bar' }, h('button', { disabled: busy || dirty || activeJob, onClick: () => perform(archiveProject) }, t('确认归档', 'Confirm archive')), h('button', { disabled: busy, onClick: () => setArchiveReview(false) }, t('取消归档', 'Cancel archive')))) : null),"dsh-remotion");
        }
        function apply(ctx) { let locale; try {
            locale = ctx.get?.('locale') || ctx.locale;
        }
        catch { } W.register(ctx,{id:'dsh-'+engine+'.workbench',label:()=>title,icon:engine==='hyperframes'?'layers':'play',component:Workbench,inject:()=>({locale}),order:engine==='hyperframes'?65:66});
ctx.slots.inject('settings.section', () => ctx.slots.register({ name: 'settings.section', id: 'dsh-remotion', order: engine === 'hyperframes' ? 62 : 63, label: () => title, inject: () => ({ locale }) }, Workbench)); }
        return { inject: ['slots', 'locale'], apply };
    } },{"name":"dsh-remotion","version":"0.1.0","hasWorkbench":true,"packageVersion":"0.10.5","label":"Remotion","labelEn":"Remotion","suiteComponent":true,"sectionIds":["dsh-remotion"],"iconData":"data:image/webp;base64,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"}));

})();

/* STARDUSTLC_UPDATE_CLIENT_BODY_END */
})();
