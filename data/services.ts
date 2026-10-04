// Every service page is generated from this file: the services hub, the header dropdown,
// the footer, the contact form's "service" list, the sitemap and the Service structured data.
//
// The services listed are the ones the previous Urgent Plumbing website offered (emergency
// repairs, drain cleaning, pipe repair and replacement, fixture installation and water heater
// work), split into pages a customer would actually search for. Nothing is borrowed from
// another business.
//
// Copy rules: British English, plain words, no invented figures, no response-time promises.

import type { IconName } from "@/components/ui/Icon";

export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  name: string;
  /** Shorter label for menus. */
  navLabel: string;
  /** One short line under the label in the Services dropdown. */
  menuLine: string;
  icon: IconName;
  /** One or two sentences for cards. */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  /** Urgent services lead with the phone number and the "what to do now" box. */
  urgent: boolean;
  problems: {
    heading: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  rightNow: {
    heading: string;
    intro: string;
    steps: string[];
    warning?: string;
  };
  help: {
    heading: string;
    intro: string;
    points: string[];
  };
  /** An honest note about responsibility or limits, where one matters. */
  note?: {
    heading: string;
    body: string[];
  };
  process: { title: string; body: string }[];
  faqs: Faq[];
  related: string[];
  schemaServiceType: string;
}

const STOPCOCK_STEP =
  "Turn off the water at the stopcock. It's usually under the kitchen sink — turn it clockwise until it stops.";

