import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { Plate } from "@/components/editorial/Plate";
import { Blocks } from "@/components/editorial/Blocks";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      <header className="dust-wash pb-16 pt-[calc(var(--header-h)+3rem)] md:pb-24 md:pt-[calc(var(--header-h)+5rem)]">
        <div className="frame">
        <div className="grid-editorial gap-y-8 border-t border-ink/25 pt-4">
          <p className="label col-span-4 md:col-span-8 lg:col-span-12 flex flex-wrap gap-x-4 text-ink">
            <span className="text-ink">No. 0{index + 1}</span>
            <span>{project.category}</span>
            <span>{project.year ?? "Year —"}</span>
          </p>
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-9">
            <h1 className="text-display-l">{project.title}</h1>
            {project.subtitle && <p className="mt-4 font-display text-title italic text-prussian">{project.subtitle}</p>}
          </Reveal>
          <Reveal delay={0.1} className="col-span-4 md:col-span-5 lg:col-span-5 lg:col-start-1">
            <p className="text-lede">{project.summary}</p>
          </Reveal>
          {project.credits && (
            <dl className="col-span-4 md:col-span-3 lg:col-span-3 lg:col-start-10 space-y-3 self-end">
              {project.credits.map((c) => (
                <div key={c.label}>
                  <dt className="label text-ink">{c.label}</dt>
                  <dd className="text-caption">{c.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        </div>
      </header>

      <figure className="frame mt-16 md:mt-24">
        <Plate image={{ ...project.cover, aspect: Math.max(project.cover.aspect, 16 / 10) }} number={1} priority sizes="100vw" zoom={false} />
        {project.cover.caption && <figcaption className="mt-3 text-caption text-ink-soft">{project.cover.caption}</figcaption>}
      </figure>

      <div className="frame py-20 md:py-28">
        <Blocks blocks={project.body} />

        {project.references && (
          <section aria-label="References" className="reading-column mt-20 border-t border-rule pt-6">
            <p className="label mb-4 text-ink-soft">References</p>
            <ol className="list-decimal space-y-2 pl-5 text-caption text-ink-soft">
              {project.references.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ol>
          </section>
        )}
      </div>

      <nav aria-label="Next project" className="frame border-t border-rule py-12 flex flex-wrap items-baseline justify-between gap-6">
        <ArrowLink href="/work">All work</ArrowLink>
        <Link href={`/work/${next.slug}`} className="group text-right">
          <span className="label block text-ink-soft">Next</span>
          <span className="font-display text-title transition-colors duration-500 group-hover:text-prussian">{next.title}</span>
        </Link>
      </nav>
    </article>
  );
}
