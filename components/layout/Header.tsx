import Link from "next/link";
import { business, availabilityShort } from "@/data/business";
import { primaryNav, serviceLinks } from "@/data/navigation";
import { AnchorButton, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function Header() {
  return (
    <>
      {/* Utility strip: scrolls away; the main bar below stays pinned. */}
      <div className="on-dark hidden bg-navy-900 text-[0.9375rem] text-navy-200 lg:block">
        <Container className="flex h-10 items-center justify-between gap-6">
          <p className="flex items-center gap-2">
            <Icon name="wrench" weight="duotone" className="size-4 text-green-300" />
            Local plumbing &amp; drainage for homes and businesses
          </p>
          <div className="flex items-center gap-6">
            <a href={business.email.href} className="inline-flex items-center gap-2 hover:text-white hover:underline">
              <Icon name="mail" className="size-4" />
              {business.email.address}
            </a>
            <span className="inline-flex items-center gap-2 font-semibold text-white">
              <span className="size-2 rounded-full bg-green-300" aria-hidden="true" />
              {availabilityShort}
            </span>
          </div>
        </Container>
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-white/[0.98] shadow-card">
        <Container className="flex h-[4.5rem] items-center justify-between gap-3 lg:h-20">
          <Logo />

          <DesktopNav items={primaryNav} services={serviceLinks} />

          <div className="flex items-center gap-2">
            {/* Desktop: number in full from 1280px, "Call now" between 1024 and 1280 */}
            <div className="hidden lg:block">
              <AnchorButton
                href={business.phone.href}
                icon="phone"
                aria-label={`Call ${business.name} on ${business.phone.display}`}
              >
                <span className="xl:hidden">Call now</span>
                <span className="hidden xl:inline">{business.phone.display}</span>
              </AnchorButton>
            </div>

            {/* Phones and tablets: compact call button (below 360px the fixed bottom bar carries the number) */}
            <a
              href={business.phone.href}
              aria-label={`Call ${business.name} on ${business.phone.display}`}
              className="hidden min-h-11 min-w-11 items-center justify-center gap-2 rounded-md bg-green-600 px-2.5 font-bold text-white shadow-[inset_0_-2px_0_rgb(0_0_0/0.18)] hover:bg-green-700 min-[360px]:inline-flex sm:px-4 lg:hidden"
            >
              <Icon name="phone" className="size-5" />
              <span className="hidden sm:inline">{business.phone.display}</span>
              <span className="hidden min-[400px]:inline sm:hidden">Call</span>
            </a>

            <MobileNav
              items={primaryNav}
              services={serviceLinks.map(({ href, label, icon }) => ({ href, label, icon }))}
              logo={<Logo />}
              contact={<MobileMenuContact />}
            />
          </div>
        </Container>
      </header>
    </>
  );
}

function MobileMenuContact() {
  return (
    <div className="space-y-3">
      <AnchorButton
        href={business.phone.href}
        size="lg"
        icon="phone"
        className="w-full"
        aria-label={`Call ${business.name} on ${business.phone.display}`}
      >
        Call {business.phone.display}
      </AnchorButton>
      <WhatsAppButton size="lg" className="w-full" />
      <ButtonLink href="/contact#enquiry" variant={business.whatsapp ? "quiet" : "secondary"} size="lg" className="w-full">
        Send an enquiry
      </ButtonLink>
      <div className="space-y-2 pt-3 text-[0.9375rem] text-muted">
        <p className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-green-600" aria-hidden="true" />
          {availabilityShort}
        </p>
        <p>
          <a href={business.email.href} className="link">
            {business.email.address}
          </a>
        </p>
        <p>
          <Link href="/areas-we-cover" className="link">
            See the areas we cover
          </Link>
        </p>
      </div>
    </div>
  );
}
