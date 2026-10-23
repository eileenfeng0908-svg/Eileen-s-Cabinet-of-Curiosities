"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sketchbook, type Artwork, type PlacedWork, type SketchbookPage } from "@/content/sketchbook";
import { Plate } from "@/components/editorial/Plate";
import { Bouquet } from "@/components/cabinet/Florals";
import { rng } from "@/components/cabinet/paint";
import { cn } from "@/lib/cn";

/**
 * The Artist's Sketchbook: a bound book that turns one leaf at a time.
 * Wide screens see a two-page spread; phones see one page. A turning leaf is
 * a two-sided card rotating about the spine (CSS 3D, no libraries), with a
 * soft shadow passing over it. Works on a page open in a dialog.
 */
type Leaf = { kind: "title" } | { kind: "end" } | { kind: "works"; page: SketchbookPage; n: number };

const leaves: Leaf[] = [{ kind: "title" }, ...sketchbook.map((page, i) => ({ kind: "works" as const, page, n: i + 1 }))];
if (leaves.length % 2) leaves.push({ kind: "end" });

/** An uneven, hand-torn edge on the three outer sides of a page. */
function deckle(seed: number, side: "left" | "right") {
  const r = rng(seed);
  const j = () => (r() * 0.7).toFixed(2);
  const pts: string[] = [];
  const n = 26;
  if (side === "right") {
    pts.push("0% 0%");
    for (let i = 1; i < n; i++) pts.push(`${((i / n) * 100).toFixed(1)}% ${j()}%`);
    for (let i = 0; i <= n; i++) pts.push(`${(100 - +j()).toFixed(2)}% ${((i / n) * 100).toFixed(1)}%`);
    for (let i = n - 1; i > 0; i--) pts.push(`${((i / n) * 100).toFixed(1)}% ${(100 - +j()).toFixed(2)}%`);
    pts.push("0% 100%");
  } else {
    pts.push("100% 0%", "100% 100%");
    for (let i = n - 1; i > 0; i--) pts.push(`${((i / n) * 100).toFixed(1)}% ${(100 - +j()).toFixed(2)}%`);
    for (let i = n; i >= 0; i--) pts.push(`${j()}% ${((i / n) * 100).toFixed(1)}%`);
    for (let i = 1; i < n; i++) pts.push(`${((i / n) * 100).toFixed(1)}% ${j()}%`);
  }
  return `polygon(${pts.join(",")})`;
}

/** How far the corner lifts when the pointer rests on a page edge (degrees). */
const PEEK = 18;

