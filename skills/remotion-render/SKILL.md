---
name: remotion-render
description: Export a Remotion video
version: 4.0.539
---

## DSH package context

This skill is bundled with dsh-remotion. DSH plugin management owns updates to these skill files; do not run standalone `skills add`, `skills update`, or `remotion skills` commands to replace this bundle. Project dependencies and lockfiles are separate: preserve existing projects, and only upgrade their Remotion dependencies when the user requests it, then verify the project. Run commands in the user project, never in this installed plugin directory. The official instructions below apply within these package boundaries.


## General rendering strategy

Render a video using:

```
npx remotion render
```

Full list of options: https://www.remotion.dev/docs/cli/render.md

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

## Transparent videos

See [Transparent videos](./transparent-videos.md) for rendering out a video with transparency.
