import { motion } from "motion/react";

type IconProps = { className?: string; reduceMotion?: boolean };

/**
 * Small flat-illustration style food icons (bold ink outline, simple two-
 * tone fills) built to sit alongside the site's line-icon set for the
 * foodXchange carousel graphics. Original shapes/palette, not traced from
 * any reference.
 */

const INK = "#2e2013";

export function PotIllustration({ className, reduceMotion }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Cooking pot">
      <motion.g
        aria-hidden="true"
        stroke="#f6ead9"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        animate={reduceMotion ? undefined : { opacity: [0.25, 0.85, 0.25], y: [0, -3, 0] }}
        transition={
          reduceMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <path d="M 24 10 C 22 6 27 5 25 1" />
        <path d="M 32 10 C 30 6 35 5 33 1" />
      </motion.g>

      <ellipse cx="29" cy="16" rx="17" ry="5" fill={INK} />
      <circle cx="29" cy="10" r="3" fill={INK} />

      <path
        d="M 10 18 L 10 40 Q 10 50 20 50 L 38 50 Q 48 50 48 40 L 48 18 Z"
        fill="#EA9A4A"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <ellipse cx="19" cy="30" rx="3.5" ry="12" fill="#F9CB93" opacity="0.55" />

      <path
        d="M 4 24 Q -1 24 0 30 Q 1 36 6 35"
        fill="none"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 54 24 Q 59 24 58 30 Q 57 36 52 35"
        fill="none"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BowlIllustration({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Bowl of food">
      <path
        d="M 8 26 L 56 26 L 49 48 Q 46 56 36 56 L 28 56 Q 18 56 15 48 Z"
        fill="#F4EFE6"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <ellipse cx="32" cy="26" rx="24" ry="6" fill="#E3DACB" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="32" cy="25.5" rx="20" ry="4.5" fill="#EA9A4A" />

      <circle cx="24" cy="25" r="1.8" fill="#C64B3C" />
      <circle cx="38" cy="24.5" r="1.6" fill="#C64B3C" />
      <circle cx="31" cy="26.5" r="1.4" fill="#5C8A54" />

      <path
        d="M 32 18 C 30 15 34 13 32 9"
        fill="none"
        stroke="#F4EFE6"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

const JAR_TONES = {
  neutral: { cap: "#4A8F5E", body: "#F9CB93", dot: "#E4439F" },
  bad: { cap: "#B3452F", body: "#C9C2B4", dot: "#B3452F" },
  good: { cap: "#3E7A4E", body: "#F9CB93", dot: "#4A8F5E" },
} as const;

export function JarIllustration({
  className,
  tone = "neutral",
}: IconProps & { tone?: keyof typeof JAR_TONES }) {
  const colors = JAR_TONES[tone];
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Packaged product">
      <rect
        x="24"
        y="4"
        width="16"
        height="7"
        rx="2"
        fill={colors.cap}
        stroke={INK}
        strokeWidth="2"
      />
      <path
        d="M 20 11 L 44 11 L 46 16 L 46 52 Q 46 58 40 58 L 24 58 Q 18 58 18 52 L 18 16 Z"
        fill={colors.body}
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="18" y="28" width="28" height="18" fill="#FCEFDD" stroke={INK} strokeWidth="2" />
      <circle cx="32" cy="37" r="6" fill={colors.dot} opacity="0.85" />
      <path d="M 22 15 L 42 15" stroke={INK} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}
