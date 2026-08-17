/**
 * Decorative diamond mark. Pure graphic accent — no content dependency.
 *
 * The tones are mixed rather than uniform: this is one of only a handful of
 * non-typographic devices on the page, so it carries most of the brand's
 * "fun, energetic" register on its own. `--gold` is safe here precisely
 * because these are solid shapes and not text — the ~2.2:1 contrast ceiling
 * that bars gold from type doesn't apply to decoration (see
 * docs/03-konvensi.md, and InfoStrip's accent-tinted icons for the same
 * reasoning).
 */
const TONES = [
  // Row one, four across.
  "var(--ink)",
  "var(--accent)",
  "var(--ink)",
  "var(--gold)",
  // Row two, offset one column right — see `col-start-2` below.
  "var(--accent)",
  "var(--ink)",
  "var(--ink)",
];

export function DiamondGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`grid w-16 grid-cols-4 gap-1 ${className}`} aria-hidden="true">
      {TONES.map((tone, i) => (
        <span
          key={i}
          className={`aspect-square rotate-45 ${i === 4 ? "col-start-2" : ""}`}
          style={{ background: tone }}
        />
      ))}
    </div>
  );
}
