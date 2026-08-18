import { menu, nav } from "@/lib/content";
import { Character } from "./Character";
import { MenuCategory } from "./MenuCategory";

export function MenuList() {
  return (
    <section id="menu" className="py-16 sm:py-24">
      {/* One character for the whole section, not one per category. The
          eleven are all cow, noodle and bowl — nothing among them reads as
          rice, greens or shaved ice, so per-category would have meant three
          arbitrary cows padding out slots. */}
      <div className="flex items-center gap-5">
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--ink-muted)" }}>
          {nav.menu}
        </p>
        <Character name="bowl" className="w-24 sm:w-32 lg:w-36" />
      </div>

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
