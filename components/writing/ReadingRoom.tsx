import Link from "next/link";
import type { Article } from "@/lib/types";
import { readingTime } from "@/lib/format";
import { subjectOf, subjects } from "@/lib/writing";
import { cn } from "@/lib/cn";
import { BookSpine, BookStack, PencilRule, Shelf, WashBlot } from "./Painted";

const spineInk = ["var(--powder-blue)", "var(--vermilion)", "var(--botanical-green)", "var(--wine)", "var(--brass)"];
const spineHeight = ["100%", "90%", "95%", "86%", "92%"];

/** The shelf, left to right: the five subjects, with other books standing between them for company. */
type Book = { kind: "subject"; n: number } | { kind: "deco"; w: string; h: string; color: string; lean?: number; wide?: boolean } | { kind: "stack"; wide?: boolean };
const row: Book[] = [
  { kind: "stack", wide: true },
  { kind: "deco", w: "1.5rem", h: "62%", color: "var(--walnut)", wide: true },
  { kind: "deco", w: "1.9rem", h: "74%", color: "var(--botanical-green)", wide: true },
  { kind: "subject", n: 0 },
  { kind: "deco", w: "1.3rem", h: "70%", color: "var(--brass)" },
  { kind: "subject", n: 1 },
  { kind: "deco", w: "1.7rem", h: "80%", color: "var(--powder-blue)", wide: true },
  { kind: "deco", w: "1.2rem", h: "66%", color: "var(--wine)" },
  { kind: "subject", n: 2 },
  { kind: "subject", n: 3 },
  { kind: "deco", w: "1.6rem", h: "77%", color: "var(--vermilion)", wide: true },
  { kind: "subject", n: 4 },
  { kind: "deco", w: "1.4rem", h: "68%", color: "var(--botanical-green)", lean: 9, wide: true },
  { kind: "stack", wide: true },
];
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
      <nav aria-label="Subjects" className="mx-auto max-w-4xl">
        <div className="flex h-60 items-end justify-center gap-1.5 px-3 sm:h-72 sm:gap-2">
          {row.map((b, i) => {
            if (b.kind === "stack") return <BookStack key={i} seed={i + 3} className={cn("w-20 shrink-0 sm:w-28", b.wide && "hidden sm:block")} />;
            if (b.kind === "deco")
              return (
                <span
                  key={i}
                  aria-hidden
                  className={cn("relative block shrink-0", b.wide && "hidden sm:block")}
                  style={{ width: b.w, height: b.h, rotate: b.lean ? `${b.lean}deg` : undefined, transformOrigin: b.lean && b.lean > 0 ? "bottom left" : "bottom right" }}
                >
                  <BookSpine color={b.color} seed={i + 20} />
                </span>
              );
            const s = shelves[b.n];
            const dark = b.n === 3;
            return (
              <a
                key={i}
                href={`#${subjectAnchor(s.subject)}`}
                className="group relative block w-[2.9rem] shrink-0 transition-transform duration-500 ease-gallery hover:-translate-y-3 focus-visible:-translate-y-3 sm:w-[4.6rem]"
                style={{ height: spineHeight[b.n] }}
              >
                <BookSpine color={spineInk[b.n]} seed={b.n + 1} plate />
                <span className="absolute inset-x-0 top-[18.5%] bottom-[19.5%] flex items-center justify-center">
                  <span className="whitespace-nowrap font-display text-[0.85rem] leading-none text-wine sm:text-[1.05rem]" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                    {s.subject}
                  </span>
                </span>
                <span className="label absolute inset-x-0 bottom-[2.5%] text-center text-[0.65rem]" style={{ color: dark ? "var(--aged-ivory)" : "var(--wine)" }}>
                  {s.items.length || "–"}
                </span>
              </a>
            );
          })}
        </div>
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
