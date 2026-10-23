import { site } from "@/content/site";
import { LaceFrame } from "@/components/editorial/LaceFrame";
import { Plate } from "@/components/editorial/Plate";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Star } from "@/components/editorial/Ornaments";
import { LaceHeart } from "@/components/editorial/Doily";
import { BotanicalVine } from "@/components/editorial/BotanicalVine";

/** A short personal statement, set large, beside a lace-framed portrait. */
export function Statement() {
  return (
    <section aria-labelledby="statement-title" className="section-space relative overflow-hidden bg-ivory-deep">
      <div className="frame grid-editorial gap-y-16">
        <div className="col-span-4 md:col-span-8 lg:col-span-12 flex items-center gap-4">
          <span className="label text-blush-ink">III</span>
          <span aria-hidden className="h-px w-10 bg-prussian/30" />
          <Star className="h-3 w-3 text-dust" />
          <h2 id="statement-title" className="label font-[family-name:var(--font-sc)] text-prussian">
            A Note on This Collection
          </h2>
        </div>

        <div className="col-span-3 col-start-1 md:col-span-3 lg:col-span-4 lg:col-start-1">
          <Parallax distance={30}>
            <Reveal variant="ink">
              <figure className="-rotate-[1.2deg]">
                <LaceFrame aspect={3 / 3.9}>
                  <Plate
                    image={{ alt: "[Portrait of Eileen]", aspect: 3 / 4, tone: "dust", motif: "figure" }}
                    className="h-full w-full"
                    showPlaceholderLabel={false}
                    zoom={false}
                  />
                </LaceFrame>
                <figcaption className="mt-4 rotate-[1.2deg] text-center font-display text-base italic text-ink-soft">
                  [Portrait — to come]
                </figcaption>
              </figure>
            </Reveal>
          </Parallax>
        </div>

        <div className="col-span-4 md:col-span-5 md:col-start-4 lg:col-span-7 lg:col-start-6 lg:pt-16">
          <Reveal>
            <p className="font-display text-statement text-prussian">
              <span className="title-script text-[1.35em] leading-none text-prussian">{site.statement.lead}</span> — {site.statement.body}
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="flex max-w-sm items-start gap-3 text-caption text-ink-soft">
              <LaceHeart className="mt-0.5 h-5 w-5 shrink-0 text-blush" />
              {site.statement.signature}
            </p>
            <ArrowLink href="/about" className="text-prussian">About Eileen</ArrowLink>
          </Reveal>
        </div>
      </div>
      <BotanicalVine className="absolute bottom-10 right-[2vw] hidden w-[5rem] -scale-x-100 lg:block" />
    </section>
  );
}
