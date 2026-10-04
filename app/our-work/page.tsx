import { business } from "@/data/business";
import { ourWorkGroups, ourWorkLeadPhoto } from "@/data/photos";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { CallButton } from "@/components/ui/CallButton";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { WorkPhoto } from "@/components/ui/WorkPhoto";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Our Work",
  description: `Photos from real plumbing and drainage jobs by ${business.name}: drains, supply pipes, stopcocks, toilets, showers, sinks and taps.`,
  path: "/our-work",
});

export default function OurWorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Our Work", href: "/our-work" }]}
        title="Our work"
        intro={
          <>
            <p>
              Photos from jobs we&apos;ve carried out: drains opened up, supply pipes dug out, stopcocks replaced and
              bathrooms finished.
            </p>
            <p>They&apos;re our own photos, taken on the job — not stock images.</p>
          </>
        }
        actions={
          <>
            <CallButton size="lg" label="short" />
            <WhatsAppButton size="lg" />
          </>
        }
        aside={
          <WorkPhoto
            id={ourWorkLeadPhoto}
            priority
            frameClassName="aspect-[4/3] lg:aspect-[4/5]"
            className="hidden md:flex lg:mx-auto lg:max-w-sm"
            sizes="(min-width: 1024px) 384px, 100vw"
          />
        }
      />

      {ourWorkGroups.map((group, i) => (
        <Section key={group.id} tone={i % 2 === 0 ? "white" : "mist"} labelledBy={`work-${group.id}`}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)] lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading id={`work-${group.id}`} title={`${group.title}.`} intro={<p>{group.intro}</p>} />
            </div>
            {/* Two photos sit side by side; larger groups run three across on wide screens. */}
            <div className={cn("grid grid-cols-2 gap-4 lg:gap-5", group.photos.length > 2 && "md:grid-cols-3")}>
              {group.photos.map((id) => (
                <WorkPhoto
                  key={id}
                  id={id}
                  frameClassName="aspect-[3/4]"
                  sizes={
                    group.photos.length > 2
                      ? "(min-width: 1280px) 260px, (min-width: 768px) 30vw, 50vw"
                      : "(min-width: 1280px) 390px, (min-width: 768px) 36vw, 50vw"
                  }
                />
              ))}
            </div>
          </div>
        </Section>
      ))}

      <CtaSection title="Got a job like one of these?" />
    </>
  );
}
