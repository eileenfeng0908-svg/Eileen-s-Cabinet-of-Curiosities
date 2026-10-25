import { at, handLine, handPoly, handRect, heart, leaf, rng, tulipPetals, type Rng } from "@/components/cabinet/paint";
import { pencil, wash } from "@/components/cabinet/PaintDefs";

/**
 * The Fashion Atelier, painted: the drafting table, the clutter on it, and the
 * five things you can pick up. All in the cabinet's watercolour and pencil.
 */

export const ink = {
  vermilion: "var(--vermilion)",
  blue: "var(--powder-blue)",
  green: "var(--botanical-green)",
  wine: "var(--wine)",
  brass: "var(--brass)",
  walnut: "var(--walnut)",
} as const;

const paper = "color-mix(in srgb, var(--aged-ivory) 60%, white)";

const Line = ({ children, w = 1.2, o = 0.75, c = "var(--wine)" }: { children: React.ReactNode; w?: number; o?: number; c?: string }) => (
  <g filter={pencil} fill="none" stroke={c} strokeWidth={w} opacity={o} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </g>
);

/** A square with pinking-shear edges. */
function pinked(x: number, y: number, w: number, h: number, r: Rng, tooth = 5) {
  const pts: [number, number][] = [];
  const nx = Math.round(w / tooth), ny = Math.round(h / tooth);
  for (let i = 0; i < nx; i++) pts.push([x + i * (w / nx), y], [x + (i + 0.5) * (w / nx), y + (i % 2 ? 2.4 : 3)]);
  for (let i = 0; i < ny; i++) pts.push([x + w, y + i * (h / ny)], [x + w - 2.6, y + (i + 0.5) * (h / ny)]);
  for (let i = nx; i > 0; i--) pts.push([x + i * (w / nx), y + h], [x + (i - 0.5) * (w / nx), y + h - 2.8]);
  for (let i = ny; i > 0; i--) pts.push([x, y + i * (h / ny)], [x + 2.5, y + (i - 0.5) * (h / ny)]);
  return handPoly(pts, r, 0.4);
}

/* --- The five things you can pick up ------------------------------------ */

/** An invitation card, 100 × 140. The cover folds open from the left edge. */
export function InvitationInside({ color, year, title }: { color: string; year: string; title: string }) {
  const r = rng(year.length * 13 + title.length);
  return (
    <svg viewBox="0 0 100 140" className="block h-full w-full overflow-visible" aria-hidden>
      <g filter={wash("a")}>
        <path d={handRect(2, 2, 96, 136, r, 0.8)} fill={paper} />
        <ellipse cx={50} cy={22} rx={40} ry={14} fill={color} opacity={0.35} />
      </g>
      <Line w={0.9} o={0.6}>
        <path d={handRect(2, 2, 96, 136, r, 0.8)} />
        <path d="M14 128V44a36 30 0 0 1 72 0v84" strokeWidth={0.7} />
      </Line>
      <text x={50} y={64} textAnchor="middle" fontFamily="var(--font-display)" fontSize={7} fill="var(--wine)" letterSpacing={1.2}>
        THE FASHION SHOW
      </text>
      <text x={50} y={87} textAnchor="middle" fontFamily="var(--font-display)" fontStyle="italic" fontSize={title.length > 14 ? 10.5 : title.length > 10 ? 12.5 : 16} fill="var(--wine)">
        {title}
      </text>
      <text x={50} y={106} textAnchor="middle" fontFamily="var(--font-display)" fontSize={12} letterSpacing={1.4} fill="var(--wine)">
        {year}
      </text>
      <g filter={wash("b")}>
        <path d={heart(5)} transform={at(50, 118)} fill={color} />
      </g>
    </svg>
  );
}

