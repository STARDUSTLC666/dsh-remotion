---
name: "remotion-create"
description: "Create a new Remotion video"
version: "4.0.545"
---

## DSH package context

Apply this DSH section only when an ancestor package.json identifies the installed dsh-remotion package. A standalone copy without that DSH package follows the official standalone instructions below. In DSH, plugin management owns updates: do not run standalone skills add/update, remotion skills, or hyperframes skills to replace this bundle. Treat the installed plugin as read-only, preserve existing projects and lockfiles, and upgrade a user project only when requested. These DSH rules override standalone setup and launcher examples for this installed package.

For DSH-managed template videos use remotion_project (list/create/get/update) and remotion_render (prepare/preview/render/job/cancel). Check readiness; explicitly prepare on first use and poll the job until done before preview/export. Use the saved project id and current revision; query/cancel with the job id. Dependency installation alone is not readiness. Never fabricate ready.json or edit the managed runtime. The workbench pins remotion 4.0.545; its local templates do not implement every advanced upstream workflow.

Preparation needs Node.js 22.19+ or 24+ with npm visible to the desktop app. Homebrew commonly uses /opt/homebrew/bin (Apple Silicon) or /usr/local/bin (Intel), with npm in prefix/lib/node_modules. Linux symlinks and Windows paths with spaces are supported. A terminal PATH can differ from an already running desktop app: restart DSH after changing its launch environment and retry the saved job. Do not reinstall over this plugin, execute shell wrappers as JavaScript, or copy secrets/whole environment dumps into diagnostics.

For advanced user-owned React projects, follow their existing package manager and installed Remotion version in the project directory. The managed runtime is separate: do not change it to match another project. Export/render only when the user requests the resulting video.

These are instructions for making a new Remotion project and composition.  
If this is not the next task, see Remotion Best Practices (`remotion-best-practices` skill)

## Scaffold a project

If a project already exists, skip this.
Ensure Node.js and Git is installed, and the current folder is appropriate for starting a new project.
`create-video` also installs the dependencies. If it logs an error while installing them, run `npm i` in the project.

Inspect the current folder, including hidden files, before choosing where to scaffold.

### Empty folder

If it is empty, or contains only disposable operating-system metadata such as `.DS_Store`, create the project directly in the current folder.
Remove only those disposable metadata files first, since `create-video` rejects non-empty folders.
Do not treat all hidden files as disposable: files such as `.env` and directories such as `.git` are meaningful contents.

Scaffold in existing folder:

```bash
npx create-video@latest --yes --blank --no-tailwind .
```

### Non-empty folder

If the current folder contains meaningful contents and no project already exists, scaffold into a new subfolder.
Replace `my-video` with a suitable project name.

```bash
npx create-video@latest --yes --blank --no-tailwind my-video
cd my-video
```

## Open the preview before building the video

As soon as the project can run, open Remotion Studio (`remotion-studio` skill) in the browser before writing or changing the composition. For a new project, do this immediately after scaffolding and installing dependencies. For an existing project, do it before editing the video. Keep Studio running while you work so the user can see changes as they appear and steer the result.

## Designing a video

Keep the scaffold and add React Markup.
Follow Remotion React Markup Best Practices (`remotion-markup` skill) and [Video Layout Rules](video-layout.md) for video-first layout and text sizing guidance.

Before writing the root that registers `<Composition>` or `<Still>` elements,
follow Compositions and stills (`compositions.md` in the `remotion-markup` skill).

## Is this a timeline of clips?

If the video arranges multiple video or audio clips on a timeline, follow
Video editing (`video-editing.md` in the `remotion-markup` skill) before writing the
timeline. Give every clip that should be edited independently its own authored
JSX node.

## Is this a multi-scene video?

If this is a video with multiple subsequent scenes, follow guidance at Multi-scene videos (`multi-scene-video.md` in the `remotion-markup` skill).

## Interactivity Best Practices

Make new markup editable in Studio by default by following Remotion Interactivity Best Practices (`remotion-interactivity` skill).

## TailwindCSS

If Tailwind is requested, see [tailwind.md](tailwind.md) for using TailwindCSS in Remotion.

## Follow-up

The video creation process has finished.
For follow-up prompts, use Remotion Best Practices (`remotion-best-practices` skill)
