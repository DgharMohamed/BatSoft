import type { ChangelogEntry } from "@/lib/products/schema";

const groups: { key: keyof ChangelogEntry; label: string }[] = [
  { key: "added", label: "New features" },
  { key: "improvements", label: "Improvements" },
  { key: "fixes", label: "Bug fixes" },
  { key: "knownIssues", label: "Known issues" },
];

export function ChangelogList({ entries }: { entries: ChangelogEntry[] }) {
  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <article
          key={entry.version}
          className="border border-line bg-surface p-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="border border-brand/30 bg-brand/10 px-2.5 py-1 font-mono text-xs font-medium text-accent">
              v{entry.version}
            </span>
            <time className="text-sm text-muted">{entry.date}</time>
          </div>

          {entry.summary ? (
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {entry.summary}
            </p>
          ) : null}

          {groups.map(({ key, label }) => {
            const items = entry[key] as string[];
            if (items.length === 0) return null;
            return (
              <div key={key} className="mt-5 first:mt-4">
                <h4 className="text-xs font-semibold tracking-[0.16em] text-foreground/80 uppercase">
                  {label}
                </h4>
                <ul className="mt-2.5 space-y-1.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1 shrink-0 rounded-full bg-brand"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </article>
      ))}
    </div>
  );
}
