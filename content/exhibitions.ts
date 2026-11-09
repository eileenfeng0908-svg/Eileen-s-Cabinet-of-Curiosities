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
  /** A status line under the title, e.g. for an exhibition still to open. */
  status?: string;
  introduction: string[];
  statement: string[];
  /** Chinese version of the statement, shown after the English. */
  statementZh?: string[];
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
  /** Heading for the documentation section (default "Exhibition documentation"). */
  documentationTitle?: string;
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
    cover: { src: "/images/work/what-makes-us-human/poster-full.jpg", alt: "Poster for What Makes Us Human? 何以为人: flowing white outlines on a red ground", aspect: 974 / 1726 },
    status: "Ongoing · Opening soon in November 2026",
    documentationTitle: "Viva Voce research poster",
    introduction: [],
    statement: [],
    preface: [
      { en: "We thought we already knew what makes us human.", zh: "我们认为自己已经知晓何以为人。" },
      {
        en: "Countless scholars have sought to answer this question. Some argue that rationality defines humanity; others emphasise emotion as a defining feature of human existence; still others believe that personal experiences, relationships, art, language, and other aspects of life constitute the essence of being human. These perspectives, each valid in its own way yet sometimes contradictory, reveal the complexity of humanity and invite us to celebrate its quiet grandeur.",
        zh: "无数学者不断探寻这一问题的答案。有人认为，理性定义了人性；有人强调，情感是人类存在的重要特征；还有人相信，个人经历、人际关系、艺术、语言以及生活中的其他种种共同构成了人性的本质。这些各有道理却不尽相同的观点，揭示了人性的复杂与多元，也让我们得以欣赏其静谧而深邃的伟大。",
      },
      {
        en: "We are gradually expanding our understanding of what it means to be human as we live our lives. Yet we seem to have reached a point in history when answering this question has become more urgent than ever. As technology advances at an astonishing speed, our changing ways of life add another layer of complexity, challenging us to consider which aspects of our humanity we are willing to surrender to technology—and which we choose to retain.",
        zh: "在生活中，我们不断拓展对人性的理解。而今，随着科技飞速发展，思考何以为人似乎比以往更加迫切——面对科技，我们愿意让渡人性的哪些部分，又希望坚守什么？",
      },
      {
        en: "This exhibition invites meaningful debate and ongoing dialogue by showcasing our students’ intellectual explorations and creative expressions.",
        zh: "本次展览通过呈现学生们的思想探索与创意表达，邀请你加入这场关于何以为人的思辨与对话。",
      },
    ],
    // Chapters (her list, 2026-10-25), hidden until the exhibition opens:
    // Encounter the World · Identity · Connection · What Makes Us Human? Will We Still Be the Ones to Answer?
    sections: [],
    documentation: [
      { src: "/images/work/what-makes-us-human/viva-voce-1.jpg", alt: "HS Signature Final Viva Voce poster, page 1: research question, literature review and AI & human relationship", aspect: 1600 / 2263, caption: "Viva Voce poster, page 1: research question, literature review and AI & human relationship" },
      { src: "/images/work/what-makes-us-human/viva-voce-2.jpg", alt: "HS Signature Final Viva Voce poster, page 2: the mirror hypothesis, emotions and fear, and selected works", aspect: 1600 / 2263, caption: "Viva Voce poster, page 2: the mirror hypothesis, emotions and fear, and selected works" },
      { src: "/images/work/what-makes-us-human/viva-voce-3.jpg", alt: "HS Signature Final Viva Voce poster, page 3: the exhibition, its chapters, conclusion and future research", aspect: 1600 / 2263, caption: "Viva Voce poster, page 3: the exhibition, its chapters, conclusion and future research" },
    ],
  },
  {
    slug: "you-will-never-walk-alone",
    title: "You Will Never Walk Alone",
    cover: { src: "/images/exhibitions/you-will-never-walk-alone/cover.jpg", alt: "The entrance mural of You Will Never Walk Alone: a reaching hand, flames and a crowd of figures beside the title", aspect: 16 / 9 },
    introduction: [],
    // Written by Claude at Eileen's request (2026-11-09), from the preface, chapters and her annotation.
    statement: [
      "You Will Never Walk Alone began with a single word. In Chinese, both characters of 孤独, loneliness, mean “one person”. We wanted to ask what happens when those two solitary figures stand side by side: whether loneliness, traced across the whole of human history, might turn out to be something we share.",
      "Built from the work of Huitong students in the Global History programme, the exhibition walks through civilization in four chapters. The Survivors faced the challenges of nature together. The Explorers were driven outward by curiosity about a wider world. In Our Time brought progress and war hand in hand. All That is Solid Melts into Air arrives in our own fast, fragmented present of screens and endless information. Along the way, visitors leave a handprint as early humans did, write down the need they think matters most, and meet their own reflections in a wall of mirrors.",
      "We hid quotations in every corner, voices from many centuries and languages, all speaking of loneliness. Read together, they say the same thing: someone, somewhere, has felt this before. Loneliness may be part of being human, but so is the hand that reaches back. Those who walked before us are still walking with us. You will never walk alone.",
    ],
    statementZh: [
      "《你永远不会独行》始于一个字。“孤独”二字，拆开来看，都是“一个人”。我们想问：当这两个孤单的身影并肩而立，会发生什么？贯穿整个人类历史的孤独，会不会其实是我们共同拥有的东西？",
      "展览由荟同学生在全球史课程中的作品构成，以四个章节走过人类文明。“幸存者”携手面对自然的挑战；“探索者”在对更广阔世界的好奇中走向远方；“我们的时代”里，进步与战争相伴而来；“一切坚固的东西都烟消云散了”则抵达我们自己的当下：快速、碎片化，充满屏幕与无尽的信息。一路上，观众可以像早期人类一样留下手印，写下自己认为最重要的需求，并在一面镜墙中遇见自己的倒影。",
      "我们在每一个角落都藏了引文，来自不同世纪、不同语言的声音，都在诉说孤独。把它们放在一起读，它们说的是同一件事：某个人，在某个地方，也曾这样感受过。孤独或许是人之为人的一部分，但那只回握过来的手也是。走在我们之前的人，仍与我们同行。你永远不会独行。",
    ],
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
