import Link from "next/link";
import type { Metadata } from "next";
import { business } from "@/data/business";
import { services, serviceHref } from "@/data/services";
import { ButtonLink } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/CallButton";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

// Next.js adds the noindex robots tag to this page itself.
export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="bg-mist">
      <Container className="py-14 md:py-20">
        <div className="max-w-3xl">
          <p className="font-display text-lg font-bold text-green-700">Error 404</p>
          <h1 className="mt-3 text-h1">We can&apos;t find that page.</h1>
          <p className="mt-5 text-lead text-body">
            The link may be old, or the address may have a typo. If you have a plumbing problem right now, the quickest
            thing to do is call us.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallButton size="lg" />
            <ButtonLink href="/" variant="secondary" size="lg">
              Go to the home page
            </ButtonLink>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-2">
          <div>
            <h2 className="text-h3">Our services</h2>
            <ul className="mt-4 space-y-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={serviceHref(s.slug)} className="link inline-flex min-h-10 items-center gap-2">
                    <Icon name="chevronRight" className="size-4" weight="bold" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-h3">Other pages</h2>
            <ul className="mt-4 space-y-1">
              {[
                ["/areas-we-cover", "Areas we cover"],
                ["/guarantee", "Our guarantee"],
                ["/about", "About us"],
                ["/contact", "Contact us"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href!} className="link inline-flex min-h-10 items-center gap-2">
                    <Icon name="chevronRight" className="size-4" weight="bold" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-muted">
              Or email{" "}
              <a href={business.email.href} className="link [overflow-wrap:anywhere]">
                {business.email.address}
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