export function InvitationCover({ color, year }: { color: string; year: string }) {
  const r = rng(year.length * 31 + 7);
  return (
    <svg viewBox="0 0 100 140" className="block h-full w-full overflow-visible" aria-hidden>
      <g filter={wash("b")}>
        <path d={handRect(2, 2, 96, 136, r, 0.8)} fill={color} />
        <path d={handRect(10, 10, 80, 120, r, 0.6)} fill={paper} opacity={0.88} />
      </g>
      {/* a little folk-art tulip, the house mark */}
      <g filter={wash("a")} transform={at(50, 60)}>
        <path d={leaf(16, r)} transform="rotate(130)" fill="var(--botanical-green)" />
        <path d={leaf(16, r)} transform="rotate(50)" fill="var(--botanical-green)" />
        <g transform="translate(0 -8)">
          {tulipPetals(12, r).map((d, i) => (
            <path key={i} d={d} fill={color} fillOpacity={0.9} />
          ))}
        </g>
      </g>
      <Line w={0.9} o={0.65}>
        <path d={handRect(10, 10, 80, 120, r, 0.6)} />
        <path d={handLine([[50, 66], [50, 84]], r, 0.6)} />
      </Line>
      <text x={50} y={102} textAnchor="middle" fontFamily="var(--font-display)" fontStyle="italic" fontSize={10.5} fill="var(--wine)">
        You’re invited
      </text>
      <text x={50} y={121} textAnchor="middle" fontFamily="var(--font-display)" fontSize={14} fill="var(--wine)" letterSpacing={1.5}>
        {year}
      </text>
      {/* wax seal on the edge */}
      <g filter={wash("c")}>
        <circle cx={96} cy={70} r={9} fill="var(--wine)" />
      </g>
      <Line c="var(--aged-ivory)" w={0.8} o={0.8}>
        <path d={heart(3.4)} transform={at(96, 70)} />
      </Line>
    </svg>
  );
}

/** The sketchbook, closed, with tabs, a band and a pencil. 160 × 200. */
export function SketchbookArt() {
  const r = rng(301);
  const tabs = [ink.vermilion, ink.blue, ink.green, ink.brass, "var(--wine)"];
  return (
    <svg viewBox="0 0 160 200" className="block h-full w-full overflow-visible" aria-hidden>
      {/* page tabs peeking out */}
      <g filter={wash("a")}>
        {tabs.map((c, i) => (
          <path key={i} d={handRect(136, 30 + i * 28, 16, 16, r, 0.6)} fill={c} />
        ))}
        <path d={handRect(16, 10, 126, 182, r, 1)} fill={paper} />
      </g>
      <g filter={wash("b")}>
        <path d={handRect(10, 6, 128, 184, r, 1.2)} fill="var(--wine)" />
        <path d={handRect(30, 40, 82, 50, r, 0.8)} fill={paper} />
        <rect x={112} y={6} width={8} height={184} fill="var(--vermilion)" opacity={0.95} />
      </g>
      {/* a sketched figure on the label */}
      <Line w={0.9} o={0.7}>
        <path d={handRect(30, 40, 82, 50, r, 0.8)} />
        <path d="M10 14v172" strokeWidth={0.6} opacity={0.4} />
      </Line>
      <text x={71} y={62} textAnchor="middle" fontFamily="var(--font-title)" fontSize={15} fill="var(--wine)">
        Sketches
      </text>
      <text x={71} y={78} textAnchor="middle" fontFamily="var(--font-display)" fontSize={6.5} letterSpacing={1.2} fill="var(--wine)">
        DESIGN PROCESS
      </text>
      {/* little embroidered flowers on the cloth */}
      <g filter={wash("a")}>
        {[[40, 140], [64, 158], [90, 136]].map(([x, y], i) => (
          <g key={i} transform={at(x, y, i * 30)}>
            {tulipPetals(7, r).map((d, j) => (
              <path key={j} d={d} fill={[ink.vermilion, ink.blue, ink.brass][i]} />
            ))}
          </g>
        ))}
      </g>
      {/* the pencil */}
      <g transform={at(18, 176, -32)}>
        <g filter={wash("c")}>
          <rect x={0} y={-4} width={96} height={8} fill="var(--brass)" />
          <path d="M96-4L110 0 96 4Z" fill="var(--walnut)" />
          <rect x={-8} y={-4} width={8} height={8} fill="var(--vermilion)" />
        </g>
        <Line w={0.8} o={0.7}>
          <path d="M-8-4H96L110 0 96 4H-8ZM0-4v8" />
          <path d="M106-1L110 0 106 1" strokeWidth={1.6} />
        </Line>
      </g>
    </svg>
  );
}

