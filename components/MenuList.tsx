import { menu, nav } from "@/lib/content";
import { CATEGORY_PHOTOS } from "@/lib/menuPhotos";
import { MenuCategory } from "./MenuCategory";

export function MenuList() {
  return (
    <section id="menu" className="py-16 sm:py-24">
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--ink-muted)" }}>
        {nav.menu}
      </p>

      <div className="mt-8 space-y-6">
        {menu.map((section, i) => (
          <MenuCategory
            key={section.id}
            section={section}
            index={i + 1}
            total={menu.length}
            photo={CATEGORY_PHOTOS[section.id]}
          />
        ))}
      </div>
    </section>
  );
}
