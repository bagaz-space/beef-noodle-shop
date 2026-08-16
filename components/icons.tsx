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

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} className={className} aria-hidden="true">
      <path d="M12 3.5c-4.7 0-8.5 3.7-8.5 8.3 0 1.9.6 3.6 1.7 5L4 20.5l3.9-1.2c1.3.8 2.7 1.2 4.1 1.2 4.7 0 8.5-3.7 8.5-8.3S16.7 3.5 12 3.5Z" />
      <path d="M8.7 8.9c.3-.6.6-.6.9-.6h.6c.2 0 .4 0 .6.4.2.5.6 1.5.6 1.6.1.1.1.3 0 .4-.1.2-.1.3-.3.5l-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.2 1.6 1.9 1.1 1 2 1.2 2.3 1.4.3.1.5.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.4.7c.2.1.4.2.4.4 0 .2 0 1-.4 1.4-.4.4-1.2.8-2.2.5-1.7-.4-3.4-1.4-4.7-2.7-1.1-1.1-1.9-2.4-2.3-3.3-.4-.9-.2-1.6 0-2Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14 8.5h-1.3c-1 0-1.7.7-1.7 1.7V11H14l-.4 2.3h-2.6V19" />
    </svg>
  );
}