/** Three polaroids, overlapping. 220 × 200. */
export function PolaroidsArt() {
  const r = rng(411);
  const one = (x: number, y: number, rot: number, sky: string, ground: string, k: number) => (
    <g transform={at(x, y, rot)}>
      <g filter={wash(k % 2 ? "a" : "c")}>
        <path d={handRect(-44, -52, 88, 104, r, 0.7)} fill={paper} />
        <path d={handRect(-37, -45, 74, 72, r, 0.5)} fill={sky} />
        <path d={`M-37 ${10 + k * 3}Q0 ${4 - k * 2} 37 ${12 + k}V27H-37Z`} fill={ground} opacity={0.85} />
        <circle cx={-14 + k * 12} cy={-22} r={7} fill="var(--brass)" opacity={0.75} />
      </g>
      <Line w={0.8} o={0.6}>
        <path d={handRect(-44, -52, 88, 104, r, 0.7)} />
        <path d={handRect(-37, -45, 74, 72, r, 0.5)} strokeWidth={0.6} />
        {/* a small figure, just a few pencil lines */}
        <path d={`M${6 - k * 6} -6a4 4 0 1 1 0.1 0M${6 - k * 6} -2l-6 20h12z`} strokeWidth={0.8} />
        <path d={handLine([[-28, 40], [8, 41]], r, 0.5)} strokeWidth={0.6} opacity={0.45} />
      </Line>
    </g>
  );
  return (
    <svg viewBox="0 0 220 200" className="block h-full w-full overflow-visible" aria-hidden>
      {one(64, 92, -9, ink.blue, ink.green, 0)}
      {one(150, 84, 7, "color-mix(in srgb, var(--vermilion) 70%, var(--aged-ivory))", ink.wine, 1)}
      {one(110, 136, -2, "color-mix(in srgb, var(--brass) 65%, var(--aged-ivory))", ink.vermilion, 2)}
      <g filter={wash("b")}>
        <path d={handRect(94, 74, 34, 11, r, 0.4)} transform="rotate(-12 111 80)" fill="var(--powder-blue)" opacity={0.75} />
      </g>
    </svg>
  );
}

