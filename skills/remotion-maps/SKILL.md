---
name: remotion-maps
description: Remotion Map animation knowledge
version: 4.0.539
---

## DSH package context

This skill is bundled with dsh-remotion. DSH plugin management owns updates to these skill files; do not run standalone `skills add`, `skills update`, or `remotion skills` commands to replace this bundle. Project dependencies and lockfiles are separate: preserve existing projects, and only upgrade their Remotion dependencies when the user requests it, then verify the project. Run commands in the user project, never in this installed plugin directory. The official instructions below apply within these package boundaries.


# Remotion Maps

Choose exactly one technique from the intended shot, then load only that technique's `TECHNIQUE.md`.
Every technique directory is self-contained and may be removed without breaking the others.

## [Static map](techniques/static-map/TECHNIQUE.md)

- Requires you grab a satellite image and mount it in a `<Img>` tag, and animate on top

## [Mapbox](techniques/mapbox/TECHNIQUE.md)

- Requires a Mapbox key
- Nicer styles by default
- Map can display a round globe when zoomed out
- Includes nice 3D buildings such as the Eiffel tower

## [MapLibre](techniques/maplibre/TECHNIQUE.md)

- Requires no API key, fully free
- Does not include 3D building

## [MapTiler](techniques/maptiler/TECHNIQUE.md)

- Uses MapTiler
- Annotations can be drawn on top of geographic features: borders, rivers, labels

## [CesiumJS](techniques/cesium/TECHNIQUE.md)

- Flythroughs through terrain and mountains
- "Flight simulator" perspective
