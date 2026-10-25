import type { CatalogueEntry, ExhibitionSection, Pair, Quote } from "@/content/exhibitions";

/**
 * YOU WILL NEVER WALK ALONE — the exhibition's own texts, as Eileen gave them.
 * The Chinese is hers; English that was not in her text was translated for
 * this site (English-language quotations are given in the original).
 */

const D = "/images/exhibitions/you-will-never-walk-alone/";
const CR = " · Photo: Shenzhen Nanshan Huitong School";

/** 标题解释: the title explained, by Amy Liu. */
export const titleNote: CatalogueEntry = {
  id: "about-the-title",
  zh: `标题解释`,
  title: `About the Title`,
  by: `Amy Liu`,
  body: [],
  notes: [
    {
      title: `You`,
      body: [
        {
          zh: `是你，是我，是我们。是现在的人也是过去的人。代表“我是谁？”`,
          en: `It is you, it is me, it is us. It is the people of today and the people of the past. It stands for “Who am I?”`,
        },
      ],
    },
    {
      title: `Walk`,
      body: [
        { zh: `代表“我从哪里来？”“我要到哪里去？”`, en: `It stands for “Where do I come from?” and “Where am I going?”` },
        {
          zh: `1. 直译“行走”。从一个人呱呱落地起就会爬，之后就是走。就如同著名的斯芬克斯之谜：一个动物早上四条腿走路，中午用两条腿，到了晚上则是三条。谜底是人，是因为分别对应了人在地上爬行的婴儿时期，站立行走的青少年和成年时期，以及拄着拐杖的老年时期。人的一生都要行走，尽管以不同的形式。这不仅是verbally的行走，更是metaphorically的如何度过这一生。“走”的这个词含义太广，以至于人们经常以“他走了”来表达“他死了”。连英文也是“he's gone.” 一个著名的人生比喻是一场马拉松。每个人都是在奔跑，行走与这世间。`,
          en: `1. Taken literally, “walking”. From the moment we are born we learn to crawl, and then to walk. As in the famous riddle of the Sphinx: what walks on four legs in the morning, two at noon and three in the evening? The answer is a human being, crawling as an infant, walking upright in youth and adulthood, and leaning on a stick in old age. We walk all our lives, though in different forms. This is walking not only literally but metaphorically: how we pass through this life. The word “walk” (走) holds so much that in Chinese people often say “he has walked away” to mean “he has died”; even English says “he's gone.” A famous metaphor calls life a marathon. Everyone is running, walking through this world.`,
        },
        {
          zh: `2. 近义词“前进, Progress”。前进可以是时代的更替，技术的更迭，但不是不择手段的前进。而是人文和社会意义上的进步。例如在小学生做的《穿条纹内衣的男孩》艺术品代表着什么，如果代表着种族灭绝和隔离，那我们现在又要以什么方式来看待这些想法？现在的社会又是否存在这些ideology？如果我们认为这些ideology是“不好”的，我们又有什么方法来面对？我们怎么才能表现“人文意义上的进步”？所有人都希冀更好的生活，这股原初的热情便是所谓的进步，以及未来。或许历史是杂乱无章的，但是我们都在以各自的努力尝试绘出“未来”，绘出“我要到哪里去”的“哪里”。`,
          en: `2. Its near-synonym is “progress” (前进). Progress can mean the turning of eras and the succession of technologies, but not progress at any cost: progress in a humane and social sense. What, for example, does the primary-school students' artwork based on The Boy in the Striped Pyjamas stand for? If it stands for genocide and segregation, how should we look at those ideas today? Do such ideologies still exist in our society? If we believe they are wrong, how can we face them? How can we show progress in the humane sense? Everyone hopes for a better life, and that first, original passion is what we call progress, and the future. History may be chaotic, but each of us, in our own way, is trying to draw the “future”: to draw the “where” of “Where am I going?”`,
        },
      ],
    },
    {
      title: `Alone`,
      body: [
        {
          zh: `孤独。我们一个人出生，一个人死去。人不是人类，而是一个个个体。但是身为个体我们就一定是孤独的吗？Solitude不是loneliness。宇宙从来都是混乱又齐一的，一个个不同的人，在不同的时间，却产生了相似的想法，相似的痕迹。我们并不孤独。当我们回头，就可以看到在历史的沙滩上你我的足迹。我是谁？我从哪里来？我要到哪里去？这三个没有人知道答案的问题无法被解答。但是我们可以知道的是：不止我自己不知道这三个问题的答案，所以我在寻求答案的路途中并不是孤身一人。`,
          en: `Solitude. We are born alone and we die alone. People are not “humankind” but individuals, one by one. But as individuals, must we be lonely? Solitude is not loneliness. The universe has always been chaotic and yet one: different people, at different times, have arrived at similar thoughts and left similar traces. We are not alone. When we look back, we can see your footprints and mine on the sands of history. Who am I? Where do I come from? Where am I going? No one knows the answers to these three questions, and they cannot be answered. But what we can know is this: I am not the only one who does not know, and so on the road to the answers, I am not walking alone.`,
        },
      ],
    },
  ],
  quoteGroups: [
    {
      quotes: [
        {
          orig: `Γνώσῃ δ’, ἣ θέμις ἐστὶ, φύσιν περὶ παντὸς ὁμοίην.`,
          zh: `你将懂得，正如你应当懂得，宇宙在任何地方都是齐一的。`,
          en: `Thou shalt likewise understand, as is in accord with Law, that the nature of the universe flows in all things alike.`,
          by: `The Golden Verses of Pythagoras, by Fabre d'Olivet`,
        },
      ],
    },
  ],
};

