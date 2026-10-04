import Link from "next/link";
import { business } from "@/data/business";
import { Icon } from "@/components/ui/Icon";

/**
 * Fixed action bar on phones (below 768px): Call, then WhatsApp. Someone standing in water
 * shouldn't have to scroll to find the number. Until a WhatsApp number is configured, the second
 * button is "Enquire" instead. The body gets matching bottom padding (`pb-callbar`, which
 * includes the iPhone safe area) so the bar never covers the end of the page.
 */
export function MobileCallBar() {
  const wa = business.whatsapp;
  const second =
    "inline-flex min-h-[3.25rem] flex-1 items-center justify-center gap-2 rounded-md border-2 px-3 text-[1.0625rem] font-bold";

  return (
    <div
      aria-label="Contact us"
      role="region"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_-8px_rgb(10_39_66/0.2)] backdrop-blur-sm md:hidden"
    >
      <div className="flex gap-2">
        <a
          href={business.phone.href}
          aria-label={`Call ${business.name} on ${business.phone.display}`}
          className="inline-flex min-h-[3.25rem] flex-[1.35] items-center justify-center gap-2 rounded-md bg-green-600 px-3 text-[1.0625rem] font-bold text-white shadow-[inset_0_-2px_0_rgb(0_0_0/0.18)] active:bg-green-800"
        >
          <Icon name="phone" weight="fill" className="size-5" />
          <span className="max-[389px]:hidden">Call {business.phone.display}</span>
          <span className="hidden max-[389px]:inline">Call now</span>
        </a>
        {wa ? (
          <a
            href={wa.href}
            target="_blank"
            rel="noopener noreferrer"
            data-whatsapp=""
            aria-label="WhatsApp us — opens WhatsApp"
            className={`${second} border-line-strong bg-white text-navy-900 active:bg-mist`}
          >
            <Icon name="whatsapp" weight="fill" className="size-6 text-whatsapp" />
            WhatsApp
          </a>
        ) : (
          <Link href="/contact#enquiry" className={`${second} border-navy-800/80 bg-white text-navy-800 active:bg-navy-100`}>
            Enquire
          </Link>
        )}
      </div>
    </div>
  );
}
