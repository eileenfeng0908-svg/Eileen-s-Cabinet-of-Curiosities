import type { ContentBlock } from "./types";

/** NO. 001 */
export const catalogueNumber = (n: number) => `No. ${String(n).padStart(3, "0")}`;

/** Roman numerals for plate and section numbering. */
export const roman = (n: number) => {
  const map: [number, string][] = [
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
  return out;
};

export const formatDate = (iso?: string) => {
  if (!iso) return "Forthcoming";
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/** ~220 words per minute, minimum one minute. */
export const readingTime = (blocks: ContentBlock[]) => {
  const words = blocks
    .map((b) => ("text" in b ? b.text : ""))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
};
