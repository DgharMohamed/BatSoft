import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-28 text-center sm:py-36">
      <p className="font-mono text-sm font-medium tracking-[0.2em] text-accent">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-muted">
        The page you are looking for does not exist or may have moved. The
        application catalog is a good place to pick the trail back up.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/apps" className="btn btn-primary">
          Explore Applications
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
        <Link href="/" className="btn btn-secondary">
          <Compass aria-hidden="true" className="size-4" />
          Back to Home
        </Link>
      </div>
    </Container>
  );
}
