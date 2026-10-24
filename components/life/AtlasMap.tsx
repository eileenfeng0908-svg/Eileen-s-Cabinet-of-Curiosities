import { ATLAS_H, ATLAS_W, borders, graticule, land, sphere } from "@/lib/atlas/geo";
import { project } from "@/lib/atlas/projection";
import { Bouquet } from "@/components/cabinet/Florals";
import { pencil, wash } from "@/components/cabinet/PaintDefs";

/**
 * The painted world beneath the landmarks: watercolour seas and lands drawn
 * from real coastlines, pencilled borders and graticule, hand-lettered
 * oceans and continents, a compass rose and a title cartouche. Static: it
 * is rendered once on the server and moved as a whole by the Atlas.
 */

const at = (lat: number, lon: number) => project(lat, lon);

/** Washes of colour over the land, as a mapmaker would tint forests and deserts. */
const tints: { lat: number; lon: number; rx: number; ry: number; color: string }[] = [
  { lat: -6, lon: -62, rx: 120, ry: 90, color: "var(--botanical-green)" },
  { lat: 2, lon: 20, rx: 100, ry: 70, color: "var(--botanical-green)" },
  { lat: 14, lon: 102, rx: 80, ry: 70, color: "var(--botanical-green)" },
  { lat: 50, lon: 12, rx: 90, ry: 40, color: "var(--botanical-green)" },
  { lat: 60, lon: 95, rx: 220, ry: 50, color: "var(--botanical-green)" },
  { lat: 42, lon: -85, rx: 110, ry: 60, color: "var(--botanical-green)" },
  { lat: 58, lon: -110, rx: 160, ry: 45, color: "var(--botanical-green)" },
  { lat: 23, lon: 10, rx: 170, ry: 50, color: "var(--brass)" },
  { lat: 23, lon: 46, rx: 60, ry: 45, color: "var(--brass)" },
  { lat: -25, lon: 133, rx: 90, ry: 60, color: "var(--brass)" },
  { lat: 43, lon: 103, rx: 110, ry: 30, color: "var(--brass)" },
  { lat: 33, lon: -110, rx: 50, ry: 35, color: "var(--brass)" },
  { lat: -22, lon: 22, rx: 60, ry: 50, color: "var(--walnut)" },
  { lat: 33, lon: 85, rx: 80, ry: 30, color: "var(--vermilion)" },
  { lat: -12, lon: -45, rx: 60, ry: 50, color: "var(--vermilion)" },
];

const tintColors = [["green", "var(--botanical-green)"], ["brass", "var(--brass)"], ["walnut", "var(--walnut)"], ["vermilion", "var(--vermilion)"]] as const;

const oceans: { name: string; lat: number; lon: number; size?: number; rotate?: number }[] = [
  { name: "Pacific Ocean", lat: 8, lon: -142, size: 26 },
  { name: "Pacific Ocean", lat: -8, lon: 178, size: 18, rotate: -4 },
  { name: "Atlantic Ocean", lat: 26, lon: -42, size: 22, rotate: -8 },
  { name: "Indian Ocean", lat: -18, lon: 80, size: 22 },
  { name: "Southern Ocean", lat: -54, lon: 95, size: 16 },
  { name: "Arctic Ocean", lat: 75.5, lon: 40, size: 14 },
];

const continents: { name: string; lat: number; lon: number }[] = [
  { name: "North America", lat: 50, lon: -104 },
  { name: "South America", lat: -14, lon: -62 },
  { name: "Europe", lat: 59, lon: 22 },
  { name: "Africa", lat: 6, lon: 20 },
  { name: "Asia", lat: 50, lon: 88 },
  { name: "Oceania", lat: -22, lon: 128 },
];

/** Little pencilled waves scattered over open water. */
const waves: [number, number][] = [
  [20, -160], [-20, -125], [-35, -100], [40, -150], [-5, -115], [10, -30], [-25, -20], [45, -35], [-35, 5], [-35, 60], [5, 65], [-40, 110], [25, 155], [40, 170], [-30, 175], [-45, -60], [15, -55], [-15, 100],
];

