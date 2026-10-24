/**
 * The Poetry Garden's composition, drawn twice: once for wide screens and
 * once, taller, for phones. Vines are chains of cubic curves; flowers bloom
 * at points on them and verses float in the open spaces between.
 * Coordinates are in each layout's own space (W × H).
 */
export type Pt = [number, number];
/** A vine: start point, then groups of (control, control, end). */
export type Vine = Pt[];

export interface Layout {
  W: number;
  H: number;
  vines: Vine[];
  flowers: Pt[];
  verses: Pt[];
  leaf: number;
}

export const wide: Layout = {
  W: 1200,
  H: 760,
  leaf: 24,
  vines: [
    [[40, 760], [60, 600], [160, 560], [150, 440], [140, 320], [40, 300], [90, 180], [130, 90], [230, 80], [260, 140]],
    [[1160, 760], [1140, 620], [1040, 580], [1060, 460], [1080, 340], [1170, 300], [1110, 190], [1070, 110], [960, 90], [940, 150]],
    [[420, 760], [430, 680], [520, 650], [500, 580], [485, 520], [400, 520], [420, 470]],
    [[760, 760], [750, 690], [680, 660], [720, 600], [750, 555], [820, 560], [800, 500]],
    [[0, 40], [200, 80], [340, 10], [520, 56]],
    [[1200, 40], [1000, 80], [860, 10], [680, 56]],
  ],
  flowers: [
    [260, 140],
    [940, 150],
    [420, 470],
    [800, 500],
    [150, 440],
    [1060, 460],
  ],
  verses: [
    [600, 150],
    [345, 300],
    [865, 300],
    [600, 400],
    [270, 640],
    [935, 650],
  ],
};

export const tall: Layout = {
  W: 600,
  H: 1040,
  leaf: 30,
  vines: [
    [[20, 1040], [60, 880], [150, 860], [120, 740], [90, 620], [20, 600], [60, 480], [100, 360], [180, 350], [160, 250], [140, 170], [60, 150], [90, 80]],
    [[580, 1040], [540, 900], [450, 880], [480, 770], [510, 660], [580, 640], [540, 540], [500, 440], [420, 420], [450, 330], [480, 250], [560, 230], [520, 160]],
  ],
  flowers: [
    [90, 80],
    [520, 160],
    [160, 250],
    [540, 540],
    [60, 480],
    [480, 770],
  ],
  verses: [
    [310, 190],
    [290, 360],
    [310, 530],
    [290, 690],
    [310, 850],
    [300, 990],
  ],
};

/** Point and tangent angle (degrees) at t on one cubic segment. */
export function onCubic([p0, c1, c2, p1]: Pt[], t: number): { p: Pt; a: number } {
  const u = 1 - t;
  const x = u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p1[0];
  const y = u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p1[1];
  const dx = 3 * u * u * (c1[0] - p0[0]) + 6 * u * t * (c2[0] - c1[0]) + 3 * t * t * (p1[0] - c2[0]);
  const dy = 3 * u * u * (c1[1] - p0[1]) + 6 * u * t * (c2[1] - c1[1]) + 3 * t * t * (p1[1] - c2[1]);
  return { p: [x, y], a: (Math.atan2(dy, dx) * 180) / Math.PI };
}

export const segments = (v: Vine) => Array.from({ length: (v.length - 1) / 3 }, (_, i) => v.slice(i * 3, i * 3 + 4));

export const vinePath = (v: Vine) => `M${v[0][0]} ${v[0][1]}` + segments(v).map((s) => `C${s[1].join(" ")} ${s[2].join(" ")} ${s[3].join(" ")}`).join("");

/** Leaves along a vine, alternating sides; `at` is how far along (0–1) each grows. */
export function leavesOf(v: Vine, perSegment = 3) {
  const segs = segments(v);
  const out: { p: Pt; a: number; at: number; side: number }[] = [];
  segs.forEach((s, i) => {
    for (let k = 1; k <= perSegment; k++) {
      const t = k / (perSegment + 1);
      const { p, a } = onCubic(s, t);
      const side = (i * perSegment + k) % 2 ? 1 : -1;
      out.push({ p, a: a + side * 55, at: (i + t) / segs.length, side });
    }
  });
  return out;
}
