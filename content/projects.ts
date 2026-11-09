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
      // Written by Claude at Eileen's request (2026-11-09), from her brief and the essay "Could Machines Think and Feel?".
      { type: "heading", text: "What it sets out to explore" },
      { type: "paragraph", text: "Between Us grew out of my research essay “Could Machines Think and Feel?”. There, I argued that the question may not be whether an AI is conscious inside, but what kind of being it becomes between us: a relational form of existence that only appears through interaction. This project turns that argument into something you can try." },
      { type: "paragraph", text: "It is a letter-writing space. You write to someone, and an AI writes back, learning to imitate the voice, rhythm and small habits of the way a person writes. The experiment asks three questions. Can a machine imitate how we write closely enough to feel familiar? If a reply moves us, where did that feeling come from: the machine, the writer, or the space between them? And could something like feeling exist in a relationship, even if it cannot be found inside the machine itself?" },
      { type: "heading", text: "What it makes me think about" },
      { type: "paragraph", text: "Like Samantha in Her, a simulated reply can be surprisingly tender. Reading one, you recognise yourself, or someone you love, in words no person actually wrote. That recognition is real, even if its source is uncertain. Between Us does not try to settle whether the machine understands. It leaves the question open, and asks the reader to notice what happens to them while they read." },
      { type: "paragraph", text: "The project is still ongoing. Each letter is another small test of where imitation ends and understanding begins." },
      { type: "links", title: "Elsewhere", items: [{ label: "Visit Between Us", href: "https://between-us-pi.vercel.app/" }] },
    ],
  },
  {
    slug: "music-interaction",
    title: "Music Interaction Project",
    subtitle: "Five Rooms: Press Play, Listen Before You Name It",
    category: "Creative Experiments",
    year: undefined,
    featured: 4,
    href: "https://music-interaction.vercel.app/",
    cover: {
      src: "/images/work/music-interaction/cover.jpg",
      alt: "Illustration “NYC dressed in happiness”: a crowd in bright patterned clothes crossing a black-and-white zebra crossing",
      aspect: 958 / 956,
      caption: "“NYC dressed in happiness”, FARM Rio",
    },
    // Summary and body written by Claude at Eileen's request (2026-11-09).
    summary:
      "An interactive music website made for the What Makes Us Human? exhibition. It opens with one instruction, “Press play. Listen before you name it.”, and asks visitors to feel a piece of music before they put words to it.",
    credits: [
      { label: "Type", value: "Interactive website / sound" },
      { label: "Made for", value: "What Makes Us Human?" },
    ],
    body: [
      { type: "heading", text: "Listen before you name it" },
      { type: "paragraph", text: "The project began with a simple question from the exhibition: if relationships are what make us human, what happens in the moment between hearing something and understanding it? Music is one of the oldest ways people share feelings without explaining them, so the site asks visitors to slow down and listen first." },
      { type: "paragraph", text: "Each room is a different page with its own atmosphere. You press play, stay with the sound, and only then begin to name what you are hearing and what it makes you feel. The order is the point: the feeling arrives before the words." },
      { type: "heading", text: "Why it belongs in the exhibition" },
      { type: "paragraph", text: "Alongside Between Us, the project explores how meaning forms between a person and something outside them, whether that is a letter, a machine or a melody. Listening becomes a small act of relationship: we bring our own memories and moods to a piece of music, and it answers back." },
      { type: "links", title: "Elsewhere", items: [{ label: "Visit Five Rooms", href: "https://music-interaction.vercel.app/" }, { label: "The exhibition catalogue", href: "/exhibitions/what-makes-us-human" }] },
    ],
  },
  {
    slug: "fashion-shows",
    title: "Fashion Shows",
    subtitle: "Five Shows, 2023–2027",
    category: "Creative Experiments",
    year: "2023–2027",
    featured: 3,
    // The card opens the Fashion Atelier rather than a project page.
    href: "/collections/fashion",
    cover: {
      src: "/images/work/fashion-shows/cover.jpg",
      alt: "Vogue cover of 21 January 1909: a lace border around the White & Southern Fashions Number",
      aspect: 1560 / 2100,
      caption: "Vogue, 21 January 1909",
    },
    summary:
      "Five fashion shows, from Bionic (2023), Utopia (2024), Memory (2025) and Identity (2026) to In the Mood for… (2027), gathered in the Fashion Atelier. Eileen was designer and show director of every show.",
    credits: [
      { label: "Type", value: "Fashion / creative leadership" },
      { label: "Role", value: "Designer and show director" },
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
    featured: 5,
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
    featured: 6,
    // LinkedIn lists Oct 2024 – Jun 2025: confirm before showing dates.
    cover: {
      src: "/images/work/film-and-mental-illness/cover.jpg",
      alt: "Looking down on a cinema audience seated in rows of red velvet seats",
      aspect: 736 / 1104,
    },
    coverMaxWidth: 520,
    summary:
      "Qualitative research comparing film portrayals of mental illness with clinical understandings. It investigates stereotyping, narrative and environmental factors, and the ways media representations may contribute to public stigma and self-stigma.",
    credits: [{ label: "Type", value: "Cinema / psychology research" }],
    body: [
      { type: "video", url: "https://youtu.be/cuBmzg9y4RE", title: "Cinema or Stigma? Rethinking Mental Disorders in Film", caption: "TEDx talk: Cinema or Stigma? Rethinking mental disorders in film" },
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
    cover: {
      src: "/images/work/four-mirrors/cover.jpg",
      alt: "A woman in a pink blouse facing an oval wall mirror, her reflection repeated again and again in smaller mirrors",
      aspect: 1200 / 720,
    },
    summary: "A WeChat public account founded by Eileen.",
    credits: [
      { label: "Type", value: "Writing / publication" },
      { label: "Role", value: "Founder" },
    ],
    body: [
      { type: "paragraph", text: "Wrote and published 49 original essays, literary analyses, creative works and cultural commentaries; gained over 1k followers and 200k views." },
      { type: "heading", text: "第一面镜子 · The First Mirror: On Literature", wide: true },
      {
        type: "bilingual",
        quote: true,
        zh: "我很高兴文学出色地保留了所有怪诞、幻想、挑衅、滑稽和疯狂的权利。我梦想着高屋建瓴的观点和远远超出我们预期的广阔视野。我梦想着有一种语言，能够表达最模糊的直觉。我梦想着有一种隐喻，能够超越文化的差异。我梦想着有一种流派，能够变得宽阔且具有突破性，同时又得到读者的喜爱。我还梦想着一种新型的讲述者——“第四人称讲述者”。",
        en: "I am glad that literature has so brilliantly kept its right to everything grotesque, fantastical, provocative, comic and mad. I dream of lofty points of view and wide horizons that reach far beyond what we expect. I dream of a language able to express the vaguest intuitions. I dream of a metaphor able to cross cultural differences. I dream of a genre that can grow broad and groundbreaking and still be loved by readers. And I dream of a new kind of narrator: a “fourth-person narrator”.",
        source: "奥尔加·托卡尔丘克，诺贝尔文学奖获奖演讲 · Olga Tokarczuk, Nobel Prize in Literature lecture",
      },
      { type: "bilingual", zh: "文学将我们聚集在一起 却又让每一个人创造出不同的宇宙", en: "Literature brings us together, yet lets each of us create a different universe." },
      { type: "bilingual", zh: "欢迎来到四面镜子的第一面——文学之镜", en: "Welcome to the first of the Four Mirrors: the Mirror of Literature." },
      {
        type: "bilingual",
        zh: "文学之镜由诗歌、散文、小说等不同的文学表达方式组成，并期待着新鲜血液的来临。",
        en: "The Mirror of Literature is made up of poetry, essays, fiction and other forms of literary expression, and looks forward to the arrival of new blood.",
      },
      { type: "heading", text: "第二面镜子 · The Second Mirror: On Art", wide: true },
      {
        type: "bilingual",
        quote: true,
        zh: "阻止我们碎烂，进而成为厄运、滴血的伤口或卑劣的残忍？是文学与音乐：艺术。它宽恕我们的存在，也为其辩解，它是探求也是挑衅，是指责也是尖叫，是我们想法设法理性地活着，不被撕裂，不成为伤口、厄运或一把枪的原因，尽管每个人内心都有不可调和的矛盾。它是我们，无论世事如何，能够原谅自己生而为人的原因。",
        en: "What keeps us from falling to pieces, from becoming a curse, a bleeding wound or base cruelty? Literature and music: art. It forgives our existence and pleads its case; it is a search and a provocation, an accusation and a scream. It is the reason we somehow manage to live with reason, without being torn apart, without becoming a wound, a curse or a gun, even though each of us carries contradictions that can never be reconciled. It is the reason that, whatever happens in the world, we can forgive ourselves for being born human.",
        source: "约恩·卡尔曼·斯特凡松《鱼没有脚》 · Jón Kalman Stefánsson, Fish Have No Feet",
      },
      { type: "bilingual", zh: "欢迎来到四面镜子的第二面——艺术之镜", en: "Welcome to the second of the Four Mirrors: the Mirror of Art." },
      {
        type: "bilingual",
        zh: "艺术之镜欢迎宇宙各处的艺术家来访，并期待他们留下自己的足迹。艺术之镜希望透过不同的眼睛来观察这个多元的世界，看见这个世界的美与善，或是这个世界的丑与恶。",
        en: "The Mirror of Art welcomes artists from every corner of the universe, and hopes they will leave their footprints here. It hopes to look at this diverse world through different eyes, and to see its beauty and goodness, or its ugliness and evil.",
      },
      { type: "heading", text: "第三面镜子 · The Third Mirror: On Humanity", wide: true },
      {
        type: "bilingual",
        quote: true,
        zh: "“有的人有写作的才能、演戏的才能、绘画的才能，可是他有一种特别的才能——博爱的才能。他对一切痛苦有敏锐的感觉。如同好演员总是在自己身上演出别人的动作和声音一样，瓦西里耶夫也善于在自己的灵魂里体会别人的痛苦。他看见别人哭泣，自己就流泪。他在病人身旁，就觉得自己也有病，呻吟起来。要是看到暴力，他就觉得暴力正在摧残自己，害怕得跟小孩似的，而且等到害怕过后总要跑过去搭救。别人的痛苦刺激他，使他激动，弄得他放不下，摆不开，等等。”",
        en: "“Some people have a talent for writing, for acting, for painting; but he had a special talent: a talent for loving all people. He had a keen sense of every kind of pain. Just as a good actor reproduces other people’s movements and voices in himself, Vasilyev knew how to feel other people’s pain in his own soul. When he saw someone cry, he cried too. Beside the sick, he felt sick himself and began to groan. If he saw violence, he felt that it was being done to him; he grew frightened like a child, and once the fear had passed he always ran to help. Other people’s pain unsettled him, stirred him, held him so that he could not put it down or shake it off, and so on.”",
        source: "契诃夫 · Anton Chekhov",
      },
      {
        type: "bilingual",
        quote: true,
        zh: "一个人逃避、忍受抑或喜爱独处是和这一个人自身具备的价值恰成比例。因为在独处的时候，一个可怜虫就会感受到自己的全部可怜之处，而一个具有丰富思想的人只会感觉到自己丰富的思想。",
        en: "Whether a person flees solitude, endures it or loves it is in exact proportion to their own worth. For in solitude a poor wretch feels the whole of his wretchedness, while a person rich in thought feels only the richness of his own thoughts.",
        source: "叔本华《人生的智慧》 · Arthur Schopenhauer, The Wisdom of Life",
      },
      { type: "bilingual", zh: "欢迎来到四面镜子的第三面——人类之镜", en: "Welcome to the third of the Four Mirrors: the Mirror of Humanity." },
      {
        type: "bilingual",
        zh: "人类之镜包含了从古至今的一切与我们息息相关的故事，人类之境是我们与世界沟通的媒介。在这里，我们将透过我们自身，看见这个世界的改变。人类之镜储存着人类漫长的历史，智者的思想，我们每一个人内心深处所暗藏着的不同情感",
        en: "The Mirror of Humanity holds every story, from ancient times to today, that is bound up with our lives; it is the medium through which we speak with the world. Here, through ourselves, we will watch the world change. The Mirror of Humanity keeps the long history of humankind, the thoughts of the wise, and the different feelings each of us hides deep inside.",
      },
      { type: "heading", text: "第四面镜子 · The Fourth Mirror: On the World", wide: true },
      {
        type: "bilingual",
        quote: true,
        zh: "他幸福地想道，\n世界是愤怒的永恒工具，\n为少数人创造的企盼的天国\n对几乎所有人来说是地狱。",
        en: "He thought, happily,\nthe world is an eternal instrument of wrath;\nthe longed-for heaven made for the few\nis, for almost everyone, a hell.",
        source: "博尔赫斯《另一个，同一个》 · Jorge Luis Borges, The Other, the Same",
      },
      {
        type: "bilingual",
        quote: true,
        zh: "我也同样，感到自己准备好了，要再次经历这一切。经过这场盛怒，我就好像净除了痛苦，空乏了希望，面对这布满象征的星空，我第一次敞开心扉，接受世界温柔的冷漠。感受到这世界如此像我，总之亲如手足，我就觉得自己从前幸福，现在仍然幸福。为求尽善尽美，为求我不再感到那么孤独，我只期望行刑那天围观者众，都向我发出憎恨的吼声。",
        en: "I, too, felt ready to live it all again. After that great rage, it was as if I had been washed clean of pain and emptied of hope; facing this sky full of signs and stars, for the first time I opened my heart to the gentle indifference of the world. Feeling the world so like me, so brotherly, I felt that I had been happy, and that I was happy still. For everything to be complete, for me to feel less alone, I had only to hope that on the day of my execution there would be a great crowd, and that they would greet me with cries of hate.",
        source: "加缪《局外人》 · Albert Camus, The Stranger",
      },
      { type: "bilingual", zh: "欢迎来到四面镜子的第四面——世界之镜", en: "Welcome to the fourth of the Four Mirrors: the Mirror of the World." },
      {
        type: "bilingual",
        zh: "世界之镜与另外三面镜子紧紧相连，每一个人、每一个文学家、艺术家的诞生，都来源于这个世界。世界之镜关于我们、关于每一个白天与黑夜、关于展现在我们眼前的每一个事物。世界之镜是四面镜子的创造者，但镜子总有一天会破碎。",
        en: "The Mirror of the World is closely bound to the other three: every person, every writer and every artist is born of this world. The Mirror of the World is about us, about every day and every night, about everything that unfolds before our eyes. It is the maker of the Four Mirrors; but one day, mirrors break.",
      },
      { type: "label", text: "English translations are made from the Chinese text." },
      {
        type: "image",
        size: "inset",
        maxWidth: 260,
        image: { src: "/images/work/four-mirrors/qr.png", alt: "WeChat QR code for the 4 Mirrors public account", aspect: 1, caption: "Scan with WeChat to follow 4 Mirrors" },
      },
      { type: "paragraph", text: "Many of the essays from the account are also collected on the Writing page." },
      { type: "links", title: "Read", items: [{ label: "Writing & Philosophy", href: "/collections/writing-and-philosophy" }] },
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
