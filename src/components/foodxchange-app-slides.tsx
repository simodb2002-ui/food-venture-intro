import {
  AlertTriangle,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Croissant,
  Landmark,
  Leaf,
  Lightbulb,
  MapPin,
  Plus,
  ShoppingBasket,
  Sparkles,
  Store,
  Tag,
  TrendingDown,
  TrendingUp,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

import { BowlIllustration, JarIllustration, PotIllustration } from "./food-icons";

type SlideProps = { reduceMotion: boolean };

function ScreenCard({
  children,
  justify = "between",
}: {
  children: ReactNode;
  justify?: "between" | "center" | "down";
}) {
  const justifyClass =
    justify === "between" ? "justify-between" : justify === "center" ? "justify-center" : "";
  return (
    <div
      className={`relative flex flex-1 flex-col overflow-hidden rounded-[1.75rem] border border-black bg-transparent p-5 sm:p-6 ${justifyClass}`}
    >
      {/* "down" biases content toward the bottom (more free space above
          than below) rather than pinning it flush or dead-centering it. */}
      {justify === "down" && <div aria-hidden="true" style={{ flexGrow: 2 }} />}
      {children}
      {justify === "down" && <div aria-hidden="true" style={{ flexGrow: 1 }} />}
    </div>
  );
}

function SlideHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4 text-center sm:mb-5">
      <h3 className="font-display text-xl font-extrabold text-solution-foreground sm:text-2xl">
        {title}
      </h3>
      <p className="mx-auto mt-1.5 max-w-md text-sm font-medium leading-snug text-solution-foreground/70 sm:text-base">
        {subtitle}
      </p>
    </div>
  );
}

function DataPill({
  label,
  delay,
  reduceMotion,
}: {
  label: string;
  delay: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.span
      initial={reduceMotion ? false : { opacity: 0, scale: 0.7, y: 6 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{
        duration: reduceMotion ? 0 : 0.35,
        delay: reduceMotion ? 0 : delay,
        ease: "easeOut",
      }}
      className="inline-block"
    >
      <span className="inline-flex items-center rounded-full border border-solution-foreground/15 bg-solution-foreground/[0.06] px-2.5 py-1 text-[11px] font-bold text-solution-foreground/80 sm:text-xs">
        {label}
      </span>
    </motion.span>
  );
}

/* ---------------- 1. Scan ---------------- */

const SCAN_CARD_TONES = {
  bad: {
    tint: "bg-problem",
    badgeBg: "bg-problem/10",
    badgeText: "text-problem",
    Icon: AlertTriangle,
  },
  good: {
    tint: "bg-cta-action",
    badgeBg: "bg-cta-action/10",
    badgeText: "text-cta-action",
    Icon: CheckCircle2,
  },
} as const;

function ScanCard({
  tone,
  label,
  reduceMotion,
}: {
  tone: "bad" | "good";
  label: string;
  reduceMotion: boolean;
}) {
  const { tint, badgeBg, badgeText, Icon } = SCAN_CARD_TONES[tone];
  const scanTimes = [0, 0.5, 1];
  const revealTimes = [0, 0.45, 0.55, 0.95, 1];
  const revealValues = [0, 0, 1, 1, 0];
  const tintValues = [0, 0, 0.6, 0.6, 0];
  const whiteWashValues = [0, 0, 0.05, 0.05, 0];

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: reduceMotion ? 0 : 0.35 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative h-36 w-28 overflow-hidden rounded-2xl border-2 border-dashed border-black sm:h-40 sm:w-32">
        <div className="absolute inset-2 flex items-center justify-center rounded-xl">
          <JarIllustration className="h-20 w-20 sm:h-24 sm:w-24" />
        </div>

        <motion.div
          aria-hidden="true"
          animate={reduceMotion ? undefined : { opacity: tintValues, times: revealTimes }}
          transition={reduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: "linear" }}
          style={reduceMotion ? { opacity: 0.6 } : undefined}
          className={`pointer-events-none absolute inset-0 ${tint} opacity-0`}
        />

        <motion.div
          aria-hidden="true"
          animate={reduceMotion ? undefined : { opacity: whiteWashValues, times: revealTimes }}
          transition={reduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: "linear" }}
          style={reduceMotion ? { opacity: 0.05 } : undefined}
          className="pointer-events-none absolute inset-0 bg-white opacity-0"
        />

        <motion.div
          aria-hidden="true"
          animate={reduceMotion ? undefined : { opacity: revealValues, times: revealTimes }}
          transition={reduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: "linear" }}
          style={reduceMotion ? { opacity: 1 } : undefined}
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 to-white/30 opacity-0"
        />

        <motion.div
          aria-hidden="true"
          animate={reduceMotion ? undefined : { top: ["8%", "88%", "8%"], times: scanTimes }}
          transition={
            reduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
          style={reduceMotion ? { top: "50%" } : undefined}
          className="absolute left-0 right-0 h-0.5 bg-problem shadow-[0_0_10px_2px_rgba(228,67,160,0.65)]"
        />

        <motion.div
          aria-hidden="true"
          animate={reduceMotion ? undefined : { opacity: revealValues, times: revealTimes }}
          transition={reduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: "linear" }}
          style={reduceMotion ? { opacity: 1 } : undefined}
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0"
        >
          <Icon
            className="h-14 w-14 shrink-0 text-white drop-shadow-md sm:h-16 sm:w-16"
            aria-hidden="true"
          />
        </motion.div>
      </div>

      <motion.span
        animate={reduceMotion ? undefined : { opacity: revealValues, times: revealTimes }}
        transition={reduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: "linear" }}
        style={reduceMotion ? { opacity: 1 } : undefined}
        className={`rounded-full ${badgeBg} px-2 py-1 text-center text-[10px] font-bold ${badgeText} sm:text-[11px]`}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

