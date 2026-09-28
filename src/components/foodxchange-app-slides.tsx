import {
  AlertTriangle,
  ArrowRight,
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

function ScreenCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-solution-foreground/15 bg-white/80 p-5 shadow-[0_20px_45px_-25px_rgba(0,0,0,0.35)] sm:p-6">
      {children}
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
      <motion.span
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.4 }
        }
        className="inline-flex items-center rounded-full border border-solution-foreground/15 bg-solution-foreground/[0.06] px-2.5 py-1 text-[11px] font-bold text-solution-foreground/80 sm:text-xs"
      >
        {label}
      </motion.span>
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

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: reduceMotion ? 0 : 0.35 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative h-32 w-24 overflow-hidden rounded-2xl border-2 border-dashed border-solution-foreground/25 bg-solution/15 sm:h-36 sm:w-28">
        <div className="absolute inset-2 flex items-center justify-center rounded-xl bg-gradient-to-br from-solution/40 to-solution-foreground/10">
          <JarIllustration className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]" tone={tone} />
        </div>

        <motion.div
          aria-hidden="true"
          animate={reduceMotion ? undefined : { opacity: revealValues, times: revealTimes }}
          transition={reduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: "linear" }}
          style={reduceMotion ? { opacity: 0.28 } : undefined}
          className={`pointer-events-none absolute inset-0 ${tint} opacity-0`}
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
            className="h-10 w-10 text-white drop-shadow-md sm:h-12 sm:w-12"
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
    <div className="mx-auto w-full max-w-2xl">
      <SlideHeading
        title="See Your Food Clearly"
        subtitle="Simple scoring helps you understand ingredients, additives, and nutritional value without judgement or jargon."
      />
      <ScreenCard>
        <div className="flex items-start justify-center gap-4 sm:gap-6">
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
    <div className="mx-auto w-full max-w-2xl">
      <SlideHeading
        title="Find Better Value"
        subtitle="Real-time price comparisons help you stretch your budget while still investing in good food."
      />
      <ScreenCard>
        <div className="relative grid grid-cols-2 gap-2.5 sm:gap-3">
          <motion.span
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-solution bg-white shadow-md sm:h-16 sm:w-16"
          >
            <JarIllustration className="h-9 w-9 sm:h-10 sm:w-10" />
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
                  className={`relative flex items-center justify-between rounded-xl border px-3 py-2 ${
                    isBest
                      ? "border-cta-action bg-cta-action/10"
                      : "border-solution-foreground/15 bg-white"
                  }`}
                >
                  <span className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-solution-foreground/55 sm:text-[11px]">
                      {tag.store}
                    </span>
                    <span className="text-sm font-extrabold text-solution-foreground sm:text-base">
                      {tag.price}
                    </span>
                  </span>
                  {isBest ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-cta-action px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-cta-action-foreground sm:text-[10px]">
                      <TrendingDown className="h-3 w-3" aria-hidden="true" />
                      Best price
                    </span>
                  ) : (
                    <Store className="h-4 w-4 text-solution-foreground/30" aria-hidden="true" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center">
          <motion.span
            animate={reduceMotion ? undefined : { scale: [1, 1.05, 1], y: [0, -2, 0] }}
            transition={
              reduceMotion ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
            }
            className="inline-flex items-center gap-1.5 rounded-full bg-solution-foreground px-4 py-2 text-xs font-extrabold text-solution shadow-md sm:text-sm"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add to My List
          </motion.span>
        </div>
      </ScreenCard>
    </div>
  );
}

/* ---------------- 3. Shop ---------------- */

const SHOP_CARDS = [
  { label: "Plan Better", Icon: CalendarCheck },
  { label: "Waste Less", Icon: Trash2 },
  { label: "Shop Smarter", Icon: ShoppingBasket },
] as const;

