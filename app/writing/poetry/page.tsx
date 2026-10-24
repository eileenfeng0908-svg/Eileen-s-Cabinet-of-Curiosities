import type { Metadata } from "next";
import { PageHeader } from "@/components/editorial/PageHeader";
import { PoetryGarden } from "@/components/writing/PoetryGarden";
import { WritingNav } from "@/components/writing/WritingNav";

export const metadata: Metadata = {
  title: "Poetry · The Poetry Garden",
  description: "Poems by Eileen Feng, in a garden of drifting lines and painted flowers.",
};

export default function PoetryPage() {
  return (
    <>
      <PageHeader number="03 · 01" tone="green" kicker="Writing · Poetry" title="The Poetry" italic="Garden" intro="Each flower is a poem. Lines from them drift through the garden." />
      <WritingNav current="poetry" />
      <div className="pb-[var(--section-space)] pt-12 md:pt-16">
        <PoetryGarden />
      </div>
    </>
  );
}
