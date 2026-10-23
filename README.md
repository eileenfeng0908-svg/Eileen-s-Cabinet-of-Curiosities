# Eileen Feng — A Personal Digital Archive

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion for React. No CMS, no database: all content lives in `/content`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (what Vercel runs)
```

## Deploy (GitHub + Vercel)

1. Push this folder to a GitHub repository.
2. In Vercel, **Add New → Project**, import the repository. No settings need changing.
3. Once you have a domain, set `url` in `content/site.ts` (used for SEO and the sitemap).

## Where things live

```
app/                 Routes. One folder per page; [slug] folders are detail pages.
  layout.tsx         Fonts, metadata, header, footer, paper grain
  template.tsx       Page transition
  globals.css        THE DESIGN SYSTEM: colours, type scale, grid, motion tokens
components/
  layout/            Header (with mobile menu) and footer
  editorial/         Reusable pieces: Plate (images), LaceFrame, Label, SectionHeading,
                     PageHeader, Blocks (renders project/article bodies), ArrowLink
  home/              The homepage sections, one file each
  motion/            Reveal, Parallax, motion tokens, reduced-motion provider
content/             ALL YOUR CONTENT
  site.ts            Name, tagline, statement, email, social links, navigation
  projects.ts        Work
  writing.ts         Articles
  archive.ts         Archive objects
lib/                 Types and small helpers (dates, reading time, numbering)
public/images/       Your images: work/, writing/, archive/, about/
```

## Adding content

Anything written `[like this]` is a placeholder. Search the project for `[` to find them all.

### A project
Open `content/projects.ts`, copy an entry and change it:

- `slug` becomes the URL: `/work/<slug>`.
- `featured: 1..4` puts it in **Selected Works** on the homepage, in that order. Leave it out to show it only on the Work page.
- `year` can stay `undefined` until confirmed; the site shows "Year —".
- `body` is a list of blocks: `paragraph`, `heading`, `quote`, `image`, `gallery`, `video` (paste a YouTube or Vimeo link into `url`), `links`.

### An article
Open `content/writing.ts`. Same idea. `date` is ISO (`"2026-03-14"`); the newest four appear on the homepage. Reading time is calculated for you.

### An archive object
Open `content/archive.ts`. Give it a unique `number` (shown as NO. 001), a category and a free-text `date` ("c. 1920s", "Date unknown"). `featured: true` puts it on the homepage (up to five).

### Images
1. Put the file in `public/images/<section>/`, e.g. `public/images/work/the-elephant-man/cover.jpg`.
2. Set `src: "/images/work/the-elephant-man/cover.jpg"` on the image.
3. Set `aspect` to width ÷ height (e.g. `4 / 5` for portrait, `3 / 2` for landscape) and write a real `alt` description.

Until `src` is set, a toned "plate" placeholder is shown instead. The `tone` and `motif` fields only affect the placeholder. The two homepage hero images are set at the top of `components/home/Hero.tsx`.

## Status

- **Phase 1 — Design system**: done, refined to the romantic Art Nouveau direction (see `DESIGN.md`).
- **Phase 2 — Homepage**: done.
- **Phase 3 — Internal pages**: Work, Writing, Archive, About and Contact exist and render real content with working detail routes, but are preliminary layouts. Still to build: the Archive Grid/Index toggle, category filters, the full About page and CV download.
- **Phase 4 — Refinement**: not started.
