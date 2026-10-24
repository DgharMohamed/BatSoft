import { Download, LifeBuoy, Monitor, Wrench } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/ui/Reveal";
import type { FaqItem } from "@/lib/products/schema";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support for BatSoft applications: download and installation troubleshooting, Windows compatibility guidance, and answers to common questions.",
  alternates: {
    canonical: "/support",
  },
};

const guides = [
  {
    icon: Download,
    title: "Download troubleshooting",
    steps: [
      "Use the download button on the product's page — it links only to official release assets that have been configured and verified.",
      "If a download does not start, open the official release page from the same product page and download the installer there.",
      "When a SHA-256 checksum is published for a release, you can verify your download in PowerShell with: Get-FileHash .\\installer-file.exe -Algorithm SHA256 — then compare the output with the value on the release page.",
      "If a product's download button is disabled, that product has no published release yet. No download exists to troubleshoot until it is enabled.",
    ],
  },
  {
    icon: Wrench,
    title: "Installation troubleshooting",
    steps: [
      "Run the installer from a Windows account that has permission to install software.",
      "If Windows SmartScreen appears when you run an installer, review the publisher details, and only continue if you obtained the file from the official BatSoft release page.",
      "If an installer reports a missing component, install the latest Windows updates and run the installer again.",
      "If installation repeatedly fails, note the exact error message — it will be needed when contacting support once channels are available.",
    ],
  },
  {
    icon: Monitor,
    title: "Windows compatibility",
    steps: [
      "Each released product lists its supported Windows versions and architecture on its product page.",
      "Products marked In Development or Coming Soon do not have final system requirements yet — no compatibility is promised before release testing is complete.",
      "Keep Windows up to date; installers are built and tested against supported, updated versions of Windows.",
    ],
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Where can I download BatSoft applications?",
    answer:
      "From each product's page on this site. A direct download button appears only once an official installer has been published and verified; until then, the product page shows the project's current status instead of a link.",
  },
  {
    question: "Are the installers safe to run?",
    answer:
      "This website is the official distribution point for BatSoft software. Download buttons link only to configured, verified release assets, and any published SHA-256 checksum comes from the actual release file. Always download BatSoft software from this site or the official release pages linked from it.",
  },
  {
    question: "Which Windows versions are supported?",
    answer:
      "Released products publish their supported Windows versions and architecture on their product pages. Products that have not shipped yet have no final requirements, and no compatibility is claimed for them.",
  },
  {
    question: "Is BatSoft affiliated with Microsoft?",
    answer:
      "No. BatSoft is an independent software brand. Windows is a registered trademark of Microsoft Corporation, and BatSoft applications are built for Windows without any affiliation.",
  },
  {
    question: "A product is marked 'In Development' — what does that mean?",
    answer:
      "It means the application is being actively built but has not been released. Product pages and release history are updated as soon as an official build is published.",
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Help with BatSoft software"
        description="Troubleshooting guides and answers for downloading, installing and running BatSoft applications on Windows."
      />

      <Container className="py-14 sm:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {guides.map((guide, index) => (
            <Reveal key={guide.title} delay={index * 0.06}>
              <section className="flex h-full flex-col border border-line bg-surface p-6">
                <span className="grid size-10 place-items-center border border-line bg-surface-2">
                  <guide.icon aria-hidden="true" className="size-5 text-accent" />
                </span>
                <h2 className="mt-4 text-lg font-semibold tracking-tight">
                  {guide.title}
                </h2>
                <ol className="mt-4 list-decimal space-y-3 pl-4 text-sm leading-relaxed text-muted marker:text-muted/60">
                  {guide.steps.map((step) => (
                    <li key={step.slice(0, 40)}>{step}</li>
                  ))}
                </ol>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mt-6 max-w-3xl">
            <FAQAccordion items={faqItems} />
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <section className="flex flex-col items-start gap-4 border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center border border-line bg-surface-2">
                <LifeBuoy aria-hidden="true" className="size-5 text-accent" />
              </span>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Contact
                </h2>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
                  No public support channel has been set up yet. When BatSoft&apos;s
                  first application ships, an official contact address will be
                  published here. Until then, each product&apos;s release page is
                  the authoritative place for the latest versions and known
                  issues.
                </p>
              </div>
            </div>
          </section>
        </Reveal>
      </Container>
    </>
  );
}
