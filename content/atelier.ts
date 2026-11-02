/**
 * THE FASHION ATELIER — content for the Fashion Show page (/collections/fashion).
 *
 * Everything here is a placeholder until real material is added. To add a
 * photograph, put the file in /public/images/fashion/ and give its slot a
 * `src` ("/images/fashion/2026-runway-01.jpg"), plus `width` and `height` in
 * pixels. Slots without `src` show their [label] as an empty frame.
 * For a video, give its slot a YouTube, Vimeo or Bilibili embed `url`.
 *
 * Nothing in this file should be invented: leave [brackets] until confirmed.
 */

export interface AtelierPhoto {
  /** Shown in the empty frame until a photo is added, e.g. "[Upload Runway Photograph]". */
  label: string;
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
  /** Shape of the empty frame: portrait, landscape or square. Ignored once src is set. */
  shape?: "portrait" | "landscape" | "square";
}

export interface AtelierVideo {
  label: string;
  /** An embed URL (YouTube, Vimeo, Bilibili). */
  url?: string;
  caption?: string;
}

export interface AtelierDocument {
  label: string;
  /** A PDF or image in /public/files/fashion/, or an external link. */
  href?: string;
  note?: string;
}

export interface Person {
  name: string;
  role?: string;
}

export interface Show {
  id: string;
  year: string;
  title: string;
  theme: string;
  concept: string;
  role: string;
  /** The invitation's colour on the desk. */
  ink: "vermilion" | "blue" | "green" | "wine" | "brass";
  runway: AtelierPhoto[];
  posters: AtelierPhoto[];
  videos: AtelierVideo[];
  designers: Person[];
  models: Person[];
  backstage: AtelierPhoto[];
}

const ph = (label: string, n: number, shapes: AtelierPhoto["shape"][]): AtelierPhoto[] =>
  Array.from({ length: n }, (_, i) => ({ label, shape: shapes[i % shapes.length] }));

const showTemplate = (id: string, year: string, title: string, theme: string, ink: Show["ink"]): Show => ({
  id,
  year,
  title,
  theme,
  ink,
  concept: "[The concept behind the show: what it set out to say, and how.]",
  role: "[Your role in this show]",
  runway: ph("[Upload Runway Photograph]", 6, ["portrait", "portrait", "landscape", "portrait", "portrait", "landscape"]),
  posters: ph("[Insert Show Poster]", 2, ["portrait", "portrait"]),
  videos: [{ label: "[Add Show Video]" }],
  designers: [{ name: "[Designer name]", role: "[Collection or look]" }],
  models: [{ name: "[Model name]" }],
  backstage: ph("[Upload Backstage Photograph]", 4, ["landscape", "portrait", "portrait", "landscape"]),
});

/** The five shows, oldest first: years and themes as Eileen gave them. */
export const shows: Show[] = [
  showTemplate("2023", "2023", "Bionic", "Bionic", "blue"),
  showTemplate("2024", "2024", "Utopia", "Utopia", "green"),
  showTemplate("2025", "2025", "Memory", "Memory", "wine"),
  showTemplate("2026", "2026", "Identity", "Identity", "vermilion"),
  showTemplate("2027", "2027", "In the Mood for…", "In the Mood for…", "brass"),
];

export interface SketchbookSpread {
  title: string;
  /** Your handwritten-style note for the page. */
  note: string;
  slots: AtelierPhoto[];
}

