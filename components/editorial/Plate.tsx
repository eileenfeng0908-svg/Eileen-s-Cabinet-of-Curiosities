import Image from "next/image";
import { cn } from "@/lib/cn";
import { roman } from "@/lib/format";
import type { ImageAsset, PlateMotif, PlateTone } from "@/lib/types";

/**
 * Plate — every image on the site goes through this component.
 * With `image.src` it renders a responsive next/image.
 * Without it, it renders a toned "plate" placeholder (paper, a faint motif,
 * a plate number) so layouts read as finished while photographs are pending.
 *
 * Hover zoom is applied when an ancestor has the `group` class.
 */

const tones: Record<PlateTone, { bg: string; ink: string }> = {
  ivory: { bg: "#efe8d9", ink: "#34332f" },
  parchment: { bg: "#e3d6bb", ink: "#34332f" },
  masterkey: { bg: "#d9cc8a", ink: "#34332f" },
  pear: { bg: "#a7993c", ink: "#f6f2e9" },
  mozart: { bg: "#475480", ink: "#f6f2e9" },
  sunburn: { bg: "#b57056", ink: "#f6f2e9" },
  copper: { bg: "#7f3b25", ink: "#f6f2e9" },
  charcoal: { bg: "#3b3a35", ink: "#ede6d6" },
};

function Motif({ motif, ink }: { motif: PlateMotif; ink: string }) {
  if (motif === "none") return null;

  // Motifs that stretch with the plate (horizon bands).
  if (motif === "horizon") {
    return (
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect x="0" y="64" width="100" height="36" fill={ink} opacity="0.07" />
        <line x1="0" y1="64" x2="100" y2="64" stroke={ink} strokeOpacity="0.35" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="0" y1="71" x2="100" y2="71" stroke={ink} strokeOpacity="0.12" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    );
  }

  // Motifs that keep their proportions, centred.
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      {motif === "sun" && (
        <>
          <circle cx="50" cy="44" r="17" fill={ink} opacity="0.12" />
          <circle cx="50" cy="44" r="17" fill="none" stroke={ink} strokeOpacity="0.35" strokeWidth="0.35" />
          <line x1="-50" y1="66" x2="150" y2="66" stroke={ink} strokeOpacity="0.3" strokeWidth="0.3" />
        </>
      )}
      {motif === "arch" && (
        <>
          <path d="M34 82 V44 A16 16 0 0 1 66 44 V82" fill={ink} fillOpacity="0.06" stroke={ink} strokeOpacity="0.38" strokeWidth="0.35" />
          <path d="M38 82 V45 A12 12 0 0 1 62 45 V82" fill="none" stroke={ink} strokeOpacity="0.18" strokeWidth="0.3" />
          <line x1="-50" y1="82" x2="150" y2="82" stroke={ink} strokeOpacity="0.3" strokeWidth="0.3" />
        </>
      )}
      {motif === "figure" && (
        <>
          <ellipse cx="50" cy="38" rx="9" ry="11.5" fill={ink} fillOpacity="0.08" stroke={ink} strokeOpacity="0.35" strokeWidth="0.35" />
          <path d="M27 86 C29 64 38 55 50 55 C62 55 71 64 73 86" fill={ink} fillOpacity="0.08" stroke={ink} strokeOpacity="0.35" strokeWidth="0.35" />
        </>
      )}
      {motif === "frame" && (
        <>
          {/* A film frame: gate plus sprocket holes */}
          <rect x="22" y="30" width="56" height="40" fill={ink} fillOpacity="0.07" stroke={ink} strokeOpacity="0.4" strokeWidth="0.35" />
          {Array.from({ length: 7 }).map((_, i) => (
            <g key={i}>
              <rect x={23 + i * 8} y="22" width="4" height="3" rx="0.6" fill="none" stroke={ink} strokeOpacity="0.3" strokeWidth="0.3" />
              <rect x={23 + i * 8} y="75" width="4" height="3" rx="0.6" fill="none" stroke={ink} strokeOpacity="0.3" strokeWidth="0.3" />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

export function Plate({
  image,
  number,
  sizes = "(min-width: 64rem) 50vw, 100vw",
  priority = false,
  className,
  zoom = true,
  showPlaceholderLabel = true,
}: {
  image: ImageAsset;
  /** Plate number for the placeholder (rendered in Roman numerals). */
  number?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  zoom?: boolean;
  showPlaceholderLabel?: boolean;
}) {
  const zoomClass = zoom
    ? "transition-transform duration-[1400ms] ease-gallery group-hover:scale-[1.035] motion-reduce:transform-none"
    : "";

  if (image.src) {
    return (
      <div className={cn("relative overflow-hidden bg-ivory-deep", className)} style={{ aspectRatio: image.aspect }}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", zoomClass)}
        />
      </div>
    );
  }

  const tone = tones[image.tone ?? "parchment"];
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${image.alt}`}
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: image.aspect, backgroundColor: tone.bg, color: tone.ink }}
    >
      <div className={cn("absolute inset-0", zoomClass)}>
        <div className="plate-tooth absolute inset-0" />
        {/* Soft vignette, like light falling off a print */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgb(52 51 47 / 0.14))" }}
        />
        <Motif motif={image.motif ?? "none"} ink={tone.ink} />
      </div>
      {showPlaceholderLabel && (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-4">
          <span className="label opacity-70">{number ? `Pl. ${roman(number)}` : "Plate"}</span>
          <span className="label opacity-50">Image forthcoming</span>
        </div>
      )}
    </div>
  );
}
