import { labels, menu } from "@/lib/content";
import { ITEM_PHOTOS } from "@/lib/menuPhotos";
import { Character } from "./Character";
import { Photo } from "./Photo";

const totalItems = menu.reduce((sum, section) => sum + section.items.length, 0);

/*
 * A spread across categories rather than a "Best Sellers" claim: there's no
 * sales data to back that, so this shows crispy pork chop, the flagship beef
 * noodle bowl (larger, with its own description), and lu rou fan instead.
 * No prices, per the client's request.
 */
const porkChop = menu.find((s) => s.id === "sides")!.items[1];
const beef = menu.find((s) => s.id === "beef-noodles")!.items[0];
const rice = menu.find((s) => s.id === "rice")!.items[0];

export function Signature() {
  return (
    <section className="py-16 sm:py-24">
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--ink-muted)" }}>
        {labels.signature}
      </p>
      <div className="flex items-start justify-between gap-8">
      <p
        className="mt-5 max-w-2xl text-4xl font-black uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        style={{ color: "var(--ink)" }}
      >
        {/* Only the numerals take --accent. At this size (36–60px, black
            weight) accent clears AA Large comfortably; the same colour on the
            small counters elsewhere would not — see docs/03-konvensi.md. */}
        <span style={{ color: "var(--accent)" }}>{menu.length}</span> Categories.
        <br />
        <span className="block whitespace-nowrap pl-8 sm:pl-12 lg:pl-0">
          <span style={{ color: "var(--accent)" }}>{totalItems}</span> Dishes
        </span>
      </p>
        {/* Pushed to the section's right margin, away from the accent
            numerals: two near-but-not-equal reds side by side read as a miss
            rather than a pair.

            Hidden below sm — the headline's second line is whitespace-nowrap,
            so a flex sibling at 390px risks forcing horizontal overflow. */}
        <Character name="dive" className="hidden w-20 shrink-0 sm:block sm:w-32 lg:w-42" />
      </div>

      <div className="mt-16 grid items-end gap-10 lg:grid-cols-[0.75fr_1.2fr_0.75fr]">
        <div>
          <Photo
            {...ITEM_PHOTOS[porkChop.name]}
            rounded
            zoom={1.3}
            className="h-64 w-full sm:h-80"
          />
          <div>
            <p className="mt-1 text-sm uppercase tracking-tight" style={{ color: "var(--ink)" }}>
              {porkChop.name} <span style={{ color: "var(--ink-muted)" }}>{porkChop.chinese}</span>
            </p>
          </div>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
            {porkChop.description}
            </p>
        </div>

        <div>
          <Photo
            {...ITEM_PHOTOS[beef.name]}
            rounded
            zoom={1.2}
            className="h-[26rem] w-full sm:h-[30rem]"
          />
          <div className="mt-6 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="text-lg uppercase tracking-tight" style={{ color: "var(--ink)" }}>
              {beef.name} <span style={{ color: "var(--ink-muted)" }}>{beef.chinese}</span>
            </p>
          </div>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
            {beef.description}
          </p>
        </div>

        <div>
          <Photo {...ITEM_PHOTOS[rice.name]} rounded zoom={1.2} className="h-64 w-full sm:h-80" />
          <div>
            <p className="mt-1 text-sm uppercase tracking-tight" style={{ color: "var(--ink)" }}>
              {rice.name} <span style={{ color: "var(--ink-muted)" }}>{rice.chinese}</span>
            </p>
          </div>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
            {rice.description}
            </p>
        </div>
      </div>
    </section>
  );
}
