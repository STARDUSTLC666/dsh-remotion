import { type MediaEngine, type MediaProject, type MediaAsset } from './media-templates.js';
export declare function mediaId(value: unknown): string;
export declare class MediaConflict extends Error {
    status: number;
}
export declare class MediaStore {
    readonly root: string;
    constructor(engine: MediaEngine, root?: string);
    init(): Promise<void>;
    path(id: string): Promise<string>;
    checkPath(path: string): Promise<void>;
    get(id: string): Promise<MediaProject>;
    list(): Promise<MediaProject[]>;
    private write;
    create(value: unknown): Promise<MediaProject>;
    edit(id: string, revision: unknown, fn: (p: MediaProject) => Promise<void> | void, bump?: boolean): Promise<MediaProject>;
    update(id: string, revision: unknown, value: unknown): Promise<MediaProject>;
    assetBytes(id: string, asset: MediaAsset): Promise<Buffer>;
    upload(id: string, revision: unknown, name: string, bytes: Buffer): Promise<MediaProject>;
    removeAsset(id: string, revision: unknown, assetId: string): Promise<MediaProject>;
    snapshot(id: string, revision: unknown): Promise<{
        project: MediaProject;
        assets: Map<string, Buffer>;
    }>;
}
