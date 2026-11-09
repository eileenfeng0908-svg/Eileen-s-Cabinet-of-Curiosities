"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { animate, motion, useMotionValue, useReducedMotion, type MotionValue } from "motion/react";
import { curiosities } from "@/content/curiosities";
import { Plate } from "@/components/editorial/Plate";
import { Rosette, Star } from "@/components/editorial/Ornaments";
import { Doily, LaceHeart } from "@/components/editorial/Doily";
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

// A hand-placed collage on a 16:10 desk (left/top/width in % of the desk),
// laid out so nothing overlaps. Each photo is fixed down its own way:
// postcards sit bare with photo corners, snapshots are polaroids, the rest
// are taped or pinned prints.
type Fix = "bare" | "polaroid" | "tape" | "pin";
const spots: { left: number; top: number; w: number; rot: number; fix: Fix }[] = [
  { left: 3, top: 6, w: 13, rot: -5, fix: "bare" }, // valentines, on a doily
  { left: 19, top: 4, w: 15, rot: 3, fix: "bare" },
  { left: 37, top: 3, w: 10, rot: -2, fix: "bare" },
  { left: 19, top: 25, w: 15, rot: -4, fix: "bare" },
  { left: 37, top: 33, w: 14, rot: 5, fix: "bare" },
  { left: 52, top: 5, w: 15, rot: -3, fix: "tape" },
  { left: 70, top: 3, w: 10, rot: 4, fix: "polaroid" },
  { left: 84, top: 6, w: 10, rot: -6, fix: "polaroid" },
  { left: 3, top: 42, w: 11.5, rot: 4, fix: "polaroid" },
  { left: 17, top: 46, w: 15, rot: -2, fix: "tape" },
  { left: 54, top: 29, w: 11, rot: -5, fix: "polaroid" },
  { left: 68, top: 31, w: 15, rot: 2, fix: "pin" },
  { left: 86, top: 33, w: 10, rot: 6, fix: "polaroid" },
  { left: 35, top: 53, w: 15, rot: -3, fix: "tape" },
  { left: 17, top: 64, w: 10, rot: 5, fix: "polaroid" },
  { left: 53, top: 58, w: 13, rot: 3, fix: "pin" },
  { left: 69, top: 56, w: 13, rot: -4, fix: "tape" },
  { left: 84, top: 60, w: 12.5, rot: 3, fix: "tape" },
];
function spotFor(i: number) {
  return spots[i % spots.length];
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
            <div ref={desk} className="relative aspect-[16/10] w-full">
              <PaintedSheet seed={61} bloom="var(--powder-blue)" notched h={620} />
              <DeskDoodles />
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
              <span aria-hidden className="font-display text-lg italic text-ink-soft">
                Pick things up, move them around. A click opens one.
              </span>
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
  const spot = spotFor(i);
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
          <Mount fix={spot.fix} color={tapes[i % tapes.length]}>
            <Plate image={item} zoom={false} sizes="15vw" />
          </Mount>
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

/** How a photo is fixed to the desk. */
function Mount({ fix, color, children }: { fix: Fix; color: string; children: React.ReactNode }) {
  if (fix === "bare") {
    return (
      <div className="relative shadow-[0_2px_3px_rgb(113_63_72/0.12),0_14px_24px_-14px_rgb(113_63_72/0.5)]">
        {children}
        {(["left-0 top-0", "right-0 top-0 rotate-90", "right-0 bottom-0 rotate-180", "left-0 bottom-0 -rotate-90"] as const).map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={cn("absolute h-[18%] max-h-6 w-[18%] max-w-6 -m-[3px]", pos)}
            style={{ background: "var(--color-wine)", opacity: 0.85, clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          />
        ))}
      </div>
    );
  }
  if (fix === "polaroid") {
    return (
      <div className="relative bg-ivory-pale p-[6%] pb-[22%] shadow-[0_1px_1px_rgb(113_63_72/0.07),0_12px_22px_-14px_rgb(113_63_72/0.45)]">
        <Tape color={color} />
        {children}
      </div>
    );
  }
  return (
    <div className="print relative">
      {fix === "pin" ? (
        <span
          aria-hidden
          className="absolute left-1/2 top-1 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full shadow-[1px_3px_3px_rgb(0_0_0/0.3)]"
          style={{ background: "radial-gradient(circle at 35% 35%, #e9cf96, var(--color-brass) 55%, #7d5f2c)" }}
        />
      ) : (
        <Tape color={color} />
      )}
      {children}
    </div>
  );
}

/** Ink doodles, a doily and a pressed sprig in the gaps between the photos. */
function DeskDoodles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Doily className="absolute left-[0.5%] top-[2%] w-[19%] text-blue opacity-60" />
      <Star className="absolute left-[48.5%] top-[4%] h-4 w-4 rotate-12 text-vermilion" />
      <Star className="absolute left-[96%] top-[30%] h-3 w-3 text-brass" />
      <Star className="absolute left-[29%] top-[89%] h-5 w-5 -rotate-12 text-brass" />
      <LaceHeart className="absolute left-[33.5%] top-[41%] h-7 w-7 -rotate-12 text-vermilion" />
      <LaceHeart className="absolute left-[67%] top-[25.5%] h-5 w-5 rotate-12 text-wine" />
      <Rosette className="absolute left-[50%] top-[26%] h-4 w-4 text-green" />
      {/* a dashed flight path, like the valentine aeroplane's */}
      <svg viewBox="0 0 200 80" className="absolute left-[3%] top-[34%] w-[13%] overflow-visible text-wine/60" fill="none">
        <path d="M4 60 C 40 10, 90 70, 120 30 S 180 20, 196 6" stroke="currentColor" strokeWidth="1.6" strokeDasharray="5 6" strokeLinecap="round" />
        <path d="M186 4 L197 5 L192 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* a hand-drawn loop with a little flower at the end */}
      <svg viewBox="0 0 300 90" className="absolute left-[34%] top-[80%] w-[24%] overflow-visible" fill="none">
        <path d="M4 50 C 50 10, 80 80, 120 45 C 150 20, 170 70, 140 70 C 115 70, 140 20, 190 40 S 260 55, 286 30" stroke="var(--color-green)" strokeWidth="1.4" strokeLinecap="round" />
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="290" cy="18" rx="4" ry="9" fill="var(--color-vermilion)" fillOpacity="0.75" transform={`rotate(${r} 290 27)`} />
        ))}
        <circle cx="290" cy="27" r="3" fill="var(--color-brass)" />
      </svg>
      <p className="absolute left-[64%] top-[84%] -rotate-3 font-display text-[clamp(1.1rem,2vw,1.8rem)] italic text-wine/80">
        little things, kept
      </p>
    </div>
  );
}
