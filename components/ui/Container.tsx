import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Consistent max width and side gutters (20px phone, 32px tablet+). */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-site px-5 md:px-8", className)}>{children}</div>;
}
