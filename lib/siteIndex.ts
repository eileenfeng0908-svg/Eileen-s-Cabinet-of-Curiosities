import { articles } from "@/content/writing";
import { poems } from "@/content/poems";
import { projectHref, projects } from "@/content/projects";
import { exhibitions } from "@/content/exhibitions";
import { films } from "@/content/films";
import { cities } from "@/content/life";
import { archive } from "@/content/archive";
import { collections } from "@/content/collections";
import { isCreative, subjectsOf } from "@/lib/writing";
import { catalogueNumber } from "@/lib/format";
import type { Article } from "@/lib/types";

/**
 * Everything on the site in one list, for the index on the Archive page.
 * Built from the same /content files as the pages themselves, so a new
 * essay, poem, film or project shows up here on its own. Pieces that are
 * still only [placeholders] are left out until they're filled in.
 */

export const indexKinds = [
  "Projects",
  "Exhibitions",
  "Writings",
  "Film Analysis",
  "Poems",
  "Stories",
  "Film Log",
  "Life",
  "Objects",
  "Rooms",
] as const;
export type IndexKind = (typeof indexKinds)[number];

export interface IndexEntry {
  kind: IndexKind;
  title: string;
  /** Where it lives on the site, e.g. "Writings · Philosophy". */
  place: string;
  /** A short extra line: format, director, landmark… */
  meta?: string;
  href: string;
}

const placeholder = (s?: string) => !s || s.trim().startsWith("[");
const unwritten = (a: Article) =>
  placeholder(a.title) || a.body.every((b) => b.type === "paragraph" && placeholder(b.text));

export function siteIndex(): IndexEntry[] {
  const out: IndexEntry[] = [];

  for (const p of projects)
    out.push({ kind: "Projects", title: p.title, place: `Projects · ${p.category}`, meta: p.subtitle, href: projectHref(p) });

  for (const e of exhibitions)
    out.push({ kind: "Exhibitions", title: e.title, place: "Art & Curation · Exhibition catalogue", meta: e.subtitle, href: `/exhibitions/${e.slug}` });

  for (const a of articles) {
    if (unwritten(a) || a.category === "Poetry") continue;
    if (a.category === "Film Criticism")
      out.push({ kind: "Film Analysis", title: a.title, place: "Cinema · Film Analysis", meta: a.format, href: `/writing/${a.slug}` });
    else if (isCreative(a))
      out.push({ kind: "Stories", title: a.title, place: "Writings · Story Collection", meta: a.genre, href: `/writing/${a.slug}` });
    else
      out.push({
        kind: "Writings",
        title: a.title,
        place: `Writings · ${subjectsOf(a).join(", ") || a.category}`,
        meta: a.format ?? a.dek,
        href: `/writing/${a.slug}`,
      });
  }

  for (const p of poems) {
    if (p.placeholder) continue;
    out.push({
      kind: "Poems",
      title: placeholder(p.title) ? p.title.replace(/^\[|\]$/g, "") : p.title,
      place: "Writings · Poetry Garden",
      href: `/collections/writing-and-philosophy#poem-${p.slug}`,
    });
  }

  for (const f of films) {
    if (placeholder(f.title)) continue;
    out.push({
      kind: "Film Log",
      title: f.title,
      place: "Cinema · Film Log",
      meta: [f.director, f.year, f.rating && `${"★".repeat(Math.floor(f.rating))}${f.rating % 1 ? "½" : ""}`].filter(Boolean).join(" · "),
      href: `/collections/cinema#film-${f.slug}`,
    });
  }

  for (const c of cities)
    out.push({
      kind: "Life",
      title: c.home ? `Home — ${c.city}` : c.city,
      place: "Life · Atlas",
      meta: `${c.country} · ${c.landmark}`,
      href: `/collections/life#${c.id}`,
    });

  for (const o of archive) {
    if (placeholder(o.title)) continue;
    out.push({ kind: "Objects", title: o.title, place: "Archive · Objects", meta: catalogueNumber(o.number), href: `/archive/${o.slug}` });
  }

  for (const c of collections)
    out.push({ kind: "Rooms", title: c.title, place: "The cabinet · Collection", href: `/collections/${c.slug}` });
  out.push({ kind: "Rooms", title: "Projects", place: "Page", href: "/work" });
  out.push({ kind: "Rooms", title: "About", place: "Page", href: "/about" });
  out.push({ kind: "Rooms", title: "Contact", place: "Page", href: "/contact" });

  return out.map((e) => (placeholder(e.meta) ? { ...e, meta: undefined } : e));
}
