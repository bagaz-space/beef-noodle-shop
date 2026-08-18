import { menu, nav } from "@/lib/content";
import { MenuCategory } from "./MenuCategory";

export function MenuList() {
  return (
    <section id="menu" className="py-16 sm:py-24">
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--ink-muted)" }}>
        {nav.menu}
      </p>

      {/* Wider gaps than the old photo-background bands needed: these are airy
          text-and-photo spreads now, and would run together at the old spacing. */}
      <div className="mt-10 space-y-16 sm:space-y-24">
        {menu.map((section, i) => (
          <MenuCategory
            key={section.id}
            section={section}
            index={i + 1}
            total={menu.length}
          />
        ))}
      </div>
    </section>
  );
}
