import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Section heading: a small label led by a short green rule, the h2, and an optional intro.
 * Every page section uses this, so headings look the same everywhere.
 */
export function SectionHeading({
  id,
  label,
  title,
  intro,
  align = "left",
  onDark = false,
  className,
  as: Tag = "h2",
}: {
  id?: string;
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {label && (
        <p
          className={cn(
            "mb-3 inline-flex items-center gap-2.5 text-[0.9375rem] font-bold",
            onDark ? "text-green-300" : "text-green-700",
          )}
        >
          <span aria-hidden="true" className={cn("h-[3px] w-6 rounded-full", onDark ? "bg-green-300" : "bg-green-600")} />
          {label}
        </p>
      )}
      <Tag id={id} className={cn("text-h2", onDark && "text-white")}>
        {title}
      </Tag>
      {intro && (
        <div className={cn("mt-4 text-lead", onDark ? "text-navy-200" : "text-muted")}>{intro}</div>
      )}
    </div>
  );
}
