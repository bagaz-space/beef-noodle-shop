import type { ReactNode } from "react";
import { brand, delivery, labels, openedLabel, outlet } from "@/lib/content";
import { BagIcon, ClockIcon, MapPinIcon } from "./icons";

export function InfoStrip() {
  return (
    <section
      className="grid gap-8 border-y py-10 sm:grid-cols-2 lg:grid-cols-4"
      style={{ borderColor: "var(--line)" }}
    >
      <InfoBlock icon={<ClockIcon className="size-5" />} label={labels.hours}>
        {outlet.hours.map((h) => (
          <p key={h.days}>
            {h.days}
            <br />
            {h.open} – {h.close}
          </p>
        ))}
      </InfoBlock>

      <InfoBlock icon={<MapPinIcon className="size-5" />} label={labels.location}>
        <p>
          {outlet.name}
          <br />
          {outlet.unit}
        </p>
      </InfoBlock>

      <InfoBlock icon={<BagIcon className="size-5" />} label={labels.delivery}>
        <p>{delivery.map((d) => d.name).join(" · ")}</p>
      </InfoBlock>

      <InfoBlock label={labels.dietary}>
        <p>
          {brand.dietary}
          <br />
          {openedLabel(outlet.openedOn)}
        </p>
      </InfoBlock>
    </section>
  );
}

function InfoBlock({
  icon,
  label,
  children,
}: {
  icon?: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4">
      {icon ? (
        <span className="mt-1 shrink-0" style={{ color: "var(--accent)" }} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <div>
        <p className="text-xs uppercase tracking-tight" style={{ color: "var(--ink-muted)" }}>
          {label}
        </p>
        <div className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
