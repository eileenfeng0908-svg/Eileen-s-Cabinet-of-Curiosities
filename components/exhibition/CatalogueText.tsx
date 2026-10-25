import type { CatalogueEntry, CreditGroup, Pair, Quote } from "@/content/exhibitions";
import { Plate } from "@/components/editorial/Plate";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * The written-out parts of a catalogue: bilingual passages (Chinese beside
 * English), full entries with specimen labels, panels, questions and steps,
 * and the credits.
 */

const tints = ["var(--botanical-green)", "var(--brass)", "var(--powder-blue)", "var(--vermilion)", "var(--wine)"];

/** Chinese and English side by side on wide screens, one after the other on narrow ones. */
export function PairText({ pairs, className, size = "body" }: { pairs: Pair[]; className?: string; size?: "body" | "lede" }) {
  return (
    <div className={cn("space-y-5", className)}>
      {pairs.map((p, i) => (
        <div key={i} className={cn("grid gap-x-8 gap-y-2 md:grid-cols-2", size === "lede" ? "text-lede" : "text-body")}>
          {p.zh && <p lang="zh-Hans" className="leading-[1.9] text-wine">{p.zh}</p>}
          {p.en && <p lang="en" className="text-wine/90">{p.en}</p>}
        </div>
      ))}
    </div>
  );
}

function Heading({ pinyin, zh, title, level = 3 }: { pinyin?: string; zh?: string; title: string; level?: 3 | 4 }) {
  const H = level === 3 ? "h3" : "h4";
  return (
    <H className={level === 3 ? "text-display-m text-wine" : "text-title text-wine"}>
      {pinyin && <span className="label mb-2 block normal-case tracking-[0.12em] text-vermilion">{pinyin}</span>}
      {zh && <span lang="zh-Hans" className="mr-3">{zh}</span>}
      <span className={zh ? "italic" : undefined}>{title}</span>
    </H>
  );
}

