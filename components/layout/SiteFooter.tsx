import Link from "next/link";
import { navigation, site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-rule bg-ivory-deep/60">
      <div className="frame pb-10 pt-20 md:pt-28">
        <div className="grid-editorial gap-y-14">
          <div className="col-span-4 md:col-span-5 lg:col-span-6">
            <p className="label mb-6 text-mozart">Colophon</p>
            <p className="font-display text-display-m text-charcoal">
              Thank you for <em>looking</em>.
            </p>
            <p className="mt-6 max-w-sm text-caption text-charcoal-soft">
              {site.name}. {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="col-span-2 md:col-span-1 md:col-start-6 lg:col-start-8 lg:col-span-2">
            <p className="label mb-5 text-charcoal-soft">Index</p>
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
            <p className="label mb-5 text-charcoal-soft">Correspondence</p>
            <p className="text-caption break-words">{site.email}</p>
            <ul className="mt-4 space-y-2 text-caption">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="link-draw">
                    {s.label}
                    {s.placeholder && <span className="text-charcoal-soft"> [link]</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-end sm:justify-between">
          <span className="font-display text-[clamp(3.5rem,12vw,9rem)] leading-[0.8] tracking-tight text-charcoal/90">
            {site.monogram}
          </span>
          <div className="flex flex-col gap-1 sm:items-end">
            <span className="label text-charcoal-soft">© {year} {site.name}</span>
            <span className="label text-charcoal-soft">Set in Cormorant Garamond &amp; Inter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
