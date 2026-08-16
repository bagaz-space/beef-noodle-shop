import type { ReactNode } from "react";

/**
 * A real (temporary) photo standing in for commissioned photography. This is
 * explicitly NOT final art: a small on-page label makes that impossible to
 * miss or ship by accident. Swap `src` for a real photo (or `next/image`)
 * later; nothing else about the layout needs to change.
 */
export function Photo({
  src,
  alt,
  credit,
  className = "",
  dark = false,
  compact = false,
  scrimTop = false,
  rounded = false,
  children,
}: {
  src: string;
  alt: string;
  credit: string;
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
  return (
    <div className={`relative overflow-hidden ${rounded ? "rounded-lg" : ""} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element --
          Deliberately plain <img>: these are temporary external Unsplash
          URLs (see the label below), so next/image would need remotePatterns
          configured for a host we're about to stop using anyway. Switch to
          next/image once real, self-hosted photography lands in public/. */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
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
      <span
        className={
          compact
            ? "absolute bottom-0 left-0 m-1.5 px-1 py-0.5 text-[8px] uppercase tracking-[0.1em]"
            : "absolute bottom-0 left-0 m-3 px-2 py-1 text-[10px] uppercase tracking-[0.15em] sm:m-4"
        }
        style={{ background: "var(--ink)", color: "var(--ground-alt)" }}
      >
        Temp stock — {credit}
      </span>
    </div>
  );
}
