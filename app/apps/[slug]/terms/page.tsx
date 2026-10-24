import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PolicySections, type PolicySection } from "@/components/ui/PolicySections";
import { Reveal } from "@/components/ui/Reveal";
import { getProductBySlug, getProducts } from "@/lib/products";
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
    title: `${product.name} — Terms of Use`,
    description: `Usage terms for the ${product.name} application from BatSoft: what you may do with the software, what is not covered by warranty, and how the terms change.`,
    alternates: {
      canonical: `/apps/${product.slug}/terms`,
    },
  };
}

/** In-text link style shared across the site's body copy. */
const linkClass =
  "text-foreground underline decoration-line underline-offset-4 transition-colors hover:decoration-brand";

function statusSentence(name: string, status: string): string {
  if (status === "in-development") {
    return `${name} is in active development and has not been published as a release yet.`;
  }
  if (status === "coming-soon") {
    return `${name} has not entered active development yet.`;
  }
  return `${name} has shipped — these terms describe the current released build.`;
}

function buildTerms(product: {
  name: string;
  slug: string;
  status: string;
}): PolicySection[] {
  return [
    {
      heading: "What these terms cover",
      paragraphs: [
        <>
          These terms apply to the {product.name} application and its
          installer. The BatSoft website is documentation for the pack; for
          how the site handles data, see the{" "}
          <Link href="/privacy" className={linkClass}>
            BatSoft privacy policy
          </Link>
          , and for {product.name}&apos;s data handling, the{" "}
          <Link
            href={`/apps/${product.slug}/privacy`}
            className={linkClass}
          >
            {product.name} privacy policy
          </Link>
          .
        </>,
        `${statusSentence(product.name, product.status)} You accept these terms when you install or use a released build. Until then they describe the rules the release will ship under — and a released build may ship with an updated version, which will be the one that governs.`,
      ],
    },
    {
      heading: "The licence",
      paragraphs: [
        "The licence that ships with the release — including pricing and whether it is free to use — has not been finalized yet. It will be stated plainly on the product page and in the installer before the first release.",
        "In either case, the licence grants use, not ownership: the software remains the property of BatSoft, and these terms keep applying for as long as the software is installed.",
      ],
    },
    {
      heading: "What you may do",
      paragraphs: [
        `You may install the application on devices you control, and use it for your own playback and day-to-day computing. You may link others to official release pages, and keep copies of installers you have downloaded for backup.`,
      ],
    },
    {
      heading: "What you may not do",
      paragraphs: [
        "You may not sell or sublicense the application, redistribute the installer from outside the official release pages, present the software as your own work, or use it in a way that breaks the law or somebody else's rights.",
        "Nothing here limits what the law does not allow you to give up — these restrictions apply only as far as the law goes.",
      ],
    },
    {
      heading: "Your media and your files",
      paragraphs: [
        "The application works on files that live on your device. You are responsible for what you open with it, including making sure you have the rights to the media you play.",
        "It operates locally and does not create backups on your behalf: keep copies of anything you care about. BatSoft is not responsible for your media library, drive failures or lost files.",
      ],
    },
    {
      heading: "No warranty",
      paragraphs: [
        "The application is provided as is, with no warranty of any kind — not for uninterrupted playback, not for fitness for any particular purpose, not for being free of bugs. To the maximum extent the law allows, implied warranties are excluded.",
        "Pre-release or experimental builds, if any are published, are especially to be treated as tests rather than products.",
      ],
    },
    {
      heading: "Our liability",
      paragraphs: [
        "To the maximum extent the law allows, BatSoft is not liable for indirect, incidental or consequential damage — lost data, lost time, lost profits. Where liability cannot be excluded, it is limited to the amount you actually paid for the software, if anything.",
      ],
    },
    {
      heading: "Changes and contact",
      paragraphs: [
        "These terms can be updated. Each version is published on this page, and the date under the title marks the version in effect; material changes are announced on the product page before the release that carries them.",
        "No public support channel exists yet. When the first release ships, an official contact address for questions about these terms will be published on the support page.",
      ],
    },
  ];
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const terms = buildTerms(product);

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
            Terms of use
          </li>
        </ol>
      </nav>

      <Reveal className="mt-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {product.name} terms of use
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
          The rules for installing and using the {product.name} application.
          They take effect when the software ships — nothing here invents
          details that do not exist yet. {product.name}&apos;s data handling is
          described in its{" "}
          <Link
            href={`/apps/${product.slug}/privacy`}
            className={linkClass}
          >
            privacy policy
          </Link>
          .
        </p>
        <p className="mt-5 font-mono text-[10px] tracking-[0.14em] text-muted/70 uppercase">
          Last updated {site.contentUpdated}
        </p>
      </Reveal>

      <div className="mt-10">
        <PolicySections sections={terms} />
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
