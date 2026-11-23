[简体中文](README.md) · **English**

# Remotion

> **Build, preview, and export HD MP4 videos from React projects inside DeepSeek Harness.**

Ships with the **OP-DSH Hardware Multi-Track Director Console**, 13 official Remotion skills, template library, official Studio preview, local MP4 rendering, and editable source archives.

[![npm](https://img.shields.io/npm/v/dsh-remotion)](https://www.npmjs.com/package/dsh-remotion) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-remotion-downloads.svg)](https://www.npmjs.com/package/dsh-remotion) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-remotion-total-downloads.svg)](https://www.npmjs.com/package/dsh-remotion)

**[Features](#features) · [Install](#install) · [Workflow](#start-using-it) · [Full guide](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/docs/REFERENCE.en.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/docs/assets/intro/workflow-en-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/docs/assets/intro/workflow-en-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/docs/assets/intro/workflow-en-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/docs/assets/intro/workflow-en-light.svg" alt="Turn React projects into videos from DSH. · workflow illustration" width="100%">
</picture>

## Features

| Pillar | Capabilities |
| :--- | :--- |
| **OP-DSH Director Console** | Recessed Live Stage Monitor (`16:9`/`9:16`/`1:1`, `TC` timecode & 24-LED matrix), tactile parameter strip & scrubbable Video/Caption/Pace timeline; 1-click toggle to classic **Form** |
| **Official Skills & Templates** | 13 bundled official Remotion skills (pinned `4.0.545`), starter templates, project search, media ordering & archive restore |
| **Studio Preview & Export** | Managed renderer setup, official Remotion Studio motion checks, local HD MP4 rendering & editable project backups |
| **Unified Themes & Fonts** | Adapted for DSH `>=0.2.2-rc.3` with 13 bright studio themes and 8 dual-layer font pairings (default: YouYuan Mono) synced across plugins |

<details>
<summary>See a workbench example</summary>

![Remotion workbench](https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/docs/assets/intro/screen-en.webp)

Captured in a local DeepSeek Harness environment (Bright 8-Bit theme) with sample data.

</details>

## Install

Open **Plugins** in the DSH desktop app and install `dsh-remotion`, or use the CLI:

```bash
dsh plugin --profile desktop add dsh-remotion
```

For the web profile, replace `desktop` with `web` and restart DSH. Requires DSH `>=0.2.2-rc.3`.

## Start using it

1. **Create or open a project**: Open Remotion in the sidebar to enter the **OP-DSH Director Console** (toggle to **Form** mode anytime in 1 click).
2. **Direct & scrub scenes**: Pick `16:9`/`9:16`/`1:1`, templates, and 3–30s duration; edit lines in **Script**, then press `▶ Play` or scrub the Video / Caption / Pace tracks live.
3. **Organize media**: Save the project, then upload images, audio, or muted video clips and adjust ordering in **Media**.
4. **Prepare renderer & Studio**: Initialize the official renderer in **Environment** on first use, then open Studio preview to verify motion.
5. **Export MP4 & keep backups**: Confirm the pre-export summary to render HD MP4 locally, play/download from the monitor, and keep editable source archives.

### Example prompt

> Create a React video project. Confirm the structure and script, preview in Studio, then export MP4.

## Before you start

- Prepare the managed rendering environment in **Environment** on first use; re-render after editing a project.
- **Skills & runtime**: Bundled skills and renderer are pinned to `4.0.545` (all 13 official skills + license guide); plugin updates never overwrite existing user projects or lockfiles.
- If Desktop cannot detect installed Node/npm, verify its launch `PATH` (e.g., `/opt/homebrew/bin` or `/usr/local/bin`) and restart DSH. See [usage guide](docs/USAGE.en.md) and [skill sync](docs/SKILL-SYNC.md).

## Plugin updates

Check updates at the bottom of the workbench or native plugin details. Automatic checks are on by default; **automatic installation is off**. Suite-managed components update with their bundle.

## Documentation & feedback

- [Full usage, configuration and limits](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/docs/REFERENCE.en.md) · [Release notes](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/CHANGELOG.md) · [Validation history](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/docs/VALIDATION.md)
- Stars, [Issues](https://github.com/STARDUSTLC666/dsh-remotion/issues), and [PRs](https://github.com/STARDUSTLC666/dsh-remotion/pulls) are welcome (strip credentials first).

## License

[MIT](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/LICENSE)

<a id="what-it-does"></a>
<a id="requirements-and-configuration"></a>
<a id="skills-and-runtime-versions"></a>
