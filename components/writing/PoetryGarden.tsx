"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { poems, type GardenFlower, type Poem } from "@/content/poems";
import { pencil, wash } from "@/components/cabinet/PaintDefs";
import { leaf, rng, tulipPetals, tulipVeins } from "@/components/cabinet/paint";
import { PaintedSheet } from "./Painted";
import { leavesOf, tall, vinePath, wide, type Layout } from "./gardenPlan";
import { cn } from "@/lib/cn";

const STILL_KEY = "ec-poetry-still";

/**
 * The Poetry Garden: vines that grow as you scroll, one flower for each poem,
 * and lines from the poems drifting between them. Hover a flower and it opens
 * to show its title; click a flower or a drifting line to read the poem.
 */
export function PoetryGarden() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [still, setStill] = useState(false);

  // Remember the visitor's choice; without one, follow their system setting.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STILL_KEY);
    } catch {}
    setStill(saved ? saved === "1" : window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  const toggleStill = () =>
    setStill((s) => {
      try {
        localStorage.setItem(STILL_KEY, s ? "0" : "1");
      } catch {}
      return !s;
    });

  // A poem can be linked to directly: /writing/poetry#poem-trust
  useEffect(() => {
    const i = poems.findIndex((p) => `#poem-${p.slug}` === window.location.hash);
    if (i >= 0) setOpen(i);
  }, []);
  const wasOpen = useRef(false);
  useEffect(() => {
    // Only touch the address when a poem opens or closes, never on first load.
    if (open === null && !wasOpen.current) return;
    wasOpen.current = open !== null;
    const url = window.location.pathname + window.location.search + (open === null ? "#poetry" : `#poem-${poems[open].slug}`);
    window.history.replaceState(null, "", url);
  }, [open]);

  // The garden leans gently away from the mouse; nearer things move more.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const onPointerMove = (e: React.PointerEvent) => {
    if (still || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  useEffect(() => {
    if (still) {
      mx.set(0);
      my.set(0);
    }
  }, [still, mx, my]);

  // Vines grow as the garden scrolls into view.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "center 0.5"] });
  const growing = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const full = useMotionValue(1);
  const grow = still ? full : growing;

  const scene = { grow, sx, sy, onOpen: setOpen };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
        <p className="font-display text-caption italic text-wine">
          Hover over a flower to see its name. Click a flower, or a drifting line, to read the poem.
        </p>
        <button type="button" onClick={toggleStill} aria-pressed={still} className="label link-draw text-wine">
          {still ? "Let the garden move" : "Still the garden"}
        </button>
      </div>

      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        data-still={still || undefined}
        className="poetry-garden relative mx-auto max-w-[1400px] overflow-hidden"
      >
        <Scene layout={wide} className="hidden md:block" {...scene} />
        <Scene layout={tall} className="md:hidden" {...scene} />
      </div>

      <PoemIndex onOpen={setOpen} />
      <PoemReader index={open} onChange={setOpen} />
    </div>
  );
}

type SceneProps = {
  layout: Layout;
  className: string;
  grow: MotionValue<number>;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  onOpen: (i: number) => void;
};

function Scene({ layout, className, grow, sx, sy, onOpen }: SceneProps) {
  const { W, H } = layout;
  const pct = (x: number, y: number): CSSProperties => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });
  const isWide = layout === wide;

  return (
    <div className={cn("relative", className)} style={{ aspectRatio: `${W} / ${H}` }}>
      <Vines layout={layout} grow={grow} sx={sx} sy={sy} />

      {layout.verses.map((at, i) => {
        // each place in the garden takes every nth line, and shows them in turn
        const mine = verses.filter((_, k) => k % layout.verses.length === i);
        return mine.length ? <Verse key={i} lines={mine} index={i} style={pct(...at)} sx={sx} sy={sy} wide={isWide} onOpen={onOpen} /> : null;
      })}

      {poems.map((p, i) => {
        const at = layout.flowers[i % layout.flowers.length];
        return (
          <FlowerButton
            key={p.slug}
            poem={p}
            index={i}
            style={{ ...pct(...at), width: isWide ? "7%" : "16%" }}
            labelBelow={at[1] < H * 0.25}
            onOpen={onOpen}
          />
        );
      })}
    </div>
  );
}

/* --- Vines ------------------------------------------------------------------ */

