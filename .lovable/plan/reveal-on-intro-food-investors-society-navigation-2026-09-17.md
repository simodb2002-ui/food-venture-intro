# Reveal-on-intro Food Investors Society navigation

## Build
- Replace the always-visible centered header with a full-width fixed navigation bar based on the supplied reference.
- Keep the bar hidden during the opening brand-to-tagline sequence, then animate it down and into view when the tagline entrance completes.
- Also reveal it immediately if the visitor scrolls into the challenge before the timed intro finishes.
- Use the supplied Food Investors Society lockup at left and foodXchange artwork inside the right-side “Powered by” pill.
- Add the centered links FIS, App, Our story, People, Support, and About, with FIS marked by a pink underline.
- Keep desktop spacing close to the reference and provide a compact mobile layout that stays within the viewport.

## Technical details
- Store the two uploaded logos through the project asset flow and import their asset pointers.
- Drive visibility from the existing intro phase and scroll container state, using Motion for the opacity and vertical transition.
- Preserve the existing pinned challenge progress, snap behavior, section content, and page metadata.

## Validation
- Confirm the bar is absent during the initial logo animation, appears after the tagline entrance, and remains fixed while scrolling.
- Check desktop and mobile layouts for clipping, overlap, and readable controls.
