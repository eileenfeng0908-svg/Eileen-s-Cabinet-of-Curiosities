"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Botanical linework that grows as the reader scrolls: a whiplash stem
 * draws itself, then leaves and a single bloom appear along it.
 * Purely decorative (aria-hidden). With reduced motion it is simply drawn.
 */

const stem =
  "M60 598 C 22 528, 98 468, 62 390 S 18 250, 64 176 S 98 70, 58 14";
const tendrils = [
  "M62 390 c 20 -6 30 -22 22 -34 c -6 -8 -16 -4 -14 4",
  "M48 300 c -22 -2 -34 -16 -28 -30 c 4 -8 14 -6 14 2",
  "M64 176 c 18 -2 26 -16 20 -26 c -4 -7 -12 -5 -12 1",
];
// Leaves as [path, appear-at-progress]
const leaves: [string, number][] = [
  ["M52 540 c -22 -4 -36 -18 -38 -36 c 18 2 34 16 38 36 z", 0.12],
  ["M70 470 c 22 -6 34 -22 34 -40 c -18 4 -32 18 -34 40 z", 0.28],
  ["M40 330 c -22 -2 -36 -16 -40 -34 c 18 0 34 14 40 34 z", 0.45],
  ["M70 250 c 20 -8 30 -24 28 -42 c -16 6 -28 22 -28 42 z", 0.6],
  ["M58 110 c -20 -6 -30 -22 -30 -40 c 16 4 28 20 30 40 z", 0.78],
];

function Leaf({ d, at, progress, still }: { d: string; at: number; progress: MotionValue<number>; still: boolean }) {
  const opacity = useTransform(progress, [at, at + 0.08], [0, 1]);
  const scale = useTransform(progress, [at, at + 0.1], [0.6, 1]);
  return (
    <motion.path
      d={d}
      fill="var(--color-green)"
      fillOpacity={0.22}
      stroke="var(--color-green)"
      strokeWidth={0.8}
      style={still ? undefined : { opacity, scale, transformBox: "fill-box", transformOrigin: "center" }}
    />
  );
}

export function BotanicalVine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const still = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "end 45%"] });
  const draw = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const bloomOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none w-[clamp(3.5rem,7vw,6.5rem)]", className)}>
    <svg viewBox="0 0 120 610" fill="none" strokeLinecap="round" className="block h-auto w-full overflow-visible">
      <motion.path d={stem} stroke="var(--color-green)" strokeWidth={1.1} style={still ? undefined : { pathLength: draw }} />
      {tendrils.map((d) => (
        <motion.path key={d} d={d} stroke="var(--color-green)" strokeWidth={0.8} style={still ? undefined : { pathLength: draw }} />
      ))}
      {leaves.map(([d, at]) => (
        <Leaf key={d} d={d} at={at} progress={scrollYProgress} still={still} />
      ))}
      {/* The bloom at the tip */}
      <motion.g style={still ? undefined : { opacity: bloomOpacity }}>
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="58" cy="2" rx="5" ry="9" transform={`rotate(${r} 58 10)`} fill="var(--color-vermilion)" fillOpacity={0.35} stroke="var(--color-vermilion)" strokeWidth={0.5} />
        ))}
        <circle cx="58" cy="10" r="3" fill="var(--color-brass)" />
      </motion.g>
    </svg>
    </div>
  );
}
