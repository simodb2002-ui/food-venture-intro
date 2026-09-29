import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  ChefHat,
  Check,
  CookingPot,
  ListChecks,
  MapPin,
  MessagesSquare,
  RefreshCcw,
  Scale,
  ScanLine,
  Search,
  ShoppingBasket,
  ShoppingBag,
  Trash2,
  UsersRound,
  UtensilsCrossed,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useState, type ReactNode } from "react";

import phoneFoodHero from "@/assets/phone-food-hero.jpg";
import { FoodXchangeMark } from "@/components/foodxchange-mark";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "../app.css";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "The App | Food Investors Society" },
      {
        name: "description",
        content:
          "foodXchange — your go-to app for better everyday eating. Scan, plan, cook and connect with your local food community.",
      },
      { property: "og:title", content: "foodXchange — The App" },
      {
        property: "og:description",
        content:
          "Your go-to app for better everyday eating. Make good food choices with less effort.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AppPage,
});

/* ---------------- data ---------------- */

const marqueeItems = [
  "FoodX",
  "My List",
  "Meal Plans",
  "Recipes & Cooking Hacks",
  "My Spaces & Items",
  "My FoodX Community",
];

const heroIcons: { Icon: LucideIcon; label: string }[] = [
  { Icon: ScanLine, label: "Scan" },
  { Icon: ShoppingBasket, label: "Basket" },
  { Icon: UtensilsCrossed, label: "Cutlery" },
  { Icon: ChefHat, label: "Chef hat" },
  { Icon: ShoppingBag, label: "Shopping bag" },
  { Icon: UsersRound, label: "Community" },
];

const problemCards: {
  Icon: LucideIcon;
  problem: string;
  solution: string;
}[] = [
  {
    Icon: Search,
    problem: "It's hard to decode labels and avoid marketing traps",
    solution: "Use simple scoring to show what's in your food and reveal hidden influences",
  },
  {
    Icon: Scale,
    problem: "Prices keep steering me toward the cheapest, not the best",
    solution: "Compare prices and find better budget-friendly options",
  },
  {
    Icon: CookingPot,
    problem: "Convenience wins when life gets busy and overwhelming",
    solution: "Turn to quick recipes and cooking shortcuts for real-food solutions",
  },
  {
    Icon: RefreshCcw,
    problem: "I don't want to give up the favourite foods I enjoy",
    solution: "Swap smartly to keep the flavours and feel-good foods you love",
  },
  {
    Icon: MessagesSquare,
    problem: "Eating feels like a chore instead of something shared and enjoyable",
    solution: "Find community, inspiration, and shared experiences that make food joyful",
  },
];

