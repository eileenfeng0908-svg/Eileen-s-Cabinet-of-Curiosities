/**
 * POETRY — the poems of the Poetry Garden (/writing/poetry).
 *
 * One entry per poem. Write the poem in `text` exactly as it should read:
 * each new line is a line break, and an empty line starts a new stanza.
 * `fragments` are lines from the poem that float in the garden (copy them
 * from the poem itself). `flower` chooses the flower that stands for it.
 *
 * These are Eileen's own poems, exactly as she wrote them. Never add
 * invented verse; a new poem is a new entry, in the order it should appear.
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

export const poems: Poem[] = [
  {
    slug: "trust",
    title: "Trust",
    flower: "tulip",
    fragments: ["like your tiny boat in the ocean.", "the needle suspended in silence.", "Now the stitches have come undone."],
    text: `Trust
Floats away
like your tiny boat in the ocean.

Every letter crossed your teeth,
touched your lips–
all lies.

My vinyl stilled,
the needle suspended in silence.
The record ended
as a tear fell
onto its icy face.

Once it stitched every wound.
Now the stitches have come undone.`,
  },
  {
    slug: "your-words",
    title: "Your Words",
    flower: "blossom",
    fragments: ["Dyed me blue.", "the sky could swallow.", "That slash of yellow,"],
    text: `Words bewildered me,
hypnotising—
time was drawn
into your abyss of lies.

Dyed me blue.
Dyed me black.
I begged you:
dye me into a colour
the sky could swallow.

That slash of yellow,
gone behind the clouds you weave through,
landed on a land
where I don’t belong.`,
  },
  {
    slug: "the-blue-bell",
    title: "The Blue Bell",
    flower: "bellflower",
    fragments: ["The bell, shades of blue.", "Vines wrapped around the dark gate.", "this blue memory of you,"],
    text: `The bell,
shades of blue.
Your past intertwined with mine.

Wandering
along the brick path of an empty street.
Holes.
Seams.
Now my wounds.

Vines wrapped around the dark gate.
Only a blink ago, I stood before it,
before
I first saw the blue in you.

Those blue flags
fluttered in the wind,
sweeping our memories away.

I hate to remember
this blue memory of you,
yet I yearn to linger, too.`,
  },
];
