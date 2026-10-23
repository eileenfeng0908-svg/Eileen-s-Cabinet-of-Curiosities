"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { duration, ease } from "./tokens";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Seconds before this element starts appearing. */
  delay?: number;
  /** Vertical travel in px. Keep it small. */
  y?: number;
  as?: "div" | "li" | "section" | "figure" | "article";
  /** "lift": fade up. "ink": an image settling onto the page like a print, from soft focus. */
  variant?: "lift" | "ink";
};

/** Fades and lifts content gently into place as it enters the viewport. */
export function Reveal({ delay = 0, y = 18, as = "div", variant = "lift", children, ...rest }: RevealProps) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial={variant === "ink" ? { opacity: 0, y: y / 2, filter: "blur(6px)" } : { opacity: 0, y }}
      whileInView={variant === "ink" ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: variant === "ink" ? duration.slow * 1.2 : duration.base, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
