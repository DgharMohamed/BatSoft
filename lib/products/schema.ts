import { z } from "zod";

/** Release-related URLs must be HTTPS links; anything else fails validation. */
const httpsUrl = z
  .url()
  .refine(
    (value) => {
      try {
        return new URL(value).protocol === "https:";
      } catch {
        return false;
      }
    },
    { message: "Release URLs must use HTTPS" },
  );

export const productStatusSchema = z.enum([
  "available",
  "coming-soon",
  "in-development",
]);
export type ProductStatus = z.infer<typeof productStatusSchema>;

export const changelogEntrySchema = z.object({
  version: z.string().min(1),
  date: z.iso.date(),
  summary: z.string().optional(),
  added: z.array(z.string()).default([]),
  improvements: z.array(z.string()).default([]),
  fixes: z.array(z.string()).default([]),
  knownIssues: z.array(z.string()).default([]),
});

export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const productSchema = z.object({
  id: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab-case"),
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.array(z.string().min(1)).default([]),
  /**
   * Planned data-handling paragraphs for the product's privacy page.
   * Initial brand copy — finalise against the shipped build at first
   * release (same provenance rules as the descriptions above).
   */
  privacyFocus: z.array(z.string().min(1)).max(6).default([]),
  category: z.string().min(1),
  status: productStatusSchema,
  featured: z.boolean().default(false),
  /** Path to a real icon asset under /public. Omitted until assets exist. */
  icon: z.string().optional(),
  screenshots: z.array(z.string()).default([]),
  features: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .default([]),
  platforms: z.array(z.string()).default([]),
  requirements: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
      }),
    )
    .default([]),
  latestVersion: z.string().optional(),
  releaseDate: z.string().optional(),
  releasePageUrl: httpsUrl.optional(),
  downloadUrl: httpsUrl.optional(),
  installerFilename: z.string().optional(),
  fileSize: z.string().optional(),
  architecture: z.string().optional(),
  sha256: z
    .string()
    .regex(/^[a-f0-9]{64}$/, "SHA-256 must be a 64-character hex digest")
    .optional(),
  changelog: z.array(changelogEntrySchema).default([]),
  faq: z.array(faqItemSchema).default([]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export type Product = z.output<typeof productSchema>;
export type ProductInput = z.input<typeof productSchema>;
export type ChangelogEntry = z.output<typeof changelogEntrySchema>;
export type FaqItem = z.output<typeof faqItemSchema>;