const slides: {
  title: string;
  Icon: LucideIcon;
  headline: string;
  bullets: string[];
}[] = [
  {
    title: "FoodX",
    Icon: ScanLine,
    headline: "Scan and discover the best-value,\u00a0\nleast processed foods",
    bullets: [
      "Find the best-priced minimally processed foods",
      "Use small swaps for less processed choices",
      "Filter results by your food preferences",
      "Get notified when favourites go on offer",
      "View detailed product info with one tap",
      "Quickly add items to your shopping list or meal plan",
    ],
  },
  {
    title: "My List",
    Icon: ShoppingBasket,
    headline: "Turn every shopping list into lasting value for your health and wallet",
    bullets: [
      "Create and manage shopping lists with ease",
      "Automatically grouped by cheapest retailer",
      "Sort by store or product category",
      "Check off items as you shop",
      "Share lists and sync offline",
    ],
  },
  {
    title: "Meal Plans",
    Icon: UtensilsCrossed,
    headline: "Build your health portfolio\u00a0\nthrough simple, homemade cooking",
    bullets: [
      "Adopt a preset meal plan or create your own",
      "Plan meals weeks ahead with ease",
      "Convert plans into shopping lists instantly",
      "Share meal plans effortlessly",
      "Access offline and sync when back online",
    ],
  },
  {
    title: "Recipes & Cooking Hacks",
    Icon: ChefHat,
    headline: "Create better meals and lasting health from everyday ingredients",
    bullets: [
      "Find homemade alternatives to ultra-processed foods",
      "Filter recipes by your available ingredients",
      "View details and add recipes directly to meal plans",
      "Watch cook-along sessions",
      "Import your own recipes automatically",
    ],
  },
  {
    title: "My Spaces & Items",
    Icon: ShoppingBag,
    headline: "Track, update and organise your pantry to protect food investments",
    bullets: [
      "Create and manage pantry spaces",
      "View all items within each space",
      "Filter items by expiry status",
      "Add, edit, or update pantry items easily",
      "Auto-update pantry when items are checked off",
    ],
  },
  {
    title: "Waste",
    Icon: Trash2,
    headline: "Track expiry and waste\u00a0\nto make groceries last longer",
    bullets: [
      "View all expiring items in one place",
      "Track weekly and yearly food wastage with visual charts",
      "See the total monetary value of wasted items",
      "Identify the top contributors to waste",
    ],
  },
  {
    title: "My Neighbourhood & Groups",
    Icon: MapPin,
    headline: "Connect with your local food neighbourhood and growing community",
    bullets: [
      "Find local food activities and independent outlets",
      "See upcoming food events on the map",
      "Browse your groups, trending and featured groups",
      "View group details, join instantly, and share ideas",
    ],
  },
  {
    title: "My Groups",
    Icon: UsersRound,
    headline: "Build a community that grows through shared ideas and healthier living",
    bullets: [
      "Support a like-minded growing community",
      "Browse your groups, trending and featured groups",
      "View group details and join instantly",
      "Create new topics and share your ideas",
    ],
  },
];

/* ---------------- shared bits ---------------- */

function PlatformBadges({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span
        className={cn(
          "rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-wide",
          dark
            ? "border-footer-foreground/40 text-footer-foreground"
            : "border-cta-foreground/50 text-cta-foreground",
        )}
      >
        Planned for iOS
      </span>
      <span
        className={cn(
          "rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-wide",
          dark
            ? "border-footer-foreground/40 text-footer-foreground"
            : "border-cta-foreground/50 text-cta-foreground",
        )}
      >
        Planned for Android
      </span>
      <Button
        asChild
        className="rounded-full bg-problem px-5 py-2 text-xs font-extrabold uppercase tracking-wide text-problem-foreground hover:bg-problem/90"
      >
        <Link to="/join">
          <Bell className="h-4 w-4" /> Notify me
        </Link>
      </Button>
    </div>
  );
}

/** Traced from the reference screenshot's own pink/orange coils (pixel-masked
 * and skeletonized per squiggle, then chained end-to-end), not hand-drawn. */
