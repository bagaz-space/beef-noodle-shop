/**
 * One reference photo per menu category, shared by every component that
 * shows a dish — kept here, not in `content.ts`, since these are
 * implementation-detail URLs (which photo, at what crop), not restaurant
 * content.
 *
 * `credit` set means it's still a temporary Unsplash stand-in (renders
 * "Temp stock — {credit}", impossible to ship by accident — see
 * components/Photo.tsx). No `credit` means it's a real photo from the
 * client; `caption` on those is optional and still pending for all three —
 * add it as soon as the client sends one, don't invent it.
 */
export const CATEGORY_PHOTOS: Record<
  string,
  { src: string; alt: string; credit?: string; caption?: string }
> = {
  "beef-noodles": {
    src: "/menu/beef-brisket.jpg",
    alt: "Spicy braised Australian beef brisket noodle soup",
    // caption: pending from the client
  },
  rice: {
    src: "/menu/lu-rou-fan.jpg",
    alt: "Lu Rou Fan — braised minced pork over rice",
    // caption: pending from the client
  },
  sides: {
    src: "https://images.unsplash.com/photo-1781785164696-0154e4dd70c1?auto=format&fit=crop&w=1800&q=80",
    alt: "Reference: steamed gua bao bun with pork belly — stand-in for the shop's own bao",
    credit: "Unsplash",
  },
  sweet: {
    src: "/menu/plum-dessert.jpg",
    alt: "Plum-syrup shaved ice dessert",
    // caption: pending from the client
  },
};
