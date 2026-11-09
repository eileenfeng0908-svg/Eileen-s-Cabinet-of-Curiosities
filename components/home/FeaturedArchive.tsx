"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { animate, motion, useMotionValue, useReducedMotion, type MotionValue } from "motion/react";
import { curiosities } from "@/content/curiosities";
import { Plate } from "@/components/editorial/Plate";
import { Rosette } from "@/components/editorial/Ornaments";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { PaintedSheet } from "@/components/writing/Painted";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/lib/types";

/**
 * Eileen's photos (content/curiosities.ts) scattered across a painted desk
 * blotter. With a mouse you can pick them up and move them around (a click
 * opens the photo), and "Tidy up" puts everything back. On touch screens
 * they sit as a loose, tilted row.
 */

// Where each photo lands: a loose 6 x 3 scatter, left/top in % of the desk.
const jitter = [
  [1, 2, -6], [3, -1, 4], [-1, 4, -3], [2, 0, 6], [0, 3, -5], [2, -2, 3],
  [-1, 1, 5], [2, 4, -4], [0, -1, 7], [3, 2, -2], [1, 0, 4], [-1, 3, -7],
  [2, 1, 3], [0, -2, -5], [3, 3, 6], [1, 0, -3], [-1, 2, 5], [2, -1, -4],
];
function spotFor(i: number, img: ImageAsset) {
  const [jx, jy, rot] = jitter[i % jitter.length];
  const col = i % 6;
  const row = Math.floor(i / 6) % 3;
  const w = img.aspect >= 1 ? 14 : img.aspect > 0.7 ? 10.5 : 9;
  return { left: 3 + col * 15.6 + jx, top: 5 + row * 30 + jy, w, rot };
}
const tapes = ["var(--vermilion)", "var(--brass)", "var(--powder-blue)", "var(--botanical-green)", "var(--vermilion)"];
const tilts = ["-rotate-[2deg]", "rotate-[1.5deg]", "-rotate-[1deg]", "rotate-[2.2deg]", "-rotate-[1.6deg]"];

export function FeaturedArchive() {
  const items = curiosities;
  const desk = useRef<HTMLDivElement>(null);
  const [fine, setFine] = useState(false);
  const [tidy, setTidy] = useState(0);
  const [moved, setMoved] = useState(false);
  const [order, setOrder] = useState(items.map((it) => it.src!));
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % items.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items.length]);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 48rem)");
    const set = () => setFine(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const lift = (slug: string) => {
    setMoved(true);
    setOrder((o) => [...o.filter((s) => s !== slug), slug]);
  };

  return (
    <section aria-labelledby="archive-title" className="section-space blue-wash relative overflow-hidden text-ink">
      <div className="frame">
        <header className="grid-editorial gap-y-6">
          <Reveal className="group col-span-4 flex items-center gap-4 text-wine md:col-span-8 lg:col-span-12">
            <span className="label text-wine">IV</span>
            <span aria-hidden className="h-px w-10 bg-brass/50" />
            <span aria-hidden className="transition-transform duration-[1200ms] ease-gallery group-hover:rotate-90">
              <Rosette className="h-3.5 w-3.5 text-brass" />
            </span>
            <span className="label">Featured Archive</span>
          </Reveal>
          <Reveal delay={0.08} className="col-span-4 md:col-span-6 lg:col-span-7 lg:col-start-4">
            <h2 id="archive-title" className="text-display-l">
              A cabinet of <em>small curiosities</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16} className="col-span-4 md:col-span-4 lg:col-span-3 lg:col-start-4">
            <p className="text-caption text-ink-soft">
              Postcards, bookshops, shells, paintings and fragments of ordinary days: the little things I keep
              and notice.
            </p>
          </Reveal>
        </header>

        {fine ? (
          <div className="mt-16 md:mt-20">
            <div ref={desk} className="relative aspect-[16/8.6] w-full">
              <PaintedSheet seed={61} bloom="var(--powder-blue)" notched h={540} />
              <span aria-hidden className="pointer-events-none absolute bottom-[7%] right-[5%] max-w-[14rem] -rotate-3 text-right font-display text-lg italic text-ink-soft">
                Pick things up, move them around. A click opens one.
              </span>
              {items.map((item, i) => (
                <DeskObject
                  key={item.src}
                  item={item}
                  i={i}
                  z={order.indexOf(item.src!) + 1}
                  desk={desk}
                  tidy={tidy}
                  onLift={() => lift(item.src!)}
                  onOpen={() => setOpen(i)}
                />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between gap-6">
              <button
                type="button"
                onClick={() => {
                  setTidy((t) => t + 1);
                  setMoved(false);
                }}
                className={cn(
                  "label inline-flex items-center gap-2 text-wine transition-opacity duration-500",
                  moved ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <span aria-hidden>↺</span> Tidy up
              </button>
              <ArrowLink href="/archive" className="text-ink">
                Enter the archive
              </ArrowLink>
            </div>
          </div>
        ) : (
          <>
            <ul className="mt-16 flex snap-x snap-mandatory gap-8 overflow-x-auto px-2 pb-6 pt-4 [scrollbar-width:none] md:mt-20">
              {items.map((item, i) => (
                <li key={item.src} className="w-[min(58vw,15rem)] shrink-0 snap-center">
                  <button type="button" onClick={() => setOpen(i)} aria-label={`Open photo: ${item.alt}`} className="block w-full">
                    <div className={cn("print relative", tilts[i % tilts.length])}>
                      <Tape color={tapes[i % tapes.length]} />
                      <Plate image={item} sizes="60vw" />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-12 flex justify-end">
              <ArrowLink href="/archive" className="text-ink">
                Enter the archive
              </ArrowLink>
            </div>
          </>
        )}
      </div>
      {open !== null && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={items[open].alt}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-wine/80 p-6 backdrop-blur-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={items[open].src}
            alt={items[open].alt}
            className="max-h-[80vh] max-w-full bg-ivory p-2 shadow-2xl md:p-3"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open + 1) % items.length);
            }}
          />
          <p className="max-w-xl text-center font-display text-lg italic text-ivory">{items[open].alt}</p>
          <div className="flex gap-8 text-ivory">
            <button type="button" className="label" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + items.length) % items.length); }}>← Previous</button>
            <span className="label">{open + 1} / {items.length}</span>
            <button type="button" className="label" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % items.length); }}>Next →</button>
            <button type="button" className="label" onClick={() => setOpen(null)}>Close ✕</button>
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}

