"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { featuredProjects } from "@/content/projects";
import { Plate } from "@/components/editorial/Plate";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { Star } from "@/components/editorial/Ornaments";
import { PaintedSheet, WashBlot } from "@/components/writing/Painted";
import { handLine, rng } from "@/components/cabinet/paint";
import { pencil } from "@/components/cabinet/PaintDefs";
import { roman } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/types";

/**
 * Selected Works as a painted filmstrip that scrolls from left to right on its
 * own: each work is a slide of watercolour paper that tilts toward the cursor,
 * and a pencil line underneath fills with vermilion as you go along.
 */

const blooms = ["var(--vermilion)", "var(--powder-blue)", "var(--botanical-green)", "var(--brass)"];
const rests = [-1.6, 1.2, -0.8, 1.8];
const lifts = ["md:-translate-y-6", "md:translate-y-8", "md:-translate-y-2", "md:translate-y-5"];

export function SelectedWorks() {
  const works = featuredProjects().slice(0, 4);
  const track = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [ends, setEnds] = useState({ start: true, end: false });

  // The strip scrolls sideways on its own (trackpad, shift + wheel, drag, swipe or the arrows);
  // scrolling the page up and down leaves it alone.
  const { scrollXProgress } = useScroll({ container: track });
  const progress = useSpring(scrollXProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  useLayoutEffect(() => {
    const t = track.current;
    if (!t) return;
    const update = () => setEnds({ start: t.scrollLeft < 8, end: t.scrollLeft > t.scrollWidth - t.clientWidth - 8 });
    update();
    t.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      t.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // With a mouse, the strip can be grabbed and dragged along.
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const down = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft, moved: false };
  };
  const move = (e: React.PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5 && !d.moved) {
      d.moved = true;
      e.currentTarget.style.scrollSnapType = "none";
    }
    if (d.moved) e.currentTarget.scrollLeft = d.left - dx;
  };
  const up = (e: React.PointerEvent<HTMLUListElement>) => {
    e.currentTarget.style.scrollSnapType = "";
    setTimeout(() => (drag.current = null), 0);
  };
  const click = (e: React.MouseEvent) => {
    if (drag.current?.moved) e.preventDefault();
  };

  const step = (dir: 1 | -1) => {
    const t = track.current;
    if (t) t.scrollBy({ left: dir * Math.min(t.clientWidth * 0.7, 560), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="selected-works" aria-labelledby="selected-works-title" className="section-space relative scroll-mt-16">
      <ul
        ref={track}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        onClickCapture={click}
        onDragStart={(e) => e.preventDefault()}
        className="flex snap-x snap-mandatory items-center gap-6 overflow-x-auto overscroll-x-contain scroll-px-[max(1.25rem,5vw)] px-[max(1.25rem,5vw)] pb-14 pt-28 [scrollbar-width:none] md:cursor-grab md:gap-16 md:active:cursor-grabbing"
      >
        <li className="w-[72vw] shrink-0 snap-start md:w-[28rem]">
          <Intro />
        </li>
        {works.map((p, i) => (
          <li key={p.slug} className={cn("shrink-0 snap-center", lifts[i % lifts.length])}>
            <WorkSlide project={p} i={i} progress={progress} still={!!reduce} />
          </li>
        ))}
        <li className="shrink-0 snap-center pr-[max(1.25rem,5vw)]">
          <Finale />
        </li>
      </ul>

      <div className="mx-[max(1.25rem,5vw)] mt-2 flex items-center gap-6">
        <Thread progress={progress} />
        <div className="hidden shrink-0 gap-3 md:flex">
          <StepButton label="Previous works" disabled={ends.start} onClick={() => step(-1)}>←</StepButton>
          <StepButton label="More works" disabled={ends.end} onClick={() => step(1)}>→</StepButton>
        </div>
      </div>
    </section>
  );
}

function StepButton({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-wine/40 font-display text-xl text-wine transition-all duration-500 ease-gallery hover:border-vermilion hover:bg-vermilion hover:text-ivory disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function Intro() {
  return (
    <div>
      <div className="flex items-center gap-4 text-wine">
        <span className="label">II</span>
        <span aria-hidden className="h-px w-10 bg-brass/50" />
        <Star className="h-3 w-3 text-brass" />
        <span className="label">Selected Works</span>
      </div>
      <h2 id="selected-works-title" className="mt-8 text-display-l text-wine">
        Things made, <em className="block">looked at, and arranged</em>
      </h2>
      <div className="mt-10 flex items-center gap-5">
        <ScrollCue />
        <span className="font-display text-lg italic text-ink-soft">
          <span className="hidden md:inline">scroll sideways, or drag</span>
          <span className="md:hidden">swipe along</span>
        </span>
      </div>
      <ArrowLink href="/work" className="mt-10 text-ink">
        All projects
      </ArrowLink>
    </div>
  );
}

/** A pencilled arrow that keeps redrawing itself, pointing along the strip. */
function ScrollCue() {
  const reduce = useReducedMotion();
  const r = rng(12);
  const shaft = handLine([[4, 22], [40, 18], [76, 24], [108, 20]], r, 1.2);
  const head = "M94 9 L110 20 L95 32";
  const draw = reduce
    ? {}
    : {
        initial: { pathLength: 0 },
        whileInView: { pathLength: 1 },
        viewport: { once: true },
        transition: { duration: 1.2, ease: "easeInOut" as const, delay: 0.4 },
      };
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 116 40"
      className="h-8 w-24 overflow-visible"
      animate={reduce ? undefined : { x: [0, 8, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <g filter={pencil} fill="none" stroke="var(--vermilion)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <motion.path d={shaft} {...draw} />
        <motion.path d={head} {...draw} />
      </g>
    </motion.svg>
  );
}

function WorkSlide({ project, i, progress, still }: { project: Project; i: number; progress: MotionValue<number>; still: boolean }) {
  // Tilt toward the pointer, settling back when it leaves.
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sy = useSpring(ry, { stiffness: 150, damping: 18 });
  const glareX = useTransform(sy, [-8, 8], ["15%", "85%"]);
  // The big numeral drifts against the strip, so it seems to float above the paper.
  const numX = useTransform(progress, [0, 1], [70, -110]);

  const move = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (still || e.pointerType !== "mouse") return;
    const b = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - b.left) / b.width - 0.5) * 14);
    rx.set(-((e.clientY - b.top) / b.height - 0.5) * 10);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className="[perspective:1100px]" style={{ rotate: `${rests[i % rests.length]}deg` }}>
      <Link href={`/work/${project.slug}`} onPointerMove={move} onPointerLeave={leave} className="group relative block">
        <motion.article
          style={still ? undefined : { rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }}
          className="relative w-[min(78vw,22rem)] p-6 md:w-[min(28rem,calc(60svh*0.78))] md:p-8"
        >
          <PaintedSheet seed={20 + i * 7} bloom={blooms[i % blooms.length]} notched h={1300} />

          <motion.span
            aria-hidden
            style={still ? undefined : { x: numX }}
            className="numeral-outline pointer-events-none absolute -top-14 right-4 z-10 font-display text-[6.5rem] leading-none md:-top-20 md:text-[9.5rem]"
          >
            {String(i + 1).padStart(2, "0")}
          </motion.span>

          <div className="relative" style={still ? undefined : { transform: "translateZ(30px)" }}>
            <div className="relative h-[min(52vw,15rem)] overflow-hidden md:h-[min(32svh,19rem)]">
              <Plate image={project.cover} number={i + 1} className="h-full w-full" sizes="(min-width: 48rem) 28rem, 78vw" />
              <motion.div
                aria-hidden
                style={{ left: glareX }}
                className="pointer-events-none absolute top-0 h-full w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>
            <div className="mt-6 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
              <span className="label row-span-2 pt-1 text-wine">No. {roman(i + 1)}</span>
              <span className="label flex flex-wrap gap-x-3 text-ink-soft">
                <span>{project.category}</span>
                <span aria-hidden>·</span>
                <span>{project.year ?? "Year —"}</span>
              </span>
              <span>
                <span className="block font-display text-title text-wine transition-colors duration-500 group-hover:text-vermilion">
                  {project.title}
                </span>
                {project.subtitle && (
                  <span className="mt-1 block font-display text-lg italic leading-snug text-ink-soft">{project.subtitle}</span>
                )}
                <span className="label mt-4 inline-flex items-center gap-2 text-wine">
                  View project
                  <span aria-hidden className="transition-transform duration-500 ease-gallery group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    </div>
  );
}

function Finale() {
  return (
    <Link href="/work" className="group relative flex h-64 w-64 items-center justify-center md:h-80 md:w-80">
      <WashBlot
        color="var(--powder-blue)"
        seed={9}
        className="inset-0 h-full w-full transition-transform duration-1000 ease-gallery group-hover:rotate-12 group-hover:scale-105"
      />
      <span className="relative text-center">
        <span className="title-script block text-5xl text-wine md:text-6xl">and more</span>
        <span className="label mt-4 inline-flex items-center gap-2 text-wine">
          Every project <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
        </span>
      </span>
    </Link>
  );
}

/** A pencil line along the bottom that fills with vermilion as the strip goes by. */
function Thread({ progress }: { progress: MotionValue<number> }) {
  const d = handLine([[0, 6], [250, 4.5], [500, 7], [750, 5], [1000, 6]], rng(5), 0.5);
  return (
    <svg aria-hidden viewBox="0 0 1000 12" preserveAspectRatio="none" className="h-3 min-w-0 flex-1">
      <g filter={pencil} fill="none" strokeLinecap="round">
        <path d={d} stroke="var(--wine)" strokeWidth={1} opacity={0.3} />
        <motion.path d={d} stroke="var(--vermilion)" strokeWidth={2.4} style={{ pathLength: progress }} />
      </g>
    </svg>
  );
}
