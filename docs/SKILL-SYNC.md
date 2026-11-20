# Pinned skill synchronization

The upstream runtime/skill version is **4.0.545**. It is separate from the dsh-remotion package version.

Source: official remotion-dev/skills commit 6f55706d1069e512430582ad86e4e57dc07afe1b (package/frontmatter 4.0.545), paired with the official remotion@4.0.545 npm runtime. The independent skills repository is generated from the Remotion monorepo; no identical-tree or absent npm gitHead claim is made.

## Input and commands

The offline input root must contain skills/ and source-release.json. The descriptor records schemaVersion: 1, engine, exact version, canonical entry names, immutable Git commit(s), npm name/version/tarball/SRI, and a files object covering every source-relative file with kind, source path, SHA-256 and mode (plus Git blob/commit or npm release/integrity). skills/UPSTREAM.json preserves the reviewed upstream descriptors and records all final files and adaptations. Prepare inputs from verified official archives/snapshots; do not run upstream setup scripts or use an unpinned latest checkout.

~~~sh
node scripts/sync-skills.mjs --upstream <reviewed-staged-source-root>
node scripts/sync-skills.mjs --upstream <reviewed-staged-source-root> --check
pnpm test
~~~

Review scripts/.skill-port-meta.json before adding/removing a canonical name. Validate every name, version, file list and upstream hash before modifying the installed tree. The synchronizer stages a complete replacement including regenerated provenance, swaps only that validated tree, and restores the old tree if the final rename fails. --check reads every file, including references/assets; it creates no stage and repairs nothing. Unexpected new skills, missing metadata, corrupted resources or mismatched runtime versions fail before replacing skills/.

## DSH adaptations and verification

Only documented frontmatter/context adaptations and compatibility entries are local. Do not silently alter official helper behavior or point runtime helpers at a development checkout. Registered skills describe the managed remotion_project/remotion_render prepare/job/revision flow separately from existing user-owned React projects.

After changing the bundle, regenerate lib, run the complete tests and upstream --check, inspect the actual npm tarball (including filtered .gitignore aliases), and verify a fresh official host. Registration/health checks must include new names; keep all old compatibility names. Real rendering, file decoding and Desktop tests must record their actual platform. macOS filesystem fixtures are not physical Mac validation.
