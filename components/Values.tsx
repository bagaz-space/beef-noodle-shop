import { story } from "@/lib/content";

/**
 * Long-form story section — the client's own narrative copy
 * (story.narrative in lib/content.ts). Sits as connective tissue between
 * the heritage photo section and the menu.
 */
export function Values() {
  return (
    <section className="pt-2 pb-10 sm:pt-4 sm:pb-14">
      {/* Multi-column instead of one narrow block — fills the section's
          full width while each column stays a comfortable reading length. */}
      <div className="columns-1 gap-x-12 sm:columns-2 lg:gap-x-16">
        {story.narrative.map((paragraph, i) => (
          <p
            key={i}
            className="mb-5 break-inside-avoid text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--ink-muted)" }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
