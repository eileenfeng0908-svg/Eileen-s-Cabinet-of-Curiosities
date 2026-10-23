import type { ImageAsset } from "@/lib/types";
import type { StationeryPiece } from "@/components/curation/Stationery";

/**
 * CURATION — the Curator's Cabinet: three drawers of objects.
 *
 * Each object is one entry in a drawer's `objects` list. Its `at` places it
 * inside the drawer (centre x / y in % of the drawer, width in % of the
 * drawer, rotation in degrees, z for what rests on what). Give it an
 * `image` with a `src` (a photograph of the real thing) and it replaces the
 * painted stand-in. Everything with `placeholder: true` is a temporary,
 * labelled stand-in until Eileen's own material arrives.
 */
export type ObjectKind =
  | "catalogue"
  | "index"
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
  /** A photograph of the object (or of what it documents). Without `src`, a painted stand-in shows. */
  image?: ImageAsset;
  /** Slug of the exhibition catalogue this object opens (see content/exhibitions.ts). */
  exhibition?: string;
  /** Links listed on an index card. */
  list?: { label: string; href: string }[];
  /** Cover colour of a painted catalogue, and the colour of its lettering. */
  tint?: string;
  ink?: string;
  at: { x: number; y: number; w: number; rot: number; z?: number; aspect?: number };
  /** Stationery holding it: positions in % of the object itself. */
  fixings?: StationeryPiece[];
  placeholder?: boolean;
}

export interface Drawer {
  id: "exhibitions" | "process" | "collected";
  number: string;
  title: string;
  /** One line under the drawer's label. */
  note: string;
  objects: DrawerObject[];
  /** Loose stationery lying in the drawer: positions in % of the drawer. */
  stationery?: StationeryPiece[];
}

const soon = "[Placeholder — Eileen’s own material to come.]";

