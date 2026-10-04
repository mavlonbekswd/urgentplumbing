import { business } from "@/data/business";
import { CtaSection } from "@/components/sections/CtaSection";
import { NumberedSteps } from "@/components/sections/NumberedSteps";
import { PageHero } from "@/components/sections/PageHero";
import { AnchorButton } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/CallButton";
import { Icon, type IconName } from "@/components/ui/Icon";
import { WorkPhoto } from "@/components/ui/WorkPhoto";
import { guaranteePhoto } from "@/data/photos";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Guarantee",
  description: `What you can expect from ${business.name}: the price agreed before work starts, work tested before we leave, and what to do if something isn't right afterwards.`,
  path: "/guarantee",
});

// TODO: BUSINESS OWNER TO CONFIRM — the workmanship wording below describes a standard
// workmanship guarantee. Set `guaranteePeriod` in data/business.ts once the length is decided,
// and it will appear on this page automatically.

const stages: { icon: IconName; title: string; points: string[] }[] = [
  {
    icon: "clipboard",
    title: "Before we start",
    points: [
      "We explain what we've found and what we suggest, in plain English.",
      "We agree the price with you before any work begins.",
      "If there's more than one sensible option, we tell you about each, including the cheaper one.",
    ],
  },
  {
    icon: "wrench",
    title: "While we work",
    points: [
      "We keep you told what's happening.",
      "If we find something unexpected, we stop and talk to you before doing anything extra.",
      "We treat your home or premises with care and tidy up when we've finished.",
    ],
  },
  {
    icon: "checkCircle",
    title: "Before we leave",
    points: [
      "We test the work: water back on, joints checked, drains running.",
      "We tell you what we did and anything you should keep an eye on.",
      "We point out any manufacturer warranty you need to register.",
    ],
  },
];

export default function GuaranteePage() {
  const period = business.guaranteePeriod;

  return (
    <>
      <PageHero
        crumbs={[{ name: "Guarantee", href: "/guarantee" }]}
        title="Our guarantee, in plain English"
        intro={
          <>
            <p>A guarantee is only worth something if it&apos;s clear. This page sets out how we work, what&apos;s covered, and what to do if you&apos;re not happy with a job we&apos;ve done.</p>
          </>
        }
        aside={
          <WorkPhoto
            id={guaranteePhoto}
            frameClassName="aspect-[4/3] lg:aspect-[4/5]"
            className="hidden md:flex lg:mx-auto lg:max-w-sm"
            sizes="(min-width: 1024px) 384px, 100vw"
          />
        }
      />

      {/* The core promise */}
      <Section labelledBy="promise-heading">
        <div className="rounded-xl border-2 border-green-600 bg-green-50 p-6 sm:p-10">
          <p className="flex items-center gap-2 font-semibold text-green-700">
            <Icon name="shield" className="size-6" />
            Our workmanship guarantee
          </p>
          <h2 id="promise-heading" className="mt-4 max-w-3xl text-h2">
            If something we&apos;ve repaired or fitted isn&apos;t right, tell us — and we&apos;ll come back.
          </h2>
          <div className="mt-5 max-w-3xl space-y-3 text-lead text-body">
            <p>
              We&apos;ll look at it, explain what we find, and if the problem is down to our workmanship we&apos;ll
              put it right without charging you again for the work.
            </p>
            {period ? (
              <p>
                Our workmanship is guaranteed for <strong className="text-navy-900">{period}</strong> from the date
                the job is finished.
              </p>
            ) : (
              <p>Ask us about the cover for your particular job before we start, and we&apos;ll tell you plainly what&apos;s included.</p>
            )}
          </div>
        </div>
      </Section>

      {/* What you can expect */}
      <Section tone="mist" labelledBy="expect-heading">
        <SectionHeading
          id="expect-heading"
          label="What to expect"
          title="How every job is run."
          intro={<p>These aren&apos;t extras. They&apos;re how we work on every job, large or small.</p>}
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {stages.map((s) => (
            <div key={s.title} className="rounded-lg border border-line bg-white p-6 sm:p-7">
              <Icon name={s.icon} weight="duotone" className="size-10 text-navy-700" />
              <h3 className="mt-4 text-h3">{s.title}</h3>
              <ul className="mt-4 space-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <Icon name="check" className="mt-1 size-4 text-green-600" weight="bold" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Parts and what's not covered */}
      <Section labelledBy="parts-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="parts-heading" label="Parts and materials" title="Manufacturer warranties." />
            <div className="mt-5 space-y-4">
              <p>
                Most parts we fit — taps, valves, toilets, cylinders, immersion heaters — come with the
                manufacturer&apos;s own warranty. Its length and terms are set by the manufacturer, not by us.
              </p>
              <p>
                Where we supply the part, we&apos;ll pass the details on to you. If you bought it yourself, keep the
                paperwork that came with it. Some manufacturers ask you to register the product, so it&apos;s worth
                doing that soon after it&apos;s fitted.
              </p>
            </div>
          </div>
          <div>
            <SectionHeading id="not-covered-heading" label="Fair limits" title="What the guarantee doesn't cover." />
            <p className="mt-5">To be clear and fair, the guarantee doesn&apos;t cover problems that aren&apos;t caused by our work, such as:</p>
            <ul className="mt-4 space-y-2.5">
              {[
                "New damage, accidents or misuse after the job",
                "Normal wear and tear",
                "Parts of the system we didn't work on",
                "Work done by someone else after we've been",
                "Blockages caused by what goes down the drain afterwards",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-navy-300" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-muted">If you&apos;re not sure whether something is covered, ask. We&apos;ll give you a straight answer.</p>
          </div>
        </div>
      </Section>

      {/* If you're not happy */}
      <Section tone="mist" labelledBy="concern-heading">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              id="concern-heading"
              label="If you're not happy"
              title="How to raise a problem with a job."
              intro={<p>We&apos;d much rather hear about it than have you put up with it.</p>}
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <CallButton />
              <AnchorButton href={business.email.href} variant="secondary" icon="mail">
                Email us
              </AnchorButton>
            </div>
          </div>
          <div className="rounded-lg border border-line bg-white p-6 sm:p-8">
            <NumberedSteps
              steps={[
                `Call ${business.phone.display} or email ${business.email.address}. Tell us the address, roughly when we did the work, and what's wrong.`,
                "Send a photo if you can — it helps us understand the problem before we arrive.",
                "We'll arrange to come back and look at it, and explain what we find.",
                "If it's down to our work, we put it right. If it isn't, we'll explain why and what your options are.",
              ]}
            />
          </div>
        </div>
      </Section>

      {/* Legal rights */}
      <Section size="compact" labelledBy="rights-heading">
        <div className="flex flex-col gap-5 rounded-lg border border-line p-6 sm:flex-row sm:p-8">
          <Icon name="info" weight="duotone" className="size-10 shrink-0 text-navy-700" />
          <div className="max-w-3xl">
            <h2 id="rights-heading" className="text-h3">
              Your legal rights
            </h2>
            <p className="mt-2">
              This guarantee is in addition to your statutory rights, not instead of them. Under the Consumer Rights
              Act 2015, a service must be carried out with reasonable care and skill. Nothing on this page affects
              those rights.
            </p>
          </div>
        </div>
      </Section>

      <CtaSection title="Questions about a job we've done?" body="Call or email us. Tell us the address and what's wrong, and we'll take it from there." />
    </>
  );
}
