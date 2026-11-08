import type { ImageAsset } from "@/lib/types";

/**
 * ART — the Artist's Sketchbook.
 * One entry per page, in order. Each work on a page is placed by its centre
 * (x / y in % of the page), its width (% of the page) and a slight rotation,
 * so works of any size and orientation can share a page. `image.aspect`
 * (width / height) decides the shape. Add `src` to show the real work.
 * Everything with `placeholder: true` is a labelled stand-in.
 */
export interface Artwork {
  id: string;
  title: string;
  medium?: string;
  year?: string;
  /** A link shown in the work's dialog (e.g. a film). */
  link?: { href: string; label: string };
  /** Written under the work on the page (defaults to the title). */
  caption?: string;
  /** One string, or several paragraphs. */
  description?: string | string[];
  image: ImageAsset;
  placeholder?: boolean;
}

export interface PlacedWork {
  work: Artwork;
  at: { x: number; y: number; w: number; rot: number };
  /** How it is fixed to the page. */
  fix?: "tape" | "corners" | "clip" | "none";
}

export interface SketchbookPage {
  works: PlacedWork[];
  /** A heading written at the top of the page (e.g. the series it begins). */
  heading?: string;
  /** An epigraph written under the heading. */
  quote?: { text: string; source?: string };
}

export const sketchbook: SketchbookPage[] = [
  {
    heading: "The Seven Deadly Sins",
    works: [
      {
        work: { id: "board-confession-and-sins", title: "Confession & Sins", caption: "Confession & Sins: research board", image: { src: "/images/art/process/confession-and-sins.jpg", alt: "Research board titled Confession and Sins: a confessional painting, Bosch’s Seven Deadly Sins table, pomegranates, still lifes, jewels and bridal portraits, with pencil sketches and handwritten notes on lust, gluttony and greed", aspect: 2000 / 1499 } },
        at: { x: 50, y: 60, w: 86, rot: -1.5 },
        fix: "corners",
      },
    ],
  },
  // Acedia (sloth), 2026: two historical images, then her own work.
  {
    heading: "Acedia",
    quote: { text: "“The soul of the sluggard craves and gets nothing, while the soul of the diligent is richly supplied.”", source: "Proverbs 13:4" },
    works: [
      {
        work: {
          id: "acedia-wierix",
          title: "Acedia",
          caption: "Acedia, Hieronymus (Jerome) Wierix",
          medium: "Engraving, by Hieronymus (Jerome) Wierix",
          description:
            "In Catholic tradition, sloth (acedia) is not mere laziness but a spiritual failure to love God fully. First articulated by the Desert Fathers, such as Evagrius Ponticus, as the “noonday demon,” it described a restless apathy that distanced the soul from divine purpose. Later, Thomas Aquinas defined it as sorrow or indifference toward spiritual good. As one of the Seven Deadly Sins formalised by Pope Gregory I, sloth represents not inactivity, but a refusal of spiritual engagement: a quiet withdrawal from grace and meaning.",
          image: { src: "/images/art/acedia/wierix.jpg", alt: "Engraving titled ACEDIA: a young woman resting her sleeping head on her hand inside an oval frame, with sleeping putti in the corners", aspect: 864 / 1200 },
        },
        at: { x: 50, y: 63, w: 44, rot: -2 },
        fix: "corners",
      },
    ],
  },
  {
    works: [
      {
        work: {
          id: "acedia-bosch",
          title: "Acedia",
          caption: "Acedia in The Seven Deadly Sins and the Four Last Things, by Hieronymus Bosch",
          medium: "Detail of The Seven Deadly Sins and the Four Last Things, by Hieronymus Bosch",
          description: [
            "Sloth is a state of stagnation, and stagnation is often born from fear—not the fear of action itself, but of what action might reveal. To move forward is to risk failure, exposure, or change; to remain still is to avoid that confrontation. In this sense, sloth becomes a quiet defence mechanism, where inaction protects the self from uncertainty. What appears as apathy may in fact be a concealed anxiety, a reluctance to engage with a world that demands response. Stagnation, then, is not empty, but filled with an unspoken fear of consequence.",
            "For me, the stagnation brought by sloth is not a freezing of time, but a more cruel form of acceleration. As the will gradually loosens and action is indefinitely deferred, time does not wait; instead, it slips away more rapidly in silence, pushing the individual toward an irreversible process of depletion and eventual end. This stagnation is not stillness, but a passive descent—in inaction, life is slowly drained away.",
          ],
          image: { src: "/images/art/acedia/bosch.jpg", alt: "Painted scene labelled Accidia: a man dozing in a chair by the fire while a nun holds out a rosary to him, a dog asleep on the floor", aspect: 562 / 453 },
        },
        at: { x: 50, y: 46, w: 74, rot: 1.5 },
        fix: "tape",
      },
    ],
  },
  {
    works: [
      {
        work: {
          id: "acedia-eileen-feng",
          title: "Acedia",
          caption: "Acedia, Eileen Feng, 2026",
          medium: "Eileen Feng",
          year: "2026",
          description: [
            "I translate this contradiction into visual symbols: a continuously running clock is embedded within an already fractured skull. Time proceeds with precision and indifference, yet the subject that contains it has already collapsed. Consciousness is no longer the force that governs time, but becomes a vessel eroded by it. The cracks signify not only physical breakage, but also the disintegration of the psyche and the loosening of the sense of self.",
            "The once vivid red flowers gradually lose their colour, fading into withered tones of grey and purple, symbolising the diminishing of vitality and desire. Thorns entangle them—not merely as external obstacles, but as an internalised restraint. In the absence of action, the individual becomes trapped by their own inertia and fear, unable to break free. The image, therefore, does not simply point toward death as an endpoint, but presents a process: as time continues to move, life is hollowed out, ultimately leading to a silent dissolution.",
          ],
          image: { src: "/images/art/acedia/acedia-eileen-feng.jpg", alt: "Acedia by Eileen Feng: a cracked skull with a pocket watch set into it, crowned with fading grey and purple roses and thorns, under cobwebs, with the Proverbs line written below", aspect: 994 / 1488 },
        },
        at: { x: 50, y: 47, w: 52, rot: -1.5 },
        fix: "tape",
      },
    ],
  },
  {
    works: [
      {
        work: { id: "board-sloth", title: "Sloth", caption: "Sloth: research board", image: { src: "/images/art/process/sloth-investigation.jpg", alt: "Research board titled Sloth: clocks, skulls and withered flowers around the Acedia skull-and-clock artwork, with written reflections", aspect: 1600 / 1200 } },
        at: { x: 50, y: 48, w: 86, rot: -1.5 },
        fix: "tape",
      },
    ],
  },
  // Wrath, 2026: the Sacred Heart, then her inverted heart.
  {
    heading: "The Burning Heart and the Deadly Sin",
    quote: { text: "“For God has not destined us for wrath, but to obtain salvation through our Lord Jesus Christ”", source: "Thessalonians 5:9" },
    works: [
      {
        work: {
          id: "wrath-sacred-heart",
          title: "The Sacred Heart",
          caption: "The Sacred Heart",
          description: [
            "Wrath, in Roman Catholic theology, is one of the seven deadly sins. A strong feeling of hatred or resentment with a desire for vengeance, wrath is overwhelming and destructive.",
            "But what brings us to wrath? Psychologically, wrath does not emerge in isolation, but is often rooted in fear. When our fear cannot find an outlet in escape, it transforms into confrontation, and anger becomes a secondary response to perceived threat. Our frustration, uncertainty about the future, and other negative emotions also trigger anger and aggression in our minds.",
            "In Freudian psychology, projection could be a representation of wrath: we project our internal fears or insecurities onto others, and thus jealousy and resentment may not originate from external stimuli, but from the fear of inadequacy within ourselves.",
            "In Roman Catholic theology, the Sacred Heart represents the divine love of Jesus Christ for humanity. It is not only a symbol of love, but of sacrificial, redemptive love: a love that endures suffering for the sake of others.",
            "The pierced, crowned with thorns, and set aflame heart signifies both suffering and redemption, revealing a form of love that persists despite pain and rejection.",
            "However, in my work, this heart is deliberately inverted. What was once a burning symbol of divine love is distorted into a heart consumed by anger and desire, transforming from an emblem of love into a vessel of emotional disorder.",
          ],
          image: { src: "/images/art/wrath/sacred-heart.jpg", alt: "Engraved devotional image of the Sacred Heart: a flaming heart pierced by swords and wreathed in roses, with lilies rising from it and doves below, in a lace border", aspect: 796 / 1244 },
        },
        at: { x: 50, y: 67, w: 38, rot: 2 },
        fix: "corners",
      },
    ],
  },
  {
    quote: { text: "Ex timore nascitur ira", source: "From fear, anger is born" },
    works: [
      {
        work: {
          id: "wrath-eileen-feng",
          title: "Wrath",
          caption: "Wrath, Eileen Feng, 2026",
          medium: "Eileen Feng",
          year: "2026",
          description: [
            "Our fear of the future drifts like dark ash—like a flame that burns as a ghost. The heart is blood-red, yet blue veins wind across it like creeping vines, spreading and entangling—roots of fear that grow within us and extend outward into the world.",
            "The inverted Sacred Heart rests upon a bookmark. Life unfolds like a book, and this mark remains—both a warning and a reflection of what is real.",
            "The roses, thorns, and lilies surrounding the heart form a symbolic framework that both beautifies and intensifies its distortion. Roses bloom with the language of love and desire, yet their thorns reveal the violence embedded within that beauty. The thorns echo suffering, piercing through the illusion of purity, while the lilies, often associated with death and mourning, introduce a quiet stillness of loss.",
            "The heart of wrath was once beautiful; yet under the weight of desire and hatred, its beauty slowly withers away. The bloodshot eye set within the heart embodies a vision veiled by hatred and disgust. It has grown weary, altered by all that it has endured, no longer able to see clearly.",
          ],
          image: { src: "/images/art/wrath/wrath-eileen-feng.jpg", alt: "Wrath (Ignis Irae) by Eileen Feng: a tall bookmark with a blood-red anatomical heart with an eye and blue veins, resting on grey ash in an oval frame, ringed by red roses, lilies and thorns, with Latin lines above and below", aspect: 602 / 2046 },
        },
        at: { x: 50, y: 60, w: 22, rot: -1 },
        fix: "tape",
      },
    ],
  },
  {
    works: [
      {
        work: { id: "board-wrath", title: "Wrath", caption: "Wrath: research board", image: { src: "/images/art/process/wrath-investigation.jpg", alt: "Research board titled Wrath: Sacred Heart images, a bloodshot eye, blue veins and the inverted heart artwork, with written reflections", aspect: 1700 / 1275 } },
        at: { x: 50, y: 48, w: 86, rot: -1.5 },
        fix: "tape",
      },
    ],
  },
  {
    works: [
      {
        work: { id: "board-sins-sketches", title: "Sins: sloth and wrath sketches", caption: "Sins: sketches for Sloth and Wrath", image: { src: "/images/art/process/sins-sketches-sloth-wrath.jpg", alt: "Sketch board titled Sins: a pocket watch, skulls and belladonna beside a pencil sketch of the skull and clock for Sloth, and Sacred Heart references beside a sketch of the burning heart with an eye for Wrath", aspect: 2000 / 1499 } },
        at: { x: 50, y: 48, w: 86, rot: 1.5 },
        fix: "tape",
      },
    ],
  },
  {
    heading: "Envy",
    works: [
      {
        work: { id: "board-envy", title: "Envy", caption: "Envy: research and sketches", image: { src: "/images/art/process/sins-envy.jpg", alt: "Sketch board titled Sins: snarling dogs, weeping eyes, ivy and a green eye beside a green pencil sketch of a barking dog for Envy, with notes", aspect: 2000 / 1499 } },
        at: { x: 50, y: 60, w: 86, rot: 1.5 },
        fix: "tape",
      },
    ],
  },
  {
    heading: "Pride",
    works: [
      {
        work: { id: "board-pride", title: "Pride", caption: "Pride: research and sketches", image: { src: "/images/art/process/pride.jpg", alt: "Board titled Seven deadly sins, Pride: violet pansies, peacock feathers, eyes and a crown beside a drawing of a peacock in blue and violet", aspect: 2000 / 1499 } },
        at: { x: 50, y: 60, w: 86, rot: -1.5 },
        fix: "tape",
      },
    ],
  },
  // Tarot of Uncertainty: The Moon, 2025.
  {
    heading: "Tarot of Uncertainty: The Moon",
    quote: { text: "“We ran as if to meet the moon.”", source: "Robert Frost" },
    works: [
      {
        work: {
          id: "moon-a-trip-to-the-moon",
          title: "A Trip to the Moon",
          caption: "A Trip to the Moon",
          medium: "Le Voyage dans la Lune (A Trip to the Moon, 1902)",
          description:
            "I was also inspired by the film Le Voyage dans la Lune (A Trip to the Moon, 1902), one of the earliest science fiction films in cinema history. In the film, a group of scientists travel to the moon out of curiosity and ambition, approaching the unknown world with both excitement and fear. The moon in the film is not just a place, but a symbol of the unknown—something distant, mysterious, and unreachable.",
          link: { href: "https://youtu.be/qcyZ70tO9-Q", label: "Watch the film" },
          image: { src: "/images/art/the-moon/a-trip-to-the-moon.jpg", alt: "Still from Le Voyage dans la Lune: the face of the moon with a rocket lodged in its eye", aspect: 500 / 430 },
        },
        at: { x: 50, y: 66, w: 54, rot: -2 },
        fix: "corners",
      },
    ],
  },
  {
    works: [
      {
        work: {
          id: "moon-pamela-colman",
          title: "The Moon",
          caption: "The Moon, Pamela Colman",
          medium: "Tarot card XVIII, by Pamela Colman",
          description:
            "In Chinese culture, the moon represents longing for those who have left us. In tarot, however, the Moon represents the fear of the unknown. When someone I care about leaves, what I truly feel is this fear of the unknown future. I cannot imagine what life will be like without someone who has already occupied such a large part of my life. My future feels like a dark ocean where I cannot see anything. Perhaps there are tentacles hidden beneath the water, trying to pull me back—those tentacles are my attachments, my fear of loss, and my reluctance to move forward.",
          image: { src: "/images/art/the-moon/the-moon-pamela-colman.jpg", alt: "Tarot card XVIII, The Moon: a yellow moon with a face over two towers, a dog and a wolf howling, and a crayfish rising from a pool", aspect: 550 / 922 },
        },
        at: { x: 50, y: 48, w: 40, rot: 2.5 },
        fix: "tape",
      },
    ],
  },
  {
    works: [
      {
        work: {
          id: "moon-eileen-feng",
          title: "The Moon",
          caption: "The Moon, Eileen Feng, 2025",
          medium: "Eileen Feng",
          year: "2025",
          description: [
            "In my work, I see myself as one of those travellers. However, instead of travelling through space, I travel across an ocean of uncertainty. The ocean represents the unknown future, and the tentacles rising from the water represent my attachments, fears, and memories that try to hold me back. With my hands clasped in prayer, I ask the moon to guide me through the darkness.",
            "Like the scientists in Le Voyage dans la Lune, I am afraid of the unknown, yet I am also drawn to it. To move forward in life, I must cross this ocean, travel through darkness, and slowly approach the moon—not to conquer it, but to understand it.",
          ],
          image: { src: "/images/art/the-moon/the-moon-eileen-feng.jpg", alt: "The Moon by Eileen Feng: a tarot card in white and gold line on black, the moon's face with a rocket in its eye above praying hands, fish and tentacles rising from a dark sea", aspect: 1333 / 2000 },
        },
        at: { x: 50, y: 47, w: 50, rot: -1.5 },
        fix: "tape",
      },
    ],
  },
  {
    works: [
      {
        work: { id: "board-the-moon", title: "The Moon", caption: "The Moon: research board", image: { src: "/images/art/process/the-moon-investigation.jpg", alt: "Research board titled The Moon: moons, a still from A Trip to the Moon, tentacles and dark seas, with written reflections", aspect: 1800 / 1350 } },
        at: { x: 50, y: 48, w: 86, rot: -1.5 },
        fix: "tape",
      },
    ],
  },
  {
    works: [
      {
        work: { id: "board-tarot-pamela-colman-smith", title: "Tarot Cards and Pamela Colman Smith", caption: "Tarot Cards and Pamela Colman Smith: research board", image: { src: "/images/art/process/tarot-pamela-colman-smith.jpg", alt: "Research board titled Tarot Cards and Pamela Colman Smith: early tarot cards, the Wheel of Fortune, Moon and Star cards, a portrait of Smith and her drawings of waves and the sea, with written notes", aspect: 2000 / 1391 } },
        at: { x: 50, y: 48, w: 86, rot: -1.5 },
        fix: "tape",
      },
    ],
  },
  // Tarot of Uncertainty: The Wheel of Fortune, 2025.
  {
    heading: "Tarot of Uncertainty: The Wheel of Fortune",
    quote: {
      text: "As human beings, not only do we seek resolution, but we also feel that we deserve resolution. However, not only do we not deserve resolution, we suffer from resolution. We don’t deserve resolution; we deserve something better than that. We deserve our birthright, which is the middle way, an open state of mind that can relax with paradox and ambiguity.",
      source: "Pema Chödrön, When Things Fall Apart: Heart Advice for Difficult Times",
    },
    works: [
      {
        work: {
          id: "wheel-tarot-cards",
          title: "Tarot cards",
          caption: "Tarot cards",
          description: [
            "“People always try to seek an answer from the world to comfort themselves,” my psychology teacher once said during an AP Psychology class last year. That sentence stayed with me, and I began to observe the people around me more carefully. I noticed that tarot cards had quietly become a kind of comfort for many of my friends when they were faced with uncertainty.",
            "I cannot say that tarot cards are right or wrong. Yet this human desire to predict the future, to search for certainty in the unknown, gradually made me more and more curious. I began to realise that perhaps what people are truly afraid of is not the future itself, but the uncertainty that comes with it.",
            "So I decided to create my work around the theme of the fear of the unknown, and tarot cards became the medium through which I explored this idea.",
          ],
          image: { src: "/images/art/wheel-of-fortune/tarot-cards.jpg", alt: "Twelve tarot cards of the major arcana in a grid, from The Fool to Justice, including the Wheel of Fortune", aspect: 1024 / 1341 },
        },
        at: { x: 50, y: 75, w: 33, rot: -1.5 },
        fix: "corners",
      },
    ],
  },
  {
    works: [
      {
        work: {
          id: "wheel-pamela-colman",
          title: "Wheel of Fortune",
          caption: "Wheel of Fortune, Pamela Colman",
          medium: "Tarot card X, by Pamela Colman",
          description: [
            "The Wheel of Fortune is one of the most symbolic cards in the tarot deck. It represents change, cycles, fate, and the movement of life. Wheel of Fortune often refers to forces beyond our control, or the natural cycles of life.",
            "When I think about my life, I often feel that I have met many different people along the way. Some of them were only passing through my life, yet they became the ones who quietly pushed the wheel of my fortune forward. Perhaps no one stays forever, but every person changes the direction of the wheel in some way.",
            "The wheel is always turning, and nothing stays the same forever. Good times and bad times are both temporary, and my life moves in cycles: success and failure, happiness and sadness, beginnings and endings. Looking back, I realise that what once felt like an ending often became a beginning, and what felt permanent was only temporary after all.",
            "Maybe the Wheel of Fortune does not tell us what will happen in the future. Instead, it reminds us that life is always moving, and we are all simply travelling with the turning of the wheel.",
          ],
          image: { src: "/images/art/wheel-of-fortune/wheel-of-fortune-pamela-colman.jpg", alt: "Tarot card X, Wheel of Fortune: an orange wheel with letters and symbols, a sphinx on top, a snake and a red jackal-headed figure beside it, and winged creatures reading books in the corners", aspect: 960 / 1600 },
        },
        at: { x: 50, y: 48, w: 40, rot: 2 },
        fix: "tape",
      },
    ],
  },
  {
    works: [
      {
        work: {
          id: "wheel-garden-of-earthly-delights",
          title: "The Garden of Earthly Delights",
          caption: "The Garden of Earthly Delights, Hieronymus Bosch",
          medium: "Hieronymus Bosch",
          description: [
            "So I was reminded of The Garden of Earthly Delights by Bosch. Our world seemed to begin in beauty and innocence, yet after Adam and Eve ate the forbidden fruit, humanity fell, and the garden of paradise slowly turned into hell as the wheel of fate continued to turn.",
            "I sometimes wonder: what would the world have become if they had never eaten the forbidden fruit? And what would have happened if they had recognised their own desires before acting upon them? Perhaps history would have moved in a completely different direction.",
            "It feels as if our own wheel of fortune still exists somewhere unseen, quietly turning. With every decision we make, every desire we follow, and every mistake we commit, the wheel moves a little more, guiding us toward a future we cannot fully predict or understand.",
            "This fear of the unknown, however, is strangely comforted by tarot cards. They seem to offer us a sense of direction, telling us about the rise and fall of fortune, the appearance and disappearance of opportunities. Whether they are true or not, almost does not matter—what matters is that they give us something to hold onto when we are standing in front of the uncertainty of the future.",
          ],
          image: { src: "/images/art/wheel-of-fortune/garden-of-earthly-delights.jpg", alt: "The Garden of Earthly Delights triptych: paradise on the left, a crowded garden of figures in the centre, and a dark hell on the right", aspect: 1024 / 583 },
        },
        at: { x: 50, y: 46, w: 80, rot: -1 },
        fix: "tape",
      },
    ],
  },
  {
    works: [
      {
        work: {
          id: "wheel-eileen-feng",
          title: "The Wheel of Fortune",
          caption: "The Wheel of Fortune, Eileen Feng, 2025",
          medium: "Eileen Feng",
          year: "2025",
          image: { src: "/images/art/wheel-of-fortune/wheel-of-fortune-eileen-feng.jpg", alt: "The Wheel of Fortune by Eileen Feng: a tarot card in soft coloured pencil, a symmetrical wheel of plant and organic forms under the numeral X, with pale fish swimming through clouds", aspect: 1333 / 2000 },
        },
        at: { x: 50, y: 47, w: 50, rot: 1.5 },
        fix: "tape",
      },
    ],
  },
  {
    works: [
      {
        work: { id: "board-bosch", title: "Hieronymus Bosch", caption: "Hieronymus Bosch: research board", image: { src: "/images/art/process/bosch-investigation.jpg", alt: "Research board titled Hieronymus Bosch: The Garden of Earthly Delights with circled details, colour swatches and The Seven Deadly Sins, with written analysis", aspect: 2000 / 1500 } },
        at: { x: 50, y: 48, w: 86, rot: -1.5 },
        fix: "tape",
      },
    ],
  },
  // Nostalgia: her installation, description translated from her Chinese.
  {
    heading: "Nostalgia",
    works: [
      {
        work: {
          id: "nostalgia-installation",
          title: "Nostalgia",
          caption: "Nostalgia, Eileen Feng",
          description: [
            "In war, we fall into a kind of stillness. We long for the past, and at the same time we can glimpse a future that may hold hope. But such a tomorrow is uncertain. That uncertainty brings an intense fear, a terror felt by humans and non-humans alike. Civilisation and the individual are suspended in an unknown space, walled in on one side by nostalgia and on the other by the future. This stillness is our hesitation between the past and what is to come. In that hesitation, civilisation, time and memory all come to a standstill.",
            "We long for the prosperity that once was, but each time we recall it, memory is worn away, covered over, changed. The dust drifting among the ruins settles softly over our memories, layer upon layer, until everything has returned to the white of the very beginning, and our civilisation is once again as it was in swaddling clothes. Civilisation passes from birth to destruction to rebuilding, and its destruction and rebuilding are like death and rebirth. A cycle, a stillness: an emptiness both physical and spiritual.",
            "English translation by Claude from Eileen’s Chinese original.",
            "在战争中，我们会陷入一种停滞。我们怀念过去，同时又能看到也许拥有希望的未来。但这样的明天，是不确定的。这样的不确定性带来了强烈的恐惧，一种使人类与非人类都感到恐怖的恐惧。文明与个体停滞在一个未知的空间，两面墙是nostalgia和future。这种停滞，是我们对于过去与未来的犹豫。在这样的犹豫中，文明、时间、记忆都陷入静止。我们怀念曾经的繁荣，但记忆会随着一次次的回想被磨灭、遮盖、改变。废墟之间飘荡着的尘土轻柔地把记忆覆盖，一层又一层，直到一切都变成了最开始的白，我们的文明再次回到了襁褓时的模样。文明从诞生到毁灭再到重建，文明的毁灭与重建就如同死亡与重生。轮回、停滞，一种物理与精神上的空虚。",
          ],
          image: { src: "/images/art/nostalgia/installation-wall.jpg", alt: "Nostalgia by Eileen Feng: a large hanging of torn, felted wool in pale yellow, blue and rose, spread across a gallery window", aspect: 2000 / 1500 },
        },
        at: { x: 50, y: 60, w: 80, rot: -1 },
        fix: "tape",
      },
    ],
  },
  {
    works: [
      {
        work: {
          id: "nostalgia-wall-circle",
          title: "Nostalgia",
          caption: "Nostalgia, with the circle-cut wall",
          image: { src: "/images/art/nostalgia/installation-wall-circle.jpg", alt: "The felted wool hanging seen past a white wall cut with a large circle and small round holes", aspect: 2000 / 1500 },
        },
        at: { x: 38, y: 30, w: 62, rot: -2 },
        fix: "corners",
      },
      {
        work: {
          id: "nostalgia-uv-detail",
          title: "Nostalgia",
          caption: "Nostalgia, detail under UV light",
          image: { src: "/images/art/nostalgia/detail-uv-light.jpg", alt: "Close-up of the felted surface with pearls, beads and pressed hydrangea petals, a patch glowing blue under a UV torch", aspect: 1125 / 2000 },
        },
        at: { x: 72, y: 71, w: 32, rot: 2 },
        fix: "tape",
      },
    ],
  },
  {
    works: [
      {
        work: {
          id: "nostalgia-felt-table",
          title: "Nostalgia",
          caption: "Nostalgia, felt on a round table",
          image: { src: "/images/art/nostalgia/felt-table.jpg", alt: "A round table draped in layered, felted wool scattered with pearls", aspect: 2000 / 1500 },
        },
        at: { x: 36, y: 28, w: 58, rot: 1.5 },
        fix: "tape",
      },
      {
        work: {
          id: "nostalgia-felt-table-gallery",
          title: "Nostalgia",
          caption: "Nostalgia, felt table in the gallery",
          image: { src: "/images/art/nostalgia/felt-table-gallery.jpg", alt: "A felt-covered round table in the gallery, with wall text and a city view behind", aspect: 1500 / 2000 },
        },
        at: { x: 28, y: 70, w: 36, rot: -2 },
        fix: "corners",
      },
      {
        work: {
          id: "nostalgia-felt-tables",
          title: "Nostalgia",
          caption: "Nostalgia, felt laid out in the studio",
          image: { src: "/images/art/nostalgia/felt-tables.jpg", alt: "Sheets of pale felted wool streaked with blue and yellow laid across tables", aspect: 1500 / 2000 },
        },
        at: { x: 72, y: 68, w: 36, rot: 2 },
        fix: "tape",
      },
    ],
  },
  {
    works: [
      {
        work: {
          id: "nostalgia-installing",
          title: "Nostalgia",
          caption: "Nostalgia, installing the piece",
          image: { src: "/images/art/nostalgia/installation-wall-table.jpg", alt: "The hanging being installed on the gallery window, beside the circle-cut wall and a work table", aspect: 1500 / 2000 },
        },
        at: { x: 50, y: 50, w: 50, rot: -1 },
        fix: "tape",
      },
    ],
  },
  // Film posters
  {
    heading: "In the Mood for Love",
    works: [
      {
        work: { id: "poster-in-the-mood-for-love", title: "In the Mood for Love", caption: "In the Mood for Love, poster", image: { src: "/images/art/posters/in-the-mood-for-love.jpg", alt: "Eileen Feng’s poster for In the Mood for Love: Maggie Cheung and Tony Leung in red and green light, with yellow lettering and the lines “Those vanished years, as if seen through a dusty pane of glass, visible but untouchable”", aspect: 1254 / 1938 } },
        at: { x: 50, y: 62, w: 46, rot: -1.5 },
        fix: "tape",
      },
    ],
  },
  {
    works: [
      {
        work: { id: "board-in-the-mood-for-love", title: "Love, Fear, Uncertainty", caption: "Love, Fear, Uncertainty: research board", image: { src: "/images/art/process/in-the-mood-for-love-investigation.jpg", alt: "Research board titled Love, Fear, Uncertainty: stills from In the Mood for Love, letters, postcards and handwritten notes, with written reflections", aspect: 1500 / 1125 } },
        at: { x: 50, y: 48, w: 86, rot: 1.5 },
        fix: "tape",
      },
    ],
  },
  {
    heading: "(500) Days of Summer",
    quote: { text: "“This is a story of boy meets girl. But you should know up front, this is not a love story.”", source: "(500) Days of Summer, 2009" },
    works: [
      {
        work: { id: "poster-500-days-of-summer", title: "(500) Days of Summer", caption: "(500) Days of Summer, poster redesign", image: { src: "/images/art/posters/500-days-of-summer.jpg", alt: "Eileen Feng’s redesigned poster for (500) Days of Summer: a collage of Tom and Summer in black and white with red lips, hearts and a record, and typewritten lyric snippets", aspect: 1500 / 2000 } },
        at: { x: 50, y: 64, w: 46, rot: -1.5 },
        fix: "tape",
      },
    ],
  },
  {
    heading: "Before Sunrise",
    quote: { text: "“If there’s any kind of magic in this world, it must be in the attempt of understanding someone, sharing something.”", source: "Before Sunrise, 1995" },
    works: [
      {
        work: { id: "poster-before-sunrise", title: "Before Sunrise", caption: "Before Sunrise, poster redesign", image: { src: "/images/art/posters/before-sunrise.jpg", alt: "Eileen Feng’s redesigned poster for Before Sunrise: grey film stills behind large white serif lettering, a train and a moon above, an orange sun below", aspect: 1296 / 1728 } },
        at: { x: 50, y: 64, w: 46, rot: -1.5 },
        fix: "tape",
      },
    ],
  },
  {
    heading: "Windows",
    works: [
      {
        work: { id: "board-windows", title: "Windows", caption: "AP Art and Design, Project 1: Windows", image: { src: "/images/art/process/windows.jpg", alt: "Research board titled Windows: photographs and artworks of windows, faces and buildings, with written notes", aspect: 2000 / 1125 } },
        at: { x: 50, y: 60, w: 86, rot: -1.5 },
        fix: "tape",
      },
    ],
  },
];
