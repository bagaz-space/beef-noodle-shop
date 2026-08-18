import type { MenuSection } from "@/lib/content";
import { Character, type CharacterName } from "./Character";
import { MenuCarousel } from "./MenuCarousel";

/*
 * One character per category, keyed by position rather than by meaning.
 *
 * Deliberately not matched to the food: all eleven illustrations are cow,
 * noodle and bowl, while the categories include Rice, Sides and Sweet &
 * Drinks — so any "matching" beyond the first category would have been
 * invented anyway. Per the client, they're decoration here, not labels.
 *
 * Keyed by index, not picked at random: a real random pick would differ
 * between the server and client renders and break hydration.
 */
const CATEGORY_CHARACTERS: CharacterName[] = ["bowl", "chopsticks", "lounge", "wink"];

/**
 * A category reads as a spread: the item list on the page's own cream ground,
 * the photo beside it at full brightness.
 *
 * This was previously a photo-as-background band, which forced the photo down
 * to 55% brightness and needed heavy black text-shadows to keep the overlaid
 * text legible. With four categories stacked, that read as one large dark slab
 * mid-page. The client asked for a brighter page, so the text moved off the
 * photo rather than the photo being dimmed under the text — the same call
 * already made for the Heritage photo.
 *
 * The interactive photo/list pair lives in MenuCarousel, a client component;
 * this stays on the server so the heading doesn't ship with it.
 */
export function MenuCategory({
  section,
  index,
  total,
}: {
  section: MenuSection;
  index: number;
  total: number;
}) {
  const counter = `${String(index).padStart(2, "0")}/${String(total).padStart(2, "0")}`;
  // `index` is 1-based. Every second category flips the photo to the right on
  // wide screens, so four stacked spreads read as a rhythm rather than four
  // identical rows.
  const photoOnRight = index % 2 === 0;

  return (
    <div id={section.id} style={{ scrollMarginTop: "6rem" }}>
      <MenuCarousel items={section.items} photoOnRight={photoOnRight}>
        <div className="mb-8">
          <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
            {counter}
          </p>
          <div className="mt-2 flex items-center gap-4">
            <h3
              className="text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl"
              style={{ color: "var(--ink)" }}
            >
              {section.name}
            </h3>
            <Character
              name={CATEGORY_CHARACTERS[(index - 1) % CATEGORY_CHARACTERS.length]}
              className="w-18 shrink-0 sm:w-20"
            />
          </div>
          <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
            {section.chinese}
          </p>
        </div>
      </MenuCarousel>
    </div>
  );
}
