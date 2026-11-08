import Link from "next/link";
import type { Article } from "@/lib/types";
import { Reveal } from "@/components/motion/Reveal";
import { PaintedGarland, PaintedTulip } from "@/components/editorial/Painted";
import { formatDate, roman } from "@/lib/format";
import { PaintedSheet, WashBlot } from "./Painted";

const blots = ["var(--vermilion)", "var(--powder-blue)", "var(--botanical-green)", "var(--brass)"];

/** A manuscript on watercolour paper: the contents of a small literary journal, one piece after another.
 *  Numerals sit in the margin, left of the vermilion rule; each entry reads straight down the page, with its cover beside it. */
export function StoryCollection({ stories: all }: { stories: Article[] }) {
  const stories = all.filter((s) => !s.slug.includes("placeholder") && !s.title.startsWith("[") && !s.dek?.startsWith("["));
  return (
    <div className="relative mx-auto max-w-4xl pb-16 pt-14 text-wine md:pb-20 md:pt-16">
      <PaintedSheet seed={17} margin h={Math.max(900, 520 + stories.length * 260)} />
      <div className="relative pl-[16%] pr-8 md:pr-16">
        <PaintedGarland className="block" />
        <p className="label mt-4">Contents</p>
        <ol className="mt-10">
          {stories.map((s, i) => (
            <Reveal as="li" key={s.slug} y={12}>
              {i > 0 && <div aria-hidden className="my-8 h-px w-24 bg-[color:var(--wine)]/20 md:my-10" />}
              <Link href={`/writing/${s.slug}`} className="group relative grid gap-6 md:grid-cols-[1fr_9rem] md:items-start">
                <span className="absolute -left-[13.5%] top-1 inline-flex h-10 w-10 items-center justify-center md:-left-[12%]">
                  <WashBlot color={blots[i % blots.length]} seed={i + 2} className="inset-0 h-full w-full transition-transform duration-700 ease-gallery group-hover:scale-125" />
                  <span className="label relative text-wine">{roman(i + 1)}</span>
                </span>
                <span className="block">
                  <span className="block font-display text-[clamp(1.6rem,3vw,2.3rem)] italic leading-tight transition-colors duration-500 group-hover:text-vermilion">{s.title}</span>
                  <span className="label mt-3 block text-ink-soft">{[s.genre ?? s.category, s.date && formatDate(s.date)].filter(Boolean).join(" · ")}</span>
                  {s.dek && <span className="mt-3 block font-display text-[1.1rem] leading-[1.7]">{s.dek}</span>}
                  <span className="label mt-4 inline-block link-draw pb-1">Read the piece</span>
                </span>
                {s.cover && (
                  <span className="relative hidden aspect-[4/5] overflow-hidden rounded-[3px] shadow-[0_1px_0_rgba(113,63,72,0.15)] md:block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.cover.src} alt="" className="h-full w-full object-cover opacity-90 transition duration-700 ease-gallery group-hover:scale-105 group-hover:opacity-100" />
                  </span>
                )}
              </Link>
            </Reveal>
          ))}
        </ol>
        <div className="mt-14 flex items-center gap-4">
          <PaintedTulip seed={41} className="h-7 w-6" />
          <p className="font-display text-[1.1rem] italic text-ink-soft">More stories to come. New pieces will be added here as they are written.</p>
        </div>
      </div>
    </div>
  );
}
