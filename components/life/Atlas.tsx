"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { landmarks, type Landmark } from "@/content/life";
import { ATLAS_H, ATLAS_W } from "@/lib/atlas/geo";
import { project } from "@/lib/atlas/projection";
import { cn } from "@/lib/cn";
import { landmarkArt } from "./landmarks";

/** Landmarks are drawn ~110 units tall; this sets their size on the map. */
const ART_SCALE = 0.95;
const MAX_ZOOM = 6;

/**
 * The atlas: a painted world (passed in as `map`) with the landmarks on
 * top. Drag to wander, pinch or use the buttons to zoom. Landmarks keep a
 * steady size as you zoom, and neighbours that start nudged apart drift
 * back onto their true positions as there is room.
 */
export function Atlas({ map }: { map: ReactNode }) {
  const view = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const s = useMotionValue(1);
  /** The zoom the landmarks are laid out for; follows `s` once it settles. */
  const [zoom, setZoom] = useState(1);
  const [moving, setMoving] = useState(false);
  const reduce = useRef(false);
  const fit = useRef(1);
  const fitMV = useMotionValue(1);
  const stageScale = useTransform([s, fitMV], ([a, b]: number[]) => a * b);

  const size = () => {
    const el = view.current!;
    return { w: el.clientWidth, h: el.clientHeight };
  };
  /** Keep the world filling the frame. */
  const clamp = useCallback((nx: number, ny: number, ns: number) => {
    const { w, h } = size();
    const sc = fit.current * ns;
    const minX = w - ATLAS_W * sc;
    const minY = h - ATLAS_H * sc;
    return [Math.min(0, Math.max(minX, nx)), Math.min(0, Math.max(minY, ny))] as const;
  }, []);

  const settle = useRef<ReturnType<typeof setTimeout>>(undefined);
  const touched = useCallback(() => {
    setMoving(true);
    clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      setMoving(false);
      setZoom(s.get());
    }, 160);
  }, [s]);

  const apply = useCallback(
    (nx: number, ny: number, ns: number, smooth = false) => {
      ns = Math.min(MAX_ZOOM, Math.max(1, ns));
      const [cx, cy] = clamp(nx, ny, ns);
      if (smooth && !reduce.current) {
        setMoving(true);
        const t = { type: "spring" as const, stiffness: 70, damping: 20 };
        animate(x, cx, t);
        animate(y, cy, t);
        animate(s, ns, { ...t, onComplete: touched });
      } else {
        x.set(cx);
        y.set(cy);
        s.set(ns);
        touched();
      }
    },
    [clamp, s, x, y, touched],
  );

  /** Zoom by `k` about a point in the frame (px). */
  const zoomAt = useCallback(
    (k: number, px: number, py: number, smooth = false) => {
      const ns = Math.min(MAX_ZOOM, Math.max(1, s.get() * k));
      const r = ns / s.get();
      apply(px - (px - x.get()) * r, py - (py - y.get()) * r, ns, smooth);
    },
    [apply, s, x, y],
  );

  /** Centre a point of the map in the frame at a given zoom. */
  const flyTo = useCallback(
    (mx: number, my: number, ns: number) => {
      const { w, h } = size();
      const sc = fit.current * ns;
      apply(w / 2 - mx * sc, h / 2 - my * sc, ns, true);
    },
    [apply],
  );

  // Fit the world to the frame, and refit when the frame changes size.
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = view.current!;
    const refit = () => {
      const { w, h } = size();
      const prev = fit.current;
      fit.current = Math.max(w / ATLAS_W, h / ATLAS_H);
      fitMV.set(fit.current);
      if (prev === 1 && x.get() === 0) {
        // first fit: on a narrow screen, start over East Asia and home
        const [mx, my] = project(28, w < 700 ? 118 : 10);
        const sc = fit.current;
        const [cx, cy] = clamp(w / 2 - mx * sc, h / 2 - my * sc, 1);
        x.set(cx);
        y.set(cy);
      } else {
        apply(x.get(), y.get(), s.get());
      }
    };
    refit();
    const ro = new ResizeObserver(refit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [apply, clamp, fitMV, s, x, y]);

  // Pinch-to-zoom on a trackpad (ctrl + wheel) zooms the map; plain scrolling still scrolls the page.
  useEffect(() => {
    const el = view.current!;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const r = el.getBoundingClientRect();
      zoomAt(Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  // Dragging with one finger or the mouse; pinching with two.
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({ moved: 0, dist: 0 });
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) gesture.current.moved = 0;
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current.dist = Math.hypot(a.x - b.x, a.y - b.y);
    }
    x.stop();
    y.stop();
    s.stop();
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const now = { x: e.clientX, y: e.clientY };
    pointers.current.set(e.pointerId, now);
    if (pointers.current.size === 1) {
      const dx = now.x - prev.x;
      const dy = now.y - prev.y;
      gesture.current.moved += Math.abs(dx) + Math.abs(dy);
      if (gesture.current.moved > 4) {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        apply(x.get() + dx, y.get() + dy, s.get());
      }
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const r = view.current!.getBoundingClientRect();
      gesture.current.moved += 10;
      if (gesture.current.dist) zoomAt(d / gesture.current.dist, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
      gesture.current.dist = d;
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    gesture.current.dist = 0;
  };

  const zoomBy = (k: number) => {
    const { w, h } = size();
    zoomAt(k, w / 2, h / 2, true);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const step = 80;
    const keys: Record<string, () => void> = {
      "+": () => zoomBy(1.5),
      "=": () => zoomBy(1.5),
      "-": () => zoomBy(1 / 1.5),
      ArrowLeft: () => apply(x.get() + step, y.get(), s.get(), true),
      ArrowRight: () => apply(x.get() - step, y.get(), s.get(), true),
      ArrowUp: () => apply(x.get(), y.get() + step, s.get(), true),
      ArrowDown: () => apply(x.get(), y.get() - step, s.get(), true),
    };
    if (e.target !== e.currentTarget || !keys[e.key]) return;
    e.preventDefault();
    keys[e.key]();
  };

  /** Phase 2: a city draws you in. (Its gallery opens here in phase 3.) */
  const visit = (l: Landmark) => {
    if (gesture.current.moved > 6) return;
    const [mx, my] = project(l.lat, l.lon);
    flyTo(mx, my, Math.max(s.get(), 3.2));
  };

  return (
    <div className="atlas relative">
      <AtlasDefs />
      <div
        ref={view}
        tabIndex={0}
        role="region"
        aria-label="Illustrated world atlas. Drag to move around, use plus and minus to zoom."
        onKeyDown={onKey}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="atlas-frame relative aspect-[4/5] cursor-grab touch-none select-none overflow-hidden active:cursor-grabbing sm:aspect-[2000/845]"
      >
        <motion.div
          className={cn("absolute left-0 top-0 origin-top-left", moving && "will-change-transform")}
          style={{ x, y, scale: stageScale, width: ATLAS_W, height: ATLAS_H }}
        >
          {map}
          <svg viewBox={`0 0 ${ATLAS_W} ${ATLAS_H}`} width={ATLAS_W} height={ATLAS_H} className="absolute left-0 top-0 overflow-visible">
            {[...landmarks]
              .sort((a, b) => project(a.lat, a.lon)[1] - project(b.lat, b.lon)[1])
              .map((l) => (
                <Mark key={l.id} l={l} zoom={zoom} onVisit={visit} />
              ))}
          </svg>
        </motion.div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="font-display text-caption italic text-wine">
          Places outlined in white pencil hold photographs. Drag to wander; pinch or use the buttons to zoom.
        </p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => zoomBy(1 / 1.6)} aria-label="Zoom out" className="atlas-btn">−</button>
          <button type="button" onClick={() => zoomBy(1.6)} aria-label="Zoom in" className="atlas-btn">+</button>
          <button type="button" onClick={() => apply(x.get(), y.get(), 1, true)} className="label link-draw ml-2 text-wine">
            Whole world
          </button>
        </div>
      </div>
    </div>
  );
}

