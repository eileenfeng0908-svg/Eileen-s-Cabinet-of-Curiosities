# Design system

**50% editorial minimalism · 30% romantic vintage illustration · 20% Art Nouveau.**
An independent art publication meeting an illustrated nineteenth-century storybook. Ivory paper and generous space carry the page; ornament is punctuation, never wallpaper.

## Colour
Faded Impressionist inks on warm paper. Ivory dominates; avoid colour blocking.

| Token | Hex | Use |
|---|---|---|
| `ivory` | #F6F2E9 | Warm Ivory — the page, almost everywhere |
| `ivory-deep` | #EEE7D8 | A second sheet: the statement, the footer |
| `ivory-pale` | #FBF8F1 | Print borders, lace |
| `velvet` / `ink` | #4A446F | Body text, structure, rules |
| `ink-soft` | #666186 | Captions (passes AA on ivory) |
| `mozart` | #475480 | Headings, links, the site title |
| `haze` | #9FA4C9 | Soft signature accent: the doily, stars, washes (`haze-wash`). Decorative only, never for text |
| `fern` | #627655 | Botanical linework (`fern-ink` #56684A for small text) |
| `bloom` | #CF809E | Flowers, the lace heart, selection (`bloom-ink` #9B5A72 for numerals and hover text) |
| `amber` | #E0AC82 | The heart of a bloom, warm details (`amber-ink` #8A5A33 for text) |

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
