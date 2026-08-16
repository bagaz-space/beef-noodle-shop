import { intro, labels } from "@/lib/content";

/**
 * Short standfirst, right after the hero and before Story. Real copy from
 * the client's own promo flyer — deliberately its own section, not folded
 * into Story: this answers "what is this place, why visit", Story is the
 * heritage/founding narrative. Different job, different section.
 */
export function Welcome() {
  return (
    <section className="py-10 sm:py-14">
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--ink-muted)" }}>
        {labels.welcome}
      </p>
      <p
        className="mt-5 max-w-2xl text-lg leading-relaxed sm:text-xl"
        style={{ color: "var(--ink)" }}
      >
        {intro}
      </p>
    </section>
  );
}