export const preface: Pair[] = [
  {
    zh: `在中文中，组成“孤独”这个词的两个字都代表着“一个人”：一个人呆着，自己和自己相处。孤独这词总透露着不愉悦的气息，就好像被人隔离起来了一般。但孤独的全貌并非如此：随着时间的流逝，人前仆后继的踏上一条条道路——前人走到了尽头，后人又相继踏上。道路上的人多了，人们也感知到了什么——就如同“孤”与“独”两个字一般，伶仃的它们凑到一起，也就不那么孤独了。`,
    en: `In Chinese, both characters of the word for loneliness, 孤独, mean “one person”: being on one's own, keeping one's own company. The word always carries a note of unhappiness, as if one had been shut away from others. But that is not the whole of loneliness. As time flows on, people set out one after another on road after road: when those ahead reach the end, those behind take up the way. As the roads fill with walkers, people begin to sense something. Like the two characters 孤 and 独, each solitary on its own: once they come together, they are not so lonely after all.`,
  },
  {
    zh: `在人类文明的曙光阶段，“孤独”或许是人类族群在面向自然与生存环境的挑战所感到的四面楚歌；伴随文明的进展，“孤独”与对于更广阔文明的好奇驱动着人类对外的探索与发现，让我们看见了多元的文化表现与交融；文明持续发展，争端与差异也持续发酵，我们同时见证了科技与生产力的飞速进展与大规模战争爆发带来的苦难与隔离；而当我们进入愈发快速与碎片化的当代生活，面向时刻不停歇的电子屏幕与信息流，“孤独”又以何种面貌浮现呢？`,
    en: `At the dawn of human civilization, “loneliness” may be the embattled feeling of the human race in the face of the challenges of nature. With the progress of civilization, “loneliness” and curiosity about a broader civilization drive human exploration and discovery, allowing us to see the explosion of diverse cultures. However, with the rapid progress of technology and productivity, we also witness the outbreaks of conflict and warfare inflicting suffering and “loneliness” on a much larger scale. As we enter the increasingly fast and fragmented contemporary life, how will the faces of “loneliness” change in the shuffling screens and fast flow of information?`,
  },
  {
    zh: `在这个展览中，荟同学生在全球历史课程中的学习将带领您穿越人类文明，与历史的“孤独”作伴，获取继续前进的启示与勇气。`,
    en: `In this exhibition, we invite you to join the learning journey of Huitong's Global History Projects with our students, as we walk with the shadow of “loneliness” in history while reaching for a brighter future for humanity.`,
  },
];

const photo = (n: string, w: number, h: number, alt: string, caption: string, credit = true) => ({
  src: `${D}${n}.jpg`,
  alt,
  aspect: w / h,
  caption: credit ? caption + CR : caption,
});

