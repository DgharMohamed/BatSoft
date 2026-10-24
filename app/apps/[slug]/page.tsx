import { ArrowRight, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppWindowMockup } from "@/components/home/AppWindowMockup";
import { ChangelogList } from "@/components/products/ChangelogList";
import { DownloadButton } from "@/components/products/DownloadButton";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ReleaseMetadata } from "@/components/products/ReleaseMetadata";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  getProductBySlug,
  getProducts,
  getRelatedProducts,
  productGlyph,
} from "@/lib/products";
import { History, PackageSearch } from "lucide-react";

/**
 * The whole page is derived from the route's `slug`, so it cannot render an
 * instant shell without URL data. Opting out of instant-navigation validation
 * makes this an explicit blocking route instead of an error.
 * https://nextjs.org/docs/messages/instant-shell-url-data
 */
export const instant = false;

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = product.seoTitle ?? `${product.name} — ${product.shortDescription}`;
  const description = product.seoDescription ?? product.shortDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `/apps/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/apps/${product.slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug);
  const released = product.status === "available";
  const featureTitle = released ? "Features" : "Planned capabilities";
  const hasChangelog = product.changelog.length > 0;

  return (
    <>
      {/* Product hero */}
      <section className="border-b border-line">
        <Container className="py-12 sm:py-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              <li>
                <Link href="/apps" className="transition-colors hover:text-foreground">
                  Applications
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="text-foreground">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <Reveal>
              <div className="flex items-center gap-4">
                <ProductIcon
                  name={product.name}
                  glyph={productGlyph(product)}
                  src={product.icon}
                  size="lg"
                />
                <div>
                  <h1 className="font-mono text-3xl font-semibold tracking-[0.04em] text-accent uppercase sm:text-4xl">
                    {product.name}
                  </h1>
                  <StatusBadge status={product.status} className="mt-2" />
                </div>
              </div>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                {product.shortDescription}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <DownloadButton product={product} />
                <Link href={`/apps/${product.slug}/changelog`} className="btn btn-secondary">
                  Release History
                </Link>
                <Link href={`/apps/${product.slug}/privacy`} className="btn btn-secondary">
                  Privacy Policy
                </Link>
                <Link href={`/apps/${product.slug}/terms`} className="btn btn-secondary">
                  Terms of Use
                </Link>
              </div>

              <p className="mt-6 text-sm text-muted">
                Category:{" "}
                <Link
                  href={`/apps?category=${encodeURIComponent(product.category)}`}
                  className="text-foreground underline decoration-line underline-offset-4 transition-colors hover:decoration-brand"
                >
                  {product.category}
                </Link>
                {product.platforms.length > 0
                  ? ` · Supports ${product.platforms.join(", ")}`
                  : " · Supported Windows versions: to be announced"}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              {product.status === "in-development" ? (
                <div>
                  <AppWindowMockup />
                  <p className="mt-3 text-xs text-muted/80">
                    Concept preview — not a screenshot of the application.
                  </p>
                </div>
              ) : (
                <div className="flex min-h-64 flex-col items-center justify-center border border-dashed border-line bg-surface px-6 py-12 text-center">
                  <PackageSearch aria-hidden="true" className="size-8 text-muted" />
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
                    Visual material for {product.name} will be published as the
                    project takes shape.
                  </p>
                </div>
              )}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Overview + features */}
      <section className="border-b border-line">
        <Container className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
            <div className="mt-5 space-y-4">
              {product.description.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {product.features.length > 0 ? (
            <Reveal delay={0.1}>
              <h2 className="text-2xl font-semibold tracking-tight">
                {featureTitle}
              </h2>
              <ul className="mt-5 space-y-4">
                {product.features.map((feature) => (
                  <li
                    key={feature.title}
                    className="border border-line bg-surface p-4"
                  >
                    <p className="text-sm font-medium">{feature.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {feature.description}
                    </p>
                  </li>
                ))}
              </ul>
              {!released ? (
                <p className="mt-4 text-xs leading-relaxed text-muted/80">
                  {product.name} is not released yet — these describe the
                  project&apos;s direction, not a shipped feature set.
                </p>
              ) : null}
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* Release information */}
      <section className="border-b border-line bg-surface/30">
        <Container className="py-14 sm:py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight">
              Release information
            </h2>
            {!released ? (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {product.name} has not been released yet. Fields marked{" "}
                <span className="italic">Not yet available</span> will be filled
                in with verified information as soon as an official build is
                published.
              </p>
            ) : null}
            <div className="mt-6">
              <ReleaseMetadata product={product} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Changelog preview */}
      <section className="border-b border-line">
        <Container className="py-14 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight">
                Release history
              </h2>
              <p className="mt-2 text-sm text-muted">
                Chronological release notes for {product.name}.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <Link
                href={`/apps/${product.slug}/changelog`}
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
              >
                View release history
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </Link>
            </Reveal>
          </div>

          <div className="mt-8">
            {hasChangelog ? (
              <ChangelogList entries={product.changelog.slice(0, 3)} />
            ) : (
              <EmptyState
                icon={History}
                title="No releases yet"
                description={`No version of ${product.name} has been published so far. When the first release ships, its notes will appear here.`}
              />
            )}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      {product.faq.length > 0 ? (
        <section className="border-b border-line">
          <Container className="py-14 sm:py-16">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight">
                Frequently asked questions
              </h2>
              <div className="mt-6 max-w-3xl">
                <FAQAccordion items={product.faq} />
              </div>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* Related applications */}
      {related.length > 0 ? (
        <Container className="py-14 sm:py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight">
              More from BatSoft
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <ProductGrid products={related} />
          </Reveal>
        </Container>
      ) : null}
    </>
  );
}
