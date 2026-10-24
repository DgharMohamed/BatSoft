import { Reveal } from "@/components/ui/Reveal";

export type PolicySection = {
  heading: string;
  /** Short paragraphs rendered under the heading. */
  paragraphs?: React.ReactNode[];
  /** Escape hatch when the body is not a paragraph list (e.g. link lists). */
  body?: React.ReactNode;
};

/**
 * Numbered policy document sections on a hairline-divided spine. Shared by
 * the BatSoft site policy (/privacy) and each application's own policy so
 * every legal page renders with the same structure.
 */
export function PolicySections({
  sections,
}: {
  sections: PolicySection[];
}) {
  return (
    <div className="max-w-3xl divide-y divide-line border-y border-line">
      {sections.map((section, index) => (
        <Reveal key={section.heading} delay={index * 0.04}>
          <section className="py-7">
            <span className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">
              {section.heading}
            </h2>
            {section.body ?? (
              <div className="mt-3 space-y-3">
                {section.paragraphs?.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="text-sm leading-relaxed text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </section>
        </Reveal>
      ))}
    </div>
  );
}
