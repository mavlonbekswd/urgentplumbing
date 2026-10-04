import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business } from "@/data/business";
import { getService, services, type Service } from "@/data/services";
import { CtaSection } from "@/components/sections/CtaSection";
import { NumberedSteps } from "@/components/sections/NumberedSteps";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceGrid } from "@/components/sections/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { ContactCard } from "@/components/sections/ContactCard";
import { CallButton } from "@/components/ui/CallButton";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ImageSlotId } from "@/data/images";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import { sentence } from "@/lib/cn";
import { PhoneLink } from "@/components/ui/PhoneLink";

// Only the services in data/services.ts exist; any other slug is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related.map(getService).filter((s): s is Service => Boolean(s));

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Services", href: "/services" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
        title={service.h1}
        intro={service.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
        aside={
          <ContactCard
            title={service.urgent ? "Need help right now?" : `Talk to us about ${service.navLabel.toLowerCase()}`}
            urgent={service.urgent}
          />
        }
      />

      {/* Common problems / signs */}
      <Section labelledBy="problems-heading">
        <SectionHeading
          id="problems-heading"
          label={service.urgent ? "Signs to look for" : "Common problems"}
          title={sentence(service.problems.heading)}
          intro={<p>{service.problems.intro}</p>}
        />
        <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {service.problems.items.map((item) => (
            <li key={item.title} className="border-l-[3px] border-water-600 pl-5">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-1.5 text-body">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* What to do right now */}
      <Section tone="mist" labelledBy="right-now-heading">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              id="right-now-heading"
              label={service.urgent ? "Right now" : "Before we arrive"}
              title={sentence(service.rightNow.heading)}
              intro={<p>{service.rightNow.intro}</p>}
            />
            {service.urgent && (
              <div className="mt-8">
                <CallButton />
              </div>
            )}
          </div>
          <div className="rounded-lg border border-line bg-white p-6 sm:p-8">
            <NumberedSteps steps={service.rightNow.steps} />
            {service.rightNow.warning && (
              <p className="mt-8 flex gap-3 rounded-md border border-warn-100 bg-warn-100/60 p-4 text-[0.9375rem] font-semibold text-warn-700">
                <Icon name="alert" className="mt-0.5 size-5" />
                <span>{service.rightNow.warning}</span>
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* How we help + honest note */}
      <Section labelledBy="help-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="help-heading" label="How we help" title={sentence(service.help.heading)} intro={<p>{service.help.intro}</p>} />
            <ul className="mt-8 space-y-3.5">
              {service.help.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-green-600 text-white">
                    <Icon name="check" className="size-3.5" weight="bold" />
                  </span>
                  <span className="text-body">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 self-start">
            <ImageSlot id={`service-${service.slug}` as ImageSlotId} sizes="(min-width: 1024px) 560px, 100vw" />
            {service.note ? (
              <aside aria-labelledby="note-heading" className="rounded-lg border border-navy-100 bg-water-50 p-6 sm:p-8">
                <p className="flex items-center gap-2 text-[0.9375rem] font-semibold text-water-700">
                  <Icon name="info" className="size-5" />
                  Worth knowing
                </p>
                <h3 id="note-heading" className="mt-3 text-h3">
                  {service.note.heading}
                </h3>
                <div className="mt-3 space-y-3 text-body">
                  {service.note.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </aside>
            ) : (
              <aside aria-label="Pricing" className="rounded-lg border border-navy-100 bg-water-50 p-6 sm:p-8">
                <p className="flex items-center gap-2 text-[0.9375rem] font-semibold text-water-700">
                  <Icon name="pound" className="size-5" />
                  About cost
                </p>
                <p className="mt-3 text-h3 font-display font-bold text-navy-900">You&apos;ll know the price before we start.</p>
                <p className="mt-3 text-body">
                  Every job is different, so we don&apos;t quote blind. We&apos;ll explain what&apos;s involved and agree
                  the cost with you first — and if we find something unexpected, we stop and ask.
                </p>
              </aside>
            )}
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section tone="mist" labelledBy="process-heading">
        <SectionHeading id="process-heading" label="What happens next" title="What happens when you contact us." />
        <ProcessSteps steps={service.process} className="mt-12" />
      </Section>

      {/* FAQ */}
      <Section labelledBy="faq-heading">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            id="faq-heading"
            label="Questions"
            title={`${service.navLabel}: common questions.`}
            intro={
              <p>
                Something else you&apos;d like to know? Call <PhoneLink /> or{" "}
                <a href={business.email.href} className="link">
                  email us
                </a>
                .
              </p>
            }
          />
          <FaqList faqs={service.faqs} />
        </div>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section tone="mist" labelledBy="related-heading">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="related-heading" label="Related" title="Related services." />
            <ButtonLink href="/services" variant="secondary" icon="arrowRight" iconPosition="end" className="shrink-0">
              All services
            </ButtonLink>
          </div>
          <ServiceGrid services={related} className="mt-10" />
        </Section>
      )}

      <CtaSection
        title={service.urgent ? "If it can't wait, call us now." : "Tell us about the job."}
        body={
          service.urgent
            ? "Tell us what you can see. We'll help you make it safe and explain what happens next."
            : "Call or send a callback request. We'll ask a few questions, explain what's involved and agree a price and a time with you."
        }
      />

      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
