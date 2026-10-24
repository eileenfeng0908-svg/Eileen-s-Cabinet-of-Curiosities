import { at, handLine, handPoly, handRect, heart, leaf, rng, tulipPetals } from "./paint";
import { pencil, wash } from "./PaintDefs";

/**
 * The things on the shelves, one for each collection, painted in the same
 * watercolour and pencil as the cabinet. Each sits in a 160 × 160 box with
 * its base on y ≈ 150 (the shelf).
 */

const Svg = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <svg viewBox="0 0 160 160" className={className} aria-hidden overflow="visible">
    {children}
  </svg>
);
const Line = ({ children, w = 1, o = 0.75, c = "var(--wine)" }: { children: React.ReactNode; w?: number; o?: number; c?: string }) => (
  <g filter={pencil} fill="none" stroke={c} strokeWidth={w} opacity={o} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </g>
);

/** Cinema: a film reel with a length of film run out along the shelf. */
export function FilmReel({ className }: { className?: string }) {
  const r = rng(1);
  const holes = [0, 72, 144, 216, 288].map((a) => {
    const rad = ((a - 90) * Math.PI) / 180;
    return [80 + Math.cos(rad) * 27, 82 + Math.sin(rad) * 27];
  });
  return (
    <Svg className={className}>
      <g filter={wash("b")}>
        <path d="M108 112C126 130 132 146 150 150L150 160 28 160 28 150C70 150 104 142 108 112Z" fill="var(--walnut)" />
        <circle cx={80} cy={82} r={54} fill="var(--powder-blue)" />
        {holes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={12} fill="var(--wine)" fillOpacity={0.9} />)}
        <circle cx={80} cy={82} r={10} fill="var(--brass)" />
      </g>
      <Line>
        <circle cx={80} cy={82} r={54} />
        <circle cx={80} cy={82} r={47} strokeWidth={0.6} />
        <circle cx={80} cy={82} r={3} />
      </Line>
      <Line c="var(--aged-ivory)" w={2} o={0.9}>
        <path d="M112 122C128 138 136 150 150 154M36 154L140 154" strokeDasharray="3 4" />
      </Line>
    </Svg>
  );
}

/** Art & Curation: a small painting in a gilded frame on an easel. */
export function FramedPainting({ className }: { className?: string }) {
  const r = rng(2);
  return (
    <Svg className={className}>
      <Line w={2.4} c="var(--walnut)" o={1}>
        <path d="M66 120L52 152M94 120L108 152M80 118L80 150" />
      </Line>
      <g transform="rotate(-3 80 70)">
        <g filter={wash("c")}>
          <path d={handRect(26, 14, 108, 110, r, 1.4)} fill="var(--brass)" />
          <path d={handRect(38, 26, 84, 86, r, 1)} fill="var(--powder-blue)" />
          <path d="M38 82C56 70 72 74 88 68S112 66 122 72L122 112 38 112Z" fill="var(--botanical-green)" />
          <path d="M38 96C60 92 90 98 122 92L122 112 38 112Z" fill="var(--walnut)" fillOpacity={0.8} />
          <circle cx={98} cy={48} r={9} fill="var(--vermilion)" fillOpacity={0.9} />
        </g>
        <Line>
          <path d={handRect(26, 14, 108, 110, r, 1.4)} />
          <path d={handRect(38, 26, 84, 86, r, 1)} strokeWidth={0.7} />
        </Line>
        <Line c="var(--aged-ivory)" w={1.2} o={0.8}>
          <path d="M30 20L130 20M30 120L130 120" strokeDasharray="1 4" />
        </Line>
      </g>
    </Svg>
  );
}

/** Writings: books on end and a notebook leaning on them. */
export function Notebook({ className }: { className?: string }) {
  const r = rng(3);
  const books = [
    { x: 22, w: 20, h: 104, c: "var(--botanical-green)" },
    { x: 43, w: 16, h: 92, c: "var(--vermilion)" },
    { x: 60, w: 22, h: 112, c: "var(--powder-blue)" },
  ];
  return (
    <Svg className={className}>
      <g filter={wash("a")}>
        {books.map((b, i) => <path key={i} d={handRect(b.x, 150 - b.h, b.w, b.h, r, 0.8)} fill={b.c} />)}
        <path d={handPoly([[86, 150], [132, 150], [146, 52], [104, 44]], r, 1)} fill="var(--aged-ivory)" />
        <path d={handPoly([[86, 150], [92, 150], [108, 46], [104, 44]], r, 0.6)} fill="var(--wine)" fillOpacity={0.85} />
        <path d="M126 50L128 82 122 76 118 84 116 50Z" fill="var(--vermilion)" />
      </g>
      <Line>
        {books.map((b, i) => <path key={i} d={handRect(b.x, 150 - b.h, b.w, b.h, r, 0.8)} />)}
        {books.map((b, i) => <path key={`b${i}`} d={`M${b.x + 3} ${160 - b.h}h${b.w - 6}M${b.x + 3} 138h${b.w - 6}`} stroke="var(--brass)" strokeWidth={1.6} />)}
        <path d={handPoly([[86, 150], [132, 150], [146, 52], [104, 44]], r, 1)} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={`l${i}`} d={handLine([[104 - i * 2.2, 66 + i * 12], [136 - i * 2.2, 70 + i * 12]], r, 1.2)} strokeWidth={0.6} opacity={0.5} />
        ))}
      </Line>
    </Svg>
  );
}

