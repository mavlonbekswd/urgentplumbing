import type { Faq } from "@/data/services";
import { faqSchema } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

/**
 * FAQ accordion built on native <details>/<summary>: keyboard and screen-reader accessible,
 * works without JavaScript, and every answer stays in the HTML for search engines.
 * Emits FAQPage structured data for exactly the questions shown.
 */
export function FaqList({ faqs, schema = true }: { faqs: Faq[]; schema?: boolean }) {
  return (
    <>
      <div className="divide-y divide-line border-y border-line">
        {faqs.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex min-h-16 items-center justify-between gap-4 py-4 text-left font-display text-lg font-semibold leading-snug text-navy-900 transition-colors hover:text-navy-700 sm:text-xl">
              <span>{f.q}</span>
              <span
                aria-hidden="true"
                className="relative grid size-8 shrink-0 place-items-center rounded-md border border-line-strong bg-white text-navy-700 transition-colors group-hover:border-navy-700 group-open:border-navy-700 group-open:bg-navy-700 group-open:text-white"
              >
                <span className="absolute h-0.5 w-3.5 rounded bg-current" />
                <span className="absolute h-3.5 w-0.5 rounded bg-current transition-transform group-open:scale-y-0" />
              </span>
            </summary>
            <div className="max-w-3xl pb-6 pr-12 text-body">
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
      {schema && <JsonLd data={faqSchema(faqs)} />}
    </>
  );
}
