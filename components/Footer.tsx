import Link from "next/link";
import { brand, delivery, labels, menu, nav, outlet } from "@/lib/content";
import { DiamondGrid } from "./DiamondGrid";

export function Footer() {
  return (
    <footer id="visit" className="py-16 sm:py-24" style={{ borderTop: "1px solid var(--line)" }}>
      <p className="text-2xl font-black uppercase tracking-tight" style={{ color: "var(--ink)" }}>
        {nav.visit}
      </p>

      <div className="mt-14 text-left lg:text-center">
        <p
          className="text-4xl font-black uppercase leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          style={{ color: "var(--ink)" }}
        >
          {brand.name}
        </p>
        <p
          className="mt-4 text-xl font-black uppercase leading-tight tracking-tight sm:text-2xl"
          style={{ color: "var(--ink-muted)" }}
        >
          {outlet.name}
        </p>
      </div>

      <div className="mt-16 grid gap-12 sm:grid-cols-3">
        <DiamondGrid className="self-end" />

        <div>
          <p className="text-sm uppercase tracking-tight" style={{ color: "var(--ink)" }}>
            {nav.menu}
          </p>
          <div className="mt-6 space-y-3 text-xs uppercase tracking-tight">
            {menu.map((section) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className="block hover:opacity-70"
                style={{ color: "var(--ink-muted)" }}
              >
                {section.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-tight" style={{ color: "var(--ink)" }}>
            {labels.delivery}
          </p>
          <div className="mt-6 space-y-3 text-xs uppercase tracking-tight">
            {delivery.map((d) => (
              <a
                key={d.name}
                href={d.url}
                className="block hover:opacity-70"
                style={{ color: "var(--ink-muted)" }}
              >
                {d.name}
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs uppercase tracking-tight" style={{ color: "var(--ink-muted)" }}>
            {outlet.unit}, {outlet.name}
          </p>
        </div>
      </div>

      <p
        className="mt-16 text-xs uppercase tracking-[0.15em]"
        style={{ color: "var(--ink-muted)" }}
      >
        {brand.crewLines.join(" · ")}
      </p>
    </footer>
  );
}
