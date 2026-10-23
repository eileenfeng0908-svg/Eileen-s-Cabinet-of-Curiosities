"use client";

import { motion } from "motion/react";
import { duration, ease } from "@/components/motion/tokens";

/** Page transition: each route fades up from the paper. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.base, ease }}
    >
      {children}
    </motion.div>
  );
}
