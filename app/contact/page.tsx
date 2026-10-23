import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Eileen Feng.",
};

export default function ContactPage() {
  return (
    <section className="frame flex min-h-[80svh] flex-col justify-center pb-24 pt-[calc(var(--header-h)+4rem)]">
      <p className="label text-slate-ink">06 — Contact</p>
      <h1 className="mt-8 max-w-[14ch] text-display-l">
        For collaborations, <em className="font-light text-slate">or simply a conversation.</em>
      </h1>
      <a href={`mailto:${site.email}`} className="link-draw mt-12 self-start font-display text-title break-all">
        {site.email}
      </a>
      <ul className="label mt-8 flex flex-wrap gap-6 text-charcoal-soft">
        {site.socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} className="link-draw" {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
              {s.label}
              {s.placeholder && " [link]"}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
