# dsh-remotion

[中文](README.md)

![dsh-remotion whale girl plugin cover](https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/assets/cover-whale-girl.png)

Bring Remotion React video creation skills into DSH.

[![npm](https://img.shields.io/npm/v/dsh-remotion)](https://www.npmjs.com/package/dsh-remotion) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-remotion-downloads.svg)](https://www.npmjs.com/package/dsh-remotion)

Feedback and contributions are welcome: report [issues](https://github.com/STARDUSTLC666/dsh-remotion/issues) or submit [pull requests](https://github.com/STARDUSTLC666/dsh-remotion/pulls).

## What it does

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

Open Settings → Remotion → New video. Save your content, then upload media. Prepare the render environment on first use, inspect the official Studio preview, stop it and export MP4.

Ask: “Make a Remotion video from these assets, preview it in Studio, then export MP4.”

## Requirements and configuration

The plugin preserves upstream skills and adds a local workbench. First use needs Node.js 22.19+ / 24+ and npm; Remotion retains its [official license](https://www.remotion.dev/license). Dependencies are downloaded only when you explicitly prepare the environment.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](docs/USAGE.en.md). For standalone development, follow the Node requirement in [package.json](package.json).

## Documentation

- [Usage and troubleshooting](docs/USAGE.en.md)
- [Changelog](CHANGELOG.md)
- [Validation scope and history](docs/VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-remotion/issues)

## License

[MIT](LICENSE). Upstream skill licensing is documented in the usage guide.
