import Link from "next/link";
import type { Article } from "@/lib/types";
import { Reveal } from "@/components/motion/Reveal";
import { PaintedGarland, PaintedTulip } from "@/components/editorial/Painted";
import { formatDate, roman } from "@/lib/format";
import { cn } from "@/lib/cn";
import { PaintedSheet, WashBlot } from "./Painted";

const blots = ["var(--vermilion)", "var(--powder-blue)", "var(--botanical-green)", "var(--brass)"];

/** A manuscript on watercolour paper: the contents of a small literary journal, one piece after another. */
export function StoryCollection({ stories }: { stories: Article[] }) {
  return (
    <div className="relative mx-auto max-w-4xl px-8 pb-16 pt-14 text-wine md:px-20 md:pb-20 md:pt-16">
      <PaintedSheet seed={17} margin h={Math.max(900, 420 + stories.length * 380)} />
      <div className="relative">
        <PaintedGarland className="mx-auto block" />
        <p className="label mt-4 text-center">Contents</p>
        <ol className="mt-10">
          {stories.map((s, i) => {
            const right = i % 2 === 1;
            return (
              <Reveal as="li" key={s.slug} y={12}>
                {i > 0 && (
                  <div aria-hidden className="my-10 flex justify-center md:my-12">
                    <PaintedTulip seed={i * 5 + 3} className="h-7 w-6" />
                  </div>
                )}
                <Link href={`/writing/${s.slug}`} className={cn("group block md:max-w-[34rem]", right ? "md:ml-auto md:text-right" : "md:mr-auto")}>
                  <span className="relative inline-flex h-10 w-10 items-center justify-center">
                    <WashBlot color={blots[i % blots.length]} seed={i + 2} className="inset-0 h-full w-full transition-transform duration-700 ease-gallery group-hover:scale-125" />
                    <span className="label relative text-wine">{roman(i + 1)}</span>
                  </span>
                  <span className="mt-2 block font-display text-display-m italic leading-tight transition-colors duration-500 group-hover:text-vermilion">{s.title}</span>
                  <span className="label mt-3 block text-ink-soft">{[s.genre ?? s.category, s.date && formatDate(s.date)].filter(Boolean).join(" · ")}</span>
                  {s.dek && <span className="mt-4 block font-display text-[1.15rem] leading-[1.7]">{s.dek}</span>}
                  <span className="label mt-4 inline-block link-draw pb-1">Read the piece</span>
                </Link>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
