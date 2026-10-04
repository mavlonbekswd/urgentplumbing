import Link from "next/link";
import { business } from "@/data/business";
import type { Service } from "@/data/services";
import { serviceHref } from "@/data/services";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Service card. The heading link stretches over the whole card (one tab stop, one accessible
 * name), and "Learn more" is visual only.
 */
export function ServiceCard({ service, headingLevel = "h3" }: { service: Service; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-card transition-[border-color,box-shadow] duration-150 hover:border-navy-300 hover:shadow-raised focus-within:border-navy-300 focus-within:shadow-raised">
      <div className="flex items-start justify-between gap-3">
        <Icon name={service.icon} weight="duotone" className="size-11 text-navy-700" />
        {service.urgent && (
          <span className="inline-flex items-center gap-1.5 pt-1 text-[0.8125rem] font-bold text-green-700">
            <span aria-hidden="true" className="size-2 rounded-full bg-green-600" />
            Call if urgent
          </span>
        )}
      </div>
      <span aria-hidden="true" className="mt-5 block h-[3px] w-8 rounded-full bg-green-600 transition-[width] duration-200 group-hover:w-14" />
      <Heading className="mt-4 text-h3">
        <Link
          href={serviceHref(service.slug)}
          className="rounded-sm after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none group-focus-within:underline"
        >
          {service.name}
        </Link>
      </Heading>
      <p className="mt-2 flex-1 text-body">{service.summary}</p>
      <span
        aria-hidden="true"
        className="mt-5 inline-flex items-center gap-2 font-semibold text-water-600 underline decoration-water-600/40 underline-offset-4 group-hover:decoration-water-600"
      >
        Learn more
        <Icon name="arrowRight" className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}

/** Final tile in a service grid for people who can't name their problem. */
function HelpCard({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-full flex-col rounded-lg border-2 border-dashed border-navy-200 bg-water-50 p-6", className)}>
      <Icon name="chat" weight="duotone" className="size-11 text-navy-700" />
      <p className="mt-5 font-display text-h3 font-bold text-navy-900">Not sure what you need?</p>
      <p className="mt-2 flex-1 text-body">
        Most plumbing problems are easier to describe than to name. Tell us what you can see and hear, and we&apos;ll
        work out the rest.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <a
          href={business.phone.href}
          className="inline-flex min-h-11 items-center gap-2 font-bold text-green-700 underline decoration-green-600/40 underline-offset-4 hover:decoration-green-700"
        >
          <Icon name="phone" className="size-4" />
          {business.phone.display}
        </a>
        {business.whatsapp && (
          <a
            href={business.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            data-whatsapp=""
            className="inline-flex min-h-11 items-center gap-2 font-bold text-navy-800 underline decoration-navy-300 underline-offset-4 hover:decoration-navy-800"
          >
            <Icon name="whatsapp" weight="fill" className="size-5 text-whatsapp" />
            WhatsApp
          </a>
        )}
        <Link href="/contact#enquiry" className="link inline-flex min-h-11 items-center">
          Send an enquiry
        </Link>
      </div>
    </div>
  );
}

export function ServiceGrid({
  services,
  className,
  headingLevel,
  columns = 3,
  helpCard = false,
}: {
  services: Service[];
  className?: string;
  headingLevel?: "h2" | "h3";
  /** 3 = up to three across; 4 = three across on laptops, four on wide screens. */
  columns?: 2 | 3 | 4;
  /** Adds a "not sure what you need?" tile at the end. */
  helpCard?: boolean;
}) {
  // With 7 services, the help tile makes 8: it spans two columns in a 3-column grid so rows stay full.
  const total = services.length + (helpCard ? 1 : 0);
  const helpSpan =
    columns === 4 && total % 3 === 2 ? "lg:col-span-2 xl:col-span-1" : columns === 3 && total % 3 === 2 ? "lg:col-span-2" : "";
  return (
    <ul
      className={cn(
        "grid gap-5 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {services.map((s) => (
        <li key={s.slug}>
          <ServiceCard service={s} headingLevel={headingLevel} />
        </li>
      ))}
      {helpCard && (
        <li className={helpSpan}>
          <HelpCard />
        </li>
      )}
    </ul>
  );
}
