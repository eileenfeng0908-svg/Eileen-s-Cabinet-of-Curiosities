"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import type { CabinetItem as Collection } from "@/content/collections";
import { Carcass, OPENING } from "./Carcass";
import { DoorBack, DoorFront } from "./Door";
import { Interior } from "./Interior";
import { PaintDefs } from "./PaintDefs";

const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const RETURN_KEY = "ec-cabinet-open";
const doorEase = [0.65, 0, 0.35, 1] as const;

type Leaving = { c: Collection; rect: DOMRect } | null;

/**
 * The illustrated cabinet. Closed at first; click (or press the button
 * below) and the doors swing on their hinges to show six collections.
 * Shelves open their collection directly; the two drawers slide out first.
 */
export function Cabinet({ items }: { items: Collection[] }) {
  const [open, setOpen] = useState(false);
  const [instant, setInstant] = useState(false);
  const [hover, setHover] = useState(false);
  const [leaving, setLeaving] = useState<Leaving>(null);
  const still = !!useReducedMotion();
  const router = useRouter();

  // Coming back from a collection: the cabinet is already open.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(RETURN_KEY) === "1") {
        sessionStorage.removeItem(RETURN_KEY);
        setInstant(true);
        setOpen(true);
      }
    } catch {}
  }, []);

  const openCollection = useCallback(
    (c: Collection, el: HTMLElement) => {
      const href = `/collections/${c.slug}`;
      try {
        sessionStorage.setItem(RETURN_KEY, "1");
      } catch {}
      if (still) return router.push(href);
      router.prefetch(href);
      setLeaving({ c, rect: el.getBoundingClientRect() });
    },
    [router, still],
  );

  // After the doors open, move focus inside so keyboard users land on the shelves.
  const focusInside = useRef(false);
  useEffect(() => {
    if (!open || !focusInside.current) return;
    focusInside.current = false;
    const id = window.setTimeout(() => {
      document.querySelector<HTMLElement>("#cabinet-interior a, #cabinet-interior button")?.focus({ preventScroll: true });
    }, 60);
    return () => window.clearTimeout(id);
  }, [open]);

  const toggle = () => {
    setInstant(false);
    focusInside.current = !open;
    setOpen((v) => !v);
  };

  const doorT = { duration: instant ? 0 : still ? 0.3 : 1.5, ease: doorEase };

  return (
    <div className="flex flex-col items-center">
      <PaintDefs />
      <div
        className="cabinet-scene relative w-full"
        data-hover={hover && !open ? "true" : undefined}
        style={{ aspectRatio: "600 / 900", perspective: "1600px", containerType: "inline-size" }}
      >
        <Carcass />
        <Interior items={items} onOpen={openCollection} open={open} />

        {/* the doors */}
        {(["left", "right"] as const).map((side, i) => (
          <motion.div
            key={side}
            aria-hidden
            className="absolute"
            style={{
              left: pct(OPENING.x + (side === "right" ? OPENING.w / 2 : 0), 600),
              top: pct(OPENING.y, 900),
              width: pct(OPENING.w / 2, 600),
              height: pct(OPENING.h, 900),
              transformOrigin: side === "left" ? "0% 50%" : "100% 50%",
              transformStyle: "preserve-3d",
              pointerEvents: open ? "none" : undefined,
              zIndex: 10,
            }}
            initial={false}
            animate={
              still
                ? { opacity: open ? 0 : 1 }
                : { rotateY: open ? (side === "left" ? -112 : 112) : 0 }
            }
            transition={{ ...doorT, delay: open && !instant ? i * 0.09 : 0 }}
          >
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
              <DoorFront side={side} />
            </div>
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
              <DoorBack side={side} />
            </div>
          </motion.div>
        ))}

        {/* while closed, the doors are one big button */}
        {!open && (
          <button
            type="button"
            onClick={toggle}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
            aria-controls="cabinet-interior"
            aria-expanded={false}
            className="absolute z-20 cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vermilion"
            style={{ left: pct(OPENING.x, 600), top: pct(OPENING.y, 900), width: pct(OPENING.w, 600), height: pct(OPENING.h, 900) }}
          >
            <span className="sr-only">Open the cabinet doors</span>
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-controls="cabinet-interior"
        aria-expanded={open}
        className="label mt-6 inline-flex items-center gap-2 border-b border-wine/40 pb-1 text-wine transition-colors duration-500 hover:border-vermilion hover:text-vermilion focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vermilion"
      >
        <KeyIcon /> {open ? "Close the doors" : "Open the cabinet"}
      </button>

      {leaving && <Leave leaving={leaving} onDone={() => router.push(`/collections/${leaving.c.slug}`)} />}
    </div>
  );
}

/** Paper spreads out from the chosen compartment until it fills the page. */
function Leave({ leaving, onDone }: { leaving: NonNullable<Leaving>; onDone: () => void }) {
  const { rect, c } = leaving;
  if (typeof document === "undefined") return null;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const from = `inset(${rect.top}px ${vw - rect.right}px ${vh - rect.bottom}px ${rect.left}px round 6px)`;
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ivory"
      initial={{ clipPath: from }}
      animate={{ clipPath: "inset(0px 0px 0px 0px round 0px)" }}
      transition={{ duration: 0.85, ease: doorEase }}
      onAnimationComplete={onDone}
      aria-live="polite"
    >
      <motion.p
        className="font-display text-display-m text-wine"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        {c.title}
      </motion.p>
    </motion.div>,
    document.body,
  );
}

function KeyIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 12" className="h-3 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="5" cy="6" r="3.6" />
      <path d="M8.6 6H22M18 6v3.4M21 6v2.6" />
    </svg>
  );
}