function Vines({ layout, grow, sx, sy }: { layout: Layout; grow: MotionValue<number>; sx: MotionValue<number>; sy: MotionValue<number> }) {
  // The vines sit furthest back, so they barely move.
  const x = useTransform(sx, (v) => v * -4);
  const y = useTransform(sy, (v) => v * -3);
  const leaves = useMemo(
    () =>
      layout.vines.map((v, vi) => {
        const r = rng(vi * 13 + 5);
        return leavesOf(v).map((l) => ({ ...l, d: leaf(layout.leaf * (0.75 + r() * 0.5), r) }));
      }),
    [layout],
  );

  return (
    <motion.svg aria-hidden viewBox={`0 0 ${layout.W} ${layout.H}`} className="absolute inset-0 h-full w-full overflow-visible" style={{ x, y }}>
      {layout.vines.map((v, vi) => (
        <g key={vi}>
          <motion.path d={vinePath(v)} fill="none" stroke="#657B53" strokeWidth={3.2} strokeLinecap="round" filter={pencil} style={{ pathLength: grow }} />
          {leaves[vi].map((l, li) => (
            <Leaf key={li} d={l.d} p={l.p} a={l.a} at={l.at} grow={grow} tone={li % 3} />
          ))}
        </g>
      ))}
    </motion.svg>
  );
}

const leafTones = ["#657B53", "#7f9468", "#657B53"];

function Leaf({ d, p, a, at, grow, tone }: { d: string; p: [number, number]; a: number; at: number; grow: MotionValue<number>; tone: number }) {
  const shown = useTransform(grow, [Math.max(0, at - 0.06), at + 0.01], [0, 1]);
  return (
    <motion.g style={{ opacity: shown }} transform={`translate(${p[0]} ${p[1]}) rotate(${a})`}>
      <path d={d} fill={leafTones[tone]} fillOpacity={0.82} filter={wash(tone === 1 ? "b" : "c")} />
    </motion.g>
  );
}

/* --- Drifting lines ------------------------------------------------------- */

/** Lines from every poem, taken in turn so neighbouring lines come from different poems. */
const verses = Array.from({ length: Math.max(...poems.map((p) => p.fragments.length)) }, (_, k) =>
  poems.flatMap((p, i) => (p.fragments[k] ? [{ poem: i, line: p.fragments[k] }] : [])),
).flat();

function Verse({ lines, index, style, sx, sy, wide, onOpen }: { lines: { poem: number; line: string }[]; index: number; style: CSSProperties; sx: MotionValue<number>; sy: MotionValue<number>; wide: boolean; onOpen: (i: number) => void }) {
  // Each line floats at its own depth: nearer lines are larger, darker and move more.
  const depth = [0.9, 0.55, 0.7, 1, 0.45, 0.65][index % 6];
  const x = useTransform(sx, (v) => v * depth * 22);
  const y = useTransform(sy, (v) => v * depth * 14);
  const [k, setK] = useState(0);
  const { poem: poemIndex, line } = lines[k % lines.length];
  const poem = poems[poemIndex];

  return (
    <motion.div className="absolute z-[2] -translate-x-1/2 -translate-y-1/2" style={{ ...style, x, y }}>
      <button
        type="button"
        onClick={() => onOpen(poemIndex)}
        // when a line has faded almost away, it returns as a line from another poem
        onAnimationIteration={(e) => e.animationName === "verse-breathe" && lines.length > 1 && setK((n) => n + 1)}
        aria-label={`Read “${poem.title}”`}
        className="verse-drift block cursor-pointer text-center font-display italic text-wine transition-colors duration-500 hover:text-vermilion focus-visible:text-vermilion"
        style={
          {
            "--drift": `${20 + index * 3.5}s`,
            "--breathe": `${13 + index * 2.3}s`,
            "--delay": `${-index * 2.7}s`,
            fontSize: wide ? `${0.95 + depth * 0.55}rem` : `${0.85 + depth * 0.2}rem`,
            opacity: 0.55 + depth * 0.45,
            maxWidth: wide ? "17em" : "9em",
          } as CSSProperties
        }
      >
        <span className="verse-breathe block">{line}</span>
      </button>
    </motion.div>
  );
}

/* --- Flowers -------------------------------------------------------------- */

const kindInk: Record<GardenFlower, string> = {
  tulip: "#C56558",
  blossom: "color-mix(in srgb, #C56558 55%, #F2E4C8)",
  bellflower: "#91AEB5",
  starflower: "#B18A48",
};
const tintInk: Record<NonNullable<Poem["tint"]>, string> = {
  vermilion: "#C56558",
  rose: "color-mix(in srgb, #C56558 55%, #F2E4C8)",
  blue: "#91AEB5",
  brass: "#B18A48",
  wine: "#713F48",
};
const inkOf = (p: Poem) => (p.tint ? tintInk[p.tint] : kindInk[p.flower]);

