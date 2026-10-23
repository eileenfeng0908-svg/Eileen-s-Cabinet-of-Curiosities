import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { archive, getArchiveItem } from "@/content/archive";
import { Plate } from "@/components/editorial/Plate";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { catalogueNumber } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return archive.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getArchiveItem((await params).slug);
  if (!item) return {};
  return { title: `${catalogueNumber(item.number)} — ${item.title}`, description: item.note };
}

export default async function ArchiveItemPage({ params }: Props) {
  const item = getArchiveItem((await params).slug);
  if (!item) notFound();

  return (
    <article className="frame pb-[var(--section-space)] pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]">
      <div className="grid-editorial gap-y-12">
        <figure className="col-span-4 md:col-span-5 lg:col-span-7">
          <Plate image={item.image} priority sizes="(min-width: 64rem) 58vw, 100vw" zoom={false} />
          {item.image.caption && <figcaption className="mt-3 text-caption text-charcoal-soft">{item.image.caption}</figcaption>}
        </figure>
        <div className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-9 md:sticky md:top-28 self-start">
          <dl className="space-y-4 border-t border-charcoal/70 pt-4">
            <div>
              <dt className="label text-charcoal-soft">Catalogue</dt>
              <dd className="label text-mozart">{catalogueNumber(item.number)}</dd>
            </div>
            <div>
              <dt className="label text-charcoal-soft">Category</dt>
              <dd className="label">{item.category}</dd>
            </div>
            <div>
              <dt className="label text-charcoal-soft">Date</dt>
              <dd className="label">{item.date ?? "Date unknown"}</dd>
            </div>
          </dl>
          <h1 className="mt-10 text-display-m">{item.title}</h1>
          {item.note && <p className="mt-6 font-display text-lede italic text-charcoal-soft">{item.note}</p>}
          <div className="mt-12">
            <ArrowLink href="/archive">Back to the archive</ArrowLink>
          </div>
        </div>
      </div>
    </article>
  );
}
