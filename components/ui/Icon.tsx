// One icon system for the whole site: Phosphor Icons (MIT), rendered as inline SVG on the
// server — only the icons actually used are bundled. Components refer to icons by these names,
// so the library could be swapped here without touching any page.
//
// Weights:
//   regular — interface icons (phone, arrows, menu…)
//   duotone — service and feature icons. The light fill layer is tinted with the logo's water
//             blue by the `.icon-duo` rule in globals.css, giving navy outline + blue fill.

import {
  ArrowRight,
  CaretDown,
  CaretRight,
  ChatCircleText,
  Check,
  CheckCircle,
  ClipboardText,
  Clock,
  CurrencyGbp,
  Drop,
  EnvelopeSimple,
  House,
  Info,
  List,
  MagnifyingGlass,
  MapPin,
  Phone,
  Pipe,
  PipeWrench,
  ShieldCheck,
  Shower,
  Siren,
  ThermometerHot,
  UsersThree,
  Warning,
  Waves,
  WhatsappLogo,
  Wrench,
  X,
} from "@phosphor-icons/react/dist/ssr";
import type { IconWeight } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

const icons = {
  // interface
  phone: Phone,
  mail: EnvelopeSimple,
  whatsapp: WhatsappLogo,
  pin: MapPin,
  check: Check,
  checkCircle: CheckCircle,
  chevronDown: CaretDown,
  chevronRight: CaretRight,
  arrowRight: ArrowRight,
  menu: List,
  close: X,
  search: MagnifyingGlass,
  info: Info,
  alert: Warning,
  clock: Clock,
  home: House,
  clipboard: ClipboardText,
  chat: ChatCircleText,
  pound: CurrencyGbp,
  users: UsersThree,
  shield: ShieldCheck,
  wrench: Wrench,
  // services
  emergency: Siren,
  drain: Pipe,
  flow: Waves,
  drop: Drop,
  pipe: PipeWrench,
  hotWater: ThermometerHot,
  shower: Shower,
} as const;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className = "size-5",
  weight = "regular",
  label,
}: {
  name: IconName;
  className?: string;
  weight?: IconWeight;
  /** Only pass a label when the icon carries meaning on its own. */
  label?: string;
}) {
  const Component = icons[name];
  return (
    <Component
      weight={weight}
      className={cn("shrink-0", weight === "duotone" && "icon-duo", className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
    />
  );
}
