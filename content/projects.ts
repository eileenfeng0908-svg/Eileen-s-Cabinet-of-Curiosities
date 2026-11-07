import type { Project } from "@/lib/types";

/**
 * WORK
 * One object per project. To add a project, copy an entry, give it a new
 * `slug` (used in the URL: /work/<slug>) and fill in the fields.
 * Put images in /public/images/work/<slug>/ and reference them as
 * "/images/work/<slug>/cover.jpg". Without `src`, a placeholder plate shows.
 *
 * Everything marked [like this] is a placeholder to replace.
 * Years are left out until confirmed: the dates on LinkedIn may be when a
 * project was listed rather than when it happened (noted beside each).
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
      src: "/images/work/what-makes-us-human/poster-original.jpg",
      alt: "Poster for What Makes Us Human? 何以为人: flowing white outlines on a red ground",
      aspect: 1547 / 1982,
      caption: "Exhibition poster",
    },
    summary:
      "An interdisciplinary exhibition exploring the question “What makes us human?” Eileen led a group of student artists and curators, connecting visual art with philosophical questions about identity, emotion and relationships.",
    // LinkedIn lists Aug 2025: confirm before showing a year.
    credits: [
      { label: "Type", value: "Exhibition / curatorial project" },
      { label: "Role", value: "Coordinator, artist and curator" },
      { label: "Venue", value: "[Venue]" },
    ],
    body: [
      { type: "paragraph", text: "[The curatorial premise.]" },
      { type: "image", size: "wide", image: { alt: "[Installation view]", aspect: 16 / 9, tone: "parchment", motif: "arch" } },
      { type: "paragraph", text: "[How the rooms were arranged and why.]" },
      {
        type: "links",
        title: "Related",
        items: [
          { label: "The exhibition catalogue", href: "/exhibitions/what-makes-us-human" },
          { label: "What Makes Us Human? — the Advanced Scholars research report", href: "/writing/what-makes-us-human" },
        ],
      },
    ],
  },
  {
    slug: "between-us",
    title: "Between Us",
    subtitle: "An Experiment in Artificial Intelligence and Human Relationships",
    category: "Creative Experiments",
    year: undefined,
    featured: 2,
    href: "https://between-us-pi.vercel.app/",
    cover: {
      src: "/images/work/between-us/cover.jpg",
      alt: "Cover of V magazine, 20 April 1947, “Souvenirs d’amour”: Cary Grant and Priscilla Lane about to kiss, printed in red",
      aspect: 1662 / 2142,
      caption: "V, no. 133, 20 April 1947",
    },
    summary:
      "An AI-assisted letter-writing system inspired by Spike Jonze’s Her (2013). The project examines how simulated replies can evoke recognition, intimacy or emotional connection, and asks where imitation ends and understanding begins.",
    // LinkedIn lists May 2026 – present: confirm before showing a year.
    credits: [
      { label: "Type", value: "AI, cinema & relational experience" },
      { label: "Status", value: "Ongoing" },
    ],
    body: [
      { type: "paragraph", text: "[What the experiment set out to explore.]" },
      { type: "paragraph", text: "[What happened, and what it made you think about.]" },
      { type: "links", title: "Elsewhere", items: [{ label: "Visit Between Us", href: "https://between-us-pi.vercel.app/" }] },
    ],
  },
  {
    slug: "fashion-shows",
    title: "Fashion Shows",
    subtitle: "Five Shows, 2023–2027",
    category: "Creative Experiments",
    year: "2023–2027",
    featured: 4,
    // The card opens the Fashion Atelier rather than a project page.
    href: "/collections/fashion",
    cover: {
      src: "/images/work/fashion-shows/cover.jpg",
      alt: "Vogue cover of 21 January 1909: a lace border around the White & Southern Fashions Number",
      aspect: 1560 / 2100,
      caption: "Vogue, 21 January 1909",
    },
    summary:
      "Five fashion shows, from Bionic (2023), Utopia (2024), Memory (2025) and Identity (2026) to In the Mood for… (2027), gathered in the Fashion Atelier. [Your role and a fuller description to come.]",
    credits: [
      { label: "Type", value: "Fashion / creative leadership" },
      { label: "Role", value: "[Your role]" },
    ],
    body: [
      { type: "paragraph", text: "[The concept behind the show.]" },
      { type: "video", url: "", title: "[Show film]", caption: "[Add a YouTube or Vimeo embed URL to show the video]" },
      { type: "paragraph", text: "[Process: casting, styling, music, set.]" },
    ],
  },
  {
    slug: "postcard-archive",
    title: "Postcard Archive",
    subtitle: "An Interactive Archive of Handwritten Correspondence",
    category: "Art & Curation",
    year: undefined,
    // LinkedIn lists Aug 2026 – present: confirm before showing a year.
    href: "https://postcard-archive.vercel.app/collection",
    cover: {
      src: "/images/work/postcard-archive/cover.jpg",
      alt: "Postcard “St. Valentine’s Greeting”: two children sitting in front of a pink heart framed with forget-me-nots, with the verse “I love my Love, because I know my Love loves me”",
      aspect: 1090 / 705,
      caption: "“St. Valentine’s Greeting”, from the collection",
    },
    summary:
      "An interactive website built around a personal collection of postcards dating from the early 1900s through the 2020s. It explores historical relationships and the intimate stories preserved in handwritten correspondence.",
    credits: [
      { label: "Type", value: "Interactive archive / digital humanities" },
      { label: "Status", value: "Ongoing" },
    ],
    body: [
      { type: "paragraph", text: "For now, this is an online archive for my own postcard collection, and I am still developing it. In the future, I want to grow it into a global, public online postcard archive: a place to preserve human connection and love." },
      { type: "links", title: "Elsewhere", items: [{ label: "Visit the Postcard Archive", href: "https://postcard-archive.vercel.app/collection" }] },
    ],
  },
  {
    slug: "could-machines-think-and-feel",
    title: "Could Machines Think and Feel?",
    subtitle: "Machine Consciousness and Human–AI Relationships",
    category: "Research",
    year: undefined,
    // LinkedIn lists Jan 2026 – present: confirm before showing a year.
    cover: {
      src: "/images/work/could-machines-think-and-feel/cover.png",
      alt: "A CAPTCHA asking “Enter the following:” with distorted text reading “love you”, and the answer typed as “love you”",
      aspect: 324 / 210,
      caption: "“Enter the following: love you”",
    },
    coverMaxWidth: 560,
    summary:
      "Research into machine consciousness, relational consciousness and human–AI relationships, using Her (2013) as a case study for the perception and attribution of consciousness.",
    credits: [
      { label: "Type", value: "Philosophical research" },
      { label: "Status", value: "Ongoing" },
    ],
    body: [
      { type: "paragraph", text: "This research continues in Between Us, an interactive AI installation that grew out of it and is also on this website. Instead of arguing the question in an essay, it lets people explore it through interaction: could a machine be conscious?" },
      { type: "links", title: "Read", items: [{ label: "Could Machines Think and Feel? — the essay", href: "/writing/could-machines-think-and-feel" }, { label: "Between Us — the installation", href: "/work/between-us" }] },
    ],
  },
  {
    slug: "asian-women-in-hollywood",
    title: "Asian Women in the 1920–1980s Hollywood Movie",
    subtitle: "Film-History Research",
    category: "Cinema & Research",
    year: undefined,
    // LinkedIn lists Sep 2025: confirm before showing a year.
    cover: {
      src: "/images/work/asian-women-in-hollywood/cover.jpg",
      alt: "Cine-Mundial page, November 1931: Anna May Wong in a beaded veil, seated before a red-and-pink parasol",
      aspect: 500 / 695,
      caption: "Anna May Wong in Cine-Mundial, November 1931, for Paramount’s “La Hija del Dragón” (Daughter of the Dragon)",
    },
    coverMaxWidth: 500,
    summary:
      "A study of representations of Asian women in twentieth-century Hollywood cinema, considering stereotypes, visual conventions and historical contexts.",
    credits: [
      { label: "Type", value: "Film-history research" },
      { label: "Status", value: "Ongoing" },
    ],
    body: [],
  },
  {
    slug: "film-and-mental-illness",
    title: "How Film Shapes Public Perceptions of Mental Illness",
    subtitle: "Cinema & Psychology Research",
    category: "Cinema & Research",
    year: undefined,
    // LinkedIn lists Oct 2024 – Jun 2025: confirm before showing dates.
    cover: { alt: "[Film still]", aspect: 4 / 3, tone: "green", motif: "arch", caption: "[Still — film, year]" },
    summary:
      "Qualitative research comparing film portrayals of mental illness with clinical understandings. It investigates stereotyping, narrative and environmental factors, and the ways media representations may contribute to public stigma and self-stigma.",
    credits: [{ label: "Type", value: "Cinema / psychology research" }],
    body: [
      {
        type: "paragraph",
        text: "The full research paper, Misconceptions on Screen, compares films’ depictions of mental illness with the DSM-5 and traces how the differences contribute to stigma and public misconceptions.",
      },
      {
        type: "links",
        title: "Read",
        items: [{ label: "Misconceptions on Screen — the research paper", href: "/writing/misconceptions-on-screen" }],
      },
    ],
  },
  {
    slug: "four-mirrors",
    title: "4 Mirrors 四面鏡子",
    subtitle: "A WeChat Public Account",
    category: "Writing & Publications",
    year: undefined,
    // LinkedIn lists Sep 2023: confirm before showing a year.
    cover: { alt: "[4 Mirrors cover image]", aspect: 1, tone: "brass", motif: "none", caption: "[Image — caption]" },
    summary: "A WeChat public account founded by Eileen. [Its editorial scope and selected posts to come.]",
    credits: [
      { label: "Type", value: "Writing / publication" },
      { label: "Role", value: "Founder" },
    ],
    body: [
      { type: "paragraph", text: "[What 4 Mirrors publishes, and why you started it.]" },
      { type: "links", title: "Read", items: [{ label: "[Link to 4 Mirrors]", href: "#" }] },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Where a project's card leads: its own page, unless it points elsewhere. */
export const projectHref = (p: Project) => p.href ?? `/work/${p.slug}`;
/** Link props that open an external project (a live site) in a new tab. */
export const projectTarget = (p: Project) => (p.href?.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});

export const featuredProjects = () =>
  projects
    .filter((p) => p.featured !== undefined)
    .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));
