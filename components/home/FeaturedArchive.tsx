import Link from "next/link";
import { featuredArchive } from "@/content/archive";
import { Plate } from "@/components/editorial/Plate";
import { Rosette } from "@/components/editorial/Ornaments";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { catalogueNumber } from "@/lib/format";
import { cn } from "@/lib/cn";

/**
 * Objects laid out like specimens on a board: different sizes, staggered
 * heights. On hover (or always, on touch screens) a museum tag appears.
 */
const layout = [
  "col-span-2 md:col-span-3 lg:col-span-3 lg:mt-0",
  "col-span-2 mt-16 md:col-span-2 md:mt-24 lg:col-span-2 lg:mt-40",
  "col-span-2 md:col-span-3 md:mt-8 lg:col-span-3 lg:mt-12",
  "col-span-2 mt-10 md:col-span-3 md:col-start-2 lg:col-start-auto lg:col-span-2 lg:mt-56",
  "col-span-2 col-start-2 md:col-span-2 md:mt-20 md:col-start-auto lg:col-span-2 lg:mt-20",
];

// Each print lies at a slightly different angle, like objects set down by hand.
const tilts = ["-rotate-[2deg]", "rotate-[1.5deg]", "-rotate-[1deg]", "rotate-[2.2deg]", "-rotate-[1.6deg]"];

export function FeaturedArchive() {
  const items = featuredArchive().slice(0, layout.length);

  return (
    <section aria-labelledby="archive-title" className="section-space haze-wash relative overflow-hidden text-ink">
      <div className="frame">
        <header className="grid-editorial gap-y-6">
          <Reveal className="group col-span-4 md:col-span-8 lg:col-span-12 flex items-center gap-4 text-velvet">
            <span className="label text-bloom-ink">IV</span>
            <span aria-hidden className="h-px w-10 bg-velvet/30" />
            <span aria-hidden className="transition-transform duration-[1200ms] ease-gallery group-hover:rotate-90">
              <Rosette className="h-3.5 w-3.5 text-bloom" />
            </span>
            <span className="label">Featured Archive</span>
          </Reveal>
          <Reveal delay={0.08} className="col-span-4 md:col-span-6 lg:col-span-7 lg:col-start-4">
            <h2 id="archive-title" className="text-display-l">
              A cabinet of <em>small curiosities</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16} className="col-span-4 md:col-span-4 lg:col-span-3 lg:col-start-4">
            <p className="text-caption text-ink-soft">
              Postcards, letters, sketchbook pages, photographs and fragments of ordinary days: each object
              catalogued, each with a story.
            </p>
          </Reveal>
        </header>

        <ul className="grid-editorial mt-20 items-start gap-y-10 md:mt-28">
          {items.map((item, i) => (
            <Reveal as="li" variant="ink" key={item.slug} delay={i * 0.06} className={cn(layout[i])}>
              <Link href={`/archive/${item.slug}`} className="group block" aria-label={`${catalogueNumber(item.number)}, ${item.title}`}>
                <div className={cn("print relative transition-transform duration-1000 ease-gallery group-hover:rotate-0", tilts[i % tilts.length])}>
                  <Plate image={item.image} showPlaceholderLabel={false} sizes="(min-width: 64rem) 20vw, 50vw" />
                  {/* Museum tag */}
                  <div
                    aria-hidden
                    className="mt-3 border border-velvet/25 bg-ivory px-3 py-2.5 text-ink outline outline-1 outline-offset-2 outline-velvet/15 transition-all duration-700 ease-gallery can-hover:absolute can-hover:bottom-3 can-hover:left-3 can-hover:mt-0 can-hover:translate-y-2 can-hover:opacity-0 can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100 can-hover:group-focus-visible:translate-y-0 can-hover:group-focus-visible:opacity-100"
                  >
                    <span className="label block text-bloom-ink">{catalogueNumber(item.number)}</span>
                    <span className="label block">{item.category === "Postcard" ? "Postcard Collection" : item.category}</span>
                    <span className="label block text-ink-soft">{item.date ?? "Date unknown"}</span>
                  </div>
                </div>
                <span aria-hidden className="label mt-4 hidden text-velvet transition-colors duration-500 group-hover:text-bloom-ink can-hover:block">
                  {catalogueNumber(item.number)}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-20 flex justify-end md:mt-28">
          <ArrowLink href="/archive" className="text-mozart">
            Enter the archive
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
