// ─────────────────────────────────────────────────────────────────────────────
// BUSINESS DETAILS — the one place to change contact details and business facts.
//
// Every page, the header, footer, contact form, sitemap and structured data read from
// here. Change the phone number once below and it changes everywhere.
//
// RULE: only put facts here that the business can stand behind. Anything left as `null`
// or `[]` is simply not shown on the site (and not added to structured data). Fill it in
// when it's confirmed, and the relevant parts of the site will start using it.
// ─────────────────────────────────────────────────────────────────────────────

const PHONE_DISPLAY = "01223 482425";

/** "01223 482425" → "+441223482425" */
function toE164(ukNumber: string): string {
  return `+44${ukNumber.replace(/\D/g, "").replace(/^0/, "")}`;
}

const PHONE_E164 = toE164(PHONE_DISPLAY);
const EMAIL = "Urgentplumbing01@gmail.com";

// ── WhatsApp ────────────────────────────────────────────────────────────────
// TODO: BUSINESS OWNER TO PROVIDE — the number the business uses for WhatsApp, in international
// format with digits only: 44 + the number without its leading 0. A mobile 07700 900123 becomes
// "447700900123". Do not assume the landline above is on WhatsApp.
//
// While this is empty, every WhatsApp button on the site is hidden automatically and the layout
// falls back to Call + enquiry form. Set it here (or in the NEXT_PUBLIC_WHATSAPP_NUMBER environment
// variable on the host) and WhatsApp appears in the hero, mobile action bar, contact page, service
// pages, closing call-to-action and footer.
const WHATSAPP_NUMBER: string = "";

const whatsappDigits = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || WHATSAPP_NUMBER).replace(/\D/g, "");
const WHATSAPP_MESSAGE = "Hi Urgent Plumbing, I need help with a plumbing issue.";

export const business = {
  name: "Urgent Plumbing & Drainage",
  shortName: "Urgent Plumbing",

  /** Canonical origin. No trailing slash. */
  url: "https://urgentplumbing.uk",
  domain: "urgentplumbing.uk",

  phone: {
    display: PHONE_DISPLAY,
    e164: PHONE_E164,
    href: `tel:${PHONE_E164}`,
  },

  email: {
    address: EMAIL,
    href: `mailto:${EMAIL}`,
  },

  /** null until a WhatsApp number is provided (see the note at the top of this file). */
  whatsapp: whatsappDigits
    ? {
        number: whatsappDigits,
        message: WHATSAPP_MESSAGE,
        href: `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
      }
    : null,

  /** Where the business is based. The previous site listed Cambridge as the "main base". */
  base: {
    town: "Cambridge",
    county: "Cambridgeshire",
  },

  availability: {
    /**
     * The logo and the previous website both advertise a 24/7 emergency line, so the site
     * keeps saying so. It is NOT added to structured data as opening hours.
     * TODO: BUSINESS OWNER TO CONFIRM — set to false if calls are not answered around the clock,
     * and every "24/7" mention on the site will switch to neutral wording.
     */
    emergency24x7: true,
  },

  /**
   * The contact form posts to FormSubmit (formsubmit.co), the same service and inbox the
   * previous site used, so the existing activation carries over. With JavaScript, the form
   * submits in-page via the AJAX endpoint; without it, it falls back to a normal POST and
   * FormSubmit redirects to /thank-you.
   */
  form: {
    endpoint: `https://formsubmit.co/${EMAIL}`,
    ajaxEndpoint: `https://formsubmit.co/ajax/${EMAIL}`,
  },

  // ── Not yet verified. Left empty on purpose — nothing below is shown until it's filled in. ──

  /** TODO: BUSINESS OWNER TO CONFIRM — registered company name, if trading as a limited company. */
  legalName: null as string | null,
  /** TODO: BUSINESS OWNER TO CONFIRM — Companies House number, if any. */
  companyNumber: null as string | null,
  /**
   * TODO: BUSINESS OWNER TO CONFIRM — how long the workmanship guarantee lasts, e.g. "12 months".
   * While null, the guarantee page explains the guarantee without stating a period.
   */
  guaranteePeriod: null as string | null,
  /**
   * TODO: BUSINESS OWNER TO CONFIRM — memberships or registrations you can evidence
   * (e.g. WaterSafe, CIPHE, Gas Safe number). Empty = none shown anywhere.
   */
  accreditations: [] as { name: string; reference?: string; url?: string }[],
  /** TODO: BUSINESS OWNER TO CONFIRM — public Google Business Profile link. Empty = hidden. */
  googleBusinessProfileUrl: null as string | null,
  /** TODO: BUSINESS OWNER TO CONFIRM — real social profile URLs. Used for schema `sameAs` only when filled. */
  socialProfiles: [] as string[],
} as const;

/** Bumped by hand when page content changes, so the sitemap doesn't claim every deploy is a change. */
export const CONTENT_LAST_UPDATED = "2026-10-04";

/** "24/7 emergency line" when confirmed, a neutral phrase otherwise. */
export const availabilityShort = business.availability.emergency24x7
  ? "24/7 emergency line"
  : "Call about urgent problems";

/** National Gas Emergency Service (Great Britain) — public safety number, not ours. */
export const GAS_EMERGENCY = { display: "0800 111 999", href: "tel:0800111999" } as const;
