import type { ReactNode } from "react";
import { pencil, wash, type Wash } from "@/components/cabinet/PaintDefs";

/**
 * The atlas's miniature buildings, painted in the cabinet's hand: washes
 * of colour with coloured-pencil detail. Each is drawn standing on (0,0),
 * about 110 units tall, and is named in content/life.ts by its key.
 * `box` is its footprint (half-width, height), for the click target.
 *
 * To replace one with a painted image, give the landmark an `image` in
 * content/life.ts instead; nothing here needs to change.
 */

const c = {
  ivory: "var(--aged-ivory)",
  pale: "color-mix(in srgb, var(--aged-ivory) 55%, white)",
  stone: "color-mix(in srgb, var(--brass) 42%, var(--aged-ivory))",
  sand: "color-mix(in srgb, var(--brass) 70%, var(--aged-ivory))",
  brick: "color-mix(in srgb, var(--vermilion) 70%, var(--walnut))",
  rose: "color-mix(in srgb, var(--vermilion) 62%, var(--aged-ivory))",
  red: "var(--vermilion)",
  bronze: "color-mix(in srgb, var(--walnut) 70%, var(--brass))",
  copper: "color-mix(in srgb, var(--botanical-green) 55%, var(--powder-blue))",
  green: "var(--botanical-green)",
  glass: "color-mix(in srgb, var(--powder-blue) 72%, var(--aged-ivory))",
  blue: "var(--powder-blue)",
  slate: "color-mix(in srgb, var(--wine) 60%, var(--powder-blue))",
  roof: "color-mix(in srgb, var(--wine) 80%, var(--walnut))",
  brass: "var(--brass)",
  wine: "var(--wine)",
};

/** A washed shape. */
const F = ({ d, fill, w = "a", o }: { d: string; fill: string; w?: Wash; o?: number }) => <path d={d} fill={fill} fillOpacity={o} filter={wash(w)} />;
/** Coloured-pencil lines. */
const P = ({ d, stroke = c.wine, width = 0.9, o = 0.7 }: { d: string; stroke?: string; width?: number; o?: number }) => (
  <path d={d} stroke={stroke} strokeWidth={width} strokeOpacity={o} fill="none" strokeLinecap="round" strokeLinejoin="round" filter={pencil} />
);
const rect = (x0: number, y0: number, x1: number, y1: number) => `M${x0} ${y0}H${x1}V${y1}H${x0}Z`;
const lines = (pts: [number, number, number, number][]) => pts.map(([a, b, x, y]) => `M${a} ${b}L${x} ${y}`).join("");
const range = (from: number, to: number, step: number) => Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);
const onion = (x: number, y: number, r: number) =>
  `M${x - r} ${y}C${x - r * 1.35} ${y - r * 1.2} ${x - r * 0.25} ${y - r * 1.6} ${x} ${y - r * 2.7}C${x + r * 0.25} ${y - r * 1.6} ${x + r * 1.35} ${y - r * 1.2} ${x + r} ${y}Z`;
const arches = (x0: number, x1: number, step: number, y: number, h: number, w: number) =>
  range(x0, x1, step).map((x) => `M${x - w} ${y}V${y - h + w}A${w} ${w} 0 0 1 ${x + w} ${y - h + w}V${y}`).join("");

export interface LandmarkArt {
  box: [number, number];
  draw: () => ReactNode;
  /** A simpler shape for the white pencil outline, where fine detail would blur it. */
  silhouette?: () => ReactNode;
}