/* --- A landmark ------------------------------------------------------------ */

function Mark({ l, zoom, onVisit }: { l: Landmark; zoom: number; onVisit: (l: Landmark) => void }) {
  const art = landmarkArt[l.art];
  const [px, py] = project(l.lat, l.lon);
  // Neighbours start a little apart and settle onto their true places as you zoom in.
  const k = 1 / Math.sqrt(zoom);
  const [nx, ny] = l.nudge ? [l.nudge[0] * k, l.nudge[1] * k] : [0, 0];
  const size = (ART_SCALE * (l.scale ?? (l.interactive ? 1 : 0.8))) / zoom ** 0.4;
  const showLabel = l.interactive && (zoom >= 2.4 || ("home" in l && l.home));
  const placed: CSSProperties = { transform: `translate(${px + nx}px, ${py + ny}px) scale(${size})` };
  const body = art ? art.draw() : null;
  const image = l.image ? <image href={l.image} x={-art.box[0]} y={-art.box[1]} width={art.box[0] * 2} height={art.box[1]} preserveAspectRatio="xMidYMax meet" /> : null;

  const leader = l.nudge && (Math.abs(nx) > 2 || Math.abs(ny) > 2) && (
    <g className="atlas-leader">
      <path d={`M${px} ${py}L${px + nx} ${py + ny}`} stroke="var(--wine)" strokeOpacity={0.45} strokeWidth={0.8 / Math.sqrt(zoom)} strokeDasharray={`${2 / zoom} ${2 / zoom}`} />
      <circle cx={px} cy={py} r={2.2 / Math.sqrt(zoom)} fill="var(--wine)" fillOpacity={0.7} />
    </g>
  );

  if (!l.interactive) {
    return (
      <g aria-hidden pointerEvents="none">
        {leader}
        <g className="atlas-mark is-decorative" style={placed}>
          <ellipse cx={0} cy={2} rx={art.box[0] * 0.9} ry={4} fill="var(--wine)" fillOpacity={0.14} filter="url(#ec-wash-c)" />
          <g opacity={0.82}>{image ?? body}</g>
        </g>
      </g>
    );
  }

  const home = l.home;
  const name = home ? `Home: ${l.city}, ${l.country}` : `${l.city}, ${l.country}`;
  return (
    <g>
      {leader}
      <g
        role="button"
        tabIndex={0}
        aria-label={`${name}. ${l.landmark}`}
        onClick={() => onVisit(l)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onVisit(l))}
        className="atlas-mark atlas-city"
        style={placed}
      >
        <rect x={-art.box[0] - 6} y={-art.box[1] - 6} width={art.box[0] * 2 + 12} height={art.box[1] + 14} fill="transparent" />
        <ellipse cx={0} cy={2} rx={art.box[0] * 0.95} ry={4.5} fill="var(--wine)" fillOpacity={0.2} filter="url(#ec-wash-c)" />
        <g className="atlas-lift">
          {/* the white pencil line: drawn from the building's own silhouette */}
          <g className="atlas-outline" aria-hidden>
            {image ?? (art.silhouette ? art.silhouette() : body)}
          </g>
          {image ?? body}
        </g>
        <g className={cn("atlas-label", showLabel && "is-shown")} fontFamily="var(--font-display)" textAnchor="middle" fill="var(--wine)">
          {home ? (
            <>
              <path d="M-27 16.5c-2.2 -2.6 -6 -0.6 -4.4 2.4c1 1.9 4.4 4.2 4.4 4.2s3.4 -2.3 4.4 -4.2c1.6 -3 -2.2 -5 -4.4 -2.4z" fill="var(--powder-blue)" stroke="color-mix(in srgb, var(--powder-blue) 60%, var(--wine))" strokeWidth={0.8} filter="url(#ec-pencil)" />
              <text x={6} y={23} fontFamily="var(--font-sc)" fontSize={13} letterSpacing={2.6}>HOME</text>
              <text y={39} fontSize={13.5} fontStyle="italic">Shenzhen, China</text>
            </>
          ) : (
            <text
              x={l.label === "right" ? art.box[0] + 5 : l.label === "left" ? -art.box[0] - 5 : 0}
              y={l.label ? -art.box[1] * 0.3 : 22}
              textAnchor={l.label === "right" ? "start" : l.label === "left" ? "end" : "middle"}
              fontSize={15}
              fontStyle="italic"
            >
              {l.city}
            </text>
          )}
        </g>
      </g>
    </g>
  );
}

/** The white coloured-pencil outline, made from whatever shape it is given. */
function AtlasDefs() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        {[
          { id: "ec-white-pencil", r: 3.2, a: 0.85 },
          { id: "ec-white-pencil-strong", r: 4.4, a: 1 },
        ].map((f) => (
          <filter key={f.id} id={f.id} x="-25%" y="-15%" width="150%" height="130%" colorInterpolationFilters="sRGB">
            <feMorphology in="SourceAlpha" operator="dilate" radius={f.r} result="fat" />
            <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="4" result="wobble" />
            <feDisplacementMap in="fat" in2="wobble" scale="3.4" xChannelSelector="R" yChannelSelector="G" result="fatter" />
            <feComposite in="fatter" in2="SourceAlpha" operator="out" result="ring" />
            {/* pencil grain: the line breaks up where the paper's tooth shows */}
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="9" result="tooth" />
            <feColorMatrix in="tooth" type="matrix" values={`0 0 0 0 1  0 0 0 0 0.99  0 0 0 0 0.96  0 0 0 ${2.4 * f.a} -0.3`} result="white" />
            <feComposite in="white" in2="ring" operator="in" />
          </filter>
        ))}
      </defs>
    </svg>
  );
}
