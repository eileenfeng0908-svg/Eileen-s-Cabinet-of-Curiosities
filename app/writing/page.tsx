import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/writing";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { formatDate, readingTime } from "@/lib/format";

export const metadata: Metadata = {
  title: "Writing",
  description: "Film criticism, art history, philosophy, essays, poetry and personal reflections.",
};

// Preliminary layout. Phase 3 adds category filtering and the full journal design.
export default function WritingPage() {
  const sorted = [...articles].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  return (
    <>
      <PageHeader
        number="03"
        tone="fern"
        kicker="Writing"
        title="A small"
        italic="journal"
        intro="Film Criticism · Art History · Philosophy · Essays · Poetry · Personal Reflections"
      />
      <div className="frame pb-[var(--section-space)]">
        <ol className="border-t border-ink/70">
          {sorted.map((a) => (
            <Reveal as="li" key={a.slug} y={10} className="border-b border-rule">
              <Link href={`/writing/${a.slug}`} className="group grid-editorial items-baseline gap-y-2 py-8">
                <span className="label col-span-2 text-ink-soft">{formatDate(a.date)}</span>
                <span className="label col-span-2 text-right md:text-left text-velvet">{a.category}</span>
                <span className="col-span-4 md:col-span-3 lg:col-span-6 font-display text-title transition-colors duration-500 group-hover:text-velvet">
                  {a.title}
                </span>
                <span className="label col-span-4 md:col-span-1 lg:col-span-2 md:text-right text-ink-soft">{readingTime(a.body)}</span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </>
  );
}
