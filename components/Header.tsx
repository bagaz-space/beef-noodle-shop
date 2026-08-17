"use client";

import { useState } from "react";
import Link from "next/link";
import { brand, nav, outlet } from "@/lib/content";
import { CloseIcon, MenuIcon } from "./icons";

const NAV_LINKS: Array<[label: string, href: string]> = [
  [nav.home, "#home"],
  [nav.story, "#story"],
  [nav.menu, "#menu"],
  [nav.visit, "#visit"],
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      {/* Non-halal is stated here, early and calmly — never buried in the footer. */}
      <div
        className="flex items-center justify-between gap-4 border-b py-2 text-[11px] uppercase tracking-[0.15em] sm:text-xs"
        style={{ borderColor: "var(--line)", color: "var(--ink-muted)" }}
      >
        <span>{brand.dietary}</span>
        <span>{outlet.city}</span>
      </div>

      <div className="flex items-center justify-between py-6 sm:py-8">
        <Link href="#home" className="text-sm uppercase tracking-tight" style={{ color: "var(--ink)" }}>
          {brand.name}
        </Link>

        <nav
          className="hidden items-center gap-9 text-xs uppercase tracking-tight md:flex"
          style={{ color: "var(--ink)" }}
        >
          {NAV_LINKS.map(([label, href]) => (
            <Link key={href} href={href} className="transition-opacity duration-200 hover:opacity-70">
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-full border md:hidden"
          style={{ borderColor: "var(--line)", color: "var(--ink)" }}
        >
          {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav
          className="flex flex-col gap-1 border-b pb-6 text-sm uppercase tracking-tight md:hidden"
          style={{ borderColor: "var(--line)", color: "var(--ink)" }}
        >
          {NAV_LINKS.map(([label, href]) => (
            <Link key={href} href={href} className="py-2" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
