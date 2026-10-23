"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";

type Key = "film-log" | "film-analysis";
const tabs: { key: Key; no: string; title: string; note: string }[] = [
  { key: "film-log", no: "01", title: "Film Log", note: "A diary of everything watched" },
  { key: "film-analysis", no: "02", title: "Film Analysis", note: "Analysis, essays and research" },
];

/**
 * The Cinema collection's two compartments, drawn like the cabinet's drawer
 * fronts: a walnut-edged front with a brass knob for each. The open one sits
 * forward onto its contents; the other rests back. #film-log and
 * #film-analysis (and a film's own #film-<slug>) open the right one.
 */
export function CinemaCompartments({ log, reviews }: { log: ReactNode; reviews: ReactNode }) {
  const [active, setActive] = useState<Key>("film-log");
  const refs = useRef<Record<Key, HTMLButtonElement | null>>({ "film-log": null, "film-analysis": null });

  useEffect(() => {
    const sync = () => {
      const h = location.hash.slice(1);
      if (h === "film-analysis" || h === "film-reviews") setActive("film-analysis");
      else if (h === "film-log" || h.startsWith("film-")) setActive("film-log");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const choose = (k: Key) => {
    setActive(k);
    history.replaceState(null, "", `#${k}`);
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = tabs[(i + d + tabs.length) % tabs.length].key;
    choose(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Cinema compartments" className="grid grid-cols-2 gap-3 sm:gap-5">
        {tabs.map((t, i) => {
          const on = t.key === active;
          return (
            <button
              key={t.key}
              ref={(el) => { refs.current[t.key] = el; }}
              role="tab"
              id={`tab-${t.key}`}
              aria-selected={on}
              aria-controls={`panel-${t.key}`}
              tabIndex={on ? 0 : -1}
              onClick={() => choose(t.key)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "group relative rounded-[3px] border-[5px] px-4 py-4 text-left transition-[transform,background-color,box-shadow] duration-700 ease-[var(--ease-gallery)] sm:px-6 sm:py-5",
                "border-walnut focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vermilion",
                "bg-blue",
                on ? "-translate-y-1 shadow-[0_14px_22px_-14px_rgb(113_63_72/0.55)]" : "hover:-translate-y-0.5",
              )}
            >
              {/* inner pinstripe, as on the cabinet's panels */}
              <span aria-hidden className={cn("pointer-events-none absolute inset-[5px] rounded-[2px] border transition-colors duration-700", on ? "border-vermilion" : "border-wine/35")} />
              <span className="relative flex items-center gap-4">
                <span className="min-w-0 flex-1">
                  <span className={cn("label block transition-colors duration-700", on ? "text-vermilion" : "text-wine")}>{t.no} —</span>
                  <span className="mt-1 block font-display text-[clamp(1.25rem,2.6vw,1.9rem)] leading-tight text-wine">{t.title}</span>
                  <span className="mt-1 hidden text-caption text-wine sm:block">{t.note}</span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "h-4 w-4 shrink-0 rounded-full bg-brass shadow-[inset_-2px_-2px_0_rgb(113_63_72/0.35)] ring-2 ring-walnut/60 transition-transform duration-700 sm:h-5 sm:w-5",
                    on ? "scale-110" : "group-hover:scale-110",
                  )}
                />
              </span>
            </button>
          );
        })}
      </div>

      {/* the compartment itself: a walnut-lined interior the open front sits over */}
      <div className="relative mt-[-2px] border-x-[5px] border-b-[5px] border-walnut bg-ivory px-4 pb-10 pt-10 sm:px-8 lg:px-10">
        <AnimatePresence mode="wait" initial={false}>
          {tabs
            .filter((t) => t.key === active)
            .map((t) => (
              <motion.div
                key={t.key}
                role="tabpanel"
                id={`panel-${t.key}`}
                aria-labelledby={`tab-${t.key}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {t.key === "film-log" ? log : reviews}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
