import { ExternalLink } from "lucide-react";
import { isSafeExternalUrl } from "@/lib/products";
import type { Product } from "@/lib/products/schema";

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-b-0 sm:grid sm:grid-cols-[180px_1fr]">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-right text-sm font-medium sm:text-left">{children}</dd>
    </div>
  );
}

function Unavailable() {
  return <span className="font-normal text-muted/70 italic">Not yet available</span>;
}

export function ReleaseMetadata({ product }: { product: Product }) {
  const hasReleasePage =
    product.releasePageUrl && isSafeExternalUrl(product.releasePageUrl);

  return (
    <dl className="border border-line bg-surface px-5 py-1.5">
      <MetaRow label="Version">
        {product.latestVersion ?? <Unavailable />}
      </MetaRow>
      <MetaRow label="Release date">
        {product.releaseDate ?? <Unavailable />}
      </MetaRow>
      <MetaRow label="Supported Windows versions">
        {product.platforms.length > 0 ? (
          product.platforms.join(", ")
        ) : (
          <Unavailable />
        )}
      </MetaRow>
      <MetaRow label="Architecture">
        {product.architecture ?? <Unavailable />}
      </MetaRow>
      <MetaRow label="Installer">
        {product.installerFilename ?? <Unavailable />}
      </MetaRow>
      <MetaRow label="File size">{product.fileSize ?? <Unavailable />}</MetaRow>
      <MetaRow label="SHA-256">
        {product.sha256 ? (
          <span className="font-mono text-xs break-all">{product.sha256}</span>
        ) : (
          <Unavailable />
        )}
      </MetaRow>
      <MetaRow label="Official release page">
        {hasReleasePage ? (
          <a
            href={product.releasePageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-accent hover:underline"
          >
            Open release page
            <ExternalLink aria-hidden="true" className="size-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : (
          <Unavailable />
        )}
      </MetaRow>
    </dl>
  );
}
