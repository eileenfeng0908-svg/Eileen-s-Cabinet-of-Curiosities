import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { Star } from "./Ornaments";

/**
 * Section opener: a numbered small-caps label with a star between rules,
 * above a serif title. `align` shifts the title across the grid so
 * consecutive sections never open the same way.
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
}) {
  const titleCols = {
    left: "lg:col-start-1 lg:col-span-8",
    offset: "lg:col-start-3 lg:col-span-8",
    right: "lg:col-start-5 lg:col-span-8",
  }[align];

  return (
    <header className={cn("grid-editorial items-end gap-y-6", className)}>
      <Reveal className="group col-span-4 md:col-span-8 lg:col-span-12 flex items-center gap-4 text-velvet">
        <span className="label text-bloom-ink">{number}</span>
        <span aria-hidden className="h-px w-10 bg-velvet/30" />
        <span aria-hidden className="transition-transform duration-[1200ms] ease-gallery group-hover:rotate-90">
          <Star className="h-3 w-3 text-haze" />
        </span>
        <span className="label">{kicker}</span>
      </Reveal>
      <Reveal delay={0.08} className={cn("col-span-4 md:col-span-6", titleCols)}>
        <h2 id={id} className="text-display-l">
          {title}
          {italic && (
            <>
              {" "}
              <em>{italic}</em>
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
