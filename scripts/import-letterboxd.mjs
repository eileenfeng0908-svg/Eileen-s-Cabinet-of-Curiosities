#!/usr/bin/env node
/**
 * Import a Letterboxd export into the Film Log.
 *
 *   node scripts/import-letterboxd.mjs path/to/letterboxd-export-folder
 *
 * Reads diary.csv (and reviews.csv, for your review text) and writes
 * content/films.letterboxd.json. Run it again whenever you export again;
 * the file is replaced. Posters, directors and links to your own reviews
 * are added in content/films.ts (`extras`), so they survive re-imports.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = process.argv[2];
if (!dir || !existsSync(join(dir, "diary.csv"))) {
  console.error("Usage: node scripts/import-letterboxd.mjs <folder containing diary.csv>");
  process.exit(1);
}

/** Minimal RFC 4180 CSV parser (handles quotes, commas and newlines in fields). */
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [head, ...body] = rows.filter((r) => r.some((v) => v !== ""));
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? "").trim()])));
}

const read = (f) => (existsSync(join(dir, f)) ? parseCsv(readFileSync(join(dir, f), "utf8")) : []);
const diary = read("diary.csv");
const reviews = read("reviews.csv");

const key = (r) => `${r["Name"]}|${r["Year"]}|${r["Watched Date"] || r["Date"]}`;
const reviewText = new Map(reviews.map((r) => [key(r), r["Review"]]));

const slugify = (s) => s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-");
const seen = new Map();

const films = diary.map((r) => {
  const watched = r["Watched Date"] || r["Date"] || undefined;
  let slug = slugify(`${r["Name"]}-${r["Year"]}`);
  const n = (seen.get(slug) ?? 0) + 1;
  seen.set(slug, n);
  if (n > 1) slug += `-${n}`;
  const rating = r["Rating"] ? Number(r["Rating"]) : undefined;
  const note = reviewText.get(key(r));
  return {
    slug,
    title: r["Name"],
    year: r["Year"] || undefined,
    watched,
    rating: Number.isFinite(rating) ? rating : undefined,
    rewatch: r["Rewatch"] === "Yes" || undefined,
    note: note || undefined,
    tags: r["Tags"] ? r["Tags"].split(",").map((t) => t.trim()).filter(Boolean) : undefined,
    letterboxd: r["Letterboxd URI"] || undefined,
    poster: { alt: `Poster for ${r["Name"]}`, aspect: 2 / 3, tone: "walnut" },
  };
});

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "content", "films.letterboxd.json");
writeFileSync(out, JSON.stringify(films, null, 2) + "\n");
console.log(`Imported ${films.length} diary entries (${reviews.length} reviews matched by film and date) → content/films.letterboxd.json`);
