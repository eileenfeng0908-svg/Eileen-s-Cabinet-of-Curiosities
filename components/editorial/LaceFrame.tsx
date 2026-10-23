import { cn } from "@/lib/cn";

/**
 * LaceFrame — a paper-doily border drawn in SVG, after the die-cut lace
 * frames of Victorian scrapbooks. Children sit in the cut-out window.
 * Use once per page at most: it is the romantic accent, not the rule.
 */

const W = 300;

function buildLace(H: number) {
  const r = 9; // scallop radius
  const x0 = r, y0 = r, x1 = W - r, y1 = H - r;
  const n = Math.round((x1 - x0) / (r * 2));
  const m = Math.round((y1 - y0) / (r * 2));
  const dx = (x1 - x0) / n;
  const dy = (y1 - y0) / m;

  // Outer scalloped edge, drawn clockwise.
  let edge = `M${x0} ${y0}`;
  for (let i = 0; i < n; i++) edge += ` a${dx / 2} ${dx / 2} 0 0 1 ${dx} 0`;
  for (let i = 0; i < m; i++) edge += ` a${dy / 2} ${dy / 2} 0 0 1 0 ${dy}`;
  for (let i = 0; i < n; i++) edge += ` a${dx / 2} ${dx / 2} 0 0 1 ${-dx} 0`;
  for (let i = 0; i < m; i++) edge += ` a${dy / 2} ${dy / 2} 0 0 1 0 ${-dy}`;
  edge += " Z";

  // Punched holes: one under each scallop, and a finer inner ring.
  const circle = (cx: number, cy: number, rr: number) =>
    ` M${cx - rr} ${cy} a${rr} ${rr} 0 1 0 ${rr * 2} 0 a${rr} ${rr} 0 1 0 ${-rr * 2} 0`;
  let holes = "";
  const ring1 = r + 4;
  for (let i = 0; i < n; i++) {
    const cx = x0 + dx * (i + 0.5);
    holes += circle(cx, ring1, 2.6) + circle(cx, H - ring1, 2.6);
  }
  for (let i = 0; i < m; i++) {
    const cy = y0 + dy * (i + 0.5);
    holes += circle(ring1, cy, 2.6) + circle(W - ring1, cy, 2.6);
  }
  const ring2 = r + 12;
  for (let i = 0; i <= n * 2; i++) {
    const cx = x0 + 4 + ((x1 - x0 - 8) / (n * 2)) * i;
    holes += circle(cx, ring2, 0.9) + circle(cx, H - ring2, 0.9);
  }
  for (let i = 1; i < m * 2; i++) {
    const cy = y0 + 4 + ((y1 - y0 - 8) / (m * 2)) * i;
    holes += circle(ring2, cy, 0.9) + circle(W - ring2, cy, 0.9);
  }

  // The window.
  const inset = r + 20;
  const win = ` M${inset} ${inset} H${W - inset} V${H - inset} H${inset} Z`;

  return { d: edge + holes + win, inset };
}

export function LaceFrame({
  aspect = 3 / 4,
  children,
  className,
}: {
  /** Width / height of the whole frame. */
  aspect?: number;
  children?: React.ReactNode;
  className?: string;
}) {
  const H = Math.round(W / aspect);
  const { d, inset } = buildLace(H);

  return (
    <div className={cn("relative", className)} style={{ aspectRatio: `${W} / ${H}` }}>
      <div
        className="absolute overflow-hidden"
        style={{
          left: `${(inset / W) * 100}%`,
          right: `${(inset / W) * 100}%`,
          top: `${(inset / H) * 100}%`,
          bottom: `${(inset / H) * 100}%`,
        }}
      >
        {children}
      </div>
      <svg aria-hidden viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full">
        <path d={d} fillRule="evenodd" fill="var(--color-ivory-pale)" stroke="rgb(81 105 138 / 0.22)" strokeWidth="0.5" />
        <rect
          x={inset - 3}
          y={inset - 3}
          width={W - (inset - 3) * 2}
          height={H - (inset - 3) * 2}
          fill="none"
          stroke="rgb(81 105 138 / 0.18)"
          strokeWidth="0.4"
        />
      </svg>
    </div>
  );
}
