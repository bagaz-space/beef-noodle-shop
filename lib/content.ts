/**
 * Restaurant content — the single source for everything the site says.
 *
 * No copy is hardcoded inside components. If a component needs a new piece
 * of text, it goes here first, so there is exactly one place to find (and
 * fix) any string on the site.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ EVERYTHING MARKED `placeholder: true` IS INVENTED.                   │
 * │ Prices, hours, unit number and delivery links are NOT from the       │
 * │ client. They exist so layouts have realistic shapes to hold.         │
 * │ Do not show these numbers to the client as if they were real.        │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * Source of the real values: The-Beef-Noodle-Shop-Brand-Brief-1.docx
 * (see docs/01-brief.md for what the brief does and does not specify).
 *
 * Ported from the "Terang" direction of the noodle-shop-samples comparison
 * repo — the direction the client picked for production. That repo compared
 * three directions off one shared content file; this one only ever renders
 * one design, but the same discipline (content has no idea which layout
 * it's rendered by) is still worth keeping.
 */

export const CONTENT_STATUS = {
  /** Flip to false once the client supplies real menu, prices and hours. */
  placeholder: true,
  lastReviewed: "2026-08-16",
} as const;

/* ── Brand ───────────────────────────────────────────────────────────── */

export const brand = {
  name: "The Beef Noodle Shop",
  /**
   * Simplified Chinese, matching the client's real logo lock-up (the
   * "Opening this August" promo flyer) — not Traditional. See
   * docs/01-brief.md and docs/02-desain.md: this reverses an earlier
   * assumption made before any real client material existed.
   */
  chinese: "牛肉面馆",
  tagline: {
    en: "Good food, better mood.",
    zh: "好味道，好心情。",
  },
  /** Crew t-shirt lines already developed by the client. Real, from the brief. */
  crewLines: ["Just Slurp It.", "On A Noodle Roll."],
  /**
   * Brand personality, from the brief's "Kepribadian merek" section
   * (docs/01-brief.md) — drafted there in Indonesian, normalized to English
   * here to match the register the rest of this file already uses.
   */
  personality:
    "Fun, energetic, and modern — but rooted in tradition. Warm and bold, never loud. Simple and clean, but never cold.",
  /**
   * Non-halal. In Malaysia this is not a footnote — it sets expectations and
   * defines the addressable audience. Every page must state it calmly and
   * early, never buried in a footer.
   */
  dietary: "Non-halal",
} as const;

/* ── Outlet ──────────────────────────────────────────────────────────── */

export const outlet = {
  name: "Paradigm Mall, Petaling Jaya",
  /** Real — from the client's "Opening this August" promo flyer. */
  unit: "Unit 2F-17, Level 2",
  /** Real — full street address, same source as `unit`. */
  address: "No 1, Jalan SS 7/26a, SS 7, 47301 Petaling Jaya, Selangor",
  city: "Petaling Jaya, Selangor",
  country: "Malaysia",
  seats: 30,
  openedOn: "2026-08-01",
  /** PLACEHOLDER — mall hours assumed, not confirmed. */
  hours: [
    { days: "Monday – Friday", open: "11:00", close: "22:00" },
    { days: "Saturday – Sunday", open: "10:00", close: "22:00" },
  ],
} as const;

/** PLACEHOLDER links — real deep links must come from the client's merchant accounts. */
export const delivery = [
  { name: "GrabFood", url: "#" },
  { name: "ShopeeFood", url: "#" },
  { name: "Foodpanda", url: "#" },
] as const;

/** Real — from the client's promo flyer (email) and WhatsApp number. */
export const contact = [
  { name: "Email", url: "mailto:beef.noodle.shop@gmail.com" },
  { name: "WhatsApp", url: "https://wa.me/60124801208" },
  { name: "Instagram", url: "https://www.instagram.com/thebeefnoodleshop/" },
  { name: "Facebook", url: "https://www.facebook.com/people/The-Beef-Noodle-Shop/61590138886453/" },
] as const;

/**
 * Real — the client's own promo/announcement copy ("Opening this August"
 * flyer), used verbatim. Deliberately NOT part of `story`: this is
 * marketing copy answering "what is this place, why visit" — not the
 * business's history. Used both as the site's meta description
 * (app/layout.tsx) and as visible copy in the Welcome section
 * (components/Welcome.tsx), right after the hero and before Story.
 */
export const intro =
  "Looking for a new restaurant in Petaling Jaya or wondering where to eat in PJ or Kuala Lumpur? Whether you're planning lunch, tea time or dinner, The Beef Noodle Shop offers a warm, welcoming place to gather with family and friends. Inspired by over 40 years of Taiwanese family tradition, we're bringing comforting, hearty meals to Paradigm Mall PJ.";

/* ── Navigation & labels ─────────────────────────────────────────────── */

export const nav = {
  home: "Home",
  story: "Story",
  menu: "Menu",
  visit: "Visit",
  /** Approved CTA wording, deliberately Malay. */
  order: "Pesan",
} as const;

/** Eyebrow words for data blocks that don't carry their own caption. */
export const labels = {
  hours: "Hours",
  location: "Location",
  delivery: "Delivery",
  dietary: "Dietary",
  /** Footer column eyebrow for the contact/social links. */
  contact: "Contact",
  /** Section eyebrow for the small set of dishes highlighted on the page. */
  signature: "Signature",
  /** Eyebrow for the Welcome section, right after the hero. */
  welcome: "Welcome",
} as const;

/** Formats an opening date into a short label, e.g. "Open since Aug 2026". */
export function openedLabel(isoDate: string): string {
  const formatted = new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  return `Open since ${formatted}`;
}

