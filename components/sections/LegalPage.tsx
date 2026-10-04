import type { ReactNode } from "react";
import type { Crumb } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

/** Simple, readable layout for legal text. */
export function LegalPage({ crumbs, title, updated, children }: { crumbs: Crumb[]; title: string; updated: string; children: ReactNode }) {
  const date = new Date(updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <>
      <section className="border-b border-line bg-mist">
        <Container className="py-8 md:py-12">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-6 text-h1 md:mt-8">{title}</h1>
          <p className="mt-3 text-muted">Last updated {date}</p>
        </Container>
      </section>
      <Container className="py-12 md:py-16">
        <div className="prose-site">{children}</div>
      </Container>
    </>
  );
}
