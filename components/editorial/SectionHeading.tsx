import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Section opener: a numbered archival label sitting above (or beside) a
 * serif title. `align` shifts the title across the grid so consecutive
 * sections never open the same way.
 */
export function SectionHeading({
  number,
  kicker,
  title,
  italic,
  align = "left",
  className,
  aside,
  id,
  invert = false,
}: {
  number: string;
  kicker: string;
  title: string;
  /** Optional words set in italic after the title. */
  italic?: string;
  align?: "left" | "offset" | "right";
  className?: string;
  aside?: React.ReactNode;
  /** id for the h2, so the section can point aria-labelledby at it. */
  id?: string;
  /** Light text, for headings on dark section backgrounds. */
  invert?: boolean;
}) {
  const titleCols = {
    left: "lg:col-start-1 lg:col-span-8",
    offset: "lg:col-start-3 lg:col-span-8",
    right: "lg:col-start-5 lg:col-span-8",
  }[align];

  return (
    <header className={cn("grid-editorial items-end gap-y-6", className)}>
      <Reveal className="col-span-4 md:col-span-8 lg:col-span-12 flex items-center gap-4">
        <span className={cn("label", invert ? "text-sunset" : "text-slate-ink")}>{number}</span>
        <span aria-hidden className={cn("h-px w-10", invert ? "bg-ivory/40" : "bg-charcoal/30")} />
        <span className={cn("label", invert ? "text-ivory/85" : "text-charcoal-soft")}>{kicker}</span>
      </Reveal>
      <Reveal delay={0.08} className={cn("col-span-4 md:col-span-6", titleCols)}>
        <h2 id={id} className={cn("text-display-l", invert ? "text-ivory" : "text-charcoal")}>
          {title}
          {italic && (
            <>
              {" "}
              <em className={invert ? "text-sunset" : "text-slate"}>{italic}</em>
            </>
          )}
        </h2>
      </Reveal>
      {aside && (
        <Reveal delay={0.16} className="col-span-4 md:col-span-2 md:col-start-7 lg:col-start-11 lg:col-span-2 md:justify-self-end">
          {aside}
        </Reveal>
      )}
    </header>
  );
}
