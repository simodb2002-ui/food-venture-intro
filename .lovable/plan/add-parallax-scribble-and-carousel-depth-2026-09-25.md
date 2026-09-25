# Add parallax scribble and carousel depth

## Build
- Replace the small accent beneath “on the way” with a large, thick charcoal hand-drawn SVG scribble layered behind the words.
- Draw the SVG path on page load, then offset it vertically with scroll progress for a subtle depth effect.
- Add restrained vertical scroll parallax to inactive carousel cards while keeping the centered card stable and preserving native horizontal swiping.
- Respect reduced-motion preferences for both effects.

## Validation
- Check the hero and carousel on desktop and mobile.
- Confirm the scribble stays legible, cards remain swipeable, and no content clips or overlaps.
- Confirm the page builds without errors.
