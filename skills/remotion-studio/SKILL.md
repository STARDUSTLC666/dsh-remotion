---
name: remotion-studio
description: Preview a Remotion video
version: 4.0.539
---

## DSH package context

This skill is bundled with dsh-remotion. DSH plugin management owns updates to these skill files; do not run standalone `skills add`, `skills update`, or `remotion skills` commands to replace this bundle. Project dependencies and lockfiles are separate: preserve existing projects, and only upgrade their Remotion dependencies when the user requests it, then verify the project. Run commands in the user project, never in this installed plugin directory. The official instructions below apply within these package boundaries.


When creating or editing a video, start Studio and open its preview as soon as the project can run, before building the composition. Keep it open while you work so the user can see changes and steer.

In Cursor, run Studio without `--no-open` so the browser opens automatically:

```bash
npx remotion studio
```

In other agent clients, you can also let Studio open the browser automatically with the command above. If you have an in-app browser and intend to use it, run:

```bash
npx remotion studio --no-open
```

If the Studio is already opened, the URL will be printed and the command will exit.
Otherwise, a long-running process will start, and the URL will be printed.

When using `--no-open`, open the exact printed URL in the in-app browser and verify that Studio loads. Once a composition exists, verify that its video preview loads. Do not use `--no-open` if you cannot open the URL in the in-app browser.

## Useful flags

| Argument          | Purpose                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------- |
| `--log=<level>`   | Set `error`, `warn`, `info` (default), or `verbose` logging.                                  |
| `--port=<number>` | Request a Studio server port; otherwise Remotion finds a free port.                           |
| `--force-new`     | Start another Studio instance even when one is already running for the same project and port. |
