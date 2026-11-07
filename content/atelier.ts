/**
 * THE FASHION ATELIER — content for the Fashion Show page (/collections/fashion).
 *
 * Everything here is a placeholder until real material is added. To add a
 * photograph, put the file in /public/images/fashion/ and give its slot a
 * `src` ("/images/fashion/2026-runway-01.jpg"), plus `width` and `height` in
 * pixels. Slots without `src` show their [label] as an empty frame.
 * For a video, give its slot a YouTube, Vimeo or Bilibili embed `url`.
 *
 * Nothing in this file should be invented: leave [brackets] until confirmed.
 */

export interface AtelierPhoto {
  /** Shown in the empty frame until a photo is added, e.g. "[Upload Runway Photograph]". */
  label: string;
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
  /** Shape of the empty frame: portrait, landscape or square. Ignored once src is set. */
  shape?: "portrait" | "landscape" | "square";
}

export interface AtelierVideo {
  label: string;
  /** An embed URL (YouTube, Vimeo, Bilibili). */
  url?: string;
  /** Or a video file in /public/videos/fashion/, with a still to show before it plays. */
  src?: string;
  poster?: string;
  caption?: string;
}

export interface AtelierDocument {
  label: string;
  /** A PDF or image in /public/files/fashion/, or an external link. */
  href?: string;
  note?: string;
}

export interface Person {
  name: string;
  role?: string;
}

export interface Show {
  id: string;
  year: string;
  title: string;
  theme: string;
  concept: string;
  role: string;
  /** The invitation's colour on the desk. */
  ink: "vermilion" | "blue" | "green" | "wine" | "brass";
  runway: AtelierPhoto[];
  posters: AtelierPhoto[];
  videos: AtelierVideo[];
  designers: Person[];
  models: Person[];
  volunteers?: Person[];
  backstage: AtelierPhoto[];
}

const ph = (label: string, n: number, shapes: AtelierPhoto["shape"][]): AtelierPhoto[] =>
  Array.from({ length: n }, (_, i) => ({ label, shape: shapes[i % shapes.length] }));

const showTemplate = (id: string, year: string, title: string, theme: string, ink: Show["ink"]): Show => ({
  id,
  year,
  title,
  theme,
  ink,
  concept: "[The concept behind the show: what it set out to say, and how.]",
  role: "[Your role in this show]",
  runway: ph("[Upload Runway Photograph]", 6, ["portrait", "portrait", "landscape", "portrait", "portrait", "landscape"]),
  posters: ph("[Insert Show Poster]", 2, ["portrait", "portrait"]),
  videos: [{ label: "[Add Show Video]" }],
  designers: [{ name: "[Designer name]", role: "[Collection or look]" }],
  models: [{ name: "[Model name]" }],
  backstage: ph("[Upload Backstage Photograph]", 4, ["landscape", "portrait", "portrait", "landscape"]),
});

