import { motion } from "motion/react";
import { useEffect, useState } from "react";

// One balloon shape, matched to the foodXchange mark: local origin is the
// tip, a straight 45° taper (so the "X" negative space between petals is a
// constant width, not flaring), a small rounded shoulder into the straight
// side, then a true circular arc dome. Reused for all 4 petals — they're
// the exact same shape, just rotated and recolored — so every one is
// guaranteed identical in size.
const FX_PETAL_PATH =
  "M 0 0 L 54.8 -54.8 Q 67.5 -67.5 67.5 -85.5 L 67.5 -123 A 67.5 67.5 0 1 0 -67.5 -123 L -67.5 -85.5 Q -67.5 -67.5 -54.8 -54.8 Z";

const FX_PETALS = [
  { angle: 0, gradient: "fx-orange" },
  { angle: 90, gradient: "fx-pink" },
  { angle: 180, gradient: "fx-orange" },
  { angle: 270, gradient: "fx-pink" },
] as const;

export function FoodXchangeMark({
  reduce,
  className,
  basketColor = "#0a0a0a",
}: {
  reduce: boolean;
  className?: string;
  basketColor?: string;
}) {
  // Each spin advances by 450° (360° + a quarter turn) instead of a full
  // 360°, so it still reads as one energetic windmill spin but lands 90°
  // further round each time. Since opposite petals share a colour, that
  // quarter-turn offset is what makes the resting orientation alternate
  // between "yellow vertical" and "pink vertical" every other spin. The
  // schedule is driven by our own timer chain (matching the transition's
  // duration/pause) rather than the animation's completion callback, since
  // that callback can also fire for the very first, motionless render.
  const [rotation, setRotation] = useState(0);
  const spinMs = 4000;
  const pauseMs = 2000;

  useEffect(() => {
    if (reduce) return;
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextSpin = (delay: number) => {
      timeoutId = setTimeout(() => {
        setRotation((value) => value + 450);
        scheduleNextSpin(spinMs + pauseMs);
      }, delay);
    };
    scheduleNextSpin(pauseMs);

    return () => clearTimeout(timeoutId);
  }, [reduce]);

  return (
    <svg viewBox="-230 -230 460 530" className={className} role="img" aria-label="foodXchange logo">
      <defs>
        <linearGradient id="fx-pink" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#E443A0" />
          <stop offset="100%" stopColor="#EB71AC" />
        </linearGradient>
        <linearGradient id="fx-orange" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#F2B066" />
          <stop offset="100%" stopColor="#F9DA87" />
        </linearGradient>
      </defs>

      <motion.g
        style={{ transformOrigin: "0px 0px" }}
        animate={{ rotate: reduce ? 0 : rotation }}
        transition={reduce ? { duration: 0 } : { duration: spinMs / 1000, ease: "linear" }}
      >
        {FX_PETALS.map(({ angle, gradient }, i) => (
          <g key={i} transform={`rotate(${angle}) translate(0, -30)`}>
            <path d={FX_PETAL_PATH} fill={`url(#${gradient})`} />
          </g>
        ))}
      </motion.g>

      <path
        d="M -184 104 L 184 104 L 144 277 L -144 277 Z"
        fill="none"
        stroke={basketColor}
        strokeWidth={16}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
