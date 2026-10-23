import Image from "next/image";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { roman } from "@/lib/format";
import type { topFive } from "@/content/films";

/**
 * Top 5 Films: five posters in a row, like Letterboxd's favourites, each
 * mounted as a small print with a walnut edge. A light grain sits over the
 * poster; hovering (or focusing, or tapping) lifts it and slides up its
 * title, director and year. On narrow screens the row scrolls sideways.
 */
export function TopFive({ films }: { films: typeof topFive }) {
  return (
    <section aria-labelledby="top-five" className="space-y-10">
      <SectionHeading id="top-five" number="Favourites" kicker="In order" title="Top 5" italic="Films" />
      <ol className="-mx-[var(--page-margin)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--page-margin)] scroll-px-[var(--page-margin)] pb-4 pt-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-5 sm:overflow-visible sm:px-0 lg:gap-7">
        {films.map((f, i) => (
          <Reveal as="li" key={f.title} delay={i * 0.06} className="w-[42vw] max-w-[13rem] shrink-0 snap-start sm:w-auto sm:max-w-none">
            <figure
              tabIndex={0}
              aria-label={`${i + 1}. ${f.title}, directed by ${f.director}, ${f.year}`}
              className="group relative outline-none transition-transform duration-700 ease-gallery hover:-translate-y-1.5 focus-visible:-translate-y-1.5"
            >
              <div className="print border border-walnut/60 transition-shadow duration-700 group-hover:shadow-[0_22px_30px_-18px_rgb(113_63_72/0.6)] group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-vermilion">
                <div className="relative aspect-[2/3] overflow-hidden rounded-[2px] bg-wine">
                  <Image src={f.poster} alt={`Poster for ${f.title}`} fill sizes="(min-width: 64rem) 17vw, (min-width: 40rem) 19vw, 42vw" className="object-cover" priority={i < 2} />
                  <span aria-hidden className="film-grain top-five-grain" />
                  <figcaption
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 translate-y-full bg-wine/90 px-3 pb-3 pt-2.5 text-ivory transition-transform duration-500 ease-gallery group-hover:translate-y-0 group-focus:translate-y-0"
                  >
                    <span className="block font-display text-[clamp(0.95rem,1.25vw,1.15rem)] leading-tight">{f.title}</span>
                    <span className="mt-1 block text-[0.72rem] leading-snug text-ivory/85">
                      {f.director} · {f.year}
                    </span>
                  </figcaption>
                </div>
              </div>
              <span aria-hidden className="label mt-3 block text-center text-wine">
                {roman(i + 1)}
              </span>
            </figure>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
