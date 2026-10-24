import Link from "next/link";
import type { Article } from "@/lib/types";
import { readingTime } from "@/lib/format";
import { subjectOf, subjects } from "@/lib/writing";
import { BookSpine, PencilRule, Shelf, WashBlot } from "./Painted";

const spineInk = ["var(--powder-blue)", "var(--vermilion)", "var(--botanical-green)", "var(--wine)", "var(--brass)"];
const spineHeight = ["100%", "88%", "94%", "82%", "91%"];
export const subjectAnchor = (s: string) => "subject-" + s.toLowerCase().replace(/&/g, "and").replace(/[^a-z]+/g, "-");

/**
 * A reading room: the subjects stand as painted books on a shelf (each one
 * a way in), and below, each subject's essays are listed like a journal's
 * table of contents.
 */
export function ReadingRoom({ essays }: { essays: Article[] }) {
  const shelves = subjects.map((s) => ({ subject: s, items: essays.filter((a) => subjectOf(a) === s) }));

  return (
    <div className="text-wine">
      <nav aria-label="Subjects" className="mx-auto max-w-3xl">
        <ul className="flex h-56 items-end justify-center gap-2 px-2 sm:h-64 sm:gap-3">
          {shelves.map((s, i) => (
            <li key={s.subject} className="h-full flex-1 sm:max-w-[5.5rem]" style={{ display: "flex", alignItems: "flex-end" }}>
              <a
                href={`#${subjectAnchor(s.subject)}`}
                className="group relative block w-full origin-bottom transition-transform duration-500 ease-gallery hover:-translate-y-3 focus-visible:-translate-y-3"
                style={{ height: spineHeight[i], rotate: i === 3 ? "-2deg" : undefined }}
              >
                <BookSpine color={spineInk[i]} seed={i + 1} />
                <span
                  className="absolute inset-x-0 top-[16%] bottom-[16%] flex items-center justify-center font-display text-[0.95rem] leading-none sm:text-[1.1rem]"
                  style={{ writingMode: "vertical-rl", rotate: "180deg", color: i === 3 ? "var(--aged-ivory)" : "var(--wine)" }}
                >
                  {s.subject}
                </span>
                <span className="label absolute inset-x-0 bottom-[3%] text-center" style={{ color: i === 3 ? "var(--aged-ivory)" : "var(--wine)" }}>
                  {s.items.length || "–"}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <Shelf />
        <p className="mt-3 text-center font-display text-caption italic">Take a book from the shelf to go to that subject.</p>
      </nav>

      <div className="mx-auto mt-16 max-w-4xl space-y-16">
        {shelves.map((s, i) => (
          <section key={s.subject} id={subjectAnchor(s.subject)} aria-labelledby={`${subjectAnchor(s.subject)}-h`} className="scroll-mt-[calc(var(--header-h)+2rem)]">
            <header className="flex items-center gap-4">
              <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center">
                <WashBlot color={spineInk[i]} seed={i + 9} className="inset-0 h-full w-full" />
                <span className="label relative">§{i + 1}</span>
              </span>
              <h3 id={`${subjectAnchor(s.subject)}-h`} className="text-title">{s.subject}</h3>
            </header>
            <PencilRule seed={i + 30} strong className="mt-3" />
            {s.items.length ? (
              <ol>
                {s.items.map((a, k) => (
                  <li key={a.slug}>
                    <Link href={`/writing/${a.slug}`} className="group grid gap-x-8 gap-y-2 py-6 md:grid-cols-[minmax(0,1fr)_8.5rem]">
                      <span>
                        <span className="block font-display text-[1.4rem] leading-snug transition-colors duration-500 group-hover:text-vermilion">{a.title}</span>
                        {a.dek && <span className="mt-2 block max-w-2xl text-body text-ink-soft">{a.dek}</span>}
                      </span>
                      <span className="label flex gap-4 text-ink-soft md:flex-col md:gap-1 md:text-right">
                        <span className="text-wine">{s.subject}</span>
                        <span>{a.format ?? readingTime(a.body)}</span>
                      </span>
                    </Link>
                    <PencilRule seed={i * 10 + k} />
                  </li>
                ))}
              </ol>
            ) : (
              <p className="py-6 font-display italic text-ink-soft">Nothing on this shelf yet.</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
