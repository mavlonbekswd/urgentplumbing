"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

interface Item {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

interface ServiceItem {
  href: string;
  label: string;
  description: string;
  icon: IconName;
}

export function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const linkBase =
  "relative inline-flex min-h-11 items-center gap-1 rounded-md px-2.5 text-base font-semibold text-navy-900 transition-colors hover:bg-navy-100/70 hover:text-navy-700 xl:px-3 xl:text-[1.0625rem]";
// Active page: a short green bar under the label.
const activeBar =
  "after:absolute after:inset-x-2.5 xl:after:inset-x-3 after:-bottom-[3px] after:h-[3px] after:rounded-full after:bg-green-600";

export function DesktopNav({ items, services }: { items: Item[]; services: ServiceItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-0.5 xl:gap-1">
        {items.map((item) =>
          item.hasDropdown ? (
            <li key={item.href}>
              <ServicesMenu label={item.label} hubHref={item.href} services={services} pathname={pathname} />
            </li>
          ) : (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={cn(linkBase, isActive(pathname, item.href) && activeBar)}
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

/**
 * Disclosure-style dropdown (WAI-ARIA "disclosure navigation" pattern):
 *  - mouse: opens on hover, with a short delay before closing so it doesn't vanish while the
 *    pointer travels from the button to the panel
 *  - touch / click: the button toggles it
 *  - keyboard: Enter/Space toggles, ArrowDown opens and focuses the first link, arrow keys move
 *    between links, Escape closes and returns focus, tabbing away closes it
 */
function ServicesMenu({
  label,
  hubHref,
  services,
  pathname,
}: {
  label: string;
  hubHref: string;
  services: ServiceItem[];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const openedByHover = useRef(false);
  const panelId = useId();
  const active = isActive(pathname, hubHref);

  const close = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    openedByHover.current = false;
    setOpen(false);
  }, []);

  // Close on navigation.
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Close when clicking or tapping anywhere else.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: globalThis.PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const onPointerEnter = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    if (!open) {
      openedByHover.current = true;
      setOpen(true);
    }
  };

  const onPointerLeave = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !openedByHover.current) return;
    closeTimer.current = window.setTimeout(close, 200);
  };

  const links = () => Array.from(wrapperRef.current?.querySelectorAll<HTMLAnchorElement>("[data-menu-link]") ?? []);

  const onButtonClick = () => {
    // A mouse user who hovered it open and then clicks shouldn't snap it shut.
    if (open && openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    setOpen((o) => !o);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      close();
      buttonRef.current?.focus();
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const list = links();
      if (list.length === 0) return;
      e.preventDefault();
      if (!open) {
        setOpen(true);
        requestAnimationFrame(() => links()[0]?.focus());
        return;
      }
      const current = list.indexOf(document.activeElement as HTMLAnchorElement);
      const next =
        e.key === "ArrowDown"
          ? list[(current + 1) % list.length]
          : list[(current - 1 + list.length) % list.length];
      next?.focus();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onKeyDown={onKeyDown}
      onBlur={(e) => {
        if (open && !wrapperRef.current?.contains(e.relatedTarget as Node)) close();
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onButtonClick}
        className={cn(linkBase, "cursor-pointer", active && activeBar, open && "bg-navy-100/70")}
      >
        {label}
        <Icon
          name="chevronDown"
          className={cn("size-4 transition-transform duration-150", open && "rotate-180")}
          weight="bold"
        />
      </button>

      {/* pt-3 bridges the gap so the pointer can travel into the panel without it closing */}
      <div id={panelId} hidden={!open} className="absolute left-1/2 top-full z-50 w-[42rem] -translate-x-1/2 pt-3">
        <div className="animate-menu-in overflow-hidden rounded-lg border border-line bg-white shadow-menu">
          <ul className="grid grid-cols-2 gap-1 p-3">
            {services.map((s) => {
              const current = pathname === s.href;
              return (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    data-menu-link=""
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "group flex gap-3 rounded-md p-3 transition-colors hover:bg-mist focus-visible:bg-mist",
                      current && "bg-green-50",
                    )}
                  >
                    <Icon name={s.icon} weight="duotone" className="mt-0.5 size-8 text-navy-700" />
                    <span className="min-w-0">
                      <span className="block font-semibold leading-snug text-navy-900">{s.label}</span>
                      <span className="mt-0.5 block text-[0.9375rem] leading-snug text-muted">{s.description}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between gap-4 border-t border-line bg-mist px-6 py-3.5">
            <Link
              href={hubHref}
              data-menu-link=""
              className="inline-flex min-h-11 items-center gap-2 rounded-md font-semibold text-navy-800 underline decoration-navy-300 underline-offset-4 hover:decoration-navy-800"
            >
              View all services
              <Icon name="arrowRight" className="size-4" />
            </Link>
            <p className="text-[0.9375rem] text-muted">Not sure what you need? Call and describe it.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
