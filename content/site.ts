/**
 * Site-wide settings and copy.
 * Anything in [square brackets] is a placeholder — replace it with your own.
 */
export const site = {
  name: "Eileen Feng",
  monogram: "EF.",
  tagline: "An evolving collection of images, ideas, and things worth remembering.",
  description:
    "The personal digital archive of Eileen Feng: cinema research, art and curation, photography, writing and creative experiments.",
  // Set this to your real domain once deployed (used for SEO metadata).
  url: "https://example.com",

  /** Homepage personal statement. Written as a placeholder in your voice: rewrite freely. */
  statement: {
    lead: "I keep things",
    body: "films that asked me to look twice, rooms arranged around an idea, photographs of ordinary afternoons, sentences I did not want to lose. This is where they are kept, in no particular hurry.",
    signature: "[A line or two about yourself — replace in content/site.ts]",
  },

  /** Contact. Do not publish until replaced with real details. */
  email: "[your-email@example.com]",
  socials: [
    { label: "Instagram", href: "#", placeholder: true },
    { label: "Letterboxd", href: "#", placeholder: true },
    { label: "LinkedIn", href: "#", placeholder: true },
  ],
} as const;

export const navigation = [
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
