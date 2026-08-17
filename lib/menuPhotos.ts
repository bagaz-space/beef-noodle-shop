/**
 * One reference photo per menu category, shared by every component that
 * shows a dish — kept here, not in `content.ts`, since these are
 * implementation-detail URLs (which photo, at what crop), not restaurant
 * content.
 *
 * `credit` set means it's still a temporary Unsplash stand-in (renders
 * "Temp stock — {credit}", impossible to ship by accident — see
 * components/Photo.tsx). No `credit` means it's a real photo from the
 * client; `caption` on those is the client's own copy (see
 * konten-baru/foto/README.md for the full text each short caption is drawn
 * from). All four categories now have a real photo.
 */
export const CATEGORY_PHOTOS: Record<
  string,
  { src: string; alt: string; credit?: string; caption?: string }
> = {
  "beef-noodles": {
    src: "/menu/beef-brisket.jpg",
    alt: "Spicy braised Australian beef brisket noodle soup",
    caption: "Bold flavour. Deep spice. Tender beef.",
  },
  rice: {
    src: "/menu/lu-rou-fan.jpg",
    alt: "Lu Rou Fan — braised minced pork over rice",
    caption: "A Taiwanese classic done right.",
  },
  sides: {
    src: "/menu/vegetables.jpg",
    alt: "Lightly cooked greens topped with fragrant garlic oil",
    caption: "Every great bowl needs balance.",
  },
  sweet: {
    src: "/menu/plum-dessert.jpg",
    alt: "Plum-syrup shaved ice dessert",
    caption: "Cool down the Taiwanese way.",
  },
};