export function Sketchbook() {
  const [wide, setWide] = useState(true);
  const [pos, setPos] = useState(0); // spread index when wide, page index when narrow
  const [turn, setTurn] = useState<null | 1 | -1>(null);
  const [open, setOpen] = useState<Artwork | null>(null);
  const reduce = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const book = useRef<HTMLDivElement>(null);

  // The turning leaf's angle drives everything: its rotation, how far it lifts off the
  // page, and the light and shadow passing over it.
  const rot = useMotionValue(0);
  const lift = useTransform(rot, (r) => Math.sin((Math.abs(r) * Math.PI) / 180) * 14);
  const shade = useTransform(rot, (r) => Math.sin((Math.abs(r) * Math.PI) / 180) * 0.5);
  const cast = useTransform(rot, (r) => Math.sin((Math.abs(r) * Math.PI) / 180) * 0.35);
  const token = useRef(0);
  const settling = useRef(false);
  const drag = useRef<{ dir: 1 | -1; x0: number; moved: boolean; p: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 48rem)");
    const set = () => {
      setWide((was) => {
        if (was !== mq.matches) setPos((p) => (mq.matches ? Math.floor(p / 2) : p * 2));
        return mq.matches;
      });
    };
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const last = wide ? leaves.length / 2 - 1 : leaves.length - 1;
  const can = (dir: 1 | -1) => (dir === 1 ? pos < last : pos > 0);
  /** Angle of the leaf at rest (a) and once turned (b). */
  const range = useCallback((dir: 1 | -1): [number, number] => (wide || dir === 1 ? [0, dir === 1 ? -180 : 180] : [-180, 0]), [wide]);

  const begin = (dir: 1 | -1) => {
    if (!can(dir) || settling.current || (turn && turn !== dir)) return false;
    if (!turn) {
      setTurn(dir);
      rot.set(range(dir)[0]);
    }
    return true;
  };

  /** Let the leaf fall, either over (complete) or back to where it was. */
  const settle = (dir: 1 | -1, complete: boolean, velocity = 0) => {
    const [a, b] = range(dir);
    const t = ++token.current;
    settling.current = complete;
    animate(rot, complete ? b : a, reduce ? { duration: 0 } : { type: "spring", stiffness: 62, damping: 16, mass: 1.05, velocity, restDelta: 0.2 }).then(() => {
      if (t !== token.current) return;
      settling.current = false;
      if (complete) setPos((p) => p + dir);
      setTurn(null);
      rot.set(0);
    });
  };

  const go = (dir: 1 | -1) => {
    if (begin(dir)) settle(dir, true);
  };

  // A resting pointer on the edge lifts the corner a little, as a hand would.
  const peek = (dir: 1 | -1) => {
    if (drag.current || !begin(dir)) return;
    const [a, b] = range(dir);
    token.current++;
    animate(rot, a + (b - a) * (PEEK / 180), reduce ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 18 });
  };
  const unpeek = (dir: 1 | -1) => {
    if (drag.current || settling.current || turn !== dir) return;
    settle(dir, false);
  };

  // Dragging from the edge: the leaf follows the hand; let go past a third of the way and it turns.
  const progress = (dir: 1 | -1, x: number) => {
    const r = book.current!.getBoundingClientRect();
    const span = r.width;
    const p = dir === 1 ? (r.right - x) / span : (x - r.left) / span;
    return Math.min(1, Math.max(0, p * (wide ? 1 : 1.15)));
  };
  const onDown = (dir: 1 | -1) => (e: React.PointerEvent) => {
    if (!begin(dir)) return;
    token.current++;
    rot.stop();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { dir, x0: e.clientX, moved: false, p: 0 };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    if (Math.abs(e.clientX - d.x0) > 6) d.moved = true;
    if (!d.moved) return;
    d.p = progress(d.dir, e.clientX);
    const [a, b] = range(d.dir);
    rot.set(a + (b - a) * Math.max(d.p, PEEK / 180));
  };
  const onUp = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    const v = rot.getVelocity();
    const flung = d.dir === 1 ? v < -260 : v > 260;
    settle(d.dir, !d.moved || d.p > 0.33 || flung, v);
  };

  const at = (i: number) => leaves[i];
  const status = wide ? `Pages ${pos * 2 + 1}–${pos * 2 + 2} of ${leaves.length}` : `Page ${pos + 1} of ${leaves.length}`;

  // What lies beneath and what turns, for the current state.
  let below: { left?: number; right?: number };
  let leaf: { front: number; back?: number; side: "left" | "right" } | null = null;
  if (wide) {
    const L = pos * 2;
    if (turn === 1) {
      below = { left: L, right: L + 3 };
      leaf = { front: L + 1, back: L + 2, side: "right" };
    } else if (turn === -1) {
      below = { left: L - 2, right: L + 1 };
      leaf = { front: L, back: L - 1, side: "left" };
    } else below = { left: L, right: L + 1 };
  } else {
    if (turn === 1) {
      below = { right: pos + 1 };
      leaf = { front: pos, side: "right" };
    } else if (turn === -1) {
      below = { right: pos };
      leaf = { front: pos - 1, side: "right" };
    } else below = { right: pos };
  }

  const edge = (dir: 1 | -1) =>
    can(dir) && (
      <div
        aria-hidden
        className={cn("absolute inset-y-0 z-20 w-[9%] cursor-grab touch-pan-y active:cursor-grabbing", dir === 1 ? "right-0" : "left-0", !wide && "w-[14%]")}
        onPointerEnter={(e) => e.pointerType === "mouse" && peek(dir)}
        onPointerLeave={(e) => e.pointerType === "mouse" && unpeek(dir)}
        onPointerDown={onDown(dir)}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      />
    );

  return (
    <div
      className="mx-auto w-full max-w-[68rem]"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      {/* the book: board, pages and the turning leaf */}
      <div
        ref={book}
        className={cn("relative mx-auto select-none", wide ? "w-full" : "w-[min(100%,26rem)]")}
        style={{ aspectRatio: wide ? "1.46" : "0.73", perspective: "3400px" }}
      >
        {/* cloth-covered board, a little larger than the pages, with its elastic band */}
        <div aria-hidden className="absolute -inset-[1.6%] rounded-[3px] bg-wine shadow-[0_24px_40px_-24px_rgb(113_63_72_/_0.8)]">
          <div className="plate-tooth absolute inset-0 opacity-60" />
          <div className="absolute inset-y-0 right-[7%] w-[1.6%] bg-vermilion/90 shadow-[inset_0_0_0_1px_rgb(113_63_72_/_0.3)]" />
        </div>

        {wide && below.left !== undefined && <PageView leaf={at(below.left)} side="left" index={below.left} onOpen={setOpen} busy={!!turn} />}
        {below.right !== undefined && at(below.right) && <PageView leaf={at(below.right)} side="right" index={below.right} onOpen={setOpen} busy={!!turn} single={!wide} />}

        {/* the shadow the lifted leaf throws across the pages beneath */}
        {leaf && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[4]"
            style={{
              opacity: cast,
              background: wide
                ? "linear-gradient(to right, transparent 20%, rgb(113 63 72 / 0.45) 50%, transparent 80%)"
                : "linear-gradient(to right, rgb(113 63 72 / 0.5), transparent 60%)",
            }}
          />
        )}

        {leaf && (
          <motion.div
            className={cn("absolute top-0 h-full", wide ? "w-1/2" : "w-full", leaf.side === "right" && wide ? "left-1/2" : "left-0")}
            style={{ rotateY: rot, z: lift, transformStyle: "preserve-3d", transformOrigin: leaf.side === "right" ? "left center" : "right center", zIndex: 5 }}
          >
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
              <PageView leaf={at(leaf.front)} side={leaf.side} index={leaf.front} onOpen={setOpen} busy single={!wide} fill />
              {/* light falls off as the paper curves away from the spine */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  opacity: shade,
                  background:
                    leaf.side === "right"
                      ? "linear-gradient(to left, rgb(113 63 72 / 0.55), rgb(113 63 72 / 0.12) 40%, rgb(255 255 255 / 0.18) 70%, transparent)"
                      : "linear-gradient(to right, rgb(113 63 72 / 0.55), rgb(113 63 72 / 0.12) 40%, rgb(255 255 255 / 0.18) 70%, transparent)",
                }}
              />
            </div>
            {leaf.back !== undefined && (
              <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                <PageView leaf={at(leaf.back)} side={leaf.side === "right" ? "left" : "right"} index={leaf.back} onOpen={setOpen} busy fill />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    opacity: shade,
                    background:
                      leaf.side === "right"
                        ? "linear-gradient(to right, rgb(113 63 72 / 0.5), rgb(113 63 72 / 0.1) 40%, transparent)"
                        : "linear-gradient(to left, rgb(113 63 72 / 0.5), rgb(113 63 72 / 0.1) 40%, transparent)",
                  }}
                />
              </div>
            )}
          </motion.div>
        )}

        {/* the paper's edges: rest on one to lift the corner, tap or drag it to turn */}
        {edge(1)}
        {edge(-1)}
      </div>

      <div className="mt-10 flex items-center justify-between gap-4">
        <button type="button" onClick={() => go(-1)} disabled={pos <= 0} className="label link-draw text-wine disabled:opacity-35">
          ← Turn back
        </button>
        <p aria-live="polite" className="label text-center text-wine">
          {status}
          <span className="mt-1 block normal-case tracking-normal opacity-75">Drag or tap the edge of the paper</span>
        </p>
        <button type="button" onClick={() => go(1)} disabled={pos >= last} className="label link-draw text-wine disabled:opacity-35">
          Turn the page →
        </button>
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && setOpen(null)}
        aria-labelledby="artwork-title"
        className="curio-entry m-auto w-[min(60rem,calc(100%-2rem))] max-h-[calc(100svh-2rem)] overflow-auto bg-ivory p-0 text-wine"
      >
        {open && (
          <article className="grid gap-8 p-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:p-10">
            <div className="self-start">
              <div className={cn("mx-auto", open.image.aspect < 1 ? "max-w-[24rem]" : "")}>
                <Plate image={open.image} sizes="(min-width: 48rem) 34rem, 90vw" zoom={false} />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="label text-wine">From the sketchbook{open.placeholder ? " · placeholder" : ""}</p>
              <h3 id="artwork-title" className="mt-3 text-display-m">{open.title}</h3>
              <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-y border-wine/25 py-4 text-caption">
                <dt className="label pt-0.5">Medium</dt>
                <dd>{open.medium ?? "—"}</dd>
                <dt className="label pt-0.5">Year</dt>
                <dd>{open.year ?? "—"}</dd>
              </dl>
              {open.description && <p className="mt-6 text-body">{open.description}</p>}
              <button type="button" onClick={() => setOpen(null)} autoFocus className="label mt-auto self-end border border-wine/40 px-3 py-1.5 text-wine hover:border-vermilion hover:text-vermilion">
                Close
              </button>
            </div>
          </article>
        )}
      </dialog>
    </div>
  );
}

