import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BrandValues } from "@/components/home/BrandValues";
import { DiscoverySection } from "@/components/home/DiscoverySection";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { SectionIndex } from "@/components/home/SectionIndex";
import { ProductCard } from "@/components/products/ProductCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getFeaturedProduct, getProducts } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProduct();
  const products = getProducts();

  return (
    <>
      <SectionIndex />

      <HeroSection />

      {featured ? <FeaturedProduct product={featured} /> : null}

      {/* Lineup — the full catalog in ArtCraft-style cards */}
      <section id="lineup" className="scroll-mt-24 border-b border-line">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                <span className="text-accent">02</span>
                <span aria-hidden="true"> / </span>
                The Lineup
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
                The lineup.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Original Windows software, each with its own page, release
                history and download policy.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/apps"
                className="group inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-foreground"
              >
                View catalog
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 text-muted transition-all duration-200 group-hover:text-accent"
                />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-12">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}

              {/* More-on-the-way tile */}
              <div className="flex flex-col border border-dashed border-line p-5">
                <span
                  aria-hidden="true"
                  className="font-mono text-3xl text-muted/50"
                >
                  +
                </span>
                <h3 className="mt-auto pt-8 text-lg font-semibold tracking-tight">
                  More tools
                  <br />
                  on the way.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  The collection grows deliberately. See what is planned next.
                </p>
                <Link
                  href="/about"
                  className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-[0.14em] text-accent uppercase"
                >
                  See what&apos;s planned
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <BrandValues />

      <DiscoverySection />

      <FinalCTA />
    </>
  );
}