export const chapters: ExhibitionSection[] = [
  {
    id: "the-survivors",
    zh: `第一章：生命延续`,
    title: `Chapter I: The Survivors`,
    works: [],
    intro: [
      {
        zh: `展览的第一个章节带领观众从共情早期人类的生存与发展处境开始。从“像早期人类一样”创作一个手掌壁画开始，展览以互动的方式邀请观众们踏上人类发展的旅途。`,
        en: `The first chapter begins by asking visitors to put themselves in the place of early humans, and the conditions in which they survived and developed. Starting with a handprint mural made “like early humans”, the exhibition invites visitors, hands-on, to set out on the journey of human development.`,
      },
      {
        zh: `在全球历史课程1年级的“自给自足”，“早期人类的发明”，“人类迁徙”等单元作品的陪伴下，与参与展览的观众们一起思考早期人类面对的生存与发展挑战。`,
        en: `Accompanied by works from the Grade 1 Global History units “Self-Sufficiency”, “Early Human Inventions” and “Human Migration”, visitors reflect together on the challenges of survival and development that early humans faced.`,
      },
      {
        zh: `在这一章节的结束，面对以马斯洛需求金字塔为灵感的互动墙面，观众们被邀请留下他们认为的生存“必需品”。`,
        en: `At the end of the chapter, facing an interactive wall inspired by Maslow's hierarchy of needs, visitors are invited to leave what they consider the “necessities” of survival.`,
      },
      {
        zh: `在这个互动装置中，策展人们希望邀请参与的观众思考：虽然我们如今的生活环境与早期人类已经大不相同，但是我们的基础需求，生活与发展的基石是不是真的有所变化呢？`,
        en: `With this interactive installation, the curators hoped to ask visitors: although our living conditions today are very different from those of early humans, have our basic needs, the foundations of life and growth, really changed?`,
      },
    ],
    photos: [
      photo("chapter-1", 628, 718, "Chapter I wall text, “The Survivors”, with a hand-drawn hand and a quotation", "Chapter I wall text", false),
      photo("needs-wall", 1280, 853, "A visitor writing on a coloured sticker at the interactive needs wall", "The interactive needs wall"),
    ],
  },
  {
    id: "the-explorers",
    zh: `第二章：开拓者`,
    title: `Chapter II: The Explorers`,
    works: [],
    intro: [
      {
        zh: `第二章节以人类文明的探索与发展为主轴，展示了全球历史项目2-3年级课程的不同项目作品，从早期文字的出现，到像郑和，哥伦布等探索者的远航，再到中国代代传承的舞龙文化。`,
        en: `Built around the exploration and development of human civilization, the second chapter shows works from Grade 2–3 Global History projects: from the appearance of early writing, to the voyages of explorers such as Zheng He and Columbus, to the dragon dance passed down through generations in China.`,
      },
      {
        zh: `透过老师和孩子们在课堂学习中共同创作的学习作品，不仅可以看见人类文明的丰富景象，更可以一窥全球历史课程生动有趣的学习状态。`,
        en: `Through the works that teachers and children made together in class, visitors see not only the richness of human civilization but also a glimpse of how lively and joyful learning in the Global History programme is.`,
      },
    ],
    photos: [photo("dragon-dance", 1280, 853, "Paper dragon-dance works on wooden stands by the window, with clay boats on a table", "The Legacy of the Dragon Dance")],
  },
  {
    id: "in-our-time",
    zh: `第三章：我们的时代`,
    title: `Chapter III: In Our Time`,
    works: [],
    intro: [
      {
        zh: `第三章节以海明威的书《我们的时代》一书为章节名称，与观众一起步入高速发展的现代文明，同时也共同反思大规模战争对于文明的破坏与伤害。`,
        en: `Named after Ernest Hemingway's book In Our Time, the third chapter walks with visitors into fast-moving modern civilization, while reflecting together on the destruction and harm that large-scale war brings to it.`,
      },
      {
        zh: `在这一章节中，观众看见来自全球历史课程4-6年级的项目作品。其中包含4年级工业革命单元中关于火车与铁路发展单元的学生作品，与5年级同学们通过制作战争场景对比两次世界大战的战争科技差异，以及通过场景制作讲述战争时代“勇气与坚韧的故事”。`,
        en: `Here visitors see project works from Grades 4–6 of the Global History programme: Grade 4 work on trains and the growth of the railways from the Industrial Revolution unit, and Grade 5 dioramas that compare the war technology of the two World Wars and tell wartime “stories of courage and resilience”.`,
      },
    ],
    photos: [photo("clay-boxes", 1280, 853, "Two students presenting clay figures in a cardboard box on the wall, under a handwritten quotation", "Wartime dioramas")],
  },
  {
    id: "all-that-is-solid",
    zh: `第四章：一切坚固的都烟消云散`,
    title: `Chapter IV: All That is Solid Melts into Air`,
    works: [],
    intro: [
      {
        zh: `进入展览的最后章节《一切坚固的都烟消云散》（引于马歇尔 · 伯曼著作），观众们将跟随八年级全球历史项目“网络”单元的学生关于“互联网是否公平”讨论视频进入一个嘈杂喧嚣的空间，也步入对于当代生活的思考。`,
        en: `In the final chapter, All That is Solid Melts into Air (after the book by Marshall Berman), visitors follow a video by Grade 8 students from the Global History “Networks” unit, debating whether the internet is fair, into a noisy, clamorous space, and into reflection on contemporary life.`,
      },
    ],
    photos: [photo("chapters-3-4", 1280, 853, "Chapter III and IV wall texts beside a wall of coloured sticky notes", "Chapters III and IV")],
  },
];

const q = (zh: string, en: string, by: string): Quote => ({ zh, en, by });
const e = (en: string, by: string): Quote => ({ en, by });

