import type { Article, ArchiveItem, Project } from "@/lib/types";
import { projects } from "./projects";
import { articles } from "./writing";
import { archive } from "./archive";

/**
 * COLLECTIONS — the compartments of the cabinet on the homepage.
 * Each one gathers existing projects, writing and archive objects; nothing
 * is duplicated. Change what a collection holds by editing `holds` below.
 * The URL is /collections/<slug>.
 */
export interface Collection {
  slug: string;
  title: string;
  /** The object that stands for it inside the cabinet. */
  object: "reel" | "painting" | "notebook" | "camera" | "ribbon" | "envelope";
  intro: string;
  /** Overrides the page's title, when it differs from the name in the cabinet. */
  heading?: { title: string; italic?: string };
  holds: {
    projects?: (p: Project) => boolean;
    writing?: (a: Article) => boolean;
    archive?: (a: ArchiveItem) => boolean;
  };
}

export const collections: Collection[] = [
  {
    slug: "cinema",
    title: "Cinema",
    object: "reel",
    intro: "An imagination of imaginations, a gateway to another life, another world.",
    holds: {
      projects: (p) => p.category === "Cinema & Research",
      writing: (a) => a.category === "Film Criticism",
    },
  },
  {
    slug: "art-and-curation",
    title: "Art & Curation",
    object: "painting",
    intro: "[A sentence about the exhibitions you make and the art you keep returning to.]",
    holds: {
      projects: (p) => p.category === "Art & Curation",
      writing: (a) => a.category === "Art History",
      archive: (a) => a.category === "Exhibition Documentation",
    },
  },
  {
    slug: "writing-and-philosophy",
    title: "Writings",
    object: "notebook",
    intro: "[A sentence about why you write, and the questions you write toward.]",
    holds: { writing: () => true },
  },
  {
    slug: "life",
    title: "Life",
    object: "camera",
    heading: { title: "Life, in", italic: "Fragments" },
    intro: "An Atlas of Ordinary Days",
    holds: {
      projects: (p) => p.category === "Photography",
      archive: (a) => a.category === "Photograph",
    },
  },
  {
    slug: "fashion",
    title: "Fashion Show",
    object: "ribbon",
    intro: "[A sentence about clothing as a way of telling who we are.]",
    holds: { projects: (p) => p.slug === "identity" },
  },
  {
    slug: "personal-archives",
    title: "Personal Archives",
    object: "envelope",
    intro: "[A sentence about the letters, postcards and small objects you keep.]",
    holds: {
      projects: (p) => p.slug === "postcard-archive",
      archive: (a) => a.category !== "Exhibition Documentation" && a.category !== "Photograph",
    },
  },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

export function collectionContents(c: Collection) {
  return {
    projects: c.holds.projects ? projects.filter(c.holds.projects) : [],
    writing: c.holds.writing ? articles.filter(c.holds.writing) : [],
    archive: c.holds.archive ? archive.filter(c.holds.archive) : [],
  };
}

/** What the cabinet itself needs to know about a collection (serialisable). */
export type CabinetItem = Pick<Collection, "slug" | "title" | "object">;
export const cabinetItems: CabinetItem[] = collections.map(({ slug, title, object }) => ({ slug, title, object }));
