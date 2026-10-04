import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

// One component for every button-styled link. Variants are roles, not colours:
//   primary   — green, for calling or the main next step (always the most prominent)
//   secondary — outlined navy, for the alternative next step on light backgrounds
//   onDark    — outlined white, the alternative step on navy backgrounds
//   quiet     — text-weight button for low-priority actions

export type ButtonVariant = "primary" | "secondary" | "onDark" | "quiet";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-md font-sans font-bold leading-none no-underline transition-[background-color,border-color,color,box-shadow] duration-150 select-none whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-green-600 text-white shadow-[inset_0_-2px_0_rgb(0_0_0/0.18)] hover:bg-green-700 active:bg-green-800",
  secondary:
    "bg-white text-navy-800 border-2 border-navy-800/80 hover:border-navy-800 hover:bg-navy-100/60",
  onDark: "bg-transparent text-white border-2 border-white/70 hover:border-white hover:bg-white/10",
  quiet: "text-navy-800 underline decoration-navy-300 underline-offset-4 hover:decoration-navy-800",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-12 px-5 text-[1.0625rem]",
  lg: "min-h-14 px-6 text-lg",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], variant === "quiet" ? "min-h-11 px-1" : sizes[size], className);
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconPosition?: "start" | "end";
  className?: string;
  children: ReactNode;
};

/** Internal links that look like buttons. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "start",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {icon && iconPosition === "start" && <Icon name={icon} className="size-5" />}
      <span>{children}</span>
      {icon && iconPosition === "end" && <Icon name={icon} className="size-5" />}
    </Link>
  );
}

type AnchorButtonProps = Omit<ComponentProps<"a">, "className"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  className?: string;
  children: ReactNode;
};

/** tel:, mailto: and external links that look like buttons. */
export function AnchorButton({ variant = "primary", size = "md", icon, className, children, ...props }: AnchorButtonProps) {
  return (
    <a className={buttonClasses(variant, size, className)} {...props}>
      {icon && <Icon name={icon} className="size-5" />}
      <span>{children}</span>
    </a>
  );
}
