import { Bouquet } from "@/components/cabinet/Florals";
import { handLine, handPoly, handRect, notchedPanel, rng } from "@/components/cabinet/paint";
import { pencil, wash } from "@/components/cabinet/PaintDefs";

/**
 * The Curator's Cabinet, painted: a low collector's chest with three drawers,
 * drawn in the same watercolour and coloured-pencil hand as the homepage
 * cabinet. Everything is in a 600 × 520 space.
 */
export const CHEST = { w: 600, h: 520 };
/** The three drawer openings, top to bottom. */
export const SLOTS = [70, 205, 340].map((y) => ({ x: 52, y, w: 496, h: 118 }));

export function ChestCarcass() {
  const r = rng(301);
  return (
    <svg viewBox={`0 0 ${CHEST.w} ${CHEST.h}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
      <ellipse cx={300} cy={514} rx={310} ry={10} fill="var(--walnut)" opacity={0.35} filter={wash("c")} />

      {/* body */}
      <g filter={wash("a")}>
        <path d={handRect(30, 42, 540, 436, r, 1.6)} fill="var(--powder-blue)" />
      </g>
      {/* vermilion pinstripes down the stiles */}
      <g filter={wash("c")} fill="none" stroke="var(--vermilion)" strokeWidth={2.2}>
        <path d={handLine([[40, 62], [40, 466]], r, 0.7)} />
        <path d={handLine([[560, 62], [560, 466]], r, 0.7)} />
      </g>
      {/* drawer openings */}
      {SLOTS.map((s, i) => (
        <path key={i} d={handRect(s.x - 5, s.y - 5, s.w + 10, s.h + 10, r, 0.9)} fill="var(--wine)" opacity={0.88} filter={wash("b")} />
      ))}

      {/* cornice with a painted garland */}
      <g filter={wash("a")}>
        <path d={handPoly([[22, 30], [578, 30], [566, 46], [34, 46]], r, 1)} fill="var(--powder-blue)" />
        <path d={handRect(12, 18, 576, 14, r, 1)} fill="var(--vermilion)" fillOpacity={0.92} />
        <path d={handRect(4, 4, 592, 16, r, 1)} fill="var(--walnut)" fillOpacity={0.92} />
      </g>
      <Bouquet kind="garland" box={{ x: 210, y: 46, w: 180, h: 20 }} seed={77} w="c" />
      <path d={handRect(34, 46, 532, 7, r, 0.6)} fill="url(#ec-hatch)" opacity={0.28} filter={pencil} />

      {/* plinth and bun feet */}
      <g filter={wash("b")}>
        <path d={handRect(20, 474, 560, 22, r, 1)} fill="var(--powder-blue)" />
        <path d={handRect(24, 478, 552, 6, r, 0.6)} fill="var(--vermilion)" fillOpacity={0.9} />
        {[60, 540].map((x) => (
          <path key={x} d={handPoly([[x - 26, 496], [x + 26, 496], [x + 20, 512], [x - 20, 512]], r, 1)} fill="var(--walnut)" />
        ))}
      </g>

      {/* pencil over everything */}
      <g filter={pencil} fill="none" stroke="var(--wine)" strokeWidth={1.1} opacity={0.62} strokeLinejoin="round">
        <path d={handRect(30, 42, 540, 436, r, 1.6)} />
        <path d={handRect(12, 18, 576, 14, r, 1)} />
        <path d={handRect(4, 4, 592, 16, r, 1)} />
        <path d={handRect(20, 474, 560, 22, r, 1)} />
      </g>
      <path d={handRect(548, 50, 20, 424, r, 1)} fill="url(#ec-hatch)" opacity={0.16} filter={pencil} />
    </svg>
  );
}

/** One drawer front, in its own 496 × 118 space. */
export function DrawerFrontArt({ seed }: { seed: number }) {
  const r = rng(seed);
  const W = 496;
  const H = 118;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" aria-hidden>
      <g filter={wash("a")}>
        <path d={handRect(0, 0, W, H, r, 1.2)} fill="var(--powder-blue)" />
      </g>
      {/* three notched panels: two painted ends and the centre */}
      <g filter={wash("b")}>
        <path d={notchedPanel(12, 12, 104, H - 24, 9, r)} fill="var(--aged-ivory)" />
        <path d={notchedPanel(W - 116, 12, 104, H - 24, 9, r)} fill="var(--aged-ivory)" />
        <path d={notchedPanel(132, 12, W - 264, H - 24, 9, r)} fill="color-mix(in srgb, var(--aged-ivory) 86%, var(--powder-blue))" />
      </g>
      <g filter={pencil} fill="none" stroke="var(--vermilion)" strokeWidth={1.4} opacity={0.85}>
        <path d={notchedPanel(16, 16, 96, H - 32, 7, r)} />
        <path d={notchedPanel(W - 112, 16, 96, H - 32, 7, r)} />
      </g>
      <Bouquet kind="small" box={{ x: 30, y: 16, w: 68, h: 88 }} seed={seed + 3} w="c" />
      <Bouquet kind="small" box={{ x: W - 98, y: 16, w: 68, h: 88 }} seed={seed + 5} w="c" />

      {/* pencil outline and the shadow under the top edge */}
      <path d={handRect(0, 0, W, H, r, 1.2)} fill="none" stroke="var(--wine)" strokeWidth={1.1} opacity={0.6} filter={pencil} />
      <path d={handRect(4, H - 8, W - 8, 6, r, 0.6)} fill="url(#ec-hatch)" opacity={0.22} filter={pencil} />
    </svg>
  );
}

/** A brass bail pull: two round backplates and a swinging loop. */
export function BailPull() {
  const r = rng(9);
  return (
    <svg viewBox="0 0 120 50" className="h-full w-full overflow-visible" aria-hidden>
      <g filter={wash("c")}>
        <circle cx={18} cy={14} r={10} fill="var(--brass)" />
        <circle cx={102} cy={14} r={10} fill="var(--brass)" />
      </g>
      <g className="drawer-bail" filter={pencil}>
        <path d={handLine([[18, 14], [24, 36], [60, 42], [96, 36], [102, 14]], r, 0.6)} fill="none" stroke="var(--brass)" strokeWidth={5} strokeLinecap="round" />
        <path d={handLine([[20, 16], [26, 35], [60, 41], [94, 35], [100, 16]], r, 0.6)} fill="none" stroke="var(--wine)" strokeWidth={1} opacity={0.55} />
      </g>
      <g fill="var(--wine)" opacity={0.7}>
        <circle cx={18} cy={14} r={2.2} />
        <circle cx={102} cy={14} r={2.2} />
      </g>
    </svg>
  );
}
