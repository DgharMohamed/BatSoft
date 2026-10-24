import Image from "next/image";
import { productGlyph } from "@/lib/products";

/**
 * Product icon. Renders the real icon asset when the product data provides
 * one (`icon` field, e.g. BatPlayer); otherwise falls back to a neutral
 * glyph tile placeholder until assets are supplied.
 *
 * Assets are transparent PNGs on a square canvas, so they are fitted rather
 * than cropped (`object-contain`) to keep wide marks such as the BatPlayer
 * bat-and-play emblem intact.
 */
export function ProductIcon({
  name,
  glyph,
  src,
  size = "md",
  className = "",
}: {
  name: string;
  glyph?: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dimensions = size === "lg" ? "size-14" : size === "sm" ? "size-8" : "size-10";
  const box = `relative block shrink-0 overflow-hidden border border-line bg-surface-2 ${dimensions} ${className}`;

  if (src) {
    return (
      <span aria-hidden="true" className={box}>
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 640px) 32px, 56px"
          className="object-contain"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`grid ${box} place-items-center font-mono font-bold text-accent ${
        size === "lg" ? "text-xl" : size === "sm" ? "text-[13px]" : "text-base"
      }`}
    >
      {glyph ?? productGlyph({ name })}
    </span>
  );
}
