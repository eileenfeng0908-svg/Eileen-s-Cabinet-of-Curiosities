import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/content/writing";
import { Blocks } from "@/components/editorial/Blocks";
import { Plate } from "@/components/editorial/Plate";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { formatDate, readingTime } from "@/lib/format";

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

  return (
    <article className="frame pb-[var(--section-space)] pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+6rem)]">
      <header className="reading-column text-center">
        <p className="label flex flex-wrap justify-center gap-x-4 text-ink-soft">
          <span className="text-wine">{article.category}</span>
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
          <h1 className="mt-8 text-display-m md:text-display-l">{article.title}</h1>
        )}
        {article.dek && <p className="mt-6 font-display text-lede italic text-ink-soft">{article.dek}</p>}
      </header>

      {article.cover && !article.hideCover && (
        <figure className={`mx-auto mt-16 ${article.cover.aspect < 1 ? "max-w-md" : "max-w-5xl"}`}>
          <Plate image={article.cover} priority sizes="(min-width: 64rem) 64rem, 100vw" zoom={false} />
        </figure>
      )}

      <div className="mt-16 md:mt-24">
        <Blocks blocks={article.body} />
      </div>

      {article.footnotes && (
        <section aria-label="Notes" className="reading-column mt-20 border-t border-rule pt-6">
          <p className="label mb-4 text-ink-soft">Notes</p>
          <ol className="list-decimal space-y-2 pl-5 text-caption text-ink-soft">
            {article.footnotes.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ol>
        </section>
      )}

      <div className="reading-column mt-20">
        <ArrowLink href="/writing">All writing</ArrowLink>
      </div>
    </article>
  );
}
