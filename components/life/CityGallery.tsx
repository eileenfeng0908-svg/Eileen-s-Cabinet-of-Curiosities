"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cities, type CityLandmark, type LifePhoto } from "@/content/life";
import { handLine, handRect, rng } from "@/components/cabinet/paint";
import { pencil, wash } from "@/components/cabinet/PaintDefs";
import { PaintedSheet, PencilRule } from "@/components/writing/Painted";
import { cn } from "@/lib/cn";
import { landmarkArt } from "./landmarks";

/**
 * One city's pages in the atlas: a little photo book. The photographs come
 * from that city's `photos` in content/life.ts, in the order written there;
 * until there are some, the page waits quietly for them.
 */
export function CityGallery({ city, onBack, onCity }: { city: CityLandmark; onBack: () => void; onCity: (c: CityLandmark) => void }) {
  const [shown, setShown] = useState<number | null>(null);
  const i = cities.indexOf(city);
  const prev = cities[(i - 1 + cities.length) % cities.length];
  const next = cities[(i + 1) % cities.length];
  const back = useRef<HTMLButtonElement>(null);

  // Arriving in a city: start at the top of its pages, with focus on the way back.
  useEffect(() => {
    setShown(null);
    back.current?.focus({ preventScroll: true });
  }, [city.id]);

  return (
    <section aria-labelledby="city-title" className="city-gallery relative">
      <div className="flex items-center justify-between pb-5">
        <button ref={back} type="button" onClick={onBack} className="label link-draw text-wine">
          ← Back to Atlas
        </button>
        <span className="label text-ink-soft">
          {i + 1} / {cities.length}
        </span>
      </div>

      <div className="relative px-5 pb-12 pt-10 sm:px-10 md:px-16 md:pb-16 md:pt-14">
        <PaintedSheet seed={i * 11 + 5} bloom={city.home ? "var(--powder-blue)" : "var(--vermilion)"} notched h={1300} />

        <header className="relative flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:gap-10 md:text-left">
          <LandmarkPlate city={city} />
          <div className="min-w-0">
            <p className="label text-ink-soft">
              Life, in <span className="italic">Fragments</span>
            </p>
            <h2 id="city-title" className="mt-3 text-display-m text-wine">
              {city.home ? (
                <>
                  <span className="whitespace-nowrap"><HomeHeart /> HOME <span className="text-vermilion">—</span></span> <span className="whitespace-nowrap">{city.city.toUpperCase()}</span>
                </>
              ) : (
                city.city
              )}
            </h2>
            <p className="mt-3 font-display text-[1.15rem] italic text-wine/80">
              {city.country} <span aria-hidden>·</span> {city.landmark}
            </p>
          </div>
        </header>

        <PencilRule seed={i + 3} className="relative mt-8 md:mt-10" />

        {city.photos.length ? <PhotoBook photos={city.photos} seed={i} onOpen={setShown} /> : <Waiting seed={i} />}
      </div>

      <nav aria-label="Other places" className="flex items-center justify-between gap-4 pt-6">
        <button type="button" onClick={() => onCity(prev)} className="label link-draw text-left text-wine">
          ← {prev.city}
        </button>
        <button type="button" onClick={() => onCity(next)} className="label link-draw text-right text-wine">
          {next.city} →
        </button>
      </nav>

      <PhotoViewer city={city} index={shown} onChange={setShown} />
    </section>
  );
}

/* --- The pages ------------------------------------------------------------- */

/** Prints laid into the book, each a touch askew, held by brass corners. */
function PhotoBook({ photos, seed, onOpen }: { photos: LifePhoto[]; seed: number; onOpen: (i: number) => void }) {
  return (
    <ul className="relative mt-10 columns-1 gap-8 sm:columns-2 lg:columns-3 [&>li]:mb-10">
      {photos.map((p, k) => {
        const tilt = ((((k + seed) * 37) % 7) - 3) * 0.35;
        return (
          <li key={p.src} className="break-inside-avoid">
            <figure>
              <button
                type="button"
                onClick={() => onOpen(k)}
                aria-label={`Open photograph ${k + 1} of ${photos.length}${p.caption ? `: ${p.caption}` : ""}`}
                className="photo-print group relative block w-full"
                style={{ rotate: `${tilt}deg` }}
              >
                <Mount seed={seed * 31 + k} />
                <span className="relative block p-[6%]">
                  <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="block h-auto w-full" />
                </span>
                <Corners seed={seed * 13 + k} />
              </button>
              {(p.caption || p.date) && (
                <figcaption className="mt-3 px-1 text-center">
                  {p.caption && <span className="block font-display text-[1.02rem] italic leading-snug text-wine">{p.caption}</span>}
                  {p.date && <span className="label mt-1 block text-ink-soft">{formatDate(p.date)}</span>}
                </figcaption>
              )}
            </figure>
          </li>
        );
      })}
    </ul>
  );
}

