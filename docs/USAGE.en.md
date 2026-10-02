# dsh-remotion usage guide

[Overview](../README.en.md) · [Changelog](../CHANGELOG.md) · [Validation](VALIDATION.md)

## Installation

```bash
dsh plugin --profile web add dsh-remotion
```

After restarting, say "make a video with Remotion" to trigger it.

## Uninstall

```bash
dsh plugin --profile web remove dsh-remotion
```

Then restart the web service. To clean up fully, also remove the plugin entry from your profile `cordis.patch.yml` if you overrode it.

## Contents

- **remotion-best-practices** (router hub) + 11 domain skills (captions/create/docs/interactivity/maps/markup/multimedia/render/saas/studio/upgrade), synced from official Remotion v4.0.529

## Requirements

Node.js `^22.19.0 || >=24.0.0` + npx (npm registry); rendering needs ffmpeg (guided by the skill itself).

## Porting notes

Synced from the official `remotion-dev/skills` checkout at v4.0.529 (2026-09-25): upstream skill bodies are vendored as-is, including the embedded reference copies under `remotion-best-practices/` and `remotion-markup/`, with `scripts/sync-skills.mjs` making the port repeatable and checkable. Only the frontmatter is ours (`name`/`description` plus the upstream `version`).

## Multi-harness

Skills use the open Agent Skills (SKILL.md) format — **not just DSH**. Copy the directories under `skills/` into another agent's skills directory:

| Agent | Skills directory |
| :-- | :-- |
| Claude Code | `~/.claude/skills/` |
| Cursor | `.cursor/skills/` (or project-local `skills/`) |
| Gemini CLI | `~/.gemini/skills/` |
| OpenAI Codex | `~/.codex/skills/` |

Port once, use everywhere.

## Health checks and reloads

`remotion_health` rereads every `SKILL.md`, verifies readable files, valid YAML frontmatter, names matching their directories, and nonempty descriptions/bodies, then queries the host's `skills.get`. The effective name, description, body and resource directory must match this plugin instance's loaded snapshot. Existing files alone do not prove successful or still-active registration.

Health checks do not mutate files or registrations. After changing a file or repairing one that failed initial loading, reload the plugin (or restart DSH). The result reports `changed`, `not_registered` or `registration_failed` until then. A previously loaded file that was temporarily missing becomes healthy again if its exact original content is restored and its registration remains active.

Each item retains `name / ok / detail` and adds `code / fileOk / registered / registryChecked / reloadRequired`. `registered` means the registry still matches the loaded version, so a changed file can have `registered: true` and `ok: false`. Missing or failed registry lookup produces `registry_unavailable`; a disposed plugin produces `disposed`. The public `checkBundledSkills()` is disk-only, while the original non-throwing `parseSkillFile()` helper remains available.

## Development and shared implementation

`src/index.ts` declares only package identity, skill names and the resource directory. Parsing, validation, registration and health logic live in `src/skill-bundle.ts`. The canonical source is in `dsh-hyperframes`; Remotion carries an identical version-controlled copy. Each package builds and ships its own `lib/skill-bundle.js`, with no cross-package runtime dependency and no sibling checkout required for building or installation.

With dependencies already installed:

```bash
node node_modules/typescript/bin/tsc -p tsconfig.json
node --test "test/*.test.mjs"
```

When developing the sibling repositories together, edit the shared module and regression tests in HyperFrames, then synchronize:

```bash
# Run in dsh-hyperframes; updates only three shared files in sibling dsh-remotion
node scripts/sync-skill-bundle.mjs
node scripts/sync-skill-bundle.mjs --check
```

Both suites compare shared source and regression tests to prevent drift. A standalone checkout skips only that cross-repository comparison. Tests cover invalid YAML, unreadable files, empty bodies, rejected/inactive registrations, file changes and repairs, disposal races and cleanup failures, without invoking video or speech services.

## License

MIT for the porting arrangement; skill content copyright remains with Remotion.
