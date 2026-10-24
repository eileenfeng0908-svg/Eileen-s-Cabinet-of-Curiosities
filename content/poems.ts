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
  /** Paint the flower another colour of the palette than its usual one. */
  tint?: "vermilion" | "rose" | "blue" | "brass" | "wine";
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
{
    slug: "a-drowned-cicada-and-bottle",
    title: "A Drowned Cicada and Bottle",
    flower: "starflower",
    fragments: ["Receding light and broken glass,", "a cicada, drowned in the rosy pool."],
    text: `Receding light and broken glass,
rotten oranges with shattered clocks,
in the floating shining dust, the greatest party fell apart.

Tinkling clink on summer nights, golden bright underneath the hollow sky.
A romantic world had collapsed in the diminished green.

The door is open, it's open.
Fireflies hidden in the cloudy ash, a cicada, drowned in the rosy pool.

It disrupted, he disrupted,
the music on a cosy night, orchestra under the glorious lights.

We danced, he danced,
a resounding bell, a shot,
we all stared, staring at a sinking bottle that broke apart, someone already chugged, left on the hill of glass.

The flourish nights are gone,
we are collectors, we are moths,
searching, seeking,
another brilliant gem on next summer night.

It used to be a diamond— he used to be,
but now pieces of glass.
It lost the gleam of dew on summer trees,
the shimmering green fades in the autumn dark.`,
  },
  {
    slug: "the-stagnant-story",
    title: "The Stagnant Story",
    flower: "blossom",
    tint: "rose",
    fragments: ["Tomorrow, beyond our reach. Uncertain. Feared.", "Blurred. Still."],
    text: `The stories suspended in time have shattered, yet civilisation still envelops us. Stagnant, suspended, slowly healing. A gentle caress, or the settling of dust. Exiled, drifting amidst the ashen-grey particles, frozen in a dream of nostalgia.

Tomorrow, beyond our reach. Uncertain. Feared.

Tomorrow lies motionless beneath the moonlight of the night. Will the bullet holes bear the tears of melting ice?

Flowing, motionless, tenderly, ever so tenderly. Close your eyes. Everyone stands still in a world sealed away, a world without tomorrow.

When we no longer wish to see tomorrow, do our stories remain shackled by the passage of time?

When we cease to understand the world, mist descends upon our memories. Blurred. Still.

The world of yesterday remains suspended within the stories of today, unable to glimpse the face of tomorrow.`,
  },
  {
    slug: "by-the-lake",
    title: "By the Lake",
    flower: "bellflower",
    fragments: ["the lake and the sky have shifted places.", "until all eyes become a single pair of eyes."],
    text: `By the lake,

the lake and the sky have shifted places.

An old boat,

its crevices filled with flying insects.

Ducks wander through the rotting mud,

and a swan becomes its ugliest self.

By the lake,

everyone draws near to an uneven mirror.

Their eyes are reflected in the water,

until all eyes become a single pair of eyes.`,
  },
  {
    slug: "the-garden-of-forking-paths",
    title: "The Garden of Forking Paths",
    flower: "tulip",
    tint: "wine",
    fragments: ["a garden of forking paths.", "lush with tangled branches."],
    text: `I walked into
a garden of forking paths.

There were no roses withered by time,
nor stones long since dried.

The garden was a labyrinth,
yet in the darkness,
it was as clear as crystal.

He passed through the emerald leaves,
and saw my reflection.

My deep-blue eyes
turned into
leaves crystallised from water.

At the entrance to the garden,
those narrow paths led towards three different endings.

At the heart of the labyrinth,
there stood a dark-green tree,
its vines winding around the branches,
its bark covered with human hair,
and a dark path winding beneath it.

That narrow path
led towards three different endings.

My eyes
became that dark-green tree,
devoured by its tangled branches.

I looked through the black leaves
and saw a man
standing silently at the entrance to the garden.

He touched my melancholy-blue eyes
and saw the blood vessels within them—

that narrow path
leading towards countless different endings.

I saw
one man after another,
one woman after another,
swallowed before my eyes.

Until that narrow path
became like my eyes—

lush with tangled branches.

There,
in the garden of forking paths.`,
  },
  {
    slug: "the-zero-of-night",
    title: "The Zero of Night",
    flower: "starflower",
    tint: "wine",
    fragments: ["is an immense, infinitesimal circle.", "An empty number— zero."],
    text: `Night,

the dark, the boundless night,

is an immense,

infinitesimal

circle.

There is a spirit

that comes with the night;

there is a pair of eyes

that opens in the darkness.

When night sinks into the depths of a distant well,

countless blackened branches emerge from the barren treetops.

Each black night is a rainfall,

and so the branches are washed clean of their colours.

Sometimes,

the rain dissolves into the moonlight,

drawing the roots of the trees into the darkness.

Sometimes,

there is no moonlight in the night,

nor is there rain.

And so, darkness becomes an infinite void.

An empty number—

zero.

It wipes away the ink-black curtain of night,

brushes the rain from the eyes,

and conceals the darkness

in a garden of flowers

blooming in the deepest night.`,
  },
  {
    slug: "the-first-mirror",
    title: "The First Mirror",
    flower: "bellflower",
    fragments: ["The surface of the lake at night is a mirror.", "a trace of ashen white."],
    text: `The surface of the lake at night

is a mirror.

It envelops the darkness of the night,

envelops a grey-white wreckage.

His eyes

gaze deeply

into the shattered mirror,

watching the fragments of glass rise and fall with the wind.

His eyes

gaze deeply

into the shattered mirror,

until his eyes

are engraved upon the surface of the lake.

His eyes

become a mirror.

Mirror upon mirror,

reflecting one another.

Until

one mirror

sinks

into another.

Until

within one mirror,

there appears

a trace of ashen white.`,
  },
  {
    slug: "the-second-mirror",
    title: "The Second Mirror",
    flower: "tulip",
    fragments: ["mirror after mirror, self after self.", "the shadow of a tree beneath the moonlight."],
    text: `My soul

slipped into a mirror,

through its mottled traces of rust.

The reflection began to swell.

I slipped into

a forest,

where the air was heavy with decay.

I wandered into

a labyrinth.

The mirrors within

reflected my soul.

I saw

different versions of myself,

witnessing

my own death.

The mirror slowly shattered.

Blood slowly

turned into threads.

Time and my life became one.

Together, they built a towering wall—

mirror after mirror,

self after self.

Fragments of moonlight

no longer flickered in the darkness.

Threads of blood

crept like vines beside me.

Blue blood pierced the mirror,

pouring into the labyrinth.

Everything around me seemed an illusion.

The mirror was a pool of water.

Its rust was soil untouched by moss.

My soul

was the shadow of a tree beneath the moonlight.`,
  },
  {
    slug: "the-third-mirror",
    title: "The Third Mirror",
    flower: "blossom",
    fragments: ["In an old attic, there lay a mirror.", "pink, yet covered in dust,"],
    text: `In an old attic,

there lay a mirror.

A butterfly knot woven from ribbons,

pink, yet covered in dust,

lay silently within its reflection.

A girl shattered the mirror with her tears.

A mirror was slowly consumed

by the salt within the tears.

The scattered ribbons

were devoured by blood-red insects.

The mirror swallowed the white—

until the white faded into pink,

deep pink,

then was washed by time

into a dark brown stain.`,
  },
  {
    slug: "the-fourth-mirror",
    title: "The Fourth Mirror",
    flower: "starflower",
    fragments: ["A wandering shadow drifted aimlessly through the mist.", "A mirror sank into another mirror."],
    text: `A wandering shadow

drifted aimlessly through the mist.

The fog swallowed the entire forest.

The shadow’s memories

grew hollow.

The shadow sought a mirror,

a mirror it had never known.

That mirror

passed through a labyrinth woven from trees,

through the stillness of the night,

and hid at the farthest edge of the mist.

Through tear-filled eyes,

the shadow saw decay,

and the spirit’s mourning for him.

That mirror

lay concealed at the end of the desolate night.

The shadow wandered through the labyrinth,

yet never found a mirror.

A mirror sank into another mirror.

There was an ashen-white mirror,

quietly hidden in the depths of the reflection.`,
  },
  {
    slug: "untitled-5-am-in-london",
    title: "[Untitled]",
    flower: "tulip",
    tint: "blue",
    fragments: ["Is it white or blue?", "Raindrops drip down the window sill."],
    text: `It was 5 a.m. in London. The sun still hid behind the mysterious dark blue winter sky or disappeared. Last night, the rain continued to fall, and traces of water still clung to the window. Below, the white garbage truck had arrived on schedule, parked by the roadside, but the front gate remained firmly shut. That black gate should have been open, but today, it was not. Perhaps the rain had washed through the mind of the gatekeeper, or maybe it was the winter’s dark night that made one forget the whiteness.

The street, the neglected streetlights,

Raindrops drip down the window sill.

The tightly locked gate may be entwined by the vines of night,

Or perhaps stiffened by the cold wind.

A book still lies upon the grey carpet.

Is it white or blue?

Is it the chill of winter,

Or the quiet hidden beneath?

A man

Sits on the swing,

The swan gone without a trace.

The trash,

Where does that truck head now?

A mountain peak,

Inscribed with despair.`,
  },
];
