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
  dark = false,
  compact = false,
  scrimTop = false,
  rounded = false,
  children,
}: {
  src: string;
  alt: string;
  /** Set only for temporary stand-in photos, e.g. "Unsplash". */
  credit?: string;
  /** Set only for real photos, once the client has supplied one. */
  caption?: string;
  className?: string;
  dark?: boolean;
  /** Smaller label, for thumbnail-sized uses (e.g. one per menu category). */
  compact?: boolean;
  /** Dark top-down gradient, for text overlaid near the top of the photo. */
  scrimTop?: boolean;
  /** Slight corner radius — most of the site stays hard-edged; opt in per use. */
  rounded?: boolean;
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
        style={dark ? { filter: "brightness(0.55) saturate(0.9)" } : undefined}
      />
      {scrimTop ? (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-2/3"
          style={{ background: "linear-gradient(to top, transparent, rgba(0,0,0,0.6))" }}
        />
      ) : null}
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
