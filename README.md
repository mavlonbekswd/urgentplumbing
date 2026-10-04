# Urgent Plumbing & Drainage — website

The website for Urgent Plumbing & Drainage, a plumbing and drainage business based in Cambridge.
Live at [urgentplumbing.uk](https://urgentplumbing.uk).

Built with Next.js (App Router), TypeScript and Tailwind CSS. Every page is generated as static
HTML at build time, so it's fast and cheap to host.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run typecheck    # TypeScript
npm run build        # production build
npm test             # Playwright suite (builds and serves the site itself)
npm run check        # all three
```

Node 20.9 or newer (22 recommended — see `.nvmrc`). The first `npm test` on a new machine needs
`npx playwright install chromium`. The test build uses Ofcom's reserved fictional number
07700 900123 as a stand-in WhatsApp number so every WhatsApp placement is exercised.

## Changing business details

**Everything customer-facing lives in `data/`.** You shouldn't need to touch a component to update
the site.

| File | What's in it |
| --- | --- |
| `data/business.ts` | Name, phone, **WhatsApp**, email, domain, base town, form endpoint, and the fields still to be confirmed (legal name, company number, guarantee period, accreditations, social profiles) |
| `data/services.ts` | Every service page: copy, FAQs, related services. Add a service here and it appears in the menu, footer, sitemap, contact form and structured data |
| `data/locations.ts` | Towns covered, with their county and approximate coordinates, plus the direction groups (north, north-east, east, south, west) used on Areas We Cover |
| `data/faqs.ts` | Home page and contact page FAQs |
| `data/content.ts` | Shared "how we work" points, the how-it-works steps and emergency steps |
| `data/images.ts` | Image slots (see below) |
| `data/team.ts` | Team members — the About page shows a team section only once this has entries |
| `data/navigation.ts` | Menu order, footer links, and the list of routes used by the sitemap |

Change the phone number once in `data/business.ts` and every call button, `tel:` link, footer,
schema block and the share image update with it.

## WhatsApp

WhatsApp is wired into the hero, the mobile action bar, the contact page, every service page, the
closing call-to-action and the footer — but it **stays hidden until a number is set**, so the site
never shows a dead button. Set `WHATSAPP_NUMBER` at the top of `data/business.ts` (international
format, digits only: a mobile `07700 900123` becomes `447700900123`), or set the
`NEXT_PUBLIC_WHATSAPP_NUMBER` environment variable on the host. Chats open with the pre-filled
message "Hi Urgent Plumbing, I need help with a plumbing issue."

Contact options follow one order everywhere: **call** for anything urgent, **WhatsApp** for a quick
message or photo, **enquiry form** for quotes and jobs that can wait.

## Trust and claims policy

This site deliberately makes **no claims that can't be evidenced**: no review counts, ratings,
years in business, response times, accreditations or "100% satisfaction". The structured data
(JSON-LD) only contains verified facts — name, phone, email, URL, logo, base town and the towns
covered.

Fields in `data/business.ts` marked `TODO: BUSINESS OWNER TO CONFIRM` stay hidden until they're
filled in. `tests/seo.spec.ts` fails the build if old unverified claims (e.g. "licensed",
"same-day", star ratings) reappear in page text or structured data.

## Images

No stock or AI-generated photos are used. Each place a real photo can go is an **image slot** that
renders nothing until a photo is supplied, so no placeholder art competes with the contact options.

1. Put the photo in `public/images/`
2. Set its `src` in `data/images.ts` and write a specific `alt`

The photo then appears wherever that slot is used (each slot's comment says where). Rendered photos
carry a `data-image-slot="…"` attribute. `data/images.ts` lists what each photo should show and the
recommended size.

## Contact form

There is one enquiry form component (`components/sections/EnquiryForm.tsx`) in three layouts: the
home page hero (name, phone, postcode, service, optional message), the contact page (the same plus
optional email) and the Areas page postcode check (postcode and phone). Email is never required.

Every form posts to [FormSubmit](https://formsubmit.co) at the business inbox — the same service the
previous site used, so the existing activation carries over. With JavaScript it submits in-page
(validation, loading, success and error states); without JavaScript it falls back to a normal POST
and FormSubmit redirects to `/thank-you`. Spam protection is FormSubmit's `_honey` honeypot field.

After deploying, send one real test message to confirm delivery. If FormSubmit asks to activate
the AJAX endpoint, click the link in the email it sends to the inbox.

## Structure

```
app/                     Routes (each folder is a URL)
  page.tsx               /
  services/page.tsx      /services
  services/[slug]/       /services/<service> (generated from data/services.ts)
  guarantee/ areas-we-cover/ about/ contact/ privacy/ terms/ thank-you/
  not-found.tsx          404
  sitemap.ts robots.ts   /sitemap.xml, /robots.txt
  opengraph-image.tsx    Generated share image (logo + business details)
components/
  layout/                Header, DesktopNav (services dropdown), MobileNav, MobileCallBar, Footer, Logo
  sections/              Page sections: EnquiryForm, ContactCard, ServiceCard, LocationGrid, TownFinder, EmergencyBand…
  ui/                    Primitives: Button, CallButton, WhatsAppButton, Section, SectionHeading, FaqList, ImageSlot, Icon…
data/                    All content and business details
lib/seo.ts               Metadata and structured-data helpers
tests/                   Playwright tests
```

Design tokens (colours from the logo, type scale, radius, shadows) are in `app/globals.css`.
Tailwind's default colour palette is switched off, so only brand colours can be used.

Icons come from [Phosphor](https://phosphoricons.com) via `components/ui/Icon.tsx` — one family,
rendered on the server, only the icons used are bundled. Service and feature icons use the duotone
weight: navy outline with the logo's water blue as the fill.

## Deployment

Hosted on Vercel. `vercel.json` sets the framework to Next.js; no environment variables are
needed. Old URLs (`/index.html`, `/thank-you.html`) redirect permanently. Preview deployments on
`*.vercel.app` are served with `X-Robots-Tag: noindex`.
