import { cn } from "@/lib/cn";

/**
 * A round paper doily, die-cut in SVG: scalloped rim, rings of punched
 * eyelets, a band of petal cut-outs, and a plain centre. Drawn in the
 * current text colour (light Glare by default) and meant to sit behind type or an
 * image, the way a doily sits under a cake on an old poster.
 */

const C = 200; // centre
const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0Z`;
const polar = (r: number, a: number): [number, number] => [C + r * Math.cos(a), C + r * Math.sin(a)];

function buildDoily() {
  const n = 28;
  const rim = 186;
  const bump = (2 * Math.PI * rim) / n / 2;

  // Scalloped rim: n arcs bulging outwards.
  let d = "";
  for (let i = 0; i < n; i++) {
    const [x0, y0] = polar(rim, (i / n) * 2 * Math.PI);
    const [x1, y1] = polar(rim, ((i + 1) / n) * 2 * Math.PI);
    d += i === 0 ? `M${x0.toFixed(2)} ${y0.toFixed(2)}` : "";
    d += `A${bump.toFixed(2)} ${bump.toFixed(2)} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  }
  d += "Z";

  // Eyelets under each scallop, and a fine ring of pinpricks.
  for (let i = 0; i < n; i++) {
    const a = ((i + 0.5) / n) * 2 * Math.PI;
    d += circle(...polar(rim - 4, a), 3.4);
    d += circle(...polar(rim - 16, a), 1.3);
    d += circle(...polar(rim - 16, a + Math.PI / n), 1.3);
  }

  // Petal cut-outs: teardrops pointing to the centre.
  const petals = 14;
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * 2 * Math.PI;
    const [ox, oy] = polar(150, a);
    const [ix, iy] = polar(118, a);
    const [lx, ly] = polar(140, a - 0.12);
    const [rx, ry] = polar(140, a + 0.12);
    d += `M${ix.toFixed(2)} ${iy.toFixed(2)}Q${lx.toFixed(2)} ${ly.toFixed(2)} ${ox.toFixed(2)} ${oy.toFixed(2)}Q${rx.toFixed(2)} ${ry.toFixed(2)} ${ix.toFixed(2)} ${iy.toFixed(2)}Z`;
    // a dot between petals
    d += circle(...polar(146, a + Math.PI / petals), 2.6);
  }

  // A ring of eyelets around the plain centre.
  for (let i = 0; i < 40; i++) d += circle(...polar(108, (i / 40) * 2 * Math.PI), 1.6);

  return d;
}

const path = buildDoily();

export function Doily({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 400 400" className={cn("pointer-events-none text-ivory-pale", className)}>
      <path d={path} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/** A small lace heart, for signing off. */
export function LaceHeart({ className }: { className?: string }) {
  const heart = "M50 88 C 18 66, 4 46, 10 28 C 16 10, 40 8, 50 26 C 60 8, 84 10, 90 28 C 96 46, 82 66, 50 88 Z";
  return (
    <svg aria-hidden viewBox="0 0 100 96" className={cn("h-6 w-6", className)}>
      <path d={heart} fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="0.1 7" strokeLinecap="round" />
      <path d={heart} fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.2" transform="translate(50 48) scale(0.72) translate(-50 -48)" />
    </svg>
  );
}
