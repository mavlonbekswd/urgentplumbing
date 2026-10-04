import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export interface LocationItem {
  name: string;
  county?: string;
  isBase?: boolean;
}

/** One compact location tile: pin, town, and optionally its county. */
export function LocationTile({ town, showCounty = false }: { town: LocationItem; showCounty?: boolean }) {
  return (
    <li
      className={cn(
        "flex min-h-13 items-center gap-2.5 rounded-md border px-3 py-2",
        town.isBase ? "border-navy-700 bg-navy-700 text-white" : "border-line bg-white text-navy-900",
      )}
    >
      <Icon
        name={town.isBase ? "home" : "pin"}
        weight={town.isBase ? "fill" : "duotone"}
        className={cn("size-5", town.isBase ? "text-green-300" : "text-green-600")}
      />
      <span className="min-w-0 leading-tight">
        <span className="block font-semibold">{town.name}</span>
        {town.isBase ? (
          <span className="mt-0.5 block text-[0.8125rem] text-navy-200">Our base</span>
        ) : (
          showCounty && town.county && <span className="mt-0.5 block text-[0.8125rem] text-muted">{town.county}</span>
        )}
      </span>
    </li>
  );
}

/** Responsive grid of location tiles — small, bordered rows rather than oversized cards. */
export function LocationGrid({
  towns,
  showCounty = false,
  className,
  label,
}: {
  towns: LocationItem[];
  showCounty?: boolean;
  className?: string;
  label?: string;
}) {
  return (
    <ul aria-label={label} className={cn("grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-2.5", className)}>
      {towns.map((t) => (
        <LocationTile key={t.name} town={t} showCounty={showCounty} />
      ))}
    </ul>
  );
}
