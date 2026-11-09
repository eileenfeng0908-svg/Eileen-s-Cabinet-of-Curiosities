"use client";

import { FlowerArt } from "@/components/writing/PoetryGarden";
import { pencil, wash } from "@/components/cabinet/PaintDefs";
import type { GardenFlower } from "@/content/poems";

/**
 * A little strip of the Poetry Garden for the empty corner of the homepage:
 * a pencil vine with watercolour leaves and a few flowers that open on hover.
 * Purely decorative.
 */
const flowers: { kind: GardenFlower; x: number; y: number; w: number; ink: string; rot: number }[] = [
  { kind: "tulip", x: 6, y: 18, w: 17, ink: "#C56558", rot: -8 },
  { kind: "blossom", x: 25, y: 46, w: 13, ink: "color-mix(in srgb, #C56558 55%, #F2E4C8)", rot: 0 },
  { kind: "bellflower", x: 41, y: 8, w: 16, ink: "#91AEB5", rot: 6 },
  { kind: "starflower", x: 58, y: 44, w: 12, ink: "#B18A48", rot: 0 },
  { kind: "tulip", x: 73, y: 14, w: 14, ink: "#713F48", rot: 10 },
  { kind: "blossom", x: 88, y: 40, w: 12, ink: "#91AEB5", rot: 0 },
];
const leaves: [number, number, number][] = [
  [16, 66, -30], [33, 58, 25], [50, 70, -20], [66, 60, 30], [82, 66, -25], [12, 76, 40], [45, 80, 15], [94, 70, 20],
];

export function HeroGarden() {
  return (
    <div aria-hidden className="relative aspect-[10/3.6] w-full select-none">
      <svg viewBox="0 0 100 36" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <path d="M0 30C12 22 20 32 32 26S52 20 62 27S84 34 100 24" stroke="#657B53" strokeWidth="0.55" fill="none" filter={pencil} />
        <path d="M14 27c2 -6 0 -12 -4 -16M36 25c3 -6 6 -10 8 -16M60 27c1 -4 0 -8 -2 -10M76 29c2 -6 4 -10 3 -14M90 26c1 -3 0 -6 -2 -7" stroke="#657B53" strokeWidth="0.4" fill="none" filter={pencil} />
        {leaves.map(([x, y, a], i) => (
          <ellipse key={i} cx={x} cy={(y / 100) * 36} rx="2.6" ry="0.9" fill="#657B53" opacity="0.75" transform={`rotate(${a} ${x} ${(y / 100) * 36})`} filter={wash((["a", "b", "c"] as const)[i % 3])} />
        ))}
        <g fill="#B18A48" opacity="0.7">
          <circle cx="21" cy="12" r="0.5" /><circle cx="53" cy="6" r="0.4" /><circle cx="68" cy="9" r="0.5" /><circle cx="97" cy="12" r="0.4" />
        </g>
      </svg>
      {flowers.map((f, i) => (
        <span
          key={i}
          className="garden-flower pointer-events-auto absolute block"
          style={{ left: `${f.x}%`, top: `${f.y}%`, width: `${f.w}%`, transform: `translate(-50%, -30%) rotate(${f.rot}deg)` }}
        >
          <FlowerArt kind={f.kind} seed={i * 7 + 3} ink={f.ink} />
        </span>
      ))}
    </div>
  );
}
