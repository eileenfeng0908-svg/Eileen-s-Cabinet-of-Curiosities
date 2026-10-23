import type { FilmEntry } from "@/lib/types";
import imported from "./films.letterboxd.json";

/**
 * FILM LOG — the diary in the Cinema collection (/collections/cinema).
 *
 * Two ways to fill it:
 * 1. Import your Letterboxd diary: export your data from Letterboxd
 *    (Settings → Import & Export → Export your data), unzip it, then run
 *      node scripts/import-letterboxd.mjs path/to/letterboxd-export
 *    This writes content/films.letterboxd.json. Posters and directors aren't
 *    in Letterboxd's export: add them below in `extras`, keyed by slug.
 * 2. Or add entries by hand to `entries`.
 *
 * Posters go in /public/images/films/<slug>.jpg. Without one, a toned
 * placeholder frame shows the title.
 * The sample entries (placeholder: true) disappear as soon as there is one real entry.
 */

const entries: FilmEntry[] = [];

/** Extra details for imported films, keyed by slug (e.g. posters, directors, a review link). */
const extras: Record<string, Partial<FilmEntry>> = {};

const samples: FilmEntry[] = Array.from({ length: 8 }, (_, i) => ({
  slug: `sample-${i + 1}`,
  title: `[Film title ${i + 1}]`,
  director: "[Director]",
  note: "[A line or two about what stayed with you. Replace these samples with your own diary.]",
  poster: { alt: `[Poster for film ${i + 1}]`, aspect: 2 / 3, tone: (["walnut", "blue", "vermilion", "green", "brass", "ink", "parchment", "walnut"] as const)[i] },
  placeholder: true,
}));

const real: FilmEntry[] = [
  ...entries,
  ...(imported as FilmEntry[]).map((f) => ({ ...f, ...extras[f.slug], poster: { ...f.poster, ...extras[f.slug]?.poster } })),
];

export const films: FilmEntry[] = real.length ? real : samples;
export const filmsArePlaceholders = real.length === 0;

/**
 * Top 5 Films, in Eileen's order, shown above the Film Log like Letterboxd's
 * favourites. Posters are her own uploads in /public/images/cinema/top5.
 */
export const topFive: { title: string; director: string; year: string; poster: string }[] = [
  { title: "La Haine", director: "Mathieu Kassovitz", year: "1995", poster: "/images/cinema/top5/la-haine.webp" },
  { title: "The Social Network", director: "David Fincher", year: "2010", poster: "/images/cinema/top5/the-social-network.webp" },
  { title: "In the Mood for Love", director: "Wong Kar-wai", year: "2000", poster: "/images/cinema/top5/in-the-mood-for-love.webp" },
  { title: "Girl, Interrupted", director: "James Mangold", year: "1999", poster: "/images/cinema/top5/girl-interrupted.jpg" },
  { title: "Mulholland Drive", director: "David Lynch", year: "2001", poster: "/images/cinema/top5/mulholland-drive.webp" },
];
