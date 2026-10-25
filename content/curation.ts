import type { ImageAsset } from "@/lib/types";
import type { StationeryPiece } from "@/components/curation/Stationery";

/**
 * CURATION — the Curator's Cabinet: three drawers, one for each of Eileen's exhibitions.
 *
 * Each object is one entry in a drawer's `objects` list. Its `at` places it
 * inside the drawer (centre x / y in % of the drawer, width in % of the
 * drawer, rotation in degrees, z for what rests on what). Give it an
 * `image` with a `src` (a photograph of the real thing) to show when it is
 * picked up, and a `painted` watercolour version of that photo for the drawer
 * itself; without `painted`, the drawer keeps the hand-painted stand-in.
 * Everything with `placeholder: true` is a temporary,
 * labelled stand-in until Eileen's own material arrives.
 */
export type ObjectKind =
  | "catalogue"
  | "poster"
  | "invitation"
  | "photograph"
  | "folder"
  | "notes"
  | "floor-plan"
  | "sketch"
  | "arrangement"
  | "annotation"
  | "postcard"
  | "ticket"
  | "fragment"
  | "drawing";

export interface DrawerObject {
  id: string;
  kind: ObjectKind;
  title: string;
  date?: string;
  description?: string;
  /** A photograph of the object (or of what it documents), shown when the object is picked up. */
  image?: ImageAsset;
  /** A watercolour rendition of the photograph, shown in the drawer. */
  painted?: string;
  /** Slug of the exhibition catalogue this object opens (see content/exhibitions.ts). */
  exhibition?: string;
  /** Cover colour of a painted catalogue, and the colour of its lettering. */
  tint?: string;
  ink?: string;
  at: { x: number; y: number; w: number; rot: number; z?: number; aspect?: number };
  /** Stationery holding it: positions in % of the object itself. */
  fixings?: StationeryPiece[];
  placeholder?: boolean;
}

export interface Drawer {
  id: string;
  number: string;
  title: string;
  /** The exhibition this drawer holds (see content/exhibitions.ts). */
  exhibition: string;
  /** One line under the drawer's label. */
  note: string;
  objects: DrawerObject[];
  /** Loose stationery lying in the drawer: positions in % of the drawer. */
  stationery?: StationeryPiece[];
}

const soon = "[Placeholder — Eileen’s own material to come.]";

/** A labelled stand-in for one of the exhibition's materials. */
const ph = (exhibition: string, id: string, kind: ObjectKind, title: string, at: DrawerObject["at"], fixings?: StationeryPiece[]): DrawerObject => ({
  id: `${exhibition}-${id}`,
  kind,
  title,
  exhibition,
  description: soon,
  placeholder: true,
  at,
  fixings,
});

