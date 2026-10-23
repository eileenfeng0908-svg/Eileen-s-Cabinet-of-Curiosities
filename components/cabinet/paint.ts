/**
 * Small helpers for drawing "by hand" in SVG: a seeded random source so the
 * same wobble appears on every render (no hydration mismatch), shapes whose
 * corners and edges drift a little, and the folk-art tulip vocabulary.
 */

export type Rng = () => number;

/** mulberry32 — tiny deterministic PRNG. */
export function rng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => n.toFixed(1);
export const jit = (r: Rng, amount: number) => (r() - 0.5) * 2 * amount;

/**
 * A closed polygon drawn freehand: every corner drifts by `j`, and every side
 * bows slightly through a jittered midpoint.
 */
export function handPoly(points: [number, number][], r: Rng, j = 1.2): string {
  const pts = points.map(([x, y]) => [x + jit(r, j), y + jit(r, j)] as [number, number]);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i <= pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i % pts.length];
    const mx = (x0 + x1) / 2 + jit(r, j * 0.9);
    const my = (y0 + y1) / 2 + jit(r, j * 0.9);
    d += `Q${f(mx)} ${f(my)} ${f(x1)} ${f(y1)}`;
  }
  return d + "Z";
}

export const handRect = (x: number, y: number, w: number, h: number, r: Rng, j = 1.2) =>
  handPoly(
    [
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h],
    ],
    r,
    j,
  );

/** A panel with stepped-in corners, as on Tyrolean painted furniture. */
export function notchedPanel(x: number, y: number, w: number, h: number, n: number, r: Rng, j = 1) {
  return handPoly(
    [
      [x + n, y],
      [x + w - n, y],
      [x + w - n, y + n],
      [x + w, y + n],
      [x + w, y + h - n],
      [x + w - n, y + h - n],
      [x + w - n, y + h],
      [x + n, y + h],
      [x + n, y + h - n],
      [x, y + h - n],
      [x, y + n],
      [x + n, y + n],
    ],
    r,
    j,
  );
}

/** A loose freehand line through points (used for pencil strokes and stems). */
export function handLine(points: [number, number][], r: Rng, j = 0.8): string {
  const pts = points.map(([x, y]) => [x + jit(r, j), y + jit(r, j)]);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    d += `Q${f((x0 + x1) / 2 + jit(r, j))} ${f((y0 + y1) / 2 + jit(r, j))} ${f(x1)} ${f(y1)}`;
  }
  return d;
}

/* --- Folk-art vocabulary -------------------------------------------------- */

export interface Tulip {
  x: number;
  y: number;
  /** degrees; 0 = pointing up */
  angle: number;
  size: number;
}

/** Three overlapping petals, pointing up from (0,0). Returns [left, right, centre]. */
export function tulipPetals(s: number, r: Rng): string[] {
  const k = () => 1 + jit(r, 0.08);
  const a = k(), b = k(), c = k();
  return [
    `M0 0C${f(-s * 0.62 * a)} ${f(-s * 0.08)} ${f(-s * 0.78 * a)} ${f(-s * 0.72 * a)} ${f(-s * 0.52 * a)} ${f(-s * 1.0 * a)}C${f(-s * 0.36)} ${f(-s * 0.72)} ${f(-s * 0.2)} ${f(-s * 0.4)} 0 0Z`,
    `M0 0C${f(s * 0.62 * b)} ${f(-s * 0.08)} ${f(s * 0.78 * b)} ${f(-s * 0.72 * b)} ${f(s * 0.52 * b)} ${f(-s * 1.0 * b)}C${f(s * 0.36)} ${f(-s * 0.72)} ${f(s * 0.2)} ${f(-s * 0.4)} 0 0Z`,
    `M0 ${f(s * 0.04)}C${f(-s * 0.4 * c)} ${f(-s * 0.3)} ${f(-s * 0.32 * c)} ${f(-s * 0.95 * c)} 0 ${f(-s * 1.12 * c)}C${f(s * 0.32 * c)} ${f(-s * 0.95 * c)} ${f(s * 0.4 * c)} ${f(-s * 0.3)} 0 ${f(s * 0.04)}Z`,
  ];
}

/** Pencil details on a tulip: the centre petal's edges and a few veins. */
export function tulipVeins(s: number, r: Rng): string[] {
  return [
    `M${f(-s * 0.05)} ${f(-s * 0.1)}C${f(-s * 0.28)} ${f(-s * 0.35)} ${f(-s * 0.24)} ${f(-s * 0.8)} ${f(-s * 0.02 + jit(r, 1))} ${f(-s * 1.0)}`,
    `M${f(s * 0.05)} ${f(-s * 0.1)}C${f(s * 0.28)} ${f(-s * 0.35)} ${f(s * 0.24)} ${f(-s * 0.8)} ${f(s * 0.02 + jit(r, 1))} ${f(-s * 1.0)}`,
    `M${f(-s * 0.3)} ${f(-s * 0.25)}Q${f(-s * 0.48)} ${f(-s * 0.55)} ${f(-s * 0.48)} ${f(-s * 0.8)}`,
    `M${f(s * 0.3)} ${f(-s * 0.25)}Q${f(s * 0.48)} ${f(-s * 0.55)} ${f(s * 0.48)} ${f(-s * 0.8)}`,
  ];
}

/** A pointed leaf from (0,0) towards +x. */
export function leaf(len: number, r: Rng): string {
  const w = len * (0.3 + jit(r, 0.05));
  return `M0 0C${f(len * 0.25)} ${f(-w)} ${f(len * 0.75)} ${f(-w * 0.9)} ${f(len)} 0C${f(len * 0.7)} ${f(w * 0.75)} ${f(len * 0.25)} ${f(w * 0.8)} 0 0Z`;
}

export function heart(s: number): string {
  return `M0 ${f(s * 0.9)}C${f(-s * 1.1)} ${f(s * 0.1)} ${f(-s * 0.9)} ${f(-s * 0.85)} 0 ${f(-s * 0.3)}C${f(s * 0.9)} ${f(-s * 0.85)} ${f(s * 1.1)} ${f(s * 0.1)} 0 ${f(s * 0.9)}Z`;
}

export const at = (x: number, y: number, angle = 0, scale = 1) =>
  `translate(${f(x)} ${f(y)}) rotate(${f(angle)})${scale !== 1 ? ` scale(${scale})` : ""}`;
