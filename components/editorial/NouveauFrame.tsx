import { cn } from "@/lib/cn";
import { Star } from "./Ornaments";

/**
 * An Art Nouveau arched frame: the image is cut to a soft arch, with a fine
 * outer rule echoing it and a small star at the apex. For occasional use on
 * a featured image; most images stay as plain plates or prints.
 */
export function NouveauFrame({
  children,
  className,
  paper = "bg-ivory",
}: {
  children: React.ReactNode;
  className?: string;
  /** Background class behind the apex star, to match the section. */
  paper?: string;
}) {
  const arch = "50% 50% 0 0 / 34% 34% 0 0";
  return (
    <div className={cn("relative p-[clamp(8px,1.1vw,16px)]", className)}>
      {/* outer rule */}
      <div aria-hidden className="pointer-events-none absolute inset-0 border border-velvet/35" style={{ borderRadius: arch }} />
      {/* image window */}
      <div className="relative overflow-hidden" style={{ borderRadius: arch }}>
        {children}
      </div>
      <span aria-hidden className={cn("absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 px-1.5 text-velvet", paper)}>
        <Star />
      </span>
    </div>
  );
}
