import Image from "next/image";
import Link from "next/link";
import { business } from "@/data/business";
import { cn } from "@/lib/cn";
import mark from "@/public/brand/logo-mark.png";

/**
 * The logo's house mark with the wordmark set in live text, so it stays sharp and readable at
 * header size (the full square logo's lettering becomes illegible when shrunk this small).
 */
export function Logo({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex min-h-11 items-center gap-2 rounded-md no-underline sm:gap-2.5", className)}
      aria-label={`${business.name} — home`}
    >
      <span className={cn("inline-flex shrink-0", onDark && "rounded-md bg-white p-1")}>
        <Image src={mark} alt="" priority className="h-9 w-auto sm:h-11" sizes="60px" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.25rem] font-extrabold uppercase tracking-[0.12em] sm:text-[1.5rem]",
            onDark ? "text-white" : "text-green-600",
          )}
        >
          Urgent
        </span>
        <span
          className={cn(
            "mt-1 font-display text-[0.6875rem] font-bold uppercase tracking-[0.06em] sm:text-[0.75rem] sm:tracking-[0.09em]",
            onDark ? "text-navy-200" : "text-navy-700",
          )}
        >
          Plumbing &amp; Drainage
        </span>
      </span>
    </Link>
  );
}
