/**
 * Content model for the whole site.
 * Every page renders from these shapes, so adding a project, article or
 * archive object means adding one entry to a file in /content — no page edits.
 */

/** Tones used by placeholder plates until a real image is supplied. */
export type PlateTone =
  | "ivory"
  | "parchment"
  | "blue"
  | "green"
  | "brass"
  | "walnut"
  | "vermilion"
  | "ink";

/** Simple motifs drawn on placeholder plates. */
export type PlateMotif = "horizon" | "arch" | "sun" | "frame" | "figure" | "none";

export interface ImageAsset {
  /** Path under /public, e.g. "/images/work/elephant-man/cover.jpg". Leave empty to show a placeholder plate. */
  src?: string;
  alt: string;
  /** Width / height. Used for layout before the image loads. */
  aspect: number;
  caption?: string;
  /** Placeholder styling, used only when `src` is empty. */
  tone?: PlateTone;
  motif?: PlateMotif;
}

export type WorkCategory =
  | "Cinema & Research"
  | "Art & Curation"
  | "Photography"
  | "Creative Experiments";

/** Blocks that make up a project or article body. */
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  /** A small capitalised label, for the smaller divisions of a long paper. */
  | { type: "label"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; source?: string }
  | { type: "image"; image: ImageAsset; size?: "full" | "wide" | "inset" }
  | { type: "gallery"; images: ImageAsset[] }
  | { type: "video"; url: string; title: string; caption?: string }
  | { type: "links"; title?: string; items: { label: string; href: string }[] };

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  category: WorkCategory;
  /** Leave undefined until confirmed; the site shows "Year —". */
  year?: string;
  cover: ImageAsset;
  summary: string;
  /** Your role, collaborators, medium… shown as a small colophon. */
  credits?: { label: string; value: string }[];
  body: ContentBlock[];
  references?: string[];
  /** Appears in "Selected Works" on the homepage, in this order. */
  featured?: number;
}

export type WritingCategory =
  | "Film Criticism"
  | "Art History"
  | "Philosophy"
  | "Psychology"
  | "Literature"
  | "Research"
  | "Essays"
  | "Poetry"
  | "Creative Writing"
  | "Personal Reflections";

export interface Article {
  slug: string;
  title: string;
  dek?: string;
  category: WritingCategory;
  /** ISO date, e.g. "2026-03-14". Leave undefined for drafts. */
  date?: string;
  cover?: ImageAsset;
  /** Shown in place of the reading time for pieces that aren't read, e.g. "Video essay". */
  format?: string;
  /** True when the cover also appears in the body, so the page doesn't show it twice. */
  hideCover?: boolean;
  body: ContentBlock[];
  /** Numbered notes. Point to one from the text with [^1], [^2]… */
  footnotes?: string[];
  /** Works cited, shown after the notes. */
  bibliography?: string[];
  /** Further Reading Room shelves this piece also stands on, besides its category's own. */
  alsoOn?: string[];
  /** Long papers: list the headings at the top, each linking to its section. */
  contents?: boolean;
  /** Creative Writing only: short story, prose poem, fragment… */
  genre?: string;
}

export type ArchiveCategory =
  | "Postcard"
  | "Photograph"
  | "Letter"
  | "Sketchbook"
  | "Object"
  | "Exhibition Documentation"
  | "Fragment";

export interface ArchiveItem {
  /** Catalogue number, shown as NO. 001 */
  number: number;
  slug: string;
  title: string;
  category: ArchiveCategory;
  /** Free text: "c. 1920s", "Date unknown", "Spring 2025"… */
  date?: string;
  image: ImageAsset;
  note?: string;
  /** Appears in "Featured Archive" on the homepage. */
  featured?: boolean;
}

/** One entry in the Cinema collection's Film Log (a personal film diary). */
export interface FilmEntry {
  /** Unique id, used in the URL hash (#film-<slug>). */
  slug: string;
  title: string;
  director?: string;
  /** Release year, e.g. "1980". */
  year?: string;
  /** ISO date you watched it, e.g. "2026-03-14". */
  watched?: string;
  /** 0.5 – 5 in half steps. Leave undefined for unrated. */
  rating?: number;
  rewatch?: boolean;
  /** A short note or excerpt, shown under the frame. */
  note?: string;
  /** The full review, one paragraph per string ("—" separates two reviews of one viewing). */
  body?: string[];
  poster: ImageAsset;
  tags?: string[];
  /** Link to the entry on Letterboxd, if any. */
  letterboxd?: string;
  /** Any other link worth following, e.g. where the film can be seen. */
  link?: { label: string; href: string };
  /** Slug of a piece in /content/writing.ts that reviews this film. */
  review?: string;
  /** True for the sample entries that show the layout until real ones are added. */
  placeholder?: boolean;
}
