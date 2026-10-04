import Link from "next/link";
import { business } from "@/data/business";
import { AnchorButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/cn";

/**
 * The three ways to get in touch, in order of urgency:
 *   urgent problem → call · quick message → WhatsApp · can wait → enquiry form
 * Used beside service-page headings so the next step is always one tap away.
 */
export function ContactCard({ title, urgent = false, className }: { title: string; urgent?: boolean; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-line bg-white p-5 shadow-raised sm:p-6", className)}>
      <p className="font-display text-h3 font-bold text-navy-900">{title}</p>

      <div className="mt-4">
        <p className="text-[0.9375rem] font-semibold text-muted">{urgent ? "Water escaping or a drain backing up?" : "Urgent problem?"}</p>
        <AnchorButton
          href={business.phone.href}
          size="lg"
          icon="phone"
          className="mt-2 w-full"
          aria-label={`Call ${business.name} on ${business.phone.display}`}
        >
          Call {business.phone.display}
        </AnchorButton>
      </div>

      {business.whatsapp && (
        <div className="mt-4">
          <p className="text-[0.9375rem] font-semibold text-muted">Quick question, or want to send a photo?</p>
          <WhatsAppButton className="mt-2 w-full" />
        </div>
      )}

      <div className="mt-5 border-t border-line pt-4">
        <p className="text-[0.9375rem] text-muted">Not urgent, or want a quote?</p>
        <Link href="/contact#enquiry" className="link mt-1 inline-flex min-h-11 items-center gap-1.5">
          Send an enquiry
          <Icon name="arrowRight" weight="bold" className="size-4" />
        </Link>
      </div>
    </div>
  );
}
