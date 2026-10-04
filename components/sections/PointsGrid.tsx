import type { Point } from "@/data/content";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** Icon + title + body points, separated by hairlines rather than boxed into cards. */
export function PointsGrid({
  points,
  columns = 3,
  className,
  compact = false,
}: {
  points: Point[];
  columns?: 2 | 3 | 4;
  className?: string;
  compact?: boolean;
}) {
  return (
    <ul
      className={cn(
        "grid gap-x-8",
        compact ? "gap-y-6" : "gap-y-10",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {points.map((p) => (
        <li key={p.title} className={cn("border-t-2 border-navy-100", compact ? "pt-5" : "pt-6")}>
          <Icon name={p.icon} weight="duotone" className="size-10 text-navy-700" />
          <h3 className={cn("mt-4", compact ? "text-lg" : "text-h3")}>{p.title}</h3>
          <p className="mt-2 text-body">{p.body}</p>
        </li>
      ))}
    </ul>
  );
}
