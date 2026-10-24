# BatSoft — Official Website

The official website for **BatSoft**, an independent Windows desktop software brand.
Built as a software showcase and download site: product catalog, product pages,
release history, support, and honest download states driven by a validated local
product catalog.

**Stack:** Next.js (App Router) · TypeScript (strict) · Tailwind CSS v4 · Lucide React · Zod

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other commands:

```bash
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript check
npm run build      # Production build
npm start          # Serve the production build
```

If the theme transition degrades to a plain cross-fade in dev, hard-reload
(Ctrl/Cmd+Shift+R). Turbopack pushes stylesheet updates over HMR, and a tab
that was already open when `app/globals.css` changed keeps the old stylesheet —
which silently drops the `::view-transition-*` rules and leaves the browser's
default cross-fade instead of the circle reveal.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New → Project** and import the repository (framework is auto-detected).
3. Set the environment variable `NEXT_PUBLIC_SITE_URL` to the production URL
   (e.g. `https://batsoft.vercel.app` or the custom domain). It drives canonical
   URLs, `robots.txt`, and `sitemap.xml`.
4. Deploy. Update `NEXT_PUBLIC_SITE_URL` if the domain changes and redeploy.

## Site structure

| Route | Purpose |
| --- | --- |
| `/` | Marketing home: hero, featured product, catalog overview, brand values |
| `/apps` | Searchable, filterable, sortable application catalog |
| `/apps/[slug]` | Product page: features, release metadata, changelog preview, FAQ |
| `/apps/[slug]/changelog` | Release history |
| `/about` | About the BatSoft brand |
| `/support` | Troubleshooting guides and general FAQ |

`robots.txt`, `sitemap.xml`, Open Graph image, and a custom 404 page are generated
by the App Router.

## Managing the product catalog

All product data lives in [`data/products.ts`](data/products.ts) and is validated
at build time against the Zod schema in [`lib/products/schema.ts`](lib/products/schema.ts).
UI components read products only through the repository in [`lib/products/index.ts`](lib/products/index.ts).

When a product gets its first real release, add the verified release fields to its
entry — the UI activates the download button automatically:

```ts
{
  // ... existing fields ...
  status: "available",
  latestVersion: "1.0.0",                    // from the actual release
  releaseDate: "YYYY-MM-DD",
  releasePageUrl: "https://github.com/OWNER/REPO/releases/tag/v1.0.0",
  downloadUrl: "https://github.com/OWNER/REPO/releases/download/v1.0.0/BatPlayer-Setup-1.0.0.exe",
  installerFilename: "BatPlayer-Setup-1.0.0.exe",
  fileSize: "12.4 MB",                       // from the actual file
  architecture: "x64",
  sha256: "<64-char hex digest of the installer>",
  platforms: ["Windows 10", "Windows 11"],
  changelog: [ /* entries with version + date */ ],
}
```

Rules enforced by the schema and the download component:

- Release URLs must be HTTPS; anything else fails the build.
- A direct **Download Installer** button appears only when `downloadUrl` is set
  and valid; otherwise the button falls back to **Open Release Page**
  (`releasePageUrl`), and if neither exists it renders an explicit disabled state.
- Missing release information renders as “Not yet available” — never invented.

## Replacing the temporary brand assets

~~The official BatSoft logo was not present in the project at build time~~
**Resolved 2026-10-21**: the official assets are now integrated —

- `public/batsoft-logo.png` — BatSoft crest, the golden bat shield emblem
  (transparent PNG, cropped to the artwork with balanced padding), used in the
  navbar, footer and hero via
  [`components/ui/Logo.tsx`](components/ui/Logo.tsx). It is also inlined into
  the generated Open Graph image
  ([`app/opengraph-image.tsx`](app/opengraph-image.tsx)) and resized to
  `app/icon.png` (the favicon). Keep it a PNG: Next's image optimizer drops the
  transparency of WebP sources.
