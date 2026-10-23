import type { ImageAsset } from "@/lib/types";

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
  at: { x: number; y: number; w: number; rot: number; z?: number; aspect?: number };
  placeholder?: boolean;
}

export interface Drawer {
  id: "exhibitions" | "process" | "collected";
  number: string;
  title: string;
  /** One line under the drawer's label. */
  note: string;
  objects: DrawerObject[];
}

const soon = "[Placeholder — Eileen’s own material to come.]";

export const drawers: Drawer[] = [
  {
    id: "exhibitions",
    number: "01",
    title: "Exhibitions",
    note: "Catalogues, posters, invitations and prints from the exhibitions I have curated.",
    objects: [
      {
        id: "wmuh-catalogue",
        kind: "catalogue",
        title: "What Makes Us Human?",
        exhibition: "what-makes-us-human",
        description: "The exhibition catalogue. Open it to read the introduction, the curatorial statement and the five sections of the exhibition.",
        at: { x: 31, y: 48, w: 25, rot: -4, z: 3 },
      },
      {
        id: "wmuh-poster",
        kind: "poster",
        title: "[Exhibition poster]",
        exhibition: "what-makes-us-human",
        description: soon,
        placeholder: true,
        at: { x: 61, y: 42, w: 22, rot: 5, z: 2 },
      },
      {
        id: "wmuh-invitation",
        kind: "invitation",
        title: "[Invitation]",
        exhibition: "what-makes-us-human",
        description: soon,
        placeholder: true,
        at: { x: 84, y: 66, w: 19, rot: -8, z: 4 },
      },
      {
        id: "wmuh-photo-1",
        kind: "photograph",
        title: "[Installation photograph]",
        exhibition: "what-makes-us-human",
        description: soon,
        placeholder: true,
        at: { x: 55, y: 76, w: 17, rot: 9, z: 5 },
      },
      {
        id: "wmuh-photo-2",
        kind: "photograph",
        title: "[Opening photograph]",
        exhibition: "what-makes-us-human",
        description: soon,
        placeholder: true,
        at: { x: 11, y: 74, w: 13, rot: -12, z: 4, aspect: 0.8 },
      },
      {
        id: "wmuh-folder",
        kind: "folder",
        title: "[Archival folder]",
        exhibition: "what-makes-us-human",
        description: soon,
        placeholder: true,
        at: { x: 84, y: 25, w: 21, rot: -3, z: 1 },
      },
    ],
  },
  {
    id: "process",
    number: "02",
    title: "Curatorial Process",
    note: "Notes, plans, sketches and photographs of how the exhibitions came together.",
    objects: [
      { id: "research-notes", kind: "notes", title: "[Research notes]", description: soon, placeholder: true, at: { x: 18, y: 44, w: 21, rot: -6, z: 2 } },
      { id: "floor-plan", kind: "floor-plan", title: "[Exhibition floor plan]", description: soon, placeholder: true, at: { x: 49, y: 40, w: 30, rot: 2, z: 1 } },
      { id: "preliminary-sketch", kind: "sketch", title: "[Preliminary sketch]", description: soon, placeholder: true, at: { x: 79, y: 34, w: 16, rot: 9, z: 3 } },
      { id: "artwork-arrangement", kind: "arrangement", title: "[Artwork arrangement]", description: soon, placeholder: true, at: { x: 72, y: 72, w: 24, rot: -4, z: 2 } },
      { id: "curatorial-annotation", kind: "annotation", title: "[Curatorial annotation]", description: soon, placeholder: true, at: { x: 44, y: 76, w: 17, rot: 7, z: 4 } },
      { id: "behind-the-scenes", kind: "photograph", title: "[Behind-the-scenes photograph]", description: soon, placeholder: true, at: { x: 92, y: 62, w: 12, rot: 12, z: 5, aspect: 0.8 } },
    ],
  },
  {
    id: "collected",
    number: "03",
    title: "Collected Objects",
    note: "Postcards, photographs, tickets and fragments I have kept, and the things that inspire me.",
    objects: [
      { id: "postcard-1", kind: "postcard", title: "[Antique postcard]", description: soon, placeholder: true, at: { x: 22, y: 38, w: 23, rot: -7, z: 2 } },
      { id: "postcard-2", kind: "postcard", title: "[Postcard]", description: soon, placeholder: true, at: { x: 33, y: 64, w: 19, rot: 6, z: 3 } },
      { id: "photograph", kind: "photograph", title: "[Photograph]", description: soon, placeholder: true, at: { x: 57, y: 42, w: 15, rot: -3, z: 2, aspect: 0.78 } },
      { id: "museum-ticket-1", kind: "ticket", title: "[Museum ticket]", description: soon, placeholder: true, at: { x: 77, y: 26, w: 18, rot: 11, z: 3 } },
      { id: "museum-ticket-2", kind: "ticket", title: "[Museum ticket]", description: soon, placeholder: true, at: { x: 85, y: 44, w: 16, rot: -9, z: 4 } },
      { id: "archival-fragment", kind: "fragment", title: "[Archival fragment]", description: soon, placeholder: true, at: { x: 79, y: 72, w: 19, rot: 4, z: 2 } },
      { id: "small-drawing", kind: "drawing", title: "[Small drawing]", description: soon, placeholder: true, at: { x: 56, y: 76, w: 13, rot: -10, z: 5 } },
      { id: "collected-object", kind: "fragment", title: "[Collected object]", description: soon, placeholder: true, at: { x: 8, y: 72, w: 11, rot: 14, z: 4, aspect: 0.9 } },
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
