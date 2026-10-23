import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { Star } from "./Ornaments";

/** Each section of the site owns one colour of the palette. */
export const pageTones = {
  glare: { bg: "glare-wash" },
  mist: { bg: "bg-mist/10" },
  rosebud: { bg: "bg-rosebud/[0.06]" },
  roseleaf: { bg: "bg-lily/12" },
  lily: { bg: "bg-lily/15" },
} as const;

export type PageTone = keyof typeof pageTones;

/** Opening of an internal page: section number, oversized title, short intro. */
export function PageHeader({
  number,
  kicker,
  title,
  italic,
  intro,
  tone = "glare",
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
        <div className="grid-editorial gap-y-8 border-t border-rosebud/25 pt-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-12 flex items-center gap-4 text-rosebud">
            <span className="label text-lily-ink">{number}</span>
            <span aria-hidden className="h-px w-10 bg-rosebud/30" />
          <Star className="h-3 w-3 text-lily" />
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
              <p className="font-display text-lede italic text-rosebud">{intro}</p>
            </Reveal>
          )}
        </div>
      </div>
    </header>
  );
}