const PHONE_SCRIBBLES = {
  hero: {
    viewBox: "0 0 600 570",
    scalePercent: 340,
    path: "M 326.0 109.0 C 328.2 109.8 334.8 113.0 339.0 114.0 C 343.2 115.0 346.8 114.7 351.0 115.0 C 355.2 115.3 359.8 115.3 364.0 116.0 C 368.2 116.7 371.8 117.7 376.0 119.0 C 380.2 120.3 385.7 121.2 389.0 124.0 C 392.3 126.8 396.0 131.8 396.0 136.0 C 396.0 140.2 392.2 145.7 389.0 149.0 C 385.8 152.3 381.2 153.8 377.0 156.0 C 372.8 158.2 368.2 160.2 364.0 162.0 C 359.8 163.8 355.2 164.3 352.0 167.0 C 348.8 169.7 346.2 176.2 345.0 178.0 L 130.0 186.0 C 128.8 185.5 125.2 183.3 123.0 183.0 C 120.8 182.7 119.0 183.2 117.0 184.0 C 115.0 184.8 112.7 186.3 111.0 188.0 C 109.3 189.7 108.0 192.0 107.0 194.0 C 106.0 196.0 105.0 198.0 105.0 200.0 C 105.0 202.0 105.7 204.7 107.0 206.0 C 108.3 207.3 110.8 207.7 113.0 208.0 C 115.2 208.3 117.8 208.0 120.0 208.0 C 122.2 208.0 124.0 207.7 126.0 208.0 C 128.0 208.3 130.0 209.2 132.0 210.0 C 134.0 210.8 137.0 212.5 138.0 213.0 L 145.0 235.0 C 143.3 237.3 139.3 245.7 135.0 249.0 C 130.7 252.3 124.5 252.8 119.0 255.0 C 113.5 257.2 107.5 259.5 102.0 262.0 C 96.5 264.5 90.7 266.3 86.0 270.0 C 81.3 273.7 74.7 279.3 74.0 284.0 C 73.3 288.7 78.0 295.3 82.0 298.0 C 86.0 300.7 92.7 299.7 98.0 300.0 C 103.3 300.3 108.5 300.3 114.0 300.0 C 119.5 299.7 125.5 299.0 131.0 298.0 C 136.5 297.0 141.7 294.3 147.0 294.0 C 152.3 293.7 160.3 295.7 163.0 296.0 L 384.0 295.0 C 387.5 293.0 397.5 286.3 405.0 283.0 C 412.5 279.7 421.0 277.7 429.0 275.0 C 437.0 272.3 445.0 270.0 453.0 267.0 C 461.0 264.0 469.7 261.7 477.0 257.0 C 484.3 252.3 496.7 244.5 497.0 239.0 C 497.3 233.5 486.0 227.0 479.0 224.0 C 472.0 221.0 463.0 221.7 455.0 221.0 C 447.0 220.3 439.0 219.8 431.0 220.0 C 423.0 220.2 415.0 221.2 407.0 222.0 C 399.0 222.8 391.2 225.3 383.0 225.0 C 374.8 224.7 362.2 220.8 358.0 220.0 L 399.0 338.0 C 402.8 338.3 414.5 340.3 422.0 340.0 C 429.5 339.7 436.5 337.3 444.0 336.0 C 451.5 334.7 459.5 332.8 467.0 332.0 C 474.5 331.2 481.5 330.8 489.0 331.0 C 496.5 331.2 507.0 329.8 512.0 333.0 C 517.0 336.2 521.5 345.5 519.0 350.0 C 516.5 354.5 504.3 357.2 497.0 360.0 C 489.7 362.8 482.5 365.0 475.0 367.0 C 467.5 369.0 459.5 370.2 452.0 372.0 C 444.5 373.8 437.3 377.7 430.0 378.0 C 422.7 378.3 411.7 374.7 408.0 374.0 L 199.0 401.0 C 195.5 400.7 185.2 398.5 178.0 399.0 C 170.8 399.5 163.3 402.7 156.0 404.0 C 148.7 405.3 141.2 406.2 134.0 407.0 C 126.8 407.8 120.2 408.7 113.0 409.0 C 105.8 409.3 97.0 411.0 91.0 409.0 C 85.0 407.0 76.5 402.2 77.0 397.0 C 77.5 391.8 87.7 383.0 94.0 378.0 C 100.3 373.0 107.8 370.3 115.0 367.0 C 122.2 363.7 129.7 360.7 137.0 358.0 C 144.3 355.3 152.3 354.2 159.0 351.0 C 165.7 347.8 174.0 341.0 177.0 339.0 L 210.0 432.0 C 203.2 436.2 182.3 446.8 169.0 457.0 C 155.7 467.2 130.0 485.2 130.0 493.0 C 130.0 500.8 154.8 504.0 169.0 504.0 C 183.2 504.0 199.7 498.3 215.0 493.0 C 230.3 487.7 245.8 479.8 261.0 472.0 C 276.2 464.2 290.8 452.8 306.0 446.0 C 321.2 439.2 336.7 434.0 352.0 431.0 C 367.3 428.0 385.2 424.2 398.0 428.0 C 410.8 431.8 431.3 447.5 429.0 454.0 C 426.7 460.5 399.2 464.2 384.0 467.0 C 368.8 469.8 345.7 470.3 338.0 471.0",
  },
  feature: {
    viewBox: "0 0 480 450",
    scalePercent: 320,
    path: "M 114.0 127.0 C 111.0 128.5 102.0 133.8 96.0 136.0 C 90.0 138.2 84.0 138.5 78.0 140.0 C 72.0 141.5 66.0 142.3 60.0 145.0 C 54.0 147.7 45.8 151.2 42.0 156.0 C 38.2 160.8 35.3 168.7 37.0 174.0 C 38.7 179.3 46.5 185.0 52.0 188.0 C 57.5 191.0 64.0 191.0 70.0 192.0 C 76.0 193.0 82.0 193.5 88.0 194.0 C 94.0 194.5 103.0 194.8 106.0 195.0 L 109.0 253.0 C 105.5 254.0 95.0 257.2 88.0 259.0 C 81.0 260.8 73.8 262.2 67.0 264.0 C 60.2 265.8 53.8 266.5 47.0 270.0 C 40.2 273.5 29.2 279.3 26.0 285.0 C 22.8 290.7 24.2 300.0 28.0 304.0 C 31.8 308.0 42.2 307.8 49.0 309.0 C 55.8 310.2 62.2 310.3 69.0 311.0 C 75.8 311.7 83.2 311.7 90.0 313.0 C 96.8 314.3 106.7 318.0 110.0 319.0 L 116.0 377.0 C 117.0 373.2 114.2 357.7 122.0 354.0 C 129.8 350.3 149.2 353.7 163.0 355.0 C 176.8 356.3 191.2 359.5 205.0 362.0 C 218.8 364.5 232.3 367.3 246.0 370.0 C 259.7 372.7 273.2 375.3 287.0 378.0 C 300.8 380.7 315.2 384.5 329.0 386.0 C 342.8 387.5 364.0 392.7 370.0 387.0 C 376.0 381.3 372.5 361.5 365.0 352.0 C 357.5 342.5 331.7 333.7 325.0 330.0 L 325.0 280.0 C 328.0 281.5 336.7 287.0 343.0 289.0 C 349.3 291.0 356.2 291.7 363.0 292.0 C 369.8 292.3 377.2 292.3 384.0 291.0 C 390.8 289.7 401.0 288.5 404.0 284.0 C 407.0 279.5 405.8 270.3 402.0 264.0 C 398.2 257.7 387.8 251.0 381.0 246.0 C 374.2 241.0 367.7 237.7 361.0 234.0 C 354.3 230.3 347.3 228.0 341.0 224.0 C 334.7 220.0 326.0 212.3 323.0 210.0 L 326.0 157.0 C 327.7 158.2 332.3 162.3 336.0 164.0 C 339.7 165.7 344.0 166.2 348.0 167.0 C 352.0 167.8 356.0 168.8 360.0 169.0 C 364.0 169.2 368.0 168.8 372.0 168.0 C 376.0 167.2 381.2 166.7 384.0 164.0 C 386.8 161.3 388.7 156.0 389.0 152.0 C 389.3 148.0 387.7 144.0 386.0 140.0 C 384.3 136.0 380.5 132.0 379.0 128.0 C 377.5 124.0 377.3 118.0 377.0 116.0",
  },
} as const;