export const designSketchbook: SketchbookSpread[] = [
  { title: "Initial Ideas", note: "[First thoughts, words and references.]", slots: [
      { label: "Pencil studies of hanging forms labelled wood, wind, eyes, emotion, water, fire, cloud and fish × water", src: "/images/fashion/process/a06.jpg", width: 1200, height: 1800, alt: "Pencil studies of hanging forms labelled wood, wind, eyes, emotion, water, fire, cloud and fish × water" },
      { label: "Quick sketch on black: coral-pink hand shapes over blue wave lines, with the word “coral”", src: "/images/fashion/process/a07.jpg", width: 528, height: 792, alt: "Quick sketch on black: coral-pink hand shapes over blue wave lines, with the word “coral”" },
      { label: "Quick sketch on black: a figure in teal and red hatching with green flowing shapes", src: "/images/fashion/process/a08.jpg", width: 528, height: 792, alt: "Quick sketch on black: a figure in teal and red hatching with green flowing shapes" },
      { label: "Quick sketch on black: a figure in magenta and teal ruffles", src: "/images/fashion/process/a09.jpg", width: 528, height: 792, alt: "Quick sketch on black: a figure in magenta and teal ruffles" },
      { label: "Quick sketch on black: a figure with orange and green sunburst shoulders", src: "/images/fashion/process/a10.jpg", width: 528, height: 792, alt: "Quick sketch on black: a figure with orange and green sunburst shoulders" },
      { label: "Quick sketch on black: a figure wrapped in yellow coils and green and blue strokes", src: "/images/fashion/process/a12.jpg", width: 528, height: 792, alt: "Quick sketch on black: a figure wrapped in yellow coils and green and blue strokes" },
      { label: "Quick sketch on black: a figure in white lines with purple circles", src: "/images/fashion/process/a14.jpg", width: 528, height: 792, alt: "Quick sketch on black: a figure in white lines with purple circles" },
      { label: "Quick sketch on black: a figure in green, teal and pink loops", src: "/images/fashion/process/a27.jpg", width: 1200, height: 1800, alt: "Quick sketch on black: a figure in green, teal and pink loops" },
      { label: "Quick sketch on black: a figure in green coils and hatching", src: "/images/fashion/process/a28.jpg", width: 528, height: 792, alt: "Quick sketch on black: a figure in green coils and hatching" },
    ] },
  { title: "Moodboards", note: "[What the moodboard was gathering toward.]", slots: [
      { label: "Moodboard: white ruffles, lilies, a baroque altar, stained glass, weeping Madonnas and pearls, circled in red", src: "/images/fashion/process/a04.jpg", width: 1800, height: 1349, alt: "Moodboard: white ruffles, lilies, a baroque altar, stained glass, weeping Madonnas and pearls, circled in red" },
      { label: "Moodboard in pink: a lace party-hat cake, pearls, stars, candles, carnival costumes and a rose garden", src: "/images/fashion/process/a13.jpg", width: 1800, height: 1349, alt: "Moodboard in pink: a lace party-hat cake, pearls, stars, candles, carnival costumes and a rose garden" },
      { label: "Moodboard collage of eyes, irises and figures in grey suits", src: "/images/fashion/process/a29.jpg", width: 1800, height: 1349, alt: "Moodboard collage of eyes, irises and figures in grey suits" },
    ] },
  { title: "Fashion Illustrations", note: "[About these illustrations.]", slots: [
      { label: "A figure in white line loops scattered with blue bubbles, on black", src: "/images/fashion/process/a01.jpg", width: 528, height: 792, alt: "A figure in white line loops scattered with blue bubbles, on black" },
      { label: "A dress shaped like an apple core, with green vines trailing down the legs", src: "/images/fashion/process/a02.jpg", width: 1200, height: 1800, alt: "A dress shaped like an apple core, with green vines trailing down the legs" },
      { label: "A figure in translucent blue and white with a curling tail, titled “Dolphin”", src: "/images/fashion/process/a16.jpg", width: 1200, height: 1800, alt: "A figure in translucent blue and white with a curling tail, titled “Dolphin”" },
      { label: "A figure in blue and white swirls standing on white ripples", src: "/images/fashion/process/a19.jpg", width: 1200, height: 1800, alt: "A figure in blue and white swirls standing on white ripples" },
      { label: "A figure in a long cream and dark garment with white flowing lines on a grey shape", src: "/images/fashion/process/a20.jpg", width: 1200, height: 1800, alt: "A figure in a long cream and dark garment with white flowing lines on a grey shape" },
      { label: "A figure wrapped in a large blue and red anatomical heart", src: "/images/fashion/process/a21.jpg", width: 1200, height: 1800, alt: "A figure wrapped in a large blue and red anatomical heart" },
      { label: "A figure in a brown top with blue and red vein-like ribbons and a white ruffled skirt", src: "/images/fashion/process/a22.jpg", width: 1200, height: 1800, alt: "A figure in a brown top with blue and red vein-like ribbons and a white ruffled skirt" },
      { label: "A figure in a metallic gold dress with green panels on a grey shape", src: "/images/fashion/process/a23.jpg", width: 1200, height: 1800, alt: "A figure in a metallic gold dress with green panels on a grey shape" },
      { label: "A figure in a gold and cream dress, with a small detail drawing", src: "/images/fashion/process/a25.jpg", width: 1200, height: 1800, alt: "A figure in a gold and cream dress, with a small detail drawing" },
      { label: "A figure in blue draped fabric with handwritten notes", src: "/images/fashion/process/a26.jpg", width: 1200, height: 1800, alt: "A figure in blue draped fabric with handwritten notes" },
    ] },
  { title: "Design Development", note: "[How the designs changed.]", slots: [
      { label: "Pencil and red-line sketch of a long gown with flowers and a halo, with the note “Tears”", src: "/images/fashion/process/a03.jpg", width: 1200, height: 1800, alt: "Pencil and red-line sketch of a long gown with flowers and a halo, with the note “Tears”" },
      { label: "Pencil sketch of a long layered gown with a sunburst halo and flowers", src: "/images/fashion/process/a11.jpg", width: 1349, height: 1800, alt: "Pencil sketch of a long layered gown with a sunburst halo and flowers" },
      { label: "A long dark coat with blue lapels and white wave lines, with handwritten notes, for “Dolphins”", src: "/images/fashion/process/a05.jpg", width: 528, height: 792, alt: "A long dark coat with blue lapels and white wave lines, with handwritten notes, for “Dolphins”" },
      { label: "A figure in a pale green draped dress with branch-like lines, on grey", src: "/images/fashion/process/a24.jpg", width: 1200, height: 1800, alt: "A figure in a pale green draped dress with branch-like lines, on grey" },
      { label: "Design sheet “A Pineapple with the Ocean”: five looks with notes on pineapple, puffer fish and coral", src: "/images/fashion/process/a15.jpg", width: 1800, height: 1272, alt: "Design sheet “A Pineapple with the Ocean”: five looks with notes on pineapple, puffer fish and coral" },
    ] },
  { title: "Final Looks", note: "[The finished looks.]", slots: ph("[Add Final Look]", 3, ["portrait", "portrait", "portrait"]) },
];

