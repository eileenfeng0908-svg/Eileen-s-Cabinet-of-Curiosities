import { site } from "@/content/site";
import { LaceFrame } from "@/components/editorial/LaceFrame";
import { Plate } from "@/components/editorial/Plate";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";

/** A short personal statement, set large, beside a lace-framed portrait. */
export function Statement() {
  return (
    <section aria-labelledby="statement-title" className="section-space bg-sunset">
      <div className="frame grid-editorial gap-y-16">
        <div className="col-span-4 md:col-span-8 lg:col-span-12 flex items-center gap-4">
          <span className="label text-sealbrown">03</span>
          <span aria-hidden className="h-px w-10 bg-sealbrown/40" />
          <h2 id="statement-title" className="label text-charcoal font-mono">
            A Note on This Collection
          </h2>
        </div>

        <div className="col-span-3 col-start-1 md:col-span-3 lg:col-span-4 lg:col-start-1">
          <Parallax distance={30}>
            <Reveal>
              <figure className="-rotate-[1.2deg]">
                <LaceFrame aspect={3 / 3.9}>
                  <Plate
                    image={{ alt: "[Portrait of Eileen]", aspect: 3 / 4, tone: "ivory", motif: "figure" }}
                    className="h-full w-full"
                    showPlaceholderLabel={false}
                    zoom={false}
                  />
                </LaceFrame>
                <figcaption className="mt-4 rotate-[1.2deg] text-center font-display text-base italic text-charcoal">
                  [Portrait — to come]
                </figcaption>
              </figure>
            </Reveal>
          </Parallax>
        </div>

        <div className="col-span-4 md:col-span-5 md:col-start-4 lg:col-span-7 lg:col-start-6 lg:pt-16">
          <Reveal>
            <p className="font-display text-statement text-charcoal serif-figures">
              <em className="script text-sealbrown">{site.statement.lead} —</em> {site.statement.body}
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-sm text-caption text-charcoal">{site.statement.signature}</p>
            <ArrowLink href="/about" className="text-sealbrown">About Eileen</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
