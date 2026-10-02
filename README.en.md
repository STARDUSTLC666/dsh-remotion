# dsh-remotion

[中文](README.md)

Bring Remotion React video creation skills into DSH.

[![npm](https://img.shields.io/npm/v/dsh-remotion)](https://www.npmjs.com/package/dsh-remotion) [![downloads](https://img.shields.io/npm/dm/dsh-remotion)](https://www.npmjs.com/package/dsh-remotion)

## What it does

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

Ask: “Make a Remotion video from these assets, preview it in Studio, then export MP4.”

## Requirements and configuration

The plugin installs skills. Creation and rendering require Node / npx and Remotion project dependencies. See the guide for provenance, bundled versions and licensing.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](docs/USAGE.en.md). For standalone development, follow the Node requirement in [package.json](package.json).

## Documentation

- [Usage and troubleshooting](docs/USAGE.en.md)
- [Changelog](CHANGELOG.md)
- [Validation scope and history](docs/VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-remotion/issues)

## License

[MIT](LICENSE). Upstream skill licensing is documented in the usage guide.
