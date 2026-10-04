import Link from "next/link";
import type { ReactNode } from "react";
import { business, availabilityShort } from "@/data/business";
import { CallButton } from "@/components/ui/CallButton";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/**
 * Closing call-to-action used at the foot of every page. Contact options in order of urgency:
 * call (primary), WhatsApp (secondary), enquiry form (text link).
 */
export function CtaSection({
  title = "Tell us what's gone wrong.",
  body = "Call and describe the problem. We'll tell you what we think it is, what's likely to be involved, and what happens next.",
}: {
  title?: ReactNode;
  body?: ReactNode;
}) {
  return (
    <section aria-labelledby="cta-heading" className="on-dark bg-navy-900">
      <Container className="py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <div className="max-w-2xl">
            <h2 id="cta-heading" className="text-h2 text-white">
              {title}
            </h2>
            <p className="mt-4 text-lead text-navy-200">{body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton size="lg" />
              <WhatsAppButton size="lg" onDark />
            </div>
            <p className="mt-5 text-navy-200">
              Not urgent?{" "}
              <Link href="/contact#enquiry" className="font-semibold text-white underline underline-offset-4 hover:decoration-2">
                Send an enquiry
              </Link>{" "}
              and we&apos;ll get back to you.
            </p>
          </div>
          <ul className="space-y-3 border-t border-navy-800 pt-6 text-navy-200 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <li className="flex items-center gap-3">
              <Icon name="clock" weight="duotone" className="size-6 text-green-300" />
              {availabilityShort}
            </li>
            <li className="flex items-center gap-3">
              <Icon name="mail" weight="duotone" className="size-6 text-green-300" />
              <a href={business.email.href} className="[overflow-wrap:anywhere] underline underline-offset-4 hover:text-white">
                {business.email.address}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="pin" weight="duotone" className="size-6 text-green-300" />
              <Link href="/areas-we-cover" className="underline underline-offset-4 hover:text-white">
                See the areas we cover
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
