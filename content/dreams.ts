/**
 * Dream trips: places Eileen hasn't been yet but would love to go.
 * Shown on the Life page below the atlas. The first photo is the cover.
 * `pixel: true` keeps pixel-art screenshots crisp when scaled.
 */
export type DreamPhoto = { src: string; width: number; height: number; alt: string; pixel?: boolean };
export type DreamTrip = { id: string; place: string; title: string; reason: string; photos: DreamPhoto[] };

export const dreamTrips: DreamTrip[] = [
  {
    id: "iceland",
    place: "Iceland",
    title: "Trip to Iceland",
    reason:
      "I’ve wanted to visit Iceland ever since watching *Fire of Love*! I’m also a huge fan of Olafur Eliasson, and I love how he plays with light, space, and nature in his art. I’d love to see the landscapes that inspire his work in person.",
    photos: [
      { src: "/images/life/dreams/iceland-1.jpg", width: 858, height: 960, alt: "A volcano erupting, with rivers of lava running down from the crater" },
      { src: "/images/life/dreams/iceland-2.jpg", width: 736, height: 980, alt: "A waterfall pouring over green cliffs, with a rainbow in the spray" },
      { src: "/images/life/dreams/iceland-3.jpg", width: 768, height: 512, alt: "Olafur Eliasson with his hand on a block of glacial ice" },
    ],
  },
  {
    id: "stardew-valley",
    place: "Stardew Valley",
    title: "Trip to Stardew Valley",
    reason:
      "If Stardew Valley were a real place, I’d move there in a heartbeat! I just want to grow strawberries, make friends with everyone in town, give little gifts to the people I love, and enjoy a simple life filled with love and happiness.",
    photos: [
      { src: "/images/life/dreams/stardew-1.jpg", width: 1000, height: 1000, alt: "Pixel art: two farmers, a cat, a teddy bear and a snowman beside a Christmas tree", pixel: true },
      { src: "/images/life/dreams/stardew-2.jpg", width: 2000, height: 1125, alt: "Stardew Valley on a laptop in a café, beside an iced matcha, a lemonade and a slice of crêpe cake" },
      { src: "/images/life/dreams/stardew-3.jpg", width: 2000, height: 1299, alt: "A farmhouse room filled with statues, a fountain, roses and climbing plants", pixel: true },
      { src: "/images/life/dreams/stardew-4.jpg", width: 2000, height: 1299, alt: "A band playing on a little stage while the town watches", pixel: true },
      { src: "/images/life/dreams/stardew-5.jpg", width: 2000, height: 1299, alt: "Sam under the stars: “You and I are just tiny specks in the entirety of the galaxy…”", pixel: true },
      { src: "/images/life/dreams/stardew-6.jpg", width: 2000, height: 1299, alt: "Sam: “There’s so much out there… the universe is so much bigger than we could ever imagine, Eileen.”", pixel: true },
    ],
  },
];
