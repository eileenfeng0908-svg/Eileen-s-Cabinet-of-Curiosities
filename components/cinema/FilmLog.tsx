"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { FilmEntry } from "@/lib/types";
import { Plate } from "@/components/editorial/Plate";
import { formatDate } from "@/lib/format";
import { Stars } from "./Stars";

/**
 * 01 — Film Log. A diary laid out like a contact sheet: posters sit in
 * frames on strips of film, numbered along the edge. Hover rings a frame in
 * grease pencil, as on a real sheet; clicking opens the entry.
 */

type Sort = "recent" | "oldest" | "rating-high" | "rating-low" | "title" | "release";
const sorts: { value: Sort; label: string }[] = [
  { value: "recent", label: "Recently watched" },
  { value: "oldest", label: "First watched" },
  { value: "rating-high", label: "Highest rated" },
  { value: "rating-low", label: "Lowest rated" },
  { value: "title", label: "Title, A–Z" },
  { value: "release", label: "Release year" },
];
const ratingFilters = [
  { value: "all", label: "Any rating" },
  { value: "5", label: "★★★★★ only" },
  { value: "4", label: "★★★★ and up" },
  { value: "3", label: "★★★ and up" },
  { value: "unrated", label: "Not rated" },
];

const by = (a?: string, b?: string) => (a ?? "").localeCompare(b ?? "");

/** The grease-pencil ring a printer draws around a chosen frame. */
function GreaseRing({ on }: { on: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 100 140" preserveAspectRatio="none" className="pointer-events-none absolute -inset-[7%] z-10 h-[114%] w-[114%] overflow-visible">
      <path
        d="M52 4C82 3 97 22 96 64S86 134 50 136 4 118 4 70 20 6 56 5c4 0 8 1 11 3"
        fill="none"
        stroke="var(--vermilion)"
        strokeWidth={2.6}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        filter="url(#ec-pencil)"
        pathLength={1}
        strokeDasharray="1 1"
        style={{ strokeDashoffset: on ? 0 : 1, opacity: on ? 1 : 0, transition: "stroke-dashoffset 700ms cubic-bezier(0.22,1,0.36,1), opacity 250ms" }}
      />
    </svg>
  );
}

function Sprockets() {
  return <span aria-hidden className="film-sprockets block h-[9px] w-full" />;
}

