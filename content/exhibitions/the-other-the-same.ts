import type { CatalogueEntry, CreditGroup, Pair } from "@/content/exhibitions";

/**
 * THE OTHER, THE SAME — the exhibition's own texts, as Eileen gave them
 * (Chinese and English side by side). Each entry's `image` is the picture
 * Eileen chose for it: images from the internet, credited as such. `photos`
 * are exhibition photographs, credited to Shenzhen Nanshan Huitong School.
 */

export const preface: Pair[] = [
  {
    zh: `对“同一个”来说，“另一个”是陌生的、奇异的、危险的；而在“另一个”中，未必不能看到“同一个”的影子。我们展览的故事就在这样的循环中展开。`,
    en: `To the “same”, the “other” is unfamiliar, strange, and dangerous. But in the “other”, one may also see the shadow of the “same”. Our exhibition's story unfolds in such a cycle.`,
  },
  {
    zh: `深圳是一个海纳百川的城市，我们来自不同的地方，说着不同的语言。在深圳的我们，都是同一个“深圳人”。人类科技不断地演变，自然是否可以像深圳一样，如此自如地包容人类的新动作？`,
    en: `Shenzhen is a city that embraces diversity. We come from different places and speak different languages. In Shenzhen, we are all “Shenzheners”. As human technology continues to evolve, can nature accommodate human actions as freely as Shenzhen accommodates diversity?`,
  },
  {
    zh: `在这场展览中，我们把如何与自然相处的探讨投射在以“外来入侵物种”为比喻的艺术和科学创作中，以此向你们提问，也期待你们思考后的回答。`,
    en: `In this exhibition, we explore how to coexist with nature through artistic and scientific creations that use “invasive species” as a metaphor. Here, we ask questions and look forward to your thoughtful answers.`,
  },
];

export const natureIntro: Pair[] = [
  {
    zh: `在城市中，有一些“自然”是不被人们所熟知的。它们经常在我们的生活中出现，但它们的个体并没有在我们的脑海里留下具体的形象，就像“外来入侵物种”。这个名词集中表达着一种对陌生的“另一个”的负面态度。但一个值得思考的问题是：外来入侵物种一定是与在地自然和人类的生活对立的吗？`,
    en: `In the city, there is some “Nature” that is not visible to people. They often appear in our lives, but their individual images are not left in our minds, just like “invasive species”. This term expresses a negative attitude towards a foreign “Other”. However, are invasive species always in opposition to local nature and human life?`,
  },
];