export const landmarkArt: Record<string, LandmarkArt> = {
  /* ---------- Eileen's eleven ---------- */

  orientalPearl: {
    // 东方明珠: three columns rising through two great pink spheres, three
    // raked legs to the lower one, five small spheres between them, the
    // little "space module" sphere above, and a long ringed mast.
    box: [16, 126],
    draw: () => {
      const small: [number, number][] = [[-4.4, -36], [4.4, -41], [-4.4, -46], [4.4, -51], [0, -56]];
      return (
        <>
          <F d={rect(-14, 0, 14, -3)} fill={c.stone} w="b" />
          <P d="M-11.5 -2.5L-5.4 -20M11.5 -2.5L5.4 -20" stroke={c.stone} width={2.6} o={1} />
          <P d="M-11.5 -2.5L-5.4 -20M11.5 -2.5L5.4 -20" width={0.6} o={0.6} />
          <F d={`${rect(-5.6, -2, -3.2, -72)}${rect(-1.2, -2, 1.2, -72)}${rect(3.2, -2, 5.6, -72)}`} fill={c.stone} w="b" />
          <F d="M0 -31.4a6.8 6.8 0 1 0 0.1 0Z" fill={c.rose} />
          <F d={small.map(([x, y]) => `M${x} ${y - 1.7}a1.7 1.7 0 1 0 0.1 0Z`).join("")} fill={c.rose} w="c" />
          <F d="M0 -76.2a6 6 0 1 0 0.1 0Z" fill={c.rose} w="c" />
          <F d={rect(-1.3, -76, 1.3, -89)} fill={c.stone} />
          <F d="M0 -92.6a2.6 2.6 0 1 0 0.1 0Z" fill={c.rose} w="b" />
          <P d="M0 -95V-124M-1.1 -101H1.1M-0.9 -108H0.9M-0.7 -115H0.7" width={1} />
          <P d={`M0 -31.4a6.8 6.8 0 1 0 0.1 0ZM0 -76.2a6 6 0 1 0 0.1 0ZM-6.6 -24.6H6.6M-5.9 -70.2H5.9M-5.6 -31.4V-63.8M5.6 -31.4V-63.8`} width={0.8} o={0.65} />
          <P d="M-4 -28a5 4 0 0 1 4 -3M-3.4 -73a4 3 0 0 1 3.4 -2.4" stroke={c.pale} width={1.1} o={0.9} />
        </>
      );
    },
  },

  eiffel: {
    box: [28, 122],
    draw: () => (
      <>
        <F d="M-27 0C-19 -18 -11 -40 -7 -68L-3.5 -100L-1.2 -112H1.2L3.5 -100L7 -68C11 -40 19 -18 27 0H16C11 -12 -11 -12 -16 0Z" fill={c.bronze} />
        <F d={`${rect(-17, -27, 17, -32)}${rect(-8.5, -64, 8.5, -68)}${rect(-4, -98, 4, -101)}`} fill={c.roof} w="b" />
        <P d="M-21 -10L-9 -27M-9 -10L-21 -27M21 -10L9 -27M9 -10L21 -27M-13 -32L-5 -64M-6 -32L-11 -64M13 -32L5 -64M6 -32L11 -64M-6 -68L-2 -98M6 -68L2 -98M-4 -80H4M-3 -90H3" width={0.7} o={0.6} />
        <P d="M0 -112V-121" width={1} />
        <P d="M-27 0C-19 -18 -11 -40 -7 -68L-3.5 -100L-1.2 -112H1.2L3.5 -100L7 -68C11 -40 19 -18 27 0M16 0C11 -12 -11 -12 -16 0" />
      </>
    ),
  },

  chinaResources: {
    // 华润大厦, "the spring bamboo shoot": a tapering, ribbed shoot that
    // swells just above its base and closes to a point.
    box: [18, 128],
    draw: () => (
      <>
        <F d={rect(-19, 0, 19, -4)} fill={c.stone} w="b" />
        <F d="M-12.5 -4C-15.5 -28 -15.5 -56 -10 -86C-7 -103 -3.6 -115 0 -126C3.6 -115 7 -103 10 -86C15.5 -56 15.5 -28 12.5 -4Z" fill={c.glass} />
        <F d="M2 -6C6 -40 6 -80 0 -122C9 -100 13 -70 12.5 -40C12.3 -24 12 -12 11 -6Z" fill={c.blue} w="c" o={0.55} />
        {/* the white ribs that gather at the crown */}
        <P
          d={[-11, -7.5, -4, -0.5, 3, 6.5, 10]
            .map((x) => `M${x} -4C${x * 1.22} -40 ${x * 0.9} -88 0 -125`)
            .join("")}
          stroke={c.pale}
          width={1.3}
          o={0.95}
        />
        <P d={[-9, -2, 5, 11].map((x) => `M${x} -4C${x * 1.2} -40 ${x * 0.85} -88 0 -125`).join("")} width={0.6} o={0.45} />
        <P d="M-12.5 -4C-15.5 -28 -15.5 -56 -10 -86C-7 -103 -3.6 -115 0 -126C3.6 -115 7 -103 10 -86C15.5 -56 15.5 -28 12.5 -4" />
      </>
    ),
  },

  bankOfChina: {
    box: [16, 118],
    draw: () => (
      <>
        <F d={rect(-15, 0, 15, -5)} fill={c.stone} w="b" />
        <F d="M-12 -5V-62L1 -76V-90L12 -102V-5Z" fill={c.glass} />
        <F d="M1 -76V-90L12 -102V-5H1Z" fill={c.blue} w="c" o={0.7} />
        <P d="M-12 -5L12 -31M-12 -31L12 -5M-12 -31L12 -57M-12 -57L12 -31M-12 -57L1 -71M1 -57L12 -66M12 -57L1 -76M1 -76L12 -88M1 -88L12 -76" stroke={c.pale} width={1.5} o={0.95} />
        <P d="M-12 -31H12M-12 -57H12M1 -62V-5" width={0.6} o={0.5} />
        <P d="M7 -96V-116M10.5 -99V-112" width={1} />
        <P d="M-12 -5V-62L1 -76V-90L12 -102V-5" />
      </>
    ),
  },

  londonEye: {
    // The London Eye: a great spoked rim with its glass capsules, held from
    // one side by a raked A-frame on the South Bank, the Thames below.
    box: [54, 112],
    draw: () => {
      const R = 48, cy = -60;
      const pods = range(0, 31, 1).map((i) => [Math.cos((i / 32) * Math.PI * 2) * (R + 2.6), cy + Math.sin((i / 32) * Math.PI * 2) * (R + 2.6)]);
      return (
        <>
          <F d="M-54 0Q-27 -3 0 0T54 0V4H-54Z" fill={c.blue} w="c" o={0.8} />
          <F d={`M0 ${cy}m-${R} 0a${R} ${R} 0 1 0 ${R * 2} 0a${R} ${R} 0 1 0 -${R * 2} 0Z`} fill={c.glass} w="b" o={0.35} />
          <P d={`M0 ${cy}m-${R} 0a${R} ${R} 0 1 0 ${R * 2} 0a${R} ${R} 0 1 0 -${R * 2} 0`} stroke={c.slate} width={1.6} o={0.85} />
          <P d={`M0 ${cy}m-${R - 3} 0a${R - 3} ${R - 3} 0 1 0 ${(R - 3) * 2} 0a${R - 3} ${R - 3} 0 1 0 -${(R - 3) * 2} 0`} stroke={c.slate} width={0.6} o={0.6} />
          <P d={range(0, 15, 1).map((i) => { const t = (i / 16) * Math.PI * 2; return `M${Math.cos(t) * (R - 3)} ${cy + Math.sin(t) * (R - 3)}L${-Math.cos(t) * (R - 3)} ${cy - Math.sin(t) * (R - 3)}`; }).join("")} stroke={c.slate} width={0.35} o={0.5} />
          <F d={pods.map(([x, y]) => `M${x} ${y}m-2.2 0a2.2 1.7 0 1 0 4.4 0a2.2 1.7 0 1 0 -4.4 0Z`).join("")} fill={c.pale} w="c" />
          <P d={pods.map(([x, y]) => `M${x} ${y}m-2.2 0a2.2 1.7 0 1 0 4.4 0a2.2 1.7 0 1 0 -4.4 0`).join("")} width={0.5} o={0.6} />
          <F d={`M0 ${cy}m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0Z`} fill={c.red} w="c" />
          <F d={`M-2 ${cy}L-30 0H-25L1 ${cy + 2}ZM2 ${cy}L-12 0H-7L4 ${cy + 3}Z`} fill={c.bronze} w="b" />
          <P d={`M-2 ${cy}L-30 0M2 ${cy}L-12 0M-24 -18H-15`} width={1} />
          <F d={rect(-36, 0, 8, -3)} fill={c.stone} w="b" />
        </>
      );
    },
    silhouette: () => (
      <g fill="none" stroke="#000" strokeLinecap="round">
        <circle cx={0} cy={-60} r={50.5} strokeWidth={5} />
        <path d="M-2 -60L-30 0M2 -60L-12 0M-36 -1.5H8" strokeWidth={3} />
      </g>
    ),
  },

  oldStateHouse: {
    box: [26, 88],
    draw: () => (
      <>
        <F d={rect(-24, 0, 24, -36)} fill={c.brick} />
        <F d="M-24 -36V-41H-15V-46H-6V-51H6V-46H15V-41H24V-36Z" fill={c.brick} w="b" />
        <F d={`${rect(-5.5, -51, 5.5, -59)}${rect(-4.2, -59, 4.2, -67)}${rect(-3, -67, 3, -73)}`} fill={c.pale} w="c" />
        <F d="M-3 -73Q0 -79 3 -73Z" fill={c.copper} />
        <F d="M-22 -43a2.6 2.6 0 1 0 0.1 0ZM22 -43a2.6 2.6 0 1 0 0.1 0Z" fill={c.brass} w="c" />
        <F d={`${rect(-20, -8, -15, -16)}${rect(-11, -8, -6, -16)}${rect(6, -8, 11, -16)}${rect(15, -8, 20, -16)}${rect(-20, -22, -15, -30)}${rect(-11, -22, -6, -30)}${rect(6, -22, 11, -30)}${rect(15, -22, 20, -30)}`} fill={c.pale} w="b" />
        <P d="M-3 0V-10A3 3 0 0 1 3 -10V0M-6 -19H6M-24 -19H24" width={0.8} />
        <P d={arches(-3, 3, 3, -60, 5, 1)} width={0.6} />
        <P d="M0 -79V-88M-2 -84H2" width={1} />
        <P d="M-24 0V-41H-15V-46H-6V-51H-5.5V-59H-4.2V-67H-3V-73Q0 -79 3 -73V-67H4.2V-59H5.5V-51H6V-46H15V-41H24V0" />
      </>
    ),
  },

  griffith: {
    box: [40, 64],
    draw: () => (
      <>
        <F d="M-42 3C-28 -9 -12 -10 0 -10C12 -10 28 -9 42 3Z" fill={c.green} w="b" o={0.85} />
        <F d={`${rect(-31, -6, 31, -18)}${rect(-15, -6, 15, -26)}`} fill={c.pale} />
        <F d="M-13 -26A13 12 0 0 1 13 -26Z" fill={c.copper} w="c" />
        <F d="M-30.5 -18A5 5 0 0 1 -20.5 -18ZM20.5 -18A5 5 0 0 1 30.5 -18Z" fill={c.copper} w="b" />
        <P d={`${lines([[-11, -8, -11, -24], [-7, -8, -7, -24], [-3, -8, -3, -24], [3, -8, 3, -24], [7, -8, 7, -24], [11, -8, 11, -24]])}M-15 -24H15`} width={0.6} o={0.5} />
        <P d="M0 -38V-41M-2 -6V-13A2 2 0 0 1 2 -13V-6" width={0.8} />
        <P d="M-31 -6V-18H-30.5A5 5 0 0 1 -20.5 -18H-15V-26A13 12 0 0 1 15 -26V-18H20.5A5 5 0 0 1 30.5 -18H31V-6" />
      </>
    ),
  },

  liberty: {
    // The Statue of Liberty on her pedestal and star-shaped fort.
    box: [20, 124],
    draw: () => (
      <>
        <F d="M-24 0L-20 -4H20L24 0ZM-17 -4L-14 -8H14L17 -4Z" fill={c.stone} w="b" />
        <F d={`${rect(-9.5, -8, 9.5, -14)}${rect(-8, -14, 8, -36)}${rect(-9.5, -36, 9.5, -40)}`} fill={c.sand} />
        <P d={`${arches(-4, 4, 4, -18, 9, 1.4)}M-8 -30H8`} width={0.6} o={0.5} />
        {/* the figure, in weathered copper */}
        <F
          d="M-6.5 -40C-6 -52 -6.4 -64 -4.6 -76C-4 -82 -3 -86 -2.6 -88L-1.6 -89.5H2.2L3.2 -86C4.2 -82 4.6 -76 4.8 -68C5.4 -58 6.2 -48 6.8 -40Z"
          fill={c.copper}
        />
        <F d="M2.2 -86L4.6 -100L6.6 -110L8.2 -109.5L6.8 -99L4.8 -84Z" fill={c.copper} w="b" />
        <F d="M0.2 -93.6a3 3.2 0 1 0 0.1 0Z" fill={c.copper} w="c" />
        <F d="M-6.4 -70L-9.6 -66L-8.8 -58L-5 -61Z" fill={c.copper} w="c" />
        <F d="M7.4 -110.5C6 -113 7.2 -116 8.4 -118.5C9.2 -116 10.6 -113.5 9 -110.5Z" fill={c.brass} />
        <P d="M-2.8 -95.4L-6 -98.6M-1.6 -96.6L-3.2 -101M0.2 -97L0.2 -101.6M2 -96.6L3.6 -101M3.2 -95.4L6.4 -98.4" stroke={c.copper} width={0.9} o={1} />
        <P d="M-3 -78C-2 -66 -1 -54 0 -42M1.4 -80C2.6 -66 3.8 -54 4.8 -42M-5 -50C-2 -52 2 -52 6 -50M6.6 -110.8H9.4" width={0.6} o={0.55} />
        <P d="M-6.5 -40C-6 -52 -6.4 -64 -4.6 -76C-4 -82 -3 -86 -2.6 -88M3.2 -86C4.2 -82 4.6 -76 4.8 -68C5.4 -58 6.2 -48 6.8 -40" width={0.8} />
      </>
    ),
  },

  tokyoTower: {
    box: [26, 122],
    draw: () => (
      <>
        <F d="M-25 0C-17 -22 -10 -48 -6 -78L-2.5 -104H2.5L6 -78C10 -48 17 -22 25 0H15C10 -12 -10 -12 -15 0Z" fill={c.red} />
        <F d={`${rect(-12, -40, 12, -47)}${rect(-5.5, -80, 5.5, -84)}${rect(-9, -20, 9, -24)}${rect(-3.6, -94, 3.6, -97)}`} fill={c.pale} w="b" />
        <P d="M-19 -10L-9 -24M-9 -10L-19 -24M19 -10L9 -24M9 -10L19 -24M-10 -47L-5 -78M-5 -47L-9 -78M10 -47L5 -78M5 -47L9 -78" width={0.7} o={0.55} />
        <P d="M0 -104V-121M-1 -110H1" width={1.1} stroke={c.red} o={0.9} />
        <P d="M-25 0C-17 -22 -10 -48 -6 -78L-2.5 -104H2.5L6 -78C10 -48 17 -22 25 0M15 0C10 -12 -10 -12 -15 0" />
      </>
    ),
  },

  yasaka: {
    // 八坂の塔: five storeys of deep, upturned roofs and a bronze finial.
    box: [22, 116],
    draw: () => {
      const tiers = [0, 1, 2, 3, 4].map((i) => ({ y: -6 - i * 16, ww: 10.5 - i * 1.1, w: 21 - i * 2 }));
      const roof = (y: number, w: number) => `M${-w} ${y - 13}Q${-w * 0.72} ${y - 10} ${-w * 0.45} ${y - 13}L0 ${y - 19}L${w * 0.45} ${y - 13}Q${w * 0.72} ${y - 10} ${w} ${y - 13}L${w * 0.84} ${y - 9.5}H${-w * 0.84}Z`;
      return (
        <>
          <F d={rect(-16, 0, 16, -6)} fill={c.stone} w="b" />
          {tiers.map((t, i) => (
            <g key={i}>
              <F d={rect(-t.ww, t.y, t.ww, t.y - 11)} fill={c.red} w="c" />
              <F d={roof(t.y, t.w)} fill={c.roof} />
              <P d={`M${-t.ww * 0.4} ${t.y}V${t.y - 9}M${t.ww * 0.4} ${t.y}V${t.y - 9}`} stroke={c.pale} width={0.8} o={0.8} />
              <P d={roof(t.y, t.w)} width={0.7} o={0.6} />
            </g>
          ))}
          <P d="M0 -89V-114" stroke={c.brass} width={1.6} o={1} />
          <P d={range(-93, -109, -4).map((y) => `M-2.2 ${y}H2.2`).join("")} stroke={c.brass} width={1} o={1} />
        </>
      );
    },
  },

  goldenGate: {
    box: [58, 80],
    silhouette: () => (
      <g fill="#000" stroke="#000" strokeLinecap="round">
        <path d="M-58 -16H58" strokeWidth={3.2} />
        <path d="M-58 -24Q-42 -34 -28 -65Q0 -10 28 -65Q42 -34 58 -24" strokeWidth={1.6} fill="none" />
        {[-28, 28].map((x) => (
          <path key={x} d={`M${x - 4.3} 4V-67H${x + 4.3}V4Z`} />
        ))}
      </g>
    ),
    draw: () => {
      const legs = [-28, 28].flatMap((x) => [x - 3, x + 3]);
      return (
        <>
          <P d="M-58 -16H58" stroke={c.red} width={3.2} o={1} />
          <F d={legs.map((x) => rect(x - 1.3, 4, x + 1.3, -66)).join("")} fill={c.red} />
          <F d={[-28, 28].map((x) => `${rect(x - 4.3, -64, x + 4.3, -67)}${rect(x - 4.3, -48, x + 4.3, -50)}${rect(x - 4.3, -31, x + 4.3, -33)}`).join("")} fill={c.red} w="b" />
          <P d="M-58 -24Q-42 -34 -28 -65Q0 -10 28 -65Q42 -34 58 -24" stroke={c.red} width={1.4} o={1} />
          <P d={range(-22, 22, 5.5).map((x) => `M${x} -16V${(-65 + 55 * (1 - (x / 28) ** 2)).toFixed(1)}`).join("") + range(-52, -34, 6).map((x) => `M${x} -16V${(-24 - (x + 58) * 0.42).toFixed(1)}M${-x} -16V${(-24 - (x + 58) * 0.42).toFixed(1)}`).join("")} stroke={c.red} width={0.5} o={0.8} />
          <P d={legs.map((x) => `M${x - 1.3} 4V-66H${x + 1.3}V4`).join("")} width={0.6} o={0.6} />
          <P d="M-56 2Q-50 0 -44 2T-32 2M30 3Q36 1 42 3T54 3M-12 2Q-6 0 0 2T12 2" stroke={c.blue} width={1} o={0.8} />
        </>
      );
    },
  },

  /* ---------- decorative only ---------- */

  colosseum: {
    box: [32, 40],
    draw: () => (
      <>
        <F d="M-31 0V-28Q0 -37 22 -29L24 -21L31 -19V0Z" fill={c.stone} />
        <F d="M-27 -28Q0 -33 21 -28Q0 -25 -27 -28Z" fill={c.bronze} w="c" />
        <P d={`${arches(-27, 21, 6, -2, 7, 2)}${arches(-27, 21, 6, -10, 7, 2)}${arches(-27, 15, 6, -18, 6, 2)}M-31 -9H31M-31 -17H24`} width={0.6} o={0.55} />
        <P d="M-31 0V-28Q0 -37 22 -29L24 -21L31 -19V0" />
      </>
    ),
  },

  sagrada: {
    box: [22, 94],
    draw: () => {
      const spires: [number, number][] = [[-15, 58], [-7.5, 74], [0, 92], [7.5, 74], [15, 58]];
      const spire = (x: number, h: number) => `M${x - 3.4} -20C${x - 3.4} ${-h * 0.6} ${x - 1.4} ${-h * 0.92} ${x} ${-h}C${x + 1.4} ${-h * 0.92} ${x + 3.4} ${-h * 0.6} ${x + 3.4} -20Z`;
      return (
        <>
          <F d={rect(-21, 0, 21, -24)} fill={c.sand} w="b" />
          <F d={spires.map(([x, h]) => spire(x, h)).join("")} fill={c.sand} />
          <F d={spires.map(([x, h]) => `M${x} ${-h - 1}a2 2 0 1 0 0.1 0Z`).join("")} fill={c.red} w="c" />
          <P d={`M-6 0V-12A6 6 0 0 1 6 -12V0${spires.map(([x, h]) => range(-28, -h * 0.75, -7).map((y) => `M${x - 1.6} ${y}H${x + 1.6}`).join("")).join("")}`} width={0.6} o={0.5} />
        </>
      );
    },
  },

  parthenon: {
    box: [32, 44],
    draw: () => (
      <>
        <F d={rect(-31, 0, 31, -5)} fill={c.stone} w="b" />
        <F d={range(-27, 27, 7.7).map((x) => rect(x - 1.6, -5, x + 1.6, -26)).join("")} fill={c.pale} />
        <F d={`${rect(-31, -26, 31, -31)}M-31 -31L0 -42L31 -31Z`} fill={c.stone} w="c" />
        <P d={`M-31 0H31M-31 -26H31M-31 -31L0 -42L31 -31M-23 -31L-14 -36`} width={0.7} />
      </>
    ),
  },

  pyramids: {
    box: [42, 44],
    draw: () => (
      <>
        <F d="M-42 0L-27 -22L-12 0Z" fill={c.sand} w="b" />
        <F d="M-27 -22L-12 0H-22Z" fill={c.bronze} w="c" o={0.6} />
        <F d="M-26 0L2 -42L30 0Z" fill={c.sand} />
        <F d="M2 -42L30 0H10Z" fill={c.bronze} w="c" o={0.6} />
        <P d="M-26 0L2 -42L30 0M2 -42L10 0M-42 0L-27 -22L-12 0" width={0.8} />
        <P d="M-18 -10H18M-11 -20H13M-5 -30H8" width={0.5} o={0.4} />
      </>
    ),
  },

  hagiaSophia: {
    box: [32, 60],
    draw: () => (
      <>
        <F d={rect(-24, 0, 24, -20)} fill={c.rose} />
        <F d={rect(-15, -20, 15, -27)} fill={c.rose} w="b" />
        <F d="M-24 -20A7 6 0 0 1 -12 -20ZM12 -20A7 6 0 0 1 24 -20Z" fill={c.glass} w="c" />
        <F d="M-15 -27A15 13 0 0 1 15 -27Z" fill={c.glass} />
        <F d={[-31, -27, 27, 31].map((x) => `${rect(x - 1.1, 0, x + 1.1, -48)}M${x - 1.4} -48L${x} -57L${x + 1.4} -48Z`).join("")} fill={c.pale} w="b" />
        <P d={`M-24 0V-20H-15V-27A15 13 0 0 1 15 -27V-20H24V0${arches(-9, 9, 4.5, -21, 5, 1.2)}M0 -40V-44`} width={0.7} />
      </>
    ),
  },

  stBasil: {
    box: [26, 92],
    draw: () => (
      <>
        <F d={rect(-24, 0, 24, -22)} fill={c.brick} />
        <F d={`${rect(-4, -22, 4, -58)}M-4.5 -58L0 -86L4.5 -58Z`} fill={c.sand} w="b" />
        <F d={`${rect(-18, -22, -12, -40)}${rect(12, -22, 18, -40)}${rect(-10, -22, -6, -48)}${rect(6, -22, 10, -48)}`} fill={c.rose} w="c" />
        <F d={onion(-15, -40, 5)} fill={c.green} />
        <F d={onion(15, -40, 5)} fill={c.blue} />
        <F d={onion(-8, -48, 3.6)} fill={c.red} w="b" />
        <F d={onion(8, -48, 3.6)} fill={c.brass} w="b" />
        <F d={onion(0, -86, 2)} fill={c.brass} w="c" />
        <P d={`${onion(-15, -40, 5)}${onion(15, -40, 5)}M-17 -44Q-15 -48 -13 -44M13 -44Q15 -48 17 -44M-20 0V-10A3 3 0 0 1 -14 -10V0M14 0V-10A3 3 0 0 1 20 -10V0`} width={0.6} o={0.6} />
      </>
    ),
  },

  tajMahal: {
    box: [30, 66],
    draw: () => (
      <>
        <F d={rect(-30, 0, 30, -4)} fill={c.stone} w="b" />
        <F d={`${rect(-17, -4, 17, -30)}${rect(-7, -30, 7, -34)}`} fill={c.pale} />
        <F d="M-10 -34C-14 -44 -7 -52 0 -58C7 -52 14 -44 10 -34Z" fill={c.pale} w="c" />
        <F d={[-12, 12].map((x) => `M${x - 3} -30C${x - 4} -34 ${x - 1} -36 ${x} -38C${x + 1} -36 ${x + 4} -34 ${x + 3} -30Z`).join("")} fill={c.pale} w="b" />
        <F d={[-27, 27].map((x) => `${rect(x - 1.4, -4, x + 1.4, -46)}M${x - 2.2} -46Q${x} -51 ${x + 2.2} -46Z`).join("")} fill={c.pale} w="c" />
        <P d="M-5 -4V-20Q0 -26 5 -20V-4M-14 -8V-14Q-12 -17 -10 -14V-8M10 -8V-14Q12 -17 14 -8V-8M0 -58V-64M-10 -34C-14 -44 -7 -52 0 -58C7 -52 14 -44 10 -34" width={0.7} />
        <P d="M-17 -4V-30H17V-4" stroke={c.brass} width={0.7} />
      </>
    ),
  },

  templeOfHeaven: {
    box: [30, 58],
    draw: () => {
      const roof = (y: number, w: number) => `M${-w} ${y}Q${-w * 0.5} ${y - 4} 0 ${y - 7}Q${w * 0.5} ${y - 4} ${w} ${y}Q0 ${y + 2} ${-w} ${y}Z`;
      return (
        <>
          <F d={`${rect(-29, 0, 29, -4)}${rect(-25, -4, 25, -8)}${rect(-21, -8, 21, -12)}`} fill={c.pale} w="b" />
          <F d={`${rect(-12, -12, 12, -22)}${rect(-9, -24, 9, -32)}${rect(-6, -34, 6, -41)}`} fill={c.red} w="c" />
          <F d={`${roof(-22, 19)}${roof(-32, 15)}${roof(-41, 11)}`} fill={c.slate} />
          <F d="M0 -50a2.6 2.6 0 1 0 0.1 0Z" fill={c.brass} w="c" />
          <P d={`${roof(-22, 19)}${roof(-32, 15)}${roof(-41, 11)}M0 -48V-53`} width={0.6} o={0.6} />
        </>
      );
    },
  },

  marinaBay: {
    box: [32, 64],
    draw: () => (
      <>
        <F d="M-21 0L-19 -56H-11L-12 0ZM-4 0L-4.5 -57H4.5L4 0ZM12 0L11 -57H19L21 0Z" fill={c.glass} />
        <F d="M-30 -57L31 -60L33 -56L-28 -54Z" fill={c.stone} w="b" />
        <P d="M-21 0L-19 -56M-11 -56L-12 0M-4 0L-4.5 -57M4.5 -57L4 0M12 0L11 -57M19 -57L21 0M-30 -57L31 -60" width={0.7} />
      </>
    ),
  },

  operaHouse: {
    box: [34, 42],
    draw: () => (
      <>
        <F d={rect(-33, 0, 33, -5)} fill={c.sand} w="b" />
        <F d="M-26 -5Q-24 -28 -6 -37Q-12 -18 -10 -5ZM-11 -5Q-5 -33 13 -40Q5 -20 7 -5ZM5 -5Q11 -25 27 -29Q21 -14 23 -5Z" fill={c.pale} />
        <P d="M-26 -5Q-24 -28 -6 -37Q-12 -18 -10 -5M-11 -5Q-5 -33 13 -40Q5 -20 7 -5M5 -5Q11 -25 27 -29Q21 -14 23 -5M-20 -9L-9 -30M-4 -9L8 -34M10 -9L22 -25" stroke={c.blue} width={0.7} o={0.8} />
      </>
    ),
  },

  redeemer: {
    box: [32, 58],
    draw: () => (
      <>
        <F d="M-32 2C-18 -10 -7 -24 0 -26C7 -24 18 -10 32 2Z" fill={c.green} w="b" o={0.85} />
        <F d={`${rect(-2.6, -26, 2.6, -31)}M-3.2 -31L-2.2 -50H2.2L3.2 -31Z${rect(-14, -47.6, 14, -45.4)}M0 -55.4a2.2 2.2 0 1 0 0.1 0Z`} fill={c.pale} />
        <P d="M-3.2 -31L-2.2 -50H2.2L3.2 -31M-14 -46.5H14" width={0.6} />
      </>
    ),
  },

  chichenItza: {
    box: [30, 42],
    draw: () => (
      <>
        <F d={[30, 25, 20, 15, 10].map((w, i) => rect(-w, -i * 6, w, -(i + 1) * 6)).join("")} fill={c.sand} />
        <F d={rect(-5.5, -30, 5.5, -39)} fill={c.stone} w="b" />
        <F d="M-3 0V-30H3V0Z" fill={c.bronze} w="c" o={0.7} />
        <P d={`M-30 0V-6H-25V-12H-20V-18H-15V-24H-10V-30H10V-24H15V-18H20V-12H25V-6H30V0M-2 -30V-35H2V-30`} width={0.7} />
      </>
    ),
  },

  koutoubia: {
    box: [12, 84],
    draw: () => (
      <>
        <F d={rect(-12, 0, 12, -5)} fill={c.sand} w="b" />
        <F d={rect(-7.5, -5, 7.5, -64)} fill={c.rose} />
        <F d={`${rect(-8.5, -64, 8.5, -67)}${rect(-4, -67, 4, -76)}`} fill={c.rose} w="c" />
        <F d="M-4 -76A4 3.4 0 0 1 4 -76Z" fill={c.copper} w="b" />
        <F d="M0 -81.4a1.4 1.4 0 1 0 0.1 0ZM0 -84.6a1.1 1.1 0 1 0 0.1 0Z" fill={c.brass} w="c" />
        <P d={`${arches(-3, 3, 6, -20, 9, 2)}${arches(-3, 3, 6, -40, 9, 2)}M-5 -54H5M-5 -58H5${range(-7, 7, 3.5).map((x) => `M${x} -64V-66`).join("")}`} width={0.6} o={0.6} />
        <P d="M-7.5 -5V-64M7.5 -64V-5" width={0.8} />
      </>
    ),
  },

  djenne: {
    box: [32, 58],
    draw: () => {
      const towers: [number, number][] = [[-20, 46], [0, 56], [20, 46]];
      return (
        <>
          <F d={rect(-32, 0, 32, -24)} fill={c.sand} />
          <F d={towers.map(([x, h]) => `M${x - 5} -24V${-h + 6}Q${x} ${-h - 2} ${x + 5} ${-h + 6}V-24Z`).join("")} fill={c.sand} w="b" />
          <F d={towers.map(([x, h]) => `M${x} ${-h - 1}a1.6 1.6 0 1 0 0.1 0Z`).join("")} fill={c.pale} w="c" />
          <P d={`${towers.flatMap(([x, h]) => range(-30, -h + 10, -7).map((y) => `M${x - 6.5} ${y}H${x - 5}M${x + 5} ${y}H${x + 6.5}`)).join("")}${range(-28, 28, 7).map((x) => `M${x} -24V-27`).join("")}M-4 0V-10H4V0`} stroke={c.bronze} width={0.9} o={0.9} />
          <P d="M-32 0V-24H32V0" width={0.7} o={0.6} />
        </>
      );
    },
  },

  kilimanjaro: {
    box: [44, 46],
    draw: () => (
      <>
        <F d="M-44 0L-12 -38Q0 -44 12 -38L44 0Z" fill={c.bronze} w="b" o={0.8} />
        <F d="M-12 -38Q0 -44 12 -38L8 -33L4 -35L0 -31L-5 -35L-9 -32Z" fill={c.pale} />
        <F d="M-44 0Q-20 -10 0 -6Q20 -10 44 0Z" fill={c.green} w="c" o={0.8} />
        <P d="M30 0V-12M24 -14Q30 -18 37 -14Q30 -12 24 -14Z" stroke={c.wine} width={0.9} />
        <F d="M23 -13Q30 -19 38 -13Q30 -11 23 -13Z" fill={c.green} w="c" />
        <P d="M-44 0L-12 -38Q0 -44 12 -38L44 0" width={0.7} o={0.55} />
      </>
    ),
  },

  capeLighthouse: {
    box: [22, 64],
    draw: () => (
      <>
        <F d="M-22 0C-18 -10 -8 -16 0 -16C10 -16 18 -8 22 0Z" fill={c.green} w="b" o={0.85} />
        <F d="M-4.5 -15L-3 -50H3L4.5 -15Z" fill={c.pale} />
        <F d="M-4.3 -22H4.3L4.1 -28H-4.1ZM-3.7 -36H3.7L3.5 -42H-3.5Z" fill={c.red} w="c" />
        <F d={`${rect(-3.6, -50, 3.6, -56)}M-4 -56L0 -61L4 -56Z`} fill={c.red} w="b" />
        <P d="M-4.5 -15L-3 -50H3L4.5 -15M-5 -50H5M-2 -51V-55M2 -51V-55" width={0.7} />
      </>
    ),
  },

  machuPicchu: {
    box: [38, 52],
    draw: () => (
      <>
        <F d="M-38 0L-16 -26L-6 -50L4 -34L18 -18L38 0Z" fill={c.green} />
        <F d="M-6 -50L4 -34L-2 -30L-10 -36Z" fill={c.copper} w="c" o={0.7} />
        <F d={`${rect(-30, 0, 30, -8)}`} fill={c.sand} w="b" />
        <F d={[-22, -12, -2, 8, 18].map((x) => `M${x} -8V-13L${x + 4} -16L${x + 8} -13V-8Z`).join("")} fill={c.stone} w="c" />
        <P d={`M-30 -3H30M-28 -6H28${[-22, -12, -2, 8, 18].map((x) => `M${x} -8V-13L${x + 4} -16L${x + 8} -13V-8`).join("")}`} width={0.6} o={0.6} />
        <P d="M-38 0L-16 -26L-6 -50L4 -34L18 -18L38 0" width={0.7} o={0.55} />
      </>
    ),
  },

  obelisco: {
    box: [12, 80],
    draw: () => (
      <>
        <F d={rect(-12, 0, 12, -4)} fill={c.stone} w="b" />
        <F d="M-5 -4L-3.2 -70L0 -76L3.2 -70L5 -4Z" fill={c.pale} />
        <P d="M-5 -4L-3.2 -70L0 -76L3.2 -70L5 -4M-3.2 -70H3.2M-0.8 -58H0.8V-61H-0.8Z" width={0.8} />
      </>
    ),
  },

  moai: {
    box: [26, 52],
    draw: () => {
      const head = (x: number, h: number) =>
        `M${x - 5} -6V${-h + 12}Q${x - 6} ${-h + 4} ${x - 3} ${-h}H${x + 4}Q${x + 6} ${-h + 4} ${x + 5.5} ${-h + 12}L${x + 7} ${-h + 18}L${x + 5} ${-h + 20}V-6Z`;
      return (
        <>
          <F d={rect(-26, 0, 26, -6)} fill={c.stone} w="b" />
          <F d={`${head(-14, 42)}${head(0, 48)}${head(14, 40)}`} fill={c.bronze} />
          <F d="M-3 -48H4V-53H-3Z" fill={c.brick} w="c" />
          <P d={`${[[-14, 42], [0, 48], [14, 40]].map(([x, h]) => `M${x - 2} ${-h + 10}H${x + 4}M${x + 2} ${-h + 12}V${-h + 19}M${x} ${-h + 23}H${x + 4}`).join("")}`} width={0.8} o={0.7} />
        </>
      );
    },
  },

  harpa: {
    // Harpa, Reykjavík: Olafur Eliasson's faceted glass façade.
    box: [36, 40],
    draw: () => (
      <>
        <F d="M-36 0V-20L-16 -34L20 -31L36 -16V0Z" fill={c.glass} />
        <F d="M-16 -34L20 -31L36 -16L4 -20Z" fill={c.blue} w="c" o={0.7} />
        <F d={[[-30, -6], [-18, -14], [-6, -8], [10, -12], [24, -6], [-24, -22], [2, -26]].map(([x, y]) => `M${x} ${y}l3 -2.4l3 2.4l-3 2.4Z`).join("")} fill={c.brass} w="b" o={0.8} />
        <P d={`${range(-30, 30, 6).map((x) => `M${x} 0L${x + 4} -18`).join("")}${range(-14, -2, 4).map((y) => `M-36 ${y}L36 ${y + 2}`).join("")}`} stroke={c.pale} width={0.7} o={0.9} />
        <P d="M-36 0V-20L-16 -34L20 -31L36 -16V0M4 -20L-16 -34M4 -20L36 -16" width={0.8} />
      </>
    ),
  },

  staveChurch: {
    box: [20, 76],
    draw: () => {
      const roof = (y: number, w: number, h: number) => `M${-w} ${y}L0 ${y - h}L${w} ${y}Z`;
      return (
        <>
          <F d={`${rect(-16, 0, 16, -14)}${rect(-11, -20, 11, -30)}${rect(-6, -36, 6, -46)}`} fill={c.bronze} />
          <F d={`${roof(-14, 20, 8)}${roof(-30, 14, 7)}${roof(-46, 9, 6)}M-3.6 -52L0 -74L3.6 -52Z`} fill={c.roof} w="b" />
          <P d="M-20 -14Q-23 -18 -21 -20M20 -14Q23 -18 21 -20M-14 -30Q-17 -34 -15 -36M14 -30Q17 -34 15 -36" stroke={c.roof} width={1.2} o={1} />
          <P d={`${range(-12, 12, 4).map((x) => `M${x} 0V-13`).join("")}M-2 0V-8A2 2 0 0 1 2 -8V0`} width={0.6} o={0.5} />
        </>
      );
    },
  },

  uluru: {
    box: [42, 26],
    draw: () => (
      <>
        <F d="M-42 0C-38 -14 -26 -22 -4 -22C20 -22 34 -14 42 0Z" fill={c.brick} />
        <F d="M10 -22C26 -20 36 -12 42 0H22C20 -8 16 -16 10 -22Z" fill={c.roof} w="c" o={0.4} />
        <P d={`${range(-30, 30, 7).map((x) => `M${x} -2Q${x + 2} -10 ${x + 1} ${-18 + Math.abs(x) / 5}`).join("")}`} width={0.6} o={0.5} />
        <P d="M-42 0C-38 -14 -26 -22 -4 -22C20 -22 34 -14 42 0" width={0.7} />
      </>
    ),
  },

  skyTower: {
    box: [10, 100],
    draw: () => (
      <>
        <F d="M-5 0L-2.2 -62H2.2L5 0Z" fill={c.pale} />
        <F d="M-7 -62H7L5 -68H-5ZM-4.4 -68H4.4L3.6 -72H-3.6Z" fill={c.glass} w="c" />
        <F d={rect(-1.4, -72, 1.4, -82)} fill={c.pale} w="b" />
        <P d="M0 -82V-100M-5 0L-2.2 -62M2.2 -62L5 0M-7 -62H7" width={0.8} />
      </>
    ),
  },

  boraBora: {
    box: [40, 48],
    draw: () => (
      <>
        <F d="M-24 -4L-10 -34L-4 -46L4 -30L18 -4Z" fill={c.green} w="b" />
        <F d="M-40 0Q0 -6 40 0Q0 4 -40 0Z" fill={c.blue} w="c" o={0.8} />
        <F d={[-26, 14, 28].map((x) => `${rect(x - 4.5, -6, x + 4.5, -11)}`).join("")} fill={c.sand} w="b" />
        <F d={[-26, 14, 28].map((x) => `M${x - 6} -11L${x} -17L${x + 6} -11Z`).join("")} fill={c.bronze} w="c" />
        <P d={`${[-26, 14, 28].map((x) => `M${x - 3} -6V0M${x + 3} -6V0`).join("")}M-34 0Q-36 -10 -32 -20`} width={0.7} />
        <F d="M-32 -20Q-38 -22 -42 -18Q-36 -20 -32 -20ZM-32 -20Q-26 -24 -22 -19Q-27 -21 -32 -20ZM-32 -20Q-33 -26 -29 -29Q-31 -24 -32 -20Z" fill={c.green} w="c" />
      </>
    ),
  },

  ulunDanu: {
    // Pura Ulun Danu Bratan, Bali: a tiered meru standing on the lake.
    box: [22, 66],
    draw: () => (
      <>
        <F d="M-22 0Q0 -4 22 0Q0 3 -22 0Z" fill={c.blue} w="c" o={0.8} />
        <F d={rect(-10, -1, 10, -8)} fill={c.stone} w="b" />
        <F d={range(0, 8, 1).map((i) => { const y = -8 - i * 5.6; const w = 17 - i * 1.6; return `M${-w} ${y}L${-w * 0.6} ${y - 4}H${w * 0.6}L${w} ${y}Z`; }).join("")} fill={c.roof} />
        <P d="M0 -58V-64" width={1} />
        <P d={range(0, 8, 1).map((i) => { const y = -8 - i * 5.6; const w = 17 - i * 1.6; return `M${-w} ${y}H${w}`; }).join("")} stroke={c.sand} width={0.7} o={0.9} />
      </>
    ),
  },

  alohaTower: {
    box: [18, 70],
    draw: () => (
      <>
        <F d={`${rect(-6, 0, 6, -52)}`} fill={c.pale} />
        <F d={`${rect(-7.5, -52, 7.5, -56)}M-6 -56L0 -66L6 -56Z`} fill={c.copper} w="b" />
        <F d="M0 -47a3 3 0 1 0 0.1 0Z" fill={c.ivory} w="c" />
        <P d="M-6 0V-52M6 -52V0M0 -44V-42M-2 -10H2V0H-2Z" width={0.7} />
        <P d="M14 0Q16 -14 12 -30" stroke={c.bronze} width={1.4} o={1} />
        <F d="M12 -30Q4 -32 0 -27Q6 -29 12 -30ZM12 -30Q20 -34 24 -28Q18 -30 12 -30ZM12 -30Q11 -37 15 -40Q13 -35 12 -30Z" fill={c.green} w="c" />
      </>
    ),
  },
};
