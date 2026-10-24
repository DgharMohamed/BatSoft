import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function HeroSection() {
  return (
    <section id="collection" className="scroll-mt-24 border-b border-line">
      <Container className="flex flex-col items-center py-24 text-center sm:py-32">
        <Reveal>
          <Image
            src="/batsoft-logo.png"
            alt="BatSoft logo"
            width={112}
            height={112}
            priority
            className="size-24 sm:size-28 logo-mono"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-9 max-w-3xl text-5xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]">
            Software that works as{" "}
            <span className="text-accent">hard</span> as you do.
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Discover a growing collection of thoughtfully crafted Windows
            applications, built to make everyday computing better.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/apps" className="btn btn-primary">
              Explore Applications
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
            <Link href="/about" className="btn btn-secondary">
              Discover BatSoft
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <p className="mt-12 font-mono text-[10px] tracking-[0.18em] text-muted/70 uppercase">
            For Windows · Official releases only
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
