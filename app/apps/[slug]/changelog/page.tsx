import { ArrowLeft, ChevronRight, History } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChangelogList } from "@/components/products/ChangelogList";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { getProductBySlug, getProducts } from "@/lib/products";

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

  return {
    title: `${product.name} — Release History`,
    description: `Chronological release notes and version history for ${product.name}, a BatSoft application for Windows.`,
    alternates: {
      canonical: `/apps/${product.slug}/changelog`,
    },
  };
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
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
          <li>
            <Link
              href={`/apps/${product.slug}`}
              className="transition-colors hover:text-foreground"
            >
              {product.name}
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-3.5" />
          </li>
          <li aria-current="page" className="text-foreground">
            Release History
          </li>
        </ol>
      </nav>

      <Reveal className="mt-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {product.name} release history
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
          Every published version of {product.name}, newest first. Only
          information from official releases appears here.
        </p>
      </Reveal>

      <div className="mt-10">
        {product.changelog.length > 0 ? (
          <ChangelogList entries={product.changelog} />
        ) : (
          <EmptyState
            icon={History}
            title="No releases yet"
            description={`${product.name} has not been published yet. Release notes will appear here as soon as the first official version ships.`}
          />
        )}
      </div>

      <div className="mt-10">
        <Link
          href={`/apps/${product.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to {product.name}
        </Link>
      </div>
    </Container>
  );
}
