import type { Metadata } from "next";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Plate } from "@/components/editorial/Plate";
import { NouveauFrame } from "@/components/editorial/NouveauFrame";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { curiosities } from "@/content/curiosities";

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
      <section id="curiosities" className="frame grid-editorial gap-y-10 pb-[var(--section-space)]">
        <SectionHeading number="01" kicker="Collected" title="A cabinet of" italic="small curiosities" />
        <div className="col-span-4 md:col-span-8 lg:col-span-12 columns-2 gap-5 md:columns-3 lg:gap-7">
          {curiosities.map((img, i) => (
            <figure
              key={img.src}
              className="mb-5 break-inside-avoid bg-[#fbf3e3] p-2 shadow-[0_6px_18px_-8px_rgba(113,63,72,0.35)] transition-transform duration-300 hover:rotate-0 hover:scale-[1.02] md:p-3 lg:mb-7"
              style={{ transform: `rotate(${[-1.6, 1.2, -0.6, 1.8, -1.1, 0.7][i % 6]}deg)` }}
            >
              <Plate image={img} sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 33vw, 50vw" zoom={false} />
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
