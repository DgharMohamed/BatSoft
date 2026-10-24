"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/apps", label: "Applications" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility strip */}
      <div className="hidden border-b border-line bg-background md:block">
        <Container className="flex h-8 items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted/80">
          <span>
            <span className="text-accent">BatSoft</span> — Independent Windows
            Software
          </span>
          <span className="hidden lg:inline">
            Official releases only · No bundled extras
          </span>
        </Container>
      </div>

      {/* Main bar */}
      <div
        className={`border-b transition-colors duration-200 ${
          scrolled || menuOpen
            ? "border-line bg-background/90 backdrop-blur-md"
            : "border-line bg-background"
        }`}
      >
        <Container className="flex h-14 items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="BatSoft — home"
            className=""
            onClick={() => setMenuOpen(false)}
          >
            <Logo />
          </Link>

          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                      isActive(link.href)
                        ? "text-accent"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/apps/batplayer"
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              Get BatPlayer
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center border border-line bg-surface-2 text-foreground md:hidden"
            >
              {menuOpen ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
        </Container>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-b border-line bg-background/95 backdrop-blur-md md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-3 font-mono text-xs uppercase tracking-[0.16em] ${
                  isActive(link.href)
                    ? "bg-surface-2 text-accent"
                    : "text-muted hover:bg-surface-2 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/apps/batplayer"
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary mt-2 w-full sm:hidden"
            >
              Get BatPlayer
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
