import Link from "next/link";
import { navigation, site } from "@/content/site";
import { Fleuron } from "@/components/editorial/Ornaments";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-ivory-deep text-ink">
      <Fleuron ornament="rosette" className="frame absolute inset-x-0 top-0 -translate-y-1/2 text-water" />
      <div className="frame pb-10 pt-20 md:pt-28">
        <div className="grid-editorial gap-y-14">
          <div className="col-span-4 md:col-span-5 lg:col-span-6">
            <p className="label mb-6 text-rosebud">Colophon</p>
            <p className="font-display text-display-m text-water">
              Thank you for <em className="title-script text-[1.3em] text-water">looking</em>.
            </p>
            <p className="mt-6 max-w-sm text-caption text-ink">
              {site.name}. {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="col-span-2 md:col-span-1 md:col-start-6 lg:col-start-8 lg:col-span-2">
            <p className="label mb-5 text-ink">Index</p>
            <ul className="space-y-2 text-caption">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-draw">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-2 md:col-start-7 lg:col-start-10 lg:col-span-3">
            <p className="label mb-5 text-ink">Correspondence</p>
            <a href={`mailto:${site.email}`} className="link-draw text-caption break-all">
              {site.email}
            </a>
            <ul className="mt-4 space-y-2 text-caption">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="link-draw" {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                    {s.label}
                    {s.placeholder && <span className="text-ink"> [link]</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-3 border-t border-ink/25 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <span className="title-script text-[clamp(4rem,12vw,9rem)] leading-[0.9] text-water">
            {site.monogram}
          </span>
          <div className="flex flex-col gap-1 sm:items-end">
            <span className="label text-ink">© {year} {site.name}</span>
            <span className="label text-ink">Set in IM Fell, Pinyon Script &amp; Inter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
