"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { navigation, site } from "@/content/site";
import { Plate } from "@/components/editorial/Plate";
import { NouveauFrame } from "@/components/editorial/NouveauFrame";
import { Doily } from "@/components/editorial/Doily";
import { Flourish, Star } from "@/components/editorial/Ornaments";
import { BotanicalVine } from "@/components/editorial/BotanicalVine";
import { Parallax } from "@/components/motion/Parallax";
import { duration, ease } from "@/components/motion/tokens";
import type { ImageAsset } from "@/lib/types";

/**
 * The opening spread: the name set in copperplate over a paper doily, an
 * arched Art Nouveau frame, a small print laid across its corner, and a
 * botanical stem that grows as the page begins to scroll.
 * Replace the two plates with real images in `heroImages`.
 */
const heroImages: { main: ImageAsset; inset: ImageAsset } = {
  main: {
    alt: "[Hero image — a photograph or archival image of your choosing]",
    aspect: 3 / 4,
    tone: "dust",
    motif: "horizon",
  },
  inset: {
    alt: "[Small inset image — a postcard, a detail, a still]",
    aspect: 4 / 5,
    tone: "blush",
    motif: "sun",
  },
};

const fade = (delay: number, y = 0) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.slow, ease, delay },
});

export function Hero() {
  const [first, last] = site.name.split(" ");

  return (
    <section aria-labelledby="hero-title" className="dust-wash relative overflow-hidden pt-[calc(var(--header-h)+1.5rem)] lg:min-h-[100svh]">
      <div className="frame">
        {/* Running head, like the top of a printed page */}
        <motion.div {...fade(0.05)} className="grid-editorial items-center border-b border-prussian/25 pb-3 text-prussian">
          <span className="label col-span-2 md:col-span-3">No. 01 — Index</span>
          <span className="label col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-end gap-2 md:justify-start">
            <Star className="h-2.5 w-2.5 text-blush" /> A Personal Digital Archive
          </span>
          <span className="label hidden md:block md:col-span-2 lg:col-span-5 text-right">Works · Writings · Objects</span>
        </motion.div>

        <div className="grid-editorial relative mt-6 gap-y-10 pb-16 lg:mt-4 lg:grid-rows-[auto_auto_1fr] lg:pb-0">
          {/* Name over a doily */}
          <div className="relative isolate col-span-4 md:col-span-8 lg:col-span-8 lg:row-start-1">
            <motion.div
              {...fade(0.1)}
              className="pointer-events-none absolute -left-[10%] -top-[4%] -z-0 w-[72%] max-w-[36rem] md:-left-[4%] md:w-[50%] lg:-top-[8%] lg:w-[52%]"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 240, ease: "linear", repeat: Infinity }}>
                <Doily className="w-full opacity-[0.32]" />
              </motion.div>
            </motion.div>

            <h1 id="hero-title" className="title-script relative text-[clamp(5.5rem,14vw,14rem)] leading-[0.95] text-prussian">
              <motion.span {...fade(0.25, 30)} className="block pl-[2%]">
                {first}
              </motion.span>
              <motion.span {...fade(0.45, 30)} className="-mt-[0.12em] block pl-[30%] text-bean">
                {last}
              </motion.span>
            </h1>
          </div>

          {/* Subtitle */}
          <motion.div {...fade(0.8)} className="relative col-span-4 md:col-span-5 lg:col-span-5 lg:col-start-1 lg:row-start-2">
            <p className="max-w-[24ch] font-display text-[clamp(1.35rem,2vw,1.85rem)] italic leading-snug text-prussian">
              {site.tagline}
            </p>
            <Flourish className="mt-4 text-bean" />
          </motion.div>

          {/* Arched frame, a print on its corner, a stem beside it */}
          <motion.div
            {...fade(0.4, 24)}
            className="relative col-span-3 col-start-2 md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-9 lg:row-span-3 lg:row-start-1 lg:mt-[clamp(2rem,5vw,5rem)]"
          >
            <figure>
              <NouveauFrame paper="bg-ivory">
                <Plate image={heroImages.main} number={1} priority sizes="(min-width: 64rem) 33vw, 75vw" zoom={false} grain />
              </NouveauFrame>
              <figcaption className="mt-3 flex justify-between gap-4 text-caption text-ink-soft">
                <span className="label whitespace-nowrap text-prussian">Fig. 1</span>
                <span className="text-right font-display italic">[Caption for the hero image]</span>
              </figcaption>
            </figure>

            <Parallax distance={30} className="absolute -left-[24%] bottom-[22%] w-[40%] lg:-left-[30%] lg:w-[44%]">
              <div className="print -rotate-[5deg] transition-transform duration-1000 ease-gallery hover:-rotate-[2deg]">
                <Plate image={heroImages.inset} number={2} zoom={false} showPlaceholderLabel={false} sizes="20vw" />
              </div>
            </Parallax>

            <BotanicalVine className="absolute -right-[8%] -top-[6%] hidden w-[18%] lg:block" />
          </motion.div>

          {/* Contents, set like the table of contents of an old book */}
          <motion.nav
            {...fade(1)}
            aria-label="Contents"
            className="hidden lg:block lg:col-span-2 lg:col-start-6 lg:row-start-2 lg:self-end"
          >
            <p className="label mb-3 text-prussian">Contents</p>
            <ol className="space-y-1.5 text-caption">
              {navigation.slice(0, 4).map((item, i) => (
                <li key={item.href} className="group flex items-baseline gap-3">
                  <span className="label w-5 text-blush-ink">{["II", "III", "IV", "V"][i]}</span>
                  <Link href={item.href} className="link-draw text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </motion.nav>

          {/* Scroll cue */}
          <motion.a
            {...fade(1.2)}
            href="#selected-works"
            className="group col-span-2 lg:col-span-2 lg:col-start-1 lg:row-start-3 flex items-end gap-3 self-end lg:pb-12"
          >
            <span aria-hidden className="relative block h-14 w-px overflow-hidden bg-prussian/20">
              <span className="scroll-cue-line absolute inset-x-0 top-0 block h-5 bg-prussian" />
            </span>
            <span className="label text-prussian transition-colors duration-500 group-hover:text-blush-ink">Scroll</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
