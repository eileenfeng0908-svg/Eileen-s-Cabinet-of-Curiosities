import Link from "next/link";
import { featuredProjects } from "@/content/projects";
import { Plate } from "@/components/editorial/Plate";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * Placement for up to four featured works. Each slot sets its column span,
 * start and vertical offset per breakpoint, so the gallery reads as a
 * composed spread rather than a grid of cards. Add more slots to feature more.
 */
const slots = [
  { className: "col-span-4 md:col-span-5 lg:col-span-6 lg:col-start-1", sizes: "(min-width: 64rem) 50vw, (min-width: 48rem) 60vw, 100vw" },
  { className: "col-span-3 col-start-2 md:col-span-3 md:col-start-6 md:mt-40 lg:col-span-4 lg:col-start-8 lg:mt-56", sizes: "(min-width: 64rem) 33vw, 75vw" },
  { className: "col-span-4 md:col-span-6 md:col-start-1 lg:col-span-7 lg:col-start-2 lg:mt-8", sizes: "(min-width: 64rem) 58vw, 100vw" },
  { className: "col-span-3 md:col-span-3 md:col-start-6 md:-mt-24 lg:col-span-3 lg:col-start-10 lg:-mt-40", sizes: "(min-width: 64rem) 25vw, 75vw" },
];

export function SelectedWorks() {
  const works = featuredProjects().slice(0, slots.length);

  return (
    <section id="selected-works" aria-labelledby="selected-works-title" className="section-space scroll-mt-16">
      <div className="frame">
        <SectionHeading
          id="selected-works-title"
          number="02"
          kicker="Selected Works"
          title="Things made,"
          italic="looked at, and arranged"
          aside={<ArrowLink href="/work">All work</ArrowLink>}
        />

        <ul className="grid-editorial mt-20 gap-y-20 md:mt-28 md:gap-y-28">
          {works.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i % 2 ? 0.1 : 0} className={cn(slots[i].className)}>
              <Link href={`/work/${project.slug}`} className="group block">
                <figure>
                  <Plate image={project.cover} number={i + 1} sizes={slots[i].sizes} />
                  <figcaption className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
                    <span className="label row-span-2 pt-1.5 text-mozart">No. 0{i + 1}</span>
                    <span className="label flex flex-wrap gap-x-3 text-charcoal-soft">
                      <span>{project.category}</span>
                      <span aria-hidden>·</span>
                      <span>{project.year ?? "Year —"}</span>
                    </span>
                    <span>
                      <span className="block font-display text-title text-charcoal transition-colors duration-500 group-hover:text-mozart">
                        {project.title}
                      </span>
                      {project.subtitle && (
                        <span className="mt-1 block font-display text-lg italic leading-snug text-charcoal-soft">
                          {project.subtitle}
                        </span>
                      )}
                      <span className="label mt-4 inline-flex items-center gap-2 text-mozart transition-all duration-700 ease-gallery can-hover:translate-y-1 can-hover:opacity-0 can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100 can-hover:group-focus-visible:opacity-100">
                        View project <span aria-hidden>→</span>
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
