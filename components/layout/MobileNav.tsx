"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { isActive } from "./DesktopNav";

interface Item {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

/**
 * Mobile and tablet menu: a full-height drawer (modal dialog) with the services as an
 * accordion rather than a hover menu. Locks page scroll while open, traps focus, closes on
 * Escape, on the backdrop and on navigation, and returns focus to the Menu button.
 *
 * `logo` and `contact` are server-rendered and passed in, so business details are never
 * duplicated in client code.
 */
export function MobileNav({
  items,
  services,
  logo,
  contact,
}: {
  items: Item[];
  services: { href: string; label: string; icon: IconName }[];
  logo: ReactNode;
  contact: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(() => pathname.startsWith("/services"));
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dialogId = useId();
  const servicesId = useId();

  useEffect(() => setMounted(true), []);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll lock + initial focus.
  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.classList.add("menu-open");
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else {
      root.classList.remove("menu-open");
    }
    return () => root.classList.remove("menu-open");
  }, [open]);

  // Close if the viewport grows to desktop width while open.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && close(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open, close]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
    ).filter((el) => el.offsetParent !== null);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const rowClass =
    "flex min-h-14 w-full items-center justify-between gap-3 px-5 font-display text-xl font-semibold text-navy-900 transition-colors hover:bg-mist";

  return (
    <>
      <button
        ref={menuButtonRef}
        type="button"
        aria-expanded={open}
        aria-controls={dialogId}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-line-strong bg-white px-2.5 font-semibold text-navy-900 transition-colors hover:border-navy-700 sm:px-3 lg:hidden"
      >
        <Icon name="menu" className="size-5" />
        <span className="sr-only sm:not-sr-only">Menu</span>
      </button>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[70] lg:hidden" onKeyDown={onKeyDown}>
            <div className="absolute inset-0 bg-navy-950/60" onClick={() => close()} aria-hidden="true" />
            <div
              ref={panelRef}
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              // Any link inside (including the logo and phone link) closes the menu.
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) close(false);
              }}
              className="animate-drawer-in absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-menu"
            >
              <div className="flex h-[4.5rem] shrink-0 items-center justify-between gap-3 border-b border-line px-5">
                {logo}
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => close()}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-line-strong px-3 font-semibold text-navy-900 hover:border-navy-700"
                >
                  <Icon name="close" className="size-5" />
                  <span className="max-[359px]:sr-only">Close</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain">
                <nav aria-label="Main">
                  <ul className="divide-y divide-line border-b border-line">
                    {items.map((item) =>
                      item.hasDropdown ? (
                        <li key={item.href}>
                          <button
                            type="button"
                            aria-expanded={servicesOpen}
                            aria-controls={servicesId}
                            onClick={() => setServicesOpen((o) => !o)}
                            className={cn(rowClass, "cursor-pointer")}
                          >
                            <span className={cn(isActive(pathname, item.href) && "text-green-700")}>{item.label}</span>
                            <span className="grid size-9 place-items-center rounded-md border border-line-strong">
                              <Icon
                                name="chevronDown"
                                className={cn("size-5 transition-transform", servicesOpen && "rotate-180")}
                              />
                            </span>
                          </button>
                          <ul id={servicesId} hidden={!servicesOpen} className="bg-mist pb-2">
                            {services.map((s) => (
                              <li key={s.href}>
                                <Link
                                  href={s.href}
                                  aria-current={pathname === s.href ? "page" : undefined}
                                  className={cn(
                                    "flex min-h-12 items-center gap-3 px-5 pl-6 text-[1.0625rem] font-semibold text-navy-800 hover:bg-navy-100/60",
                                    pathname === s.href && "text-green-700",
                                  )}
                                >
                                  <Icon name={s.icon} weight="duotone" className="size-6 text-navy-700" />
                                  {s.label}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link
                                href={item.href}
                                aria-current={pathname === item.href ? "page" : undefined}
                                className="flex min-h-12 items-center gap-3 px-5 pl-[3.75rem] font-semibold text-water-600 underline underline-offset-4"
                              >
                                All services
                              </Link>
                            </li>
                          </ul>
                        </li>
                      ) : (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={isActive(pathname, item.href) ? "page" : undefined}
                            className={cn(rowClass, isActive(pathname, item.href) && "text-green-700")}
                          >
                            {item.label}
                            {isActive(pathname, item.href) && (
                              <span className="size-2 rounded-full bg-green-600" aria-hidden="true" />
                            )}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </nav>
                <div className="p-5">{contact}</div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
