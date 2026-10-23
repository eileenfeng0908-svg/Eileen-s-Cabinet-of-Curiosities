"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { duration, ease } from "./tokens";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Seconds before this element starts appearing. */
  delay?: number;
  /** Vertical travel in px. Keep it small. */
  y?: number;
  as?: "div" | "li" | "section" | "figure" | "article";
};

/** Fades and lifts content gently into place as it enters the viewport. */
export function Reveal({ delay = 0, y = 18, as = "div", children, ...rest }: RevealProps) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: duration.base, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
