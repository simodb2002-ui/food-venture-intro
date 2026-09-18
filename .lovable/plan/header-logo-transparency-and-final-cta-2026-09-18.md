# Header logo transparency and final CTA

## Changes
- Add transparent multiply blending to both header logo images so their white JPEG backgrounds visually disappear over the header.
- Add a final full-screen snap section after the orange section.
- Use the uploaded official FIS mark twice as oversized, edge-cropped background imagery: sharp at bottom-left and softly blurred at top-right.
- Center the community badge, category label, headline with an orange Food accent, supporting copy, and green membership call-to-action.
- Add the full-width orange strip along the section’s bottom edge.

## Responsive behavior
- Preserve the existing full-screen snap flow, wheel guard, navigation reveal, and reduced-motion behavior.
- Scale and reposition the decorative logo crops and typography for smaller screens so content remains readable and unobstructed.

## Technical details
- Store the uploaded FIS image through the project asset flow and import its URL into the page.
- Use existing semantic theme roles where available and add focused CTA color tokens for the new section.
- Use the existing Button control and icon library for the membership action and community badge.
- Verify the final section and header logos on desktop and mobile, including snap navigation and browser console health.
