import type { Metadata } from "next";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Plate } from "@/components/editorial/Plate";

export const metadata: Metadata = {
  title: "About",
  description: "About Eileen Feng.",
};

// Preliminary page. Phase 3 develops the full editorial About layout.
export default function AboutPage() {
  return (
    <>
      <PageHeader tone="sunset" number="05" kicker="About" title="About" italic="Eileen" />
      <div className="frame grid-editorial gap-y-12 pb-[var(--section-space)]">
        <div className="col-span-3 md:col-span-3 lg:col-span-4">
          <Plate image={{ alt: "[Portrait of Eileen]", aspect: 3 / 4, tone: "ivory", motif: "figure" }} zoom={false} />
        </div>
        <div className="col-span-4 md:col-span-5 lg:col-span-6 lg:col-start-6 space-y-6">
          <p className="font-display text-statement">[A personal introduction, in your own words.]</p>
          <p className="text-caption text-charcoal-soft">
            [Artistic and academic interests, selected experiences, creative philosophy and an optional CV download
            will live here.]
          </p>
        </div>
      </div>
    </>
  );
}
