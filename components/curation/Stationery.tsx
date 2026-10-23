import { pencil, wash } from "@/components/cabinet/PaintDefs";

/**
 * Painted stationery for the drawers: clips, pins, tape, pegs, pens and
 * sticky notes, drawn in the cabinet's watercolour hand. Purely decorative
 * (always aria-hidden). Each piece sits in its own viewBox and fills the
 * width it is given; height follows.
 */
export type StationeryKind =
  | "binder-clip"
  | "bulldog-clip"
  | "paper-clip"
  | "push-pin"
  | "safety-pin"
  | "peg"
  | "tape"
  | "pen"
  | "pencil"
  | "sticky";

export interface StationeryPiece {
  kind: StationeryKind;
  /** Centre, in % of whatever it sits on. */
  x: number;
  y: number;
  /** Width, in % of whatever it sits on. */
  w: number;
  rot: number;
  z?: number;
  /** A palette colour for the painted part, e.g. "var(--vermilion)". */
  color?: string;
}

const silver = "color-mix(in srgb, var(--powder-blue) 45%, var(--aged-ivory))";
const outline = { fill: "none", stroke: "var(--wine)", strokeWidth: 0.8, opacity: 0.55, filter: pencil } as const;

const art: Record<StationeryKind, { vb: string; draw: (c: string) => React.ReactNode }> = {
  "binder-clip": {
    vb: "0 0 40 44",
    draw: (c) => (
      <>
        {/* wire handles folded up */}
        <path d="M11 22 C9 10 12 3 20 3 C28 3 31 10 29 22" fill="none" stroke={silver} strokeWidth={2.4} strokeLinecap="round" />
        <path d="M11 22 C9 10 12 3 20 3 C28 3 31 10 29 22" {...outline} strokeWidth={0.6} />
        <path d="M4 22 L36 22 L33 42 L7 42 Z" fill={c} filter={wash("c")} />
        <path d="M4 22 L36 22 L35 26 L5 26 Z" fill="var(--wine)" opacity={0.25} />
        <path d="M4 22 L36 22 L33 42 L7 42 Z" {...outline} />
      </>
    ),
  },
  "bulldog-clip": {
    vb: "0 0 50 36",
    draw: (c) => (
      <>
        <path d="M18 2 h14 a3 3 0 0 1 3 3 v8 h-20 v-8 a3 3 0 0 1 3 -3z" fill={c} filter={wash("c")} />
        <circle cx={25} cy={7} r={2.6} fill="var(--aged-ivory)" />
        <rect x={6} y={12} width={38} height={6} rx={3} fill={c} filter={wash("b")} />
        <path d="M3 18 h44 l-3 16 h-38z" fill={c} filter={wash("a")} />
        <path d="M6 21 h38" stroke="var(--aged-ivory)" strokeWidth={1} opacity={0.6} />
        <path d="M3 18 h44 l-3 16 h-38z M18 2 h14 a3 3 0 0 1 3 3 v8 h-20 v-8 a3 3 0 0 1 3 -3z" {...outline} />
      </>
    ),
  },
  "paper-clip": {
    vb: "0 0 14 44",
    draw: (c) => (
      <path
        d="M10 12 V34 a4 4 0 0 1 -8 0 V8 a5 5 0 0 1 10 0 V36 a6 6 0 0 1 -12 0"
        transform="translate(1 2)"
        fill="none"
        stroke={c}
        strokeWidth={1.8}
        strokeLinecap="round"
        filter={pencil}
      />
    ),
  },
  "push-pin": {
    vb: "0 0 30 34",
    draw: (c) => (
      <>
        <ellipse cx={17} cy={29} rx={9} ry={3} fill="var(--wine)" opacity={0.18} />
        <path d="M15 22 L20 31" stroke={silver} strokeWidth={1.4} strokeLinecap="round" />
        <path d="M9 14 h12 l2 6 h-16z" fill={c} filter={wash("b")} />
        <ellipse cx={15} cy={9} rx={10} ry={7} fill={c} filter={wash("c")} />
        <ellipse cx={12} cy={7} rx={3.4} ry={2} fill="var(--aged-ivory)" opacity={0.6} />
        <ellipse cx={15} cy={9} rx={10} ry={7} {...outline} />
      </>
    ),
  },
  "safety-pin": {
    vb: "0 0 64 18",
    draw: () => (
      <>
        <path d="M8 9 C2 9 2 3 8 3 L56 6" fill="none" stroke={silver} strokeWidth={1.6} strokeLinecap="round" />
        <path d="M8 9 C2 9 2 15 8 15 L52 12" fill="none" stroke={silver} strokeWidth={1.6} strokeLinecap="round" />
        <path d="M50 3 h10 v8 h-10z" fill="var(--brass)" filter={wash("c")} />
        <circle cx={6} cy={9} r={3} fill="none" stroke={silver} strokeWidth={1.4} />
        <path d="M8 3 L56 6 M8 15 L52 12" {...outline} strokeWidth={0.5} />
      </>
    ),
  },
  peg: {
    vb: "0 0 16 64",
    draw: () => (
      <>
        <path d="M2 2 h5 v60 h-5z" fill="color-mix(in srgb, var(--walnut) 70%, var(--aged-ivory))" filter={wash("b")} />
        <path d="M9 2 h5 v60 h-5z" fill="color-mix(in srgb, var(--walnut) 60%, var(--aged-ivory))" filter={wash("c")} />
        <path d="M1 22 h14 M1 26 h14" stroke={silver} strokeWidth={1.4} />
        <path d="M2 2 h5 v60 h-5z M9 2 h5 v60 h-5z" {...outline} />
        <path d="M4 34 v20 M11 30 v24" stroke="var(--walnut)" strokeWidth={0.4} opacity={0.7} />
      </>
    ),
  },
  tape: {
    vb: "0 0 60 16",
    draw: (c) => (
      <path
        d="M2 2 L6 0 L9 3 L12 1 L58 1 L56 5 L60 8 L57 11 L59 15 L3 15 L5 12 L1 9 L4 6 Z"
        fill={c}
        opacity={0.72}
        style={{ mixBlendMode: "multiply" }}
        filter={wash("c")}
      />
    ),
  },
  pen: {
    vb: "0 0 120 14",
    draw: (c) => (
      <>
        <path d="M2 7 L12 4 L12 10 Z" fill="var(--wine)" />
        <path d="M12 4 h24 v6 h-24z" fill={silver} filter={wash("b")} />
        <path d="M36 3 h62 a4 4 0 0 1 0 8 h-62z" fill={c} filter={wash("a")} />
        <path d="M98 3 h18 a2 2 0 0 1 0 8 h-18z" fill={c} filter={wash("c")} />
        <path d="M100 1 h14 v3 h-14z" fill="var(--brass)" />
        <path d="M40 5 h50" stroke="var(--aged-ivory)" strokeWidth={0.9} opacity={0.6} />
        <path d="M12 4 h24 v6 h-24z M36 3 h62 a4 4 0 0 1 0 8 h-62z M98 3 h18 a2 2 0 0 1 0 8 h-18z" {...outline} />
      </>
    ),
  },
  pencil: {
    vb: "0 0 120 12",
    draw: (c) => (
      <>
        <path d="M1 6 L5 4.6 L5 7.4 Z" fill="var(--wine)" />
        <path d="M5 4.6 L18 1 L18 11 L5 7.4 Z" fill="color-mix(in srgb, var(--walnut) 45%, var(--aged-ivory))" filter={wash("b")} />
        <path d="M18 1 h88 v10 h-88z" fill={c} filter={wash("a")} />
        <path d="M18 4.5 h88" stroke="var(--wine)" strokeWidth={0.4} opacity={0.4} />
        <path d="M106 1 h6 v10 h-6z" fill="var(--brass)" />
        <path d="M112 1 h6 a1 1 0 0 1 1 1 v8 a1 1 0 0 1 -1 1 h-6z" fill="var(--vermilion)" filter={wash("c")} />
        <path d="M18 1 h88 v10 h-88z M5 4.6 L18 1 L18 11 L5 7.4 Z" {...outline} />
      </>
    ),
  },
  sticky: {
    vb: "0 0 40 40",
    draw: (c) => (
      <>
        <path d="M0 0 h40 v32 l-8 8 h-32z" fill={c} filter={wash("a")} />
        <path d="M32 40 l1 -7 l7 -1z" fill="var(--wine)" opacity={0.2} />
        <path d="M6 12 h24 M6 18 h20 M6 24 h16" stroke="var(--wine)" strokeWidth={0.7} opacity={0.35} filter={pencil} />
        <path d="M0 0 h40 v32 l-8 8 h-32z" {...outline} />
      </>
    ),
  },
};

