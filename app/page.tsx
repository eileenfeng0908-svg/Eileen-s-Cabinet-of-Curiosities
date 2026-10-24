import { CabinetHero } from "@/components/home/CabinetHero";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { Ribbon } from "@/components/home/Ribbon";
import { Statement } from "@/components/home/Statement";
import { FeaturedArchive } from "@/components/home/FeaturedArchive";
import { RecentWriting } from "@/components/home/RecentWriting";

export default function HomePage() {
  return (
    <>
      <CabinetHero />
      <SelectedWorks />
      <Ribbon />
      <Statement />
      <FeaturedArchive />
      <RecentWriting />
    </>
  );
}