export function FilmLog({ films, placeholders }: { films: FilmEntry[]; placeholders: boolean }) {
  const [q, setQ] = useState("");
  const [rating, setRating] = useState("all");
  const [year, setYear] = useState("all");
  const [sort, setSort] = useState<Sort>("recent");
  const [hover, setHover] = useState<string | null>(null);
  const [open, setOpen] = useState<FilmEntry | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  // Frame numbers follow the diary's own order, so a film keeps its number however you sort.
  const frameNo = useMemo(() => new Map(films.map((f, i) => [f.slug, i + 1])), [films]);
  const years = useMemo(
    () => [...new Set(films.map((f) => f.watched?.slice(0, 4)).filter(Boolean) as string[])].sort().reverse(),
    [films],
  );

  // Ratings only earn their controls once enough films carry one.
  const rated = useMemo(() => films.filter((f) => f.rating != null).length >= 3, [films]);
  const sortChoices = rated ? sorts : sorts.filter((s) => !s.value.startsWith("rating"));

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = films.filter((f) => {
      if (needle && ![f.title, f.director, f.note, f.year, ...(f.tags ?? []), ...(f.body ?? [])].some((v) => v?.toLowerCase().includes(needle))) return false;
      if (rating === "unrated" && f.rating != null) return false;
      if (rating !== "all" && rating !== "unrated" && (f.rating ?? -1) < Number(rating)) return false;
      if (year !== "all" && f.watched?.slice(0, 4) !== year) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "recent": return by(b.watched, a.watched);
        case "oldest": return by(a.watched ?? "9999", b.watched ?? "9999");
        case "rating-high": return (b.rating ?? -1) - (a.rating ?? -1);
        case "rating-low": return (a.rating ?? 99) - (b.rating ?? 99);
        case "title": return a.title.localeCompare(b.title);
        case "release": return by(b.year, a.year);
      }
    });
    return list;
  }, [films, q, rating, year, sort]);

  // Open / close the native dialog (it handles focus and Escape for us).
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // #film-<slug> opens an entry directly.
  useEffect(() => {
    const m = location.hash.match(/^#film-(.+)$/);
    if (m) {
      const f = films.find((x) => x.slug === decodeURIComponent(m[1]));
      if (f) setOpen(f);
    }
  }, [films]);

  const step = (dir: 1 | -1) => {
    if (!open) return;
    const i = shown.findIndex((f) => f.slug === open.slug);
    const next = shown[(i + dir + shown.length) % shown.length];
    if (next) setOpen(next);
  };

  const field = "w-full border-b border-wine/40 bg-transparent py-2 text-caption text-wine outline-none transition-colors focus-visible:border-vermilion";

  return (
    <div>
      {placeholders && (
        <p className="mb-8 max-w-[60ch] border-l-2 border-vermilion pl-4 text-caption text-wine">
          [These are sample frames. Your own diary replaces them: import your Letterboxd export or add films in content/films.ts.]
        </p>
      )}

      {/* search, filter, sort */}
      <form role="search" onSubmit={(e) => e.preventDefault()} className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4">
        <label className="col-span-2 block">
          <span className="label text-wine">Search</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Title, director, review…" className={`${field} placeholder:text-wine/60`} />
        </label>
        {rated && <label className="block">
          <span className="label text-wine">Rating</span>
          <select value={rating} onChange={(e) => setRating(e.target.value)} className={field}>
            {ratingFilters.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </label>}
        <label className="block">
          <span className="label text-wine">Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={field}>
            {sortChoices.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </label>
        {years.length > 1 && (
          <label className="block">
            <span className="label text-wine">Year watched</span>
            <select value={year} onChange={(e) => setYear(e.target.value)} className={field}>
              <option value="all">Every year</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </label>
        )}
      </form>
      <p className="label mt-6 text-wine" aria-live="polite">
        {shown.length === films.length ? `${films.length} films` : `${shown.length} of ${films.length} films`}
      </p>

      {/* the contact sheet */}
      {shown.length ? (
        <motion.ul layout className="mt-6 grid grid-cols-2 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          <AnimatePresence initial={false}>
            {shown.map((f) => {
              const n = frameNo.get(f.slug) ?? 0;
              return (
                <motion.li
                  key={f.slug}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(f)}
                    onPointerEnter={() => setHover(f.slug)}
                    onPointerLeave={() => setHover(null)}
                    onFocus={() => setHover(f.slug)}
                    onBlur={() => setHover(null)}
                    aria-haspopup="dialog"
                    className="group block w-full text-left outline-none"
                  >
                    {/* a frame on the strip */}
                    <span className="block bg-wine px-[7%] pb-1 pt-1">
                      <Sprockets />
                      <span className="relative my-1.5 block">
                        <Plate image={f.poster} sizes="(min-width: 64rem) 18vw, 45vw" showPlaceholderLabel={false} zoom={false} />
                        {!f.poster.src && (
                          <span className="absolute inset-0 flex items-center justify-center p-3 text-center font-display italic text-ivory" style={{ fontSize: "clamp(0.8rem, 1.2vw, 1rem)" }}>
                            {f.title}
                          </span>
                        )}
                        <GreaseRing on={hover === f.slug || open?.slug === f.slug} />
                      </span>
                      <span aria-hidden className="flex justify-between px-0.5 font-sans text-[0.6rem] tracking-[0.12em] text-brass">
                        <span>{n}</span>
                        <span>▸ {n}A</span>
                      </span>
                      <Sprockets />
                    </span>
                    {/* caption under the strip */}
                    <span className="mt-3 block px-1 pr-3">
                      <span className="block font-display text-[1.1rem] leading-snug text-wine transition-colors duration-500 group-hover:text-vermilion">{f.title}</span>
                      <span className="label mt-1 block text-wine">
                        {[f.director, f.year].filter(Boolean).join(", ") || " "}
                      </span>
                      {f.rating != null && <Stars value={f.rating} className="mt-1.5 text-[0.85rem]" />}
                      {f.note && !f.placeholder && (
                        <span className="mt-2 line-clamp-3 block font-display text-[0.98rem] italic leading-snug text-wine">{f.note}</span>
                      )}
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <p className="mt-10 font-display text-lede italic text-wine">No films match. Try another search.</p>
      )}

      {/* the entry */}
      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && setOpen(null)}
        aria-labelledby="film-entry-title"
        className="film-entry m-auto w-[min(56rem,calc(100%-2rem))] max-h-[calc(100svh-2rem)] overflow-auto bg-ivory p-0 text-wine"
      >
        {open && (
          <article className="grid gap-8 p-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:p-10">
            <div className="self-start bg-wine px-[6%] py-1 md:sticky md:top-0">
              <Sprockets />
              <div className="my-2">
                <Plate image={open.poster} sizes="(min-width: 48rem) 22rem, 90vw" zoom={false} showPlaceholderLabel={false} />
              </div>
              <Sprockets />
            </div>
            <div className="flex flex-col">
              <p className="label text-wine">Frame {frameNo.get(open.slug)} · Film Log</p>
              <h3 id="film-entry-title" className="mt-3 text-display-m">{open.title}</h3>
              <p className="mt-2 font-display text-lede italic">{[open.director, open.year].filter(Boolean).join(", ")}</p>
              <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-y border-wine/25 py-4 text-caption">
                <dt className="label pt-0.5">Watched</dt>
                <dd>{open.watched ? formatDate(open.watched) : "[Date]"}{open.rewatch ? " · rewatch" : ""}</dd>
                {open.rating != null && (
                  <>
                    <dt className="label pt-0.5">Rating</dt>
                    <dd><Stars value={open.rating} /></dd>
                  </>
                )}
                {open.tags?.length ? (
                  <>
                    <dt className="label pt-0.5">Tags</dt>
                    <dd>{open.tags.join(", ")}</dd>
                  </>
                ) : null}
              </dl>
              {open.body?.length ? (
                <div className="mt-6 space-y-4 text-body">
                  {open.body.map((para, i) =>
                    para === "—" ? (
                      <hr key={i} className="mx-auto w-16 border-wine/30" />
                    ) : /^[“"].*[”"]$/.test(para) ? (
                      <blockquote key={i} className="border-l-2 border-vermilion pl-4 font-display text-lede italic">{para}</blockquote>
                    ) : (
                      <p key={i}>{para}</p>
                    ),
                  )}
                </div>
              ) : (
                open.note && <p className="mt-6 whitespace-pre-line text-body">{open.note}</p>
              )}
              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
                {open.review && (
                  <a href={`/writing/${open.review}`} className="label link-draw text-wine">Read my review →</a>
                )}
                {open.link && (
                  <a href={open.link.href} target="_blank" rel="noreferrer" className="label link-draw text-wine">{open.link.label} ↗</a>
                )}
                {open.letterboxd && (
                  <a href={open.letterboxd} target="_blank" rel="noreferrer" className="label link-draw text-wine">On Letterboxd ↗</a>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-wine/25 pt-4 md:col-span-2">
              <button type="button" onClick={() => step(-1)} className="label link-draw text-wine">← Previous frame</button>
              <button type="button" onClick={() => setOpen(null)} className="label border border-wine/40 px-3 py-1.5 text-wine hover:border-vermilion hover:text-vermilion" autoFocus>
                Close
              </button>
              <button type="button" onClick={() => step(1)} className="label link-draw text-wine">Next frame →</button>
            </div>
          </article>
        )}
      </dialog>
    </div>
  );
}
