"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type ContentsEntry = { id: string; text: string; level: 1 | 2 };

/**
 * A table of contents that stays beside a long paper as you read, with the
 * section you're in marked. Wide screens only; narrower ones get the list
 * at the top of the paper instead.
 */
export function SideContents({ entries }: { entries: ContentsEntry[] }) {
  const [active, setActive] = useState(entries[0]?.id);

  useEffect(() => {
    const els = entries.map((e) => document.getElementById(e.id)).filter((el): el is HTMLElement => !!el);
    const onScroll = () => {
      const line = window.innerHeight * 0.3;
      let current = els[0]?.id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [entries]);

  // Keep the marked entry in view inside the list itself.
  useEffect(() => {
    document.querySelector(`[data-toc="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <nav aria-label="Contents" className="side-contents max-h-[calc(100svh-var(--header-h)-4rem)] overflow-y-auto pr-3">
      <p className="label mb-4 text-ink-soft">Contents</p>
      <ol className="space-y-1.5 border-l border-rule">
        {entries.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              data-toc={e.id}
              aria-current={active === e.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-0.5 leading-snug transition-colors duration-300 hover:text-vermilion",
                e.level === 1 ? "pl-4 text-[0.82rem]" : "pl-7 font-display text-[0.86rem] italic",
                active === e.id ? "border-vermilion text-vermilion" : "border-transparent text-ink-soft",
              )}
            >
              {e.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
