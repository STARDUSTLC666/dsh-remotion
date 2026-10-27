---
name: remotion-multimedia
description: Interacting with Mediabunny
version: 4.0.539
---

## DSH package context

This skill is bundled with dsh-remotion. DSH plugin management owns updates to these skill files; do not run standalone `skills add`, `skills update`, or `remotion skills` commands to replace this bundle. Project dependencies and lockfiles are separate: preserve existing projects, and only upgrade their Remotion dependencies when the user requests it, then verify the project. Run commands in the user project, never in this installed plugin directory. The official instructions below apply within these package boundaries.


Mediabunny is a multimedia library for dealing with audio and video in the browser.
Here is a compact overview of its capabilities: https://mediabunny.dev/llms.txt

## Getting audio duration

See [get-audio-duration.md](get-audio-duration.md) for getting the duration of an audio file in seconds with Mediabunny.

## Getting video dimensions

See [get-video-dimensions.md](get-video-dimensions.md) for getting the width and height of a video file with Mediabunny.

## Getting video duration

See [get-video-duration.md](get-video-duration.md) for getting the duration of a video file in seconds with Mediabunny.
