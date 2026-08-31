[中文](README.md)

![npm](https://img.shields.io/npm/v/dsh-remotion) ![downloads](https://img.shields.io/npm/dm/dsh-remotion) ![license](https://img.shields.io/github/license/STARDUSTLC666/dsh-remotion) ![stars](https://img.shields.io/github/stars/STARDUSTLC666/dsh-remotion?style=social)

# dsh-remotion

[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)

DSH (DeepSeek Harness) video-creation skill plugin: installing it registers the official Remotion skill into DSH (programmatic video with React: animation, audio, captions, 3D, charts, fonts; synced with the official Remotion v4.0.519 twelve-skill structure).

## Compatibility

Verified against `@deepseek-ai/dsh@0.1.2-alpha.2` on 2026-08-31. Built for the cordis patch-bundle plugin model (`cordis.patch.yml` + `dsh.bundle.patch`). No runtime imports of `@deepseek-ai/*` internals.

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

- **remotion-best-practices** (router hub) + 11 domain skills (captions/create/docs/interactivity/maps/markup/multimedia/render/saas/studio/upgrade), synced from official Remotion v4.0.519

## Requirements

Node.js ≥ 20 + npx (npm registry); rendering needs ffmpeg (guided by the skill itself).

## Porting notes

Synced from the official `remotion-dev/remotion` packages/skills (v4.0.519, 2026-08-31): hub symlinks materialized as real directories for cross-platform resolution.

## Multi-harness

Skills use the open Agent Skills (SKILL.md) format — **not just DSH**. Copy the directories under `skills/` into another agent's skills directory:

| Agent | Skills directory |
| :-- | :-- |
| Claude Code | `~/.claude/skills/` |
| Cursor | `.cursor/skills/` (or project-local `skills/`) |
| Gemini CLI | `~/.gemini/skills/` |
| OpenAI Codex | `~/.codex/skills/` |

Port once, use everywhere.


## License

MIT for the porting arrangement; skill content copyright remains with Remotion.
