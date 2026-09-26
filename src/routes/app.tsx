import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  ChefHat,
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
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useState } from "react";

import foodXchangeLockup from "@/assets/foodxchange-lockup.png.asset.json";
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
    solution:
      "Use simple scoring to show what's in your food and reveal hidden influences",
  },
  {
    Icon: Scale,
    problem: "Prices keep steering me toward the cheapest, not the best",
    solution: "Compare prices and find better budget-friendly options",
  },
  {
    Icon: CookingPot,
    problem: "Convenience wins when life gets busy and overwhelming",
    solution:
      "Turn to quick recipes and cooking shortcuts for real-food solutions",
  },
  {
    Icon: RefreshCcw,
    problem: "I don't want to give up the favourite foods I enjoy",
    solution:
      "Swap smartly to keep the flavours and feel-good foods you love",
  },
  {
    Icon: MessagesSquare,
    problem: "Eating feels like a chore instead of something shared and enjoyable",
    solution:
      "Find community, inspiration, and shared experiences that make food joyful",
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
    headline: "Scan and discover the best-value, least processed foods",
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
    headline:
      "Turn every shopping list into lasting value for your health and wallet",
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
    headline: "Build your health portfolio through simple, homemade cooking",
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
    headline:
      "Track, update and organise your pantry to protect food investments",
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
    headline: "Track expiry and waste to make groceries last longer",
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
      <Button asChild className="rounded-full bg-problem px-5 py-2 text-xs font-extrabold uppercase tracking-wide text-problem-foreground hover:bg-problem/90">
        <Link to="/join">
          <Bell className="h-4 w-4" /> Notify me
        </Link>
      </Button>
    </div>
  );
}