/** The five shows, oldest first: years and themes as Eileen gave them. */
export const shows: Show[] = [
  {
    ...showTemplate("2023", "2023", "Bionic", "Bionic", "blue"),
    concept: "This year, our chosen theme for the show is Bionic. The Bionic theme embodies the fusion of biology and technology, resulting in innovative designs inspired by nature.",
    role: "Designer and show director (coordinator)",
    runway: [
      { label: "A model with pink hair walks the runway in a silver, white and pale blue gown, holding a clear sculpted orb", src: "/images/fashion/2023/bionic-04.jpg", width: 1116, height: 1800, alt: "A model with pink hair walks the runway in a silver, white and pale blue gown, holding a clear sculpted orb", caption: "Photo: Shenzhen Nanshan Huitong School" },
      { label: "A model walks the runway in a grey double-breasted jacket painted with white swirls and blue-and-white trousers, with goggles on his head", src: "/images/fashion/2023/bionic-07.jpg", width: 1067, height: 1600, alt: "A model walks the runway in a grey double-breasted jacket painted with white swirls and blue-and-white trousers, with goggles on his head" },
      { label: "The same look on the runway, beside a screen showing the design", src: "/images/fashion/2023/bionic-06.jpg", width: 1160, height: 1800, alt: "The same look on the runway, beside a screen showing the design", caption: "Photo: Shenzhen Nanshan Huitong School" },
      { label: "The pink-haired model in the silver gown with a skeleton hand at the shoulder, holding the clear orb", src: "/images/fashion/2023/bionic-03.jpg", width: 1800, height: 1200, alt: "The pink-haired model in the silver gown with a skeleton hand at the shoulder, holding the clear orb", caption: "Photo: Shenzhen Nanshan Huitong School" },
      { label: "A model in a black jacket painted with eyes and set with mirrored discs, over a pale blue dress", src: "/images/fashion/2023/bionic-05.jpg", width: 1800, height: 1200, alt: "A model in a black jacket painted with eyes and set with mirrored discs, over a pale blue dress", caption: "Photo: Shenzhen Nanshan Huitong School" },
      { label: "A look photographed from the side: a clear umbrella painted with black eyes, a black jacket and a layered white and grey skirt", src: "/images/fashion/2023/bionic-02.jpg", width: 1200, height: 1800, alt: "A look photographed from the side: a clear umbrella painted with black eyes, a black jacket and a layered white and grey skirt" },
      { label: "The eye-painted jacket photographed through a wet glass, in blue, red and yellow light", src: "/images/fashion/2023/bionic-01.jpg", width: 1350, height: 1800, alt: "The eye-painted jacket photographed through a wet glass, in blue, red and yellow light" },
    ],
    posters: [
      { label: "Banner for Bionic 仿生, 2023 Huitong Fashion Show 荟同时装秀, 9 June, 5:30–6:30, over a photograph of a jellyfish", src: "/images/fashion/2023/bionic-08.jpg", width: 1600, height: 600, alt: "Banner for Bionic 仿生, 2023 Huitong Fashion Show 荟同时装秀, 9 June, 5:30–6:30, over a photograph of a jellyfish" },
    ],
    designers: [
      { name: "Eileen 冯洁琳", role: "Models: Aevine, Chloe, Mr. Hawkins" },
      { name: "Coco 何思妍", role: "Models: Alice, Eurus, Mr. Matt" },
      { name: "Rena 张若曦", role: "Models: Roy, Jasmine" },
      { name: "Jasmine 吴可辛", role: "Models: Claire" },
      { name: "Yolanda 甘钰涵", role: "Models: Sally, Yolanda" },
      { name: "Dora 王淼", role: "Models: Yuanyuan" },
      { name: "Ma.gao", role: "Models: Stephanie, Mindee" },
      { name: "Constan 曾情", role: "Models: Jenny" },
    ],
    models: [
      { name: "Aevine 孙艾文" },
      { name: "Chloe 黄卓君" },
      { name: "Mr. Hawkins" },
      { name: "Alice 梁诗媛" },
      { name: "Eurus 毛馨可" },
      { name: "Mr. Matt" },
      { name: "Roy 罗紫睿" },
      { name: "Jasmine 桂洪茉" },
      { name: "Claire 王梓棋" },
      { name: "Sally 胡馨予" },
      { name: "Yolanda 甘钰涵" },
      { name: "Yuanyuan" },
      { name: "Stephanie 张嘉妤" },
      { name: "Mindee 涂静怡" },
      { name: "Jenny 田一涵" },
    ],
    volunteers: [
      { name: "Emily 王燰綝" },
      { name: "Cecilia 姚年伈" },
      { name: "Joyce 黄乐之" },
      { name: "Spring 朱春天" },
      { name: "Janie 席圆圆" },
    ],
    videos: [
      { label: "Bionic trailer", src: "/videos/fashion/bionic-2023-trailer.mp4", poster: "/videos/fashion/bionic-2023-trailer-poster.jpg", caption: "Trailer" },
      { label: "Bionic show video", src: "/videos/fashion/bionic-2023.mp4", poster: "/videos/fashion/bionic-2023-poster.jpg" },
    ],
    backstage: [
      { label: "Presenting the 2023 Huitong Fashion Show super curriculum project to a table of teachers", src: "/images/fashion/2023/process-p14.jpg", width: 1600, height: 1200, alt: "Presenting the 2023 Huitong Fashion Show super curriculum project to a table of teachers" },
      { label: "Ink sketch of a ruffled gown in a notebook, labelled “the waves chapter 1”, with fishbowls marked glitter and slime", src: "/images/fashion/2023/process-p02.jpg", width: 1200, height: 1600, alt: "Ink sketch of a ruffled gown in a notebook, labelled “the waves chapter 1”, with fishbowls marked glitter and slime" },
      { label: "Notebook spread: handwritten text beside an ink sketch labelled chapter 1, with notes on fins", src: "/images/fashion/2023/process-p03.jpg", width: 1600, height: 1600, alt: "Notebook spread: handwritten text beside an ink sketch labelled chapter 1, with notes on fins" },
      { label: "Pencil studies labelled wood, fire, eyes, emotions and bubbles", src: "/images/fashion/2023/process-p04.jpg", width: 1600, height: 1600, alt: "Pencil studies labelled wood, fire, eyes, emotions and bubbles" },
      { label: "Oil pastel study of swirling blues, turquoise and yellow", src: "/images/fashion/2023/process-p06.jpg", width: 1440, height: 1432, alt: "Oil pastel study of swirling blues, turquoise and yellow" },
      { label: "Glass cabochons hand-painted in blues, black and white, laid out on calico", src: "/images/fashion/2023/process-p09.jpg", width: 900, height: 1600, alt: "Glass cabochons hand-painted in blues, black and white, laid out on calico" },
      { label: "The grey double-breasted jacket on a dress form in the studio, before decoration", src: "/images/fashion/2023/process-p10.jpg", width: 1200, height: 1600, alt: "The grey double-breasted jacket on a dress form in the studio, before decoration" },
      { label: "Working on the grey jacket with a teacher in the studio", src: "/images/fashion/2023/process-p11.jpg", width: 1200, height: 1600, alt: "Working on the grey jacket with a teacher in the studio" },
      { label: "The grey jacket on the form with painted sequins and ceramic chips along the lapels", src: "/images/fashion/2023/process-p16.jpg", width: 1200, height: 1600, alt: "The grey jacket on the form with painted sequins and ceramic chips along the lapels" },
      { label: "The black jacket on a dress form, painted with eyes and set with glass cabochons", src: "/images/fashion/2023/process-p12.jpg", width: 1200, height: 1600, alt: "The black jacket on a dress form, painted with eyes and set with glass cabochons" },
      { label: "Draping white organza and fabric over the black jacket on the form", src: "/images/fashion/2023/process-p15.jpg", width: 1200, height: 1600, alt: "Draping white organza and fabric over the black jacket on the form" },
      { label: "Torn tulle and silver satin bound with white cord, close up", src: "/images/fashion/2023/process-p13.jpg", width: 1200, height: 1600, alt: "Torn tulle and silver satin bound with white cord, close up" },
      { label: "Mesh tubing wrapped in blue and turquoise yarn, close up", src: "/images/fashion/2023/process-p05.jpg", width: 1280, height: 1600, alt: "Mesh tubing wrapped in blue and turquoise yarn, close up" },
      { label: "The clear orb decorated with mirror pieces, yarn, beads and sequins", src: "/images/fashion/2023/process-p07.jpg", width: 1200, height: 1600, alt: "The clear orb decorated with mirror pieces, yarn, beads and sequins" },
      { label: "A white skeleton hand wired onto black satin and mirrored strips, close up", src: "/images/fashion/2023/process-p01.jpg", width: 900, height: 1600, alt: "A white skeleton hand wired onto black satin and mirrored strips, close up" },
      { label: "The finished silver, white and blue gown on a dress form, with its train and the orb", src: "/images/fashion/2023/process-p08.jpg", width: 1200, height: 1600, alt: "The finished silver, white and blue gown on a dress form, with its train and the orb" },
      { label: "The studio mirror and inspiration wall, in thermal-style colours", src: "/images/fashion/2023/process-p18.jpg", width: 1200, height: 1600, alt: "The studio mirror and inspiration wall, in thermal-style colours" },
      { label: "A blurred, motion-streaked portrait", src: "/images/fashion/2023/process-p17.jpg", width: 1200, height: 1600, alt: "A blurred, motion-streaked portrait" },
      { label: "The model in the silver look sitting outdoors under a red and white umbrella", src: "/images/fashion/2023/bionic-09.jpg", width: 1350, height: 1800, alt: "The model in the silver look sitting outdoors under a red and white umbrella" },
      { label: "The model in the silver look sitting on the grass in front of a chalk-covered wall", src: "/images/fashion/2023/bionic-10.jpg", width: 1179, height: 1519, alt: "The model in the silver look sitting on the grass in front of a chalk-covered wall" },
    ],
  },
  {
    ...showTemplate("2024", "2024", "Utopia", "Utopia", "green"),
    runway: [
      { label: "A model on the runway in a white gown with lilies, a ruffled sleeve and a veil, under a gold halo crown set with crosses and pearls", src: "/images/fashion/2024/utopia-29.jpg", width: 723, height: 1086, alt: "A model on the runway in a white gown with lilies, a ruffled sleeve and a veil, under a gold halo crown set with crosses and pearls", caption: "Photo: Shenzhen Nanshan Huitong School" },
      { label: "The rose cage gown on the runway: a black veil and lace over a white skirt, the cage wound with black leaves and blue roses, carrying a black bouquet", src: "/images/fashion/2024/utopia-30.jpg", width: 724, height: 1086, alt: "The rose cage gown on the runway: a black veil and lace over a white skirt, the cage wound with black leaves and blue roses, carrying a black bouquet", caption: "Photo: Shenzhen Nanshan Huitong School" },
      { label: "The rose cage gown, raising the black bouquet with a red rose beneath the veil", src: "/images/fashion/2024/utopia-32.jpg", width: 724, height: 1086, alt: "The rose cage gown, raising the black bouquet with a red rose beneath the veil", caption: "Photo: Shenzhen Nanshan Huitong School" },
      { label: "The rose cage gown under a spotlight, holding the bouquet", src: "/images/fashion/2024/utopia-35.jpg", width: 1086, height: 724, alt: "The rose cage gown under a spotlight, holding the bouquet" },
      { label: "Designers, models and guests together in front of the UTOPIA 乌托邦 banner", src: "/images/fashion/2024/utopia-36.jpg", width: 1086, height: 724, alt: "Designers, models and guests together in front of the UTOPIA 乌托邦 banner", caption: "Photo: Shenzhen Nanshan Huitong School" },
      { label: "The finale: the models in their looks in front of the banner, under falling confetti", src: "/images/fashion/2024/utopia-38.jpg", width: 1092, height: 720, alt: "The finale: the models in their looks in front of the banner, under falling confetti", caption: "Photo: Shenzhen Nanshan Huitong School" },
    ],
    posters: [
      { label: "Invitation: UTOPIA 乌托邦, Huitong Fashion Show 荟同时装秀, 2024.5.17, 6:00–7:00 pm, Venue: Shenzhen Huitong School 深圳荟同学校, with butterflies over flowing white lines", src: "/images/fashion/2024/utopia-37.jpg", width: 665, height: 1182, alt: "Invitation: UTOPIA 乌托邦, Huitong Fashion Show 荟同时装秀, 2024.5.17, 6:00–7:00 pm, Venue: Shenzhen Huitong School 深圳荟同学校, with butterflies over flowing white lines" },
      { label: "Title card: “So long” handwritten in white over leaves in black and white", src: "/images/fashion/2024/utopia-27.jpg", width: 576, height: 323, alt: "Title card: “So long” handwritten in white over leaves in black and white" },
      { label: "Title card: “Tears of the Virgin” over branches against a blue sky", src: "/images/fashion/2024/utopia-28.jpg", width: 1280, height: 720, alt: "Title card: “Tears of the Virgin” over branches against a blue sky" },
    ],
    backstage: [
      { label: "Moodboard signed Eileen Emily: a weeping stone statue holding a skull, grey and black roses, a woman in a spiked halo and veil, black ruffled gothic dresses, torn parchment, flowers and a misty graveyard", src: "/images/fashion/2024/utopia-11.jpg", width: 1024, height: 769, alt: "Moodboard signed Eileen Emily: a weeping stone statue holding a skull, grey and black roses, a woman in a spiked halo and veil, black ruffled gothic dresses, torn parchment, flowers and a misty graveyard" },
      { label: "Pencil sketch of a veiled gown, labelled “mask”", src: "/images/fashion/2024/utopia-01.jpg", width: 1080, height: 1058, alt: "Pencil sketch of a veiled gown, labelled “mask”" },
      { label: "Ink and watercolour veiled gown with red roses, green lily pads and blue eyes", src: "/images/fashion/2024/utopia-02.jpg", width: 900, height: 1600, alt: "Ink and watercolour veiled gown with red roses, green lily pads and blue eyes" },
      { label: "Pencil sketch of a gown with lacing and a halo headdress, noted 金色头冠", src: "/images/fashion/2024/utopia-03.jpg", width: 1200, height: 1600, alt: "Pencil sketch of a gown with lacing and a halo headdress, noted 金色头冠" },
      { label: "Close up of the coloured roses and lily pads", src: "/images/fashion/2024/utopia-04.jpg", width: 1600, height: 1600, alt: "Close up of the coloured roses and lily pads" },
      { label: "Close up of the halo figure in grey wash", src: "/images/fashion/2024/utopia-05.jpg", width: 1600, height: 1600, alt: "Close up of the halo figure in grey wash" },
      { label: "Sketchbook page: the halo gown, a winged skirt and pearl bags, with notes on Mucha, Art Nouveau and 花→纱制花朵", src: "/images/fashion/2024/utopia-06.jpg", width: 1200, height: 1600, alt: "Sketchbook page: the halo gown, a winged skirt and pearl bags, with notes on Mucha, Art Nouveau and 花→纱制花朵" },
      { label: "The halo gown with a dotted cape, roses and a rose-wrapped cross", src: "/images/fashion/2024/utopia-07.jpg", width: 1200, height: 1600, alt: "The halo gown with a dotted cape, roses and a rose-wrapped cross" },
      { label: "The veiled “mask” gown, with notes: Ophelia, Bride, Roses vine, Fire, Toe shoes", src: "/images/fashion/2024/utopia-08.jpg", width: 1600, height: 1600, alt: "The veiled “mask” gown, with notes: Ophelia, Bride, Roses vine, Fire, Toe shoes" },
      { label: "Close up of the flower skirt in grey wash", src: "/images/fashion/2024/utopia-09.jpg", width: 1600, height: 1600, alt: "Close up of the flower skirt in grey wash" },
      { label: "The full halo gown in wash, with notes on Mucha and Art Nouveau", src: "/images/fashion/2024/utopia-10.jpg", width: 1600, height: 1600, alt: "The full halo gown in wash, with notes on Mucha and Art Nouveau" },
      { label: "The gown on a dress form in the studio: black corset over a white skirt, inside a black cage wound with dark roses and leaves, with a sign reading “切勿!! Pls Don't MOVE :)”", src: "/images/fashion/2024/utopia-12.jpg", width: 768, height: 1024, alt: "The gown on a dress form in the studio: black corset over a white skirt, inside a black cage wound with dark roses and leaves, with a sign reading “切勿!! Pls Don't MOVE :)”" },
      { label: "Black and white close up of the cage, with roses, leaves and white strands wound around its hoops", src: "/images/fashion/2024/utopia-13.jpg", width: 665, height: 1182, alt: "Black and white close up of the cage, with roses, leaves and white strands wound around its hoops" },
      { label: "Close up of a grey rose on the cage, over sculpted white fabric dripping with black and white", src: "/images/fashion/2024/utopia-14.jpg", width: 768, height: 1024, alt: "Close up of a grey rose on the cage, over sculpted white fabric dripping with black and white" },
      { label: "Detail of the grey rose, black-painted leaves and white strands", src: "/images/fashion/2024/utopia-15.jpg", width: 768, height: 1024, alt: "Detail of the grey rose, black-painted leaves and white strands" },
      { label: "Close up of the sculpted, glossy white fabric with grey honeycomb texture", src: "/images/fashion/2024/utopia-16.jpg", width: 1200, height: 1600, alt: "Close up of the sculpted, glossy white fabric with grey honeycomb texture" },
      { label: "The cage skirt with its silver fabric, black leaves and a rose, in the studio", src: "/images/fashion/2024/utopia-17.jpg", width: 540, height: 360, alt: "The cage skirt with its silver fabric, black leaves and a rose, in the studio" },
      { label: "A sheer screen in the atrium showing a white robot holding a glowing blue brain, between the Chinese and Australian flags", src: "/images/fashion/2024/utopia-18.jpg", width: 640, height: 360, alt: "A sheer screen in the atrium showing a white robot holding a glowing blue brain, between the Chinese and Australian flags" },
      { label: "In the studio beside a gown with white and grey organza rosettes and a pleated white sleeve", src: "/images/fashion/2024/utopia-19.jpg", width: 1086, height: 724, alt: "In the studio beside a gown with white and grey organza rosettes and a pleated white sleeve" },
      { label: "Students fitting garments on dress forms in the studio", src: "/images/fashion/2024/utopia-20.jpg", width: 1086, height: 724, alt: "Students fitting garments on dress forms in the studio" },
      { label: "Measuring and cutting at the worktable, with wire, glue and tulle", src: "/images/fashion/2024/utopia-21.jpg", width: 1086, height: 724, alt: "Measuring and cutting at the worktable, with wire, glue and tulle" },
      { label: "Trimming a pleated coral-red panel in the studio", src: "/images/fashion/2024/utopia-22.jpg", width: 1086, height: 724, alt: "Trimming a pleated coral-red panel in the studio" },
      { label: "Ruling lines on calico by the window", src: "/images/fashion/2024/utopia-23.jpg", width: 1086, height: 724, alt: "Ruling lines on calico by the window" },
      { label: "Cutting a long length of pleated white fabric", src: "/images/fashion/2024/utopia-24.jpg", width: 1086, height: 724, alt: "Cutting a long length of pleated white fabric" },
      { label: "Pinning pleated white fabric on a dress form", src: "/images/fashion/2024/utopia-25.jpg", width: 1086, height: 724, alt: "Pinning pleated white fabric on a dress form" },
      { label: "Shaping a pleated white ruffle on a dress form", src: "/images/fashion/2024/utopia-26.jpg", width: 1086, height: 724, alt: "Shaping a pleated white ruffle on a dress form" },
      { label: "A live music performance at the show, with singers at the microphones and the audience gathered round", src: "/images/fashion/2024/utopia-31.jpg", width: 1086, height: 724, alt: "A live music performance at the show, with singers at the microphones and the audience gathered round" },
      { label: "A selfie of two friends in black T-shirts", src: "/images/fashion/2024/utopia-33.jpg", width: 1200, height: 1600, alt: "A selfie of two friends in black T-shirts" },
      { label: "A selfie with friends at the show", src: "/images/fashion/2024/utopia-34.jpg", width: 768, height: 1024, alt: "A selfie with friends at the show" },
    ],
  },
  showTemplate("2025", "2025", "Memory", "Memory", "wine"),
  showTemplate("2026", "2026", "Identity", "Identity", "vermilion"),
  showTemplate("2027", "2027", "In the Mood for…", "In the Mood for…", "brass"),
];

