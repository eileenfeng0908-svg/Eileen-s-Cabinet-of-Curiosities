import Image from "next/image";
import type { DrawerObject, ObjectKind } from "@/content/curation";
import { Bouquet } from "@/components/cabinet/Florals";
import { handLine, handPoly, handRect, heart, rng, type Rng } from "@/components/cabinet/paint";
import { pencil, wash } from "@/components/cabinet/PaintDefs";

/**
 * How an object in a drawer looks. With a photograph (`image.src`) the real
 * thing is shown, framed according to its kind; without one, a painted
 * stand-in for that kind of object is drawn by hand, with the object's
 * [placeholder] title written on it so it is never mistaken for the real thing.
 *
 * Every stand-in is drawn in a 100-wide box whose height follows the aspect.
 */
export function ObjectFace({ obj, aspect, sizes }: { obj: DrawerObject; aspect: number; sizes?: string }) {
  if (obj.image?.src) {
    const framed = obj.kind === "photograph" || obj.kind === "postcard";
    return (
      <span className={framed ? "absolute inset-0 bg-ivory-pale p-[5%]" : "absolute inset-0"}>
        <span className="relative block h-full w-full overflow-hidden">
          <Image src={obj.image.src} alt="" fill sizes={sizes ?? "20vw"} className="object-cover" />
        </span>
      </span>
    );
  }

  const h = 100 / aspect;
  const seed = [...obj.id].reduce((a, c) => a + c.charCodeAt(0), 0);
  const r = rng(seed);
  const Face = faces[obj.kind];
  return (
    <svg viewBox={`0 0 100 ${h.toFixed(2)}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
      <Face h={h} r={r} title={obj.title} />
    </svg>
  );
}

type FaceProps = { h: number; r: Rng; title: string };

/** Breaks a title into short lines for small painted labels. */
function lines(text: string, max: number) {
  const out: string[] = [];
  for (const word of text.split(" ")) {
    const last = out[out.length - 1];
    if (last && (last + " " + word).length <= max) out[out.length - 1] = last + " " + word;
    else out.push(word);
  }
  return out;
}

function Label({ x, y, size, text, max = 14, fill = "var(--wine)", anchor = "middle", italic = false }: {
  x: number; y: number; size: number; text: string; max?: number; fill?: string; anchor?: "middle" | "start"; italic?: boolean;
}) {
  return (
    <text x={x} y={y} fontSize={size} fill={fill} textAnchor={anchor} fontFamily="var(--font-display)" fontStyle={italic ? "italic" : undefined}>
      {lines(text, max).map((l, i) => (
        <tspan key={i} x={x} dy={i ? size * 1.15 : 0}>{l}</tspan>
      ))}
    </text>
  );
}

/** A sheet of paper with a hand-drawn edge and a pencil outline. */
function Sheet({ h, r, fill, j = 1.2 }: { h: number; r: Rng; fill: string; j?: number }) {
  const d = handRect(0, 0, 100, h, r, j);
  return (
    <>
      <path d={d} fill={fill} filter={wash("b")} />
      <path d={d} fill="none" stroke="var(--wine)" strokeWidth={0.6} opacity={0.5} filter={pencil} />
    </>
  );
}

const scribble = (r: Rng, x: number, y: number, w: number) =>
  handLine(Array.from({ length: 7 }, (_, i) => [x + (w * i) / 6, y + (i % 2 ? -1.2 : 1.2)] as [number, number]), r, 0.8);

const faces: Record<ObjectKind, (p: FaceProps) => React.ReactNode> = {
  catalogue: ({ h, r, title }) => (
    <>
      <path d={handRect(0, 0, 100, h, r, 1)} fill="var(--wine)" filter={wash("a")} />
      <path d={handRect(0, 0, 9, h, r, 0.6)} fill="url(#ec-hatch)" opacity={0.35} />
      <path d={handRect(16, 10, 76, h - 20, r, 1)} fill="none" stroke="var(--brass)" strokeWidth={1.4} filter={pencil} />
      <Label x={54} y={h * 0.4} size={12} text={title} max={9} fill="var(--aged-ivory)" />
      <text x={54} y={h - 18} fontSize={6.4} fill="var(--brass)" textAnchor="middle" fontFamily="var(--font-sans)" letterSpacing="0.6">CATALOGUE</text>
      <path d={heart(3)} transform={`translate(54 ${h - 30})`} fill="var(--vermilion)" />
    </>
  ),
  poster: ({ h, r, title }) => (
    <>
      <Sheet h={h} r={r} fill="var(--aged-ivory)" />
      <path d={handRect(6, 6, 88, h * 0.58, r, 1.4)} fill="var(--vermilion)" fillOpacity={0.9} filter={wash("c")} />
      <path d={handPoly([[30, h * 0.5], [50, h * 0.18], [70, h * 0.5]], r, 2)} fill="var(--powder-blue)" filter={wash("a")} />
      <Label x={50} y={h * 0.74} size={11} text={title} max={12} />
      {[[8, 4], [92, 4]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.2} fill="var(--brass)" />)}
    </>
  ),
  invitation: ({ h, r, title }) => (
    <>
      <Sheet h={h} r={r} fill="color-mix(in srgb, var(--aged-ivory) 60%, white)" />
      <path d={handRect(6, 6, 88, h - 12, r, 1)} fill="none" stroke="var(--vermilion)" strokeWidth={0.9} strokeDasharray="2 1.6" filter={pencil} />
      <Label x={50} y={h * 0.52} size={10} text={title} max={16} italic />
      <path d={heart(3.4)} transform={`translate(50 ${h * 0.25})`} fill="var(--vermilion)" filter={wash("c")} />
    </>
  ),
  photograph: ({ h, r, title }) => (
    <>
      <path d={handRect(0, 0, 100, h, r, 0.6)} fill="color-mix(in srgb, var(--aged-ivory) 45%, white)" />
      <path d={handRect(6, 6, 88, h - 22, r, 0.6)} fill="var(--powder-blue)" filter={wash("a")} />
      <path d={handPoly([[6, h * 0.55], [40, h * 0.42], [70, h * 0.5], [94, h * 0.44], [94, h - 16], [6, h - 16]], r, 1.6)} fill="var(--walnut)" fillOpacity={0.75} filter={wash("b")} />
      <Label x={50} y={h - 7} size={6} text={title} max={34} italic />
    </>
  ),
  folder: ({ h, r, title }) => (
    <>
      <path d={handPoly([[0, 10], [30, 10], [36, 0], [70, 0], [74, 10], [100, 10], [100, h], [0, h]], r, 1)} fill="color-mix(in srgb, var(--brass) 70%, var(--aged-ivory))" filter={wash("a")} />
      <path d={handLine([[0, 16], [100, 16]], r, 0.6)} stroke="var(--walnut)" strokeWidth={0.8} fill="none" filter={pencil} />
      <path d={handRect(20, h * 0.4, 60, 22, r, 0.8)} fill="var(--aged-ivory)" />
      <Label x={50} y={h * 0.4 + 10} size={7} text={title} max={20} />
    </>
  ),
  notes: ({ h, r, title }) => (
    <>
      <Sheet h={h} r={r} fill="color-mix(in srgb, var(--aged-ivory) 70%, white)" />
      {Array.from({ length: Math.floor((h - 30) / 8) }, (_, i) => (
        <path key={i} d={handLine([[4, 30 + i * 8], [96, 30 + i * 8]], r, 0.3)} stroke="var(--powder-blue)" strokeWidth={0.5} fill="none" />
      ))}
      <path d={handLine([[16, 0], [16, h]], r, 0.3)} stroke="var(--vermilion)" strokeWidth={0.6} fill="none" />
      <g stroke="var(--wine)" strokeWidth={0.7} fill="none" opacity={0.6} filter={pencil}>
        {Array.from({ length: Math.floor((h - 40) / 8) }, (_, i) => <path key={i} d={scribble(r, 20, 37 + i * 8, 50 + ((i * 17) % 26))} />)}
      </g>
      <Label x={20} y={20} size={8} text={title} max={22} anchor="start" />
    </>
  ),
  "floor-plan": ({ h, r, title }) => (
    <>
      <Sheet h={h} r={r} fill="var(--powder-blue)" />
      <g stroke="var(--aged-ivory)" strokeWidth={1.1} fill="none" filter={pencil}>
        <path d={handRect(10, 10, 80, h - 26, r, 0.6)} />
        <path d={handLine([[40, 10], [40, h * 0.5]], r, 0.4)} />
        <path d={handLine([[40, h * 0.5 + 8], [40, h - 16]], r, 0.4)} />
        <path d={handLine([[62, h * 0.38], [90, h * 0.38]], r, 0.4)} />
        <path d={`M40 ${h * 0.5} A8 8 0 0 1 48 ${h * 0.5 + 8}`} />
        {[[22, h * 0.3], [70, h * 0.62], [56, h * 0.24]].map(([x, y], i) => <rect key={i} x={x} y={y} width={8} height={5} />)}
      </g>
      <Label x={12} y={h - 5} size={6} text={title} max={40} anchor="start" fill="var(--aged-ivory)" />
    </>
  ),
  sketch: ({ h, r, title }) => (
    <>
      <Sheet h={h} r={r} fill="color-mix(in srgb, var(--aged-ivory) 80%, white)" />
      <g stroke="var(--wine)" strokeWidth={0.8} fill="none" opacity={0.7} filter={pencil}>
        <path d={handLine([[20, h * 0.75], [30, h * 0.35], [50, h * 0.25], [70, h * 0.38], [80, h * 0.75]], r, 3)} />
        <path d={handLine([[28, h * 0.6], [50, h * 0.5], [72, h * 0.62]], r, 3)} />
        <circle cx={50} cy={h * 0.2} r={8} />
      </g>
      <Label x={50} y={h - 8} size={6.5} text={title} max={20} italic />
    </>
  ),
  arrangement: ({ h, r, title }) => (
    <>
      <Sheet h={h} r={r} fill="color-mix(in srgb, var(--walnut) 45%, var(--aged-ivory))" />
      {[
        [10, 12, 22, 28, "var(--vermilion)"],
        [38, 16, 16, 20, "var(--powder-blue)"],
        [60, 10, 28, 18, "var(--botanical-green)"],
        [18, 48, 18, 14, "var(--brass)"],
        [52, 40, 20, 26, "var(--wine)"],
      ].map(([x, y, w, hh, c], i) => (
        <path key={i} d={handRect(x as number, y as number, w as number, hh as number, r, 0.6)} fill={c as string} fillOpacity={0.75} filter={wash("c")} />
      ))}
      <path d={handLine([[32, 30], [38, 26], [52, 50], [60, 22]], r, 1)} stroke="var(--wine)" strokeWidth={0.6} fill="none" strokeDasharray="1.5 1.2" filter={pencil} />
      <Label x={50} y={h - 6} size={6.5} text={title} max={30} />
    </>
  ),
  annotation: ({ h, r, title }) => (
    <>
      <path d={handPoly([[0, 2], [100, 0], [98, h], [3, h - 2]], r, 1.5)} fill="color-mix(in srgb, var(--aged-ivory) 70%, white)" filter={wash("b")} />
      <g stroke="var(--vermilion)" strokeWidth={0.9} fill="none" filter={pencil}>
        <path d={scribble(r, 10, h * 0.62, 62)} />
        <path d={scribble(r, 10, h * 0.8, 44)} />
        <path d={handLine([[74, h * 0.7], [86, h * 0.58], [90, h * 0.76]], r, 1)} />
      </g>
      <Label x={10} y={h * 0.36} size={9} text={title} max={26} anchor="start" italic />
    </>
  ),
  postcard: ({ h, r, title }) => (
    <>
      <Sheet h={h} r={r} fill="color-mix(in srgb, var(--aged-ivory) 75%, white)" />
      <path d={handRect(76, 8, 16, 19, r, 0.6)} fill="var(--vermilion)" fillOpacity={0.85} stroke="var(--aged-ivory)" strokeWidth={1} strokeDasharray="1 1" filter={wash("c")} />
      <circle cx={70} cy={22} r={8} fill="none" stroke="var(--wine)" strokeWidth={0.5} opacity={0.5} />
      <path d={handLine([[54, 12], [54, h - 8]], r, 0.4)} stroke="var(--wine)" strokeWidth={0.5} fill="none" opacity={0.6} />
      {[0.5, 0.64, 0.78].map((f, i) => <path key={i} d={handLine([[60, h * f], [92, h * f]], r, 0.3)} stroke="var(--wine)" strokeWidth={0.4} fill="none" opacity={0.5} />)}
      <Label x={8} y={h * 0.32} size={8} text={title} max={14} anchor="start" italic />
    </>
  ),
  ticket: ({ h, r, title }) => (
    <>
      <path d={handRect(0, 0, 100, h, r, 0.6)} fill="var(--botanical-green)" filter={wash("a")} />
      {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={74} cy={4 + (i * (h - 8)) / 6} r={1.2} fill="var(--aged-ivory)" />)}
      <path d={handRect(5, 5, 64, h - 10, r, 0.5)} fill="none" stroke="var(--aged-ivory)" strokeWidth={0.7} filter={pencil} />
      <Label x={37} y={h * 0.58} size={8} text={title} max={18} fill="var(--aged-ivory)" />
    </>
  ),
  fragment: ({ h, r, title }) => (
    <>
      <path
        d={handPoly([[4, 6], [30, 0], [48, 5], [72, 1], [96, 8], [100, 40], [94, h * 0.7], [100, h], [62, h - 4], [30, h], [0, h - 6], [5, h * 0.5]], r, 2)}
        fill="color-mix(in srgb, var(--brass) 35%, var(--aged-ivory))"
        filter={wash("b")}
      />
      <g stroke="var(--walnut)" strokeWidth={0.6} fill="none" filter={pencil}>
        {[0.55, 0.68, 0.81].map((f, i) => <path key={i} d={scribble(r, 14, h * f, 60 - i * 10)} />)}
      </g>
      <Label x={50} y={h * 0.32} size={8} text={title} max={18} italic />
    </>
  ),
  drawing: ({ h, r, title }) => (
    <>
      <Sheet h={h} r={r} fill="color-mix(in srgb, var(--aged-ivory) 80%, white)" />
      <Bouquet kind="small" box={{ x: 18, y: 8, w: 64, h: h * 0.62 }} seed={83} w="c" />
      <Label x={50} y={h - 8} size={7} text={title} max={20} italic />
    </>
  ),
};
