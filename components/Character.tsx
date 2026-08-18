/**
 * One of the client's cow illustrations, coloured from a token.
 *
 * Coloured with a CSS mask rather than inline SVG or `<img>`. A mask reads
 * only the alpha channel, so the `#A50A0A` baked into the files is irrelevant
 * and the colour can come from a token — while the file itself stays external
 * and cached separately from the HTML. Inlining would push 6–15KB of path data
 * into every page load, uncached; `<img>` would lock the colour outside the
 * token system entirely (see docs/03-konvensi.md).
 *
 * That original red is not a system colour, and not a near miss: it measures
 * 6.8:1 against Paper Cream where `--accent` measures 4.35:1. Left as-is these
 * would out-shout the brand's own accent.
 *
 * Purely decorative — `aria-hidden`, no alternative text, same as DiamondGrid.
 * Nothing here is the only carrier of any information.
 *
 * Sized by the caller, but never below ~72px (`w-18`): below that the faces
 * turn to mush. They sit comfortably at 96–140px.
 */
/**
 * The eleven files in public/character. This union is the only guard against
 * a typo, and it earns its keep: a mask that fails to load renders an element
 * that is correctly sized and completely invisible — no 404 in the UI, nothing
 * in the console. Making a wrong name fail at compile time is what keeps that
 * from ever reaching production.
 *
 * Seven of these aren't referenced anywhere yet. They stay for the client to
 * choose from later; see the spec's "Di luar cakupan".
 */
export type CharacterName =
  | "bowl"
  | "bowl-head"
  | "chef"
  | "chopsticks"
  | "dive"
  | "lounge"
  | "noodle-wrap"
  | "paper-plane"
  | "slurp"
  | "takeaway"
  | "wink";

export function Character({
  name,
  className = "",
  tone = "var(--accent)",
}: {
  name: CharacterName;
  className?: string;
  /** Colour token. Defaults to --accent; --ink where the spot needs to stay calm. */
  tone?: string;
}) {
  const url = `/character/${name}.svg`;
  return (
    <span
      aria-hidden="true"
      /*
       * Square box + `contain`. Every one of the eleven is already normalised
       * to 400px on its longest side inside a 500px viewBox, so a square box
       * gives consistent optical weight across characters with no per-file
       * tuning — the wide ones (bowl-head, paper-plane) simply sit shorter
       * within it, which is what their composition wants anyway.
       */
      className={`block aspect-square ${className}`}
      style={{
        background: tone,
        // -webkit- prefixes are still required by Safari for masks.
        maskImage: `url("${url}")`,
        WebkitMaskImage: `url("${url}")`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
