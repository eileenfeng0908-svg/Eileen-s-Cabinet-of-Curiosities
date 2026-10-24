import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collections, collectionContents, getCollection } from "@/content/collections";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Plate } from "@/components/editorial/Plate";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { catalogueNumber, formatDate } from "@/lib/format";
import { CinemaCompartments } from "@/components/cinema/CinemaCompartments";
import { FilmLog } from "@/components/cinema/FilmLog";
import { FilmReviews } from "@/components/cinema/FilmReviews";
import { TopFive } from "@/components/cinema/TopFive";
import { films, filmsArePlaceholders, topFive } from "@/content/films";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { CuratorsCabinet } from "@/components/curation/CuratorsCabinet";
import { Sketchbook } from "@/components/art/Sketchbook";
import { PoetryGarden } from "@/components/writing/PoetryGarden";
import { StoryCollection } from "@/components/writing/StoryCollection";
import { ReadingRoom } from "@/components/writing/ReadingRoom";
import { isAnalysis, isCreative, writingSections } from "@/lib/writing";

export const generateStaticParams = () => collections.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCollection((await params).slug);
  return c ? { title: c.title, description: c.intro } : {};
}

/**
 * One compartment of the cabinet, laid out plainly: the illustration stays
 * on the homepage, and here the real things are given room to be read.
 */
