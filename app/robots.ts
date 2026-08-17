import type { MetadataRoute } from "next";
import { CONTENT_STATUS } from "@/lib/content";

/**
 * Belt and braces alongside the `robots` metadata in layout.tsx: that emits a
 * <meta> tag, this emits robots.txt, and some crawlers honour only one of the
 * two.
 *
 * Both are driven by the same flag, so there is exactly one switch to throw.
 * While CONTENT_STATUS.placeholder is true the site is a client-review
 * deployment carrying invented hours, dead delivery links and a stand-in hero
 * photo — none of which should be discoverable by someone searching for the
 * restaurant. It opens up on its own once that flag flips.
 */
export default function robots(): MetadataRoute.Robots {
  return CONTENT_STATUS.placeholder
    ? { rules: { userAgent: "*", disallow: "/" } }
    : { rules: { userAgent: "*", allow: "/" } };
}