/** Eileen's part of the exhibition: loneliness in quotations, gathered under five lines of her own. */
export const eileenQuotes: CatalogueEntry = {
  id: "loneliness-quotations",
  zh: `不同时期和不同人的孤独`,
  title: `Loneliness Across Times and People`,
  by: `Eileen Feng`,
  body: [],
  photos: [
    { src: `${D}ref-1.jpg`, alt: "Reference slide: words projected on a gallery floor, and a row of film stills on a wall, from Xu Bing", aspect: 1692 / 742, caption: "Reference: quotations and scenes of movies, from Xu Bing" },
    { src: `${D}ref-2.jpg`, alt: "Reference slide: a tunnel of handwritten characters, and a wall of signs above a studio desk, Xu Bing", aspect: 1642 / 694, caption: "Reference: quotations, Xu Bing" },
    { src: `${D}ref-3.jpg`, alt: "Reference slide: Tracey Emin's tent appliquéd with names", aspect: 1592 / 654, caption: "Reference: quotations, Tracey Emin, “Everyone I Have Ever Slept With”" },
    { src: `${D}ref-4.jpg`, alt: "Reference slide: a blue neon sentence by Tracey Emin, and words projected on a building at night by Jenny Holzer", aspect: 1554 / 578, caption: "Reference: quotations, Tracey Emin and Jenny Holzer" },
    { src: `${D}ref-5.jpg`, alt: "Reference slide: a video screen, the wall text “I am the curator of my own misery”, and a tower of radios in blue light", aspect: 1340 / 628, caption: "Reference: quotations, movies and music" },
  ],
  quoteGroups: [
    {
      zh: `我一个人在流淌的时间里矗立，不安将我包围`,
      en: `I stand alone in the flow of time, surrounded by unease`,
      quotes: [
        q(`人与生俱来就怀有“不安”，其实就是“忧愁”与“苦恼”。当这种“不安”没法传递给任何人，只能是自己一个人的感受时，所谓“孤独”的感觉便会油然而生。`, `Human beings are born with “unease”, which is really sorrow and distress. When this unease cannot be passed on to anyone, and can only be felt alone, the feeling we call loneliness arises.`, `斯波六郎《中国文学中的孤独感》 Shiba Rokurō, Loneliness in Chinese Literature`),
        q(`孤独感是被他人排斥时，或者说，感到被他人排斥时，又或者说，感到自己的想法无法与他人想通时的一种心理状态。也可以说这是“自我凝视”时的一种感觉。`, `Loneliness is the state of mind when one is rejected by others, or feels rejected by them, or feels that one's thoughts cannot reach theirs. It could also be called the feeling of gazing at oneself.`, `斯波六郎《中国文学中的孤独感》 Shiba Rokurō, Loneliness in Chinese Literature`),
        q(`似睡非睡，挨到日没，坐起来，心神恍惚，呆呆地直坐到古祭坛上落满黑暗然后再渐渐浮起月光，心里才有点儿明白，母亲不能再来这园中找我了。`, `Half asleep, half awake, I waited out the day until sunset. I sat up, dazed, and stayed sitting there until darkness filled the old altar and moonlight slowly rose over it again; only then did I begin to understand that my mother could no longer come to this garden to look for me.`, `史铁生《我与地坛》 Shi Tiesheng, The Temple of Earth and I`),
        q(`远方除了遥远一无所有。`, `The far-off holds nothing but its distance.`, `海子 Hai Zi`),
        q(`在这个世界上，再也没有比置身于人群之中，却又得孤独生活更可怕的事了。`, `There is nothing more terrible in this world than to be surrounded by people and yet have to live alone.`, `茨威格 Stefan Zweig`),
        q(`从童年起，我便独自一人，照顾着 历代的星辰。`, `Since childhood I have been alone, keeping watch over the stars of every age.`, `白鹤林《孤独》 Bai Helin, “Loneliness”`),
        e(`Now I know: I'm alone. I and my freedom that I don't know how to use. Great responsibility of solitude. Whoever isn't lost doesn't know freedom and love it. As for me, I own up to my solitude and that sometimes falls into ecstasy as before fireworks. I am alone and must live a certain intimate glory that in solitude can become pain. And the pain, silence. I keep its name secret. I need secrets in order to live.`, `Clarice Lispector, Água Viva`),
        e(`The soul does not know whether anything real answers its love.`, `Simone Weil, from The Soul Knows Its Hunger`),
        e(`Only in a house where one has learnt to be lonely does one have this solicitude for things. One's relation to them, the daily seeing or touching, begins to become love, and to lay one open to pain.`, `The Death of the Heart`),
        e(`Loneliness / Got a mind of its own / The more people around / The more you feel alone`, `Bob Dylan, “Marchin' to the City”`),
        e(`Maman died today. Or yesterday maybe, I don't know. I got a telegram from the home: “Mother deceased. Funeral tomorrow. Faithfully yours.” That doesn't mean anything. Maybe it was yesterday.`, `Camus, The Outsider`),
        e(`Loneliness does not come from having no people about one, but from being unable to communicate the things that seem important to oneself, or from holding certain views which others find inadmissible.`, `Carl Jung, Memories, Dreams, Reflections`),
        e(`I think loneliness probably kills more people than cancer.`, `A Simple Favor`),
        e(`In the beginning, everyone is there, but then they forget.`, `Grey's Anatomy`),
        q(`举杯邀明月，对影成三人。`, `I raise my cup to invite the bright moon; with my shadow, we make three.`, `李白 Li Bai`),
        q(`葵花很孤独，是那种一只鸟拥有万里天空而却看不见另外任何一只鸟的孤独。`, `Sunflower was lonely, with the loneliness of a bird that has ten thousand miles of sky and cannot see a single other bird.`, `曹文轩 Cao Wenxuan`),
        q(`但可惜的是，我不能看见箱子里的绵羊。也许是我有点像大人了，我肯定已经变老了。`, `But sadly, I cannot see the sheep inside the box. Perhaps I am a little like the grown-ups. I must have grown old.`, `安托万·德·圣-埃克苏佩里《小王子》 Antoine de Saint-Exupéry, The Little Prince`),
        q(`星星那么亮，是不是为了让每个人终有一天能回到自己的星球？`, `Do the stars shine so brightly so that one day each of us can find the way back to our own?`, `安托万·德·圣-埃克苏佩里《小王子》 Antoine de Saint-Exupéry, The Little Prince`),
        q(`她的孤独不是一个人的孤独，是根本没有人的孤独。`, `Her loneliness was not the loneliness of being alone, but the loneliness of there being no one at all.`, `《房思琪的初恋乐园》 Fang Si-Chi's First Love Paradise`),
      ],
    },
    {
      zh: `我和他人的情绪频率像两条平行线，永远没有相交`,
      en: `My feelings and other people's run like two parallel lines that never meet`,
      quotes: [
        q(`我想所谓孤独，就是你面对的那个人，他的情绪和你自己的情绪，不在同一个频率。`, `I think loneliness is when the person in front of you is not on the same emotional frequency as you.`, `理查德·耶茨 Richard Yates`),
        q(`每个人都很孤独。 在我们的一生中， 遇到爱、遇到性都不稀罕， 稀罕的是遇到了解。`, `Everyone is lonely. In a lifetime, meeting love or meeting desire is nothing rare; what is rare is meeting understanding.`, `廖一梅《柔软》 Liao Yimei, Soft`),
        q(`如果我不曾见到太阳，我本可忍受黑暗。可如今，太阳把我的寂寞照得更加荒凉。`, `Had I not seen the Sun / I could have borne the shade / But Light a newer Wilderness / My Wilderness has made`, `艾米莉·狄金森 Emily Dickinson`),
        q(`人类的悲欢并不相通，我只觉得他们吵闹。`, `The joys and sorrows of others are not mine to share; I only find them noisy.`, `鲁迅 Lu Xun`),
        q(`世上存在着不能流泪的悲哀，这种悲哀无法向人解释，即使解释人家也不会理解，它永远一成不变，如无风夜晚的雪花静静沉积在心底。`, `There is a sorrow in this world that cannot be wept. It cannot be explained to anyone, and even if it were, no one would understand. It stays the same forever, settling quietly at the bottom of the heart like snow on a windless night.`, `村上春树 Haruki Murakami`),
        q(`三只牛吃草，一只羊也吃草，一只羊不吃草，它看着花。`, `Three cows eat grass. One sheep eats grass too. One sheep does not eat grass; it looks at the flowers.`, `《开明国语课本》 Kaiming Chinese Reader`),
        q(`渺渺钟声出远方，依依林影万鸦藏。/一生负气成今日，四海无人对夕阳。/破碎山河迎胜利，残馀岁月送凄凉。/松门松菊何年梦，且认他乡作故乡。`, `Faint and far, a bell sounds from the distance; in the lingering shade of the woods ten thousand crows hide. / A lifetime of pride has brought me to this day; across the four seas, no one faces the setting sun with me. / Broken mountains and rivers greet the victory; the years that remain see out the desolation. / The pine gate, the pines and chrysanthemums: in what year was that dream? For now I take a stranger's land as home.`, `陈寅恪《忆故居》（民国） Chen Yinke, “Remembering My Old Home” (Republican era)`),
        q(`醒时同交欢，醉后各分散。`, `While sober we rejoice together; once drunk, we each go our own way.`, `李白 Li Bai`),
        e(`They judge me before they even know me. That's why I'm better off alone.`, `Shrek`),
        e(`I had as lief have been myself alone.`, `William Shakespeare`),
        e(`I pick roses out of water. I talk to voices in the wind. I see ghosts walk out of light.`, `Patricia A. McKillip, Winter Rose`),
        e(`We all live such distant and anonymous lives; disguised, we suffer the fate of strangers. To some, however, this distance between another being and ourselves is never revealed; to others it is revealed only every now and then, through horror or pain, lit by a limitless lightning flash; for yet others it is the one painful constant in their daily lives.`, `Fernando Pessoa, The Book of Disquiet`),
        e(`Our uniqueness makes us special, makes perception valuable — but it can also make us lonely. This loneliness is different from being ‘alone’: You can be lonely even surrounded by people. The feeling I'm talking about stems from the sense that we can never fully share the truth of who we are. I experienced this acutely at an early age.`, `Amy Tan`),
        e(`Can anybody hear me or am I talking to myself?`, `Simple Plan`),
        e(`There is nothing more lonely or terrifying than feeling unheard.`, `House of Cards`),
      ],
    },
    {
      zh: `我试图拥有我所渴望的一切，但它们总像细沙，从我的指缝中流走`,
      en: `I try to hold everything I long for, but it always runs through my fingers like fine sand`,
      quotes: [
        q(`记不清都是在它的哪些角落里了，我一连几小时专心致志地想关于死的事，也以同样的耐心和方式想过我为什么要出生。这样想了好几年，最后事情终于弄明白了：一个人，出生了，这就不再是一个可以辩论的问题，而只是上帝交给他的一个事实；上帝在交给我们这件事实的时候，已经顺便保证了它的结果，所以死是一件不必急于求成的事，死是一个必然会降临的节日。`, `I can no longer remember in which of its corners it was, but for hours on end I thought about death, and with the same patience and in the same way I thought about why I had to be born. I thought like this for several years, and at last it became clear: that a person has been born is no longer a question that can be argued; it is simply a fact handed to him by God. And in handing us this fact, God has already guaranteed its outcome. So death is not something to hurry towards; death is a festival that is sure to come.`, `史铁生《我与地坛》 Shi Tiesheng, The Temple of Earth and I`),
        q(`任何一样东西，你渴望拥有它，它就盛开。一旦你拥有它，它就凋谢。`, `Whatever you long to possess blossoms; the moment you possess it, it withers.`, `普鲁斯特《追忆逝水年华》 Marcel Proust, In Search of Lost Time`),
        q(`孤独是一座花园，但其中只有一棵树。绝望长着手指，但它只能抓住死去的蝴蝶。`, `Loneliness is a garden, but it holds only one tree. Despair has fingers, but it can only catch dead butterflies.`, `阿多尼斯《我的孤独是一座花园》 Adonis, My Loneliness Is a Garden`),
        q(`我的生命日渐疲惫，它向往无矢之舟。我爱我所不能拥有的事物，你如此遥远。我的倦意和缓慢的黄昏对峙，直到黑夜来临，我开始歌唱。`, `My life grows weary, longing for a boat without arrows. I love what I cannot have. You are so far away. My weariness stands against the slow dusk until night comes, and I begin to sing.`, `聂鲁达《二十首情诗与一首绝望的歌》 Pablo Neruda, Twenty Love Poems and a Song of Despair`),
        q(`少年去游荡，中年想掘藏，老年做和尚。`, `In youth, wander; in middle age, dig for treasure; in old age, become a monk.`, `余华《活着》 Yu Hua, To Live`),
        e(`I remember my childhood as a long wish to be elsewhere.`, `Louise Glück`),
        e(`Life is full of misery, loneliness, and suffering, and it's all over much too soon.`, `Woody Allen`),
      ],
    },
    {
      zh: `孤独是一面镜子，镜子里面有无数个我`,
      en: `Loneliness is a mirror, and in the mirror are countless versions of me`,
      quotes: [
        q(`一块孤独的石头，坐满整个天空，他说：在这一千年里，我只热爱我自己。`, `A lonely stone sits filling the whole sky. He says: in these thousand years, I have loved only myself.`, `海子《西藏》 Hai Zi, “Tibet”`),
        q(`从明天起，做一个幸福的人 /喂马、劈柴，周游世界/ 从明天起，关心粮食和蔬菜/我有一所房子，面朝大海，春暖花开`, `From tomorrow on, I will be a happy person / feed the horses, chop wood, travel the world / From tomorrow on, I will care about grain and vegetables / I have a house facing the sea, where spring is warm and flowers bloom`, `海子《面朝大海，春暖花开》 Hai Zi, “Facing the Sea, with Spring Blossoms”`),
        q(`一只船孤独地航行在海上，它既不寻求幸福，也不逃避幸福，它只是向前航行，底下是沉静碧蓝的大海，而头顶是金色的太阳。将要直面的，与已成过往的，较之深埋于它内心的，皆为微沫。`, `A boat sails alone on the sea. It neither seeks happiness nor flees from it; it simply sails on, the calm blue sea below and the golden sun above. What lies ahead and what has passed are mere foam beside what lies buried deep within it.`, `莱蒙托夫《一只孤独的船》 Mikhail Lermontov, “A Lonely Boat”`),
        e(`It is loneliness that makes the loudest noise. This is as true of men as of dogs.`, `Eric Hoffer`),
        e(`But the effect of her being on those around her was incalculably diffusive: for the growing good of the world is partly dependent on unhistoric acts; and that things are not so ill with you and me as they might have been, is half owing to the number who lived faithfully a hidden life, and rest in unvisited tombs.`, `George Eliot, Middlemarch`),
        e(`I find it wholesome to be alone the greater part of the time. To be in company, even with the best, is soon wearisome and dissipating. I love to be alone. I never found the companion that was so companionable as solitude. We are for the most part more lonely when we go abroad among men than when we stay in our chambers. A man thinking or working is always alone, let him be where he will. Solitude is not measured by the miles of space that intervene between a man and his fellows. The really diligent student in one of the crowded hives of Cambridge College is as solitary as a dervish in the desert. The farmer can work alone in the field or the woods all day, hoeing or chopping, and not feel lonesome, because he is employed; but when he comes home at night he cannot sit down in a room alone, at the mercy of his thoughts, but must be where he can “see the folks,” and recreate, and as he thinks remunerate himself for his day's solitude; and hence he wonders how the student can sit alone in the house all night and most of the day without ennui and “the blues;” but he does not realize that the student, though in the house, is still at work in his field, and chopping in his woods, as the farmer in his, and in turn seeks the same recreation and society that the latter does, though it may be a more condensed form of it.`, `Henry David Thoreau`),
        e(`Loneliness is the poverty of self; solitude is the richness of self.`, `May Sarton`),
        e(`The eternal quest of the individual human being is to shatter his loneliness.`, `Norman Cousins`),
        e(`Someday you're gonna be all alone, so you need to figure out how to take care of yourself.`, `The Queen's Gambit`),
        e(`If you meet a loner, no matter what they tell you, it's not because they enjoy solitude. It's because they have tried to blend into the world before, and people continue to disappoint them.`, `Jodi Picoult`),
        e(`A season of loneliness and isolation is when the caterpillar gets its wings. Remember that next time you feel alone.`, `Mandy Hale`),
      ],
    },
    {
      zh: `闭上眼前，我是一个人，睁开眼，整个世界只剩下我一个人`,
      en: `Before I close my eyes, I am alone; when I open them, I am the only one left in the world`,
      quotes: [
        q(`我是一个黑暗中大雪纷飞的人啊，你再不来，我要下雪了。`, `I am someone in whom heavy snow is falling in the dark. If you don't come soon, I am going to snow.`, `木心《云雀叫了一整天》 Mu Xin, The Lark Sang All Day`),
        q(`孤舟蓑笠翁，独钓寒江雪。`, `In a lone boat, an old man in a straw cape and hat fishes alone in the snow on the cold river.`, `柳宗元 Liu Zongyuan`),
        q(`今年元夜时，月与灯依旧。不见去年人，泪湿春衫袖。`, `On the Lantern Festival this year, the moon and the lanterns are as before. But last year's person is nowhere to be seen, and tears soak the sleeves of my spring robe.`, `欧阳修 Ouyang Xiu`),
        q(`君埋泉下泥销骨，我寄人间雪满头。`, `You lie beneath the springs, your bones gone to clay; I linger in this world, my head full of snow.`, `白居易 Bai Juyi`),
        q(`孤独就和发烧一样，在夜晚最盛。`, `Loneliness is like a fever: it is worst at night.`, `杜鲁门·卡波特 Truman Capote`),
        q(`该忘记的早就忘记， 该留下的永远留下。 答应我，忍住你的痛苦， 不发一言，穿过这整座城市。`, `What should be forgotten was forgotten long ago; what should stay will stay forever. Promise me: hold back your pain, say not a word, and walk through this whole city.`, `海子《太阳和野花》 Hai Zi, “The Sun and Wildflowers”`),
        e(`Can you understand being alone so long you would go out in the middle of the night and put a bucket into the well so you could feel something down there tug at the other end of the rope?`, `Jack Gilbert, “The Abandoned Valley”`),
        e(`Never in my life had I seen anyone so clearly as I saw these people; not a detail of their clothes or features escaped me. And yet I couldn't hear them, and it was hard to believe they really existed.`, `Camus`),
        e(`Look for yourself, and you will find in the long run only hatred, loneliness, despair, rage, ruin, and decay.`, `C.S. Lewis`),
        e(`We are living in dystopia, in a world that is dominated by technology and disconnect, alienation, loneliness and dysfunction.`, `Steven Wilson`),
        e(`Solitude is pleasant. Loneliness is not.`, `Anna Neagle`),
        e(`Loneliness is my least favorite thing about life. That thing that I'm most worried about is just being alone without anybody to care for or someone who will care for me.`, `Anne Hathaway`),
        e(`Music was my refuge. I could crawl into the space between the notes and curl my back to loneliness.`, `Maya Angelou`),
        e(`Pray that your loneliness may spur you into finding something to live for, great enough to die for.`, `Dag Hammarskjöld`),
        e(`The most terrible poverty is loneliness and the feeling of being unloved.`, `Mother Teresa`),
      ],
    },
    {
      quotes: [
        q(`这个世界是一扇门，/通往寂寥与苦寒的荒原。/迷失的人们啊，/你所迷失的已立于乌有之乡`, `This world is a gate / to a wasteland of silence and bitter cold. / O you who are lost, / what you have lost now stands in the land of nowhere.`, `弗里德里希·威廉·尼采《孤独之歌》 Friedrich Wilhelm Nietzsche, “Song of Loneliness”`),
      ],
    },
  ],
};

