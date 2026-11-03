> Full usage reference. The landing page focuses on outcomes, installation and workflows; detailed parameters, limits, update rules and historical validation links remain here.

# dsh-remotion

[中文](../README.md)

![dsh-remotion whale girl plugin cover](https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/assets/cover-whale-girl.png)

Create React videos in DSH with official Remotion skills, template projects, asset upload and ordering, archives, Studio preview and local MP4 export. Use AI-authored projects or start directly from a workbench template.

[![npm](https://img.shields.io/npm/v/dsh-remotion)](https://www.npmjs.com/package/dsh-remotion) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-remotion-downloads.svg)](https://www.npmjs.com/package/dsh-remotion) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-remotion-total-downloads.svg)](https://www.npmjs.com/package/dsh-remotion)

[Download statistics](https://github.com/STARDUSTLC666/dsh-suite/blob/npm-downloads/README.md)

Feedback and contributions are welcome: report [issues](https://github.com/STARDUSTLC666/dsh-remotion/issues) or submit [pull requests](https://github.com/STARDUSTLC666/dsh-remotion/pulls).

Open the workbench from the native DSH sidebar. See the [workbench guide](WORKBENCH.md) for configuration and operating boundaries.

Bundled skills: official Remotion 4.0.539, twelve skills and their reference resources.

Move images up or down in the Media tab, including with the keyboard. The order saves immediately; export again to apply it to a new MP4.

## What it does

- Search projects and sort by update time or natural title; keep filters when returning to the library.
- A settings workbench for templates, editable content, media uploads, official Studio preview and local MP4 export.
- Title card, product card and slideshow templates in landscape, portrait or square format.
- Editable project backups, cancellable jobs and a warning when an MP4 uses an older revision.

- Cover animation, audio, captions, charts and 3D scenes.
- Guide project creation, Studio preview and rendering.
- Preserve upstream skills and provide runtime health checks.

## Install

In DSH Desktop, install `dsh-remotion` from the Plugins panel. If the bundled dsh command is available:

```bash
dsh plugin --profile desktop add dsh-remotion
```

For the web version, replace `desktop` with `web`. Restart DSH after installation.

## Start using it

1. Open Remotion in the sidebar, choose New video, select a template and enter content.
2. Save the project, upload images, audio or video, and reorder images in Media when needed.
3. Prepare the official renderer in Environment on first use, then start Studio preview.
4. Inspect and stop the preview before editing or exporting MP4. Export again after changing the project.
5. Download MP4 or editable source from Exports, and organize projects with library search and archives.

## Requirements and configuration

The plugin preserves upstream skills and adds a local workbench. First use needs Node.js 22.19+ / 24+ and npm; Remotion retains its [official license](https://www.remotion.dev/license). Dependencies are downloaded only when you explicitly prepare the environment.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](USAGE.en.md). For standalone development, follow the Node requirement in [package.json](../package.json).

## Documentation

- [Usage and troubleshooting](USAGE.en.md)
- [Changelog](../CHANGELOG.md)
- [Validation scope and history](VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-remotion/issues)

## Plugin updates

Requires DSH 0.2.1-rc.3 or newer. Update controls sit at the bottom of the existing workbench, or native plugin details for plugins without a workbench. Checks, release notes and preferences expand in place, with no separate update page or settings menu. Automatic checks are on by default; **automatic installation is off by default**. Only explicit opt-in permits compatible stable patches while idle with no unsaved changes. Preferences are independent, with per-plugin disable, deferral and ignore controls. No forced DSH restart or upgrade, and local-source installations stay unchanged. Suite components explain and operate on the whole Suite in the same footer.

Older releases need one manual update in native plugin management to acquire these controls. Publishing to npm does not replace an existing user installation.

## License

[MIT](../LICENSE). Upstream skill licensing is documented in the usage guide.
