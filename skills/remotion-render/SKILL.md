---
name: "remotion-render"
description: "Export a Remotion video, still image, or editable OpenTimelineIO timeline"
version: "4.0.545"
---

## DSH package context

Apply this DSH section only when an ancestor package.json identifies the installed dsh-remotion package. A standalone copy without that DSH package follows the official standalone instructions below. In DSH, plugin management owns updates: do not run standalone skills add/update, remotion skills, or hyperframes skills to replace this bundle. Treat the installed plugin as read-only, preserve existing projects and lockfiles, and upgrade a user project only when requested. These DSH rules override standalone setup and launcher examples for this installed package.

For DSH-managed template videos use remotion_project (list/create/get/update) and remotion_render (prepare/preview/render/job/cancel). Check readiness; explicitly prepare on first use and poll the job until done before preview/export. Use the saved project id and current revision; query/cancel with the job id. Dependency installation alone is not readiness. Never fabricate ready.json or edit the managed runtime. The workbench pins remotion 4.0.545; its local templates do not implement every advanced upstream workflow.

Preparation needs Node.js 22.19+ or 24+ with npm visible to the desktop app. Homebrew commonly uses /opt/homebrew/bin (Apple Silicon) or /usr/local/bin (Intel), with npm in prefix/lib/node_modules. Linux symlinks and Windows paths with spaces are supported. A terminal PATH can differ from an already running desktop app: restart DSH after changing its launch environment and retry the saved job. Do not reinstall over this plugin, execute shell wrappers as JavaScript, or copy secrets/whole environment dumps into diagnostics.

For advanced user-owned React projects, follow their existing package manager and installed Remotion version in the project directory. The managed runtime is separate: do not change it to match another project. Export/render only when the user requests the resulting video.

## General rendering strategy

Use Remotion's bundled browser for rendering, including compositions using
`<HtmlInCanvas>`. It includes the required browser APIs and Remotion's browser
fixes. Let Remotion download or update it as needed. Do not reuse a recording
browser or set `--browser-executable`, `browserExecutable`, or `chromeMode`
unless the user explicitly requests a different browser.

Render a video using:

```
npx remotion render [composition-id] out/video.mp4
```

Always pass the composition ID. Without it, Remotion shows an interactive picker, or fails in a non-interactive terminal. List the IDs with `npx remotion compositions`.

Full list of options: https://www.remotion.dev/docs/cli/render.md

## Passing input props

Pass input props as inline JSON or as a path to a JSON file:

```
npx remotion render [composition-id] out/video.mp4 --props='{"title": "Hello"}'
npx remotion render [composition-id] out/video.mp4 --props=./props.json
```

Remotion shallow-merges input props over the `defaultProps` of the composition.
See https://www.remotion.dev/docs/passing-props.md.

## License key

Companies that need a Remotion license (`remotion-license` skill) should
pass their license key to every render. Replace `YOUR_API_KEY` in this example
with that license key. If the user qualifies for the free license, pass
`free-license` instead.

```
npx remotion render [composition-id] out/video.mp4 --license-key=YOUR_API_KEY
```

Only pass `--license-key` if a key is available, since an empty value is not a valid key.
Add `--is-production=false` for test renders so that Remotion does not bill them.
See https://www.remotion.dev/docs/telemetry.md.

Render a still using:

```
npx remotion still
```

Full list of options: https://www.remotion.dev/docs/cli/still.md

To render several frames as images in one call, use `render --frames`:

```
npx remotion render [composition-id] out/frames --frames=0,30,90 --image-format=png
```

See https://www.remotion.dev/docs/cli/render.md#--frames for more options.

Remotion writes the frames as `element-[frame].[ext]`. It pads the frame number
with zeros to the number of digits of the highest rendered frame, so
`--frames=4,30` writes `element-04.png` and `element-30.png`. List the output
folder instead of guessing the filenames, or pass `--image-sequence-pattern`
to change the pattern.

## Transparent videos

See [Transparent videos](./transparent-videos.md) for rendering out a video with transparency.

## OpenTimelineIO export (optional)

When the user asks for an editable timeline for DaVinci Resolve, Adobe Premiere,
or another video editor, follow [Export to OpenTimelineIO](./opentimeline.md).
This workflow preserves editable media clips where possible and prerenders
unsupported elements. Use it only for requested timeline exports; ordinary video
and still renders use the commands above.
