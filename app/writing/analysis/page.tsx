import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/writing";
import { PageHeader } from "@/components/editorial/PageHeader";
import { WritingNav } from "@/components/writing/WritingNav";
import { readingTime } from "@/lib/format";
import { isAnalysis, subjectOf, subjects } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Analysis · The Reading Room",
  description: "Essays and analysis on film, art history, philosophy and literature by Eileen Feng.",
};

const anchor = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z]+/g, "-");

/** An academic journal's table of contents, filed by subject, with an index that stays in view. */
export default function AnalysisPage() {
  const all = articles.filter(isAnalysis);
  const shelves = subjects.map((s) => ({ subject: s, items: all.filter((a) => subjectOf(a) === s) }));

  return (
    <>
      <PageHeader number="03 · 03" tone="blue" kicker="Writing · Analysis" title="The Reading" italic="Room" intro="Essays and analysis, filed by subject: film, art history, philosophy, literature and other research." />
      <WritingNav current="analysis" />

      <div className="frame grid gap-12 pb-[var(--section-space)] pt-16 md:pt-20 lg:grid-cols-12">
        <nav aria-label="Subjects" className="lg:col-span-3">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <p className="label border-b-2 border-wine/70 pb-2 text-wine">Subjects</p>
            <ol className="flex flex-wrap gap-x-5 lg:block">
              {shelves.map((s, i) => (
                <li key={s.subject} className="lg:border-b lg:border-rule">
                  <a href={`#${anchor(s.subject)}`} className="flex items-baseline gap-3 py-2.5 text-wine transition-colors hover:text-vermilion">
                    <span className="label text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[1.05rem]">{s.subject}</span>
                    <span className="label ml-auto hidden text-ink-soft lg:inline">{s.items.length}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="space-y-20 lg:col-span-9">
          {shelves.map((s, i) => (
            <section key={s.subject} id={anchor(s.subject)} aria-labelledby={`${anchor(s.subject)}-h`} className="scroll-mt-[calc(var(--header-h)+2rem)]">
              <header className="flex items-baseline gap-4 border-b-2 border-wine/70 pb-3 text-wine">
                <span className="label">§ {i + 1}</span>
                <h2 id={`${anchor(s.subject)}-h`} className="text-title">{s.subject}</h2>
              </header>
              {s.items.length ? (
                <ol>
                  {s.items.map((a) => (
                    <li key={a.slug} className="border-b border-rule">
                      <Link href={`/writing/${a.slug}`} className="group grid gap-x-8 gap-y-2 py-7 md:grid-cols-[minmax(0,1fr)_8rem]">
                        <span>
                          <span className="block font-display text-[1.45rem] leading-snug text-wine transition-colors duration-500 group-hover:text-vermilion">{a.title}</span>
                          {a.dek && <span className="mt-2 block max-w-2xl text-body text-ink-soft">{a.dek}</span>}
                        </span>
                        <span className="label flex gap-4 text-ink-soft md:flex-col md:gap-1 md:text-right">
                          <span className="text-wine">{s.subject}</span>
                          <span>{a.format ?? readingTime(a.body)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="py-7 font-display italic text-ink-soft">Nothing filed here yet.</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
