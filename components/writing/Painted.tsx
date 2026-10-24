import { cn } from "@/lib/cn";
import { handLine, handPoly, handRect, notchedPanel, rng } from "@/components/cabinet/paint";
import { pencil, wash, type Wash } from "@/components/cabinet/PaintDefs";

/**
 * Painted paper for the Writing rooms, in the cabinet's watercolour and
 * coloured-pencil hand. All decorative; content sits on top.
 */

/** A sheet of watercolour paper behind a block of content: wash, blooms at the corners, a pencilled edge. */
export function PaintedSheet({
  seed = 3,
  bloom = "var(--vermilion)",
  margin = false,
  notched = false,
  h = 1400,
  className,
}: {
  seed?: number;
  /** colour that bleeds in from the corners */
  bloom?: string;
  /** a vermilion margin rule, as on a manuscript */
  margin?: boolean;
  /** stepped corners, like the cabinet's painted panels */
  notched?: boolean;
  /** viewBox height for a 1000-wide sheet: roughly the sheet's aspect, so the brush isn't stretched */
  h?: number;
  className?: string;
}) {
  const r = rng(seed);
  const edge = notched ? notchedPanel(14, 14, 972, h - 28, 34, r, 2.5) : handRect(14, 14, 972, h - 28, r, 3);
  return (
    <svg aria-hidden viewBox={`0 0 1000 ${h}`} preserveAspectRatio="none" className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}>
      <g filter={wash("a")}>
        <path d={edge} fill="color-mix(in srgb, var(--aged-ivory) 62%, white)" />
      </g>
      <g filter={wash("b")} opacity={0.5}>
        <ellipse cx={90} cy={110} rx={220} ry={150} fill={bloom} opacity={0.32} />
        <ellipse cx={930} cy={h - 120} rx={240} ry={170} fill={bloom} opacity={0.26} />
        <ellipse cx={880} cy={90} rx={160} ry={90} fill="var(--brass)" opacity={0.28} />
        <ellipse cx={120} cy={h - 90} rx={150} ry={80} fill="var(--powder-blue)" opacity={0.4} />
      </g>
      <g filter={pencil} fill="none" strokeLinecap="round">
        <path d={edge} stroke="var(--wine)" strokeWidth={1.6} opacity={0.5} />
        {margin && <path d={handLine([[96, 30], [97, h / 2], [95, h - 30]], r, 1.2)} stroke="var(--vermilion)" strokeWidth={1.6} opacity={0.55} />}
      </g>
    </svg>
  );
}

/** A pencilled rule across the page. */
export function PencilRule({ seed = 1, className, strong = false }: { seed?: number; className?: string; strong?: boolean }) {
  const r = rng(seed);
  return (
    <svg aria-hidden viewBox="0 0 1000 8" preserveAspectRatio="none" className={cn("block h-2 w-full", className)}>
      <path
        d={handLine([[2, 4], [250, 3.4], [500, 4.6], [750, 3.6], [998, 4.2]], r, 0.6)}
        stroke="var(--wine)"
        strokeWidth={strong ? 2.2 : 1}
        opacity={strong ? 0.75 : 0.4}
        fill="none"
        filter={pencil}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** A small, round watercolour blot, to sit behind a numeral or a mark. */
export function WashBlot({ color, seed = 1, w = "c", className }: { color: string; seed?: number; w?: Wash; className?: string }) {
  const r = rng(seed);
  const pts = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2;
    const k = 34 + r() * 8;
    return [50 + Math.cos(a) * k, 50 + Math.sin(a) * k * 0.86] as [number, number];
  });
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={cn("pointer-events-none absolute overflow-visible", className)}>
      <path d={handPoly(pts, r, 4)} fill={color} fillOpacity={0.55} filter={wash(w)} />
    </svg>
  );
}

/** A book standing on the shelf: a washed spine with brass bands. */
export function BookSpine({ color, seed = 1, className }: { color: string; seed?: number; className?: string }) {
  const r = rng(seed);
  return (
    <svg aria-hidden viewBox="0 0 60 240" preserveAspectRatio="none" className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}>
      <g filter={wash((["a", "b", "c"] as const)[seed % 3])}>
        <path d={handRect(3, 3, 54, 234, r, 1.6)} fill={color} />
      </g>
      <g filter={pencil} fill="none" strokeLinecap="round">
        <path d={handLine([[6, 22], [30, 21], [54, 23]], r, 0.6)} stroke="var(--brass)" strokeWidth={3} />
        <path d={handLine([[6, 30], [30, 31], [54, 29]], r, 0.6)} stroke="var(--brass)" strokeWidth={1.4} />
        <path d={handLine([[6, 208], [30, 209], [54, 207]], r, 0.6)} stroke="var(--brass)" strokeWidth={1.4} />
        <path d={handLine([[6, 216], [30, 215], [54, 217]], r, 0.6)} stroke="var(--brass)" strokeWidth={3} />
        <path d={handRect(3, 3, 54, 234, r, 1.2)} stroke="var(--wine)" strokeWidth={1} opacity={0.45} />
      </g>
    </svg>
  );
}

/** The shelf the books stand on. */
export function Shelf({ seed = 4, className }: { seed?: number; className?: string }) {
  const r = rng(seed);
  return (
    <svg aria-hidden viewBox="0 0 1000 30" preserveAspectRatio="none" className={cn("block h-5 w-full", className)}>
      <g filter={wash("b")}>
        <path d={handRect(0, 4, 1000, 16, r, 1.4)} fill="var(--walnut)" />
        <path d={handRect(10, 20, 980, 8, r, 1)} fill="var(--walnut)" opacity={0.55} />
      </g>
      <path d={handLine([[0, 8], [500, 7.5], [1000, 8.5]], r, 0.5)} stroke="var(--brass)" strokeWidth={1.4} fill="none" filter={pencil} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
