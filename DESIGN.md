# Design system

**65% contemporary museum, 35% romantic archive.** The museum half is the grid, the white space and the restraint. The archive half is the paper, the catalogue numbers, the lace frame and the italics.

## Colour
| Token | Hex | Use |
|---|---|---|
| `ivory` | #F6F2E9 | The page. The reading surface: Selected Works and long-form pages. |
| `ivory-deep` | #EDE6D6 | A second sheet: alternate sections, footer |
| `ivory-pale` | #FBF9F3 | Lace, photo borders |
| `charcoal` | #34332F | Ink. Text, rules. ~15% |
| `charcoal-soft` | #6B6860 | Captions, secondary labels |
| `slate` | #62768E | Signature accent: display italics, the one full-bleed section per page. ~10% |
| `slate-ink` | #4F6078 | Slate deepened for small text (labels, links, hover) so it passes WCAG AA on ivory |
| `jordy` | #91C0EF | Sky blue, used lightly: placeholder tones, occasional details |
| `sunset` | #F7C97F | Text selection, labels on slate, warm highlights |
| `pumpkin` | #E87425 | Footer and Contact page background; hover colour on Seal Brown. Never for small text on ivory |
| `sealbrown` | #571801 | Deep accent ink: writing categories |

Hairlines are charcoal at 16% opacity (`border-rule`). A fixed SVG fibre grain sits over the whole site at very low opacity.

## Type
- **Fraunces** (display): names, titles, statements, quotations. A soft, slightly wonky old-style serif with optical sizes; corners are softened (`SOFT 100`) and italics use the wonky forms.
- **Send Flowers** (script): accent words only — the `<em>` inside a heading, "Feng" in the hero, the opening of the statement. A free stand-in for Whimsy May; if you buy a Whimsy May webfont licence, drop the files in and load them with `next/font/local` as `--font-send-flowers`'s replacement.
- **DM Mono**: the archival `label` voice (11px, uppercase, tracked): catalogue numbers, dates, categories.
- **Inter**: navigation, body copy and captions.

Scale (fluid, deliberately uneven): `display-xl` (hero name) → `display-l` (section titles) → `display-m` → `statement` → `title` → `lede` → `body` → `caption` → `label`. Section openings rotate alignment (left / offset / right) so no two read alike.

## Colour by section
Each section owns one colour, like the bands of a palette card:
Hero & Work → Jordy Blue · Selected Works & reading pages → Ivory · Statement & About → Sunset · Archive → Slate Gray · Writing → Seal Brown · Contact & footer → Pumpkin.
On Jordy and Sunset the ink is charcoal with seal-brown accents; on Slate and Seal Brown it is ivory with sunset accents; on Pumpkin it is seal brown.

## Grid & spacing
- `frame`: outer margins, `clamp(1.25rem, 4.5vw, 4rem)`.
- `grid-editorial`: 4 columns (phone), 8 (tablet, ≥48rem), 12 (laptop, ≥64rem). Asymmetry comes from `col-start-*`, `col-span-*` and vertical offsets, recomposed at each breakpoint rather than shrunk.
- `section-space`: `clamp(6rem, 14vw, 13rem)` vertical rhythm.
- `reading-column`: 38rem measure for long-form text.

## Components
- **Plate**: every image. Responsive `next/image`, or a toned placeholder with a faint motif and plate number.
- **LaceFrame**: die-cut paper doily in SVG. Once per page at most.
- **Label / SectionHeading / PageHeader**: the numbering system (`01 — Index`, `No. 01`, `Pl. II`).
- **Museum tag**: archive hover label. On touch screens it is always visible.
- No rounded corners, no shadows beyond a 1px hairline, no gradients except a faint print vignette.

## Motion
1. One easing curve, `cubic-bezier(0.22, 1, 0.36, 1)`: things settle, they don't bounce.
2. Small distances (10–24px); opacity carries most of the effect.
3. 0.45s for UI, 0.9s for reveals, 1.3s for the hero.
4. Hover: 1.035 image zoom over 1.4s, drawn underlines, colour shifts to slate.
5. Parallax on at most two elements per page, ±30–60px.
6. Only the scroll cue loops.
7. `prefers-reduced-motion` turns all of it off (Motion's `reducedMotion="user"` plus a CSS override).
