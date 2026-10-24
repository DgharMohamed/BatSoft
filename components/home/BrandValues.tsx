import {
  Layout,
  ShieldCheck,
  Sparkles,
  Target,
  Monitor,
  Eye,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const principles = [
  {
    number: "01",
    icon: Monitor,
    title: "Windows-first",
    body: "Every BatSoft application is designed specifically for the Windows desktop — its conventions, its shortcuts, its way of doing things. Nothing is a half-fitted port.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Lightweight by design",
    body: "Small downloads, quick startup, minimal footprint. Software should earn the space it takes on your machine, not assume it.",
  },
  {
    number: "03",
    icon: Eye,
    title: "Honest software",
    body: "No bundled extras, no dark patterns, no inflated claims. Product pages say exactly what has been released and what is still on the workbench.",
  },
  {
    number: "04",
    icon: Target,
    title: "Focused tools",
    body: "Each application does its own job well instead of accumulating features nobody asked for. Small surfaces, done properly.",
  },
  {
    number: "05",
    icon: ShieldCheck,
    title: "Respect for your machine",
    body: "No nagging, no upsell screens, no fake urgency. An installer should install the software — nothing else.",
  },
  {
    number: "06",
    icon: Layout,
    title: "Status in the open",
    body: "This website is the source of truth. In development means in development; a download button exists only when an official installer does.",
  },
];

export function BrandValues() {
  return (
    <section id="principles" className="scroll-mt-24 border-b border-line">
      <Container className="py-16 sm:py-24">
        <SectionHeading
          index="03"
          eyebrow="Principles"
          title="Built the honest way."
          description="BatSoft is an independent software brand. One standard applies to everything that ships under the bat."
        />

        <Reveal delay={0.1} className="mt-12">
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => (
              <div
                key={principle.number}
                className="flex flex-col bg-background p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-9 place-items-center border border-line bg-surface-2">
                    <principle.icon
                      aria-hidden="true"
                      className="size-4 text-accent"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[10px] tracking-[0.18em] text-muted/50"
                  >
                    {principle.number}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
