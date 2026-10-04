import { business } from "@/data/business";
import { areaGroups, baseTown, towns } from "@/data/locations";
import { CtaSection } from "@/components/sections/CtaSection";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { PageHero } from "@/components/sections/PageHero";
import { TownFinder } from "@/components/sections/TownFinder";
import { CallButton } from "@/components/ui/CallButton";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Areas We Cover",
  description:
    "Ely, Newmarket, Huntingdon, St Ives, St Neots, Saffron Walden, Royston, Haverhill, Bury St Edmunds and more. Find your town, or ask us about your postcode.",
  path: "/areas-we-cover",
});

export default function AreasPage() {
  const byName = (name: string) => towns.find((t) => t.name === name)!;

  return (
    <>
      <PageHero
        crumbs={[{ name: "Areas We Cover", href: "/areas-we-cover" }]}
        title="Areas we cover"
        intro={
          <>
            <p>
              We cover {business.base.town} and the surrounding towns across Cambridgeshire and neighbouring counties —
              plus the villages in between.
            </p>
            <p>Find your town below, or send us your postcode and we&apos;ll let you know.</p>
          </>
        }
        actions={
          <>
            <CallButton size="lg" label="short" />
            <WhatsAppButton size="lg" />
          </>
        }
        aside={
          <div id="postcode-check" className="scroll-mt-28 rounded-xl border border-line bg-white p-5 shadow-raised sm:p-7">
            <h2 className="font-display text-[1.5rem] font-bold leading-tight text-navy-900">
              Not sure if we cover your postcode?
            </h2>
            <p className="mt-1.5 text-[0.9375rem] text-muted">
              Leave your postcode and phone number and we&apos;ll get back to you.
            </p>
            <div className="mt-5">
              <EnquiryForm variant="area" submitLabel="Ask about my area" subject="Area check" />
            </div>
            <p className="mt-5 border-t border-line pt-4 text-[0.9375rem] text-muted">
              In a hurry? Call <PhoneLink />.
            </p>
          </div>
        }
      />

      <Section labelledBy="towns-heading">
        <SectionHeading
          id="towns-heading"
          label="Towns we cover"
          title="Find your area."
          intro={<p>Grouped by direction from our base, so you can see where you are in relation to us.</p>}
        />
        <div className="mt-8">
          <TownFinder
            base={{ name: baseTown.name, county: baseTown.county, isBase: true }}
            groups={areaGroups.map((g) => ({
              id: g.id,
              title: g.title,
              towns: g.towns.map((name) => ({ name, county: byName(name).county })),
            }))}
          />
        </div>
      </Section>

      <CtaSection
        title="Near one of these towns? Talk to us."
        body="Coverage isn't a hard line on a map. If you're close by, ring and we'll tell you straight away whether we can help — and if we can't, we'll say so."
      />
    </>
  );
}