const SCAN_TAGS = [
  "Category",
  "Recommended Retail Price",
  "Nutritional Value",
  "Processing Level Profile",
  "Additives",
  "Pack Size",
  "Price Per Pack/Serving",
  "Supermarket Stocklists",
];

export function ScanSlide({ reduceMotion }: SlideProps) {
  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col">
      <SlideHeading
        title="See Your Food Clearly"
        subtitle="Simple scoring helps you understand ingredients, additives, and nutritional value without judgement or jargon."
      />
      <ScreenCard>
        <div className="flex items-start justify-center gap-6 sm:gap-8">
          <ScanCard tone="bad" label="Ultra-processed" reduceMotion={reduceMotion} />
          <ScanCard tone="good" label="Minimally processed" reduceMotion={reduceMotion} />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {SCAN_TAGS.map((label, i) => (
            <DataPill key={label} label={label} delay={0.08 * i} reduceMotion={reduceMotion} />
          ))}
        </div>
      </ScreenCard>
    </div>
  );
}

/* ---------------- 2. Price ---------------- */

const PRICE_TAGS = [
  { store: "Sainsbury's", price: "£2.10" },
  { store: "Tesco", price: "£2.25" },
  { store: "Morrisons", price: "£1.95" },
  { store: "Asda", price: "£2.05" },
];

