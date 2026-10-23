/**
 * The "brushes": SVG filters shared by every part of the cabinet.
 * Render once per page (Cabinet does this). They work by colour, never by
 * greying: pigment pools are the colour multiplied by itself, so they get
 * deeper and richer rather than duller.
 *
 *  #ec-wash-a / -b / -c  watercolour: wobbly edges, pigment blooms, darker rims
 *  #ec-pencil            coloured pencil: a slightly wandering, grainy line
 *  #ec-tooth             paper tooth, laid over the whole illustration
 *  #ec-hatch             pencil hatching, for shadows and depth
 */
const washSeeds = { a: 3, b: 11, c: 23 } as const;
export type Wash = keyof typeof washSeeds;
export const wash = (w: Wash = "a") => `url(#ec-wash-${w})`;
export const pencil = "url(#ec-pencil)";

export function PaintDefs() {
  return (
    <svg aria-hidden focusable="false" width="0" height="0" style={{ position: "absolute", width: 0, height: 0 }}>
      <defs>
        {Object.entries(washSeeds).map(([k, seed]) => (
          <filter key={k} id={`ec-wash-${k}`} x="-6%" y="-6%" width="112%" height="112%" colorInterpolationFilters="sRGB">
            {/* imperfect, wandering edges */}
            <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="3" seed={seed} result="warp" />
            <feDisplacementMap in="SourceGraphic" in2="warp" scale="5" xChannelSelector="R" yChannelSelector="G" result="shape" />
            {/* uneven pigment: paper shows through in places */}
            <feTurbulence type="fractalNoise" baseFrequency="0.009" numOctaves="2" seed={seed + 1} result="bloom" />
            <feColorMatrix in="bloom" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.8 0 0 0 0.5" result="bloomA" />
            <feComposite in="shape" in2="bloomA" operator="in" result="washed" />
            {/* where the wash is thin, the paper shows — never what lies behind */}
            <feFlood floodColor="#f2e4c8" result="paper" />
            <feComposite in="paper" in2="shape" operator="in" result="paperShape" />
            {/* granulation: pigment settling in the tooth of the paper */}
            <feTurbulence type="fractalNoise" baseFrequency="0.11" numOctaves="3" seed={seed + 2} result="gran" />
            <feColorMatrix in="gran" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.2 0 0 0 -0.52" result="granA" />
            <feBlend in="shape" in2="shape" mode="multiply" result="deep" />
            <feComposite in="deep" in2="granA" operator="in" result="pools" />
            {/* the darker rim a wash leaves as it dries */}
            <feMorphology in="shape" operator="erode" radius="1.6" result="inner" />
            <feComposite in="deep" in2="inner" operator="out" result="rim" />
            <feGaussianBlur in="rim" stdDeviation="0.7" result="rimSoft" />
            <feComposite in="rimSoft" in2="shape" operator="in" result="rimIn" />
            <feMerge>
              <feMergeNode in="paperShape" />
              <feMergeNode in="washed" />
              <feMergeNode in="pools" />
              <feMergeNode in="rimIn" />
            </feMerge>
          </filter>
        ))}

        <filter id="ec-pencil" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" result="w" />
          <feDisplacementMap in="SourceGraphic" in2="w" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="line" />
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="5" result="g" />
          <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.6 0 0 0 -0.55" result="gA" />
          <feComposite in="line" in2="gA" operator="in" />
        </filter>

        <filter id="ec-tooth" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" seed="9" />
          {/* tinted Antique Wine, not grey */}
          <feColorMatrix type="matrix" values="0 0 0 0 0.44  0 0 0 0 0.25  0 0 0 0 0.28  0 0 0 -1.5 0.95" />
        </filter>

        <pattern id="ec-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="var(--wine)" strokeWidth="0.9" />
        </pattern>
        <pattern id="ec-hatch-fine" width="3.4" height="3.4" patternUnits="userSpaceOnUse" patternTransform="rotate(-52)">
          <line x1="0" y1="0" x2="0" y2="3.4" stroke="var(--wine)" strokeWidth="0.6" />
        </pattern>
      </defs>
    </svg>
  );
}
