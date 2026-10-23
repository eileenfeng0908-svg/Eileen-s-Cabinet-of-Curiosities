"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { drawers, kindAspect, kindLabel, type Drawer, type DrawerObject } from "@/content/curation";
import { PaintDefs } from "@/components/cabinet/PaintDefs";
import { BailPull, CHEST, ChestCarcass, DrawerFrontArt, SLOTS } from "./CabinetArt";
import { ObjectFace } from "./ObjectFace";
import { Stationery } from "./Stationery";
import { cn } from "@/lib/cn";

/**
 * The Curator's Cabinet: a painted chest with three drawers.
 *
 * Geometry is in container-width units (cqw), so the chest and everything in
 * a drawer scale together on any screen. An open drawer slides towards the
 * viewer and down over the chest; its tray is seen from slightly above
 * (a gentle rotateX), and the objects inside lie on its lining paper.
 * One drawer is open at a time. Objects open in a dialog and leave a faint
 * mark in the drawer until they are put back.
 */
const u = (v: number) => (v / CHEST.w) * 100; // chest units → cqw
const CHEST_H = u(CHEST.h);

export function CuratorsCabinet() {
  const [openId, setOpenId] = useState<Drawer["id"] | null>(null);
  const [held, setHeld] = useState<{ obj: DrawerObject; drawer: Drawer } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trayRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const openIndex = drawers.findIndex((d) => d.id === openId);

  // Escape pushes an open drawer back in (the dialog handles its own Escape).
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !dialog.current?.open) setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  // Bring an opened drawer into view once it has slid out.
  useEffect(() => {
    if (!openId) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => trayRefs.current[openId]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" }), reduce ? 0 : 650);
    return () => clearTimeout(t);
  }, [openId]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (held && !d.open) d.showModal();
    if (!held && d.open) d.close();
  }, [held]);

  // How far an open drawer reaches below the chest, so the page makes room for it.
  const reach = openIndex < 0 ? "0cqw" : `max(0cqw, calc(${(u(SLOTS[openIndex].y + SLOTS[openIndex].h) - CHEST_H + 4).toFixed(2)}cqw + var(--tray)))`;

  return (
    <div className="@container mx-auto w-full max-w-[46rem]">
      <PaintDefs />
      <div
        className="relative transition-[padding] duration-700 ease-gallery motion-reduce:transition-none [--k:1.4] [--tray:92cqw] md:[--k:1] md:[--tray:54cqw]"
        style={{ height: `${CHEST_H}cqw`, paddingBottom: reach, boxSizing: "content-box" }}
      >
        <div className="absolute inset-x-0 top-0" style={{ height: `${CHEST_H}cqw` }}>
          <ChestCarcass />
        </div>

        {drawers.map((d, i) => {
          const s = SLOTS[i];
          const open = openId === d.id;
          return (
            <div
              key={d.id}
              className="absolute"
              style={{ left: `${u(s.x)}cqw`, width: `${u(s.w)}cqw`, top: `${u(s.y)}cqw`, zIndex: open ? 20 : 10 - i }}
            >
              {/* the tray, revealed as the drawer comes out */}
              <div
                id={`drawer-${d.id}`}
                ref={(el) => {
                  trayRefs.current[d.id] = el;
                }}
                role="region"
                aria-label={`${d.title} drawer`}
                className="relative origin-bottom overflow-hidden transition-[height] duration-700 ease-gallery motion-reduce:transition-none"
                style={{ height: open ? "var(--tray)" : "0px", transform: "perspective(140cqw) rotateX(16deg)" }}
                inert={!open}
              >
                <Tray drawer={d} held={held?.obj.id} onPick={(obj) => setHeld({ obj, drawer: d })} />
              </div>

              {/* the drawer front: the handle opens and closes it */}
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`drawer-${d.id}`}
                onClick={() => setOpenId(open ? null : d.id)}
                className={cn(
                  "group relative block w-full outline-none transition-[transform,filter] duration-500 ease-gallery motion-reduce:transition-none",
                  "hover:translate-y-[0.4cqw] focus-visible:translate-y-[0.4cqw]",
                  open && "drop-shadow-[0_2cqw_2cqw_rgb(113_63_72_/_0.35)]",
                )}
                style={{ height: `${u(s.h)}cqw` }}
              >
                <DrawerFrontArt seed={40 + i * 13} />
                <span className="absolute inset-x-[28%] top-[14%] flex flex-col items-center text-wine">
                  <span className="font-sans text-[max(0.55rem,1.5cqw)] uppercase tracking-[0.14em]">Drawer {d.number}</span>
                  <span className="font-display text-[max(0.95rem,3.3cqw)] leading-tight transition-colors duration-500 group-hover:text-vermilion group-focus-visible:text-vermilion">
                    {d.title}
                  </span>
                </span>
                <span className="drawer-pull absolute bottom-[10%] left-1/2 w-[16%] -translate-x-1/2">
                  <BailPull />
                </span>
                <span className="sr-only">{open ? "Close the drawer" : "Open the drawer"}</span>
                {/* focus ring drawn as a pencil outline */}
                <span className="pointer-events-none absolute inset-[-0.6cqw] rounded-sm border-2 border-vermilion opacity-0 transition-opacity group-focus-visible:opacity-100" />
              </button>
            </div>
          );
        })}
      </div>

      {/* drawer labels: reach any drawer, even when an open one covers those below */}
      <ul className="mt-8 flex flex-wrap justify-center gap-3" aria-label="Drawers">
        {drawers.map((d) => (
          <li key={d.id}>
            <button
              type="button"
              aria-pressed={openId === d.id}
              aria-controls={`drawer-${d.id}`}
              onClick={() => setOpenId(openId === d.id ? null : d.id)}
              className="label border border-brass/70 bg-ivory-pale/60 px-3 py-1.5 text-wine transition-colors hover:border-vermilion hover:text-vermilion aria-pressed:border-wine aria-pressed:bg-wine aria-pressed:text-ivory"
            >
              {d.number} · {d.title}
            </button>
          </li>
        ))}
      </ul>
      <p aria-live="polite" className="mx-auto mt-5 min-h-[3.2em] max-w-[40rem] text-center font-display text-lede italic text-wine">
        {openIndex >= 0 ? drawers[openIndex].note : "Pull a handle to open a drawer."}
        {openIndex >= 0 && <span className="label mt-1 block not-italic">Choose an object to look closer · push the drawer to close it</span>}
      </p>

      <dialog
        ref={dialog}
        onClose={() => setHeld(null)}
        onClick={(e) => e.target === dialog.current && setHeld(null)}
        aria-labelledby="curio-title"
        className="curio-entry m-auto w-[min(54rem,calc(100%-2rem))] max-h-[calc(100svh-2rem)] overflow-auto bg-ivory p-0 text-wine"
      >
        {held && <ObjectDetail obj={held.obj} drawer={held.drawer} onClose={() => setHeld(null)} />}
      </dialog>
    </div>
  );
}