function PageView({ leaf, side, index, onOpen, busy, single, fill }: { leaf: Leaf; side: "left" | "right"; index: number; onOpen: (a: Artwork) => void; busy?: boolean; single?: boolean; /** Fill the turning leaf rather than one half of the book. */ fill?: boolean }) {
  const clip = useMemo(() => deckle(index * 7 + 3, side), [index, side]);
  return (
    <div
      className={cn("absolute top-0 h-full", single || fill ? "left-0 w-full" : side === "left" ? "left-0 w-1/2" : "left-1/2 w-1/2")}
      style={{ clipPath: clip }}
      inert={busy}
    >
      <div className="sketch-paper absolute inset-0" />
      {/* the gutter: paper curving into the spine */}
      {!single && (
        <div
          aria-hidden
          className="absolute inset-y-0 w-[9%]"
          style={{
            [side === "left" ? "right" : "left"]: 0,
            background: `linear-gradient(to ${side === "left" ? "left" : "right"}, rgb(113 63 72 / 0.28), rgb(113 63 72 / 0.06) 45%, transparent)`,
          }}
        />
      )}
      {single && <div aria-hidden className="absolute inset-y-0 left-0 w-[5%] bg-gradient-to-r from-wine/25 to-transparent" />}

      {leaf.kind === "title" && <TitlePage />}
      {leaf.kind === "end" && (
        <p className="absolute inset-x-[14%] top-1/2 -translate-y-1/2 text-center font-display text-lede italic text-wine/80">[More pages to come]</p>
      )}
      {leaf.kind === "works" && leaf.page.works.map((pw) => <PlacedArtwork key={pw.work.id} pw={pw} onOpen={onOpen} />)}

      {leaf.kind !== "title" && (
        <span className={cn("absolute bottom-[3.5%] font-display text-caption italic text-wine/70", side === "left" && !single ? "left-[7%]" : "right-[7%]")}>{index + 1}</span>
      )}
    </div>
  );
}

