---
name: "remotion-best-practices"
description: "Router for all Remotion skills"
version: "4.0.545"
---

## DSH package context

Apply this DSH section only when an ancestor package.json identifies the installed dsh-remotion package. A standalone copy without that DSH package follows the official standalone instructions below. In DSH, plugin management owns updates: do not run standalone skills add/update, remotion skills, or hyperframes skills to replace this bundle. Treat the installed plugin as read-only, preserve existing projects and lockfiles, and upgrade a user project only when requested. These DSH rules override standalone setup and launcher examples for this installed package.

For DSH-managed template videos use remotion_project (list/create/get/update) and remotion_render (prepare/preview/render/job/cancel). Check readiness; explicitly prepare on first use and poll the job until done before preview/export. Use the saved project id and current revision; query/cancel with the job id. Dependency installation alone is not readiness. Never fabricate ready.json or edit the managed runtime. The workbench pins remotion 4.0.545; its local templates do not implement every advanced upstream workflow.

Preparation needs Node.js 22.19+ or 24+ with npm visible to the desktop app. Homebrew commonly uses /opt/homebrew/bin (Apple Silicon) or /usr/local/bin (Intel), with npm in prefix/lib/node_modules. Linux symlinks and Windows paths with spaces are supported. A terminal PATH can differ from an already running desktop app: restart DSH after changing its launch environment and retry the saved job. Do not reinstall over this plugin, execute shell wrappers as JavaScript, or copy secrets/whole environment dumps into diagnostics.

For advanced user-owned React projects, follow their existing package manager and installed Remotion version in the project directory. The managed runtime is separate: do not change it to match another project. Export/render only when the user requests the resulting video.

## Preserve user changes

Users may make edits in the code outside of the conversation.

If you detect a surprising change made in the meanwhile, don't overwrite it, assume it was intentional or ask for confirmation.

## Creating a video

If the user asks to make, create, or build a new video or composition, load [Create a new Remotion video](./remotion-create/REFERENCE.md), whether or not a Remotion project already exists.

## New project setup

If no Remotion project currently exists, load [Create a new Remotion project](./remotion-create/REFERENCE.md)

## React Markup Best Practices

If you are writing Remotion React Markup, load [Remotion Markup Best Practices](./remotion-markup/REFERENCE.md)

## Maps

For static maps, animated routes and markers, geographic explainers, Mapbox, MapLibre, MapTiler, GeoJSON, or 3D geographic flyovers, load [Remotion Maps](./remotion-maps/REFERENCE.md).

## Multimedia

For achieving multimedia tasks in the browser, such as trimming, cropping videos, or getting metadata from them, load [Remotion Multimedia](./remotion-multimedia/REFERENCE.md)

For video matting, background removal, or placing content behind a subject,
load [Remotion Markup](./remotion-markup/REFERENCE.md).

## Interactivity

New markup is editable in Studio by default. When writing or restructuring markup, load [Interactivity Best Practices](./remotion-interactivity/REFERENCE.md).

## Open the preview

When creating or editing a video, you SHOULD open Studio once the project can run, so the user can preview changes and steer.

### If you are using Cursor

Run Studio without `--no-open` so it opens the browser automatically:

```bash
npx remotion studio
```

### If you are using another agent client with an in-app browser

You can use the command above to let Studio open the browser, or run:

```bash
npx remotion studio --no-open
```

This will start a long-running process and print the server URL for the preview.  
If the server is already started, it will print the URL.
If you use `--no-open`, open the exact printed URL in the in-app browser and verify that Studio loads. Once a composition exists, verify that its video preview loads. If you cannot open it there, run Studio without `--no-open`.
You can visit a specific composition by navigating to `/[composition-id]`, for example `http://localhost:3000/MapAnimation`.

:::note
The Studio supports WebMCP tools.
:::

### If you do not have an in-app browser

This will open the Studio in the browser or refocus it if it is already open.

```bash
npx remotion studio
```

### More options

To launch a project in Remotion Studio, open its exact local URL, or configure Studio CLI flags, load [Remotion Studio](./remotion-studio/REFERENCE.md).

## Render the video

Only render if the user is very explicit in asking for it.  
E.g. "Render the video", "Export", "Give me the MP4".

The preview also has a more intuitive rendering interface, so consider using it instead of the command line for rendering.

```
npx remotion render
```

For more options, see [Rendering](./remotion-render/REFERENCE.md).

For advanced rendering beyond simple `npx remotion render`, see: [Rendering Best Practices](./remotion-render/REFERENCE.md)

## Captions

When working with Captions, load [Remotion Captions](./remotion-captions/REFERENCE.md).

## Creating a SaaS, automation or application

Use the [Remotion SaaS skill](./remotion-saas/REFERENCE.md) for knowledge about Remotion-powered SaaS apps, such as `<Player>`, rendering on Lambda, Vercel, Cloudflare, via Express.js, client-side rendering, or for finding the right SaaS template.

## Looking up Remotion APIs and documentation

To find and read current Remotion documentation, load [Remotion Docs](./remotion-docs/REFERENCE.md).

## Licensing

For Remotion license information, FAQs, terms, or buying a license, load [Remotion License](./remotion-license/REFERENCE.md).

## Upgrading

To upgrade Remotion, related packages, compatible Mediabunny packages, and installed Remotion Agent Skills, load [Remotion Upgrade](./remotion-upgrade/REFERENCE.md).
