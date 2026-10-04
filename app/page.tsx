import Link from "next/link";
import { business } from "@/data/business";
import { howItWorks, reasons } from "@/data/content";
import { homeFaqs } from "@/data/faqs";
import { serviceOptions, services } from "@/data/services";
import { AreasPreview } from "@/components/sections/AreasPreview";
import { CtaSection } from "@/components/sections/CtaSection";
import { EmergencyBand } from "@/components/sections/EmergencyBand";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { GuaranteePreview } from "@/components/sections/GuaranteePreview";
import { PointsGrid } from "@/components/sections/PointsGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { RealWorkSection } from "@/components/sections/RealWorkSection";
import { ServiceGrid } from "@/components/sections/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/CallButton";
import { Container } from "@/components/ui/Container";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `${business.name} | Local Plumber for ${business.base.town} & Surrounding Areas`,
  absoluteTitle: true,
  description: `Leaks, blocked drains, burst pipes and hot water problems. Local plumbing and drainage for homes and businesses across Cambridgeshire and nearby towns. Call ${business.phone.display}.`,
  path: "/",
});

// Reassurance statements, each one something the business stands behind (see data/business.ts).
const heroPoints = [
  "Clear price before work begins",
  business.availability.emergency24x7 ? "Emergency line available 24/7" : "Help with urgent problems",
  "Domestic & commercial plumbing",
  "Wide local coverage",
];

export default function HomePage() {
  return (
    <>
      {/* ───────────── Hero: the problem, how to reach us, and an enquiry form ───────────── */}
      <section className="border-b border-line bg-mist">
        <Container className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[1fr_minmax(0,30rem)] lg:items-center lg:gap-14 lg:py-12 xl:gap-20">
          <div>
            <p className="inline-flex items-center gap-2.5 text-[0.9375rem] font-bold text-green-700">
              <span aria-hidden="true" className="h-[3px] w-6 rounded-full bg-green-600" />
              Local plumbing &amp; drainage
            </p>
            <h1 className="mt-4 text-h1">
              Leak, blockage or no hot water? <span className="text-navy-700">Talk to a local plumber.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lead text-body">
              Tell us what&apos;s gone wrong. We&apos;ll explain what needs doing and agree the cost before any work
              starts.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton size="lg" label="short" />
              <WhatsAppButton size="lg" />
            </div>
            <p className="mt-3 text-[0.9375rem] text-muted">
              Water leaking? Call{" "}
              <a href={business.phone.href} className="font-semibold text-navy-800 underline underline-offset-2 whitespace-nowrap">
                {business.phone.display}
              </a>{" "}
              — it&apos;s the quickest way to reach us.{" "}
              <a href="#enquiry" className="link whitespace-nowrap lg:hidden">
                Not urgent? Send an enquiry
              </a>
            </p>

            <ul className="mt-8 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {heroPoints.map((t) => (
                <li key={t} className="flex items-center gap-2.5 font-semibold text-navy-900">
                  <Icon name="check" weight="bold" className="size-5 text-green-600" />
                  {t}
                </li>
              ))}
            </ul>

            <p className="mt-6 flex items-start gap-2 border-t border-line pt-5 text-body">
              <Icon name="pin" weight="duotone" className="mt-0.5 size-5 text-navy-700" />
              <span>
                Serving {business.base.town} and the surrounding towns and villages.{" "}
                <Link href="/areas-we-cover" className="link whitespace-nowrap">
                  Check your area
                </Link>
              </span>
            </p>
          </div>

          <div id="enquiry" className="scroll-mt-28 rounded-xl border border-line bg-white p-5 shadow-raised sm:p-7">
            <h2 className="font-display text-[1.625rem] font-bold leading-tight text-navy-900">Send an enquiry</h2>
            <p className="mt-1.5 text-[0.9375rem] text-muted">
              For quotes and jobs that can wait — we&apos;ll get back to you to talk it through.
            </p>
            <div className="mt-5">
              <EnquiryForm variant="short" services={serviceOptions} />
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────── Services ───────────── */}
      <Section labelledBy="services-heading">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="services-heading"
            label="What we do"
            title="Plumbing and drainage, from a dripping tap to a burst pipe."
            intro={<p>Choose a service to see what&apos;s involved, what to do right now, and what happens when you call.</p>}
          />
          <ButtonLink href="/services" variant="secondary" icon="arrowRight" iconPosition="end" className="shrink-0">
            All services
          </ButtonLink>
        </div>
        <ServiceGrid services={services} className="mt-10" columns={4} helpCard />
      </Section>

      {/* ───────────── Real work ───────────── */}
      <RealWorkSection />

      {/* ───────────── Emergency ───────────── */}
      <EmergencyBand />

      {/* ───────────── Why choose us ───────────── */}
      <Section labelledBy="why-heading">
        <SectionHeading
          id="why-heading"
          label="Why people call us"
          title="Straightforward plumbing, explained as we go."
          intro={
            <p>
              No sales script and no pressure. These are the things we do on every job — whether it&apos;s a washer
              or a new cylinder.
            </p>
          }
        />
        <PointsGrid points={reasons} className="mt-12" />
      </Section>

      {/* ───────────── How it works ───────────── */}
      <Section tone="mist" labelledBy="how-heading">
        <SectionHeading
          id="how-heading"
          label="How it works"
          title="Four steps, and you're in control of every one."
        />
        <ProcessSteps steps={howItWorks} className="mt-12" />
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <CallButton />
          <WhatsAppButton />
        </div>
      </Section>

      {/* ───────────── Guarantee ───────────── */}
      <GuaranteePreview />

      {/* ───────────── Areas ───────────── */}
      <AreasPreview />

      {/* ───────────── FAQ ───────────── */}
      <Section labelledBy="faq-heading">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              id="faq-heading"
              label="Questions"
              title="Questions people ask before they call."
              intro={<p>Can&apos;t see yours? Call and ask — there&apos;s no obligation.</p>}
            />
            <div className="mt-8">
              <CallButton variant="secondary" />
            </div>
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
