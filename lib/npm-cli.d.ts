export interface NpmCliFileSystem {
    realpathSync(path: string): string;
    statSync(path: string): {
        isFile(): boolean;
    };
}
export interface NpmCliOptions {
    execPath?: string;
    env?: Readonly<Record<string, string | undefined>>;
    platform?: NodeJS.Platform;
    fileSystem?: NpmCliFileSystem;
}
/** Locate JavaScript for the existing Node/Electron child; never execute an npm shell wrapper. */
export declare function resolveNpmCli(options?: NpmCliOptions): string;
