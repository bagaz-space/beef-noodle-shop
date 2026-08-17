"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { MenuItem } from "@/lib/content";
import { photosFor } from "@/lib/menuPhotos";
import { Photo } from "./Photo";

const INTERVAL_MS = 4000;

/**
 * The photo/list pair for one menu category: the photo cycles on its own and
 * the matching item name lights up beside it, and clicking a name jumps the
 * photo to that item.
 *
 * The only client component below the header. It's split out of
 * MenuCategory (which stays a server component) so the category heading
 * doesn't need to ship with it.
 *
 * Motion rules, in order of precedence:
 *   1. prefers-reduced-motion — never auto-advances at all; the crossfade is
 *      dropped too, and it degrades to a plain click-to-switch gallery.
 *   2. A click on any name — the reader has taken over, so auto-advance
 *      stops for good. This is also what satisfies WCAG 2.2.2: any moving
 *      content lasting more than five seconds needs a way to stop it, and
 *      the names themselves are that control.
 *   3. Pointer or keyboard focus inside the carousel — pauses while there,
 *      resumes on leave.
 */
export function MenuCarousel({
  items,
  photoOnRight,
  children,
}: {
  items: MenuItem[];
  /** Desktop only — the photo alternates sides between categories. */
  photoOnRight: boolean;
  /**
   * The category heading, rendered on the server and passed through to sit
   * above the list in the same column. It belongs in this column rather than
   * full-width above: the list alone is much shorter than a 4:3 photo, and
   * centring it against one leaves the column visibly hollow.
   */
  children?: ReactNode;
}) {
  const slides = photosFor(items);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [takenOver, setTakenOver] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const slideCount = slides.length;
  useEffect(() => {
    if (reducedMotion || takenOver || paused || slideCount < 2) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % slideCount),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [reducedMotion, takenOver, paused, slideCount]);

  // A category with nothing photographed yet still renders its item list.
  const current = slides[active];

  return (
    <div
      className={`grid items-center gap-8 lg:gap-14 ${slideCount > 0 ? "lg:grid-cols-2" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slideCount > 0 ? (
        <div
          className={`relative aspect-[4/3] w-full ${photoOnRight ? "lg:order-last" : ""}`}
        >
          {slides.map((slide, i) => (
            // aria-hidden goes on a wrapper, not Photo — the inactive slides
            // stay mounted for the crossfade, and without this a screen
            // reader would announce every dish's alt text at once.
            <div
              key={slide.name}
              aria-hidden={i !== active}
              className={`absolute inset-0 ${
                reducedMotion ? "" : "transition-opacity duration-700 ease-out"
              } ${i === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              <Photo {...slide.photo} rounded className="h-full w-full" />
            </div>
          ))}
        </div>
      ) : null}

      <div>
        {children}

        <ul className="border-t" style={{ borderColor: "var(--line)" }}>
        {items.map((item, itemIndex) => {
          const slideIndex = slides.findIndex((s) => s.itemIndex === itemIndex);
          const isActive = current?.itemIndex === itemIndex;
          const selectable = slideIndex !== -1;

          const body = (
            <>
              <p className="uppercase tracking-tight" style={{ color: isActive ? "var(--ink)" : "var(--ink-muted)" }}>
                {item.name} <span style={{ color: "var(--ink-muted)" }}>{item.chinese}</span>
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                {item.description}
              </p>
            </>
          );

          return (
            <li
              key={item.name}
              className="relative border-b py-5 text-sm"
              style={{ borderColor: "var(--line)" }}
            >
              {/* Marker is a shape, not coloured text: --accent fails AA at
                  this text size, so the active state is carried by the
                  ink/ink-muted shift plus this bar. */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-5 bottom-5 w-[3px] transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{ background: "var(--accent)" }}
              />
              <div className={isActive ? "pl-4 transition-[padding] duration-300" : "transition-[padding] duration-300"}>
                {selectable ? (
                  <button
                    type="button"
                    onClick={() => {
                      setActive(slideIndex);
                      setTakenOver(true);
                    }}
                    aria-current={isActive}
                    className="block w-full cursor-pointer text-left"
                  >
                    {body}
                  </button>
                ) : (
                  body
                )}
              </div>
            </li>
          );
        })}
        </ul>
      </div>
    </div>
  );
}
