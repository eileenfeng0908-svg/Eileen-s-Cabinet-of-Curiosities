import { Bouquet } from "./Florals";
import { handLine, handRect, notchedPanel, rng } from "./paint";
import { pencil, wash } from "./PaintDefs";

/** Door artwork in its own 236 × 678 space. */
export const DOOR_W = 236;
export const DOOR_H = 678;

const panels = [
  { kind: "small" as const, x: 30, y: 34, w: 176, h: 142 },
  { kind: "tall" as const, x: 30, y: 210, w: 176, h: 290 },
  { kind: "small" as const, x: 30, y: 534, w: 176, h: 112 },
];

/** An antique iron strap hinge with scrolled ends, painted in Antique Wine. */
function Hinge({ y, side }: { y: number; side: "left" | "right" }) {
  const r = rng(y + (side === "left" ? 1 : 2));
  const x0 = side === "left" ? 2 : DOOR_W - 2;
  const dir = side === "left" ? 1 : -1;
  const strap = handLine([[x0, y], [x0 + dir * 22, y - 1], [x0 + dir * 30, y - 8]], r, 0.5);
  const scrollUp = `M${x0 + dir * 30} ${y - 8}c${dir * 6} -6 ${dir * 2} -15 ${dir * -5} -12c${dir * -5} 2 ${dir * -3} 8 ${dir * 2} 7`;
  const tail = handLine([[x0 + dir * 22, y], [x0 + dir * 34, y + 6], [x0 + dir * 30, y + 16]], r, 0.5);
  const scrollDown = `M${x0 + dir * 30} ${y + 16}c${dir * -4} 5 ${dir * -11} 1 ${dir * -8} -4`;
  return (
    <g className="hinge">
      <g filter={pencil} fill="none" stroke="var(--wine)" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
        <path d={strap} />
        <path d={scrollUp} strokeWidth={2.6} />
        <path d={tail} strokeWidth={3} />
        <path d={scrollDown} strokeWidth={2.2} />
      </g>
      <g filter={wash("c")}>
        <circle cx={x0 + dir * 8} cy={y} r={2.2} fill="var(--brass)" />
        <circle cx={x0 + dir * 19} cy={y} r={1.8} fill="var(--brass)" />
      </g>
    </g>
  );
}