const defaults: Record<StationeryKind, string> = {
  "binder-clip": "var(--vermilion)",
  "bulldog-clip": "var(--brass)",
  "paper-clip": "var(--botanical-green)",
  "push-pin": "var(--vermilion)",
  "safety-pin": "var(--brass)",
  peg: "var(--walnut)",
  tape: "var(--powder-blue)",
  pen: "var(--wine)",
  pencil: "var(--botanical-green)",
  sticky: "color-mix(in srgb, var(--brass) 45%, var(--aged-ivory))",
};

/** Small pieces read better a touch larger than life. */
const scale: Partial<Record<StationeryKind, number>> = { "push-pin": 1.45, "paper-clip": 1.4, "binder-clip": 1.35, "bulldog-clip": 1.15, "safety-pin": 1.2, sticky: 1.2, peg: 1.2 };

export function Stationery({ piece }: { piece: StationeryPiece }) {
  const a = art[piece.kind];
  return (
    <svg
      aria-hidden
      viewBox={a.vb}
      className="stationery pointer-events-none absolute h-auto overflow-visible"
      style={{
        left: `${piece.x}%`,
        top: `${piece.y}%`,
        width: `calc(${(piece.w * (scale[piece.kind] ?? 1)).toFixed(2)}% * var(--k, 1))`,
        zIndex: piece.z ?? 6,
        transform: `translate(-50%, -50%) rotate(${piece.rot}deg)`,
      }}
    >
      {a.draw(piece.color ?? defaults[piece.kind])}
    </svg>
  );
}
