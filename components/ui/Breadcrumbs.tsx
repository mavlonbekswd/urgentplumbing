import Link from "next/link";
import { breadcrumbSchema, type Crumb } from "@/lib/seo";
import { Icon } from "./Icon";
import { JsonLd } from "./JsonLd";

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. Home is added automatically. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-[0.9375rem]">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-muted">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.href} className="inline-flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-semibold text-navy-800">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="rounded-sm underline decoration-line-strong underline-offset-4 hover:text-navy-800 hover:decoration-navy-800">
                      {c.name}
                    </Link>
                    <Icon name="chevronRight" className="size-3.5 text-line-strong" weight="bold" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
