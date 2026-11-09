import type { Metadata } from "next";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Plate } from "@/components/editorial/Plate";
import { NouveauFrame } from "@/components/editorial/NouveauFrame";

export const metadata: Metadata = {
  title: "About",
  description: "About Eileen Feng.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader tone="walnut" number="05" kicker="About" title="About" italic="Eileen" />
      <div className="frame grid-editorial gap-y-12 pb-[var(--section-space)]">
        <div className="col-span-3 md:col-span-3 lg:col-span-4">
          <NouveauFrame>
            <Plate
              image={{
                src: "/images/about/eileen-portrait.jpg",
                alt: "Portrait of Eileen Feng in a city park, a fountain and a stone arch behind her",
                aspect: 3 / 4,
              }}
              priority
              sizes="(min-width: 64rem) 33vw, 75vw"
              zoom={false}
            />
          </NouveauFrame>
        </div>
        <div className="col-span-4 md:col-span-5 lg:col-span-6 lg:col-start-6 space-y-6">
          <p className="font-display text-statement">
            Hi, I’m Eileen! I’m a student, film lover, occasional writer, and enthusiastic collector of little things.
          </p>
          <div className="space-y-5 text-body text-wine">
            <p>
              I’ve always been curious about the stories behind ordinary things, whether it’s an old postcard, a scene
              from a film, a painting, or a conversation with a stranger. I love collecting things that remind me of
              people, places, and moments, even when they seem insignificant to everyone else.
            </p>
            <p>
              My interests lie somewhere between cinema, art, philosophy, and the humanities. I’m particularly
              fascinated by how art shapes our understanding of ourselves and others. Through filmmaking, writing,
              research, and curating exhibitions, I enjoy exploring questions that rarely have straightforward answers.
            </p>
            <p>
              Outside of academics, you’ll probably find me wandering around a museum, sitting in a cinema, writing
              postcards, or drinking far too much coffee.
            </p>
            <p className="font-display text-lede italic">
              Think of this website as my little cabinet of curiosities: a collection of things I’ve made, places I’ve
              been, ideas I’ve encountered, and questions I’m still trying to figure out.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
