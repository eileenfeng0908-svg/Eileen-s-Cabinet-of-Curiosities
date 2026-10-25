"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { backstage, designSketchbook, production, runway, shows, type AtelierPhoto, type Show } from "@/content/atelier";
import { DocumentCard, PhotoSlot, RoomHeading, Subhead, VideoSlot, ViewerProvider } from "./Parts";
import { InvitationCover, InvitationInside, ink } from "./AtelierArt";
import { PencilRule } from "@/components/writing/Painted";
import { ease } from "@/components/motion/tokens";
import { cn } from "@/lib/cn";

/**
 * The five rooms you reach from the desk. Each reads its material from
 * content/atelier.ts, so photographs and documents slot in without layout work.
 */

const tilts = [-1.6, 1.2, -0.6, 1.8, -1.1, 0.8];

/** Photographs laid out loosely, like prints spread on a table. Portrait and landscape both fit. */
export function PhotoScatter({ photos, cols = 3 }: { photos: AtelierPhoto[]; cols?: 2 | 3 }) {
  return (
    <div className={cn("mx-auto columns-2 gap-5 md:gap-8", cols === 3 ? "md:columns-3 lg:columns-4" : "max-w-4xl md:columns-3")}>
      {photos.map((p, i) => (
        <div key={i} className={cn("mb-6 break-inside-avoid md:mb-10", i % 3 === 1 && "md:mt-8")}>
          <PhotoSlot photo={p} list={photos} index={i} tilt={tilts[i % tilts.length]} />
        </div>
      ))}
    </div>
  );
}

/* --- 01 The Shows -------------------------------------------------------- */

export function ShowsRoom({ showId, onShow }: { showId: string | null; onShow: (id: string) => void }) {
  const show = shows.find((s) => s.id === showId) ?? null;
  return (
    <ViewerProvider>
      <RoomHeading id="room-title" kicker="01 · The Invitations" title="The" italic="Shows" intro="Five years of the fashion show. Open an invitation to step into that year." bloom={ink.vermilion} />
      <nav aria-label="Choose a year" className="mt-12 grid grid-cols-3 gap-5 sm:grid-cols-5 md:gap-8">
        {shows.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onShow(s.id)}
            aria-current={s.id === showId ? "true" : undefined}
            className={cn(
              "group relative mx-auto w-full max-w-[11rem] transition-transform duration-500 ease-gallery hover:-translate-y-1.5",
              s.id === showId ? "-translate-y-1.5" : "opacity-90",
            )}
            style={{ rotate: `${tilts[i]}deg` }}
          >
            <span className="block aspect-[100/140] drop-shadow-[0_10px_10px_rgb(113_63_72_/_0.25)]">
              {s.id === showId ? <InvitationInside color={ink[s.ink]} year={s.year} title={s.title} /> : <InvitationCover color={ink[s.ink]} year={s.year} />}
            </span>
            <span className={cn("label mt-3 block text-center", s.id === showId ? "text-vermilion" : "text-wine")}>
              {s.year} · {s.title}
            </span>
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        {show ? (
          <motion.div key={show.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}>
            <ShowArchive show={show} />
          </motion.div>
        ) : (
          <p className="mt-16 text-center font-display text-lede italic text-wine">Choose an invitation above.</p>
        )}
      </AnimatePresence>
    </ViewerProvider>
  );
}

