import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  alternates: {
    canonical: "/",
  },
};

/**
 * Applies the stored theme before the first paint and writes the matching
 * browser-chrome colour. Kept inline (and tiny) so a returning light-theme
 * visitor never flashes the dark palette. "dark" is the designed default; the
 * navbar toggle is the only thing that changes it.
 */
const themeBootScript = `(function(){var theme="dark";try{if(localStorage.getItem("batsoft-theme")==="light"){theme="light";}}catch(e){}document.documentElement.dataset.theme=theme;var meta=document.querySelector('meta[name="theme-color"]');if(!meta){meta=document.createElement("meta");meta.setAttribute("name","theme-color");document.head.appendChild(meta);}meta.setAttribute("content",theme==="light"?"#e5e4df":"#121316");})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-brand-contrast"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1 pt-14 md:pt-[88px]">
          {children}
        </main>
        <Footer />
        {/* Speed Insights reports Core Web Vitals from production Vercel
            deployments only; locally it is inert. Disclosed in /privacy. */}
        <SpeedInsights />
        {/* Vercel Web Analytics (cookie-free): aggregated views measurement —
            also inert off-production. Disclosed in /privacy. */}
        <Analytics />
      </body>
    </html>
  );
}
