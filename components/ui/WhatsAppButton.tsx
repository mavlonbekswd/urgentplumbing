import { business } from "@/data/business";
import { cn } from "@/lib/cn";
import { buttonClasses, type ButtonSize } from "./Button";
import { Icon } from "./Icon";

/**
 * Opens a WhatsApp chat with a pre-filled message. Renders nothing until a WhatsApp number is
 * set in data/business.ts, so the site never shows a dead button.
 * Styled as the secondary action: calling stays the primary one for anything urgent.
 */
export function WhatsAppButton({
  size = "md",
  onDark = false,
  label = "WhatsApp us",
  className,
}: {
  size?: ButtonSize;
  onDark?: boolean;
  label?: string;
  className?: string;
}) {
  const wa = business.whatsapp;
  if (!wa) return null;
  return (
    <a
      href={wa.href}
      target="_blank"
      rel="noopener noreferrer"
      data-whatsapp=""
      aria-label={`${label} — opens WhatsApp`}
      className={buttonClasses(onDark ? "onDark" : "secondary", size, className)}
    >
      <Icon name="whatsapp" weight="fill" className={cn("size-6", "text-whatsapp")} />
      <span>{label}</span>
    </a>
  );
}

/** Inline WhatsApp text link for running text. Renders nothing until configured. */
export function WhatsAppLink({ children = "WhatsApp", className }: { children?: React.ReactNode; className?: string }) {
  const wa = business.whatsapp;
  if (!wa) return null;
  return (
    <a href={wa.href} target="_blank" rel="noopener noreferrer" data-whatsapp="" className={cn("link", className)}>
      {children}
    </a>
  );
}
