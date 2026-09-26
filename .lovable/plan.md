# Consistent pill controls and About gradient

## Changes
- Update the shared button styles so standard buttons and icon buttons use fully rounded capsule shapes, balanced padding, subtle borders, no heavy shadows, and one smooth lift/colour hover treatment.
- Bring page-specific CTAs and tab-like controls into the same style while preserving purpose-built shapes such as carousel cards, progress dots, feature cards, and the interactive bowls.
- Refine the About page controls, including the scroll CTA, movement CTA, newsletter submit, timeline rows, and email field, removing sharp corners and blocky shadows.
- Change the final About page colour transition from yellow to the established FIS green, keeping the transition smooth and the footer readable.

## Verification
- Check every public page at desktop and mobile widths for consistent controls, clear focus states, and no clipped text.
- Confirm the About page gradient reaches green before the footer without a visible seam.
- Confirm the preview finishes without build or runtime errors.

## Technical details
- Treat the shared `Button` variants as the baseline and use semantic project colours.
- Keep non-button content containers and bespoke visual illustrations unchanged.
