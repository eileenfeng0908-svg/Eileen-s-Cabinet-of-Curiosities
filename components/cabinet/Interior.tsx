"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { CabinetItem as Collection } from "@/content/collections";
import { Bouquet } from "./Florals";
import { Camera, Envelope, FilmReel, FramedPainting, Notebook, Ribbon } from "./Objects";
import { handLine, handRect, notchedPanel, rng } from "./paint";
import { pencil, wash } from "./PaintDefs";
import { OPENING } from "./Carcass";

const W = OPENING.w; // 472
const H = OPENING.h; // 678
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

const objects = {
  reel: FilmReel,
  painting: FramedPainting,
  notebook: Notebook,
  camera: Camera,
  ribbon: Ribbon,
  envelope: Envelope,
};

/** Shelf cells in interior units; the last two collections are drawers. */
const cells = [
  { x: 0, y: 62, w: 230, h: 200 },
  { x: 242, y: 62, w: 230, h: 200 },
  { x: 0, y: 274, w: 230, h: 200 },
  { x: 242, y: 274, w: 230, h: 200 },
];
const drawers = [
  { x: 10, y: 498, w: 218, h: 168 },
  { x: 244, y: 498, w: 218, h: 168 },
];

export type OpenCollection = (c: Collection, el: HTMLElement) => void;

function Shelves() {
  const r = rng(77);
  const boards = [50, 262, 474];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
      <g filter={wash("b")}>
        <path d={handRect(0, 0, W, H, r, 1)} fill="var(--wine)" />
      </g>
      {/* depth: hatching in the corners of the carcass */}
      <path d={handRect(0, 0, 26, H, r, 1)} fill="url(#ec-hatch)" opacity={0.35} filter={pencil} />
      <path d={handRect(W - 18, 0, 18, H, r, 1)} fill="url(#ec-hatch-fine)" opacity={0.3} filter={pencil} />
      <g filter={wash("a")}>
        {boards.map((y) => (
          <path key={y} d={handRect(0, y, W, 12, r, 0.8)} fill="var(--walnut)" />
        ))}
        <path d={handRect(230, 62, 12, 412, r, 0.8)} fill="var(--walnut)" />
        <path d={handRect(0, 486, W, H - 486, r, 0.8)} fill="var(--walnut)" fillOpacity={0.55} />
        <path d={handRect(150, 12, 172, 28, r, 1)} fill="var(--aged-ivory)" />
      </g>
      <g filter={pencil} fill="none" stroke="var(--wine)" strokeWidth={1} opacity={0.7}>
        {boards.map((y) => (
          <path key={y} d={handLine([[2, y + 12], [W - 2, y + 12]], r, 0.6)} />
        ))}
        <path d={handRect(150, 12, 172, 28, r, 1)} />
      </g>
      {/* a shadow cast by each shelf onto the wall below it */}
      {boards.slice(0, 2).map((y) => (
        <path key={y} d={handRect(0, y + 12, W, 10, r, 0.6)} fill="url(#ec-hatch)" opacity={0.3} filter={pencil} />
      ))}
    </svg>
  );
}

function ShelfCell({ c, cell, onOpen, i }: { c: Collection; cell: (typeof cells)[number]; onOpen: OpenCollection; i: number }) {
  const Obj = objects[c.object];
  return (
    <a
      href={`/collections/${c.slug}`}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onOpen(c, e.currentTarget);
      }}
      className="cabinet-cell group absolute flex flex-col items-center justify-end outline-none"
      style={{ left: pct(cell.x, W), top: pct(cell.y, H), width: pct(cell.w, W), height: pct(cell.h, H) }}
    >
      <Obj className="cabinet-object relative mb-[5%] w-[72%] transition-transform duration-700 ease-gallery group-hover:-translate-y-[3%] group-hover:-rotate-[1.5deg] group-focus-visible:-translate-y-[3%]" />
      <span
        className="cabinet-tag mb-[4%] border border-wine/40 bg-ivory px-[0.6em] py-[0.15em] font-display italic leading-tight text-wine transition-colors duration-500 group-hover:bg-ivory-pale group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-vermilion"
        style={{ fontSize: "max(11px, 2.5cqw)", transform: `rotate(${i % 2 ? 1.2 : -1.4}deg)` }}
      >
        {c.title}
      </span>
    </a>
  );
}

function DrawerFront({ seed, title }: { seed: number; title: string }) {
  const r = rng(seed);
  return (
    <svg viewBox="0 0 218 168" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
      <g filter={wash(seed % 2 ? "a" : "b")}>
        <path d={handRect(2, 2, 214, 164, r, 1.2)} fill="var(--powder-blue)" />
        <path d={notchedPanel(18, 14, 182, 118, 12, r)} fill="var(--vermilion)" fillOpacity={0.9} />
        <path d={notchedPanel(24, 20, 170, 106, 10, r)} fill="var(--aged-ivory)" />
      </g>
      <Bouquet kind="small" box={{ x: 44, y: 22, w: 130, h: 64 }} seed={seed} w="c" />
      <g filter={wash("c")}>
        <circle cx={109} cy={148} r={7} fill="var(--brass)" />
        <circle cx={107} cy={145.6} r={2.4} fill="var(--aged-ivory)" fillOpacity={0.7} />
      </g>
      <g filter={pencil} fill="none" stroke="var(--wine)" strokeWidth={1} opacity={0.7}>
        <path d={handRect(2, 2, 214, 164, r, 1.2)} />
        <circle cx={109} cy={148} r={7} />
        <path d={handLine([[200, 22], [200, 132], [26, 132]], r, 0.5)} strokeWidth={1.4} opacity={0.6} />
      </g>
      <title>{title}</title>
    </svg>
  );
}