export function Entry({ e, n }: { e: CatalogueEntry; n: number }) {
  const tint = tints[n % tints.length];
  // Landscape pictures run the full width under the heading; upright ones sit beside the text.
  const wide = !!e.image && e.image.aspect > 1.2;
  return (
    <Reveal as="article" id={e.id} className="scroll-mt-28 border-t border-dashed border-wine/30 pt-10">
      <div className={cn("grid gap-10", e.image && !wide && "lg:grid-cols-[minmax(0,1fr)_16rem]")}>
        <div className="min-w-0 space-y-6">
          <Heading pinyin={e.pinyin} zh={e.zh} title={e.title} />
          {e.by && <p className="label text-ink-soft">Text by {e.by}</p>}
          {e.image && wide && (
            <div className="print max-w-3xl">
              <Plate image={e.image} sizes="(min-width: 64rem) 48rem, 90vw" />
              {e.image.caption && <p className="mt-2 text-caption text-ink-soft">{e.image.caption}</p>}
            </div>
          )}
          {e.quote && (
            <blockquote className="border-l-2 pl-5 font-display text-lede italic text-wine" style={{ borderColor: tint }}>
              {e.quote.zh && <p lang="zh-Hans">{e.quote.zh}</p>}
              {e.quote.en && <p className={e.quote.zh ? "mt-1" : undefined}>{e.quote.en}</p>}
            </blockquote>
          )}
          {e.voice && (
            <div className="relative rounded-sm px-5 py-5" style={{ background: `color-mix(in srgb, ${tint} 16%, var(--aged-ivory))` }}>
              <PairText pairs={[e.voice]} className="font-display italic" />
            </div>
          )}
          <PairText pairs={e.body} />
          {e.photos && (
            <ul className="grid grid-cols-2 gap-5 pt-2 sm:grid-cols-3">
              {e.photos.map((ph, k) => (
                <li key={ph.src} className="print" style={{ rotate: `${k % 2 ? 1.2 : -1}deg` }}>
                  <Plate image={ph} sizes="(min-width: 64rem) 16rem, 45vw" />
                  {ph.caption && <p className="mt-2 text-caption text-ink-soft">{ph.caption}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
        {e.image && !wide && (
          <div className="print self-start lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <Plate image={e.image} sizes="(min-width: 64rem) 16rem, 90vw" />
            {e.image.caption && <p className="mt-2 text-caption text-ink-soft">{e.image.caption}</p>}
          </div>
        )}
      </div>

      {e.specimens && (
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {e.specimens.map((s, i) => (
            <li
              key={s.latin}
              className="relative border border-wine/20 bg-[color-mix(in_srgb,var(--aged-ivory)_45%,white)] p-5 shadow-[0_10px_18px_-14px_rgb(113_63_72_/_0.6)]"
              style={{ rotate: `${i % 2 ? 0.6 : -0.5}deg` }}
            >
              <span aria-hidden className="absolute -top-2 left-6 h-4 w-14 -rotate-3 opacity-80" style={{ background: `color-mix(in srgb, ${tints[i % tints.length]} 65%, transparent)` }} />
              <p className="label text-ink-soft">Specimen {i + 1}</p>
              <h4 className="mt-2 text-title text-wine">
                <span lang="zh-Hans" className="mr-2">{s.zh}</span>
                <em>{s.latin}</em>
              </h4>
              <div className="mt-3 space-y-3 text-caption text-wine">
                {s.body.map((p, k) => (
                  <div key={k} className="space-y-1">
                    <p lang="zh-Hans" className="leading-[1.8]">{p.zh}</p>
                    <p className="text-wine/85">{p.en}</p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}

      {e.notes?.map((note, i) => (
        <aside key={note.title} className="mt-8 border-l-4 py-1 pl-6" style={{ borderColor: tints[(n + i + 1) % tints.length] }}>
          <Heading zh={note.zh} title={note.title} level={4} />
          <PairText pairs={note.body} className="mt-4" />
        </aside>
      ))}

      {e.questions && (
        <ol className="mt-10 space-y-5">
          {e.questions.map((q, i) => (
            <li key={i} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
              <span aria-hidden className="font-display text-display-m leading-none text-vermilion">?</span>
              <span className="font-display text-lede text-wine">
                <span lang="zh-Hans" className="block">{q.zh}</span>
                <span className="block italic">{q.en}</span>
              </span>
            </li>
          ))}
        </ol>
      )}

      {e.box && (
        <div className="mt-10 border-2 border-walnut/60 bg-[color-mix(in_srgb,var(--walnut)_14%,var(--aged-ivory))] p-6 md:p-8">
          <Heading zh={e.box.zh} title={e.box.title} level={4} />
          <ol className="mt-6 grid gap-6 md:grid-cols-2">
            {e.box.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.2rem_minmax(0,1fr)] gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-vermilion font-display text-ivory">{i + 1}</span>
                <span>
                  <span className="block font-display text-title text-wine">
                    <span lang="zh-Hans" className="mr-2">{s.zh}</span>
                    <em>{s.title}</em>
                  </span>
                  <span lang="zh-Hans" className="mt-2 block text-caption leading-[1.8] text-wine">{s.text.zh}</span>
                  <span className="mt-1 block text-caption text-wine/85">{s.text.en}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {e.quoteGroups?.map((g, i) => (
        <section key={i} className="mt-12">
          {(g.zh || g.en) && (
            <h4 className="border-b border-dashed border-wine/30 pb-3 font-display text-title text-wine">
              {g.zh && <span lang="zh-Hans" className="block">{g.zh}</span>}
              {g.en && <span className="mt-1 block italic">{g.en}</span>}
            </h4>
          )}
          <ul className={cn("mt-6 columns-1 gap-8 md:columns-2 [&>li]:mb-6 [&>li]:break-inside-avoid", !(g.zh || g.en) && "md:columns-1")}>
            {g.quotes.map((quote, k) => (
              <QuoteCard key={k} quote={quote} tint={tints[(n + i + k) % tints.length]} />
            ))}
          </ul>
        </section>
      ))}

      {e.footnotes && (
        <div className="mt-8 space-y-1 border-t border-wine/15 pt-3">
          {e.footnotes.map((f) => (
            <p key={f} className="text-caption text-ink-soft">{f}</p>
          ))}
        </div>
      )}
    </Reveal>
  );
}

function QuoteCard({ quote, tint }: { quote: Quote; tint: string }) {
  return (
    <li className="border-l-2 pl-4" style={{ borderColor: tint }}>
      <blockquote className="space-y-2 text-wine">
        {quote.orig && <p className="font-display text-lede italic">{quote.orig}</p>}
        {quote.zh && <p lang="zh-Hans" className="whitespace-pre-line leading-[1.9]">{quote.zh.replace(/\s*\/\s*/g, "\n")}</p>}
        {quote.en && <p className={cn("whitespace-pre-line", quote.zh ? "text-caption text-wine/85" : "font-display text-[1.05rem] italic")}>{quote.en.replace(/ \/ /g, "\n")}</p>}
      </blockquote>
      <p className="label mt-2 normal-case tracking-[0.06em] text-ink-soft">— {quote.by}</p>
    </li>
  );
}

export function Credits({ groups }: { groups: CreditGroup[] }) {
  return (
    <div className="space-y-12">
      {groups.map((g, i) => (
        <div key={i}>
          {g.title && <h3 lang="zh-Hans" className="text-title text-wine">{g.title}</h3>}
          <dl className={cn("space-y-4", g.title && "mt-5")}>
            {g.roles.map((r) => (
              <div key={r.role} className="grid gap-1 border-b border-wine/15 pb-4 md:grid-cols-[16rem_minmax(0,1fr)] md:gap-6">
                <dt className="label text-vermilion">{r.role}</dt>
                <dd className={cn("text-body text-wine", r.names.length > 12 && "columns-2 gap-6 sm:columns-3")}>
                  {r.names.map((name, k) => (
                    <span key={k} className={cn(r.names.length > 12 && "block", name.includes("Eileen Feng") && "font-semibold text-vermilion")}>
                      {name}
                      {r.names.length <= 12 && k < r.names.length - 1 && ", "}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
