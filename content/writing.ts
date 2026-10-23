import type { Article } from "@/lib/types";

/**
 * WRITING
 * One object per article. The URL is /writing/<slug>.
 * Reading time is calculated automatically from the body.
 * Titles and text below are placeholders to replace.
 */
export const articles: Article[] = [
  {
    slug: "on-the-ethics-of-looking",
    title: "On the Ethics of Looking",
    dek: "[One sentence that tells the reader what this piece is about.]",
    category: "Film Criticism",
    date: undefined,
    body: [
      { type: "paragraph", text: "[Placeholder. Replace with your essay. Paragraphs are separate blocks so images, quotes and headings can sit between them.]" },
      { type: "paragraph", text: "[Second paragraph.]" },
    ],
    footnotes: ["[Footnote 1]"],
  },
  {
    slug: "what-the-museum-remembers",
    title: "What the Museum Remembers",
    dek: "[One sentence.]",
    category: "Art History",
    date: undefined,
    body: [{ type: "paragraph", text: "[Placeholder. Replace with your essay.]" }],
  },
  {
    slug: "small-rooms",
    title: "Small Rooms",
    dek: "[One sentence.]",
    category: "Poetry",
    date: undefined,
    body: [{ type: "paragraph", text: "[Placeholder. Replace with your poem.]" }],
  },
  {
    slug: "notes-toward-a-personal-archive",
    title: "Notes Toward a Personal Archive",
    dek: "[One sentence.]",
    category: "Personal Reflections",
    date: undefined,
    body: [{ type: "paragraph", text: "[Placeholder. Replace with your reflection.]" }],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

/** Newest first; undated drafts last. */
export const recentArticles = (count = 4) =>
  [...articles]
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    .slice(0, count);
