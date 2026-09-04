# Creative Preview — Adikteev

A modern web interface to preview and share creatives (playable, MRAID, etc.) built by
Adikteev's creative developers / crea teams with clients, so they can validate or reject them.

> This repository is a technical mentoring project, built step by step.

## Context

Creatives are currently shared with clients via a raw link to a generic execution engine, e.g.:

```
https://cdn-creatives.adikteev.com/Creatives/demoLink/MLEngine/index.html?PLE_Phaser_Vite/creative-11a4d96e.min.js
```

This works but offers no review experience.

## Goal

Build a preview interface that:

- runs a creative's JS bundle (same kind as the one loaded via the `MLEngine` link today)
- lets you pick a device (phone brand/model, screen size)
- lets you toggle orientation (portrait / landscape)
- supports dark / light mode
- lets the client validate or reject the creative

## Stack

React 19 + TypeScript, Vite (React Compiler enabled), MUI (re-exported via `@ui`), TanStack
Query + Axios, [nuqs](https://nuqs.dev/) (URL query params as state), ESLint + Prettier.

### Path aliases

- `@ui` → `src/ui` (MUI components, re-exported)
- `@features` → `src/features` (business features)

## Scripts

```bash
npm run dev       # start dev server
npm run build     # type-check + production build
npm run preview   # serve production build locally
npm run lint       # lint
npm run prettier   # format source
```

## Roadmap

v1 (start simple, inspired by [craftsmanplus](https://play.preview.craftsmanplus.com/)):

- [ ] Load a creative JS bundle (playable / MRAID) in an isolated environment
- [ ] Ratio selector
- [ ] Orientation toggle
- [ ] QR code to open the preview on a mobile device
- [ ] State (ratio, orientation, ...) shared via URL query params (`nuqs`)

Later:

- [ ] Device selector (brand / model / screen size)
- [ ] Dark / light mode
- [ ] Client validate / reject flow

## Claude Code context

See [`CLAUDE.md`](./CLAUDE.md) and [`.claude/context`](./.claude/context) for the business/technical
context used to work on this repo with Claude Code.
