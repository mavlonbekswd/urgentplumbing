// ─────────────────────────────────────────────────────────────────────────────
// IMAGE SLOTS — where real Urgent Plumbing & Drainage photos go.
//
// No stock or AI-generated photos are used on this site. A slot with `src: null` renders nothing,
// so pages look complete without photos and nothing decorative competes with the contact options.
//
// To add a real photo:
//   1. Put the file in /public/images/ (e.g. /public/images/about-team.jpg)
//   2. Set `src` below to "/images/about-team.jpg"
//   3. Write a specific `alt` describing what's actually in the photo
// The photo then appears automatically wherever that slot is used (listed next to each slot).
//
// In the HTML, every rendered photo carries data-image-slot="<id>" so you can find it in dev tools.
// ─────────────────────────────────────────────────────────────────────────────

export interface ImageSlot {
  /** Path under /public, or null to show the placeholder. */
  src: string | null;
  alt: string;
  /** CSS aspect ratio the layout reserves. */
  aspect: "4/3" | "3/2" | "1/1" | "16/9" | "4/5";
  /** What the photo should show — for whoever takes or chooses it. */
  brief: string;
  /** Recommended minimum export size. */
  size: string;
}

export const imageSlots = {
  // TODO: ADD REAL TEAM PHOTO — appears beside the About page heading
  "about-team": {
    src: null,
    alt: "The Urgent Plumbing & Drainage team",
    aspect: "3/2",
    brief: "The owner and/or team, ideally next to the van, in uniform.",
    size: "1800 × 1200 px, JPG or WebP",
  },
  // TODO: ADD REAL VAN PHOTO — About page, "Recent work" gallery
  "about-van": {
    src: null,
    alt: "An Urgent Plumbing & Drainage van",
    aspect: "4/3",
    brief: "The branded van on a local street — shows customers who will turn up.",
    size: "1600 × 1200 px, JPG or WebP",
  },
  // TODO: ADD REAL RECENT-WORK PHOTOS — About page, "Recent work" gallery (shown once any photo is set)
  "recent-work-1": {
    src: null,
    alt: "Recent plumbing work by Urgent Plumbing & Drainage",
    aspect: "1/1",
    brief: "A finished job: neat pipework, a fitted tap or a cleared drain.",
    size: "1200 × 1200 px, JPG or WebP",
  },
  "recent-work-2": {
    src: null,
    alt: "Recent plumbing work by Urgent Plumbing & Drainage",
    aspect: "1/1",
    brief: "Before-and-after of a repair, or a job in progress.",
    size: "1200 × 1200 px, JPG or WebP",
  },
  "recent-work-3": {
    src: null,
    alt: "Recent drainage work by Urgent Plumbing & Drainage",
    aspect: "1/1",
    brief: "Drainage work — an outside drain, gully or inspection chamber.",
    size: "1200 × 1200 px, JPG or WebP",
  },
  // TODO: ADD REAL GUARANTEE-PAGE PHOTO — beside the Guarantee page heading
  "guarantee-finished-job": {
    src: null,
    alt: "A finished, tested installation by Urgent Plumbing & Drainage",
    aspect: "4/3",
    brief: "A tidy, finished installation — the kind of work the guarantee covers.",
    size: "1600 × 1200 px, JPG or WebP",
  },
  // Service pages — TODO: ADD REAL SERVICE PHOTOS (one per service), shown in the "How we help" section
  "service-emergency-plumbing": {
    src: null,
    alt: "Emergency leak repair by Urgent Plumbing & Drainage",
    aspect: "4/3",
    brief: "A burst-pipe or leak repair in progress.",
    size: "1600 × 1200 px, JPG or WebP",
  },
  "service-blocked-drains": {
    src: null,
    alt: "Clearing a blocked drain",
    aspect: "4/3",
    brief: "An outside drain or gully being cleared.",
    size: "1600 × 1200 px, JPG or WebP",
  },
  "service-drain-cleaning": {
    src: null,
    alt: "Drain cleaning in progress",
    aspect: "4/3",
    brief: "Drain cleaning equipment in use at a real job.",
    size: "1600 × 1200 px, JPG or WebP",
  },
  "service-leak-repairs": {
    src: null,
    alt: "Repairing a leak under a sink",
    aspect: "4/3",
    brief: "A leak repair under a sink or behind a bath panel.",
    size: "1600 × 1200 px, JPG or WebP",
  },
  "service-pipe-repairs": {
    src: null,
    alt: "New pipework fitted by Urgent Plumbing & Drainage",
    aspect: "4/3",
    brief: "Neat new copper or plastic pipework you've fitted.",
    size: "1600 × 1200 px, JPG or WebP",
  },
  "service-hot-water": {
    src: null,
    alt: "A hot water cylinder repaired by Urgent Plumbing & Drainage",
    aspect: "4/3",
    brief: "A hot water cylinder or immersion heater you've worked on.",
    size: "1600 × 1200 px, JPG or WebP",
  },
  "service-bathroom-and-kitchen-fittings": {
    src: null,
    alt: "A new tap fitted by Urgent Plumbing & Drainage",
    aspect: "4/3",
    brief: "A tap, toilet, basin or shower you've fitted.",
    size: "1600 × 1200 px, JPG or WebP",
  },
} satisfies Record<string, ImageSlot>;

export type ImageSlotId = keyof typeof imageSlots;
