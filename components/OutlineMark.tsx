/**
 * Giant stroke-only text over a photo container. Solves two problems at
 * once: it satisfies the brief's bilingual mandate without a full
 * translation layer (see docs/01-brief.md), and it stands in for a brand
 * mark before a real logo exists — when one does arrive, this device lives
 * on a different layer and won't collide with it. Content is prop-driven,
 * so this carries no data dependency of its own. Hidden from screen readers
 * — it's a graphic treatment of text that appears properly, once, elsewhere
 * on the page.
 */
export function OutlineMark({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <p
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 flex select-none items-center justify-center whitespace-nowrap text-center font-black uppercase leading-none tracking-tight ${className}`}
      style={{
        color: "transparent",
        WebkitTextStroke: "0.08rem var(--ground)",
        fontFamily: "var(--font-display)",
      }}
    >
      {text}
    </p>
  );
}