/** A measuring tape, half unrolled. 240 × 180. */
export function MeasuringTapeArt() {
  const tape = "M78 104C120 110 150 150 196 146C232 143 236 112 210 100C186 89 170 116 190 124";
  return (
    <svg viewBox="0 0 240 180" className="block h-full w-full overflow-visible" aria-hidden>
      <g filter={wash("a")}>
        <path d={tape} fill="none" stroke="color-mix(in srgb, var(--brass) 55%, var(--aged-ivory))" strokeWidth={22} strokeLinecap="butt" />
      </g>
      <g filter={pencil} fill="none" strokeLinecap="butt">
        <path d={tape} stroke="var(--wine)" strokeWidth={9} strokeDasharray="0.9 5.1" transform="translate(0 -5)" opacity={0.8} />
        <path d={tape} stroke="var(--vermilion)" strokeWidth={2} strokeDasharray="1.2 28.8" transform="translate(0 -3)" />
      </g>
      <Line w={0.7} o={0.55}>
        <path d={tape} transform="translate(0 -11)" />
        <path d={tape} transform="translate(0 11)" />
      </Line>
      {/* the case */}
      <g filter={wash("b")}>
        <circle cx={70} cy={84} r={56} fill="var(--vermilion)" />
        <circle cx={70} cy={84} r={38} fill="color-mix(in srgb, var(--vermilion) 55%, var(--aged-ivory))" />
        <circle cx={70} cy={84} r={12} fill="var(--brass)" />
      </g>
      <g filter={wash("a")}>
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return <circle key={i} cx={70 + Math.cos(a) * 47} cy={84 + Math.sin(a) * 47} r={3.6} fill="var(--aged-ivory)" />;
        })}
      </g>
      <Line w={1.1} o={0.75}>
        <circle cx={70} cy={84} r={56} />
        <circle cx={70} cy={84} r={38} strokeWidth={0.7} />
        <circle cx={70} cy={84} r={12} />
        <path d="M64 84h12M70 78v12" strokeWidth={0.8} />
      </Line>
      <text x={70} y={64} textAnchor="middle" fontFamily="var(--font-display)" fontSize={8} letterSpacing={1.4} fill="var(--wine)">
        INCHES · CM
      </text>
      {/* the metal tip */}
      <g filter={wash("c")}>
        <path d="M184 116l12 2 2 14-12-2z" fill="var(--brass)" />
      </g>
    </svg>
  );
}

/** A large runway print with a paper clip. 160 × 200. */
export function RunwayPrintArt() {
  const r = rng(521);
  return (
    <svg viewBox="0 0 160 200" className="block h-full w-full overflow-visible" aria-hidden>
      <g filter={wash("c")}>
        <path d={handRect(4, 4, 152, 192, r, 0.9)} fill={paper} />
      </g>
      <g filter={wash("a")}>
        <path d={handRect(14, 14, 132, 150, r, 0.6)} fill="var(--powder-blue)" />
        {/* the arch at the end of the runway */}
        <path d="M58 92V64a22 22 0 0 1 44 0v28Z" fill="color-mix(in srgb, var(--aged-ivory) 70%, white)" />
        {/* the runway, running toward us */}
        <path d="M66 92H94L132 164H28Z" fill="var(--vermilion)" />
        {/* the audience on either side */}
        <path d="M14 112L60 94V164H14Z" fill="var(--wine)" opacity={0.55} />
        <path d="M146 112L100 94V164H146Z" fill="var(--wine)" opacity={0.55} />
      </g>
      <g filter={wash("b")}>
        {[34, 80, 126].map((x, i) => (
          <path key={i} d={`M${x - 3} 18h6l10 44h-26z`} fill="var(--brass)" opacity={0.35} />
        ))}
        {[34, 80, 126].map((x, i) => (
          <circle key={`b${i}`} cx={x} cy={20} r={4} fill="var(--brass)" />
        ))}
      </g>
      <Line w={0.8} o={0.7}>
        <path d={handRect(4, 4, 152, 192, r, 0.9)} />
        <path d="M66 92H94L132 164H28Z" strokeWidth={0.7} />
        <path d="M80 96V164" strokeDasharray="3 4" strokeWidth={0.6} stroke="var(--aged-ivory)" />
        {/* one walking figure */}
        <path d="M80 100a4.5 4.5 0 1 1 0.1 0M80 104l-7 26h14zM77 130l-2 12M83 130l3 12" strokeWidth={0.9} />
      </Line>
      <Line w={0.6} o={0.45}>
        {[120, 130, 140, 150].map((y) => (
          <path key={y} d={`M18 ${y}h${(y - 100) * 0.7}M142 ${y}h-${(y - 100) * 0.7}`} strokeDasharray="1 4" />
        ))}
      </Line>
      <text x={80} y={184} textAnchor="middle" fontFamily="var(--font-title)" fontSize={13} fill="var(--wine)">
        the runway
      </text>
      {/* paper clip */}
      <Line c="var(--brass)" w={2} o={0.95}>
        <path d="M118 -6v30a6 6 0 0 0 12 0V-2a4 4 0 0 0-8 0v22" />
      </Line>
    </svg>
  );
}

