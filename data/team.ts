// ─────────────────────────────────────────────────────────────────────────────
// TEAM — real people only.
//
// The About page shows a "Who you'll speak to" section only when this list has entries.
// TODO: BUSINESS OWNER TO CONFIRM — add the owner and team here (name, role, a sentence or two
// in their own words, and a photo in /public/images/team/).
// ─────────────────────────────────────────────────────────────────────────────

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** e.g. "/images/team/sam.jpg" — 800 × 1000 px portrait works well. */
  photo?: string;
}

export const team: TeamMember[] = [];
