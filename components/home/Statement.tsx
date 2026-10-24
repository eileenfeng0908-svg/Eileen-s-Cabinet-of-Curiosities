"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { site } from "@/content/site";
import { LaceFrame } from "@/components/editorial/LaceFrame";
import { Plate } from "@/components/editorial/Plate";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { Star } from "@/components/editorial/Ornaments";
import { LaceHeart } from "@/components/editorial/Doily";
import { BotanicalVine } from "@/components/editorial/BotanicalVine";
import { WashBlot } from "@/components/writing/Painted";
import { handLine, rng } from "@/components/cabinet/paint";
import { pencil } from "@/components/cabinet/PaintDefs";
import { ease } from "@/components/motion/tokens";

/**
 * The personal statement, written into the page as you scroll: each word
 * inks in from faint pencil to full colour, while watercolour blooms open
 * behind the lace-framed portrait.
 */
export function Statement() {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const text = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress: pass } = useScroll({ target: section, offset: ["start end", "end start"] });
  const { scrollYProgress: ink } = useScroll({ target: text, offset: ["start 0.85", "end 0.5"] });

  const bloomScale = useTransform(pass, [0.1, 0.55], [0.4, 1.15]);
  const bloomTurn = useTransform(pass, [0, 1], [-25, 35]);
  const bloomTurnBack = useTransform(pass, [0, 1], [20, -30]);
  const portraitY = useTransform(pass, [0, 1], [50, -50]);
  const portraitTurn = useTransform(pass, [0.15, 0.6], [-6, -1.2]);

  const words = site.statement.body.split(" ");

  return (
    <section ref={section} aria-labelledby="statement-title" className="section-space relative isolate overflow-hidden bg-ivory-deep">
      <div className="frame grid-editorial gap-y-16">
        <div className="col-span-4 flex items-center gap-4 md:col-span-8 lg:col-span-12">
          <span className="label text-wine">III</span>
          <span aria-hidden className="h-px w-10 bg-brass/50" />
          <Star className="h-3 w-3 text-brass" />
          <h2 id="statement-title" className="label font-[family-name:var(--font-sc)] text-wine">
            A Note on This Collection
          </h2>
        </div>

        <div className="relative col-span-3 col-start-1 md:col-span-3 lg:col-span-4 lg:col-start-1">
          {/* Watercolour blooms that open behind the portrait as it scrolls into view. */}
          <motion.div aria-hidden style={reduce ? undefined : { scale: bloomScale, rotate: bloomTurn }} className="absolute -left-[18%] -top-[12%] -z-10 h-[70%] w-[90%]">
            <WashBlot color="var(--vermilion)" seed={41} w="b" className="inset-0 h-full w-full opacity-60" />
          </motion.div>
          <motion.div aria-hidden style={reduce ? undefined : { scale: bloomScale, rotate: bloomTurnBack }} className="absolute -bottom-[10%] -right-[20%] -z-10 h-[60%] w-[80%]">
            <WashBlot color="var(--powder-blue)" seed={44} w="c" className="inset-0 h-full w-full opacity-80" />
          </motion.div>
          <motion.div aria-hidden style={reduce ? undefined : { scale: bloomScale }} className="absolute -right-[6%] top-[8%] -z-10 h-[26%] w-[34%]">
            <WashBlot color="var(--brass)" seed={47} className="inset-0 h-full w-full opacity-60" />
          </motion.div>

          <motion.figure style={reduce ? { rotate: -1.2 } : { y: portraitY, rotate: portraitTurn }}>
            <LaceFrame aspect={3 / 3.9}>
              <Plate
                image={{ src: "/images/about/eileen-portrait.jpg", alt: "Portrait of Eileen", aspect: 3 / 4 }}
                className="h-full w-full"
                sizes="(min-width: 64rem) 30vw, 70vw"
                zoom={false}
              />
            </LaceFrame>
          </motion.figure>
        </div>

        <div className="col-span-4 md:col-span-5 md:col-start-4 lg:col-span-7 lg:col-start-6 lg:pt-16">
          <p ref={text} className="font-display text-statement text-wine">
            <Lead text={site.statement.lead} still={!!reduce} /> —{" "}
            {words.map((w, i) => (
              <Word key={i} progress={ink} range={[i / words.length, (i + 1.5) / words.length]} still={!!reduce}>
                {w}
              </Word>
            ))}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="mt-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end"
          >
            <p className="flex max-w-sm items-start gap-3 text-caption text-ink-soft">
              <LaceHeart className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
              {site.statement.signature}
            </p>
            <ArrowLink href="/about" className="text-ink">
              About Eileen
            </ArrowLink>
          </motion.div>
        </div>
      </div>
      <BotanicalVine className="absolute bottom-10 right-[2vw] hidden w-[5rem] -scale-x-100 lg:block" />
    </section>
  );
}

/** The opening words in script, with a vermilion pencil stroke drawn underneath. */
function Lead({ text, still }: { text: string; still: boolean }) {
  const d = handLine([[2, 8], [60, 5], [130, 9], [196, 4]], rng(8), 1.4);
  return (
    <span className="relative inline-block">
      <span className="title-script text-[1.35em] leading-none text-wine">{text}</span>
      <svg aria-hidden viewBox="0 0 200 14" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full overflow-visible">
        <motion.path
          d={d}
          fill="none"
          stroke="var(--vermilion)"
          strokeWidth={2.6}
          strokeLinecap="round"
          filter={pencil}
          initial={still ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease, delay: 0.3 }}
        />
      </svg>
    </span>
  );
}

function Word({ children, progress, range, still }: { children: string; progress: MotionValue<number>; range: [number, number]; still: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <>
      <motion.span style={still ? undefined : { opacity, y }} className="inline-block">
        {children}
      </motion.span>{" "}
    </>
  );
}
