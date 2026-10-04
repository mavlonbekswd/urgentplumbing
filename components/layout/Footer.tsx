import Link from "next/link";
import { business, availabilityShort, GAS_EMERGENCY } from "@/data/business";
import { townsInDisplayOrder } from "@/data/locations";
import { companyLinks, legalLinks, serviceLinks } from "@/data/navigation";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

const footerLink =
  "inline-flex min-h-9 items-center rounded-sm text-navy-200 underline-offset-4 transition-colors hover:text-white hover:underline";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 font-display text-base font-bold uppercase tracking-[0.08em] text-white">{title}</h2>
      {children}
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-navy-950 text-navy-200">
      <Container className="py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_0.9fr] lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo onDark />
            <p className="mt-5 max-w-sm">
              Local plumbing and drainage for homes and businesses across {business.base.town} and the surrounding area.
            </p>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={business.phone.href}
                  className="inline-flex items-center gap-3 font-display text-2xl font-bold text-white hover:text-green-300"
                  aria-label={`Call ${business.name} on ${business.phone.display}`}
                >
                  <span className="grid size-10 place-items-center rounded-md bg-green-600 text-white">
                    <Icon name="phone" className="size-5" />
                  </span>
                  {business.phone.display}
                </a>
              </li>
              <li>
                <a href={business.email.href} className="inline-flex items-center gap-3 [overflow-wrap:anywhere] hover:text-white hover:underline">
                  <span className="grid size-10 shrink-0 place-items-center rounded-md border border-navy-800 text-navy-300">
                    <Icon name="mail" className="size-5" />
                  </span>
                  {business.email.address}
                </a>
              </li>
              {business.whatsapp && (
                <li>
                  <a
                    href={business.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-whatsapp=""
                    className="inline-flex items-center gap-3 font-semibold text-white hover:underline"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-md border border-navy-800">
                      <Icon name="whatsapp" weight="fill" className="size-6 text-whatsapp" />
                    </span>
                    Message us on WhatsApp
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-md border border-navy-800 text-navy-300">
                  <Icon name="clock" className="size-5" />
                </span>
                {availabilityShort}
              </li>
            </ul>
          </div>

          <Column title="Services">
            <ul>
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className={footerLink}>
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className={`${footerLink} font-semibold text-white`}>
                  All services
                </Link>
              </li>
            </ul>
          </Column>

          <Column title="Areas">
            <ul>
              {townsInDisplayOrder.slice(0, 8).map((t) => (
                <li key={t.name} className="flex min-h-9 items-center">
                  {t.name}
                </li>
              ))}
              <li>
                <Link href="/areas-we-cover" className={`${footerLink} font-semibold text-white`}>
                  All areas we cover
                </Link>
              </li>
            </ul>
          </Column>

          <div className="space-y-8">
            <Column title="Company">
              <ul>
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={footerLink}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
            <Column title="Legal">
              <ul>
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={footerLink}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-navy-800 pt-6 text-[0.9375rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {business.name}
            {business.legalName && business.companyNumber
              ? ` is a trading name of ${business.legalName}, company no. ${business.companyNumber}.`
              : "."}
          </p>
          <p>
            Smell gas? Call the National Gas Emergency Service on{" "}
            <a href={GAS_EMERGENCY.href} className="whitespace-nowrap font-semibold text-white underline underline-offset-4">
              {GAS_EMERGENCY.display}
            </a>
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}
