import { at, handLine, heart, jit, leaf, rng, tulipPetals, tulipVeins, type Rng, type Tulip } from "./paint";
import { pencil, wash, type Wash } from "./PaintDefs";

/**
 * Folk-art bouquets in the Tyrolean manner: a heart at the root, a central
 * stem, tulips branching in near-mirror pairs. Each bouquet is generated from
 * a seed, so the two doors are siblings, never twins.
 */

type Box = { x: number; y: number; w: number; h: number };

interface Plan {
  stems: string[];
  leaves: { x: number; y: number; angle: number; len: number }[];
  tulips: Tulip[];
  hearts: { x: number; y: number; s: number }[];
  dots: { x: number; y: number; r: number }[];
  tails: string[];
}

function tallPlan({ x, y, w, h }: Box, r: Rng): Plan {
  const cx = x + w / 2 + jit(r, 2);
  const by = y + h * 0.9;
  const top = y + h * 0.1;
  const s0 = w * 0.2;
  const p: Plan = { stems: [], leaves: [], tulips: [], hearts: [], dots: [], tails: [] };

  p.stems.push(handLine([[cx, by - 4], [cx + jit(r, 3), (by + top) / 2], [cx + jit(r, 2), top + s0 * 0.9]], r, 1.2));
  p.tulips.push({ x: cx, y: top + s0 * 0.95, angle: jit(r, 4), size: s0 });

  [0.24, 0.5, 0.74].forEach((t, i) => {
    const yb = by - (by - top) * t;
    for (const side of [-1, 1]) {
      const ex = cx + side * w * (0.31 - t * 0.07) + jit(r, 2);
      const ey = yb - h * 0.09 + jit(r, 2);
      p.stems.push(handLine([[cx, yb], [cx + side * w * 0.16, yb - h * 0.015], [ex, ey]], r, 1));
      p.tulips.push({ x: ex, y: ey, angle: side * (40 - t * 14) + jit(r, 5), size: w * (0.175 - t * 0.025) });
      p.leaves.push({ x: cx + side * 1, y: yb + h * 0.045, angle: side > 0 ? -38 + jit(r, 6) : 218 + jit(r, 6), len: w * (0.22 - i * 0.02) });
      p.leaves.push({ x: (cx + ex) / 2, y: (yb + ey) / 2 - 1, angle: side > 0 ? -70 + jit(r, 8) : 250 + jit(r, 8), len: w * 0.11 });
    }
  });
  for (const side of [-1, 1]) {
    p.leaves.push({ x: cx, y: by - h * 0.03, angle: side > 0 ? -14 + jit(r, 5) : 194 + jit(r, 5), len: w * 0.25 });
    for (let k = 0; k < 3; k++) p.dots.push({ x: cx + side * (w * 0.2 + k * 4) , y: top + h * 0.07 - k * 4 + jit(r, 1), r: 1.9 });
  }
  p.hearts.push({ x: cx, y: by + 2, s: w * 0.065 });
  p.tails.push(handLine([[cx - 1, by + w * 0.06], [cx - 5, by + h * 0.075], [cx - 2, y + h]], r, 0.6));
  p.tails.push(handLine([[cx + 1, by + w * 0.06], [cx + 5, by + h * 0.075], [cx + 3, y + h]], r, 0.6));
  return p;
}

function smallPlan({ x, y, w, h }: Box, r: Rng): Plan {
  const cx = x + w / 2 + jit(r, 2);
  const by = y + h * 0.86;
  const p: Plan = { stems: [], leaves: [], tulips: [], hearts: [], dots: [], tails: [] };
  const topY = y + h * 0.36;
  p.stems.push(handLine([[cx, by - 3], [cx + jit(r, 2), (by + topY) / 2], [cx, topY]], r, 1));
  p.tulips.push({ x: cx, y: topY, angle: jit(r, 4), size: w * 0.19 });
  for (const side of [-1, 1]) {
    const sx = cx + side * w * 0.25 + jit(r, 2);
    const sy = y + h * 0.45 + jit(r, 2);
    p.stems.push(handLine([[cx, by - h * 0.16], [cx + side * w * 0.12, by - h * 0.26], [sx, sy]], r, 1));
    p.tulips.push({ x: sx, y: sy, angle: side * 46 + jit(r, 5), size: w * 0.155 });
    const ox = cx + side * w * 0.39;
    const oy = y + h * 0.66 + jit(r, 2);
    p.stems.push(handLine([[cx, by - h * 0.05], [cx + side * w * 0.22, by - h * 0.1], [ox, oy]], r, 0.8));
    p.tulips.push({ x: ox, y: oy, angle: side * 74 + jit(r, 6), size: w * 0.1 });
    p.leaves.push({ x: cx, y: by - h * 0.1, angle: side > 0 ? -26 + jit(r, 6) : 206 + jit(r, 6), len: w * 0.2 });
    p.dots.push({ x: cx + side * w * 0.12, y: y + h * 0.2, r: 1.8 });
    p.dots.push({ x: cx + side * w * 0.16, y: y + h * 0.27, r: 1.5 });
  }
  p.hearts.push({ x: cx, y: by + 1, s: w * 0.055 });
  return p;
}

