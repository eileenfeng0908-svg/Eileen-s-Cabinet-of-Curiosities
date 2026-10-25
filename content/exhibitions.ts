import type { ImageAsset } from "@/lib/types";

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

export interface ExhibitionSection {
  id: string;
  title: string;
  text?: string;
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
  sections: ExhibitionSection[];
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
    cover: { alt: "[Exhibition view]", aspect: 16 / 9, tone: "blue", motif: "arch" },
    introduction: ["[Exhibition introduction: where and when it took place, and what visitors encountered.]"],
    statement: ["[Curatorial statement, in your own words.]"],
    sections: [],
    documentation: [
      { alt: "[Installation view]", aspect: 3 / 2, tone: "blue", motif: "arch", caption: "[Documentation photograph — caption]" },
      { alt: "[Installation view]", aspect: 4 / 5, tone: "vermilion", motif: "frame", caption: "[Documentation photograph — caption]" },
    ],
  },
];

export const getExhibition = (slug: string) => exhibitions.find((e) => e.slug === slug);
