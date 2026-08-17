import type { ReactNode } from "react";

/**
 * A photo — either a real one from the client, or (via `credit`) a
 * temporary stand-in from Unsplash. Which one it is drives the label:
 * `credit` set means "Temp stock — {credit}" (impossible to ship by
 * accident as if it were final); `caption` set on a real photo means show
 * that instead; neither set means no label at all, which is the expected
 * state for a real photo whose caption hasn't arrived yet — see
 * docs/03-konvensi.md. Swap remaining stand-ins for real photos (or migrate
 * to `next/image`) later; nothing else about the layout needs to change.
 */
export function Photo({
  src,
  alt,
  credit,
  caption,
  className = "",
  dim = 1,
  compact = false,
  rounded = false,
  zoom = 1,
  children,
}: {
  src: string;
  alt: string;
  /** Set only for temporary stand-in photos, e.g. "Unsplash". */
  credit?: string;
  /** Set only for real photos, once the client has supplied one. */
  caption?: string;
  className?: string;
  /**
   * Brightness multiplier, for the rare photo that carries something on top
   * of it. `1` (the default) leaves the photo alone — that is the right
   * answer almost everywhere, and deliberately so: this replaced a boolean
   * `dark` prop that dimmed to 0.55, which the client twice flagged as
   * hiding the photo. Reach for a gentle value like 0.85, not a heavy one.
   */
  dim?: number;
  /** Smaller label, for thumbnail-sized uses (e.g. one per menu category). */
  compact?: boolean;
  /** Slight corner radius — most of the site stays hard-edged; opt in per use. */
  rounded?: boolean;
  /**
   * Crop in tighter than a plain centered object-cover would, e.g. `1.2`
   * for 20% — for photos with a lot of empty background around the
   * subject relative to their container. Applied via the legacy
   * `transform` property, deliberately not Tailwind's `scale` utility:
   * Tailwind v4's `scale-*` classes set the native CSS `scale` property,
   * which the hover zoom below also uses — two rules fighting over the
   * same property would just override, not multiply. `transform` and
   * `scale` are independent CSS properties that compose, so this base
   * crop and the hover bump stack correctly instead of one replacing
   * the other.
   */
  zoom?: number;
  /** Optional content positioned above the photo (and its scrim). */
  children?: ReactNode;
}) {
  const label = credit ? `Temp stock — ${credit}` : caption;

  return (
    <div className={`group relative overflow-hidden ${rounded ? "rounded-lg" : ""} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element --
          Deliberately plain <img>, for both the remaining Unsplash stand-ins
          and the real photos: mixing next/image's remote-pattern config for
          the former with local optimization for the latter isn't worth the
          complexity while both still coexist here. Revisit once every photo
          on the page is real and self-hosted. */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          ...(dim !== 1 ? { filter: `brightness(${dim})` } : null),
          ...(zoom !== 1 ? { transform: `scale(${zoom})` } : null),
        }}
      />
      {children}
      {label ? (
        <span
          className={
            compact
              ? "absolute bottom-0 left-0 m-1.5 px-1 py-0.5 text-[8px] uppercase tracking-[0.1em]"
              : "absolute bottom-0 left-0 m-3 px-2 py-1 text-[10px] uppercase tracking-[0.15em] sm:m-4"
          }
          style={{ background: "var(--ink)", color: "var(--ground-alt)" }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
