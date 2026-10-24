"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "collection", label: "Collection" },
  { id: "lineup", label: "Lineup" },
  { id: "principles", label: "Principles" },
  { id: "get-started", label: "Get started" },
];

/**
 * Fixed right-hand section index (desktop only). Scroll-spy uses a scroll
 * listener rather than IntersectionObserver, which never fires in some
 * embedded webviews.
 */
export function SectionIndex() {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const onScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = sections[0].id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= marker) current = section.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Section index"
      className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-current={active === section.id ? "true" : undefined}
          className={`font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
            active === section.id
              ? "text-accent"                : "text-muted/70 hover:text-foreground"
          }`}
        >
          {active === section.id ? (
            <span aria-hidden="true" className="mr-2">
              →
            </span>
          ) : null}
          {section.label}
        </a>
      ))}
    </nav>
  );
}
