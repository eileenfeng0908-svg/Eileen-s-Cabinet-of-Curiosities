import { Plate } from "./Plate";
import { cn } from "@/lib/cn";
import type { ContentBlock } from "@/lib/types";

/** Turns YouTube / Vimeo page URLs into embeddable player URLs. */
function embedUrl(url: string) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  const bili = url.match(/bilibili\.com\/video\/(BV\w+)/);
  if (bili) return `https://player.bilibili.com/player.html?bvid=${bili[1]}&autoplay=0&high_quality=1`;
  return url;
}

/**
 * Light inline markup inside text blocks: *italic* and footnote marks [^1],
 * which link to the matching note at the end of an article.
 */
export function inline(text: string) {
  return text.split(/(\*[^*]+\*|\[\^\d+\])/g).map((part, i) => {
    const fn = part.match(/^\[\^(\d+)\]$/);
    if (fn)
      return (
        <sup key={i} id={`fnref-${fn[1]}`} className="ml-0.5 text-[0.7em]">
          <a href={`#fn-${fn[1]}`} className="text-vermilion hover:underline" aria-label={`Note ${fn[1]}`}>
            {fn[1]}
          </a>
        </sup>
      );
    if (/^\*[^*]+\*$/.test(part)) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

/** An id for a heading, so a contents list can link to it. */
export const headingId = (text: string) =>
  "s-" + text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * Renders the body of a project or article. Text sits in a comfortable
 * reading column; images and galleries break out of it.
 */
export function Blocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="reading-column text-[1.0625rem] leading-[1.8]">
                {inline(block.text)}
              </p>
            );
          case "heading":
            return (
              <h2 key={i} id={headingId(block.text)} className="reading-column scroll-mt-[calc(var(--header-h)+2rem)] pt-8 text-title">
                {block.text}
              </h2>
            );
          case "subheading":
            return (
              <h3 key={i} className="reading-column pt-4 font-display text-[1.3rem] italic leading-snug">
                {block.text}
              </h3>
            );
          case "label":
            return (
              <h4 key={i} className="reading-column label pt-2 text-wine">
                {block.text}
              </h4>
            );
          case "list":
            return (
              <ol key={i} className="reading-column list-decimal space-y-2 pl-6 text-[1.0625rem] leading-[1.7] marker:text-ink-soft">
                {block.items.map((item, j) => (
                  <li key={j} className="pl-1">{inline(item)}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i} className="reading-column border-l border-vermilion py-2 pl-6">
                <p className="font-display text-statement italic text-wine">{inline(block.text)}</p>
                {block.source && <footer className="label mt-4 text-ink-soft">— {block.source}</footer>}
              </blockquote>
            );
          case "image":
            return (
              <figure key={i} className={cn("py-6", block.size === "inset" ? "reading-column" : block.size === "full" ? "" : "mx-auto max-w-5xl")}>
                <Plate image={block.image} sizes="(min-width: 64rem) 70vw, 100vw" zoom={false} />
                {block.image.caption && <figcaption className="mt-3 text-caption text-ink-soft">{block.image.caption}</figcaption>}
              </figure>
            );
          case "gallery":
            return (
              <div key={i} className="mx-auto grid max-w-5xl gap-[var(--gutter)] py-6 sm:grid-cols-2">
                {block.images.map((img, j) => (
                  <figure key={j} className={j % 2 ? "sm:mt-16" : ""}>
                    <Plate image={img} number={j + 1} sizes="(min-width: 40rem) 40vw, 100vw" zoom={false} />
                    {img.caption && <figcaption className="mt-3 text-caption text-ink-soft">{img.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            );
          case "video":
            return (
              <figure key={i} className="mx-auto max-w-5xl py-6">
                {block.url ? (
                  <div className="relative aspect-video bg-ink">
                    <iframe
                      src={embedUrl(block.url)}
                      title={block.title}
                      className="absolute inset-0 h-full w-full"
                      allow="fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-ink text-ivory/70">
                    <span className="label">Video forthcoming — {block.title}</span>
                  </div>
                )}
                {block.caption && <figcaption className="mt-3 text-caption text-ink-soft">{block.caption}</figcaption>}
              </figure>
            );
          case "links":
            return (
              <div key={i} className="reading-column border-t border-rule pt-6">
                {block.title && <p className="label mb-3 text-ink-soft">{block.title}</p>}
                <ul className="space-y-2">
                  {block.items.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="link-draw" target="_blank" rel="noreferrer">
                        {l.label} <span aria-hidden>↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
        }
      })}
    </div>
  );
}
