import { Hero } from "@/components/home/Hero";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { Statement } from "@/components/home/Statement";
import { FeaturedArchive } from "@/components/home/FeaturedArchive";
import { RecentWriting } from "@/components/home/RecentWriting";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWorks />
      <Statement />
      <FeaturedArchive />
      <RecentWriting />
    </>
  );
}