export function PriceSlide({ reduceMotion }: SlideProps) {
  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col">
      <SlideHeading
        title="Find Better Value"
        subtitle="Real-time price comparisons help you stretch your budget while still investing in good food."
      />
      <ScreenCard justify="down">
        <div className="relative -mt-3 grid grid-cols-2 gap-3 sm:-mt-4 sm:gap-4">
          <motion.span
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border-2 border-solution bg-cta-action shadow-md sm:h-20 sm:w-20"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/0 to-white/30"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-white/20"
            />
            <JarIllustration className="relative h-10 w-10 sm:h-12 sm:w-12" />
          </motion.span>
          {PRICE_TAGS.map((tag, i) => {
            const isBest = tag.store === "Morrisons";
            return (
              <motion.div
                key={tag.store}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.35,
                  delay: reduceMotion ? 0 : 0.08 * i,
                }}
                className="relative"
              >
                {isBest && (
                  <motion.span
                    aria-hidden="true"
                    animate={
                      reduceMotion ? undefined : { scale: [1, 1.06, 1], opacity: [0.5, 0.9, 0.5] }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                    }
                    className="absolute inset-0 rounded-xl bg-cta-action/25"
                  />
                )}
                <div
                  className={`relative flex items-center justify-between rounded-xl border px-4 py-3.5 sm:py-4 ${
                    isBest
                      ? "border-cta-action bg-cta-action/10"
                      : "border-solution-foreground/15 bg-white/40"
                  }`}
                >
                  <span className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-solution-foreground/55 sm:text-xs">
                      {tag.store}
                    </span>
                    <span className="text-base font-extrabold text-solution-foreground sm:text-lg">
                      {tag.price}
                    </span>
                  </span>
                  {isBest ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-cta-action px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-cta-action-foreground sm:text-[11px]">
                      <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
                      Best price
                    </span>
                  ) : (
                    <Store className="h-5 w-5 text-solution-foreground/30" aria-hidden="true" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-solution-foreground px-5 py-2.5 text-sm font-extrabold text-solution shadow-md sm:text-base">
            <Plus className="h-5 w-5" aria-hidden="true" />
            Add to My List
          </span>
        </div>
      </ScreenCard>
    </div>
  );
}

/* ---------------- 3. Shop ---------------- */

const SHOP_CARDS = [
  {
    label: "Plan Better",
    Icon: CalendarCheck,
    bubble: "h-16 w-16 sm:h-20 sm:w-20",
    icon: "h-7 w-7 sm:h-8 sm:w-8",
  },
  {
    label: "Waste Less",
    Icon: Trash2,
    bubble: "h-20 w-20 sm:h-24 sm:w-24",
    icon: "h-9 w-9 sm:h-10 sm:w-10",
  },
  {
    label: "Shop Smarter",
    Icon: ShoppingBasket,
    bubble: "h-24 w-24 sm:h-28 sm:w-28",
    icon: "h-11 w-11 sm:h-12 sm:w-12",
  },
] as const;

export function ShopSlide({ reduceMotion }: SlideProps) {
  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col">
      <SlideHeading
        title="Shop Smarter"
        subtitle='Plan meals, reduce waste, and build shopping lists that keep your "food assets" growing week by week.'
      />
      <ScreenCard justify="down">
        <div className="flex flex-col items-center">
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
            transition={
              reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            }
            className="relative z-20 inline-flex items-center gap-2 rounded-full bg-problem px-4 py-2 text-xs font-extrabold text-problem-foreground shadow-md sm:text-sm"
          >
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
            Build your Food Assets
          </motion.span>

          <div className="relative mt-4 flex items-end justify-center gap-6 pt-10 sm:mt-6 sm:gap-9 sm:pt-14">
            {/* The arrow is drawn above the icons (z-10) and sweeps from
                the first, smallest bubble to the last, biggest one, so it
                reads as tracing straight over the top of the row. */}
            <svg
              aria-hidden="true"
              viewBox="0 -15 280 105"
              className="pointer-events-none absolute inset-x-2 top-0 z-10 h-24 w-[calc(100%-1rem)] text-problem sm:h-28"
              fill="none"
            >
              <motion.path
                d="M 18 78 Q 140 -20 258 10"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                initial={reduceMotion ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.9,
                  ease: "easeInOut",
                  delay: reduceMotion ? 0 : 0.35,
                }}
                style={reduceMotion ? { pathLength: 1 } : undefined}
              />
              <motion.path
                d="M 244 -4 L 258 10 L 240 18"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduceMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, delay: reduceMotion ? 0 : 1.15 }}
                style={reduceMotion ? { opacity: 1 } : undefined}
              />
            </svg>

            {SHOP_CARDS.map(({ label, Icon, bubble, icon }, i) => (
              <motion.div
                key={label}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.35,
                  delay: reduceMotion ? 0 : 0.12 * i,
                }}
                className="flex flex-col items-center gap-2"
              >
                <span
                  className={`flex ${bubble} items-center justify-center rounded-full bg-solution-foreground text-solution shadow-md`}
                >
                  <Icon className={icon} aria-hidden="true" />
                </span>
                <span className="text-xs font-bold leading-tight text-solution-foreground sm:text-sm">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </ScreenCard>
    </div>
  );
}

