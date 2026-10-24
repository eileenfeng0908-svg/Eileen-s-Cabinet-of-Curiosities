"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { collections } from "@/content/collections";
import { Star } from "@/components/editorial/Ornaments";
import { WashBlot } from "@/components/writing/Painted";

/**
 * A painted ribbon of the cabinet's collections that drifts sideways and
 * speeds up (or turns back) with the scroll. Each name opens its collection.
 */
const inks = ["text-wine", "text-vermilion", "text-green", "text-wine", "text-vermilion", "text-green"];

export function Ribbon() {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const strip = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < -0.2) dir.current = -1;
    else if (b > 0.2) dir.current = 1;
    const half = (strip.current?.scrollWidth ?? 0) / 2;
    if (!half) return;
    let next = base.get() - dir.current * (delta / 1000) * 40 * (1 + Math.abs(b));
    if (next <= -half) next += half;
    if (next > 0) next -= half;
    base.set(next);
  });

  const row = (copy: number) =>
    collections.map((c, i) => (
      <li key={`${copy}-${c.slug}`} className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12">
        <Link
          href={`/collections/${c.slug}`}
          tabIndex={copy ? -1 : undefined}
          aria-hidden={copy ? true : undefined}
          className={`group relative font-display text-4xl italic md:text-6xl ${inks[i % inks.length]}`}
        >
          <WashBlot
            color={["var(--powder-blue)", "var(--brass)", "var(--vermilion)"][i % 3]}
            seed={30 + i}
            className="-inset-x-6 -inset-y-4 -z-10 h-[calc(100%+2rem)] w-[calc(100%+3rem)] scale-75 opacity-0 transition-all duration-700 ease-gallery group-hover:scale-100 group-hover:opacity-70"
          />
          {c.title}
        </Link>
        <Star className="h-4 w-4 shrink-0 text-brass md:h-5 md:w-5" />
      </li>
    ));

  return (
    <nav aria-label="All collections" className="relative isolate overflow-hidden border-y border-brass/30 py-8 md:py-10">
      <motion.div ref={strip} style={{ x: base }} className={reduce ? "overflow-x-auto" : undefined}>
        <ul className="flex w-max">
          {row(0)}
          {!reduce && row(1)}
        </ul>
      </motion.div>
    </nav>
  );
}
