import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${site.contentUpdated}T00:00:00Z`);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1, lastModified },
    { url: `${site.url}/apps`, changeFrequency: "weekly", priority: 0.9, lastModified },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.5, lastModified },
    { url: `${site.url}/support`, changeFrequency: "monthly", priority: 0.5, lastModified },
    { url: `${site.url}/privacy`, changeFrequency: "monthly", priority: 0.4, lastModified },
  ];

  const productRoutes: MetadataRoute.Sitemap = getProducts().flatMap(
    (product) => [
      {
        url: `${site.url}/apps/${product.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        lastModified,
      },
      {
        url: `${site.url}/apps/${product.slug}/changelog`,
        changeFrequency: "weekly" as const,
        priority: 0.6,
        lastModified,
      },
      {
        url: `${site.url}/apps/${product.slug}/privacy`,
        changeFrequency: "monthly" as const,
        priority: 0.4,
        lastModified,
      },
      {
        url: `${site.url}/apps/${product.slug}/terms`,
        changeFrequency: "monthly" as const,
        priority: 0.4,
        lastModified,
      },
    ],
  );

  return [...staticRoutes, ...productRoutes];
}
