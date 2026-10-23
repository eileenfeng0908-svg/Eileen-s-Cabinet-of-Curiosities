import type { Project } from "@/lib/types";

/**
 * WORK
 * One object per project. To add a project, copy an entry, give it a new
 * `slug` (used in the URL: /work/<slug>) and fill in the fields.
 * Put images in /public/images/work/<slug>/ and reference them as
 * "/images/work/<slug>/cover.jpg". Without `src`, a placeholder plate shows.
 *
 * Everything marked [like this] is a placeholder to replace.
 */
export const projects: Project[] = [
  {
    slug: "what-makes-us-human",
    title: "What Makes Us Human?",
    subtitle: "An Interdisciplinary Exhibition",
    category: "Art & Curation",
    year: undefined,
    featured: 1,
    cover: {
      alt: "[Describe the exhibition image]",
      aspect: 3 / 4,
      tone: "parchment",
      motif: "arch",
      caption: "[Exhibition view — caption]",
    },
    summary:
      "An exhibition that brought several disciplines into one room to ask a single, unanswerable question. [Replace with your own summary: your role, the works, the space.]",
    credits: [
      { label: "Role", value: "[Curator / co-curator / designer]" },
      { label: "Venue", value: "[Venue]" },
    ],
    body: [
      { type: "paragraph", text: "[The curatorial premise.]" },
      { type: "image", size: "wide", image: { alt: "[Installation view]", aspect: 16 / 9, tone: "parchment", motif: "arch" } },
      { type: "paragraph", text: "[How the rooms were arranged and why.]" },
    ],
  },
  {
    slug: "between-us",
    title: "Between Us",
    subtitle: "An Experiment in Artificial Intelligence and Human Relationships",
    category: "Creative Experiments",
    year: undefined,
    featured: 2,
    cover: {
      alt: "[Describe the project image]",
      aspect: 4 / 5,
      tone: "bloom",
      motif: "sun",
      caption: "[Image — caption]",
    },
    summary:
      "An experiment in what it means to be in conversation with something that is not quite someone. [Replace with your own summary.]",
    credits: [{ label: "Medium", value: "[Medium]" }],
    body: [
      { type: "paragraph", text: "[What the experiment set out to explore.]" },
      { type: "paragraph", text: "[What happened, and what it made you think about.]" },
      { type: "links", title: "Elsewhere", items: [{ label: "[External link]", href: "#" }] },
    ],
  },
  {
    slug: "the-elephant-man",
    title: "The Elephant Man",
    subtitle: "Cinema, Spectatorship & the Ethics of Looking",
    category: "Cinema & Research",
    year: undefined,
    featured: 3,
    cover: {
      alt: "[Describe the cover image]",
      aspect: 3 / 2,
      tone: "ink",
      motif: "frame",
      caption: "[Still or research image — caption]",
    },
    summary:
      "A study of how cinema positions its audience as onlookers, and what it asks of us when the camera turns toward a body it has made strange. [Replace with your own summary.]",
    credits: [
      { label: "Format", value: "[Research essay / video essay / presentation]" },
      { label: "Context", value: "[Course, independent study, or programme]" },
    ],
    body: [
      { type: "paragraph", text: "[Opening paragraph: the question this research begins with.]" },
      { type: "paragraph", text: "[Second paragraph: method, sources, the films or texts you worked with.]" },
      { type: "quote", text: "[A passage or line that anchors the project.]", source: "[Source]" },
      {
        type: "gallery",
        images: [
          { alt: "[Image 1]", aspect: 3 / 2, tone: "ink", motif: "frame" },
          { alt: "[Image 2]", aspect: 3 / 2, tone: "parchment", motif: "figure" },
        ],
      },
      { type: "paragraph", text: "[Findings, reflections, what remains unresolved.]" },
    ],
    references: ["[Reference 1 — Author, Title, Year]", "[Reference 2]"],
  },
  {
    slug: "identity",
    title: "Identity",
    subtitle: "Fashion Show & Creative Direction",
    category: "Creative Experiments",
    year: undefined,
    featured: 4,
    cover: {
      alt: "[Describe the show image]",
      aspect: 4 / 5,
      tone: "amber",
      motif: "figure",
      caption: "[Runway or backstage — caption]",
    },
    summary:
      "Creative direction for a fashion show that treated clothing as a way of telling who we are, and who we are not yet. [Replace with your own summary.]",
    credits: [{ label: "Role", value: "[Creative director / stylist / producer]" }],
    body: [
      { type: "paragraph", text: "[The concept behind the show.]" },
      { type: "video", url: "", title: "[Show film]", caption: "[Add a YouTube or Vimeo embed URL to show the video]" },
      { type: "paragraph", text: "[Process: casting, styling, music, set.]" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const featuredProjects = () =>
  projects
    .filter((p) => p.featured !== undefined)
    .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));
