# Design system

**65% contemporary museum, 35% romantic archive.** The museum half is the grid, the white space and the restraint. The archive half is the paper, the catalogue numbers, the lace frame and the italics.

## Colour
| Token | Hex | Use |
|---|---|---|
| `ivory` | #F6F2E9 | The page. ~70% of everything. |
| `ivory-deep` | #EDE6D6 | A second sheet: alternate sections, footer |
| `ivory-pale` | #FBF9F3 | Lace, photo borders |
| `charcoal` | #34332F | Ink. Text, rules. ~15% |
| `charcoal-soft` | #6B6860 | Captions, secondary labels |
| `mozart` | #475480 | Signature accent: section numbers, italics, hover, one full-bleed section per page at most. ~10% |
| `masterkey` | #D9CC8A | Text selection, labels on blue |
| `pear` | #A7993C | Placeholder tone, rare details |
| `sunburn` | #B57056 | Writing categories |
| `copper` | #7F3B25 | Reserved for emphasis |

Hairlines are charcoal at 16% opacity (`border-rule`). A fixed SVG fibre grain sits over the whole site at very low opacity.

## Type
- **Cormorant Garamond** (display): names, titles, statements, quotations. Italic is the second voice, usually in mozart.
- **Inter** (sans): navigation, body copy, captions, and the archival `label` (11px, uppercase, 0.16em tracking).

Scale (fluid, deliberately uneven): `display-xl` (hero name) → `display-l` (section titles) → `display-m` → `statement` → `title` → `lede` → `body` → `caption` → `label`. Section openings rotate alignment (left / offset / right) so no two read alike.

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
4. Hover: 1.035 image zoom over 1.4s, drawn underlines, colour shifts to mozart.
5. Parallax on at most two elements per page, ±30–60px.
6. Only the scroll cue loops.
7. `prefers-reduced-motion` turns all of it off (Motion's `reducedMotion="user"` plus a CSS override).
