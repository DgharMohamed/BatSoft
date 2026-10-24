import Image from "next/image";

/**
 * Official BatSoft brand asset (public/batsoft-logo.png — the golden bat
 * shield emblem), used as supplied. PNG rather than WebP because Next's image
 * optimizer flattens the transparency of WebP sources.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/batsoft-logo.png"
        alt=""
        width={36}
        height={36}
        className="size-9 logo-mono"
      />
      <span className="text-[17px] font-semibold tracking-tight whitespace-nowrap">
        Bat<span className="text-accent">Soft</span>
      </span>
    </span>
  );
}
