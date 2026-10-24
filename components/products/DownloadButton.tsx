import { Download, ExternalLink } from "lucide-react";
import { getDownloadAction } from "@/lib/products";
import type { Product } from "@/lib/products/schema";

/**
 * Central download CTA. Renders a direct download only for a configured,
 * validated installer URL; falls back to the official release page; otherwise
 * shows an explicit unavailable state. Never fabricates a link.
 */
export function DownloadButton({ product }: { product: Product }) {
  const action = getDownloadAction(product);

  if (action.kind === "direct") {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
        download
      >
        <Download aria-hidden="true" className="size-4" />
        Download Installer
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  if (action.kind === "release-page") {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        Open Release Page
        <ExternalLink aria-hidden="true" className="size-4" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <div>
      <button
        type="button"
        disabled
        className="btn btn-primary cursor-not-allowed opacity-40"
      >
        <Download aria-hidden="true" className="size-4" />
        Download
      </button>
      <p className="mt-2.5 text-xs leading-relaxed text-muted">
        No public release yet — this becomes active as soon as an official
        installer is published.
      </p>
    </div>
  );
}