function TitlePage() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-[12%] text-center text-wine">
      <svg viewBox="0 0 120 120" className="w-[30%] overflow-visible" aria-hidden>
        <Bouquet kind="small" box={{ x: 20, y: 6, w: 80, h: 110 }} seed={211} w="c" />
      </svg>
      <p className="label mt-6">Art</p>
      <p className="mt-2 font-display text-[clamp(1.6rem,3.4vw,2.8rem)] leading-tight">The Artist’s Sketchbook</p>
      <p className="mt-3 font-display text-lede italic">Things I Create.</p>
      <p className="mt-8 text-caption text-wine/80">[The pages that follow hold placeholders until my artworks are added.]</p>
    </div>
  );
}

const tapeTints = ["rgb(197 101 88 / 0.55)", "rgb(145 174 181 / 0.6)", "rgb(101 123 83 / 0.5)", "rgb(177 138 72 / 0.55)"];

function PlacedArtwork({ pw, onOpen }: { pw: PlacedWork; onOpen: (a: Artwork) => void }) {
  const { work, at, fix = "tape" } = pw;
  const seed = [...work.id].reduce((a, c) => a + c.charCodeAt(0), 0);
  const tint = tapeTints[seed % tapeTints.length];
  return (
    <button
      type="button"
      onClick={() => onOpen(work)}
      aria-haspopup="dialog"
      aria-label={`${work.title}${work.placeholder ? " (placeholder)" : ""}`}
      className="sketch-work group absolute outline-none"
      style={{ left: `${at.x}%`, top: `${at.y}%`, width: `${at.w}%`, ["--rot" as string]: `${at.rot}deg` }}
    >
      <span className="block bg-[color-mix(in_srgb,var(--aged-ivory)_50%,white)] p-[4%] shadow-[0_6px_12px_-6px_rgb(113_63_72_/_0.45)]">
        <Plate image={work.image} sizes="(min-width: 64rem) 22rem, 40vw" zoom={false} showPlaceholderLabel={false} />
      </span>
      {fix === "tape" && (
        <span aria-hidden className="sketch-tape absolute -top-[6%] left-1/2 h-[12%] max-h-7 w-[38%] -translate-x-1/2 rotate-[-4deg]" style={{ background: tint }} />
      )}
      {fix === "corners" &&
        ["left-0 top-0 rotate-0", "right-0 top-0 rotate-90", "right-0 bottom-0 rotate-180", "left-0 bottom-0 -rotate-90"].map((c) => (
          <span key={c} aria-hidden className={cn("absolute h-[14%] max-h-6 w-[14%] max-w-6 bg-wine/85 [clip-path:polygon(0_0,100%_0,0_100%)]", c)} />
        ))}
      {fix === "clip" && (
        <svg aria-hidden viewBox="0 0 20 50" className="absolute -top-[8%] left-[14%] h-[22%] max-h-16 overflow-visible">
          <path d="M6 44V8a4 4 0 0 1 8 0v30a2 2 0 0 1-4 0V12" fill="none" stroke="var(--brass)" strokeWidth={2.2} strokeLinecap="round" />
        </svg>
      )}
      <span className="mt-[3%] block text-center font-display text-[clamp(0.7rem,1.05vw,0.95rem)] italic text-wine/85 transition-colors group-hover:text-vermilion">
        {work.title}
      </span>
      <span className="pointer-events-none absolute -inset-[3%] border-2 border-vermilion opacity-0 transition-opacity group-focus-visible:opacity-100" />
    </button>
  );
}
