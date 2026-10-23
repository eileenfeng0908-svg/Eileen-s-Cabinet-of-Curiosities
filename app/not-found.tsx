import { ArrowLink } from "@/components/editorial/ArrowLink";

export default function NotFound() {
  return (
    <section className="frame flex min-h-[80svh] flex-col justify-center pt-[var(--header-h)]">
      <p className="label text-water">No. 404 — Item missing</p>
      <h1 className="mt-6 text-display-l">
        This page has <em className="font-light">wandered off.</em>
      </h1>
      <div className="mt-12">
        <ArrowLink href="/">Return to the index</ArrowLink>
      </div>
    </section>
  );
}
