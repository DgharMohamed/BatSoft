import type { Metadata } from "next";
import { Suspense } from "react";
import { AppCatalog } from "@/components/apps/AppCatalog";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { getCategories, getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "Browse the full BatSoft catalog — search and filter every Windows application, check each product's release status, and download official installers.",
  alternates: {
    canonical: "/apps",
  },
};

function CatalogSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="min-h-96 animate-pulse border border-line bg-surface p-6"
    >
      <div className="h-11 w-full bg-surface-2" />
      <div className="mt-4 flex gap-2">
        <div className="h-9 w-16 rounded-full bg-surface-2" />
        <div className="h-9 w-24 rounded-full bg-surface-2" />
        <div className="h-9 w-28 rounded-full bg-surface-2" />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <div key={index} className="h-48 bg-surface-2" />
        ))}
      </div>
    </div>
  );
}

export default function AppsPage() {
  const products = getProducts();
  const categories = getCategories();

  return (
    <>
      <PageHeader
        eyebrow="Catalog"
        title="Applications"
        description="Every BatSoft application in one place. Product pages always show the real release status — available, in development, or coming soon."
      />
      <Container className="py-12 sm:py-16">
        <Suspense fallback={<CatalogSkeleton />}>
          <AppCatalog products={products} categories={categories} />
        </Suspense>
      </Container>
    </>
  );
}
