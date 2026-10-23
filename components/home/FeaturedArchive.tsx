import Link from "next/link";
import { featuredArchive } from "@/content/archive";
import { Plate } from "@/components/editorial/Plate";
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

export function FeaturedArchive() {
  const items = featuredArchive().slice(0, layout.length);

  return (
    <section aria-labelledby="archive-title" className="section-space bg-mozart text-ivory">
      <div className="frame">
        <header className="grid-editorial gap-y-6">
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-12 flex items-center gap-4">
            <span className="label text-masterkey">04</span>
            <span aria-hidden className="h-px w-10 bg-ivory/40" />
            <span className="label text-ivory/70">Featured Archive</span>
          </Reveal>
          <Reveal delay={0.08} className="col-span-4 md:col-span-6 lg:col-span-7 lg:col-start-4">
            <h2 id="archive-title" className="text-display-l">
              A cabinet of <em>small curiosities</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16} className="col-span-4 md:col-span-4 lg:col-span-3 lg:col-start-4">
            <p className="text-caption text-ivory/75">
              Postcards, letters, sketchbook pages, photographs and fragments of ordinary days: each object
              catalogued, each with a story.
            </p>
          </Reveal>
        </header>

        <ul className="grid-editorial mt-20 items-start gap-y-10 md:mt-28">
          {items.map((item, i) => (
            <Reveal as="li" key={item.slug} delay={i * 0.06} className={cn(layout[i])}>
              <Link href={`/archive/${item.slug}`} className="group block" aria-label={`${catalogueNumber(item.number)}, ${item.title}`}>
                <div className="relative">
                  <Plate image={item.image} showPlaceholderLabel={false} sizes="(min-width: 64rem) 20vw, 50vw" />
                  {/* Museum tag */}
                  <div
                    aria-hidden
                    className="mt-3 bg-ivory px-3 py-2.5 text-charcoal transition-all duration-700 ease-gallery can-hover:absolute can-hover:bottom-3 can-hover:left-3 can-hover:mt-0 can-hover:translate-y-2 can-hover:opacity-0 can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100 can-hover:group-focus-visible:translate-y-0 can-hover:group-focus-visible:opacity-100"
                  >
                    <span className="label block text-mozart">{catalogueNumber(item.number)}</span>
                    <span className="label block">{item.category === "Postcard" ? "Postcard Collection" : item.category}</span>
                    <span className="label block text-charcoal-soft">{item.date ?? "Date unknown"}</span>
                  </div>
                </div>
                <span aria-hidden className="label mt-3 hidden text-ivory/55 transition-colors duration-500 group-hover:text-masterkey can-hover:block">
                  {catalogueNumber(item.number)}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-20 flex justify-end md:mt-28">
          <ArrowLink href="/archive" className="text-ivory">
            Enter the archive
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