/** Candy's part of the exhibition: Nüshu, the women's script. */
export const nushu: CatalogueEntry = {
  id: "nushu",
  zh: `女书`,
  title: `Nüshu`,
  by: `Candy`,
  quote: {
    en: `“She didn't write it. She wrote it but she shouldn't have. She wrote it but look what she wrote about. She wrote it but she isn't really an artist, and it isn't really art. She wrote it but she had help. She wrote it but she's an anomaly.” — Joanna Russ`,
  },
  body: [
    {
      zh: `在历史的长河中，女性的声音往往被岁月的尘埃所掩盖。然而，女书，这门只属于女性的神秘语言，如同夜空中闪烁的星星，记录着她们的悲与苦，喜与乐。在女书的世界里，每一位女性都不再是孤岛。`,
      en: `In the long river of history, women's voices have often been buried under the dust of the years. Yet Nüshu, a mysterious script that belonged to women alone, records their sorrow and hardship, their joy and happiness, like stars shining in the night sky. In the world of Nüshu, no woman is an island any longer.`,
    },
  ],
  notes: [
    {
      zh: `天上流泪的星星`,
      title: `Weeping Stars in the Sky`,
      body: [
        {
          zh: `最后一位女书传人何艳新奶奶曾慨叹“女书是天上流泪的星星”，女书于她们而言，是记录无法开口言说的苦楚的文字载体，连结着每一座孤岛。`,
          en: `He Yanxin, the last inheritor of Nüshu, once sighed that “Nüshu is the weeping stars in the sky.” For these women, Nüshu was the written vessel for suffering they could not speak aloud, linking island to island.`,
        },
      ],
    },
    {
      zh: `“赢得结盟诸姊妹，焚香齐拜上花楼”`,
      title: `“Sworn sisters, all allied, burn incense and climb the flower tower to worship together”`,
      body: [
        {
          zh: `“结老同”：一个古老的仪式，同年出生、长相脾气相近的女孩通常结为老同。她们一生相互照顾、相互爱惜，能够推心置腹地结交为姐妹。帮助女性建立社会联系和支持网络。`,
          en: `Jie laotong (结老同, becoming “old sames”): an ancient ritual. Girls born in the same year, alike in looks and temperament, often became laotong. They cared for and cherished each other all their lives and could open their hearts to each other as sisters. It helped women build social ties and networks of support.`,
        },
        {
          zh: `女书研究者何跃娟：“只有结为老同的女性才会私下里以女书来往，分享自己的故事和心情。有时是自己村庄里的人，有时是附近其他村庄的女人。”`,
          en: `Nüshu researcher He Yuejuan: “Only women who had become laotong would write to each other privately in Nüshu, sharing their stories and feelings. Sometimes they were from the same village, sometimes from other villages nearby.”`,
        },
      ],
    },
    {
      zh: `小故事`,
      title: `A Short Story`,
      body: [
        {
          zh: `“以前的婚嫁是女性的一件大事。”今年已经 81 岁的周惠娟，居住在江永县夏湾村，作为女书传承人，她见证和经历了那个时代的女性生活。“我们这里以前有定娃娃亲的习俗，如果两家的长辈往来亲密，很多时候在女人刚出生的时候，就被定下亲家了。”古老的习俗带给女性无尽的痛苦，她们的生活被捆绑在从未见过的另外一个男人身上。而女书成为了治愈她们的良药。`,
          en: `“Marriage used to be the great event of a woman's life.” Zhou Huijuan, now 81, lives in Xiawan Village, Jiangyong County. As an inheritor of Nüshu, she witnessed and lived the lives of women in that era. “Here we used to have the custom of child betrothal. If the elders of two families were close, a girl would often be promised to the other family as soon as she was born.” The old custom brought women endless pain: their lives were bound to a man they had never met. And Nüshu became their cure.`,
        },
        {
          zh: `住在荆田村的女书自然传承人莫翠凤从传承下来的女书书信中，读到了母亲与姐妹的故事：“我妈妈的姐妹，对于家里安排的婚事不满意，她不愿意嫁给那个定了娃娃亲的男人。她在书信里问我妈妈，要不要一起逃走。我妈妈没有答应，虽然她的生活也很苦，但是她为了孩子，没有走。她的姐妹逃走后的几年，有一天回来了，坐着轿子。又写了女书给我妈妈，说：‘我回来了，当时你没有跟我一起走，我很想你，我们要再相聚。’”`,
          en: `Mo Cuifeng, a natural inheritor of Nüshu who lives in Jingtian Village, read the story of her mother and her mother's sworn sister in Nüshu letters handed down to her: “My mother's sister was unhappy with the marriage her family had arranged. She didn't want to marry the man she had been promised to as a child. In a letter she asked my mother whether they should run away together. My mother said no. Her life was hard too, but she stayed for her children. A few years after her sister ran away, she came back one day, carried in a sedan chair. She wrote to my mother in Nüshu again: ‘I'm back. You didn't come with me then, and I have missed you. We must be together again.’”`,
        },
      ],
    },
  ],
};

export const conclusion: Pair[] = [
  {
    zh: `那只奥雅吸蜜鸟知道自己是同族的最后一位吗？ 我们能否真正找到属于“同类”的人呢？这些问题永远都无法被揭晓。我们所能知的是，我们可能会感到孤独，但即使在与世隔绝的艰难困苦中，我们也并不孤单。就像最后一只奥雅吸蜜鸟，带着他二重唱的回忆，在弥留之际继续歌唱着： 我们始终向前。从史前洞穴的冰冷手印到我们掌心的温度，那些远去甚至消失的人仍与我们同在，鼓励着我们继续前行。`,
    en: `Did the Kauaʻi ʻōʻō know that he's the last one of his kind? Can we ever truly find someone who belongs to “our kind”? We will never know. What we do know is we may feel alone, but even in the crushing grind of isolation, we aren't alone. Like the last Kauaʻi ʻōʻō, who continued to sing until his final days, holding onto memories of the duet he once shared: We walk on. From cold handprints in prehistoric caves to the warmth of our palms, those who are distant or even gone are still with us, still encouraging us to walk on.`,
  },
  { en: `Reference: The Anthropocene Reviewed, by John Green` },
];