function FlowerButton({ poem, index, style, labelBelow, onOpen }: { poem: Poem; index: number; style: CSSProperties; labelBelow: boolean; onOpen: (i: number) => void }) {
  const ink = inkOf(poem);
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`${poem.title}: read the poem`}
      className="garden-flower group absolute z-[3] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{ ...style, "--ink": ink, "--sway": `${5 + (index % 3) * 1.3}s`, "--sway-delay": `${-index * 1.1}s` } as CSSProperties}
    >
      <span aria-hidden className="garden-bloom" />
      <span className="garden-sway block">
        <FlowerArt kind={poem.flower} seed={index * 7 + 2} ink={ink} />
      </span>
      <span
        className={cn(
          "garden-title pointer-events-none absolute left-1/2 w-max max-w-[12rem] -translate-x-1/2 font-display text-[0.95rem] italic leading-tight text-wine",
          labelBelow ? "top-full mt-1" : "bottom-full mb-1",
        )}
      >
        {poem.title}
      </span>
    </button>
  );
}

function FlowerArt({ kind, seed, ink }: { kind: GardenFlower; seed: number; ink: string }) {
  const r = rng(seed);
  const petal = (o: string, children: React.ReactNode, key?: number) => (
    <g key={key} className="garden-petal" style={{ "--o": o } as CSSProperties}>
      {children}
    </g>
  );

  if (kind === "tulip") {
    const [l, rt, c] = tulipPetals(40, r);
    const veins = tulipVeins(40, r);
    return (
      <svg viewBox="-50 -62 100 100" className="block w-full overflow-visible">
        <path d="M0 4C-2 14 2 24 0 36" stroke="#657B53" strokeWidth="3" fill="none" filter={pencil} />
        {petal("rotate(-16deg)", <path d={l} fill={ink} filter={wash("a")} />)}
        {petal("rotate(16deg)", <path d={rt} fill={ink} filter={wash("b")} />)}
        {petal("scale(1.04)", <path d={c} fill={ink} filter={wash("c")} />)}
        <g stroke="#713F48" strokeWidth="0.9" fill="none" opacity="0.55" filter={pencil}>
          {veins.map((v, i) => (
            <path key={i} d={v} />
          ))}
        </g>
      </svg>
    );
  }

  if (kind === "bellflower") {
    // A bell hanging from an arching stem; opening, its lip flares.
    return (
      <svg viewBox="-50 -50 100 100" className="block w-full overflow-visible">
        <path d="M-34 -44C-10 -52 12 -40 8 -18" stroke="#657B53" strokeWidth="3" fill="none" filter={pencil} />
        <path d="M-24 -46c6 -8 16 -8 20 -2" fill="#657B53" opacity="0.8" filter={wash("b")} />
        <g transform="translate(8 -16) scale(1.35)">
          <g className="garden-petal garden-bell" style={{ "--o": "scaleX(1.16) scaleY(1.05)" } as CSSProperties}>
            <path d="M-12 0C-16 10 -16 22 -22 30C-8 26 8 26 22 30C16 22 16 10 12 0C6 -6 -6 -6 -12 0Z" fill={ink} filter={wash("a")} />
            <path d="M-22 30c-4 4 -10 4 -12 2c6 -2 8 -4 12 -2zM22 30c4 4 10 4 12 2c-6 -2 -8 -4 -12 -2z" fill={ink} filter={wash("c")} />
            <path d="M-6 4C-8 14 -10 20 -12 26M6 4C8 14 10 20 12 26" stroke="#713F48" strokeWidth="0.8" fill="none" opacity="0.5" filter={pencil} />
          </g>
          <path d="M0 24v10" stroke="#B18A48" strokeWidth="1.6" />
        </g>
      </svg>
    );
  }

  // Blossom (five round petals) and starflower (six pointed ones) open from the centre.
  const n = kind === "blossom" ? 5 : 6;
  const d =
    kind === "blossom"
      ? "M0 -4C-14 -10 -16 -30 0 -36C16 -30 14 -10 0 -4Z"
      : "M0 -4C-6 -14 -6 -26 0 -40C6 -26 6 -14 0 -4Z";
  return (
    <svg viewBox="-50 -50 100 100" className="block w-full overflow-visible">
      {Array.from({ length: n }, (_, i) => {
        const a = (360 / n) * i + (r() - 0.5) * 10;
        return petal(
          "rotate(8deg) scale(1.12)",
          <path d={d} fill={ink} transform={`rotate(${a})`} filter={wash((["a", "b", "c"] as const)[i % 3])} />,
          i,
        );
      })}
      <circle r={kind === "blossom" ? 7 : 5} fill={kind === "blossom" ? "#B18A48" : "#713F48"} filter={wash("c")} />
      <circle r="2" cx="-1" cy="-1" fill="#F2E4C8" opacity="0.7" />
    </svg>
  );
}

