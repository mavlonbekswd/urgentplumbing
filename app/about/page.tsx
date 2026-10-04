import Image from "next/image";
import { business } from "@/data/business";
import { reasons } from "@/data/content";
import { areaGroups, coverageRegions } from "@/data/locations";
import { team } from "@/data/team";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { PointsGrid } from "@/components/sections/PointsGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { hasImage, ImageSlot } from "@/components/ui/ImageSlot";
import type { ImageSlotId } from "@/data/images";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description: `${business.name} is a local plumbing and drainage business working for households and businesses across Cambridgeshire and neighbouring counties.`,
  path: "/about",
});

const customers = [
  {
    icon: "home" as const,
    title: "Homeowners",
    body: "From a dripping tap to a ceiling coming down — and the questions that come with it.",
  },
  {
    icon: "users" as const,
    title: "Tenants and landlords",
    body: "A clear explanation of what we found and what we did, so everyone knows where they stand.",
  },
  {
    icon: "clipboard" as const,
    title: "Local businesses",
    body: "Shops, offices and kitchens. Tell us how the building is used and we'll agree a time that causes the least disruption.",
  },
];

const workPhotos = (["about-van", "recent-work-1", "recent-work-2", "recent-work-3"] as ImageSlotId[]).filter(hasImage);

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", href: "/about" }]}
        title="A local plumbing and drainage business"
        intro={
          <>
            <p>
              {business.name} fixes the plumbing and drainage problems that disrupt a home or a business: leaks,
              blockages, burst pipes, failed hot water, and the taps, toilets and pipework that keep everything running.
            </p>
            <p>We&apos;re based in {business.base.town} and work across the surrounding towns and villages.</p>
          </>
        }
        aside={
          hasImage("about-team") ? (
            <ImageSlot id="about-team" className="hidden lg:block" sizes="(min-width: 1024px) 480px, 100vw" />
          ) : undefined
        }
      />

      {/* What we believe / how we treat customers */}
      <Section labelledBy="approach-heading">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading id="approach-heading" label="Our approach" title="Most people don't know what's behind their walls. They shouldn't have to." />
            <div className="mt-6 space-y-4 text-lead text-body">
              <p>
                When something goes wrong with your plumbing, the worst part is often not knowing: how serious it is,
                what it&apos;ll take to fix, and what it&apos;ll cost.
              </p>
              <p>
                So we explain. We tell you what we&apos;ve found, show you where we can, and talk you through the
                options before we start. If there&apos;s a cheaper sensible fix, you&apos;ll hear about it. If a job
                needs a different trade, we&apos;ll say so.
              </p>
              <p>That&apos;s it, really. Turn up, explain clearly, do the work properly, and leave it tidy.</p>
            </div>
          </div>
          <div className="self-start rounded-lg border border-line bg-mist p-6 sm:p-8">
            <h3 className="text-h3">In short</h3>
            <dl className="mt-5 divide-y divide-line">
              {[
                ["What we do", "Plumbing and drainage repairs, and fitting"],
                ["Where", "Towns and villages across the local area"],
                ["Who for", "Households and local businesses"],
                ["How to reach us", `${business.phone.display}`],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 py-3 first:pt-0 last:pb-0">
                  <dt className="font-semibold text-muted">{k}</dt>
                  <dd className="font-semibold text-navy-900">
                    {k === "How to reach us" ? (
                      <a href={business.phone.href} className="link">
                        {v}
                      </a>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Who we work for */}
      <Section tone="mist" labelledBy="customers-heading">
        <SectionHeading id="customers-heading" label="Who we work for" title="Homes and businesses, large jobs and small." />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {customers.map((c) => (
            <li key={c.title} className="rounded-lg border border-line bg-white p-6">
              <Icon name={c.icon} weight="duotone" className="size-10 text-navy-700" />
              <h3 className="mt-4 text-h3">{c.title}</h3>
              <p className="mt-2">{c.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* How we work */}
      <Section labelledBy="principles-heading">
        <SectionHeading
          id="principles-heading"
          label="How we work"
          title="The same standards on every job."
          intro={<p>Clear communication isn&apos;t a nice extra. It&apos;s how you know you&apos;re being treated fairly.</p>}
        />
        <PointsGrid points={reasons} className="mt-12" />
      </Section>

      {/* Team — only shown once real team details are added in data/team.ts */}
      {team.length > 0 && (
        <Section tone="mist" labelledBy="team-heading">
          <SectionHeading id="team-heading" label="The team" title="Who you'll speak to." />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <li key={m.name} className="overflow-hidden rounded-lg border border-line bg-white">
                {m.photo && (
                  <div className="relative aspect-[4/5]">
                    <Image src={m.photo} alt={`${m.name}, ${m.role}`} fill className="object-cover" sizes="(min-width: 1024px) 360px, 100vw" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-h3">{m.name}</h3>
                  <p className="font-semibold text-green-700">{m.role}</p>
                  <p className="mt-3">{m.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Recent work — only shown once real photos are added in data/images.ts */}
      {workPhotos.length > 0 && (
        <Section labelledBy="work-heading">
          <SectionHeading id="work-heading" label="Recent work" title="A few recent jobs." />
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {workPhotos.map((id) => (
              <ImageSlot key={id} id={id} sizes="(min-width: 1024px) 280px, 50vw" />
            ))}
          </div>
        </Section>
      )}

      {/* Where we work */}
      <Section tone={team.length > 0 ? "white" : "mist"} labelledBy="where-heading">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="where-heading"
              label="Where we work"
              title="Local — not the whole country."
              intro={
                <p>
                  We work in towns and villages across {coverageRegions}. Staying local means we&apos;re easy to get
                  hold of if you need us again.
                </p>
              }
            />
            <ButtonLink href="/areas-we-cover" variant="secondary" icon="arrowRight" iconPosition="end" className="mt-8">
              See the areas we cover
            </ButtonLink>
          </div>
          <ul aria-label="Where we work" className="divide-y divide-line rounded-lg border border-line bg-white">
            <li className="flex gap-3 p-4 sm:p-5">
              <Icon name="home" weight="fill" className="mt-0.5 size-5 text-green-600" />
              <p>
                <strong className="block text-navy-900">Our base</strong>
                <span className="text-body">{business.base.town}</span>
              </p>
            </li>
            {areaGroups.map((g) => (
              <li key={g.id} className="flex gap-3 p-4 sm:p-5">
                <Icon name="pin" weight="duotone" className="mt-0.5 size-5 text-green-600" />
                <p>
                  <strong className="block text-navy-900">{g.title.split(" — ")[0]}</strong>
                  <span className="text-body">{g.towns.join(", ")}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
