import { CabinetHero } from "@/components/home/CabinetHero";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { Statement } from "@/components/home/Statement";
import { FeaturedArchive } from "@/components/home/FeaturedArchive";
import { RecentWriting } from "@/components/home/RecentWriting";

export default function HomePage() {
  return (
    <>
      <CabinetHero />
      <SelectedWorks />
      <Statement />
      <FeaturedArchive />
      <RecentWriting />
    </>
  );
}
