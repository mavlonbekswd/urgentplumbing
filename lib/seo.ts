import type { Metadata } from "next";
import { business } from "@/data/business";
import { towns } from "@/data/locations";
import type { Faq, Service } from "@/data/services";

// ─────────────────────────────────────────────────────────────────────────────
// Metadata and structured data helpers.
//
// Structured data only states facts from data/business.ts. There is no aggregateRating,
// review, geo, street address, opening hours or sameAs here, because none of those are
// verified. If they're confirmed later, add them to data/business.ts first.
// ─────────────────────────────────────────────────────────────────────────────

export const BUSINESS_ID = `${business.url}/#business`;

// A page-level openGraph object replaces the root one rather than merging with it, so the
// generated share image (app/opengraph-image.tsx) is attached explicitly to every page.
const SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${business.name} — local plumbing and drainage for homes and businesses`,
};
export const WEBSITE_ID = `${business.url}/#website`;

/** Per-page metadata with a self-referencing canonical, Open Graph and Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  noindex = false,
}: {
  title: string;
  description: string;
  /** Leading slash, e.g. "/services". Use "/" for home. */
  path: string;
  absoluteTitle?: boolean;
  noindex?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${business.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: business.name,
      url: path,
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/** The business itself. Only verified facts. */
export function businessSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": BUSINESS_ID,
    name: business.name,
    url: business.url,
    logo: `${business.url}/brand/logo.png`,
    image: `${business.url}/brand/logo.png`,
    telephone: business.phone.e164,
    email: business.email.address,
    description: `Plumbing and drainage repairs for homes and businesses in ${business.base.town} and nearby towns.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: business.base.town,
      addressRegion: business.base.county,
      addressCountry: "GB",
    },
    areaServed: towns.map((t) => ({ "@type": "City", name: t.name })),
  };
  if (business.legalName) schema.legalName = business.legalName;
  if (business.socialProfiles.length > 0) schema.sameAs = business.socialProfiles;
  return schema;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: business.url,
    name: business.name,
    inLanguage: "en-GB",
    publisher: { "@id": BUSINESS_ID },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.schemaServiceType,
    description: service.metaDescription,
    url: `${business.url}/services/${service.slug}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: towns.map((t) => ({ "@type": "City", name: t.name })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export interface Crumb {
  name: string;
  href: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${business.url}${c.href === "/" ? "/" : c.href}`,
    })),
  };
}