/* --- The table and the clutter on it ------------------------------------ */

type Piece = { k: keyof typeof parts; x: number; y: number; r?: number; s?: number };

const parts = {
  swatchRed: (r: Rng) => (
    <>
      <g filter={wash("a")}>
        <path d={pinked(-40, -40, 80, 80, r)} fill="var(--vermilion)" />
      </g>
      <g filter={wash("c")}>
        {Array.from({ length: 16 }, (_, i) => (
          <circle key={i} cx={-30 + (i % 4) * 20 + (Math.floor(i / 4) % 2) * 10} cy={-30 + Math.floor(i / 4) * 20} r={3.4} fill={paper} />
        ))}
      </g>
      <Line w={0.8} o={0.5}><path d={pinked(-40, -40, 80, 80, r)} /></Line>
    </>
  ),
  swatchGreen: (r: Rng) => (
    <>
      <g filter={wash("b")}>
        <path d={pinked(-36, -44, 72, 88, r)} fill="var(--botanical-green)" />
      </g>
      <g filter={wash("a")}>
        {[[-16, -22], [14, 2], [-12, 26]].map(([x, y], i) => (
          <g key={i} transform={at(x, y, i * 40)}>
            {tulipPetals(8, r).map((d, j) => <path key={j} d={d} fill={i === 1 ? "var(--brass)" : "var(--aged-ivory)"} />)}
          </g>
        ))}
      </g>
      <Line w={0.8} o={0.5}><path d={pinked(-36, -44, 72, 88, r)} /></Line>
    </>
  ),
  swatchBlue: (r: Rng) => (
    <>
      <g filter={wash("c")}>
        <path d={pinked(-38, -34, 76, 68, r)} fill="var(--brass)" />
      </g>
      <g opacity={0.35} fill="var(--aged-ivory)">
        {[-26, -10, 6, 22].map((x) => <rect key={x} x={x} y={-32} width={8} height={64} />)}
        {[-24, -8, 8, 24].map((y) => <rect key={y} x={-36} y={y - 4} width={72} height={8} />)}
      </g>
      <Line w={0.8} o={0.5}><path d={pinked(-38, -34, 76, 68, r)} /></Line>
    </>
  ),
  patternPaper: (r: Rng) => (
    <>
      <g filter={wash("a")}>
        <path d={handRect(-170, -120, 340, 240, r, 2)} fill="color-mix(in srgb, var(--aged-ivory) 45%, white)" />
      </g>
      <g stroke="var(--powder-blue)" strokeWidth={0.8} opacity={0.6}>
        {Array.from({ length: 16 }, (_, i) => <line key={`v${i}`} x1={-160 + i * 21} y1={-112} x2={-160 + i * 21} y2={112} />)}
        {Array.from({ length: 11 }, (_, i) => <line key={`h${i}`} x1={-162} y1={-105 + i * 21} x2={162} y2={-105 + i * 21} />)}
      </g>
      <Line w={1.2} o={0.6} c="var(--vermilion)">
        <path d="M-120-80C-90-92-60-92-30-80L-20 70C-60 80-100 80-130 70Z" strokeDasharray="6 4" />
        <path d="M30-70H130L120 80H40Z" strokeDasharray="6 4" />
        <path d="M-75-70V60M80-60V70" strokeWidth={0.7} />
      </Line>
      <Line w={0.8} o={0.4}><path d={handRect(-170, -120, 340, 240, r, 2)} /></Line>
    </>
  ),
  ribbonRed: () => (
    <g filter={wash("b")} fill="none" strokeLinecap="round">
      <path d="M-160 20C-100-40-40 60 20 0S120-30 170 10" stroke="var(--vermilion)" strokeWidth={13} />
      <path d="M-160 20C-100-40-40 60 20 0S120-30 170 10" stroke="var(--aged-ivory)" strokeWidth={1.4} opacity={0.6} transform="translate(0 -3)" />
    </g>
  ),
  ribbonBlue: () => (
    <g filter={wash("c")} fill="none" strokeLinecap="round">
      <path d="M-130-10C-70 40-20-50 40 10S110 50 140 0" stroke="color-mix(in srgb, var(--vermilion) 55%, var(--aged-ivory))" strokeWidth={10} />
    </g>
  ),
  scissors: (r: Rng) => (
    <>
      <g filter={wash("c")}>
        <path d="M0 0L118-14 120-8Z" fill="color-mix(in srgb, var(--powder-blue) 40%, white)" />
        <path d="M0 0L118 14 120 8Z" fill="color-mix(in srgb, var(--powder-blue) 50%, white)" />
      </g>
      <g filter={wash("a")}>
        <circle cx={-22} cy={-16} r={18} fill="none" stroke="var(--brass)" strokeWidth={8} />
        <circle cx={-22} cy={18} r={18} fill="none" stroke="var(--brass)" strokeWidth={8} />
      </g>
      <Line w={0.9} o={0.7}>
        <path d="M0 0L118-14 120-8ZM0 0L118 14 120 8Z" />
        <path d="M-6-4L0 0-6 4" />
        <circle cx={0} cy={0} r={3} />
      </Line>
      <Line c="var(--wine)" w={0.6} o={0.4}><path d={handLine([[20, -3], [100, -10]], r, 0.4)} /></Line>
    </>
  ),
  pincushion: (r: Rng) => (
    <>
      <g filter={wash("b")}>
        <ellipse cx={0} cy={0} rx={42} ry={36} fill="var(--vermilion)" />
        <path d={leaf(22, r)} transform="rotate(-70)" fill="var(--botanical-green)" />
        <path d={leaf(22, r)} transform="rotate(-120)" fill="var(--botanical-green)" />
      </g>
      <Line w={0.9} o={0.6}>
        <ellipse cx={0} cy={0} rx={42} ry={36} />
        <path d="M0-36V36M-30-20C-14 0-14 10-28 24M30-20C14 0 14 10 28 24" strokeWidth={0.7} />
        {[[-24, -10], [16, -16], [6, 16], [-12, 22], [26, 10]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y}l${10 - i * 4} -22`} strokeWidth={0.8} />
        ))}
      </Line>
      <g filter={wash("a")}>
        {[[-24, -10], [16, -16], [6, 16], [-12, 22], [26, 10]].map(([x, y], i) => (
          <circle key={i} cx={x + 10 - i * 4} cy={y - 22} r={4} fill={[ink.blue, ink.brass, ink.green, "var(--aged-ivory)", ink.blue][i]} />
        ))}
      </g>
    </>
  ),
  spools: (r: Rng) => (
    <>
      {[ink.blue, ink.green, ink.vermilion].map((c, i) => (
        <g key={i} transform={`translate(${i * 40} ${i % 2 ? 10 : 0})`}>
          <g filter={wash(i % 2 ? "a" : "b")}>
            <rect x={-14} y={-26} width={28} height={52} fill={c} />
            <ellipse cx={0} cy={-27} rx={18} ry={6} fill="var(--walnut)" />
            <ellipse cx={0} cy={27} rx={18} ry={6} fill="var(--walnut)" />
          </g>
          <Line w={0.7} o={0.55}>
            <ellipse cx={0} cy={-27} rx={18} ry={6} />
            <path d="M-14-18H14M-14-6H14M-14 6H14M-14 18H14" strokeWidth={0.5} />
          </Line>
        </g>
      ))}
      <Line c="var(--vermilion)" w={1} o={0.8}><path d={handLine([[94, 30], [130, 50], [120, 80], [160, 74]], r, 2)} /></Line>
    </>
  ),
  note: (r: Rng) => (
    <>
      <g filter={wash("a")}>
        <path d={handRect(-50, -40, 100, 80, r, 1)} fill="color-mix(in srgb, var(--brass) 35%, var(--aged-ivory))" />
      </g>
      <Line w={0.7} o={0.6}>
        <path d={handRect(-50, -40, 100, 80, r, 1)} />
        {[-22, -8, 6, 20].map((y, i) => <path key={y} d={handLine([[-38, y], [24 - i * 8, y + 1]], r, 0.8)} />)}
      </Line>
      <g filter={wash("b")}><path d={heart(6)} transform={at(32, 22)} fill="var(--vermilion)" /></g>
    </>
  ),
  pass: (r: Rng) => (
    <>
      <g filter={wash("b")} fill="none" strokeLinecap="round">
        <path d="M0-50C-40-110 40-150 70-120" stroke="var(--botanical-green)" strokeWidth={8} />
      </g>
      <g filter={wash("a")}>
        <path d={handRect(-38, -50, 76, 104, r, 0.8)} fill={paper} />
        <path d={handRect(-38, -50, 76, 28, r, 0.6)} fill="var(--botanical-green)" />
      </g>
      <Line w={0.8} o={0.6}>
        <path d={handRect(-38, -50, 76, 104, r, 0.8)} />
        <path d={handRect(-24, -2, 48, 34, r, 0.5)} strokeDasharray="2 2" />
      </Line>
      <text x={0} y={-32} textAnchor="middle" fontFamily="var(--font-display)" fontSize={9} letterSpacing={1.6} fill="var(--aged-ivory)">BACKSTAGE</text>
      <text x={0} y={46} textAnchor="middle" fontFamily="var(--font-display)" fontSize={7} letterSpacing={1.2} fill="var(--wine)">ALL ACCESS</text>
    </>
  ),
  buttons: () => (
    <>
      {[[0, 0, ink.vermilion], [26, 12, ink.blue], [8, 30, ink.brass], [40, -10, ink.green]].map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g filter={wash("a")}><circle r={9} fill={c as string} /></g>
          <Line w={0.6} o={0.6}><circle r={9} /><path d="M-3-3h.1M3-3h.1M-3 3h.1M3 3h.1" strokeWidth={1.6} /></Line>
        </g>
      ))}
    </>
  ),
  pencilRed: () => (
    <>
      <g filter={wash("c")}>
        <rect x={-70} y={-4} width={130} height={8} fill="var(--vermilion)" />
        <path d="M60-4L76 0 60 4Z" fill="var(--walnut)" />
      </g>
      <Line w={0.7} o={0.6}><path d="M-70-4H60L76 0 60 4H-70Z" /></Line>
    </>
  ),
  bouquet: (r: Rng) => (
    <g filter={wash("b")}>
      {[0, 50, -50].map((a, i) => (
        <g key={i} transform={at(0, 0, a)}>
          <path d={leaf(40, r)} transform="rotate(-90)" fill="var(--botanical-green)" />
          <g transform="translate(0 -44)">
            {tulipPetals(12, r).map((d, j) => <path key={j} d={d} fill={[ink.vermilion, ink.brass, ink.blue][i]} />)}
          </g>
        </g>
      ))}
    </g>
  ),
};

/** Where the clutter sits: one arrangement for wide screens, one for phones. */
const wideLayout: Piece[] = [
  { k: "patternPaper", x: 560, y: 560, r: -4, s: 1.25 },
  { k: "ribbonRed", x: 1060, y: 610, r: -8, s: 1.3 },
  { k: "swatchRed", x: 560, y: 150, r: 8 },
  { k: "swatchGreen", x: 660, y: 130, r: -10 },
  { k: "swatchBlue", x: 760, y: 170, r: 14 },
  { k: "scissors", x: 640, y: 880, r: -18, s: 1.1 },
  { k: "pincushion", x: 905, y: 470, s: 1.35 },
  { k: "spools", x: 840, y: 880, r: 6 },
  { k: "note", x: 410, y: 860, r: 6 },
  { k: "pass", x: 1035, y: 880, r: 12 },
  { k: "buttons", x: 1270, y: 140 },
  { k: "ribbonBlue", x: 230, y: 560, r: 20, s: 0.9 },
  { k: "pencilRed", x: 1000, y: 330, r: 64 },
  { k: "bouquet", x: 1480, y: 170, r: 18, s: 1.1 },
];

const narrowLayout: Piece[] = [
  { k: "patternPaper", x: 200, y: 520, r: -6, s: 0.9 },
  { k: "ribbonRed", x: 340, y: 300, r: -12, s: 0.85 },
  { k: "swatchRed", x: 590, y: 560, r: 10, s: 0.8 },
  { k: "swatchBlue", x: 610, y: 640, r: -12, s: 0.75 },
  { k: "scissors", x: 420, y: 905, r: -14, s: 0.7 },
  { k: "buttons", x: 70, y: 280 },
  { k: "spools", x: 300, y: 670, r: 8, s: 0.6 },
];

/** The drafting table seen from a little above, with everything that isn't clickable. */
export function AtelierDesk({ narrow = false }: { narrow?: boolean }) {
  const W = narrow ? 680 : 1600;
  const H = 1000;
  const r = rng(narrow ? 77 : 99);
  const top = handPoly([[narrow ? 20 : 70, 30], [W - (narrow ? 20 : 70), 30], [W - 6, H - 60], [6, H - 60]], r, 3);
  const layout = narrow ? narrowLayout : wideLayout;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      {/* legs and the front edge of the table */}
      <g filter={wash("b")}>
        <path d={handRect(30, H - 70, W - 60, 56, r, 2)} fill="color-mix(in srgb, var(--walnut) 80%, var(--wine))" />
      </g>
      {/* a painted table, in the cabinet's powder blue */}
      <g filter={wash("a")}>
        <path d={top} fill="var(--powder-blue)" />
      </g>
      {/* a folk-art border painted round the edge of the top */}
      <g filter={pencil} fill="none" strokeLinecap="round">
        <path d={handPoly([[(narrow ? 20 : 70) + 26, 86], [W - (narrow ? 20 : 70) - 26, 86], [W - 34, H - 86], [34, H - 86]], r, 2)} stroke="var(--vermilion)" strokeWidth={2.4} opacity={0.6} strokeDasharray="14 6 2 6" />
      </g>
      {/* wood grain in pencil */}
      <Line w={1} o={0.3}>
        {Array.from({ length: narrow ? 9 : 12 }, (_, i) => {
          const y = 70 + i * ((H - 150) / (narrow ? 9 : 12));
          return <path key={i} d={handLine([[40, y], [W * 0.3, y + 6], [W * 0.6, y - 4], [W - 40, y + 3]], r, 3)} />;
        })}
        <path d={top} strokeWidth={1.6} opacity={0.6} />
      </Line>
      {/* a brass ruler along the top edge */}
      <g filter={wash("c")}>
        <path d={handRect(narrow ? 40 : 110, 44, W - (narrow ? 80 : 220), 26, r, 0.8)} fill="color-mix(in srgb, var(--brass) 75%, var(--aged-ivory))" />
      </g>
      <Line w={0.8} o={0.6}>
        {Array.from({ length: Math.floor((W - (narrow ? 80 : 220)) / 20) }, (_, i) => (
          <path key={i} d={`M${(narrow ? 40 : 110) + i * 20} 44v${i % 5 ? 7 : 13}`} />
        ))}
      </Line>
      {layout.map((p, i) => (
        <g key={i} transform={at(p.x, p.y, p.r ?? 0, p.s ?? 1)}>
          {parts[p.k](rng(i * 17 + 5))}
        </g>
      ))}
    </svg>
  );
}