/** Inside a drawer: walls, lining paper and the objects resting on it. */
function Tray({ drawer, held, onPick }: { drawer: Drawer; held?: string; onPick: (o: DrawerObject) => void }) {
  return (
    <div className="absolute inset-x-0 bottom-0 h-[var(--tray)] bg-walnut" style={{ boxShadow: "inset 0 0 0 1.6cqw color-mix(in srgb, var(--walnut) 80%, var(--wine)), inset 0 3cqw 3cqw -1cqw rgb(113 63 72 / 0.55)" }}>
      {/* wood grain on the walls */}
      <div aria-hidden className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ background: "repeating-linear-gradient(90deg, transparent 0 0.9cqw, rgb(113 63 72 / 0.16) 0.9cqw 1cqw)" }} />
      {/* the lining paper */}
      <div
        className="absolute inset-[1.6cqw] overflow-hidden"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 20%, rgb(177 138 72 / 0.18), transparent 70%), radial-gradient(40% 40% at 80% 90%, rgb(197 101 88 / 0.10), transparent 70%), var(--aged-ivory)",
          boxShadow: "inset 0 2.4cqw 2.6cqw -1.4cqw rgb(113 63 72 / 0.45)",
        }}
      >
        <div aria-hidden className="plate-tooth absolute inset-0 opacity-70" />
        <ul className="absolute inset-0">
          {drawer.objects.map((o) => (
            <DrawerItem key={o.id} obj={o} drawer={drawer} lifted={held === o.id} onPick={onPick} />
          ))}
        </ul>
        {drawer.stationery?.map((p, i) => <Stationery key={i} piece={p} />)}
      </div>
    </div>
  );
}

