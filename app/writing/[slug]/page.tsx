import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/content/writing";
import Link from "next/link";
import { Blocks, headingId, inline } from "@/components/editorial/Blocks";
import { Plate } from "@/components/editorial/Plate";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { SideContents, type ContentsEntry } from "@/components/editorial/SideContents";
import { formatDate, readingTime } from "@/lib/format";
import { isCreative, sectionOf, subjectOf, writingSections } from "@/lib/writing";
import { cn } from "@/lib/cn";

/** "Detachment, Tony Kaye, 2011" → "Detachment", for the side contents. */
const shortTitle = (t: string) => {
  const m = t.match(/^(.*?)(?: \(.*\))?, [^,]+, (?:19|20)\d\d$/);
  const n = t.match(/^(.*?) [A-Z][a-z]+ [A-Z][a-z]+, (?:19|20)\d\d$/);
  return m ? m[1] : n ? n[1] : t;
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return { title: article.title, description: article.dek, openGraph: { type: "article" } };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const [main, ...rest] = article.title.split(": ");
  const title = { main, sub: article.title.length > 60 && rest.length ? rest.join(": ") : undefined };
  const creative = isCreative(article);
  const section = writingSections.find((s) => s.slug === sectionOf(article))!;
  const contents: ContentsEntry[] | undefined = article.contents
    ? article.body.flatMap<ContentsEntry>((b) =>
        b.type === "heading" ? [{ id: headingId(b.text), text: b.text, level: 1 }] : b.type === "subheading" ? [{ id: headingId(b.text), text: shortTitle(b.text), level: 2 }] : [],
      )
    : undefined;

  return (
    <article className="frame pb-[var(--section-space)] pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+6rem)]">
      <nav aria-label="Breadcrumb" className="reading-column mb-10 text-center">
        <p className="label text-ink-soft">
          <Link href="/collections/writing-and-philosophy" className="link-draw">Writings</Link>
          <span aria-hidden className="mx-2">/</span>
          <Link href={`/collections/writing-and-philosophy#${section.slug}`} className="link-draw">{section.room}</Link>
        </p>
      </nav>
      <header className="reading-column text-center">
        <p className="label flex flex-wrap justify-center gap-x-4 text-ink-soft">
          <span className="text-wine">{creative ? (article.genre ?? article.category) : subjectOf(article)}</span>
          {article.date && <span>{formatDate(article.date)}</span>}
          <span>{article.format ?? readingTime(article.body)}</span>
        </p>
        {/* A long title with a subtitle sets the subtitle smaller, so the heading stays in scale. */}
        {title.sub ? (
          <h1 className="mt-8">
            <span className="block text-display-m">{title.main}:</span>
            <span className="mt-3 block font-display text-[clamp(1.35rem,2.2vw,1.9rem)] leading-snug">{title.sub}</span>
          </h1>
        ) : (
          <h1 className={cn("mt-8 text-display-m md:text-display-l", creative && "italic")}>{article.title}</h1>
        )}
        {creative && <p aria-hidden className="mt-8 text-[1.3rem] text-brass">❦</p>}
        {article.dek && <p className="mt-6 font-display text-lede italic text-ink-soft">{article.dek}</p>}
      </header>

      {article.cover && !article.hideCover && (
        <figure className={`mx-auto mt-16 ${article.cover.aspect < 1 ? "max-w-md" : "max-w-5xl"}`}>
          <Plate image={article.cover} priority sizes="(min-width: 64rem) 64rem, 100vw" zoom={false} />
        </figure>
      )}

      {contents && (
        <nav aria-label="Contents" className="reading-column mt-16 border-y border-rule py-6 xl:hidden">
          <p className="label mb-4 text-ink-soft">Contents</p>
          <ol className="columns-1 gap-8 text-caption sm:columns-2">
            {contents.filter((e) => e.level === 1).map((e) => (
              <li key={e.id} className="mb-2 break-inside-avoid">
                <a href={`#${e.id}`} className="link-draw">{e.text}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className={cn("relative mt-16 md:mt-24", creative && "story-body font-display text-[1.1rem]")}>
        {contents && (
          <aside className="absolute inset-y-0 left-0 hidden w-[15rem] xl:block 2xl:w-[17rem]">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <SideContents entries={[...contents, ...(article.bibliography ? [{ id: "bibliography", text: "References", level: 1 as const }] : [])]} />
            </div>
          </aside>
        )}
        <Blocks blocks={article.body} />
      </div>
      {creative && <p aria-hidden className="mt-16 text-center text-brass">✦ ✦ ✦</p>}

      {article.footnotes && (
        <section aria-label="Notes" className="reading-column mt-20 border-t border-rule pt-6">
          <p className="label mb-4 text-ink-soft">Notes</p>
          <ol className="list-decimal space-y-2 pl-5 text-caption text-ink-soft">
            {article.footnotes.map((f, i) => (
              <li key={f} id={`fn-${i + 1}`} className="scroll-mt-[calc(var(--header-h)+2rem)] target:text-wine">
                {inline(f)}{" "}
                <a href={`#fnref-${i + 1}`} aria-label="Back to the text" className="text-vermilion">↩</a>
              </li>
            ))}
          </ol>
        </section>
      )}

      {article.bibliography && (
        <section id="bibliography" aria-label="Bibliography" className="scroll-mt-[calc(var(--header-h)+2rem)] reading-column mt-12 border-t border-rule pt-6">
          <p className="label mb-4 text-ink-soft">Bibliography</p>
          <ul className="space-y-2 text-caption text-ink-soft">
            {article.bibliography.map((b) => (
              <li key={b} className="pl-6 -indent-6">{inline(b)}</li>
            ))}
          </ul>
        </section>
      )}

      <div className="reading-column mt-20">
        <ArrowLink href={`/collections/writing-and-philosophy#${section.slug}`}>{`Back to ${section.room}`}</ArrowLink>
      </div>
    </article>
  );
}
