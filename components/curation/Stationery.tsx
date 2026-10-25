import { pencil, wash } from "@/components/cabinet/PaintDefs";

/**
 * Painted stationery for the drawers: clips, pins, tape, pegs, pens and
 * sticky notes, plus keepsakes (doilies, pressed flowers and leaves, ribbon,
 * wax seals, stamps, twine, paper hearts, buttons), drawn in the cabinet's
 * watercolour hand. Purely decorative
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
  | "sticky"
  | "doily"
  | "sprig"
  | "leaf"
  | "bow"
  | "seal"
  | "stamp"
  | "twine"
  | "heart"
  | "button";

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
  doily: {
    vb: "0 0 100 100",
    draw: (c) => (
      <>
        <path d="M96.0 50.0 Q99.8 55.6 94.8 60.2 Q97.3 66.6 91.4 70.0 Q92.5 76.7 86.0 78.7 Q85.5 85.5 78.7 86.0 Q76.7 92.5 70.0 91.4 Q66.6 97.3 60.2 94.8 Q55.6 99.8 50.0 96.0 Q44.4 99.8 39.8 94.8 Q33.4 97.3 30.0 91.4 Q23.3 92.5 21.3 86.0 Q14.5 85.5 14.0 78.7 Q7.5 76.7 8.6 70.0 Q2.7 66.6 5.2 60.2 Q0.2 55.6 4.0 50.0 Q0.2 44.4 5.2 39.8 Q2.7 33.4 8.6 30.0 Q7.5 23.3 14.0 21.3 Q14.5 14.5 21.3 14.0 Q23.3 7.5 30.0 8.6 Q33.4 2.7 39.8 5.2 Q44.4 0.2 50.0 4.0 Q55.6 0.2 60.2 5.2 Q66.6 2.7 70.0 8.6 Q76.7 7.5 78.7 14.0 Q85.5 14.5 86.0 21.3 Q92.5 23.3 91.4 30.0 Q97.3 33.4 94.8 39.8 Q99.8 44.4 96.0 50.0 Z" fill={c} filter={wash("a")} />
        <g fill="var(--aged-ivory)" opacity={0.9}><circle key={0} cx={90.0} cy={50.0} r={2.2} /><circle key={1} cx={89.0} cy={58.9} r={2.2} /><circle key={2} cx={86.0} cy={67.4} r={2.2} /><circle key={3} cx={81.3} cy={74.9} r={2.2} /><circle key={4} cx={74.9} cy={81.3} r={2.2} /><circle key={5} cx={67.4} cy={86.0} r={2.2} /><circle key={6} cx={58.9} cy={89.0} r={2.2} /><circle key={7} cx={50.0} cy={90.0} r={2.2} /><circle key={8} cx={41.1} cy={89.0} r={2.2} /><circle key={9} cx={32.6} cy={86.0} r={2.2} /><circle key={10} cx={25.1} cy={81.3} r={2.2} /><circle key={11} cx={18.7} cy={74.9} r={2.2} /><circle key={12} cx={14.0} cy={67.4} r={2.2} /><circle key={13} cx={11.0} cy={58.9} r={2.2} /><circle key={14} cx={10.0} cy={50.0} r={2.2} /><circle key={15} cx={11.0} cy={41.1} r={2.2} /><circle key={16} cx={14.0} cy={32.6} r={2.2} /><circle key={17} cx={18.7} cy={25.1} r={2.2} /><circle key={18} cx={25.1} cy={18.7} r={2.2} /><circle key={19} cx={32.6} cy={14.0} r={2.2} /><circle key={20} cx={41.1} cy={11.0} r={2.2} /><circle key={21} cx={50.0} cy={10.0} r={2.2} /><circle key={22} cx={58.9} cy={11.0} r={2.2} /><circle key={23} cx={67.4} cy={14.0} r={2.2} /><circle key={24} cx={74.9} cy={18.7} r={2.2} /><circle key={25} cx={81.3} cy={25.1} r={2.2} /><circle key={26} cx={86.0} cy={32.6} r={2.2} /><circle key={27} cx={89.0} cy={41.1} r={2.2} /></g>
        <circle cx={50} cy={50} r={34} fill="none" stroke="var(--aged-ivory)" strokeWidth={1.2} strokeDasharray="2 2.4" opacity={0.9} />
        <g fill="none" stroke="var(--aged-ivory)" strokeWidth={1} opacity={0.85}><ellipse key={0} cx={50} cy={31} rx={4.2} ry={11} transform="rotate(0 50 50)" /><ellipse key={1} cx={50} cy={31} rx={4.2} ry={11} transform="rotate(30 50 50)" /><ellipse key={2} cx={50} cy={31} rx={4.2} ry={11} transform="rotate(60 50 50)" /><ellipse key={3} cx={50} cy={31} rx={4.2} ry={11} transform="rotate(90 50 50)" /><ellipse key={4} cx={50} cy={31} rx={4.2} ry={11} transform="rotate(120 50 50)" /><ellipse key={5} cx={50} cy={31} rx={4.2} ry={11} transform="rotate(150 50 50)" /><ellipse key={6} cx={50} cy={31} rx={4.2} ry={11} transform="rotate(180 50 50)" /><ellipse key={7} cx={50} cy={31} rx={4.2} ry={11} transform="rotate(210 50 50)" /><ellipse key={8} cx={50} cy={31} rx={4.2} ry={11} transform="rotate(240 50 50)" /><ellipse key={9} cx={50} cy={31} rx={4.2} ry={11} transform="rotate(270 50 50)" /><ellipse key={10} cx={50} cy={31} rx={4.2} ry={11} transform="rotate(300 50 50)" /><ellipse key={11} cx={50} cy={31} rx={4.2} ry={11} transform="rotate(330 50 50)" /></g>
        <g fill="var(--aged-ivory)" opacity={0.85}><circle key={0} cx={77.0} cy={50.0} r={1.3} /><circle key={1} cx={75.7} cy={58.3} r={1.3} /><circle key={2} cx={71.8} cy={65.9} r={1.3} /><circle key={3} cx={65.9} cy={71.8} r={1.3} /><circle key={4} cx={58.3} cy={75.7} r={1.3} /><circle key={5} cx={50.0} cy={77.0} r={1.3} /><circle key={6} cx={41.7} cy={75.7} r={1.3} /><circle key={7} cx={34.1} cy={71.8} r={1.3} /><circle key={8} cx={28.2} cy={65.9} r={1.3} /><circle key={9} cx={24.3} cy={58.3} r={1.3} /><circle key={10} cx={23.0} cy={50.0} r={1.3} /><circle key={11} cx={24.3} cy={41.7} r={1.3} /><circle key={12} cx={28.2} cy={34.1} r={1.3} /><circle key={13} cx={34.1} cy={28.2} r={1.3} /><circle key={14} cx={41.7} cy={24.3} r={1.3} /><circle key={15} cx={50.0} cy={23.0} r={1.3} /><circle key={16} cx={58.3} cy={24.3} r={1.3} /><circle key={17} cx={65.9} cy={28.2} r={1.3} /><circle key={18} cx={71.8} cy={34.1} r={1.3} /><circle key={19} cx={75.7} cy={41.7} r={1.3} /></g>
        <circle cx={50} cy={50} r={6} fill="var(--aged-ivory)" opacity={0.85} />
        <path d="M96.0 50.0 Q99.8 55.6 94.8 60.2 Q97.3 66.6 91.4 70.0 Q92.5 76.7 86.0 78.7 Q85.5 85.5 78.7 86.0 Q76.7 92.5 70.0 91.4 Q66.6 97.3 60.2 94.8 Q55.6 99.8 50.0 96.0 Q44.4 99.8 39.8 94.8 Q33.4 97.3 30.0 91.4 Q23.3 92.5 21.3 86.0 Q14.5 85.5 14.0 78.7 Q7.5 76.7 8.6 70.0 Q2.7 66.6 5.2 60.2 Q0.2 55.6 4.0 50.0 Q0.2 44.4 5.2 39.8 Q2.7 33.4 8.6 30.0 Q7.5 23.3 14.0 21.3 Q14.5 14.5 21.3 14.0 Q23.3 7.5 30.0 8.6 Q33.4 2.7 39.8 5.2 Q44.4 0.2 50.0 4.0 Q55.6 0.2 60.2 5.2 Q66.6 2.7 70.0 8.6 Q76.7 7.5 78.7 14.0 Q85.5 14.5 86.0 21.3 Q92.5 23.3 91.4 30.0 Q97.3 33.4 94.8 39.8 Q99.8 44.4 96.0 50.0 Z" {...outline} opacity={0.3} />
      </>
    ),
  },
  sprig: {
    vb: "0 0 40 90",
    draw: (c) => (
      <>
        <path d="M20 88 C19 70 22 52 20 30" fill="none" stroke="var(--botanical-green)" strokeWidth={1.6} strokeLinecap="round" filter={wash("b")} />
        <path d="M20 70 C10 66 5 58 6 50 C14 54 19 61 20 70z M20 56 C30 52 35 44 34 36 C26 40 21 47 20 56z" fill="var(--botanical-green)" fillOpacity={0.8} filter={wash("a")} />
        <path d="M20 31 C13 30 10 20 12 10 C15 16 18 18 20 18 C22 18 25 16 28 10 C30 20 27 30 20 31z" fill={c} fillOpacity={0.9} filter={wash("c")} />
        <path d="M20 31 C17 24 17 14 20 6 C23 14 23 24 20 31z" fill={c} fillOpacity={0.75} filter={wash("b")} />
        <path d="M20 29 V12 M16 26 L14 16 M24 26 L26 16" stroke="var(--wine)" strokeWidth={0.5} opacity={0.35} fill="none" filter={pencil} />
      </>
    ),
  },
  leaf: {
    vb: "0 0 30 60",
    draw: (c) => (
      <>
        <path d="M15 58 C3 44 2 20 15 2 C28 20 27 44 15 58z" fill={c} fillOpacity={0.85} filter={wash("a")} />
        <path d="M15 58 V6 M15 44 L7 36 M15 34 L23 26 M15 24 L8 17 M15 48 L23 40" stroke="var(--aged-ivory)" strokeWidth={0.8} opacity={0.6} fill="none" filter={pencil} />
        <path d="M15 58 C3 44 2 20 15 2 C28 20 27 44 15 58z" {...outline} opacity={0.35} />
      </>
    ),
  },
  bow: {
    vb: "0 0 60 50",
    draw: (c) => (
      <>
        <path d="M30 20 C20 4 4 4 4 16 C4 28 20 28 30 20z M30 20 C40 4 56 4 56 16 C56 28 40 28 30 20z" fill={c} fillOpacity={0.88} filter={wash("a")} />
        <path d="M28 21 C24 32 18 40 12 48 L18 48 C22 40 27 32 30 24z M32 21 C36 32 42 40 48 48 L42 48 C38 40 33 32 30 24z" fill={c} fillOpacity={0.75} filter={wash("b")} />
        <ellipse cx={30} cy={20} rx={5} ry={4.5} fill={c} filter={wash("c")} />
        <path d="M30 20 C20 4 4 4 4 16 C4 28 20 28 30 20z M30 20 C40 4 56 4 56 16 C56 28 40 28 30 20z" {...outline} opacity={0.4} />
      </>
    ),
  },
  seal: {
    vb: "0 0 40 40",
    draw: (c) => (
      <>
        <path d="M20 2 C27 1 34 6 37 12 C40 19 39 27 34 33 C29 38 21 40 14 37 C7 34 2 27 2 20 C3 12 9 4 20 2z" fill={c} filter={wash("c")} />
        <circle cx={20} cy={20} r={11} fill="none" stroke="var(--wine)" strokeWidth={1.2} opacity={0.45} />
        <path d="M20 26 C14 21 13 16 16.5 14.5 C18.5 13.7 20 15.5 20 17 C20 15.5 21.5 13.7 23.5 14.5 C27 16 26 21 20 26z" fill="var(--wine)" opacity={0.45} />
        <path d="M12 9 C14 7 17 6 19 6" stroke="var(--aged-ivory)" strokeWidth={1.4} strokeLinecap="round" opacity={0.45} fill="none" />
      </>
    ),
  },
  stamp: {
    vb: "0 0 40 48",
    draw: (c) => (
      <>
        <path d="M2 2 h36 v44 h-36z" fill="var(--aged-ivory)" />
        <g fill="color-mix(in srgb, var(--walnut) 40%, var(--aged-ivory))">{Array.from({ length: 9 }, (_, i) => <circle key={"t" + i} cx={3 + i * 4.25} cy={2} r={1.4} />)}{Array.from({ length: 9 }, (_, i) => <circle key={"b" + i} cx={3 + i * 4.25} cy={46} r={1.4} />)}{Array.from({ length: 11 }, (_, i) => <circle key={"l" + i} cx={2} cy={3 + i * 4.2} r={1.4} />)}{Array.from({ length: 11 }, (_, i) => <circle key={"r" + i} cx={38} cy={3 + i * 4.2} r={1.4} />)}</g>
        <rect x={7} y={7} width={26} height={30} fill={c} fillOpacity={0.85} filter={wash("a")} />
        <path d="M20 31 C14 27 12 22 15 18 C12 14 16 10 20 13 C24 10 28 14 25 18 C28 22 26 27 20 31z" fill="var(--aged-ivory)" opacity={0.75} />
        <path d="M20 31 V36" stroke="var(--aged-ivory)" strokeWidth={1} opacity={0.7} />
        <path d="M9 41 h12" stroke="var(--wine)" strokeWidth={0.8} opacity={0.4} filter={pencil} />
        <path d="M2 2 h36 v44 h-36z" {...outline} opacity={0.3} />
      </>
    ),
  },
  twine: {
    vb: "0 0 80 40",
    draw: (c) => (
      <path
        d="M2 30 C14 8 26 36 34 20 C40 8 52 6 50 18 C48 30 36 26 42 16 C48 6 62 30 78 12"
        fill="none"
        stroke={c}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeDasharray="3 1.2"
        filter={pencil}
      />
    ),
  },
  heart: {
    vb: "0 0 40 36",
    draw: (c) => (
      <>
        <path d="M20 34 C6 24 1 15 4 8 C7 2 15 1 20 8 C25 1 33 2 36 8 C39 15 34 24 20 34z" fill={c} fillOpacity={0.9} filter={wash("b")} />
        <path d="M20 29 C10 22 7 16 9 11 C11 7 16 7 20 12 C24 7 29 7 31 11 C33 16 30 22 20 29z" fill="none" stroke="var(--aged-ivory)" strokeWidth={1} strokeDasharray="1.6 1.6" opacity={0.85} />
      </>
    ),
  },
  button: {
    vb: "0 0 30 30",
    draw: (c) => (
      <>
        <circle cx={15} cy={15} r={13} fill={c} filter={wash("a")} />
        <circle cx={15} cy={15} r={9} fill="none" stroke="var(--wine)" strokeWidth={0.8} opacity={0.35} />
        <g fill="var(--aged-ivory)" opacity={0.85}>
          <circle cx={12} cy={12} r={1.6} /><circle cx={18} cy={12} r={1.6} /><circle cx={12} cy={18} r={1.6} /><circle cx={18} cy={18} r={1.6} />
        </g>
        <path d="M12 12 L18 18 M18 12 L12 18" stroke="var(--wine)" strokeWidth={0.7} opacity={0.5} />
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
  doily: "color-mix(in srgb, white 55%, var(--aged-ivory))",
  sprig: "var(--vermilion)",
  leaf: "var(--botanical-green)",
  bow: "var(--vermilion)",
  seal: "var(--wine)",
  stamp: "var(--powder-blue)",
  twine: "var(--walnut)",
  heart: "var(--vermilion)",
  button: "var(--brass)",
};

/** Small pieces read better a touch larger than life. */
const scale: Partial<Record<StationeryKind, number>> = { "push-pin": 1.45, "paper-clip": 1.4, "binder-clip": 1.35, "bulldog-clip": 1.15, "safety-pin": 1.2, sticky: 1.2, peg: 1.2, stamp: 1.45, seal: 1.35, heart: 1.3, button: 1.4, sprig: 1.35, leaf: 1.3, bow: 1.2 };

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
