import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PolicySections, type PolicySection } from "@/components/ui/PolicySections";
import { getProducts, statusLabels } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy for the BatSoft website: no accounts, no analytics, no tracking cookies and no advertising. Each BatSoft application carries its own separate privacy policy.",
  alternates: {
    canonical: "/privacy",
  },
};

/**
 * Site-level policy. It covers the website itself only — each application in
 * the pack gets its own policy under its product page, listed in the last
 * sections. Content must stay honest to what this static site can do: it has
 * no accounts, no forms, no API routes and no third-party scripts.
 */
export default function PrivacyPage() {
  const apps = getProducts();

  const sections: PolicySection[] = [
    {
      heading: "What this policy covers",
      paragraphs: [
        <>
          This policy describes the data practices of the BatSoft website,
          including what the site stores in your browser and how released
          software is distributed.{" "}
          <Link href="/apps" className="text-foreground underline decoration-line underline-offset-4 transition-colors hover:decoration-brand">
            Each BatSoft application
          </Link>{" "}
          carries its own separate privacy policy, linked in the list below —
          application-level data handling is not covered by this page.
        </>,
      ],
    },
    {
      heading: "The short version",
      paragraphs: [
        "This website has no accounts, no forms, no advertising, no third-party analytics and no tracking cookies. BatSoft does not collect, share or sell personal information through this site, and nothing here asks you to identify yourself.",
      ],
    },
    {
      heading: "What the site stores in your browser",
      paragraphs: [
        "The only data this site keeps in your browser is a display preference: your choice of light or dark theme. It is stored in your browser's local storage alone, it is never transmitted to BatSoft or to any other party, and it is not used to recognise you or to track your visits.",
        "The site sets no cookies of any kind. Clearing your browser's site data removes the theme preference, and the site simply returns to its default theme.",
      ],
    },
    {
      heading: "What runs alongside the site",
      paragraphs: [
        "The site loads no third-party analytics, advertising or social widgets, and serves all of its assets — including fonts — from its own domain. Nothing here builds a profile of you or your reading.",
      ],
    },
    {
      heading: "External links and downloads",
      paragraphs: [
        "BatSoft applications are published only through official release pages linked from this site. Following a download link takes you to one of those release pages; the BatSoft website itself never collects download counts, click statistics or device information.",
        "Release assets are served by GitHub (GitHub AB, part of Microsoft Corporation), which handles data on its own service under its own privacy policy. Whenever a SHA-256 checksum is published for a release, you can use it to verify the integrity of the file you downloaded.",
      ],
    },
    {
      heading: "BatSoft application policies",
      body: (
        <>
          <p className="text-sm leading-relaxed text-muted">
            Application-level privacy is documented separately, next to the
            product it describes:
          </p>
          <ul className="mt-4 border border-line">
            {apps.map((app) => (
              <li key={app.slug} className="border-b border-line last:border-b-0">
                <Link
                  href={`/apps/${app.slug}/privacy`}
                  className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-surface-2"
                >
                  <span className="text-sm font-medium">{app.name}</span>
                  <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                    {statusLabels[app.status]}
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "Any update to this policy is published on this page; the last-updated date above the sections marks the version in effect. When an application ships and begins to handle data, its own policy is published under its product page at the same time.",
        "No public support channel has been set up yet. When the first BatSoft application ships, an official contact address will be published on the support page.",
      ],
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="BatSoft privacy policy"
        description="This policy covers the BatSoft website itself — what it stores, what it never collects, and where each application carries its own policy."
      />

      <Container className="py-14 sm:py-16">
        <p className="font-mono text-[10px] tracking-[0.14em] text-muted/70 uppercase">
          Last updated {site.contentUpdated}
        </p>

        <div className="mt-10">
          <PolicySections sections={sections} />
        </div>
      </Container>
    </>
  );
}
