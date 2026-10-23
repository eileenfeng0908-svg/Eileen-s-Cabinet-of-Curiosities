import Link from "next/link";
import { Plate } from "@/components/editorial/Plate";
import { formatDate, readingTime } from "@/lib/format";
import type { Article, ImageAsset, Project } from "@/lib/types";

interface Review {
  href: string;
  kind: string;
  title: string;
  excerpt?: string;
  still: ImageAsset;
  date?: string;
  minutes: string;
}

/**
 * Film reviews, essays and research: everything Cinema holds that is meant
 * to be read. Writing filed under Film Criticism and projects filed under
 * Cinema & Research both appear here, each opening its full page.
 */
export function FilmReviews({ writing, projects }: { writing: Article[]; projects: Project[] }) {
  const reviews: Review[] = [
    ...writing.map((a) => ({
      href: `/writing/${a.slug}`,
      kind: a.category === "Film Criticism" ? "Review" : a.category,
      title: a.title,
      excerpt: a.dek,
      still: a.cover ?? { alt: `Film still for ${a.title}`, aspect: 16 / 9, tone: "walnut" as const, motif: "horizon" as const },
      date: a.date,
      minutes: readingTime(a.body),
    })),
    ...projects.map((p) => ({
      href: `/work/${p.slug}`,
      kind: "Research",
      title: p.title,
      excerpt: p.summary,
      still: p.cover,
      date: p.year,
      minutes: readingTime(p.body),
    })),
  ];

  if (!reviews.length)
    return <p className="font-display text-lede italic text-wine">[No reviews yet. Add a piece filed under Film Criticism in content/writing.ts.]</p>;

  return (
    <ol className="grid gap-x-8 gap-y-14 md:grid-cols-2">
      {reviews.map((r, i) => (
        <li key={r.href}>
          <Link href={r.href} className="group block">
            <div className="relative overflow-hidden">
              <Plate image={{ ...r.still, aspect: 16 / 9 }} number={i + 1} grain sizes="(min-width: 48rem) 45vw, 90vw" />
            </div>
            <p className="label mt-4 text-wine">
              {r.kind} · {r.date ? (r.date.length > 4 ? formatDate(r.date) : r.date) : "Undated"} · {r.minutes}
            </p>
            <h3 className="mt-1 text-title transition-colors duration-500 group-hover:text-vermilion">{r.title}</h3>
            {r.excerpt && <p className="mt-2 max-w-[56ch] text-body text-wine">{r.excerpt}</p>}
            <span className="label mt-3 inline-flex items-center gap-2 text-vermilion">
              Read the full piece <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
