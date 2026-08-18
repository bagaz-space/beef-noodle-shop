import type { ReactElement } from "react";
import Link from "next/link";
import { brand, contact, delivery, labels, menu, nav, outlet } from "@/lib/content";
import { Character } from "./Character";
import { DiamondGrid } from "./DiamondGrid";
import { FacebookLogo, GmailLogo, InstagramLogo, WhatsAppLogo } from "./icons";

/*
 * Real platform logos, so the eye reads it as a row of channels rather than
 * another line of text — kept out of lib/content.ts since it's a
 * presentation choice, not restaurant content (same reasoning as
 * lib/menuPhotos.ts).
 */
const CONTACT_ICONS: Record<string, (props: { className?: string }) => ReactElement> = {
  Email: GmailLogo,
  WhatsApp: WhatsAppLogo,
  Instagram: InstagramLogo,
  Facebook: FacebookLogo,
};

export function Footer() {
  return (
    <footer id="visit" className="py-12 sm:py-24" style={{ borderTop: "1px solid var(--line)" }}>
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

      <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-start justify-end gap-8">
          <Character name="noodle-wrap" className="w-28 sm:w-40" />
          <DiamondGrid />
        </div>

        <div>
          <p className="text-sm uppercase tracking-tight" style={{ color: "var(--ink)" }}>
            {nav.menu}
          </p>
          <div className="mt-6 space-y-3 text-xs uppercase tracking-tight">
            {menu.map((section) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className="block transition-opacity duration-200 hover:opacity-70"
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
                className="block transition-opacity duration-200 hover:opacity-70"
                style={{ color: "var(--ink-muted)" }}
              >
                {d.name}
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs uppercase tracking-tight" style={{ color: "var(--ink-muted)" }}>
            {outlet.unit}, {outlet.name}
            <br />
            {outlet.address}
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-tight" style={{ color: "var(--ink)" }}>
            {labels.contact}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {contact.map((c) => {
              const Icon = CONTACT_ICONS[c.name];
              return (
                <a
                  key={c.name}
                  href={c.url}
                  aria-label={c.name}
                  title={c.name}
                  className="grid size-11 place-items-center rounded-full border transition-opacity duration-200 hover:opacity-70"
                  style={{ borderColor: "var(--line)", color: "var(--ink)" }}
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>
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
