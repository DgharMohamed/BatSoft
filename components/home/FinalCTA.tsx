import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function FinalCTA() {
  return (
    <section id="get-started" className="scroll-mt-24">
      <Container className="py-20 text-center sm:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            <span className="text-accent">05</span>
            <span aria-hidden="true"> / </span>
            Get Started
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            {site.tagline.split(".")[0]}.
            <br />
            <span className="text-accent">
              {site.tagline.split(".")[1]?.trim()}.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted">
            Explore the collection and follow each product as it moves from the
            workbench to its first official release.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/apps" className="btn btn-primary">
              Explore Applications
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
