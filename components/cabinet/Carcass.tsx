import { Bouquet } from "./Florals";
import { handLine, handPoly, handRect, rng } from "./paint";
import { pencil, wash } from "./PaintDefs";

/** The cabinet's body, cornice and base, in a 600 × 900 space. */
export const CAB_W = 600;
export const CAB_H = 900;
/** Where the doors sit (and the interior shows). */
export const OPENING = { x: 64, y: 118, w: 472, h: 678 };

export function Carcass() {
  const r = rng(7);
  return (
    <svg viewBox={`0 0 ${CAB_W} ${CAB_H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
      {/* a soft shadow pooled on the floor */}
      <ellipse cx={300} cy={892} rx={318} ry={14} fill="var(--walnut)" opacity={0.35} filter={wash("c")} />

      {/* body */}
      <g filter={wash("a")}>
        <path d={handRect(38, 70, 524, 742, r, 1.6)} fill="var(--powder-blue)" />
      </g>
      <g filter={wash("c")} fill="none" stroke="var(--vermilion)" strokeWidth={2.4}>
        <path d={handLine([[50, 112], [50, 802]], r, 0.8)} />
        <path d={handLine([[550, 112], [550, 802]], r, 0.8)} />
      </g>
      {/* the recess the doors close into */}
      <path d={handRect(OPENING.x - 4, OPENING.y - 4, OPENING.w + 8, OPENING.h + 8, r, 1)} fill="var(--wine)" opacity={0.85} filter={wash("b")} />

      {/* frieze with its garland */}
      <g filter={wash("b")}>
        <path d={handRect(44, 70, 512, 40, r, 1)} fill="var(--powder-blue)" />
      </g>
      <Bouquet kind="garland" box={{ x: 190, y: 74, w: 220, h: 32 }} seed={41} w="c" />

      {/* cornice: three stepped mouldings, the middle one vermilion */}
      <g filter={wash("a")}>
        <path d={handPoly([[30, 52], [570, 52], [556, 72], [44, 72]], r, 1)} fill="var(--powder-blue)" />
        <path d={handRect(18, 38, 564, 16, r, 1)} fill="var(--vermilion)" fillOpacity={0.92} />
        <path d={handPoly([[4, 14], [596, 14], [584, 40], [16, 40]], r, 1.2)} fill="var(--powder-blue)" />
        <path d={handRect(10, 6, 580, 10, r, 0.8)} fill="var(--walnut)" fillOpacity={0.9} />
      </g>
      {/* shadow beneath the overhang */}
      <path d={handRect(44, 72, 512, 9, r, 0.8)} fill="url(#ec-hatch)" opacity={0.28} filter={pencil} />

      {/* base: plinth, vermilion band, bracket feet */}
      <g filter={wash("b")}>
        <path d={handRect(26, 810, 548, 38, r, 1.2)} fill="var(--powder-blue)" />
        <path d={handRect(30, 816, 540, 10, r, 0.8)} fill="var(--vermilion)" fillOpacity={0.92} />
        <path
          d={handPoly([[34, 846], [566, 846], [566, 892], [520, 892], [510, 872], [90, 872], [80, 892], [34, 892]], r, 1.2)}
          fill="var(--powder-blue)"
        />
      </g>
      <path d={handRect(30, 846, 540, 8, r, 0.8)} fill="url(#ec-hatch)" opacity={0.25} filter={pencil} />

      {/* pencil outline over everything */}
      <g filter={pencil} fill="none" stroke="var(--wine)" strokeWidth={1.1} opacity={0.65} strokeLinejoin="round">
        <path d={handPoly([[4, 14], [596, 14], [584, 40], [16, 40]], r, 1.2)} />
        <path d={handRect(18, 38, 564, 16, r, 1)} />
        <path d={handPoly([[30, 52], [570, 52], [556, 72], [44, 72]], r, 1)} />
        <path d={handRect(38, 70, 524, 742, r, 1.6)} />
        <path d={handRect(26, 810, 548, 38, r, 1.2)} />
        <path d={handPoly([[34, 846], [566, 846], [566, 892], [520, 892], [510, 872], [90, 872], [80, 892], [34, 892]], r, 1.2)} />
      </g>
      {/* hatch shading along the right flank */}
      <path d={handRect(536, 76, 24, 732, r, 1)} fill="url(#ec-hatch)" opacity={0.16} filter={pencil} />
    </svg>
  );
}
