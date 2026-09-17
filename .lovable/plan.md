# Four-stage challenge sequence

## What will change
- Extend the pink challenge scroll track to four viewport heights, with one snap point per stage.
- Replace the labeled three-part progress display with four thin, text-free progress lines.
- Keep one persistent headline container fixed in the same vertical position for all stages.
- Stage the content as: title only; split EVERY / WHERE with GIF; first bold paragraph; second bold paragraph plus summary.
- Crossfade the lower copy in a reserved-height area so the title and GIF never move.
- Preserve reduced-motion behavior and the existing one-panel wheel guard.

## Technical details
- Map challenge scroll progress to stages 0–3.
- Keep the title DOM mounted throughout; animate only the EVERYWHERE split and GIF dimensions/opacity.
- Reserve stable title and paragraph layout regions with responsive dimensions for desktop and mobile.
- Validate all four positions and the transition into the orange screen at desktop and phone sizes.
