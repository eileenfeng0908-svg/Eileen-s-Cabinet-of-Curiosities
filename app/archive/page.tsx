import type { Metadata } from "next";
import Link from "next/link";
import { archive } from "@/content/archive";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Plate } from "@/components/editorial/Plate";
import { Reveal } from "@/components/motion/Reveal";
import { catalogueNumber } from "@/lib/format";

export const metadata: Metadata = {
  title: "Archive",
  description: "A digital cabinet of curiosities: postcards, photographs, letters, sketchbooks and objects.",
};

// Preliminary grid. Phase 3 adds the Grid / Index view toggle and hover labels.
export default function ArchivePage() {
  const items = [...archive].sort((a, b) => a.number - b.number);
  return (
    <>
      <PageHeader
        number="04"
        tone="velvet"
        kicker="Archive"
        title="Cabinet of"
        italic="curiosities"
        intro="Postcards, photographs, letters, sketchbook pages, objects, and fragments of everyday life."
      />
      <div className="frame pb-[var(--section-space)]">
        <ul className="grid grid-cols-2 items-start gap-x-[var(--gutter)] gap-y-14 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal as="li" key={item.slug} delay={(i % 4) * 0.05} className={i % 2 ? "mt-12" : ""}>
              <Link href={`/archive/${item.slug}`} className="group block">
                <Plate image={item.image} showPlaceholderLabel={false} sizes="(min-width: 64rem) 25vw, 50vw" />
                <p className="label mt-3 text-velvet">{catalogueNumber(item.number)}</p>
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
