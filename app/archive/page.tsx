import type { Metadata } from "next";
import Link from "next/link";
import { archive } from "@/content/archive";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Plate } from "@/components/editorial/Plate";
import { Reveal } from "@/components/motion/Reveal";
import { catalogueNumber } from "@/lib/format";
import { siteIndex } from "@/lib/siteIndex";
import { ArchiveIndex } from "@/components/archive/ArchiveIndex";

export const metadata: Metadata = {
  title: "Archive",
  description: "Everything in the cabinet in one place: projects, writings, poems, films, cities and objects, plus postcards, photographs, letters and sketchbooks.",
};

// The index of everything on the site comes first, then the archive's own objects.
export default function ArchivePage() {
  const items = [...archive].sort((a, b) => a.number - b.number);
  return (
    <>
      <PageHeader
        number="04"
        tone="vermilion"
        kicker="Archive"
        title="Cabinet of"
        italic="curiosities"
        intro="Everything in the cabinet, all in one place: projects, writings, poems, films, cities, and the postcards, letters and small objects of everyday life."
      />
      <div className="frame pb-[var(--section-space)]">
        <ArchiveIndex entries={siteIndex()} />

        <div className="mb-12 mt-24 flex items-center gap-4">
          <h2 className="label text-wine">Objects in the archive</h2>
          <span aria-hidden className="h-px flex-1 bg-brass/40" />
        </div>
        <ul className="grid grid-cols-2 items-start gap-x-[var(--gutter)] gap-y-14 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal as="li" key={item.slug} delay={(i % 4) * 0.05} className={i % 2 ? "mt-12" : ""}>
              <Link href={`/archive/${item.slug}`} className="group block">
                <Plate image={item.image} showPlaceholderLabel={false} sizes="(min-width: 64rem) 25vw, 50vw" />
                <p className="label mt-3 text-wine">{catalogueNumber(item.number)}</p>
                <p className="label text-ink">{item.title}</p>
                <p className="label text-ink-soft">{item.date ?? "Date unknown"}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