export const drawers: Drawer[] = [
  {
    id: "exhibitions",
    number: "01",
    title: "Exhibitions",
    note: "This drawer holds my three exhibitions: What Makes Us Human?, You Will Never Walk Alone, and The Other, the Same.",
    objects: [
      {
        id: "exhibitions-index",
        kind: "index",
        title: "In this drawer",
        description: "This drawer holds my three exhibitions. Open a catalogue to step inside one.",
        list: [
          { label: "What Makes Us Human?", href: "/exhibitions/what-makes-us-human" },
          { label: "You Will Never Walk Alone", href: "/exhibitions/you-will-never-walk-alone" },
          { label: "The Other, the Same", href: "/exhibitions/the-other-the-same" },
        ],
        at: { x: 13, y: 30, w: 19, rot: -5, z: 3 },
        fixings: [{ kind: "push-pin", x: 50, y: 6, w: 16, rot: 0, color: "var(--powder-blue)" }],
      },
      {
        id: "wmuh-catalogue",
        kind: "catalogue",
        title: "What Makes Us Human?",
        exhibition: "what-makes-us-human",
        at: { x: 34, y: 52, w: 20, rot: -4, z: 4 },
        fixings: [{ kind: "binder-clip", x: 72, y: 3, w: 22, rot: 4 }],
      },
      {
        id: "ywnwa-catalogue",
        kind: "catalogue",
        title: "You Will Never Walk Alone",
        exhibition: "you-will-never-walk-alone",
        tint: "var(--botanical-green)",
        at: { x: 55, y: 42, w: 19, rot: 3, z: 3 },
      },
      {
        id: "other-same-catalogue",
        kind: "catalogue",
        title: "The Other, the Same",
        exhibition: "the-other-the-same",
        tint: "var(--powder-blue)",
        ink: "var(--wine)",
        at: { x: 73, y: 57, w: 19, rot: 7, z: 4 },
        fixings: [{ kind: "tape", x: 30, y: 2, w: 40, rot: -12, color: "var(--vermilion)" }],
      },
      { id: "exhibition-poster", kind: "poster", title: "[Exhibition poster]", description: soon, placeholder: true, at: { x: 90, y: 27, w: 16, rot: -6, z: 2 }, fixings: [{ kind: "push-pin", x: 50, y: 4, w: 18, rot: 0, color: "var(--brass)" }] },
      { id: "exhibition-invitation", kind: "invitation", title: "[Invitation]", description: soon, placeholder: true, at: { x: 89, y: 82, w: 15, rot: -9, z: 5 }, fixings: [{ kind: "paper-clip", x: 16, y: 6, w: 9, rot: -8, color: "var(--vermilion)" }] },
      { id: "exhibition-photo-1", kind: "photograph", title: "[Installation photograph]", description: soon, placeholder: true, at: { x: 54, y: 82, w: 14, rot: 9, z: 6 }, fixings: [{ kind: "tape", x: 50, y: 2, w: 42, rot: 4, color: "var(--brass)" }] },
      { id: "exhibition-photo-2", kind: "photograph", title: "[Opening photograph]", description: soon, placeholder: true, at: { x: 14, y: 76, w: 11, rot: -12, z: 4, aspect: 0.8 } },
      { id: "exhibition-folder", kind: "folder", title: "[Archival folder]", description: soon, placeholder: true, at: { x: 34, y: 17, w: 17, rot: 3, z: 1 } },
    ],
    stationery: [
      { kind: "pen", x: 60, y: 12, w: 30, rot: -6, z: 7, color: "var(--wine)" },
      { kind: "paper-clip", x: 74, y: 86, w: 3, rot: 60, z: 7, color: "var(--botanical-green)" },
      { kind: "paper-clip", x: 77, y: 88, w: 3, rot: 40, z: 7, color: "var(--powder-blue)" },
      { kind: "push-pin", x: 25, y: 90, w: 3.6, rot: 20, z: 7, color: "var(--vermilion)" },
      { kind: "sticky", x: 4, y: 52, w: 8, rot: 8, z: 2 },
    ],
  },
  {
    id: "process",
    number: "02",
    title: "Curatorial Process",
    note: "Notes, plans, sketches and photographs of how the exhibitions came together.",
    objects: [
      { id: "research-notes", kind: "notes", title: "[Research notes]", description: soon, placeholder: true, at: { x: 18, y: 46, w: 21, rot: -6, z: 2 }, fixings: [{ kind: "bulldog-clip", x: 50, y: 3, w: 34, rot: 0 }] },
      { id: "floor-plan", kind: "floor-plan", title: "[Exhibition floor plan]", description: soon, placeholder: true, at: { x: 49, y: 40, w: 30, rot: 2, z: 1 }, fixings: [{ kind: "push-pin", x: 6, y: 8, w: 9, rot: 0, color: "var(--vermilion)" }, { kind: "push-pin", x: 94, y: 8, w: 9, rot: 0, color: "var(--brass)" }] },
      { id: "preliminary-sketch", kind: "sketch", title: "[Preliminary sketch]", description: soon, placeholder: true, at: { x: 79, y: 34, w: 16, rot: 9, z: 3 }, fixings: [{ kind: "tape", x: 50, y: 1, w: 50, rot: -6, color: "var(--botanical-green)" }] },
      { id: "artwork-arrangement", kind: "arrangement", title: "[Artwork arrangement]", description: soon, placeholder: true, at: { x: 72, y: 72, w: 24, rot: -4, z: 2 }, fixings: [{ kind: "binder-clip", x: 20, y: 3, w: 14, rot: -6, color: "var(--powder-blue)" }] },
      { id: "curatorial-annotation", kind: "annotation", title: "[Curatorial annotation]", description: soon, placeholder: true, at: { x: 44, y: 78, w: 17, rot: 7, z: 4 }, fixings: [{ kind: "peg", x: 86, y: 30, w: 8, rot: 10 }] },
      { id: "behind-the-scenes", kind: "photograph", title: "[Behind-the-scenes photograph]", description: soon, placeholder: true, at: { x: 92, y: 62, w: 12, rot: 12, z: 5, aspect: 0.8 }, fixings: [{ kind: "paper-clip", x: 30, y: 4, w: 14, rot: 4, color: "var(--wine)" }] },
    ],
    stationery: [
      { kind: "pencil", x: 26, y: 86, w: 26, rot: 10, z: 6, color: "var(--botanical-green)" },
      { kind: "sticky", x: 92, y: 88, w: 8, rot: -8, z: 6 },
      { kind: "sticky", x: 93, y: 86, w: 8, rot: 4, z: 7, color: "color-mix(in srgb, var(--vermilion) 45%, var(--aged-ivory))" },
      { kind: "binder-clip", x: 92, y: 14, w: 6, rot: 24, z: 6, color: "var(--wine)" },
      { kind: "safety-pin", x: 52, y: 12, w: 12, rot: -14, z: 6 },
      { kind: "push-pin", x: 6, y: 16, w: 3.4, rot: -10, z: 6, color: "var(--powder-blue)" },
    ],
  },
  {
    id: "collected",
    number: "03",
    title: "Collected Objects",
    note: "Postcards, photographs, tickets and fragments I have kept, and the things that inspire me.",
    objects: [
      { id: "postcard-1", kind: "postcard", title: "[Antique postcard]", description: soon, placeholder: true, at: { x: 22, y: 38, w: 23, rot: -7, z: 2 }, fixings: [{ kind: "tape", x: 12, y: 6, w: 28, rot: -38, color: "var(--vermilion)" }] },
      { id: "postcard-2", kind: "postcard", title: "[Postcard]", description: soon, placeholder: true, at: { x: 33, y: 66, w: 19, rot: 6, z: 3 }, fixings: [{ kind: "paper-clip", x: 80, y: 6, w: 8, rot: 6, color: "var(--brass)" }] },
      { id: "photograph", kind: "photograph", title: "[Photograph]", description: soon, placeholder: true, at: { x: 57, y: 42, w: 15, rot: -3, z: 2, aspect: 0.78 }, fixings: [{ kind: "peg", x: 50, y: 2, w: 12, rot: 90 }] },
      { id: "museum-ticket-1", kind: "ticket", title: "[Museum ticket]", description: soon, placeholder: true, at: { x: 77, y: 24, w: 18, rot: 11, z: 3 } },
      { id: "museum-ticket-2", kind: "ticket", title: "[Museum ticket]", description: soon, placeholder: true, at: { x: 85, y: 44, w: 16, rot: -9, z: 4 }, fixings: [{ kind: "safety-pin", x: 40, y: 10, w: 42, rot: -4 }] },
      { id: "archival-fragment", kind: "fragment", title: "[Archival fragment]", description: soon, placeholder: true, at: { x: 79, y: 74, w: 19, rot: 4, z: 2 } },
      { id: "small-drawing", kind: "drawing", title: "[Small drawing]", description: soon, placeholder: true, at: { x: 56, y: 78, w: 13, rot: -10, z: 5 }, fixings: [{ kind: "push-pin", x: 50, y: 6, w: 18, rot: 0, color: "var(--botanical-green)" }] },
      { id: "collected-object", kind: "fragment", title: "[Collected object]", description: soon, placeholder: true, at: { x: 8, y: 74, w: 11, rot: 14, z: 4, aspect: 0.9 } },
    ],
    stationery: [
      { kind: "pen", x: 40, y: 12, w: 28, rot: 4, z: 6, color: "var(--powder-blue)" },
      { kind: "push-pin", x: 95, y: 18, w: 3.4, rot: 14, z: 6, color: "var(--vermilion)" },
      { kind: "push-pin", x: 93, y: 24, w: 3.4, rot: -20, z: 6, color: "var(--brass)" },
      { kind: "paper-clip", x: 12, y: 92, w: 3, rot: 70, z: 6, color: "var(--vermilion)" },
      { kind: "sticky", x: 66, y: 90, w: 8, rot: 6, z: 6, color: "color-mix(in srgb, var(--powder-blue) 60%, var(--aged-ivory))" },
    ],
  },
];

/** Width / height of each kind of object, when no image says otherwise. */
export const kindAspect: Record<ObjectKind, number> = {
  catalogue: 0.72,
  index: 1.45,
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
  index: "Index card",
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
