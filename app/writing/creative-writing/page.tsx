import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/writing";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { WritingNav } from "@/components/writing/WritingNav";
import { formatDate, roman } from "@/lib/format";
import { isCreative } from "@/lib/writing";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Creative Writing · The Story Collection",
  description: "Short stories, prose and personal pieces by Eileen Feng.",
};

/** Set like the contents of a small literary journal: one piece after another, never a grid. */
export default function CreativeWritingPage() {
  const stories = articles.filter(isCreative);
  return (
    <>
      <PageHeader number="03 · 02" tone="vermilion" kicker="Writing · Creative Writing" title="The Story" italic="Collection" intro="Stories, prose and personal pieces, gathered like the pages of a small journal." />
      <WritingNav current="creative-writing" />

      <div className="frame pb-[var(--section-space)] pt-16 md:pt-24">
        <div className="manuscript mx-auto max-w-4xl px-6 py-14 text-wine shadow-[0_30px_60px_-40px_rgb(113_63_72/0.6)] md:px-16 md:py-20">
          <p className="label text-center">Contents</p>
          <ol className="mt-12">
            {stories.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <Reveal as="li" key={s.slug} y={12}>
                  {i > 0 && (
                    <p aria-hidden className="my-12 text-center text-[1.3rem] text-brass md:my-14">
                      ❦
                    </p>
                  )}
                  <Link href={`/writing/${s.slug}`} className={cn("group block md:max-w-[34rem]", right ? "md:ml-auto md:text-right" : "md:mr-auto")}>
                    <span className="label text-vermilion">{roman(i + 1)}</span>
                    <span className="mt-2 block font-display text-display-m italic leading-tight transition-colors duration-500 group-hover:text-vermilion">{s.title}</span>
                    <span className="label mt-3 block text-ink-soft">
                      {[s.genre ?? s.category, s.date && formatDate(s.date)].filter(Boolean).join(" · ")}
                    </span>
                    {s.dek && <span className="mt-4 block font-display text-[1.15rem] leading-[1.7]">{s.dek}</span>}
                    <span className="label mt-4 inline-block link-draw pb-1">Read the piece</span>
                  </Link>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
}
