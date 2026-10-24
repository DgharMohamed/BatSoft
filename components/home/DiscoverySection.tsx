import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getCategories, getProducts } from "@/lib/products";

export function DiscoverySection() {
  const categories = getCategories();
  const products = getProducts();

  return (
    <section id="index" className="scroll-mt-24 border-b border-line">
      <Container className="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              <span className="text-accent">04</span>
              <span aria-hidden="true"> / </span>
              Index
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              Find your tool.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              Browse the full catalog, search by name or purpose, and filter by
              category. Every product page states its real status — available,
              in development, or coming soon.
            </p>
            <Link href="/apps" className="btn btn-secondary mt-8">
              Browse all applications
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="divide-y divide-line border border-line bg-surface">
              {categories.map((category) => {
                const count = products.filter(
                  (product) => product.category === category,
                ).length;
                return (
                  <li key={category}>
                    <Link
                      href={`/apps?category=${encodeURIComponent(category)}`}
                      className="group flex items-center justify-between gap-4 px-5 py-4.5 transition-colors hover:bg-surface-2"
                    >
                      <span>
                        <span className="block font-mono text-xs font-medium tracking-[0.1em] text-foreground uppercase">
                          {category}
                        </span>
                        <span className="mt-1 block font-mono text-[10px] tracking-[0.14em] text-muted/70 uppercase">
                          {count} application{count === 1 ? "" : "s"}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-muted transition-colors group-hover:text-accent"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
