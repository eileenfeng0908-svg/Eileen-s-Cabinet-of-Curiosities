import { Plate } from "./Plate";
import { cn } from "@/lib/cn";
import type { ContentBlock } from "@/lib/types";

/** Turns YouTube / Vimeo page URLs into embeddable player URLs. */
function embedUrl(url: string) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return url;
}

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
                {block.text}
              </p>
            );
          case "heading":
            return (
              <h2 key={i} className="reading-column pt-8 text-title">
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote key={i} className="reading-column border-l border-mozart py-2 pl-6">
                <p className="font-display text-statement italic text-mozart">{block.text}</p>
                {block.source && <footer className="label mt-4 text-charcoal-soft">— {block.source}</footer>}
              </blockquote>
            );
          case "image":
            return (
              <figure key={i} className={cn("py-6", block.size === "inset" ? "reading-column" : block.size === "full" ? "" : "mx-auto max-w-5xl")}>
                <Plate image={block.image} sizes="(min-width: 64rem) 70vw, 100vw" zoom={false} />
                {block.image.caption && <figcaption className="mt-3 text-caption text-charcoal-soft">{block.image.caption}</figcaption>}
              </figure>
            );
          case "gallery":
            return (
              <div key={i} className="mx-auto grid max-w-5xl gap-[var(--gutter)] py-6 sm:grid-cols-2">
                {block.images.map((img, j) => (
                  <figure key={j} className={j % 2 ? "sm:mt-16" : ""}>
                    <Plate image={img} number={j + 1} sizes="(min-width: 40rem) 40vw, 100vw" zoom={false} />
                    {img.caption && <figcaption className="mt-3 text-caption text-charcoal-soft">{img.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            );
          case "video":
            return (
              <figure key={i} className="mx-auto max-w-5xl py-6">
                {block.url ? (
                  <div className="relative aspect-video bg-charcoal">
                    <iframe
                      src={embedUrl(block.url)}
                      title={block.title}
                      className="absolute inset-0 h-full w-full"
                      allow="fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-charcoal text-ivory/70">
                    <span className="label">Video forthcoming — {block.title}</span>
                  </div>
                )}
                {block.caption && <figcaption className="mt-3 text-caption text-charcoal-soft">{block.caption}</figcaption>}
              </figure>
            );
          case "links":
            return (
              <div key={i} className="reading-column border-t border-rule pt-6">
                {block.title && <p className="label mb-3 text-charcoal-soft">{block.title}</p>}
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
