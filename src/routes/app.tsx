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
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

function PhoneMockup({
  Icon,
  label,
  flat = false,
  iconContent,
  labelContent,
  hidePlaceholders = false,
  screenContent,
}: {
  Icon?: LucideIcon;
  label?: string;
  flat?: boolean;
  iconContent?: ReactNode;
  labelContent?: ReactNode;
  hidePlaceholders?: boolean;
  screenContent?: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        "relative mx-auto w-56 sm:w-64",
        flat ? "app-phone-float-flat" : "app-phone-float",
      )}
    >
      <div className="rounded-[2.6rem] border-[10px] border-footer bg-footer shadow-[0_70px_120px_-15px_rgba(0,0,0,0.55)]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.9rem] bg-card">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-footer" />
          {screenContent ?? (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-6">
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
            <PhoneMockup Icon={slide.Icon} label={slide.title} flat />
          </motion.div>

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
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cta-action text-cta-action-foreground">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-start gap-4">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous feature"
                onClick={() => go(index - 1)}
                className="rounded-full border-problem-foreground/40 bg-transparent text-problem-foreground hover:bg-problem-foreground hover:text-problem"
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
                className="rounded-full border-problem-foreground/40 bg-transparent text-problem-foreground hover:bg-problem-foreground hover:text-problem"
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
