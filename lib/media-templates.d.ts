/** Original managed templates. Visual identity: templates/DESIGN.md. */
export type MediaEngine = 'hyperframes' | 'remotion';
export interface MediaAsset {
    id: string;
    name: string;
    file: string;
    kind: 'image' | 'audio' | 'video';
    bytes: number;
}
export interface MediaFields {
    template: string;
    title: string;
    body: string;
    format: string;
    duration: number;
}
export interface MediaProject extends MediaFields {
    id: string;
    revision: number;
    updated: string;
    assets: MediaAsset[];
    renders: Array<{
        id: string;
        revision: number;
        bytes: number;
        created: string;
    }>;
}
export declare const MEDIA_VERSIONS: {
    readonly hyperframes: "0.8.114";
    readonly remotion: "4.0.532";
    readonly gsap: "3.14.2";
};
export declare const MEDIA_TEMPLATES: readonly [{
    readonly id: "title";
    readonly zh: "标题卡";
    readonly en: "Title card";
    readonly description: "一句标题、一段介绍，适合开场与通知。";
}, {
    readonly id: "product";
    readonly zh: "产品介绍";
    readonly en: "Product card";
    readonly description: "深色画布与一张主图，适合产品亮点。";
}, {
    readonly id: "slideshow";
    readonly zh: "图文轮播";
    readonly en: "Slideshow";
    readonly description: "上传的图片依次展示，正文每行对应一页。";
}];
export declare const MEDIA_FORMATS: Record<string, [number, number]>;
export declare function validateFields(value: unknown): MediaFields;
export declare function projectSources(p: MediaProject, engine: MediaEngine): Record<string, string>;
