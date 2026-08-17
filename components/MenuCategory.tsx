import type { MenuSection } from "@/lib/content";
import { Photo } from "./Photo";

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
 * The photo alternates sides per category so four stacked categories read as a
 * rhythm instead of four identical rows.
 */
export function MenuCategory({
  section,
  index,
  total,
  photo,
}: {
  section: MenuSection;
  index: number;
  total: number;
  photo?: { src: string; alt: string; credit?: string; caption?: string };
}) {
  const counter = `${String(index).padStart(2, "0")}/${String(total).padStart(2, "0")}`;
  // `index` is 1-based. The photo sits first in the DOM (so on mobile it leads
  // the category, magazine-style); on wide screens every second one is pushed
  // to the right instead.
  const photoOnRight = index % 2 === 0;

  return (
    <div
      id={section.id}
      className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
      style={{ scrollMarginTop: "6rem" }}
    >
      {photo ? (
        <Photo
          {...photo}
          rounded
          className={`aspect-[4/3] w-full ${photoOnRight ? "lg:order-last" : ""}`}
        />
      ) : null}

      <div>
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

        <div className="mt-8 border-t" style={{ borderColor: "var(--line)" }}>
          {section.items.map((item) => (
            <div
              key={item.name}
              className="border-b py-5 text-sm"
              style={{ borderColor: "var(--line)" }}
            >
              <p className="uppercase tracking-tight" style={{ color: "var(--ink)" }}>
                {item.name} <span style={{ color: "var(--ink-muted)" }}>{item.chinese}</span>
              </p>
              <p
                className="mt-1.5 text-[13px] leading-relaxed"
                style={{ color: "var(--ink-muted)" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
