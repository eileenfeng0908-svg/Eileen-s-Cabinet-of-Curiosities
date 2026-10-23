import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { Star } from "./Ornaments";

/** Each section of the site owns one colour of the palette. */
export const pageTones = {
  blue: { bg: "blue-wash" },
  walnut: { bg: "bg-walnut/10" },
  vermilion: { bg: "bg-vermilion/[0.06]" },
  green: { bg: "bg-brass/12" },
  brass: { bg: "bg-brass/15" },
} as const;

export type PageTone = keyof typeof pageTones;

/** Opening of an internal page: section number, oversized title, short intro. */
export function PageHeader({
  number,
  kicker,
  title,
  italic,
  intro,
  tone = "blue",
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
        <div className="grid-editorial gap-y-8 border-t border-wine/25 pt-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-12 flex items-center gap-4 text-wine">
            <span className="label text-wine">{number}</span>
            <span aria-hidden className="h-px w-10 bg-brass/50" />
          <Star className="h-3 w-3 text-brass" />
            <span className="label">{kicker}</span>
          </div>
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-10">
            <h1 className="text-display-l md:text-display-xl">
              {title}
              {italic && (
                <>
                  {" "}
                  <em>{italic}</em>
                </>
              )}
            </h1>
          </Reveal>
          {intro && (
            <Reveal delay={0.1} className="col-span-4 md:col-span-5 md:col-start-4 lg:col-span-4 lg:col-start-8">
              <p className="font-display text-lede italic text-wine">{intro}</p>
            </Reveal>
          )}
        </div>
      </div>
    </header>
  );
}