/** One drawer for each exhibition: its catalogue, and the papers and photographs around it. */
export const drawers: Drawer[] = [
  {
    id: "what-makes-us-human",
    number: "01",
    title: "What Makes Us Human?",
    exhibition: "what-makes-us-human",
    note: "The catalogue of What Makes Us Human?, with the posters, photographs and working papers from the exhibition.",
    objects: [
      { id: "wmuh-catalogue", kind: "catalogue", title: "What Makes Us Human?", exhibition: "what-makes-us-human", at: { x: 31, y: 52, w: 21, rot: -4, z: 4 }, fixings: [{ kind: "binder-clip", x: 72, y: 3, w: 22, rot: 4 }] },
      {
        id: "what-makes-us-human-poster",
        kind: "poster",
        title: "Exhibition poster",
        exhibition: "what-makes-us-human",
        image: {
          src: "/images/work/what-makes-us-human/poster-full.jpg",
          alt: "Poster for What Makes Us Human? 何以为人: flowing white outlines on a red ground",
          aspect: 974 / 1726,
        },
        painted: "/images/work/what-makes-us-human/poster-watercolour.jpg",
        at: { x: 57, y: 40, w: 15, rot: 5, z: 2 },
        fixings: [{ kind: "push-pin", x: 50, y: 97, w: 18, rot: 0, color: "var(--brass)" }],
      },
      ph("what-makes-us-human", "invitation", "invitation", "[Invitation]", { x: 86, y: 76, w: 15, rot: -9, z: 5 }, [{ kind: "paper-clip", x: 16, y: 6, w: 9, rot: -8, color: "var(--vermilion)" }]),
      ph("what-makes-us-human", "photo-1", "photograph", "[Installation photograph]", { x: 56, y: 80, w: 14, rot: 9, z: 6 }, [{ kind: "tape", x: 50, y: 2, w: 42, rot: 4, color: "var(--brass)" }]),
      ph("what-makes-us-human", "photo-2", "photograph", "[Opening photograph]", { x: 11, y: 74, w: 11, rot: -12, z: 4, aspect: 0.8 }),
      ph("what-makes-us-human", "notes", "notes", "[Research notes]", { x: 82, y: 34, w: 15, rot: -4, z: 3 }, [{ kind: "bulldog-clip", x: 50, y: 3, w: 36, rot: 0 }]),
      ph("what-makes-us-human", "floor-plan", "floor-plan", "[Exhibition floor plan]", { x: 13, y: 30, w: 21, rot: 4, z: 1 }, [{ kind: "push-pin", x: 8, y: 9, w: 9, rot: 0, color: "var(--vermilion)" }]),
    ],
    stationery: [
      { kind: "pen", x: 52, y: 12, w: 28, rot: -6, z: 7, color: "var(--wine)" },
      { kind: "paper-clip", x: 72, y: 88, w: 3, rot: 60, z: 7, color: "var(--botanical-green)" },
      { kind: "paper-clip", x: 75, y: 90, w: 3, rot: 40, z: 7, color: "var(--powder-blue)" },
      { kind: "push-pin", x: 26, y: 90, w: 3.6, rot: 20, z: 7, color: "var(--vermilion)" },
      { kind: "sticky", x: 96, y: 52, w: 8, rot: 8, z: 2 },
      { kind: "doily", x: 31, y: 54, w: 31, rot: 8, z: 0, color: "color-mix(in srgb, var(--vermilion) 18%, white)" },
      { kind: "sprig", x: 46, y: 74, w: 5, rot: 28, z: 5 },
      { kind: "sprig", x: 70, y: 58, w: 4.5, rot: -24, z: 1, color: "var(--brass)" },
      { kind: "leaf", x: 70, y: 66, w: 2.6, rot: 40, z: 1 },
      { kind: "leaf", x: 4, y: 50, w: 3, rot: -18, z: 1, color: "color-mix(in srgb, var(--botanical-green) 70%, var(--brass))" },
      { kind: "seal", x: 44, y: 28, w: 4, rot: 0, z: 5 },
      { kind: "stamp", x: 70, y: 16, w: 4.2, rot: 8, z: 1, color: "var(--powder-blue)" },
      { kind: "twine", x: 92, y: 10, w: 12, rot: -6, z: 1 },
      { kind: "heart", x: 5, y: 92, w: 3.6, rot: -14, z: 5 },
      { kind: "button", x: 41, y: 90, w: 2.4, rot: 0, z: 7, color: "var(--powder-blue)" },
      { kind: "button", x: 44, y: 93, w: 1.8, rot: 0, z: 7 },
    ],
  },
  {
    id: "you-will-never-walk-alone",
    number: "02",
    title: "You Will Never Walk Alone",
    exhibition: "you-will-never-walk-alone",
    note: "The catalogue of You Will Never Walk Alone, with the posters, photographs and working papers from the exhibition.",
    objects: [
      { id: "ywnwa-catalogue", kind: "catalogue", title: "You Will Never Walk Alone", exhibition: "you-will-never-walk-alone", tint: "var(--botanical-green)", at: { x: 40, y: 48, w: 21, rot: 3, z: 4 }, fixings: [{ kind: "tape", x: 70, y: 2, w: 40, rot: 14, color: "var(--vermilion)" }] },
      ph("you-will-never-walk-alone", "poster", "poster", "[Exhibition poster]", { x: 16, y: 42, w: 16, rot: -6, z: 2 }, [{ kind: "push-pin", x: 50, y: 4, w: 18, rot: 0, color: "var(--powder-blue)" }]),
      ph("you-will-never-walk-alone", "photo", "photograph", "[Installation photograph]", { x: 66, y: 36, w: 15, rot: -3, z: 2, aspect: 0.78 }, [{ kind: "peg", x: 50, y: 2, w: 12, rot: 90 }]),
      ph("you-will-never-walk-alone", "sketch", "sketch", "[Preliminary sketch]", { x: 86, y: 60, w: 14, rot: 9, z: 3 }, [{ kind: "tape", x: 50, y: 1, w: 50, rot: -6, color: "var(--botanical-green)" }]),
      {
        id: "you-will-never-walk-alone-annotation",
        kind: "annotation",
        title: "Curatorial annotation",
        exhibition: "you-will-never-walk-alone",
        description: "This was my second exhibition, and it took us a year and a half to complete. It was through this exhibition that I began to see curation as my future: my career goal, and my passion. I would wake up in the morning excited, wondering what I might come up with that day. I found joy in every part of the process: spending time in the exhibition hall, watching the white walls being painted in different colours, putting my work and others’ onto the walls and arranging it on the shelves. I wrote quotes in every corner of the exhibition, hiding details in every word and every brushstroke I painted. Even when I was alone, placing exhibits in the dark, empty hall without help, I could see the traces of time on every painted wall, in every footprint I had left… I will never walk alone.",
        at: { x: 62, y: 80, w: 16, rot: 7, z: 5 },
        fixings: [{ kind: "peg", x: 86, y: 30, w: 8, rot: 10 }],
      },
      ph("you-will-never-walk-alone", "ticket", "ticket", "[Exhibition ticket]", { x: 18, y: 80, w: 17, rot: 10, z: 3 }),
    ],
    stationery: [
      { kind: "pencil", x: 36, y: 88, w: 24, rot: -8, z: 6, color: "var(--botanical-green)" },
      { kind: "push-pin", x: 92, y: 18, w: 3.4, rot: 14, z: 6, color: "var(--vermilion)" },
      { kind: "push-pin", x: 89, y: 24, w: 3.4, rot: -20, z: 6, color: "var(--brass)" },
      { kind: "binder-clip", x: 40, y: 12, w: 6, rot: 24, z: 6, color: "var(--wine)" },
      { kind: "sticky", x: 92, y: 88, w: 8, rot: -8, z: 6, color: "color-mix(in srgb, var(--vermilion) 45%, var(--aged-ivory))" },
      { kind: "doily", x: 40, y: 50, w: 30, rot: -6, z: 0, color: "color-mix(in srgb, var(--powder-blue) 22%, white)" },
      { kind: "bow", x: 27, y: 60, w: 7, rot: -10, z: 5, color: "var(--botanical-green)" },
      { kind: "sprig", x: 54, y: 66, w: 5, rot: 20, z: 5 },
      { kind: "sprig", x: 4, y: 72, w: 4.5, rot: -16, z: 1, color: "var(--wine)" },
      { kind: "leaf", x: 78, y: 18, w: 2.8, rot: 60, z: 1 },
      { kind: "seal", x: 88, y: 40, w: 4, rot: 0, z: 5, color: "var(--vermilion)" },
      { kind: "stamp", x: 6, y: 16, w: 4.2, rot: -8, z: 1, color: "var(--vermilion)" },
      { kind: "twine", x: 76, y: 92, w: 12, rot: 4, z: 1, color: "var(--brass)" },
      { kind: "heart", x: 52, y: 10, w: 3.4, rot: 10, z: 1, color: "var(--powder-blue)" },
      { kind: "button", x: 9, y: 92, w: 2.2, rot: 0, z: 7, color: "var(--vermilion)" },
    ],
  },
  {
    id: "the-other-the-same",
    number: "03",
    title: "The Other, the Same",
    exhibition: "the-other-the-same",
    note: "The catalogue of The Other, the Same, with the posters, photographs and working papers from the exhibition.",
    objects: [
      { id: "other-same-catalogue", kind: "catalogue", title: "The Other, the Same", exhibition: "the-other-the-same", tint: "var(--powder-blue)", ink: "var(--wine)", at: { x: 58, y: 48, w: 21, rot: 6, z: 4 }, fixings: [{ kind: "binder-clip", x: 28, y: 3, w: 22, rot: -4, color: "var(--brass)" }] },
      {
        id: "the-other-the-same-invitation",
        kind: "invitation",
        title: "Invitation to the opening preview",
        date: "6 May 2023",
        exhibition: "the-other-the-same",
        image: {
          src: "/images/exhibitions/the-other-the-same/invitation.jpg",
          alt: "Invitation 邀请函 to the opening preview of The Other, The Same 另一个，同一个 at Huitong School, 2023.05.06, with white daisies and green grass",
          aspect: 1182 / 2344,
        },
        painted: "/images/exhibitions/the-other-the-same/invitation-watercolour.jpg",
        at: { x: 30, y: 42, w: 12, rot: -7, z: 2 },
        fixings: [{ kind: "paper-clip", x: 80, y: 3, w: 14, rot: 6, color: "var(--brass)" }],
      },
      {
        id: "the-other-the-same-space",
        kind: "photograph",
        title: "The exhibition space",
        exhibition: "the-other-the-same",
        image: { src: "/images/exhibitions/the-other-the-same/space.jpg", alt: "The exhibition space: tables of works, wooden frames along the glass wall and a strip of soil and plants", aspect: 3 / 4, caption: "Photo: Shenzhen Nanshan Huitong School" },
        painted: "/images/exhibitions/the-other-the-same/space-watercolour.jpg",
        at: { x: 18, y: 70, w: 12, rot: 8, z: 3 },
        fixings: [{ kind: "tape", x: 50, y: 2, w: 42, rot: -4, color: "var(--powder-blue)" }],
      },
      {
        id: "the-other-the-same-beehives",
        kind: "photograph",
        title: "Beehive works",
        exhibition: "the-other-the-same",
        image: { src: "/images/exhibitions/the-other-the-same/beehive-works.jpg", alt: "Stacked wooden beehive boxes with honeycomb works on their trays", aspect: 3 / 4, caption: "Photo: Shenzhen Nanshan Huitong School" },
        painted: "/images/exhibitions/the-other-the-same/beehive-works-watercolour.jpg",
        at: { x: 85, y: 34, w: 12, rot: -4, z: 2 },
        fixings: [{ kind: "binder-clip", x: 30, y: 3, w: 18, rot: -6, color: "var(--vermilion)" }],
      },
      {
        id: "the-other-the-same-workshop",
        kind: "fragment",
        title: "Curation Workshop photo at SWCAC",
        date: "2022",
        exhibition: "the-other-the-same",
        image: {
          src: "/images/exhibitions/the-other-the-same/workshop-swcac.jpg",
          alt: "Students at a table at Sea World Culture and Arts Center holding up coloured exhibition floor-plan models",
          aspect: 1280 / 720,
          caption: "Photo: Shenzhen Nanshan Huitong School",
        },
        painted: "/images/exhibitions/the-other-the-same/workshop-swcac-watercolour.jpg",
        at: { x: 46, y: 84, w: 17, rot: -5, z: 5 },
        fixings: [{ kind: "tape", x: 12, y: 4, w: 30, rot: -30, color: "var(--brass)" }],
      },
      {
        id: "the-other-the-same-arrangement",
        kind: "arrangement",
        title: "Artwork arrangement",
        description: "Bee, snail, ocean (rust and iron bacteria), bee, concrete and soil.",
        exhibition: "the-other-the-same",
        image: {
          src: "/images/exhibitions/the-other-the-same/arrangement.jpg",
          alt: "Six works from the exhibition: honeycomb wax, a beaded snail shell, rusted iron sheets, a honeycomb sculpture, concrete forms and boxes of soil",
          aspect: 1896 / 1272,
          caption: "Photo: Shenzhen Nanshan Huitong School",
        },
        painted: "/images/exhibitions/the-other-the-same/arrangement-watercolour.jpg",
        at: { x: 68, y: 84, w: 15, rot: 3, z: 4 },
        fixings: [{ kind: "binder-clip", x: 50, y: 3, w: 14, rot: -4, color: "var(--vermilion)" }],
      },
      {
        id: "the-other-the-same-snail",
        kind: "photograph",
        title: "Snail shell work",
        exhibition: "the-other-the-same",
        image: { src: "/images/exhibitions/the-other-the-same/snail-shell-work.jpg", alt: "A snail shell studded with crystals, hanging on a wooden post", aspect: 3 / 4, caption: "Photo: Shenzhen Nanshan Huitong School" },
        painted: "/images/exhibitions/the-other-the-same/snail-shell-work-watercolour.jpg",
        at: { x: 84, y: 76, w: 11, rot: 5, z: 3 },
        fixings: [{ kind: "safety-pin", x: 40, y: 8, w: 50, rot: -4 }],
      },
    ],
    stationery: [
      { kind: "pen", x: 38, y: 12, w: 28, rot: 4, z: 6, color: "var(--powder-blue)" },
      { kind: "push-pin", x: 6, y: 18, w: 3.4, rot: -10, z: 6, color: "var(--botanical-green)" },
      { kind: "paper-clip", x: 66, y: 90, w: 3, rot: 70, z: 6, color: "var(--vermilion)" },
      { kind: "sticky", x: 5, y: 50, w: 8, rot: 6, z: 1, color: "color-mix(in srgb, var(--powder-blue) 60%, var(--aged-ivory))" },
      { kind: "doily", x: 58, y: 52, w: 30, rot: 4, z: 0, color: "color-mix(in srgb, var(--botanical-green) 16%, white)" },
      { kind: "leaf", x: 44, y: 70, w: 3, rot: -30, z: 5 },
      { kind: "leaf", x: 46, y: 76, w: 2.4, rot: 10, z: 5, color: "color-mix(in srgb, var(--botanical-green) 70%, var(--brass))" },
      { kind: "sprig", x: 74, y: 64, w: 5, rot: 24, z: 5, color: "var(--brass)" },
      { kind: "sprig", x: 8, y: 88, w: 4.5, rot: -20, z: 1 },
      { kind: "bow", x: 70, y: 22, w: 6, rot: 12, z: 5, color: "var(--wine)" },
      { kind: "seal", x: 44, y: 34, w: 4, rot: 0, z: 5, color: "var(--botanical-green)" },
      { kind: "stamp", x: 94, y: 54, w: 4.2, rot: 10, z: 1, color: "var(--botanical-green)" },
      { kind: "twine", x: 18, y: 12, w: 12, rot: -4, z: 1 },
      { kind: "heart", x: 34, y: 92, w: 3.4, rot: 12, z: 5 },
      { kind: "button", x: 96, y: 92, w: 2.2, rot: 0, z: 7, color: "var(--vermilion)" },
    ],
  },
];

/** Width / height of each kind of object, when no image says otherwise. */
export const kindAspect: Record<ObjectKind, number> = {
  catalogue: 0.72,
  poster: 0.7,
  invitation: 1.42,
  photograph: 1.25,
  folder: 1.3,
  notes: 0.76,
  "floor-plan": 1.38,
  sketch: 0.8,
  arrangement: 1.25,
  annotation: 1.55,
  postcard: 1.5,
  ticket: 2.3,
  fragment: 1.1,
  drawing: 0.84,
};

export const kindLabel: Record<ObjectKind, string> = {
  catalogue: "Exhibition catalogue",
  poster: "Poster",
  invitation: "Invitation",
  photograph: "Photograph",
  folder: "Archival folder",
  notes: "Research notes",
  "floor-plan": "Floor plan",
  sketch: "Sketch",
  arrangement: "Artwork arrangement",
  annotation: "Curatorial annotation",
  postcard: "Postcard",
  ticket: "Ticket",
  fragment: "Fragment",
  drawing: "Drawing",
};
