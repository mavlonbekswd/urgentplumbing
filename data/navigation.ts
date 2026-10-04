import { services, serviceHref } from "./services";

export interface NavLink {
  href: string;
  label: string;
}

/** Desktop and mobile primary navigation. "Services" is rendered as a dropdown from `serviceLinks`. */
export const primaryNav: (NavLink & { hasDropdown?: boolean })[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/guarantee", label: "Guarantee" },
  { href: "/areas-we-cover", label: "Areas We Cover" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const serviceLinks: (NavLink & { description: string; icon: (typeof services)[number]["icon"] })[] =
  services.map((s) => ({
    href: serviceHref(s.slug),
    label: s.navLabel,
    description: s.menuLine,
    icon: s.icon,
  }));

export const companyLinks: NavLink[] = [
  { href: "/about", label: "About us" },
  { href: "/our-work", label: "Our work" },
  { href: "/guarantee", label: "Our guarantee" },
  { href: "/areas-we-cover", label: "Areas we cover" },
  { href: "/contact", label: "Contact" },
  { href: "/contact#enquiry", label: "Send an enquiry" },
];

export const legalLinks: NavLink[] = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of use" },
];

/** Every indexable route, used by the sitemap and the route tests. */
export const staticRoutes = [
  "/",
  "/services",
  "/guarantee",
  "/areas-we-cover",
  "/about",
  "/our-work",
  "/contact",
  "/privacy",
  "/terms",
] as const;