/** An empty page, with a pencilled frame where the first print will go. */
function Waiting({ seed }: { seed: number }) {
  const r = rng(seed * 5 + 2);
  return (
    <div className="relative mx-auto mt-10 max-w-md md:mt-14">
      <svg aria-hidden viewBox="0 0 300 220" className="block w-full overflow-visible">
        <path d={handRect(20, 14, 260, 190, r, 1.6)} fill="color-mix(in srgb, var(--aged-ivory) 70%, white)" filter={wash("c")} opacity={0.7} />
        <path d={handRect(20, 14, 260, 190, r, 1.2)} fill="none" stroke="var(--wine)" strokeOpacity={0.4} strokeWidth={1} strokeDasharray="5 4" filter={pencil} />
        <g filter={pencil} fill="none" stroke="var(--wine)" strokeOpacity={0.3} strokeWidth={0.9} strokeLinecap="round">
          <path d={handLine([[70, 160], [118, 104], [150, 138], [186, 92], [232, 160]], r, 1)} />
          <circle cx={206} cy={62} r={11} />
        </g>
        <CornerShapes x0={20} y0={14} x1={280} y1={204} />
      </svg>
      <p className="mt-6 text-center font-display text-[clamp(1.15rem,2vw,1.4rem)] italic text-wine">Photographs will find their way here.</p>
    </div>
  );
}

/* --- The viewer ------------------------------------------------------------ */

