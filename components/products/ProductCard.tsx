import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { productGlyph } from "@/lib/products";
import type { Product } from "@/lib/products/schema";

const visualTags: Record<Product["status"], string> = {
  available: "Official release",
  "coming-soon": "In planning",
  "in-development": "Concept preview",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/apps/${product.slug}`}
      className="group flex flex-col border border-line bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40"
    >
      {/* Visual panel — real icon when available, watermark otherwise */}
      <div className="bg-grid relative aspect-[16/9] overflow-hidden border-b border-line bg-gradient-to-br from-surface-2 to-surface">
        {product.icon ? (
          <span className="absolute inset-0 grid place-items-center">
            <Image
              src={product.icon}
              alt=""
              width={112}
              height={112}
              className="size-28 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center font-mono text-7xl font-bold text-line transition-colors duration-300 group-hover:text-surface-2"
          >
            {productGlyph(product)}
          </span>
        )}
        <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/80">
          {product.category}
        </span>
        <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/60">
          {visualTags[product.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <ProductIcon name={product.name} src={product.icon} size="sm" />
          <h3 className="font-mono text-sm font-semibold tracking-[0.06em] text-accent uppercase">
            {product.name}
          </h3>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <StatusBadge status={product.status} />
          <span className="chip text-muted/70">
            {product.platforms.length > 0
              ? product.platforms.join(" · ")
              : "Release info TBA"}
          </span>
        </div>

        <div className="mt-auto pt-5">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
            Explore {product.name}
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
