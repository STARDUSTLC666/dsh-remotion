[中文](README.md)

# dsh-remotion

DSH (DeepSeek Harness) video-creation skill plugin: installing it registers the official Remotion skill into DSH (programmatic video with React: animation, audio, captions, 3D, charts, fonts, and 38 rule files).

## Installation

```bash
dsh plugin --profile web add dsh-remotion
```

After restarting, say "make a video with Remotion" to trigger it.

## Contents

- **remotion**: Remotion best practices plus `rules/` with 38 rule files (animation/audio/captions/3D/charts/fonts/GIFs/Lottie/maps/transitions...)

## Requirements

Node.js ≥ 20 + npx (npm registry); rendering needs ffmpeg (guided by the skill itself).

## Porting notes

Ported from the official OpenAI Codex Remotion plugin cache: frontmatter converted to the DSH format, Codex-only `agents/` stripped, and rule references verified.

## License

MIT for the porting arrangement; skill content copyright remains with Remotion.
