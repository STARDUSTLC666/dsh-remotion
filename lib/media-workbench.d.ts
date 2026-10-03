import { MediaStore } from './media-store.js';
import { type MediaEngine } from './media-templates.js';
interface MediaJob {
    id: string;
    kind: 'prepare' | 'preview' | 'render';
    projectId?: string;
    revision?: number;
    state: 'running' | 'done' | 'failed' | 'cancelled';
    stage: string;
    lines: string[];
    url?: string;
    output?: string;
}
export declare class MediaWorkbench {
    readonly engine: MediaEngine;
    readonly store: MediaStore;
    readonly route: string;
    readonly runtime: string;
    private jobs;
    private disposed;
    constructor(engine: MediaEngine, root?: string);
    private browserFile;
    environment(): Promise<{
        ready: boolean;
        version: string;
        node: string;
        hint: string;
    }>;
    job(id: string): MediaJob;
    private log;
    private stopChild;
    private run;
    private cli;
    start(kind: MediaJob['kind'], id?: string, revision?: unknown): Promise<MediaJob>;
    private execute;
    cancel(id: string): MediaJob;
    dispose(): void;
    private guard;
    fetch(request: Request): Promise<Response>;
}
export declare function installMediaWorkbench(ctx: any, engine: MediaEngine): MediaWorkbench;
export {};
