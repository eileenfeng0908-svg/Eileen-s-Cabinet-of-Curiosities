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
      ph("you-will-never-walk-alone", "annotation", "annotation", "[Curatorial annotation]", { x: 62, y: 80, w: 16, rot: 7, z: 5 }, [{ kind: "peg", x: 86, y: 30, w: 8, rot: 10 }]),
      ph("you-will-never-walk-alone", "ticket", "ticket", "[Exhibition ticket]", { x: 18, y: 80, w: 17, rot: 10, z: 3 }),
    ],
    stationery: [
      { kind: "pencil", x: 36, y: 88, w: 24, rot: -8, z: 6, color: "var(--botanical-green)" },
      { kind: "push-pin", x: 92, y: 18, w: 3.4, rot: 14, z: 6, color: "var(--vermilion)" },
      { kind: "push-pin", x: 89, y: 24, w: 3.4, rot: -20, z: 6, color: "var(--brass)" },
      { kind: "binder-clip", x: 40, y: 12, w: 6, rot: 24, z: 6, color: "var(--wine)" },
      { kind: "sticky", x: 92, y: 88, w: 8, rot: -8, z: 6, color: "color-mix(in srgb, var(--vermilion) 45%, var(--aged-ivory))" },
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
      ph("the-other-the-same", "invitation", "invitation", "[Invitation]", { x: 28, y: 34, w: 17, rot: -7, z: 2 }, [{ kind: "paper-clip", x: 84, y: 6, w: 9, rot: 6, color: "var(--brass)" }]),
      ph("the-other-the-same", "photo", "photograph", "[Installation photograph]", { x: 20, y: 72, w: 15, rot: 8, z: 3 }, [{ kind: "tape", x: 50, y: 2, w: 42, rot: -4, color: "var(--powder-blue)" }]),
      ph("the-other-the-same", "arrangement", "arrangement", "[Artwork arrangement]", { x: 85, y: 30, w: 19, rot: -4, z: 2 }, [{ kind: "binder-clip", x: 20, y: 3, w: 14, rot: -6, color: "var(--vermilion)" }]),
      ph("the-other-the-same", "postcard", "postcard", "[Exhibition postcard]", { x: 42, y: 80, w: 17, rot: -6, z: 5 }),
      ph("the-other-the-same", "fragment", "fragment", "[Archival fragment]", { x: 86, y: 76, w: 15, rot: 4, z: 3 }, [{ kind: "safety-pin", x: 40, y: 12, w: 50, rot: -4 }]),
    ],
    stationery: [
      { kind: "pen", x: 38, y: 12, w: 28, rot: 4, z: 6, color: "var(--powder-blue)" },
      { kind: "push-pin", x: 6, y: 18, w: 3.4, rot: -10, z: 6, color: "var(--botanical-green)" },
      { kind: "paper-clip", x: 66, y: 90, w: 3, rot: 70, z: 6, color: "var(--vermilion)" },
      { kind: "sticky", x: 5, y: 50, w: 8, rot: 6, z: 1, color: "color-mix(in srgb, var(--powder-blue) 60%, var(--aged-ivory))" },
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
