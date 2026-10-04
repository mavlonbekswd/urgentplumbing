import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

// Sections separate themselves with a background change and a hairline border rather than by
// floating every block in a card.
export type SectionTone = "white" | "mist" | "navy" | "green";

const tones: Record<SectionTone, string> = {
  white: "bg-white",
  mist: "bg-mist border-y border-line",
  navy: "on-dark bg-navy-900 text-navy-100",
  green: "bg-green-50 border-y border-green-100",
};

export function Section({
  children,
  tone = "white",
  id,
  className,
  containerClassName,
  labelledBy,
  size = "default",
}: {
  children: ReactNode;
  tone?: SectionTone;
  id?: string;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  size?: "default" | "compact";
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(tones[tone], size === "default" ? "py-16 md:py-24" : "py-12 md:py-16", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
