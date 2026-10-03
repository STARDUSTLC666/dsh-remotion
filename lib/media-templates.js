export const MEDIA_VERSIONS = { hyperframes: '0.8.114', remotion: '4.0.532', gsap: '3.14.2' };
export const MEDIA_TEMPLATES = [
    { id: 'title', zh: '标题卡', en: 'Title card', description: '一句标题、一段介绍，适合开场与通知。' },
    { id: 'product', zh: '产品介绍', en: 'Product card', description: '深色画布与一张主图，适合产品亮点。' },
    { id: 'slideshow', zh: '图文轮播', en: 'Slideshow', description: '上传的图片依次展示，正文每行对应一页。' },
];
export const MEDIA_FORMATS = { landscape: [1280, 720], portrait: [720, 1280], square: [720, 720] };
export function validateFields(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        throw new Error('请填写项目内容。');
    const v = value;
    if (!MEDIA_TEMPLATES.some(row => row.id === v.template))
        throw new Error('请选择支持的模板。');
    if (typeof v.title !== 'string' || !v.title.trim() || v.title.length > 72)
        throw new Error('标题需为 1–72 个字符。');
    if (typeof v.body !== 'string' || v.body.length > 360)
        throw new Error('正文最多 360 个字符。');
    if (typeof v.format !== 'string' || !Object.hasOwn(MEDIA_FORMATS, v.format))
        throw new Error('请选择支持的画幅。');
    if (typeof v.duration !== 'number' || !Number.isInteger(v.duration) || v.duration < 3 || v.duration > 30)
        throw new Error('时长需为 3–30 整秒。');
    return { template: v.template, title: v.title.trim(), body: v.body.trim(), format: v.format, duration: v.duration };
}
const escapeHtml = (text) => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
export function projectSources(p, engine) {
    const [width, height] = MEDIA_FORMATS[p.format];
    const images = p.assets.filter(a => a.kind === 'image'), audio = p.assets.find(a => a.kind === 'audio'), video = p.assets.find(a => a.kind === 'video');
    const count = p.template === 'slideshow' ? Math.max(images.length, 1) : 1;
    if (p.duration < count * 2)
        throw new Error(`轮播 ${count} 张图片至少需要 ${count * 2} 秒，请增加时长。`);
    const dark = p.template === 'product', portrait = width <= height;
    const copyWidth = (width - (portrait ? 96 : 128)) * (!portrait && images.length ? .51 : 1);
    const copyHeight = (height - (portrait ? 120 : 112)) * (portrait && images.length ? .55 : 1) - 36;
    // Conservatively fit full-width CJK characters and explicit newlines in the safe area.
    const linesAt = (text, size) => text.split('\n').reduce((n, line) => n + Math.max(1, Math.ceil([...line].length / Math.max(1, Math.floor(copyWidth / size)))), 0);
    let titleSize = Math.round((portrait ? 52 : 68) * (p.title.length > 40 ? .72 : p.title.length > 24 ? .85 : 1));
    let bodySize = p.body.length > 200 ? 21 : 27;
    const bodies = count > 1 ? p.body.split('\n').slice(0, count) : [p.body];
    const fits = () => 42 + linesAt(p.title, titleSize) * titleSize * 1.15 + 22 + Math.max(...bodies.map(body => linesAt(body, bodySize) * bodySize * 1.6)) <= copyHeight;
    while (!fits() && (bodySize > 16 || titleSize > 28)) {
        if (bodySize > 16)
            bodySize--;
        else
            titleSize--;
    }
    if (!fits())
        throw new Error('文字超过此画幅的可读空间。请缩短正文或分成轮播页后再导出。');
    if (count > 1 && p.body.split('\n').length > count)
        throw new Error('正文行数多于轮播图片数，请增加图片或合并文字。');
    const css = `@font-face{font-family:"Microsoft YaHei";src:local("Microsoft YaHei")}*{box-sizing:border-box}body{margin:0;font-family:system-ui,"Microsoft YaHei",sans-serif} #root{position:relative;width:${width}px;height:${height}px;overflow:hidden;background:${dark ? '#142D39' : '#FFF8ED'};color:${dark ? '#FFF8ED' : '#142D39'}} .scene{position:absolute;inset:0;padding:${portrait ? '60px 48px' : '56px 64px'};display:flex;${portrait ? 'flex-direction:column;' : ''}align-items:center;justify-content:center;gap:36px} .copy{flex:1;min-width:0;width:100%} .eyebrow{color:#F26445;font-size:18px;letter-spacing:4px;font-weight:700;margin-bottom:18px} h1{font-size:${titleSize}px;line-height:1.15;margin:0;overflow-wrap:anywhere} p{font-size:${bodySize}px;line-height:1.6;margin:22px 0 0;white-space:pre-line;overflow-wrap:anywhere} .visual{${portrait ? 'height:40%;width:100%;' : 'width:45%;height:80%;'}flex-shrink:0;object-fit:contain;border-radius:18px} .accent{position:absolute;left:0;top:0;width:14px;height:100%;background:#F26445} .page{position:absolute;right:40px;bottom:22px;font-size:18px;opacity:.65}`;
    const design = `# Design\nOriginal DSH managed templates.\n\nPaper #FFF8ED; ink #142D39; coral #F26445; mint #79CDB4. Local system-ui / Microsoft YaHei. Safe margins, wrapped text, deterministic entrances. No remote fonts, random or infinite animation.\n`;
    const info = { ...p, width, height, fps: 24, titleSize, bodySize, dark, portrait };
    const sources = {
        'project.json': JSON.stringify(p, null, 2), 'DESIGN.md': design,
        'README.md': `# ${p.title.replace(/[\r\n]/g, ' ')}\n\nManaged ${engine} project, revision ${p.revision}.\n\nRun npm install, then npm run preview or npm run render. Media files are local copies in public/assets. Generated template code is MIT. Renderer dependencies keep their own licenses; Remotion: https://www.remotion.dev/license .\n`,
    };
    if (engine === 'hyperframes') {
        sources['meta.json'] = JSON.stringify({ id: p.id, name: p.title, createdAt: p.updated }, null, 2);
        sources['hyperframes.json'] = JSON.stringify({ $schema: 'https://hyperframes.heygen.com/schema/hyperframes.json', paths: { blocks: 'compositions', components: 'compositions/components', assets: 'public/assets' }, media: { autoProxy: true } }, null, 2);
        let clips = '';
        for (let i = 0; i < count; i++) {
            const start = i * p.duration / count, duration = p.duration / count;
            const body = count > 1 ? (p.body.split('\n')[i] ?? '') : p.body;
            const scene = 'scene-' + i;
            clips += `<div id="${scene}" class="clip" data-composition-id="${scene}" data-composition-src="compositions/${scene}.html" data-start="${start}" data-duration="${duration}" data-track-index="1" style="position:absolute;inset:0;width:100%;height:100%"></div>`;
            sources['compositions/' + scene + '.html'] = `<!doctype html><html lang="zh"><head><meta charset="utf-8"><style>${css}#root{background:transparent}</style></head><body><div id="root" data-composition-id="${scene}" data-start="0" data-duration="${duration}" data-width="${width}" data-height="${height}"><div class="scene"><div class="copy"><div class="eyebrow">${escapeHtml(p.template.toUpperCase())}</div><h1 id="title-${i}">${escapeHtml(p.title)}</h1><p id="body-${i}">${escapeHtml(body)}</p></div>${images.length ? `<img class="visual" src="public/assets/${images[i % images.length].file}" alt="">` : ''}<div class="page">${i + 1} / ${count}</div></div><div class="accent" data-layout-ignore></div></div><script src="vendor/gsap.min.js"></script><script>window.__timelines=window.__timelines||{};const tl=gsap.timeline({paused:true});tl.to({},{duration:${duration}},0);tl.from('#title-${i}',{y:24,opacity:0,duration:.45},.08);tl.from('#body-${i}',{y:16,opacity:0,duration:.4},.2);window.__timelines['${scene}']=tl;</script></body></html>`;
        }
        const media = `${video ? `<video id="bg-video" class="clip" style="position:absolute;inset:0;width:100%;height:100%;opacity:.22;object-fit:cover" src="public/assets/${video.file}" muted playsinline data-start="0" data-duration="${p.duration}" data-track-index="0"></video>` : ''}${audio ? `<audio id="music" class="clip" src="public/assets/${audio.file}" data-start="0" data-duration="${p.duration}" data-track-index="2" data-volume="0.4"></audio>` : ''}`;
        sources['index.html'] = `<!doctype html><html lang="zh"><head><meta charset="utf-8"><style>${css}</style></head><body><div id="root" data-composition-id="managed-video" data-start="0" data-duration="${p.duration}" data-width="${width}" data-height="${height}" data-fps="24">${media}${clips}</div><script src="vendor/gsap.min.js"></script><script>window.__timelines=window.__timelines||{};const tl=gsap.timeline({paused:true});tl.to({},{duration:${p.duration}},0);window.__timelines['managed-video']=tl;</script></body></html>`;
        sources['setup.mjs'] = `import{mkdirSync,copyFileSync}from'node:fs';mkdirSync('vendor',{recursive:true});copyFileSync('node_modules/gsap/dist/gsap.min.js','vendor/gsap.min.js');\n`;
        sources['package.json'] = JSON.stringify({ private: true, type: 'module', dependencies: { hyperframes: MEDIA_VERSIONS.hyperframes, gsap: MEDIA_VERSIONS.gsap }, scripts: { prepare: 'node setup.mjs', preview: 'hyperframes preview --no-open --foreground', render: 'hyperframes browser ensure && hyperframes render --workers 1 --no-best-effort --strict --output final.mp4 --fps 24' } }, null, 2);
    }
    else {
        sources['data.json'] = JSON.stringify(info);
        sources['src/index.jsx'] = `import React from 'react';
import {registerRoot,Composition,AbsoluteFill,Img,Audio,OffthreadVideo,staticFile,useCurrentFrame,interpolate} from 'remotion';
import data from '../data.json';
function Video(){const frame=useCurrentFrame();const photos=data.assets.filter(a=>a.kind==='image'),music=data.assets.find(a=>a.kind==='audio'),video=data.assets.find(a=>a.kind==='video');const count=data.template==='slideshow'?Math.max(photos.length,1):1;const length=data.duration*24/count;const page=Math.min(count-1,Math.floor(frame/length));const local=frame-page*length;const opacity=interpolate(local,[0,12,length-10,length],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});const body=count>1?(data.body.split('\\n')[page]||''):data.body;
return <AbsoluteFill style={{background:data.dark?'#142D39':'#FFF8ED',color:data.dark?'#FFF8ED':'#142D39',fontFamily:'system-ui,Microsoft YaHei,sans-serif'}}>
{video&&<OffthreadVideo muted src={staticFile('assets/'+video.file)} style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',opacity:.22}}/>}
<div style={{position:'absolute',inset:0,padding:data.portrait?'60px 48px':'56px 64px',display:'flex',flexDirection:data.portrait?'column':'row',alignItems:'center',justifyContent:'center',gap:36,opacity}}>
<div style={{flex:1,minWidth:0,width:'100%'}}><div style={{color:'#F26445',fontSize:18,letterSpacing:4,fontWeight:700,marginBottom:18}}>{data.template.toUpperCase()}</div><h1 style={{fontSize:data.titleSize,lineHeight:1.15,margin:0,overflowWrap:'anywhere'}}>{data.title}</h1><p style={{fontSize:data.bodySize,lineHeight:1.6,marginTop:22,whiteSpace:'pre-line',overflowWrap:'anywhere'}}>{body}</p></div>
{photos.length>0&&<Img src={staticFile('assets/'+photos[page%photos.length].file)} style={{width:data.portrait?'100%':'45%',height:data.portrait?'40%':'80%',flexShrink:0,objectFit:'contain',borderRadius:18}}/>}</div>
<div style={{position:'absolute',left:0,top:0,width:14,height:'100%',background:'#F26445'}}/><div style={{position:'absolute',right:40,bottom:22,fontSize:18,opacity:.65}}>{page+1} / {count}</div>{music&&<Audio src={staticFile('assets/'+music.file)} volume={.4}/>}</AbsoluteFill>}
const Root=()=> <Composition id="ManagedVideo" component={Video} durationInFrames={data.duration*24} fps={24} width={data.width} height={data.height}/>;
registerRoot(Root);
`;
        sources['package.json'] = JSON.stringify({ private: true, dependencies: { '@remotion/cli': MEDIA_VERSIONS.remotion, remotion: MEDIA_VERSIONS.remotion, react: '18.3.1', 'react-dom': '18.3.1' }, scripts: { preview: 'remotion studio src/index.jsx --no-open', render: 'remotion render src/index.jsx ManagedVideo final.mp4 --concurrency 1 --codec h264' } }, null, 2);
    }
    return sources;
}
