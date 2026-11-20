---
name: "remotion-saas"
description: "Build an app with Remotion"
version: "4.0.545"
---

## DSH package context

Apply this DSH section only when an ancestor package.json identifies the installed dsh-remotion package. A standalone copy without that DSH package follows the official standalone instructions below. In DSH, plugin management owns updates: do not run standalone skills add/update, remotion skills, or hyperframes skills to replace this bundle. Treat the installed plugin as read-only, preserve existing projects and lockfiles, and upgrade a user project only when requested. These DSH rules override standalone setup and launcher examples for this installed package.

For DSH-managed template videos use remotion_project (list/create/get/update) and remotion_render (prepare/preview/render/job/cancel). Check readiness; explicitly prepare on first use and poll the job until done before preview/export. Use the saved project id and current revision; query/cancel with the job id. Dependency installation alone is not readiness. Never fabricate ready.json or edit the managed runtime. The workbench pins remotion 4.0.545; its local templates do not implement every advanced upstream workflow.

Preparation needs Node.js 22.19+ or 24+ with npm visible to the desktop app. Homebrew commonly uses /opt/homebrew/bin (Apple Silicon) or /usr/local/bin (Intel), with npm in prefix/lib/node_modules. Linux symlinks and Windows paths with spaces are supported. A terminal PATH can differ from an already running desktop app: restart DSH after changing its launch environment and retry the saved job. Do not reinstall over this plugin, execute shell wrappers as JavaScript, or copy secrets/whole environment dumps into diagnostics.

For advanced user-owned React projects, follow their existing package manager and installed Remotion version in the project directory. The managed runtime is separate: do not change it to match another project. Export/render only when the user requests the resulting video.

One can build apps with Remotion.  
It is possible to have a simple form and hook it up to a render, or have a complex video editor.

## Choosing a template or a framework

We have several templates for SaaS which can be cloned or used as a reference.
See [Choosing a framework](framework.md) for help choosing a template or framework.

## The `<Player>`

This component allows embedding a Remotion preview in a React app. See [Player](player.md) for more information about the Player.

## Rendering

There are client-side and server-side rendering options available. See [Rendering](rendering.md) for advice on how to choose, and about the Lambda, Vercel, Node.js and Cloudflare options.

## With Vue

See https://www.remotion.dev/docs/vue.md for how to use Remotion with Vue.

## Angular

See https://www.remotion.dev/docs/angular.md for how to use Remotion with Angular.

## Svelte

See https://www.remotion.dev/docs/svelte.md for how to use Remotion with Svelte.
