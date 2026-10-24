import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/writing";
import { poems } from "@/content/poems";
import { PageHeader } from "@/components/editorial/PageHeader";
import { PaintedGarland, PaintedTulip } from "@/components/editorial/Painted";
import { Fleuron } from "@/components/editorial/Ornaments";
import { Reveal } from "@/components/motion/Reveal";
import { WritingNav } from "@/components/writing/WritingNav";
import { isAnalysis, isCreative, subjectOf, subjects } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Poetry, creative writing, and analysis of film, art, philosophy and literature.",
};

/** Three doors into three different rooms: a garden, a manuscript and a reading room. */
export default function WritingPage() {
  const stories = articles.filter(isCreative);
  const analysis = articles.filter(isAnalysis);
  const count = (s: (typeof subjects)[number]) => analysis.filter((a) => subjectOf(a) === s).length;

  return (
    <>
      <PageHeader
        number="03"
        tone="green"
        kicker="Writing"
        title="Three rooms of"
        italic="writing"
        intro="A garden of poems, a collection of stories, and a reading room for essays and analysis."
      />
      <WritingNav />

      <div className="frame grid gap-10 py-16 md:py-20 lg:grid-cols-12 lg:gap-12">
        {/* 01 — an arched garden gate */}
        <Reveal className="lg:col-span-7">
          <Link
            href="/writing/poetry"
            className="poetry-garden group relative flex min-h-[30rem] flex-col items-center justify-end overflow-hidden rounded-t-[50%_9rem] border border-green/40 px-6 pb-10 pt-24 text-center md:min-h-[36rem]"
          >
            <PaintedGarland className="absolute left-1/2 top-10 h-10 w-64 -translate-x-1/2 transition-transform duration-[1200ms] ease-gallery group-hover:scale-105" />
            <ul aria-hidden className="pointer-events-none absolute inset-x-6 top-28 space-y-6 font-display italic text-wine/70">
              {poems.slice(0, 3).map((p, i) => (
                <li key={p.slug} className="verse-breathe" style={{ marginLeft: `${[8, 46, 22][i]}%`, textAlign: "left", "--breathe": `${12 + i * 3}s`, "--delay": `${-i * 4}s` } as React.CSSProperties}>
                  {p.fragments[0]}
                </li>
              ))}
            </ul>
            <PaintedTulip seed={12} className="mb-4" />
            <span className="label text-green">01 · Poetry</span>
            <span className="mt-3 block font-display text-display-m italic text-wine transition-colors duration-500 group-hover:text-vermilion">
              The Poetry Garden
            </span>
            <span className="mt-3 max-w-sm font-display text-lede italic text-wine/85">
              Lines drift between the flowers. Each flower holds a poem.
            </span>
            <span className="label mt-6 text-wine">
              {poems.length} poems · Enter the garden <span aria-hidden>→</span>
            </span>
          </Link>
        </Reveal>

        {/* 02 — a manuscript page, slightly askew on the desk */}
        <Reveal delay={0.1} className="lg:col-span-5 lg:pt-16">
          <Link
            href="/writing/creative-writing"
            className="manuscript group block rotate-[0.8deg] px-8 py-10 text-center text-wine shadow-[0_24px_40px_-28px_rgb(113_63_72/0.55)] transition-transform duration-700 ease-gallery hover:rotate-0 md:px-12"
          >
            <span className="label">02 · Creative Writing</span>
            <span className="mt-4 block font-display text-display-m transition-colors duration-500 group-hover:text-vermilion">The Story Collection</span>
            <Fleuron className="mx-auto my-6 max-w-[10rem] text-brass" ornament="rosette" />
            <span className="label block text-ink-soft">Contents</span>
            <ol className="mt-4 space-y-2 font-display text-[1.1rem] italic">
              {stories.map((s, i) => (
                <li key={s.slug} className="flex items-baseline gap-2">
                  <span className="label not-italic">{["I", "II", "III", "IV", "V", "VI"][i] ?? i + 1}</span>
                  <span className="truncate">{s.title}</span>
                  <span aria-hidden className="mx-1 flex-1 border-b border-dotted border-wine/40" />
                </li>
              ))}
            </ol>
            <span className="label mt-8 block">Open the collection <span aria-hidden>→</span></span>
          </Link>
        </Reveal>

        {/* 03 — a journal's subject index */}
        <Reveal className="lg:col-span-12">
          <Link href="/writing/analysis" className="group grid gap-8 border-y-2 border-wine/70 py-10 text-wine md:grid-cols-12">
            <span className="md:col-span-5">
              <span className="label">03 · Analysis</span>
              <span className="mt-3 block font-display text-display-m transition-colors duration-500 group-hover:text-vermilion">The Reading Room</span>
              <span className="mt-3 block max-w-md text-body text-ink-soft">
                Essays and analysis on film, art history, philosophy and literature, filed by subject.
              </span>
              <span className="label mt-6 block">Enter the reading room <span aria-hidden>→</span></span>
            </span>
            <span className="md:col-span-6 md:col-start-7">
              <span className="label block border-b border-wine/30 pb-2 text-ink-soft">Subject index</span>
              {subjects.map((s) => (
                <span key={s} className="flex items-baseline justify-between border-b border-rule py-2.5">
                  <span className="font-display text-[1.15rem]">{s}</span>
                  <span className="label text-ink-soft">{count(s) || "—"}</span>
                </span>
              ))}
            </span>
          </Link>
        </Reveal>
      </div>
    </>
  );
}
