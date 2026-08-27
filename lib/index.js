/**
 * dsh-remotion —— Remotion 视频创作技能插件：加载即把技能注册进 ctx.skills。
 *
 * 技能正文与资源随包分发（skills/ 目录），resourceBase 指向打包目录，
 * 技能正文里的相对引用（rules/、references/ 等）由技能加载器解析。
 *
 * @module dsh-remotion
 */
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import YAML from 'yaml';
/** cordis 服务注入：apply 里要用 ctx.skills，必须显式声明。 */
export const name = 'remotion-skills';
export const inject = ['skills', 'tools'];
/** 随包分发的技能清单。 */
export const SKILL_NAMES = ["remotion"];
/** 打包技能目录的绝对路径。 */
export function bundledSkillsDir() {
    return fileURLToPath(new URL('../skills/', import.meta.url));
}
/** 检查随包技能资源完整性：每个技能的 SKILL.md 是否存在。 */
export function checkBundledSkills() {
    return SKILL_NAMES.map((skillName) => {
        const file = join(bundledSkillsDir(), skillName, 'SKILL.md');
        const ok = existsSync(file);
        return { name: skillName, ok, detail: ok ? file : 'SKILL.md 缺失：' + file };
    });
}
/** 拆分 SKILL.md 的 frontmatter 与正文。 */
export function parseSkillFile(text) {
    const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
    if (!match)
        return { name: '', description: '', content: text };
    let name = '';
    let description = '';
    try {
        const parsed = YAML.parse(match[1]);
        if (typeof parsed === 'object' && parsed !== null) {
            const record = parsed;
            if (typeof record.name === 'string')
                name = record.name;
            if (typeof record.description === 'string')
                description = record.description;
        }
    }
    catch { /* 保留空值，由调用方处理 */ }
    return { name, description, content: text.slice(match[0].length).trimStart() };
}
/**
 * 插件入口：把技能注册进技能注册表。
 * 单个技能文件缺失只告警，不影响其余技能与宿主启动。
 */
export function apply(ctx) {
    const disposers = [];
    for (const skillName of SKILL_NAMES) {
        try {
            const dir = join(bundledSkillsDir(), skillName);
            const text = readFileSync(join(dir, 'SKILL.md'), 'utf8');
            const parsed = parseSkillFile(text);
            if (parsed.name === '' || parsed.description === '' || parsed.content === '') {
                console.warn('[dsh-remotion] 技能 ' + skillName + ' 的 frontmatter 不完整，已跳过。');
                continue;
            }
            disposers.push(ctx.skills.register({
                name: parsed.name,
                description: parsed.description,
                content: parsed.content,
                resourceBase: { kind: 'directory', path: dir },
                source: 'runtime',
            }));
        }
        catch (error) {
            console.warn('[dsh-remotion] 技能 ' + skillName + ' 加载失败：' + (error instanceof Error ? error.message : String(error)));
        }
    }
    if (typeof ctx.tools?.register === 'function') {
        disposers.push(ctx.tools.register({
            name: 'remotion_health',
            description: 'dsh-remotion 自检：检查随包技能资源（SKILL.md）是否完整。遇到问题时先运行本工具定位。',
            parameters: { type: 'object', properties: {} },
            output: {
                schema: { type: 'object', additionalProperties: true },
                render(_args, value) {
                    const rec = (value ?? {});
                    const skills = Array.isArray(rec.skills) ? rec.skills : [];
                    const lines = ['dsh-remotion 自检' + (rec.ok === true ? '：技能资源完整。' : '：发现缺失。')];
                    for (const item of skills) {
                        const s = (item ?? {});
                        lines.push('- ' + String(s.name) + '：' + (s.ok === true ? '✅' : '❌ ' + String(s.detail ?? '')));
                    }
                    return [{ type: 'text', text: lines.join('\n') }];
                },
            },
            async execute() {
                const skills = checkBundledSkills();
                return { ok: skills.every((s) => s.ok), plugin: 'dsh-remotion', skills };
            },
        }));
    }
    if (typeof ctx.on === 'function') {
        ctx.on('dispose', () => {
            for (const dispose of disposers)
                dispose();
        });
    }
}
