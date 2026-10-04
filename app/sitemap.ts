import type { MetadataRoute } from "next";
import { business, CONTENT_LAST_UPDATED } from "@/data/business";
import { staticRoutes } from "@/data/navigation";
import { services, serviceHref } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_LAST_UPDATED);
  const pages = [...staticRoutes, ...services.map((s) => serviceHref(s.slug))];
  return pages.map((path) => ({
    url: `${business.url}${path === "/" ? "/" : path}`,
    lastModified,
  }));
}
