import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { exhibitions, getExhibition } from "@/content/exhibitions";
import { Plate } from "@/components/editorial/Plate";
import { Reveal } from "@/components/motion/Reveal";
import { roman } from "@/lib/format";
import { cn } from "@/lib/cn";

export const generateStaticParams = () => exhibitions.map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getExhibition((await params).slug);
  return e ? { title: `${e.title} — Exhibition catalogue`, description: e.subtitle } : {};
}

/**
 * An exhibition catalogue, opened from the Exhibitions drawer of the
 * Curator's Cabinet: title page, contents, introduction and statement, then
 * each section with its numbered catalogue entries, then documentation.
 */
export default async function ExhibitionPage({ params }: { params: Promise<{ slug: string }> }) {
  const e = getExhibition((await params).slug);
  if (!e) notFound();
  let cat = 0;

  return (
    <article className="pb-[var(--section-space)] pt-[calc(var(--header-h)+1.5rem)]">
      <div className="frame">
        <Link href="/collections/art-and-curation#curation" className="label inline-flex items-center gap-2 text-wine hover:text-vermilion">
          <span aria-hidden>←</span> Back to the Curator’s Cabinet
        </Link>
      </div>

      {/* title page */}
      <header className="frame mt-12 text-center md:mt-20">
        <p className="label text-wine">Exhibition catalogue</p>
        <h1 className="mx-auto mt-6 max-w-[16ch] text-display-l">{e.title}</h1>
        {e.subtitle && <p className="mt-5 font-display text-lede italic text-wine">{e.subtitle}</p>}
        <div className="mx-auto mt-14 max-w-5xl">
          <Plate image={e.cover} sizes="(min-width: 64rem) 64rem, 100vw" priority grain />
        </div>
      </header>

      <div className="frame mt-20 grid gap-16 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-20">
        {/* contents */}
        <nav aria-label="Catalogue contents" className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <p className="label border-b border-wine/25 pb-3 text-wine">Contents</p>
          <ol className="mt-4 space-y-2 font-display text-[1.1rem] text-wine">
            <li><a href="#introduction" className="hover:text-vermilion">Introduction</a></li>
            <li><a href="#statement" className="hover:text-vermilion">Curatorial statement</a></li>
            {e.sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:text-vermilion">
                  <span className="label mr-2 inline-block w-6">{roman(i + 1)}</span>
                  {s.title}
                </a>
              </li>
            ))}
            <li><a href="#documentation" className="hover:text-vermilion">Documentation</a></li>
          </ol>
          {e.project && (
            <Link href={`/work/${e.project}`} className="label link-draw mt-8 inline-block text-wine">
              The project page →
            </Link>
          )}
        </nav>

        <div className="min-w-0 space-y-24">
          <section id="introduction" className="scroll-mt-28">
            <h2 className="label border-b border-wine/25 pb-3 text-wine">Introduction</h2>
            <div className="mt-6 max-w-[38rem] space-y-5 text-lede">{e.introduction.map((p, i) => <p key={i}>{p}</p>)}</div>
          </section>

          <section id="statement" className="scroll-mt-28">
            <h2 className="label border-b border-wine/25 pb-3 text-wine">Curatorial statement</h2>
            <div className="mt-6 max-w-[38rem] space-y-5 border-l-2 border-vermilion pl-6 font-display text-statement italic text-wine">
              {e.statement.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          {!e.sections.length && (
            <section className="scroll-mt-28">
              <h2 className="label border-b border-wine/25 pb-3 text-wine">The exhibition</h2>
              <p className="mt-6 max-w-[38rem] text-lede">[The sections and artworks of this exhibition, to come.]</p>
            </section>
          )}

          {e.sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-28">
              <header className="flex items-baseline gap-5 border-b border-wine/25 pb-4">
                <span className="label text-vermilion">Section {roman(i + 1)}</span>
                <h2 id={`${s.id}-title`} className="text-display-m">{s.title}</h2>
              </header>
              {s.text && <p className="mt-6 max-w-[38rem] text-lede">{s.text}</p>}
              <ul className="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2">
                {s.works.map((w, k) => {
                  cat += 1;
                  return (
                    <Reveal as="li" key={w.id} delay={k * 0.06} className={cn(k % 2 === 1 && "md:mt-20")}>
                      <figure>
                        <div className="print">
                          <Plate image={w.image} sizes="(min-width: 64rem) 30rem, 90vw" />
                        </div>
                        <figcaption className="mt-5 grid grid-cols-[auto_1fr] gap-x-5">
                          <span className="label pt-1 text-wine">Cat. {cat}</span>
                          <span>
                            <span className="block font-display text-title text-wine">{w.title}</span>
                            <span className="mt-1 block font-display italic text-wine">{w.artist}</span>
                            <span className="label mt-2 block text-wine">{[w.medium, w.year].filter(Boolean).join(" · ")}</span>
                            {w.description && <span className="mt-3 block text-body text-wine">{w.description}</span>}
                          </span>
                        </figcaption>
                      </figure>
                    </Reveal>
                  );
                })}
              </ul>
            </section>
          ))}

          <section id="documentation" className="scroll-mt-28">
            <h2 className="label border-b border-wine/25 pb-3 text-wine">Exhibition documentation</h2>
            <ul className="mt-10 columns-1 gap-8 sm:columns-2 [&>li]:mb-8 [&>li]:break-inside-avoid">
              {e.documentation.map((img, i) => (
                <li key={i}>
                  <Plate image={img} number={i + 1} sizes="(min-width: 64rem) 28rem, 90vw" />
                  {img.caption && <p className="mt-2 text-caption text-wine">{img.caption}</p>}
                </li>
              ))}
            </ul>
          </section>

          <nav aria-label="Other exhibitions" className="border-t border-wine/25 pt-6">
            <p className="label mb-4 text-wine">Also in the Exhibitions drawer</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 font-display text-title">
              {exhibitions
                .filter((o) => o.slug !== e.slug)
                .map((o) => (
                  <li key={o.slug}>
                    <Link href={`/exhibitions/${o.slug}`} className="text-wine transition-colors hover:text-vermilion">{o.title}</Link>
                  </li>
                ))}
            </ul>
            <Link href="/collections/art-and-curation#curation" className="label link-draw mt-8 inline-block text-wine">
              ← Return the catalogue to its drawer
            </Link>
          </nav>
        </div>
      </div>
    </article>
  );
}
