import type { MenuSection } from "@/lib/content";

/**
 * The photo is the background of the whole category block — header and item
 * list both sit on top of it, not just a small thumbnail card. Height is
 * content-driven (the padded grid below), with a floor so short categories
 * (e.g. Sides, one item) don't collapse into a sliver.
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
  const onPhoto = Boolean(photo);
  const label = photo?.credit ? `Temp stock — ${photo.credit}` : photo?.caption;

  return (
    <div
      id={section.id}
      className={`group relative overflow-hidden ${onPhoto ? "rounded-lg" : ""}`}
      style={onPhoto ? { minHeight: "18rem", scrollMarginTop: "6rem" } : { scrollMarginTop: "6rem" }}
    >
      {photo ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element --
              Same reasoning as components/Photo.tsx: some of these are
              still temporary external Unsplash stand-ins, some are real
              local photos — not worth splitting the next/image config
              between the two while both coexist here. */}
          <img
            src={photo.src}
            alt={photo.alt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ filter: "brightness(0.55) saturate(0.9)" }}
          />
          {/* Light tint, tied to the --ink token (not a hardcoded rgb) — just
              enough to bring this section's colour/contrast in line with the
              darker photo treatment used in Hero/Heritage. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "color-mix(in srgb, var(--ink) 5%, transparent)" }}
          />
        </>
      ) : null}

      <div
        className={`relative grid gap-6 lg:grid-cols-[12rem_1fr] lg:gap-12 ${
          onPhoto ? "p-6 sm:p-8" : "py-10"
        }`}
        // text-shadow is inherited — set once here instead of per element.
        // Legibility comes from this + the image's own darkened filter, not
        // a flat tint over the whole photo.
        style={
          onPhoto
            ? { textShadow: "0 1px 2px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.6)" }
            : undefined
        }
      >
        <div>
          <p className="text-sm" style={{ color: onPhoto ? "var(--ground-alt)" : "var(--ink-muted)" }}>
            {counter}
          </p>
          <h3
            className="mt-2 text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl"
            style={{ color: onPhoto ? "var(--ground)" : "var(--ink)" }}
          >
            {section.name}
          </h3>
          <p className="mt-1 text-sm" style={{ color: onPhoto ? "var(--ground-alt)" : "var(--ink-muted)" }}>
            {section.chinese}
          </p>
        </div>

        <div>
          {section.items.map((item) => (
            <div
              key={item.name}
              className="border-b py-5 text-sm"
              style={{ borderColor: onPhoto ? "rgba(244, 237, 225, 0.3)" : "var(--line)" }}
            >
              <p
                className="uppercase tracking-tight"
                style={{ color: onPhoto ? "var(--ground)" : "var(--ink)" }}
              >
                {item.name}{" "}
                <span style={{ color: onPhoto ? "var(--ground-alt)" : "var(--ink-muted)" }}>
                  {item.chinese}
                </span>
              </p>
              <p
                className="mt-1.5 text-[13px] leading-relaxed"
                style={{ color: onPhoto ? "var(--ground-alt)" : "var(--ink-muted)" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {label ? (
        <span
          className="absolute bottom-0 right-0 m-3 px-2 py-1 text-[10px] uppercase tracking-[0.15em] sm:m-4"
          style={{ background: "var(--ink)", color: "var(--ground-alt)" }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