export function DoorFront({ side }: { side: "left" | "right" }) {
  const seed = side === "left" ? 101 : 202;
  const r = rng(seed);
  const meetX = side === "left" ? DOOR_W - 1 : 1;

  return (
    <svg viewBox={`0 0 ${DOOR_W} ${DOOR_H}`} className="block h-full w-full overflow-visible" aria-hidden>
      {/* the painted board */}
      <g filter={wash(side === "left" ? "a" : "b")}>
        <path d={handRect(2, 2, DOOR_W - 4, DOOR_H - 4, r, 1.4)} fill="var(--powder-blue)" />
      </g>
      {/* hatch shading toward the hinge side, for a little depth */}
      <path
        d={handRect(side === "left" ? 2 : DOOR_W - 26, 2, 24, DOOR_H - 4, r, 1)}
        fill="url(#ec-hatch)"
        opacity={0.13}
        filter={pencil}
      />
      {/* vermilion pinstripe */}
      <g filter={wash("c")} fill="none" stroke="var(--vermilion)" strokeWidth={2.4}>
        <path d={handRect(13, 13, DOOR_W - 26, DOOR_H - 26, r, 1.2)} />
      </g>

      {panels.map((p, i) => (
        <g key={i}>
          {/* raised moulding */}
          <g filter={wash(i % 2 ? "b" : "a")}>
            <path d={notchedPanel(p.x - 7, p.y - 7, p.w + 14, p.h + 14, 15, r)} fill="var(--vermilion)" fillOpacity={0.9} />
            <path d={notchedPanel(p.x, p.y, p.w, p.h, 12, r)} fill="var(--aged-ivory)" />
          </g>
          {/* inner fillet and the shadow under the moulding */}
          <g filter={pencil} fill="none" strokeLinecap="round">
            <path d={notchedPanel(p.x + 9, p.y + 9, p.w - 18, p.h - 18, 7, r, 0.8)} stroke="var(--vermilion)" strokeWidth={1.4} />
            <path
              d={handLine([[p.x + p.w + 7, p.y + 10], [p.x + p.w + 7, p.y + p.h + 7], [p.x + 10, p.y + p.h + 7]], r, 0.5)}
              stroke="var(--wine)"
              strokeWidth={1.6}
              opacity={0.55}
            />
            <path d={handLine([[p.x + 2, p.y + p.h - 14], [p.x + 2, p.y + 2], [p.x + p.w - 14, p.y + 2]], r, 0.5)} stroke="var(--wine)" strokeWidth={0.8} opacity={0.35} />
          </g>
          {/* an aged wash at the panel's lower edge */}
          <path d={handRect(p.x + 4, p.y + p.h - 26, p.w - 8, 20, r, 2)} fill="var(--walnut)" opacity={0.12} filter={wash("c")} />
          <Bouquet kind={p.kind} box={{ x: p.x + 14, y: p.y + 12, w: p.w - 28, h: p.h - 22 }} seed={seed * 7 + i * 13} w={i % 2 ? "b" : "a"} />
        </g>
      ))}

      {/* outline in coloured pencil */}
      <g filter={pencil} fill="none" stroke="var(--wine)" strokeWidth={1.1} opacity={0.7}>
        <path d={handRect(2, 2, DOOR_W - 4, DOOR_H - 4, r, 1.4)} />
      </g>

      {/* meeting stile: the rounded astragal on the right door */}
      {side === "right" && (
        <g>
          <g filter={wash("b")}>
            <path d={handRect(-6, 4, 16, DOOR_H - 8, r, 0.8)} fill="var(--powder-blue)" />
          </g>
          <g filter={pencil} fill="none" stroke="var(--wine)" strokeWidth={0.9} opacity={0.6}>
            <path d={handLine([[-6, 6], [-6, DOOR_H - 6]], r, 0.6)} />
            <path d={handLine([[10, 6], [10, DOOR_H - 6]], r, 0.6)} />
          </g>
          <path d={handRect(3, 6, 6, DOOR_H - 12, r, 0.5)} fill="url(#ec-hatch-fine)" opacity={0.25} />
        </g>
      )}

      <Hinge y={96} side={side} />
      <Hinge y={DOOR_H - 96} side={side} />

      {/* knob */}
      <g className="cabinet-knob" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <g filter={wash("c")}>
          <circle cx={side === "left" ? meetX - 22 : meetX + 30} cy={DOOR_H * 0.5} r={7.5} fill="var(--brass)" />
          <circle cx={side === "left" ? meetX - 24 : meetX + 28} cy={DOOR_H * 0.5 - 2.4} r={2.6} fill="var(--aged-ivory)" fillOpacity={0.7} />
        </g>
        <circle cx={side === "left" ? meetX - 22 : meetX + 30} cy={DOOR_H * 0.5} r={7.5} fill="none" stroke="var(--wine)" strokeWidth={0.9} filter={pencil} opacity={0.7} />
      </g>

      {/* the key and its tassel, hanging from the right door's lock */}
      {side === "right" && (
        <g className="cabinet-key">
          <g filter={wash("c")}>
            <path d="M16 318c-6 0-8 6-8 10s3 9 8 9 8-5 8-9-2-10-8-10z" fill="var(--brass)" />
          </g>
          <path d="M16 324v8" stroke="var(--wine)" strokeWidth={2.2} strokeLinecap="round" />
          <g className="cabinet-tassel">
            <g filter={pencil} fill="none" stroke="var(--brass)" strokeWidth={1.6} strokeLinecap="round">
              <path d="M16 336c0 8 1 14 0 20" />
            </g>
            <g filter={wash("c")}>
              <path d="M12 356h8l1 4h-10z" fill="var(--brass)" />
              <path d="M11 360c-2 10-3 22-2 30h14c1-8 0-20-2-30z" fill="var(--aged-ivory)" />
            </g>
            <g filter={pencil} stroke="var(--walnut)" strokeWidth={0.7} fill="none">
              {[12, 14.5, 17, 19.5, 22].map((x) => (
                <path key={x} d={`M${x} 362l${(x - 16) * 0.2} 27`} />
              ))}
            </g>
          </g>
        </g>
      )}
    </svg>
  );
}

/** The inside of a door: bare honeyed walnut in a painted frame. */
export function DoorBack({ side }: { side: "left" | "right" }) {
  const r = rng(side === "left" ? 303 : 404);
  return (
    <svg viewBox={`0 0 ${DOOR_W} ${DOOR_H}`} className="block h-full w-full" aria-hidden>
      <g filter={wash(side === "left" ? "b" : "a")}>
        <path d={handRect(2, 2, DOOR_W - 4, DOOR_H - 4, r, 1.4)} fill="var(--powder-blue)" />
        <path d={handRect(18, 18, DOOR_W - 36, DOOR_H - 36, r, 1.2)} fill="var(--walnut)" />
      </g>
      <g filter={pencil} fill="none" stroke="var(--wine)" strokeWidth={0.8} opacity={0.4}>
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={handLine([[30 + i * 20, 24], [36 + i * 20 + Math.sin(i) * 8, DOOR_H / 2], [30 + i * 20, DOOR_H - 24]], r, 3)} />
        ))}
      </g>
    </svg>
  );
}