export interface SketchbookSpread {
  title: string;
  /** Your handwritten-style note for the page. */
  note: string;
  slots: AtelierPhoto[];
}

export const designSketchbook: SketchbookSpread[] = [
  { title: "Initial Ideas", note: "[First thoughts, words and references.]", slots: [
      { label: "Pencil studies of hanging forms labelled wood, wind, eyes, emotion, water, fire, cloud and fish × water", src: "/images/fashion/process/a06.jpg", width: 1200, height: 1800, alt: "Pencil studies of hanging forms labelled wood, wind, eyes, emotion, water, fire, cloud and fish × water" },
      { label: "Quick sketch on black: coral-pink hand shapes over blue wave lines, with the word “coral”", src: "/images/fashion/process/a07.jpg", width: 528, height: 792, alt: "Quick sketch on black: coral-pink hand shapes over blue wave lines, with the word “coral”" },
      { label: "Quick sketch on black: a figure in teal and red hatching with green flowing shapes", src: "/images/fashion/process/a08.jpg", width: 528, height: 792, alt: "Quick sketch on black: a figure in teal and red hatching with green flowing shapes" },
      { label: "Quick sketch on black: a figure in magenta and teal ruffles", src: "/images/fashion/process/a09.jpg", width: 528, height: 792, alt: "Quick sketch on black: a figure in magenta and teal ruffles" },
      { label: "Quick sketch on black: a figure with orange and green sunburst shoulders", src: "/images/fashion/process/a10.jpg", width: 528, height: 792, alt: "Quick sketch on black: a figure with orange and green sunburst shoulders" },
      { label: "Quick sketch on black: a figure wrapped in yellow coils and green and blue strokes", src: "/images/fashion/process/a12.jpg", width: 528, height: 792, alt: "Quick sketch on black: a figure wrapped in yellow coils and green and blue strokes" },
      { label: "Quick sketch on black: a figure in white lines with purple circles", src: "/images/fashion/process/a14.jpg", width: 528, height: 792, alt: "Quick sketch on black: a figure in white lines with purple circles" },
      { label: "Quick sketch on black: a figure in green, teal and pink loops", src: "/images/fashion/process/a27.jpg", width: 1200, height: 1800, alt: "Quick sketch on black: a figure in green, teal and pink loops" },
      { label: "Quick sketch on black: a figure in green coils and hatching", src: "/images/fashion/process/a28.jpg", width: 528, height: 792, alt: "Quick sketch on black: a figure in green coils and hatching" },
    ] },
  { title: "Moodboards", note: "[What the moodboard was gathering toward.]", slots: [
      { label: "Moodboard: white ruffles, lilies, a baroque altar, stained glass, weeping Madonnas and pearls, circled in red", src: "/images/fashion/process/a04.jpg", width: 1800, height: 1349, alt: "Moodboard: white ruffles, lilies, a baroque altar, stained glass, weeping Madonnas and pearls, circled in red" },
      { label: "Moodboard in pink: a lace party-hat cake, pearls, stars, candles, carnival costumes and a rose garden", src: "/images/fashion/process/a13.jpg", width: 1800, height: 1349, alt: "Moodboard in pink: a lace party-hat cake, pearls, stars, candles, carnival costumes and a rose garden" },
      { label: "Moodboard collage of eyes, irises and figures in grey suits", src: "/images/fashion/process/a29.jpg", width: 1800, height: 1349, alt: "Moodboard collage of eyes, irises and figures in grey suits" },
    ] },
  { title: "Fashion Illustrations", note: "[About these illustrations.]", slots: [
      { label: "A figure in white line loops scattered with blue bubbles, on black", src: "/images/fashion/process/a01.jpg", width: 528, height: 792, alt: "A figure in white line loops scattered with blue bubbles, on black" },
      { label: "A dress shaped like an apple core, with green vines trailing down the legs", src: "/images/fashion/process/a02.jpg", width: 1200, height: 1800, alt: "A dress shaped like an apple core, with green vines trailing down the legs" },
      { label: "A figure in translucent blue and white with a curling tail, titled “Dolphin”", src: "/images/fashion/process/a16.jpg", width: 1200, height: 1800, alt: "A figure in translucent blue and white with a curling tail, titled “Dolphin”" },
      { label: "A figure in blue and white swirls standing on white ripples", src: "/images/fashion/process/a19.jpg", width: 1200, height: 1800, alt: "A figure in blue and white swirls standing on white ripples" },
      { label: "A figure in a long cream and dark garment with white flowing lines on a grey shape", src: "/images/fashion/process/a20.jpg", width: 1200, height: 1800, alt: "A figure in a long cream and dark garment with white flowing lines on a grey shape" },
      { label: "A figure wrapped in a large blue and red anatomical heart", src: "/images/fashion/process/a21.jpg", width: 1200, height: 1800, alt: "A figure wrapped in a large blue and red anatomical heart" },
      { label: "A figure in a brown top with blue and red vein-like ribbons and a white ruffled skirt", src: "/images/fashion/process/a22.jpg", width: 1200, height: 1800, alt: "A figure in a brown top with blue and red vein-like ribbons and a white ruffled skirt" },
      { label: "A figure in a metallic gold dress with green panels on a grey shape", src: "/images/fashion/process/a23.jpg", width: 1200, height: 1800, alt: "A figure in a metallic gold dress with green panels on a grey shape" },
      { label: "A figure in a gold and cream dress, with a small detail drawing", src: "/images/fashion/process/a25.jpg", width: 1200, height: 1800, alt: "A figure in a gold and cream dress, with a small detail drawing" },
      { label: "A figure in blue draped fabric with handwritten notes", src: "/images/fashion/process/a26.jpg", width: 1200, height: 1800, alt: "A figure in blue draped fabric with handwritten notes" },
    ] },
  { title: "Design Development", note: "[How the designs changed.]", slots: [
      { label: "Pencil and red-line sketch of a long gown with flowers and a halo, with the note “Tears”", src: "/images/fashion/process/a03.jpg", width: 1200, height: 1800, alt: "Pencil and red-line sketch of a long gown with flowers and a halo, with the note “Tears”" },
      { label: "Pencil sketch of a long layered gown with a sunburst halo and flowers", src: "/images/fashion/process/a11.jpg", width: 1349, height: 1800, alt: "Pencil sketch of a long layered gown with a sunburst halo and flowers" },
      { label: "A long dark coat with blue lapels and white wave lines, with handwritten notes, for “Dolphins”", src: "/images/fashion/process/a05.jpg", width: 528, height: 792, alt: "A long dark coat with blue lapels and white wave lines, with handwritten notes, for “Dolphins”" },
      { label: "A figure in a pale green draped dress with branch-like lines, on grey", src: "/images/fashion/process/a24.jpg", width: 1200, height: 1800, alt: "A figure in a pale green draped dress with branch-like lines, on grey" },
      { label: "Design sheet “A Pineapple with the Ocean”: five looks with notes on pineapple, puffer fish and coral", src: "/images/fashion/process/a15.jpg", width: 1800, height: 1272, alt: "Design sheet “A Pineapple with the Ocean”: five looks with notes on pineapple, puffer fish and coral" },
    ] },
  { title: "Final Looks", note: "[The finished looks.]", slots: ph("[Add Final Look]", 3, ["portrait", "portrait", "portrait"]) },
];

