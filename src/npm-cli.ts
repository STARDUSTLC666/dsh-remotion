import { realpathSync, statSync } from 'node:fs'
import { posix, win32 } from 'node:path'

export interface NpmCliFileSystem {
  realpathSync(path: string): string
  statSync(path: string): { isFile(): boolean }
}
export interface NpmCliOptions {
  execPath?: string
  env?: Readonly<Record<string, string | undefined>>
  platform?: NodeJS.Platform
  fileSystem?: NpmCliFileSystem
}

/** Locate JavaScript for the existing Node/Electron child; never execute an npm shell wrapper. */
export function resolveNpmCli(options: NpmCliOptions = {}): string {
  const platform = options.platform ?? process.platform
  const paths = platform === 'win32' ? win32 : posix
  const env = options.env ?? process.env
  const fs = options.fileSystem ?? { realpathSync, statSync }
  const candidates: string[] = [], visited = new Set<string>()
  const variable = (name: string): string | undefined => platform === 'win32'
    ? Object.entries(env).find(([key]) => key.toLowerCase() === name.toLowerCase())?.[1]
    : env[name]
  const add = (file: string) => {
    const normalized = paths.normalize(file), key = platform === 'win32' ? normalized.toLowerCase() : normalized
    if (paths.isAbsolute(normalized) && !visited.has(key)) { visited.add(key); candidates.push(normalized) }
  }
  const relativeTo = (directory: string) => {
    add(paths.join(directory, 'node_modules/npm/bin/npm-cli.js'))
    add(paths.join(directory, '../lib/node_modules/npm/bin/npm-cli.js'))
    add(paths.join(directory, '../node_modules/npm/bin/npm-cli.js'))
  }
  const execPath = options.execPath ?? process.execPath
  if (paths.isAbsolute(execPath)) {
    relativeTo(paths.dirname(execPath))
    try { relativeTo(paths.dirname(fs.realpathSync(execPath))) } catch { /* the original executable directory is still useful */ }
  }
  for (const raw of (variable('PATH') ?? '').split(platform === 'win32' ? ';' : ':')) {
    // Empty / relative PATH entries mean the current directory. Never look there
    // for a script that preparation would execute on the user's behalf.
    const directory = platform === 'win32' && raw.startsWith('"') && raw.endsWith('"') ? raw.slice(1, -1) : raw
    if (!directory || !paths.isAbsolute(directory)) continue
    relativeTo(directory)
    // Homebrew, distro packages and version managers commonly expose npm as a
    // symlink to the real CLI. Resolve it; do not parse or run npm/npm.cmd.
    for (const name of platform === 'win32' ? ['npm.cmd', 'npm'] : ['npm']) {
      try { add(fs.realpathSync(paths.join(directory, name))) } catch { /* continue through the remaining PATH entries */ }
    }
  }
  const appData = variable('APPDATA')
  if (appData && paths.isAbsolute(appData)) add(paths.join(appData, 'npm/node_modules/npm/bin/npm-cli.js'))
  // Low-priority well-known install directories for desktop GUI apps launched
  // with a minimal PATH (e.g. macOS Dock/Finder missing Homebrew prefixes).
  if (platform === 'darwin') {
    relativeTo('/opt/homebrew/bin')
    relativeTo('/usr/local/bin')
    for (const dir of ['/opt/homebrew/bin', '/usr/local/bin']) {
      try { add(fs.realpathSync(paths.join(dir, 'npm'))) } catch { /* continue */ }
    }
  } else if (platform === 'win32') {
    const nvmSymlink = variable('NVM_SYMLINK')
    if (nvmSymlink && paths.isAbsolute(nvmSymlink)) relativeTo(nvmSymlink)
    const programFiles = variable('ProgramFiles')
    if (programFiles && paths.isAbsolute(programFiles)) relativeTo(paths.join(programFiles, 'nodejs'))
  } else {
    for (const dir of ['/usr/local/bin', '/usr/bin']) {
      relativeTo(dir)
      try { add(fs.realpathSync(paths.join(dir, 'npm'))) } catch { /* continue */ }
    }
  }
  for (const candidate of candidates) {
    if (paths.basename(candidate).toLowerCase() !== 'npm-cli.js') continue
    try {
      const file = fs.realpathSync(candidate)
      if (paths.isAbsolute(file) && paths.basename(file).toLowerCase() === 'npm-cli.js' && fs.statSync(file).isFile()) return file
    } catch { /* Missing, unreadable, broken links and directories are not usable CLIs. */ }
  }
  // No PATH values or filesystem errors: either may contain local or sensitive data.
  throw new Error('未能定位 npm CLI。若已安装 Node.js 22.19+ 或 24+，请确认桌面应用的 PATH 包含 npm 所在目录后重启 DSH；Homebrew 等安装布局可直接使用。')
}