function PhoneMockup({ Icon, label }: { Icon: LucideIcon; label: string }) {
  return (
    <div className="app-phone-float relative mx-auto w-56 sm:w-64">
      <div className="rounded-[2.6rem] border-[10px] border-footer bg-footer shadow-[0_35px_60px_-15px_rgba(0,0,0,0.45)]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.9rem] bg-card">
          <div className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-footer" />
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-solution/25 text-solution-foreground">
              <Icon className="h-8 w-8" />
            </span>
            <p className="text-center text-sm font-extrabold uppercase tracking-wide text-foreground">
              {label}
            </p>
            <div className="w-full space-y-2">
              <div className="h-2.5 w-full rounded-full bg-muted" />
              <div className="h-2.5 w-4/5 rounded-full bg-muted" />
              <div className="h-2.5 w-3/5 rounded-full bg-muted" />
            </div>
            <div className="mt-2 grid w-full grid-cols-2 gap-2">
              <div className="h-14 rounded-xl bg-solution/30" />
              <div className="h-14 rounded-xl bg-problem/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- sections ---------------- */

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-solution text-solution-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src={foodXchangeLockup.url}
            alt="foodXchange"
            className="h-10 w-auto mix-blend-multiply sm:h-12"
          />
          <h1 className="mt-6 text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Your go-to app for better everyday eating
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium sm:text-xl">
            Make good food choices with less effort.
          </p>

          <div className="mt-8 flex flex-wrap gap-3" aria-label="App features">
            {heroIcons.map(({ Icon, label }) => (
              <span
                key={label}
                title={label}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-solution-foreground/70 text-solution-foreground"
              >
                <Icon className="h-6 w-6" />
              </span>
            ))}
          </div>

          <div className="mt-8">
            <PlatformBadges />
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <PhoneMockup Icon={ScanLine} label="foodXchange" />
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <section className="bg-footer py-14 text-footer-foreground">
      <h2 className="px-6 text-center text-2xl font-black uppercase tracking-tight sm:text-3xl">
        Everything you need in one place
      </h2>
      <div className="app-marquee mt-8">
        <div className="app-marquee-track gap-4 pr-4">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className={cn(
                "app-marquee-tab rounded-lg px-6 py-3 text-sm font-extrabold uppercase tracking-wide",
                index % 2 === 0
                  ? "bg-solution text-solution-foreground"
                  : "bg-problem text-problem-foreground",
              )}
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
    <section className="bg-cta px-6 py-20 text-cta-foreground sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base font-medium leading-relaxed sm:text-lg">
            foodXchange is the community-owned app built by The Food Investors
            Society to help people cut through today&apos;s profit-driven food
            landscape.
          </p>
          <p className="mt-4 text-base font-medium leading-relaxed sm:text-lg">
            Let&apos;s be honest, making good food choices is easier said than
            done.
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
                  "bg-footer text-footer-foreground",
                  "hover:bg-solution hover:text-solution-foreground focus-visible:bg-solution focus-visible:text-solution-foreground",
                  isFlipped && "bg-solution text-solution-foreground",
                )}
              >
                <div className="app-flip-face flex h-full flex-col group-hover:opacity-0 group-focus-visible:opacity-0 group-hover:-translate-y-2"
                  style={isFlipped ? { opacity: 0, transform: "translateY(-8px)" } : undefined}
                >
                  <Icon className="h-8 w-8 text-solution" />
                  <span className="mt-4 text-[0.65rem] font-extrabold uppercase tracking-widest text-footer-muted">
                    Problem
                  </span>
                  <p className="mt-2 text-base font-bold leading-snug">
                    {problem}
                  </p>
                </div>
                <div
                  className="app-flip-face absolute inset-0 flex flex-col p-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
                  style={isFlipped ? { opacity: 1, transform: "translateY(0)" } : undefined}
                >
                  <Icon className="h-8 w-8 text-solution-foreground" />
                  <span className="mt-4 text-[0.65rem] font-extrabold uppercase tracking-widest text-problem">
                    Solution
                  </span>
                  <p className="mt-2 text-base font-bold leading-snug">
                    {solution}
                  </p>
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
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();
  const slide = slides[index]!;

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex((next + slides.length) % slides.length);
    },
    [index],
  );

  return (
    <section className="bg-problem px-6 py-20 text-problem-foreground sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Explore the app&apos;s features
        </h2>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.title}
                initial={reduce ? false : { opacity: 0, x: 40 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40 * direction }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <PhoneMockup Icon={slide.Icon} label={slide.title} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-problem-foreground/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-problem-foreground">
                  <slide.Icon className="h-4 w-4" /> {slide.title}
                </span>
                <h3 className="mt-5 text-2xl font-black leading-tight sm:text-3xl">
                  {slide.headline}
                </h3>
                <ul className="mt-6 space-y-3">
                  {slide.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm font-medium text-problem-foreground/85 sm:text-base">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cta-action text-[0.65rem] font-black text-cta-action-foreground">
                        ✓
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous feature"
                onClick={() => go(index - 1)}
                className="rounded-full border-problem-foreground/40 bg-transparent text-problem-foreground hover:bg-problem-foreground hover:text-problem"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Next feature"
                onClick={() => go(index + 1)}
                className="rounded-full border-problem-foreground/40 bg-transparent text-problem-foreground hover:bg-problem-foreground hover:text-problem"
              >
                <ChevronRight className="h-5 w-5" />
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BottomCta() {
  return (
    <section className="bg-cta px-6 py-20 text-cta-foreground sm:px-8">
      <div className="mx-auto max-w-4xl rounded-[2.5rem] border-2 border-cta-foreground/10 bg-card p-8 text-center shadow-xl sm:p-14">
        <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Built by a co-operative. Owned by you.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-cta-muted sm:text-lg">
          foodXchange is created by The Food Investors Society, a member-owned
          Community Benefit Society. Every feature, tool, and future development
          is guided by people like you and not by corporate agendas.
        </p>
        <h3 className="mt-10 text-xl font-extrabold uppercase tracking-tight text-problem sm:text-2xl">
          Join the Society for early access
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-cta-muted">
          You can help shape the app by joining the Society and taking part in
          early trials, feedback opportunities, and future member updates.
        </p>
        <Button
          asChild
          className="mt-8 rounded-full bg-footer px-8 py-6 text-sm font-extrabold uppercase tracking-wide text-footer-foreground hover:bg-footer/90"
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
    <div className="app-page min-h-screen bg-background">
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
