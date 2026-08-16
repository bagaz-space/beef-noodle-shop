import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { brand, CONTENT_STATUS, outlet } from "@/lib/content";
import "./globals.css";

/*
 * One family, two weight ranges. Bound to `--font-display-src` /
 * `--font-body-src` — NOT directly to the semantic `--font-display` /
 * `--font-body` tokens `globals.css` declares — so a redeclaration in
 * globals.css can never race the class next/font puts on <html>. See the
 * comment on those tokens in globals.css.
 */
const archivoDisplay = Archivo({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-display-src",
});

const archivoBody = Archivo({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body-src",
});

export const metadata: Metadata = {
  title: `${brand.name} ${brand.chinese} — ${outlet.name}`,
  description: brand.tagline.en,
  // Flip to index once CONTENT_STATUS.placeholder (lib/content.ts) is false.
  // The menu, hours and photos on the page right now are not real yet —
  // nothing here should be showing up in search results.
  robots: CONTENT_STATUS.placeholder
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${archivoDisplay.variable} ${archivoBody.variable}`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
