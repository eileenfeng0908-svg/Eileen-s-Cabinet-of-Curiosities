import type { Metadata } from "next";
import { PageHeader } from "@/components/editorial/PageHeader";
import { siteIndex } from "@/lib/siteIndex";
import { ArchiveIndex } from "@/components/archive/ArchiveIndex";

export const metadata: Metadata = {
  title: "Archive",
  description: "Everything in the cabinet in one place: projects, writings, poems, films, cities and objects, plus postcards, photographs, letters and sketchbooks.",
};

// The index of everything on the site.
export default function ArchivePage() {
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

      </div>
    </>
  );
}
