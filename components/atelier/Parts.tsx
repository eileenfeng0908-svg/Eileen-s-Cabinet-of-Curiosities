"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { AtelierDocument, AtelierPhoto, AtelierVideo } from "@/content/atelier";
import { PaintedSheet, WashBlot } from "@/components/writing/Painted";
import { cn } from "@/lib/cn";

/**
 * Small building blocks shared by every room of the atelier: an empty frame
 * that becomes a photograph once one is added, a video slot, a document card,
 * a section heading and the enlarged photo viewer.
 */

const washes = ["var(--powder-blue)", "var(--vermilion)", "var(--botanical-green)", "var(--brass)", "var(--wine)"];
export const aspectOf = (p: AtelierPhoto) =>
  p.src && p.width && p.height ? p.width / p.height : p.shape === "landscape" ? 4 / 3 : p.shape === "square" ? 1 : 3 / 4;

/* --- The viewer: one per room, opened from any photo slot in it ---------- */

type ViewerApi = { open: (list: AtelierPhoto[], i: number) => void };
const ViewerContext = createContext<ViewerApi>({ open: () => {} });

export function ViewerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ list: AtelierPhoto[]; i: number } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (state && !d.open) d.showModal();
    if (!state && d.open) d.close();
  }, [state]);
  const p = state ? state.list[state.i] : null;
  const go = (dir: 1 | -1) => state && setState({ ...state, i: (state.i + dir + state.list.length) % state.list.length });

  return (
    <ViewerContext.Provider value={{ open: (list, i) => setState({ list, i }) }}>
      {children}
      <dialog
        ref={dialog}
        onClose={() => setState(null)}
        onClick={(e) => e.target === e.currentTarget && setState(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        aria-label="Photograph"
        className="photo-viewer m-0 h-[100svh] max-h-none w-full max-w-none bg-ivory p-0 text-wine"
      >
        {p && state && (
          <div className="flex h-full flex-col">
            <div className="frame flex items-center justify-between py-4">
              <button type="button" onClick={() => setState(null)} autoFocus className="label link-draw text-wine">
                ✕ Close
              </button>
              <span className="label text-ink-soft">
                {state.i + 1} / {state.list.length}
              </span>
            </div>
            <figure className="frame flex min-h-0 flex-1 flex-col items-center justify-center gap-4 pb-4">
              <div key={state.i} className="photo-viewer-print relative flex min-h-0 w-full flex-1 items-center justify-center">
                {p.src && p.width && p.height ? (
                  <Image
                    src={p.src}
                    alt={p.alt ?? ""}
                    width={p.width}
                    height={p.height}
                    sizes="90vw"
                    loading="eager"
                    className="block h-auto shadow-[0_20px_40px_-24px_rgb(113_63_72_/_0.6)]"
                    style={{ width: `min(calc(100vw - 4rem), calc((100svh - 14rem) * ${p.width / p.height}))` }}
                  />
                ) : (
                  <div style={{ width: `min(calc(100vw - 4rem), calc((100svh - 14rem) * ${aspectOf(p)}))`, aspectRatio: aspectOf(p) }}>
                    <EmptyFrame label={p.label} tint={washes[state.i % washes.length]} big />
                  </div>
                )}
              </div>
              {p.caption && <figcaption className="max-w-xl text-center font-display text-[1.15rem] italic text-wine">{p.caption}</figcaption>}
            </figure>
            {state.list.length > 1 && (
              <div className="frame flex items-center justify-between pb-6">
                <button type="button" onClick={() => go(-1)} className="label link-draw text-wine">← Previous</button>
                <button type="button" onClick={() => go(1)} className="label link-draw text-wine">Next →</button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </ViewerContext.Provider>
  );
}

const bloomOf = (tint: string) => washes[(washes.indexOf(tint) + 2) % washes.length];

/** A frame waiting for its photograph: a pale wash, a pencilled border and its [label]. */
function EmptyFrame({ label, tint, big = false }: { label: string; tint: string; big?: boolean }) {
  return (
    <span
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(55% 45% at 28% 26%, color-mix(in srgb, ${tint} 75%, transparent), transparent 75%), radial-gradient(50% 45% at 78% 82%, color-mix(in srgb, ${bloomOf(tint)} 55%, transparent), transparent 75%), color-mix(in srgb, ${tint} 38%, var(--aged-ivory))`,
      }}
    >
      <span aria-hidden className="plate-tooth absolute inset-0 opacity-70" />
      <span aria-hidden className="absolute inset-[6%] border-[1.5px] border-dashed border-wine/45" />
      <span className={cn("relative px-4 text-center font-display italic text-wine", big ? "text-xl" : "text-[0.95rem] leading-snug")}>{label}</span>
    </span>
  );
}

/** A photo slot. Clicking opens the room's viewer at this photo. */
export function PhotoSlot({ photo, list, index, tilt = 0, className, sizes = "(min-width: 64rem) 30vw, 80vw" }: { photo: AtelierPhoto; list: AtelierPhoto[]; index: number; tilt?: number; className?: string; sizes?: string }) {
  const { open } = useContext(ViewerContext);
  const a = aspectOf(photo);
  return (
    <button
      type="button"
      onClick={() => open(list, index)}
      aria-label={photo.src ? `Enlarge ${photo.alt ?? "photograph"}` : `${photo.label.replace(/[[\]]/g, "")} (empty, enlarge)`}
      className={cn("atelier-print group relative block w-full bg-[color-mix(in_srgb,var(--aged-ivory)_50%,white)] p-[3.5%] text-left", className)}
      style={{ ["--tilt" as string]: `${tilt}deg` }}
    >
      <span className="relative block w-full" style={{ aspectRatio: a }}>
        {photo.src && photo.width && photo.height ? (
          <Image src={photo.src} alt={photo.alt ?? ""} fill sizes={sizes} className="object-cover" />
        ) : (
          <EmptyFrame label={photo.label} tint={washes[index % washes.length]} />
        )}
      </span>
      {photo.caption && <span className="mt-2 block text-center font-display text-sm italic text-wine">{photo.caption}</span>}
    </button>
  );
}

/** A video: the embed once a URL is added, an empty screen until then. */
export function VideoSlot({ video, className }: { video: AtelierVideo; className?: string }) {
  return (
    <figure className={className}>
      <div className="relative aspect-video w-full overflow-hidden bg-[color-mix(in_srgb,var(--wine)_88%,black)] p-[1.2%] shadow-[0_18px_30px_-22px_rgb(113_63_72_/_0.7)]">
        {video.url ? (
          <iframe src={video.url} title={video.caption ?? "Fashion show video"} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="h-full w-full" />
        ) : (
          <div
            className="relative flex h-full w-full flex-col items-center justify-center gap-3"
            style={{ background: "radial-gradient(50% 60% at 25% 30%, color-mix(in srgb, var(--vermilion) 45%, transparent), transparent 75%), radial-gradient(45% 55% at 80% 75%, color-mix(in srgb, var(--brass) 55%, transparent), transparent 75%), color-mix(in srgb, var(--powder-blue) 80%, var(--aged-ivory))" }}
          >
            <span aria-hidden className="plate-tooth absolute inset-0 opacity-70" />
            <span aria-hidden className="relative flex h-14 w-14 items-center justify-center rounded-full bg-vermilion text-xl text-ivory">▶</span>
            <span className="relative font-display text-lg italic text-wine">{video.label}</span>
          </div>
        )}
      </div>
      {video.caption && <figcaption className="mt-3 font-display italic text-wine">{video.caption}</figcaption>}
    </figure>
  );
}

/** A planning document pinned into the notebook. */
export function DocumentCard({ doc, i }: { doc: AtelierDocument; i: number }) {
  const body = (
    <>
      <span aria-hidden className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-2 opacity-75" style={{ background: `color-mix(in srgb, ${washes[(i + 2) % washes.length]} 70%, transparent)` }} />
      <span aria-hidden className="mb-3 block space-y-1.5">
        {[90, 70, 82, 55].map((w, j) => (
          <span key={j} className="block h-px bg-wine/25" style={{ width: `${w}%` }} />
        ))}
      </span>
      <span className="block font-display italic text-wine">{doc.label}</span>
      {doc.note && <span className="mt-1 block text-caption text-ink-soft">{doc.note}</span>}
    </>
  );
  const cls = "relative block rotate-[var(--tilt)] border border-wine/20 bg-[color-mix(in_srgb,var(--aged-ivory)_45%,white)] p-4 shadow-[0_8px_16px_-12px_rgb(113_63_72_/_0.6)]";
  const style = { ["--tilt" as string]: `${i % 2 ? 1.5 : -1.2}deg` };
  return doc.href ? (
    <a href={doc.href} target="_blank" rel="noreferrer" className={cn(cls, "transition-transform hover:-translate-y-1")} style={style}>
      {body}
    </a>
  ) : (
    <div className={cls} style={style}>
      {body}
    </div>
  );
}

/** A room's heading on a painted paper strip. */
export function RoomHeading({ kicker, title, italic, intro, bloom = "var(--vermilion)", id }: { kicker: string; title: string; italic?: string; intro?: string; bloom?: string; id: string }) {
  return (
    <header className="relative px-6 py-10 md:px-12 md:py-14">
      <PaintedSheet seed={kicker.length * 5 + 3} bloom={bloom} notched h={420} />
      <WashBlot color={bloom} seed={kicker.length} className="-right-4 -top-6 h-20 w-20 opacity-70" />
      <div className="relative">
        <p className="label text-wine">{kicker}</p>
        <h2 id={id} className="mt-3 text-display-l text-wine">
          {title} {italic && <em>{italic}</em>}
        </h2>
        {intro && <p className="mt-4 max-w-2xl font-display text-lede italic text-wine">{intro}</p>}
      </div>
    </header>
  );
}

/** A heading inside a room, with a small coloured dot. */
export function Subhead({ n, children, color = "var(--vermilion)" }: { n?: string; children: React.ReactNode; color?: string }) {
  return (
    <h3 className="flex items-baseline gap-3 text-title text-wine">
      {n && <span className="label text-ink-soft">{n}</span>}
      <span aria-hidden className="inline-block h-2.5 w-2.5 translate-y-[-0.15em] rounded-full" style={{ background: color }} />
      {children}
    </h3>
  );
}
