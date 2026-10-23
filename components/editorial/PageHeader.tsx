import { Reveal } from "@/components/motion/Reveal";

/** Opening of an internal page: section number, oversized title, short intro. */
export function PageHeader({
  number,
  kicker,
  title,
  italic,
  intro,
}: {
  number: string;
  kicker: string;
  title: string;
  italic?: string;
  intro?: string;
}) {
  return (
    <header className="frame pb-16 pt-[calc(var(--header-h)+3rem)] md:pb-24 md:pt-[calc(var(--header-h)+5rem)]">
      <div className="grid-editorial gap-y-8 border-t border-rule pt-4">
        <div className="col-span-4 md:col-span-8 lg:col-span-12 flex items-center gap-4">
          <span className="label text-slate-ink">{number}</span>
          <span aria-hidden className="h-px w-10 bg-charcoal/30" />
          <span className="label text-charcoal-soft">{kicker}</span>
        </div>
        <Reveal className="col-span-4 md:col-span-8 lg:col-span-10">
          <h1 className="text-display-l md:text-display-xl text-charcoal">
            {title}
            {italic && (
              <>
                {" "}
                <em className="font-light text-slate">{italic}</em>
              </>
            )}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.1} className="col-span-4 md:col-span-5 md:col-start-4 lg:col-span-4 lg:col-start-8">
            <p className="font-display text-lede italic text-charcoal-soft">{intro}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
