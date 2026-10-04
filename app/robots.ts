import type { MetadataRoute } from "next";
import { business } from "@/data/business";

// Everything is crawlable. The thank-you page is kept out of search with a noindex meta tag
// rather than a Disallow, so crawlers can actually see that instruction.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${business.url}/sitemap.xml`,
  };
}
