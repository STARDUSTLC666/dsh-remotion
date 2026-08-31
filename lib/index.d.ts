/** cordis 服务注入：apply 里要用 ctx.skills，必须显式声明。 */
export declare const name = "remotion-skills";
export declare const inject: string[];
/** 技能注册定义（最小面）。 */
export interface SkillRegistration {
    name: string;
    description: string;
    content: string;
    resourceBase: {
        kind: 'directory';
        path: string;
    };
    source?: string;
}
/** 插件所需的最小 ctx 面。 */
export interface SkillsPluginContext {
    skills: {
        register(definition: SkillRegistration): () => void;
    };
    tools?: {
        register(definition: Record<string, unknown>): () => void;
    };
    on?(event: string, listener: () => void): () => void;
}
/** 随包分发的技能清单（Remotion 官方 v4.0.519：总纲路由 + 11 个领域技能）。 */
export declare const SKILL_NAMES: readonly ["remotion-best-practices", "remotion-captions", "remotion-create", "remotion-docs", "remotion-interactivity", "remotion-maps", "remotion-markup", "remotion-multimedia", "remotion-render", "remotion-saas", "remotion-studio", "remotion-upgrade"];
/** 打包技能目录的绝对路径。 */
export declare function bundledSkillsDir(): string;
/** 检查随包技能资源完整性：每个技能的 SKILL.md 是否存在。 */
export declare function checkBundledSkills(): Array<{
    name: string;
    ok: boolean;
    detail: string;
}>;
/** 拆分 SKILL.md 的 frontmatter 与正文。 */
export declare function parseSkillFile(text: string): {
    name: string;
    description: string;
    content: string;
};
/**
 * 插件入口：把技能注册进技能注册表。
 * 单个技能文件缺失只告警，不影响其余技能与宿主启动。
 */
export declare function apply(ctx: SkillsPluginContext): void;
