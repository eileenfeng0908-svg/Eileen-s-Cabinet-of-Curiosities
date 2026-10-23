/**
 * Motion principles
 * 1. Things settle, they don't bounce: one slow-out curve for everything.
 * 2. Distances are small (12–24px). Opacity carries most of the effect.
 * 3. Durations sit between 0.6s and 1.2s: unhurried, like turning a page.
 * 4. Nothing loops except the scroll cue.
 */
export const ease = [0.22, 1, 0.36, 1] as const;
export const easeTurn = [0.65, 0, 0.35, 1] as const;

export const duration = {
  quick: 0.45,
  base: 0.9,
  slow: 1.3,
} as const;