export const natureEntries: CatalogueEntry[] = [
  {
    id: "what-is-invasive",
    zh: `什么是"入侵物种"？`,
    title: `What is "Invasive Species"?`,
    body: [
      {
        zh: `一个物种，原先不是这个地方的“原住民”，但因为在这个地方没有他们的天敌，它们凭着自己的本事生存下去了，而且变得越来越多，甚至让原来土生土长的生物没有了生存空间。它们就是“入侵物种”。`,
        en: `A species that is not originally native to an area, but is able to survive and even thrive in that area because it has no natural predators, eventually occupying the habitat to the detriment of native species, can be considered an "invasive species".`,
      },
    ],
  },
  {
    id: "invasive-plants",
    zh: `在深圳可以见到哪些入侵植物?`,
    title: `What Invasive Plant Species can be Found in Shenzhen?`,
    image: { src: "/images/exhibitions/the-other-the-same/plants.jpg", alt: "Botanical plate of flowering wild plants with yellow and violet blooms", aspect: 736 / 414, caption: "Image from the internet" },
    body: [
      {
        zh: `在小南山公园采集外来植物的标本，将这些被忽略的平常事物张裱成一个又一个由“自然”这位设计师设想雕琢的精美艺术品，并用这些外来物勾勒出深圳的模样。这是一种接纳，也是一种象征。这些事物本不该被忽略忘记，而应该是被人们细细观赏的存在。`,
        en: `Gathering specimens of invasive plants in Xiaonanshan Park and transforming these often overlooked objects into beautiful works of art, designed by the "designer" of nature, and using these invasive species to depict the image of Shenzhen. This is both an acceptance and a symbol. These objects should not be ignored or forgotten, but instead should be carefully observed and appreciated by people.`,
      },
    ],
    specimens: [
      {
        zh: `假臭草`,
        latin: `Praxelis Clematidea`,
        body: [
          {
            zh: `原产南美洲，主要分布于阿根廷、巴西以及南美其他一些国家，东半球热带地区。入侵地点是香港、广东（南部）和福建（厦门）。臭草由于其对土壤肥力吸收力强，严重影响果树的生长，由于能分泌一种有毒的恶臭味，影响家畜觅食。`,
            en: `Originally from South America, it is mainly distributed in Argentina, Brazil, and other South American countries, as well as tropical regions in the eastern hemisphere. Invasion locations are Hong Kong, Guangdong (southern), and Fujian (Xiamen). Praxelis Clematidea has a strong ability to absorb soil fertility, which seriously affects the growth of fruit trees. It can also secrete a toxic and foul odor, affecting the foraging of livestock.`,
          },
        ],
      },
      {
        zh: `三叶鬼针草`,
        latin: `Bidens pilosa L.`,
        body: [
          {
            zh: `原产于美洲热带地区，属于“中国外来入侵物种名单（第三批）”。`,
            en: `Originating from the tropical regions of the Americas, it is listed as one of the "third batch of China's list of invasive alien species".`,
          },
          {
            zh: `生长繁殖能力较强，种子发芽率高，幼龄期短，具化感作用，严重破坏入侵地的生态系统和种群结构，能显著降低生物多样性。`,
            en: `It has strong reproductive ability, high seed germination rate, short juvenile period, and allelopathic effect, seriously damaging the ecological system and population structure of invaded areas, and significantly reducing biodiversity.`,
          },
        ],
      },
      {
        zh: `光荚含羞草`,
        latin: `Mimosa sepiaria Benth`,
        body: [
          {
            zh: `又称簕仔树，原产于热带美洲（巴西等地），半个多世纪前由旧金山华侨引入我国广东省中山县（即现今的中山市）。有研究表明，光荚含羞草目前已在华南地区逸为野生并蔓延，还产生了适应辐射，形成单优群落，排挤甚至杀死本地物种，使扩散地区的生物多样性明显降低。`,
            en: `Also known as mimosa, it is native to tropical America (Brazil, etc.) and was introduced to Zhongshan County (now Zhongshan City) in Guangdong Province, China, by overseas Chinese from San Francisco more than half a century ago. Studies have shown that the sensitive plant is now growing wild in southern China and has spread, adapting to radiation and forming a dominant population, displacing or even killing local species and significantly reducing the biodiversity of the area of its expansion.`,
          },
        ],
      },
      {
        zh: `马缨丹`,
        latin: `Lantana camara`,
        body: [
          {
            zh: `原产美洲热带地区，十大有毒杂草之一，2010年被列入中国第二批外来入侵物种名单。马缨丹已成为侵犯牧场、林场、茶园和桔园的恶性杂“草”，也严重破坏了森林资源和环境生态系统。`,
            en: `Native to the tropical regions of the Americas, Lantana camara is one of the top ten poisonous weeds. In 2010, it was included in the second batch of China's list of invasive alien species. Lantana camara has become a malignant "weed" invading pastures, forests, tea gardens, and orange orchards, and it has also severely damaged forest resources and the environmental ecosystem.`,
          },
        ],
      },
      {
        zh: `银合欢`,
        latin: `Leucaena leucocephala`,
        body: [
          {
            zh: `原产于热带美洲，被国际自然保护联盟(IUCN)列为世界100个严重危害生态环境的外来入侵物种之一。据记载，它最早是在1645年由荷兰人辗转带入台湾的。在银合欢的叶片、果荚、林地内的凋落物以及土壤内，都含有能抑制邻居植物生长的有害物质。它们一旦离开原生地，落脚异邦之后，却成为攻城略地，排挤当地原生植物生存空间、危害土著特有物种的“罪犯”。`,
            en: `Originating from tropical America, it is listed as one of the world's 100 worst invasive alien species for seriously endangering ecological environments by the International Union for Conservation of Nature (IUCN). It was first introduced to Taiwan by the Dutch in 1645. Harmful substances that inhibit the growth of neighboring plants can be found in the leaves, pods, litter, and soil of the Leucaena leucocephala. Once they leave their native land and settle in foreign lands, they become invaders, occupying space and competing with local native plants, causing harm to indigenous species.`,
          },
        ],
      },
    ],
  },
  {
    id: "european-honey-bee",
    pinyin: `yì dà lì fēng`,
    zh: `意大利蜂`,
    title: `European Honey Bee`,
    image: { src: "/images/exhibitions/the-other-the-same/bee.jpg", alt: "Vintage French school chart “La vie de l’abeille”: bees, honeycomb, honey and wax", aspect: 794 / 993, caption: "Image from the internet" },
    voice: {
      zh: `很多国家和地区都说我很有危害性，我很厉害，我可以打过其他所有蜜蜂！但是我也有好的方面，就像你们在超市货架上看见的我。我对地球还是很有用的哦，我可以酿造蜂蜜，还可帮助花授粉。你们利用我的蜂巢制作艺术作品，有平面的作品甚至还有立体的作品呢。`,
      en: `People in many countries and regions say that I am very harmful. But I feel that I am super because I can beat all other bees! I have some good aspects, like when you see me on the supermarket shelves. I am very useful to the earth. I can produce honey very efficiently and help flowers pollinate. You used my beehive to make works of art, including two-dimensional and even three-dimensional works.`,
    },
    photos: [{ src: "/images/exhibitions/the-other-the-same/work-bee-1.jpg", alt: "Honeycomb wax and glue sculpture on a wooden board", aspect: 1, caption: "Photo: Shenzhen Nanshan Huitong School" }, { src: "/images/exhibitions/the-other-the-same/work-bee-2.jpg", alt: "Sculpture of dark honeycomb strips bent into legs and bound with wire", aspect: 1, caption: "Photo: Shenzhen Nanshan Huitong School" }],
    body: [
      {
        zh: `我们是意大利蜂（Apis mellifera Ligustica)，大家也叫我意蜂。`,
        en: `We are Italian bees (Apis mellifera Ligustica), also known as European Honey bees.`,
      },
      {
        zh: `我们的家乡在欧洲和非洲，我们生产蜂蜜的效率非常高，商人们很爱我们，所以几个世纪前我被带到了南美、北美和亚洲来工作。你们在超市买到的麦卢卡蜂蜜都是我们采来的哦。不过本地蜜蜂不喜欢我们，我们两个种群曾经“殊死搏斗”过。论采蜜、繁殖，中国蜜蜂都比不过我们。所以上世纪末在黄河一带，中国蜜蜂几乎灭绝了。[1]`,
        en: `Our homeland is in Europe and Africa, and we are highly efficient honey producers. Merchants love us, so centuries ago we were brought to South America, North America, and Asia to work. The Manuka honey that you buy at the supermarket is also collected by us. However, the local bees don't like us, and we have had deadly battles with them. In terms of honey production and reproduction, Chinese bees cannot match us. Therefore, at the end of the last century, Chinese bees were almost extinct in the Yellow River region. [1]`,
      },
    ],
    footnotes: [`[1] 季荣,谢宝瑜,杨冠煌,李典谟.从有意引入到外来入侵——以意大利蜂Apis mellifera L.为例[J].生态学杂志,2003,22(5):70-73`],
  },
  {
    id: "giant-african-snail",
    pinyin: `fēi zhōu dà wō niú`,
    zh: `非洲大蜗牛`,
    title: `Giant African Snail`,
    image: { src: "/images/exhibitions/the-other-the-same/snail.jpg", alt: "Engraved studies of snails and shells on brown paper", aspect: 735 / 490, caption: "Image from the internet" },
    voice: {
      zh: `我就是你们在雨后小区中常见的非洲大蜗牛，我在很多国家和地区都被人类讨厌，甚至是在我的出生地，非洲东部，被他们当作食物。你们将我和你们的生活结合在一起，将我的家改造成了雕塑、声音装置，甚至是乐器。现在，你可以透过我的家，感受你们体验到的城市。`,
      en: `I am the African giant snail that you often see in your neighborhood after it rains. I am hated by humans in many countries and regions, including my birthplace in East Africa, where they consider me a food item. You have integrated me into your lives by transforming my home into sculptures, sound installations, and even musical instruments. Now, you can experience the city through my home.`,
    },
    photos: [{ src: "/images/exhibitions/the-other-the-same/work-snail.jpg", alt: "A snail shell set with beads and coloured clay, with its label: 作者 Author 李大方 Harry Li", aspect: 1, caption: "作者 Author: 李大方 Harry Li · Photo: Shenzhen Nanshan Huitong School" }],
    body: [
      {
        zh: `我是非洲大蜗牛(Lissachatina fulica)`,
        en: `I am the African giant snail (Lissachatina fulica)`,
      },
      {
        zh: `我的家乡在非洲东部沿岸坦桑尼亚的桑给巴尔、奔巴岛，马达加斯加岛一带。我藏在新加坡华人的植物里偷偷地来到了中国。1931年，我在福建厦门被发现。我喜欢吃植物和庄稼，人类也叫我“田园杀手”。我身上有很多寄生虫和病原体，所以别吃我、别摸我，会生病哦！但我的肉也很好吃，所以也有许多人养殖我们。`,
        en: `My homeland is along the coasts of Tanzania's Zanzibar and Pemba Islands, as well as Madagascar. I secretly came to China hiding in the plants of Singapore's Chinese. I was discovered in Xiamen, Fujian, in 1931. I like to eat plants and crops, and humans call me the "farmer's killer." I carry many parasites and pathogens, so please don't eat or touch me, or you will get sick! But my meat is also delicious, so many people raise us for consumption.`,
      },
    ],
  },
  {
    id: "soil",
    pinyin: `ní tǔ`,
    zh: `泥土`,
    title: `Soil`,
    image: { src: "/images/exhibitions/the-other-the-same/soil.jpg", alt: "Close-up of dark brown soil", aspect: 530 / 662, caption: "Image from the internet" },
    voice: {
      zh: `我是泥土，或许我就在你们的脚下，你们一定会想为什么自己踩在自己国家的土地上，但是我却又是属于外来“入侵物种”呢？世界上海洋占据了很大部分，而人们想要建造更多的高楼，需要更多的土地。而我呢，就是其中的一部分，人类把我用于填海造陆，而我其实是其他国家或者地区运过来的。我有很多种类，颜色不同，地质也不同。`,
      en: `I am soil. Perhaps I am right beneath your feet and you might wonder why you are standing on the soil of your own country, while I am considered an “invasive species”? With oceans occupying a large portion of the world, humans need more land to build more skyscrapers. That's where I come in. I am a part of the land reclamation process, brought in from other countries or regions. I come in many types, with different colors and geological compositions.`,
    },
    photos: [{ src: "/images/exhibitions/the-other-the-same/work-soil.jpg", alt: "Clear acrylic cubes holding layers of different soils", aspect: 1, caption: "Photo: Shenzhen Nanshan Huitong School" }],
    body: [
      {
        zh: `我是这个城市里可见又不可见的记忆。`,
        en: `I am the visible and invisible memory of this city.`,
      },
    ],
  },
];