export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCollection((await params).slug);
  if (!c) notFound();
  const { projects, writing, archive } = collectionContents(c);
  const index = collections.indexOf(c);
  // Collections with their own interactive rooms skip the plain listings below.
  const custom = c.slug === "cinema" || c.slug === "art-and-curation" || c.slug === "writing-and-philosophy";
  const empty = !projects.length && !writing.length && !archive.length;

  return (
    <>
      <div className="frame pt-[calc(var(--header-h)+1.5rem)]">
        <Link href="/#cabinet" className="label inline-flex items-center gap-2 text-wine hover:text-vermilion">
          <span aria-hidden>←</span> Back to the cabinet
        </Link>
      </div>
      <PageHeader number={`Collection ${index + 1} of ${collections.length}`} kicker="From the cabinet" title={c.title} intro={c.intro} tone="blue" />

      <div className="frame space-y-24 pb-[var(--section-space)]">
        {c.slug === "cinema" && <TopFive films={topFive} />}

        {c.slug === "cinema" && (
          <CinemaCompartments
            log={<FilmLog films={films} placeholders={filmsArePlaceholders} />}
            reviews={<FilmReviews writing={writing} projects={projects} />}
          />
        )}

        {c.slug === "art-and-curation" && (
          <>
            <nav aria-label="In this collection" className="flex flex-wrap gap-x-10 gap-y-2 border-y border-wine/25 py-4">
              <a href="#curation" className="label link-draw text-wine">01 Curation · The Curator’s Cabinet</a>
              <a href="#art" className="label link-draw text-wine">02 Art · The Artist’s Sketchbook</a>
            </nav>
            <section id="curation" aria-labelledby="curation-title" className="scroll-mt-24">
              <SectionHeading id="curation-title" number="01" kicker="Curation" title="The Curator’s" italic="Cabinet" />
              <p className="mb-14 mt-6 font-display text-lede italic text-wine">Things I Collect, Connect, and Give Meaning To.</p>
              <CuratorsCabinet />
            </section>
            <section id="art" aria-labelledby="art-title" className="scroll-mt-24">
              <SectionHeading id="art-title" number="02" kicker="Art" title="The Artist’s" italic="Sketchbook" align="offset" />
              <p className="mb-14 mt-6 font-display text-lede italic text-wine lg:ml-[calc(2/12*100%)]">Things I Create.</p>
              <Sketchbook />
            </section>
          </>
        )}

        {c.slug === "writing-and-philosophy" && (
          <>
            <nav aria-label="In this collection" className="flex flex-wrap gap-x-10 gap-y-2 border-y border-wine/25 py-4">
              {writingSections.map((s) => (
                <a key={s.slug} href={`#${s.slug}`} className="label link-draw text-wine">
                  {s.number} {s.title} · {s.room}
                </a>
              ))}
            </nav>
            <section id="poetry" aria-labelledby="poetry-title" className="scroll-mt-24">
              <SectionHeading id="poetry-title" number="01" kicker="Poetry" title="The Poetry" italic="Garden" />
              <p className="mb-12 mt-6 font-display text-lede italic text-wine">Each flower is a poem. Lines from them drift through the garden.</p>
              <PoetryGarden />
            </section>
            <section id="creative-writing" aria-labelledby="creative-title" className="scroll-mt-24">
              <SectionHeading id="creative-title" number="02" kicker="Creative Writing" title="The Story" italic="Collection" align="offset" />
              <p className="mb-14 mt-6 font-display text-lede italic text-wine lg:ml-[calc(2/12*100%)]">Stories, prose and personal pieces.</p>
              <StoryCollection stories={writing.filter(isCreative)} />
            </section>
            <section id="analysis" aria-labelledby="analysis-title" className="scroll-mt-24">
              <SectionHeading id="analysis-title" number="03" kicker="Analysis" title="The Reading" italic="Room" align="right" />
              <p className="mb-14 mt-6 font-display text-lede italic text-wine lg:ml-[calc(4/12*100%)]">Essays on film, art history, philosophy and literature, filed by subject.</p>
              <ReadingRoom essays={writing.filter(isAnalysis)} />
            </section>
          </>
        )}

        {!custom && projects.length > 0 && (
          <section aria-labelledby="c-projects">
            <h2 id="c-projects" className="label mb-8 border-b border-wine/25 pb-3 text-wine">
              Projects
            </h2>
            <ul className="grid-editorial gap-y-14">
              {projects.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * 0.05} className="col-span-4 md:col-span-4 lg:col-span-6">
                  <Link href={`/work/${p.slug}`} className="group block">
                    <Plate image={p.cover} number={i + 1} sizes="(min-width: 64rem) 45vw, 90vw" />
                    <p className="label mt-4 text-wine">
                      {p.category} · {p.year ?? "Year —"}
                    </p>
                    <h3 className="mt-1 text-title transition-colors duration-500 group-hover:text-vermilion">{p.title}</h3>
                    {p.subtitle && <p className="mt-1 font-display italic text-wine">{p.subtitle}</p>}
                    <p className="mt-3 max-w-[56ch] text-body text-wine">{p.summary}</p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        {!custom && writing.length > 0 && (
          <section aria-labelledby="c-writing">
            <h2 id="c-writing" className="label mb-2 border-b border-wine/25 pb-3 text-wine">
              Writing
            </h2>
            <ol>
              {writing.map((a) => (
                <li key={a.slug} className="border-b border-wine/15">
                  <Link href={`/writing/${a.slug}`} className="group grid-editorial items-baseline gap-y-1 py-6">
                    <span className="label col-span-4 text-wine md:col-span-2">{a.category}</span>
                    <span className="col-span-4 md:col-span-4 lg:col-span-7">
                      <span className="block font-display text-title transition-colors duration-500 group-hover:text-vermilion">{a.title}</span>
                      {a.dek && <span className="mt-1 block text-caption text-wine">{a.dek}</span>}
                    </span>
                    <span className="label col-span-4 text-wine md:col-span-2 md:text-right lg:col-span-3">{formatDate(a.date)}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        )}

        {!custom && archive.length > 0 && (
          <section aria-labelledby="c-archive">
            <h2 id="c-archive" className="label mb-8 border-b border-wine/25 pb-3 text-wine">
              From the archive
            </h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
              {archive.map((a, i) => (
                <Reveal as="li" key={a.slug} delay={i * 0.04}>
                  <Link href={`/archive/${a.slug}`} className="group block">
                    <Plate image={a.image} sizes="(min-width: 64rem) 22vw, 45vw" showPlaceholderLabel={false} />
                    <p className="label mt-3 text-wine">{catalogueNumber(a.number)} · {a.category}</p>
                    <p className="mt-1 font-display text-[1.15rem] leading-snug transition-colors duration-500 group-hover:text-vermilion">{a.title}</p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        {empty && !custom && <p className="font-display text-lede italic text-wine">[Nothing in this collection yet. Add projects, writing or archive objects to it in content/collections.ts.]</p>}

        <nav aria-label="Other collections" className="border-t border-wine/25 pt-6">
          <p className="label mb-4 text-wine">Elsewhere in the cabinet</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {collections
              .filter((o) => o.slug !== c.slug)
              .map((o) => (
                <li key={o.slug}>
                  <ArrowLink href={`/collections/${o.slug}`} className="text-wine">
                    {o.title}
                  </ArrowLink>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
