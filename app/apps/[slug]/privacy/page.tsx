import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PolicySections, type PolicySection } from "@/components/ui/PolicySections";
import { Reveal } from "@/components/ui/Reveal";
import { getProductBySlug, getProducts } from "@/lib/products";
import type { Product } from "@/lib/products/schema";
import { site } from "@/lib/site";

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
    title: `${product.name} — Privacy Policy`,
    description: `How the ${product.name} application handles data: no accounts, no telemetry and no uploads are part of the plan. Published by BatSoft ahead of the first release.`,
    alternates: {
      canonical: `/apps/${product.slug}/privacy`,
    },
  };
}

/** In-text link style shared with the rest of the site (see props pages). */
const linkClass =
  "text-foreground underline decoration-line underline-offset-4 transition-colors hover:decoration-brand";

function buildSections(product: Product): PolicySection[] {
  const statusSentence =
    product.status === "in-development"
      ? `${product.name} is in active development and has not been published as a release yet.`
      : product.status === "coming-soon"
        ? `${product.name} has not entered active development yet.`
        : `${product.name} has shipped — this page describes the current released build.`;

  const sections: PolicySection[] = [
    {
      heading: "What this policy covers",
      paragraphs: [
        <>
          This policy covers the {product.name} application only. The BatSoft
          website — where the product is described and linked to its official
          release pages — is covered by the separate{" "}
          <Link href="/privacy" className={linkClass}>
            BatSoft privacy policy
          </Link>
          .
        </>,
        `${statusSentence} Sentences here that describe planned behaviour state the project's direction, in the same way the planned capabilities on the product page do — not a shipped feature set.`,
      ],
    },
    {
      heading: "The short version",
      paragraphs: [
        `No accounts, no sign-in, no telemetry, no analytics and no advertising. ${product.name} is being built to work on files that already live on your device, and nothing about what you do with it is planned to leave it.`,
      ],
    },
  ];

  if (product.privacyFocus.length > 0) {
    sections.push({
      heading: "Data-handling direction",
      paragraphs: [...product.privacyFocus],
    });
  }

  sections.push(
    {
      heading: "Downloads and releases",
      paragraphs: [
        "BatSoft applications are published only through official release pages linked from the product page. The website itself does not count or track download clicks; release assets are served by GitHub (GitHub AB, part of Microsoft Corporation), which handles data on its own service under its own policy.",
        "When a SHA-256 checksum is published for a release, you can use it to verify the installer you downloaded.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        `Updates are published on this page, with the date under the title marking the version in effect. When ${product.name} ships, this page is reviewed against the actual build before the release is announced.`,
      ],
    },
  );

  return sections;
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const sections = buildSections(product);

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
            Privacy policy
          </li>
        </ol>
      </nav>

      <Reveal className="mt-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {product.name} privacy policy
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
          How the {product.name} application handles data. In short: it never
          needs an account and does not report what you do. The BatSoft website
          is covered by a separate{" "}
          <Link href="/privacy" className={linkClass}>
            BatSoft privacy policy
          </Link>
          .
        </p>
        <p className="mt-5 font-mono text-[10px] tracking-[0.14em] text-muted/70 uppercase">
          Last updated {site.contentUpdated}
        </p>
      </Reveal>

      <div className="mt-10">
        <PolicySections sections={sections} />
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
