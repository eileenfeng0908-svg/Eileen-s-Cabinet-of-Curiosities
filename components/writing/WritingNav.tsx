import Link from "next/link";
import { writingSections, type WritingSectionSlug } from "@/lib/writing";
import { cn } from "@/lib/cn";

/**
 * Moves between the three worlds of Writing. Sits under each section's
 * opening; the current world is marked, the others are one click away.
 */
export function WritingNav({ current }: { current?: WritingSectionSlug }) {
  return (
    <nav aria-label="Writing" className="frame">
      <ul className="grid gap-px border-y border-wine/25 sm:grid-cols-3">
        {writingSections.map((s) => {
          const on = s.slug === current;
          return (
            <li key={s.slug}>
              <Link
                href={`/writing/${s.slug}`}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "group flex items-baseline gap-4 px-1 py-4 transition-colors duration-500 sm:px-4",
                  on ? "text-vermilion" : "text-wine hover:text-vermilion",
                )}
              >
                <span className="label">{s.number}</span>
                <span>
                  <span className="block font-display text-[1.35rem] leading-tight">{s.title}</span>
                  <span className="block font-display text-caption italic opacity-80">{s.room}</span>
                </span>
                {on && <span aria-hidden className="ml-auto self-center text-[0.7rem]">✦</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
