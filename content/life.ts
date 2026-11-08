/**
 * LIFE, IN FRAGMENTS — the places on the atlas (/collections/life).
 *
 * Two kinds of landmark, told apart by `interactive`:
 *  - interactive: true  → one of Eileen's eleven cities. Drawn with a white
 *    pencil outline, and opens that city's gallery.
 *  - interactive: false → decoration only. No outline, no hover, no click,
 *    no gallery. These are NOT places Eileen claims to have visited.
 *
 * `lat`/`lon` are the landmark's real coordinates. `nudge` lifts a drawing
 * away from a close neighbour when the whole world is in view (in map units);
 * it shrinks as you zoom in, so every landmark settles on its true place.
 * `art` names the drawing in components/life/landmarks.tsx. To use a painted
 * image instead, set `image` to a transparent PNG/WebP in /public: the white
 * outline follows its shape automatically.
 *
 * Photos: each city's `photos` list is its gallery, shown in the order
 * written here. Put the files in /public/images/life/<city id>/ and add
 * one entry per photo, e.g.
 *   { src: "/images/life/tokyo/01.jpg", width: 1600, height: 1200,
 *     alt: "What the photo shows", caption: "Optional words", date: "2024-05" }
 * `width`/`height` are the file's pixel size (only the shape matters).
 * Leave the list empty until there are real ones: the gallery then says
 * "Photographs will find their way here."
 */

export interface LifePhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  /** ISO date or a year, if known. */
  date?: string;
}

interface Base {
  id: string;
  city: string;
  country: string;
  landmark: string;
  lat: number;
  lon: number;
  art: string;
  image?: string;
  nudge?: [number, number];
  /** Where the city's name sits: below the drawing (default), or beside it to keep clear of a neighbour. */
  label?: "left" | "right";
  /** Size relative to the others (1 = usual). */
  scale?: number;
}

export interface CityLandmark extends Base {
  interactive: true;
  /** Shenzhen only. */
  home?: boolean;
  /** Eileen's own words about the city, one string per paragraph, shown above the photos. */
  intro?: string[];
  photos: LifePhoto[];
}

export interface DecorativeLandmark extends Base {
  interactive: false;
}

export type Landmark = CityLandmark | DecorativeLandmark;

