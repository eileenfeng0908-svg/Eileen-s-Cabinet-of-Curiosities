"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, type MotionValue } from "motion/react";
import { featuredArchive } from "@/content/archive";
import { Plate } from "@/components/editorial/Plate";
import { Rosette } from "@/components/editorial/Ornaments";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { PaintedSheet } from "@/components/writing/Painted";
import { catalogueNumber } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { ArchiveItem } from "@/lib/types";

/**
 * Objects scattered across a painted desk blotter. With a mouse you can pick
 * them up and move them around (a click still opens the object), and "Tidy
 * up" puts everything back. On touch screens they sit as a loose, tilted row.
 */

// Where each object lands on the desk: left/top and width as % of the desk.
const spots = [
  { left: 4, top: 10, w: 23, rot: -6 },
  { left: 31, top: 38, w: 14, rot: 5 },
  { left: 49, top: 6, w: 16, rot: -3 },
  { left: 72, top: 30, w: 16, rot: 7 },
  { left: 15, top: 50, w: 12, rot: -9 },
];
const tapes = ["var(--vermilion)", "var(--brass)", "var(--powder-blue)", "var(--botanical-green)", "var(--vermilion)"];
const tilts = ["-rotate-[2deg]", "rotate-[1.5deg]", "-rotate-[1deg]", "rotate-[2.2deg]", "-rotate-[1.6deg]"];

export function FeaturedArchive() {
  const items = featuredArchive().slice(0, spots.length);
  const desk = useRef<HTMLDivElement>(null);
  const [fine, setFine] = useState(false);
  const [tidy, setTidy] = useState(0);
  const [moved, setMoved] = useState(false);
  const [order, setOrder] = useState(items.map((it) => it.slug));

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
              Postcards, letters, sketchbook pages, photographs and fragments of ordinary days: each object
              catalogued, each with a story.
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
                  key={item.slug}
                  item={item}
                  i={i}
                  z={order.indexOf(item.slug) + 1}
                  desk={desk}
                  tidy={tidy}
                  onLift={() => lift(item.slug)}
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
                <li key={item.slug} className="w-[min(58vw,15rem)] shrink-0 snap-center">
                  <Link href={`/archive/${item.slug}`} aria-label={`${catalogueNumber(item.number)}, ${item.title}`} className="block">
                    <div className={cn("print relative", tilts[i % tilts.length])}>
                      <Tape color={tapes[i % tapes.length]} />
                      <Plate image={item.image} showPlaceholderLabel={false} sizes="60vw" />
                    </div>
                    <Tag item={item} className="mt-4" />
                  </Link>
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
}: {
  item: ArchiveItem;
  i: number;
  z: number;
  desk: React.RefObject<HTMLDivElement | null>;
  tidy: number;
  onLift: () => void;
}) {
  const reduce = useReducedMotion();
  const spot = spots[i % spots.length];
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
      transition={{ type: "spring", stiffness: 90, damping: 14, delay: i * 0.12 }}
    >
      <Draggable x={x} y={y} rot={spot.rot} desk={desk} dragged={dragged} onLift={onLift}>
        <Link
          href={`/archive/${item.slug}`}
          draggable={false}
          aria-label={`${catalogueNumber(item.number)}, ${item.title}`}
          onClick={(e) => {
            if (dragged.current) e.preventDefault();
          }}
          className="group block"
        >
          <div className="print relative">
            <Tape color={tapes[i % tapes.length]} />
            <Plate image={item.image} showPlaceholderLabel={false} zoom={false} sizes="25vw" />
            <Tag
              item={item}
              className="absolute bottom-3 left-3 translate-y-2 opacity-0 transition-all duration-500 ease-gallery group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            />
          </div>
        </Link>
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

/** The museum tag: catalogue number, kind of object, date. */
function Tag({ item, className }: { item: ArchiveItem; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("border border-blue bg-ivory px-3 py-2.5 text-ink outline outline-1 outline-offset-2 outline-vermilion/15", className)}
    >
      <span className="label block text-wine">{catalogueNumber(item.number)}</span>
      <span className="label block">{item.category === "Postcard" ? "Postcard Collection" : item.category}</span>
      <span className="label block text-ink-soft">{item.date ?? "Date unknown"}</span>
    </div>
  );
}
