import { MediaError, type MediaEngine, type MediaProject, type MediaAsset } from './media-templates.js';
import { movePathToTrash, movePathsToTrash } from './trash.js';
export type TrashPathFn = typeof movePathToTrash;
export type TrashPathsFn = typeof movePathsToTrash;
export declare function mediaId(value: unknown): string;
export declare class MediaConflict extends MediaError {
    constructor(message: string);
}
export declare class MediaStore {
    readonly root: string;
    private readonly customTrashPath?;
    private readonly customTrashPaths?;
    constructor(engine: MediaEngine, root?: string, options?: {
        trashPath?: TrashPathFn;
        trashPaths?: TrashPathsFn;
    });
    private trashDirs;
    private detachRunJunctions;
    init(): Promise<void>;
    path(id: string, archived?: boolean): Promise<string>;
    checkPath(path: string): Promise<void>;
    get(id: string, archived?: boolean): Promise<MediaProject>;
    listWithWarnings(archived?: boolean): Promise<{
        projects: MediaProject[];
        corrupted: Array<{
            id: string;
            detail: string;
        }>;
    }>;
    list(archived?: boolean): Promise<MediaProject[]>;
    /** Move a complete managed project without deleting sources, assets or renders. */
    archive(id: string, revision: unknown, restore?: boolean): Promise<MediaProject>;
    /** Move a managed project directory (active or archived) into the OS Recycle Bin / Trash. */
    trash(id: string, revision: unknown, archived?: boolean): Promise<MediaProject>;
    /** Move all currently archived project directories into the OS Recycle Bin / Trash in a single batch. */
    trashArchived(): Promise<{
        trashedCount: number;
        ids: string[];
    }>;
    /** Move verified corrupted project directories into the OS Recycle Bin / Trash; refuses healthy projects and symlinks. */
    trashCorrupted(items?: Array<{
        id: string;
        archived?: boolean;
    }>): Promise<{
        trashedCount: number;
        ids: string[];
    }>;
    private write;
    create(value: unknown): Promise<MediaProject>;
    edit(id: string, revision: unknown, fn: (p: MediaProject) => Promise<void> | void, bump?: boolean): Promise<MediaProject>;
    update(id: string, revision: unknown, value: unknown): Promise<MediaProject>;
    /** Reorder existing images atomically; audio/video slots and uploaded bytes stay intact. */
    reorderImages(id: string, revision: unknown, order: unknown): Promise<MediaProject>;
    assetBytes(id: string, asset: MediaAsset): Promise<Buffer>;
    upload(id: string, revision: unknown, name: string, bytes: Buffer): Promise<MediaProject>;
    removeAsset(id: string, revision: unknown, assetId: string): Promise<MediaProject>;
    snapshot(id: string, revision: unknown): Promise<{
        project: MediaProject;
        assets: Map<string, Buffer>;
    }>;
}
