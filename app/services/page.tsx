import { business } from "@/data/business";
import { howItWorks } from "@/data/content";
import { services } from "@/data/services";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceGrid } from "@/components/sections/ServiceCard";
import { CallButton } from "@/components/ui/CallButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { PhoneLink } from "@/components/ui/PhoneLink";

export const metadata = pageMetadata({
  title: "Plumbing & Drainage Services",
  description: `Emergency plumbing, blocked drains, drain cleaning, leaks, pipe repairs, hot water and fittings for homes and businesses across Cambridgeshire and nearby towns.`,
  path: "/services",
});

export default function ServicesPage() {
  const urgent = services.filter((s) => s.urgent);
  const booked = services.filter((s) => !s.urgent);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", href: "/services" }]}
        title="Plumbing and drainage services"
        intro={
          <>
            <p>
              Pick the problem that sounds most like yours. Each page explains the signs, what to do right now, and
              what happens when you get in touch.
            </p>
            <p>Not sure which it is? Call and describe it — that&apos;s what the phone call is for.</p>
          </>
        }
        actions={
          <>
            <CallButton size="lg" label="short" />
            <WhatsAppButton size="lg" />
          </>
        }
      />

      <Section labelledBy="urgent-heading">
        <SectionHeading
          id="urgent-heading"
          label="Needs attention now"
          title="Problems that shouldn't wait."
          intro={<p>If water is escaping or a drain is backing up, call <PhoneLink /> rather than sending a form.</p>}
        />
        <ServiceGrid services={urgent} className="mt-10" columns={2} headingLevel="h3" />
      </Section>

      <Section tone="mist" labelledBy="booked-heading">
        <SectionHeading
          id="booked-heading"
          label="Repairs and fitting"
          title="Jobs we can book in at a time that suits you."
          intro={<p>Leaks, pipework, hot water and new fittings — we&apos;ll agree the work and a time with you.</p>}
        />
        <ServiceGrid services={booked} className="mt-10" headingLevel="h3" helpCard />
      </Section>

      <Section labelledBy="process-heading">
        <SectionHeading id="process-heading" label="How it works" title="What happens when you get in touch." />
        <ProcessSteps steps={howItWorks} className="mt-12" />
      </Section>

      <Section tone="mist" size="compact" labelledBy="other-trades-heading">
        <div className="flex flex-col gap-6 rounded-lg border border-line bg-white p-6 sm:p-8 md:flex-row md:items-start">
          <Icon name="info" weight="duotone" className="size-10 shrink-0 text-navy-700" />
          <div className="max-w-3xl">
            <h2 id="other-trades-heading" className="text-h3">
              Some jobs need another trade
            </h2>
            <p className="mt-2">
              Work on gas appliances must be done by a Gas Safe registered engineer, and new electrical circuits by a
              qualified electrician. If your job needs either, we&apos;ll tell you when you call — before anyone sets
              off.
            </p>
          </div>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
