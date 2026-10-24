import { statusLabels } from "@/lib/products";
import type { ProductStatus } from "@/lib/products/schema";

const statusStyles: Record<ProductStatus, string> = {
  available: "border-success/40 text-success",
  "coming-soon": "text-muted",
  "in-development": "border-brand/40 text-accent",
};

export function StatusBadge({
  status,
  className = "",
}: {
  status: ProductStatus;
  className?: string;
}) {
  return (
    <span className={`chip w-fit ${statusStyles[status]} ${className}`}>
      <span aria-hidden="true" className="size-1 rounded-full bg-current" />
      {statusLabels[status]}
    </span>
  );
}