function PhotoViewer({ city, index, onChange }: { city: CityLandmark; index: number | null; onChange: (i: number | null) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const photos = city.photos;
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const p = index === null ? null : photos[index];
  const go = (dir: 1 | -1) => index !== null && onChange((index + dir + photos.length) % photos.length);

  return (
    <dialog
      ref={dialog}
      onClose={() => onChange(null)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onClick={(e) => e.target === e.currentTarget && onChange(null)}
      aria-label={`Photographs from ${city.city}`}
      className="photo-viewer m-0 h-[100svh] max-h-none w-full max-w-none bg-ivory p-0 text-wine"
    >
      {p && (
        <div className="flex h-full flex-col">
          <div className="frame flex items-center justify-between py-4">
            <button type="button" onClick={() => onChange(null)} autoFocus className="label link-draw text-wine">
              ✕ Close
            </button>
            <span className="label text-ink-soft">
              {city.home ? "Home — " : ""}
              {city.city} · {index! + 1} / {photos.length}
            </span>
          </div>

          <figure className="frame flex min-h-0 flex-1 flex-col items-center justify-center gap-4 pb-4">
            <div key={p.src} className="photo-viewer-print relative flex min-h-0 max-w-full flex-1 items-center justify-center">
              <div className="relative p-[clamp(10px,2vw,22px)]">
                <Mount seed={index! * 7 + 1} />
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="90vw"
                  loading="eager"
                  className="relative block h-auto"
                  style={{ width: `min(calc(100vw - 4rem), calc((100svh - 16rem) * ${p.width / p.height}))` }}
                />
              </div>
            </div>
            {(p.caption || p.date) && (
              <figcaption className="max-w-xl text-center">
                {p.caption && <span className="block font-display text-[1.15rem] italic text-wine">{p.caption}</span>}
                {p.date && <span className="label mt-1 block text-ink-soft">{formatDate(p.date)}</span>}
              </figcaption>
            )}
          </figure>

          {photos.length > 1 && (
            <nav aria-label="More photographs" className="frame flex items-center justify-between border-t border-wine/20 py-4">
              <button type="button" onClick={() => go(-1)} className="label link-draw text-wine">
                ← Previous
              </button>
              <button type="button" onClick={() => go(1)} className="label link-draw text-wine">
                Next →
              </button>
            </nav>
          )}
        </div>
      )}
    </dialog>
  );
}

/* --- Paper and brass ------------------------------------------------------- */

/** An ivory mat with a pencilled edge, sized to whatever it sits behind. */
function Mount({ seed }: { seed: number }) {
  const r = rng(seed);
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      <path d={handRect(0, 0, 100, 100, r, 0.8)} fill="color-mix(in srgb, var(--aged-ivory) 55%, white)" filter={wash("c")} />
      <path d={handRect(0, 0, 100, 100, r, 0.6)} fill="none" stroke="var(--wine)" strokeOpacity={0.35} strokeWidth={1} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Brass photo corners at the four corners of a print. */
function Corners({ seed }: { seed: number }) {
  const tilt = (seed % 5) - 2;
  return (
    <span aria-hidden className="pointer-events-none absolute inset-[2.5%]" style={{ rotate: `${tilt * 0.2}deg` }}>
      {(["left-0 top-0", "right-0 top-0 rotate-90", "bottom-0 right-0 rotate-180", "bottom-0 left-0 -rotate-90"] as const).map((pos) => (
        <svg key={pos} viewBox="0 0 20 20" className={cn("absolute h-[clamp(14px,8%,22px)] w-[clamp(14px,8%,22px)] overflow-visible", pos)}>
          <path d="M0 0H20L0 20Z" fill="var(--brass)" filter={wash("c")} />
          <path d="M0 0H20L0 20Z" fill="none" stroke="var(--wine)" strokeOpacity={0.45} strokeWidth={0.8} filter={pencil} />
        </svg>
      ))}
    </span>
  );
}

function CornerShapes({ x0, y0, x1, y1 }: { x0: number; y0: number; x1: number; y1: number }) {
  const k = 18;
  const d = `M${x0} ${y0}h${k}l-${k} ${k}Z M${x1} ${y0}v${k}l-${k} -${k}Z M${x1} ${y1}h-${k}l${k} -${k}Z M${x0} ${y1}v-${k}l${k} ${k}Z`;
  return (
    <g>
      <path d={d} fill="var(--brass)" filter={wash("c")} opacity={0.9} />
      <path d={d} fill="none" stroke="var(--wine)" strokeOpacity={0.45} strokeWidth={0.8} filter={pencil} />
    </g>
  );
}

/* --- Heading ornaments ------------------------------------------------------ */

/** The city's landmark, painted small beside its name. */
function LandmarkPlate({ city }: { city: CityLandmark }) {
  const art = landmarkArt[city.art];
  if (!art) return null;
  const [hw, h] = art.box;
  const pad = 8;
  return (
    <svg aria-hidden viewBox={`${-hw - pad} ${-h - pad} ${hw * 2 + pad * 2} ${h + pad * 2 + 6}`} className="block h-32 w-auto shrink-0 overflow-visible md:h-44">
      <ellipse cx={0} cy={3} rx={hw * 0.95} ry={4.5} fill="var(--wine)" fillOpacity={0.2} filter={wash("c")} />
      {city.image ? <image href={city.image} x={-hw} y={-h} width={hw * 2} height={h} preserveAspectRatio="xMidYMax meet" /> : art.draw()}
    </svg>
  );
}

function HomeHeart() {
  return (
    <svg aria-hidden viewBox="-6 -6 12 11" className="relative -top-[0.08em] inline-block h-[0.55em] w-[0.55em] align-middle">
      <path d="M0 -2.5c-2.2 -2.6 -6 -0.6 -4.4 2.4c1 1.9 4.4 4.2 4.4 4.2s3.4 -2.3 4.4 -4.2c1.6 -3 -2.2 -5 -4.4 -2.4z" fill="var(--powder-blue)" stroke="color-mix(in srgb, var(--powder-blue) 60%, var(--wine))" strokeWidth={0.6} filter={pencil} />
    </svg>
  );
}

/** "2024-05-03" → "3 May 2024"; "2024-05" → "May 2024"; anything else as written. */
function formatDate(d: string) {
  const m = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/.exec(d);
  if (!m) return d;
  const [, y, mo, da] = m;
  if (!mo) return y;
  const month = new Date(Date.UTC(+y, +mo - 1, 1)).toLocaleString("en-GB", { month: "long", timeZone: "UTC" });
  return da ? `${+da} ${month} ${y}` : `${month} ${y}`;
}