function Drawer({ c, box, onOpen, i }: { c: Collection; box: (typeof drawers)[number]; onOpen: OpenCollection; i: number }) {
  const [out, setOut] = useState(false);
  const still = useReducedMotion();
  const Obj = objects[c.object];
  const t = { duration: still ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] as const };
  const id = `drawer-${c.slug}`;

  return (
    <div className="absolute" style={{ left: pct(box.x, W), top: pct(box.y, H), width: pct(box.w, W), height: pct(box.h, H), zIndex: out ? 5 : 1 }}>
      {/* the drawer box, seen from above as it slides toward you */}
      <motion.div
        id={id}
        initial={false}
        animate={{ scaleY: out ? 1 : 0, opacity: out ? 1 : 0 }}
        transition={t}
        style={{ transformOrigin: "50% 100%", bottom: "84%", height: "96%" }}
        className="absolute inset-x-[1%] overflow-hidden"
        inert={!out}
      >
        <svg viewBox="0 0 218 160" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <g filter={wash("a")}>
            <path d="M0 160L10 0H208L218 160Z" fill="var(--walnut)" />
            <path d="M14 152L22 10H196L204 152Z" fill="var(--aged-ivory)" />
          </g>
          <path d="M22 10H196L194 34H24Z" fill="url(#ec-hatch)" opacity={0.3} filter={pencil} />
          <path d="M0 160L10 0H208L218 160Z M14 152L22 10H196L204 152Z" fill="none" stroke="var(--wine)" strokeWidth={1} opacity={0.6} filter={pencil} />
        </svg>
        <div className="relative flex h-full flex-col items-center justify-between px-[10%] pb-[6%] pt-[4%]">
          <Obj className="w-[52%]" />
          <a
            href={`/collections/${c.slug}`}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
              e.preventDefault();
              onOpen(c, e.currentTarget.closest(".absolute") as HTMLElement);
            }}
            className="cabinet-tag whitespace-nowrap border border-wine/50 bg-ivory px-[0.7em] py-[0.2em] font-display italic text-wine underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermilion"
            style={{ fontSize: "max(11px, 2.4cqw)" }}
          >
            Open {c.title} →
          </a>
        </div>
      </motion.div>

      {/* the painted front */}
      <motion.button
        type="button"
        aria-expanded={out}
        aria-controls={id}
        aria-label={`${out ? "Close" : "Pull out"} the ${c.title} drawer`}
        onClick={() => setOut((v) => !v)}
        initial={false}
        animate={{ y: out ? "16%" : "0%", scale: out ? 1.05 : 1 }}
        transition={t}
        className="group absolute inset-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermilion"
        style={{ filter: out ? "drop-shadow(0 6px 6px rgb(113 63 72 / 0.45))" : undefined }}
      >
        <span className="absolute inset-0 transition-transform duration-500 ease-gallery group-hover:translate-y-[2%]">
          <DrawerFront seed={300 + i * 17} title={c.title} />
        </span>
        <span
          className="absolute inset-x-0 top-[55%] text-center font-display italic text-wine"
          style={{ fontSize: "max(10px, 2.2cqw)" }}
          aria-hidden
        >
          {c.title}
        </span>
      </motion.button>
    </div>
  );
}

export function Interior({ items, onOpen, open }: { items: Collection[]; onOpen: OpenCollection; open: boolean }) {
  const shelf = items.slice(0, 4);
  const drawn = items.slice(4, 6);
  return (
    <div
      id="cabinet-interior"
      className="absolute"
      style={{ left: pct(OPENING.x, 600), top: pct(OPENING.y, 900), width: pct(OPENING.w, 600), height: pct(OPENING.h, 900) }}
      inert={!open}
      aria-label="Inside the cabinet"
      role="group"
    >
      <Shelves />
      <p
        className="absolute left-[31.8%] top-[1.8%] flex h-[4.1%] w-[36.4%] items-center justify-center whitespace-nowrap font-sans uppercase tracking-[0.1em] text-wine"
        style={{ fontSize: "max(5.5px, 1.25cqw)" }}
      >
        Cabinet of Curiosities
      </p>
      {shelf.map((c, i) => (
        <ShelfCell key={c.slug} c={c} cell={cells[i]} onOpen={onOpen} i={i} />
      ))}
      {drawn.map((c, i) => (
        <Drawer key={c.slug} c={c} box={drawers[i]} onOpen={onOpen} i={i} />
      ))}
    </div>
  );
}
