# FIS

https://www.dimensioninstore.com/ generate a page similar to this but about the food investors society. Fullscreen hero section (100vh, w-full) centered vertically and horizontally.

A blurred video or dynamic image background overlay (darkened to ensure white text readability).

Large background typography behind the central content (e.g., stylized background text spanning full width, semi-transparent or blurred like in the reference).

Perfectly centered text box where sequence animations take place without layout shift.

Animation Sequence (Framer Motion):

Phase 1 — Brand Name / Logo:

Display "Food Investors Society" (or logo) positioned directly in the absolute screen center.

Animate in from below: slide up slightly (y: 30 to y: 0) and fade in (opacity: 0 to opacity: 1) with a smooth ease curve (duration: 0.8, ease: "easeOut").

Hold at center for ~1.5 seconds.

Animate out upward or cross-fade (opacity: 1 to opacity: 0, y: 0 to y: -20).

Phase 2 — Tagline:

Immediately after the brand text fades out, bring in the tagline: "We make good food the easier choice."

Tagline enters from below (y: 30 to y: 0) with opacity fade-in, remaining precisely in the absolute center of the viewport.

Rendered in bold, uppercase/semi-bold modern sans-serif, matching clean typography standards. this is all introductory to the homepage

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://food-venture-intro.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4551aaf2-d7b5-40e7-8a9e-dc4cd608b950).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
