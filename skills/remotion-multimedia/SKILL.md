---
name: "remotion-multimedia"
description: "Interacting with Mediabunny"
version: "4.0.545"
---

## DSH package context

Apply this DSH section only when an ancestor package.json identifies the installed dsh-remotion package. A standalone copy without that DSH package follows the official standalone instructions below. In DSH, plugin management owns updates: do not run standalone skills add/update, remotion skills, or hyperframes skills to replace this bundle. Treat the installed plugin as read-only, preserve existing projects and lockfiles, and upgrade a user project only when requested. These DSH rules override standalone setup and launcher examples for this installed package.

For DSH-managed template videos use remotion_project (list/create/get/update) and remotion_render (prepare/preview/render/job/cancel). Check readiness; explicitly prepare on first use and poll the job until done before preview/export. Use the saved project id and current revision; query/cancel with the job id. Dependency installation alone is not readiness. Never fabricate ready.json or edit the managed runtime. The workbench pins remotion 4.0.545; its local templates do not implement every advanced upstream workflow.

Preparation needs Node.js 22.19+ or 24+ with npm visible to the desktop app. Homebrew commonly uses /opt/homebrew/bin (Apple Silicon) or /usr/local/bin (Intel), with npm in prefix/lib/node_modules. Linux symlinks and Windows paths with spaces are supported. A terminal PATH can differ from an already running desktop app: restart DSH after changing its launch environment and retry the saved job. Do not reinstall over this plugin, execute shell wrappers as JavaScript, or copy secrets/whole environment dumps into diagnostics.

For advanced user-owned React projects, follow their existing package manager and installed Remotion version in the project directory. The managed runtime is separate: do not change it to match another project. Export/render only when the user requests the resulting video.

Mediabunny is a multimedia library for dealing with audio and video in the browser.
Here is a compact overview of its capabilities: https://mediabunny.dev/llms.txt

## Getting audio duration

See [get-audio-duration.md](get-audio-duration.md) for getting the duration of an audio file in seconds with Mediabunny.

## Getting video dimensions

See [get-video-dimensions.md](get-video-dimensions.md) for getting the width and height of a video file with Mediabunny.

## Getting video duration

See [get-video-duration.md](get-video-duration.md) for getting the duration of a video file in seconds with Mediabunny.
