import type { ImageAsset } from "@/lib/types";
import * as otherSame from "@/content/exhibitions/the-other-the-same";

/**
 * EXHIBITIONS — one catalogue per exhibition, opened from the Exhibitions
 * drawer of the Curator's Cabinet. The URL is /exhibitions/<slug>.
 * Everything in [brackets] is a placeholder for Eileen's own text and images.
 */
export interface ExhibitionArtwork {
  id: string;
  title: string;
  artist: string;
  medium?: string;
  year?: string;
  description?: string;
  image: ImageAsset;
}

/** A passage in Chinese and its English, shown side by side. */
export interface Pair {
  zh?: string;
  en?: string;
}

/** One entry of a catalogue section written out in full: a work, a species, a material. */
export interface CatalogueEntry {
  id: string;
  /** Pinyin shown above the Chinese title. */
  pinyin?: string;
  zh?: string;
  title: string;
  image?: ImageAsset;
  /** A quotation set apart above the text. */
  quote?: Pair;
  /** A passage in the voice of the subject itself ("I am…"). */
  voice?: Pair;
  body: Pair[];
  /** Photographs of the works themselves, from the exhibition. */
  photos?: ImageAsset[];
  /** Specimen labels, e.g. the plants of a herbarium work. */
  specimens?: { zh: string; latin: string; body: Pair[] }[];
  /** Explanatory panels ("What is concrete?"). */
  notes?: { zh?: string; title: string; body: Pair[] }[];
  questions?: Pair[];
  /** A boxed sequence of steps. */
  box?: { zh?: string; title: string; steps: { zh?: string; title: string; text: Pair }[] };
  footnotes?: string[];
}

export interface CreditGroup {
  title?: string;
  roles: { role: string; names: string[] }[];
}

export interface ExhibitionSection {
  id: string;
  title: string;
  zh?: string;
  text?: string;
  intro?: Pair[];
  entries?: CatalogueEntry[];
  works: ExhibitionArtwork[];
}

export interface Exhibition {
  slug: string;
  title: string;
  subtitle?: string;
  /** The matching project page, if there is one (/work/<slug>). */
  project?: string;
  cover: ImageAsset;
  introduction: string[];
  statement: string[];
  /** A bilingual preface, shown in place of the introduction. */
  preface?: Pair[];
  sections: ExhibitionSection[];
  epilogue?: Pair[];
  credits?: CreditGroup[];
  documentation: ImageAsset[];
}

const tones = ["parchment", "blue", "brass", "vermilion", "green", "walnut"] as const;

/** Two placeholder catalogue entries for a section until the real works are added. */
const placeholderWorks = (section: string, n = 2): ExhibitionArtwork[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `${section}-${i + 1}`,
    title: "[Artwork title]",
    artist: "[Artist]",
    medium: "[Medium]",
    year: "[Year]",
    description: "[A few sentences about the work and why it sits in this section.]",
    image: { alt: "[Artwork image]", aspect: i % 2 ? 4 / 5 : 3 / 2, tone: tones[(section.length + i) % tones.length], motif: "frame" },
  }));

export const exhibitions: Exhibition[] = [
  {
    slug: "what-makes-us-human",
    title: "What Makes Us Human?",
    subtitle: "An Interdisciplinary Exhibition",
    project: "what-makes-us-human",
    cover: { alt: "[Exhibition view]", aspect: 16 / 9, tone: "parchment", motif: "arch" },
    introduction: ["[Exhibition introduction: where and when it took place, and what visitors encountered.]"],
    statement: ["[Curatorial statement, in your own words.]"],
    sections: [
      { id: "encounter-the-world", title: "Encounter the World", text: "[What this section of the exhibition explores.]", works: placeholderWorks("encounter-the-world") },
      { id: "identity", title: "Identity", text: "[What this section of the exhibition explores.]", works: placeholderWorks("identity") },
      { id: "connection", title: "Connection", text: "[What this section of the exhibition explores.]", works: placeholderWorks("connection") },
      { id: "will-we-still-answer", title: "What Makes Us Human? Will We Still Be the Ones to Answer?", text: "[What this section of the exhibition explores.]", works: placeholderWorks("will-we-still-answer") },
    ],
    documentation: [
      { alt: "[Installation view]", aspect: 3 / 2, tone: "parchment", motif: "arch", caption: "[Documentation photograph — caption]" },
      { alt: "[Installation view]", aspect: 4 / 5, tone: "blue", motif: "frame", caption: "[Documentation photograph — caption]" },
      { alt: "[Visitors in the exhibition]", aspect: 4 / 5, tone: "brass", motif: "figure", caption: "[Documentation photograph — caption]" },
      { alt: "[Installation view]", aspect: 3 / 2, tone: "vermilion", motif: "arch", caption: "[Documentation photograph — caption]" },
    ],
  },
  {
    slug: "you-will-never-walk-alone",
    title: "You Will Never Walk Alone",
    cover: { alt: "[Exhibition view]", aspect: 16 / 9, tone: "green", motif: "arch" },
    introduction: ["[Exhibition introduction: where and when it took place, and what visitors encountered.]"],
    statement: ["[Curatorial statement, in your own words.]"],
    sections: [],
    documentation: [
      { alt: "[Installation view]", aspect: 3 / 2, tone: "green", motif: "arch", caption: "[Documentation photograph — caption]" },
      { alt: "[Installation view]", aspect: 4 / 5, tone: "parchment", motif: "frame", caption: "[Documentation photograph — caption]" },
    ],
  },
  {
    slug: "the-other-the-same",
    title: "The Other, the Same",
    subtitle: "另一个，同一个",
    cover: { src: "/images/exhibitions/the-other-the-same/cover.jpg", alt: "The exhibition space, with tables of works and wooden frames along the glass wall", aspect: 16 / 9 },
    introduction: [],
    statement: [],
    preface: otherSame.preface,
    sections: [
      { id: "nature", zh: "自然：隐匿的具象", title: "Nature: A Hidden Visible", intro: otherSame.natureIntro, entries: otherSame.natureEntries, works: [] },
      { id: "new-nature", zh: "新自然：宏大的微观", title: "New Nature: The Grand Microcosm", intro: otherSame.newNatureIntro, entries: otherSame.newNatureEntries, works: [] },
    ],
    epilogue: otherSame.epilogue,
    credits: otherSame.credits,
    documentation: [
      { src: "/images/exhibitions/the-other-the-same/space.jpg", alt: "The exhibition space: tables of works, wooden frames along the glass wall and a strip of soil and plants", aspect: 3 / 4, caption: "The exhibition space" },
      { src: "/images/exhibitions/the-other-the-same/installation.jpg", alt: "Wooden frames standing in a bed of soil and plants by the window", aspect: 3 / 4, caption: "Installation view" },
      { src: "/images/exhibitions/the-other-the-same/beehive-works.jpg", alt: "Stacked wooden beehive boxes with honeycomb works on their trays", aspect: 3 / 4, caption: "Beehive works" },
      { src: "/images/exhibitions/the-other-the-same/snail-shell-work.jpg", alt: "A snail shell studded with crystals, hanging on a wooden post", aspect: 3 / 4, caption: "Snail shell work" },
      { src: "/images/exhibitions/the-other-the-same/soil-boxes.jpg", alt: "Clear acrylic boxes of soil on a wooden table", aspect: 3 / 4, caption: "Soil in acrylic boxes" },
    ],
  },
];

export const getExhibition = (slug: string) => exhibitions.find((e) => e.slug === slug);
