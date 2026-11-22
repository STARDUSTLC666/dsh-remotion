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
function __stardustUpdatesFooter(React, name) {
  return React.createElement(__StardustPluginUpdatesFooter, { key: 'plugin-updates', React, name });
}
function __stardustUpdatesInlinePage(React, element, name) {
  return React.cloneElement(element, null, element.props.children, __stardustUpdatesFooter(React, name));
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
  const suiteUpdating = next.job?.name === '@stardustlc/dsh-suite' && ['verifying', 'installing', 'cancelling', 'unknown', 'restore-failed'].includes(next.job?.state);
  const suite = next.rows.find(row => row.name === '@stardustlc/dsh-suite' && (row.enabled || suiteUpdating));
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
    record = { refs: new Map(), timer: null, version: participant.version, alive: true, hold: false, uiRevision: 11, migration: Promise.resolve() };
    pools.set(root, record);
    __stardustUpdatesActivate(record, pools, root, React, require);
  } else if ((record.uiRevision || 0) < 11 && !record.upgrading) {
    // An earlier loaded participant may still own an older client revision. Keep
    // its references and draft guards, wait for any admitted install, then
    // replace that one client fiber instead of running two window heartbeats.
    const shared = record;
    const previousMigration = record.migration;
    record.upgrading = record.migration = Promise.resolve(previousMigration).then(async () => {
      while (shared.alive && shared.hold) await new Promise(resolve => setTimeout(resolve, 500));
      if (!shared.alive || !shared.refs.size) return;
      await shared.fiber?.dispose?.();
      if (!shared.refs.size) return;
      shared.alive = true; shared.uiRevision = 11; pools.set(root, shared);
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
  const { useState, useEffect, useRef } = React, id = crypto.randomUUID(), listeners = new Set(), pool = __stardustUpdatesGuards(), requests = new Set(), knownRows = new Map();
  let alive = true, registered = false, state = null, lastInteraction = Date.now(), inPoll = false, manualOperation = false;
  const language = () => String(ctx.locale?.getSnapshot?.().active || '').startsWith('en') ? 'en' : 'zh';
  const t = (zh, en) => language() === 'en' ? en : zh;
  const REPOS = { 'dsh-calendar': 'dsh-calendar', 'dsh-cite': 'dsh-cite', 'dsh-code-security': 'dsh-code-security', 'dsh-codex-port': 'dsh-codex-port', 'deepseek-computer-use': 'deepseek-computer-use', 'dsh-dingtalk': 'dsh-dingtalk', '@stardustlc/dsh-docker': 'dsh-docker', '@stardustlc/dsh-dream': 'dsh-dream', 'dsh-email': 'dsh-email', 'dsh-ffmpeg': 'dsh-ffmpeg', 'dsh-flakefinder': 'dsh-flakefinder', 'dsh-hyperframes': 'dsh-hyperframes', 'dsh-minimal-ptc': 'dsh-minimal-ptc', 'dsh-ppt': 'dsh-ppt', 'dsh-remotion': 'dsh-remotion', '@stardustlc/dsh-review': 'dsh-review', 'dsh-rss': 'dsh-rss', 'dsh-slack': 'dsh-slack', 'dsh-sql': 'dsh-sql', '@stardustlc/dsh-suite': 'dsh-suite', 'dsh-voice': 'dsh-voice' };
  const repoUrl = pkg => Object.hasOwn(REPOS, pkg) ? 'https://github.com/STARDUSTLC666/' + REPOS[pkg] : null;
  const preferences = name => state?.preferences.packages[name] || { checkEnabled: true, autoInstall: false, autoScope: 'compatible', deferredUntil: 0, ignoredVersion: null };
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
  const STALE_CHECK_MS = 30 * 60 * 1000, STALE_RETRY_MS = 5 * 60 * 1000, staleChecks = new Map(), staleInFlight = new Set();
  function refreshIfStale(row) {
    if (!alive || !row || row.sourceKind !== 'registry' || row.bundledBy || !row.available || row.updating) return;
    const now = Date.now();
    if (row.checkedAt && now - row.checkedAt <= STALE_CHECK_MS) return;
    if (staleInFlight.has(row.name) || now - (staleChecks.get(row.name) ?? -Infinity) < STALE_RETRY_MS) return;
    staleChecks.set(row.name, now);
    staleInFlight.add(row.name);
    void (async () => {
      try { await api({ action: 'check', name: row.name }); await refresh(); }
      catch { /* Offline or transient errors stay silent and throttled by staleChecks. */ }
      finally { staleInFlight.delete(row.name); }
    })();
  }
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
      'release-changed': t('发现更新的发布版本（或发布信息已更新），已刷新至最新状态，请再次确认安装。', 'A newer release or updated metadata was found and refreshed; confirm again to install.'),
      'preferences-conflict': t('另一个窗口修改了偏好，已刷新，请重试。', 'Preferences changed in another window. They have been refreshed; retry.'),
      'preferences-unreadable': t('更新偏好文件无法读取，自动安装已关闭。请检查当前 profile 的 stardustlc-plugin-updates.json。', 'Preferences could not be read. Automatic installation is off. Check stardustlc-plugin-updates.json in this profile.'),
      'no-update': t('版本已变化或暂不兼容，请重新检查。', 'The version changed or is incompatible. Check again.'),
      'source-not-registry': t('本地源码、Git 等安装，请通过原安装方式更新。', 'Update local, Git and other external sources through their original installation method.'),
      'managed-by-suite': t('这个插件随 Suite 安装，通过 Suite 更新。', 'This plugin was installed through Suite and is updated through Suite.'),
      'owner-required': t('只有 profile 拥有者能管理更新。', 'Only the profile owner can manage updates.'),
      'version-mismatch': t('宿主装入的版本与目标不同。请重新检查版本和软件源策略。', 'The installed version differs from the target. Check the release and registry policy.'),
      'unexpected-package': t('宿主装入的包或版本与目标不同。请检查版本和软件源策略。', 'The installed package or version differed from the target. Check the release and registry policy.'),
      'version-unconfirmed': t('尚未确认新版已加载，请在插件详情中检查当前版本。', 'The new version could not be confirmed. Check the installed version in plugin details.'),
      'build-blocked': t('构建脚本等待批准。请查看原生插件管理中的安装提示。', 'Build scripts await approval. Review the install details in native plugin management.'),
      'bundle-in-use': t('宿主暂时无法热卸载旧版（通常因本轮刚更新过其他共用底层依赖的插件，内存路径待刷新；或同时启用了包含此组件的组合包）：直接手动重启一次 DSH 即可继续更新，无需逐个停用插件。', 'The host cannot hot-unload the previous version right now (usually because another plugin sharing dependencies was updated earlier in this session, or a bundle containing this component is also active): restart DSH once and retry without disabling plugins one by one.'),
      'already-installed': t('该包已在当前配置中，请刷新或重启 DSH 后查看当前版本。', 'This package is already present in the profile; refresh or restart DSH to inspect its version.'),
      'incompatible-version': t('目标版本与当前运行的 DSH 版本不兼容。', 'The target version is incompatible with the running DSH version.'),
      'stop-profile': t('当前配置未启用热重载，需关闭 DSH 后再通过命令行更新。', 'This profile runs without hot reload; stop DSH and update via CLI.'),
      'not-removable': t('此内置或受保护插件不支持在此处移除替换。', 'This built-in or protected bundle cannot be replaced here.'),
      'pkg-network': t('连接 npm 源时网络中断，请稍后重试。', 'Network error reaching the package registry. Retry shortly.'),
      'pkg-timeout': t('包管理器请求超时，请检查网络后重试。', 'Package manager request timed out. Check your connection and retry.'),
      'pkg-not-found': t('未找到目标版本或已被源撤回，请重新检查更新。', 'Target release was not found on the registry. Check again.'),
      'pkg-no-matching-version': t('没有匹配当前兼容性要求的已发布版本。', 'No published version matches the compatibility constraints.'),
      'pkg-integrity': t('下载包的完整性校验未通过，已放弃安装，请重试。', 'Package integrity verification failed. Installation aborted; retry.'),
      'pkg-disk-full': t('磁盘空间不足，请清理后重试。', 'Disk space is full. Free disk space and retry.'),
      'pkg-permission': t('无权写入当前 profile 目录，请检查文件权限。', 'Permission denied writing to this profile directory.'),
      'pkg-pnpm-missing': t('未检测到可用的 pnpm，请在环境或宿主插件设置中检查。', 'pnpm is unavailable to the host package manager.'),
      'operation-error': t('宿主包管理器未能完成操作，可在原生「插件」详情页点击更新查看完整日志。', 'Host package manager did not complete the operation. Retry from native plugin details to inspect logs.'),
    })[code] || t('操作未完成，请刷新后重试。DSH 不会因此自动重启。', 'The operation could not be completed. Refresh and retry. DSH will not restart automatically.');
  }
  function reasonOf(job) {
    if (!job) return null;
    if (job.reason) return job.reason;
    const res = job.outcome?.result;
    if (res?.pendingBuilds || res?.failureKind === 'build-blocked') return 'build-blocked';
    if (res?.failureKind && ['network', 'timeout', 'not-found', 'no-matching-version', 'integrity', 'pnpm-missing', 'disk-full', 'permission'].includes(res.failureKind)) return 'pkg-' + res.failureKind;
    return res?.error?.code || null;
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
    if (job.state === 'installing') {
      const phase = ({
        checking: t('宿主正在检查版本', 'Host checking release'),
        removing: t('正在卸载旧版', 'Unloading the previous version'),
        applying: t('正在加载新版', 'Loading the new version'),
        restoring: t('正在恢复旧版', 'Restoring the previous version'),
      })[job.phase];
      if (phase) return phase;
    }
    return ({ verifying: t('正在核对版本', 'Verifying release'), installing: t('正在安装', 'Installing'), cancelling: t('正在请求取消', 'Requesting cancellation'), complete: t('已更新', 'Updated'), 'restart-required': t('已安装，等待你手动重启', 'Installed; manual restart needed'), restored: t('更新未成功，已恢复原版本', 'Update failed; previous version restored'), 'restore-failed': t('恢复未成功，请检查官方插件管理', 'Recovery failed; check native plugin management'), unknown: t('结果未确认，请检查官方插件管理', 'Result unconfirmed; check native plugin management'), cancelled: t('已取消', 'Cancelled'), failed: t('更新未成功', 'Update failed') })[job.state] || job.state;
  }
  const FOOTER_CSS = '.plugin-updates-footer{box-sizing:border-box;flex-shrink:0;margin-top:16px;padding-top:14px;border-top:var(--dsh-control-border-width,0.5px) solid var(--dsw-alias-border-l2,var(--dsw-alias-border-l3,#e5e7eb));min-width:0;max-width:100%;color:var(--dsw-alias-label-primary,#202124)}'
    + '.dshw.plugin-updates-footer.is-inline{display:block!important;width:100%!important;max-width:100%!important;margin-block:auto 0!important;margin-inline:0!important;padding:6px 14px!important;border-top:var(--dsh-control-border-width,0.5px) solid var(--dsw-alias-border-l2,var(--dsw-alias-border-l3,#e5e7eb));background:var(--dsw-alias-bg-layer-1,var(--w-soft,#f7f8fa));font-size:12px;line-height:1.45}'
    + '.plugin-updates-footer .updates-bar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px 12px;min-block-size:28px;min-width:0}'
    + '.plugin-updates-footer .updates-bar-info,.plugin-updates-footer .updates-bar-actions,.plugin-updates-footer .updates-head-actions,.plugin-updates-footer .updates-title-row{display:flex;align-items:center;flex-wrap:wrap;gap:6px 8px;min-width:0}'
    + '.plugin-updates-footer .updates-head{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px 12px}'
    + '.plugin-updates-footer .updates-compact-bar{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px 12px}'
    + '.plugin-updates-footer .updates-compact-bar>.updates-options{margin-top:0;min-width:0}'
    + '.plugin-updates-footer .updates-compact-bar>.updates-options[open]{flex:1 1 100%}'
    + '.plugin-updates-footer h2{font-size:13.5px;line-height:1.4;margin:0;font-weight:600}'
    + '.plugin-updates-footer .updates-pill{display:inline-flex;align-items:center;padding:1px 7px;border-radius:999px;font-size:11px;font-weight:600;line-height:1.5;background:var(--dsw-alias-bg-layer-2,var(--w-soft,#eef1f6));color:var(--dsw-alias-label-secondary,#657080)}'
    + '.plugin-updates-footer .updates-pill.is-accent{background:color-mix(in srgb,var(--w-accent,#4f6bdb) 14%,transparent);color:var(--w-accent,#4f6bdb)}'
    + '.plugin-updates-footer .updates-pill.is-error{background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#ad3636) 14%,transparent);color:var(--dsw-alias-state-error-primary,#ad3636)}'
    + '.plugin-updates-footer .updates-mono,.plugin-updates-footer .updates-subtitle,.plugin-updates-footer .updates-version{font:12px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;overflow-wrap:anywhere;margin:0}'
    + '.plugin-updates-footer .updates-badge{padding:1px 6px;border-radius:5px;background:var(--dsw-alias-bg-layer-2,var(--w-soft,#eef1f6));color:var(--dsw-alias-label-secondary,#657080)}'
    + '.plugin-updates-footer .updates-meta-line,.plugin-updates-footer .updates-note{margin:3px 0 0;font-size:12px;line-height:1.55}'
    + '.plugin-updates-footer .updates-inline-msg.is-error{color:var(--dsw-alias-state-error-primary,#ad3636);font-size:12px}'
    + '.plugin-updates-footer .w-button.is-sm{min-block-size:26px;min-inline-size:26px;min-height:26px;padding:3px 9px;font-size:12px;gap:5px;border-radius:6px}'
    + '.plugin-updates-footer .updates-options{margin-top:8px}'
    + '.plugin-updates-footer .updates-options>summary{cursor:pointer;display:inline-flex;align-items:center;gap:0.55ch;min-block-size:24px;font-size:12px;line-height:1.5;font-weight:500;color:var(--dsw-alias-label-secondary,#657080);list-style:none}'
    + '.plugin-updates-footer .updates-options>summary:after{display:none}'
    + '.plugin-updates-footer .updates-options>summary::before{content:"";inline-size:6px;block-size:6px;flex-shrink:0;border-inline-end:1.5px solid currentColor;border-block-end:1.5px solid currentColor;rotate:-45deg}'
    + '.plugin-updates-footer .updates-options>summary:dir(rtl)::before{rotate:135deg}'
    + '.plugin-updates-footer .updates-options[open]>summary::before{rotate:45deg}'
    + '.plugin-updates-footer .updates-options>summary:focus-visible{outline:2px solid var(--dsw-focus-ring-color,#6b79df);outline-offset:3px;border-radius:4px}'
    + '.plugin-updates-footer details::details-content{interpolate-size:allow-keywords;overflow:clip;contain:layout}'
    + '.plugin-updates-footer details:not([open])::details-content{block-size:0}'
    + '.plugin-updates-footer .updates-settings{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:14px;padding:10px 0 2px}'
    + '.plugin-updates-footer>.w-section{margin:8px 0 0;padding:0;border:0}'
    + '.plugin-updates-footer .w-toolbar{margin-top:8px!important}'
    + '.plugin-updates-footer .w-switch-label{max-width:100%;gap:12px;align-items:flex-start}'
    + '.plugin-updates-footer .w-switch-track{flex-shrink:0}'
    + '.plugin-updates-footer .updates-notes{margin-top:8px;padding:10px 12px;border:1px solid var(--dsw-alias-border-l3,#e5e7eb);border-radius:8px;background:var(--dsw-alias-bg-base,var(--w-bg,#fff))}'
    + '.plugin-updates-footer .updates-notes pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:220px;overflow:auto;margin:6px 0;padding:10px;font:12px/1.65 ui-monospace,monospace}'
    + '.plugin-updates-footer .updates-notes pre code{font:inherit;background:transparent;padding:0}'
    + '.plugin-updates-footer .updates-links{display:flex;flex-wrap:wrap;align-items:center;gap:4px 14px;margin-top:10px;padding-top:8px;border-top:1px dashed var(--dsw-alias-border-l3,#e5e7eb);font-size:12px;line-height:1.5;color:var(--dsw-alias-label-secondary,#657080)}'
    + '.plugin-updates-footer .updates-links a{color:inherit;text-decoration:none;display:inline-flex;align-items:center;min-block-size:24px;gap:4px}'
    + '.plugin-updates-footer .updates-links a:hover{color:var(--dsw-alias-label-primary,#202124);text-decoration:underline}'
    + '.plugin-updates-footer .updates-links a:focus-visible{outline:2px solid var(--dsw-focus-ring-color,#6b79df);outline-offset:3px;border-radius:4px}'
    + '.plugin-updates-footer .w-overlay{z-index:1002}'
    + '.plugin-updates-footer .updates-auto-nudge{display:flex;align-items:center;flex-wrap:wrap;gap:6px 10px;margin-top:6px;font-size:12px;color:var(--dsw-alias-label-secondary,#657080)}'
    + '@media(pointer:coarse){.plugin-updates-footer .w-button.is-sm{min-block-size:32px;min-height:32px;padding:5px 11px}}'
    + '@media(prefers-reduced-motion:no-preference){.plugin-updates-footer .updates-options>summary::before{transition:rotate .18s ease}.plugin-updates-footer details::details-content{transition:block-size .22s ease,content-visibility .22s ease allow-discrete}}'
    + '@media(max-width:600px){.plugin-updates-footer .updates-head{gap:8px}.plugin-updates-footer .w-toolbar{gap:6px;flex-wrap:wrap}.plugin-updates-footer .w-button{max-width:100%}}';
  function FooterFrame({ name, label, inline = false, supplement = false, head, children }) {
    return h('section', { className: 'dshw plugin-updates-footer' + (inline ? ' is-inline' : ''), 'data-plugin-update-footer': name, 'aria-label': label + (supplement ? t(' · 自动更新与反馈', ' · Auto-update and feedback') : t(' · 版本与更新', ' · Version and updates')) },
      h('style', null, W.styles),
      h('style', null, FOOTER_CSS),
      head, children);
  }
  function Panel({ name, inline = false }) {
    const snapshot = useSnapshot(), [error, setError] = useState(''), [working, setWorking] = useState(false), [checking, setChecking] = useState(false), [dialog, setDialog] = useState(null), [selectedVersion, setSelectedVersion] = useState(null), [notes, setNotes] = useState(null), [notesOpen, setNotesOpen] = useState(false), [loadingNotes, setLoadingNotes] = useState(false), [dismissedJobId, setDismissedJobId] = useState(null);
    const seenActiveJob = useRef ? useRef(null) : { current: null };
    const row = rowFor(name), original = originalRow(name), target = row?.name || name, prefs = preferences(target), job = snapshot?.job?.name === target ? snapshot.job : null;
    if (job && ['verifying', 'installing', 'cancelling'].includes(job.state)) seenActiveJob.current = job.id;
    const panelStaleTarget = !!snapshot && !!row && !!original && (!inline || (row.sourceKind === 'registry' && row.available && prefs.deferredUntil <= Date.now() && prefs.ignoredVersion !== row.release?.version));
    useEffect(() => { if (panelStaleTarget && !activeJob()) refreshIfStale(row); }, [panelStaleTarget, row?.name, row?.available, row?.checkedAt]);
    async function perform(callback) { setError(''); setWorking(true); try { await callback(); await refresh(); } catch (error) { setError(error.message); await refresh().catch(() => {}); } finally { setWorking(false); } }
    async function save(changes, consent) { await api({ action: 'preferences', name: target, revision: state.preferences.revision, changes, consent }); }
    async function check() { setError(''); setChecking(true); try { staleChecks.set(target, Date.now()); await api({ action: 'check', name: target }); await refresh(); } catch (error) { setError(error.message); } finally { setChecking(false); } }
    async function runOperation(request) {
      setDialog(null); manualOperation = true; notify();
      setError(''); setWorking(true);
      try {
        try {
          await heartbeat();
          const started = await api(request);
          seenActiveJob.current = started.id;
          while (alive) {
            await new Promise(resolve => setTimeout(resolve, 800)); await heartbeat(); await refresh();
            if (state.job?.id !== started.id) throw new Error('operation-unconfirmed');
            if (!activeJob()) break;
          }
          await refresh();
        } finally { manualOperation = false; notify(); }
      } catch (err) {
        setError(err.message);
        if (request.action === 'install' && ['check-first', 'release-changed'].includes(err?.message)) {
          staleChecks.set(target, Date.now());
          await api({ action: 'check', name: target }).catch(() => {});
        }
        await refresh().catch(() => {});
      } finally { setWorking(false); }
    }
    async function showNotes() {
      if (notesOpen) { setNotesOpen(false); return; }
      setNotesOpen(true); setNotes(null); setLoadingNotes(true); setError('');
      try { setNotes(await api({ action: 'notes', name: target, version: row.release.version })); } catch (error) { setError(error.message); } finally { setLoadingNotes(false); }
    }
    if (inline && (!snapshot || !row || !original)) return null;
    if (!snapshot) return h('p', { className: 'dshw w-muted' }, t('正在读取更新状态…', 'Loading update status…'));
    if (!row || !original) return h(W.Status, null, t('此插件尚未安装或已从当前 profile 移除。', 'This plugin is not installed in the current profile.'));
    const title = language() === 'en' ? original.labelEn : original.label;
    const ownPage = pageState(true), unconfirmed = ['unknown', 'restore-failed'].includes(snapshot.job?.state);
    const staleWindows = (snapshot.pages.clients || []).some(client => !client.fresh);
    const pageBusy = ownPage.busy || (snapshot.pages.clients || []).some(client => client.id !== id && client.busy);
    const installLocked = working || activeJob() || unconfirmed || snapshot.updaterRestart || snapshot.preferenceError || !snapshot.activity.known
      || snapshot.activity.busy || snapshot.pages.dirty || ownPage.dirty || pageBusy || !snapshot.pages.known;
    const checkingThis = checking || snapshot.checkingNames?.includes(target);
    const managed = row.sourceKind === 'registry';
    const showUpdate = managed && row.available;
    const deferred = prefs.deferredUntil > Date.now();
    const ignored = !!row.release?.version && prefs.ignoredVersion === row.release.version;
    const actionableUpdate = showUpdate && !deferred && !ignored;
    const canConfirm = showUpdate && row.release?.version === selectedVersion && !installLocked && !row.loadError;
    const isSuite = target === '@stardustlc/dsh-suite';
    const jobResult = job?.outcome?.result;
    const jobReason = reasonOf(job);
    const jobActiveThis = !!job && ['verifying', 'installing', 'cancelling'].includes(job.state);
    const canCancel = jobActiveThis && !['applying', 'restoring'].includes(job.phase);
    const jobAttentionThis = !!job && ['restart-required', 'restored', 'restore-failed', 'unknown', 'failed'].includes(job.state) && (unconfirmed || dismissedJobId !== job.id);
    const jobJustCompleted = !!job && job.state === 'complete' && seenActiveJob.current === job.id && dismissedJobId !== job.id;
    const canSuggestAuto = !!job && job.state === 'complete' && !jobReason && job.mode !== 'automatic' && (!prefs.autoInstall || prefs.autoScope !== 'compatible') && managed && !snapshot.preferenceError && dismissedJobId !== job.id;
    const inlineJobVisible = jobActiveThis || jobAttentionThis || jobJustCompleted;
    if (inline && !actionableUpdate && !inlineJobVisible && !working && !checking && !error && !dialog && !notesOpen) return null;
    const notesSection = notesOpen && h('section', { className: 'updates-notes', 'aria-label': t('更新记录', 'Release notes') },
      h('strong', null, target + ' · ' + (notes?.version || row.release?.version || '')),
      loadingNotes ? h('p', { className: 'w-muted updates-note' }, t('正在读取…', 'Loading…'))
        : notes?.text ? h('pre', { tabIndex: 0, role: 'region', 'aria-label': t('更新记录内容', 'Release notes content') }, h('code', null, notes.text))
        : h('p', { className: 'w-muted updates-note' }, t('未找到此版本的独立更新记录。', 'No separate notes were found for this version.')),
      notes?.url && h('a', { href: notes.url, target: '_blank', rel: 'noreferrer noopener' }, t('查看仓库更新记录', 'View repository changelog')));
    const windowsDialog = dialog === 'windows' && h(W.Dialog, { title: t('断开的窗口都已关闭？', 'Are the disconnected windows closed?'), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
      h('div', { className: 'w-stack' }, h('p', null, t('只清除超过 45 秒未回应的其他窗口记录。请先确认它们已经关闭；仍在使用的窗口请保存修改并刷新。当前或仍在回应的窗口保护会保留。', 'Only other windows silent for over 45 seconds are cleared. Confirm that they are closed; save and refresh windows still in use. Current and responsive windows remain protected.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')), h(W.Button, { onClick: () => { setDialog(null); void perform(() => api({ ...pageState(true), action: 'reconfirm-windows', confirmation: 'other-stale-windows-are-closed' })); } }, t('已关闭，重新确认状态', 'They are closed; reconfirm')))));
    const confirmDialog = ['automatic', 'install'].includes(dialog) && h(W.Dialog, { title: dialog === 'automatic' ? (isSuite ? t('允许 Suite 空闲时自动热更新？', 'Allow idle automatic updates for Suite?') : t('允许这个插件空闲时自动热更新？', 'Allow idle automatic updates for this plugin?')) : (isSuite ? t('确认更新 Suite 整包', 'Confirm Suite bundle update') : t('确认更新此插件', 'Confirm this plugin update')), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
      dialog === 'automatic' ? h('div', { className: 'w-stack' }, h('p', null, (language() === 'en' ? row.labelEn : row.label) + ' · ' + target), isSuite && h('p', null, t('此处设置作用于 Suite 整包（包含 18 个组件）。独立安装的其他插件不受影响。', 'This setting applies to the whole Suite (including its 18 components). Other independently installed plugins are unaffected.')), h('p', null, t('你正在主动启用自动安装。只处理通过当前 DSH 与 Node 兼容性校验的稳定版本（含功能小版本与补丁，跨主版本仍需手动确认）；有任务、未保存修改、未知窗口或等待重启时暂停。', 'You are explicitly enabling automatic installation for compatible stable releases (minor and patch updates matching this DSH and Node runtime; major upgrades still require manual confirmation). Running tasks, unsaved changes, unknown windows or a pending restart pause it.')), h('p', null, t('支持热更新时原地重载，不会自动重启 DSH；其他插件不会跟着开启，可随时关闭。', 'Hot-reloads in place when supported and never restarts DSH automatically. Other plugins remain unchanged; turn it off anytime.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('保持关闭', 'Keep off')), h(W.Button, { variant: 'primary', onClick: () => { setDialog(null); void perform(() => save({ checkEnabled: true, autoInstall: true, autoScope: 'compatible' }, 'enable-idle-compatible-updates')); } }, t('允许空闲自动热更新', 'Allow idle automatic updates')))) :
      h('div', { className: 'w-stack' },
        isSuite && h('p', null, t('此处操作的是 Suite 整包，包含 18 个组件。独立安装的其他插件不受影响。', 'This action applies to the whole Suite, including its 18 components. Other independently installed plugins are unaffected.')),
        h('p', { className: 'updates-version' }, target + ' · ' + row.version + ' → ' + selectedVersion),
        h('p', null, selectedVersion === row.release?.version ? t('Harness 会热更新并重新加载；需要手动重启时，更新区会显示宿主结果，停用状态会保留。', 'Harness hot-updates and reloads in place. If a manual restart is needed, it appears in the update result; disabled status is preserved.') : (showUpdate && row.release?.version ? message('release-changed') : message('check-first'))),
        h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')),
          showUpdate && row.release?.version && row.release.version !== selectedVersion
            ? h(W.Button, { variant: 'primary', disabled: installLocked || row.loadError, onClick: () => { setError(''); setSelectedVersion(row.release.version); } }, t('更新为 v', 'Use v') + row.release.version)
            : h(W.Button, { variant: 'primary', disabled: !canConfirm, onClick: () => runOperation({ action: 'install', name: target, version: selectedVersion, confirmation: 'update-installed-plugin' }) }, t('安装此版本', 'Install this version')))));
    const checkButton = variant => h(W.Button, { variant, className: 'is-sm', icon: 'refresh', disabled: checkingThis || !managed, onClick: check }, checkingThis ? t('正在检查…', 'Checking…') : isSuite ? t('检查整包更新', 'Check Suite updates') : t('检查更新', 'Check for updates'));
    const recheckButton = variant => h(W.Button, { variant, className: 'is-sm', icon: 'refresh', disabled: checkingThis || !managed, onClick: check }, checkingThis ? t('正在检查…', 'Checking…') : t('重新检查', 'Check again'));
    const primary = showUpdate
      ? h(W.Button, { variant: 'primary', className: 'is-sm', icon: 'download', disabled: installLocked || row.loadError, onClick: () => { setError(''); if (job && !jobActiveThis && !unconfirmed) setDismissedJobId(job.id); setSelectedVersion(row.release.version); setDialog('install'); } }, (isSuite ? t('更新 Suite 至 v', 'Update Suite to v') : t('更新至 v', 'Update to v')) + row.release.version)
      : managed ? checkButton() : null;
    if (inline) {
      const lockHint = unconfirmed ? message('operation-unconfirmed')
        : snapshot.updaterRestart ? message('restart-required')
        : snapshot.preferenceError ? message('preferences-unreadable')
        : (snapshot.pages.dirty || ownPage.dirty) ? t('请先保存修改后再更新', 'Save changes before updating')
        : (snapshot.activity.busy || pageBusy) ? t('当前任务或对话框结束后可更新', 'Finish active task or dialog to update')
        : (!snapshot.activity.known || !snapshot.pages.known) ? t('等待窗口状态确认', 'Waiting for window confirmation')
        : '';
      return h(FooterFrame, { name, label: title, inline: true, head: h('div', { className: 'updates-bar' },
        h('div', { className: 'updates-bar-info' },
          inlineJobVisible
            ? h(React.Fragment, null,
              h('span', { className: 'updates-pill' + (jobActiveThis ? ' is-accent' : ['failed', 'restore-failed', 'unknown', 'restored'].includes(job.state) ? ' is-error' : '') }, jobLabel(job)),
              job.to && h('span', { className: 'updates-mono' }, (isSuite ? 'dsh-suite ' : '') + job.from + ' → ' + job.to),
              jobReason && h('span', { className: 'updates-inline-msg is-error' }, message(jobReason)))
            : actionableUpdate ? h(React.Fragment, null,
              h('span', { className: 'updates-pill is-accent' }, isSuite ? t('Suite 新版本', 'Suite update') : t('有新版本', 'Update available')),
              h('span', { className: 'updates-mono' }, (isSuite ? 'dsh-suite ' : '') + 'v' + row.version + ' → v' + row.release.version),
              lockHint && h('span', { className: 'w-muted' }, '· ' + lockHint)) : null,
          error && h('span', { className: 'updates-inline-msg is-error', role: 'alert' }, message(error))),
        h('div', { className: 'updates-bar-actions' },
          staleWindows && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => setDialog('windows') }, t('确认已关闭窗口', 'Confirm closed windows')),
          canCancel && h(W.Button, { className: 'is-sm', disabled: job?.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消更新', 'Cancel update')),
          !jobActiveThis && error === 'check-first' && managed && recheckButton(actionableUpdate ? 'ghost' : 'primary'),
          !jobActiveThis && actionableUpdate && row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
          !jobActiveThis && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')),
          !jobActiveThis && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版', 'Ignore')),
          !jobActiveThis && actionableUpdate && primary,
          !jobActiveThis && !actionableUpdate && canSuggestAuto && h(W.Button, { variant: 'primary', className: 'is-sm', disabled: working, onClick: () => { setError(''); setDialog('automatic'); } }, t('开启空闲自动热更新', 'Enable idle auto-updates')),
          !jobActiveThis && !actionableUpdate && !unconfirmed && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => { setError(''); setNotesOpen(false); if (job) setDismissedJobId(job.id); } }, t('关闭', 'Dismiss')))) },
        notesSection, windowsDialog, confirmDialog);
    }
    function progress() {
      if (!job || (!jobActiveThis && !unconfirmed && dismissedJobId === job.id)) return null;
      if (job.state === 'complete' && !jobReason) {
        return job.to ? h('div', null,
          h('p', { className: 'w-muted updates-note' }, '✓ ' + jobLabel(job) + ' · ' + job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动更新', ' · Automatic update') : '')),
          canSuggestAuto && h('div', { className: 'updates-auto-nudge' },
            h('span', null, t('以后有兼容新版本时，需要空闲自动热更新吗？', 'Auto-install future compatible updates while idle?')),
            h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => { setError(''); setDialog('automatic'); } }, t('开启空闲自动热更新', 'Enable idle auto-updates')),
            h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => setDismissedJobId(job.id) }, t('关闭', 'Dismiss')))) : null;
      }
      return h('section', { className: 'w-section', role: 'status', 'aria-label': t('更新进度', 'Update progress') },
        h('h3', null, jobLabel(job)),
        job.to && h('p', { className: 'w-muted' }, job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动更新', ' · Automatic update') : '')),
        job.state === 'restart-required' && jobResult?.restartReason === 'package-moved' && h('p', { className: 'w-muted updates-note' }, t('新版已就绪；因多个独立插件共用底层依赖，请先手动重启一次 DSH 生效后再继续更新其他插件。', 'Installed; because standalone plugins share dependencies, restart DSH once before updating additional plugins.')),
        jobReason && h(W.Status, { tone: 'error' }, message(jobReason)),
        h('div', { className: 'updates-bar-actions', style: { marginTop: '6px' } },
          canCancel && h(W.Button, { className: 'is-sm', disabled: job.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消更新', 'Cancel update')),
          !jobActiveThis && !unconfirmed && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => setDismissedJobId(job.id) }, t('关闭提示', 'Dismiss'))));
    }
    function windowControls() {
      if (!staleWindows) return null;
      return h(W.Status, null, h('p', null, t('有窗口已断开，无法确认是否还有未保存修改。仍在使用的窗口请先保存并刷新；已关闭的窗口可以手动重新确认。', 'A disconnected window may contain unsaved changes. Save and refresh windows still in use. If they are closed, you can confirm that manually.')), h(W.Button, { className: 'is-sm', onClick: () => setDialog('windows') }, t('重新确认已关闭的窗口', 'Confirm closed windows')));
    }
    const incompatibleText = row.release && !row.release.compatible ? t('新版本暂不兼容当前环境：', 'Latest release is incompatible with this environment: ') + requirement(row.release) + (row.release.required ? ' (' + row.release.required + ')' : '') : '';
    const optionsSection = h('details', { className: 'updates-options' },
      h('summary', null, !original.bundledBy ? t('自动更新与提醒', 'Auto-update & reminders') : t('更新选项', 'Update options'), ' · ', prefs.checkEnabled ? t('自动检查：开', 'Checks: on') : t('自动检查：关', 'Checks: off'), ' · ', prefs.autoInstall ? (prefs.autoScope === 'compatible' ? t('空闲自动热更新：兼容版', 'Idle auto-update: compatible') : t('空闲自动热更新：仅补丁', 'Idle auto-update: patches')) : t('空闲自动热更新：关', 'Idle auto-update: off')),
      h('section', { className: 'updates-settings', 'aria-label': t('这个插件的更新偏好', 'Update preferences for this plugin') },
        h('div', null, h(W.Switch, { label: isSuite ? t('自动检查 Suite 整包更新', 'Automatically check Suite updates') : t('自动检查这个插件的更新', 'Automatically check this plugin'), checked: prefs.checkEnabled, disabled: working || !!snapshot.preferenceError || !managed, onChange: event => perform(() => save({ checkEnabled: event.target.checked })) }), h('p', { className: 'w-muted updates-note' }, t('默认开启，每 6 小时最多一次。只影响这个安装包，关闭后仍可手动检查。', 'On by default, at most every 6 hours. This affects only this bundle; manual checks remain available.'))),
        h('div', null, h(W.Switch, { label: isSuite ? t('空闲时自动热更新 Suite 兼容版本', 'Auto-install compatible Suite updates while idle') : t('空闲时自动热更新兼容版本', 'Auto-install compatible updates while idle'), checked: prefs.autoInstall, disabled: working || !!snapshot.preferenceError || !managed, onChange: event => event.target.checked ? (setError(''), setDialog('automatic')) : perform(() => save({ autoInstall: false })) }), h('p', { className: 'w-muted updates-note' }, t('默认关闭。明确开启后，仅在空闲且无未保存修改时热更新兼容稳定版（含功能小版本与补丁，不含跨主版本）。其他插件的开关不变。', 'Off by default. Explicitly enable compatible stable updates (minor and patch, excluding major) while idle with no unsaved changes. Other plugins’ settings stay unchanged.')), prefs.autoInstall && prefs.autoScope !== 'compatible' && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => { setError(''); setDialog('automatic'); } }, t('升级为包含兼容功能小版本', 'Include compatible minor updates')))));
    const errorStatus = error && h(W.Status, { tone: 'error' }, error === 'check-first' && managed ? h('div', { className: 'updates-bar-actions' }, h('span', null, message(error)), recheckButton('ghost')) : message(error));
    const linksNav = (() => {
      const ownRepo = repoUrl(original.name), suiteRepo = repoUrl('@stardustlc/dsh-suite'), starRepo = isSuite ? suiteRepo : ownRepo;
      if (!ownRepo && !starRepo) return null;
      return h('nav', { className: 'updates-links', 'aria-label': t('开源仓库与反馈', 'Repository and feedback') },
        starRepo && h('a', { href: starRepo, target: '_blank', rel: 'noreferrer noopener' }, isSuite ? t('★ 觉得好用？在 GitHub 给 dsh-suite 点个 Star', '★ Useful? Star dsh-suite on GitHub') : t('★ 觉得好用？在 GitHub 点个 Star', '★ Useful? Star on GitHub')),
        ownRepo && h('a', { href: ownRepo + '/issues', target: '_blank', rel: 'noreferrer noopener' }, t('提交建议 / 问题反馈', 'Feedback & issues')),
        isSuite && original.name !== '@stardustlc/dsh-suite' && ownRepo && h('a', { href: ownRepo, target: '_blank', rel: 'noreferrer noopener' }, t('组件仓库', 'Component repo')),
        !isSuite && suiteRepo && h('a', { href: suiteRepo, target: '_blank', rel: 'noreferrer noopener' }, t('了解 dsh-suite（18 合 1 组合包）', 'Explore dsh-suite (18-in-1 bundle)')));
    })();
    if (!original.bundledBy) {
      // Native bundle detail pages in DSH already render their own Version & Source sections
      // ("重新检查", version list & "更新" button). Keep only non-duplicative auto-update preferences,
      // inline changelog notes, compatibility/error diagnostics, and GitHub feedback links here.
      return h(FooterFrame, { name, label: title, supplement: true, head: h('div', { className: 'updates-compact-bar' },
        optionsSection,
        (row.release || (showUpdate && (!deferred || !ignored))) && h('div', { className: 'updates-head-actions' },
          row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
          showUpdate && !deferred && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('推迟提醒 24h', 'Snooze 24h')),
          showUpdate && !ignored && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版提醒', 'Mute reminder')))) },
        notesSection,
        incompatibleText && h(W.Status, null, incompatibleText),
        errorStatus, snapshot.preferenceError && h(W.Status, { tone: 'error' }, message('preferences-unreadable')),
        snapshot.pendingRestart && h(W.Status, null, snapshot.updaterRestart ? message('restart-required') : t('已有插件更新等待手动重启后生效；空闲自动热更新已暂停，建议先重启一次 DSH 再继续更新其他共用依赖的插件。', 'An update awaits a manual restart; idle auto-updates are paused. Restart DSH once before updating other plugins that share dependencies.')),
        prefs.autoInstall && snapshot.autoReady === false && h(W.Status, null, message('page-not-ready')),
        (prefs.autoInstall || jobActiveThis) && windowControls(),
        jobActiveThis && (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')),
        jobActiveThis && (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
        deferred && h('p', { className: 'w-muted updates-note' }, t('已推迟此插件的工作台更新提示 24 小时。', 'Workbench update notices for this plugin are snoozed for 24 hours.')),
        unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
        progress(),
        linksNav,
        windowsDialog, confirmDialog
      );
    }
    const status = !managed ? t('本地 / 外部来源，保留原安装方式', 'Local / external source; keep original install method') : row.loadError ? t('加载异常，请先检查原生插件管理', 'Loading error; check native plugin management') : row.error ? t('检查失败，可以重试', 'Check failed; retry available') : incompatibleText || (row.available ? (ignored ? t('已忽略提醒，仍可手动更新', 'Reminder ignored; manual update available') : t('有兼容的新版本', 'Compatible update available')) : row.checkedAt ? t('当前已是最新稳定版', 'Latest stable version') : t('尚未检查', 'Not checked yet'));
    return h(FooterFrame, { name, label: title, head: h('div', { className: 'updates-head' },
      h('div', null,
        h('div', { className: 'updates-title-row' }, h('h2', null, t('随 Suite 整包管理', 'Managed via Suite bundle')), h('span', { className: 'updates-mono updates-badge' }, original.name + ' · v' + original.version)),
        h('p', { className: 'w-muted updates-meta-line' }, status, row.checkedAt ? ' · ' + t('上次检查：', 'Last checked: ') + new Date(row.checkedAt).toLocaleString(language() === 'en' ? 'en-US' : 'zh-CN') : ''),
        h('p', { className: 'updates-version updates-note' }, target + ' · v' + row.version, row.release?.version && row.release.version !== row.version ? ' → v' + row.release.version : '')),
      h('div', { className: 'updates-head-actions' },
        showUpdate && checkButton('ghost'),
        row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
        showUpdate && !deferred && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')),
        showUpdate && !ignored && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版本提醒', 'Ignore this reminder')),
        primary)) },
      notesSection,
      optionsSection,
      errorStatus, snapshot.preferenceError && h(W.Status, { tone: 'error' }, message('preferences-unreadable')),
      snapshot.pendingRestart && h(W.Status, null, snapshot.updaterRestart ? message('restart-required') : t('已有插件更新等待手动重启后生效；空闲自动热更新已暂停。', 'An update awaits a manual restart; idle auto-updates are paused.')),
      prefs.autoInstall && snapshot.autoReady === false && h(W.Status, null, message('page-not-ready')),
      windowControls(),
      (showUpdate || jobActiveThis) && (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')),
      (showUpdate || jobActiveThis) && (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
      deferred && h(W.Status, null, t('已推迟 Suite 提醒和自动安装 24 小时，仍可手动更新。', 'Suite reminders and automatic installation are deferred for 24 hours. Manual updates remain available.')),
      unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
      progress(),
      linksNav,
      windowsDialog, confirmDialog
    );
  }
  function InlineFooter({ name }) { return h(Panel, { name, inline: true }); }
  function NativeFooter({ subject }) {
    const snapshot = useSnapshot(), name = __stardustUpdatesDetailName(subject, snapshot?.rows || []);
    return name ? h(Panel, { name, inline: false }) : null;
  }
  function register() {
    if (!alive) return;
    if (!registered) {
      registered = true; pool.clients.add(client);
      ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({ name: 'plugins.detail.section', id: 'stardustlc.plugin-update-footer', order: 1000 }, NativeFooter));
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
  const client = { t, Footer: InlineFooter, NativeFooter, Button: W.Button, open(name) { const footer = [...document.querySelectorAll('[data-plugin-update-footer]')].find(node => node.getAttribute('data-plugin-update-footer') === name); if (!footer) return false; footer.scrollIntoView({ block: 'end', behavior: 'smooth' }); return true; }, has: name => registered && !!originalRow(name), row: rowFor, dispose() {
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
/* DSH Workbench UI v3 — Unified DeepSeek Harness (>=0.2.2-rc.3) Studio UI & Motion Kit.
 * Integrates @deepseek-ai/dsh-client-ui-primitives lazily at render time with semantic HTML
 * fallbacks for standalone jsdom/VM tests, 13 switchable [data-dsh-style] themes + 8 [data-dsh-font]
 * pairings (default: arcade) synced via localStorage['dsh-stardust:ui-style'] / ['dsh-stardust:ui-font'],
 * soft-slate dark adaptation, unified 48px single-row header, sliding tab indicator,
 * resizable split panes (DshSplitResizer), shimmer skeletons (DshSkeleton), row hover quick-actions,
 * calm compact update strip, tactile press physics, small-button icon micro-animations,
 * and window-drag exclusions.
 */
function createWorkbenchUI(React, requireFn) {
  const h = React.createElement;
  const useIdHook = typeof React.useId === 'function' ? React.useId : () => 'dshw-id';
  const useEffectHook = typeof React.useEffect === 'function' ? React.useEffect : () => {};
  const useLayoutHook = typeof React.useLayoutEffect === 'function' ? React.useLayoutEffect : useEffectHook;
  const useRefHook = typeof React.useRef === 'function' ? React.useRef : (initial => ({ current: initial }));
  const useStateHook = typeof React.useState === 'function' ? React.useState : (initial => [typeof initial === 'function' ? initial() : initial, () => {}]);
  const forwardRefWrap = typeof React.forwardRef === 'function' ? React.forwardRef : (fn => props => fn(props, null));
  const cx = (...values) => values.filter(Boolean).join(' ');

  const DSH_STYLE_STORAGE_KEY = 'dsh-stardust:ui-style';
  const DSH_STYLE_EVENT = 'dsh-stardust-style';
  const DSH_DEFAULT_STYLE = 'harness';

  const DSH_FONT_STORAGE_KEY = 'dsh-stardust:ui-font';
  const DSH_FONT_EVENT = 'dsh-stardust-font';
  const DSH_DEFAULT_FONT = 'arcade';

  const DSH_FONTS = Object.freeze([
    Object.freeze({ id: 'arcade', zh: '幼圆等宽（默认）', zhShort: '幼圆', en: 'YouYuan Mono (Default)', enShort: 'YouYuan' }),
    Object.freeze({ id: 'auto', zh: '跟随风格专属字', zhShort: '专属字', en: 'Match Style Font', enShort: 'Style Font' }),
    Object.freeze({ id: 'songkai', zh: '中宋+楷书', zhShort: '中宋楷', en: 'Song + Kai', enShort: 'Song+Kai' }),
    Object.freeze({ id: 'fangsong', zh: '工程仿宋', zhShort: '仿宋', en: 'Blueprint FangSong', enShort: 'FangSong' }),
    Object.freeze({ id: 'poster', zh: '重磅画报黑', zhShort: '画报黑', en: 'Poster Sans', enShort: 'Poster' }),
    Object.freeze({ id: 'retro98', zh: '千禧新宋', zhShort: '新宋98', en: 'Retro 98 SimSun', enShort: 'Retro 98' }),
    Object.freeze({ id: 'serif', zh: '思源书宋', zhShort: '书宋', en: 'Book Serif', enShort: 'Serif' }),
    Object.freeze({ id: 'modern', zh: '现代思源黑', zhShort: '思源黑', en: 'Modern Sans', enShort: 'Modern' }),
  ]);

  const DSH_STYLES = Object.freeze([
    Object.freeze({ id: 'harness', zh: '原生清透', zhShort: '原生', en: 'Native Airy', enShort: 'Native', swatch: '#4176e6', surface: '#f8fafc' }),
    Object.freeze({ id: 'cream', zh: '米白纸感', zhShort: '米白色', en: 'Warm Cream', enShort: 'Cream', swatch: '#9e5829', surface: '#faf7f0' }),
    Object.freeze({ id: 'claude', zh: 'Claude 暖书卷', zhShort: 'Claude风', en: 'Claude Warmth', enShort: 'Claude', swatch: '#c96442', surface: '#f5f4ed' }),
    Object.freeze({ id: 'pixel8bit', zh: '8-Bit 掌机', zhShort: '8-Bit', en: 'Bright 8-Bit', enShort: '8-Bit', swatch: '#2e7d5b', surface: '#f4f6e8' }),
    Object.freeze({ id: 'mint', zh: '晴空薄荷', zhShort: '薄荷', en: 'Airy Mint', enShort: 'Mint', swatch: '#0f766e', surface: '#f5fafb' }),
    Object.freeze({ id: 'glass', zh: '晴昼琉璃', zhShort: '琉璃', en: 'Daylight Glass', enShort: 'Glass', swatch: '#4f6df5', surface: '#f3f7ff' }),
    Object.freeze({ id: 'eink', zh: '护眼墨水屏', zhShort: '墨水屏', en: 'E-Ink Paper', enShort: 'E-Ink', swatch: '#171716', surface: '#f2f1ec' }),
    Object.freeze({ id: 'blueprint', zh: '工程晒图', zhShort: '晒图', en: 'Blueprint', enShort: 'Blueprint', swatch: '#0d3b66', surface: '#eaf3fb' }),
    Object.freeze({ id: 'risograph', zh: '波普孔版', zhShort: '孔版', en: 'Riso Zine', enShort: 'Riso', swatch: '#ff3e7f', surface: '#faf6ee' }),
    Object.freeze({ id: 'win98', zh: '千禧复古', zhShort: '复古98', en: 'Retro 98', enShort: 'Retro 98', swatch: '#1b4f9c', surface: '#dcdcdc' }),
    Object.freeze({ id: 'songhui', zh: '宋韵朱砂', zhShort: '宋韵', en: 'Song Xuan', enShort: 'Song', swatch: '#b83b2a', surface: '#f7f3e8' }),
    Object.freeze({ id: 'frutiger', zh: '晴空水晶', zhShort: '水晶', en: 'Aqua Gloss', enShort: 'Aqua', swatch: '#0ea5e9', surface: '#eaf7ff' }),
    Object.freeze({ id: 'gazette', zh: '铅字晨报', zhShort: '晨报', en: 'Gazette', enShort: 'Gazette', swatch: '#9b1c1c', surface: '#f6f3ec' }),
  ]);

  const VALID_STYLE_IDS = new Set(DSH_STYLES.map(preset => preset.id));
  const VALID_FONT_IDS = new Set(DSH_FONTS.map(preset => preset.id));

  function resolveWindow(win) {
    if (win && typeof win === 'object') return win;
    return typeof window !== 'undefined' ? window : null;
  }

  function clampNumber(value, min, max) {
    const lo = Number.isFinite(min) ? min : 0;
    const hi = Number.isFinite(max) ? Math.max(lo, max) : lo;
    const num = Number(value);
    if (!Number.isFinite(num)) return lo;
    return Math.min(hi, Math.max(lo, num));
  }

  function normalizeDshStyle(value) {
    const key = typeof value === 'string' ? value.trim() : '';
    return VALID_STYLE_IDS.has(key) ? key : DSH_DEFAULT_STYLE;
  }

  function getDshStylePreset(value) {
    const id = normalizeDshStyle(value);
    return DSH_STYLES.find(preset => preset.id === id) || DSH_STYLES[0];
  }

  function readDshStyle(win) {
    const target = resolveWindow(win);
    if (!target) return DSH_DEFAULT_STYLE;
    try {
      const raw = target.localStorage?.getItem(DSH_STYLE_STORAGE_KEY);
      return normalizeDshStyle(raw);
    } catch {
      return DSH_DEFAULT_STYLE;
    }
  }

  function normalizeDshFont(value) {
    const key = typeof value === 'string' ? value.trim() : '';
    return VALID_FONT_IDS.has(key) ? key : DSH_DEFAULT_FONT;
  }

  function getDshFontPreset(value) {
    const id = normalizeDshFont(value);
    return DSH_FONTS.find(preset => preset.id === id) || DSH_FONTS[0];
  }

  function readDshFont(win) {
    const target = resolveWindow(win);
    if (!target) return DSH_DEFAULT_FONT;
    try {
      const raw = target.localStorage?.getItem(DSH_FONT_STORAGE_KEY);
      return normalizeDshFont(raw);
    } catch {
      return DSH_DEFAULT_FONT;
    }
  }

  function syncPortaledOverlays(style, doc, font) {
    const normalized = normalizeDshStyle(style);
    const normalizedFont = normalizeDshFont(font ?? readDshFont());
    const targetDoc = doc || (typeof document !== 'undefined' ? document : null);
    if (!targetDoc) return;
    if (targetDoc.documentElement && typeof targetDoc.documentElement.setAttribute === 'function') {
      targetDoc.documentElement.setAttribute('data-dsh-font', normalizedFont);
    }
    if (typeof targetDoc.querySelectorAll !== 'function') return;
    for (const el of targetDoc.querySelectorAll('[data-dsh-portal-synced]')) {
      el.setAttribute('data-dsh-style', normalized);
      el.setAttribute('data-dsh-font', normalizedFont);
      if (!el.hasAttribute('data-window-drag-exclude')) {
        el.setAttribute('data-window-drag-exclude', '');
      }
    }
  }

  function syncPortaledFont(font, doc) {
    const normalizedFont = normalizeDshFont(font);
    const targetDoc = doc || (typeof document !== 'undefined' ? document : null);
    if (!targetDoc) return;
    if (targetDoc.documentElement && typeof targetDoc.documentElement.setAttribute === 'function') {
      targetDoc.documentElement.setAttribute('data-dsh-font', normalizedFont);
    }
    if (typeof targetDoc.querySelectorAll !== 'function') return;
    for (const el of targetDoc.querySelectorAll('[data-dsh-portal-synced], [data-dsh-style]')) {
      el.setAttribute('data-dsh-font', normalizedFont);
    }
  }

  function writeDshStyle(nextStyle, win) {
    const normalized = normalizeDshStyle(nextStyle);
    const target = resolveWindow(win);
    if (target) {
      try {
        target.localStorage?.setItem(DSH_STYLE_STORAGE_KEY, normalized);
      } catch {
        // Restricted storage: keep in-memory + custom event sync working.
      }
      syncPortaledOverlays(normalized, target.document, readDshFont(target));
      if (typeof target.dispatchEvent === 'function') {
        try {
          const CustomEventCtor = target.CustomEvent || (typeof CustomEvent === 'function' ? CustomEvent : null);
          if (CustomEventCtor) {
            target.dispatchEvent(new CustomEventCtor(DSH_STYLE_EVENT, { detail: { style: normalized } }));
          } else if (typeof Event === 'function') {
            const ev = new Event(DSH_STYLE_EVENT);
            ev.detail = { style: normalized };
            target.dispatchEvent(ev);
          }
        } catch {
          // Ignore synthetic event errors in minimal VM environments.
        }
      }
    }
    return normalized;
  }

  function writeDshFont(nextFont, win) {
    const normalized = normalizeDshFont(nextFont);
    const target = resolveWindow(win);
    if (target) {
      try {
        target.localStorage?.setItem(DSH_FONT_STORAGE_KEY, normalized);
      } catch {
        // Restricted storage: keep in-memory + custom event sync working.
      }
      syncPortaledFont(normalized, target.document);
      if (typeof target.dispatchEvent === 'function') {
        try {
          const CustomEventCtor = target.CustomEvent || (typeof CustomEvent === 'function' ? CustomEvent : null);
          if (CustomEventCtor) {
            target.dispatchEvent(new CustomEventCtor(DSH_FONT_EVENT, { detail: { font: normalized } }));
          } else if (typeof Event === 'function') {
            const ev = new Event(DSH_FONT_EVENT);
            ev.detail = { font: normalized };
            target.dispatchEvent(ev);
          }
        } catch {
          // Ignore synthetic event errors in minimal VM environments.
        }
      }
    }
    return normalized;
  }

  function subscribeDshStyle(onChange, win) {
    const target = resolveWindow(win);
    if (!target || typeof target.addEventListener !== 'function' || typeof onChange !== 'function') {
      return () => {};
    }
    const onCustom = event => {
      const next = normalizeDshStyle(event?.detail?.style ?? readDshStyle(target));
      syncPortaledOverlays(next, target.document, readDshFont(target));
      onChange(next);
    };
    const onStorage = event => {
      if (event && event.key !== null && event.key !== undefined && event.key !== DSH_STYLE_STORAGE_KEY) {
        return;
      }
      const next = normalizeDshStyle(event?.newValue ?? readDshStyle(target));
      syncPortaledOverlays(next, target.document, readDshFont(target));
      onChange(next);
    };
    target.addEventListener(DSH_STYLE_EVENT, onCustom);
    target.addEventListener('storage', onStorage);
    return () => {
      target.removeEventListener(DSH_STYLE_EVENT, onCustom);
      target.removeEventListener('storage', onStorage);
    };
  }

  function subscribeDshFont(onChange, win) {
    const target = resolveWindow(win);
    if (!target || typeof target.addEventListener !== 'function' || typeof onChange !== 'function') {
      return () => {};
    }
    const onCustom = event => {
      const next = normalizeDshFont(event?.detail?.font ?? readDshFont(target));
      syncPortaledFont(next, target.document);
      onChange(next);
    };
    const onStorage = event => {
      if (event && event.key !== null && event.key !== undefined && event.key !== DSH_FONT_STORAGE_KEY) {
        return;
      }
      const next = normalizeDshFont(event?.newValue ?? readDshFont(target));
      syncPortaledFont(next, target.document);
      onChange(next);
    };
    target.addEventListener(DSH_FONT_EVENT, onCustom);
    target.addEventListener('storage', onStorage);
    return () => {
      target.removeEventListener(DSH_FONT_EVENT, onCustom);
      target.removeEventListener('storage', onStorage);
    };
  }

  function useDshStyle(win) {
    if (typeof React.useState !== 'function') {
      return [readDshStyle(win), next => writeDshStyle(next, win)];
    }
    const [style, setStyleState] = React.useState(() => readDshStyle(win));
    if (typeof React.useEffect === 'function') {
      React.useEffect(() => {
        const current = readDshStyle(win);
        setStyleState(prev => (prev === current ? prev : current));
        syncPortaledOverlays(current, resolveWindow(win)?.document, readDshFont(win));
        return subscribeDshStyle(next => {
          setStyleState(prev => (prev === next ? prev : next));
        }, win);
      }, [win]);
    }
    const setStyle = next => {
      const resolved = typeof next === 'function' ? next(style) : next;
      const applied = writeDshStyle(resolved, win);
      setStyleState(applied);
      return applied;
    };
    return [style, setStyle];
  }

  function useDshFont(win) {
    if (typeof React.useState !== 'function') {
      return [readDshFont(win), next => writeDshFont(next, win)];
    }
    const [font, setFontState] = React.useState(() => readDshFont(win));
    if (typeof React.useEffect === 'function') {
      React.useEffect(() => {
        const current = readDshFont(win);
        setFontState(prev => (prev === current ? prev : current));
        syncPortaledFont(current, resolveWindow(win)?.document);
        return subscribeDshFont(next => {
          setFontState(prev => (prev === next ? prev : next));
        }, win);
      }, [win]);
    }
    const setFont = next => {
      const resolved = typeof next === 'function' ? next(font) : next;
      const applied = writeDshFont(resolved, win);
      setFontState(applied);
      return applied;
    };
    return [font, setFont];
  }

  function createOverlaySyncRef(style, font) {
    const normalized = normalizeDshStyle(style);
    const normalizedFont = normalizeDshFont(font ?? readDshFont());
    return node => {
      if (!node || typeof node.setAttribute !== 'function') return;
      node.setAttribute('data-dsh-style', normalized);
      node.setAttribute('data-dsh-font', normalizedFont);
      node.setAttribute('data-window-drag-exclude', '');
      node.setAttribute('data-dsh-portal-synced', 'true');
      if (typeof node.closest === 'function') {
        const overlay = node.closest('[role="dialog"], [role="alertdialog"], [role="menu"], dialog');
        if (overlay) {
          overlay.setAttribute('data-dsh-style', normalized);
          overlay.setAttribute('data-dsh-font', normalizedFont);
          overlay.setAttribute('data-window-drag-exclude', '');
          overlay.setAttribute('data-dsh-portal-synced', 'true');
        }
      }
    };
  }

  const paths = {
    book: ['M4 4h6a3 3 0 0 1 2 2v15a4 4 0 0 0-4-2H4z', 'M20 4h-6a3 3 0 0 0-2 2v15a4 4 0 0 1 4-2h4z'],
    calendar: ['M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z', 'M7 3v4M17 3v4M3 10h18'],
    mail: ['M3 5h18v14H3z', 'm3 6 9 7 9-7'],
    inbox: ['M4 13 6 5h12l2 8v6H4z', 'M4 13h5l1 3h4l1-3h5'],
    send: ['m22 2-7 20-4-9-9-4Z', 'M22 2 11 13'],
    rss: ['M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16', 'M4 19h.01'],
    slides: ['M3 4h18v13H3z', 'M12 17v4M8 21h8'],
    shield: ['m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6z', 'm8 12 3 3 5-6'],
    layers: ['M5 3h16v16H5z', 'M2 7v15h15'],
    play: ['m8 5 11 7-11 7Z'],
    video: ['M3 5h12v14H3z', 'm15 10 6-4v12l-6-4'],
    search: ['M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z', 'm16 16 5 5'],
    plus: ['M12 5v14M5 12h14'],
    refresh: ['M20 7a9 9 0 1 0 1 8', 'M20 2v5h-5'],
    settings: ['m9 3-.7 2.4-2 .9L4 5.8 2.5 8.4l1.7 1.8v2.3L2.5 14 4 17l2.5-.4 1.9 1L9 20h3l.8-2.4 2-1 2.5.4 1.5-2.7-1.7-1.9v-2.2l1.7-1.8-1.5-2.6-2.5.4-2-1L12 3Z', 'M14 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'],
    close: ['m6 6 12 12M18 6 6 18'],
    left: ['m14 5-7 7 7 7'],
    right: ['m10 5 7 7-7 7'],
    up: ['m5 15 7-7 7 7'],
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
    lock: ['M5 10h14v11H5z', 'M8 10V7a4 4 0 0 1 8 0v3M12 14v3'],
    clip: ['m8 13 6-6a2.5 2.5 0 0 1 3.5 3.5l-7 7a4 4 0 0 1-5.7-5.7l8-8a5 5 0 0 1 7.1 7.1l-8 8'],
    clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 6v6l4 2'],
    image: ['M3 4h18v16H3z', 'm3 17 6-6 5 5 2-2 5 5M16 8h.01'],
    palette: ['M12 3a9 9 0 1 0 0 18h1.5a2.5 2.5 0 0 0 0-5H12a2 2 0 0 1 0-4h4a5 5 0 0 0 5-5c0-2.2-4-4-9-4Z', 'M7.5 10.5h.01M10.5 7.5h.01M14.5 7.5h.01'],
    sparkles: ['m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8Z', 'M19 15v4M17 17h4'],
    grip: ['M9 6h.01M9 12h.01M9 18h.01M15 6h.01M15 12h.01M15 18h.01'],
    bookmark: ['M6 4h12v17l-6-4-6 4Z'],
  };

  function Icon({ name = 'file', size = 16, ...props }) {
    return h('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.7,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': 'true',
      focusable: 'false',
      'data-dsh-icon': name,
      ...props,
    }, (paths[name] || paths.file).map((d, index) => h('path', { key: index, d })));
  }

  function useSlidingTabIndicator(arg1, arg2, arg3) {
    const isExplicitReact = Boolean(arg1 && typeof arg1 === 'object' && typeof arg1.createElement === 'function');
    const activeValue = isExplicitReact ? arg2 : arg1;
    const options = (isExplicitReact ? arg3 : arg2) || {};
    const tablistRef = useRefHook(null);
    const [metrics, setMetrics] = useStateHook({ x: 0, width: 0, ready: false });

    const syncIndicator = () => {
      const list = tablistRef.current;
      if (!list || typeof list.querySelector !== 'function') return;
      const activeTab = list.querySelector('[role="tab"][aria-selected="true"]');
      if (!activeTab) {
        list.setAttribute?.('data-indicator-ready', 'false');
        setMetrics(prev => (prev.ready ? { x: 0, width: 0, ready: false } : prev));
        return;
      }
      let x = typeof activeTab.offsetLeft === 'number' ? activeTab.offsetLeft : 0;
      let width = typeof activeTab.offsetWidth === 'number' ? activeTab.offsetWidth : 0;
      if (!width && typeof activeTab.getBoundingClientRect === 'function' && typeof list.getBoundingClientRect === 'function') {
        const tabRect = activeTab.getBoundingClientRect();
        const listRect = list.getBoundingClientRect();
        if (tabRect && listRect && tabRect.width > 0) {
          width = tabRect.width;
          x = tabRect.left - listRect.left + (list.scrollLeft || 0);
        }
      }
      const ready = width > 0;
      if (list.style && typeof list.style.setProperty === 'function') {
        list.style.setProperty('--dsh-tab-x', Math.round(x) + 'px');
        list.style.setProperty('--dsh-tab-w', Math.round(width) + 'px');
      }
      list.setAttribute?.('data-indicator-ready', ready ? 'true' : 'false');
      setMetrics(prev => (
        prev.x === Math.round(x) && prev.width === Math.round(width) && prev.ready === ready
          ? prev
          : { x: Math.round(x), width: Math.round(width), ready }
      ));
    };

    const deps = Array.isArray(options?.deps) ? [activeValue, ...options.deps] : [activeValue];
    useLayoutHook(() => {
      syncIndicator();
      const list = tablistRef.current;
      const win = resolveWindow(options?.win);
      let ro = null;
      if (list && typeof win?.ResizeObserver === 'function') {
        try {
          ro = new win.ResizeObserver(() => syncIndicator());
          ro.observe(list);
        } catch {
          ro = null;
        }
      }
      if (win && typeof win.addEventListener === 'function') {
        win.addEventListener('resize', syncIndicator);
      }
      return () => {
        ro?.disconnect?.();
        if (win && typeof win.removeEventListener === 'function') {
          win.removeEventListener('resize', syncIndicator);
        }
      };
    }, deps);

    const indicatorStyle = {
      '--dsh-tab-x': metrics.x + 'px',
      '--dsh-tab-w': metrics.width + 'px',
    };

    return {
      tablistRef,
      ready: metrics.ready,
      indicatorStyle,
      tablistProps: {
        ref: tablistRef,
        'data-dsh-tablist': '',
        'data-indicator-ready': metrics.ready ? 'true' : 'false',
      },
      indicatorProps: {
        className: 'dsh-tab-indicator',
        'aria-hidden': 'true',
        style: indicatorStyle,
      },
      syncIndicator,
    };
  }

  function useResizableSplit(arg1, arg2) {
    const isExplicitReact = Boolean(arg1 && typeof arg1 === 'object' && typeof arg1.createElement === 'function');
    const opts = (isExplicitReact ? arg2 : arg1) || {};
    const { key, initial = 320, min = 220, max = 560, orientation = 'vertical', reverse = false, win } = opts;
    const clampedInitial = clampNumber(initial, min, max);

    const readStored = () => {
      const target = resolveWindow(win);
      if (!key || !target) return clampedInitial;
      try {
        const raw = target.localStorage?.getItem(key);
        if (raw == null || raw === '') return clampedInitial;
        const parsed = Number(raw);
        return Number.isFinite(parsed) ? clampNumber(parsed, min, max) : clampedInitial;
      } catch {
        return clampedInitial;
      }
    };

    const writeStored = nextSize => {
      const clamped = Math.round(clampNumber(nextSize, min, max));
      const target = resolveWindow(win);
      if (key && target) {
        try {
          target.localStorage?.setItem(key, String(clamped));
        } catch {
          // Ignore restricted storage errors.
        }
      }
      return clamped;
    };

    const [size, setSizeState] = useStateHook(() => readStored());
    const [isDragging, setIsDragging] = useStateHook(false);

    const setSize = next => {
      const resolved = typeof next === 'function' ? next(size) : next;
      const applied = writeStored(resolved);
      setSizeState(applied);
      return applied;
    };

    const reset = () => {
      const applied = writeStored(clampedInitial);
      setSizeState(applied);
      return applied;
    };

    return {
      size,
      width: size,
      setSize,
      reset,
      isDragging,
      setIsDragging,
      paneStyle: { '--dsh-split-size': size + 'px' },
      resizerProps: {
        value: size,
        initial: clampedInitial,
        min,
        max,
        orientation,
        reverse,
        onChange: setSize,
        onReset: reset,
        onDraggingChange: setIsDragging,
      },
    };
  }

  function SplitResizer({
    value = 320,
    initial,
    min = 220,
    max = 560,
    orientation = 'vertical',
    reverse = false,
    step = 16,
    label = 'Resize pane',
    onChange,
    onReset,
    onDraggingChange,
    className,
    style,
    ...rest
  } = {}) {
    const dragRef = useRefHook(null);
    const [dragging, setDragging] = useStateHook(false);
    const isHorizontal = orientation === 'horizontal';
    const clampedValue = Math.round(clampNumber(value, min, max));

    const setDragActive = active => {
      setDragging(active);
      onDraggingChange?.(active);
    };

    const cleanupWindowListeners = () => {
      const drag = dragRef.current;
      if (drag?.cleanup) drag.cleanup();
      dragRef.current = null;
    };

    useEffectHook(() => cleanupWindowListeners, []);

    const updateFromClientPos = (clientX, clientY) => {
      const drag = dragRef.current;
      if (!drag) return;
      const rawDelta = isHorizontal ? (clientY - drag.startY) : (clientX - drag.startX);
      const delta = reverse ? -rawDelta : rawDelta;
      const next = Math.round(clampNumber(drag.startValue + delta, min, max));
      onChange?.(next);
    };

    const handlePointerDown = event => {
      if (event?.button !== undefined && event.button !== 0) return;
      event?.preventDefault?.();
      const targetEl = event?.currentTarget;
      const pointerId = event?.pointerId;
      const startX = Number(event?.clientX ?? 0);
      const startY = Number(event?.clientY ?? 0);

      cleanupWindowListeners();

      let captured = false;
      if (targetEl && typeof targetEl.setPointerCapture === 'function' && pointerId !== undefined) {
        try {
          targetEl.setPointerCapture(pointerId);
          captured = true;
        } catch {
          captured = false;
        }
      }

      const win = resolveWindow();
      let cleanup = null;
      if (!captured && win && typeof win.addEventListener === 'function') {
        const onWinMove = moveEvent => updateFromClientPos(Number(moveEvent.clientX ?? 0), Number(moveEvent.clientY ?? 0));
        const onWinUp = () => {
          cleanupWindowListeners();
          setDragActive(false);
        };
        win.addEventListener('pointermove', onWinMove);
        win.addEventListener('mousemove', onWinMove);
        win.addEventListener('pointerup', onWinUp);
        win.addEventListener('mouseup', onWinUp);
        win.addEventListener('pointercancel', onWinUp);
        cleanup = () => {
          win.removeEventListener('pointermove', onWinMove);
          win.removeEventListener('mousemove', onWinMove);
          win.removeEventListener('pointerup', onWinUp);
          win.removeEventListener('mouseup', onWinUp);
          win.removeEventListener('pointercancel', onWinUp);
        };
      }

      dragRef.current = { startX, startY, startValue: clampedValue, pointerId, captured, cleanup };
      setDragActive(true);
    };

    const handlePointerMove = event => {
      if (!dragRef.current) return;
      updateFromClientPos(Number(event?.clientX ?? 0), Number(event?.clientY ?? 0));
    };

    const handlePointerEnd = event => {
      const drag = dragRef.current;
      if (!drag) return;
      if (drag.captured && event?.currentTarget && typeof event.currentTarget.releasePointerCapture === 'function' && drag.pointerId !== undefined) {
        try {
          event.currentTarget.releasePointerCapture(drag.pointerId);
        } catch {
          // Ignore release errors when pointer already detached.
        }
      }
      cleanupWindowListeners();
      setDragActive(false);
    };

    const handleKeyDown = event => {
      const key = event?.key;
      const deltaStep = event?.shiftKey ? step * 2 : step;
      const dir = reverse ? -1 : 1;
      let next = null;
      if ((!isHorizontal && key === 'ArrowLeft') || (isHorizontal && key === 'ArrowUp')) {
        next = clampNumber(clampedValue - deltaStep * dir, min, max);
      } else if ((!isHorizontal && key === 'ArrowRight') || (isHorizontal && key === 'ArrowDown')) {
        next = clampNumber(clampedValue + deltaStep * dir, min, max);
      } else if (key === 'Home') {
        next = min;
      } else if (key === 'End') {
        next = max;
      }
      if (next !== null) {
        event?.preventDefault?.();
        onChange?.(Math.round(next));
      }
    };

    const handleDoubleClick = () => {
      if (typeof onReset === 'function') {
        onReset();
      } else if (initial !== undefined) {
        onChange?.(Math.round(clampNumber(initial, min, max)));
      }
    };

    return h('div', {
      ...rest,
      role: 'separator',
      tabIndex: 0,
      'aria-orientation': orientation,
      'aria-label': label,
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': clampedValue,
      'data-dsh-resizer': '',
      'data-dragging': dragging ? 'true' : 'false',
      'data-window-drag-exclude': '',
      className: cx('dsh-split-resizer', className),
      style,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
      onLostPointerCapture: handlePointerEnd,
      onKeyDown: handleKeyDown,
      onDoubleClick: handleDoubleClick,
    });
  }

  function Skeleton({
    variant = 'text',
    lines = 3,
    width,
    height,
    radius,
    animated = true,
    label,
    className,
    style,
    ...rest
  } = {}) {
    const a11yProps = label
      ? { role: 'status', 'aria-busy': 'true', 'aria-label': label }
      : { 'aria-hidden': 'true' };

    const baseBar = (barWidth, barHeight, key) =>
      h('span', {
        key,
        className: 'dsh-skeleton',
        'data-dsh-skeleton': variant,
        'data-animated': animated ? 'true' : 'false',
        style: {
          width: barWidth ?? width,
          height: barHeight ?? height,
          borderRadius: radius,
        },
      });

    if (variant === 'circle') {
      return h('span', {
        ...a11yProps,
        ...rest,
        className: cx('dsh-skeleton', 'dsh-skeleton-circle', className),
        'data-dsh-skeleton': 'circle',
        'data-animated': animated ? 'true' : 'false',
        style: { width, height, ...style },
      });
    }

    if (variant === 'rect') {
      return h('span', {
        ...a11yProps,
        ...rest,
        className: cx('dsh-skeleton', className),
        'data-dsh-skeleton': 'rect',
        'data-animated': animated ? 'true' : 'false',
        style: { width, height: height ?? '80px', borderRadius: radius, ...style },
      });
    }

    if (variant === 'row') {
      return h('div', {
        ...a11yProps,
        ...rest,
        className: cx('dsh-skeleton-row', className),
        style,
      },
      h('span', {
        className: 'dsh-skeleton dsh-skeleton-circle',
        'data-dsh-skeleton': 'circle',
        'data-animated': animated ? 'true' : 'false',
      }),
      h('div', { className: 'dsh-skeleton-group' },
        baseBar('58%', '12px', 'r1'),
        baseBar('84%', '10px', 'r2')));
    }

    if (variant === 'card') {
      return h('div', {
        ...a11yProps,
        ...rest,
        className: cx('dsh-skeleton-card', className),
        style,
      },
      baseBar('46%', '14px', 'c1'),
      baseBar('100%', '11px', 'c2'),
      baseBar('74%', '11px', 'c3'));
    }

    const count = Math.max(1, Math.round(Number(lines) || 1));
    if (count === 1) {
      return h('span', {
        ...a11yProps,
        ...rest,
        className: cx('dsh-skeleton', className),
        'data-dsh-skeleton': 'text',
        'data-animated': animated ? 'true' : 'false',
        style: { width, height, borderRadius: radius, ...style },
      });
    }

    const bars = [];
    for (let i = 0; i < count; i += 1) {
      const isLast = i === count - 1;
      bars.push(baseBar(isLast ? '68%' : '100%', height, 'l-' + i));
    }
    return h('div', {
      ...a11yProps,
      ...rest,
      className: cx('dsh-skeleton-group', className),
      style,
    }, bars);
  }

  const primitivesByHost = new Map();

  function resolveHostPrimitives(customRequire = requireFn) {
    let host = null;
    if (typeof customRequire === 'function') {
      try {
        host = customRequire('@deepseek-ai/dsh-client-ui-primitives') || null;
      } catch {
        host = null;
      }
    }

    // Keep component types stable while still discovering host changes on render.
    const cached = primitivesByHost.get(host);
    if (cached) return cached;

    const FallbackButton = forwardRefWrap(function FallbackButton({ variant = 'ghost', size = 'md', icon, className, children, type = 'button', ...rest }, ref) {
      return h('button', {
        ...(ref ? { ref } : {}),
        type,
        className: cx('dsh-btn', 'dsh-btn-' + variant, 'dsh-btn-' + size, className),
        ...rest,
      }, icon != null ? h('span', { className: 'dsh-fallback-btn-icon' }, icon) : null, children);
    });

    const FallbackInput = forwardRefWrap(function FallbackInput({ icon, className, ...rest }, ref) {
      return h('span', { className: cx('dsh-fallback-input-wrap', className) },
        icon != null ? h('span', { className: 'dsh-fallback-input-icon' }, icon) : null,
        h('input', ref ? { ...rest, ref } : rest));
    });

    function FallbackCheckbox({ checked = false, onChange, label, disabled = false, title, className, ...rest }) {
      return h('label', { className, title },
        h('input', {
          type: 'checkbox',
          checked: Boolean(checked),
          disabled,
          onChange: event => onChange?.(Boolean(event?.target?.checked)),
          ...rest,
        }),
        h('span', null, label));
    }

    function FallbackSwitch({ checked = false, onChange, label, disabled = false, title, className }) {
      return h('button', {
        type: 'button',
        role: 'switch',
        'aria-checked': Boolean(checked),
        'aria-label': label,
        title,
        disabled,
        className,
        onClick: () => onChange?.(!checked),
      }, h('span', null));
    }

    function FallbackSegmentedControl({ id, value, options = [], onChange, label, disabled = false, className }) {
      return h('div', { role: 'tablist', 'aria-label': label, className },
        options.map(opt => {
          const selected = opt.value === value;
          return h('button', {
            key: opt.value,
            id: id ? id + '-' + opt.value : undefined,
            type: 'button',
            role: 'tab',
            'aria-selected': selected,
            tabIndex: selected ? 0 : -1,
            disabled: disabled || Boolean(opt.disabled),
            onClick: () => {
              if (!disabled && !opt.disabled && opt.value !== value) onChange?.(opt.value);
            },
          }, opt.label);
        }));
    }

    function renderPortalSyncNode(styleValue, fontValue) {
      const syncStyle = normalizeDshStyle(styleValue ?? readDshStyle());
      const syncFont = normalizeDshFont(fontValue ?? readDshFont());
      return h('span', {
        key: '__dsh_portal_sync__',
        ref: createOverlaySyncRef(syncStyle, syncFont),
        hidden: true,
        'aria-hidden': 'true',
        'data-dsh-style': syncStyle,
        'data-dsh-font': syncFont,
      });
    }

    function FallbackMenu({ open = false, anchor, items = [], children, selectedId, onSelect, onClose, footer, className, listClassName, dshStyle, dshFont }) {
      const style = normalizeDshStyle(dshStyle ?? readDshStyle());
      const font = normalizeDshFont(dshFont ?? readDshFont());
      return h('div', { className: cx('dsh-style-fallback-wrap', className) },
        anchor,
        open
          ? h('div', {
              role: 'menu',
              'data-dsh-style': style,
              'data-dsh-font': font,
              'data-window-drag-exclude': '',
              'data-dsh-portal-synced': 'true',
              className: cx('dsh-style-fallback-menu', listClassName),
              onKeyDown: event => {
                if (event?.key === 'Escape') {
                  event.stopPropagation?.();
                  onClose?.();
                }
              },
            },
            items.map(item => {
              const stylePreset = VALID_STYLE_IDS.has(item.id) ? getDshStylePreset(item.id) : null;
              return h('button', {
                key: item.id,
                type: 'button',
                role: 'menuitemradio',
                'aria-checked': item.id === selectedId,
                disabled: Boolean(item.disabled),
                className: 'dsh-style-fallback-item',
                onClick: () => {
                  if (!item.disabled) {
                    onSelect?.(item.id);
                    onClose?.();
                  }
                },
              },
              h('span', { className: 'dsh-style-fallback-item-leading' },
                stylePreset ? h('span', { className: 'dsh-style-swatch', 'aria-hidden': 'true', style: { '--dsh-swatch-color': stylePreset.swatch } }) : null,
                h('span', null, item.label)),
              item.id === selectedId ? h('span', { 'aria-hidden': 'true' }, '✓') : null);
            }),
            children,
            footer)
          : null);
    }

    function FallbackModal({ open = true, onClose, title, closeLabel = 'Close', children, footer, className, contentClassName, onKeyDownCapture, headless = false, dshStyle, dshFont }) {
      if (!open) return null;
      const style = normalizeDshStyle(dshStyle ?? readDshStyle());
      const font = normalizeDshFont(dshFont ?? readDshFont());
      return h('div', {
        className: 'dsh-fallback-modal-root',
        role: 'presentation',
        'data-dsh-style': style,
        'data-dsh-font': font,
        'data-window-drag-exclude': '',
        'data-dsh-portal-synced': 'true',
        onKeyDownCapture,
        // Let nested menus/editors consume Escape before the enclosing dialog.
        onKeyDown: event => {
          if (!event?.defaultPrevented && event?.key === 'Escape') {
            event.stopPropagation?.();
            onClose?.();
          }
        },
      },
      h('div', { className: 'dsh-fallback-modal-mask', 'aria-hidden': 'true', onClick: onClose }),
      h('div', {
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': title,
        tabIndex: -1,
        'data-dsh-style': style,
        'data-dsh-font': font,
        'data-window-drag-exclude': '',
        'data-dsh-portal-synced': 'true',
        className: cx('dsh-fallback-modal-dialog', className),
      }, headless
        ? children
        : h(React.Fragment || 'div', null,
            h('header', null, h('h2', null, title), h('button', { type: 'button', 'aria-label': closeLabel, onClick: onClose }, '×')),
            h('div', { className: contentClassName }, children),
            footer ? h('footer', null, footer) : null)));
    }

    const WrappedMenu = host?.Menu
      ? function HostMenuWithStyle({ dshStyle, dshFont, children, ...menuProps }) {
          if (!menuProps.open) {
            return children !== undefined ? h(host.Menu, menuProps, children) : h(host.Menu, menuProps);
          }
          const syncNode = renderPortalSyncNode(dshStyle, dshFont);
          return children !== undefined && children !== null
            ? h(host.Menu, menuProps, children, syncNode)
            : h(host.Menu, menuProps, syncNode);
        }
      : FallbackMenu;

    const WrappedModal = host?.Modal
      ? function HostModalWithStyle({ dshStyle, dshFont, children, ...modalProps }) {
          if (!modalProps.open) {
            return children !== undefined ? h(host.Modal, modalProps, children) : h(host.Modal, modalProps);
          }
          const syncNode = renderPortalSyncNode(dshStyle, dshFont);
          return children !== undefined && children !== null
            ? h(host.Modal, modalProps, children, syncNode)
            : h(host.Modal, modalProps, syncNode);
        }
      : FallbackModal;

    const resolved = {
      ...(host || {}),
      isFallback: !host,
      Button: host?.Button || FallbackButton,
      Input: host?.Input || FallbackInput,
      Checkbox: host?.Checkbox || FallbackCheckbox,
      Switch: host?.Switch || FallbackSwitch,
      SegmentedControl: host?.SegmentedControl || FallbackSegmentedControl,
      Menu: WrappedMenu,
      Modal: WrappedModal,
    };
    primitivesByHost.set(host, resolved);
    return resolved;
  }

  const Button = forwardRefWrap(function Button({ children, icon, iconSize = 15, variant = 'outline', size = 'sm', className, ...props }, ref) {
    const P = resolveHostPrimitives();
    const hostVariant = variant === 'danger' ? 'ghost' : (variant || 'outline');
    const iconEl = typeof icon === 'string' ? h(Icon, { name: icon, size: iconSize }) : icon;
    return h(P.Button, {
      ...(ref ? { ref } : {}),
      variant: hostVariant,
      size,
      ...props,
      'data-variant': variant || 'outline',
      className: cx('w-button', variant && 'w-' + variant, className),
      icon: iconEl,
    }, children);
  });

  function IconButton({ label, icon, variant = 'ghost', className, ...props }) {
    return h(Button, { ...props, icon, variant, className: cx('w-icon-button', className), 'aria-label': label, title: label });
  }

  const Input = forwardRefWrap(function Input({ icon, className, inputRef, ...props }, ref) {
    const P = resolveHostPrimitives();
    const iconEl = typeof icon === 'string' ? h(Icon, { name: icon, size: 16 }) : icon;
    const targetRef = inputRef || ref;
    return h(P.Input, {
      ...props,
      ...(targetRef ? { ref: targetRef } : {}),
      icon: iconEl,
      className: cx('w-input', className),
    });
  });

  function Checkbox({ checked = false, onChange, label, hiddenLabel = false, disabled = false, title, className, ...props }) {
    const P = resolveHostPrimitives();
    return h(P.Checkbox, {
      ...props,
      checked: Boolean(checked),
      disabled,
      title,
      label,
      className: cx('w-checkbox', hiddenLabel && 'w-checkbox-icon', className),
      onChange: value => {
        const next = typeof value === 'boolean' ? value : Boolean(value?.target?.checked);
        onChange?.(next);
      },
    });
  }

  function ChoiceMenu({ label, id, value, items = [], onChange, disabled, children, className, align = 'start' }) {
    const [open, setOpen] = useStateHook(false);
    const [style] = useDshStyle();
    const [font] = useDshFont();
    const P = resolveHostPrimitives();
    const selected = items.find(item => item.id === value);
    return h(P.Menu, {
      open: Boolean(open && !disabled),
      selectedId: value,
      dshStyle: style,
      dshFont: font,
      items,
      align,
      portal: !P.isFallback,
      autoFocus: true,
      minWidthFromAnchor: true,
      className: cx('w-menu', className),
      onClose: () => setOpen(false),
      onSelect: next => {
        setOpen(false);
        if (next !== value) onChange?.(next);
      },
      anchor: h(Button, {
        id,
        variant: 'outline',
        className: 'w-menu-button',
        disabled: Boolean(disabled || items.length === 0),
        'aria-label': label,
        'aria-haspopup': 'menu',
        'aria-expanded': Boolean(open && !disabled),
        onClick: () => setOpen(prev => !prev),
        onKeyDown: event => {
          if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            event.preventDefault?.();
            setOpen(true);
          }
        },
      }, h('span', { className: 'w-menu-value' }, children ?? selected?.label ?? label), h(Icon, { name: 'down', size: 14 })),
    });
  }

  function FontSwitcher({ font: controlledFont, style: controlledStyle, onChange, lang = 'zh', id = 'dsh-font-switcher', compact = true, disabled = false, align = 'end', className, open: controlledOpen, onOpenChange } = {}) {
    const [syncedFont, setSyncedFont] = useDshFont();
    const [syncedStyle] = useDshStyle();
    const activeFont = normalizeDshFont(controlledFont ?? syncedFont);
    const activeStyle = normalizeDshStyle(controlledStyle ?? syncedStyle);
    const [internalOpen, setInternalOpen] = useStateHook(false);
    const open = controlledOpen !== undefined ? Boolean(controlledOpen) : internalOpen;
    const setOpen = next => {
      const resolved = typeof next === 'function' ? next(open) : Boolean(next);
      if (controlledOpen === undefined) setInternalOpen(resolved);
      onOpenChange?.(resolved);
    };
    const isZh = String(lang || '').toLowerCase().startsWith('zh');
    const preset = getDshFontPreset(activeFont);
    const P = resolveHostPrimitives();
    const triggerLabel = isZh ? '字体搭配：' + preset.zh : 'Font pairing: ' + preset.en;
    const visibleText = compact ? (isZh ? preset.zhShort : preset.enShort) : (isZh ? preset.zh : preset.en);
    const items = DSH_FONTS.map(option => ({
      id: option.id,
      label: isZh ? option.zh + ' (' + option.enShort + ')' : option.en,
    }));
    const selectFont = nextId => {
      const applied = writeDshFont(nextId);
      setSyncedFont(applied);
      onChange?.(applied);
      setOpen(false);
    };
    return h(P.Menu, {
      open: Boolean(open && !disabled),
      selectedId: activeFont,
      dshStyle: activeStyle,
      dshFont: activeFont,
      items,
      align,
      portal: !P.isFallback,
      autoFocus: true,
      minWidthFromAnchor: true,
      className,
      onClose: () => setOpen(false),
      onSelect: selectFont,
      anchor: h(P.Button, {
        id,
        variant: 'outline',
        size: 'sm',
        disabled,
        className: 'dsh-font-trigger',
        'aria-label': triggerLabel,
        'aria-haspopup': 'menu',
        'aria-expanded': Boolean(open && !disabled),
        title: triggerLabel,
        onClick: () => setOpen(prev => !prev),
        onKeyDown: event => {
          if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            event.preventDefault?.();
            setOpen(true);
          }
        },
      },
      h('span', { className: 'dsh-font-glyph', 'aria-hidden': 'true' }, isZh ? '字' : 'Aa'),
      h('span', { className: 'dsh-font-label' }, visibleText),
      h(Icon, { name: 'down', size: 13 })),
    });
  }

  function StyleSwitcher({ style: controlledStyle, font: controlledFont, onChange, onFontChange, showFontSwitcher = true, lang = 'zh', id = 'dsh-style-switcher', compact = true, disabled = false, align = 'end', className } = {}) {
    const [syncedStyle, setSyncedStyle] = useDshStyle();
    const [syncedFont] = useDshFont();
    const activeStyle = normalizeDshStyle(controlledStyle ?? syncedStyle);
    const activeFont = normalizeDshFont(controlledFont ?? syncedFont);
    const [open, setOpen] = useStateHook(false);
    const [fontOpen, setFontOpen] = useStateHook(false);
    const isZh = String(lang || '').toLowerCase().startsWith('zh');
    const preset = getDshStylePreset(activeStyle);
    const P = resolveHostPrimitives();
    const triggerLabel = isZh ? '界面风格：' + preset.zh : 'UI style: ' + preset.en;
    const visibleText = compact ? (isZh ? preset.zhShort : preset.enShort) : (isZh ? preset.zh : preset.en);
    const items = DSH_STYLES.map(option => ({
      id: option.id,
      label: isZh ? option.zh + ' (' + option.enShort + ')' : option.en,
    }));
    const selectStyle = nextId => {
      const applied = writeDshStyle(nextId);
      setSyncedStyle(applied);
      onChange?.(applied);
      setOpen(false);
    };
    return h('div', {
      className: cx('dsh-style-switcher', className),
      'data-window-drag-exclude': '',
    }, h(P.Menu, {
      open: Boolean(open && !disabled),
      selectedId: activeStyle,
      dshStyle: activeStyle,
      dshFont: activeFont,
      items,
      align,
      portal: !P.isFallback,
      autoFocus: true,
      minWidthFromAnchor: true,
      onClose: () => setOpen(false),
      onSelect: selectStyle,
      anchor: h(P.Button, {
        id,
        variant: 'outline',
        size: 'sm',
        disabled,
        className: 'dsh-style-trigger',
        'aria-label': triggerLabel,
        'aria-haspopup': 'menu',
        'aria-expanded': Boolean(open && !disabled),
        title: triggerLabel,
        onClick: () => {
          setFontOpen(false);
          setOpen(prev => !prev);
        },
        onKeyDown: event => {
          if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            event.preventDefault?.();
            setFontOpen(false);
            setOpen(true);
          }
        },
      },
      h('span', { className: 'dsh-style-swatch', 'aria-hidden': 'true', style: { '--dsh-swatch-color': preset.swatch } }),
      h('span', { className: 'dsh-style-label' }, visibleText),
      h(Icon, { name: 'down', size: 14 })),
    }),
    showFontSwitcher
      ? h(FontSwitcher, {
          id: id + '-font',
          font: controlledFont,
          style: activeStyle,
          onChange: onFontChange,
          lang,
          compact: true,
          disabled,
          align,
          open: Boolean(fontOpen && !disabled),
          onOpenChange: next => {
            if (next) setOpen(false);
            setFontOpen(next);
          },
        })
      : null);
  }

  const tourSessionDone = new Set();

  function readTourDone(storageKey, win) {
    const key = String(storageKey || 'dsh-workbench.tour.v1');
    if (tourSessionDone.has(key)) return true;
    const target = resolveWindow(win);
    if (!target) return false;
    try {
      return target.localStorage?.getItem(key) === 'done';
    } catch {
      return false;
    }
  }

  function writeTourDone(storageKey, win) {
    const key = String(storageKey || 'dsh-workbench.tour.v1');
    tourSessionDone.add(key);
    const target = resolveWindow(win);
    if (!target) return;
    try {
      target.localStorage?.setItem(key, 'done');
    } catch {
      // Restricted storage: in-memory tourSessionDone keeps tour dismissed for the session.
    }
  }

  function hasOpenModalDialog(pageNode) {
    const doc = pageNode?.ownerDocument || resolveWindow()?.document || (typeof document !== 'undefined' ? document : null);
    if (!doc || typeof doc.querySelectorAll !== 'function') return false;
    const dialogs = doc.querySelectorAll('[role="dialog"]:not([data-tour-card])');
    for (const el of dialogs) {
      if (pageNode && el !== pageNode && typeof el.contains === 'function' && el.contains(pageNode)) continue;
      return true;
    }
    return false;
  }

  function computeTourLayout(target, preferredSide, cardEl) {
    const win = resolveWindow();
    const vw = (win && win.innerWidth) || 1280;
    const vh = (win && win.innerHeight) || 800;
    const cw = cardEl?.offsetWidth || 320;
    const ch = cardEl?.offsetHeight || 196;
    const pad = 5;
    const gap = 12;
    const raw = target?.getBoundingClientRect?.();
    if (!target) {
      return {
        spotlight: null,
        side: 'center',
        left: Math.max(12, Math.round((vw - cw) / 2)),
        top: Math.max(12, Math.round((vh - ch) / 2)),
        arrowX: 28,
        arrowY: 24,
      };
    }
    const hasBox = Boolean(raw && (raw.width > 0 || raw.height > 0));
    const rect = hasBox ? raw : { left: 120, top: 72, width: 140, height: 32 };
    const spotlight = {
      left: Math.round(rect.left - pad),
      top: Math.round(rect.top - pad),
      width: Math.round(rect.width + pad * 2),
      height: Math.round(rect.height + pad * 2),
    };
    const spaceBottom = vh - spotlight.top - spotlight.height;
    const spaceTop = spotlight.top;
    const spaceRight = vw - spotlight.left - spotlight.width;
    const spaceLeft = spotlight.left;
    let side = preferredSide || 'bottom';
    if (side === 'right' && spaceRight < cw + gap + 12) {
      side = spaceBottom >= ch + gap + 12 ? 'bottom' : spaceLeft >= cw + gap + 12 ? 'left' : 'top';
    } else if (side === 'left' && spaceLeft < cw + gap + 12) {
      side = spaceRight >= cw + gap + 12 ? 'right' : 'bottom';
    } else if (side === 'bottom' && spaceBottom < ch + gap + 12 && spaceTop > spaceBottom) {
      side = 'top';
    } else if (side === 'top' && spaceTop < ch + gap + 12 && spaceBottom > spaceTop) {
      side = 'bottom';
    }
    let left = spotlight.left;
    let top = spotlight.top + spotlight.height + gap;
    if (side === 'top') top = spotlight.top - ch - gap;
    else if (side === 'right') { left = spotlight.left + spotlight.width + gap; top = spotlight.top; }
    else if (side === 'left') { left = spotlight.left - cw - gap; top = spotlight.top; }
    left = Math.round(Math.max(12, Math.min(vw - cw - 12, left)));
    top = Math.round(Math.max(12, Math.min(vh - ch - 12, top)));
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return {
      spotlight,
      side,
      left,
      top,
      arrowX: Math.round(Math.max(18, Math.min(cw - 18, centerX - left))),
      arrowY: Math.round(Math.max(18, Math.min(ch - 18, centerY - top))),
    };
  }

  function CoachmarkTour({ rootRef, steps = [], step = 0, manual = false, style = 'harness', font, lang = 'zh', layout: rawLayout, setLayout, onStep, onClose, onCopyPrompt }) {
    const layerRef = useRefHook(null);
    const cardRef = useRefHook(null);
    const nextBtnRef = useRefHook(null);
    const [copied, setCopied] = useStateHook(false);
    const titleId = useIdHook() + '-tour-title';
    const isEn = String(lang || '').toLowerCase().startsWith('en');
    const l = (zh, en) => (isEn ? en : zh);
    const safeIndex = Math.max(0, Math.min(steps.length - 1, step));
    const current = steps[safeIndex] || {};
    const activeStyle = normalizeDshStyle(style);
    const activeFont = normalizeDshFont(font ?? readDshFont());
    const layout = rawLayout && typeof rawLayout === 'object' && rawLayout.side
      ? rawLayout
      : { spotlight: null, side: current.side || 'bottom', left: 24, top: 76, arrowX: 28, arrowY: 24 };

    useEffectHook(() => {
      const node = layerRef.current;
      if (!node) return undefined;
      try {
        node.setAttribute?.('popover', 'manual');
        node.showPopover?.();
      } catch { /* ignore */ }
      return () => { try { node.hidePopover?.(); } catch { /* ignore */ } };
    }, []);

    useEffectHook(() => {
      setCopied(false);
    }, [safeIndex]);

    useEffectHook(() => {
      function safeQuery(root, selector) {
        if (!root || typeof root.querySelector !== 'function' || !selector) return null;
        try {
          return root.querySelector(selector);
        } catch {
          if (typeof selector === 'string' && selector.startsWith('#') && !/[\s>+~,\[:.\]]/.test(selector.slice(1))) {
            try {
              const id = selector.slice(1).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
              return root.querySelector('[id="' + id + '"]');
            } catch {
              return null;
            }
          }
          return null;
        }
      }
      function measure() {
        const doc = resolveWindow()?.document || (typeof document !== 'undefined' ? document : null);
        const scope = rootRef?.current || doc;
        if (!scope || typeof scope.querySelector !== 'function') return;
        const target = safeQuery(scope, current.selector)
          || safeQuery(scope, current.fallback)
          || (scope !== doc ? (safeQuery(doc, current.selector) || safeQuery(doc, current.fallback)) : null)
          || null;
        setLayout?.(computeTourLayout(target, current.side, cardRef.current));
      }
      measure();
      const raf = typeof requestAnimationFrame === 'function' ? requestAnimationFrame(measure) : null;
      const win = resolveWindow();
      if (!win || typeof win.addEventListener !== 'function') {
        return () => { if (raf && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(raf); };
      }
      win.addEventListener('resize', measure, { passive: true });
      win.addEventListener('scroll', measure, true);
      return () => {
        if (raf && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(raf);
        win.removeEventListener('resize', measure);
        win.removeEventListener('scroll', measure, true);
      };
    }, [safeIndex, current.selector, current.fallback, current.side]);

    useEffectHook(() => {
      if (manual) {
        const btn = nextBtnRef.current || cardRef.current?.querySelector?.('[data-tour-next]');
        btn?.focus?.();
      }
    }, [manual, safeIndex]);

    async function defaultCopyPrompt(text) {
      const win = resolveWindow();
      const nav = win?.navigator || (typeof navigator !== 'undefined' ? navigator : null);
      if (nav?.clipboard?.writeText) {
        try {
          await nav.clipboard.writeText(String(text));
          return true;
        } catch { /* ignore */ }
      }
      return false;
    }

    async function handleCopy() {
      if (!current.prompt) return;
      const copyFn = typeof onCopyPrompt === 'function' ? onCopyPrompt : defaultCopyPrompt;
      const ok = await copyFn(current.prompt);
      if (ok !== false) {
        setCopied(true);
        const timer = setTimeout(() => setCopied(false), 1800);
        if (timer && typeof timer.unref === 'function') timer.unref();
      }
    }

    const isLast = safeIndex >= steps.length - 1;
    function finish() { onClose?.(manual); }
    function onKeyDown(event) {
      if (event.isComposing || event.nativeEvent?.isComposing) return;
      if (event.key === 'Escape') {
        event.preventDefault?.();
        event.stopPropagation?.();
        finish();
      } else if (event.key === 'ArrowRight' && !isLast) {
        event.preventDefault?.();
        onStep?.(safeIndex + 1, true);
      } else if (event.key === 'ArrowLeft' && safeIndex > 0) {
        event.preventDefault?.();
        onStep?.(safeIndex - 1, true);
      }
    }

    return h('div', {
      ref: layerRef,
      className: 'dshw w-tour-layer',
      'data-dsh-style': activeStyle,
      'data-dsh-font': activeFont,
      'data-wb-tour': current.id || String(safeIndex),
      'data-window-drag-exclude': '',
    },
      layout.spotlight
        ? h('div', {
            className: 'w-tour-spotlight',
            'data-tour-spotlight': current.id || String(safeIndex),
            'aria-hidden': 'true',
            style: {
              left: layout.spotlight.left + 'px',
              top: layout.spotlight.top + 'px',
              width: layout.spotlight.width + 'px',
              height: layout.spotlight.height + 'px',
            },
          })
        : h('div', { className: 'w-tour-backdrop-fallback', 'aria-hidden': 'true' }),
      h('div', {
        ref: cardRef,
        role: 'dialog',
        'aria-modal': 'false',
        'aria-labelledby': titleId,
        tabIndex: -1,
        onKeyDown,
        className: 'w-tour-card',
        'data-side': layout.side,
        'data-tour-card': current.id || String(safeIndex),
        style: {
          left: layout.left + 'px',
          top: layout.top + 'px',
          '--arrow-x': layout.arrowX + 'px',
          '--arrow-y': layout.arrowY + 'px',
        },
      },
        h('span', { className: 'w-tour-arrow', 'data-tour-arrow': layout.side, 'aria-hidden': 'true' }),
        h('div', { className: 'w-tour-head' },
          h('div', { className: 'w-tour-step-meta' },
            h('span', { className: 'w-tour-step-badge' }, (safeIndex + 1) + ' / ' + steps.length),
            h('span', { className: 'w-tour-dots', 'aria-hidden': 'true' },
              steps.map((item, idx) => h('span', { key: item.id || idx, className: 'w-tour-dot', 'data-active': idx === safeIndex ? 'true' : undefined })))),
          h('button', { type: 'button', className: 'w-tour-skip', 'data-tour-skip': '', onClick: finish }, l('跳过', 'Skip'))),
        h('h2', { id: titleId, className: 'w-tour-title' }, current.title),
        h('p', { className: 'w-tour-desc' }, current.desc),
        current.prompt ? h('div', { className: 'w-tour-inline-action' },
          h(Button, {
            variant: 'outline',
            size: 'sm',
            icon: copied ? 'check' : 'copy',
            'data-copy-prompt': current.prompt,
            'data-copied': copied ? 'true' : undefined,
            onClick: () => { void handleCopy(); },
          }, copied ? l('已复制', 'Copied') : (current.promptLabel || l('复制对话指令', 'Copy prompt')))) : null,
        h('div', { className: 'w-tour-footer' },
          safeIndex > 0
            ? h(Button, { variant: 'ghost', size: 'sm', onClick: () => onStep?.(safeIndex - 1, true), 'data-tour-prev': '' }, l('上一步', 'Back'))
            : h('span', null),
          h('div', { className: 'w-tour-nav' },
            h(Button, {
              ref: nextBtnRef,
              variant: 'primary',
              size: 'sm',
              'data-tour-next': '',
              onClick: () => (isLast ? finish() : onStep?.(safeIndex + 1, true)),
            }, isLast ? l('完成引导', 'Done') : l('下一步', 'Next'))))));
  }

  function TabBar({ items = [], value, onChange, label, id: explicitId, className, pill = true }) {
    const fallbackId = useIdHook();
    const id = explicitId || fallbackId;
    const active = items.some(item => item.id === value) ? value : items[0]?.id;
    const indicator = useSlidingTabIndicator(active, { deps: [items.length] });
    function keys(event, index) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
      const node = event.currentTarget.parentElement?.querySelectorAll('[role=tab]')[next];
      if (node) { onChange(items[next].id); node.focus(); }
    }
    return h('div', {
      ...indicator.tablistProps,
      className: cx('w-tabs', 'dsh-tablist', pill && 'dsh-tablist-pill', className),
      role: 'tablist',
      'aria-label': label,
      'data-window-drag-exclude': '',
    },
    items.map((item, index) => h('button', {
      type: 'button',
      role: 'tab',
      key: item.id,
      className: 'w-tab',
      id: id + '-' + item.id,
      'data-tab-id': item.id,
      ...(item['data-tour'] ? { 'data-tour': item['data-tour'] } : {}),
      'aria-selected': active === item.id,
      tabIndex: active === item.id ? 0 : -1,
      onClick: () => onChange(item.id),
      onKeyDown: event => keys(event, index),
    }, item.icon ? h(Icon, { name: item.icon, size: 14 }) : null, h('span', null, item.label), item.count !== undefined ? h('span', { className: 'w-count' }, item.count) : null)),
    h('span', indicator.indicatorProps));
  }

  function Page({ title, subtitle, headerMeta, icon, tabs, navigation, actions, children, workbench = false, lang = 'zh', showStyleSwitcher = true, showFontSwitcher = true, className, rootRef, tourSteps = null, tourStorageKey = 'dsh-workbench.tour.v1', onTourCopyPrompt, ...props }) {
    const [style, setStyle] = useDshStyle();
    const [font, setFont] = useDshFont();
    const fallbackRootRef = useRefHook(null);
    const pageRef = rootRef && typeof rootRef === 'object' ? rootRef : fallbackRootRef;
    const triggerRef = useRefHook(null);
    const [tour, setTour] = useStateHook({ open: false, step: 0, manual: false });
    const [tourLayout, setTourLayout] = useStateHook(null);
    const hasTour = Array.isArray(tourSteps) && tourSteps.length > 0;
    const isEn = String(lang || '').toLowerCase().startsWith('en');
    const titleTooltip = typeof subtitle === 'string' && subtitle ? subtitle : undefined;
    const inlineTabs = tabs && Array.isArray(tabs.items) && tabs.items.length > 0
      ? h(TabBar, {
          id: tabs.id,
          items: tabs.items,
          value: tabs.value,
          onChange: tabs.onChange,
          label: tabs.label,
          pill: tabs.pill !== false,
        })
      : null;

    useEffectHook(() => {
      if (!workbench || !hasTour || readTourDone(tourStorageKey)) return undefined;
      const timer = setTimeout(() => {
        if (!readTourDone(tourStorageKey) && !hasOpenModalDialog(pageRef.current)) {
          setTour({ open: true, step: 0, manual: false });
        }
      }, 280);
      if (timer && typeof timer.unref === 'function') timer.unref();
      return () => clearTimeout(timer);
    }, [workbench, hasTour, tourStorageKey]);

    useEffectHook(() => {
      if (!tour.open || tour.manual) return undefined;
      if (hasOpenModalDialog(pageRef.current)) {
        writeTourDone(tourStorageKey);
        setTour(prev => (prev.open ? { ...prev, open: false } : prev));
        return undefined;
      }
      const doc = pageRef.current?.ownerDocument || resolveWindow()?.document || (typeof document !== 'undefined' ? document : null);
      if (typeof MutationObserver !== 'function' || !doc?.body || typeof doc.body.nodeType !== 'number') return undefined;
      const observer = new MutationObserver(() => {
        if (hasOpenModalDialog(pageRef.current)) {
          writeTourDone(tourStorageKey);
          setTour(prev => (prev.open && !prev.manual ? { ...prev, open: false } : prev));
        }
      });
      observer.observe(doc.body, { childList: true, subtree: true });
      return () => observer.disconnect();
    }, [tour.open, tour.manual, tourStorageKey, children]);

    function closeTour(restoreFocus = false) {
      writeTourDone(tourStorageKey);
      setTour(prev => ({ ...prev, open: false }));
      if (restoreFocus) {
        const timer = setTimeout(() => {
          const btn = triggerRef.current || pageRef.current?.querySelector?.('[data-wb-tour-trigger]');
          btn?.focus?.();
        }, 0);
        if (timer && typeof timer.unref === 'function') timer.unref();
      }
    }

    return h('section', {
      ...props,
      ref: pageRef,
      'data-dsh-style': style,
      'data-dsh-font': font,
      'data-main': workbench ? 'true' : 'false',
      className: cx('dshw', 'w-page', !workbench && 'w-embedded', className),
    },
      h(Styles, { key: 'styles' }),
      h('header', { className: cx('w-page-header', 'dsh-header'), 'data-dsh-header': '' },
        h('div', { className: 'dsh-header-leading' },
          h('div', { className: 'dsh-header-brand' },
            icon ? h('span', { className: cx('w-brand', 'dsh-header-badge'), 'aria-hidden': 'true' }, h(Icon, { name: icon, size: 14 })) : null,
            h('h1', { className: cx('w-title', 'dsh-header-title'), title: titleTooltip }, title),
            headerMeta || null),
          (inlineTabs || navigation) ? h('div', { className: 'dsh-header-tabs' }, inlineTabs, navigation || null) : null),
        (actions || showStyleSwitcher || hasTour)
          ? h('div', { className: 'w-header-actions', 'data-dsh-header-actions': '', 'data-window-drag-exclude': '' },
              hasTour ? h(Button, {
                ref: triggerRef,
                variant: 'ghost',
                size: 'sm',
                className: 'w-tour-trigger',
                'data-wb-tour-trigger': '',
                'aria-label': isEn ? 'Interactive guide' : '使用引导',
                'aria-expanded': Boolean(tour.open),
                title: isEn ? 'Interactive guide' : '使用引导',
                onClick: () => {
                  if (tour.open) closeTour(true);
                  else setTour({ open: true, step: 0, manual: true });
                },
              }, isEn ? '? Tour' : '? 引导') : null,
              showStyleSwitcher ? h(StyleSwitcher, { style, font, onChange: setStyle, onFontChange: setFont, showFontSwitcher, lang, compact: true }) : null,
              actions)
          : null),
      h('div', { className: 'w-body' }, children),
      hasTour && tour.open ? h(CoachmarkTour, {
        rootRef: pageRef,
        steps: tourSteps,
        step: tour.step,
        manual: tour.manual,
        style,
        font,
        lang,
        layout: tourLayout,
        setLayout: setTourLayout,
        onStep: (next, isManual) => setTour({ open: true, step: next, manual: Boolean(isManual) }),
        onClose: closeTour,
        onCopyPrompt: onTourCopyPrompt,
      }) : null);
  }

  function Tabs({ items, value, onChange, label, children, pill = false }) {
    const id = useIdHook();
    const active = items.some(item => item.id === value) ? value : items[0]?.id;
    return h('div', { className: 'w-tabs-layout' },
      h(TabBar, { id, items, value: active, onChange, label, pill }),
      children !== undefined
        ? h('div', {
            key: active,
            className: 'w-tab-panel dsh-tab-panel',
            'data-dsh-tab-panel': '',
            id: id + '-panel',
            role: 'tabpanel',
            'aria-labelledby': id + '-' + active,
          }, children)
        : null);
  }

  function Status({ children, tone = 'info', className }) {
    if (!children) return null;
    return h('div', {
      className: cx('dshw', 'w-status', 'w-status-' + tone, className),
      'data-tone': tone,
      role: tone === 'error' ? 'alert' : 'status',
      'aria-live': tone === 'error' ? 'assertive' : 'polite',
    }, h(Icon, { name: tone === 'success' ? 'check' : 'info', size: 16 }), h('div', { className: 'w-status-text' }, children));
  }

  function Empty({ title, children, action, icon = 'file' }) {
    const [style] = useDshStyle();
    const [font] = useDshFont();
    return h('div', { className: 'dshw w-empty', 'data-dsh-style': style, 'data-dsh-font': font },
      h(Styles, { key: 'styles' }),
      h('span', { className: 'w-empty-icon' }, h(Icon, { name: icon, size: 24 })),
      h('h2', { 'data-dsh-serif': '' }, title),
      children ? h('div', { className: 'w-muted' }, children) : null,
      action ? h('div', { className: 'w-toolbar' }, action) : null);
  }

  function Split({ list, detail, selected, onBack, backLabel, className, listWidth = 360, storageKey, minWidth = 220, maxWidth = 540, resizerLabel = 'Resize pane' }) {
    const ref = useRefHook(null);
    const splitState = storageKey
      ? useResizableSplit({ key: storageKey, initial: listWidth, min: minWidth, max: maxWidth })
      : null;
    useEffectHook(() => {
      if (!selected || !ref.current || ref.current.clientWidth > 760) return;
      const heading = ref.current.querySelector('.w-detail h2');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    }, [selected]);
    const effectiveWidth = splitState ? splitState.size : listWidth;
    return h('div', {
      ref,
      className: cx('w-split', storageKey && 'dsh-split-pane', className),
      'data-selected': selected ? 'true' : 'false',
      style: { '--w-list-width': effectiveWidth + 'px', '--dsh-split-size': effectiveWidth + 'px' },
    },
      h('div', { className: cx('w-master', storageKey && 'dsh-split-leading') }, list),
      storageKey ? h(SplitResizer, { ...splitState.resizerProps, label: resizerLabel }) : null,
      h('div', { className: cx('w-detail', storageKey && 'dsh-split-trailing') }, selected ? h(Button, { className: 'w-back', icon: 'left', variant: 'ghost', onClick: onBack }, backLabel) : null, detail));
  }

  function Row({ title, meta, description, active, onClick, children, actions, status, className, disabled }) {
    return h('div', {
      className: cx('w-row', 'dsh-row', active && 'w-selected', className),
      'data-dsh-row': '',
      'data-active': active ? 'true' : 'false',
      'data-selected': active ? 'true' : 'false',
    },
      children ? h('div', { className: 'w-row-select' }, children) : null,
      h('button', { type: 'button', className: 'w-row-button', onClick, disabled, 'aria-pressed': !!active },
        h('span', { className: 'w-row-head' },
          h('span', { className: 'w-row-title-wrap' },
            h('span', { className: 'dsh-pixel-cursor', 'aria-hidden': 'true' }, '▶'),
            h('strong', { 'data-dsh-serif': '' }, title)),
          status ? h('span', { className: 'w-tag' }, status) : null),
        meta ? h('span', { className: 'w-row-meta' }, meta) : null,
        description ? h('span', { className: 'w-row-description' }, description) : null),
      actions ? h('div', { className: 'dsh-row-actions', 'data-window-drag-exclude': '' }, actions) : null);
  }

  function Search({ label, value, onChange, ...props }) {
    const id = useIdHook();
    return h(Input, { type: 'search', id, icon: 'search', 'aria-label': label, placeholder: label, value, onChange, className: 'w-search', ...props });
  }

  function Switch({ label, checked, onChange, disabled, className }) {
    const P = resolveHostPrimitives();
    return h('div', { className: cx('w-switch-row', className) },
      label ? h('span', { className: 'w-switch-text' }, label) : null,
      h(P.Switch, {
        checked: Boolean(checked),
        disabled,
        label,
        className: 'w-switch',
        onChange: next => onChange?.(typeof next === 'boolean' ? next : Boolean(next?.target?.checked)),
      }));
  }

  function Dialog({ title, children, onClose, closeLabel, className, busy = false, footer, tone }) {
    const [style] = useDshStyle();
    const [font] = useDshFont();
    const id = useIdHook();
    const P = resolveHostPrimitives();
    const close = () => { if (!busy) onClose?.(); };
    return h(P.Modal, {
      open: true,
      headless: true,
      dshStyle: style,
      dshFont: font,
      title,
      onClose: close,
      backdropBlur: false,
      className: cx('dshw', 'w-dialog-modal', className),
    },
      h('div', {
        ref: createOverlaySyncRef(style, font),
        className: cx('dshw', 'w-dialog', className),
        'data-dsh-style': style,
        'data-dsh-font': font,
        'data-window-drag-exclude': '',
        'aria-labelledby': id,
      },
        h(Styles, { key: 'styles' }),
        h('header', { className: 'w-dialog-header' },
          h('h2', { id, 'data-tone': tone, 'data-dsh-serif': '' }, title),
          h(IconButton, { icon: 'close', label: closeLabel, disabled: busy, onClick: close })),
        h('div', { className: 'w-dialog-body', 'aria-busy': busy || undefined }, children),
        footer ? h('footer', { className: 'w-dialog-footer' }, footer) : null));
  }

  function register(ctx, { id, label, icon, component, inject, order = 50 }) {
    ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: id, inject: () => ({ ...(inject?.() || {}), workbench: true }) }, component));
    ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id, order, label }, function WorkbenchIcon({ size }) { return h(Icon, { name: icon, size }); }));
  }

  const styles = `
:where([data-dsh-style]),
:where([data-dsh-portal-synced]),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):has([data-dsh-style]) {
--dsh-ease-out: cubic-bezier(0.22, 1, 0.36, 1);
--dsh-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--dsh-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--dsh-motion-fast: 140ms;
--dsh-motion-base: 200ms;
--dsh-motion-dialog: 220ms;
--dsh-control-border-width: 0.5px;
--dsh-button-shadow: none;
--dsh-button-hover-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
--dsh-card-shadow: none;
--dsh-card-hover-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
--dsh-font-display: "Cascadia Code SemiBold", "Cascadia Code", "YouYuan", "幼圆", "Noto Sans SC", monospace;
--dsh-font-body: "Cascadia Code", "Cascadia Mono", "YouYuan", "幼圆", "Noto Sans SC", monospace;
--dsh-font-mono: "Cascadia Mono", "Cascadia Code", "YouYuan", "幼圆", Consolas, monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: 0.015em;
--dsh-body-tracking: normal;
--dsh-serif-font: "Palatino Linotype", Georgia, "Noto Serif SC", "STZhongsong", "华文中宋", "STSong", "华文宋体", serif;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
@supports (transition-timing-function: linear(0, 1)) {
:where([data-dsh-style]),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):has([data-dsh-style]) {
--dsh-ease-spring: linear(
0, 0.402 7.4%, 0.711 15.3%, 0.929 23.7%, 1.008 28.2%,
1.067 33%, 1.099 36.9%, 1.12 41%, 1.13 45.4%, 1.13 50.1%,
1.111 58.5%, 1.019 83.2%, 1.004 91.3%, 1
);
}
}
[data-window-drag-exclude] {
-webkit-app-region: no-drag;
}
[data-dsh-style="harness"],
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="harness"], :has([data-dsh-style="harness"])) {
--dsh-font-display: "Cascadia Code SemiBold", "Cascadia Code", "YouYuan", "幼圆", "Noto Sans SC", monospace;
--dsh-font-body: "Cascadia Code", "Cascadia Mono", "YouYuan", "幼圆", "Noto Sans SC", monospace;
--dsh-font-mono: "Cascadia Mono", "Cascadia Code", "YouYuan", "幼圆", Consolas, monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: 0.015em;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
:where(body:not([data-ds-dark-theme])) [data-dsh-style="harness"],
:where(body:not([data-ds-dark-theme])) :where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):has([data-dsh-style="harness"]) {
color-scheme: light;
accent-color: var(--dsw-alias-state-business-primary, #4176e6);
}
:root:not([data-dsh-host-tokens]) [data-dsh-style="harness"] {
--dsw-radius-xs: 6px;
--dsw-radius-sm: 8px;
--dsw-radius-md: 12px;
--dsw-radius-lg: 16px;
--dsw-radius-xl: 20px;
}
body:not([data-ds-dark-theme]) [data-dsh-style="harness"] {
--dsh-surface-spotlight: rgba(65, 118, 230, 0.06);
}
body[data-ds-dark-theme] [data-dsh-style="harness"],
body[data-ds-dark-theme] :where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="harness"], :has([data-dsh-style="harness"])) {
color-scheme: dark;
accent-color: #7aaaff;
--dsw-alias-bg-base: #1f232b;
--dsw-alias-bg-layer-1: #272c36;
--dsw-alias-bg-layer-2: #2f3542;
--dsw-alias-bg-layer-3: #373e4d;
--dsw-alias-bg-overlay: #2a303c;
--dsw-alias-bg-module-platform: #2c323e;
--dsw-alias-settings-card-fill: #262b35;
--dsw-alias-settings-card-stroke: rgba(226, 232, 240, 0.12);
--dsw-specific-menu: rgba(39, 44, 54, 0.96);
--dsw-alias-border-l1: rgba(226, 232, 240, 0.09);
--dsw-alias-border-l2: rgba(226, 232, 240, 0.15);
--dsw-alias-border-l3: rgba(226, 232, 240, 0.22);
--dsw-alias-border-l4: rgba(226, 232, 240, 0.28);
--dsw-alias-label-primary: #eef2f7;
--dsw-alias-label-secondary: #b6c0cf;
--dsw-alias-label-tertiary: #8d98ab;
--dsw-alias-label-dimmed: #737e91;
--dsw-alias-brand-primary: #7aaaff;
--dsw-alias-brand-text: #eef2f7;
--dsw-alias-state-business-primary: #7aaaff;
--dsw-alias-state-business-tertiary: rgba(122, 170, 255, 0.16);
--dsw-alias-link: #8bb6ff;
--dsw-alias-button-primary-fill: #5b8def;
--dsw-alias-button-primary-hover: #6f9cf4;
--dsw-alias-button-primary-ink: #ffffff;
--dsw-alias-interactive-bg-hover: rgba(226, 232, 240, 0.07);
--dsw-alias-interactive-bg-active: rgba(226, 232, 240, 0.13);
--dsw-alias-interactive-bg-hover-accent: rgba(122, 170, 255, 0.15);
--dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.16);
--dsw-alias-state-error-primary: #f87171;
--dsw-alias-state-warn-primary: #fbbf24;
--dsw-alias-state-warn-label: #fcd34d;
--dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.15);
--dsw-alias-state-success-primary: #4ade80;
--dsw-elevation-panel: 0 4px 16px rgba(10, 14, 22, 0.28), 0 0 0 1px rgba(226, 232, 240, 0.12);
--dsw-elevation-prominent: 0 14px 38px rgba(10, 14, 22, 0.42), 0 0 0 1px rgba(226, 232, 240, 0.16);
--dsh-button-hover-shadow: 0 2px 8px rgba(10, 14, 22, 0.25);
--dsh-card-hover-shadow: 0 8px 22px rgba(10, 14, 22, 0.32);
--dsh-surface-spotlight: rgba(122, 170, 255, 0.10);
}
[data-dsh-style="cream"],
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="cream"], :has([data-dsh-style="cream"])) {
color-scheme: light;
accent-color: #9e5829;
--dsw-alias-bg-base: #faf7f0;
--dsw-alias-bg-layer-1: #f3efe4;
--dsw-alias-bg-layer-2: #eae3d3;
--dsw-alias-bg-layer-3: #e0d7c3;
--dsw-alias-bg-overlay: #fcfaf4;
--dsw-alias-bg-module-platform: #efe9da;
--dsw-alias-settings-card-fill: #fdfbf6;
--dsw-alias-settings-card-stroke: #d4c8ae;
--dsw-specific-menu: rgba(252, 250, 244, 0.97);
--dsw-alias-border-l1: #e6dec8;
--dsw-alias-border-l2: #d4c8ae;
--dsw-alias-border-l3: #c0b193;
--dsw-alias-border-l4: #ad9c7c;
--dsw-alias-label-primary: #2b2620;
--dsw-alias-label-secondary: #655b4e;
--dsw-alias-label-tertiary: #857968;
--dsw-alias-label-dimmed: #9c907f;
--dsw-alias-brand-primary: #9e5829;
--dsw-alias-brand-text: #2b2620;
--dsw-alias-state-business-primary: #a65e2e;
--dsw-alias-state-business-tertiary: rgba(166, 94, 46, 0.13);
--dsw-alias-link: #934e20;
--dsw-alias-button-primary-fill: #9e5829;
--dsw-alias-button-primary-hover: #86481e;
--dsw-alias-button-primary-ink: #fffdf9;
--dsw-alias-interactive-bg-hover: rgba(108, 84, 50, 0.075);
--dsw-alias-interactive-bg-active: rgba(166, 94, 46, 0.14);
--dsw-alias-interactive-bg-hover-accent: rgba(166, 94, 46, 0.12);
--dsw-alias-interactive-bg-hover-danger: rgba(185, 56, 44, 0.11);
--dsw-alias-state-error-primary: #b9382c;
--dsw-alias-state-warn-primary: #b45309;
--dsw-alias-state-warn-label: #8c3d08;
--dsw-alias-state-warn-tertiary: #fdefd6;
--dsw-alias-state-success-primary: #2a6f4e;
--dsw-radius-xs: 6px;
--dsw-radius-sm: 9px;
--dsw-radius-md: 13px;
--dsw-radius-lg: 16px;
--dsw-radius-xl: 20px;
--dsw-elevation-panel: 0 1px 2px rgba(68, 52, 32, 0.06), 3px 3px 0 #ebe3d1, 0 0 0 1px rgba(180, 164, 138, 0.42);
--dsw-elevation-prominent: 0 14px 34px rgba(68, 52, 32, 0.14), 3px 3px 0 #ebe3d1, 0 0 0 1px rgba(180, 164, 138, 0.48);
--dsh-control-border-width: 1px;
--dsh-button-hover-shadow: 0 2px 6px rgba(84, 62, 34, 0.09);
--dsh-card-shadow: 0 1px 2px rgba(68, 52, 32, 0.06), 3px 3px 0 #ebe3d1;
--dsh-card-hover-shadow: 0 4px 10px rgba(68, 52, 32, 0.10), 4px 4px 0 #e2d7be;
--dsh-surface-spotlight: rgba(166, 94, 46, 0.08);
--dsh-font-display: "Trebuchet MS", "STKaiti", "华文楷体", "Noto Serif SC SemiBold", serif;
--dsh-font-body: "Source Sans 3", "Noto Sans SC", "Microsoft YaHei UI", sans-serif;
--dsh-font-mono: "Cascadia Mono", Consolas, monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: normal;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
[data-dsh-style="cream"] :where([data-dsh-card], .dsh-card) {
border-color: var(--dsw-alias-border-l2);
box-shadow: var(--dsh-card-shadow);
}
[data-dsh-style="cream"] :where([data-dsh-row], .dsh-row) {
border-block-end: 1px dashed var(--dsw-alias-border-l2);
}
[data-dsh-style="cream"] [role="tab"][aria-selected="true"] {
background: rgba(158, 88, 41, 0.10);
color: #7d4119;
box-shadow: inset 0 2px 0 rgba(158, 88, 41, 0.22);
}
[data-dsh-style="cream"] [role="tab"][aria-selected="true"]::after {
border-block-end-color: #9e5829;
border-block-end-width: 2.5px;
}
[data-dsh-style="claude"],
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="claude"], :has([data-dsh-style="claude"])) {
color-scheme: light;
accent-color: #c96442;
--dsw-alias-bg-base: #f5f4ed;
--dsw-alias-bg-layer-1: #ece9df;
--dsw-alias-bg-layer-2: #e3dfd2;
--dsw-alias-bg-layer-3: #d8d3c3;
--dsw-alias-bg-overlay: #faf9f4;
--dsw-alias-bg-module-platform: #e7e3d6;
--dsw-alias-settings-card-fill: #faf9f4;
--dsw-alias-settings-card-stroke: transparent;
--dsw-specific-menu: rgba(250, 249, 244, 0.97);
--dsw-alias-border-l1: #e4e0d3;
--dsw-alias-border-l2: #d5d0c3;
--dsw-alias-border-l3: #c1bbb0;
--dsw-alias-border-l4: #aba495;
--dsw-alias-label-primary: #1f1e1b;
--dsw-alias-label-secondary: #5d5a51;
--dsw-alias-label-tertiary: #7b776c;
--dsw-alias-label-dimmed: #948f83;
--dsw-alias-brand-primary: #c96442;
--dsw-alias-brand-text: #1f1e1b;
--dsw-alias-state-business-primary: #c96442;
--dsw-alias-state-business-tertiary: rgba(201, 100, 66, 0.14);
--dsw-alias-link: #b35030;
--dsw-alias-button-primary-fill: #c96442;
--dsw-alias-button-primary-hover: #b25232;
--dsw-alias-button-primary-ink: #faf9f5;
--dsw-alias-interactive-bg-hover: rgba(31, 30, 27, 0.055);
--dsw-alias-interactive-bg-active: rgba(201, 100, 66, 0.14);
--dsw-alias-interactive-bg-hover-accent: rgba(201, 100, 66, 0.11);
--dsw-alias-interactive-bg-hover-danger: rgba(180, 48, 42, 0.11);
--dsw-alias-state-error-primary: #b4302a;
--dsw-alias-state-warn-primary: #b85d19;
--dsw-alias-state-warn-label: #8c430c;
--dsw-alias-state-warn-tertiary: #f7e8d6;
--dsw-alias-state-success-primary: #2d6a4f;
--dsw-radius-xs: 7px;
--dsw-radius-sm: 10px;
--dsw-radius-md: 14px;
--dsw-radius-lg: 18px;
--dsw-radius-xl: 22px;
--dsw-elevation-panel: 0 2px 12px rgba(31, 30, 27, 0.05), 0 0 0 1px rgba(145, 139, 126, 0.18);
--dsw-elevation-prominent: 0 16px 38px rgba(31, 30, 27, 0.13), 0 2px 8px rgba(31, 30, 27, 0.05), 0 0 0 1px rgba(145, 139, 126, 0.24);
--dsh-control-border-width: 1px;
--dsh-button-hover-shadow: 0 2px 7px rgba(31, 30, 27, 0.08);
--dsh-card-shadow: 0 1px 3px rgba(31, 30, 27, 0.05), 0 0 0 1px rgba(145, 139, 126, 0.13);
--dsh-card-hover-shadow: 0 8px 22px rgba(31, 30, 27, 0.08), 0 0 0 1px rgba(145, 139, 126, 0.20);
--dsh-surface-spotlight: rgba(201, 100, 66, 0.08);
--dsh-font-display: "Palatino Linotype", Georgia, "Noto Serif SC SemiBold", "Noto Serif SC", "STZhongsong", "华文中宋", serif;
--dsh-font-body: Georgia, "Noto Serif SC", "STSong", "华文宋体", serif;
--dsh-font-mono: "Cascadia Code", "Cascadia Mono", Consolas, monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: -0.01em;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
[data-dsh-style="claude"] {
background-color: var(--dsw-alias-bg-base);
background-image:
radial-gradient(rgba(31, 30, 27, 0.024) 0.75px, transparent 0),
linear-gradient(180deg, rgba(255, 253, 247, 0.45), rgba(236, 233, 223, 0.25));
background-size: 16px 16px, 100% 100%;
}
[data-dsh-style="claude"] :where([data-dsh-card], .dsh-card) {
background: var(--dsw-alias-settings-card-fill);
border-color: transparent;
box-shadow: var(--dsh-card-shadow);
}
[data-dsh-style="claude"] :where(
header h1,
[data-dsh-editorial-heading],
[data-dsh-serif],
[data-dsh-card] :is(h2, h3, .dsh-card-title),
.dsh-card :is(h2, h3, .dsh-card-title),
[data-dsh-reader] :is(h1, h2),
.dsh-reader :is(h1, h2)
),
:where([role="dialog"], dialog):where([data-dsh-style="claude"], :has([data-dsh-style="claude"])) header h2 {
font-family: var(--dsh-font-display);
font-weight: var(--dsh-display-weight, 700);
letter-spacing: var(--dsh-display-tracking, -0.01em);
}
[data-dsh-style="pixel8bit"],
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="pixel8bit"], :has([data-dsh-style="pixel8bit"])) {
color-scheme: light;
accent-color: #2e7d5b;
--dsw-alias-bg-base: #f4f6e8;
--dsw-alias-bg-layer-1: #e7eed2;
--dsw-alias-bg-layer-2: #dbe5c0;
--dsw-alias-bg-layer-3: #cedaad;
--dsw-alias-bg-overlay: #f9fbf0;
--dsw-alias-bg-module-platform: #e2ebc9;
--dsw-alias-settings-card-fill: #edf2dc;
--dsw-alias-settings-card-stroke: #1e2826;
--dsw-specific-menu: #f9fbf0;
--dsw-alias-border-l1: #7e9478;
--dsw-alias-border-l2: #1e2826;
--dsw-alias-border-l3: #1e2826;
--dsw-alias-border-l4: #1e2826;
--dsw-alias-label-primary: #1e2826;
--dsw-alias-label-secondary: #3d514c;
--dsw-alias-label-tertiary: #58706a;
--dsw-alias-label-dimmed: #6e857f;
--dsw-alias-brand-primary: #2e7d5b;
--dsw-alias-brand-text: #1e2826;
--dsw-alias-state-business-primary: #2e7d5b;
--dsw-alias-state-business-tertiary: rgba(46, 125, 91, 0.18);
--dsw-alias-link: #226448;
--dsw-alias-button-primary-fill: #2e7d5b;
--dsw-alias-button-primary-hover: #24674a;
--dsw-alias-button-primary-ink: #f4f6e8;
--dsw-alias-interactive-bg-hover: #dfe9c4;
--dsw-alias-interactive-bg-active: #cfe0ad;
--dsw-alias-interactive-bg-hover-accent: rgba(46, 125, 91, 0.16);
--dsw-alias-interactive-bg-hover-danger: rgba(217, 91, 67, 0.18);
--dsw-alias-state-error-primary: #d95b43;
--dsw-alias-state-warn-primary: #c47614;
--dsw-alias-state-warn-label: #7a4808;
--dsw-alias-state-warn-tertiary: #f6e7b4;
--dsw-alias-state-success-primary: #2e7d5b;
--dsh-pixel-accent-secondary: #d95b43;
--dsw-radius-xs: 0px;
--dsw-radius-sm: 0px;
--dsw-radius-md: 0px;
--dsw-radius-lg: 0px;
--dsw-radius-xl: 0px;
--dsw-corner-shape: square;
--dsw-elevation-panel: 2px 2px 0px #1e2826;
--dsw-elevation-prominent: 4px 4px 0px #1e2826;
--dsh-control-border-width: 2px;
--dsh-button-shadow: 2px 2px 0px #1e2826;
--dsh-button-hover-shadow: 3px 3px 0px #1e2826;
--dsh-card-shadow: 2px 2px 0px #1e2826;
--dsh-card-hover-shadow: 4px 4px 0px #1e2826;
--dsh-surface-spotlight: rgba(46, 125, 91, 0.12);
--dsh-font-display: "Cascadia Code SemiBold", "Cascadia Code", "YouYuan", "幼圆", "Noto Sans SC", monospace;
--dsh-font-body: "Cascadia Code", "Cascadia Mono", "YouYuan", "幼圆", "Noto Sans SC", monospace;
--dsh-font-mono: "Cascadia Mono", "Cascadia Code", "YouYuan", "幼圆", Consolas, monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: 0.03em;
--dsh-body-tracking: 0.03em;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
[data-dsh-style="pixel8bit"] :where(.dsh-header, [data-dsh-header], .dsh-wb-header) {
background-color: var(--dsw-alias-bg-layer-1);
background-image: radial-gradient(rgba(30, 40, 38, 0.14) 1px, transparent 0);
background-size: 6px 6px;
border-block-end: 2px solid #1e2826;
}
[data-dsh-style="pixel8bit"] :where(button, input, select, textarea, [role="button"], [role="tab"], [role="menuitem"], [role="menuitemradio"], [data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="pixel8bit"], :has([data-dsh-style="pixel8bit"])),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="pixel8bit"], :has([data-dsh-style="pixel8bit"])) :where(button, input, select, textarea, [role="menuitem"], [role="menuitemradio"]) {
border-radius: 0px !important;
corner-shape: square;
}
[data-dsh-style="pixel8bit"] :where(button:not([role="tab"]), .dsh-btn),
:where([role="dialog"], [role="alertdialog"], dialog):where([data-dsh-style="pixel8bit"], :has([data-dsh-style="pixel8bit"])) :where(button:not([role="tab"]), .dsh-btn) {
border: 2px solid #1e2826;
box-shadow: 2px 2px 0px #1e2826;
}
[data-dsh-style="pixel8bit"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {
border: 2px solid #1e2826;
box-shadow: 2px 2px 0px #1e2826;
}
[data-dsh-style="pixel8bit"] :where(input:not([type="checkbox"]):not([type="radio"]):not([type="range"]), select, textarea),
:where([role="dialog"], [role="alertdialog"], dialog):where([data-dsh-style="pixel8bit"], :has([data-dsh-style="pixel8bit"])) :where(input:not([type="checkbox"]):not([type="radio"]):not([type="range"]), select, textarea) {
border-width: 2px;
border-color: #1e2826;
}
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="pixel8bit"], :has([data-dsh-style="pixel8bit"])) {
border: 2px solid #1e2826 !important;
box-shadow: 4px 4px 0px #1e2826 !important;
backdrop-filter: none;
}
[data-dsh-style="pixel8bit"] [role="tab"][aria-selected="true"]::after,
[data-dsh-style="pixel8bit"] .dsh-tab-indicator {
border-block-end-color: #d95b43;
border-block-end-width: 3px;
}
.dsh-pixel-cursor {
display: none;
flex: none;
font-size: 10px;
line-height: 1;
color: var(--dsh-pixel-accent-secondary, #d95b43);
}
@keyframes dsh-pixel-cursor-nudge {
0%, 100% { translate: 0px 0px; }
50% { translate: 2px 0px; }
}
[data-dsh-style="pixel8bit"] :where([data-dsh-row], .dsh-row):where([data-active="true"], [data-selected="true"], [aria-selected="true"]) {
background-color: var(--dsw-alias-interactive-bg-active);
box-shadow: inset 3px 0 0 #d95b43;
}
[data-dsh-style="pixel8bit"] :where([data-dsh-row], .dsh-row):where([data-active="true"], [data-selected="true"], [aria-selected="true"]):not(:has(.dsh-pixel-cursor))::before {
content: "▶";
display: inline-block;
flex: none;
margin-inline-end: 6px;
font-size: 10px;
line-height: 1;
color: #d95b43;
}
[data-dsh-style="pixel8bit"] :where([data-active="true"], [data-selected="true"], [aria-selected="true"]) .dsh-pixel-cursor {
display: inline-flex;
align-items: center;
}
@media (prefers-reduced-motion: no-preference) {
[data-dsh-style="pixel8bit"] :where([data-dsh-row], .dsh-row):where([data-active="true"], [data-selected="true"], [aria-selected="true"]):not(:has(.dsh-pixel-cursor))::before,
[data-dsh-style="pixel8bit"] :where([data-active="true"], [data-selected="true"], [aria-selected="true"]) .dsh-pixel-cursor {
animation: dsh-pixel-cursor-nudge 760ms steps(2, end) infinite;
}
}
[data-dsh-style="mint"],
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="mint"], :has([data-dsh-style="mint"])) {
color-scheme: light;
accent-color: #0f766e;
--dsw-alias-bg-base: #f5fafb;
--dsw-alias-bg-layer-1: #eaf3f6;
--dsw-alias-bg-layer-2: #dcebf0;
--dsw-alias-bg-layer-3: #cce1e8;
--dsw-alias-bg-overlay: #fafdff;
--dsw-alias-bg-module-platform: #e3eff3;
--dsw-alias-settings-card-fill: #eef6f8;
--dsw-alias-settings-card-stroke: #c7dde5;
--dsw-specific-menu: rgba(250, 253, 255, 0.97);
--dsw-alias-border-l1: #d5e6ec;
--dsw-alias-border-l2: #bdd5de;
--dsw-alias-border-l3: #9ec0cd;
--dsw-alias-border-l4: #7faab9;
--dsw-alias-label-primary: #132a2e;
--dsw-alias-label-secondary: #426067;
--dsw-alias-label-tertiary: #628088;
--dsw-alias-label-dimmed: #7c98a0;
--dsw-alias-brand-primary: #0f766e;
--dsw-alias-brand-text: #132a2e;
--dsw-alias-state-business-primary: #0f766e;
--dsw-alias-state-business-tertiary: rgba(15, 118, 110, 0.13);
--dsw-alias-link: #0284c7;
--dsw-alias-button-primary-fill: #0f766e;
--dsw-alias-button-primary-hover: #0d635c;
--dsw-alias-button-primary-ink: #f5fafb;
--dsw-alias-interactive-bg-hover: rgba(15, 118, 110, 0.07);
--dsw-alias-interactive-bg-active: rgba(15, 118, 110, 0.13);
--dsw-alias-interactive-bg-hover-accent: rgba(2, 132, 199, 0.11);
--dsw-alias-interactive-bg-hover-danger: rgba(200, 50, 64, 0.11);
--dsw-alias-state-error-primary: #c83240;
--dsw-alias-state-warn-primary: #b4690e;
--dsw-alias-state-warn-label: #864c07;
--dsw-alias-state-warn-tertiary: #fdf1d6;
--dsw-alias-state-success-primary: #0f766e;
--dsh-mint-sky-accent: #0284c7;
--dsw-radius-xs: 6px;
--dsw-radius-sm: 9px;
--dsw-radius-md: 12px;
--dsw-radius-lg: 16px;
--dsw-radius-xl: 20px;
--dsw-elevation-panel: 0 3px 12px rgba(15, 76, 92, 0.07), 0 0 0 1px rgba(127, 170, 185, 0.28);
--dsw-elevation-prominent: 0 14px 34px rgba(15, 76, 92, 0.13), 0 2px 6px rgba(15, 76, 92, 0.05), 0 0 0 1px rgba(127, 170, 185, 0.34);
--dsh-control-border-width: 1px;
--dsh-button-hover-shadow: 0 2px 7px rgba(15, 118, 110, 0.11);
--dsh-card-hover-shadow: 0 8px 22px rgba(2, 132, 199, 0.10);
--dsh-surface-spotlight: rgba(2, 132, 199, 0.08);
--dsh-font-display: "Cascadia Code SemiBold", "Cascadia Code", "YouYuan", "幼圆", "Noto Sans SC", monospace;
--dsh-font-body: "Cascadia Code", "Cascadia Mono", "YouYuan", "幼圆", "Noto Sans SC", monospace;
--dsh-font-mono: "Cascadia Mono", "Cascadia Code", "YouYuan", "幼圆", Consolas, monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: 0.015em;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
[data-dsh-style="glass"],
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="glass"], :has([data-dsh-style="glass"])) {
color-scheme: light;
accent-color: #4f6df5;
--dsw-alias-bg-base: #f3f7ff;
--dsw-alias-bg-layer-1: rgba(255, 255, 255, 0.70);
--dsw-alias-bg-layer-2: rgba(240, 245, 255, 0.78);
--dsw-alias-bg-layer-3: rgba(226, 236, 255, 0.84);
--dsw-alias-bg-overlay: rgba(255, 255, 255, 0.84);
--dsw-alias-bg-module-platform: rgba(244, 248, 255, 0.76);
--dsw-alias-settings-card-fill: rgba(255, 255, 255, 0.70);
--dsw-alias-settings-card-stroke: rgba(255, 255, 255, 0.82);
--dsw-specific-menu: rgba(255, 255, 255, 0.86);
--dsw-alias-border-l1: rgba(148, 173, 219, 0.24);
--dsw-alias-border-l2: rgba(132, 159, 212, 0.34);
--dsw-alias-border-l3: rgba(114, 144, 204, 0.46);
--dsw-alias-border-l4: rgba(96, 128, 196, 0.56);
--dsw-alias-label-primary: #172033;
--dsw-alias-label-secondary: #4b5973;
--dsw-alias-label-tertiary: #6b7994;
--dsw-alias-label-dimmed: #8895ae;
--dsw-alias-brand-primary: #4f6df5;
--dsw-alias-brand-text: #172033;
--dsw-alias-state-business-primary: #4f6df5;
--dsw-alias-state-business-tertiary: rgba(79, 109, 245, 0.14);
--dsw-alias-link: #3b59e2;
--dsw-alias-button-primary-fill: #4f6df5;
--dsw-alias-button-primary-hover: #3f5de3;
--dsw-alias-button-primary-ink: #ffffff;
--dsw-alias-interactive-bg-hover: rgba(79, 109, 245, 0.08);
--dsw-alias-interactive-bg-active: rgba(79, 109, 245, 0.14);
--dsw-alias-interactive-bg-hover-accent: rgba(14, 165, 233, 0.12);
--dsw-alias-interactive-bg-hover-danger: rgba(220, 56, 82, 0.12);
--dsw-alias-state-error-primary: #d13850;
--dsw-alias-state-warn-primary: #c06a12;
--dsw-alias-state-warn-label: #8a4a09;
--dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.18);
--dsw-alias-state-success-primary: #15805d;
--dsw-radius-xs: 8px;
--dsw-radius-sm: 11px;
--dsw-radius-md: 15px;
--dsw-radius-lg: 18px;
--dsw-radius-xl: 22px;
--dsw-elevation-panel: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 4px 18px rgba(59, 92, 168, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.72);
--dsw-elevation-prominent: inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 16px 40px rgba(59, 92, 168, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.80);
--dsh-control-border-width: 1px;
--dsh-button-hover-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.92), 0 3px 10px rgba(79, 109, 245, 0.12);
--dsh-card-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 4px 16px rgba(59, 92, 168, 0.07);
--dsh-card-hover-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.96), 0 10px 26px rgba(59, 92, 168, 0.12);
--dsh-surface-spotlight: rgba(79, 109, 245, 0.08);
--dsh-font-display: "Cascadia Code SemiBold", "Cascadia Code", "YouYuan", "幼圆", "Noto Sans SC", monospace;
--dsh-font-body: "Cascadia Code", "Cascadia Mono", "YouYuan", "幼圆", "Noto Sans SC", monospace;
--dsh-font-mono: "Cascadia Mono", "Cascadia Code", "YouYuan", "幼圆", Consolas, monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: 0.015em;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
[data-dsh-style="glass"] {
background-color: #f3f7ff;
background-image:
radial-gradient(64% 58% at 12% 8%, rgba(125, 211, 252, 0.30) 0%, transparent 65%),
radial-gradient(58% 52% at 88% 14%, rgba(196, 181, 253, 0.28) 0%, transparent 65%),
radial-gradient(60% 55% at 52% 96%, rgba(153, 246, 228, 0.24) 0%, transparent 68%);
}
[data-dsh-style="glass"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel, .dsh-header, [data-dsh-header]),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="glass"], :has([data-dsh-style="glass"])) {
background: rgba(255, 255, 255, 0.70);
-webkit-backdrop-filter: blur(14px) saturate(140%);
backdrop-filter: blur(14px) saturate(140%);
box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 4px 16px rgba(59, 92, 168, 0.07);
}
@supports not (backdrop-filter: blur(1px)) {
[data-dsh-style="glass"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel, .dsh-header, [data-dsh-header]),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="glass"], :has([data-dsh-style="glass"])) {
background: rgba(255, 255, 255, 0.92);
}
}
[data-dsh-style="eink"],
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="eink"], :has([data-dsh-style="eink"])) {
color-scheme: light;
accent-color: #171716;
--dsw-alias-bg-base: #f2f1ec;
--dsw-alias-bg-layer-1: #eae8e1;
--dsw-alias-bg-layer-2: #e1dfd6;
--dsw-alias-bg-layer-3: #d6d3c9;
--dsw-alias-bg-overlay: #f7f6f2;
--dsw-alias-bg-module-platform: #eae8e1;
--dsw-alias-settings-card-fill: #f7f6f2;
--dsw-alias-settings-card-stroke: #9e9c93;
--dsw-specific-menu: #f7f6f2;
--dsw-alias-border-l1: #c5c2b8;
--dsw-alias-border-l2: #9e9c93;
--dsw-alias-border-l3: #78766e;
--dsw-alias-border-l4: #54534d;
--dsw-alias-label-primary: #171716;
--dsw-alias-label-secondary: #484742;
--dsw-alias-label-tertiary: #66645d;
--dsw-alias-label-dimmed: #807e76;
--dsw-alias-brand-primary: #171716;
--dsw-alias-brand-text: #171716;
--dsw-alias-state-business-primary: #171716;
--dsw-alias-state-business-tertiary: rgba(23, 23, 22, 0.10);
--dsw-alias-link: #171716;
--dsw-alias-button-primary-fill: #171716;
--dsw-alias-button-primary-hover: #2f2f2c;
--dsw-alias-button-primary-ink: #f7f6f2;
--dsw-alias-interactive-bg-hover: rgba(23, 23, 22, 0.06);
--dsw-alias-interactive-bg-active: rgba(23, 23, 22, 0.12);
--dsw-alias-interactive-bg-hover-accent: rgba(23, 23, 22, 0.08);
--dsw-alias-interactive-bg-hover-danger: rgba(23, 23, 22, 0.10);
--dsw-alias-state-error-primary: #2d2c28;
--dsw-alias-state-warn-primary: #45443e;
--dsw-alias-state-warn-label: #171716;
--dsw-alias-state-warn-tertiary: #e6e4db;
--dsw-alias-state-success-primary: #242422;
--dsw-radius-xs: 2px;
--dsw-radius-sm: 3px;
--dsw-radius-md: 4px;
--dsw-radius-lg: 4px;
--dsw-radius-xl: 4px;
--dsw-elevation-panel: 0 0 0 1px #9e9c93;
--dsw-elevation-prominent: 0 2px 0 #9e9c93, 0 0 0 1px #78766e;
--dsh-control-border-width: 1px;
--dsh-motion-fast: 60ms;
--dsh-motion-base: 60ms;
--dsh-motion-dialog: 60ms;
--dsh-button-shadow: none;
--dsh-button-hover-shadow: none;
--dsh-card-shadow: none;
--dsh-card-hover-shadow: none;
--dsh-surface-spotlight: rgba(23, 23, 22, 0.06);
--dsh-font-display: "Palatino Linotype", Georgia, "Noto Serif SC SemiBold", "Noto Serif SC", "STZhongsong", "华文中宋", serif;
--dsh-font-body: Georgia, "Noto Serif SC", "STSong", "华文宋体", serif;
--dsh-font-mono: "Cascadia Code", "Cascadia Mono", Consolas, monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: normal;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
[data-dsh-style="eink"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {
border: 1px solid #9e9c93;
box-shadow: none;
}
[data-dsh-style="eink"] :where([data-dsh-row], .dsh-row) {
border-block-end: 1px solid #c5c2b8;
}
[data-dsh-style="eink"] :where(button, [role="button"], [data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row) {
translate: none !important;
scale: none !important;
transition-duration: 60ms;
}
[data-dsh-style="blueprint"],
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="blueprint"], :has([data-dsh-style="blueprint"])) {
color-scheme: light;
accent-color: #e05a2b;
--dsw-alias-bg-base: #eaf3fb;
--dsw-alias-bg-layer-1: #f4f9fe;
--dsw-alias-bg-layer-2: #dfeef9;
--dsw-alias-bg-layer-3: #cfe3f4;
--dsw-alias-bg-overlay: #f7fbff;
--dsw-alias-bg-module-platform: #e3f0fa;
--dsw-alias-settings-card-fill: rgba(244, 249, 254, 0.92);
--dsw-alias-settings-card-stroke: #1b5e8a;
--dsw-specific-menu: rgba(247, 251, 255, 0.98);
--dsw-alias-border-l1: rgba(27, 94, 138, 0.28);
--dsw-alias-border-l2: #1b5e8a;
--dsw-alias-border-l3: #0d3b66;
--dsw-alias-border-l4: #092b4c;
--dsw-alias-label-primary: #0d3b66;
--dsw-alias-label-secondary: #1d4e78;
--dsw-alias-label-tertiary: #3b6f99;
--dsw-alias-label-dimmed: #5b89ad;
--dsw-alias-brand-primary: #e05a2b;
--dsw-alias-brand-text: #0d3b66;
--dsw-alias-state-business-primary: #e05a2b;
--dsw-alias-state-business-tertiary: rgba(224, 90, 43, 0.14);
--dsw-alias-link: #0d3b66;
--dsw-alias-button-primary-fill: #e05a2b;
--dsw-alias-button-primary-hover: #c94b20;
--dsw-alias-button-primary-ink: #ffffff;
--dsw-alias-interactive-bg-hover: rgba(27, 94, 138, 0.08);
--dsw-alias-interactive-bg-active: rgba(224, 90, 43, 0.13);
--dsw-alias-interactive-bg-hover-accent: rgba(224, 90, 43, 0.12);
--dsw-alias-interactive-bg-hover-danger: rgba(185, 45, 38, 0.12);
--dsw-alias-state-error-primary: #b92d26;
--dsw-alias-state-warn-primary: #c05614;
--dsw-alias-state-warn-label: #7c3408;
--dsw-alias-state-warn-tertiary: #fce9d8;
--dsw-alias-state-success-primary: #156d5b;
--dsw-radius-xs: 2px;
--dsw-radius-sm: 2px;
--dsw-radius-md: 3px;
--dsw-radius-lg: 4px;
--dsw-radius-xl: 4px;
--dsw-elevation-panel: 0 0 0 1px #1b5e8a;
--dsw-elevation-prominent: 0 8px 24px rgba(13, 59, 102, 0.14), 0 0 0 1px #1b5e8a;
--dsh-control-border-width: 1px;
--dsh-button-shadow: none;
--dsh-button-hover-shadow: 0 2px 0 #1b5e8a;
--dsh-card-shadow: 0 0 0 1px #1b5e8a;
--dsh-card-hover-shadow: 0 3px 0 #1b5e8a;
--dsh-surface-spotlight: rgba(27, 94, 138, 0.09);
--dsh-font-display: "Cascadia Mono SemiBold", "Cascadia Mono", "STZhongsong", "华文中宋", "FangSong", "仿宋", monospace;
--dsh-font-body: "Cascadia Mono", "STFangsong", "华文仿宋", "FangSong", "仿宋", monospace;
--dsh-font-mono: "Cascadia Mono", "STFangsong", "华文仿宋", "FangSong", "仿宋", monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: 0.02em;
--dsh-body-tracking: 0.02em;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
[data-dsh-style="blueprint"] {
background-color: #eaf3fb;
background-image:
linear-gradient(to right, rgba(18, 78, 120, 0.09) 1px, transparent 1px),
linear-gradient(to bottom, rgba(18, 78, 120, 0.09) 1px, transparent 1px),
linear-gradient(to right, rgba(18, 78, 120, 0.045) 1px, transparent 1px),
linear-gradient(to bottom, rgba(18, 78, 120, 0.045) 1px, transparent 1px);
background-size: 24px 24px, 24px 24px, 6px 6px, 6px 6px;
}
[data-dsh-style="blueprint"] :where(.dsh-header, [data-dsh-header], .dsh-wb-header) {
background: rgba(244, 249, 254, 0.90);
border-block-end: 1px solid #1b5e8a;
}
[data-dsh-style="blueprint"] :where([data-dsh-card], .dsh-card) {
position: relative;
border: 1px solid #1b5e8a;
background: rgba(244, 249, 254, 0.92);
}
[data-dsh-style="blueprint"] :where([data-dsh-card], .dsh-card):not([role="tab"])::after {
content: "+";
position: absolute;
inset-block-start: 4px;
inset-inline-end: 6px;
font-family: ui-monospace, "Cascadia Mono", Menlo, Consolas, monospace;
font-size: 11px;
line-height: 1;
color: #e05a2b;
opacity: 0.78;
pointer-events: none;
}
[data-dsh-style="blueprint"] :where(button:not([role="tab"]), .dsh-btn) {
border: 1px solid #1b5e8a;
}
[data-dsh-style="risograph"],
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="risograph"], :has([data-dsh-style="risograph"])) {
color-scheme: light;
accent-color: #ff3e7f;
--dsw-alias-bg-base: #faf6ee;
--dsw-alias-bg-layer-1: #f5efe2;
--dsw-alias-bg-layer-2: #ede4d1;
--dsw-alias-bg-layer-3: #e3d7be;
--dsw-alias-bg-overlay: #fffdf7;
--dsw-alias-bg-module-platform: #f5efe2;
--dsw-alias-settings-card-fill: #fffdf7;
--dsw-alias-settings-card-stroke: #18181b;
--dsw-specific-menu: #fffdf7;
--dsw-alias-border-l1: #d4cbb8;
--dsw-alias-border-l2: #18181b;
--dsw-alias-border-l3: #18181b;
--dsw-alias-border-l4: #18181b;
--dsw-alias-label-primary: #18181b;
--dsw-alias-label-secondary: #3f3f46;
--dsw-alias-label-tertiary: #52525b;
--dsw-alias-label-dimmed: #71717a;
--dsw-alias-brand-primary: #ff3e7f;
--dsw-alias-brand-text: #18181b;
--dsw-alias-state-business-primary: #ff3e7f;
--dsw-alias-state-business-tertiary: rgba(255, 62, 127, 0.14);
--dsw-alias-link: #2563eb;
--dsw-alias-button-primary-fill: #ff3e7f;
--dsw-alias-button-primary-hover: #e62e6d;
--dsw-alias-button-primary-ink: #ffffff;
--dsw-alias-interactive-bg-hover: rgba(253, 224, 71, 0.38);
--dsw-alias-interactive-bg-active: #fde047;
--dsw-alias-interactive-bg-hover-accent: rgba(37, 99, 235, 0.14);
--dsw-alias-interactive-bg-hover-danger: rgba(255, 62, 127, 0.18);
--dsw-alias-state-error-primary: #dc2626;
--dsw-alias-state-warn-primary: #ca8a04;
--dsw-alias-state-warn-label: #713f12;
--dsw-alias-state-warn-tertiary: #fef08a;
--dsw-alias-state-success-primary: #15803d;
--dsw-radius-xs: 3px;
--dsw-radius-sm: 4px;
--dsw-radius-md: 6px;
--dsw-radius-lg: 8px;
--dsw-radius-xl: 10px;
--dsw-elevation-panel: 4px 4px 0px #2563eb;
--dsw-elevation-prominent: 4px 4px 0px #ff3e7f;
--dsh-control-border-width: 2px;
--dsh-button-shadow: 3px 3px 0px #18181b;
--dsh-button-hover-shadow: 4px 4px 0px #2563eb;
--dsh-card-shadow: 4px 4px 0px #2563eb;
--dsh-card-hover-shadow: 5px 5px 0px #ff3e7f;
--dsh-surface-spotlight: rgba(253, 224, 71, 0.35);
--dsh-font-display: Impact, "Arial Black", "Noto Sans SC Black", "SimHei", "黑体", sans-serif;
--dsh-font-body: "Source Sans 3", "Noto Sans SC Medium", "Noto Sans SC", sans-serif;
--dsh-font-mono: "Cascadia Code", "Cascadia Mono", Consolas, monospace;
--dsh-display-weight: 900;
--dsh-display-tracking: -0.02em;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
[data-dsh-style="risograph"] :where(.dsh-header, [data-dsh-header], .dsh-wb-header) {
background-color: #fffdf7;
background-image: radial-gradient(rgba(255, 62, 127, 0.15) 1px, transparent 0);
background-size: 7px 7px;
border-block-end: 2px solid #18181b;
}
[data-dsh-style="risograph"] :where(button:not([role="tab"]), .dsh-btn),
:where([role="dialog"], [role="alertdialog"], dialog):where([data-dsh-style="risograph"], :has([data-dsh-style="risograph"])) :where(button:not([role="tab"]), .dsh-btn) {
border: 2px solid #18181b;
box-shadow: 3px 3px 0px #18181b;
}
[data-dsh-style="risograph"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {
border: 2px solid #18181b;
box-shadow: 4px 4px 0px #2563eb;
}
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="risograph"], :has([data-dsh-style="risograph"])) {
border: 2px solid #18181b !important;
box-shadow: 4px 4px 0px #ff3e7f !important;
}
[data-dsh-style="risograph"] [role="tab"][aria-selected="true"] {
background: #fde047;
color: #18181b;
font-weight: 700;
}
[data-dsh-style="risograph"] [role="tab"][aria-selected="true"]::after,
[data-dsh-style="risograph"] .dsh-tab-indicator {
border-block-end-color: #ff3e7f;
border-block-end-width: 3px;
}
[data-dsh-style="win98"],
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="win98"], :has([data-dsh-style="win98"])) {
color-scheme: light;
accent-color: #1b4f9c;
--dsw-alias-bg-base: #dcdcdc;
--dsw-alias-bg-layer-1: #e4e4e4;
--dsw-alias-bg-layer-2: #d0d0d0;
--dsw-alias-bg-layer-3: #c0c0c0;
--dsw-alias-bg-overlay: #e4e4e4;
--dsw-alias-bg-module-platform: #d4d4d4;
--dsw-alias-settings-card-fill: #ffffff;
--dsw-alias-settings-card-stroke: #808080;
--dsw-specific-menu: #dcdcdc;
--dsw-alias-border-l1: #b8b8b8;
--dsw-alias-border-l2: #808080;
--dsw-alias-border-l3: #5a5a5a;
--dsw-alias-border-l4: #222222;
--dsw-alias-label-primary: #111111;
--dsw-alias-label-secondary: #333333;
--dsw-alias-label-tertiary: #555555;
--dsw-alias-label-dimmed: #767676;
--dsw-alias-brand-primary: #1b4f9c;
--dsw-alias-brand-text: #111111;
--dsw-alias-state-business-primary: #1b4f9c;
--dsw-alias-state-business-tertiary: rgba(27, 79, 156, 0.14);
--dsw-alias-link: #0b3c88;
--dsw-alias-button-primary-fill: #1b4f9c;
--dsw-alias-button-primary-hover: #245cb0;
--dsw-alias-button-primary-ink: #ffffff;
--dsw-alias-interactive-bg-hover: rgba(27, 79, 156, 0.09);
--dsw-alias-interactive-bg-active: rgba(27, 79, 156, 0.16);
--dsw-alias-interactive-bg-hover-accent: rgba(59, 130, 196, 0.15);
--dsw-alias-interactive-bg-hover-danger: rgba(185, 28, 28, 0.13);
--dsw-alias-state-error-primary: #b91c1c;
--dsw-alias-state-warn-primary: #9a5b08;
--dsw-alias-state-warn-label: #6e3f04;
--dsw-alias-state-warn-tertiary: #fef3c7;
--dsw-alias-state-success-primary: #166534;
--dsw-radius-xs: 0px;
--dsw-radius-sm: 0px;
--dsw-radius-md: 0px;
--dsw-radius-lg: 0px;
--dsw-radius-xl: 0px;
--dsw-corner-shape: square;
--dsw-elevation-panel: inset 1.5px 1.5px 0 #ffffff, inset -1.5px -1.5px 0 #5a5a5a, inset 2.5px 2.5px 0 #f4f4f4, inset -2.5px -2.5px 0 #9a9a9a;
--dsw-elevation-prominent: inset 1.5px 1.5px 0 #ffffff, inset -1.5px -1.5px 0 #5a5a5a, inset 2.5px 2.5px 0 #f4f4f4, inset -2.5px -2.5px 0 #9a9a9a, 4px 4px 12px rgba(0, 0, 0, 0.18);
--dsh-control-border-width: 1px;
--dsh-button-shadow: inset 1.5px 1.5px 0 #ffffff, inset -1.5px -1.5px 0 #5a5a5a, inset 2.5px 2.5px 0 #f4f4f4, inset -2.5px -2.5px 0 #9a9a9a;
--dsh-button-hover-shadow: inset 1.5px 1.5px 0 #ffffff, inset -1.5px -1.5px 0 #5a5a5a, inset 2.5px 2.5px 0 #f4f4f4, inset -2.5px -2.5px 0 #9a9a9a;
--dsh-card-shadow: inset 1.5px 1.5px 0 #808080, inset -1.5px -1.5px 0 #ffffff, inset 2.5px 2.5px 0 #5a5a5a, inset -2.5px -2.5px 0 #dcdcdc;
--dsh-card-hover-shadow: inset 1.5px 1.5px 0 #808080, inset -1.5px -1.5px 0 #ffffff, inset 2.5px 2.5px 0 #5a5a5a, inset -2.5px -2.5px 0 #dcdcdc;
--dsh-surface-spotlight: rgba(27, 79, 156, 0.10);
--dsh-font-display: Tahoma, "SimSun", "NSimSun", "宋体", "新宋体", sans-serif;
--dsh-font-body: Tahoma, "SimSun", "NSimSun", "宋体", "新宋体", sans-serif;
--dsh-font-mono: "Fixedsys", Consolas, "Courier New", "SimSun", "宋体", monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: normal;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
[data-dsh-style="win98"] :where(button, input, select, textarea, [role="button"], [role="tab"], [role="menuitem"], [role="menuitemradio"], [data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="win98"], :has([data-dsh-style="win98"])),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="win98"], :has([data-dsh-style="win98"])) :where(button, input, select, textarea, [role="menuitem"], [role="menuitemradio"]) {
border-radius: 0px !important;
corner-shape: square;
}
[data-dsh-style="win98"] :where(button:not([role="tab"]), .dsh-btn),
:where([role="dialog"], [role="alertdialog"], dialog):where([data-dsh-style="win98"], :has([data-dsh-style="win98"])) :where(button:not([role="tab"]), .dsh-btn) {
border: 0;
background-color: #dcdcdc;
box-shadow: inset 1.5px 1.5px 0 #ffffff, inset -1.5px -1.5px 0 #5a5a5a, inset 2.5px 2.5px 0 #f4f4f4, inset -2.5px -2.5px 0 #9a9a9a;
}
[data-dsh-style="win98"] :where(.dsh-wb-btn-primary, .dsh-btn-primary) {
background-color: #1b4f9c;
color: #ffffff;
box-shadow: inset 1.5px 1.5px 0 #6ca0e8, inset -1.5px -1.5px 0 #0d2b57, inset 2.5px 2.5px 0 #4a82d1, inset -2.5px -2.5px 0 #143c78;
}
[data-dsh-style="win98"] :where(button, [role="button"]):is(:active, [aria-pressed="true"], [aria-expanded="true"]):not(:disabled):not([aria-disabled="true"]),
[data-dsh-style="win98"] [role="tab"][aria-selected="true"],
:where([role="dialog"], [role="alertdialog"], dialog):where([data-dsh-style="win98"], :has([data-dsh-style="win98"])) :where(button, [role="button"]):is(:active, [aria-pressed="true"]):not(:disabled):not([aria-disabled="true"]) {
translate: 0px 0px !important;
scale: 1 !important;
background-color: #e4e4e4;
box-shadow: inset 1.5px 1.5px 0 #5a5a5a, inset -1.5px -1.5px 0 #ffffff, inset 2.5px 2.5px 0 #9a9a9a, inset -2.5px -2.5px 0 #f4f4f4 !important;
}
[data-dsh-style="win98"] :where([data-dsh-card], .dsh-card, input:not([type="checkbox"]):not([type="radio"]):not([type="range"]), select, textarea) {
border: 0;
background: #ffffff;
box-shadow: inset 1.5px 1.5px 0 #808080, inset -1.5px -1.5px 0 #ffffff, inset 2.5px 2.5px 0 #5a5a5a, inset -2.5px -2.5px 0 #dcdcdc;
}
[data-dsh-style="win98"] :where(.dsh-header, [data-dsh-header], .pageHeader, .dsh-wb-header, .topbar) {
background: linear-gradient(180deg, #ececec 0%, #dcdcdc 100%) !important;
color: #111111;
border-block-start: 3px solid #1b4f9c !important;
border-block-end: 2px solid #808080;
box-shadow: inset 0 1px 0 #ffffff, inset 0 -1px 0 #808080;
}
[data-dsh-style="win98"] .dsh-header-badge {
background: linear-gradient(90deg, #1b4f9c 0%, #3b82c4 100%);
color: #ffffff;
}
:where([role="dialog"], [role="alertdialog"], dialog):where([data-dsh-style="win98"], :has([data-dsh-style="win98"])) header {
background: linear-gradient(90deg, #1b4f9c 0%, #3b82c4 100%);
color: #ffffff;
}
:where([role="dialog"], [role="alertdialog"], dialog):where([data-dsh-style="win98"], :has([data-dsh-style="win98"])) header h2 {
color: #ffffff;
}
[data-dsh-style="songhui"],
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="songhui"], :has([data-dsh-style="songhui"])) {
color-scheme: light;
accent-color: #b83b2a;
--dsw-alias-bg-base: #f7f3e8;
--dsw-alias-bg-layer-1: #f0ead9;
--dsw-alias-bg-layer-2: #e7dec8;
--dsw-alias-bg-layer-3: #dcd0b4;
--dsw-alias-bg-overlay: #fbf9f2;
--dsw-alias-bg-module-platform: #ede6d4;
--dsw-alias-settings-card-fill: #fbf9f2;
--dsw-alias-settings-card-stroke: #d4c4a2;
--dsw-specific-menu: #fbf9f2;
--dsw-alias-border-l1: #e4dac2;
--dsw-alias-border-l2: #cfbda0;
--dsw-alias-border-l3: #b8a382;
--dsw-alias-border-l4: #9d8765;
--dsw-alias-label-primary: #252019;
--dsw-alias-label-secondary: #5c5142;
--dsw-alias-label-tertiary: #7d705e;
--dsw-alias-label-dimmed: #998c79;
--dsw-alias-brand-primary: #b83b2a;
--dsw-alias-brand-text: #252019;
--dsw-alias-state-business-primary: #b83b2a;
--dsw-alias-state-business-tertiary: rgba(184, 59, 42, 0.12);
--dsw-alias-link: #9e2f20;
--dsw-alias-button-primary-fill: #b83b2a;
--dsw-alias-button-primary-hover: #9f3021;
--dsw-alias-button-primary-ink: #fbf9f2;
--dsw-alias-interactive-bg-hover: rgba(184, 59, 42, 0.065);
--dsw-alias-interactive-bg-active: rgba(184, 59, 42, 0.13);
--dsw-alias-interactive-bg-hover-accent: rgba(184, 59, 42, 0.11);
--dsw-alias-interactive-bg-hover-danger: rgba(184, 59, 42, 0.15);
--dsw-alias-state-error-primary: #a62b1c;
--dsw-alias-state-warn-primary: #9c6216;
--dsw-alias-state-warn-label: #704309;
--dsw-alias-state-warn-tertiary: #f7ecd1;
--dsw-alias-state-success-primary: #2e664b;
--dsw-radius-xs: 2px;
--dsw-radius-sm: 2px;
--dsw-radius-md: 3px;
--dsw-radius-lg: 4px;
--dsw-radius-xl: 4px;
--dsw-elevation-panel: 0 2px 10px rgba(66, 52, 32, 0.06), 0 0 0 1px #cfbda0;
--dsw-elevation-prominent: 0 12px 30px rgba(66, 52, 32, 0.14), 0 0 0 1px #b8a382;
--dsh-control-border-width: 1px;
--dsh-button-hover-shadow: 0 2px 6px rgba(184, 59, 42, 0.12);
--dsh-card-shadow: 0 1px 2px rgba(66, 52, 32, 0.05);
--dsh-card-hover-shadow: 0 6px 16px rgba(66, 52, 32, 0.09);
--dsh-surface-spotlight: rgba(184, 59, 42, 0.07);
--dsh-font-display: "STZhongsong", "华文中宋", "Noto Serif SC Black", "SimSun", "宋体", serif;
--dsh-font-body: "Palatino Linotype", "STKaiti", "华文楷体", "KaiTi", "楷体", "Noto Serif SC", serif;
--dsh-font-mono: "Cascadia Mono", Consolas, "STFangsong", "华文仿宋", monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: 0.04em;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
[data-dsh-style="songhui"] {
background-color: #f7f3e8;
background-image:
radial-gradient(rgba(196, 152, 64, 0.18) 1px, transparent 0),
radial-gradient(rgba(196, 152, 64, 0.11) 0.75px, transparent 0);
background-size: 18px 18px, 29px 29px;
background-position: 0 0, 9px 7px;
}
[data-dsh-style="songhui"] :where(.pageHeader, .dsh-header, [data-dsh-header], .dsh-wb-header) {
background: rgba(251, 249, 242, 0.90);
border-block-end: 3px double #b83b2a;
}
[data-dsh-style="songhui"] :where(.dsh-wb-btn-primary, .dsh-btn-primary, .dsh-header-badge) {
background: #b83b2a;
color: #fbf9f2;
border-color: #9e2f20;
border-radius: 2px;
box-shadow: inset 0 0 0 1px rgba(251, 249, 242, 0.28);
}
[data-dsh-style="frutiger"],
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="frutiger"], :has([data-dsh-style="frutiger"])) {
color-scheme: light;
accent-color: #0284c7;
--dsw-alias-bg-base: #eaf7ff;
--dsw-alias-bg-layer-1: rgba(255, 255, 255, 0.78);
--dsw-alias-bg-layer-2: rgba(232, 246, 255, 0.86);
--dsw-alias-bg-layer-3: rgba(209, 236, 255, 0.90);
--dsw-alias-bg-overlay: rgba(248, 253, 255, 0.93);
--dsw-alias-bg-module-platform: rgba(232, 246, 255, 0.84);
--dsw-alias-settings-card-fill: rgba(255, 255, 255, 0.82);
--dsw-alias-settings-card-stroke: rgba(56, 189, 248, 0.44);
--dsw-specific-menu: rgba(248, 253, 255, 0.95);
--dsw-alias-border-l1: rgba(56, 189, 248, 0.26);
--dsw-alias-border-l2: rgba(14, 165, 233, 0.36);
--dsw-alias-border-l3: rgba(2, 132, 199, 0.48);
--dsw-alias-border-l4: rgba(3, 105, 161, 0.58);
--dsw-alias-label-primary: #0c2b45;
--dsw-alias-label-secondary: #275373;
--dsw-alias-label-tertiary: #487596;
--dsw-alias-label-dimmed: #6c96b5;
--dsw-alias-brand-primary: #0284c7;
--dsw-alias-brand-text: #0c2b45;
--dsw-alias-state-business-primary: #0284c7;
--dsw-alias-state-business-tertiary: rgba(14, 165, 233, 0.16);
--dsw-alias-link: #0369a1;
--dsw-alias-button-primary-fill: #0284c7;
--dsw-alias-button-primary-hover: #0369a1;
--dsw-alias-button-primary-ink: #ffffff;
--dsw-alias-interactive-bg-hover: rgba(14, 165, 233, 0.10);
--dsw-alias-interactive-bg-active: rgba(14, 165, 233, 0.18);
--dsw-alias-interactive-bg-hover-accent: rgba(56, 189, 248, 0.16);
--dsw-alias-interactive-bg-hover-danger: rgba(220, 56, 82, 0.13);
--dsw-alias-state-error-primary: #c83244;
--dsw-alias-state-warn-primary: #c06a12;
--dsw-alias-state-warn-label: #8a4a09;
--dsw-alias-state-warn-tertiary: #fef0d6;
--dsw-alias-state-success-primary: #0f766e;
--dsw-radius-xs: 10px;
--dsw-radius-sm: 999px;
--dsw-radius-md: 18px;
--dsw-radius-lg: 22px;
--dsw-radius-xl: 26px;
--dsw-elevation-panel: inset 0 1.5px 0 rgba(255, 255, 255, 0.92), 0 6px 20px rgba(14, 165, 233, 0.12), 0 0 0 1px rgba(56, 189, 248, 0.36);
--dsw-elevation-prominent: inset 0 1.5px 0 rgba(255, 255, 255, 0.95), 0 16px 38px rgba(14, 165, 233, 0.18), 0 0 0 1px rgba(56, 189, 248, 0.44);
--dsh-control-border-width: 1px;
--dsh-button-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.92), 0 2px 6px rgba(14, 165, 233, 0.12);
--dsh-button-hover-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.96), 0 4px 12px rgba(2, 132, 199, 0.22);
--dsh-card-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.92), 0 6px 20px rgba(14, 165, 233, 0.10);
--dsh-card-hover-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.98), 0 10px 26px rgba(2, 132, 199, 0.16);
--dsh-surface-spotlight: rgba(14, 165, 233, 0.10);
--dsh-font-display: "Cascadia Code SemiBold", "Cascadia Code", "YouYuan", "幼圆", "Noto Sans SC", monospace;
--dsh-font-body: "Cascadia Code", "Cascadia Mono", "YouYuan", "幼圆", "Noto Sans SC", monospace;
--dsh-font-mono: "Cascadia Mono", "Cascadia Code", "YouYuan", "幼圆", Consolas, monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: 0.015em;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
[data-dsh-style="frutiger"] {
background-color: #eaf7ff;
background-image:
radial-gradient(60% 48% at 15% 6%, rgba(125, 211, 252, 0.34) 0%, transparent 65%),
linear-gradient(180deg, #eaf7ff 0%, #f4fbff 55%, #e5f5fe 100%);
}
[data-dsh-style="frutiger"] :where(button:not([role="tab"]), .dsh-btn),
:where([role="dialog"], [role="alertdialog"], dialog):where([data-dsh-style="frutiger"], :has([data-dsh-style="frutiger"])) :where(button:not([role="tab"]), .dsh-btn) {
border-radius: 999px;
border: 1px solid rgba(14, 165, 233, 0.42);
background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(224, 244, 255, 0.88) 49%, rgba(204, 236, 255, 0.92) 51%, rgba(235, 249, 255, 0.96) 100%);
box-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.92), 0 2px 6px rgba(14, 165, 233, 0.12);
}
[data-dsh-style="frutiger"] :where(.dsh-wb-btn-primary, .dsh-btn-primary, .dsh-header-badge) {
border-radius: 999px;
border: 1px solid #0284c7;
color: #ffffff;
background: linear-gradient(180deg, #7dd3fc 0%, #0ea5e9 48%, #0284c7 52%, #38bdf8 100%);
box-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.88), 0 3px 10px rgba(2, 132, 199, 0.24);
}
[data-dsh-style="frutiger"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel, .dsh-header, [data-dsh-header]) {
background: linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(240, 250, 255, 0.78) 100%);
-webkit-backdrop-filter: blur(10px) saturate(130%);
backdrop-filter: blur(10px) saturate(130%);
box-shadow: var(--dsh-card-shadow);
}
[data-dsh-style="gazette"],
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="gazette"], :has([data-dsh-style="gazette"])) {
color-scheme: light;
accent-color: #9b1c1c;
--dsw-alias-bg-base: #f6f3ec;
--dsw-alias-bg-layer-1: #ede8dd;
--dsw-alias-bg-layer-2: #e3dccd;
--dsw-alias-bg-layer-3: #d6cebc;
--dsw-alias-bg-overlay: #faf8f3;
--dsw-alias-bg-module-platform: #ebe5d8;
--dsw-alias-settings-card-fill: #faf8f3;
--dsw-alias-settings-card-stroke: #161514;
--dsw-specific-menu: #faf8f3;
--dsw-alias-border-l1: #cec6b6;
--dsw-alias-border-l2: #161514;
--dsw-alias-border-l3: #161514;
--dsw-alias-border-l4: #161514;
--dsw-alias-label-primary: #161514;
--dsw-alias-label-secondary: #43403c;
--dsw-alias-label-tertiary: #635f59;
--dsw-alias-label-dimmed: #827d75;
--dsw-alias-brand-primary: #9b1c1c;
--dsw-alias-brand-text: #161514;
--dsw-alias-state-business-primary: #9b1c1c;
--dsw-alias-state-business-tertiary: rgba(155, 28, 28, 0.12);
--dsw-alias-link: #9b1c1c;
--dsw-alias-button-primary-fill: #161514;
--dsw-alias-button-primary-hover: #2d2b28;
--dsw-alias-button-primary-ink: #faf8f3;
--dsw-alias-interactive-bg-hover: rgba(22, 21, 20, 0.06);
--dsw-alias-interactive-bg-active: rgba(155, 28, 28, 0.11);
--dsw-alias-interactive-bg-hover-accent: rgba(155, 28, 28, 0.10);
--dsw-alias-interactive-bg-hover-danger: rgba(155, 28, 28, 0.14);
--dsw-alias-state-error-primary: #9b1c1c;
--dsw-alias-state-warn-primary: #9a5b08;
--dsw-alias-state-warn-label: #6e3f04;
--dsw-alias-state-warn-tertiary: #f6ead2;
--dsw-alias-state-success-primary: #1f5c3a;
--dsw-radius-xs: 0px;
--dsw-radius-sm: 1px;
--dsw-radius-md: 2px;
--dsw-radius-lg: 2px;
--dsw-radius-xl: 2px;
--dsw-elevation-panel: 0 1px 0 #161514, 0 0 0 1px #161514;
--dsw-elevation-prominent: 3px 3px 0 #161514, 0 0 0 1px #161514;
--dsh-control-border-width: 1px;
--dsh-button-shadow: none;
--dsh-button-hover-shadow: 0 2px 0 #161514;
--dsh-card-shadow: none;
--dsh-card-hover-shadow: 2px 2px 0 #161514;
--dsh-surface-spotlight: rgba(155, 28, 28, 0.06);
--dsh-font-display: Garamond, Georgia, "STZhongsong", "华文中宋", "Noto Serif SC Black", serif;
--dsh-font-body: Georgia, "Noto Serif SC", "STSong", "华文宋体", serif;
--dsh-font-mono: "Cascadia Mono", Consolas, "Courier New", monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: -0.01em;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
[data-dsh-style="gazette"] {
background-color: #f6f3ec;
}
[data-dsh-style="gazette"] :where(.pageHeader, .dsh-header, [data-dsh-header], .dsh-wb-header) {
background: #faf8f3;
border-block-end: 4px double #161514;
}
[data-dsh-style="gazette"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {
background: #faf8f3;
border: 1px solid #161514;
border-radius: 2px;
box-shadow: none;
}
[data-dsh-style="gazette"] :where([data-dsh-row], .dsh-row) {
border-block-end: 1px solid #161514;
}
[data-dsh-style="gazette"] .dsh-split-leading {
border-inline-end: 1px solid #161514;
}
[data-dsh-style="gazette"] .dsh-split-resizer::before {
background: #161514;
}
[data-dsh-style="gazette"] :where(button:not([role="tab"]), .dsh-btn),
:where([role="dialog"], [role="alertdialog"], dialog):where([data-dsh-style="gazette"], :has([data-dsh-style="gazette"])) :where(button:not([role="tab"]), .dsh-btn) {
border: 1px solid #161514;
border-radius: 1px;
}
[data-dsh-style="gazette"] :where(.dsh-wb-btn-primary, .dsh-btn-primary) {
background: #161514;
color: #faf8f3;
border-color: #161514;
}
[data-dsh-style="gazette"] :where(.dsh-wb-btn-primary, .dsh-btn-primary):hover:not(:disabled) {
background: #9b1c1c;
border-color: #9b1c1c;
}
[data-dsh-style="gazette"] .dsh-header-badge {
background: #9b1c1c;
color: #faf8f3;
border-radius: 1px;
}
[data-dsh-style="gazette"] [role="tab"][aria-selected="true"]::after,
[data-dsh-style="gazette"] .dsh-tab-indicator {
border-block-end-color: #9b1c1c;
border-block-end-width: 2.5px;
}
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="gazette"], :has([data-dsh-style="gazette"])) {
border: 1px solid #161514 !important;
border-radius: 2px !important;
}
:root[data-dsh-font="songkai"] [data-dsh-style],
:root[data-dsh-font="songkai"] [data-dsh-portal-synced],
:root[data-dsh-font="songkai"] :where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):has([data-dsh-style]),
[data-dsh-style][data-dsh-font="songkai"],
[data-dsh-portal-synced][data-dsh-font="songkai"] {
--dsh-font-display: "STZhongsong", "华文中宋", "Noto Serif SC Black", "SimSun", "宋体", serif;
--dsh-font-body: "Palatino Linotype", "STKaiti", "华文楷体", "KaiTi", "楷体", "Noto Serif SC", serif;
--dsh-font-mono: "Cascadia Mono", Consolas, "STFangsong", "华文仿宋", monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: 0.04em;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
:root[data-dsh-font="fangsong"] [data-dsh-style],
:root[data-dsh-font="fangsong"] [data-dsh-portal-synced],
:root[data-dsh-font="fangsong"] :where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):has([data-dsh-style]),
[data-dsh-style][data-dsh-font="fangsong"],
[data-dsh-portal-synced][data-dsh-font="fangsong"] {
--dsh-font-display: "Cascadia Mono SemiBold", "Cascadia Mono", "STZhongsong", "华文中宋", "FangSong", "仿宋", monospace;
--dsh-font-body: "Cascadia Mono", "STFangsong", "华文仿宋", "FangSong", "仿宋", monospace;
--dsh-font-mono: "Cascadia Mono", "STFangsong", "华文仿宋", "FangSong", "仿宋", monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: 0.02em;
--dsh-body-tracking: 0.02em;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
:root[data-dsh-font="poster"] [data-dsh-style],
:root[data-dsh-font="poster"] [data-dsh-portal-synced],
:root[data-dsh-font="poster"] :where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):has([data-dsh-style]),
[data-dsh-style][data-dsh-font="poster"],
[data-dsh-portal-synced][data-dsh-font="poster"] {
--dsh-font-display: Impact, "Arial Black", "Noto Sans SC Black", "SimHei", "黑体", sans-serif;
--dsh-font-body: "Source Sans 3", "Noto Sans SC Medium", "Noto Sans SC", sans-serif;
--dsh-font-mono: "Cascadia Code", "Cascadia Mono", Consolas, monospace;
--dsh-display-weight: 900;
--dsh-display-tracking: -0.02em;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
:root[data-dsh-font="retro98"] [data-dsh-style],
:root[data-dsh-font="retro98"] [data-dsh-portal-synced],
:root[data-dsh-font="retro98"] :where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):has([data-dsh-style]),
[data-dsh-style][data-dsh-font="retro98"],
[data-dsh-portal-synced][data-dsh-font="retro98"] {
--dsh-font-display: Tahoma, "SimSun", "NSimSun", "宋体", "新宋体", sans-serif;
--dsh-font-body: Tahoma, "SimSun", "NSimSun", "宋体", "新宋体", sans-serif;
--dsh-font-mono: "Fixedsys", Consolas, "Courier New", "SimSun", "宋体", monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: normal;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
:root[data-dsh-font="serif"] [data-dsh-style],
:root[data-dsh-font="serif"] [data-dsh-portal-synced],
:root[data-dsh-font="serif"] :where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):has([data-dsh-style]),
[data-dsh-style][data-dsh-font="serif"],
[data-dsh-portal-synced][data-dsh-font="serif"] {
--dsh-font-display: "Palatino Linotype", Georgia, "Noto Serif SC SemiBold", "Noto Serif SC", "STZhongsong", "华文中宋", serif;
--dsh-font-body: Georgia, "Noto Serif SC", "STSong", "华文宋体", serif;
--dsh-font-mono: "Cascadia Code", "Cascadia Mono", Consolas, monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: -0.01em;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
:root[data-dsh-font="arcade"] [data-dsh-style],
:root[data-dsh-font="arcade"] [data-dsh-portal-synced],
:root[data-dsh-font="arcade"] :where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):has([data-dsh-style]),
[data-dsh-style][data-dsh-font="arcade"],
[data-dsh-portal-synced][data-dsh-font="arcade"] {
--dsh-font-display: "Cascadia Code SemiBold", "Cascadia Code", "YouYuan", "幼圆", "Noto Sans SC", monospace;
--dsh-font-body: "Cascadia Code", "Cascadia Mono", "YouYuan", "幼圆", "Noto Sans SC", monospace;
--dsh-font-mono: "Cascadia Mono", "Cascadia Code", "YouYuan", "幼圆", Consolas, monospace;
--dsh-display-weight: 700;
--dsh-display-tracking: 0.015em;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
:root[data-dsh-font="modern"] [data-dsh-style],
:root[data-dsh-font="modern"] [data-dsh-portal-synced],
:root[data-dsh-font="modern"] :where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):has([data-dsh-style]),
[data-dsh-style][data-dsh-font="modern"],
[data-dsh-portal-synced][data-dsh-font="modern"] {
--dsh-font-display: "Source Sans 3", "Segoe UI", "Noto Sans SC", "Microsoft YaHei UI", sans-serif;
--dsh-font-body: "Source Sans 3", "Segoe UI", "Noto Sans SC", "Microsoft YaHei UI", sans-serif;
--dsh-font-mono: "Cascadia Code", "Cascadia Mono", Consolas, "Microsoft YaHei UI", monospace;
--dsh-display-weight: 650;
--dsh-display-tracking: normal;
--dsh-body-tracking: normal;
--dsw-font-family: var(--dsh-font-body);
--dsw-font-markdown-base: var(--dsh-font-body);
}
:where([data-dsh-style], [data-dsh-portal-synced]),
:where([data-dsh-style], [data-dsh-portal-synced]) :where(button, input, select, textarea),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style], [data-dsh-portal-synced], :has([data-dsh-style])),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style], [data-dsh-portal-synced], :has([data-dsh-style])) :where(button, input, select, textarea) {
font-family: var(--dsh-font-body);
letter-spacing: var(--dsh-body-tracking, normal);
}
:where([data-dsh-style], [data-dsh-portal-synced]) :where(
h1,
h2,
h3,
[role="tab"],
.dsh-header-title,
[data-dsh-serif],
[data-dsh-editorial-heading],
[data-dsh-card] :is(h2, h3, .dsh-card-title),
.dsh-card :is(h2, h3, .dsh-card-title),
[data-dsh-reader] :is(h1, h2),
.dsh-reader :is(h1, h2)
),
:where([role="dialog"], [role="alertdialog"], dialog):where([data-dsh-style], [data-dsh-portal-synced], :has([data-dsh-style])) :where(h1, h2, h3, header h2, [role="tab"], [data-dsh-serif]) {
font-family: var(--dsh-font-display);
font-weight: var(--dsh-display-weight, 700);
letter-spacing: var(--dsh-display-tracking, normal);
}
:where([data-dsh-style], [data-dsh-portal-synced]) :where(code, pre, kbd, samp),
:where([role="dialog"], [role="alertdialog"], dialog):where([data-dsh-style], [data-dsh-portal-synced], :has([data-dsh-style])) :where(code, pre, kbd, samp) {
font-family: var(--dsh-font-mono);
}
:where([data-dsh-style]) :where(button, [role="button"]),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):has([data-dsh-style]) :where(button, [role="button"]) {
translate: 0px 0px;
scale: 1;
transition-property: background-color, border-color, color, box-shadow, opacity, translate, scale;
transition-duration: var(--dsh-motion-fast);
transition-timing-function: var(--dsh-ease-out);
}
:where([data-dsh-style]) :where(button, [role="button"])[aria-expanded="true"]:not(:disabled):not([aria-disabled="true"]),
:where([role="dialog"], [role="alertdialog"], dialog):has([data-dsh-style]) :where(button, [role="button"])[aria-expanded="true"]:not(:disabled):not([aria-disabled="true"]) {
background-color: var(--dsw-alias-interactive-bg-active);
color: var(--dsw-alias-label-primary);
}
@media (prefers-reduced-motion: no-preference) {
@media (hover: hover) {
:where([data-dsh-style]:not([data-dsh-style="pixel8bit"]):not([data-dsh-style="eink"]):not([data-dsh-style="win98"]):not([data-dsh-style="risograph"])) :where(button:not([role="tab"]):not([role="menuitem"]):not([role="menuitemradio"]):not([role="switch"]), .dsh-btn):hover:not(:disabled):not([aria-disabled="true"]),
:where([role="dialog"], [role="alertdialog"], dialog):has([data-dsh-style]:not([data-dsh-style="pixel8bit"]):not([data-dsh-style="eink"]):not([data-dsh-style="win98"]):not([data-dsh-style="risograph"])) :where(button:not([role="tab"]):not([role="menuitem"]):not([role="menuitemradio"]):not([role="switch"]), .dsh-btn):hover:not(:disabled):not([aria-disabled="true"]) {
translate: 0px -0.5px;
}
[data-dsh-style="pixel8bit"] :where(button:not([role="tab"]):not([role="menuitem"]):not([role="menuitemradio"]), .dsh-btn):hover:not(:disabled):not([aria-disabled="true"]),
:where([role="dialog"], [role="alertdialog"], dialog):where([data-dsh-style="pixel8bit"], :has([data-dsh-style="pixel8bit"])) :where(button:not([role="tab"]):not([role="menuitem"]):not([role="menuitemradio"]), .dsh-btn):hover:not(:disabled):not([aria-disabled="true"]) {
translate: -1px -1px;
box-shadow: 3px 3px 0px #1e2826;
transition-timing-function: steps(2, end);
transition-duration: 70ms;
}
[data-dsh-style="risograph"] :where(button:not([role="tab"]):not([role="menuitem"]):not([role="menuitemradio"]), .dsh-btn):hover:not(:disabled):not([aria-disabled="true"]),
:where([role="dialog"], [role="alertdialog"], dialog):where([data-dsh-style="risograph"], :has([data-dsh-style="risograph"])) :where(button:not([role="tab"]):not([role="menuitem"]):not([role="menuitemradio"]), .dsh-btn):hover:not(:disabled):not([aria-disabled="true"]) {
translate: -1px -1px;
box-shadow: 4px 4px 0px #2563eb;
}
}
:where([data-dsh-style]:not([data-dsh-style="pixel8bit"]):not([data-dsh-style="eink"]):not([data-dsh-style="win98"]):not([data-dsh-style="risograph"])) :where(button:not([role="switch"]), [role="button"]):active:not(:disabled):not([aria-disabled="true"]),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):has([data-dsh-style]:not([data-dsh-style="pixel8bit"]):not([data-dsh-style="eink"]):not([data-dsh-style="win98"]):not([data-dsh-style="risograph"])) :where(button:not([role="switch"]), [role="button"]):active:not(:disabled):not([aria-disabled="true"]) {
scale: 0.965;
translate: 0px 0.5px;
transition-duration: 80ms;
}
[data-dsh-style="pixel8bit"] :where(button:not([role="tab"]):not([role="switch"]), .dsh-btn):active:not(:disabled):not([aria-disabled="true"]),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="pixel8bit"], :has([data-dsh-style="pixel8bit"])) :where(button:not([role="tab"]):not([role="switch"]), .dsh-btn):active:not(:disabled):not([aria-disabled="true"]) {
translate: 1px 1px !important;
scale: 1 !important;
box-shadow: 1px 1px 0px #1e2826 !important;
transition-timing-function: steps(2, end);
transition-duration: 50ms;
}
[data-dsh-style="risograph"] :where(button:not([role="tab"]):not([role="switch"]), .dsh-btn):active:not(:disabled):not([aria-disabled="true"]),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style="risograph"], :has([data-dsh-style="risograph"])) :where(button:not([role="tab"]):not([role="switch"]), .dsh-btn):active:not(:disabled):not([aria-disabled="true"]) {
translate: 2px 2px !important;
scale: 1 !important;
box-shadow: 1px 1px 0px #18181b !important;
transition-duration: 60ms;
}
}
:where([data-dsh-style]) :where(button, [role="button"], summary) svg,
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):has([data-dsh-style]) :where(button, [role="button"], summary) svg {
translate: 0px 0px;
rotate: 0deg;
scale: 1;
transform-origin: center;
}
@keyframes dsh-icon-spin {
to {
rotate: 360deg;
}
}
@keyframes dsh-icon-wiggle {
0% { rotate: 0deg; }
25% { rotate: -12deg; }
55% { rotate: 10deg; }
80% { rotate: -5deg; }
100% { rotate: 0deg; }
}
@keyframes dsh-icon-pop {
0% { scale: 1; }
45% { scale: 1.26; }
75% { scale: 0.94; }
100% { scale: 1; }
}
@keyframes dsh-icon-bounce {
0%, 100% { translate: 0px 0px; }
45% { translate: 0px 2.5px; }
75% { translate: 0px -1px; }
}
@media (prefers-reduced-motion: no-preference) {
:where([data-dsh-style]) :where(button, [role="button"], summary) svg,
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):has([data-dsh-style]) :where(button, [role="button"], summary) svg {
transition:
translate var(--dsh-motion-base) var(--dsh-ease-spring),
rotate 240ms var(--dsh-ease-spring),
scale var(--dsh-motion-base) var(--dsh-ease-spring);
}
:where([data-dsh-style]) :where([aria-expanded="true"], [data-open="true"], details[open] > summary) :is(svg[data-dsh-icon="down"], svg[data-dsh-icon="chevron-down"], svg[data-icon="down"], svg[data-icon="chevron-down"]),
:where([role="dialog"], [role="alertdialog"], dialog):has([data-dsh-style]) :where([aria-expanded="true"], [data-open="true"]) :is(svg[data-dsh-icon="down"], svg[data-dsh-icon="chevron-down"], svg[data-icon="down"], svg[data-icon="chevron-down"]) {
rotate: 180deg;
}
:where([data-dsh-style]) :where(button, [role="button"])[aria-busy="true"] :is(svg[data-dsh-icon="refresh"], svg[data-dsh-icon="sync"], svg[data-icon="refresh"], svg[data-icon="sync"]),
:where([data-dsh-style]) :is(svg[data-dsh-icon="refresh"], svg[data-icon="refresh"])[data-spinning="true"] {
animation: dsh-icon-spin 0.85s linear infinite;
}
@media (hover: hover) {
:where([data-dsh-style], [role="dialog"], [role="alertdialog"], dialog) :where(button, [role="button"]):hover:not(:disabled):not([aria-disabled="true"]) :is(svg[data-dsh-icon="refresh"], svg[data-dsh-icon="sync"], svg[data-dsh-icon="reload"], svg[data-icon="refresh"], svg[data-icon="sync"], svg[data-icon="reload"]) {
rotate: 180deg;
}
:where([data-dsh-style], [role="dialog"], [role="alertdialog"], dialog) :where(button, [role="button"]):hover:not(:disabled):not([aria-disabled="true"]) :is(svg[data-dsh-icon="plus"], svg[data-dsh-icon="add"], svg[data-dsh-icon="close"], svg[data-dsh-icon="x"], svg[data-icon="plus"], svg[data-icon="add"], svg[data-icon="close"], svg[data-icon="x"]) {
rotate: 90deg;
}
:where([data-dsh-style], [role="dialog"], [role="alertdialog"], dialog) :where(button, [role="button"], a):hover:not(:disabled):not([aria-disabled="true"]) :is(svg[data-dsh-icon="send"], svg[data-dsh-icon="external"], svg[data-dsh-icon="link"], svg[data-icon="send"], svg[data-icon="external"], svg[data-icon="link"]) {
translate: 2px -1.5px;
}
:where([data-dsh-style], [role="dialog"], [role="alertdialog"], dialog) :where(button, [role="button"]):hover:not(:disabled):not([aria-disabled="true"]) :is(svg[data-dsh-icon="reply"], svg[data-dsh-icon="left"], svg[data-dsh-icon="undo"], svg[data-icon="reply"], svg[data-icon="left"], svg[data-icon="undo"]) {
translate: -2px 0px;
}
:where([data-dsh-style], [role="dialog"], [role="alertdialog"], dialog) :where(button, [role="button"]):hover:not(:disabled):not([aria-disabled="true"]) :is(svg[data-dsh-icon="right"], svg[data-icon="right"]) {
translate: 2px 0px;
}
:where([data-dsh-style], [role="dialog"], [role="alertdialog"], dialog) :where(button, [role="button"]):hover:not(:disabled):not([aria-disabled="true"]) :is(svg[data-dsh-icon="play"], svg[data-icon="play"]) {
translate: 1.5px 0px;
scale: 1.14;
}
:where([data-dsh-style], [role="dialog"], [role="alertdialog"], dialog) :where(button, [role="button"]):hover:not(:disabled):not([aria-disabled="true"]) :is(svg[data-dsh-icon="trash"], svg[data-dsh-icon="delete"], svg[data-icon="trash"], svg[data-icon="delete"]) {
animation: dsh-icon-wiggle 360ms var(--dsh-ease-in-out);
}
:where([data-dsh-style], [role="dialog"], [role="alertdialog"], dialog) :where(button, [role="button"]):hover:not(:disabled):not([aria-disabled="true"]) :is(svg[data-dsh-icon="star"], svg[data-dsh-icon="check"], svg[data-dsh-icon="copy"], svg[data-dsh-icon="bookmark"], svg[data-icon="star"], svg[data-icon="check"], svg[data-icon="copy"], svg[data-icon="bookmark"]) {
scale: 1.18;
}
:where([data-dsh-style], [role="dialog"], [role="alertdialog"], dialog) :where(button, [role="button"]):hover:not(:disabled):not([aria-disabled="true"]) :is(svg[data-dsh-icon="download"], svg[data-dsh-icon="export"], svg[data-icon="download"], svg[data-icon="export"]) {
animation: dsh-icon-bounce 420ms var(--dsh-ease-out);
}
:where([data-dsh-style], [role="dialog"], [role="alertdialog"], dialog) :where(button, [role="button"]):hover:not(:disabled):not([aria-disabled="true"]) :is(svg[data-dsh-icon="palette"], svg[data-dsh-icon="sparkles"], svg[data-dsh-icon="edit"], svg[data-icon="palette"], svg[data-icon="sparkles"], svg[data-icon="edit"]) {
rotate: -12deg;
scale: 1.08;
}
:where([data-dsh-style], [role="dialog"], [role="alertdialog"], dialog) :where(button, [role="button"])[aria-expanded="false"]:hover:not(:disabled):not([aria-disabled="true"]) :is(svg[data-dsh-icon="down"], svg[data-dsh-icon="chevron-down"], svg[data-icon="down"], svg[data-icon="chevron-down"]) {
translate: 0px 1.5px;
}
}
:where([data-dsh-style], [role="dialog"], [role="alertdialog"], dialog) :where([aria-pressed="true"], [aria-checked="true"], [data-active="true"], [data-copied="true"]) :is(svg[data-dsh-icon="star"], svg[data-dsh-icon="check"], svg[data-dsh-icon="copy"], svg[data-icon="star"], svg[data-icon="check"], svg[data-icon="copy"]) {
animation: dsh-icon-pop 300ms var(--dsh-ease-spring);
}
}
:where([data-dsh-style]) :where(.dsh-header, [data-dsh-header]) {
display: flex;
align-items: center;
justify-content: space-between;
gap: 10px;
min-height: 48px;
padding: 6px 14px;
flex: none;
min-width: 0;
background: var(--dsw-alias-bg-base);
border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);
}
.dsh-header-leading {
display: flex;
align-items: center;
gap: 10px;
min-width: 0;
flex: 1 1 auto;
}
.dsh-header-brand {
display: inline-flex;
align-items: center;
gap: 8px;
min-width: 0;
flex: none;
white-space: nowrap;
}
.dsh-header-badge {
display: inline-flex;
align-items: center;
justify-content: center;
flex: none;
width: 24px;
height: 24px;
border-radius: var(--dsw-radius-xs, 6px);
background: var(--dsw-alias-button-primary-fill, #4176e6);
color: var(--dsw-alias-button-primary-ink, #ffffff);
}
.dsh-header-title {
margin: 0;
font-size: 13.5px;
font-weight: var(--dsh-display-weight, 650);
line-height: 1.25;
color: var(--dsw-alias-label-primary);
white-space: nowrap;
}
.dsh-header-tabs {
display: flex;
align-items: center;
min-width: 0;
flex: 1 1 auto;
}
.dsh-header-actions {
display: inline-flex;
align-items: center;
gap: 6px;
flex: none;
white-space: nowrap;
}
@container (max-width: 759px) {
:where([data-dsh-style]) :where(.dsh-header, [data-dsh-header]) {
flex-wrap: wrap;
padding-block: 6px;
}
.dsh-header-leading {
flex-wrap: wrap;
gap: 6px 10px;
}
}
:where([data-dsh-style]) :where([role="tablist"], .dsh-tablist) {
position: relative;
display: flex;
align-items: center;
gap: 2px;
min-width: 0;
overflow-x: auto;
scrollbar-width: thin;
}
:where([data-dsh-style]) [role="tab"] {
position: relative;
flex: none;
white-space: nowrap;
}
:where([data-dsh-style]) [role="tab"][aria-selected="true"]::after {
content: "";
position: absolute;
inset-inline: 6px;
inset-block-end: 0;
border-block-end: 2px solid var(--dsw-alias-state-business-primary);
pointer-events: none;
}
[data-dsh-style] :where([data-dsh-tablist][data-indicator-ready="true"], .dsh-tablist[data-indicator-ready="true"]) [role="tab"][aria-selected="true"]::after {
opacity: 0;
}
.dsh-tab-indicator {
position: absolute;
inset-inline-start: 0;
inset-block-end: 0;
height: 2px;
width: var(--dsh-tab-w, 0px);
translate: var(--dsh-tab-x, 0px) 0px;
border-block-end: 2px solid var(--dsw-alias-state-business-primary);
border-radius: 2px 2px 0 0;
pointer-events: none;
opacity: 0;
transition:
translate 180ms var(--dsh-ease-out),
width 180ms var(--dsh-ease-out),
opacity 120ms ease-out;
}
[data-indicator-ready="true"] > .dsh-tab-indicator {
opacity: 1;
}
.dsh-tablist-pill > .dsh-tab-indicator {
inset-block: 3px;
height: auto;
border-block-end: 2px solid var(--dsw-alias-state-business-primary);
border-radius: var(--dsw-radius-xs, 6px);
background: var(--dsw-alias-interactive-bg-active);
z-index: 0;
}
.dsh-tablist-pill > [role="tab"] {
z-index: 1;
}
[data-dsh-style="eink"] .dsh-tab-indicator {
transition-duration: 60ms;
}
[data-dsh-style="pixel8bit"] .dsh-tab-indicator {
border-radius: 0px !important;
transition-timing-function: steps(4, end);
}
@keyframes dsh-tab-panel-enter {
from {
opacity: 0;
translate: 0px 4px;
}
to {
opacity: 1;
translate: 0px 0px;
}
}
:where([data-dsh-style]) :where(.dsh-tab-panel, [data-dsh-tab-panel]):not([hidden]) {
opacity: 1;
translate: 0px 0px;
transition:
opacity 140ms var(--dsh-ease-out),
translate 140ms var(--dsh-ease-out);
animation: dsh-tab-panel-enter 140ms var(--dsh-ease-out);
}
@starting-style {
:where([data-dsh-style]) :where(.dsh-tab-panel, [data-dsh-tab-panel]):not([hidden]) {
opacity: 0;
translate: 0px 4px;
}
}
.dsh-split-pane {
display: flex;
flex: 1 1 auto;
min-width: 0;
min-height: 0;
width: 100%;
}
.dsh-split-leading {
flex: none;
min-width: 0;
min-height: 0;
width: var(--dsh-split-size, 320px);
}
.dsh-split-trailing {
flex: 1 1 auto;
min-width: 0;
min-height: 0;
}
.dsh-split-resizer {
position: relative;
flex: none;
width: 9px;
min-height: 24px;
display: flex;
align-items: center;
justify-content: center;
cursor: col-resize;
touch-action: none;
user-select: none;
background: transparent;
outline: none;
}
.dsh-split-resizer[aria-orientation="horizontal"] {
width: 100%;
height: 9px;
min-height: 9px;
cursor: row-resize;
}
.dsh-split-resizer::before {
content: "";
width: 1px;
height: 100%;
background: var(--dsw-alias-border-l2);
transition:
width 120ms var(--dsh-ease-out),
background-color 120ms var(--dsh-ease-out);
}
.dsh-split-resizer[aria-orientation="horizontal"]::before {
width: 100%;
height: 1px;
}
.dsh-split-resizer::after {
content: "";
position: absolute;
width: 3px;
height: 28px;
border-radius: 999px;
background: var(--dsw-alias-border-l3);
opacity: 0;
transition:
opacity 120ms var(--dsh-ease-out),
background-color 120ms var(--dsh-ease-out);
}
.dsh-split-resizer[aria-orientation="horizontal"]::after {
width: 28px;
height: 3px;
}
.dsh-split-resizer:hover::before,
.dsh-split-resizer:focus-visible::before,
.dsh-split-resizer[data-dragging="true"]::before {
width: 2px;
background: var(--dsw-alias-state-business-primary);
}
.dsh-split-resizer[aria-orientation="horizontal"]:is(:hover, :focus-visible, [data-dragging="true"])::before {
width: 100%;
height: 2px;
}
.dsh-split-resizer:is(:hover, :focus-visible, [data-dragging="true"])::after {
opacity: 1;
background: var(--dsw-alias-state-business-primary);
}
.dsh-split-resizer:focus-visible {
outline: 2px solid var(--dsw-alias-state-business-primary);
outline-offset: -2px;
}
[data-dsh-style="pixel8bit"] .dsh-split-resizer::before {
width: 2px;
background: #1e2826;
}
[data-dsh-style="pixel8bit"] .dsh-split-resizer::after {
border-radius: 0px;
}
@container (max-width: 759px) {
.dsh-split-pane {
flex-direction: column;
overflow-y: auto;
}
.dsh-split-leading {
width: 100% !important;
max-width: 100%;
flex: none;
}
.dsh-split-resizer {
display: none;
}
}
@media (max-width: 759px) {
.dsh-split-pane {
flex-direction: column;
overflow-y: auto;
}
.dsh-split-leading {
width: 100% !important;
max-width: 100%;
flex: none;
}
.dsh-split-resizer {
display: none;
}
}
@keyframes dsh-skeleton-shimmer {
0% { background-position: 100% 0; }
100% { background-position: -100% 0; }
}
.dsh-skeleton-group {
display: flex;
flex-direction: column;
gap: 8px;
width: 100%;
}
.dsh-skeleton {
display: block;
width: 100%;
height: 12px;
border-radius: var(--dsw-radius-xs, 6px);
background-color: var(--dsw-alias-bg-layer-2, #e5e7eb);
background-image: linear-gradient(
90deg,
var(--dsw-alias-bg-layer-2, #e5e7eb) 0%,
color-mix(in oklab, var(--dsw-alias-bg-overlay, #ffffff) 82%, var(--dsw-alias-state-business-primary, #4176e6) 18%) 48%,
var(--dsw-alias-bg-layer-2, #e5e7eb) 100%
);
background-size: 220% 100%;
background-position: 100% 0;
}
.dsh-skeleton-circle {
width: 32px;
height: 32px;
border-radius: 50%;
flex: none;
}
.dsh-skeleton-card {
display: flex;
flex-direction: column;
gap: 10px;
padding: 12px 14px;
border-radius: var(--dsw-radius-md, 12px);
border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l1);
background: var(--dsw-alias-bg-layer-1);
}
.dsh-skeleton-row {
display: flex;
align-items: center;
gap: 10px;
padding: 8px 10px;
}
@media (prefers-reduced-motion: no-preference) {
:where([data-dsh-style]:not([data-dsh-style="eink"])) .dsh-skeleton[data-animated="true"] {
animation: dsh-skeleton-shimmer 1.35s var(--dsh-ease-in-out) infinite;
}
[data-dsh-style="pixel8bit"] .dsh-skeleton[data-animated="true"] {
border-radius: 0px !important;
border: 1px solid #1e2826;
animation-timing-function: steps(4, end);
}
}
[data-dsh-style="eink"] .dsh-skeleton {
background-image: none;
border: 1px solid #c5c2b8;
}
.dsh-progress {
position: relative;
width: 100%;
height: 6px;
overflow: clip;
border-radius: 999px;
background: var(--dsw-alias-bg-layer-2);
}
.dsh-progress-bar {
height: 100%;
width: var(--dsh-progress-value, 0%);
border-radius: inherit;
background: var(--dsw-alias-state-business-primary);
transition: width 200ms var(--dsh-ease-out);
}
[data-dsh-style="pixel8bit"] .dsh-progress {
height: 10px;
border-radius: 0px !important;
border: 2px solid #1e2826;
background: var(--dsw-alias-bg-layer-1);
box-shadow: 2px 2px 0px #1e2826;
}
[data-dsh-style="pixel8bit"] .dsh-progress-bar {
border-radius: 0px !important;
background: repeating-linear-gradient(
90deg,
#2e7d5b 0px,
#2e7d5b 6px,
#24674a 6px,
#24674a 8px
);
transition-timing-function: steps(8, end);
}
:where([data-dsh-style]) :where([data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row) {
translate: 0px 0px;
transition:
background-color var(--dsh-motion-fast) var(--dsh-ease-out),
border-color var(--dsh-motion-fast) var(--dsh-ease-out),
box-shadow var(--dsh-motion-base) var(--dsh-ease-out),
translate var(--dsh-motion-base) var(--dsh-ease-out);
}
.dsh-row-actions {
display: inline-flex;
align-items: center;
gap: 4px;
flex: none;
translate: 0px 0px;
transition:
opacity var(--dsh-motion-fast) var(--dsh-ease-out),
translate var(--dsh-motion-fast) var(--dsh-ease-out);
}
@media (hover: hover) {
:where([data-dsh-row], .dsh-row) .dsh-row-actions:not([data-always-visible="true"]) {
opacity: 0;
translate: 4px 0px;
pointer-events: none;
}
:where([data-dsh-row], .dsh-row):is(:hover, :focus-within, [data-active="true"], [data-selected="true"], [aria-selected="true"]) .dsh-row-actions {
opacity: 1;
translate: 0px 0px;
pointer-events: auto;
}
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
:where([data-dsh-style]:not([data-dsh-style="pixel8bit"]):not([data-dsh-style="eink"]):not([data-dsh-style="win98"]):not([data-dsh-style="risograph"])) :where([data-dsh-card], .dsh-card):hover {
translate: 0px -1.5px;
box-shadow: var(--dsh-card-hover-shadow);
}
[data-dsh-style="pixel8bit"] :where([data-dsh-card], .dsh-card):hover {
translate: -1px -1px;
box-shadow: 4px 4px 0px #1e2826;
}
[data-dsh-style="risograph"] :where([data-dsh-card], .dsh-card):hover {
translate: -1px -1px;
box-shadow: 5px 5px 0px #ff3e7f;
}
:where([data-dsh-style]) :where([data-dsh-row], .dsh-row):hover:not([data-selected="true"]):not([aria-selected="true"]):not([data-active="true"]) {
background-color: var(--dsh-surface-spotlight, var(--dsw-alias-interactive-bg-hover));
}
}
:where([role="dialog"], [role="alertdialog"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {
overscroll-behavior: contain;
opacity: 1;
transition-property: opacity, scale, translate, display, overlay;
transition-duration: var(--dsh-motion-dialog);
transition-timing-function: var(--dsh-ease-out);
transition-behavior: allow-discrete;
}
@starting-style {
:where([role="dialog"], [role="alertdialog"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {
opacity: 0;
}
}
@media (prefers-reduced-motion: no-preference) {
:where([role="dialog"], [role="alertdialog"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {
scale: 1;
translate: 0px 0px;
}
@starting-style {
:where([role="dialog"], [role="alertdialog"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {
scale: 0.965;
translate: 0px 6px;
}
}
}
dialog[open]::backdrop {
overflow: hidden;
overscroll-behavior: contain;
}
:where([data-dsh-style]) [data-plugin-update-footer] {
flex: none;
box-sizing: border-box;
width: 100%;
min-height: 32px;
margin: 0;
padding: 6px 14px;
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: space-between;
gap: 6px 12px;
font-size: 12px;
line-height: 1.4;
color: var(--dsw-alias-label-secondary);
background: var(--dsw-alias-bg-layer-1);
border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);
}
:where([data-dsh-style]) [data-plugin-update-footer] :where(button, a) {
min-height: 24px;
font-size: 11.5px;
}
:where([data-dsh-style]) [data-show-updates="false"] [data-plugin-update-footer] {
display: none;
}
.dsh-style-switcher {
display: inline-flex;
align-items: center;
gap: 6px;
flex-shrink: 0;
flex: none;
white-space: nowrap;
}
.dsh-style-trigger.dsh-style-trigger,
.dsh-font-trigger.dsh-font-trigger {
display: inline-flex;
align-items: center;
gap: 6px;
min-height: 28px;
height: 28px;
padding-inline: 8px;
width: auto;
flex-shrink: 0;
font-size: 12px;
line-height: 18px;
font-weight: 500;
color: var(--dsw-alias-label-secondary);
background: var(--dsw-alias-bg-layer-1);
border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);
border-radius: var(--dsw-radius-sm, 8px);
cursor: pointer;
white-space: nowrap;
}
.dsh-font-trigger.dsh-font-trigger {
gap: 5px;
padding-inline: 7px;
}
.dsh-font-glyph {
display: inline-flex;
align-items: center;
justify-content: center;
flex: none;
min-width: 16px;
height: 16px;
padding-inline: 3px;
border-radius: var(--dsw-radius-xs, 4px);
background: var(--dsw-alias-state-business-tertiary, rgba(65, 118, 230, 0.12));
color: var(--dsw-alias-state-business-primary, var(--dsw-alias-label-primary));
font-family: var(--dsh-font-display);
font-size: 10.5px;
font-weight: 700;
line-height: 1;
}
.dsh-style-label,
.dsh-font-label {
white-space: nowrap;
line-height: 1;
}
@media (hover: hover) {
.dsh-style-trigger.dsh-style-trigger:hover:not(:disabled),
.dsh-font-trigger.dsh-font-trigger:hover:not(:disabled) {
color: var(--dsw-alias-label-primary);
background: var(--dsw-alias-interactive-bg-hover);
}
}
.dsh-style-swatch {
display: inline-block;
flex: none;
width: 10px;
height: 10px;
border-radius: 50%;
corner-shape: round;
background: var(--dsh-swatch-color, var(--dsw-alias-state-business-primary));
box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.16);
}
[data-dsh-style="pixel8bit"] .dsh-style-swatch {
border-radius: 0px !important;
corner-shape: square;
box-shadow: 1px 1px 0px #1e2826;
}
.dsh-style-fallback-wrap {
position: relative;
display: inline-flex;
}
.dsh-style-fallback-menu {
position: absolute;
inset-block-start: calc(100% + 4px);
inset-inline-end: 0;
z-index: 2147483001;
display: grid;
gap: 2px;
min-width: 186px;
max-height: min(420px, 70dvh);
overflow-y: auto;
overscroll-behavior: contain;
padding: 4px;
background: var(--dsw-alias-bg-overlay, var(--dsw-alias-bg-base));
border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);
border-radius: var(--dsw-radius-md, 12px);
box-shadow: var(--dsw-elevation-prominent);
}
.dsh-style-fallback-item {
display: flex;
align-items: center;
justify-content: space-between;
gap: 8px;
width: 100%;
min-height: 28px;
padding: 4px 8px;
border: 0;
border-radius: var(--dsw-radius-xs, 6px);
background: transparent;
color: var(--dsw-alias-label-primary);
font: inherit;
font-size: 12px;
text-align: start;
cursor: pointer;
}
.dsh-style-fallback-item-leading {
display: inline-flex;
align-items: center;
gap: 7px;
min-width: 0;
}
.dsh-style-fallback-item[aria-checked="true"] {
background: var(--dsw-alias-interactive-bg-active);
font-weight: 600;
}
@media (hover: hover) {
.dsh-style-fallback-item:hover:not(:disabled) {
background: var(--dsw-alias-interactive-bg-hover);
}
}
.dsh-fallback-modal-root {
position: fixed;
inset: 0;
z-index: 2147483000;
display: grid;
place-items: center;
padding: 16px;
}
.dsh-fallback-modal-mask {
position: fixed;
inset: 0;
background: rgba(15, 23, 42, 0.36);
}
.dsh-fallback-modal-dialog {
position: relative;
z-index: 1;
max-width: min(560px, calc(100dvw - 32px));
max-height: calc(100dvh - 32px);
overflow: clip;
display: flex;
flex-direction: column;
border-radius: var(--dsw-radius-md, 12px);
background: var(--dsw-alias-bg-layer-1, #f8fafc);
color: var(--dsw-alias-label-primary, #1f232b);
box-shadow: var(--dsw-elevation-prominent);
}
@media (prefers-reduced-motion: reduce) {
:where([data-dsh-style]) :where(button, [role="button"], [data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row, .dsh-row-actions, .dsh-tab-panel, [data-dsh-tab-panel]),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):has([data-dsh-style]) :where(button, [role="button"]) {
translate: none !important;
scale: none !important;
animation: none !important;
transition-property: background-color, border-color, color, opacity;
transition-duration: 90ms;
}
:where([data-dsh-style], [role="dialog"], [role="alertdialog"], dialog) :where(button, [role="button"], summary) svg,
[data-dsh-style="pixel8bit"] :where([data-dsh-row], .dsh-row)::before,
[data-dsh-style="pixel8bit"] .dsh-pixel-cursor {
animation: none !important;
transition: none !important;
translate: none !important;
scale: none !important;
}
.dsh-tab-indicator {
transition-property: opacity;
transition-duration: 90ms;
}
.dsh-skeleton {
animation: none !important;
background-image: none;
}
:where([role="dialog"], [role="alertdialog"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {
scale: none !important;
translate: none !important;
transition-duration: 100ms;
}
}
@media (forced-colors: active) {
:where([data-dsh-style]) :where(button, input, select, textarea, [data-dsh-card], .dsh-card),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style], :has([data-dsh-style])) {
border: 1px solid ButtonText;
}
:where([data-dsh-style]) [role="tab"][aria-selected="true"]::after {
opacity: 1 !important;
border-block-end: 3px solid Highlight;
}
.dsh-tab-indicator {
background: transparent !important;
border-block-end: 3px solid Highlight;
}
.dsh-split-resizer::before,
.dsh-split-resizer::after {
background: ButtonText;
}
.dsh-skeleton {
border: 1px solid GrayText;
background: Canvas;
}
}
.dshw,
.dshw[data-dsh-style],
[data-dsh-style] .dshw {
--w-canvas: var(--dsw-alias-bg-base, #ffffff);
--w-bg: var(--dsw-alias-bg-layer-1, #f8fafc);
--w-soft: var(--dsw-alias-bg-layer-2, #f1f5f9);
--w-text: var(--dsw-alias-label-primary, #1e293b);
--w-muted: var(--dsw-alias-label-secondary, #64748b);
--w-border: var(--dsw-alias-border-l2, #e2e8f0);
--w-accent: var(--dsw-alias-state-business-primary, #4176e6);
--w-selected: var(--dsw-alias-interactive-bg-active, color-mix(in oklab, var(--w-accent) 11%, var(--w-canvas)));
--w-primary: var(--dsw-alias-button-primary-fill, var(--w-accent));
--w-on-primary: var(--dsw-alias-button-primary-ink, #ffffff);
container-type: inline-size;
container-name: dsh-workbench;
color: var(--w-text);
font-size: 13.5px;
line-height: 1.6;
font-family: var(--dsh-font-body, var(--dsw-font-family, var(--dsh-font-family-content, system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif)));
min-width: 0;
max-width: 100%;
box-sizing: border-box;
text-align: start;
}
.dshw *, .dshw *:before, .dshw *:after { box-sizing: border-box; }
.dshw h1, .dshw h2, .dshw h3, .dshw h4, .dshw p { margin: 0; }
.dshw h1 { font-size: 16px; line-height: 1.3; font-family: var(--dsh-font-display, inherit); letter-spacing: var(--dsh-display-tracking, -0.015em); font-weight: var(--dsh-display-weight, 650); }
.dshw .dsh-header-title { font-size: 13.5px; line-height: 1.25; }
.dshw h2 { font-size: 17px; line-height: 1.35; font-family: var(--dsh-font-display, inherit); font-weight: var(--dsh-display-weight, 650); letter-spacing: var(--dsh-display-tracking, -0.01em); overflow-wrap: anywhere; }
.dshw h3, .dshw h4 { font-size: 14.5px; line-height: 1.4; font-family: var(--dsh-font-display, inherit); font-weight: var(--dsh-display-weight, 600); letter-spacing: var(--dsh-display-tracking, normal); }
.dshw a { color: var(--dsw-alias-link, var(--w-accent)); text-underline-offset: 3px; overflow-wrap: anywhere; }
.dshw button, .dshw input, .dshw select, .dshw textarea { font: inherit; color: inherit; max-width: 100%; }
.dshw [role="tab"] { font-family: var(--dsh-font-display, inherit); font-weight: var(--dsh-display-weight, 600); letter-spacing: var(--dsh-display-tracking, normal); }
.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]):not([type=range]),
.dshw select,
.dshw textarea {
background: var(--dsw-alias-bg-base, var(--w-canvas));
border: var(--dsh-control-border-width, 1px) solid var(--w-border);
border-radius: var(--dsw-radius-sm, 8px);
padding: 7px 10px;
min-width: 0;
line-height: 1.5;
}
.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]):not([type=range]),
.dshw select { min-height: 34px; }
.dshw textarea { resize: vertical; }
.dshw input[type=checkbox], .dshw input[type=radio] {
width: 16px; height: 16px; flex-shrink: 0; accent-color: var(--w-accent);
}
.dshw :focus-visible { outline: 2px solid var(--w-accent); outline-offset: 2px; }
.dshw button:disabled, .dshw input:disabled, .dshw select:disabled, .dshw textarea:disabled {
opacity: 0.48; cursor: not-allowed;
}
.dshw label { font-size: 13px; }
.dshw fieldset { min-width: 0; border: 1px solid var(--w-border); border-radius: var(--dsw-radius-sm, 8px); }
.dshw summary { cursor: pointer; font-weight: 550; list-style: none; display: flex; align-items: center; gap: 8px; }
.dshw summary::-webkit-details-marker { display: none; }
.dshw summary:after {
content: ''; display: block; margin-inline-start: auto; width: 7px; height: 7px;
border-inline-end: 1.75px solid currentColor; border-bottom: 1.75px solid currentColor;
transform: rotate(45deg); flex-shrink: 0;
transition: transform var(--dsh-motion-fast, 140ms) var(--dsh-ease-out, ease);
}
.dshw details[open] > summary:after { transform: rotate(225deg); }
.dshw details > summary + * { margin-top: 12px; }
.dshw pre {
white-space: pre-wrap; overflow-wrap: anywhere;
font: 12px/1.65 var(--ds-font-family-code, ui-monospace, SFMono-Regular, Consolas, monospace);
max-width: 100%; background: var(--w-soft); border-radius: var(--dsw-radius-xs, 6px); padding: 12px;
}
.dshw img, .dshw video, .dshw iframe { max-width: 100%; }
.w-page {
display: flex; flex-direction: column; position: relative;
padding: 0; min-height: 540px; gap: 0;
background: var(--w-canvas);
}
.w-page[data-main="true"] {
height: 100%; min-height: 0;
padding-block-start: var(--dsh-frame-top-clearance, 0px);
padding-inline: 0;
padding-block-end: 0;
overflow: hidden;
}
.w-page[data-main="true"] > .dsh-header {
padding-inline-start: max(14px, calc(10px + var(--dsh-frame-leading-clearance, 0px)));
padding-inline-end: 14px;
}
.dshw :where(.dsh-header-actions, .w-header-actions, [data-dsh-header-actions]) {
display: inline-flex;
align-items: center;
gap: 6px;
flex: none;
white-space: nowrap;
}
.dshw .dsh-header-leading {
min-width: 0;
flex: 1 1 auto;
overflow: hidden;
}
.dshw .dsh-header-tabs {
min-width: 0;
flex: 1 1 auto;
overflow: hidden;
}
.dshw .w-tabs {
min-width: 0;
max-width: 100%;
scrollbar-width: none;
}
.w-page[data-main="true"] > .w-body {
padding-inline: 18px;
padding-block-start: 10px;
}
.w-page.w-embedded, .w-page[data-main="false"] { padding: 0; }
.w-page.w-embedded > .dsh-header { padding-inline: 10px; }
.dshw.w-page, .dshw .w-body, .dshw .w-tab-panel { overflow-x: clip; }
.w-brand, .w-empty-icon {
display: grid; place-items: center; flex: none;
color: var(--w-accent);
background: var(--dsw-alias-interactive-bg-hover-accent, color-mix(in oklab, var(--w-accent) 12%, transparent));
border-radius: var(--dsw-radius-sm, 8px);
}
.w-toolbar, .w-actions {
display: flex; align-items: center; flex-wrap: wrap; gap: 8px; min-width: 0;
}
.w-body, .w-tabs-layout {
display: flex; flex-direction: column; flex: 1 1 auto; min-height: 0; min-width: 0;
}
.w-body { overflow: auto; }
:where([data-dsh-style]) [data-plugin-update-footer],
.w-body > [data-plugin-update-footer] {
flex: none;
box-sizing: border-box;
width: 100%;
min-height: 32px;
margin: auto 0 0;
padding: 6px 14px;
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: space-between;
gap: 6px 12px;
font-size: 12px;
line-height: 1.4;
color: var(--dsw-alias-label-secondary, var(--w-muted));
background: var(--dsw-alias-bg-layer-1, var(--w-bg));
border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}
.w-page[data-main="true"] > .w-body > [data-plugin-update-footer] {
width: calc(100% + 36px);
margin-inline: -18px;
}
:where([data-dsh-style]) [data-plugin-update-footer] :where(button, a) {
min-height: 24px;
font-size: 11.5px;
}
:where([data-dsh-style]) [data-show-updates="false"] [data-plugin-update-footer] {
display: none;
}
.w-tab-panel {
flex: 1 1 auto; min-width: 0; min-height: 0; display: flex; flex-direction: column; overflow: auto;
}
.w-tabs {
display: flex; align-items: center; gap: 2px;
border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
flex-shrink: 0; overflow-x: auto; scrollbar-width: thin;
}
.dshw .w-tabs > button,
.dshw[data-dsh-style] .w-tabs > button {
border: 0 !important; box-shadow: none !important; background: transparent;
padding: 5px 10px; white-space: nowrap;
font-size: 12.5px; font-weight: 550; cursor: pointer;
color: var(--w-muted); display: inline-flex; align-items: center; gap: 5px;
border-radius: var(--dsw-radius-xs, 6px);
min-height: 30px;
}
.dshw .w-tabs > button:hover:not(:disabled),
.dshw[data-dsh-style] .w-tabs > button:hover:not(:disabled) {
color: var(--w-text); background: var(--dsw-alias-interactive-bg-hover, var(--w-soft));
}
.dshw .w-tabs > button[aria-selected="true"],
.dshw[data-dsh-style] .w-tabs > button[aria-selected="true"] {
color: var(--w-accent);
}
.w-count, .w-tag {
font-size: 11px; line-height: 1.4; display: inline-flex; align-items: center;
flex-shrink: 0; background: var(--w-soft); border-radius: var(--dsw-radius-xs, 6px);
padding: 1px 6px; color: var(--w-muted);
}
.w-tabs [aria-selected="true"] .w-count, .w-selected .w-tag {
color: var(--w-accent); background: var(--w-selected);
}
.dshw .w-button {
display: inline-flex; justify-content: center; align-items: center; gap: 5px;
background: var(--dsw-alias-bg-base, var(--w-canvas));
border: var(--dsh-control-border-width, 1px) solid var(--w-border);
border-radius: var(--dsw-radius-sm, 8px);
padding: 5px 10px; min-height: 28px; height: auto;
line-height: 1.35; font-size: 12.5px; font-weight: 500;
cursor: pointer; text-decoration: none; white-space: nowrap;
box-shadow: var(--dsh-button-shadow, none);
}
.dshw .w-button:not(:disabled):hover {
background: var(--dsw-alias-interactive-bg-hover, var(--w-soft));
}
.dshw .w-button.w-primary {
background: var(--w-primary); border-color: var(--w-primary); color: var(--w-on-primary);
}
.dshw .w-button.w-primary:not(:disabled):hover {
background: var(--dsw-alias-button-primary-hover, var(--w-primary));
}
.dshw .w-button.w-ghost {
background: transparent; border-color: transparent; box-shadow: none;
}
.dshw .w-button.w-ghost:not(:disabled):hover {
background: var(--dsw-alias-interactive-bg-hover, var(--w-soft));
}
.dshw .w-button.w-danger {
color: var(--dsw-alias-state-error-primary, #c83240);
}
.dshw .w-button.w-danger:not(:disabled):hover {
background: var(--dsw-alias-interactive-bg-hover-danger, rgba(200, 50, 64, 0.1));
}
.dshw .w-icon-button {
width: 28px; min-width: 28px; padding-inline: 0; flex: none;
}
.dshw .w-button svg, .dshw .dsh-fallback-btn-icon {
display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.dshw .w-input {
display: inline-flex; align-items: center; gap: 8px;
width: 100%; min-width: 0; min-height: 34px; padding-inline: 10px;
background: var(--dsw-alias-bg-base, var(--w-canvas));
border: var(--dsh-control-border-width, 1px) solid var(--w-border);
border-radius: var(--dsw-radius-sm, 8px);
box-shadow: none;
}
.dshw .w-input:focus-within {
border-color: var(--w-accent);
outline: 2px solid color-mix(in oklab, var(--w-accent) 22%, transparent);
outline-offset: 1px;
}
.dshw .w-input > span { display: inline-flex; align-items: center; color: var(--w-muted); flex: none; }
.dshw .w-input > input {
border: 0 !important; background: transparent !important;
padding: 5px 0 !important; min-height: 30px !important;
width: 100%; min-width: 0; font: inherit; color: var(--w-text);
outline: none !important; box-shadow: none !important;
}
.dshw .w-checkbox {
display: inline-flex; align-items: flex-start; gap: 8px;
min-width: 0; cursor: pointer; color: inherit;
}
.dshw .w-checkbox input { margin-block-start: 2px; accent-color: var(--w-accent); }
.dshw .w-checkbox-icon > span {
position: absolute; inline-size: 1px; block-size: 1px;
overflow: hidden; clip-path: inset(50%); white-space: nowrap;
}
.dshw .w-menu { display: inline-block; min-width: 0; }
.dshw .w-menu-button { width: 100%; justify-content: space-between; gap: 8px; text-align: start; }
.dshw .w-menu-value { display: block; min-width: 0; overflow-wrap: anywhere; }
.w-muted { color: var(--w-muted); font-size: 12px; line-height: 1.6; }
.w-section { padding: 18px 0; border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border); min-width: 0; }
.w-section > h3 { margin-block-end: 10px; }
.w-section > p + p { margin-block-start: 8px; }
.w-fields { display: grid; gap: 14px; min-width: 0; }
.w-field { display: grid; gap: 6px; min-width: 0; }
.w-field > input, .w-field > select, .w-field > textarea { width: 100%; }
.w-status {
display: flex; align-items: flex-start; gap: 8px;
padding: 8px 12px; margin: 8px 0;
border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
border-radius: var(--dsw-radius-sm, 8px);
background: var(--w-bg); font-size: 12.5px; line-height: 1.5;
overflow-wrap: anywhere; flex-shrink: 0;
}
.w-status > svg { flex-shrink: 0; margin-block-start: 2px; }
.w-status-text { min-width: 0; flex: 1; }
.w-status-error {
background: var(--dsw-alias-interactive-bg-hover-danger, color-mix(in oklab, var(--dsw-alias-state-error-primary, #c83240) 10%, var(--w-canvas)));
color: var(--dsw-alias-state-error-primary, #c83240);
}
.w-status-success { color: var(--dsw-alias-state-success-primary, #24794a); }
.w-status-warn {
background: var(--dsw-alias-state-warn-tertiary, var(--w-soft));
color: var(--dsw-alias-state-warn-label, var(--dsw-alias-state-warn-primary, #8a5a00));
}
.w-empty {
display: flex; flex-direction: column; align-items: center; justify-content: center;
text-align: center; gap: 10px; width: 100%; max-width: 560px;
padding: 40px 20px; margin: auto; min-height: 240px; overflow-wrap: anywhere;
}
.w-empty-icon { width: 44px; height: 44px; margin-block-end: 4px; }
.w-empty h2 { font-size: 16px; }
.w-empty .w-muted { font-size: 13px; max-width: 46ch; }
.w-empty .w-toolbar { justify-content: center; margin-block-start: 4px; }
.w-split {
display: grid; grid-template-columns: minmax(240px, var(--w-list-width)) minmax(0, 1fr);
min-height: 460px; flex: 1; min-width: 0;
}
.w-split.dsh-split-pane {
display: flex;
}
.w-master { min-width: 0; border-inline-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border); overflow: auto; padding-block-end: 20px; }
.w-split.dsh-split-pane > .w-master { border-inline-end: 0; }
.w-detail { min-width: 0; padding: 20px 22px; overflow: auto; overflow-wrap: anywhere; display: flex; flex-direction: column; }
.w-master-toolbar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 14px; }
.w-row {
display: flex; gap: 0; min-width: 0; position: relative; align-items: stretch;
border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
border-inline-start: 3px solid transparent;
border-radius: var(--dsw-radius-xs, 6px);
}
.w-row-select { display: flex; align-items: flex-start; padding: 16px 0 0 12px; }
.dshw .w-row-button {
display: flex; flex-direction: column; align-items: stretch; gap: 4px;
text-align: start; flex: 1 1 auto; padding: 13px 14px;
border: 0; background: transparent; color: inherit; min-width: 0;
cursor: pointer; line-height: 1.45;
}
.w-row-head { display: flex; align-items: flex-start; gap: 10px; justify-content: space-between; min-width: 0; }
.w-row-title-wrap { display: inline-flex; align-items: center; gap: 6px; min-width: 0; }
.w-row-head strong { font-size: 14px; line-height: 1.45; font-weight: 600; overflow-wrap: anywhere; }
.w-row-meta, .w-row-description { color: var(--w-muted); font-size: 12px; line-height: 1.5; overflow-wrap: anywhere; }
.w-row-description { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.w-selected { background: var(--w-selected); border-inline-start-color: var(--w-accent); }
.w-back { display: none !important; }
.w-dialog-modal { padding: 0 !important; border: 0 !important; background: transparent !important; }
.w-dialog {
width: min(620px, 100%); max-height: min(85dvh, 100%);
display: flex; flex-direction: column; min-height: 0;
background: var(--dsw-alias-bg-overlay, var(--w-canvas));
color: var(--w-text);
border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
border-radius: var(--dsw-radius-md, 12px);
box-shadow: var(--dsw-elevation-prominent, 0 18px 50px rgba(15, 23, 42, 0.16));
overflow: clip;
}
.w-dialog-header, .w-dialog-footer {
display: flex; justify-content: space-between; align-items: center; gap: 12px;
padding: 14px 18px; background: var(--dsw-alias-bg-base, var(--w-canvas)); flex-shrink: 0;
}
.w-dialog-header { border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border); }
.w-dialog-header > h2 { font-size: 16px; line-height: 1.4; }
.w-dialog-body { overflow: auto; overscroll-behavior: contain; padding: 18px; min-height: 0; }
.w-dialog-footer { justify-content: flex-end; flex-wrap: wrap; border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--w-border); }
.w-preview-empty {
display: flex; flex-direction: column; justify-content: center; align-items: center;
text-align: center; gap: 10px; aspect-ratio: 16 / 9; min-height: 180px;
background: var(--w-bg);
border: var(--dsh-control-border-width, 1px) solid var(--w-border);
border-radius: var(--dsw-radius-md, 12px);
padding: 24px; color: var(--w-muted);
}
@container dsh-workbench (max-width: 1080px) {
.dsh-header { flex-wrap: wrap; }
.dsh-header-leading { flex-wrap: wrap; gap: 6px 10px; }
.dsh-header .w-header-actions { flex-wrap: wrap; }
.w-split { grid-template-columns: minmax(240px, 34%) minmax(0, 1fr); }
}
@container dsh-workbench (max-width: 760px) {
.dsh-split-pane { flex-direction: column; overflow-y: auto; }
.dsh-split-leading { width: 100% !important; max-width: 100%; flex: none; }
.dsh-split-resizer { display: none; }
.w-split { display: block; min-height: 360px; }
.w-split[data-selected="false"] > .w-detail { display: none; }
.w-split[data-selected="true"] > .w-master { display: none; }
.w-master { border-inline-end: 0; }
.w-detail { padding: 18px 0; }
.w-back { display: inline-flex !important; align-self: flex-start; margin: 0 0 14px !important; }
.w-dialog-header, .w-dialog-body, .w-dialog-footer { padding: 14px; }
}
@media (max-width: 700px) {
.w-page[data-main="true"] > .w-body {
padding-inline: 12px;
}
.w-page[data-main="true"] > .w-body > [data-plugin-update-footer] {
width: calc(100% + 24px);
margin-inline: -12px;
}
.w-dialog { width: 100%; }
}
.dshw .w-tour-trigger {
font-weight: 600;
}
.w-tour-layer {
--tour-accent: var(--dsw-alias-state-business-primary, #4176e6);
--tour-bg: var(--dsw-alias-bg-overlay, var(--dsw-alias-bg-base, #ffffff));
--tour-ink: var(--dsw-alias-label-primary, #1e293b);
--tour-muted: var(--dsw-alias-label-secondary, #64748b);
--tour-border: var(--dsw-alias-border-l2, #e2e8f0);
--tour-radius: var(--dsw-radius-md, 12px);
container-type: normal;
position: fixed;
inset: 0;
width: 100%;
height: 100%;
max-width: none;
max-height: none;
margin: 0;
padding: 0;
border: 0 !important;
box-shadow: none !important;
background: transparent !important;
overflow: visible;
pointer-events: none;
z-index: 2147483000;
color: var(--tour-ink);
font-size: 13px;
line-height: 1.55;
font-family: var(--dsh-font-body, var(--dsw-font-family, var(--dsh-font-family-content, system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif)));
}
.w-tour-layer[popover]:is(:popover-open, .\\:popover-open) {
display: block;
}
.w-tour-layer[data-dsh-style="pixel8bit"] {
--tour-radius: 0px;
}
.w-tour-spotlight {
position: fixed;
pointer-events: none;
border-radius: calc(var(--tour-radius) * 0.75 + 2px);
box-shadow:
0 0 0 2px var(--tour-accent),
0 0 0 5px color-mix(in oklab, var(--tour-accent) 22%, transparent),
0 0 0 9999px rgba(15, 23, 42, 0.26);
}
.w-tour-layer[data-dsh-style="pixel8bit"] .w-tour-spotlight {
border-radius: 0px;
}
.w-tour-backdrop-fallback {
position: fixed;
inset: 0;
pointer-events: none;
background: rgba(15, 23, 42, 0.24);
}
.w-tour-card {
position: fixed;
inset: auto;
margin: 0;
width: min(328px, calc(100vw - 24px));
max-block-size: calc(100dvh - 24px);
padding: 13px 15px 12px;
border: 1px solid var(--tour-border);
border-radius: var(--tour-radius);
background: var(--tour-bg);
color: var(--tour-ink);
box-shadow: var(--dsw-elevation-prominent, 0 16px 40px rgba(15, 23, 42, 0.18));
pointer-events: auto;
display: flex;
flex-direction: column;
gap: 8px;
}
.w-tour-layer[data-dsh-style="pixel8bit"] .w-tour-card {
border: 2px solid #1e2826;
border-radius: 0px;
box-shadow: 4px 4px 0px #1e2826;
}
.w-tour-arrow {
position: absolute;
width: 10px;
height: 10px;
background: var(--tour-bg);
transform: rotate(45deg);
pointer-events: none;
}
.w-tour-card[data-side="bottom"] > .w-tour-arrow {
top: -6px;
left: calc(var(--arrow-x, 28px) - 5px);
border-top: 1px solid var(--tour-border);
border-left: 1px solid var(--tour-border);
}
.w-tour-card[data-side="top"] > .w-tour-arrow {
bottom: -6px;
left: calc(var(--arrow-x, 28px) - 5px);
border-bottom: 1px solid var(--tour-border);
border-right: 1px solid var(--tour-border);
}
.w-tour-card[data-side="right"] > .w-tour-arrow {
left: -6px;
top: calc(var(--arrow-y, 24px) - 5px);
border-bottom: 1px solid var(--tour-border);
border-left: 1px solid var(--tour-border);
}
.w-tour-card[data-side="left"] > .w-tour-arrow {
right: -6px;
top: calc(var(--arrow-y, 24px) - 5px);
border-top: 1px solid var(--tour-border);
border-right: 1px solid var(--tour-border);
}
.w-tour-card[data-side="center"] > .w-tour-arrow {
display: none;
}
.w-tour-layer[data-dsh-style="pixel8bit"] .w-tour-card[data-side="bottom"] > .w-tour-arrow {
top: -7px;
border-top-width: 2px;
border-left-width: 2px;
}
.w-tour-layer[data-dsh-style="pixel8bit"] .w-tour-card[data-side="top"] > .w-tour-arrow {
bottom: -7px;
border-bottom-width: 2px;
border-right-width: 2px;
}
.w-tour-layer[data-dsh-style="pixel8bit"] .w-tour-card[data-side="right"] > .w-tour-arrow {
left: -7px;
border-bottom-width: 2px;
border-left-width: 2px;
}
.w-tour-layer[data-dsh-style="pixel8bit"] .w-tour-card[data-side="left"] > .w-tour-arrow {
right: -7px;
border-top-width: 2px;
border-right-width: 2px;
}
.w-tour-head {
display: flex;
align-items: center;
justify-content: space-between;
gap: 8px;
}
.w-tour-step-meta {
display: inline-flex;
align-items: center;
gap: 8px;
}
.w-tour-step-badge {
display: inline-flex;
align-items: center;
padding: 1px 7px;
border-radius: 999px;
font-size: 11px;
font-weight: 650;
font-variant-numeric: tabular-nums;
background: color-mix(in oklab, var(--tour-accent) 14%, transparent);
color: var(--tour-accent);
}
.w-tour-dots {
display: inline-flex;
align-items: center;
gap: 4px;
}
.w-tour-dot {
width: 6px;
height: 6px;
border-radius: 999px;
background: var(--tour-border);
}
.w-tour-dot[data-active="true"] {
width: 14px;
background: var(--tour-accent);
}
.w-tour-layer[data-dsh-style="pixel8bit"] .w-tour-step-badge,
.w-tour-layer[data-dsh-style="pixel8bit"] .w-tour-dot {
border-radius: 0px;
}
.w-tour-skip {
min-block-size: 24px;
min-inline-size: 24px;
padding: 2px 6px;
border: 0 !important;
box-shadow: none !important;
border-radius: var(--dsw-radius-xs, 6px);
background: transparent;
color: var(--tour-muted);
font: inherit;
font-size: 11.5px;
cursor: pointer;
}
.w-tour-skip:hover {
color: var(--tour-ink);
background: var(--dsw-alias-interactive-bg-hover, rgba(15, 23, 42, 0.05));
}
.dshw .w-tour-title,
.w-tour-title {
margin: 0;
font-size: 14px;
line-height: 1.38;
font-weight: 650;
}
.dshw .w-tour-desc,
.w-tour-desc {
margin: 0;
font-size: 12.5px;
line-height: 1.55;
color: var(--tour-muted);
}
.w-tour-inline-action {
display: flex;
flex-wrap: wrap;
align-items: center;
gap: 6px;
padding-block-start: 2px;
}
.w-tour-footer {
display: flex;
align-items: center;
justify-content: space-between;
gap: 8px;
margin-block-start: 2px;
padding-block-start: 8px;
border-block-start: 0.5px solid var(--tour-border);
}
.w-tour-nav {
display: inline-flex;
align-items: center;
gap: 6px;
margin-inline-start: auto;
}
@media (pointer: coarse) {
.w-tour-skip {
min-block-size: 32px;
padding: 4px 10px;
}
}
@media (prefers-reduced-motion: no-preference) {
.w-tour-spotlight {
transition:
top 0.24s cubic-bezier(0.22, 1, 0.36, 1),
left 0.24s cubic-bezier(0.22, 1, 0.36, 1),
width 0.24s cubic-bezier(0.22, 1, 0.36, 1),
height 0.24s cubic-bezier(0.22, 1, 0.36, 1);
}
.w-tour-card {
transition: top 0.22s cubic-bezier(0.22, 1, 0.36, 1), left 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}
.w-tour-dot {
transition: width 0.18s ease, background-color 0.18s ease;
}
}
@media (prefers-reduced-motion: reduce) {
.w-tour-spotlight,
.w-tour-card,
.w-tour-dot {
transition: none !important;
}
:where([data-dsh-style]) :where(button, [role="button"], a.w-button, [data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row, .dsh-row-actions, .dsh-tab-panel, [data-dsh-tab-panel]),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):has([data-dsh-style]) :where(button, [role="button"], a.w-button) {
translate: none !important;
scale: none !important;
animation: none !important;
transition-property: background-color, border-color, color, opacity;
transition-duration: 90ms;
}
:where([data-dsh-style], [role="dialog"], [role="alertdialog"], dialog) :where(button, [role="button"], summary, a.w-button) svg,
[data-dsh-style="pixel8bit"] :where([data-dsh-row], .dsh-row)::before,
[data-dsh-style="pixel8bit"] .dsh-pixel-cursor {
animation: none !important;
transition: none !important;
translate: none !important;
scale: none !important;
rotate: none !important;
}
.dsh-tab-indicator {
transition-property: opacity;
transition-duration: 90ms;
}
.dsh-skeleton {
animation: none !important;
background-image: none;
}
:where([role="dialog"], [role="alertdialog"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {
scale: none !important;
translate: none !important;
transition-duration: 100ms;
}
.dshw .w-tab-panel,
.dshw .ppt-inspector-panel:not([hidden]) {
translate: none !important;
transition: opacity 90ms linear;
}
}
@media (forced-colors: active) {
:where([data-dsh-style]) :where(button, input, select, textarea, [data-dsh-card], .dsh-card),
:where([role="dialog"], [role="alertdialog"], [role="menu"], dialog):where([data-dsh-style], :has([data-dsh-style])) {
border: 1px solid ButtonText;
}
:where([data-dsh-style]) [role="tab"][aria-selected="true"]::after {
opacity: 1 !important;
border-block-end: 3px solid Highlight;
}
.dsh-tab-indicator {
background: transparent !important;
border-block-end: 3px solid Highlight;
}
.dsh-split-resizer::before,
.dsh-split-resizer::after {
background: ButtonText;
}
.dsh-skeleton {
border: 1px solid GrayText;
background: Canvas;
}
}
`;

  const DSH_STYLE_NODE_ID = 'dsh-workbench-ui-v3-styles';

  function ensureStyleNode(id, cssText) {
    if (typeof document === 'undefined' || !document.head || typeof document.getElementById !== 'function') return false;
    let node = document.getElementById(id);
    if (!node) {
      node = document.createElement('style');
      node.id = id;
      node.textContent = cssText;
      if (typeof document.head.appendChild === 'function') document.head.appendChild(node);
      else if (typeof document.head.append === 'function') document.head.append(node);
      else return false;
    } else if (node.textContent !== cssText) {
      node.textContent = cssText;
    }
    return true;
  }

  function Styles({ id = DSH_STYLE_NODE_ID, cssText = styles } = {}) {
    const mounted = ensureStyleNode(id, cssText);
    useLayoutHook(() => { ensureStyleNode(id, cssText); }, [id, cssText]);
    return mounted ? null : h('style', null, cssText);
  }

  return {
    Icon,
    Button,
    IconButton,
    Input,
    Checkbox,
    ChoiceMenu,
    StyleSwitcher,
    FontSwitcher,
    CoachmarkTour,
    computeTourLayout,
    Page,
    TabBar,
    Tabs,
    Status,
    Empty,
    Split,
    SplitResizer,
    DshSplitResizer: SplitResizer,
    Skeleton,
    DshSkeleton: Skeleton,
    Row,
    Search,
    Switch,
    Dialog,
    Styles,
    register,
    styles,
    DSH_STYLES,
    DSH_STYLE_STORAGE_KEY,
    DSH_STYLE_EVENT,
    DSH_DEFAULT_STYLE,
    normalizeDshStyle,
    getDshStylePreset,
    readDshStyle,
    writeDshStyle,
    subscribeDshStyle,
    useDshStyle,
    DSH_FONTS,
    DSH_FONT_STORAGE_KEY,
    DSH_FONT_EVENT,
    DSH_DEFAULT_FONT,
    normalizeDshFont,
    getDshFontPreset,
    readDshFont,
    writeDshFont,
    subscribeDshFont,
    useDshFont,
    syncPortaledOverlays,
    syncPortaledFont,
    useSlidingTabIndicator,
    useResizableSplit,
    createOverlaySyncRef,
    resolveHostPrimitives,
  };
}

// Editable browser entry. Build with node scripts/build-client.mjs.
// Shared original browser source. build-client substitutes the engine identity.
window.__ModuleLoader__.load(__stardustUpdatesWrap({ id: 'dsh-remotion', factory: require => {
        const React = require('react'), { useState, useEffect, useRef } = React, h = React.createElement;
        const W = createWorkbenchUI(React, require);
// Per-view preferences stay in this plugin instance; user files are never changed.
const projectLibraryPreferences = new Map();
function ProjectLibrary({ items, scope = 'projects', language = 'zh', searchText, updatedAt, renderItem, t, searchHint }) {
  const saved = projectLibraryPreferences.get(scope);
  const [query, setQuery] = React.useState(saved?.query || '');
  const [order, setOrder] = React.useState(saved?.order || 'updated');
  const controlId = React.useId();
  const useMemoHook = typeof React.useMemo === 'function' ? React.useMemo : (fn => fn());
  const collator = useMemoHook(() => new Intl.Collator(language, { numeric: true, sensitivity: 'base' }), [language]);
  const visible = useMemoHook(() => {
    const normalize = text => String(text ?? '').normalize('NFKC').toLocaleLowerCase(language);
    const words = normalize(query).trim().split(/\s+/).filter(Boolean);
    const timestamp = row => { const value = Date.parse(updatedAt(row)); return Number.isFinite(value) ? value : 0; };
    return items.filter(row => words.every(word => normalize(searchText(row)).includes(word))).sort((a, b) => {
      const tie = collator.compare(String(a.title || ''), String(b.title || '')) || String(a.id).localeCompare(String(b.id));
      return order === 'title' ? tie : (order === 'oldest' ? timestamp(a) - timestamp(b) : timestamp(b) - timestamp(a)) || tie;
    });
  }, [items, query, order, language, collator]);
  function change(nextQuery, nextOrder) {
    projectLibraryPreferences.set(scope, { query: nextQuery, order: nextOrder });
    setQuery(nextQuery); setOrder(nextOrder);
  }
  return h('section', { className: 'project-library', 'aria-label': t('工程查找', 'Find projects') },
    h(W.Styles, { id: 'dsh-project-library-styles', cssText: PROJECT_LIBRARY_CSS }),
    h('search', { className: 'project-library-controls' },
      h('label', { htmlFor: controlId + '-query' }, t('搜索工程', 'Search projects'),
        h(W.Input, { id: controlId + '-query', icon: 'search', type: 'search', value: query, placeholder: searchHint, maxLength: 200, autoCorrect: 'off', autoCapitalize: 'none', spellCheck: false,
          onChange: e => change(e.target.value, order), onKeyDown: e => { if (e.key === 'Escape' && query) { e.preventDefault(); e.stopPropagation(); change('', order); } } })),
      h('label', { htmlFor: controlId + '-order' }, t('排序', 'Sort by'),
        h('select', { id: controlId + '-order', value: order, onChange: e => change(query, e.target.value) },
          h('option', { value: 'updated' }, t('最近更新', 'Recently updated')),
          h('option', { value: 'oldest' }, t('最早更新', 'Oldest updated')),
          h('option', { value: 'title' }, t('标题', 'Title')))),
      query ? h(W.Button, { variant: 'ghost', icon: 'close', onClick: () => change('', order) }, t('清空搜索', 'Clear search')) : null),
    h('p', { className: 'w-muted project-library-count', role: 'status', 'aria-live': 'polite' },
      t('显示 ', 'Showing ') + visible.length + ' / ' + items.length + t(' 个工程', ' projects')),
    visible.length ? h('div', { className: 'project-library-list' }, visible.map(renderItem)) : h(W.Empty, { title: t('没有匹配的工程', 'No matching projects'), icon: 'folder' },
      t('换个关键词，或清空搜索查看全部工程。', 'Try another keyword or clear the search to show all projects.')));
}
const PROJECT_LIBRARY_CSS = `.project-library{min-width:0}.project-library-controls{display:flex;gap:12px;align-items:end;flex-wrap:wrap;padding:12px 0}.project-library-controls>label{display:grid;gap:6px;margin:0!important;min-width:0;color:var(--w-muted);font-size:12.5px}.project-library-controls>label:first-child{flex:1 1 240px}.project-library-controls>label:nth-child(2){flex:0 1 180px}.project-library-controls select{width:100%;min-width:0;min-height:34px;font:inherit;color:var(--w-text);background:var(--dsw-alias-bg-base,var(--w-canvas));border:var(--dsh-control-border-width,1px) solid var(--w-border);border-radius:var(--dsw-radius-sm,8px);padding:6px 10px}.project-library-list{display:flex;flex-direction:column;gap:6px}.project-library-count{margin:4px 0 12px;font-size:12px}.project-library-controls :focus-visible{outline:2px solid var(--w-accent);outline-offset:2px}@media(max-width:520px){.project-library-controls>label:first-child{flex-basis:100%}.project-library-controls>label:nth-child(2){flex:1 1 160px}}`;

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

function MediaExports({ project, dirty, running, activeJob, busy, setArchiveReview, t }) {
  if (!project) return h(W.Empty, { title: t('工程尚未保存', 'Project not saved yet'), icon: 'video' }, t('保存后才能导出视频和可编辑工程。', 'Save the project to export video and editable source.'));
  return h('section', { className: 'media-exports-view' },
    h('h3', null, t('已导出成品', 'Exported videos')),
    h('p', { className: 'w-muted' }, t('每份 MP4 对应已保存的工程修订。修改内容后，需要重新导出。', 'Each MP4 corresponds to a saved project revision. Export again after editing.')),
    project.renders.length ? h('ul', { className: 'media-export-list' }, project.renders.map(render => h('li', { key: render.id, className: 'media-export-card dsh-row', 'data-dsh-row': '', 'data-dsh-card': '' },
      h('div', null, h('strong', { 'data-dsh-serif': '' }, t('修订 ', 'Revision ') + render.revision), h('p', { className: 'w-muted' }, new Date(render.created).toLocaleString() + ' · ' + Math.ceil(render.bytes / 1024) + ' KB'), render.revision === project.revision && !dirty ? h('span', { className: 'w-tag' }, t('当前已保存版本', 'Current saved version')) : null),
      h('div', { className: 'dsh-row-actions', 'data-window-drag-exclude': '' },
        h('a', { className: 'w-button', href: urlFor(project, 'mp4', { render: render.id, download: '1' }), download: '' }, h(W.Icon, { name: 'download', size: 16 }), t('下载 MP4', 'Download MP4')))))) : h(W.Empty, { title: t('尚无 MP4 成品', 'No MP4 yet'), icon: 'video' }, t('先准备环境、保存并预览工程，再点击“导出 MP4”。', 'Prepare the renderer, save and preview the project, then choose Export MP4.')),
    h('section', { className: 'w-section' }, h('h3', null, t('工程备份', 'Editable project backup')), h('a', { className: 'w-button', href: urlFor(project, 'source'), download: '' }, h(W.Icon, { name: 'download', size: 16 }), t('下载可编辑工程', 'Download editable project'))),
    h('section', { className: 'w-section' }, h('h3', null, t('归档', 'Archive')), h('p', { className: 'w-muted' }, t('归档保留素材与成品，不占当前 30 个工程名额。', 'Archiving preserves media and exports and frees an active project slot.')), h(W.Button, { icon: 'folder', disabled: busy || dirty || activeJob, onClick: () => setArchiveReview(true) }, t('归档此工程', 'Archive this project'))));
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

        const engine = 'remotion', title = engine === 'hyperframes' ? 'HyperFrames' : 'Remotion', route = 'api/dsh-' + engine + '/workbench';
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
                return 'Stop the active preview or cancel the render before archiving or restoring a project.';
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
        const css = `.dmw{color:var(--fg);min-width:0}.dmw *{box-sizing:border-box}.dmw h2{margin:0;font-size:20px}.dmw h3{font-size:15.5px;margin:8px 0}.dmw .muted{color:var(--fg-muted);font-size:12.5px}.dmw .bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:10px 0}.dmw button:not(.w-button):not(.dsh-style-trigger):not(.dsh-font-trigger):not(.dsh-style-fallback-item):not([role=tab]):not(.w-row-button){font:inherit;color:inherit;background:var(--bg-surface);border:var(--dsh-control-border-width,1px) solid var(--border);border-radius:var(--dsw-radius-sm,8px);padding:6px 11px;cursor:pointer;white-space:normal;text-decoration:none}.dmw button:disabled{opacity:.48;cursor:not-allowed}.dmw input:not([type=file]):not([type=checkbox]):not([type=radio]),.dmw textarea,.dmw select{font:inherit;color:inherit;width:100%;border:var(--dsh-control-border-width,1px) solid var(--border);border-radius:var(--dsw-radius-sm,8px);padding:7px 10px;background:var(--bg)}.dmw .w-input>input{border:0!important;background:transparent!important;padding:5px 0!important}.dmw label:not(.w-checkbox){display:block;margin:10px 0 4px}.dmw pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:12px;margin:8px 0;max-height:220px;overflow:auto}.dmw [aria-invalid=true]{border-color:var(--dsw-alias-state-error-primary,#c83240)!important}[role=dialog]:has(.dmw.w-page){width:min(1160px,calc(100dvw - 40px))!important;max-width:1160px!important}@media(max-width:700px){[role=dialog]:has(.dmw.w-page){width:100%!important;max-width:100%!important;flex-direction:column!important}[role=dialog]:has(.dmw.w-page)>nav+div{min-width:0;width:100%}[role=dialog]:has(.dmw.w-page)>nav+div>div:has(.dmw.w-page){padding:12px!important;min-width:0}[role=dialog]:has(.dmw.w-page) nav{width:100%!important;flex-basis:auto!important;border-right:0;max-height:170px;overflow:auto}[role=dialog]:has(.dmw.w-page) nav>div:has(>button){display:flex;flex-direction:row!important;flex-wrap:wrap;gap:4px}}`;
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
            const [lang, setLang] = useState('zh'), [projects, setProjects] = useState([]), [archived, setArchived] = useState([]), [corruptedCount, setCorruptedCount] = useState(0), [archiveReview, setArchiveReview] = useState(false), [archiveTarget, setArchiveTarget] = useState(null), [environment, setEnvironment] = useState(null), [templates, setTemplates] = useState([]);
            const initialFields = cache.fields || empty();
            const [project, setProject] = useState(cache.project), [fields, setFields] = useState(initialFields), [durationText, setDurationText] = useState(String(initialFields.duration ?? 8)), [durationTouched, setDurationTouched] = useState(false), [dirty, setDirty] = useState(cache.dirty), [creating, setCreating] = useState(cache.creating);
            const [job, setJob] = useState(cache.job), [busy, setBusy] = useState(false), [error, setError] = useState(''), [notice, setNotice] = useState(''), [pending, setPending] = useState(null), [conflict, setConflict] = useState(false), [exportReview, setExportReview] = useState(false);
            const fieldsSplit = W.useResizableSplit({ key: 'dsh-' + engine + ':fields-width', initial: 272, min: 210, max: 420 });
            const inspectorSplit = W.useResizableSplit({ key: 'dsh-' + engine + ':inspector-width', initial: 244, min: 196, max: 380, reverse: true });
            const busyRef = useRef(false), fileRef = useRef(null), latest = useRef({ project, fields, dirty });
            latest.current = { project, fields, dirty };
            const t = (zh, en) => lang === 'en' ? en : zh, activeJob = job?.state === 'running', running = busy || activeJob && job.kind !== 'prepare', jobStep = jobStepOf(job);
// Update protection: dsh-remotion
__stardustUpdatesGuard(React, "dsh-remotion", { dirty, busy: busy || activeJob, retainOnClose: true });

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
            async function open(id) { const next = await api({ action: 'get', id }); setProject(next); syncFields(fieldsOf(next)); setCreating(false); setDirty(false); setConflict(false); setPending(null); setArchiveReview(false); }
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
                await api({ action: 'archive', id: target.id, revision: target.revision, confirmed: true });
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
            if(!environment) return __stardustUpdatesInlinePage(React,h(W.Page,{workbench,lang,icon:studioIcon,tourSteps:mediaTourSteps,tourStorageKey,onTourCopyPrompt:copyTourPrompt,title,subtitle:t('编辑视频工程，预览并导出 MP4。','Edit video projects, preview and export MP4.'),className:'dmw media-workbench','aria-busy':busy?'true':undefined},h(W.Styles,{id:'dsh-media-workbench-styles',cssText:mediaClientCss}),error?h(W.Empty,{title:t('暂时无法读取工程','Projects are unavailable'),action:h(W.Button,{icon:'refresh','aria-busy':busy?'true':undefined,disabled:busy,onClick:()=>perform(refresh)},t('重新读取项目','Reload projects'))},mediaError(error,lang==='en')):h('div',{className:'media-loading-skeleton'},h(W.Skeleton,{variant:'card',label:t('正在读取工程与渲染环境…','Loading projects and render environment…')}),h(W.Skeleton,{variant:'row'}),h(W.Skeleton,{variant:'row'}),h(W.Skeleton,{variant:'row'}))),"dsh-remotion");
            return __stardustUpdatesInlinePage(React,h(W.Page,{workbench,lang,icon:studioIcon,headerMeta,tabs:headerTabsConfig,tourSteps:mediaTourSteps,tourStorageKey,onTourCopyPrompt:copyTourPrompt,title,subtitle:t('编辑视频工程，预览并导出 MP4。','Edit video projects, preview and export MP4.'),className:'dmw media-workbench','aria-busy':running?'true':undefined,actions:h(React.Fragment,null,
 project || creating ? h(W.Button,{icon:'left','data-tour':'media-create',disabled:running,title:t('返回项目','Back to projects'),onClick:()=>navigate('list')},t('返回项目','Back')) : h(W.Button,{icon:'plus','data-tour':'media-create',variant:'primary',disabled:running,onClick:()=>navigate('new')},t('新建视频','New video')),
 project || creating ? h(W.Button,{variant:'primary',icon:'check',disabled:running || !canSave || !!project && !dirty,title:saveHint || t('保存工程','Save project'),onClick:()=>perform(save)},t('保存工程','Save')) : h(W.IconButton,{icon:'refresh',label:t('刷新项目','Refresh projects'),'aria-busy':busy?'true':undefined,disabled:running,onClick:()=>perform(refresh)}),
 project ? h(W.Button,{icon:'download','data-tour':'media-export',disabled:running || dirty || !environment.ready,title:exportHint,onClick:()=>setExportReview(true)},t('导出 MP4','Export MP4')) : null)},
 h(W.Styles,{id:'dsh-media-workbench-styles',cssText:mediaClientCss}),h(W.Status,{tone:'error'},conflict ? t('工程已在别处更新，当前输入尚未保存。先复制需要的修改，再重新载入最新修订。', 'The project changed elsewhere and your input is not saved yet. Copy what you need, then reload the latest revision.') : error && mediaError(error,lang==='en')),h(W.Status,{tone:'success'},notice),corruptedCount > 0 ? h(W.Status,{tone:'warn'},t(`发现 ${corruptedCount} 个损坏工程目录（原文件已保留），其余工程不受影响。`, `Found ${corruptedCount} damaged project folder(s) (original files preserved). Other projects remain available.`)) : null,conflict && project ? h('div',{className:'w-toolbar'},h(W.Button,{icon:'refresh',disabled:running,onClick:()=>setPending(project.id)},t('重新载入最新版本（放弃我的输入）','Reload the latest version (discard my input)')),h(W.Button,{variant:'ghost',disabled:running,onClick:()=>setConflict(false)},t('保留我的输入，稍后处理','Keep my input for now'))) : null,
 (project || creating) && !environment.ready ? h(W.Status,null,t('首次导出前需要准备本地渲染环境；内容可以先编辑和保存。','Prepare the local renderer before your first export. You can edit and save content now.'),' ',h(W.Button,{variant:'ghost',icon:'right',onClick:()=>setEditorTab('environment')},t('查看环境','View environment'))) : null,
 job ? h('div',{className:'media-job','data-dsh-card':'',role:job.state==='failed'?'alert':'status','data-state':job.state,'aria-live':job.state==='failed'?'assertive':'polite'},h('strong',null,t('任务状态：','Job status: ')+stage),job.state==='running'?h('span',{className:'w-muted'},t('步骤 '+(jobStep.index+1)+' / '+jobStep.total,'Step '+(jobStep.index+1)+' / '+jobStep.total)):null,
 job.state==='running'?h('div',{className:'dsh-progress media-job-progress',role:'progressbar','aria-valuemin':0,'aria-valuemax':jobStep.total,'aria-valuenow':jobStep.index+1,'aria-label':t('任务步骤进度','Job step progress')},h('div',{className:'dsh-progress-bar',style:{'--dsh-progress-value':Math.round(((jobStep.index+1)/jobStep.total)*100)+'%'}})):null,
 job.url?h('a',{className:'w-button',href:job.url,target:'_blank',rel:'noopener noreferrer'},h(W.Icon,{name:'external',size:16}),t('打开官方 Studio 预览','Open official Studio preview')):null,
 job.state==='running'?h(W.Button,{icon:'close',disabled:busy,onClick:()=>perform(async()=>{await api({action:'cancel',job:job.id});setNotice(t('已请求停止；正在关闭本次任务。','Stopping this job.'));})},job.kind==='preview'?t('停止预览，返回编辑','Stop preview and return to editing'):t('取消任务','Cancel job')):null,
 job.state==='failed'?h(W.Button,{variant:'primary',icon:'refresh',disabled:running || dirty || job.kind!=='prepare' && !project,title:dirty?t('先保存修改，再用同一修订重试。','Save your changes before retrying the same revision.'):job.kind!=='prepare' && !project?t('先在工程库打开工程，再重试本次任务。','Open the project from the list before retrying this task.'):t('重试失败的官方任务；工程已保留。','Retry the failed official task; your project is preserved.'),onClick:()=>start(job.kind==='prepare'?'prepare':job.kind)},t('重试本次任务','Retry this task')):null,
 h('details',null,h('summary',null,t('查看运行记录','Show job log')),h('pre',null,job.lines.join('\n')))) : null,
 h('div',{key:(project||creating?'ed:':'lib:')+activeViewTab,className:'w-tab-panel dsh-tab-panel','data-dsh-tab-panel':'',role:'tabpanel'},
 !project && !creating ? libraryTab === 'environment' ? h(MediaEnvironment,{engine,environment,activeJob,job,busy,start,t}) : libraryTab === 'archives' ? archived.length ? h('section',{className:'media-project-list'},h('p', { className: 'muted' }, t('归档保留素材与成品，不占当前 30 个工程名额。恢复后可以继续编辑。', 'Archives retain media and output, freeing an active project slot. Restore to edit again.')),
h(ProjectLibrary,{items:archived,scope:'archives',language:lang,t,searchHint:t('搜索归档工程','Search archived projects'),searchText:p=>[p.title,p.body,p.template].join(' '),updatedAt:p=>p.updated,renderItem:p=>h('div', { className: 'bar dsh-row', 'data-dsh-row': '', 'data-dsh-card': '', key: p.id }, h('strong', { 'data-dsh-serif': '' }, p.title), h('div', { className: 'dsh-row-actions', 'data-window-drag-exclude': '' }, h(W.Button, { icon: 'reply', disabled: busy || dirty || activeJob, onClick: () => perform(async () => { await api({ action: 'restore', id: p.id, revision: p.revision, confirmed: true }); await refresh(); await open(p.id); setNotice(t('工程已恢复。', 'Project restored.')); }) }, t('恢复工程', 'Restore project'))))})) : h(W.Empty,{title:t('没有归档工程','No archived projects'),icon:'folder'}) : projects.length ? h('div',{className:'media-project-list','data-tour':'media-projects'},h(ProjectLibrary,{items:projects,language:lang,t,searchHint:t('搜索标题、正文或模板','Search titles, text or templates'),searchText:p=>[p.title,p.body,p.template,templates.find(row=>row.id===p.template)?.[lang==='en'?'en':'zh']].join(' '),updatedAt:p=>p.updated,renderItem:p=>h(W.Row,{key:p.id,title:p.title,disabled:running,meta:p.duration+t(' 秒 · 修订 ',' sec · revision ')+p.revision,description:(templates.find(row=>row.id===p.template)?.[lang==='en'?'en':'zh'] || p.template),actions:h(React.Fragment,null,h(W.Button,{size:'sm',icon:'edit',disabled:running,onClick:()=>{setEditorTab('content');navigate(p.id);}},t('编辑','Open')),h(W.Button,{size:'sm',variant:'ghost',icon:'folder',disabled:busy||dirty||activeJob,onClick:()=>setArchiveTarget(p)},t('归档','Archive'))),onClick:()=>{setEditorTab('content');navigate(p.id);}})})) : h(W.Empty,{title:t('还没有视频工程','No video projects yet'),icon:'video',action:h(W.Button,{variant:'primary',icon:'plus',disabled:running,onClick:()=>navigate('new')},t('新建视频','New video'))},t('点击“新建视频”，选择模板并保存。环境可以稍后准备。','Choose New video, select a template and save. The renderer can be prepared later.')) :
 editorTab === 'environment' ? h(MediaEnvironment,{engine,environment,activeJob,job,busy,start,t}) : editorTab === 'assets' ? h(MediaAssets,{project,dirty,running,fileRef,upload,perform,setProject,t}) : editorTab === 'exports' ? h(MediaExports,{project,dirty,running,activeJob,busy,setArchiveReview,t}) :
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
h('div', { className: 'w-toolbar' }, h(W.Button, { variant: 'primary', icon: 'folder', disabled: busy || dirty || activeJob, onClick: () => perform(() => archiveProject(archiveTarget || project)) }, t('确认归档', 'Confirm archive')), h(W.Button, { disabled: busy, onClick: () => {setArchiveReview(false);setArchiveTarget(null);} }, t('取消归档', 'Cancel archive')))) : null),"dsh-remotion");
        }
        function apply(ctx) { let locale; try {
            locale = ctx.get?.('locale') || ctx.locale;
        }
        catch { } W.register(ctx,{id:'dsh-'+engine+'.workbench',label:()=>title,icon:engine==='hyperframes'?'layers':'play',component:Workbench,inject:()=>({locale}),order:engine==='hyperframes'?65:66});
ctx.slots.inject('settings.section', () => ctx.slots.register({ name: 'settings.section', id: 'dsh-remotion', order: engine === 'hyperframes' ? 62 : 63, label: () => title, inject: () => ({ locale }) }, Workbench)); }
        return { inject: ['slots', 'locale'], apply };
    } },{"name":"dsh-remotion","version":"0.1.0","hasWorkbench":true,"packageVersion":"0.13.0","label":"Remotion","labelEn":"Remotion","suiteComponent":true,"sectionIds":["dsh-remotion"],"iconData":"data:image/webp;base64,UklGRtRZAABXRUJQVlA4WAoAAAAQAAAA/wAA/wAAQUxQSLcXAAABDAaNpIjZ9S+7cEDzAiJiAni94dZr/V7YLxlvOL3zzon/4uNFDViDy4RLhO6Srxi5XKhrpAMabYQsbXBIR6tk4Z0NuMuwQClVLiX27XjA/s+QHf//XlXVJ7aTRbJIsrZt27Zt27Zt27bjrHmyjLG7wRSf1zVdXd3TmPPxJyJgwbYat3lClSxviuIgQIvVX9q1bbeNpEg6y4lvQpnfiUEF4FYb4jpA401EyIJtO0ql7UUmAxGTO4Wn3b/U5rv/9x9/YcL+C/kHxLkQURQJwVkbfKwQKWXNRVuawITwrtR18Kpb7XHoYQfsuulSXYhI8DYyJYqLt9PKh9z24YR/HXynWl84uBcx0QaCR0TUf48HfzSIndUqdsbB4Y+L+1Gbd1L8e+u6y7NT4WClVNoY6ztjlLL4fRfibQ5p1TrkolY4KKmNTXdaWlxZpzYttuy9f8Np6e1zNlMEN1JbdTFWjy314DxYqW3AOc/5N/AvLXFeG0VC0MCb5sIoY20mhEhjcxJtUVVL0RGTYOJrpyJxg9BOfNOVWNtzTVrxY9h6LItLh5U4rM0JBOOnzIPSthEXhMYIQayNOWzgS9AqXMzGl7ZiuSOI5DFYl0Tb4jf4HcGzjJIWAWekMmEm7G1eR6JN8Ycpp4KShQPs1HGvPf7wI8+8M36SBZzSKdAYxduOTcbpYv8wv1CVw+x3TlljUIufrZZ+a5/66t/1iEmStzFrwTYDnEX3Ilmo8VmYfMVQP0ex8wt38LFfQ+sw2VWItxFxxh6Ir5GAMbivPzEeCcaSGRNR/dTOlymXIP/kLUmEDTSx46w5770bMlCzaquOjo0OWTRxThv+BR2Aws4JsEiwYP6arlIu6PqE90tz1qYU8czMefEJMdU3PGzjQXjHDVppk2233WKVwR18k00zRUSHButb7eZsTC0sqwEy6kBrznEmAY3162CcqP9e94ye5tXSdtYPz5+4XNRUbXOC1ppjA9642ZtTlM0MxRK5PAI6mcV5wylmysveNQ0OMJ5hKj5UjjhpvuZpm2PU53vogLdqq1Sf/BmJwRvud/IZx26/6CeJbGp835G1UJ9bJFxsnwmJqtZhxqW9m6VtjtPtwYM0DqGWLPoI0RJnfTwLdecwayJMgkE9RhGt+CN0BkUtFll/26k5kqBNoYNXuCKDKM0Etd/+5blwMLLudED3NPjz3WuOm4KaCWukyUzVHC5vYawJpnUcXYcxxvfPsXS5QXDaaAScDehetI3h8/NzEU9MxuZa4cXOvlzKvDYr1qTCI6FsDBPvnTCIeHrGut/loJQJmmB4aPYxSTBmbJyHB2Jw0cRarBj1+gnahzEKu1CU7pcaW48FjW8bMDIyMOpiZMzFIkY9193n0L3X6R3/hptPeGz9HA9xKT2aHo9ovemxRJoBvNy24qWnMaEH0YDr/3IA3KTnthRNiBV/DJ2AxvShqRC01j9OZrC+coAIa8y4p8//LrbgS2kAfLEJcd5cbrFy/QoJKJycmsZp2UlQPi8NwchEhuIAm5BJtFJwN3aiZkIRneX/qrzwl57E0phS51FQ4dK10I1SV0zLcPtFPfLRoGZCnF6CCpiRr0oNBZ2HWgZ7s78Ao7hzmWqqGkb1bh7EqGtrQImwdjXiYS0roiHTYfzSM3pbkJfWLdFoqhJvtifWNMLFa9bU93pVxGhBLNzsHNGpkMHa1mpkzgfAJ4qSi0k0jauuAW19SNySLA2vamg/ePmlPAUr1N7mXtsDGCdXJN4ssGEQhyTBGa1+77czdbhoOYA4UyxLinMS91JL07A4eFKHL3TtmICgRZ4yAKw1WUuTEk4u1hlMHUgRbw7JQ2MjkrUe9vEhaP1J0FIbYxpoeuxh91mDl1doDiI4o5avoJP14eUUeX4H5WRYzCzO8T3Q3pi9o2dTEMEF3QSZ0CDxfXeKGKeV/k7KWiXBWp6WUho/b0dcNAO5WyV/XhI3xs0L9BakxypUMFk/3MNNZ8DosUY53NiZmgHdhnkBJfH1dTrQ+tDpnAK9Fmh4nLvJUpC0zPiVKWKV3939I9R0kuz4m9+DcQXB8bidamgPdHa9rqs+9XkZVilPM1QGcCZLzWqT1A3LR9RIWXtK9bvvcSaOmQwH59vMpZ9WtrWWkUrY3LjEJTVuY5xXv69R/8Pf/HEWTIOCVSaFmNzD4+hG4i5iVScmiNPSP0OHNYVjVOuWyILCQ+2rr4VEtPgP0AFFoYBdKkBR7Szy2b2PWKdnI8aqfqsvvzzdTzzWtl1NF1sYWd22opjlWcUa7q74xRh1/Pnz5eRODiBsNDwF5pmzWOS9iXi1wxs+X6KPEEqfgOeiAB7SLO++rZU4l6Iq6x5bYZjm5sg5hc7S/hupjsYYty2J6qZ1GOMpWuWp1ArVRqXW1fsymLV6ZUnQftCAy6FAgwKtaOUjwOc1fuhXXWPsBzEAqT94N0HWDIO6WT4MVUm8uHfM48Qres6y0mWsD7UO7aRYHez6OR+AwpEkqrl9MFTmn8da0oZcADXKAmudcf+sQLySuDgrnHYSudhB7aKsLQBhgxU+7UCsiriiDqtVFYBpbyPFnVs1iUuqmBTRyZBhpmIdsErVbj8KqWTs3OUrmCRofRhDfQXtTBttyh6J86i46vyh8HL1NllEPVoRozR+5tVjO5fVFDuOupSDqpbE6uHnplGbkT4EauAEGhMqJn0xTmca2AZBbWOA8r3Yeufx1kPSjLM7IFW4gTBOKUq3SVSqvUdoMVYE04ZUKRB0JaRJK7o4per7je04xTBjdHYDiQr5XaFMoBrNr5KDPu05Fp25edXpk8Bo/r+gM8tMhv/QAkv63VGGzrX1Ci8Sq0x4bUqPymB/Ae1pioUCsm7GrlmRgNPgaTBpUmJ/3fU1gshLNTTRXUFnD1cEER2dYmxN3KYY11UPIo9Jh3coYLtry1WDOD0KlaeWEMgy8W/SMtvz44nO7qsEGPFxibYGF5SQTWq7V8dHi1nE2NrKxKuAfpPgyxzsQisKojvTHGPMGQxK9RwTiQerAE4LzIARZrJ/M5UqnwDSx1oY9+/iFSBGvf7wWlpvGF2dc258X02ewjt05eyKagifn8Y4MLzsQqtQHKTlJlioIY2JA4lVROw6I2sleOtmFUik4zVKhRMqEHBaoWYnFi/QH2+f9LF7FVwXFdSXHe9pfNWxEsFV+BDWAG1mSKSCmPny9bHGruUPGHV6E4O88yPzqR70aj/qMcawGyEs86VX3yJWBaODkqr01LYfNfhxlzKvy3g8lELOwL1F3KHsuJOlF745DZkJQ/mhBZ6UhXgc9MBjbAxOilQK6XRC6nOJc0iUPTwtTes+gehogkmgEsiIoWfMHWNaSp7E6EOoVGXiJHsRtVMpJK2Ush1zmbt4yublDjgtE4842CQOpfqYCjk4g1WCiD5LDcbEaylaty/zIXkBUb29EoZF1j6GgdfaDSb2p6jMRpfTgt5zO7j9mIVD2Y6oqpSO6fVYnM5mZ3YoCcFLm7bELJjG8Djebj1tZgG5OPadAcwBsMb+c/kAYiUdqs/EGyGZw+j+hLGRLQnjshvPBGOn8rvVEAYmX7qwP6VR+W5xSuxd4IPPKZkE2apUiP3QJQooL9Mp8noJuOMt3VGjLP55dIMWfxyoiHiJ0had7puc0gDC84IKz8HUqcOpWmS4JisywnBs7rU30sKOOX/tnolW0vLgwQznJJixRh91EDKDm6DjV0AZwP75weP33HHKAsTuuc+0AeHHWBlcn4j2xntmnJah2kyBIEcVypGWxp/vZ9JKdMUio/YjkmPN06X/hEUZow6rAq1sjHXBfOmYXc0riy4q6PiwwrFcnoGEs0InI+lQCV3n7JFFKzdu+sAbhFG/P6C9Tg+0XIpwimO3vdlOoukjAAVmzkesHPqmdi5ouFTU17CfUtmqykCclROhaFQCMOr/G6yHPMA0Wd7lrsN0lVPFSB/K2Bhbjv06RdaZqVttdEqzv/UZBqKmMOxwrId8060UYTQSJmniapDnmk8Ie+qk9kE+G6Pt5uUIt0xvbNL5AhMAVbYNPvFkqkNTlqYITg9ApbWYZrjeZIe1fAmqnGW8tMaVpRC6GPX9E6YOb075UW5OXxPS2gWy64uA7uDWfEEfW44B2oK2Q/q4Yi8v+mPKnJK1fODflF0CgIUyaF2/JAP0W+hmyAbwMQZLiYR64Qio4XzUBrOv6E1RSTSuvt/7R8I0Bw9ayWaDeQ20LLbpwWFlmaAjokVGJzQu+P6Ar0rz8nOq0pFKzfYAhpLHxD7UwkrSw37F35NeMwMA4Uk0OqWPdnXSGaGGO6ilHIdx2nsWlG3chugagPZ4TKGKGaLqpobW+YmVI7Xj/TBZ9qpTmClmJpc9SgUNfluReDlSVxwB5dkaGwNPEc1bQPTySn0fm78E0iarxzqeX0tMpuQ5Q/NWGnFthnfXjctwo3qMbTkOOtY2M5cgHSQNFGFNpN8AHIHegbsYRSUYWdOyyRtwyrpAiNWkPyItTnkcq7B78WmMdhrpoHWoRAKn20PfZPxuSFxYOBhdA6dVHjxgjOHO6wtN5TQ7T48UDUEbQcl8VIjHWMD0Y+HqDRl3ofEZsaJxoTe2IL8/YfoPQaed12IwpT/xgnFeobDaGmyjfcGBYM+Op4gVi42h8oM3t4cFr2HlTOuOoqL7XryIWm4PwbAI00o4LKU/yjUa1wkmCj1twBgoZfKh4axEoeXNSIOAZ7pRkcRpwLOAzSPBGz9bGbRidwh4OXWq0QsXKn1yxtZ6qgZniqgHUkMruKezwfS+fl2pWOJEw496cq7NJ6iDta5xRxJcPTpz/UKJCVG/9L2YZzKzfy7NMNP+u8ueP1ptqjGtV7ACxluo30jvrUEqv8AB1pNhppCnbQ51VVWCabkY9X7YwgG6kd05CP4Yn1zbwGDlALH8sVjR9ifGaOkjb7vnBadMbpJwcWVLTZwnllGFtzpzHp9OT0CWQkiA/TAvsns7M49mKgsStxdvgOSRiKjj7XCm9DA10nIhZRGLTrzjsgR2qA0nQN8r+kL7tlm6eNummJ/7UjmaXgf9EQRukyUkT9YYairedCWJUuCuNFX0ChGBCLmlisUnvSRVPps+pARtEBHt5ne4v2yRQbO3IC/vv0H4s7OKDwQtMzPbZBvAXZCN4F5JFcCdjW9X+B2o51ioAHcIv1Tx2aHa7MP3AqaBLgjLzArEC/YdXoZKe8iYgsycZaDHsHjMrkDhmGI3BXV4HtLazM9YQGQ5jNKchXULfvaLH4sWUfc3fCtsPl6bzYosghnCY93A+zkl+7+YPRoyXz6Hkr4osSgnT6MxtjgITrvO8KeXDpm9NW4htxoqSbHVfNuc3ZR4eKjGyi1JFJXa9SYYFZR6J2et3fWvoR0MOoJp4jjkx2ZThhVyMhe04XdQuiEl2z6v33m2u1SYjxnflSo80TTzE/veLxWRJCg6W4euYTDr389nw/AdsMjQiNu0GJaYLRhYMfniViQK0LReD6dqPPrzg+QA+2Frd88H1PvYbIjC07lvRrTcLym2Fqc2+FpG3pYCFlGkN0r1mCVIs17DXeDqEtMGEcs5vtpUr69taPuHjp/S0NM+jEojmEwBHYfyGvUVrPnoNRvlu8lp6YlQ6ZMbP/D5Mvq7M9JOsdZFfAVW1B/C6EgFiYMoyvetWl9DZTDgHehQbiHEtFg/x91yN3Bgkf71UZRreCukTcUNNOjXz2Gr+xpiufDds8XM5BRweJ7gtJo2Jh13EJ3hP4wFNhx7ZDq2SS46XupGnngiA4dVeJMieh0qv9oO/vVZYhutxdU3JRk3L88GGE6Ds0wvYTB1EO02ASb9EUpfiiBzfHTCATS+zNP2JGgH6ExZv+4hWJN+RPbS/GriWEwJ9JG4ikTR3a6cddAm+fSId8qAwTP/UpDuhQaiDUyM7+PKEzcmFpWg0AEFlCKfICeE7QSkXCFNk29M3W7v7Tx54rpsf1zo6fae4tRMVK1DZ+syjVolV0R0eh0a33wozuGy3zViAV5NktuS05fXAfb9txKnXP9sDW0lzj8UMvzxDrHO3pPcjEIyra/xY85Njyx+p4hW2GNB7azLwuWmcfiVOGA30Z92jJu9dt5Kt6AzUVM4nJ6BzlI2c0ynrRWQGnargAvKNRbJKBxCUf7rahiBuXiaVp4H68OcV2ci0DzamaZtaOf00bi6AKMrp+G/Yq49gI6CbqBoDoQd7G6bnsB6r9WYEy72txMvxOa44s+w6oIzYWx2fwZXDR8l/zILhacKGnkuqN+1M+DQABeYdUwVgwqy08tYk2F/Fxe+WZB4Uf2t+l9sZZHGznt0J6IQdmbzp1rX+KIHsaI6XV7z+VECN08IdJMx2Q6exN1FBbScXDPOod8vT9VUIDyUxtYkitl9XQPtrWSaXZcIOBBCdGiMuo3uUEQSo/bfZG9msJqS+4hjoMhdP0vHaWmVraelyWjrzidkkWNnHlGIfzQ+YwUEEe0FZU+OFi4fW7rdh/+8KPjmVk/WKyAQdFamPQatc5BETyABTlG4xv5lkLiiEFycBQZzLq65YiDlFnqesMaHhZx5RhZojNgVOvzJ44lcYUNQADdl3TGxN7H8k/fNkqzwyCb59b6eLMnkyXFXBVFDhMPsocQLELu0nQavrOL83MzAoSj9rnCFA/Phe0HTyaXyByMxJtMj5l6ZgYSi7wG4RvN8KyvXHO6oUzEnAvq9uExsD0h6U0B34/F+OjGtP7EiZlpt/ZwGwaP9q1NSxWXNelxNDYwiYoXNNtdsJPwHcVLwJpz/VVZBP32O3lvv/L0ItCZubjoEyMo6JKgYugRGN0zoth7nd6Pe4qHiXoeFvV778LlQDXEV9NXnVva9MG52ce+lZxEt/wNkoIRdg3AO4BJBPCkcRaLIXvdDvoDUftVfGENMnO63eFKm6GFHgrreD6dU1jLCOvoPLHmPl2nMPYRE4QNv9/kDzkhdnprxMb0N+HylEszBJajn4aMcnGm4LjUNUdRe32CTwbStIxKsFCsqb7fOZaOtWV5Ywe4ha7IOMI9Qw20UiZIss4HVj3sLyjYIW6fcgbE6TzFb6cS0y3+E2pxKcEALLTXT6VxwqRuppkOrvMxcxgL+ei0nr1WulxBGdASUTmcbKbJELz5GHY3vl3geDoDLpZlh3EmtcR7tq0NJlO21W2fD+rOQplAhUkQbY+xWFG37+sS5c2Za03hcrkM9tj3/yqOX50yUcKlFf4YmY9JKaamyaFGFsLqAwzSOoRZO1GvY0P5vQjasZJxI7VhiyowyrjZk/lumwAHOOnjOJV7BerNnYRTs0ST8NQxzWvQvqAZV7NuI++u15SVdYTz1O/yFn/42sHP+eP+cLQ/7ENJmAA4OLhhppDbhFGnxfXLICOM8ovVnOx1NT5Z8MV7+fLYdBy+32gpDe3rzs32DWoab8PCy65xq6byHWkmpvFetaecw9cwuJMLcf6t5zv8e7BpeqMAadHjggeZCtKPFW6FMujiWEUqaxrxR2uGfa9a5aOQcBNycd44c4M0hzGWHGlRm/vRIh2qsPYGFFpUuaMHX4ZTOAOOx5wC0MgCU0iZr5ymlnMPvVywS27uH7XnB3c+8+tKTd5y98yKMPLlZybqtUCoTf9KnF8hri52g7gBPLZP+eNK4PV5JaTyeLJXWcS6khcOnl9bzB8RikfVfI+i13SdzWfvggO7EhIhYGqvnmaq/3o/CaWVS/6WNcWtWczWCnFOfE8b6lVAcc34WJr30xhw4JJz97f7N2lPffZ/4tQbMnqiR5tzEV49bQhAJHliHO/fPy879tx8N55RU3ks+pbIOU0/rVNnFGApGHdY68+nxk2oAIKf99O6tx67Xm9iiu1z02Lujxnz2yl0nrNHNq7WJui+2ykqL9llh38uf+nhc6+QpU/76/osXrj1s7d7+CsVz5f7tdn098L066JHH96/yciyZ932Lvkussd6Gay09qEOK1JMoTFHPG0t5jniXvv37924f+H3l/13Togff+9GPkyZNGPHI0ctFCf5U4UjEU3IRFwKPr5TMRphlMx7OJs99adkpX1TH3n26imaxYHmWWEB/mtzTiBTEfFesDJT4vtrE/+oo/PD+Tvr/fv3vP3+7QwBWUDgg9kEAANCoAJ0BKgABAAE+MRSIQqIhIRatDVQgAwSzN3C48Hgsz/AdhxjvzP5B+yBWX7j/Y/1f/ePdT1SdV+Vnz1/0/8f+bPzN/0vqi/TP/q9wD9YP+l/kvW9/bv3Yft/6hP2p/bv3gP99+4Hud/vP/G/ZL/d/IB/bf85/8fbL/7nsOf5H/rf//3AP2u///ru/up/5/k4/tH/G/df/w/IR+1H//9gD/7+oB/3+KA/lPoQ8GfzPg7+LfOv3L+7fs3/df2y+M3L31Wf6Hob/G/tz+B/u/7b/4T9xvlP/d+Dvxk/o/zb+AL8f/mP91/uH7Q/4j9rvp/+v/3XcJWX9AX16+gf5f/EfuP/mf3h9qn/S/uvqZ9lP+37gH8w/pX+j/vf7wf2v///WP/H8Fr8D/tv2k+AH+b/1X/Xf5z8pPpb/l/+f/nv9d+z3tc/OP8F/z/8b/r/2q+wb+Tf0v/S/3L/Kf93/Hf///3/d36//2Z/8Puj/rl/1/z/Q9gZGGv/6FR9dJ/8+1ulk7bujzoWrGMJLEgmFtRmZvHr/0Kj6yqSJZlBhzu0/zbO5RMXm8Zja3v/KRseqIqiK1Kq4JsaTHOp6ePrpPzoQbmngTV4S09kZ2U7FzGr/uMmcBlyaZryrURi7N76ywDy5E9Qqfb+zm02Q9C4m25dTCMcDOsBNqnDaAo9DqtDKbhMvndKzFekBXMnGnryjRf/0R3hv0+hZYVlF76NRKA7SwSJyVUcUlPw5vxwGHdpE/CJrbwhTUZwnPHrpPzz7gC6Nw/OG5YlP2VuKJmNd/The0cD6Y6loV8VuoULHpCJ9jEmJV+ZZ9tNypWE0aIVmt19r64fWzRFmMNbRtKuOoY/IxSYevM3cJXjfUOgzOaQ5FICgzGbDX6FoZD9H00fro/z3O36tpJWJWPyKQyaEI9dN+gFV4ZtlvkoOhfOHouz+R5rF/wzFFbngpSKZK3Kh8pUOOVIgdFcx0FNQIMJGSCplXJRIVULll4j2XdVwRmNCLxeN14TUn1Z+IeJ2xaMCXWFuZtQ8Jrfimhmur+RCFowf15NFiY0mFkusrPAv0n/GTNaTb4Zvc7PTzv/CLYxU82YaLpSHqUAO/Uw6xDWPkCJv2WifIbvp76f4V8uQz9N9ey4t+qGc4BenYgszLOxF0ElFhljIrPubFthJJjn6VpvJL823U5scVcE4vCeWRt6Kz3ED2w5NRb0EbPaFHZlY3dWAWkZwtrTuu8K3S8HowoLXwyN4ZT8HYzLNpwWQuc5Eohb2IfQ0+fwOHLa6B4TlF1BVoS+1uNVxRWRR4vHh8tSIBJ+gsMsuS59hn6pa41m/+q8CFwo+bI2E/Y9Chh3RqFXkYpN/Xb9ykRjsavIVPffQAV8d/1pWtGpq9ovorJyT/wXUbeyuHKrIg/xp6QrvuuQ5Hj3h7STNOKw4e/zVyN7uYGiAKRLGsPecmZVAMkzbvyquKrih1x7Z+8GcxEGIEF4i/uPmDasLbtFlFuVpmLIEatiEizDwtnzudocjPpUL/ChfWii+8E36EJsyltW9Nkako6ppM/g0lHu06/LxBh/nVNqlIoW4ptCOSIIylZlp4N6zvgR86lOa9Sn2neGg5tMTIoNDH5sD5+7e/F/rS1jq07Rj2rbTIzWYLqk0KF/WB9BLaoHZw4dbsagr4kvQv5q80UMXjCV1yAOaFnTACM80wQ/Sh0OpuNyDTlfepKcn1jXcFtUVC6VJZghHmEI6y3BsKlGnT4/v5UjcI215QIQ3xc4o9Bu+/nh89vh1tzeJkw3zKeajV7Of44NR/Zj/6pria3P6FR9dJ/9Co+uSAAD+/9JAAAHgw6XOmBEwfA1OyP8OPE0VXEbQeD0OeT2yN0IjBG9Q9hVjIPcozNknqobYwy3UH4Lkb8Zr5NvZEvuauAoKrumoE5yr9U3tE0c7ApLWipAbC87eAJI16VDvwmKSbv4gJCG85ycLS7FWZcbaTc8dkdXzhvgzitCDw2J6XVON+KaUcoFzxYhCzM81K1GEQJtUgR2BXIzBINvwW7fkulD+igi9ulQNt+/o9bmdasDswk0PBclPmaCEILtQ7pLA5idWDsM3Y2kfjxmM41QZ+oXa2wJR4gCdz6OlAlfACRaEvbyUDQ4eiPKSG61r4MNKhbyjDPdrSzPeJpm/j7icbZbLcvmPpQKQlKDHmp28ZZJn9+GxKXVXclr/5LMvY5hSfN6s9XjwYfS97rp4Ay1HO5IQDWdLzqTb3rDQWbjSQCq4iy5xsDz+jr0ceWjDUhp90+mW4wV8OXTuzVEzB4eUOdV98v0LA7RHR3/uv6mqdghrJ+itKHQdkvE6BNOb5TSlz5tJtIOxiaiSa99tPN7MDBuq6VUoKbmSjbhQNEa+uWpBtcfJ8BSf4HJAYMAzNvueNSgiPyDqPy7T25lUun7ZyZx0m+iUQzJO54sVr6z3LTAq7YZngEdvAsUnwl6ArNZgtpyXQcj0pjlVbojanD4DoonIf1HhqUf5cyeXdJ3e+mWQd8/U+C47sE1TGxxmlMcxi1qoPwJ3B4ji7w23NtVqbnoM2aIkCGqvHOV6U9qJc8kmdnrUi1XcgW0Z5iHAidba1XBM7Iu4i4iEisPJ6w+gryhfQv79R3xQb3sFY7E8zQgR1TYhLuI1gx+nYUxmyeuM1V+Vts6wCbhpsrsvfF1lh7zbiO8zv/loD8EyfaIkeba0MlQJen7Nv4P/gHB10jpivCTj/6zpfZOp/Pclo68UnGUE0POX7narsaKFFSxcbYyOn7curCZh72vNtfS3ZDYBDfIj2Y1wweDUG2Vm1IiJ1zTXPk4v31vI7zB3NfLbs3hxeLglnhXKI+BjLMnorMShRhUX5fsG1ZeKrQaLZ5DzEMgNtJ7e93xUI8HPKTswOm7nCH3HjJb1w4uCE1alaNEor85eqrqJRvt6ZNh5Am87QJfMbin0TanHN6tUe+hp09u9lCnvW9au2/XtClqucJ5bEGYPDNVwQDED3/KmeSau1nzt2Gq+gEfMvodnU8Hn3CFZIt+dPEOHVKOslbbS89Mp4Jugnrl7063b8GeAx9XNflOlvZTp5P1K0zzu/cLm4+2ecNHN6NBUcim5AHBSOd03VPpGFcr8zxb6HYYWGiDbzBvyz0YTfOhmXOA7m2vmZc9y9XzqBcVLU+HIXBrHLeHn1TXzmCP9FKy3oxghA8lWjX/OxXGSKT0q4SDF+ATyGr7i/VV51Q2W5bRBzEPpeDsCDbOeAFAQyOYaftbZDUkv9aIjuJUt89kr0IEvICYOCuxl37E7NKsswBQHfyebFzz+vZsd5cYLAYiv4/l8UZUHLMaoKknqbSfvQuqBKDxf+Nuu+iiThWdLUrxcBHHKDhk7LC90jVn5g0VN3Ggs8bsEu0aQsQ41weHKfhdBcYOSWwFeaQsk+qMggx3uFkjtxswA6/P4I6SAO2iHZPus1TGaakCjC6APnU7gZtO4VN8ke1piFrtIUr5P57bTF9MvWb3DBn+BhbkSwHqBCVt391l9WRlaYlfEj3nj9qwj5Js1JoKfN53le5tVgP+TWijOA2n68tdF3RDm1gLkOdv9Gv11wwm5MfgA5oy/xmV9dRjF7EaR+ddQnBE11AiQ1FOf/a6fGagUeRwGOBCW5pB174jDURUrJ+j7+TxC9Y8GeMh/U5levSfCmoOYA/9MdrJXAWUxo+CPiwgSRXWULUCuWphOFIC6dBRZKRNcjoKTYzsBMHjXpSXBYAktO+CGJnXOaK9Rcg5jvNr0MK35z+DDmm9CFsvvUWEdWm3CfW0krvyNM5D3rV7lPYkf3wnrner+qEH3j5ixslobTUfraVVBBbehI3xZcBCS+n6FlRACqpid7Qm2xU6NjFoHWlTys2VQaV5oksltyY5as7Ls/493f2JGkxa65QYNrl8W7JkGq3w8YQWccqQbMqQBnd0ZnhHjUyAj9ywV2D1pvTbgkoHwyCOJG2ohV9JAoOgODafBw4iwj4P9xPW/U9gB6B3IRSWOwg2zk6L3p4GYw55WFfVVz45uwpxPIw/kOgUlE83JAU7QnRorc7e9Q81Qi/dx0IZuyD4IYSTKnp9oJwzZWiIZpMnsA50qUlB86dDCJS+CtQOttWBogkDKB5tQKLRanGRYpcM+uOSVTmP1oWtOx9k07xVf0qVP4N/5JzTtVu4A0z25EbMlglbiPQiL9JXJLDy4PdgB4pYPCImn29FvpwSUE6wKr53zNQpoBrF/yCk2OpJL6S5+eoG8M6fwrHo7AiOkxnAcYEKJBLwQxWxPRXQPGo7oto/12+PcZ3sQ4O2u7gFlbXvLyJCo9u6lP0WEzij6JRRuUg9vVpcGlqnqmPuH5knUXtR4k/FOrsXey/kANp3HTbpDogi50pxEKnY+i6dz3cQf+0wugUxG5NHy8/QiFs5Uxfa4esy25NfenmG5UmUvd3y8jvPh7+DqL6EFn5QVM0UzarY/cOaHwyUH0wTrCTmo6T+7esp2x1MHBuP/lxIvP3UCseYazQ2WEAzvIqjKPtiDpvrh4vurwmiUVFWFhCFZDfkS5qra/TszQmpXqHqWasyMSsLZkPJpcDfKTm4qiEJpnXJpkrZdJ1D5HoFDEFVUqlSvppYc3Hs2Zc13Ixn3X7r2rI41Hsa6IfhMAi2aCgWYllcnQvxlYpUyvQhLYyctU/YbduxlC5fbAn97rI0O7d0NqHQb9alSOH6BxNuHCRq/MgXNNGAtgqzczHb9p0X4M76yZjN3VNVL8oDxBTQWoEFj8L6kDqt0yxY2d0SQdi6Xe25tSgO+29UQ08rQHjd21JAFiw9tr2TQRRPyiNaBVF8Fq+FtIciIE0wt5WUca6AAw8CU0sa4+H/Zme/oPZBlRlBgm08Wc1FIoQdjKHhgw0rVvIaN5SJ5optAON+c/pTk1mJY2iDKLH4TnYFNP2FiTv7XQpTH4HoVL6z7M52tTypcfBwzRGfVWieol1+1OtSaUh73BJEymPLlBUYUpqir3xWqDivf7V7h0o5s76Lf9J93raWWorooVuGk/OJc1vvb6WZ/FSwri9RcRh/flOIkw+o/VFLOXpkiNo2o021YsqwS0N4yBUpOquPWWlw34WlweMegC/CShXpxWt7nXooFdzLYuthBq8I2G1las02cRbO0YsI1Ix889Eg/E3fyLTnwEZrv9imuQUEv05e249DDAWrE3MIGN4tFuzgie8H/mH+jWwY2yllabqERXS16LoRMrm77g9oOojmjgIgjbsvxXzk+rJC4Oi7URqeBBmfxpJToR1MHKgsZIZA4w7uA1rkVjUlVssqg9cgTzNlXVC2ZXN5exdpGsh9LlEwHou0cBO/XZD/SXA1yhVpplEMeHZ6lMQCqvCH+Bl1MtuPgK4qQOHLxc4crPT46fBscn8B2m66QtBav0/mCZzKsFI5ZZTZYsiuTIgGXwbFf4bk3oozoogwgrx9wHYCqsQ8+CzWgWEHveXpZapBXAaN9sOd6uN1q6HxnLxDyGEEkd3uv5M7LX8KITcMmeVTFUhPJfI+t7OVdhDA9PpfwYXqX3/RTo9rwfoVeIgYyzaYvqu3jz1c9K3lRUNWDmFT29NjMnsdvAt3y6rAH+qY12QvAen0jiRKoMtu9PdApA/+Ne/TIbGprLqqpZiDEui3hOQJIpgzvAcyQz9EzxYa/sGfr5jEsU0kfwRX/rt1OwjYgX+jNkGs+/6CLUxc32Ux0ZP1xCF2QRyGYraZi+QzfikZmwA08o5wRvZWS/2Tf5A4AGyNB1HfA3RoqLppl8IToFmYVi75kQfJUzQVsirdDBLvEiQKrig1BqKAptaJN6HCJc6HmwFcAUGJ0JvSkXFN1WK4PQW7ZdwWCAJdgVl35Z1uTN7pwi3boQCpVWeFXQ2b7HDo2BefiXUIbYvetY+YZC7bERXKSeBXXAVP1EjSuxVsQ82QSguwaois0iMIxqPbcv44gV+rwDNJL6uGVS7Hh8UOtdjcns5TzMnQfyHhUMC5BKZ9Ct2X199aFXH+XPQjf4/1swZaiiZlxyl+5hb9mwn/FVT43Rq0+9+AT+5OZl4S+zfsW46dTG1tel30z2BDtu1S1W5rwax3rvO0lLdOSw2jhVvNMp/MthmoYah/s8gPTKZKoPFY1T/YpdZhK6k8fa0mnHKt/jm7RZZm1xr12JyaJfxtIusLv35Q5bgFP7dSN5XXQAIKsAJHAoEDLauIFCsvk8OuuKfSGjNoyNgjHRQA8Xd3R0FGIAUzf955PR35i9L54xZ6JoezA8w8sHPf8qV7TYelzS+k7kMBKU1UasM8BX94ovNGqhPH68ws6PpCjUyhf0o/Qo+0Pwthy1WtJ545QqYpwMxOSO1P1KuRLNimjzQ5AY35pEzrbEELzCBILSX5d0CwyIzO30XRT8e+rCgZGCAA2Cny9WWjBVKa6sauDrmHrE6ZS9m/y5HBlJ1ZR6qxqgftIlUnuoMxyavy2WkgZ3myIiN0Ft4ZN5HCSJvQA1gaumwLaBbrw9+RFDunwdPO/D82DpjtafgXXynHO1Vg9vFWjYu2za3/zY59MHDndalNsyIJ0Q93pbwp2nkR8sB7qZ/mP6JMm1FjBVY7pKIgcTvRONPSW89Q60uTDBMm7Xg/jtCSt4CJmPhYJinisnyKhQ+bNpMblRqIZ8UMBUaN4OubwNYIjUIq+PJZHkV8yX/3XvxzcGwNL6QwJ9opdWfom31FbUXz0UL9sUImgu2kSBgmJB0Dtyohux+COw1a8Kb5/rJcgtDYUFnXpQCRc9LT4shhI+l0NESvxnMoFX65/weKCy3Itdvt9aeNgqf/98mbz2rW1sLmUH8Yobww7RouwYnC/PIYDA0PWquTwJ2FQ4UPCYKLpaG2BviJNsFWW2XRniMeWkXdbNV0o237HecROSYYbafnwOs5DhyCJjD7fZobnpKcIU1BMCeTlYm7l+QaK1CthK7WiYpHEU+svR1xwFoWfwpdZLUY3nI0YXDM7NB8SMonNa2R7krC46DMk/BUffm02gP6ykIUptSDjzn8Y5HbRPOg97Y09VBE2If+nXW0eDxCn6Zs2kjOUlSCuyRrYLtY0xNPUVVN5jduLQOVJHttL5ZqZKailgNy66O0y4sksvdD51y/SIARtMKBqF61bYWnFOXes7FjxxVtkzZ6pXfb+d0L4vLcMyCf8LJ4lIzhdsuSeemrWIlvphj/HJ3FymoV1A7z6UPZAVTWHTGEanZW70xo/WQsOFAFEYwuZNU7wE8XMnn55yaqfgc/GpVkGODuB0FOl3FONhH3lDhRWj3aLtKt6kMpkdmOm0p3rA7jsMuIk/4dVjJXFZVcEBrd9NYGeS2XQ2RQbbTyf0P11IXqycAni6ygwaOM0r2wody6bFBil+BhfRjc3GWWs6GVze+Qs5DoxdEtHtiflwBaP67/yyf7kWwKgXbuRz7XT88c4Y9ufq/YZlCE3f78fc2WUlQklbJDRc5AkKys74hllazTLWnwsFktRl6pNmOZ91DolZWDe0oW+LLfxnL3g793PbqDoy6SIZhrMQRFBhBafFHvIsaxQ6P2gpiVDB9n2GfpFUMx9LJDN4pyg4kh84+B/1Zuf5DJj7QE88u7D++67o6KLZbLZTUFWsyWkLJonBEIcH1IkEmHzFKUnpiNFfXiOQJ3+L+5ireLkjW9ZFmpg2KPR/ji/SbxAOLPSxclkoEWhj/ba/BOd0qUduehGXb7y9Nvmma4FuVKATSfLmHS61uCnaJ9mJfM0GF7I7EAlsSntHz0vzyUKjdW8TcSY/Fl4SGnI/Xb4Hr3EdE/suN+CBP3j0nqwrvrPXiHWLra41871BOilOThZZM+nKyo9o8znNMKsqrHgJrtjUS4hXAd16w5X3RJbXQUJ7d4VXIDozFkFGATL9akWsokf0JuLmv3IuiYZ91g5SjGgYAdXiRkvu7AJrG6/o5pusqzDxDYnRaoZb4+tLs/oz9iC/XoLBUDOsKAgYIKCsWmnOTjkC/dWDVlb7ptzshiqNdPxEan6RS4DtwGxMTeg/oC4ciWI+tvRkroy6vVuF6tR/Fux0Q5N31nJtOeKMPdWEMnV1/qqC4sVerNoLxFFllUScWcXJQQL992rqfozcD8BT+SUtuFwPfgn8ZQSbQoRGLfbDXy9ccZkfdmQN+12FwO4IWwpdGRLEkf8F3lFYkC6ReOyVocfmdMtvYwfcoTJBssBpMoelpcNwUmwuS+L+tVuPl7rKLt5WBvUzD9D97YF+DsLc51dyQHJuGKpqzNnWFhtq4fRb00Um/Qy8gytae3zkvEe5f9t/dw/CxV49GsoQLoSZ4pVHob9wIl/SRUTTFJB2bQ5PxL+CZpBFc75cXQDwyExptJUqbXI27hx+FpvYRHtY5Eok/IHUYA0cYN/jm7qriKkN/WluNnG8W574MuNT6m9b8Po4XztYusP0lt6xyYI4747jocpsVK6IfrIQXeZXZILYPoLs3WG4wFjr18y5PdFbhmB1lL2QcGfzRz4Ma9KIGFdYP7XhZWqcBItBUbFgHggWTWDlvSVwzouVKpLhh8RtsyN5v4rUizyjoUwcmyDLgqJBIXRegbZ8YvxDV+TnPALEPO9BQkUQ9ebmwQx5rSfiaoK0mHjUSA9DFvDExcJ/sDns7+QbTkfC4EXU4NjT7fZt+vQEK6pW4MnnIR3CP5KdRzWtFkpIgOXOMxL+yhBI+1w6R+oyZy35KqvQiOKar/TgAobI5dVDdKzMIUlu3658jjXCYqqpb1r9kKaTfwGsQQAIFgg+N2V/oyGdoEgw9cX3LZgmzCTjpS7n02NrB3vPCE8xQj9tb6arnuKwEH04JIJrJFN7mWbA/mv1snuG2n++JD8QIjzZDOXFXKjo9CUk3aM2mYfVVUpyBLXJExCRQ2ldNaprvy4lA/lxEOAhfPdj0CgTDrsTFtL78TzKcoLdO9T8TNQPoHGiixLcVqFKp8Q2A0PQ/5tExFWaG2ePZB5DgrXzS69HW2C6PWr1km4G1Eyg/B6RmpTLZrE4aDxOJGW90WGS0Kn4AQjeVnK9Ah6W97dZzALX5HZ5AOYYVIfbpcQZ+cxZIyObMLyy+YJKy7RrDIKuMXW4EVBB2Pg7Ft5YpH8ZTbp5JQ8ZONxnS8LPkrPMYP0IxVkKCCihcfuJfHb3OupiRgXpWWe1rH/yXxvx7tynSY75Xl4hRC4dMnJvuW3MHMbpsTYVkhJAKJLF9HnZ5oTJ3m/Ol+mFB3JHUau/82TNrOWGsfLn2S/y4szCIK52GJPzmzIeshmI429n3RzB3PaaF+hz5z1/24uoopc4Qm58mE5BiMQnM5uSwgzqxyTSkLJ4annXGD/40rtRnbgxcRONSfVpgU7viLW86628IPQmlC8UumTRFyFhLpHA1pvQKtp55wzfAJr5OvILpUC5mEZaVKzrO00St0glsUKO0/jRN3v+cyT2Gl6TBxhb56zDG0+cbzYLLV3clDo4aBzOgaVxnGZQH6kT5yPvcm4vC/uzpjbWkDSPqPARzyWJ/T+xjDgRFawd5U+q9fxWLyw1jTmeEDQFhExL1WF+gvxwFRF0TH1P6AazQJkS5ogySEHguBoF8yaVAuLDzkPafOIy1zq02WIODHOthcGHHgRJKYrojC15j088jQUtzA3QE3OnUdXlSThJnva5rwarYG93MEvN6FG6VvdnDMMfxQSTQImC+nq2+Ys2fpeSu29+YT/TxrgVnJeLIqudLmv3toh6ER8cK+NeAu1qOnBdBScYtQz0vEX2AyRTxF5hN2cJ/PW6iVYPG09eFV3RdFvT3WzQxQgtK0wknW7qfpFK143y8Rbs8T0yJYIOSzLuVhXZr5bXkAXgj693k7D29lGN9aUvykLxTH5fSdX1TZXzcQqlwj5jb8D9STO4CfBrQHq6LpWg7cKvD3v53DOomS5JT+c37eZ/y6z5huZrijR4TKdEv6VJBvoIKVdPnNbUtG5PBydRyoI2KrEskcKJqAp7pKkOBeQRlakCm1SHiL3BI/WOmYYz18Gqe5SrUmGZ3csnoFsFUCKn+shKWaXHZSBNGFV8IqC/aYId3IG9xsyVmSrxL6/d/otuIte8tZ7ha7puUE/0bwjVg5zKWfs1230BEGvKm/NnH7EF7fXyMGBbfJT6kL7Ks5Cp+WV+gyH/+EP++fY568WUBovcSpKhNYfIJKPfeu3/LFfVRfJpmujdtiFRCh5wYb+KLBJO/HA0VIC4JYcK/1VZN8mujPUDrYbxJs/k+K+4PhKGLsUkpiSUwkTZf06er9cTXepOxl4plWfjZp+kpmCsrT5jkw7yq9Iz9onu61u9e+X9Ln3G4glnH97/UYgo41CzPOZrUbqGKmHkiXImF61RP+ItvF5oKM7zCdiL8pY5Ys+m2g9vTKfZj/HlQiUms68ddXAflgQzsy71IdpFtE5nIlauX+tisJxm/0Pf9284qV2KW/vZaMSHSFk/ry1shGDgHV5xPWFtNkV5HOh70ZwsviZNU3pebaTKg0qIQ2o0GKdn1y4qrm4DA2Hn7QN79fcwqvr6yizZ6icdFUL8smAqr1k88IcPZoHxoJ9psXBQ6efW6rEVqIQ/YfnzdwgXImSZ6lkPuvUBBcw7c4PzLhT74UbbUIxJRGbvn9NLedVSFfhfRKvedOAzH8siL75uhutx/D44D9gnnWlgum6PnzXBc27uHlBH5tjttBGYmN6AFcjAjOTYDTxCWNUbJ8G3g+1s3R3voxeWBboqiV/xAWDKBDx/ZfbQgIYKopBFEVnXEsx52+E5oeEvwdrBTYqSUv2HEITKIREUZbc4pn+Tdyu9g6XJ05m2PCz6Ti71KugniRyMWiwJYuVg4ZsKdjdI90REmqEeperOLRNYhx+16DCM1Xc4kNrCBI+r1Pt3bWEGOQkl8LI0AFUr3/eGHUdSwveVXp94W0b5uOsPJ41LeWTEJHcPE+nd6cCSCj0OJY+6Yci6NYTPQshbBHDd4LnO5f0UUmUnxfGit5CirQh/5Bhtlqv9BAAsYIYCjV2GaOksZm1eoKAEQWJpuhbHPb8OM9Hi3vXe/h4J2Wxuz3/aJqPtMmGMwjola6aKhH4DgvuIxONv2Rj6A94JQHY//TgxpQP9xQKmpyxDOQUfbEeuH6YrZ6XHC7POju73oBEd20ksz7xBQwzsU1eP6Z4/sWk0RbJBpdC1MKSE+mrP1exd7xYUQiq5AXm9Yk9HmYJ5TXgqWHaANnjhM+ruQL5ETLLUP1xk8dx8FOFdKmfHqZqeMJuzWR1t/nVsapfqK67+Yy7iL2ITbU2Z0kJ4iFHB4OVIPgqx1sgz0lqWy7GHNtnXuXPp08V3prQMx73aaFtmkSonVKb2ITRRBkVwZXK+cNlWeITVMVr1XV5zlXX3vjlkryJ1X918tPALXiFEps1/sTD9GQ3TREOAT0AqhWiS3AYebDXMqajaFLIF/MoDiSh6jBJWAy9WHglg401BC10WRuyrvoP6Yq4uR5x6plyVJmMXCH86K5AwTd5yru/GkyDU8a9Lv8PgKB5fOtwU4RAGRywc5iWJzNqj7GQQjDEGPkfv5lGmovMxuqPCaz/3q1Vo77pqo2YUN26KXfZLs72BkGxkWLE8KMvlA9uftZ/Lcs4jS0075/o4JtLIN+PgtlzahK61h/ZFuT0EXGIO53BQxSP3OmFKqSwEPPlccE0QHxb4xpHcat2YjxrQk0b9eF17TZBNFZpwUdSnlE/9t92Q8Bjy8UZYYfMYwZ3QSEEeXGM1LF/OVS4+s+8MU1NChSgIDK8cHeDl2IgwKARr9a1KJ7T4/Q8ozE3iG3/lafji70edGz5xTyezE0LU6d3vwFjnJJhRmK8uJGN93Au3vJO+grzEfi8Mzzn8eRX/AEE2k7r3FMT570B7XZLBt/5n7byFbueF67X/GnQrdX93kfz9qmlPDJ9U023/K4NMmOYG3OsSdjEvyNyxBY6J48gqn2l58RlkwUi4ZV6I8nBLyHvDJVqH4fnont/386sYJPC0RBkAGG2j/oa2srHBTPRIMAz6etVbwZtiel4BAVtThdYCpMckaFCgI6XJHGdTyeL2U4tdE2cxd91o50zhZyLu1Sltdqz6WwhQn3UURQ/0N2aoAqav6L4zk+QyRgxFWPOtNCzwrIHUFb/EFhvc3i6fjg/9xZ5SH5yrF93YjlTnRTsqm55lYyLwTwux7ZATIXiyHqLndqRv4uwSnnyS3Noxgu+OyQc9GxBmMD5EOg4KYZ5hF7Kpe+8RJHAkjbUn4QsZvho1ap2e3Jezjwb39f1hOhG6dPvlm7V1uzK9kZ+ZsbmMxzW+aGwMFlQb9IBKf8urtivTrPpYgeWdSZ6fLFh6P/XvuoJGX0pJ3YkpKaTEdmDsYY3gCANv4Cx+eK+rpWvC3d97M4qySK1GbiEa+l5VcsXEK2LesrxrOhuVqmZ1IxTxzmiqiUGDgDuNjo2OVFJB6mXrn1wj+edRRVGT3S27IuJca7uY8T0UxUj3R+9BcTKqS54AwPF1Tzd8iRNoEIx4d68g0e8QGeFBJGoDQz5XraQYgmjXp/8A0RyeYVCgf3uW4mLSsM7qXNwP+gW020LeRcS/YQI/dfStdxzIoCBngYE1bQbxlpjs8OMEn/r4QDrYmiUvXgorlFIlpB5oeLDVI/c7Z9kTB60FC+qPena+Ye2khFsvkZ91G8/NEKKbxH4GuTDW9zB5A1JucSssxw222FSOuKfUMVieeK0s/l20CHEgDuChpDUR2x67XOvu0eKdChl9ei2nAw4E1g0sF16aEXdWWc8GsfKPCuiBETu2StafHPAO0e3L7sOF8OZIGVHC5qx7Q+nZr0F7Q6kq7lJAlCmv11Y3vNAFTH7o13Akw9rx9fhfdfOgGbTx5WMBnqQhqK/UbdX9/zax2gOGp+6fDAreWwatrzzvwPw73YDg1+SgrFCGhtrmhQgI0LwThc/rvua4m880HgwdQYrcSV+NW33amXdCLdmqzAWz8o47cQStkpf/kmKBbrtExEVa3J87SR5MwDDXxyJhlJgU8VT4NdrXPb0nrt5Wx/7q1mAteUeld0iVzKqRB5dg/pp5i8Gr4RnwbAGg95GY1epfO5d7PHeb1tj40w+M4YzVT+jVSNcRg6Us0z/+w7C2Y+DHUhAKCvzeaZT/hMA02zODqooUAmYq3rkYhUyDP9hFOFccAfAIB0RgvmJvSx309pB5VTDV7Pya913iZCriQZ3oxlpzUeNuvYPRjKii4cKmQ2WKJjQppzABhlJQx4XJz++vtkraC2catcDC2B62GFu3C8kPX44LiESjLxtW1Y4la7shenCS6G1oJkFwCgZcvLPAJsIEdItwa8am7B/2YCHnCCs46ysHUcZbfDvtxCtEdxePUPjpIb3qiI5OXodqYpydrthyWokEPgmbLKUlWGKcQkZFlti4Q1HiCnYqEFnJdBucGkPXsbi7jxQtYjL8m93k1iR9jUSWWoZ3pPjoTB0gOL3qP4FUjQL7FFFj4AUxyJcHdWZA4IxMmKWbg1AWRHHEJt6hJgKF9wi2+UiXpu6hNYH4AICOhpiU5fBr41oEHfSu8vYPp+iMzSN0hUsTh3itkyotNAkCK09kljOYt4KA5OGqkRUUh8Rnjrl6O0sboI7SvqpTkSUUQwCebNSb5pkR6pRmy5ISDZvrKTthp/zWB4xfAYztPoSeGYYoIbyjjhMd3Z8ovw+6CKedmrsRpRdEYJDTvRyqEa11KnoTEsEV4VzAu/PZlXbjPo5uHUCEaX9EerU7TDZ7lAksty5J1M1lgAbTSC8QTa6/QZEuVG2iqrS+C2Ocn/YL5/S7WOg0ka3XZkw4hQbg4dFZqmYD21grbWxWl5zp9tAFWiHMewMK4GBFLupmkOgDas5ilXkKawJaMEvtpGdNMDpvwUCK1+JDsmr2LrQO9dX993BOIGS6qHqt4hPAkHj2iZRxmlPY1O32bR9VHxayiYcBuV6nBdG1Pzst/UUDDXapCu9jMgLGFFqwprKFkSQf07ojb5JlHrUJ2gNuvofCdagf1AxSGd4pXy1WeX9u8xfSVHGK0BGZk72sU+fdCu5nJTT3pOAib6PuS7fnur8/XM+2m7ZHkO3mhWTXrXdyMxMVb3WM2jvW441LHttqU9kE3AEfknfqyhEnMwphQ0KXADkCKYzl2e37F/tcY6p1i9G5PVhUoOpROpZyFfExQsCOY0SN+HxeoJsShxTbZbDNVN4da3Mu+PnOHG4GUi12v1NrgKnzm+ZmPipWEwtLEDWpZH3ZEsyhVliY+wnryoaRmddys2ZXr9cJcXj5zwzoEz+qVb9YWwmZtxz9WA4m2IhxypxipZ4BneOejJWL3HXmtILrcH1uM6aXP2ep/kHJOapJdqb//344DjXEz+AXSUsXc4Pi5Jds4PcUYzsU8ijP1TteRLY9pXsTUpLArAMxDWGYagytgwcp+9FyyRJPLD+QeIAwWGJmfXATcxwxngqYCvB6tgokD6zfeybUjt/cOY1yH67R6gXEr8MHDwLiUUskSbApyruyNZ/a88NZq0BL6QNU/N6EztV25bDL0bw/90fvjDwFSOcLpiXkkkB3CmrKDC+j9/QF4R5KIggS7dE2y1zymY11b/9Rps7f0hnHFGCSHdPlL8FTxn1LaN/OdQu852wxn+kwoRfqSo/OUIZUf03kOClev7fCauUo8ee7381IPNNGhScRQPqQbs0sEfYudG9YlzObirjRrLcESL+kDFhLqjFbqIFqunR8kqwxCpQgARiMJhuRUVXreVrs7EQPv9aFTX5akDDmomqwyY2P7CqbBxuWwmCPGQeU4lVrTDjtZn2pHL6JQctq1r90pmuM4pcpkGq6kAACKMTSVsF7rNf49CrAoWGrVh/vmgpX6Kf7a6gKZ69pxoW2EDcdRR4qtDuSn6L31ZBx6GpWRkH3VEjJMKbnBXaUsrp+l0Mnh7hx06YJcq8/NUEaNY69tiPqG32NGqJbHkatwR9VtXsq46P+6WoDBKF6vU4u71w9LpuvDKFzRyz+yFiNCewkYcvqQGB87hUtzOLqFFkLxt4nBKERNlFjam88jA9ygsxvG63ULnLppocl4gVWWMUMOHqjyY16KC0P3fUF64sLWDHq9K4H6vS3M82XHzJ+r5yZX9Rg6Wk/4tqbxou2IG2mPE90j1lElQ2NSDglfau7ZMxnf8wJACmiQ7QkFU+IcP5t5PftA/1LH4hsFvAj3ZlHKT0xVETkILjD9KO7AOu7/F2R88l4k8TCScWvcT2MWEAgE1AuFeXHkapz5zQqH1UiLaoipwX09OWVjmA6f8ovgfVIT0M52aXzGnKB5u108NiRsPIbnXOSh/el5Sph7oC1FQhxcMs4ex4UiodTj72J1Tc4Fnd2ee3npwg8smNRCIfT+Vu7gPVfLwtpYeH4NaH6xEtY4P9CubmoSnPPbw/H7uqdWWi8/D1AqISwp018X18ExlCPd9b2akTfUi/0oLuY2DJtaya+w054Lm1GyLac9bpTLtEsnx142H4GsWeQhEJvXPiTQLFjhlAygsPaSEvnlftEZHqbngzRcdl5zNecBuniz56bWf8dhvIHbyRjGOQ8k3W0h2awUNVd7xu1ttTQbZhIdnfvjMqO3cZd2tT9Ph74SmF+wj5hq2EYd0WeygGb9SBREdIEuG08bnnjoJu4dQhNXWPRHlhksK7H/rwxts7bBB9262j2BEAufIzYmk+n/yxjfrkiBgNWZyFa6tzPEzmKyOEB9GbLcxXouLnkKDm0FTJ88JL6Wjx2bM0k3caIcR077/dfRAExQOzgAlC3sz4081xKMGtOpSmV7eaMrkUF94QWnZVumbEJCRje20awgV43Q3mwOJ9XJJl86J8KNa/stY/nPSXVZRRcFI/vOXU4HYzAQUWJW9tIGXyUVVmgp3TT6wawrYpstOyT39uBpSU5xAfZTcNBkkYx1PyGGOtd4C8XJRCzgZ/94HsT/IPeLJWhqCmBwxgZZgXvkpPXNzVMgfjPX/9+gBBVZ6YILGnd0j+chgIuEXpWrUjfF2KWXavVhvAFP+IxhbzyZu9pJbDI5G0ESi7OpVOXibF0nZY9uSHNtvWvxwRCsYWRU67uK0+ffg0zpnSE/KOtqM8+ekrfzIMgHupbdOWZQUuasnOv4IcVoWxuf455cs6yBQbJcGv8Hys4cE8xsSvPB3/jNN2nlvmBwzt3l67+tpYqS5pZOo0CMLVOYxJuRVrmZ5zCOcAdVwkpnvMOjpky91nWrRx/ULjL4vJUYvW0nnIUuxTTY4YjrNkLEavGEX4g2TTSVjzL90DkUWpD+uGm38NcUDXKOBP7cRDnFGFKA3MpyUH3KPYHL04IzK7uSQtb1RD+fv7DtHVf3LAezIJQ1ZBM7tHyj+9r9Mmf5j88tfA5uoINoiRvXTKTlmJ/y/Hb8sC4U1uOtRN5PJ2MSn0ozY1qPPBbmHNOqn5LNeTfxOhzduwJ8xJ+UMLHLfC0mjZzcL1EzAepEZ1Hn82V4BcHoGdP+lKocf0Um0LEV3Gfxbr465o62aRIID2OKAkwO0/eGk8LGZC7bqWLNmkOfC25hfcY+fX+lKGx5NHwa3i3RL9yGnQKZSh9mF00iiZB+ruA415MRnsZTbVLz3KzeNqqldRFIO0+tVDslOTscEidjF7MUOEGJW+hb7IW5e6xBkha3iMFW14JYeouH2goijkMqvPgX6ooDH8PJAXmKFxxaK2Q1ArymeboHyTcmNUKsqmjcLr1P6/AzzdE+3TQw5ogFiUZ7ZRnLNBv5NbNvqmGzqxaRh/pG3AI2supXYLd+m5EXGlGFh7syLSk2J/+UlRX+kXwll/LkT2f53hqQ7f1J6H8pyVvAeppGV2z4L6kb2TZiTUiEHu9lPbFWcJIxlk0GRPyqdQtAoIJMMk842CqTUbjdVUZy57uuBiA0//3Z77yZ+erh+ubWlxku9l2jk52jr6GkoBvJpKNvyQyXNeH5etjY9sOVKtrCl5bGzgu4u61e0DK1nm3KXI+0MKRoOFpzXG792m8Ai0fa5nTtmb8897f5v/btz+GLcyla8H6401+5oIzQ+zRfrMMekl+n97jV3QMCYq77KX5ropE53l7iPVTSygt9May4sfYx6bS8Q520eEepY2ZiCJ+KamF44dP+m9H5DbEkXA6rqyt8b/95T0JOngQXAyHkNhDhKemJYtyqwfRARhN7wqu0RkWRH7FNWqGG5udUDT/C9F1tr87lhwxL04hbQPoFN+1Dq3Ez8lKDhGUPCAAaB5i3EMvu9Pw7LP8AQ2qGOUenXCPAde3fe/gIwGePppBUSO5s9UTEO7pJ8uBkABg/e7K9P6xLH8jJXVXRsVYSi9p1dhu7zUAYgaWWhkwjB5lEKlzPGj6Wzs0g1CrJSdaOmQdt0iaYBTYlJeBSIYxUH83nPBgpLd2QjsG4A3Q2njzUuDprdOcc5QR+P2PGJNjJg7xwCvsDEyglOlnPbqR7Hr4mK+7KUlzZYsJ3pMlXUkxQ1eNMhK9zrji4f19B4uM7pZBCtuXbzAkPHlrGToQ/K2KaYtHybzxnyUMVa2rcVviC3QF9Z1HAAEvsnOO7FEw52eYdagcOq8RDjSRq5SGfYK9+dsMfczlyPDZu5/LkGvMtzufvDM6nxahgxdfQe4cqGTqbESfVEWbXTMpfYtkRqjiuAOgpqrRgfEkkP6b0ETSKdKzEWLBrW+Cb7w6JXgzwPG23jr5ILjkBMGpWRKDZArcRQCw7SJh3YNi+oSLdFAXXo9YDAfJZpek+wpRrZougOyq0sH03g5kDtxZ6Dgbfj7NUZhyevWpfxPmQ28BVGNmeB4yin6asydRno+8agg1rlIpLAIq5tDLsjJo9D1YbTWruQibTEnXEiDRkD89Gk54pwpQany3UFxVKLq9GJy3+o5y7VXHZq5nWvlIEk3Fvl9NgLDg6h9eaoWsk+H4tSRRTac4eSy3mtznMSUsrzQ80LsVt5A7jdyEtRx4BihncsW+pQWb74jQlAAhS+BBHNhheNAlH+XSN8LkjJhZaPv0Ye8DsUeh0jUMMf1/eOPe2tKdFNM9KIq05FG8PSB/OMZjophR/P/DQef0G+GQapg3S05+Pdt/C0ipTNxQ8UZSIYBb8XiIE9yKF4q0+oJvj/P4tjmZWv+V0Z+4Oz9Jp+R6x1CDajQCqUZ2JjyuSuTKuQDp2gyq65kDxN+3Guw9o++LTxlbfujFBQ80HVj3ST26w5STCugyvQDee7SidxX5qubJ+SmvH8l78YCFoxSXV9IqtSB1LFl7HmM5cWPqFozHkDrwMxWOgLop2T6JN3jHFLxvs+CvsMpmntWxaJFe5m5heR+zVIiJi+zmKvPomGse1nMtKtrTko6yT+Swty2QiDTzRiT6w9czX5Sk90uH1+26dnPUUgvu0mK+WX7UasNDBAXVXcfwPSclJfDzzC85oqXYiYAfbOilZYrD8oDUFhbyMQCf8l4Mpz8Qst0v5AvRhBakx/NJPGSifUoXegBNns9AtMeyghrN1PneXc/HM2zlTodSC+WpKPwZjd6VDSpp1oIG/yYFOLc2RhtLptReIHyxq0vwuWf+pN3/xT0q9AnntNRrbGI9TdQs5lZ8rjS/zsGRBQiLiy+XVnkv4P7yg95Nz1pdjmqQhONWYl6n/xzn0MgHMkujEHCUZvsdBDre5sOLA2EN7suf0yaOmBetN7qYWZM9X2TMcXwwNAws3GSe/WjXPrWu46YzgXQ9ErLfCuhOJQUsXSIPNfhANVjdrCyVHX6dD35hB/9NpaUj5Q0/Z03uT//x6nyhJffd4yqujMoWND7qmdA8D+ppId80F78ceKiNVn8X1YrN+cgN2oBDDyi29/d9nu+n69DR4I+GEG3+JiWWNHvJriYMCU84DKi3tS+5+WZHH8JrDr5OaDJZBOs++4RCIbPvK6CNBQDtdbGXn0M1Cl2izgMzSwQ/3fNVuax+PWq04EmvFYgK7Q0orOGWknW3KC5LVYVmb/abJR53Wy0mj6DkvCwr42FLSdWbRLmoU8QtzTkIc5iH514c9nlISy5dX0uYx/u5FL/CGEDBM5wzFPppLp5+xPNYRJFjdU+ultAunVuP0n44q9Vq0amlZWCwV1jE/f3XBfZuvMYqec13UgJrU1YQzUrIqIV1OFeEy3pnompfd0YmTehxnR4T7QmOknYp4p8Dmr0mqbQn96e9A+SnRErTrkZHZlPtbvgYK1S0li95WHsLXGYM1rA4siZ5a58xOjCI59Yk/5qTDS+BCVyqhYcYI15LbqQ6/Ys0LLcCBYBaSc4bOYWgsmZRT9Ow7aabovv8+QrZaU9+tOt2tDz4z3WxyGfkCH+klXv5lSbmfKBIwpJdU0E0HgE41cyIowH82Bm0+eW8cRkQG3uOflB8BdbqtWmbaZ4LuOxpYQRNcoiYITmsioBzcJqydxQZE2UeC/BP5fY6H4WCwPuCehWSYo8pdD1mdj/qmc2zZ8Ehu7jp3ilUvcN+aIz5ufx7ssF97iDPHArdJnfaVTimZILBrN4+qxeoun09ZtGHjOI38Yim+K/yZKUSCyu6RFPiTfHfzLSPoO3IAsyLKc3wcUcpyWyJD+4iOkJdBJJwvl+Ly/WoJ+O2rAwQqf3Bvb5iNE+1+wjtA7B1vRWsp5GLxeB0msTifLrg/zA1QCU99ZC487Vhp8F/gDl763fcMTDphrAgZX1RjNaM3wDoTsJuQk5bjVhfVCV4hCR+Ra30E3pelM7tlmGBAN6oi3wmdumd5OHJLDaaS/b36dummzOY6xgnt17my1Fz8e0j2Qd2BLjPhh+jK7GXDTDyN3Pc2HLM838B8VbT5DPAhknzmJ3Q1yFZZqJGJiAjrpzdroN9qZYLA/dVR3JO0I+cJjkdeZvu+p1e+3skdNh8gyPixZGy+7q8SYslWSxeFmcbZqR+ZP/kEuN9bT0YihrYz1PmJelrIgHW/Y8G0eRsRXJLIO2iph7ErYuxOY1H1LK9+bVs1AFpX/sxHj4UVQl3Ac8AhyV2PMTrTFwagw22LNr5evKbHz28Oueq3pYiURIp/uKnPmcEe6dAie5i+PNBA5m7zP/vXITuAP71OzKW5/8Qm2RRsxn2N951ajsHfy7XTmses9Dc0ADgsaihC2WXI00xKfmuRP54eedDWnBSdXODn+BFupb9l09raWtsrruxk9QSXFEPMN/lfKQyQ9ldTt3Ga6Pls9Eevuj0sqHbZfs60SZ9mlYEmee8guH8GVeufgH4WYcJC10lo60Ub9iIpiJTZd8VIUCXo8ZFK2dDs/G1tsm51NM7kly0fldtLhl/BT4TZCGCaCKMhTtHImG3aRhqhTn0K99IIIQljbSsTxL+R0eTU2tXNldtGi4cGlr6ir8R3pq59kfqMQ8F0Kw07GK4YOiAzrBbYLjCo9O4+W/Azr55RTedXs0EeHoev/BNF4fTbO18PwngMU4ukl2yhCjMpD5517PAEjEnys41Nfem3hUmXYLTIgjQpfkD1ndeSw0LGpduXDPVk0mZTkcFkmbNKAp4wWv2rMeFPB0f49NWngn7vvkZEAEVWmbnE1TgNN6CQzaOCdXKhg5EFn0JCfsn8x1qT5C3Bct8pZV5Lbg8TFqS7q3AJRSEho7p1W4/GwaTaWfHwz3SRfQBAuIeVCudQnrhuwqKZ8i4TnHo1z4vR5tOBkpYfdD7urp88RxcxwBU8nXau4365C5YVW59GDRMECgG5gKSHS0VNdwBnZGr1VmkDZ8MOdrxOZz853C/EmzCrTI5cTfFGzfiLLYZKrSYfYFUZv0smyQs+xxl74l2PzpLZJRQvX+FpVEubjiyAFzrefmSZq6WD7OCfwoaWzb6pJRAD/0ZwPaG+esFTzChqhrw4GqTMDyHzA/SrNyY+3Z/XhMkRotEzi2YGatglXpnRbR65bvtZG4CRYaS6LX2HNZvFEkXfzNlOVA6LaalEEQZHyWsd7+S+MIFoLM8Q4c+cyYj+VezBSFG6CsRkShJGdf3diEmp8SasRPzz7hbGSE2PXJLfyY7uLtExUra8/4Kj1TKACoF1YrKfhzRbSml2YSuu9FLE8m0ar7AfKPIygdXGMqn4IMJ/HRanK/X0lzkwrwaadUDqW55/udwS2LY6NASpXUeJqrmICN1YCgWh957GewAYZo/gbCg7CtB8VBb2u88fHWhAC2yEW+F9eCl03YgWVQfoELZOuZgkrMp7HBVodKyMB9axAgCtGW75nwkV1WJpcbf7sUdtu7S/pZGru5Qa69CdB/STfDefuU2nOvXE+SpERAjm1suSOC09oG00A3/+nm1Jn7X+Izx/0gZQpQ91DNEJ3zhLuL4mee/f3xpKov3I9SZ9SHoj6O0ffHBWgBI+z7V0FUNeyAKWB5k31pMoOEAG/+lBSA5Daep8I1ONIHUXmX2PuJwOik7nYq5bHxQ61B/NxUR7kjscgKL54/cyPJjheNcu2HffuCbrYFM4KD0L7djXiNk8t8OQb+qQ7FRiu/5Mo9KnQLdvhCVr5y07W4PM1uTyhWvuPL20JRXivCmGWJRJ6aP4OFq0F6UY/ix7hltCdPt5I0Vr3nk5aXMgF/yrQO7wEurj6HY0CVSh6SJBb8c6nmo6/RPDAc2JFL72+RosJAaI2NOijz+GmDdcHK1LvpJfMJpuWy/8x1C3+ulq0GegUbQcMG11bgvrsu5cBxSWO+JR7ccaHpNb3/vdvc5IDD6h4pMdbvhnFbJ0vtUozJWLsbwNX7sV3oH+O6/oGDMzACGhnJi17tbXH/1bLipw922E/5jQZckBQTcD3XRJxUubmWfaNjKsec6w3vG58dEWijuDXOTt+wFCmqSHdAFCVQlwzn6kraE8ajrd1RNgZCFTfgY/eQS1EJkMFkzFAaRqtX2nBUPidELGA3WdyBSXyjdrz+/VUs6ZQzp4QfOstV7cFTMekarRsDfxsMClM4/4xt4n1uLd6Q0Lfo/THJWp/bJpsc/D1orjxJaDtr5R7pyFcxQexAryNSTFE2x9IPWSpHEGDpVvorr4xdW8+s2YXXkCooX4ezZuW5D+C8EEHvSvwmwxgX+mi6IGlbyxCSYfIcQkDgAC0XJicPBndLLnPvPjxz3p0ch/uoXXemQlKlxfPC/tydy7S5ViuR3zjskpf971ZrN0r1yNS8vqUz2Ce4ttmCS39/ZuIdIsVaNEzn1ZCjPhD8B+WHgeK8t5xcsPE2B9E22eaT4/Ggz0ljgYAh3l6kkmbrFVMklw/NnwVOZm+tZUX8LnLKy5dzZtUsE3I1wZoNEg4LXyfYYxOsR/kXt5aPZC0ye65zen9IbUjRe5iTY9wylKYyPzidOEnswIx/6XmcoP3AydrFKCsdLqia4phpYL4t2s2fgGw7m1+UugJoVUghXydtsD/DjTjMaowjkTlg49VxUX7ji0solhSmRthbkgOIMJUSKtvJHbiKqJlnTXnQAtTq0WRXmJQBI+kdAHQsqJKGLRCs5ETSaZoOFopEXP0fUF7ERc34uZdLJpdnP2v6tvhb20dMTuM+nAx1HPN41FpDsMqxc5N6ABUaGnU+6X/0SWWgsRG7MNlkYxmulo326R6HLi5BEC5H93RzJotstGMTACSBKoEXhBavNAH8AAAA"}));

})();

/* STARDUSTLC_UPDATE_CLIENT_BODY_END */
})();
