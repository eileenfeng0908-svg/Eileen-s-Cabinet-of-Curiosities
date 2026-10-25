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
  { id: "shenzhen", city: "Shenzhen", country: "China", landmark: "China Resources Tower (春笋)", lat: 22.5174, lon: 113.9446, art: "chinaResources", interactive: true, home: true, nudge: [-46, 4], photos: [] },
  { id: "hong-kong", city: "Hong Kong", country: "China", landmark: "Bank of China Tower", lat: 22.2793, lon: 114.1615, art: "bankOfChina", interactive: true, nudge: [26, 40], label: "right", photos: [] },
  { id: "shanghai", city: "Shanghai", country: "China", landmark: "Oriental Pearl Tower", lat: 31.2397, lon: 121.4998, art: "orientalPearl", interactive: true, nudge: [10, -22], label: "left", photos: [] },
  { id: "tokyo", city: "Tokyo", country: "Japan", landmark: "Tokyo Tower", lat: 35.6586, lon: 139.7454, art: "tokyoTower", interactive: true, nudge: [22, -10], label: "right", photos: [] },
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
  { id: "new-york", city: "New York City", country: "United States", landmark: "Statue of Liberty", lat: 40.6892, lon: -74.0445, art: "liberty", interactive: true, nudge: [-14, 16], photos: [] },
  { id: "boston", city: "Boston", country: "United States", landmark: "Old State House", lat: 42.3587, lon: -71.0575, art: "oldStateHouse", interactive: true, nudge: [26, -14], label: "right", photos: [] },
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
