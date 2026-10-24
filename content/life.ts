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
 * Photos (added later, phase 4): each city's `photos` list is its gallery,
 * shown in the order written here. Leave it empty until there are real ones.
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
  photos: LifePhoto[];
}

export interface DecorativeLandmark extends Base {
  interactive: false;
}

export type Landmark = CityLandmark | DecorativeLandmark;

export const cities: CityLandmark[] = [
  { id: "shenzhen", city: "Shenzhen", country: "China", landmark: "China Resources Tower (春笋)", lat: 22.5174, lon: 113.9446, art: "chinaResources", interactive: true, home: true, nudge: [-40, -10], photos: [] },
  { id: "hong-kong", city: "Hong Kong", country: "China", landmark: "Bank of China Tower", lat: 22.2793, lon: 114.1615, art: "bankOfChina", interactive: true, nudge: [30, 22], label: "right", photos: [] },
  { id: "shanghai", city: "Shanghai", country: "China", landmark: "Oriental Pearl Tower", lat: 31.2397, lon: 121.4998, art: "orientalPearl", interactive: true, nudge: [12, -14], photos: [] },
  { id: "tokyo", city: "Tokyo", country: "Japan", landmark: "Tokyo Tower", lat: 35.6586, lon: 139.7454, art: "tokyoTower", interactive: true, nudge: [22, -10], label: "right", photos: [] },
  { id: "kyoto", city: "Kyoto", country: "Japan", landmark: "Yasaka Pagoda", lat: 34.9985, lon: 135.7798, art: "yasaka", interactive: true, nudge: [-10, 22], photos: [] },
  { id: "london", city: "London", country: "United Kingdom", landmark: "Elizabeth Tower", lat: 51.5007, lon: -0.1246, art: "elizabethTower", interactive: true, nudge: [-26, -12], label: "left", photos: [] },
  { id: "paris", city: "Paris", country: "France", landmark: "Eiffel Tower", lat: 48.8584, lon: 2.2945, art: "eiffel", interactive: true, nudge: [10, 8], photos: [] },
  { id: "new-york", city: "New York City", country: "United States", landmark: "Empire State Building", lat: 40.7484, lon: -73.9857, art: "empireState", interactive: true, nudge: [-14, 16], photos: [] },
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
  { id: "beijing", city: "Beijing", country: "China", landmark: "Temple of Heaven", lat: 39.8822, lon: 116.4066, art: "templeOfHeaven", interactive: false, nudge: [-14, -6] },
  { id: "singapore", city: "Singapore", country: "Singapore", landmark: "Marina Bay Sands", lat: 1.2834, lon: 103.8607, art: "marinaBay", interactive: false },
  { id: "sydney", city: "Sydney", country: "Australia", landmark: "Sydney Opera House", lat: -33.8568, lon: 151.2153, art: "operaHouse", interactive: false },
  { id: "rio", city: "Rio de Janeiro", country: "Brazil", landmark: "Christ the Redeemer", lat: -22.9519, lon: -43.2105, art: "redeemer", interactive: false },
  { id: "chichen-itza", city: "Yucatán", country: "Mexico", landmark: "El Castillo, Chichén Itzá", lat: 20.6843, lon: -88.5678, art: "chichenItza", interactive: false },
];

export const landmarks: Landmark[] = [...decorations, ...cities];
export const getCity = (id: string) => cities.find((c) => c.id === id);
