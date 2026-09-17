# Pinned three-stage challenge story

## Build
- Replace the current single-screen pink challenge with a 300dvh scroll chapter containing a sticky 100dvh stage.
- Add a slim three-segment progress indicator directly beneath the fixed brand header, visible only while the challenge chapter is active.
- Drive three visual states from the challenge chapter’s internal scroll position:
  1. “HEAVILY MARKETED FOOD IS EVERYWHERE.” with the first supporting paragraph.
  2. Split “EVERYWHERE.” into “EVERY” and “WHERE.” around the grey GIF placeholder, with the research paragraph.
  3. “IT’S NOT ABOUT WILLPOWER.” with the concluding paragraph while the GIF smoothly recedes.
- Keep the orange solution screen immediately after the challenge chapter.

## Scroll behavior
- Adapt the existing wheel guard so wheel and trackpad input advances through the three pinned challenge stages before moving to the next full-screen section.
- Preserve strict one-screen snapping for the opening and solution screens without letting the tall challenge chapter collapse or get skipped.
- Keep touch scrolling natural on mobile while deriving the active stage from scroll progress.

## Typography and motion
- Keep each stage vertically compact with balanced wrapping, tight line-height, and restrained spacing around the GIF.
- Animate headline, body-copy, word split, GIF reveal, and progress segments with Motion.
- Respect reduced-motion preferences and maintain readable layouts on compact phone screens.

## Validation
- Verify stage progression, reverse scrolling, unpinning into the solution, and no skipped states on desktop and mobile.
- Confirm the headline remains a unified flow without unintended breaks or overlap.
