import { cn } from "@/lib/cn";

/**
 * Small Art Nouveau ornaments, drawn in SVG so they take the current text
 * colour and stay crisp at any size. Use them as punctuation, not wallpaper:
 * one or two per section.
 */

/** A five-petal rosette. */
export function Rosette({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="currentColor">
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="12" cy="6.4" rx="2.8" ry="4.8" transform={`rotate(${r} 12 12)`} opacity="0.8" />
      ))}
      <circle cx="12" cy="12" r="1.9" fill="var(--color-ivory)" />
    </svg>
  );
}

/** A slender four-pointed star, like the sparkles in engraved skies. */
export function Star({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={cn("h-3.5 w-3.5", className)} fill="currentColor">
      <path d="M12 0 C12.8 8 16 11.2 24 12 C16 12.8 12.8 16 12 24 C11.2 16 8 12.8 0 12 C8 11.2 11.2 8 12 0 Z" />
    </svg>
  );
}

/**
 * Rule — ornament — rule. The ornament turns a quarter on hover of the
 * nearest `group`, a small reply to the reader's attention.
 */
export function Fleuron({
  className,
  ornament = "star",
}: {
  className?: string;
  ornament?: "star" | "rosette";
}) {
  const Mark = ornament === "star" ? Star : Rosette;
  return (
    <div aria-hidden className={cn("flex items-center gap-4", className)}>
      <span className="h-px flex-1 bg-current opacity-30" />
      <span className="transition-transform duration-[1200ms] ease-gallery group-hover:rotate-90">
        <Mark />
      </span>
      <span className="h-px flex-1 bg-current opacity-30" />
    </div>
  );
}

/** A curling whiplash flourish, for the end of a line or the corner of a frame. */
export function Flourish({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 40"
      className={cn("h-6 w-[4.5rem]", flip && "-scale-x-100", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
    >
      <path d="M2 30 C 30 30, 44 8, 70 10 C 92 12, 96 32, 80 34 C 68 35, 66 22, 78 20" />
      <path d="M70 10 C 86 4, 104 6, 118 16" opacity="0.6" />
      <path d="M40 22 c -4 -8 -12 -10 -16 -6 c 4 6 10 8 16 6 z" fill="currentColor" opacity="0.35" stroke="none" />
    </svg>
  );
}