function ShowArchive({ show }: { show: Show }) {
  const color = ink[show.ink];
  return (
    <article aria-labelledby="show-title" className="mt-20 space-y-20">
      <header className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-end">
        <div>
          <p className="label" style={{ color }}>Fashion Show · {show.year}</p>
          <h3 id="show-title" className="mt-2 text-display-l text-wine">{show.title}</h3>
        </div>
        <dl className="grid gap-6 border-l-2 pl-6 sm:grid-cols-2" style={{ borderColor: color }}>
          <div>
            <dt className="label text-ink-soft">Theme</dt>
            <dd className="mt-1 font-display text-xl text-wine">{show.theme}</dd>
          </div>
          <div>
            <dt className="label text-ink-soft">My role</dt>
            <dd className="mt-1 font-display text-xl text-wine">{show.role}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="label text-ink-soft">Concept</dt>
            <dd className="mt-1 text-body text-wine">{show.concept}</dd>
          </div>
        </dl>
      </header>

      <section className="space-y-8">
        <Subhead color={color}>Runway photographs</Subhead>
        <PhotoScatter photos={show.runway} />
      </section>

      <section className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-8">
          <Subhead color={ink.brass}>Posters & promotion</Subhead>
          <div className="grid grid-cols-2 gap-5">
            {show.posters.map((p, i) => (
              <PhotoSlot key={i} photo={p} list={show.posters} index={i} tilt={i % 2 ? 2 : -2} />
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <Subhead color={ink.blue}>Videos</Subhead>
          {show.videos.map((v, i) => (
            <VideoSlot key={i} video={v} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <Subhead color={ink.green}>Designers & models</Subhead>
        <div className="relative grid gap-8 border border-wine/20 bg-[color-mix(in_srgb,var(--aged-ivory)_50%,white)] p-6 sm:grid-cols-2 md:p-10">
          <span aria-hidden className="absolute inset-1.5 border border-wine/10" />
          {[["Designers", show.designers], ["Models", show.models]].map(([label, people]) => (
            <div key={label as string} className="relative">
              <p className="label text-wine">{label as string}</p>
              <ul className="mt-3 space-y-2">
                {(people as Show["designers"]).map((p, i) => (
                  <li key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-dotted border-wine/30 pb-1.5">
                    <span className="font-display text-lg text-wine">{p.name}</span>
                    {p.role && <span className="font-display italic text-ink-soft">{p.role}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <Subhead color={ink.vermilion}>Behind the scenes</Subhead>
        <PhotoScatter photos={show.backstage} />
      </section>
    </article>
  );
}

/* --- 02 The Sketchbook --------------------------------------------------- */

export function SketchbookRoom() {
  const reduce = useReducedMotion();
  const [[page, dir], setPage] = useState<[number, 1 | -1]>([0, 1]);
  const go = (to: number) => to >= 0 && to < designSketchbook.length && setPage([to, to > page ? 1 : -1]);
  const spread = designSketchbook[page];
  const tabColors = [ink.vermilion, ink.blue, ink.green, ink.brass, ink.wine];

  return (
    <ViewerProvider>
      <RoomHeading id="room-title" kicker="02 · The Sketchbook" title="Design" italic="Process" intro="From the first idea to the final look, page by page." bloom={ink.blue} />
      <div
        className="relative mx-auto mt-14 max-w-[64rem]"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(page + 1);
          if (e.key === "ArrowLeft") go(page - 1);
        }}
      >
        {/* coloured page tabs */}
        <div role="tablist" aria-label="Sketchbook pages" className="flex flex-wrap gap-1.5 px-3 md:gap-2 md:px-6">
          {designSketchbook.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={i === page}
              onClick={() => go(i)}
              className={cn(
                "label rounded-t-md px-3 pb-2 pt-2.5 text-ivory transition-transform duration-300",
                i === page ? "-translate-y-1" : "translate-y-1 opacity-85 hover:translate-y-0",
              )}
              style={{ background: tabColors[i] }}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* the book */}
        <div className="relative rounded-[4px] bg-wine p-2 shadow-[0_28px_44px_-28px_rgb(113_63_72_/_0.9)] md:p-3" style={{ perspective: "2600px" }}>
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={page}
              custom={dir}
              initial={reduce ? { opacity: 0 } : { rotateY: dir * 70, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { rotateY: dir * -70, opacity: 0 }}
              transition={{ duration: reduce ? 0.2 : 0.45, ease }}
              style={{ transformOrigin: dir === 1 ? "left center" : "right center" }}
              className="grid min-h-[34rem] md:grid-cols-2"
            >
              <div className="sketch-paper relative p-7 md:p-10">
                <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[8%] bg-gradient-to-l from-wine/25 to-transparent md:block" />
                <p className="label text-ink-soft">Page {page + 1} of {designSketchbook.length}</p>
                <h3 className="title-script mt-4 text-5xl leading-tight md:text-6xl" style={{ color: tabColors[page] }}>
                  {spread.title}
                </h3>
                <PencilRule seed={page + 4} className="mt-4" />
                <p className="mt-6 font-display text-xl italic leading-relaxed text-wine">{spread.note}</p>
                <div aria-hidden className="mt-8 space-y-6">
                  {[0, 1, 2, 3].map((l) => (
                    <div key={l} className="h-px w-full bg-powder-blue/50" style={{ background: "color-mix(in srgb, var(--powder-blue) 55%, transparent)" }} />
                  ))}
                </div>
              </div>
              <div className="sketch-paper relative p-7 md:p-10">
                <div aria-hidden className="absolute inset-y-0 left-0 hidden w-[8%] bg-gradient-to-r from-wine/25 to-transparent md:block" />
                <div className={cn("grid gap-6", spread.slots.length > 3 ? "grid-cols-2" : "grid-cols-2")}>
                  {spread.slots.map((p, i) => (
                    <div key={i} className={cn(spread.slots.length === 3 && i === 0 && "col-span-2 mx-auto w-2/3")}>
                      <PhotoSlot photo={p} list={spread.slots} index={i} tilt={tilts[(i + page) % tilts.length]} sizes="(min-width: 48rem) 22rem, 45vw" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button type="button" onClick={() => go(page - 1)} disabled={page === 0} className="label link-draw text-wine disabled:opacity-35">
            ← Previous page
          </button>
          <span aria-live="polite" className="label text-wine">{spread.title}</span>
          <button type="button" onClick={() => go(page + 1)} disabled={page === designSketchbook.length - 1} className="label link-draw text-wine disabled:opacity-35">
            Next page →
          </button>
        </div>
      </div>
    </ViewerProvider>
  );
}

/* --- 03 The Polaroids: Backstage ----------------------------------------- */

const sectionInks = [ink.vermilion, ink.blue, ink.green, ink.brass, ink.wine, ink.vermilion, ink.blue];

export function BackstageRoom() {
  return (
    <ViewerProvider>
      <RoomHeading id="room-title" kicker="03 · The Polaroids" title="The" italic="Backstage" intro="Rehearsals, fittings, nerves and the minutes before the lights." bloom={ink.green} />
      <nav aria-label="Backstage sections" className="mt-10 flex flex-wrap gap-2">
        {backstage.map((s, i) => (
          <a key={s.id} href={`#backstage-${s.id}`} className="label inline-flex items-center gap-2 rounded-full border border-wine/30 px-3.5 py-2 text-wine hover:border-wine">
            <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: sectionInks[i] }} />
            {s.title}
          </a>
        ))}
      </nav>
      <div className="mt-16 space-y-20">
        {backstage.map((s, i) => (
          <section key={s.id} id={`backstage-${s.id}`} className="scroll-mt-28 space-y-8">
            <Subhead n={String(i + 1).padStart(2, "0")} color={sectionInks[i]}>{s.title}</Subhead>
            {s.note && <p className="max-w-xl font-display text-lg italic text-wine">{s.note}</p>}
            <PhotoScatter photos={s.photos} cols={i % 2 ? 2 : 3} />
          </section>
        ))}
      </div>
    </ViewerProvider>
  );
}

/* --- 04 The Measuring Tape: Production Notebook -------------------------- */

export function ProductionRoom() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const ch = production[i];
  return (
    <ViewerProvider>
      <RoomHeading id="room-title" kicker="04 · The Measuring Tape" title="Production" italic="Notebook" intro="How it all came together: planning, people, schedules and show day." bloom={ink.brass} />
      <div className="mt-14 grid gap-6 md:grid-cols-[13rem_1fr] md:gap-0">
        <div role="tablist" aria-label="Chapters" className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] md:flex-col md:gap-1.5 md:overflow-visible md:pb-0 md:pt-8">
          {production.map((c, j) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={j === i}
              onClick={() => setI(j)}
              className={cn(
                "label shrink-0 rounded-l-sm border-l-4 px-3 py-2.5 text-left text-wine transition-all duration-300 md:translate-x-2",
                j === i ? "bg-[color-mix(in_srgb,var(--aged-ivory)_45%,white)] md:translate-x-0" : "bg-ivory-deep/60 hover:md:translate-x-1",
              )}
              style={{ borderColor: sectionInks[j] }}
            >
              <span className="text-ink-soft">{j + 1}.</span> {c.title}
            </button>
          ))}
        </div>

        <div className="relative rounded-[4px] bg-green p-2 shadow-[0_24px_40px_-26px_rgb(113_63_72_/_0.9)] md:p-3">
          {/* spiral binding */}
          <div aria-hidden className="absolute -top-3 left-6 right-6 flex justify-between">
            {Array.from({ length: 14 }, (_, k) => (
              <span key={k} className="h-6 w-2 rounded-full border-2 border-brass bg-transparent" />
            ))}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={ch.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: -12, y: -10 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease }}
              style={{ transformOrigin: "top center" }}
              className="notebook-ruled relative min-h-[32rem] p-7 pt-10 md:p-12"
            >
              <span aria-hidden className="absolute inset-y-0 left-10 w-px bg-vermilion/50 md:left-14" />
              <div className="pl-6 md:pl-8">
                <p className="label text-ink-soft">Chapter {i + 1} of {production.length}</p>
                <h3 className="title-script mt-3 text-5xl leading-tight md:text-6xl" style={{ color: sectionInks[i] }}>{ch.title}</h3>
                <p className="mt-6 max-w-xl font-display text-xl italic leading-relaxed text-wine">{ch.note}</p>
                {/* a pencilled annotation in the margin */}
                <p aria-hidden className="mt-2 inline-block -rotate-2 rounded-full border border-vermilion/60 px-3 py-0.5 font-display text-sm italic text-vermilion">
                  [handwritten note]
                </p>

                <div className="mt-10 grid gap-5 sm:grid-cols-2">
                  {ch.documents.map((d, k) => (
                    <DocumentCard key={k} doc={d} i={k + i} />
                  ))}
                </div>
                <div className="mt-10 grid grid-cols-2 gap-5">
                  {ch.photos.map((p, k) => (
                    <PhotoSlot key={k} photo={p} list={ch.photos} index={k} tilt={tilts[(k + i) % tilts.length]} sizes="(min-width: 48rem) 22rem, 45vw" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between md:ml-[13rem]">
        <button type="button" onClick={() => setI(i - 1)} disabled={i === 0} className="label link-draw text-wine disabled:opacity-35">← Previous chapter</button>
        <button type="button" onClick={() => setI(i + 1)} disabled={i === production.length - 1} className="label link-draw text-wine disabled:opacity-35">Next chapter →</button>
      </div>
    </ViewerProvider>
  );
}

/* --- 05 The Runway ------------------------------------------------------- */

export function RunwayRoom() {
  const photos = runway.looks.map((l) => l.photo);
  const designers = [...new Set(runway.looks.map((l) => l.designer))];
  return (
    <ViewerProvider>
      <RoomHeading id="room-title" kicker="05 · The Runway Photograph" title="The" italic="Runway" intro="Every look, in the order it walked." bloom={ink.vermilion} />
      <div className="mt-14 space-y-10">
        {runway.videos.map((v, i) => (
          <VideoSlot key={i} video={v} className="mx-auto max-w-4xl" />
        ))}
      </div>

      <div className="relative mt-20">
        {/* the runway itself, running down the middle */}
        <div aria-hidden className="absolute inset-y-0 left-1/2 hidden w-28 -translate-x-1/2 md:block" style={{ background: "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--vermilion) 30%, var(--aged-ivory)) 6%, color-mix(in srgb, var(--vermilion) 30%, var(--aged-ivory)) 94%, transparent)" }}>
          <div className="mx-auto h-full w-px border-l border-dashed border-ivory" />
        </div>
        <ol className="relative grid gap-12 md:grid-cols-2 md:gap-x-40 md:gap-y-4">
          {runway.looks.map((l, i) => (
            <li key={l.number} className={cn("mx-auto w-full max-w-sm", i % 2 ? "md:mt-40" : "")}>
              <PhotoSlot photo={l.photo} list={photos} index={i} tilt={i % 2 ? 1.2 : -1.2} sizes="(min-width: 48rem) 24rem, 85vw" />
              <div className="mt-4 flex items-baseline gap-4">
                <span className="title-script text-4xl text-vermilion">{String(l.number).padStart(2, "0")}</span>
                <div>
                  <p className="label text-wine">Look {l.number}</p>
                  <p className="font-display italic text-ink-soft">Designed by {l.designer}{l.model ? ` · Worn by ${l.model}` : ""}</p>
                  {l.description && <p className="mt-2 text-caption text-wine">{l.description}</p>}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <section className="mt-24">
        <Subhead color={ink.green}>Designer credits</Subhead>
        <ul className="mt-6 flex flex-wrap gap-3">
          {designers.map((d) => (
            <li key={d} className="rounded-full border border-wine/30 px-4 py-2 font-display text-lg text-wine">{d}</li>
          ))}
        </ul>
      </section>
    </ViewerProvider>
  );
}