function DrawerItem({ obj, lifted, onPick }: { obj: DrawerObject; drawer: Drawer; lifted: boolean; onPick: (o: DrawerObject) => void }) {
  const aspect = obj.at.aspect ?? obj.image?.aspect ?? kindAspect[obj.kind];
  const style = {
    left: `${obj.at.x}%`,
    top: `${obj.at.y}%`,
    width: `calc(${obj.at.w}% * var(--k))`,
    aspectRatio: `${aspect}`,
    zIndex: obj.at.z ?? 1,
    "--rot": `${obj.at.rot}deg`,
  } as React.CSSProperties;
  const cls = cn("drawer-object group absolute block outline-none", lifted && "is-lifted");
  const inner = (
    <>
      <span className="drawer-object-body absolute inset-0 [--k:1]">
        <ObjectFace obj={obj} aspect={aspect} />
        {obj.fixings?.map((p, i) => <Stationery key={i} piece={p} />)}
      </span>
      <span className="pointer-events-none absolute inset-[-4%] border-2 border-vermilion opacity-0 transition-opacity group-focus-visible:opacity-100" />
    </>
  );
  const name = `${obj.title}, ${kindLabel[obj.kind].toLowerCase()}`;
  return (
    <li>
      {obj.kind === "catalogue" && obj.exhibition ? (
        <Link href={`/exhibitions/${obj.exhibition}`} className={cls} style={style} aria-label={`${name}. Open the exhibition catalogue`}>
          {inner}
        </Link>
      ) : (
        <button type="button" onClick={() => onPick(obj)} className={cls} style={style} aria-label={name} aria-haspopup="dialog">
          {inner}
        </button>
      )}
    </li>
  );
}

function ObjectDetail({ obj, drawer, onClose }: { obj: DrawerObject; drawer: Drawer; onClose: () => void }) {
  const aspect = obj.at.aspect ?? obj.image?.aspect ?? kindAspect[obj.kind];
  const tall = aspect < 1;
  return (
    <article className="grid gap-8 p-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:p-10">
      <div className="flex items-center justify-center rounded-sm bg-walnut/25 p-[8%]">
        <div className="relative w-full drop-shadow-[0_12px_14px_rgb(113_63_72_/_0.35)]" style={{ aspectRatio: `${aspect}`, maxWidth: tall ? "70%" : "100%" }}>
          <ObjectFace obj={obj} aspect={aspect} sizes="(min-width: 48rem) 28rem, 90vw" />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="label text-wine">
          Drawer {drawer.number} · {drawer.title}
        </p>
        <h3 id="curio-title" className="mt-3 text-display-m">{obj.title}</h3>
        <p className="mt-2 font-display text-lede italic">{[kindLabel[obj.kind], obj.date].filter(Boolean).join(", ")}</p>
        {obj.description && <p className="mt-6 border-t border-wine/25 pt-5 text-body">{obj.description}</p>}
        {obj.image?.caption && <p className="mt-3 text-caption">{obj.image.caption}</p>}
        {obj.list && (
          <ol className="mt-6 space-y-3">
            {obj.list.map((l, i) => (
              <li key={l.href}>
                <Link href={l.href} className="group flex items-baseline gap-4 font-display text-title text-wine">
                  <span className="label w-6">{String(i + 1).padStart(2, "0")}</span>
                  <span className="transition-colors group-hover:text-vermilion">{l.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
          {obj.exhibition ? (
            <Link href={`/exhibitions/${obj.exhibition}`} className="label link-draw text-wine">
              Open the exhibition catalogue →
            </Link>
          ) : (
            <span />
          )}
          <button type="button" onClick={onClose} autoFocus className="label border border-wine/40 px-3 py-1.5 text-wine hover:border-vermilion hover:text-vermilion">
            Put it back
          </button>
        </div>
      </div>
    </article>
  );
}