/* ---------------- 4. Cook ---------------- */

const RECIPE_TAGS = ["3-Ingredients", "Family Favourites", "One Pot", "Takeaways"];

function FlowArrow({ reduceMotion }: { reduceMotion: boolean }) {
  // One continuous hand-drawn stroke (shaft and arrowhead in a single path,
  // same technique as the FIS-to-foodXchange bridge arrow on the About
  // page) so it draws itself in as a single motion, not two separate parts.
  const drawTimes = [0, 0.55, 0.65, 0.92, 1];
  const drawValues = [0, 0, 1, 1, 0];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 -6 64 30"
      className="h-6 w-16 shrink-0 text-cta-action sm:h-7 sm:w-20"
      fill="none"
    >
      <motion.path
        d="M4 18 C 22 2 42 2 60 12 L51 -2.4 L60 12 L43 12"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={reduceMotion ? undefined : { pathLength: drawValues, times: drawTimes }}
        transition={
          reduceMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
        }
        style={reduceMotion ? { pathLength: 1 } : undefined}
      />
    </svg>
  );
}

export function CookSlide({ reduceMotion }: SlideProps) {
  // One repeating story: the pot bubbles away, then the arrow and finished
  // plate pop in and hold, before the cycle resets and cooks again.
  const revealTimes = [0, 0.55, 0.65, 0.92, 1];
  const revealOpacity = [0, 0, 1, 1, 0];
  const revealScale = [0.7, 0.7, 1, 1, 0.85];

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col">
      <SlideHeading
        title="Cook Easy"
        subtitle="Browse quick recipes, kitchen hacks, and ideas that make eating well more convenient."
      />
      <ScreenCard justify="down">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 6, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.2 }}
              className="absolute -top-11 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                transition={
                  reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                }
                className="relative flex items-center gap-1 whitespace-nowrap rounded-2xl bg-footer px-3.5 py-2 text-[11px] font-extrabold text-footer-foreground shadow-md sm:text-xs"
              >
                <Lightbulb className="h-4 w-4 text-solution" aria-hidden="true" />
                Quick Tips
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-footer"
                />
              </motion.div>
            </motion.div>

            <PotIllustration className="h-28 w-28 sm:h-32 sm:w-32" reduceMotion={reduceMotion} />
          </div>

          <motion.div
            className="flex items-center gap-2 sm:gap-3"
            animate={
              reduceMotion
                ? undefined
                : { opacity: revealOpacity, scale: revealScale, times: revealTimes }
            }
            style={reduceMotion ? { opacity: 1, scale: 1 } : undefined}
            transition={
              reduceMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <FlowArrow reduceMotion={reduceMotion} />
            <BowlIllustration className="h-28 w-28 sm:h-32 sm:w-32" reduceMotion={reduceMotion} />
          </motion.div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {RECIPE_TAGS.map((label, i) => (
            <DataPill key={label} label={label} delay={0.08 * i} reduceMotion={reduceMotion} />
          ))}
        </div>
      </ScreenCard>
    </div>
  );
}

/* ---------------- 5. Community map ---------------- */

const MAP_FILTERS = [
  "Independent shops",
  "Bakeries",
  "Butchers",
  "Community pantries",
  "Cookery Workshop",
  "Farmers Market",
];

const MAP_PINS = [
  { label: "Local bakery", top: "16%", left: "20%", Icon: Croissant },
  { label: "Community pantry", top: "52%", left: "14%", Icon: Landmark },
  { label: "Food project", top: "20%", left: "86%", Icon: Leaf },
  { label: "Growing group", top: "66%", left: "70%", Icon: Sparkles },
  { label: "Independent shop", top: "38%", left: "50%", Icon: Store },
] as const;

