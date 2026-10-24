"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { indexKinds, type IndexEntry, type IndexKind } from "@/lib/siteIndex";
import { PaintedSheet, PencilRule, WashBlot } from "@/components/writing/Painted";
import { ease } from "@/components/motion/tokens";
import { cn } from "@/lib/cn";

/**
 * The index of the whole cabinet: every project, essay, poem, film, city and
 * object on the site, searchable and filtered by kind, like a card catalogue.
 */

const inks: Record<IndexKind, string> = {
  Projects: "var(--vermilion)",
  Exhibitions: "var(--brass)",
  Writings: "var(--botanical-green)",
  "Film Analysis": "var(--wine)",
  Poems: "var(--vermilion)",
  Stories: "var(--walnut)",
  "Film Log": "var(--powder-blue)",
  Life: "var(--powder-blue)",
  Objects: "var(--brass)",
  Rooms: "var(--botanical-green)",
};

const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function ArchiveIndex({ entries }: { entries: IndexEntry[] }) {
  const reduce = useReducedMotion();
  const [kind, setKind] = useState<IndexKind | "All">("All");
  const [q, setQ] = useState("");

  const counts = useMemo(() => {
    const c = new Map<IndexKind, number>();
    for (const e of entries) c.set(e.kind, (c.get(e.kind) ?? 0) + 1);
    return c;
  }, [entries]);

  const shown = useMemo(() => {
    const words = fold(q).split(/\s+/).filter(Boolean);
    return entries.filter(
      (e) =>
        (kind === "All" || e.kind === kind) &&
        words.every((w) => fold(`${e.title} ${e.place} ${e.meta ?? ""} ${e.kind}`).includes(w)),
    );
  }, [entries, kind, q]);

  const groups = indexKinds
    .map((k) => ({ kind: k, items: shown.filter((e) => e.kind === k) }))
    .filter((g) => g.items.length);

  return (
    <section aria-labelledby="index-title" className="relative">
      <div className="relative px-5 py-10 md:px-12 md:py-14">
        <PaintedSheet seed={71} bloom="var(--vermilion)" notched h={500} />
        <div className="relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-wine">Index of the cabinet</p>
              <h2 id="index-title" className="mt-3 text-display-m text-wine">
                Everything, <em>in one place</em>
              </h2>
            </div>
            <label className="relative block w-full md:w-80">
              <span className="sr-only">Search everything</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search titles, films, cities…"
                className="w-full border-0 border-b border-wine/40 bg-transparent px-0 pb-2 font-display text-xl italic text-wine placeholder:text-wine/45 focus:border-vermilion focus:outline-none focus:ring-0"
              />
            </label>
          </div>

          <div role="group" aria-label="Filter by kind" className="mt-8 flex flex-wrap gap-2">
            <Chip active={kind === "All"} onClick={() => setKind("All")} count={entries.length}>
              All
            </Chip>
            {indexKinds
              .filter((k) => counts.get(k))
              .map((k) => (
                <Chip key={k} active={kind === k} onClick={() => setKind(k)} count={counts.get(k)!} ink={inks[k]}>
                  {k}
                </Chip>
              ))}
          </div>
        </div>
      </div>

      <p aria-live="polite" className="label mt-10 text-ink-soft">
        {shown.length} {shown.length === 1 ? "entry" : "entries"}
      </p>

      <div className="mt-6">
        <AnimatePresence initial={false} mode="popLayout">
          {groups.map((g) => (
            <motion.div
              key={g.kind}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="grid gap-x-10 border-t border-wine/15 py-10 md:grid-cols-[14rem_1fr]"
            >
              <h3 className="relative self-start md:sticky md:top-24">
                <WashBlot color={inks[g.kind]} seed={g.kind.length * 7} className="-left-4 -top-3 h-14 w-14 opacity-60" />
                <span className="relative font-display text-title text-wine">{g.kind}</span>
                <span className="label relative ml-3 text-ink-soft">{g.items.length}</span>
              </h3>
              <ol className="mt-4 md:mt-0">
                {g.items.map((e, i) => (
                  <li key={e.href + e.title}>
                    <Link
                      href={e.href}
                      className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-3 transition-colors duration-300 md:grid-cols-[3rem_1fr_16rem_auto]"
                    >
                      <span className="label text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="font-display text-xl text-wine transition-colors duration-300 group-hover:text-vermilion md:text-2xl">
                          {e.title}
                        </span>
                        {e.meta && <span className="mt-0.5 block font-display text-base italic text-ink-soft">{e.meta}</span>}
                        <span className="label mt-1 block text-ink-soft md:hidden">{e.place}</span>
                      </span>
                      <span className="label hidden text-ink-soft md:block">{e.place}</span>
                      <span aria-hidden className="text-wine transition-transform duration-500 ease-gallery group-hover:translate-x-1.5 group-hover:text-vermilion">
                        →
                      </span>
                    </Link>
                    {i < g.items.length - 1 && <PencilRule seed={i + 3} />}
                  </li>
                ))}
              </ol>
            </motion.div>
          ))}
        </AnimatePresence>
        {!groups.length && (
          <p className="border-t border-wine/15 py-12 font-display text-xl italic text-ink-soft">Nothing in the cabinet by that name yet.</p>
        )}
      </div>
    </section>
  );
}

function Chip({
  active,
  onClick,
  count,
  ink = "var(--wine)",
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  ink?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      style={{ ["--chip" as string]: ink }}
      className={cn(
        "label inline-flex items-center gap-2 rounded-full border px-3.5 py-2 transition-all duration-300",
        active ? "border-wine bg-wine text-ivory" : "border-wine/30 text-wine hover:border-wine",
      )}
    >
      <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: "var(--chip)" }} />
      {children}
      <span className={active ? "text-ivory/70" : "text-ink-soft"}>{count}</span>
    </button>
  );
}
