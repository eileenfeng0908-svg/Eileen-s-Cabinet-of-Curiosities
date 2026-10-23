import type { ArchiveItem } from "@/lib/types";

/**
 * ARCHIVE — the cabinet of curiosities.
 * Each object gets a catalogue number (shown as NO. 001). Keep numbers unique;
 * they never need to be in order. Put images in /public/images/archive/.
 * Titles and dates below are placeholders for your own objects.
 */
export const archive: ArchiveItem[] = [
  { number: 1, slug: "postcard-collection", title: "Postcard Collection", category: "Postcard", date: "Date unknown", featured: true, image: { alt: "[Postcard]", aspect: 3 / 2, tone: "amber", motif: "horizon" }, note: "[Where it came from, who wrote it, why you kept it.]" },
  { number: 2, slug: "letter-unsent", title: "[Letter]", category: "Letter", date: "Date unknown", featured: true, image: { alt: "[Letter]", aspect: 3 / 4, tone: "ivory", motif: "none" } },
  { number: 3, slug: "sketchbook-page", title: "[Sketchbook page]", category: "Sketchbook", date: "Date unknown", featured: true, image: { alt: "[Sketchbook page]", aspect: 4 / 5, tone: "parchment", motif: "figure" } },
  { number: 4, slug: "exhibition-documentation", title: "[Exhibition documentation]", category: "Exhibition Documentation", date: "Date unknown", featured: true, image: { alt: "[Exhibition view]", aspect: 1, tone: "haze", motif: "arch" } },
  { number: 5, slug: "photograph-afternoon", title: "[Photograph]", category: "Photograph", date: "Date unknown", featured: true, image: { alt: "[Photograph]", aspect: 2 / 3, tone: "bloom", motif: "sun" } },
  { number: 6, slug: "found-object", title: "[Object]", category: "Object", date: "Date unknown", image: { alt: "[Object]", aspect: 1, tone: "fern", motif: "none" } },
];

export const getArchiveItem = (slug: string) => archive.find((a) => a.slug === slug);

export const featuredArchive = () => archive.filter((a) => a.featured);
