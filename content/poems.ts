/**
 * POETRY — the poems of the Poetry Garden (/writing/poetry).
 *
 * One entry per poem. Write the poem in `text` exactly as it should read:
 * each new line is a line break, and an empty line starts a new stanza.
 * `fragments` are lines from the poem that float in the garden (copy them
 * from the poem itself). `flower` chooses the flower that stands for it.
 *
 * Everything in [brackets] is a placeholder until Eileen's poems are added.
 * Never fill these with invented verse.
 */
export type GardenFlower = "tulip" | "blossom" | "bellflower" | "starflower";

export interface Poem {
  slug: string;
  title: string;
  /** ISO date or a year, if known. */
  date?: string;
  text: string;
  fragments: string[];
  flower: GardenFlower;
  placeholder?: boolean;
}

const placeholderText = `[First stanza of the poem.
Each line on its own line,
just as it is written.]

[Second stanza, after an empty line.]`;

export const poems: Poem[] = [
  { slug: "small-rooms", title: "Small Rooms", text: placeholderText, fragments: ["[a line from Small Rooms]"], flower: "tulip", placeholder: true },
  { slug: "poem-2", title: "[Poem title]", text: placeholderText, fragments: ["[a first line]"], flower: "blossom", placeholder: true },
  { slug: "poem-3", title: "[Poem title]", text: placeholderText, fragments: ["[a line you love]"], flower: "bellflower", placeholder: true },
  { slug: "poem-4", title: "[Poem title]", text: placeholderText, fragments: ["[a closing line]"], flower: "starflower", placeholder: true },
  { slug: "poem-5", title: "[Poem title]", text: placeholderText, fragments: ["[a line from the middle]"], flower: "blossom", placeholder: true },
  { slug: "poem-6", title: "[Poem title]", text: placeholderText, fragments: ["[a quiet line]"], flower: "tulip", placeholder: true },
];