/** Photography: a folding camera, walnut and brass. */
export function Camera({ className }: { className?: string }) {
  const r = rng(4);
  return (
    <Svg className={className}>
      <Line w={1.6} c="var(--vermilion)" o={0.9}>
        <path d="M28 82C14 104 22 134 40 146M132 82C146 104 138 134 120 146" />
      </Line>
      <g filter={wash("b")}>
        <path d={handRect(54, 46, 50, 22, r, 1)} fill="var(--brass)" />
        <path d={handRect(24, 66, 112, 18, r, 1)} fill="var(--brass)" />
        <path d={handRect(24, 82, 112, 62, r, 1.2)} fill="var(--walnut)" />
        <circle cx={80} cy={112} r={28} fill="var(--aged-ivory)" />
        <circle cx={80} cy={112} r={19} fill="var(--wine)" />
        <circle cx={80} cy={112} r={9} fill="var(--powder-blue)" />
        <circle cx={118} cy={62} r={5} fill="var(--vermilion)" />
      </g>
      <Line>
        <path d={handRect(24, 66, 112, 78, r, 1.2)} />
        <path d={handRect(54, 46, 50, 22, r, 1)} />
        <circle cx={80} cy={112} r={28} />
        <circle cx={80} cy={112} r={19} strokeWidth={0.6} />
        <path d="M30 92h20M30 98h20M110 92h20" strokeWidth={0.6} opacity={0.5} />
      </Line>
      <circle cx={76} cy={108} r={3} fill="var(--aged-ivory)" opacity={0.85} />
    </Svg>
  );
}

/** Fashion: a vermilion silk bow, a spool and two brass buttons. */
export function Ribbon({ className }: { className?: string }) {
  const r = rng(5);
  return (
    <Svg className={className}>
      <g filter={wash("a")}>
        <path d={handRect(108, 98, 36, 50, r, 0.8)} fill="var(--walnut)" />
        <path d={handRect(112, 106, 28, 34, r, 0.6)} fill="var(--botanical-green)" />
        <path d="M70 92C48 64 18 66 20 88S54 110 70 92Z" fill="var(--vermilion)" />
        <path d="M74 92C96 62 128 66 124 88S90 110 74 92Z" fill="var(--vermilion)" fillOpacity={0.9} />
        <path d="M66 96C58 116 48 132 38 148L50 144 56 154C66 136 72 116 74 98Z" fill="var(--vermilion)" fillOpacity={0.85} />
        <path d="M76 96C84 118 92 132 106 146L94 146 90 156C80 136 74 118 72 98Z" fill="var(--vermilion)" fillOpacity={0.8} />
        <circle cx={72} cy={93} r={8} fill="var(--vermilion)" />
        <circle cx={30} cy={140} r={7} fill="var(--brass)" />
        <circle cx={128} cy={60} r={6} fill="var(--brass)" />
      </g>
      <Line>
        <path d="M70 92C48 64 18 66 20 88S54 110 70 92ZM74 92C96 62 128 66 124 88S90 110 74 92Z" />
        <path d="M34 84C42 82 54 86 62 92M110 84C102 82 90 86 82 92" strokeWidth={0.6} opacity={0.5} />
        <circle cx={72} cy={93} r={8} />
        <path d={handRect(108, 98, 36, 50, r, 0.8)} />
        <path d="M27 138h1M33 142h1M125 58h1M131 62h1" strokeWidth={1.6} />
      </Line>
    </Svg>
  );
}

/** Personal Archives: letters with a wax seal and a stamp. */
export function Envelope({ className }: { className?: string }) {
  const r = rng(6);
  return (
    <Svg className={className}>
      <g transform="rotate(-7 80 100)">
        <g filter={wash("c")}>
          <path d={handRect(20, 64, 112, 72, r, 1)} fill="var(--aged-ivory)" />
        </g>
        <Line>
          <path d={handRect(20, 64, 112, 72, r, 1)} />
        </Line>
      </g>
      <g transform="rotate(5 80 100)">
        <g filter={wash("a")}>
          <path d={handRect(30, 74, 112, 72, r, 1)} fill="var(--aged-ivory)" />
          <path d={handRect(112, 80, 22, 26, r, 0.6)} fill="var(--powder-blue)" />
          <path d={heart(5)} transform={at(123, 93)} fill="var(--vermilion)" />
        </g>
        <Line>
          <path d={handRect(30, 74, 112, 72, r, 1)} />
          <path d="M30 74L86 116 142 74" />
          <path d={handRect(112, 80, 22, 26, r, 0.6)} strokeDasharray="2 2" strokeWidth={0.6} />
          <path d={handLine([[46, 126], [84, 128]], r, 0.8)} strokeWidth={0.6} opacity={0.5} />
          <path d={handLine([[46, 134], [74, 135]], r, 0.8)} strokeWidth={0.6} opacity={0.5} />
        </Line>
        <g filter={wash("b")}>
          <path d="M86 104c9-2 15 5 13 13s-11 11-18 7-8-18 5-20z" fill="var(--vermilion)" />
        </g>
        <Line c="var(--wine)" o={0.6}>
          <path d="M86 112c3-2 6 0 5 3s-5 3-6 0" />
        </Line>
      </g>
      {/* a pressed flower tucked between them */}
      <g filter={wash("b")} transform={at(36, 70, -30)}>
        <path d={leaf(22, r)} fill="var(--botanical-green)" />
        <g transform="translate(22 0) rotate(90)">
          {tulipPetals(10, r).map((d, i) => <path key={i} d={d} fill="var(--vermilion)" fillOpacity={0.85} />)}
        </g>
      </g>
    </Svg>
  );
}
