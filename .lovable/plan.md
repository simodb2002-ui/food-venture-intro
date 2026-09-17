# Full-screen Food Investors Society story

## Build
- Keep the existing animated white intro as the first full-screen panel.
- Add a fixed, minimal Food Investors Society header that stays legible across every color section.
- Turn the page into a mandatory vertical snap-scrolling experience, with one viewport-height panel per story beat.
- Build the pink “problem” panel with bold messaging and animated, labeled grey image placeholders that fan into a layered stack.
- Build the green “solution” panel with the supplied foodXchange copy and two responsive interactive choices.
- Make “Explore foodXchange” reveal and scroll to a fourth orange app-interface placeholder panel.
- Keep “Become a Member” as a clear interactive action with a lightweight confirmation state, without adding accounts or data storage.

## Motion and accessibility
- Use Motion for React for panel entrances, the image-card fan, and the existing brand-to-tagline transition.
- Respect reduced-motion preferences and preserve keyboard focus visibility.
- Adapt the layouts for compact mobile screens without text overlap.

## Validation
- Check the snap flow, interactions, animation states, and visual fit in the running page at desktop and mobile sizes.
- Preserve route-specific page metadata.
