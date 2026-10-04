import { homeWorkPhotos } from "@/data/photos";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkPhoto } from "@/components/ui/WorkPhoto";

/** Home page proof that the work is real: one large photo and four smaller ones. */
export function RealWorkSection() {
  const [featured, ...rest] = homeWorkPhotos;
  return (
    <Section tone="mist" labelledBy="real-work-heading">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          id="real-work-heading"
          label="Our work"
          title="Real plumbing work."
          intro={
            <p>
              Some of the plumbing and drainage jobs we&apos;ve done for customers across our area. These are our own
              photos, not stock images.
            </p>
          }
        />
        <ButtonLink href="/our-work" variant="secondary" icon="arrowRight" iconPosition="end" className="shrink-0">
          See more of our work
        </ButtonLink>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[5fr_7fr] lg:gap-5">
        {featured && (
          <WorkPhoto
            id={featured}
            frameClassName="aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:flex-1"
            sizes="(min-width: 1280px) 470px, (min-width: 1024px) 38vw, 100vw"
          />
        )}
        <div className="grid grid-cols-2 gap-4 lg:gap-5">
          {rest.map((id) => (
            <WorkPhoto key={id} id={id} sizes="(min-width: 1280px) 320px, (min-width: 1024px) 28vw, 50vw" />
          ))}
        </div>
      </div>
    </Section>
  );
}
