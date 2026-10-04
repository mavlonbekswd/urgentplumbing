import Link from "next/link";
import { business, availabilityShort } from "@/data/business";
import { contactFaqs } from "@/data/faqs";
import { serviceOptions } from "@/data/services";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { NumberedSteps } from "@/components/sections/NumberedSteps";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList } from "@/components/ui/FaqList";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: `Call ${business.phone.display} for anything urgent${business.whatsapp ? ", message us on WhatsApp" : ""}, or send an enquiry for quotes and jobs that can wait.`,
  path: "/contact",
});

function Option({ step, icon, label, title, children }: { step: number; icon: IconName; label: string; title: string; children: React.ReactNode }) {
  return (
    <li className="relative flex gap-4 py-6 first:pt-0">
      <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-navy-100 bg-white text-navy-700">
        <Icon name={icon} weight="duotone" className="size-6" />
        <span className="sr-only">Option {step}</span>
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-green-700">{label}</p>
        <h3 className="mt-1 text-h3">{title}</h3>
        <div className="mt-3">{children}</div>
      </div>
    </li>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", href: "/contact" }]}
        title="Contact us"
        intro={<p>The best way to reach us depends on how urgent it is. Here&apos;s the quickest route for each.</p>}
      />

      <Section labelledBy="enquiry-heading">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Contact options, most urgent first */}
          <div>
            <h2 className="sr-only">Ways to contact us</h2>
            <ol className="divide-y divide-line">
              <Option step={1} icon="phone" label="Urgent problem" title="Call us">
                <a
                  href={business.phone.href}
                  className="font-display text-3xl font-bold text-navy-900 underline decoration-line-strong underline-offset-[6px] hover:decoration-navy-900"
                  aria-label={`Call ${business.name} on ${business.phone.display}`}
                >
                  {business.phone.display}
                </a>
                <p className="mt-2 text-muted">{availabilityShort}</p>
                <p className="mt-3 rounded-md border border-green-100 bg-green-50 p-3.5 text-[0.9375rem] text-navy-900">
                  <strong>Water leaking?</strong> Turn off your stopcock while you ring — it&apos;s usually under the kitchen
                  sink.
                </p>
              </Option>

              {business.whatsapp && (
                <Option step={2} icon="whatsapp" label="Quick message" title="WhatsApp us">
                  <p className="text-body">Send a message or a photo of the problem, and we&apos;ll reply on WhatsApp.</p>
                  <WhatsAppButton className="mt-4" />
                </Option>
              )}

              <Option step={business.whatsapp ? 3 : 2} icon="clipboard" label="Not urgent, or need a quote" title="Send an enquiry">
                <p className="text-body">
                  Use the form{" "}
                  <span className="hidden lg:inline">opposite</span>
                  <a href="#enquiry" className="link lg:hidden">
                    below
                  </a>
                  . We&apos;ll get back to you to talk it through.
                </p>
                <p className="mt-3 text-[0.9375rem] text-muted">
                  Prefer email?{" "}
                  <a href={business.email.href} className="link [overflow-wrap:anywhere]">
                    {business.email.address}
                  </a>{" "}
                  — photos welcome.
                </p>
              </Option>
            </ol>

            <p className="mt-2 flex items-start gap-2 border-t border-line pt-6 text-body">
              <Icon name="pin" weight="duotone" className="mt-0.5 size-5 text-navy-700" />
              <span>
                Based in {business.base.town}, covering the surrounding towns.{" "}
                <Link href="/areas-we-cover" className="link whitespace-nowrap">
                  Check your area
                </Link>
              </span>
            </p>
          </div>

          {/* Enquiry form */}
          <div id="enquiry" className="scroll-mt-28 self-start rounded-xl border border-line bg-white p-5 shadow-raised sm:p-8">
            <h2 id="enquiry-heading" className="text-h2">
              Send an enquiry
            </h2>
            <p className="mt-2 text-muted">For quotes and jobs that can wait. If water is leaking, please call instead.</p>
            <div className="mt-6">
              <EnquiryForm variant="full" services={serviceOptions} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="next-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="next-heading" label="What happens next" title="After you get in touch." />
            <div className="mt-8">
              <NumberedSteps
                steps={[
                  "We get back to you to talk through the problem and ask a few questions.",
                  "We explain what we think is needed and how charges work, and agree a time.",
                  "Nothing goes ahead until you're happy with the plan and the price.",
                ]}
              />
            </div>
          </div>
          <div>
            <SectionHeading id="contact-faq-heading" label="Questions" title="Before you contact us." />
            <div className="mt-6">
              <FaqList faqs={contactFaqs} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
