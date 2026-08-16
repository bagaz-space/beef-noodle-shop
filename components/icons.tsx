/**
 * Hand-rolled line icons. No icon library is installed — a handful of
 * glyphs don't justify the dependency. Stroke weight ~1.5px.
 */

type IconProps = { className?: string };

const strokeProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MenuIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} className={className} aria-hidden="true">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} className={className} aria-hidden="true">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <polyline points="12 7.5 12 12 15.5 14" />
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} className={className} aria-hidden="true">
      <path d="M12 21s-6.5-6.1-6.5-11A6.5 6.5 0 0 1 18.5 10c0 4.9-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.25" />
    </svg>
  );
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} className={className} aria-hidden="true">
      <path d="M6.5 8h11l.9 12a1.5 1.5 0 0 1-1.5 1.6H7.1A1.5 1.5 0 0 1 5.6 20L6.5 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );
}
