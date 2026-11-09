"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { dreamTrips, type DreamPhoto } from "@/content/dreams";
import { PaintedSheet } from "@/components/writing/Painted";
import { cn } from "@/lib/cn";

/**
 * Places not yet visited: each trip is a painted page with a taped cover,
 * Eileen's reason in her own words, and a row of snapshots. Any photo opens
 * a viewer. Content lives in content/dreams.ts.
 */
const blooms = ["var(--powder-blue)", "var(--botanical-green)", "var(--vermilion)", "var(--brass)"];
const tilts = ["-rotate-[2deg]", "rotate-[2.5deg]", "-rotate-[1.5deg]", "rotate-[1.8deg]", "-rotate-[2.4deg]", "rotate-[1.2deg]"];

function rich(text: string) {
  return text.split(/\*([^*]+)\*/).map((part, j) => (j % 2 ? <em key={j}>{part}</em> : part));
}

export function DreamTrips() {
  const [open, setOpen] = useState<{ trip: number; i: number } | null>(null);

  return (
    <div className="space-y-20 md:space-y-28">
      {dreamTrips.map((trip, t) => {
        const [cover, ...rest] = trip.photos;
        const flip = t % 2 === 1;
        return (
          <article key={trip.id} id={`dream-${trip.id}`} aria-labelledby={`dream-${trip.id}-title`} className="relative scroll-mt-24 px-5 py-10 sm:px-10 md:px-14 md:py-14">
            <PaintedSheet seed={t * 17 + 9} bloom={blooms[t % blooms.length]} notched h={900} />
            <div className={cn("relative grid items-center gap-10 md:grid-cols-12 md:gap-12", flip && "md:[&>*:first-child]:order-2")}>
              <button
                type="button"
                onClick={() => setOpen({ trip: t, i: 0 })}
                className={cn("group relative mx-auto block w-full max-w-md md:col-span-5", flip ? "rotate-[2deg]" : "-rotate-[2deg]")}
                aria-label={`Open photos: ${cover.alt}`}
              >
                <span aria-hidden className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rotate-[-3deg] opacity-80" style={{ background: blooms[(t + 2) % blooms.length] }} />
                <span className="block bg-ivory p-3 pb-10 shadow-[0_10px_30px_rgb(113_63_72/0.25)] transition-transform duration-500 group-hover:-translate-y-1 md:p-4 md:pb-12">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} loading="lazy" className={cn("block h-auto w-full", cover.pixel && "[image-rendering:pixelated]")} />
                  <span className="absolute bottom-3 left-0 right-0 text-center font-display text-lg italic text-wine md:bottom-4">{trip.place}</span>
                </span>
              </button>

              <div className="md:col-span-7">
                <p className="label text-vermilion">Dream trip No. {String(t + 1).padStart(2, "0")}</p>
                <h3 id={`dream-${trip.id}-title`} className="mt-3 text-display-m text-wine">{trip.title}</h3>
                <p className="mt-6 max-w-[38rem] border-l border-vermilion/50 pl-5 text-lede text-wine">{rich(trip.reason)}</p>
                {rest.length > 0 && (
                  <ul className="mt-10 flex flex-wrap gap-4 md:gap-5">
                    {rest.map((p, k) => (
                      <li key={p.src} className={tilts[k % tilts.length]}>
                        <button
                          type="button"
                          onClick={() => setOpen({ trip: t, i: k + 1 })}
                          className="block bg-ivory p-1.5 pb-4 shadow-[0_6px_16px_rgb(113_63_72/0.22)] transition-transform duration-500 hover:-translate-y-1 hover:rotate-0"
                          aria-label={`Open photo: ${p.alt}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.src} alt="" loading="lazy" className={cn("block h-24 w-auto md:h-28", p.pixel && "[image-rendering:pixelated]")} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </article>
        );
      })}
      {open && <Viewer photos={dreamTrips[open.trip].photos} i={open.i} onIndex={(i) => setOpen({ ...open, i })} onClose={() => setOpen(null)} />}
    </div>
  );
}

function Viewer({ photos, i, onIndex, onClose }: { photos: DreamPhoto[]; i: number; onIndex: (i: number) => void; onClose: () => void }) {
  const n = photos.length;
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((i + 1) % n);
      if (e.key === "ArrowLeft") onIndex((i - 1 + n) % n);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [i, n, onIndex, onClose]);
  const p = photos[i];
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={p.alt} onClick={onClose} className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-wine/80 p-6 backdrop-blur-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.src}
        alt={p.alt}
        className={cn("max-h-[78vh] max-w-full bg-ivory p-2 shadow-2xl md:p-3", p.pixel && "[image-rendering:pixelated]")}
        onClick={(e) => { e.stopPropagation(); onIndex((i + 1) % n); }}
      />
      <p className="max-w-xl text-center font-display text-lg italic text-ivory">{p.alt}</p>
      <div className="flex gap-8 text-ivory">
        <button type="button" className="label" onClick={(e) => { e.stopPropagation(); onIndex((i - 1 + n) % n); }}>← Previous</button>
        <span className="label">{i + 1} / {n}</span>
        <button type="button" className="label" onClick={(e) => { e.stopPropagation(); onIndex((i + 1) % n); }}>Next →</button>
        <button type="button" className="label" onClick={onClose}>Close ✕</button>
      </div>
    </div>,
    document.body,
  );
}
