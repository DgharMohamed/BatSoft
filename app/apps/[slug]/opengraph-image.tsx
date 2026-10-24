import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getProductBySlug, productGlyph, statusLabels } from "@/lib/products";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — application preview`;

/**
 * Per-product Open Graph card for /apps/[slug], in the same visual family as
 * the root card: dark ink, crest + wordmark up top, brand yellow bar at the
 * bottom. The product icon (or its letter-glyph tile when no icon asset
 * exists yet) is inlined as a data URI — satori cannot fetch site URLs.
 */
export default async function ProductOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const crest = await readFile(join(process.cwd(), "public/batsoft-logo.png"));
  const crestSrc = `data:image/png;base64,${crest.toString("base64")}`;

  let productMark: React.ReactNode;
  if (product.icon) {
    const icon = await readFile(join(process.cwd(), `public${product.icon}`));
    const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;
    // ImageResponse (satori) has no next/image support; a plain img is the
    // only way to inline the product mark.
    // eslint-disable-next-line @next/next/no-img-element
    productMark = <img src={iconSrc} width={132} height={132} alt="" />;
  } else {
    productMark = (
      <div
        style={{
          display: "flex",
          width: 132,
          height: 132,
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(242, 241, 238, 0.14)",
          backgroundColor: "#17181c",
          color: "#FFD51B",
          fontSize: 56,
          fontWeight: 700,
        }}
      >
        {productGlyph(product)}
      </div>
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "#121316",
          color: "#F4F4F5",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={crestSrc} width={60} height={60} alt="" />
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            <div>Bat</div>
            <div style={{ color: "#FFD51B" }}>Soft</div>
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              fontSize: 20,
              color: "#A1A1AA",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 44 }}>
          {productMark}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 76,
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              {product.name}
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: 720,
                fontSize: 28,
                lineHeight: 1.35,
                color: "#A1A1AA",
              }}
            >
              {product.shortDescription}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 16 }}>
            <div
              style={{
                display: "flex",
                border: "1px solid rgba(242, 241, 238, 0.14)",
                padding: "10px 18px",
                fontSize: 20,
                color: "#FFD51B",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
              }}
            >
              {statusLabels[product.status]}
            </div>
            <div
              style={{
                display: "flex",
                border: "1px solid rgba(242, 241, 238, 0.14)",
                padding: "10px 18px",
                fontSize: 20,
                color: "#A1A1AA",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
              }}
            >
              {product.category}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: 170,
              height: 8,
              marginLeft: "auto",
              borderRadius: 4,
              backgroundColor: "#FFD51B",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
