/**
 * One photo per menu item, keyed by the item's `name` in lib/content.ts.
 * Kept here rather than in content.ts because which photo, at what crop, is
 * an implementation detail — not restaurant content.
 *
 * The key is the item name, which makes renaming an item in content.ts a
 * two-file change. That's the deliberate trade for keeping content and
 * presentation apart: a missing key is not an error, it just means that item
 * has no photo yet, and `photosFor()` below silently drops it. Adding the
 * photo later brings the item back into the carousel with no code change.
 *
 * `credit` set means a temporary stand-in (renders "Temp stock — {credit}",
 * impossible to ship by accident — see components/Photo.tsx). No `credit`
 * means it's a real photo from the client.
 */
export interface ItemPhoto {
  src: string;
  alt: string;
  credit?: string;
  caption?: string;
}

export const ITEM_PHOTOS: Record<string, ItemPhoto> = {
  "Braised Beef Noodle Soup": {
    src: "/menu/beef-brisket.jpg",
    alt: "Spicy braised Australian beef brisket noodle soup",
    caption: "Bold flavour. Deep spice. Tender beef.",
  },
  // "Clear Broth Beef Noodle": no photo yet — the item is simply skipped in
  // the carousel until one lands here.
  "Beef Tendon Noodle": {
    src: "/menu/beef-tendon-noodle-soup.jpg",
    alt: "Beef tendon noodle soup with coriander and sliced beef",
  },
  "Lu Rou Fan": {
    src: "/menu/lu-rou-fan.jpg",
    alt: "Lu Rou Fan — braised minced pork over rice",
    caption: "A Taiwanese classic done right.",
  },
  "Pork Chop Rice": {
    src: "/menu/pork-chop-rice.jpg",
    alt: "Crispy fried pork chop sliced over steamed rice",
  },
  Vegetables: {
    src: "/menu/vegetables.jpg",
    alt: "Lightly cooked greens topped with fragrant garlic oil",
    caption: "Every great bowl needs balance.",
  },
  "Crispy Pork Chop": {
    src: "/menu/crispy-pork-chop.jpg",
    alt: "Crispy fried pork chop held with chopsticks, steaming hot",
    caption: "Crispy. Juicy. Golden.",
  },
  "Shaved Plum Dessert": {
    src: "/menu/plum-dessert.jpg",
    alt: "Plum-syrup shaved ice dessert",
    caption: "Cool down the Taiwanese way.",
  },
  "Plum Drink": {
    src: "/menu/plum-drink.jpg",
    alt: "Iced plum drink in a branded Beef Noodle Shop cup",
  },
};

/**
 * The photos for a list of items, in menu order, each still carrying the
 * index of the item it belongs to — that index is what lets the carousel
 * highlight the right name. Items without a photo drop out entirely.
 */
export function photosFor(items: readonly { name: string }[]) {
  return items.flatMap((item, itemIndex) => {
    const photo = ITEM_PHOTOS[item.name];
    return photo ? [{ photo, itemIndex, name: item.name }] : [];
  });
}
