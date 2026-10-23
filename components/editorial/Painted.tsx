import { cn } from "@/lib/cn";
import { Bouquet } from "@/components/cabinet/Florals";
import { at, handLine, handRect, leaf, rng, tulipPetals } from "@/components/cabinet/paint";
import { pencil, wash } from "@/components/cabinet/PaintDefs";

/**
 * Small pieces of the cabinet's painting, for use across the site: a single
 * tulip (in place of a star or bullet), a garland, and a painted band like
 * the cabinet's plinth. All decorative (aria-hidden).
 */

export function PaintedTulip({ className, seed = 1 }: { className?: string; seed?: number }) {
  const r = rng(seed);
  return (
    <svg aria-hidden viewBox="0 0 40 48" className={cn("h-5 w-4 overflow-visible", className)}>
      <g filter={wash("c")}>
        <path d={handLine([[20, 46], [21, 32], [20, 20]], r, 0.6)} stroke="var(--botanical-green)" strokeWidth={1.8} fill="none" strokeLinecap="round" />
        <path d={leaf(14, r)} transform={at(20, 38, -40)} fill="var(--botanical-green)" />
        <path d={leaf(12, r)} transform={at(20, 34, 220)} fill="var(--botanical-green)" />
        <g transform={at(20, 21)}>
          {tulipPetals(16, r).map((d, i) => (
            <path key={i} d={d} fill="var(--vermilion)" fillOpacity={i === 2 ? 0.8 : 0.9} />
          ))}
        </g>
      </g>
    </svg>
  );
}

export function PaintedGarland({ className, seed = 41 }: { className?: string; seed?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 240 40" className={cn("h-10 w-60 overflow-visible", className)}>
      <Bouquet kind="garland" box={{ x: 0, y: 4, w: 240, h: 32 }} seed={seed} w="c" />
    </svg>
  );
}

/** A painted band — powder blue with a vermilion pinstripe — to edge a header or footer. */
export function PaintedBand({ className, seed = 9 }: { className?: string; seed?: number }) {
  const r = rng(seed);
  return (
    <svg aria-hidden viewBox="0 0 1200 22" preserveAspectRatio="none" className={cn("block h-[22px] w-full", className)}>
      <g filter={wash("b")}>
        <path d={handRect(0, 2, 1200, 18, r, 1)} fill="var(--powder-blue)" />
      </g>
      <g filter={pencil} fill="none" strokeLinecap="round">
        <path d={handLine([[0, 8], [400, 7.5], [800, 8.5], [1200, 8]], r, 0.6)} stroke="var(--vermilion)" strokeWidth={2} />
        <path d={handLine([[0, 20], [600, 20.5], [1200, 20]], r, 0.4)} stroke="var(--wine)" strokeWidth={0.8} opacity={0.6} />
      </g>
    </svg>
  );
}
