"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navigation, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/components/motion/tokens";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // A hairline appears under the header once the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll and listen for Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a
        href="#main"
        className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-ivory focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-700 ease-gallery border-b",
          scrolled || open ? "bg-ivory/92 border-rule" : "bg-transparent border-transparent",
        )}
      >
        <div className="frame flex h-[var(--header-h)] items-center justify-between">
          <Link
            href="/"
            aria-label={`${site.name} — Index`}
            className="font-display text-[1.75rem] leading-none tracking-tight text-ink transition-colors duration-500 hover:text-rosebud"
          >
            {site.monogram}
          </Link>

          {/* Desktop and tablet */}
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1 label">
              {navigation.map((item, i) => (
                <li key={item.href} className="flex items-center">
                  {i > 0 && <span aria-hidden className="px-2 text-ink/35">/</span>}
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "link-draw pb-0.5 transition-colors duration-500",
                      isActive(item.href) ? "text-water" : "text-ink hover:text-rosebud",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Phone */}
          <button
            type="button"
            className="label md:hidden py-3 pl-4"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 top-[var(--header-h)] z-40 bg-ivory md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.quick, ease }}
          >
            <nav aria-label="Main" className="frame flex h-full flex-col justify-between pb-10 pt-8">
              <ul className="space-y-1">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: duration.base, ease, delay: 0.05 + i * 0.05 }}
                    className="flex items-baseline gap-4 border-b border-rule py-3"
                  >
                    <span className="label w-6 text-water">0{i + 2}</span>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "font-display text-[2.75rem] leading-none",
                        isActive(item.href) ? "italic text-water" : "text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <p className="font-display text-lg italic text-ink-soft">{site.tagline}</p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