- `public/batplayer-icon.png` — BatPlayer mark (golden bat-and-play emblem,
  transparent PNG on a square canvas), wired through the product data `icon`
  field (`data/products.ts`) and rendered by
  [`components/ui/ProductIcon.tsx`](components/ui/ProductIcon.tsx) on the
  catalog cards, featured panel and product pages, plus the title bar of the
  BatPlayer mockup. The favicon (`app/icon.png`) is the BatSoft crest, not the
  product mark.

When BatTools / BatConvert get their own icons, drop the files into `public/`
and set the `icon` field on their product entries — everything else updates
automatically. Until then those products show a neutral letter-glyph tile.

## Design decisions worth knowing

- **Visual direction.** Palette measured from getartcraft.com via computed
  styles: gray page base (`#121316`) with **elevated lighter panels**
  (`#17181c` / `#1d1e24` — user rejected darker-than-page/near-black card
  surfaces), warm off-white text (`#F2F1EE`) with opacity-based muted tiers,
  semi-transparent off-white borders (`rgba(242,241,238,0.14)`), and **zero
  corner radius** throughout (only status dots are round). Geist Mono uppercase
  micro-labels, numbered sections (`01 / THE COLLECTION`…), hairline-bordered
  cards and chips, and a fixed right-hand section index on the homepage.
  BatSoft yellow (`#FFD51B`) is the single accent. The reference additionally
  uses Archivo display headings and Instrument Serif italic accents; this site
  stays on Geist/Geist Mono.
- **Two themes, one token system.** Dark is the default. The navbar toggle
  (and a tiny inline boot script in `app/layout.tsx`, so there is no flash)
  sets `data-theme` on `<html>`; [`app/globals.css`](app/globals.css) maps the
  raw palette to Tailwind utilities through `@theme inline`, so components
  never branch on theme. The light palette is deliberately **gray, black and
  yellow** rather than white: warm gray page (`#E5E4DF`), lighter gray panels
  (`#EEEDE9` / `#F5F4F1`), near-black text (`#121316`), the same BatSoft yellow
  (`#FFD51B`) for fills, and a deep-gold accent (`#6B5200`) for yellow text and
  icons so the brand colour stays legible on gray. The choice persists in
  `localStorage` under `batsoft-theme`.
- **The theme switch is animated, not snapped.** Where the View Transitions API
  exists (Chromium, Safari 18+) the new theme is revealed through a circle
  that expands from the click point — the same “circle reveal” as the
  `transition-kit` shadcn registry, reimplemented natively so the project keeps
  its own `data-theme` token system instead of adopting that registry's
  provider. The geometry is written to the root element as `--theme-origin-x`,
  `--theme-origin-y` and `--theme-radius`; the animation itself lives in
  [`app/globals.css`](app/globals.css) and is tuned with `--theme-duration`
  (1400ms) and `--theme-easing` (`ease-in-out`). Keyboard activation starts the
  circle at the button's centre, and browsers without the API fall back to a
  320ms in-place colour cross-fade. `prefers-reduced-motion: reduce` skips the
  animation entirely.
- **Hero is intentionally minimal** (user request): centered BatSoft crest,
  headline, one paragraph, two buttons, one mono meta line — no icon wall,
  spec chips or decorative backgrounds.
- **CSS-driven animations.** Entrance reveals are pure CSS
  (`.reveal` in `app/globals.css`) rather than a JS animation library: content is
  present in the server HTML and stays visible if JavaScript or
  IntersectionObserver fails (observed in embedded webviews), and `prefers-reduced-motion`
  disables the animation without hiding content. framer-motion was removed from
  the dependency list for this reason — re-add it if richer interactive motion is
  added later. The homepage scroll-spy index deliberately uses a scroll
  listener, not IntersectionObserver.
- **Category filter is URL-driven** (`/apps?category=Media`), so category links
  across the site deep-link into a pre-filtered catalog.
- **Honest product states.** Unreleased products (currently all of them) show
  disabled downloads, “Not yet available” metadata, and “concept preview”
  captions on mockups instead of fabricated release data.
- `lib/site.ts` holds fixed date values for static prerendering (Next.js Cache
  Components reject `new Date()` during prerender); bump `contentUpdated` when
  content changes so the sitemap stays accurate.