/* --- Index and reader ----------------------------------------------------- */

function PoemIndex({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section aria-labelledby="poem-index" className="mt-16 md:mt-20">
      <div className="mx-auto max-w-2xl border-t border-wine/25 pt-6">
        <h2 id="poem-index" className="label text-center text-wine">Index of poems</h2>
        <ol className="mt-6 columns-1 gap-10 sm:columns-2">
          {poems.map((p, i) => (
            <li key={p.slug} className="break-inside-avoid">
              <button type="button" onClick={() => onOpen(i)} className="group flex w-full items-baseline gap-3 py-2 text-left text-wine">
                <span aria-hidden className="h-2 w-2 shrink-0 translate-y-[-0.1em] rounded-full" style={{ background: inkOf(p) }} />
                <span className="font-display text-[1.15rem] italic transition-colors duration-500 group-hover:text-vermilion">{p.title}</span>
                {p.date && <span className="label ml-auto text-ink-soft">{p.date}</span>}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PoemReader({ index, onChange }: { index: number | null; onChange: (i: number | null) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const poem = index === null ? null : poems[index];
  const go = (dir: 1 | -1) => index !== null && onChange((index + dir + poems.length) % poems.length);

  return (
    <dialog
      ref={dialog}
      onClose={() => onChange(null)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      aria-labelledby="poem-title"
      className="curio-entry poem-reader poetry-garden m-0 h-[100svh] max-h-none w-full max-w-none overflow-auto bg-ivory p-0 text-wine"
    >
      {poem && (
        <div className="flex min-h-full flex-col">
          <div className="frame flex items-center justify-between py-5">
            <button type="button" onClick={() => onChange(null)} autoFocus className="label link-draw text-wine">
              ← Return to the garden
            </button>
            <span className="label text-ink-soft">
              {index! + 1} / {poems.length}
            </span>
          </div>

          <article key={poem.slug} className="poem-page frame flex-1 pb-16 pt-6 md:pt-14">
            <div className="relative mx-auto w-full max-w-[40rem] px-5 pb-14 pt-12 sm:px-8 md:px-16">
              <PaintedSheet seed={poem.slug.length * 7} bloom={inkOf(poem)} h={1500} />
              <header className="relative text-center">
                <span aria-hidden className="mx-auto block w-14">
                  <FlowerArt kind={poem.flower} seed={index! * 7 + 2} ink={inkOf(poem)} />
                </span>
                <h2 id="poem-title" className="mt-5 text-display-m">{poem.title}</h2>
                {poem.date && <p className="label mt-3 text-ink-soft">{poem.date}</p>}
              </header>
              <PoemText text={poem.text} />
            </div>
          </article>

          <nav aria-label="More poems" className="frame flex items-center justify-between border-t border-wine/20 py-5">
            <button type="button" onClick={() => go(-1)} className="label link-draw text-wine">
              ← {poems[(index! - 1 + poems.length) % poems.length].title}
            </button>
            <button type="button" onClick={() => go(1)} className="label link-draw text-right text-wine">
              {poems[(index! + 1) % poems.length].title} →
            </button>
          </nav>
        </div>
      )}
    </dialog>
  );
}

/**
 * A poem as written: an empty line is a stanza break; a poem written with an
 * empty line after every line is set with a little air between lines instead.
 * Long lines wrap with a hanging indent so the poem's own breaks stay clear;
 * prose paragraphs simply wrap.
 */
function PoemText({ text }: { text: string }) {
  const stanzas = text.split(/\n\s*\n/).map((st) => st.split("\n"));
  const airy = stanzas.length > 3 && stanzas.every((st) => st.length === 1);
  return (
    <div className={cn("relative mx-auto mt-10 w-fit max-w-[34rem] font-display text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.85]", airy ? "space-y-[0.55em]" : "space-y-[1.5em]")}>
      {stanzas.map((lines, i) => (
        <p key={i}>
          {lines.map((line, k) =>
            line.length > 140 ? (
              <span key={k} className="block text-justify hyphens-auto">
                {line}
              </span>
            ) : (
              <span key={k} className="block pl-[1.4em] -indent-[1.4em]">
                {line}
              </span>
            ),
          )}
        </p>
      ))}
    </div>
  );
}
