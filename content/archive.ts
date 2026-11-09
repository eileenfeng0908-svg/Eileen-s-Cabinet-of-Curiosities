import type { ArchiveItem } from "@/lib/types";

/**
 * ARCHIVE — the cabinet of curiosities.
 * Each object gets a catalogue number (shown as NO. 001). Keep numbers unique;
 * they never need to be in order. Put images in /public/images/archive/.
 * Titles and dates below are placeholders for your own objects.
 */
// Eileen asked (2026-11-09) to remove the placeholder objects. Add real ones here,
// e.g. { number: 1, slug: "…", title: "…", category: "Postcard", image: { src: "/images/archive/…", alt: "…", aspect: 3 / 2 } },
export const archive: ArchiveItem[] = [
];

export const getArchiveItem = (slug: string) => archive.find((a) => a.slug === slug);

export const featuredArchive = () => archive.filter((a) => a.featured);