export const cities: CityLandmark[] = [
  { id: "shenzhen", city: "Shenzhen", country: "China", landmark: "China Resources Tower (春笋)", lat: 22.5174, lon: 113.9446, art: "chinaResources", interactive: true, home: true, nudge: [-46, 4],
    intro: [
      "I was two or three when my family moved from our hometown to Shenzhen. It became the place I grew up, and as I grew, so did the city. I remember stretches of sea where buildings now stand. Year by year, the water seemed to retreat from my life, while the skyline rose higher.",
      "Sometimes I look around and wonder whether I still know this city I call home. So much of it is new. But then I walk through a park in the winter sunlight, step onto campus, or spend an afternoon exploring with friends, and I begin to think that home need not be a place I recognise at every turn.",
      "Shenzhen keeps changing. Still, there is a particular chill in its winter air, a scent that rises from the earth when the rain begins. Wherever else I go, I have never found them quite the same.",
      "This is how I know I am home.",
    ],
    photos: [
      { src: "/images/life/shenzhen/01.jpg", width: 1500, height: 2000, alt: "The China Resources Tower rising over the bay, a cow sculpture resting on the lawn" },
      { src: "/images/life/shenzhen/02.jpg", width: 1500, height: 2000, alt: "A mirrored steel wave sculpture by the water under a clear sky" },
      { src: "/images/life/shenzhen/03.jpg", width: 1500, height: 2000, alt: "A twisting silver arch standing in a shallow pool" },
      { src: "/images/life/shenzhen/04.jpg", width: 1500, height: 2000, alt: "A looping red sculpture before a crowded plaza and glass towers" },
      { src: "/images/life/shenzhen/05.jpg", width: 1500, height: 2000, alt: "A lit Christmas tree among night-time skyscrapers" },
      { src: "/images/life/shenzhen/06.jpg", width: 1500, height: 2000, alt: "A cat on an old carved balcony beneath tangled wires and blue sky" },
      { src: "/images/life/shenzhen/07.jpg", width: 1500, height: 2000, alt: "A tabby cat dozing on a pebbled path beside potted plants" },
      { src: "/images/life/shenzhen/08.jpg", width: 1125, height: 2000, alt: "Patches of sunlight falling across a white wall under old eaves" },
      { src: "/images/life/shenzhen/09.jpg", width: 1500, height: 2000, alt: "Figures walking through a pale curved tunnel lit by round openings" },
      { src: "/images/life/shenzhen/10.jpg", width: 1500, height: 2000, alt: "Friends reflected in an ornate gilded mirror topped with pigeons" },
      { src: "/images/life/shenzhen/11.jpg", width: 1500, height: 2000, alt: "Instant photos of friends scattered across denim, with handwritten notes" },
      { src: "/images/life/shenzhen/12.jpg", width: 1500, height: 2000, alt: "Instant photos spread over a table beside a vase of roses" },
      { src: "/images/life/shenzhen/13.jpg", width: 1500, height: 2000, alt: "A selfie with a friend" },
      { src: "/images/life/shenzhen/14.jpg", width: 2000, height: 1500, alt: "A selfie with a friend at an evening party" },
      { src: "/images/life/shenzhen/15.jpg", width: 2000, height: 1333, alt: "A birthday party with friends, blue balloons and a cake" },
      { src: "/images/life/shenzhen/16.jpg", width: 1333, height: 2000, alt: "An instax of two friends posing" },
      { src: "/images/life/shenzhen/17.jpg", width: 1500, height: 2000, alt: "Two friends with a heart-shaped cake and candles" },
      { src: "/images/life/shenzhen/18.jpg", width: 2000, height: 1500, alt: "A night selfie by a window over the city" },
      { src: "/images/life/shenzhen/19.jpg", width: 1125, height: 2000, alt: "A three-panel selfie strip with a friend" },
      { src: "/images/life/shenzhen/20.jpg", width: 2000, height: 1333, alt: "A My Melody photo-booth sheet" },
      { src: "/images/life/shenzhen/21.jpg", width: 2000, height: 1332, alt: "Huitong School graduation ceremony, Class of 2026" },
      { src: "/images/life/shenzhen/22.jpg", width: 2000, height: 1332, alt: "Friends at the Huitong School graduation ceremony, Class of 2026" },
    ] },
  { id: "hong-kong", city: "Hong Kong", country: "China", landmark: "Bank of China Tower", lat: 22.2793, lon: 114.1615, art: "bankOfChina", interactive: true, nudge: [26, 40], label: "right", photos: [] },
  { id: "shanghai", city: "Shanghai", country: "China", landmark: "Oriental Pearl Tower", lat: 31.2397, lon: 121.4998, art: "orientalPearl", interactive: true, nudge: [10, -22], label: "left", photos: [] },
  { id: "tokyo", city: "Tokyo", country: "Japan", landmark: "Tokyo Tower", lat: 35.6586, lon: 139.7454, art: "tokyoTower", interactive: true, nudge: [22, -10], label: "right",
    intro: [
      "In Tokyo, March arrives in blossoms. I remember wandering through the parks with my camera over my shoulder, searching the branches for those first, shy shades of pink.",
      "In the rain, Tokyo turns blue. Warm yellow light spills from shop windows, softening the chill. Along the narrow, rain-darkened streets, people pass beneath their umbrellas, bound for places I will never know.",
      "The stickers scattered across the city remind me of New York. I stop to look at them, one by one: new layers covering old ones, faded colours, peeling edges, fragments of words showing through. Left by strangers, weathered by sun and rain, they have slowly become part of the city’s skin.",
    ],
    photos: [
      { src: "/images/life/tokyo/01.jpg", width: 2000, height: 1333, alt: "Cherry blossom branches against a clear blue sky" },
      { src: "/images/life/tokyo/02.jpg", width: 2000, height: 1333, alt: "A canopy of pale pink cherry blossom" },
      { src: "/images/life/tokyo/03.jpg", width: 2000, height: 1333, alt: "Fallen petals scattered over dry leaves and grass" },
      { src: "/images/life/tokyo/04.jpg", width: 2000, height: 1333, alt: "Baskets of blue and violet hydrangeas outside a shopfront" },
      { src: "/images/life/tokyo/05.jpg", width: 2000, height: 1333, alt: "Crowds beneath the great red lantern of Kaminarimon gate, Asakusa" },
      { src: "/images/life/tokyo/06.jpg", width: 2000, height: 1333, alt: "Looking up at the giant red-and-black lantern under the Hōzōmon gate" },
      { src: "/images/life/tokyo/07.jpg", width: 2000, height: 1333, alt: "Nakamise street hung with red and white blossom ornaments, the temple gate beyond" },
      { src: "/images/life/tokyo/08.jpg", width: 2000, height: 1333, alt: "Incense smoke drifting over the crowds at Sensō-ji, seen from the main hall" },
      { src: "/images/life/tokyo/09.jpg", width: 2000, height: 1333, alt: "A sunlit Asakusa side street with a yaki dango banner and shuttered red shopfronts" },
      { src: "/images/life/tokyo/10.jpg", width: 2000, height: 1333, alt: "Rows of white paper lanterns inscribed with names" },
      { src: "/images/life/tokyo/11.jpg", width: 2000, height: 1333, alt: "An omikuji fortune slip, number forty-four, printed in black" },
      { src: "/images/life/tokyo/12.jpg", width: 2000, height: 1333, alt: "A box of rolled fortune slips and coloured papers at a temple stall" },
      { src: "/images/life/tokyo/13.jpg", width: 2000, height: 1333, alt: "Strawberry daifuku wrapped in cellophane, marked 500 yen" },
      { src: "/images/life/tokyo/14.jpg", width: 2000, height: 1333, alt: "A white swan among ducks and coots on grey water" },
      { src: "/images/life/tokyo/15.jpg", width: 2000, height: 1333, alt: "A man with a blue umbrella beside a vending machine on a rainy street" },
      { src: "/images/life/tokyo/16.jpg", width: 2000, height: 1333, alt: "Office towers and car lights reflected on a wet road at night" },
      { src: "/images/life/tokyo/17.jpg", width: 2000, height: 1333, alt: "A rain-speckled night street lit by shop signs and a single lamp" },
      { src: "/images/life/tokyo/18.jpg", width: 2000, height: 1333, alt: "A narrow evening alley of signs and wires, people walking towards the camera" },
      { src: "/images/life/tokyo/19.jpg", width: 2000, height: 1333, alt: "A pole thick with stickers beside vending machines" },
      { src: "/images/life/tokyo/20.jpg", width: 2000, height: 1333, alt: "Sticker-covered pillars beside glowing Kirin and Coca-Cola vending machines" },
      { src: "/images/life/tokyo/21.jpg", width: 2000, height: 1333, alt: "Stickers layered on a metal pole: Make Your Mark on Society, Sea Walls, Mr. Brian Design" },
      { src: "/images/life/tokyo/22.jpg", width: 1500, height: 2000, alt: "A lamppost covered in peeling, overlapping stickers in the sun" },
      { src: "/images/life/tokyo/23.jpg", width: 1500, height: 2000, alt: "A yellow Two Down poster on a blue vending machine: Values, we’ve hammered down the prices" },
      { src: "/images/life/tokyo/24.jpg", width: 1125, height: 2000, alt: "A black hot rod idling in a sunny Ginza side street" },
      { src: "/images/life/tokyo/25.jpg", width: 1500, height: 2000, alt: "Go-karts driven by people in animal onesies crossing a Shibuya junction" },
      { src: "/images/life/tokyo/26.jpg", width: 2000, height: 1485, alt: "A no-entry sign and overhead wires in black and white, the sign still red" },
      { src: "/images/life/tokyo/27.jpg", width: 1500, height: 2000, alt: "Bare winter branches against a pale blue sky" },
    ] },
  { id: "kyoto", city: "Kyoto", country: "Japan", landmark: "Yasaka Pagoda", lat: 34.9985, lon: 135.7798, art: "yasaka", interactive: true, nudge: [-10, 22], intro: [
      "Kyoto feels different from Tokyo, or anywhere else in Japan. There is a particular sense of peace here, as though time moves a little more slowly. From the hillside, I look out towards the distant pagodas and temples, their silhouettes rising quietly above the city.",
      "In Kyoto, I inevitably become a matcha person. I watch as the tea is whisked into a delicate layer of foam before being poured into a cup. There is something comforting about the ritual, about watching each movement unfold without hurry. I find myself enjoying the feeling of time slowing down.",
      "And then there is Kyoto in a simple glass of coffee float. Vanilla ice cream slowly melts into the Americano, while the sweetness of a chocolate biscuit softens its bitterness. On a silver plate, French toast is still warm, fragrant with butter and milk, its sweetness lingering with every bite.",
      "Perhaps this is what Kyoto feels like to me: a city where even the smallest moments are worth lingering over.",
    ], photos: [
      { src: "/images/life/kyoto/01.jpg", width: 1200, height: 1600, alt: "Baristas whisking matcha at a stone counter" },
      { src: "/images/life/kyoto/02.jpg", width: 1200, height: 1600, alt: "Matcha soft serve over a milky matcha drink, with a wooden spoon" },
      { src: "/images/life/kyoto/03.jpg", width: 1600, height: 1200, alt: "Two people in kimono on a bench, watching the sun set over Kyoto" },
      { src: "/images/life/kyoto/04.jpg", width: 1200, height: 1600, alt: "A selfie in a convenience-store mirror" },
      { src: "/images/life/kyoto/05.jpg", width: 1600, height: 1200, alt: "Iced coffee with ice cream, a cookie and a tart by a café window" },
      { src: "/images/life/kyoto/06.jpg", width: 1200, height: 1600, alt: "Matcha drinks and dango on a tray, with a Japanese garden behind" },
      { src: "/images/life/kyoto/07.jpg", width: 1200, height: 1600, alt: "A latte, pudding, canelé and French toast with ice cream on a café table" },
      { src: "/images/life/kyoto/08.jpg", width: 900, height: 1600, alt: "A cookie and an iced coffee with ice cream by a window" },
      { src: "/images/life/kyoto/09.jpg", width: 900, height: 1600, alt: "An autumn tree over a Kyoto street, with the words “Autumn comes”" },
    ] },
  { id: "london", city: "London", country: "United Kingdom", landmark: "London Eye", lat: 51.5033, lon: -0.1196, art: "londonEye", interactive: true, scale: 0.72, nudge: [-30, -6], label: "left", photos: [] },
  { id: "paris", city: "Paris", country: "France", landmark: "Eiffel Tower", lat: 48.8584, lon: 2.2945, art: "eiffel", interactive: true, scale: 0.85, nudge: [16, 22], photos: [] },
  { id: "new-york", city: "New York City", country: "United States", landmark: "Statue of Liberty", lat: 40.6892, lon: -74.0445, art: "liberty", interactive: true, nudge: [-14, 16],
    intro: [
      "Coming from Shenzhen, I never quite understood how people fell in love with New York. It took three summers for me to understand.",
      "The first year, the city felt loud and heavy. Between its towering buildings, I felt hemmed in, cut off from the blue sky overhead.",
      "The second year, something began to soften. I wandered down quiet streets, past walls covered in graffiti, and began to feel a warmth I had missed before. Beneath the steel and concrete, in the small spaces between things, New York was revealing itself to me.",
      "By the third summer, there were moments I knew I would carry home: rushing towards a Mark Rothko painting at MoMA, unable to contain my excitement; standing before *The Dance*, which I had painted a year earlier, now there in front of me. At the Met, I marvelled at marble sculptures and felt the sudden joy of finding a Renoir.",
      "But when I think of New York now, I remember the sun in Washington Square Park, the fountain scattering drops of water into the light. I remember my favourite udon, and the Thai food in NoHo.",
      "Somewhere across those three summers, I had fallen in love with New York, too.",
    ],
    photos: [
      { src: "/images/life/new-york/01.jpg", width: 1500, height: 2000, alt: "Times Square between the towers" },
      { src: "/images/life/new-york/02.jpg", width: 1499, height: 2000, alt: "A street sign on Fashion Avenue" },
      { src: "/images/life/new-york/03.jpg", width: 1500, height: 2000, alt: "A street of red-brick buildings with a painted mural" },
      { src: "/images/life/new-york/04.jpg", width: 1500, height: 2000, alt: "People crossing a sunlit street, seen from above" },
      { src: "/images/life/new-york/05.jpg", width: 1500, height: 2000, alt: "A wall covered in posters and graffiti" },
      { src: "/images/life/new-york/06.jpg", width: 1500, height: 2000, alt: "A chalk message on the pavement" },
      { src: "/images/life/new-york/07.jpg", width: 2000, height: 1500, alt: "Another chalk message on the pavement: Can we still fall in love this summer?" },
      { src: "/images/life/new-york/08.jpg", width: 1500, height: 2000, alt: "The doorway of East Village Books" },
      { src: "/images/life/new-york/09.jpg", width: 1500, height: 2000, alt: "Looking out through a shop window onto the street" },
      { src: "/images/life/new-york/10.jpg", width: 1500, height: 2000, alt: "Art magazines on shelves" },
      { src: "/images/life/new-york/11.jpg", width: 1500, height: 2000, alt: "Shelves of second-hand books" },
      { src: "/images/life/new-york/12.jpg", width: 1500, height: 2000, alt: "Books hanging from the ceiling of a bookshop" },
      { src: "/images/life/new-york/13.jpg", width: 1500, height: 2000, alt: "A colour-wheel print on a white wall" },
      { src: "/images/life/new-york/14.jpg", width: 2000, height: 1125, alt: "The spiral ramps of the Guggenheim" },
      { src: "/images/life/new-york/15.jpg", width: 1500, height: 2000, alt: "Looking up through the Guggenheim's spiral to the skylight" },
      { src: "/images/life/new-york/16.jpg", width: 1320, height: 702, alt: "Reading on a bench inside the Guggenheim" },
      { src: "/images/life/new-york/17.jpg", width: 1500, height: 2000, alt: "A round mirror artwork reflecting the gallery" },
      { src: "/images/life/new-york/18.jpg", width: 2000, height: 1127, alt: "A small television artwork on the floor" },
      { src: "/images/life/new-york/19.jpg", width: 2000, height: 1500, alt: "A black-and-white film projected in a dark gallery" },
      { src: "/images/life/new-york/20.jpg", width: 1500, height: 2000, alt: "A Mark Rothko painting at MoMA" },
      { src: "/images/life/new-york/21.jpg", width: 1125, height: 2000, alt: "Standing before a Mark Rothko painting" },
      { src: "/images/life/new-york/22.jpg", width: 2000, height: 1500, alt: "Matisse's The Dance at MoMA" },
      { src: "/images/life/new-york/23.jpg", width: 2000, height: 1500, alt: "A sketchbook held up in front of The Dance" },
      { src: "/images/life/new-york/24.jpg", width: 2000, height: 1423, alt: "A sketchbook page drawn in blue ink" },
      { src: "/images/life/new-york/25.jpg", width: 1500, height: 2000, alt: "A Matisse painting with The Dance in the background" },
      { src: "/images/life/new-york/26.jpg", width: 2000, height: 1500, alt: "A framed painting of a sunny interior" },
      { src: "/images/life/new-york/27.jpg", width: 1499, height: 2000, alt: "A Klimt portrait of a girl in a white dress" },
      { src: "/images/life/new-york/28.jpg", width: 1500, height: 2000, alt: "A marble sculpture in a museum court" },
      { src: "/images/life/new-york/29.jpg", width: 1500, height: 2000, alt: "Two veiled marble figures" },
      { src: "/images/life/new-york/30.jpg", width: 1500, height: 2000, alt: "A bronze sculpture of a family in a garden" },
      { src: "/images/life/new-york/31.jpg", width: 2000, height: 1125, alt: "The fountain and arch in Washington Square Park" },
      { src: "/images/life/new-york/32.jpg", width: 2000, height: 1125, alt: "A pond in Central Park on a summer afternoon" },
      { src: "/images/life/new-york/33.jpg", width: 1500, height: 2000, alt: "Model sailboats on a pond in Central Park" },
      { src: "/images/life/new-york/34.jpg", width: 1125, height: 2000, alt: "A sketch of sailing boats" },
      { src: "/images/life/new-york/35.jpg", width: 1500, height: 2000, alt: "A sketchbook open on a table" },
      { src: "/images/life/new-york/36.jpg", width: 2000, height: 1500, alt: "Matcha being whisked" },
      { src: "/images/life/new-york/37.jpg", width: 1500, height: 2000, alt: "A Caesar salad and iced drinks" },
      { src: "/images/life/new-york/38.jpg", width: 1500, height: 2000, alt: "A burger and fresh fruit at brunch" },
      { src: "/images/life/new-york/39.jpg", width: 1320, height: 1978, alt: "Coffee, pastries and fruit spread across a table" },
      { src: "/images/life/new-york/40.jpg", width: 1125, height: 2000, alt: "A giant bagel and a soda in the sun" },
      { src: "/images/life/new-york/41.jpg", width: 1500, height: 2000, alt: "Sitting at a table set for dinner" },
    ],
  },
  { id: "boston", city: "Boston", country: "United States", landmark: "Old State House", lat: 42.3587, lon: -71.0575, art: "oldStateHouse", interactive: true, nudge: [26, -14], label: "right",
    intro: [
      "By a turn of chance, the summer of 2025 became a Boston summer.",
      "I remember taking classes with my friends at Harvard, the research and conversations that filled our days. After class, we went for slices at Joe’s Pizza in Harvard Square. We spent afternoons exploring library archives, and sat in Lamont barely daring to speak.",
      "Summer at Harvard was fierce with heat, then suddenly all wind and rain. On two separate Sundays, I stepped out of Starbucks into a downpour. Students and visiting parents crowded beneath the same overhang, watching the rain and waiting for a chance to leave. Back at the dorm, we found that the rain had made its way into our room.",
      "But the sunlight in Cambridge was dazzling. After the storms, I watched squirrels and rabbits return to the lawns, and birds stop to drink from puddles. I still find myself thinking of the used books downstairs at Harvard Book Store: the stickers on the shelves, the pages I turned, the faded lettering and broken covers. There was something tender about those books, about all the years they had survived before finding their way into my hands.",
      "I remember the thrill of studying the American Revolution in a city where I could walk the Freedom Trail after class. And everywhere, it seemed, there were lobsters.",
      "So much of New England stays with me. Sometimes it comes back as sunlight on wet grass; sometimes as a worn book cover, or the sound of rain that kept us all beneath the same roof a little longer.",
    ],
    photos: [
      { src: "/images/life/boston/01.jpg", width: 2000, height: 1198, alt: "A handmade Boston collage" },
      { src: "/images/life/boston/02.jpg", width: 1500, height: 2000, alt: "A path past red-brick buildings on a summer evening" },
      { src: "/images/life/boston/03.jpg", width: 1333, height: 2000, alt: "The Paul Revere statue at the end of a tree-lined mall" },
      { src: "/images/life/boston/04.jpg", width: 1333, height: 2000, alt: "A plaque of bronze footprints set into the pavement" },
      { src: "/images/life/boston/05.jpg", width: 1500, height: 2000, alt: "The marquee of the Coolidge Corner Theatre" },
      { src: "/images/life/boston/06.jpg", width: 1500, height: 2000, alt: "The window of Million Year Picnic, a comics shop" },
      { src: "/images/life/boston/07.jpg", width: 1500, height: 2000, alt: "A Sartre coffee cartoon pinned up beside a bookshelf" },
      { src: "/images/life/boston/08.jpg", width: 1500, height: 2000, alt: "Posters and notes on a bookshop pillar" },
      { src: "/images/life/boston/09.jpg", width: 1500, height: 2000, alt: "A Little Free Library cart full of books" },
      { src: "/images/life/boston/10.jpg", width: 1500, height: 2000, alt: "A rack of old postcards in a little shop" },
      { src: "/images/life/boston/11.jpg", width: 1500, height: 2000, alt: "Plush toys and trinkets in a gift shop" },
      { src: "/images/life/boston/12.jpg", width: 2000, height: 1500, alt: "A courtyard garden inside a museum" },
      { src: "/images/life/boston/13.jpg", width: 1500, height: 2000, alt: "Stained glass and pews inside a church" },
      { src: "/images/life/boston/14.jpg", width: 1500, height: 2000, alt: "A mist sculpture rising over stones on a lawn" },
      { src: "/images/life/boston/15.jpg", width: 1500, height: 2000, alt: "Light through a window in a dark room" },
      { src: "/images/life/boston/16.jpg", width: 1500, height: 2000, alt: "A mirror selfie in a carved wooden mirror" },
      { src: "/images/life/boston/17.jpg", width: 1500, height: 2000, alt: "A mirror selfie with a friend among framed pictures" },
      { src: "/images/life/boston/18.jpg", width: 1500, height: 2000, alt: "A mirror selfie in a red room" },
      { src: "/images/life/boston/19.jpg", width: 1500, height: 2000, alt: "A salad and coffee at breakfast" },
      { src: "/images/life/boston/20.jpg", width: 1125, height: 2000, alt: "Lobster dinner with fries" },
      { src: "/images/life/boston/21.jpg", width: 1080, height: 1920, alt: "A slice of pizza on a paper plate" },
      { src: "/images/life/boston/22.jpg", width: 2000, height: 1500, alt: "Presenting a research poster on insomnia and depression" },
      { src: "/images/life/boston/23.jpg", width: 2000, height: 1500, alt: "A pencil drawing held up against a corkboard" },
      { src: "/images/life/boston/24.jpg", width: 1500, height: 2000, alt: "A photo together outside a red-brick arched doorway" },
      { src: "/images/life/boston/25.jpg", width: 2000, height: 1125, alt: "A group selfie with friends" },
      { src: "/images/life/boston/26.jpg", width: 2000, height: 1500, alt: "A selfie with a friend at an outdoor table" },
      { src: "/images/life/boston/27.jpg", width: 2000, height: 1500, alt: "A hot-pot dinner with friends" },
      { src: "/images/life/boston/28.jpg", width: 2000, height: 1500, alt: "Two friends inside an arena before a show" },
      { src: "/images/life/boston/29.jpg", width: 2000, height: 1500, alt: "Two friends inside an arena before a show" },
      { src: "/images/life/boston/30.jpg", width: 895, height: 1342, alt: "Two friends at a concert" },
    ],
  },
  { id: "san-francisco", city: "San Francisco", country: "United States", landmark: "Golden Gate Bridge", lat: 37.8199, lon: -122.4783, art: "goldenGate", interactive: true, nudge: [-30, -8], label: "left", photos: [] },
  { id: "los-angeles", city: "Los Angeles", country: "United States", landmark: "Griffith Observatory", lat: 34.1184, lon: -118.3004, art: "griffith", interactive: true, nudge: [14, 16], photos: [] },
];

