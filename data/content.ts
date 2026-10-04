// Shared page content used on more than one page (home, about, services hub).
// Every point here is a description of how the business works, not a statistic.
// If any of it stops being true, change it here.

import type { IconName } from "@/components/ui/Icon";

export interface Point {
  icon: IconName;
  title: string;
  body: string;
}

/** "Why choose us" — practical reasons, each one a way of working. */
export const reasons: Point[] = [
  {
    icon: "clipboard",
    title: "You'll know what's happening",
    body: "We tell you what we've found, what we suggest and what it'll cost — before we start. If we find something unexpected partway through, we stop and talk to you.",
  },
  {
    icon: "wrench",
    title: "Repair first, replace when it's right",
    body: "If something can sensibly be repaired, we'll say so. We won't push a replacement you don't need.",
  },
  {
    icon: "pin",
    title: "Local, and staying local",
    body: "We work in the towns and villages around our base, not across the whole country. If you need us again about a job, we're easy to get hold of.",
  },
  {
    icon: "shield",
    title: "Honest about what we don't do",
    body: "Some jobs need a specialist, such as gas or electrical work. If yours does, we'll tell you rather than take it on.",
  },
  {
    icon: "check",
    title: "Tested before we leave",
    body: "We turn the water back on, check every joint we've touched and make sure drains are flowing before we call a job finished.",
  },
  {
    icon: "chat",
    title: "Small jobs are welcome",
    body: "A dripping tap or a running toilet is worth a call. It's better to fix it now than after it's damaged something.",
  },
];

/** The general "how it works" steps, used on the home page and services hub. */
export const howItWorks = [
  {
    title: "Tell us what's wrong",
    body: "Call, or send a callback request. Tell us what's happening, where you are and how urgent it feels.",
  },
  {
    title: "We work out what's needed",
    body: "We ask a few questions, and look at photos if you have them, to understand the job before we arrive.",
  },
  {
    title: "You agree before we start",
    body: "We explain what needs doing and what it costs. Nothing goes ahead without your say-so.",
  },
  {
    title: "We fix it and tidy up",
    body: "We test the repair, clear up after ourselves and tell you what we did.",
  },
];

/** Signs that something needs a call now (home emergency band). */
export const emergencySigns = [
  "A burst or leaking pipe",
  "Water coming through a ceiling",
  "A blocked or overflowing toilet",
  "A drain backing up or overflowing",
  "No water at all",
  "A tap or valve that won't turn off",
];

export const stopcockSteps = [
  "Turn off the water at the stopcock — usually under the kitchen sink. Turn it clockwise.",
  "If water is near electrics, switch off at the fuse box, but only if it's safe to reach.",
  "Open the cold taps to drain the pipes, and catch drips with buckets and towels.",
];