/* ── Story ───────────────────────────────────────────────────────────── */

/**
 * Drawn from the brief's section 2. The pull quote is the client's own words.
 *
 * Copy here is customer-facing and therefore ENGLISH — the site serves diners in
 * PJ/KL, where English is the working language. Traditional Chinese appears as a
 * heritage signal (see docs/01-brief.md), never as a parallel translation.
 */
export const story = {
  era: "1980s",
  pullQuote:
    "We didn't invent this recipe for a trend cycle. We inherited it, and we're not cutting corners on it.",
  beats: [
    "In the 1980s, our founder's parents ran a beef noodle shop. The broth had already been simmering for hours before the door was unlocked.",
    "Regulars never needed to look at the menu.",
    "This shop is the continuation. The same care, the same standards, updated for how people eat today.",
  ],
  sourcing: ["Australian beef", "Australian soup bone", "Quality pork"],
  /**
   * Real — the client's own long-form story copy, supplied directly (not
   * from the original brief, and not the flyer's `intro` marketing copy
   * either — see that field's comment for why the two stay separate).
   * Rendered by components/Values.tsx. Split into paragraphs here purely
   * for the multi-column layout; no wording was added or removed.
   */
  narrative: [
    "Before our doors even open for the morning rush, our broth is already simmering on the stove—just as it did in the 1980s when our founder's parents ran their original beef noodle shop. That shop wasn't built on passing food trends; it was built on patience, authentic Taiwanese recipes, and a dedication to quality ingredients like premium Australian beef and rich soup bones.",
    "Decades later, The Beef Noodle Shop exists to continue that legacy. We didn't create our recipe for a trend cycle—we inherited it, bringing the same care and standards into a modern, welcoming space.",
    "From our slow-simmered beef noodle soup and savoury Lu Rou Fan to crisp pork chop rice and refreshing plum ice, every dish is crafted to nourish both body and mind.",
    "Whether you are gathering with family, taking a break from work, or dining solo, we offer high quality, honest comfort food at a price that feels right.",
    "Built on the simple belief that good food brings a better mood, we invite you to pull up a seat, savor the warmth of a genuine family tradition, and enjoy the proper bowl of Taiwanese beef noodles you deserve.",
    "Good food, better mood — 好味道，好心情 — isn't a slogan dreamed up for a signboard. It's what the people behind this counter actually believe, crew t-shirts and all: just slurp it, get back on the noodle roll, and let the bowl do the talking. The plan is more rooms like this one — but the broth starts the same way in every single one.",
  ],
} as const;

/* ── Menu ────────────────────────────────────────────────────────────── */

export interface MenuItem {
  name: string;
  chinese: string;
  description: string;
  /** PLACEHOLDER price in MYR. */
  price: number;
}

export interface MenuSection {
  id: string;
  name: string;
  chinese: string;
  items: MenuItem[];
}

/** Categories are real (brief section 1). Item names, copy and prices are PLACEHOLDER. */
export const menu: MenuSection[] = [
  {
    id: "beef-noodles",
    name: "Beef Noodles",
    chinese: "牛肉面",
    items: [
      {
        name: "Braised Beef Noodle Soup",
        chinese: "红烧牛肉面",
        description: "Australian beef shin, soup bone broth, hand-pulled noodles.",
        price: 24.9,
      },
      {
        name: "Clear Broth Beef Noodle",
        chinese: "清炖牛肉面",
        description: "The lighter bowl. Same bone, longer simmer, less soy.",
        price: 24.9,
      },
      {
        name: "Beef Tendon Noodle",
        chinese: "牛筋面",
        description: "Tendon braised until it gives way completely.",
        price: 27.9,
      },
    ],
  },
  {
    id: "rice",
    name: "Rice",
    chinese: "饭类",
    items: [
      {
        name: "Lu Rou Fan",
        chinese: "卤肉饭",
        description: "Braised minced pork over rice, soft egg.",
        price: 12.9,
      },
      {
        name: "Pork Chop Rice",
        chinese: "排骨饭",
        description: "Marinated pork chop, pickled greens, rice.",
        price: 18.9,
      },
    ],
  },
  {
    id: "sides",
    name: "Sides",
    chinese: "小菜",
    items: [
      /**
       * Real — name, description and photo all sourced from the client's
       * own Instagram post (@thebeefnoodleshop, "Vegetables! Every great
       * bowl needs balance..."). Chinese name and price are still
       * PLACEHOLDER like the rest of this array — the post didn't include
       * either (刈包 was the old Gua Bao placeholder's Chinese name, wrong
       * for this dish — replaced).
       */
      {
        name: "Vegetables",
        chinese: "蒜香油菜",
        description: "Fresh greens, lightly cooked and topped with fragrant garlic oil.",
        price: 9.9,
      },
    ],
  },
  {
    id: "sweet",
    name: "Sweet & Drinks",
    chinese: "甜品・饮料",
    items: [
      {
        name: "Shaved Plum Dessert",
        chinese: "剉冰",
        description: "Seasonal fruit, condensed milk.",
        price: 13.9,
      },
      {
        name: "Plum Drink",
        chinese: "酸梅汤",
        description: "Sweet, Tangy, Refreshing.",
        price: 7.9,
      },
    ],
  },
];

/** Formats MYR the way it is written in Malaysia. Not currently rendered on
 * the page (the client asked for the menu to read as a menu, not a price
 * list) — kept for delivery-app listings and any printed menu. */
export function price(value: number): string {
  return `RM ${value.toFixed(2)}`;
}
