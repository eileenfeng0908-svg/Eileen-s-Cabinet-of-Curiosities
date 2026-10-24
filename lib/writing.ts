import type { Article, WritingCategory } from "@/lib/types";

/**
 * The Writing section is three worlds: Poetry (the Poetry Garden, poems in
 * content/poems.ts), Creative Writing (the Story Collection) and Analysis
 * (the Reading Room). Articles in content/writing.ts are sorted into the
 * last two by their category.
 */
export const writingSections = [
  { slug: "poetry", number: "01", title: "Poetry", room: "The Poetry Garden", mood: "Dreamlike, organic, interactive" },
  { slug: "analysis", number: "02", title: "Analysis", room: "The Reading Room", mood: "Intellectual, editorial, structured" },
  { slug: "creative-writing", number: "03", title: "Creative Writing", room: "The Story Collection", mood: "Intimate, narrative, literary" },
] as const;

export type WritingSectionSlug = (typeof writingSections)[number]["slug"];

const creative: WritingCategory[] = ["Creative Writing", "Personal Reflections"];

export const isCreative = (a: Article) => creative.includes(a.category);
export const isAnalysis = (a: Article) => a.category !== "Poetry" && !isCreative(a);

/** Subjects of the Reading Room, in order. */
export const subjects = ["Film & Cinema", "Art History", "Philosophy", "Psychology", "Literature", "Other Research"] as const;
export type Subject = (typeof subjects)[number];

export function subjectOf(a: Article): Subject {
  switch (a.category) {
    case "Film Criticism":
      return "Film & Cinema";
    case "Art History":
      return "Art History";
    case "Philosophy":
      return "Philosophy";
    case "Psychology":
      return "Psychology";
    case "Literature":
      return "Literature";
    default:
      return "Other Research";
  }
}

/** Every shelf a piece stands on: its own, then any it is also filed under. */
export const subjectsOf = (a: Article): Subject[] => [subjectOf(a), ...((a.alsoOn ?? []).filter((s) => (subjects as readonly string[]).includes(s)) as Subject[])];

export const sectionOf = (a: Article): WritingSectionSlug => (isCreative(a) ? "creative-writing" : "analysis");
