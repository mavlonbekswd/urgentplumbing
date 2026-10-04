import type { ReactNode } from "react";
import type { Crumb } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

/** Hero for inner pages: breadcrumbs, H1, intro, optional actions and an optional side column. */
export function PageHero({
  crumbs,
  title,
  intro,
  actions,
  aside,
  children,
}: {
  crumbs: Crumb[];
  title: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-mist">
      <Container className="py-8 md:py-10">
        <Breadcrumbs items={crumbs} />
        <div className={cn("mt-6 grid gap-10 md:mt-8", !!aside && "lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14")}>
          <div className="max-w-3xl pb-4 md:pb-8">
            <h1 className="text-h1">{title}</h1>
            {intro && <div className="mt-5 space-y-3 text-lead text-body">{intro}</div>}
            {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
            {children}
          </div>
          {aside && <div className="pb-4 md:pb-8">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
