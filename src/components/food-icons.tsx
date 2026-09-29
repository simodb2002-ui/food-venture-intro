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
        <path d="M 24 10 C 22 6 27 5 25 2" />
        <path d="M 32 10 C 30 6 35 5 33 2" />
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

      {!reduceMotion && (
        <g aria-hidden="true">
          {[
            { cx: 21, delay: 0 },
            { cx: 29, delay: 0.5 },
            { cx: 37, delay: 1 },
          ].map((bubble) => (
            <motion.circle
              key={bubble.cx}
              cx={bubble.cx}
              r="2"
              fill="#FCEFDD"
              initial={{ cy: 46, opacity: 0 }}
              animate={{ cy: [46, 22], opacity: [0, 0.9, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeOut",
                delay: bubble.delay,
              }}
            />
          ))}
        </g>
      )}

      <path
        d="M 6 24 Q 2 24 2 30 Q 2 36 7 35"
        fill="none"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 52 24 Q 56 24 56 30 Q 56 36 51 35"
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
      {/* Shifted up 6 units so the bowl's base lands on the same y as the
          pot's base (y=50) within the shared 64-tall viewBox. */}
      <g transform="translate(0, -6)">
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
      </g>
    </svg>
  );
}

const JAR_GREEN = "#4A8F5E";
const JAR_BODY = "#D9713F";
const JAR_HIGHLIGHT = "#F2A876";

export function JarIllustration({ className }: IconProps) {
  return (
    <svg viewBox="0 0 56 64" className={className} role="img" aria-label="Packaged product">
      <rect
        x="19"
        y="2"
        width="18"
        height="9"
        rx="2.5"
        fill={JAR_GREEN}
        stroke={INK}
        strokeWidth="2"
      />
      <line x1="21" y1="5" x2="35" y2="5" stroke={INK} strokeWidth="1.2" opacity="0.45" />
      <line x1="21" y1="7.5" x2="35" y2="7.5" stroke={INK} strokeWidth="1.2" opacity="0.45" />

      <path
        d="M 20 11 L 36 11 L 40 19 Q 43 27 43 35 L 43 50 Q 43 58 35 58 L 21 58 Q 13 58 13 50 L 13 35 Q 13 27 16 19 Z"
        fill={JAR_BODY}
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M 18 22 Q 16 32 16 44"
        fill="none"
        stroke={JAR_HIGHLIGHT}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />

      <rect
        x="11"
        y="32"
        width="34"
        height="18"
        rx="3"
        fill={JAR_GREEN}
        stroke={INK}
        strokeWidth="2"
      />
    </svg>
  );
}
