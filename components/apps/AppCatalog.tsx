"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Product } from "@/lib/products/schema";

type SortOption = "featured" | "name-asc" | "name-desc";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured first" },
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
];

export function AppCatalog({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // The category filter lives in the URL so category links (homepage,
  // discovery section, product pages) deep-link into a pre-filtered catalog.
  const queryCategory = searchParams.get("category");
  const category = categories.includes(queryCategory ?? "")
    ? (queryCategory as string)
    : null;

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState<SortOption>("featured");

  const setCategoryParam = (next: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (next === null) {
      params.delete("category");
    } else {
      params.set("category", next);
    }
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const clearFilters = () => {
    setQuery("");
    if (category !== null) {
      setCategoryParam(null);
    }
  };

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matches = products.filter((product) => {
      if (category && product.category !== category) return false;
      if (!needle) return true;
      const haystack = [
        product.name,
        product.shortDescription,
        product.category,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });

    const byName = (a: Product, b: Product) =>
      a.name.localeCompare(b.name, "en", { sensitivity: "base" });

    switch (sort) {
      case "name-asc":
        return [...matches].sort(byName);
      case "name-desc":
        return [...matches].sort((a, b) => byName(b, a));
      case "featured":
        return [...matches].sort(
          (a, b) => Number(b.featured) - Number(a.featured) || byName(a, b),
        );
    }
  }, [products, query, category, sort]);

  const hasActiveFilters = query.trim() !== "" || category !== null;

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <label htmlFor="app-search" className="sr-only">
            Search applications
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
          />
          <input
            id="app-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="SEARCH APPLICATIONS…"
            className="h-10 w-full border border-line bg-surface pr-4 pl-10 font-mono text-xs tracking-[0.06em] text-foreground transition-colors placeholder:text-muted/60 uppercase focus:border-brand/50 focus:outline-none"
          />
        </div>

        <div className="relative">
          <label htmlFor="app-sort" className="sr-only">
            Sort applications
          </label>
          <select
            id="app-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="h-10 w-full cursor-pointer appearance-none border border-line bg-surface pr-9 pl-4 font-mono text-[11px] tracking-[0.08em] text-foreground uppercase transition-colors focus:border-brand/50 focus:outline-none lg:w-52"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 font-mono text-xs text-muted"
          >
            ▾
          </span>
        </div>
      </div>

      <div
        role="group"
        aria-label="Filter by category"
        className="mt-4 flex flex-wrap items-center gap-2"
      >
        <button
          type="button"
          aria-pressed={category === null}
          onClick={() => setCategoryParam(null)}
          className={`h-9 border px-3.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
            category === null
              ? "border-brand/60 bg-brand/10 text-accent"
              : "border-line bg-surface text-muted hover:text-foreground"
          }`}
        >
          All
        </button>
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategoryParam(category === item ? null : item)}
            className={`h-9 border px-3.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
              category === item
                ? "border-brand/60 bg-brand/10 text-accent"
                : "border-line bg-surface text-muted hover:text-foreground"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <p
        aria-live="polite"
        className="mt-8 font-mono text-[10px] tracking-[0.18em] text-muted/80 uppercase"
      >
        {filtered.length} application{filtered.length === 1 ? "" : "s"}
        {category ? ` · ${category}` : ""}
      </p>

      <div className="mt-4">
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Search}
            title="No applications found"
            description={
              hasActiveFilters
                ? `Nothing matches "${query.trim() || category}" right now. Try a different search or clear the filters.`
                : "The catalog is empty. New applications will appear here as they are announced."
            }
            action={
              hasActiveFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="btn btn-secondary btn-sm"
                >
                  <X aria-hidden="true" className="size-4" />
                  Clear search & filters
                </button>
              ) : undefined
            }
          />
        )}
      </div>
    </div>
  );
}