export interface GallerySection {
  id: string;
  title: string;
  note?: string;
  photos: AtelierPhoto[];
}

export const backstage: GallerySection[] = [
  { id: "rehearsals", title: "Rehearsals", photos: ph("[Upload Backstage Photograph]", 4, ["landscape", "portrait", "portrait", "landscape"]) },
  { id: "fittings", title: "Fittings", photos: ph("[Upload Backstage Photograph]", 3, ["portrait", "landscape", "portrait"]) },
  { id: "hair-makeup", title: "Hair & Makeup", photos: ph("[Upload Backstage Photograph]", 3, ["portrait", "portrait", "square"]) },
  { id: "preparation", title: "Backstage Preparation", photos: ph("[Upload Backstage Photograph]", 4, ["landscape", "portrait", "landscape", "portrait"]) },
  { id: "team", title: "Team Moments", photos: ph("[Upload Backstage Photograph]", 3, ["landscape", "square", "portrait"]) },
  { id: "show-day", title: "Show Day", photos: ph("[Upload Backstage Photograph]", 4, ["portrait", "landscape", "portrait", "portrait"]) },
];

export interface ProductionChapter {
  id: string;
  title: string;
  /** A short note in your own words. */
  note: string;
  documents: AtelierDocument[];
  photos: AtelierPhoto[];
}

const chapter = (id: string, title: string): ProductionChapter => ({
  id,
  title,
  note: "[A few lines on this part of the work.]",
  documents: [{ label: "[Add Production Document]" }, { label: "[Add Production Document]" }],
  photos: ph("[Upload Photograph]", 2, ["landscape", "portrait"]),
});

export const production: ProductionChapter[] = [
  chapter("creative-planning", "Creative Planning"),
  chapter("recruitment", "Recruitment"),
  chapter("team-coordination", "Team Coordination"),
  chapter("scheduling", "Scheduling"),
  chapter("rehearsals", "Rehearsals"),
  chapter("stage-runway", "Stage & Runway Planning"),
  chapter("show-day", "Show-Day Production"),
];

export interface Look {
  number: number;
  photo: AtelierPhoto;
  designer: string;
  model?: string;
  show?: string;
  description?: string;
}

export const runway: { videos: AtelierVideo[]; looks: Look[] } = {
  videos: [{ label: "[Add Fashion Show Video]" }],
  looks: Array.from({ length: 8 }, (_, i) => ({
    number: i + 1,
    photo: { label: "[Upload Runway Photograph]", shape: i % 4 === 3 ? "landscape" : "portrait" },
    designer: "[Designer]",
    description: undefined,
  })),
};
