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
    box: [22, 116],
    draw: () => (
      <>
        <P d="M-19 0L-7 -24M19 0L7 -24M0 0V-22" stroke={c.stone} width={3.4} o={1} />
        <F d={`${rect(-5.5, 0, -2.5, -80)}${rect(-1.5, 0, 1.5, -80)}${rect(2.5, 0, 5.5, -80)}`} fill={c.stone} w="b" />
        <F d="M0 -14a13 13 0 1 0 0.1 0Z" fill={c.rose} />
        <F d="M0 -59a9 9 0 1 0 0.1 0Z" fill={c.rose} w="c" />
        <F d={rect(-1.6, -74, 1.6, -96)} fill={c.stone} />
        <F d="M0 -88.5a4 4 0 1 0 0.1 0Z" fill={c.rose} w="b" />
        <P d="M0 -96V-116M-2 -102H2M-1.5 -108H1.5" stroke={c.wine} width={1.1} />
        <P d="M0 -14a13 13 0 1 0 0.1 0ZM0 -59a9 9 0 1 0 0.1 0ZM-12 -30H12M-8.4 -68H8.4" />
        <P d="M-7 -36a8 6 0 0 1 6 -6" stroke={c.pale} width={1.4} o={0.9} />
      </>
    ),
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

  elizabethTower: {
    box: [12, 122],
    draw: () => (
      <>
        <F d={rect(-7.5, 0, 7.5, -70)} fill={c.sand} />
        <F d={rect(-9.5, -70, 9.5, -88)} fill={c.sand} w="b" />
        <F d="M0 -85a6.2 6.2 0 1 0 0.1 0Z" fill={c.pale} w="c" />
        <F d={rect(-7.5, -88, 7.5, -97)} fill={c.stone} w="c" />
        <F d="M-8.5 -97L0 -120L8.5 -97Z" fill={c.slate} />
        <F d="M-9.5 -97L-8 -106L-6.5 -97ZM9.5 -97L8 -106L6.5 -97Z" fill={c.slate} w="b" />
        <P d="M0 -79V-75.5M0 -79L2.6 -80.4" width={0.9} />
        <P d={`${lines([[-4, -4, -4, -68], [0, -4, 0, -68], [4, -4, 4, -68]])}M-7.5 -24H7.5M-7.5 -48H7.5`} width={0.6} o={0.45} />
        <P d={arches(-4, 4, 4, -89, 7, 1.2)} width={0.7} />
        <P d="M0 -120V-124" width={1} />
        <P d="M-7.5 0V-70H-9.5V-88H-7.5V-97L0 -120L8.5 -97H7.5V-88H9.5V-70H7.5V0" />
      </>
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

  empireState: {
    box: [16, 126],
    draw: () => {
      const outline = "M-14 0V-20H-10V-62H-7V-80H-5V-86H-3.5V-96H-1.2V-112H1.2V-96H3.5V-86H5V-80H7V-62H10V-20H14V0";
      return (
        <>
          <F d={`${outline}Z`} fill={c.stone} />
          <F d="M3 -20V-62H10V-20ZM3 -62V-80H7V-62Z" fill={c.sand} w="c" o={0.6} />
          <P d={range(-8, 8, 2.7).map((x) => `M${x.toFixed(1)} -22V-60`).join("") + range(-5, 5, 2.5).map((x) => `M${x} -64V-78`).join("")} stroke={c.brass} width={0.6} o={0.7} />
          <P d="M0 -112V-124" width={1} />
          <P d={outline} />
        </>
      );
    },
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
};
