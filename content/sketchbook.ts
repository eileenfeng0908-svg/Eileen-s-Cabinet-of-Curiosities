import type { ImageAsset } from "@/lib/types";

/**
 * ART — the Artist's Sketchbook.
 * One entry per page, in order. Each work on a page is placed by its centre
 * (x / y in % of the page), its width (% of the page) and a slight rotation,
 * so works of any size and orientation can share a page. `image.aspect`
 * (width / height) decides the shape. Add `src` to show the real work.
 * Everything with `placeholder: true` is a labelled stand-in.
 */
export interface Artwork {
  id: string;
  title: string;
  medium?: string;
  year?: string;
  description?: string;
  image: ImageAsset;
  placeholder?: boolean;
}

export interface PlacedWork {
  work: Artwork;
  at: { x: number; y: number; w: number; rot: number };
  /** How it is fixed to the page. */
  fix?: "tape" | "corners" | "clip" | "none";
}

export interface SketchbookPage {
  works: PlacedWork[];
}

let n = 0;
const ph = (aspect: number, tone: ImageAsset["tone"], motif: ImageAsset["motif"] = "none"): Artwork => ({
  id: `artwork-${++n}`,
  title: "[Artwork title]",
  medium: "[Medium]",
  year: "[Year]",
  description: "[A sentence or two about the work.]",
  image: { alt: "[Artwork]", aspect, tone, motif },
  placeholder: true,
});

export const sketchbook: SketchbookPage[] = [
  {
    works: [
      { work: ph(3 / 4, "blue", "figure"), at: { x: 40, y: 36, w: 50, rot: -2 }, fix: "tape" },
      { work: ph(3 / 2, "vermilion", "sun"), at: { x: 66, y: 80, w: 42, rot: 4 }, fix: "corners" },
    ],
  },
  {
    works: [
      { work: ph(16 / 10, "green", "horizon"), at: { x: 50, y: 36, w: 78, rot: 1.5 }, fix: "tape" },
      { work: ph(1, "brass", "none"), at: { x: 30, y: 76, w: 34, rot: -5 }, fix: "clip" },
    ],
  },
  {
    works: [
      { work: ph(2 / 3, "parchment", "figure"), at: { x: 34, y: 46, w: 44, rot: -3 }, fix: "corners" },
      { work: ph(2 / 3, "walnut", "arch"), at: { x: 68, y: 58, w: 38, rot: 4 }, fix: "tape" },
    ],
  },
  {
    works: [
      { work: ph(4 / 5, "vermilion", "frame"), at: { x: 52, y: 50, w: 66, rot: 1 }, fix: "tape" },
    ],
  },
  {
    works: [
      { work: ph(3 / 2, "blue", "horizon"), at: { x: 44, y: 26, w: 60, rot: -2.5 }, fix: "corners" },
      { work: ph(3 / 4, "green", "figure"), at: { x: 72, y: 66, w: 36, rot: 5 }, fix: "tape" },
      { work: ph(1, "ivory", "sun"), at: { x: 28, y: 72, w: 26, rot: -7 }, fix: "none" },
    ],
  },
  {
    works: [
      { work: ph(9 / 16, "brass", "arch"), at: { x: 40, y: 50, w: 40, rot: -1.5 }, fix: "clip" },
      { work: ph(5 / 4, "parchment", "frame"), at: { x: 72, y: 34, w: 34, rot: 6 }, fix: "tape" },
    ],
  },
];
