# Design system

**50% editorial minimalism · 30% romantic vintage illustration · 20% Art Nouveau.**
An independent art publication meeting an illustrated nineteenth-century storybook. Ivory paper and generous space carry the page; ornament is punctuation, never wallpaper.

## Colour
The painted-cabinet palette, used at full strength. Never desaturate these, never lay grey over them. Defined once as CSS variables in `:root` (app/globals.css); every Tailwind token points to them.

| Pigment | Hex | Variable / token | Use |
|---|---|---|---|
| Aged Ivory | #F2E4C8 | `--aged-ivory` / `ivory` | The page; the painted door panels |
| Antique Wine | #713F48 | `--wine` / `wine`, `ink` | All running text and headings (6.7:1 on ivory); the cabinet interior |
| Faded Vermilion | #C56558 | `--vermilion` / `vermilion` | Tulips, pinstripes, accent words, hover on large type (large text only, 3.1:1) |
| Botanical Green | #657B53 | `--botanical-green` / `green` | Stems and leaves; large type only |
| Antique Powder Blue | #91AEB5 | `--powder-blue` / `blue` | The cabinet body; decorative only |
| Honeyed Walnut | #A87950 | `--walnut` / `walnut` | Shelves, the inside of the doors, wood |
| Burnished Brass | #B18A48 | `--brass` / `brass` | Knobs, the key, stars; decorative only |

Placeholder plates use the same colours faded toward the paper. Real images get `faded-print` (slightly desaturated) so they sit in the page like book illustrations.

## Type
- **IM Fell English** — headings. Digitised 17th-century letterpress, with real ink spread. Italic for accent words.
- **IM Fell English SC** — the `label` voice: numerals, categories, navigation, captions' small print.
- **Pinyon Script** — the site title ("Eileen Feng"), the monogram, and one or two words per page at most.
- **Inter** — body text and long-form reading. No decorative faces in running text.

## Ornament (components/editorial)
- `Doily` — round die-cut paper doily in Haze, behind the title (rotates very slowly).
- `NouveauFrame` — arched Art Nouveau window with a fine outer rule and a star at the apex. One per section at most.
- `LaceFrame` — rectangular paper-lace frame, for the portrait.
- `BotanicalVine` — a whiplash stem whose line draws as you scroll, then leaves, then a bloom.
- `Star`, `Rosette`, `Fleuron`, `Flourish`, `LaceHeart` — small marks; the star and rosette turn a quarter when their section is hovered.
- `print` utility — a pale photographic border with the faintest lift, for objects laid on the page at slight angles.

## Texture
- Paper grain: a fixed SVG fibre texture over the whole site, almost invisible.
- Film grain: `grain` prop on `Plate` — gentle animated noise on a few selected images. Off with reduced motion.

## Grid & spacing
- `frame`: outer margins, `clamp(1.25rem, 4.5vw, 4rem)`.
- `grid-editorial`: 4 / 8 / 12 columns; asymmetry comes from column starts, spans and vertical offsets, recomposed per breakpoint.
- `section-space`: `clamp(6rem, 14vw, 13rem)`. `reading-column`: 38rem.

## Motion
1. One easing curve, `cubic-bezier(0.22, 1, 0.36, 1)`: things settle like paper.
2. Text lifts 10–24px into place; images use the `ink` reveal: from soft focus and low saturation to clear, like a print developing.
3. Linework draws with scroll; ornaments answer hover with a slow quarter-turn.
4. Parallax on at most two elements per page, ±30px.
5. `prefers-reduced-motion` turns all of it off.


## The painted cabinet (components/cabinet)
The homepage opens on an illustrated Tyrolean-style cabinet. It is drawn in SVG and "painted" by shared filters in `PaintDefs.tsx`:
- **Watercolour wash** (`#ec-wash-a/b/c`): wobbly edges, uneven pigment, granulation and a darker drying rim. Pools are the colour multiplied by itself, so they deepen rather than grey.
- **Coloured pencil** (`#ec-pencil`): a wandering, grainy line for outlines and details. `#ec-hatch` patterns give shadow.
- Shapes come from `paint.ts` (freehand rectangles, notched panels, tulips, leaves, hearts) with a seeded random source, so the two doors are siblings, not twins.

Interaction: the closed doors are one button; they swing on their hinges (3D rotateY, fading instead under reduced motion). Inside, four shelves link straight to their collection and two drawers slide out first. Choosing a collection spreads the paper out from that compartment, then opens `/collections/<slug>`, a plain editorial page. A list of the same six collections sits beside the cabinet for anyone who prefers not to open doors. Collections are defined in `content/collections.ts` and gather existing projects, writing and archive objects.
