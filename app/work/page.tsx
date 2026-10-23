import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Plate } from "@/components/editorial/Plate";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: "Cinema & research, art & curation, photography and creative experiments.",
};

// Preliminary layout. Phase 3 develops the full asymmetrical grid and category filters.
const spans = [
  "col-span-4 md:col-span-5 lg:col-span-6",
  "col-span-4 md:col-span-3 md:mt-32 lg:col-span-4 lg:col-start-8",
  "col-span-4 md:col-span-4 md:col-start-2 lg:col-span-5 lg:col-start-2",
  "col-span-4 md:col-span-3 md:col-start-6 md:mt-24 lg:col-span-4 lg:col-start-8",
];

export default function WorkPage() {
  return (
    <>
      <PageHeader
        number="02"
        tone="glare"
        kicker="Projects"
        title="Projects,"
        italic="in four rooms"
        intro="Cinema & Research · Art & Curation · Photography · Creative Experiments"
      />
      <div className="frame pb-[var(--section-space)]">
        <ul className="grid-editorial gap-y-20">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} className={spans[i % spans.length]}>
              <Link href={`/work/${p.slug}`} className="group block">
                <Plate image={p.cover} number={i + 1} />
                <div className="mt-5">
                  <p className="label text-ink-soft">
                    {p.category} · {p.year ?? "Year —"}
                  </p>
                  <h2 className="mt-2 text-title transition-colors duration-500 group-hover:text-rosebud">{p.title}</h2>
                  {p.subtitle && <p className="font-display text-lg italic text-ink-soft">{p.subtitle}</p>}
                  <p className="mt-3 max-w-md text-caption text-ink-soft">{p.summary}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
