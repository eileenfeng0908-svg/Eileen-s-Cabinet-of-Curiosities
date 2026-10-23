import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/** Each section of the site owns one colour of the palette. */
export const pageTones = {
  jordy: { bg: "bg-jordy", text: "text-charcoal", accent: "text-sealbrown", soft: "text-charcoal", rule: "border-charcoal/25", bar: "bg-charcoal/30" },
  sunset: { bg: "bg-sunset", text: "text-charcoal", accent: "text-sealbrown", soft: "text-charcoal", rule: "border-charcoal/25", bar: "bg-sealbrown/40" },
  slate: { bg: "bg-slate", text: "text-ivory", accent: "text-sunset", soft: "text-ivory/90", rule: "border-ivory/30", bar: "bg-ivory/40" },
  sealbrown: { bg: "bg-sealbrown", text: "text-ivory", accent: "text-sunset", soft: "text-ivory/85", rule: "border-ivory/25", bar: "bg-ivory/40" },
  pumpkin: { bg: "bg-pumpkin", text: "text-sealbrown", accent: "text-sealbrown", soft: "text-sealbrown", rule: "border-sealbrown/30", bar: "bg-sealbrown/40" },
} as const;

export type PageTone = keyof typeof pageTones;

/** Opening of an internal page: section number, oversized title, short intro. */
export function PageHeader({
  number,
  kicker,
  title,
  italic,
  intro,
  tone = "jordy",
}: {
  number: string;
  kicker: string;
  title: string;
  italic?: string;
  intro?: string;
  tone?: PageTone;
}) {
  const t = pageTones[tone];
  return (
    <header className={cn(t.bg, "mb-16 md:mb-24")}>
      <div className="frame pb-16 pt-[calc(var(--header-h)+3rem)] md:pb-24 md:pt-[calc(var(--header-h)+5rem)]">
        <div className={cn("grid-editorial gap-y-8 border-t pt-4", t.rule)}>
          <div className="col-span-4 md:col-span-8 lg:col-span-12 flex items-center gap-4">
            <span className={cn("label", t.accent)}>{number}</span>
            <span aria-hidden className={cn("h-px w-10", t.bar)} />
            <span className={cn("label", t.soft)}>{kicker}</span>
          </div>
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-10">
            <h1 className={cn("text-display-l md:text-display-xl", t.text)}>
              {title}
              {italic && (
                <>
                  {" "}
                  <em className={t.accent}>{italic}</em>
                </>
              )}
            </h1>
          </Reveal>
          {intro && (
            <Reveal delay={0.1} className="col-span-4 md:col-span-5 md:col-start-4 lg:col-span-4 lg:col-start-8">
              <p className={cn("font-display text-lede italic", t.soft)}>{intro}</p>
            </Reveal>
          )}
        </div>
      </div>
    </header>
  );
}