export interface GallerySection {
  id: string;
  title: string;
  note?: string;
  photos: AtelierPhoto[];
}

export const backstage: GallerySection[] = [
  { id: "rehearsals", title: "Rehearsals", photos: ph("[Upload Backstage Photograph]", 4, ["landscape", "portrait", "portrait", "landscape"]) },
  { id: "fittings", title: "Fittings", photos: ph("[Upload Backstage Photograph]", 3, ["portrait", "landscape", "portrait"]) },
  { id: "hair-makeup", title: "Hair & Makeup", photos: ph("[Upload Backstage Photograph]", 3, ["portrait", "portrait", "square"]) },
  { id: "preparation", title: "Backstage Preparation", photos: ph("[Upload Backstage Photograph]", 4, ["landscape", "portrait", "landscape", "portrait"]) },
  { id: "team", title: "Team Moments", photos: ph("[Upload Backstage Photograph]", 3, ["landscape", "square", "portrait"]) },
  { id: "show-day", title: "Show Day", photos: ph("[Upload Backstage Photograph]", 4, ["portrait", "landscape", "portrait", "portrait"]) },
];

export interface ProductionChapter {
  id: string;
  title: string;
  /** A short note in your own words. */
  note: string;
  documents: AtelierDocument[];
  photos: AtelierPhoto[];
}

const chapter = (id: string, title: string): ProductionChapter => ({
  id,
  title,
  note: "[A few lines on this part of the work.]",
  documents: [{ label: "[Add Production Document]" }, { label: "[Add Production Document]" }],
  photos: ph("[Upload Photograph]", 2, ["landscape", "portrait"]),
});

export const production: ProductionChapter[] = [
  chapter("creative-planning", "Creative Planning"),
  chapter("recruitment", "Recruitment"),
  chapter("team-coordination", "Team Coordination"),
  chapter("scheduling", "Scheduling"),
  chapter("rehearsals", "Rehearsals"),
  chapter("stage-runway", "Stage & Runway Planning"),
  chapter("show-day", "Show-Day Production"),
];

export interface Look {
  number: number;
  photo: AtelierPhoto;
  designer: string;
  model?: string;
  show?: string;
  description?: string;
}

export const runway: { videos: AtelierVideo[]; looks: Look[] } = {
  videos: [{ label: "[Add Fashion Show Video]" }],
  looks: Array.from({ length: 8 }, (_, i) => ({
    number: i + 1,
    photo: { label: "[Upload Runway Photograph]", shape: i % 4 === 3 ? "landscape" : "portrait" },
    designer: "[Designer]",
    description: undefined,
  })),
};
