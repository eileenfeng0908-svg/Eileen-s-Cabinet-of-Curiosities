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
  { title: "Initial Ideas", note: "[First thoughts, words and references.]", slots: ph("[Add Fashion Sketch]", 3, ["portrait", "square", "landscape"]) },
  { title: "Moodboards", note: "[What the moodboard was gathering toward.]", slots: ph("[Add Moodboard Image]", 4, ["square", "portrait", "landscape", "square"]) },
  { title: "Fashion Illustrations", note: "[About these illustrations.]", slots: ph("[Add Fashion Illustration]", 3, ["portrait", "portrait", "portrait"]) },
  { title: "Design Development", note: "[How the designs changed.]", slots: ph("[Add Development Sketch]", 3, ["landscape", "portrait", "square"]) },
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
