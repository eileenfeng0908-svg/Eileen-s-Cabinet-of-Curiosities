"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { navigation, site } from "@/content/site";
import { Plate } from "@/components/editorial/Plate";
import { Parallax } from "@/components/motion/Parallax";
import { duration, ease } from "@/components/motion/tokens";
import type { ImageAsset } from "@/lib/types";

/**
 * The opening spread. Built on the 12-column grid with explicit rows on
 * large screens so the name, the plates and the small print can overlap.
 * Replace the two plates with real images in the `heroImages` object.
 */
const heroImages: { main: ImageAsset; inset: ImageAsset } = {
  main: {
    alt: "[Hero image — a photograph or archival image of your choosing]",
    aspect: 4 / 5,
    tone: "sunset",
    motif: "horizon",
  },
  inset: {
    alt: "[Small inset image — a postcard, a detail, a still]",
    aspect: 3 / 4,
    tone: "pumpkin",
    motif: "sun",
  },
};

const line = {
  hidden: { y: "105%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: duration.slow, ease, delay: 0.15 + i * 0.12 },
  }),
};

const fade = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: duration.slow, ease, delay },
});

export function Hero() {
  const [first, last] = site.name.split(" ");

  return (
    <section aria-labelledby="hero-title" className="relative min-h-[100svh] bg-jordy pt-[calc(var(--header-h)+1.5rem)]">
      <div className="frame">
        {/* Running head, like the top of a printed page */}
        <motion.div {...fade(0.05)} className="grid-editorial border-b border-charcoal/25 pb-3">
          <span className="label col-span-2 md:col-span-3 text-sealbrown">01 — Index</span>
          <span className="label col-span-2 md:col-span-3 lg:col-span-4 text-right md:text-left text-charcoal">
            A Personal Digital Archive
          </span>
          <span className="label hidden md:block md:col-span-2 lg:col-span-5 text-right text-charcoal">
            Works · Writings · Objects
          </span>
        </motion.div>

        <div className="grid-editorial relative mt-8 gap-y-8 lg:mt-10 lg:grid-rows-[auto_auto_1fr]">
          {/* Name */}
          <h1
            id="hero-title"
            className="relative z-10 col-span-4 md:col-span-8 lg:col-span-11 lg:col-start-1 lg:row-start-1 font-display text-display-xl max-md:text-[25vw] text-charcoal"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" variants={line} initial="hidden" animate="show" custom={0}>
                {first}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.12em] pl-[18%] md:pl-[30%] lg:pl-[44%]">
              <motion.span className="script block text-sealbrown" variants={line} initial="hidden" animate="show" custom={1}>
                {last}
              </motion.span>
            </span>
          </h1>

          {/* Main plate: sits behind the second line of the name on large screens */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease, delay: 0.35 }}
            className="relative col-span-3 col-start-2 md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-9 lg:row-span-3 lg:row-start-1 lg:mt-[clamp(5rem,9vw,9rem)]"
          >
            <figure>
              <Plate image={heroImages.main} number={1} priority sizes="(min-width: 64rem) 33vw, 75vw" zoom={false} />
              <figcaption className="mt-3 flex justify-between gap-4 text-caption text-charcoal">
                <span className="label whitespace-nowrap">Fig. 1</span>
                <span className="text-right italic font-display text-base">[Caption for the hero image]</span>
              </figcaption>
            </figure>

            {/* Inset plate, layered over the corner and drifting slightly on scroll */}
            <Parallax distance={40} className="absolute -left-[22%] bottom-[18%] w-[42%] md:-left-[30%] lg:-left-[34%] lg:w-[46%]">
              <div className="border-[6px] border-ivory-pale shadow-[0_1px_0_rgb(52_51_47/0.08)]">
                <Plate image={heroImages.inset} number={2} zoom={false} showPlaceholderLabel={false} sizes="20vw" />
              </div>
            </Parallax>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            {...fade(0.75)}
            className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-1 lg:row-start-2 font-display text-lede italic text-charcoal md:text-[1.6rem] md:leading-snug max-w-[26ch]"
          >
            {site.tagline}
          </motion.p>

          {/* Contents, set like a magazine's table of contents */}
          <motion.nav
            {...fade(0.95)}
            aria-label="Contents"
            className="hidden lg:block lg:col-span-2 lg:col-start-6 lg:row-start-2 lg:self-end"
          >
            <p className="label mb-3 text-charcoal">Contents</p>
            <ol className="space-y-1.5 text-caption">
              {navigation.slice(0, 4).map((item, i) => (
                <li key={item.href} className="flex gap-3">
                  <span className="label w-5 pt-[3px] text-sealbrown">0{i + 2}</span>
                  <Link href={item.href} className="link-draw">
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
            className="group col-span-2 lg:col-span-2 lg:col-start-1 lg:row-start-3 flex items-end gap-3 self-end pb-8 lg:pb-12"
          >
            <span aria-hidden className="relative block h-14 w-px overflow-hidden bg-charcoal/20">
              <span className="scroll-cue-line absolute inset-x-0 top-0 block h-5 bg-sealbrown" />
            </span>
            <span className="label text-charcoal transition-colors duration-500 group-hover:text-sealbrown">Scroll</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
