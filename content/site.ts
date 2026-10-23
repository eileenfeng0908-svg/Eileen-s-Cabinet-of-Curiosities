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

  email: "eileen20080908@outlook.com",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/eileennnnn.08/", placeholder: false },
    { label: "Letterboxd", href: "https://letterboxd.com/fiveforcrying/", placeholder: false },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/eileen-feng-790713379", placeholder: false },
  ],
} as const;

export const navigation = [
  { label: "Projects", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
