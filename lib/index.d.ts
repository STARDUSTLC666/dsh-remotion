import { type SkillsPluginContext } from './skill-bundle.js';
export { parseSkillFile } from './skill-bundle.js';
export type { SkillRegistration, SkillsPluginContext } from './skill-bundle.js';
export declare const name = "remotion-skills";
export declare const inject: string[];
export declare const SKILL_NAMES: readonly ["remotion-best-practices", "remotion-captions", "remotion-create", "remotion-docs", "remotion-interactivity", "remotion-maps", "remotion-markup", "remotion-multimedia", "remotion-render", "remotion-saas", "remotion-studio", "remotion-upgrade"];
/** Absolute resource root shipped in this independently installable package. */
export declare function bundledSkillsDir(): string;
/** Re-read and validate disk resources; runtime state is checked by the health tool. */
export declare function checkBundledSkills(): import("./skill-bundle.js").SkillFileCheck[];
/** Register this package's skills and its read-only health tool. */
export declare function apply(ctx: SkillsPluginContext): void;