export function MapSlide({ reduceMotion }: SlideProps) {
  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col">
      <SlideHeading
        title="Connect With Your Local Food Community"
        subtitle="Discover food projects, cooking workshops, growing groups, and independent shops working to make good food easier for everyone."
      />
      <ScreenCard>
        <div className="mb-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {MAP_FILTERS.map((label, i) => (
            <motion.span
              key={label}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : 0.05 * i }}
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold sm:text-[11px] ${
                i === 0
                  ? "border-problem bg-problem text-problem-foreground"
                  : "border-solution-foreground/20 bg-white text-solution-foreground/75"
              }`}
            >
              <Tag className="h-3 w-3 shrink-0" aria-hidden="true" />
              {label}
            </motion.span>
          ))}
        </div>

        <div
          className="relative min-h-40 flex-1 rounded-xl border border-solution-foreground/15 sm:min-h-44"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(24,18,10,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,18,10,0.06) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            backgroundColor: "rgba(255,255,255,0.6)",
          }}
        >
          {MAP_PINS.map((pin, i) => (
            <motion.span
              key={pin.label}
              initial={reduceMotion ? false : { opacity: 0, y: -14, scale: 0.5 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={
                reduceMotion
                  ? undefined
                  : { type: "spring", stiffness: 260, damping: 12, delay: 0.12 * i }
              }
              style={{ top: pin.top, left: pin.left }}
              className="absolute z-10 -translate-x-1/2 -translate-y-full"
            >
              <motion.span
                animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 * i }
                }
                className="flex flex-col items-center"
              >
                {/* Hover scale lives on its own element, separate from the
                    idle bob above, so the two never fight over the same
                    animated property and can't stutter on hand-off. */}
                <motion.span
                  whileHover={reduceMotion ? undefined : { scale: 1.6 }}
                  transition={reduceMotion ? undefined : { duration: 0.4, ease: "easeInOut" }}
                  style={{ transformOrigin: "bottom center" }}
                  className="flex cursor-pointer flex-col items-center"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-problem text-problem-foreground shadow-md sm:h-8 sm:w-8">
                    <pin.Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <MapPin
                    className="-mt-1 h-3.5 w-3.5 text-problem"
                    aria-hidden="true"
                    fill="currentColor"
                  />
                </motion.span>
              </motion.span>
            </motion.span>
          ))}

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.6 }}
            className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-2 rounded-xl bg-white/95 px-3 py-2 shadow-md sm:inset-x-3"
          >
            <span className="text-[10px] font-bold leading-tight text-solution-foreground sm:text-[11px]">
              5 good food places nearby
              <span className="block font-medium text-solution-foreground/60">
                Within a 20-minute walk
              </span>
            </span>
            <motion.span
              animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
              transition={
                reduceMotion ? undefined : { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
              }
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cta-action text-cta-action-foreground"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          </motion.div>
        </div>
      </ScreenCard>
    </div>
  );
}

/* ---------------- 6. Learn more ---------------- */

export function LearnMoreSlide({ reduceMotion }: SlideProps) {
  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col">
      <SlideHeading
        title="The App Is Coming Soon"
        subtitle="Everything you just saw is on its way to your pocket. Tap below to find out more."
      />
      <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-[1.75rem] border border-black">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(120deg, var(--color-solution), oklch(0.88 0.1 74), var(--color-solution))",
            backgroundSize: "300% 300%",
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  backgroundPosition: ["0% 50%", "50% 0%", "100% 50%", "50% 100%", "0% 50%"],
                }
          }
          transition={
            reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <a
          href="/app"
          className="relative z-10 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-extrabold text-white shadow-md sm:text-base"
        >
          Learn more
        </a>
      </div>
    </div>
  );
}

export const FOODXCHANGE_APP_SLIDES = [
  ScanSlide,
  PriceSlide,
  ShopSlide,
  CookSlide,
  MapSlide,
  LearnMoreSlide,
] as const;
