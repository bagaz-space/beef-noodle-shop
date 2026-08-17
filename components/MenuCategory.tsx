import type { MenuSection } from "@/lib/content";
import { MenuCarousel } from "./MenuCarousel";

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
          <h3
            className="mt-2 text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl"
            style={{ color: "var(--ink)" }}
          >
            {section.name}
          </h3>
          <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
            {section.chinese}
          </p>
        </div>
      </MenuCarousel>
    </div>
  );
}