export function ShopSlide({ reduceMotion }: SlideProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <SlideHeading
        title="Shop Smarter"
        subtitle='Plan meals, reduce waste, and build shopping lists that keep your "food assets" growing week by week.'
      />
      <ScreenCard>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {SHOP_CARDS.map(({ label, Icon }, i) => (
            <motion.div
              key={label}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.1 * i }}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-solution-foreground/15 bg-white px-2 py-3 text-center sm:gap-2 sm:py-4"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-solution/25 text-solution-foreground sm:h-9 sm:w-9">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </span>
              <span className="text-[11px] font-bold leading-tight text-solution-foreground sm:text-xs">
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-4 flex flex-col items-center">
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
            transition={
              reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            }
            className="inline-flex items-center gap-1.5 rounded-full bg-problem px-3 py-1.5 text-[11px] font-extrabold text-problem-foreground shadow-md sm:text-xs"
          >
            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            Build your Food Assets
          </motion.span>
        </div>
      </ScreenCard>
    </div>
  );
}

/* ---------------- 4. Cook ---------------- */

const RECIPE_TAGS = ["3-Ingredients", "Family Favourites", "One Pot", "Takeaways"];

function FlowArrow({ delay = 0, reduceMotion }: { delay?: number; reduceMotion: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      animate={reduceMotion ? undefined : { x: [0, 5, 0] }}
      transition={
        reduceMotion ? undefined : { duration: 1.3, repeat: Infinity, ease: "easeInOut", delay }
      }
      className="rotate-90 text-cta-action sm:rotate-0"
    >
      <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.75} aria-hidden="true" />
    </motion.span>
  );
}

export function CookSlide({ reduceMotion }: SlideProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <SlideHeading
        title="Cook Easy"
        subtitle="Browse quick recipes, kitchen hacks, and ideas that make eating well more convenient."
      />
      <ScreenCard>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <div className="flex max-w-[9rem] flex-wrap items-center justify-center gap-1.5 sm:max-w-[8rem]">
            {RECIPE_TAGS.map((label, i) => (
              <DataPill key={label} label={label} delay={0.08 * i} reduceMotion={reduceMotion} />
            ))}
          </div>

          <FlowArrow reduceMotion={reduceMotion} />

          <div className="relative flex h-20 w-20 items-center justify-center">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 6, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.2 }}
              className="absolute -top-9 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                transition={
                  reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                }
                className="relative flex items-center gap-1 whitespace-nowrap rounded-2xl bg-footer px-3 py-1.5 text-[10px] font-extrabold text-footer-foreground shadow-md sm:text-[11px]"
              >
                <Lightbulb className="h-3.5 w-3.5 text-solution" aria-hidden="true" />
                Quick Tips
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-footer"
                />
              </motion.div>
            </motion.div>

            <PotIllustration
              className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]"
              reduceMotion={reduceMotion}
            />
          </div>

          <FlowArrow delay={0.4} reduceMotion={reduceMotion} />

          <BowlIllustration className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]" />
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
  { label: "Local bakery", top: "22%", left: "26%", Icon: Croissant },
  { label: "Community pantry", top: "58%", left: "16%", Icon: Landmark },
  { label: "Food project", top: "34%", left: "64%", Icon: Leaf },
  { label: "Growing group", top: "70%", left: "58%", Icon: Sparkles },
  { label: "Independent shop", top: "46%", left: "42%", Icon: Store },
] as const;

export function MapSlide({ reduceMotion }: SlideProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
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
          className="relative h-40 overflow-hidden rounded-xl border border-solution-foreground/15 sm:h-44"
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
              className="absolute -translate-x-1/2 -translate-y-full"
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
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-problem text-problem-foreground shadow-md sm:h-7 sm:w-7">
                  <pin.Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <MapPin
                  className="-mt-1 h-3 w-3 text-problem"
                  aria-hidden="true"
                  fill="currentColor"
                />
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

export const FOODXCHANGE_APP_SLIDES = [
  ScanSlide,
  PriceSlide,
  ShopSlide,
  CookSlide,
  MapSlide,
] as const;
