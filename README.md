<div align="center">

# BatPack

**Official website and release hub for BatSoft — independent Windows desktop
software, built and shipped as one pack.**

A polished, zero-backend showcase: validated product catalog, honest release
states, per-application privacy policies, and a two-theme design that shares
one token system.

[![Live site](https://img.shields.io/badge/Live-batsoft.vercel.app-FFD51B?logoColor=121316)](https://batsoft.vercel.app)
[![Status](https://img.shields.io/badge/Status-in%20development-FFD51B)](#project-status)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-121316?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.3-121316?logo=react&logoColor=61DAFB)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-121316?logo=typescript&logoColor=3178C6)](tsconfig.json)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-121316?logo=tailwindcss&logoColor=38BDF8)](app/globals.css)
[![Catalog](https://img.shields.io/badge/Catalog-Zod%20validated-121316?logo=zod&logoColor=3E67B1)](lib/products/schema.ts)

</div>

> **About the repo name.** The repository was previously named
> `BatPlayer_Website` (the pack started with its first app); it now lives as
> **`BatSoft`** and hosts the entire website and all three pack members.

---

## The pack

| №  | Application  | Category   | Status          | Product page          | Legal (privacy · terms)                |
| --- | ------------ | ---------- | --------------- | --------------------- | -------------------------------------- |
| 01  | BatPlayer    | Media      | In development  | [`/apps/batplayer`](/apps/batplayer)    | [`privacy`](/apps/batplayer/privacy) · [`terms`](/apps/batplayer/terms)      |
| 02  | BatTools     | Utilities  | Coming soon     | [`/apps/battools`](/apps/battools)      | [`privacy`](/apps/battools/privacy) · [`terms`](/apps/battools/terms)        |
| 03  | BatConvert   | Conversion | Coming soon     | [`/apps/batconvert`](/apps/batconvert)  | [`privacy`](/apps/batconvert/privacy) · [`terms`](/apps/batconvert/terms)    |

The website itself carries its own site-level policy at
[`/privacy`](/privacy) — application-level data handling is documented
separately, next to each product.

## What the site does

- **Validated catalog.** Every product is defined once in
  [`data/products.ts`](data/products.ts) and parsed through the Zod schema in
  [`lib/products/schema.ts`](lib/products/schema.ts) at import time. A bad
  entry (unsafe URL, malformed checksum, misspelled status) fails the build
  instead of rendering incorrect download UI.
- **Honest release states.** Nothing is invented: version, date, size,
  checksum and download links render as *Not yet available* until a verified
  GitHub release backs them. Download buttons are disabled — never fabricated.
- **Full product pages.** Overview, planned capabilities, release metadata,
  changelog preview and FAQ per application, plus a chronological
  `/apps/[slug]/changelog` route.
- **A real catalog experience.** The `/apps` grid is searchable, filterable
  and sortable; category filters are URL-driven (`/apps?category=Media`) so
  links across the site deep-link into a pre-filtered view.
- **One token system, two themes.** Dark is the default; the light palette is
  a deliberate gray/black/yellow remap of the same tokens — no per-component
  theme branches. `data-theme` on `<html>` drives everything; the choice
  persists in `localStorage` (`batsoft-theme`) and is applied before first
  paint by a tiny boot script.
- **An animated, not snapped, switch.** On Chromium and Safari 18+ the new
  theme is revealed by a circle expanding from the toggle point (View
  Transitions API); elsewhere a 320 ms in-place cross-fade.
  `prefers-reduced-motion` disables it entirely.
- **Brand-consistent design language.** Measured palette, zero corner radius,
  Geist + Geist Mono, hairline borders, uppercase mono micro-labels, numbered
  sections — yellow `#FFD51B` as the single brand accent, reserved for fills;
  on light palettes the emblem remaps to ink via a theme-scoped filter.
- **Privacy as structure, not an afterthought.** A shared renderer builds
  every legal page — privacy policies and terms of use — with identical
  structure; per-app copy lives in the catalog (`privacyFocus`) like all
  other product content.
- **SEO shipped.** `sitemap.xml`, `robots.txt` and a generated Open Graph
  image (which inlines the brand crest) — all App Router metadata routes.

## Quick start

Requires Node 20+.

```bash
git clone https://github.com/DgharMohamed/BatSoft.git
cd BatPlayer_Website
npm install
npm run dev        # http://localhost:3000
```

| Script          | Purpose                                   |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Local dev server (Turbopack)              |
| `npm run build` | Production build, statically prerendered  |
| `npm start`     | Serve the production build                |
| `npm run lint`  | ESLint                                    |

Type checking: `npx tsc --noEmit`. Run it with `build` and `lint` before
pushing — those three are the project's CI.

> **Dev tip.** If the theme transition degrades to a plain cross-fade in dev,
> hard-reload (Ctrl+Shift+R). Turbopack stylesheet HMR can keep an old
> stylesheet alive in an already-open tab, silently dropping the
> `::view-transition-*` rules.

## Repository map

```text
BatPack/
├─ app/                      # App Router — pages, layouts, metadata routes
│  ├─ page.tsx               # / — hero, featured product, collection
│  ├─ layout.tsx             # Navbar/footer chrome, fonts, theme boot script
│  ├─ globals.css            # Token system: two palettes → Tailwind utilities
│  ├─ privacy/               # /privacy — BatSoft site policy
│  ├─ apps/
│  │  ├─ page.tsx            # /apps — searchable, filterable catalog
│  │  └─ [slug]/
│  │     ├─ page.tsx         # /apps/[slug] — product page
│  │     ├─ changelog/       # /apps/[slug]/changelog — release history
│  │     ├─ privacy/         # /apps/[slug]/privacy — application policy
│  │     └─ terms/           # /apps/[slug]/terms — application terms of use
│  ├─ about/ · support/      # Brand story · troubleshooting guides
│  └─ sitemap.ts · robots.ts · opengraph-image.tsx · not-found.tsx
├─ components/
│  ├─ layout/                # Navbar, Footer, ThemeToggle
│  ├─ home/                  # Hero, featured product, collection, mockups
│  ├─ products/              # Cards, grid, catalog, changelog, downloads
│  └─ ui/                    # Container, PageHeader, Reveal, Logo, Policy…
├─ data/
│  └─ products.ts            # THE catalog: copy, features, FAQ, release data
├─ lib/
│  ├─ products/              # Zod schema + typed repository (single source)
│  └─ site.ts                # Brand config, canonical URL, fixed dates
└─ public/                   # Official brand assets (crest, product icons)
```

## Managing the catalog

All product content lives in [`data/products.ts`](data/products.ts) — edit it,
never the components. UI reads products only through the repository in
[`lib/products/index.ts`](lib/products/index.ts).

When a product gets its first real release, add verified release fields to its
entry; the UI activates the download button automatically:

```ts
{
  // ... existing fields ...
  status: "available",
  latestVersion: "1.0.0",                      // from the actual release
  releaseDate: "YYYY-MM-DD",
  releasePageUrl: "https://github.com/OWNER/REPO/releases/tag/v1.0.0",
  downloadUrl: "https://github.com/OWNER/REPO/releases/download/v1.0.0/BatPlayer-Setup-1.0.0.exe",
  installerFilename: "BatPlayer-Setup-1.0.0.exe",
  fileSize: "12.4 MB",                         // from the actual file
  architecture: "x64",
  sha256: "<64-char hex digest of the installer>",
  platforms: ["Windows 10", "Windows 11"],
  changelog: [ /* entries with version + date */ ],
}
```

Rules enforced by the schema and download components:

- Release URLs must be HTTPS — anything else fails the build.
- Direct **Download Installer** only with a verified `downloadUrl`; otherwise
  it falls back to **Open Release Page** (`releasePageUrl`), then to an
  explicit disabled state.
- Keep brand assets PNG: Next's image optimizer flattens the transparency of
  WebP sources (`public/batsoft-logo.png`, `public/batplayer-icon.png`).

## Deployment

Hosted on Vercel, statically prerendered:

1. Push the repository to GitHub (already the case — this repo).
2. In Vercel: **Add New → Project** → import it (framework auto-detected).
3. Set `NEXT_PUBLIC_SITE_URL` to the production URL
   (`https://batsoft.vercel.app` or the custom domain) — it drives canonical
   URLs, `robots.txt` and `sitemap.xml`.
4. Deploy. Update the variable if the domain changes and redeploy.

## Conventions

- Bump `contentUpdated` in [`lib/site.ts`](lib/site.ts) whenever content
  changes — it feeds `sitemap.xml` (Next Cache Components forbid `new Date()`
  during prerender, so fixed dates are the convention).
- Application copy (features, FAQ, privacy direction) lives in the catalog
  data; components render, they don't decide.
- Unreleased claims are always labeled as *direction*, never shipped fact.

## Project status

The site is complete and deployed; no pack application has shipped yet, and
every release field is honestly empty until a build is verified.

- [x] Site: catalog, product pages, changelogs, theme system, SEO
- [x] Privacy: site-level `/privacy` + per-application policies
- [ ] BatPlayer first release — fill verified release fields (see above)
- [ ] BatTools / BatConvert enter development, get icons and status boosts
- [ ] Public support channel / contact address (published when app #1 ships)

---

© 2026 BatSoft — all rights reserved. Independent software, not affiliated
with or endorsed by Microsoft. Windows is a trademark of Microsoft
Corporation. The BatSoft name, crest and copy are brand assets of the
project.