export const decorations: DecorativeLandmark[] = [
  { id: "rome", city: "Rome", country: "Italy", landmark: "Colosseum", lat: 41.8902, lon: 12.4922, art: "colosseum", interactive: false, nudge: [16, 10] },
  { id: "barcelona", city: "Barcelona", country: "Spain", landmark: "Sagrada Família", lat: 41.4036, lon: 2.1744, art: "sagrada", interactive: false, nudge: [-22, 22] },
  { id: "athens", city: "Athens", country: "Greece", landmark: "Parthenon", lat: 37.9715, lon: 23.7267, art: "parthenon", interactive: false, nudge: [6, 26] },
  { id: "istanbul", city: "Istanbul", country: "Türkiye", landmark: "Hagia Sophia", lat: 41.0086, lon: 28.9802, art: "hagiaSophia", interactive: false, nudge: [26, 4] },
  { id: "cairo", city: "Cairo", country: "Egypt", landmark: "Great Pyramid of Giza", lat: 29.9792, lon: 31.1342, art: "pyramids", interactive: false, nudge: [4, 14] },
  { id: "moscow", city: "Moscow", country: "Russia", landmark: "St Basil's Cathedral", lat: 55.7525, lon: 37.6231, art: "stBasil", interactive: false },
  { id: "agra", city: "Agra", country: "India", landmark: "Taj Mahal", lat: 27.1751, lon: 78.0421, art: "tajMahal", interactive: false },
  { id: "beijing", city: "Beijing", country: "China", landmark: "Temple of Heaven", lat: 39.8822, lon: 116.4066, art: "templeOfHeaven", interactive: false, nudge: [-20, -34] },
  { id: "singapore", city: "Singapore", country: "Singapore", landmark: "Marina Bay Sands", lat: 1.2834, lon: 103.8607, art: "marinaBay", interactive: false },
  { id: "sydney", city: "Sydney", country: "Australia", landmark: "Sydney Opera House", lat: -33.8568, lon: 151.2153, art: "operaHouse", interactive: false },
  { id: "rio", city: "Rio de Janeiro", country: "Brazil", landmark: "Christ the Redeemer", lat: -22.9519, lon: -43.2105, art: "redeemer", interactive: false },
  { id: "marrakech", city: "Marrakech", country: "Morocco", landmark: "Koutoubia Mosque", lat: 31.6237, lon: -7.9937, art: "koutoubia", interactive: false },
  { id: "djenne", city: "Djenné", country: "Mali", landmark: "Great Mosque of Djenné", lat: 13.9053, lon: -4.5552, art: "djenne", interactive: false },
  { id: "kilimanjaro", city: "Kilimanjaro", country: "Tanzania", landmark: "Mount Kilimanjaro", lat: -3.0674, lon: 37.3556, art: "kilimanjaro", interactive: false },
  { id: "cape-point", city: "Cape Point", country: "South Africa", landmark: "Cape Point Lighthouse", lat: -34.3568, lon: 18.497, art: "capeLighthouse", interactive: false },
  { id: "machu-picchu", city: "Machu Picchu", country: "Peru", landmark: "Machu Picchu", lat: -13.1631, lon: -72.545, art: "machuPicchu", interactive: false },
  { id: "buenos-aires", city: "Buenos Aires", country: "Argentina", landmark: "Obelisco", lat: -34.6037, lon: -58.3816, art: "obelisco", interactive: false },
  { id: "rapa-nui", city: "Rapa Nui", country: "Chile", landmark: "Moai", lat: -27.1127, lon: -109.3497, art: "moai", interactive: false },
  { id: "reykjavik", city: "Reykjavík", country: "Iceland", landmark: "Harpa Concert Hall", lat: 64.1505, lon: -21.9326, art: "harpa", interactive: false, nudge: [-34, -6] },
  { id: "borgund", city: "Borgund", country: "Norway", landmark: "Borgund Stave Church", lat: 61.0475, lon: 7.8123, art: "staveChurch", interactive: false, nudge: [12, -26] },
  { id: "uluru", city: "Uluru", country: "Australia", landmark: "Uluru", lat: -25.3444, lon: 131.0369, art: "uluru", interactive: false },
  { id: "auckland", city: "Auckland", country: "New Zealand", landmark: "Sky Tower", lat: -36.8485, lon: 174.7622, art: "skyTower", interactive: false },
  { id: "bora-bora", city: "Bora Bora", country: "French Polynesia", landmark: "Overwater bungalows", lat: -16.5004, lon: -151.7415, art: "boraBora", interactive: false },
  { id: "bali", city: "Bali", country: "Indonesia", landmark: "Pura Ulun Danu Bratan", lat: -8.2752, lon: 115.1668, art: "ulunDanu", interactive: false },
  { id: "honolulu", city: "Honolulu", country: "United States", landmark: "Aloha Tower", lat: 21.3069, lon: -157.8664, art: "alohaTower", interactive: false },
  { id: "chichen-itza", city: "Yucatán", country: "Mexico", landmark: "El Castillo, Chichén Itzá", lat: 20.6843, lon: -88.5678, art: "chichenItza", interactive: false },
];

export const landmarks: Landmark[] = [...decorations, ...cities];
export const getCity = (id: string) => cities.find((c) => c.id === id);
