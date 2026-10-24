import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { AppWindowMockup } from "./AppWindowMockup";
import { Container } from "@/components/ui/Container";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { productGlyph } from "@/lib/products";
import type { Product } from "@/lib/products/schema";

export function FeaturedProduct({ product }: { product: Product }) {
  return (
    <Container className="py-16 sm:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          <span className="text-accent">01</span>
          <span aria-hidden="true"> / </span>
          Featured Project
        </p>

        <section className="mt-6 overflow-hidden border border-line bg-surface">
          <div className="grid lg:grid-cols-2">
            <div className="p-7 sm:p-10 lg:p-12">
              <div className="flex items-center gap-4">
                <ProductIcon
                  name={product.name}
                  glyph={productGlyph(product)}
                  src={product.icon}
                  size="lg"
                />
                <div>
                  <h2 className="font-mono text-2xl font-semibold tracking-[0.04em] text-accent uppercase sm:text-3xl">
                    {product.name}
                  </h2>
                  <StatusBadge status={product.status} className="mt-2" />
                </div>
              </div>

              <p className="mt-6 max-w-md leading-relaxed text-muted">
                {product.shortDescription}
              </p>

              {product.features.length > 0 ? (
                <ul className="mt-8 space-y-4">
                  {product.features.slice(0, 4).map((feature) => (
                    <li key={feature.title} className="flex gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center border border-brand/40">
                        <Check
                          aria-hidden="true"
                          className="size-3 text-accent"
                        />
                      </span>
                      <p className="text-sm leading-relaxed">
                        <span className="font-medium">{feature.title}</span>
                        <span className="text-muted">
                          {" "}
                          — {feature.description}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}

              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/70">
                Version &amp; platform details announced with the first release
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href={`/apps/${product.slug}`} className="btn btn-primary">
                  View {product.name}
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </Link>
              </div>
            </div>

            <div className="border-t border-line bg-surface-2/40 p-7 sm:p-10 lg:border-t-0 lg:border-l lg:p-12">
              <div className="lg:mt-6">
                <AppWindowMockup />
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/70">
                Concept preview — not a screenshot of the application
              </p>
            </div>
          </div>
        </section>
      </Reveal>
    </Container>
  );
}