export const newNatureIntro: Pair[] = [
  {
    zh: `“新自然”这个名字来源于《新荒野:入侵物种何以拯救自然》。在这本书中，作者从新颖的角度分析了入侵物种对自然的影响。正如《新荒野》， 在“新自然”中，我们也将转变视角，从微观而略带神秘感的角度呈现人类对自然的介入。从城市的骨骼，到在泥土和水中繁衍生息的微生物，再到“未来”的食物设计，我们想象着：庞杂的微粒所重构的“同一个”，是否能为我们的自然带来新的平衡与机遇。`,
    en: `The name “New Nature” is inspired by the book The New Wild: Why Invasive Species Will Be Nature's Salvation. In this book, the author analyzes the impact of invasive species on nature from a novel perspective. Like The New Wild, in the “New Nature”, we also change our perspective and present human intervention in nature from a micro and slightly mysterious angle. From the skeleton of the city to the microorganisms that reproduce in soil and water, to the design of “future” food, we imagine whether the “same” reconstructed from complex particles can bring new balance and opportunities to our nature.`,
  },
];

export const newNatureEntries: CatalogueEntry[] = [
  {
    id: "concrete",
    pinyin: `hùn níng tǔ`,
    zh: `混凝土`,
    title: `Concrete`,
    image: { src: "/images/exhibitions/the-other-the-same/concrete.jpg", alt: "Weathered concrete with exposed stones", aspect: 333 / 500, caption: "Image from the internet" },
    photos: [{ src: "/images/exhibitions/the-other-the-same/work-concrete.jpg", alt: "Grey concrete sculptures, a cup and broken rings, on a wooden table", aspect: 1, caption: "Photo: Shenzhen Nanshan Huitong School" }],
    body: [
      {
        zh: `在前海一片无人使用的荒地上，我们采集了用来填海造陆的土壤。他们来自不同的地方，也呈现出各样的质地和色泽，我们也将非洲大蜗牛的壳烧制成石灰。之后，我们用常见的建筑材料——水泥将TA们融合到一起，把这些在刻板印象里臭名昭著或随处可见的的外来物种变成沉重、坚固而又别样的混凝土雕塑。变成这般模样的TA，与先前的TA们是“另一个”还是“同一个”呢？`,
        en: `On the unused land of Qianhai, we collected soil used for land reclamation. They come from different places and show various textures and colors. We also burnt African giant snail shells into lime. Then, we used common building material - cement - to fuse them together, turning these notorious or ubiquitous invasive species into heavy, sturdy, and unique concrete sculptures. Are these transformed materials the “Same” or the “other” as before?`,
      },
    ],
    notes: [
      {
        zh: `什么是混凝土？`,
        title: `What is concrete?`,
        body: [
          {
            zh: `混凝土是一种特殊的材料，它是由胶凝材料、砂子、石子这些东西混合在一起制成的，就像做面团一样。我们通常用的胶凝材料是水泥。这样做出来的混凝土非常坚固，可以承受重重的压力和重量。混凝土可以被用来建造各种土木工程，比如房屋、桥梁、道路等等。`,
            en: `Concrete is a special material made by binding material, sand, and rock together, much like making dough. The binding material we commonly use is cement. Concrete made this way is very strong and can withstand heavy pressure and weight. Concrete can be used to build various civil engineering structures, such as houses, bridges, roads, and so on.`,
          },
        ],
      },
      {
        zh: `蜗牛壳与生石灰`,
        title: `Snail Shells and Quicklime`,
        body: [
          {
            zh: `蜗牛壳的主要成分是碳酸钙CaCO3。在高温下煅烧，我们得到了二氧化碳CO2以及生石灰（氧化钙CaO）。`,
            en: `The main component of snail shells is calcium carbonate CaCO3. When it is calcined at high temperatures, we obtain carbon dioxide CO2 and quicklime (calcium oxide CaO).`,
          },
          {
            zh: `生石灰可以用来做建筑材料、干燥剂以及消毒剂，在平时生活中用途十分广泛。还有就是在农业中，生石灰也可以化身为肥料。将生石灰调配好后可以改善土壤的结构，为植物补充钙素。`,
            en: `Quicklime can be used as building material, desiccant, disinfectant, and is widely used in daily life. In agriculture, quicklime can also become fertilizer. After mixing quicklime, it can improve soil structure and supplement plants with calcium.`,
          },
          {
            zh: `通常，我们从大理石、石灰石等矿石中得到生石灰。虽然这样的原材料来源比较充足，但是其中可能包含难以除去的重金属。`,
            en: `Usually, we obtain quicklime from ores such as marble and limestone. Although the source of such raw materials is abundant, they may contain heavy metals that are difficult to remove.`,
          },
        ],
      },
    ],
  },
  {
    id: "ocean",
    pinyin: `hǎi yáng`,
    zh: `海洋`,
    title: `Ocean`,
    image: { src: "/images/exhibitions/the-other-the-same/ocean.jpg", alt: "Aerial view of waves meeting a sandy shore", aspect: 492 / 700, caption: "Image from the internet" },
    quote: { zh: `“锈层就是微生物生长的一个微环境。”`, en: `"Rust is a micro-environment for microbial growth."` },
    photos: [{ src: "/images/exhibitions/the-other-the-same/work-ocean.jpg", alt: "Iron sheets rusted gold and brown by seawater", aspect: 1, caption: "Photo: Shenzhen Nanshan Huitong School" }],
    body: [
      {
        zh: `填海造陆改变了深圳河流与海洋的关系。如前湾河这条在人造陆地上，被开辟出来的河流，其中有着许多自下游逆流而上的海水。我们用这些海水去侵蚀不同形态的铁片，其中的水、无机盐与铁、空气结合会加速生锈……这一片片铁片在时间的浸渍下染上各异的金斑，附着上许多微小的生命，凝结成海洋、河流、大地与深圳的一瞬。这是“同一个”与“另一个”的演变过程，也是人与自然共同完成的艺术创作。`,
        en: `The land reclamation has changed the relationship between Shenzhen's rivers and the sea. The Qianwan River, a river created on artificial land, carries a lot of seawater upstream from the downstream. We use this seawater to corrode iron sheets of different shapes. The water, inorganic salts, iron, and air combine to accelerate rusting... These pieces of iron are stained with various golden spots over time, attaching many tiny lives, condensing into a moment of ocean, river, earth, and Shenzhen. This is the evolution process of the “same” and the “other”, as well as the art creation completed by humans and nature together.`,
      },
    ],
    notes: [
      {
        zh: `铁细菌`,
        title: `Iron Bacteria`,
        body: [
          {
            zh: `你知道吗？海洋中有一些微小的生物叫做铁细菌，它们喜欢吃一种叫“铁”的金属来获取能量。即使在含铁量很少的水中，它们也能生存！但是为了能够吃铁，它们需要一些空气，所以它们喜欢生活在至少有一点氧气的地方。当水中没有足够的氧气时，它们会把水中的铁转化为一种黏滑的红棕色物质，可能会让像衣服或管道等等的物体变脏。它们对海洋很重要，因为它们有助于保持海洋的平衡。[2]`,
            en: `Did you know there are tiny living things called iron bacteria? They like to eat a special kind of metal called iron for their energy. They can even live in water that has very little iron in it! But they need some air to be able to do this, so they like to live in places with at least a little bit of oxygen. When there's not enough air, they turn iron in the water into a slimy, reddish-brown substance that can make things look dirty and stain things like clothes or pipes. They're important for the ocean because they help keep everything in balance. [2]`,
          },
        ],
      },
    ],
    footnotes: [`[2] Alth, Max; Alth, Charlotte (1984). Constructing and Maintaining Your Well & Septic System. Blue Ridge Summit, Pennsylvania: Tab Books. p. 20. ISBN 0-8306-0654-8.`],
  },
  {
    id: "future-food-design",
    pinyin: `wèi lái shí wù shè jì`,
    zh: `未来食物设计`,
    title: `Future Food Design`,
    image: { src: "/images/exhibitions/the-other-the-same/meat.jpg", alt: "Printer nozzles labelled Fat, Blood and Muscle laying down a red and white meat substitute", aspect: 1000 / 600, caption: "Image from the internet" },
    body: [
      {
        zh: `欢迎来到未来食品公司，我们正在颠覆我们对食品的认知！我们的人造肉产品采用合成生物学生产番茄红素，这是一种超级健康的营养素，也是我们的肉类拥有其血色的来源。`,
        en: `Welcome to the Future Food Co., where we are revolutionizing the way we think about food! Our lab-made meat product that uses synthetic biology to produce lycopene, a super healthy nutrient that's also responsible for giving our meat its red color.`,
      },
      {
        zh: `我们的人造肉不仅具有环境可持续性和无残忍性的优点，而且还富含番茄红素的健康益处！`,
        en: `Not only is our lab-made meat product environmentally sustainable and cruelty-free, but it's also packed with the amazing health benefits of lycopene.`,
      },
    ],
    questions: [
      { zh: `人造肉的高效生产会不会让更多人的饮食需求得到满足？`, en: `Will the efficient production of lab-grown meat meet the dietary needs of more people?` },
      { zh: `如果我们的牧场在培养皿里，我们的大自然会不会变得更好？`, en: `If our farms were in petri dishes, would our nature be better off?` },
      { zh: `人造肉会解决社会中持续存在的关于动物及食物伦理的讨论吗？`, en: `Will lab-grown meat solve the ongoing ethical debates surrounding animals and food in society?` },
      { zh: `人造肉是从“同一个”——也就是天然的肉——中衍变出的“另一个”，TA将来是否能变成我们观念中的“同一个”呢？`, en: `Lab-made meat is the “other" derived from the “same” -- natural meat, but can it truly become the “same” in our minds in the future?` },
    ],
    box: {
      zh: `未来食品公司`,
      title: `Future Food Co.`,
      steps: [
        {
          zh: `改造超级酵母`,
          title: `Supercharged yeast`,
          text: {
            zh: `我们将使用一些神奇的科学技术，让我们的酵母变成超级英雄！我们会改变它的基因，使它能够产生一种叫做番茄红素的东西（可以让食物看起来像是“脸红”了）。`,
            en: `We're going to use some fancy science stuff to make our yeast into a superhero! We'll change its genes so that it can produce something called lycopene (which makes things look like they're blushing).`,
          },
        },
        {
          zh: `让我们来发酵`,
          title: `Let it ferment`,
          text: {
            zh: `接下来，我们将把超级酵母放到一个特殊的地方，让它施展魔力，制造番茄红素。我们会让它在那里呆上一段时间，并观察它制造出一种叫做“番茄红素菌泥”的东西（听起来很恶心，但相信我们，它很酷）。`,
            en: `Next, we'll put our supercharged yeast in a special place where it can work its magic and make lycopene. We'll let it hang out there for a while and watch as it creates something called "lycopene slurry" (sounds gross, but trust us, it's cool).`,
          },
        },
        {
          zh: `肉的颜色`,
          title: `Meaty color`,
          text: {
            zh: `现在是让我们的人造肉看起来更像真正的肉的时候了！我们将添加一些番茄红素菌泥到混合物中，哇！我们的肉会有一种自然的“血液”颜色。`,
            en: `Now it's time to make our fake meat look more like real meat! We'll add some of our lycopene slurry to the mix and voila! Our meat will have a natural-looking "blood" color.`,
          },
        },
        {
          zh: `塑造形状`,
          title: `Get some structure`,
          text: {
            zh: `我们不想让我们的肉只是一坨一坨的，所以我们将使用一种很酷的叫做海藻酸钠的物质来给它一些形状。就像是做肉的雕塑一样！`,
            en: `We don't want our meat to be just a blob, so we'll use a cool thing called sodium alginate to give it some shape. It's like making a sculpture out of meat!`,
          },
        },
        {
          zh: `准备上市`,
          title: `Ready to sell`,
          text: {
            zh: `最后，我们将把肉包装好并送到世界各地！`,
            en: `Finally, we'll wrap up our meat in a nice little package and send it out into the world!`,
          },
        },
      ],
    },
  },
];

