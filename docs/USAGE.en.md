# dsh-remotion usage guide

[Overview](../README.en.md) · [Changelog](../CHANGELOG.md) · [Validation](VALIDATION.md)

## Current improvements

v0.13.0 introduces the **OP-DSH Multi-Track Hardware Director Console** (enabled by default with a 1-click toggle back to classic **Form** mode), featuring a recessed stage monitor, 24-LED render matrix, scrubbable 3-track timeline, 13 bright themes, 8 bilingual font pairings, and a 5-step guided tour. Project archiving and restoration remain supported from **Archived projects** (archives preserve data and disk usage; up to 30 projects can be active, and active jobs must be stopped first).

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

## Video workbench

Open **Remotion** from the sidebar (or Settings → Remotion) in DSH Web or Desktop. The editor opens in the **OP-DSH Multi-Track Hardware Director Console** by default (with a 1-click toggle to classic **Form** mode), 13 bright themes, 8 font pairings, and a header **? Tour** coachmark guide:

1. **Direct & scrub in the console**: Click **New video** or open a project. Use the tactile right strip to edit the title, press `16:9 / 9:16 / 1:1` mechanical keys, pick a template, set a 3–30s duration, and expand **Script**; press the vermilion `▶ Play` key or drag across the Video / Caption / Pace tracks and 24-LED Render Matrix to scrub live frames and `TC` timecode in the recessed stage monitor, then save.
2. Upload local PNG/JPEG/WebP copies, one MP3/WAV/M4A background audio and one muted MP4 background video. Limits: 20 MB each, 40 MB total. Slideshow follows upload order and needs at least two seconds per image.
3. Explicitly prepare the environment. It downloads official CLI 4.0.545 and Remotion's bundled `chrome-headless-shell` browser (set `REMOTION_BROWSER_EXECUTABLE` to explicitly use a custom browser). You can continue editing during preparation. Check the [official Remotion license](https://www.remotion.dev/license) for your use case.
4. Start official Studio and inspect the picture. Stop this preview before editing or exporting; no window opens automatically.
5. Review the pre-export check (title, canvas and duration, media count, saved revision, renderer, which revision the last MP4 used), then switch the monitor to **MP4** to play and download the output in the workbench. Later edits preserve earlier MP4s and display a revision warning. Export again for a new final output.

Preview and export jobs show their current step (for example "Step 2 / 3 · Rendering MP4"), a collapsible job log and a cancel button. A failed job keeps the project and offers "Retry this task" without re-entering input. A project changed elsewhere is never overwritten silently: the banner offers "Reload the latest version (discard my input)" or "Keep my input for now", and the unsaved-changes dialog blocks "Save and continue" so the same conflict cannot repeat. When Save or Export is unavailable, hover the button to read the exact reason (unsaved changes, renderer not prepared, title or duration out of range).

The editable ZIP includes source, data and media. Extract it, run npm install and npm run preview / render. Original template code is MIT; engines retain their own licenses. ZIP import is not yet available in settings.

Projects and caches stay in DSH_HOME/data/dsh-remotion. Original assets and existing user projects are untouched. Closing settings preserves input within this page; saved projects survive restart, while active jobs stop with DSH. Jobs can be cancelled. Tools: remotion_project (list/create/get/update), remotion_render (prepare/preview/render/job/cancel). Updates/rendering need id/revision; job/cancel need job id.

This is template editing, without a full timeline, transcription, TTS or cloud rendering. Default: 24 FPS, maximum 200 MB MP4. Preview listens on 127.0.0.1 only; other users on the same machine may still reach the service.

## Contents

- **remotion-best-practices** (router hub) + 12 domain skills (captions/create/docs/interactivity/license/maps/markup/multimedia/render/saas/studio/upgrade), synced from official Remotion v4.0.545

## Requirements

Node.js `^22.19.0 || >=24.0.0` + npx (npm registry); rendering needs ffmpeg (guided by the skill itself).

## Porting notes

Pinned to official `remotion-dev/skills` commit `6f55706d1069e512430582ad86e4e57dc07afe1b`; its package and frontmatter are version 4.0.545, paired with the official npm runtime 4.0.545 (verified November 21, 2026). All thirteen skills, including `remotion-license`, are registered. Documented DSH frontmatter/context adaptations preserve managed workflow and project boundaries. Per-file origins and adapted hashes are recorded in `skills/UPSTREAM.json`; see [skill synchronization](SKILL-SYNC.md) for the required pinned input and read-only check.

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
# Run in dsh-hyperframes; updates the explicit shared-file list in sibling dsh-remotion
node scripts/sync-skill-bundle.mjs
node scripts/sync-skill-bundle.mjs --check
```

Both suites compare shared source and regression tests to prevent drift. A standalone checkout skips only that cross-repository comparison. Tests cover invalid YAML, unreadable files, empty bodies, rejected/inactive registrations, file changes and repairs, disposal races and cleanup failures, without invoking video or speech services.

## License

MIT for the porting arrangement; skill content copyright remains with Remotion.
