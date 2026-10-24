import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";
import { getProducts } from "@/lib/products";

export function Footer() {
  const products = getProducts();

  return (
    <footer className="border-t border-line">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="BatSoft — home" className="w-fit">
              <Logo />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {site.altTagline} Independent Windows desktop software, built and
              distributed by BatSoft.
            </p>
            <p className="mt-5 font-mono text-[10px] leading-relaxed tracking-[0.14em] text-muted/70 uppercase">
              Downloads published only through official release pages
            </p>
          </div>

          <nav aria-label="Products">
            <h2 className="font-mono text-[10px] tracking-[0.18em] text-muted/70 uppercase">
              Products
            </h2>
            <ul className="mt-5 space-y-3">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/apps/${product.slug}`}
                    className="group inline-flex items-center gap-1 font-mono text-xs tracking-[0.1em] text-muted uppercase transition-colors hover:text-accent"
                  >
                    {product.name}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore">
            <h2 className="font-mono text-[10px] tracking-[0.18em] text-muted/70 uppercase">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {[
                { href: "/apps", label: "Applications" },
                { href: "/about", label: "About BatSoft" },
                { href: "/support", label: "Support" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-xs tracking-[0.1em] text-muted uppercase transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[10px] tracking-[0.14em] text-muted/70 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} BatSoft — All rights reserved
          </p>
          <p className="flex items-center gap-1.5">
            <span>Independent · Not affiliated with Microsoft</span>
            <span aria-hidden="true">·</span>
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy policy
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