function DeskObject({
  item,
  i,
  z,
  desk,
  tidy,
  onLift,
  onOpen,
}: {
  item: ImageAsset;
  i: number;
  z: number;
  desk: React.RefObject<HTMLDivElement | null>;
  tidy: number;
  onLift: () => void;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const spot = spotFor(i, item);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const dragged = useRef(false);

  useEffect(() => {
    if (!tidy) return;
    const opts = { type: "spring" as const, stiffness: 120, damping: 18 };
    animate(x, 0, opts);
    animate(y, 0, opts);
  }, [tidy, x, y]);

  return (
    <motion.div
      className="absolute"
      style={{ left: `${spot.left}%`, top: `${spot.top}%`, width: `${spot.w}%`, zIndex: z }}
      // Dropped onto the desk one after another as it scrolls into view.
      initial={reduce ? false : { opacity: 0, y: -70, rotate: spot.rot * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ type: "spring", stiffness: 90, damping: 14, delay: i * 0.06 }}
    >
      <Draggable x={x} y={y} rot={spot.rot} desk={desk} dragged={dragged} onLift={onLift}>
        <button
          type="button"
          draggable={false}
          aria-label={`Open photo: ${item.alt}`}
          onClick={() => {
            if (!dragged.current) onOpen();
          }}
          className="group block w-full"
        >
          <div className="print relative">
            <Tape color={tapes[i % tapes.length]} />
            <Plate image={item} zoom={false} sizes="15vw" />
          </div>
        </button>
      </Draggable>
    </motion.div>
  );
}

function Draggable({
  x,
  y,
  rot,
  desk,
  dragged,
  onLift,
  children,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rot: number;
  desk: React.RefObject<HTMLDivElement | null>;
  dragged: React.RefObject<boolean>;
  onLift: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      drag
      dragConstraints={desk}
      dragElastic={0.08}
      dragTransition={{ power: 0.25, timeConstant: 220 }}
      style={{ x, y, rotate: rot }}
      whileHover={{ scale: 1.03, rotate: rot * 0.5 }}
      whileDrag={{ scale: 1.08, rotate: 0, filter: "drop-shadow(0 18px 18px rgb(113 63 72 / 0.28))" }}
      onPointerDown={() => {
        dragged.current = false;
        onLift();
      }}
      onDragStart={() => {
        dragged.current = true;
      }}
      className="cursor-grab touch-none active:cursor-grabbing"
    >
      {children}
    </motion.div>
  );
}

/** A strip of washi tape holding the print down. */
function Tape({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="absolute -top-3 left-1/2 z-10 h-6 w-16 -translate-x-1/2 -rotate-3 opacity-70 mix-blend-multiply"
      style={{ background: `color-mix(in srgb, ${color} 70%, transparent)`, clipPath: "polygon(3% 0, 97% 6%, 100% 50%, 96% 100%, 2% 94%, 0 50%)" }}
    />
  );
}
