import { products as productInput } from "@/data/products";
import { productSchema, type Product, type ProductStatus } from "./schema";

/**
 * Product repository. The catalog is validated once at import time so a bad
 * entry (unsafe URL, malformed checksum, misspelled status…) fails loudly at
 * build instead of rendering incorrect download UI.
 */
const catalog: Product[] = productSchema.array().parse(productInput);

export type DownloadAction =
  | { kind: "direct"; href: string }
  | { kind: "release-page"; href: string }
  | { kind: "unavailable" };

/** Defense-in-depth check before any URL is rendered as an actionable link. */
export function isSafeExternalUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.length > 0;
  } catch {
    return false;
  }
}

export function getDownloadAction(product: Product): DownloadAction {
  if (product.downloadUrl && isSafeExternalUrl(product.downloadUrl)) {
    return { kind: "direct", href: product.downloadUrl };
  }
  if (product.releasePageUrl && isSafeExternalUrl(product.releasePageUrl)) {
    return { kind: "release-page", href: product.releasePageUrl };
  }
  return { kind: "unavailable" };
}

export function getProducts(): Product[] {
  return catalog;
}

export function getProductBySlug(slug: string): Product | undefined {
  return catalog.find((product) => product.slug === slug);
}

export function getFeaturedProduct(): Product | undefined {
  return catalog.find((product) => product.featured);
}

export function getCategories(): string[] {
  return [...new Set(catalog.map((product) => product.category))].sort();
}

export function getRelatedProducts(slug: string, count = 2): Product[] {
  const others = catalog.filter((product) => product.slug !== slug);
  const sameCategory = others.filter(
    (product) => product.category === getProductBySlug(slug)?.category,
  );
  const rest = others.filter((product) => !sameCategory.includes(product));
  return [...sameCategory, ...rest].slice(0, count);
}

export const statusLabels: Record<ProductStatus, string> = {
  available: "Available",
  "coming-soon": "Coming Soon",
  "in-development": "In Development",
};

/**
 * Short display glyph for placeholder product icons. All BatSoft products
 * share the "Bat" prefix, so the first letter after it is used
 * (BatPlayer → P, BatTools → T, BatConvert → C) to keep tiles distinct.
 */
export function productGlyph(product: { name: string }): string {
  const afterPrefix = product.name.replace(/^Bat/i, "");
  const letter = afterPrefix.charAt(0).toUpperCase();
  return letter || product.name.charAt(0).toUpperCase();
}
