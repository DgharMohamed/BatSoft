import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/**
 * The official crest is inlined as a data URI because ImageResponse (satori)
 * cannot resolve the site's own public URLs while the image is generated.
 */
export default async function OpenGraphImage() {
  const crest = await readFile(join(process.cwd(), "public/batsoft-logo.png"));
  const crestSrc = `data:image/png;base64,${crest.toString("base64")}`;

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
          {/* ImageResponse (satori) has no next/image support; a plain img is
              the only way to inline the crest. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={crestSrc} width={72} height={72} alt="" />
          <div
            style={{
              display: "flex",
              fontSize: 42,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            <div>Bat</div>
            <div style={{ color: "#FFD51B" }}>Soft</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            <div>Powerful Tools.</div>
            <div>One BatSoft.</div>
          </div>
          <div style={{ fontSize: 30, color: "#A1A1AA" }}>
            Original Windows desktop applications.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: 170,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#FFD51B",
          }}
        />
      </div>
    ),
    size,
  );
}
