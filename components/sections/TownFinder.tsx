"use client";

import { useId, useMemo, useState } from "react";
import { business } from "@/data/business";
import { Icon } from "@/components/ui/Icon";
import { LocationTile, type LocationItem } from "./LocationGrid";

interface Group {
  id: string;
  title: string;
  towns: LocationItem[];
}

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");

/**
 * The covered towns grouped by direction from the base, with a "find your town" filter.
 * Without JavaScript every group still renders in full; the filter is an enhancement.
 */
export function TownFinder({ base, groups }: { base: LocationItem; groups: Group[] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const statusId = useId();
  const q = normalise(query);

  const { filtered, baseMatches, count } = useMemo(() => {
    const matches = (t: LocationItem) => !q || normalise(t.name).includes(q) || normalise(t.county ?? "").includes(q);
    const filtered = groups.map((g) => ({ ...g, towns: g.towns.filter(matches) })).filter((g) => g.towns.length > 0);
    const baseMatches = matches(base);
    const count = filtered.reduce((n, g) => n + g.towns.length, 0) + (baseMatches ? 1 : 0);
    return { filtered, baseMatches, count };
  }, [groups, base, q]);

  return (
    <div>
      <div className="max-w-xl">
        <label htmlFor={inputId} className="block font-semibold text-navy-900">
          Find your town
        </label>
        <div className="relative mt-2">
          <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Start typing, e.g. Ely"
            autoComplete="address-level2"
            aria-describedby={statusId}
            className="h-14 w-full rounded-md border-2 border-line-strong bg-white pl-12 pr-4 text-lg text-ink placeholder:text-muted/80 focus:border-water-600 focus:outline-none focus:ring-4 focus:ring-water-100"
          />
        </div>
        <p id={statusId} aria-live="polite" className="mt-2 min-h-6 text-[0.9375rem] text-muted">
          {q && count > 0 ? `${count} ${count === 1 ? "town matches" : "towns match"}` : ""}
        </p>
      </div>

      {count === 0 ? (
        <div className="mt-4 rounded-lg border border-navy-100 bg-water-50 p-5 sm:p-6">
          <p className="font-display text-xl font-bold text-navy-900">&ldquo;{query}&rdquo; isn&apos;t on our list.</p>
          <p className="mt-2 max-w-2xl">
            That doesn&apos;t always mean we can&apos;t help — we also work in the villages around and between these
            towns. Call{" "}
            <a href={business.phone.href} className="link whitespace-nowrap">
              {business.phone.display}
            </a>
            {business.whatsapp && (
              <>
                {" "}
                or{" "}
                <a href={business.whatsapp.href} target="_blank" rel="noopener noreferrer" className="link">
                  message us on WhatsApp
                </a>
              </>
            )}{" "}
            and we&apos;ll tell you straight away, or use the postcode check on this page.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-10">
          {baseMatches && (
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <LocationTile town={base} />
            </ul>
          )}
          {filtered.map((g) => (
            <section key={g.id} aria-labelledby={`area-${g.id}`}>
              <h3 id={`area-${g.id}`} className="text-lg font-bold">
                {g.title}
              </h3>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-2.5">
                {g.towns.map((t) => (
                  <LocationTile key={t.name} town={t} showCounty />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
