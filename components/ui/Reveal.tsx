/**
 * Scroll-independent CSS reveal (see `.reveal` in globals.css).
 *
 * Deliberately not framer-motion `whileInView`: gating content visibility on
 * IntersectionObserver leaves the page blank in environments where the
 * observer never fires (embedded webviews, hardened browsers). With CSS the
 * content is present in the server HTML and animates in as an enhancement;
 * `prefers-reduced-motion` disables the animation but keeps content visible.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={delay > 0 ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
