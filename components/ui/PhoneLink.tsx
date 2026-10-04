import { business } from "@/data/business";
import { cn } from "@/lib/cn";

/** The phone number inside running text: always a tap-to-call link, never split across lines. */
export function PhoneLink({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <a
      href={business.phone.href}
      className={cn(
        "whitespace-nowrap font-semibold underline underline-offset-4",
        onDark ? "text-white decoration-white/50 hover:decoration-white" : "link",
        className,
      )}
    >
      {business.phone.display}
    </a>
  );
}
