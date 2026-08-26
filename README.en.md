[中文](README.md)

# dsh-remotion

[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)

DSH (DeepSeek Harness) video-creation skill plugin: installing it registers the official Remotion skill into DSH (programmatic video with React: animation, audio, captions, 3D, charts, fonts, and 38 rule files).

## Compatibility

Verified against `@deepseek-ai/dsh@0.1.1-rc.2` on 2026-08-26. Built for the cordis patch-bundle plugin model (`cordis.patch.yml` + `dsh.bundle.patch`). No runtime imports of `@deepseek-ai/*` internals.

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

- **remotion**: Remotion best practices plus `rules/` with 38 rule files (animation/audio/captions/3D/charts/fonts/GIFs/Lottie/maps/transitions...)

## Requirements

Node.js ≥ 20 + npx (npm registry); rendering needs ffmpeg (guided by the skill itself).

## Porting notes

Ported from the official OpenAI Codex Remotion plugin cache: frontmatter converted to the DSH format, Codex-only `agents/` stripped, and rule references verified.

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