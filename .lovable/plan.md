# Add the About page and connect navigation

## Build
- Copy the exact About page structure, interactions, typography, and styling from the referenced `@About` project into a new `/about` route.
- Transfer the original About photography and logo assets into this project so the page remains visually unchanged.
- Preserve the current FIS homepage and its existing scroll behavior.
- Update both page headers so “FIS” opens the homepage and “About” opens `/about`, with the correct active-page treatment.

## Technical details
- Isolate the About-specific CSS under its existing `.about-page` scope to avoid changing the homepage styling.
- Reuse the existing project button component, adding only the variants required by the copied About page.
- Add the About page’s Montserrat font through document head links.
- Use TanStack `Link` navigation for switching between `/` and `/about`, while retaining in-page anchors for About content sections.
- Add unique About metadata for title, description, Open Graph, and Twitter cards.

## Validation
- Verify `/` still renders and scrolls as before.
- Verify `/about` matches the source page on desktop and mobile, including its menu, image reveal, bowls, milestones, founder cards, and footer.
- Verify the FIS and About header links navigate correctly in both directions.
