import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "About",
  description:
    "BatSoft is an independent software brand that designs, builds and distributes its own Windows desktop applications. Learn what BatSoft stands for.",
  alternates: {
    canonical: "/about",
  },
};

const principles = [
  {
    number: "01",
    title: "Independent by choice",
    body: "BatSoft is not a studio, a publisher or a platform. It is an independent software brand: the applications here are conceived, built and maintained in-house, under one set of standards.",
  },
  {
    number: "02",
    title: "Original software",
    body: "Every application in the collection is an original work — designed for real Windows workflows rather than assembled from templates. If a tool does not clear that bar, it does not ship.",
  },
  {
    number: "03",
    title: "Transparency as a feature",
    body: "Product pages distinguish clearly between what is released and what is still being built. Downloads appear only when official, verified installers exist — never before.",
  },
];

export default function AboutPage() {
  const products = getProducts();

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Software built to stand out."
        description="BatSoft is an independent software brand that designs, builds and distributes its own Windows desktop applications — a small collection with a high bar."
      />

      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight">
                What BatSoft is
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-muted">
                <p>
                  BatSoft exists around a simple idea: everyday computing gets
                  better through small, focused tools that respect your time
                  and your machine. The collection grows slowly and
                  deliberately — each application is polished before the next
                  one begins.
                </p>
                <p>
                  The first project, BatPlayer, is a media player for Windows
                  and is currently in active development. Further applications
                  are planned and will be announced on this site as they reach
                  the point where they can be described honestly.
                </p>
                <p>
                  This website is the official home of the collection: product
                  pages, verified release downloads, release notes and support
                  information, all in one place.
                </p>
              </div>
            </Reveal>

            <div className="mt-14">
              {principles.map((principle, index) => (
                <Reveal key={principle.number} delay={index * 0.06}>
                  <div className="grid gap-3 border-t border-line py-8 last:border-b sm:grid-cols-[64px_220px_1fr] sm:items-baseline sm:gap-6">
                    <span
                      aria-hidden="true"
                      className="font-mono text-sm text-accent"
                    >
                      {principle.number}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {principle.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {principle.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <aside className="border border-line bg-surface p-6 lg:sticky lg:top-24">
              <h2 className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                The collection
              </h2>
              <ul className="mt-5 space-y-4">
                {products.map((product) => (
                  <li key={product.slug} className="border-b border-line pb-4 last:border-b-0 last:pb-0">
                    <Link
                      href={`/apps/${product.slug}`}
                      className="group flex items-center justify-between gap-3"
                    >
                      <span className="text-sm font-medium transition-colors group-hover:text-accent">
                        {product.name}
                      </span>
                      <StatusBadge status={product.status} />
                    </Link>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      {product.category} ·{" "}
                      <Link
                        href={`/apps/${product.slug}`}
                        className="underline decoration-line underline-offset-2 hover:text-foreground"
                      >
                        View details
                      </Link>
                    </p>
                  </li>
                ))}
              </ul>
              <Link href="/apps" className="btn btn-secondary mt-6 w-full">
                Browse the catalog
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </aside>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
