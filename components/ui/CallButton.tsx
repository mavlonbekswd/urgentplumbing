import { business } from "@/data/business";
import { AnchorButton, type ButtonSize, type ButtonVariant } from "./Button";

/**
 * The phone call-to-action. Shows the number by default, because a visible number is itself
 * reassuring — it says there's a real line to ring. `label="short"` reads "Call now".
 */
export function CallButton({
  size = "md",
  variant = "primary",
  label = "number",
  className,
}: {
  size?: ButtonSize;
  variant?: ButtonVariant;
  label?: "number" | "short";
  className?: string;
}) {
  const text = label === "number" ? `Call ${business.phone.display}` : "Call now";
  return (
    <AnchorButton
      href={business.phone.href}
      variant={variant}
      size={size}
      icon="phone"
      className={className}
      aria-label={`Call ${business.name} on ${business.phone.display}`}
    >
      {text}
    </AnchorButton>
  );
}
