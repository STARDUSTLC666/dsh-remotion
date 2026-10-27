---
name: remotion-saas
description: Build an app with Remotion
version: 4.0.539
---

## DSH package context

This skill is bundled with dsh-remotion. DSH plugin management owns updates to these skill files; do not run standalone `skills add`, `skills update`, or `remotion skills` commands to replace this bundle. Project dependencies and lockfiles are separate: preserve existing projects, and only upgrade their Remotion dependencies when the user requests it, then verify the project. Run commands in the user project, never in this installed plugin directory. The official instructions below apply within these package boundaries.


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
