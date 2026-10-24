export const site = {
  name: "BatSoft",
  tagline: "Powerful Tools. One BatSoft.",
  altTagline: "Software Built to Stand Out.",
  description:
    "BatSoft is an independent software brand that builds and distributes its own Windows desktop applications. Explore the collection, read release notes, and download official installers.",
  /**
   * Public origin of the deployed site. Set NEXT_PUBLIC_SITE_URL in the
   * production environment (e.g. the final Vercel domain) so canonical URLs,
   * the sitemap and Open Graph metadata resolve to the real domain.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://batsoft.vercel.app",
  /**
   * Fixed values (safe for static prerendering — Next.js Cache Components
   * rejects `new Date()` during prerender). Bump when content changes.
   */
  copyrightYear: 2026,
  contentUpdated: "2026-10-24",
} as const;