export function AtlasMap() {
  const [cx, cy] = at(-42, -150);
  const [kx, ky] = at(-44, -24);
  return (
    <svg viewBox={`0 0 ${ATLAS_W} ${ATLAS_H}`} width={ATLAS_W} height={ATLAS_H} aria-hidden className="absolute left-0 top-0 block">
      <defs>
        <clipPath id="atlas-land">
          <path d={land} />
        </clipPath>
        <clipPath id="atlas-sphere">
          <path d={sphere} />
        </clipPath>
        {tintColors.map(([k, col]) => (
          <radialGradient key={k} id={`atlas-tint-${k}`}>
            <stop offset="0" stopColor={col} stopOpacity={0.5} />
            <stop offset="0.55" stopColor={col} stopOpacity={0.3} />
            <stop offset="1" stopColor={col} stopOpacity={0} />
          </radialGradient>
        ))}
      </defs>

      {/* the sea */}
      <path d={sphere} fill="color-mix(in srgb, var(--powder-blue) 52%, var(--aged-ivory))" />
      <path d={sphere} fill="color-mix(in srgb, var(--powder-blue) 80%, var(--aged-ivory))" filter={wash("b")} fillOpacity={0.8} />
      <g clipPath="url(#atlas-sphere)">
        <path d={sphere} fill="none" stroke="var(--powder-blue)" strokeWidth={46} strokeOpacity={0.5} filter={wash("c")} />
        <path d={graticule} fill="none" stroke="var(--brass)" strokeWidth={0.7} strokeOpacity={0.45} filter={pencil} />
        {/* coastal shading: the sea darkens where it meets the land */}
        <path d={land} fill="none" stroke="var(--powder-blue)" strokeWidth={14} strokeOpacity={0.4} strokeLinejoin="round" />
        <path d={land} fill="none" stroke="color-mix(in srgb, var(--powder-blue) 70%, var(--wine))" strokeWidth={5} strokeOpacity={0.3} strokeLinejoin="round" />
      </g>

      {/* the land */}
      <g clipPath="url(#atlas-sphere)">
        <path d={land} fill="color-mix(in srgb, var(--aged-ivory) 86%, var(--walnut))" />
        <path d={land} fill="color-mix(in srgb, var(--aged-ivory) 72%, var(--walnut))" filter={wash("a")} fillOpacity={0.75} />
      </g>
      <g clipPath="url(#atlas-land)">
        {tints.map((t, i) => {
          const [x, y] = at(t.lat, t.lon);
          return <ellipse key={i} cx={x} cy={y} rx={t.rx * 1.25} ry={t.ry * 1.25} fill={`url(#atlas-tint-${tintColors.find(([, c]) => c === t.color)![0]})`} />;
        })}
      </g>
      <path d={borders} fill="none" stroke="var(--wine)" strokeWidth={0.6} strokeOpacity={0.35} strokeDasharray="2 2.4" />
      <path d={land} fill="none" stroke="var(--wine)" strokeWidth={1} strokeOpacity={0.55} strokeLinejoin="round" filter={pencil} clipPath="url(#atlas-sphere)" />

      {/* waves */}
      <g fill="none" stroke="color-mix(in srgb, var(--powder-blue) 55%, var(--wine))" strokeOpacity={0.45} strokeWidth={0.9} strokeLinecap="round" filter={pencil}>
        {waves.map(([lat, lon], i) => {
          const [x, y] = at(lat, lon);
          return <path key={i} d={`M${x - 9} ${y}q3 -3 6 0t6 0t6 0`} />;
        })}
      </g>

      {/* lettering */}
      <g fontFamily="var(--font-display)" fill="var(--wine)" textAnchor="middle">
        {oceans.map((o, i) => {
          const [x, y] = at(o.lat, o.lon);
          return (
            <text key={i} x={x} y={y} fontSize={o.size ?? 20} fontStyle="italic" letterSpacing={(o.size ?? 20) * 0.28} fillOpacity={0.6} transform={o.rotate ? `rotate(${o.rotate} ${x} ${y})` : undefined}>
              {o.name}
            </text>
          );
        })}
        {continents.map((n) => {
          const [x, y] = at(n.lat, n.lon);
          return (
            <text key={n.name} x={x} y={y} fontSize={15} fontFamily="var(--font-sc)" letterSpacing={6} fillOpacity={0.7}>
              {n.name.toUpperCase()}
            </text>
          );
        })}
      </g>

      {/* compass rose */}
      <g transform={`translate(${cx} ${cy})`}>
        <circle r={46} fill="none" stroke="var(--wine)" strokeOpacity={0.5} strokeWidth={0.8} filter={pencil} />
        <circle r={40} fill="none" stroke="var(--brass)" strokeWidth={1.4} filter={pencil} />
        <g filter={wash("c")}>
          {[0, 90, 180, 270].map((a) => (
            <path key={a} d="M0 0L-7 -7L0 -44L7 -7Z" transform={`rotate(${a})`} fill={a === 0 ? "var(--vermilion)" : "var(--brass)"} />
          ))}
          {[45, 135, 225, 315].map((a) => (
            <path key={a} d="M0 0L-4 -4L0 -28L4 -4Z" transform={`rotate(${a})`} fill="var(--powder-blue)" />
          ))}
        </g>
        <circle r={4} fill="var(--aged-ivory)" stroke="var(--wine)" strokeWidth={0.8} />
        <text y={-52} textAnchor="middle" fontFamily="var(--font-sc)" fontSize={14} fill="var(--wine)">N</text>
      </g>

      {/* cartouche */}
      <g transform={`translate(${kx} ${ky})`}>
        <path d="M-150 -34Q-160 -34 -164 -24L-170 -6L-160 0L-170 6L-164 24Q-160 34 -150 34H150Q160 34 164 24L170 6L160 0L170 -6L164 -24Q160 -34 150 -34Z" fill="color-mix(in srgb, var(--aged-ivory) 60%, white)" filter={wash("a")} />
        <path d="M-150 -34Q-160 -34 -164 -24L-170 -6L-160 0L-170 6L-164 24Q-160 34 -150 34H150Q160 34 164 24L170 6L160 0L170 -6L164 -24Q160 -34 150 -34Z" fill="none" stroke="var(--brass)" strokeWidth={1.4} filter={pencil} />
        <path d="M-142 -26H142V26H-142Z" fill="none" stroke="var(--wine)" strokeOpacity={0.4} strokeWidth={0.7} filter={pencil} />
        <g transform="translate(-60 -64)">
          <Bouquet kind="garland" box={{ x: 0, y: 0, w: 120, h: 26 }} seed={33} w="c" />
        </g>
        <text y={-2} textAnchor="middle" fontFamily="var(--font-display)" fontSize={26} fill="var(--wine)">
          Life, in <tspan fontStyle="italic" fill="var(--vermilion)">Fragments</tspan>
        </text>
        <text y={19} textAnchor="middle" fontFamily="var(--font-sc)" fontSize={11} letterSpacing={3.5} fill="var(--wine)">
          AN ATLAS OF ORDINARY DAYS
        </text>
      </g>

      {/* the neat line round the world */}
      <path d={sphere} fill="none" stroke="var(--wine)" strokeWidth={1.4} strokeOpacity={0.7} filter={pencil} />
    </svg>
  );
}
