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
export interface SkillsPluginContext {
    skills: {
        register(definition: SkillRegistration): () => void;
        get?(name: string): Promise<SkillRegistration | undefined> | SkillRegistration | undefined;
    };
    tools?: {
        register(definition: Record<string, unknown>): () => void;
    };
    on?(event: string, listener: () => void): (() => void) | void;
    logger?: {
        warn(message: string): void;
    };
}
export interface ParsedSkillFile {
    name: string;
    description: string;
    content: string;
}
export interface SkillFileCheck {
    name: string;
    ok: boolean;
    detail: string;
    file: string;
    code: 'valid' | 'unreadable' | 'invalid';
}
export interface SkillHealthCheck extends Omit<SkillFileCheck, 'code'> {
    code: SkillFileCheck['code'] | 'ready' | 'not_registered' | 'registration_failed' | 'changed' | 'inactive' | 'registry_unavailable' | 'disposed';
    fileOk: boolean;
    registered: boolean;
    registryChecked: boolean;
    reloadRequired: boolean;
}
export interface SkillBundleOptions {
    plugin: string;
    healthTool: string;
    names: readonly string[];
    directory: () => string;
}
/** Preserve the original non-throwing public parsing helper and return shape. */
export declare function parseSkillFile(text: string): ParsedSkillFile;
/** File validation is shared by initial loading and every later health call. */
export declare function createSkillBundle(options: SkillBundleOptions): {
    /** Disk-only check; does not imply that any plugin instance registered the skills. */
    checkFiles(): SkillFileCheck[];
    apply(ctx: SkillsPluginContext): void;
};
