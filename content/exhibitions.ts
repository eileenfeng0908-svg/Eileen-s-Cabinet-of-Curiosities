import type { ImageAsset } from "@/lib/types";
import * as otherSame from "@/content/exhibitions/the-other-the-same";
import * as ywnwa from "@/content/exhibitions/you-will-never-walk-alone";

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

/** A quotation: original (e.g. Greek), Chinese and/or English, and its source. */
export interface Quote {
  orig?: string;
  zh?: string;
  en?: string;
  by: string;
}

/** One entry of a catalogue section written out in full: a work, a species, a material. */
export interface CatalogueEntry {
  id: string;
  /** Pinyin shown above the Chinese title. */
  pinyin?: string;
  zh?: string;
  title: string;
  /** Who wrote this text. */
  by?: string;
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
  /** Quotations gathered under headings of their own. */
  quoteGroups?: { zh?: string; en?: string; quotes: Quote[] }[];
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
  photos?: ImageAsset[];
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
  /** A note on the exhibition's title, shown before the preface. */
  titleNote?: CatalogueEntry;
  sections: ExhibitionSection[];
  /** Texts by individual curators, shown after the sections. */
  curatorTexts?: CatalogueEntry[];
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
    credits: [
      {
        roles: [
          { role: `策展人 Curators`, names: [`刘小扬 Xiaoyang Liu`, `付悦嘉 Yuejia Fu`, `冯洁琳 Eileen Feng`, `马靖宜 Jingyi Ma`] },
          { role: `展览设计 Exhibition Design`, names: [`马靖宜 Jingyi Ma`, `孔维伊 Weiyi Kong`] },
          { role: `参展人 Participants`, names: [`全体全球历史项目的老师、学生及参与者 All teachers, students and participants of the Global History Project`, `文海帆 Haifan Wen`, `黄思为 Siwei Huang`, `向柯宇 Keyu Xiang`] },
        ],
      },
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
    cover: { src: "/images/exhibitions/you-will-never-walk-alone/cover.jpg", alt: "The entrance mural of You Will Never Walk Alone: a reaching hand, flames and a crowd of figures beside the title", aspect: 16 / 9 },
    introduction: [],
    statement: ["[Curatorial statement, in your own words.]"],
    titleNote: ywnwa.titleNote,
    preface: ywnwa.preface,
    sections: ywnwa.chapters,
    curatorTexts: [ywnwa.eileenQuotes, ywnwa.nushu],
    epilogue: ywnwa.conclusion,
    documentation: [
      { src: "/images/exhibitions/you-will-never-walk-alone/mural.jpg", alt: "Entrance mural with the exhibition title", aspect: 1280 / 853, caption: "Entrance mural, “You Will Never Walk Alone”" },
      { src: "/images/exhibitions/you-will-never-walk-alone/planning.jpg", alt: "Students and a mentor planning around a table by tall windows", aspect: 1280 / 697, caption: "Planning meeting" },
      { src: "/images/exhibitions/you-will-never-walk-alone/models.jpg", alt: "Students drawing and building exhibition models at a workshop table", aspect: 1280 / 671, caption: "Making the models" },
      { src: "/images/exhibitions/you-will-never-walk-alone/guided-tour.jpg", alt: "A guided tour for visitors in front of the preface wall and the entrance mural", aspect: 1280 / 853, caption: "Guided tour · Photo: Shenzhen Nanshan Huitong School" },
      { src: "/images/exhibitions/you-will-never-walk-alone/chapter-1.jpg", alt: "Chapter I wall text, “The Survivors”, with a hand-drawn hand and a quotation", aspect: 628 / 718, caption: "Chapter I: The Survivors" },
      { src: "/images/exhibitions/you-will-never-walk-alone/needs-wall.jpg", alt: "A visitor writing on a coloured sticker at the interactive needs wall", aspect: 1280 / 853, caption: "Interactive wall: “the need you think is most important” · Photo: Shenzhen Nanshan Huitong School" },
      { src: "/images/exhibitions/you-will-never-walk-alone/dragon-dance.jpg", alt: "Paper dragon-dance works on wooden stands by the window, with clay boats on a table", aspect: 1280 / 853, caption: "The Legacy of the Dragon Dance · Photo: Shenzhen Nanshan Huitong School" },
      { src: "/images/exhibitions/you-will-never-walk-alone/clay-boxes.jpg", alt: "Two students presenting clay figures in a cardboard box on the wall, under a handwritten quotation", aspect: 1280 / 853, caption: "Clay figures in cardboard boxes · Photo: Shenzhen Nanshan Huitong School" },
      { src: "/images/exhibitions/you-will-never-walk-alone/mirrors.jpg", alt: "A white wall set with round mirrors beside a colourful hanging installation", aspect: 1280 / 853, caption: "Mirror wall and hanging installation" },
      { src: "/images/exhibitions/you-will-never-walk-alone/chapters-3-4.jpg", alt: "Chapter III and IV wall texts beside a wall of coloured sticky notes", aspect: 1280 / 853, caption: "Chapters III and IV · Photo: Shenzhen Nanshan Huitong School" },
      { src: "/images/exhibitions/you-will-never-walk-alone/hope-wall.jpg", alt: "A visitor reading the hand-painted wall “HOPE is the thing with feathers”", aspect: 1280 / 853, caption: "“Hope” is the thing with feathers · Photo: Shenzhen Nanshan Huitong School" },
      { src: "/images/exhibitions/you-will-never-walk-alone/team-install.jpg", alt: "The team sitting on the gallery floor among prints, with hand-painted quotes on the walls behind them", aspect: 4 / 3, caption: "Installing the exhibition" },
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
      { src: "/images/exhibitions/the-other-the-same/space.jpg", alt: "The exhibition space: tables of works, wooden frames along the glass wall and a strip of soil and plants", aspect: 3 / 4, caption: "The exhibition space · Photo: Shenzhen Nanshan Huitong School" },
      { src: "/images/exhibitions/the-other-the-same/installation.jpg", alt: "Wooden frames standing in a bed of soil and plants by the window", aspect: 3 / 4, caption: "Installation view · Photo: Shenzhen Nanshan Huitong School" },
      { src: "/images/exhibitions/the-other-the-same/beehive-works.jpg", alt: "Stacked wooden beehive boxes with honeycomb works on their trays", aspect: 3 / 4, caption: "Beehive works · Photo: Shenzhen Nanshan Huitong School" },
      { src: "/images/exhibitions/the-other-the-same/snail-shell-work.jpg", alt: "A snail shell studded with crystals, hanging on a wooden post", aspect: 3 / 4, caption: "Snail shell work · Photo: Shenzhen Nanshan Huitong School" },
      { src: "/images/exhibitions/the-other-the-same/soil-boxes.jpg", alt: "Clear acrylic boxes of soil on a wooden table", aspect: 3 / 4, caption: "Soil in acrylic boxes · Photo: Shenzhen Nanshan Huitong School" },
    ],
  },
];

export const getExhibition = (slug: string) => exhibitions.find((e) => e.slug === slug);
