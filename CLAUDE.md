# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Project context

Technical mentoring project. Goal: build a public **creative preview interface** (playable ads,
MRAID, etc.) so clients can validate/reject creatives made by the creative developers / crea
teams, instead of the current raw shared link (see README.md).

See [`.claude/context/business-context.md`](.claude/context/business-context.md) for the full
domain context before designing anything related to the preview feature.

## Commands

```bash
npm run dev       # Vite dev server
npm run build     # tsc -b (type-check) then production build
npm run preview   # serve production build locally
npm run lint       # ESLint
npm run test       # Vitest, run once (co-located *.test.ts files)
npm run prettier   # format src/**/*.{js,jsx,ts,tsx}
```

Test framework: Vitest, configured in `vite.config.ts` (`test` block, shares the same
`resolve.alias` as the app — no separate config file). Tests are co-located next to the code they
cover (e.g. `orientRatio.ts` → `orientRatio.test.ts`), node environment by default; only add
`jsdom` if a test needs the DOM.

Single-file check while developing: `npx eslint <file>` and
`npx tsc --noEmit -p tsconfig.app.json`.

## Architecture

- Vite + React 19 + TypeScript, React Compiler enabled via `@rolldown/plugin-babel`
  (`vite.config.ts`) — this is expected to slow down dev/build. No manual `useMemo`/`useCallback`:
  the compiler handles memoization.
- Path aliases defined in both `vite.config.ts` and `tsconfig.app.json` (keep them in sync):
  - `@ui` → `src/ui`
  - `@features/*` → `src/features/*` (no bare `@features` import — no barrel index there, see below)
- **UI library: MUI**, used through the `src/ui` abstraction — never import from `@mui/material`
  (or `@mui/icons-material`) directly in app code, always import from `@ui`. Each MUI component is
  re-exported in its own file (e.g. `src/ui/Button.tsx` → `export const Button = MuiButton;`),
  barreled through `src/ui/index.ts`. Adding a new MUI component means: create the re-export file
  in `src/ui/`, add it to `src/ui/index.ts`. Since `@ui` re-exports are plain aliases, MUI's own
  documentation (props, variants, APIs) applies as-is to the `@ui` components.
- Barrel `index.ts` files are only used in `src/ui` (the MUI facade). `src/features` and its
  subfolders have no barrel — import directly from the file, e.g.
  `@features/orientation/useOrientation`.
- One feature folder per preview setting: `src/features/mode` (`useColorMode`, `ModeToggle`),
  `src/features/orientation` (`useOrientation`), `src/features/ratio` (`useRatio`).
- Global providers live in `src/main.tsx` (`CssBaseline`, `QueryClientProvider`) — add future
  global providers (theme, device context, etc.) there.
- Data fetching: TanStack Query + Axios against internal APIs (dashboard API).
- App state that should be shareable via link (ratio, orientation, ...) goes in the URL via
  `nuqs`, not in React state/context.

## Code style

- Prettier (`.prettierrc`): `printWidth: 80`, single quotes (incl. JSX), semicolons,
  `bracketSameLine: true`, `arrowParens: always`. Run `npm run prettier` rather than hand-formatting.
- ESLint flat config (`eslint.config.js`): typescript-eslint, eslint-plugin-react-hooks,
  eslint-plugin-react-refresh (Vite mode).