function garlandPlan({ x, y, w, h }: Box, r: Rng): Plan {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const p: Plan = { stems: [], leaves: [], tulips: [], hearts: [], dots: [], tails: [] };
  p.hearts.push({ x: cx, y: cy, s: h * 0.3 });
  for (const side of [-1, 1]) {
    const t1x = cx + side * w * 0.17;
    const t2x = cx + side * w * 0.36;
    p.stems.push(handLine([[cx + side * h * 0.25, cy], [cx + side * w * 0.1, cy - h * 0.18], [t1x - side * 2, cy]], r, 0.6));
    p.stems.push(handLine([[cx + side * w * 0.1, cy - h * 0.1], [cx + side * w * 0.24, cy + h * 0.2], [t2x - side * 2, cy + h * 0.05]], r, 0.6));
    p.tulips.push({ x: t1x, y: cy, angle: side * 90 + jit(r, 6), size: h * 0.5 });
    p.tulips.push({ x: t2x, y: cy + h * 0.05, angle: side * 80 + jit(r, 6), size: h * 0.4 });
    p.leaves.push({ x: cx + side * w * 0.08, y: cy - h * 0.12, angle: side > 0 ? -60 : 240, len: h * 0.42 });
    p.leaves.push({ x: cx + side * w * 0.25, y: cy + h * 0.12, angle: side > 0 ? 40 : 140, len: h * 0.38 });
    p.dots.push({ x: cx + side * w * 0.45, y: cy - h * 0.08, r: 1.5 });
  }
  return p;
}

const plans = { tall: tallPlan, small: smallPlan, garland: garlandPlan };

export function Bouquet({
  kind,
  box,
  seed,
  w: washKey = "a",
}: {
  kind: keyof typeof plans;
  box: Box;
  seed: number;
  w?: Wash;
}) {
  const r = rng(seed);
  const p = plans[kind](box, r);
  const petals = p.tulips.map((t) => ({ t, d: tulipPetals(t.size, r), v: tulipVeins(t.size, r) }));
  const sw = Math.max(1.4, box.w * 0.012);

  return (
    <g>
      {/* stems */}
      <g filter={wash(washKey)} fill="none" stroke="var(--botanical-green)" strokeWidth={sw} strokeLinecap="round">
        {p.stems.map((d, i) => <path key={i} d={d} />)}
      </g>
      {/* leaves */}
      <g filter={wash(washKey)} fill="var(--botanical-green)" fillOpacity={0.85}>
        {p.leaves.map((l, i) => <path key={i} d={leaf(l.len, r)} transform={at(l.x, l.y, l.angle)} />)}
      </g>
      {/* tulips: side petals, then the centre petal glazed over them */}
      <g filter={wash(washKey)}>
        {petals.map(({ t, d }, i) => (
          <g key={i} transform={at(t.x, t.y, t.angle)}>
            <path d={d[0]} fill="var(--vermilion)" fillOpacity={0.88} />
            <path d={d[1]} fill="var(--vermilion)" fillOpacity={0.88} />
            <path d={d[2]} fill="var(--vermilion)" fillOpacity={0.78} />
            <path
              d={`M${-t.size * 0.24} ${-t.size * 0.02}Q0 ${t.size * 0.24} ${t.size * 0.24} ${-t.size * 0.02}Q0 ${t.size * 0.08} ${-t.size * 0.24} ${-t.size * 0.02}Z`}
              fill="var(--botanical-green)"
            />
          </g>
        ))}
        {p.hearts.map((h, i) => <path key={i} d={heart(h.s)} transform={at(h.x, h.y)} fill="var(--vermilion)" />)}
        {p.dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={i % 2 ? "var(--brass)" : "var(--vermilion)"} />)}
      </g>
      {/* coloured-pencil detail */}
      <g filter={pencil} fill="none" stroke="var(--wine)" strokeWidth={0.8} strokeLinecap="round" opacity={0.6}>
        {petals.map(({ t, v }, i) => (
          <g key={i} transform={at(t.x, t.y, t.angle)}>
            {v.map((d, k) => <path key={k} d={d} />)}
          </g>
        ))}
        {p.leaves.map((l, i) => <path key={`v${i}`} d={`M0 0L${l.len * 0.85} 0`} transform={at(l.x, l.y, l.angle)} stroke="var(--botanical-green)" />)}
        {p.tails.map((d, i) => <path key={`t${i}`} d={d} />)}
      </g>
      {/* paper showing through: a light pencil highlight on each centre petal */}
      <g filter={pencil} fill="none" stroke="var(--aged-ivory)" strokeWidth={0.9} strokeLinecap="round" opacity={0.75}>
        {petals.map(({ t }, i) => (
          <path key={i} d={`M${-t.size * 0.12} ${-t.size * 0.22}Q${-t.size * 0.2} ${-t.size * 0.6} ${-t.size * 0.06} ${-t.size * 0.88}`} transform={at(t.x, t.y, t.angle)} />
        ))}
      </g>
    </g>
  );
}
