import Link from "next/link";
import { recentArticles } from "@/content/writing";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { formatDate, readingTime } from "@/lib/format";

/** The latest writing, set as a journal's table of contents. */
export function RecentWriting() {
  const articles = recentArticles(4);

  return (
    <section aria-labelledby="writing-title" className="section-space">
      <div className="frame">
        <SectionHeading
          id="writing-title"
          number="V"
          kicker="Recent Writing"
          title="Notes, essays"
          italic="& small poems"
          align="right"
        />

        <ol className="mt-16 border-t border-velvet/50 md:mt-24">
          {articles.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 0.05} y={10} className="border-b border-velvet/15">
              <Link
                href={`/writing/${a.slug}`}
                className="group grid-editorial items-baseline gap-y-2 py-7 md:py-9"
              >
                <span className="label col-span-2 md:col-span-2 text-ink-soft">{formatDate(a.date)}</span>
                <span className="label col-span-2 md:col-span-2 text-right md:text-left text-fern-ink">{a.category}</span>
                <span className="col-span-4 md:col-span-3 lg:col-span-6 font-display text-title text-mozart transition-[color,translate] duration-700 ease-gallery group-hover:translate-x-2 group-hover:text-bloom-ink">
                  {a.title}
                  {a.dek && (
                    <span className="mt-2 block font-sans text-caption text-ink-soft lg:max-w-[48ch]">{a.dek}</span>
                  )}
                </span>
                <span className="label col-span-4 md:col-span-1 lg:col-span-2 md:text-right text-ink-soft">
                  {readingTime(a.body)}
                  <span aria-hidden className="ml-2 inline-block text-bloom-ink opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 flex md:justify-start">
          <ArrowLink href="/writing" className="text-mozart">All writing</ArrowLink>
        </div>
      </div>
    </section>
  );
}
