import Link from "next/link";
import { site } from "@/content/site";
import { cabinetItems } from "@/content/collections";
import { Cabinet } from "@/components/cabinet/Cabinet";

/**
 * The opening of the homepage: the painted cabinet, with a plain list of the
 * same six collections beside it for anyone who would rather not open doors.
 */
export function CabinetHero() {
  return (
    <section id="cabinet" aria-labelledby="cabinet-title" className="relative overflow-x-clip pb-16 pt-[calc(var(--header-h)+0.75rem)] lg:min-h-[100svh] lg:pb-8">
      <div className="frame relative grid-editorial gap-y-10 lg:grid-rows-[auto_1fr]">
        <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:row-start-1 lg:self-end">
          <p className="label text-wine">An archive kept by {site.name}</p>
          <h1 id="cabinet-title" className="mt-5 text-display-l text-wine">
            Eileen&rsquo;s <em className="text-vermilion">Cabinet</em> of Curiosities
          </h1>
          <p className="mt-6 max-w-[34ch] text-lede text-wine">{site.tagline}</p>
          <p className="mt-4 max-w-[38ch] text-caption text-wine">
            Open the doors to look inside. Each shelf and drawer holds a different collection.
          </p>
        </div>

        <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <div className="mx-auto w-full max-w-[min(40rem,calc((100svh-var(--header-h)-6.5rem)*0.6667))]">
            <Cabinet items={cabinetItems} />
          </div>
        </div>

        {/* the same six collections, without the doors */}
        <nav aria-label="Collections" className="col-span-4 border-t border-wine/25 pt-4 md:col-span-8 lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:self-start">
          <p className="label mb-3 text-wine">Or go straight to a collection</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5">
            {cabinetItems.map((c) => (
              <li key={c.slug}>
                <Link href={`/collections/${c.slug}`} className="link-draw font-display text-[1.15rem] text-wine hover:text-vermilion">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
