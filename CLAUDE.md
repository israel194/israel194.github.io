# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Hard rules from AGENTS.md

This project uses **Next.js 16.2.1** with React 19 and Tailwind v4. From `AGENTS.md`: this is **not the Next.js most training data describes** — APIs and conventions have breaking changes. Before writing Next-specific code, read the relevant guide in `node_modules/next/dist/docs/` and heed deprecation notices.

## Commands

```bash
npm run dev    # next dev — local server on http://localhost:3000
npm run build  # next build — produces static site in out/ (full type-check + lint)
npm run start  # next start (rarely useful here; site is static-exported)
npm run lint   # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

There is no test suite. Type errors and ESLint errors fail the build. The site is deployed via the `Deploy to GitHub Pages` workflow (`.github/workflows/deploy.yml`) on push to `master`: it runs `npm ci && npm run build` on Node 22 and uploads `out/` to Pages.

## What this site is

A trilingual (Hebrew default / English / Arabic) static marketing landing page selling office floors in the GATE Jerusalem tower (B2). Domain context — floor numbers, prices, models A–H, developer/bank logos — lives in `docs/context.md` and `docs/plan.md`. Read these before changing anything that touches floor data or copy.

Three landing-page variants exist behind the same `[lang]` route:

- `src/app/[lang]/page.tsx` → `LandingPage.tsx` (production marketing page)
- `src/app/[lang]/apple/page.tsx` → `LandingPageApple.tsx` (Apple-styled alternate, single big file)
- `src/app/[lang]/preview/page.tsx` → `LandingPagePreview.tsx` (trimmed-down variant)

`src/app/page.tsx` redirects `/` → `/he`.

## Architecture you can't see from a single file

### Static export under a base path
`next.config.ts` sets `output: "export"`, `basePath: "/gate"`, `assetPrefix: "/gate"`, `images.unoptimized: true`. Two consequences that bite:

1. **Raw `<img src>` / `<a href>` to local assets must be prefixed with `/gate`.** Use the `asset()` helper from `@/lib/assetPath`: `asset("/images/foo.jpg")` → `/gate/images/foo.jpg`. `next/image` and `next/link` handle the prefix automatically; raw tags do not.
2. Every page is pre-rendered. Anything that uses `params` is async (`params: Promise<{ lang: string }>`) and locales are produced via `generateStaticParams()` in **both** `src/app/[lang]/layout.tsx` and each leaf `page.tsx` — keep them in sync when adding a locale.

### i18n
- Locales live in `src/lib/i18n.ts`: `["he", "en", "ar"]`, default `he`, `dirMap` controls RTL/LTR. Hebrew and Arabic are RTL; the `<div dir>` is set in `src/app/[lang]/layout.tsx`.
- Dictionaries are JSON in `src/locales/{he,en,ar}.json`. Loaded server-side with `getDictionary(locale)` (dynamic `import()`).
- The dictionary + lang are passed from the server `page.tsx` into the client `LandingPage` component, which puts them into a React context. **`useI18n()` and `I18nCtx` are exported from `src/components/LandingPage.tsx` itself** — not from `lib/`. The Apple and Preview variants reuse the same `I18nCtx` via `import { I18nCtx } from "./LandingPage"`.
- Strings can contain `{gold}highlighted{/gold}` markers; render them with `renderGoldTitle()` from `src/lib/renderGoldTitle.tsx`.
- When adding a key, add it to **all three** locale files. The `Dictionary` type is inferred from the Hebrew JSON, so missing keys in `he.json` will produce TS errors at consumer sites; missing keys in `en.json`/`ar.json` will silently render `undefined`.

### Currency
`CurrencyProvider` (`src/components/CurrencyProvider.tsx`) wraps the page below `LandingPage`. It defaults currency by locale (`he→ILS`, `en→USD`, `ar→AED`), fetches live ILS rates from `https://open.er-api.com/v6/latest/ILS` on mount, and falls back to static rates in `src/lib/currency.ts`. **All prices in component code are stored in ILS**; render with `useCurrency().fmtPrice(ils)` or convert with `convert(ils)`. Don't hardcode currency-formatted strings.

### Floor data — beware the duplicate source of truth
There are two floor datasets and they don't fully agree:

- **Canonical, with per-unit detail (A–H, sold flags, balcony, shelter):** `src/lib/floorUnitsData.ts` (`floorsDetailData`, `getAvailableTotals`, `getUnitPrice`). Used by `FloorDetailModal` and to compute available totals when a floor has partially-sold units.
- **Card-level summary, including a sold floor 33:** the `floorsData` array hard-coded at the top of `src/components/AvailableFloors.tsx`. The card list iterates this array and looks up matching detail rows from `floorsDetailData`.

When changing prices, sqm, or availability, update both. Pricing today: floors 21/22/24 at 21,000 NIS/sqm (1,550 sqm gross); floor 35 at 23,500; floor 37 at 24,000 (1,700 sqm gross). `docs/context.md` has the canonical tables.

### Styling
- Tailwind v4 via `@tailwindcss/postcss` (no `tailwind.config`). The theme — including custom colors `navy`, `navy-deep`, `navy-light`, `gold`, `gold-light`, `gold-dark`, `champagne`, `warm-white` — is declared in `src/app/globals.css` inside `@theme inline { … }`. Add new tokens there, not in a config file.
- Fonts (`next/font/google`): Heebo (Hebrew default), Inter, Noto Sans Arabic, Frank Ruhl Libre — wired in `src/app/layout.tsx`.
- Accessibility classes on `<html>` (`high-contrast`, `grayscale-mode`, `underline-links`, `stop-animations`) are toggled by `AccessibilityWidget`; their CSS lives at the bottom of `globals.css`.

### Forms
`ContactForm` posts directly to `https://api.web3forms.com/submit` with a hard-coded `access_key`. There is no backend. The "interested in floor N" CTA writes `selectedFloor` to `sessionStorage`, which the form reads on mount.

### SEO / metadata
- Per-locale `<title>`, `<meta>`, OpenGraph, and Twitter cards live in `src/app/[lang]/layout.tsx` (`metadataMap`).
- JSON-LD `LocalBusiness`, `Organization`, and one `RealEstateListing` per available floor is rendered server-side in `src/app/[lang]/page.tsx` (`StructuredData`). Update the `offersData` array there when floors change.
- `sitemap.ts` and `robots.ts` use `process.env.NEXT_PUBLIC_SITE_URL` (default fallback `https://za-cpa.com` — the layout fallback differs and points to `israel194.github.io/gate`; both should be set via env in any non-default deploy).

## Asset/PDF tooling

`scripts/pdf-to-png.mjs` rasterizes a PDF page to PNG using `pdfjs-dist` + `@napi-rs/canvas`:
```bash
node scripts/pdf-to-png.mjs <input.pdf> <output.png> [scale=3]
```
Used to generate the floor-plan images under `public/images/`. Floor plan PDFs themselves live in `public/plans/` and are linked from `floorUnitsData.ts` (`planPdf`) using paths that already include the `/gate` base path.