export const epilogue: Pair[] = [
  {
    zh: `“新自然”中不仅融合着“自然”原本的生物，也包容着来自人类文明所创造出的生存方式。以此呈现出的“另一个，同一个”，或许会使你重新审视事物的多面性以及我们所生活的世界。`,
    en: `The “New Nature” not only integrates the original “nature” of living beings but also accommodates the survival methods created by human civilization. “The Other, the Same” presented in this way may make you re-examine the diversity of things and the world we live in.`,
  },
  {
    zh: `如同深圳从一个小渔村转化为国际化大都会，也许是“另一个”和“同一个”的循环更替卷动着这个世界不断交锋、融合、演变、发展。随着事物的不断变化，另一个终究会演化为同一个，而我们的世界也持续地从无数个个体变成包罗万象的共同体。`,
    en: `Just like Shenzhen transformed from a small fishing village into an international metropolis, perhaps the cycle of the “other” and the “same” is constantly colliding, merging, evolving, and developing in this world. With the constant changes in things, the “other” will ultimately evolve into the “same”, and our world will continue to evolve from countless individuals into an all-encompassing community.`,
  },
];

/** Credits, exactly as Eileen gave them. */
export const credits: CreditGroup[] = [
  {
    roles: [
      { role: `出品 Present`, names: [`深圳市南山区荟同学校 Shenzhen Nanshan Huitong School`] },
      { role: `制作 Produce`, names: [`设计互联 Design Society`] },
      { role: `项目策划 Project Planning`, names: [`荟同学校卓越中心 Huitong School Centre of Excellence`, `设计互联EDU Design Society EDU`] },
      { role: `策划与统筹 Planning and Coordination`, names: [`孔维伊 Weiyi Kong`, `罗洁琳 Jielin Luo`] },
    ],
  },
  {
    title: `课程 Learning Programme`,
    roles: [
      { role: `艺术家 Visiting Artist`, names: [`刘帅 Shuai Liu`] },
      { role: `华大教育中心科学家 BGI College Visiting Scientists`, names: [`丘璨瑜 博士 Dr. Canyu Chiu`, `熊燕葳 Yanwei Xiong`, `周静 Jing Zhou`, `张峰 Feng Zhang`, `卢洁 博士 Dr. Jie Lu`] },
      { role: `策展人 Visiting Curator`, names: [`王亭 Ting Wang`, `黄以然 Yiran Huang`] },
      { role: `荟同学校 Huitong School`, names: [`孔维伊 Weiyi Kong`, `杜静 博士 Dr. Jing Du`] },
      { role: `设计互联 Design Society`, names: [`赵蓉 Rong Zhao`] },
      { role: `助教 Teaching Assistants`, names: [`张志涛 Zhitao Zhang`, `宋雨馨 Yuxin Song`, `吴怡昕 Yixin Wu`, `崔榕琪 Rongqi Cui`, `陈美静 Meijing Chen`] },
    ],
  },
  {
    title: `展览 Exhibition`,
    roles: [
      { role: `展览统筹 Exhibition Coordination`, names: [`罗洁琳 Jielin Luo`, `孔维伊 Weiyi Kong`] },
      { role: `展览设计 Exhibition Design`, names: [`IOIOO (郑国祥 Guoxiang Zheng, 殷鹏飞 Pengfei Yin)`] },
      { role: `展览助理 Exhibition Assistant`, names: [`宋雨馨 Yuxin Song`] },
    ],
  },
  {
    title: `互动体验内容设计`,
    roles: [
      {
        role: `学生策展团队 Student Curators`,
        names: [`冯洁琳 Eileen Feng`, `胡云飞 Franklin Hu`, `黄乐之 Joyce Huang`, `黄媛琪 Elsa Huang`, `回祖霆 Owen Hui`, `金木兰 Isabella Jin`, `李子嘉 Bella Li`, `涂静怡 Mindee Tu`, `许涵放 Teson Xu`, `朱春天 Spring Zhu`, `邹亚伦 Anna Zou`],
      },
      {
        role: `学生艺术家 Student Artists`,
        names: [
          `陈奕鸣 Denny Chen`, `段雅甄 Janessa Duan`, `方逸轩 Andrew Fang`, `高楚凝 Rosanna Gao`, `高晏 Jane Gao`, `韩沁夏 Summer Han`, `胡予墨 Darren Hu`, `胡云浠 Brook Hu`, `花健妍 Flora Fa`, `黄欑珺 Amanda Huang`,
          `黄楷洋 Kevin Huang`, `黄梓杰 Jeremy Huang`, `李大方 Harry Li`, `李少毅 Angel Li`, `李芸薇 Kathy Li`, `梁子围 Weiwei Liang`, `廖子颉 Chris Liao`, `林晋右 Moscato Lin`, `刘彦杰 Alan Liu`, `柳昊言 Benjamin Liu`,
          `娄馨文 Wenwen Lou`, `邱徐乐芯 Lemon Qiu`, `谭韵怡 Elin Tan`, `王奕茹 Kity Wang`, `谢婷婷 Lucy Xie`, `谢毅燊 Eason Xie`, `张嘉桐 Paul Zhang`, `张睿恩 Ryan Zhang`, `张芯仪 Alice Zhang`, `张歆唯 Joyce Zhang`,
          `郑予菲 Sara Zheng`, `郑仲河 Bob Zheng`, `周敬雅 Julia Zhou`, `周宥存 Justin Zhou`, `曾志鹏 Andy Zeng`, `许涵放 Teson Xu`, `李子嘉 Bella Li`, `黄宇涵 Bobo Huang`, `李德锋 Franky Li`, `刘珏秀 Alex Liu`,
          `韩冠宇 Delan Han`, `严嫣 Nicole Yan`, `甘庭棫 Tano Gan`, `杜语萱 Yvonne Du`, `曹梓轩 Jason Cao`, `李子悦 Ally Li`, `蔡嘉敏 Carmen Cai`, `李宣宇 Jaden Lee`, `李宣旻 Leo Lee`, `武琳茜 Sisy Wu`,
        ],
      },
    ],
  },
  {
    roles: [
      { role: `图片 Catalogue images`, names: [`部分图片来自网络 Some images from the internet`, `展览照片：深圳市南山区荟同学校 Exhibition photographs: Shenzhen Nanshan Huitong School`] },
    ],
  },
];