/**
 * Hand-drawn-style coil that wraps around a phone mockup, drawn as a
 * single continuous stroke so it reads as one scribble rather than
 * separate rings.
 */
function PhoneScribble({
  variant,
  className,
}: {
  variant: keyof typeof PHONE_SCRIBBLES;
  className?: string | undefined;
}) {
  const reduce = useReducedMotion();
  const { viewBox, path, scalePercent } = PHONE_SCRIBBLES[variant];
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        className,
      )}
      style={{ width: `${scalePercent}%`, height: `${scalePercent}%` }}
      fill="none"
    >
      <motion.path
        d={path}
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: reduce ? 0 : 1.4, ease: "easeInOut" }}
        style={reduce ? { pathLength: 1, opacity: 1 } : undefined}
      />
    </svg>
  );
}

function PhoneMockup({
  Icon,
  label,
  flat = false,
  iconContent,
  labelContent,
  hidePlaceholders = false,
  screenContent,
  scribbleVariant,
  scribbleClassName,
}: {
  Icon?: LucideIcon;
  label?: string;
  flat?: boolean;
  iconContent?: ReactNode;
  labelContent?: ReactNode;
  hidePlaceholders?: boolean;
  screenContent?: ReactNode;
  scribbleVariant?: keyof typeof PHONE_SCRIBBLES;
  scribbleClassName?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        "relative mx-auto w-56 sm:w-64",
        flat ? "app-phone-float-flat" : "app-phone-float",
      )}
    >
      {scribbleVariant && <PhoneScribble variant={scribbleVariant} className={scribbleClassName} />}
      <div className="relative z-10 rounded-[2.6rem] border-[10px] border-footer bg-footer shadow-[0_70px_120px_-15px_rgba(0,0,0,0.55)]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.9rem] bg-card">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-footer" />
          {screenContent ?? (
            <>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(38,38,38,0.35) 0%, rgba(38,38,38,0.268) 2.5%, rgba(38,38,38,0.197) 5%, rgba(38,38,38,0.137) 7.5%, rgba(38,38,38,0.088) 10%, rgba(38,38,38,0.049) 12.5%, rgba(38,38,38,0.022) 15%, rgba(38,38,38,0.005) 17.5%, rgba(38,38,38,0) 20%, rgba(38,38,38,0) 80%, rgba(38,38,38,0.005) 82.5%, rgba(38,38,38,0.022) 85%, rgba(38,38,38,0.049) 87.5%, rgba(38,38,38,0.088) 90%, rgba(38,38,38,0.137) 92.5%, rgba(38,38,38,0.197) 95%, rgba(38,38,38,0.268) 97.5%, rgba(38,38,38,0.35) 100%)",
                }}
              />
              <div className="relative flex h-full flex-col items-center justify-center gap-4 px-6">
                {iconContent ?? (
                  <motion.span
                    key={label}
                    initial={{ scale: 1 }}
                    animate={{ scale: reduce ? 1 : [1, 1.22, 1] }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-solution/25 text-solution-foreground"
                  >
                    {Icon && <Icon className="h-8 w-8" />}
                  </motion.span>
                )}
                {labelContent ?? (
                  <p className="text-center text-sm font-extrabold uppercase tracking-wide text-foreground">
                    {label}
                  </p>
                )}
                {!hidePlaceholders && (
                  <>
                    <div className="w-full space-y-2">
                      <div className="h-2.5 w-full rounded-full bg-muted" />
                      <div className="h-2.5 w-4/5 rounded-full bg-muted" />
                      <div className="h-2.5 w-3/5 rounded-full bg-muted" />
                    </div>
                    <div className="mt-2 grid w-full grid-cols-2 gap-2">
                      <div className="h-14 rounded-xl bg-solution/30" />
                      <div className="h-14 rounded-xl bg-problem/20" />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- sections ---------------- */

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative text-solution-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-20 pb-10 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pt-28 lg:pb-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -48, y: 16 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Your go-to app for better everyday eating
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium sm:text-xl">
            Make good food choices with less effort.
          </p>

          <div className="mt-8 flex flex-wrap gap-3" aria-label="App features">
            {heroIcons.map(({ Icon, label }, i) => (
              <motion.span
                key={label}
                title={label}
                initial={reduce ? false : { opacity: 0, y: 14, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, delay: 1.2 + i * 0.15, ease: "easeOut" }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-solution-foreground/70 text-solution-foreground"
              >
                <Icon className="h-6 w-6" />
              </motion.span>
            ))}
          </div>

          <div className="mt-8">
            <PlatformBadges />
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: -12 }}
          transition={{ duration: 1.3, delay: 0.3, ease: "easeOut" }}
        >
          <PhoneMockup
            scribbleVariant="hero"
            scribbleClassName="text-problem"
            screenContent={
              <div className="relative h-full w-full">
                <img
                  src={phoneFoodHero}
                  alt=""
                  className="absolute inset-0 h-full w-full scale-[1.3] object-cover"
                  style={{ objectPosition: "52% 50%", transformOrigin: "52% 46%" }}
                />
                <div className="absolute inset-0 bg-black/55" />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.766) 5%, rgba(255,255,255,0.563) 10%, rgba(255,255,255,0.391) 15%, rgba(255,255,255,0.25) 20%, rgba(255,255,255,0.141) 25%, rgba(255,255,255,0.063) 30%, rgba(255,255,255,0.016) 35%, rgba(255,255,255,0) 40%)",
                  }}
                />
                <div className="relative flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
                  <FoodXchangeMark reduce basketColor="#ffffff" className="h-24 w-24" />
                  <p className="font-montserrat text-lg font-semibold text-white">foodXchange</p>
                  <p className="text-xs font-medium leading-snug text-white/80">
                    Connecting Local
                    <br />
                    Kitchens &amp; Growers.
                  </p>
                </div>
              </div>
            }
          />
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <section className="text-solution-foreground pt-10 pb-14">
      <h2 className="px-6 text-center text-2xl font-black uppercase tracking-tight sm:text-3xl">
        Everything you need in one place
      </h2>
      <div className="app-marquee mt-8">
        <div className="app-marquee-track gap-4 pr-4">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="app-marquee-tab rounded-full bg-problem px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-problem-foreground"
            >
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSolutionCards() {
  const [flipped, setFlipped] = useState<number | null>(null);
  return (
    <section className="px-6 py-20 text-cta-foreground sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base font-medium leading-relaxed sm:text-lg">
            foodXchange is the community-owned app built by The Food Investors Society to help
            people cut through today&apos;s profit-driven food landscape.
          </p>
          <p className="mt-4 text-base font-medium leading-relaxed sm:text-lg">
            Let&apos;s be honest, making good food choices is easier said than done.
          </p>
          <h2 className="mt-8 text-2xl font-black uppercase tracking-tight sm:text-3xl">
            Hover over a card to reveal the solution
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {problemCards.map(({ Icon, problem, solution }, index) => {
            const isFlipped = flipped === index;
            return (
              <button
                key={problem}
                type="button"
                data-flipped={isFlipped}
                onClick={() => setFlipped(isFlipped ? null : index)}
                className={cn(
                  "app-flip-card group relative min-h-64 overflow-hidden rounded-3xl p-6 text-left",
                  "border border-border bg-background text-cta-foreground shadow-sm",
                  "hover:bg-[#358f66] hover:text-white hover:border-transparent focus-visible:bg-[#358f66] focus-visible:text-white focus-visible:border-transparent",
                  isFlipped && "bg-[#358f66] text-white border-transparent",
                )}
              >
                <div className="flex h-full flex-col">
                  <Icon className="h-8 w-8" aria-hidden="true" />

                  <div className="relative mt-4 h-[0.9rem]">
                    <span
                      className={cn(
                        "absolute inset-0 text-[0.65rem] font-extrabold uppercase tracking-widest text-cta-muted transition-opacity duration-300",
                        isFlipped
                          ? "opacity-0"
                          : "opacity-100 group-hover:opacity-0 group-focus-visible:opacity-0",
                      )}
                    >
                      Problem
                    </span>
                    <span
                      className={cn(
                        "absolute inset-0 text-[0.65rem] font-extrabold uppercase tracking-widest text-white/70 transition-opacity duration-300",
                        isFlipped
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                      )}
                    >
                      Solution
                    </span>
                  </div>

                  <div className="relative mt-2 grid">
                    <p
                      className={cn(
                        "col-start-1 row-start-1 text-base font-bold leading-snug transition-opacity duration-300",
                        isFlipped
                          ? "opacity-0"
                          : "opacity-100 group-hover:opacity-0 group-focus-visible:opacity-0",
                      )}
                    >
                      {problem}
                    </p>
                    <p
                      className={cn(
                        "col-start-1 row-start-1 text-base font-bold leading-snug transition-opacity duration-300",
                        isFlipped
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                      )}
                    >
                      {solution}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeatureShowcase() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const slide = slides[index]!;

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  return (
    <section className="px-6 pt-40 pb-40 text-problem-foreground sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Explore the app&apos;s features
        </h2>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            className="relative mt-8"
            initial={reduce ? false : { opacity: 0, scale: 0.82 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <PhoneMockup
              Icon={slide.Icon}
              label={slide.title}
              flat
              scribbleVariant="feature"
              scribbleClassName="text-white"
            />
          </motion.div>

          <div>
            {/* All slides stay mounted, stacked in one grid cell, so the
                row's height is always the tallest slide's height and the
                controls below never shift as `index` changes. */}
            <div className="grid">
              {slides.map((s, i) => (
                <motion.div
                  key={s.title}
                  className="col-start-1 row-start-1"
                  aria-hidden={i !== index}
                  style={{ pointerEvents: i === index ? "auto" : "none" }}
                  initial={false}
                  animate={{ opacity: i === index ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-problem-foreground/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-problem-foreground">
                    <s.Icon className="h-4 w-4" /> {s.title}
                  </span>
                  <h3 className="mt-5 text-2xl font-black leading-tight sm:text-3xl">
                    {s.headline}
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {s.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm font-medium text-problem-foreground/85 sm:text-base"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cta-action text-cta-action-foreground">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-start gap-4">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous feature"
                onClick={() => go(index - 1)}
                className="rounded-full border-problem-foreground/40 bg-transparent text-problem-foreground hover:translate-y-0 hover:bg-problem-foreground hover:text-problem"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2" aria-label="Slide position">
                {slides.map((s, dotIndex) => (
                  <button
                    key={s.title}
                    type="button"
                    aria-label={`Go to ${s.title}`}
                    aria-current={dotIndex === index}
                    onClick={() => go(dotIndex)}
                    className={cn(
                      "h-2.5 rounded-full transition-all",
                      dotIndex === index
                        ? "w-7 bg-problem-foreground"
                        : "w-2.5 bg-problem-foreground/30 hover:bg-problem-foreground/60",
                    )}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                aria-label="Next feature"
                onClick={() => go(index + 1)}
                className="rounded-full border-problem-foreground/40 bg-transparent text-problem-foreground hover:translate-y-0 hover:bg-problem-foreground hover:text-problem"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BottomCta() {
  return (
    <section className="px-6 py-20 text-cta-foreground sm:px-8">
      <div className="mx-auto max-w-4xl rounded-[2.5rem] border-2 border-cta-foreground/10 bg-card px-8 py-16 text-center shadow-xl sm:px-14 sm:py-24">
        <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Built by a co-operative.
          <br />
          Owned by you.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-cta-muted sm:text-lg">
          foodXchange is created by The Food Investors Society, a member-owned Community Benefit
          Society. Every feature, tool, and future development is guided by people like you and not
          by corporate agendas.
        </p>
        <h3 className="mt-10 text-xl font-extrabold uppercase tracking-tight text-problem sm:text-2xl">
          Join the Society for early access
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-cta-muted">
          You can help shape the app by joining the Society and taking part in early trials,
          feedback opportunities, and future member updates.
        </p>
        <Button
          asChild
          className="app-tab-green mt-8 rounded-full px-8 py-6 text-sm font-extrabold uppercase tracking-wide hover:brightness-95"
        >
          <Link to="/join">Get early access</Link>
        </Button>
        <div className="mt-10 flex justify-center">
          <PlatformBadges />
        </div>
      </div>
    </section>
  );
}

/* ---------------- page ---------------- */

function AppPage() {
  return (
    <div className="app-page min-h-screen">
      <SiteHeader active="app" className="sticky top-0" />
      <main>
        <Hero />
        <Marquee />
        <ProblemSolutionCards />
        <FeatureShowcase />
        <BottomCta />
      </main>
      <SiteFooter />
    </div>
  );
}