export const services: Service[] = [
  // ───────────────────────────────────────────────────────────────── Emergency plumbing
  {
    slug: "emergency-plumbing",
    name: "Emergency plumbing",
    navLabel: "Emergency plumbing",
    menuLine: "Burst pipes, leaks you can't stop, no water.",
    icon: "emergency",
    summary:
      "Burst pipes, water through the ceiling, no water at all. Call and we'll help you make it safe, then sort the repair.",
    metaTitle: "Emergency Plumber for Cambridge & Surrounding Areas",
    metaDescription:
      "Burst pipe, water through a ceiling or no water? Call Urgent Plumbing & Drainage on 01223 482425 and we'll help you make it safe, then sort the repair.",
    h1: "Emergency plumbing: burst pipes, leaks and no water",
    intro: [
      "When water is going where it shouldn't, two things matter: stopping it now, and fixing it properly afterwards.",
      "Call us and tell us what you can see. We'll help you with the first part over the phone and arrange the second.",
    ],
    urgent: true,
    problems: {
      heading: "When to treat it as an emergency",
      intro:
        "If any of these are happening, call rather than filling in a form. A dripping tap or a slow sink can usually wait for a booked visit.",
      items: [
        {
          title: "A burst or split pipe",
          body: "Water spraying or pouring from a pipe — often after a cold snap, or when a pipe has been knocked or drilled.",
        },
        {
          title: "Water coming through a ceiling",
          body: "A bulging or dripping ceiling usually means a leak from a pipe, tank, bath or shower in the room above.",
        },
        {
          title: "Water near electrics",
          body: "Water around sockets, light fittings or the fuse box. Don't touch anything wet.",
        },
        {
          title: "No water at all",
          body: "Taps have stopped with no warning from your water supplier. It may be a supply problem or a fault on your side.",
        },
        {
          title: "Sewage coming back up",
          body: "Waste rising through a toilet, shower tray or outside drain, or a toilet that overflows when flushed.",
        },
        {
          title: "Water you can't turn off",
          body: "A tap, valve or toilet cistern that keeps running even when it's shut off.",
        },
      ],
    },
    rightNow: {
      heading: "While you're calling us",
      intro: "These steps limit the damage. Only do what's safe.",
      steps: [
        STOPCOCK_STEP,
        "If water is near anything electrical, switch off the power at the fuse box — but only if you can reach it without touching water.",
        "Open the cold taps and flush the toilets to drain water out of the pipes.",
        "Move valuables and electrical items out of the way, and catch drips with buckets and towels.",
      ],
      warning:
        "Smell gas? That isn't a plumbing call. Leave the property and ring the National Gas Emergency Service on 0800 111 999.",
    },
    help: {
      heading: "What we do when you call",
      intro:
        "On the phone we'll ask what you're seeing. That tells us how urgent it is and what we're likely to need.",
      points: [
        "Help you find and turn off the water, and make the area safe",
        "Find where the water is actually coming from — not just where it's showing",
        "Make a safe temporary repair if the full fix needs parts or more time",
        "Explain the permanent repair and agree the cost before doing it",
        "Tell you in plain terms what failed and why, which helps if you need to speak to your insurer",
      ],
    },
    note: {
      heading: "Is it your pipe or the water company's?",
      body: [
        "If the leak is in the pavement or road, or your whole street has lost water, contact your water supplier first — the pipe is theirs. Their name and number are on your water bill.",
        "Inside your property, and on the supply pipe between your boundary and the house, the pipework is usually the owner's responsibility. That's where we come in.",
      ],
    },
    process: [
      {
        title: "You call us",
        body: "Tell us what's happening and where you are. If water's still running, we'll help you stop it first.",
      },
      {
        title: "We work out what's needed",
        body: "A few quick questions tell us how serious it is and what to bring.",
      },
      {
        title: "We agree the next step",
        body: "We tell you what happens next and how charges work before any work is done.",
      },
      {
        title: "We fix it, or make it safe",
        body: "If the full repair needs a part, we make things safe first and come back to finish.",
      },
    ],
    faqs: [
      {
        q: "What counts as a plumbing emergency?",
        a: "Water escaping that you can't stop, water near electrics, losing your water supply, or waste backing up into the house. A dripping tap, a running toilet or a slow sink is worth fixing, but can usually wait for a booked visit.",
      },
      {
        q: "Where is my stopcock?",
        a: "Most often under the kitchen sink. If it isn't there, check a downstairs toilet, the airing cupboard, under the stairs, the garage, or where the water pipe comes up through the floor. There's usually another one outside under a small cover in the pavement, but that belongs to the water company and needs a special key.",
      },
      {
        q: "My stopcock won't turn. What should I do?",
        a: "Don't force it with tools — old stopcocks can snap. Try turning it gently both ways to free it. If it still won't move, call us and we'll talk you through the other options, such as isolation valves on individual pipes.",
      },
      {
        q: "Can you do a temporary repair?",
        a: "Often, yes. If the permanent repair needs a part we don't have with us, we'll make the leak safe so you can use as much of your water as possible, then come back to finish the job.",
      },
    ],
    related: ["leak-repairs", "pipe-repairs", "blocked-drains"],
    schemaServiceType: "Emergency plumbing",
  },

  // ───────────────────────────────────────────────────────────────── Blocked drains
  {
    slug: "blocked-drains",
    name: "Blocked drains",
    navLabel: "Blocked drains",
    menuLine: "Sinks, toilets, showers and outside drains.",
    icon: "drain",
    summary:
      "Sinks, toilets, showers and outside drains that won't clear. We find the blockage, clear it and tell you what caused it.",
    metaTitle: "Blocked Drains Cleared",
    metaDescription:
      "Blocked sink, toilet, shower or outside drain? We find the blockage, clear it and explain what caused it. Call Urgent Plumbing & Drainage on 01223 482425.",
    h1: "Blocked drains cleared — and the cause explained",
    intro: [
      "A blocked drain rarely clears itself, and it usually gets worse. We clear blockages in sinks, toilets, baths, showers and outside drains.",
      "We'll also tell you why it happened, so you know whether it's likely to come back.",
    ],
    urgent: true,
    problems: {
      heading: "Signs of a blocked drain",
      intro: "Where the symptoms show up tells us a lot about where the blockage is.",
      items: [
        {
          title: "Water won't go down",
          body: "A sink, bath or shower tray holding water, or draining far slower than it used to.",
        },
        {
          title: "Toilet rising when flushed",
          body: "The water level climbs towards the rim instead of draining away, or empties very slowly.",
        },
        {
          title: "Gurgling plugholes",
          body: "Air being pushed back through the water — a common sign of a partial blockage further down.",
        },
        {
          title: "Bad smells",
          body: "A sewage smell from plugholes, around the toilet, or from an outside drain cover.",
        },
        {
          title: "Outside drain overflowing",
          body: "Water pooling around a gully, or seeping from the edges of a manhole cover.",
        },
        {
          title: "Several fittings affected at once",
          body: "If the toilet, bath and sink are all slow, the blockage is probably in the shared pipe they all drain into.",
        },
      ],
    },
    rightNow: {
      heading: "Before we get to you",
      intro: "A few things stop a blockage turning into a flood.",
      steps: [
        "Stop using anything that drains into the blocked pipe — taps, shower, washing machine, dishwasher and toilet.",
        "Don't keep flushing a toilet that's rising. Each flush adds more water with nowhere to go.",
        "Avoid pouring chemical drain cleaners in. They rarely shift a solid blockage and leave caustic water sitting in the pipe.",
        "If an outside drain is overflowing, keep children and pets away from it.",
      ],
    },
    help: {
      heading: "How we deal with it",
      intro: "We work out which section of pipe is blocked, then clear it using the right method for that drain.",
      points: [
        "Find where the blockage actually is, starting from the nearest access point",
        "Clear it and get the water flowing again",
        "Run water through to check the pipe is draining freely before we leave",
        "Tell you what caused it — fat, wipes, roots, silt — and whether anything suggests a bigger problem",
        "Leave the area clean",
      ],
    },
    note: {
      heading: "Who pays: you or the water company?",
      body: [
        "In England, drains that serve more than one property, or that run outside your boundary, have generally been the water company's responsibility since October 2011.",
        "If we think your blockage is in a shared pipe, we'll tell you — it could mean you don't need to pay for the clearance at all.",
      ],
    },
    process: [
      {
        title: "Tell us which drains are affected",
        body: "Which fittings are slow or blocked, and whether it's inside, outside or both. This tells us roughly where to look.",
      },
      {
        title: "We find the blockage",
        body: "We start at the nearest access point and work along the pipe until we find it.",
      },
      {
        title: "We agree the work",
        body: "Once we know what we're dealing with, we tell you what it'll take before carrying on.",
      },
      {
        title: "Cleared and tested",
        body: "We run water through to make sure it's flowing, and tidy up afterwards.",
      },
    ],
    faqs: [
      {
        q: "Will a chemical drain unblocker fix it?",
        a: "Sometimes, for a slow sink with a soap or hair build-up. For a full blockage, usually not — and it leaves caustic water sitting in the pipe, which makes clearing it more difficult. If you've already used some, please tell us when you call.",
      },
      {
        q: "Is the blockage my responsibility?",
        a: "Pipes that only serve your property, and sit within your boundary, are usually yours. Shared drains and anything beyond your boundary are usually the water company's. We'll tell you which we think it is.",
      },
      {
        q: "Why does my drain keep blocking?",
        a: "Repeat blockages normally have a cause: fat and wipes building up, a pipe without enough fall, roots getting in, or a damaged section. Clearing it again won't solve those. We'll tell you what we think is going on — see our drain cleaning page for longer-term fixes.",
      },
      {
        q: "Can I still use the toilet?",
        a: "If the toilet or any drain in the house is blocked, it's best not to. Waste has nowhere to go and can come back up through the lowest fitting in the house.",
      },
    ],
    related: ["drain-cleaning", "emergency-plumbing", "bathroom-and-kitchen-fittings"],
    schemaServiceType: "Drain unblocking",
  },

  // ───────────────────────────────────────────────────────────────── Drain cleaning
  {
    slug: "drain-cleaning",
    name: "Drain cleaning",
    navLabel: "Drain cleaning",
    menuLine: "Slow, smelly or repeatedly blocked drains.",
    icon: "flow",
    summary:
      "Slow drains, smells that come and go, blockages that keep coming back. We clean out the build-up, not just the latest blockage.",
    metaTitle: "Drain Cleaning for Slow & Recurring Blockages",
    metaDescription:
      "Drains that are slow, smell, or keep blocking? We clean out the build-up so they run properly again. Homes and businesses across Cambridgeshire and nearby towns.",
    h1: "Drain cleaning for slow, smelly or repeatedly blocked drains",
    intro: [
      "If a drain has been slow for months, smells, or blocks every so often, clearing the latest blockage only buys time.",
      "Cleaning a drain means removing the build-up along the pipe so it runs at its full width again. It's the difference between a quick fix and a drain you stop thinking about.",
    ],
    urgent: false,
    problems: {
      heading: "When drain cleaning makes sense",
      intro: "These are the problems that come back after a simple unblocking.",
      items: [
        {
          title: "Slow for weeks, not hours",
          body: "Sinks and showers that have been getting slower over time, rather than suddenly blocking.",
        },
        {
          title: "Blockages every few months",
          body: "The same drain blocking again and again usually means something inside the pipe is catching debris.",
        },
        {
          title: "Smells that come and go",
          body: "Particularly after heavy rain or when lots of water has gone down at once.",
        },
        {
          title: "Kitchen grease",
          body: "Busy kitchens — at home or in a business — build up fat inside waste pipes faster than people expect.",
        },
        {
          title: "Gullies full of silt and leaves",
          body: "Outside gullies and channels that fill up and overflow in heavy rain.",
        },
        {
          title: "Gurgling after appliances empty",
          body: "Plugholes that gurgle when the washing machine or dishwasher drains.",
        },
      ],
    },
    rightNow: {
      heading: "Simple habits that help",
      intro: "None of these will clear an existing build-up, but they'll slow down the next one.",
      steps: [
        "Let cooking fat cool, then put it in the bin rather than down the sink.",
        "Only flush toilet paper. Wipes sold as 'flushable' don't break down the way paper does.",
        "Use a plughole strainer in showers and baths to catch hair.",
        "Clear leaves and debris from outside gullies and drain grates, especially in autumn.",
      ],
    },
    help: {
      heading: "What drain cleaning involves",
      intro: "We look at how the water is moving at each access point to work out where the build-up is, then clean that run of pipe.",
      points: [
        "Clean the length of the pipe, not just the point where it blocks",
        "Clear silt and debris from gullies and chambers we can get to",
        "Run water through afterwards so you can see the difference",
        "Tell you if anything suggests damage rather than build-up",
        "Give practical advice on keeping that drain clear",
      ],
    },
    process: [
      {
        title: "Tell us the history",
        body: "How long it's been slow, how often it blocks, and what's been tried so far.",
      },
      {
        title: "We look at the access points",
        body: "We lift covers and watch how the water moves, which shows us where the build-up is.",
      },
      {
        title: "You approve the clean",
        body: "We explain what we'd do and what it costs before we start.",
      },
      {
        title: "Cleaned and checked",
        body: "We clean the pipe, then run water through to check it's flowing properly.",
      },
    ],
    faqs: [
      {
        q: "What's the difference between unblocking and cleaning a drain?",
        a: "Unblocking makes enough of a hole for water to get through again. Cleaning removes the build-up from the walls of the pipe, so it runs at full width and is far less likely to block again soon.",
      },
      {
        q: "How often should drains be cleaned?",
        a: "Most household drains never need routine cleaning. If yours keeps blocking, or you run a kitchen that produces a lot of grease, regular cleaning can make sense. We'll be honest about whether it's worth it for you.",
      },
      {
        q: "Do you clean drains for businesses?",
        a: "Yes. Tell us about the property and how it's used, and we'll agree a time that causes the least disruption.",
      },
      {
        q: "Can you tell if a drain is damaged?",
        a: "Sometimes the signs are clear — repeat blockages in the same spot, soil or stones in the pipe, or sunken ground above it. If we suspect damage, we'll say so and explain the options rather than cleaning it and hoping for the best.",
      },
    ],
    related: ["blocked-drains", "emergency-plumbing", "leak-repairs"],
    schemaServiceType: "Drain cleaning",
  },

  // ───────────────────────────────────────────────────────────────── Leak repairs
  {
    slug: "leak-repairs",
    name: "Leak repairs",
    navLabel: "Leak repairs",
    menuLine: "Dripping taps, running toilets, damp patches.",
    icon: "drop",
    summary:
      "Dripping taps, running toilets, damp patches and pipes weeping under the sink. Traced back to the source and repaired.",
    metaTitle: "Leak & Tap Repairs",
    metaDescription:
      "Dripping tap, running toilet or a damp patch you can't explain? We trace leaks to the source and repair them. Call 01223 482425.",
    h1: "Leak repairs, from dripping taps to hidden pipe leaks",
    intro: [
      "Small leaks are easy to ignore until they stain a ceiling or rot the floor of a kitchen cupboard.",
      "We find where the water is really coming from — which isn't always where it shows — and repair it properly.",
    ],
    urgent: false,
    problems: {
      heading: "Common leaks we're asked to fix",
      intro: "Most leaks give themselves away in one of these ways.",
      items: [
        {
          title: "Dripping or running tap",
          body: "Usually a worn washer or cartridge. It won't fix itself, and it gets worse as the part wears.",
        },
        {
          title: "Toilet that keeps running",
          body: "A cistern that refills on its own, or a constant trickle into the pan. On a water meter, that adds up.",
        },
        {
          title: "Water under the sink",
          body: "Often a waste connection, a tap connector or a fitting that's worked loose.",
        },
        {
          title: "Damp patch on a ceiling or wall",
          body: "A slow leak from pipework, a bath, a shower or a radiator connection somewhere above or behind it.",
        },
        {
          title: "Leaks around a bath or shower",
          body: "Often failed sealant or a leaking shower-tray waste; sometimes a pipe hidden in the wall.",
        },
        {
          title: "A higher water bill than usual",
          body: "On a meter, an unexplained jump can mean water is escaping somewhere you can't see.",
        },
      ],
    },
    rightNow: {
      heading: "Until it's repaired",
      intro: "You can usually stop a small leak getting worse yourself.",
      steps: [
        "Look for an isolation valve on the pipe feeding the leaking tap or toilet. It's a small screw — turn it a quarter turn with a flat screwdriver.",
        "If there isn't one, or it doesn't stop the leak, turn off the water at the stopcock.",
        "Put a container under the drip and keep the area as dry as you can.",
        "Take a photo of where the water is showing. It helps us work out where it's coming from.",
      ],
    },
    help: {
      heading: "How we repair leaks",
      intro: "We trace the water back to where it starts, then repair the part that's failed.",
      points: [
        "Trace the leak to its source, not just where it's showing",
        "Repair or replace the faulty washer, valve, fitting or length of pipe",
        "Check nearby joints and connections while we're there",
        "Run the water and check for drips before we go",
        "Tell you about any damage you should keep an eye on",
      ],
    },
    process: [
      {
        title: "Describe the leak",
        body: "Where you see water, how fast it's coming and when it started. Email us a photo if you can.",
      },
      {
        title: "We find the source",
        body: "We follow the water back to where it's escaping from.",
      },
      {
        title: "We agree the repair",
        body: "We explain what's failed, what we'd do and what it costs before we start.",
      },
      {
        title: "Repaired and checked",
        body: "We turn the water back on and check for leaks before we leave.",
      },
    ],
    faqs: [
      {
        q: "Is a dripping tap worth fixing?",
        a: "Yes. A steady drip wastes more water than most people expect, and it gets worse as the washer or cartridge wears. It's usually a quick repair.",
      },
      {
        q: "How can I tell if I have a hidden leak?",
        a: "If you have a water meter, turn off every tap and water-using appliance, then look at the meter. If the dial is still moving, water is escaping somewhere. Damp patches, a musty smell or warm spots on the floor can also point to a hidden leak.",
      },
      {
        q: "Will you have to take up floors or open walls?",
        a: "Not always. It depends where the pipe runs. If we do need access, we'll explain why and agree it with you before we lift or cut anything.",
      },
    ],
    related: ["pipe-repairs", "emergency-plumbing", "bathroom-and-kitchen-fittings"],
    schemaServiceType: "Leak repair",
  },

  // ───────────────────────────────────────────────────────────────── Pipe repairs
  {
    slug: "pipe-repairs",
    name: "Pipe repairs & replacement",
    navLabel: "Pipe repairs",
    menuLine: "Split, frozen, corroded or knocking pipes.",
    icon: "pipe",
    summary:
      "Split, corroded, frozen or badly joined pipes. Repaired, or replaced where repairing would only move the problem along.",
    metaTitle: "Pipe Repairs & Replacement",
    metaDescription:
      "Split, frozen, corroded or knocking pipes repaired or replaced, for homes and businesses across the local area. Call 01223 482425.",
    h1: "Pipe repairs and replacement",
    intro: [
      "Pipes fail for a handful of reasons: frost, corrosion, a nail through a floorboard, or a joint that was never quite right.",
      "We repair the damaged section — or, where patching it would just move the problem along, replace it.",
    ],
    urgent: false,
    problems: {
      heading: "Pipe problems we deal with",
      intro: "Some need fixing today; others are worth sorting before they turn into a leak.",
      items: [
        {
          title: "Frozen or split pipes",
          body: "In lofts, garages and on outside walls, especially after a cold spell.",
        },
        {
          title: "Green or white crusting on joints",
          body: "A sign of a slow weep — common on older copper fittings.",
        },
        {
          title: "Knocking or banging pipes",
          body: "Usually loose pipework, or 'water hammer' when a tap or appliance valve shuts quickly.",
        },
        {
          title: "Old lead pipework",
          body: "Still found in some older houses. Lead pipes are best replaced, particularly the ones carrying drinking water.",
        },
        {
          title: "Damage from DIY or building work",
          body: "A drill, nail or screw through a pipe — sometimes not noticed until a ceiling stains.",
        },
        {
          title: "Pipes in the way",
          body: "Pipework that needs moving for a new kitchen, a knocked-through wall or other building work.",
        },
      ],
    },
    rightNow: {
      heading: "If a pipe is leaking or frozen now",
      intro: "Do this first, then call us.",
      steps: [
        STOPCOCK_STEP,
        "Open the cold taps to drain the pipes and take the pressure off the damaged section.",
        "Never thaw a frozen pipe with a naked flame. Use a hairdryer or warm cloths, starting from the tap end and working back.",
        "Wrap a towel around a weeping joint and put a bucket underneath.",
      ],
    },
    help: {
      heading: "What we can do",
      intro: "We look at the damaged section and the pipework around it, so we know whether it's a one-off or a sign of wider wear.",
      points: [
        "Cut out and replace damaged or split sections",
        "Replace corroded pipework that keeps failing",
        "Secure loose pipes that knock or rattle",
        "Insulate pipes in cold spaces to protect them from frost",
        "Re-route pipework to make way for building work",
      ],
    },
    process: [
      {
        title: "Tell us what's happened",
        body: "Where the pipe is, what it's doing, and whether the water is off.",
      },
      {
        title: "We look at the whole run",
        body: "Not just the damaged bit — the joints and pipework either side of it too.",
      },
      {
        title: "Repair or replace: your choice",
        body: "Where there's a choice, we explain both options and the cost of each.",
      },
      {
        title: "Turned back on and checked",
        body: "We restore the water and check every joint we've touched.",
      },
    ],
    faqs: [
      {
        q: "Should I repair or replace the pipe?",
        a: "A single split from frost or a nail is usually a straightforward repair. If the pipe is corroded along its length, or has already been patched several times, replacing that run is often better value. We'll explain what we see and let you decide.",
      },
      {
        q: "Do you replace lead pipes?",
        a: "Yes, inside the property. If lead pipe runs under the garden to the boundary, that's a bigger job and we'll explain what's involved. It's also worth asking your water supplier — some offer help with replacing lead supply pipes.",
      },
      {
        q: "How can I stop pipes freezing?",
        a: "Insulate pipes in lofts, garages and on outside walls, fix dripping taps, and keep the heating on low if you're away in cold weather. Know where your stopcock is before winter so you can act quickly if a pipe does split.",
      },
    ],
    related: ["leak-repairs", "emergency-plumbing", "hot-water"],
    schemaServiceType: "Pipe repair and replacement",
  },

  // ───────────────────────────────────────────────────────────────── Hot water
  {
    slug: "hot-water",
    name: "Hot water & water heaters",
    navLabel: "Hot water",
    menuLine: "No hot water, cylinders and immersion heaters.",
    icon: "hotWater",
    summary:
      "No hot water, a leaking cylinder or an immersion heater that's stopped working. Diagnosed, repaired, or replaced where needed.",
    metaTitle: "Hot Water & Cylinder Repairs",
    metaDescription:
      "No hot water, a leaking cylinder or a failed immersion heater? We diagnose the fault, explain it and agree the repair with you before we start.",
    h1: "Hot water problems and water heaters",
    intro: [
      "No hot water is miserable, especially with a household to wash. The problem might be the cylinder, the immersion heater, a valve or the controls.",
      "We work out which, explain it, and fix it — or tell you honestly if the job needs a different kind of engineer.",
    ],
    urgent: false,
    problems: {
      heading: "Hot water problems we look at",
      intro: "Tell us which of these sounds most like yours.",
      items: [
        {
          title: "No hot water at all",
          body: "Taps run cold, even though the heating may still be working.",
        },
        {
          title: "Water only lukewarm",
          body: "Often a thermostat, an immersion element or a valve that isn't opening fully.",
        },
        {
          title: "Leaking hot water cylinder",
          body: "Water around the base of the cylinder, or dripping from a valve or connection.",
        },
        {
          title: "Immersion heater not working",
          body: "The switch is on but the water stays cold.",
        },
        {
          title: "Hot water runs out quickly",
          body: "A cylinder that used to last a household now runs cold after one bath.",
        },
        {
          title: "Noisy cylinder or pipes",
          body: "Banging, hissing or knocking when the water heats up.",
        },
      ],
    },
    rightNow: {
      heading: "Quick checks before you call",
      intro: "These solve more hot water problems than you'd think.",
      steps: [
        "Check the immersion switch is on, the fuse hasn't tripped, and the timer hasn't reset after a power cut.",
        "If the cylinder is leaking, turn off the cold water feeding it and switch off the immersion heater.",
        "Note the make and model from the label on the cylinder or water heater — a photo is perfect.",
        "If your boiler is showing a fault code, write it down.",
      ],
    },
    help: {
      heading: "What we can help with",
      intro: "We find out why the hot water has stopped or dropped, then put it right.",
      points: [
        "Diagnose why your hot water has stopped or isn't hot enough",
        "Repair or replace immersion heaters and cylinder thermostats",
        "Fix leaking cylinder valves and connections",
        "Replace vented (gravity-fed) hot water cylinders",
        "Give honest advice on whether to repair or replace",
      ],
    },
    // TODO: BUSINESS OWNER TO CONFIRM — if the business holds Gas Safe registration or an
    // unvented cylinder (G3) qualification, update this note and the FAQ below.
    note: {
      heading: "Some hot water work is regulated",
      body: [
        "Gas boilers and gas water heaters must only be worked on by a Gas Safe registered engineer, and unvented (mains-pressure) cylinders need an installer with the right qualification.",
        "Tell us what system you have when you call. We'll tell you straight away whether it's a job for us — and if it isn't, we'll say so rather than send someone who can't help.",
      ],
    },
    process: [
      {
        title: "Tell us about your system",
        body: "Cylinder, combi boiler or electric water heater, and what's changed. A photo of the label helps.",
      },
      {
        title: "We check it's the right job for us",
        body: "If it needs a Gas Safe engineer, we'll tell you there and then.",
      },
      {
        title: "We diagnose and agree the fix",
        body: "We find the fault and explain the options and costs before doing any work.",
      },
      {
        title: "Repaired and tested",
        body: "We run the hot water and check for leaks before we leave.",
      },
    ],
    faqs: [
      {
        q: "Why do I have heating but no hot water?",
        a: "On a system with a hot water cylinder, it's often a motorised valve, the programmer or the cylinder thermostat. On a combi boiler, it's usually a fault inside the boiler, which needs a Gas Safe registered engineer.",
      },
      {
        q: "Do you work on gas boilers?",
        a: "Gas work must be carried out by a Gas Safe registered engineer. Ask us when you call and we'll tell you whether we can help with your boiler, or point you in the right direction.",
      },
      {
        q: "Should I repair or replace an old cylinder?",
        a: "If the cylinder itself is leaking, it usually needs replacing. If it's a valve, thermostat or immersion heater that's failed, those can normally be replaced on their own for much less.",
      },
    ],
    related: ["pipe-repairs", "leak-repairs", "emergency-plumbing"],
    schemaServiceType: "Water heater repair",
  },

  // ───────────────────────────────────────────────────────────────── Fittings
  {
    slug: "bathroom-and-kitchen-fittings",
    name: "Taps, toilets, sinks & showers",
    navLabel: "Taps, toilets & showers",
    menuLine: "New taps, toilets, sinks and showers fitted.",
    icon: "shower",
    summary:
      "New taps, sinks, toilets and showers fitted properly — connected, sealed and tested — whether you've bought them or need advice on what to buy.",
    metaTitle: "Taps, Toilets & Showers Fitted",
    metaDescription:
      "New tap, toilet, sink or shower? We fit, connect and test bathroom and kitchen fittings. Call 01223 482425.",
    h1: "Taps, sinks, toilets and showers fitted",
    intro: [
      "Whether you've bought a new tap or need a toilet replacing, the fitting decides whether it works quietly for years or starts dripping within a month.",
      "We fit it, connect it, test it and tidy up afterwards.",
    ],
    urgent: false,
    problems: {
      heading: "Jobs we're asked to do",
      intro: "Bring us the product, or ask us what would suit your system.",
      items: [
        {
          title: "Kitchen and bathroom taps",
          body: "Replacing worn or dated taps, including mixer taps and separate hot and cold taps.",
        },
        {
          title: "Toilets and cisterns",
          body: "Fitting a new toilet, or replacing the flush or fill valve inside the cistern.",
        },
        {
          title: "Sinks and basins",
          body: "New kitchen sinks, bathroom basins and their wastes.",
        },
        {
          title: "Showers",
          body: "Fitting or replacing mixer and electric showers and their valves.",
        },
        {
          title: "Outside taps",
          body: "A new outside tap for the garden, with an isolation valve inside so it can be drained for winter.",
        },
        {
          title: "Appliance connections",
          body: "Plumbing in washing machines and dishwashers, including the waste.",
        },
      ],
    },
    rightNow: {
      heading: "Before we come to fit it",
      intro: "A bit of preparation avoids a wasted trip.",
      steps: [
        "Check the box has everything — some taps need separate connectors or a waste that's sold separately.",
        "Measure the space, especially for toilets (wall to the centre of the waste pipe) and basins.",
        "Tell us whether you have a combi boiler or a hot water cylinder. Some taps and showers are made for one or the other.",
        "Keep the box and the instructions until the job's done.",
      ],
    },
    help: {
      heading: "How we fit things",
      intro: "We check it'll work with your system before the day, then fit it properly.",
      points: [
        "Fit what you've bought, or advise on what to buy",
        "Fit isolation valves where there aren't any, so future repairs are simpler",
        "Connect, seal and test everything before we leave",
        "Tidy up, and point out any manufacturer warranty you need to register",
      ],
    },
    note: {
      heading: "Electric showers",
      body: [
        "An electric shower needs a suitable electrical supply. If yours needs a new circuit or upgraded wiring, that's work for a qualified electrician.",
        "We'll tell you before we start if we think that's the case, so there are no surprises on the day.",
      ],
    },
    process: [
      {
        title: "Tell us what you're fitting",
        body: "Send the product name or a link, and a photo of where it's going if you can.",
      },
      {
        title: "We check it'll work",
        body: "Water pressure, pipe sizes and space — so there are no surprises on the day.",
      },
      {
        title: "We agree a price and a time",
        body: "You'll know the cost before we book you in.",
      },
      {
        title: "Fitted and tested",
        body: "We connect it, check for leaks and show you how it works.",
      },
    ],
    faqs: [
      {
        q: "Can I buy the tap or toilet myself?",
        a: "Yes. If you're not sure it'll suit your system, send us the details before you buy and we'll tell you.",
      },
      {
        q: "Will a new tap or shower work with my water pressure?",
        a: "Some are designed for low-pressure systems (a tank in the loft) and some for mains pressure (most combi boilers). Fitting the wrong one gives a weak, disappointing flow. Tell us your system and we'll check.",
      },
      {
        q: "Do you fit complete bathrooms?",
        a: "Tell us what you're planning. We fit individual items and the plumbing for them. For a full refit involving tiling or electrics, we'll be clear about which parts we do and which need another trade.",
      },
    ],
    related: ["leak-repairs", "hot-water", "blocked-drains"],
    schemaServiceType: "Plumbing fixture installation",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function serviceHref(slug: string): string {
  return `/services/${slug}`;
}

/** Options for the contact form's "service" select. */
export const serviceOptions = [
  ...services.map((s) => s.name),
  "Something else / not sure",
];
