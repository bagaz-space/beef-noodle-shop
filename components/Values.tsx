import { story } from "@/lib/content";

/**
 * Long-form story section — the client's own narrative copy
 * (story.narrative in lib/content.ts). Sits as connective tissue between
 * the heritage photo section and the menu.
 */
export function Values() {
  return (
    <section className="pt-2 pb-10 sm:pt-4 sm:pb-14">
      {/* One continuous block, not split into columns — fills the
          section's full width, same as the photo/heading row above it. */}
      <div>
        {story.narrative.map((paragraph, i) => (
          <p
            key={i}
            className="mb-5 text-base leading-relaxed last:mb-0 sm:text-lg"
            style={{ color: "var(--ink-muted)" }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
