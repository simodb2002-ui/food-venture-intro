import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChefHat, ScanLine, Sparkles, UsersRound } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type KeyboardEvent, type ReactNode } from "react";

import communityImage from "@/assets/coming-soon/community.jpg";
import cookImage from "@/assets/coming-soon/cook.jpg";
import foodX100Image from "@/assets/coming-soon/foodx100.jpg";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "../coming-soon.css";

export const Route = createFileRoute("/coming-soon")({
  head: () => ({
    meta: [
      { title: "Coming Soon | Food Investors Society" },
      {
        name: "description",
        content: "Preview FoodX100, FoodXCommunity and Cook — three future foodXchange features.",
      },
      { property: "og:title", content: "More of foodXchange is on the way" },
      {
        property: "og:description",
        content: "Explore an early preview of three future foodXchange features.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComingSoonPage,
});

const blobs = [
  "58% 42% 63% 37% / 44% 58% 42% 56%",
  "41% 59% 38% 62% / 60% 38% 62% 40%",
  "63% 37% 49% 51% / 38% 55% 45% 62%",
];

const features = [
  {
    title: "FoodX100",
    Icon: ScanLine,
    image: foodX100Image,
    alt: "Man scanning a grocery product with his smartphone",
    description:
      "A miniature version of the foodXchange app database, designed as a simple trial so users can explore 100 products before the full experience launches.",
    bullets: [
      "Try a curated 100-product version of the wider app database",
      "Compare nutrition, ingredients, additives, and price",
      "See how foodXchange will make product choices clearer at a glance",
    ],
  },
  {
    title: "FoodXCommunity",
    Icon: UsersRound,
    image: communityImage,
    alt: "Outdoor local produce stall",
    reverse: true,
    description:
      "A local directory and discovery space for independent food businesses, community food projects, and neighbourhood initiatives working towards a better food system.",
    bullets: [
      "Discover local food projects and independent businesses",
      "Support community-rooted food activity in your area",
      "Make it easier to connect with good food near you",
    ],
  },
  {
    title: "Cook",
    Icon: ChefHat,
    image: cookImage,
    alt: "Cooking a colourful meal in a pan on a stove",
    description:
      "A practical space for recipes, cooking guidance, and kitchen shortcuts aimed at making everyday good food easier, faster, and more affordable.",
    bullets: [
      "Quick recipe ideas and meal inspiration",
      "Simple hacks to make cooking feel less overwhelming",
      "Practical support for building confidence in the kitchen",
    ],
  },
];

/* ---------- doodles ---------- */
const doodles: Record<string, ReactNode> = {
  apple: (
    <>
      <path d="M24 14c-8-6-18 0-16 12 2 12 10 18 16 14 6 4 14-2 16-14 2-12-8-18-16-12z" />
      <path d="M24 14c0-5 2-8 6-10M24 10c-3-4-7-4-9-2" />
    </>
  ),
  carrot: (
    <>
      <path d="M10 38 34 14l4 4-24 24z" />
      <path d="M36 12c2-6 6-8 8-8M36 12c4-2 8-1 10 1M36 12c0-4-2-8-5-9" />
      <path d="M18 30l3 3M24 24l3 3" />
    </>
  ),
  hat: (
    <>
      <path d="M14 30c-6 0-9-6-6-11 3-5 9-4 10-2 1-6 11-8 14-2 3-3 10-1 10 5 0 5-4 9-8 10" />
      <path d="M16 30h18v8H16z" />
    </>
  ),
  star: <path d="M24 6l4 13 13 1-10 8 4 13-11-8-11 8 4-13-10-8 13-1z" />,
  spiral: <path d="M24 24c0-2 2-3 4-2s3 5 0 7-8 1-9-4 3-10 9-10 11 5 10 12-7 12-14 11" />,
};

function Doodle({
  kind,
  className,
  delay = 0,
  tone = "problem",
}: {
  kind: keyof typeof doodles;
  className: string;
  delay?: number;
  tone?: "problem" | "solution";
}) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 48 48"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`pointer-events-none absolute ${tone === "problem" ? "stroke-problem" : "stroke-solution"} ${className}`}
      animate={reduce ? {} : { y: [0, -12, 0], rotate: [-6, 6, -6] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {doodles[kind]}
    </motion.svg>
  );
}

/* ---------- scribbles ---------- */
function ScribbleUnderline({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 24"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 w-full stroke-solution ${className}`}
    >
      <motion.path
        d="M4 14c40-8 90-10 190-6M12 20c50-6 110-7 170-3"
        strokeWidth={5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, delay: 0.5, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

function ScribbleBadge() {
  return (
    <span className="relative inline-flex px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-problem">
      <svg
        viewBox="0 0 140 40"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full stroke-problem"
      >
        <path
          d="M18 5c35-3 80-4 108 2 12 3 12 25-2 28-35 5-80 5-106 0C3 31 2 9 18 5z"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
      <span className="relative">Coming soon</span>
    </span>
  );
}

/* ---------- interactive feature carousel ---------- */
const spring = { type: "spring", stiffness: 180, damping: 24, mass: 0.8 } as const;

function FeatureCarousel() {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(1);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const select = (nextIndex: number) => {
    const clamped = Math.max(0, Math.min(features.length - 1, nextIndex));
    setExpandedIndex(null);
    setActiveIndex(clamped);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") select(activeIndex - 1);
    if (event.key === "ArrowRight") select(activeIndex + 1);
  };

  return (
    <section
      aria-label="Future foodXchange features"
      aria-roledescription="carousel"
      className="coming-carousel"
      onKeyDown={onKeyDown}
    >
      <motion.div
        className="coming-carousel-stage"
        drag={reduce ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x < -45 || info.velocity.x < -450) select(activeIndex + 1);
          if (info.offset.x > 45 || info.velocity.x > 450) select(activeIndex - 1);
        }}
      >
        {features.map((feature, index) => {
          const { title, Icon, image, alt, description, bullets } = feature;
          const relative = index - activeIndex;
          const active = relative === 0;
          const expanded = expandedIndex === index;

          return (
            <motion.article
              key={title}
              aria-hidden={!active}
              className={`coming-carousel-card ${expanded ? "is-expanded" : "is-collapsed"}`}
              initial={false}
              animate={{
                x: `${relative * 82}%`,
                scale: active ? 1.1 : 0.85,
                opacity: Math.abs(relative) > 1 ? 0 : active ? 1 : 0.6,
                rotateY: active ? 0 : relative < 0 ? 14 : -14,
              }}
              transition={reduce ? { duration: 0 } : spring}
              style={{ zIndex: active ? 10 : 5 - Math.abs(relative) }}
            >
              <button
                type="button"
                tabIndex={active ? 0 : -1}
                aria-expanded={expanded}
                aria-label={active ? `${expanded ? "Hide" : "Reveal"} ${title}` : `Show ${title}`}
                className="coming-carousel-card-button"
                onClick={() => {
                  if (!active) {
                    select(index);
                    return;
                  }
                  setExpandedIndex(expanded ? null : index);
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {!expanded ? (
                    <motion.div
                      key="collapsed"
                      className="flex h-full flex-col items-center justify-center px-6 text-center text-problem-foreground"
                      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Icon className="size-12 md:size-16" strokeWidth={1.8} aria-hidden="true" />
                      <h2 className="mt-5 text-3xl font-bold md:text-5xl">{title}</h2>
                      {active && (
                        <motion.span
                          className="mt-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                          animate={reduce ? {} : { y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          Click to reveal <Sparkles className="size-4" aria-hidden="true" />
                        </motion.span>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="expanded"
                      className="h-full overflow-y-auto px-5 py-6 text-left md:px-8 md:py-8"
                      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.32, delay: 0.08 }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="size-6 shrink-0 text-problem" aria-hidden="true" />
                        <ScribbleBadge />
                      </div>
                      <h2 className="mt-4 text-3xl font-bold text-cta-foreground md:text-4xl">{title}</h2>
                      <div className="relative mt-5">
                        <svg
                          viewBox="0 0 400 320"
                          fill="none"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                          className="absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)] stroke-solution"
                        >
                          <path
                            d="M60 20c90-22 230-18 300 20 44 30 40 170 10 230-40 60-230 50-300 20C10 260 0 150 14 90 22 50 36 28 60 20z"
                            strokeWidth={3}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="relative overflow-hidden" style={{ borderRadius: blobs[index] }}>
                          <img
                            src={image}
                            alt={alt}
                            width={1200}
                            height={912}
                            className="aspect-[16/7] w-full object-cover"
                          />
                        </div>
                      </div>
                      <p className="mt-5 text-sm leading-relaxed text-cta-muted md:text-base">{description}</p>
                      <ul className="mt-4 space-y-2.5">
                        {bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2.5 text-xs font-medium leading-relaxed md:text-sm">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              aria-hidden="true"
                              className="mt-0.5 size-4 shrink-0 stroke-problem"
                            >
                              <path
                                d="M3 13c3 2 5 5 6 7 3-7 7-12 12-16"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.article>
          );
        })}
      </motion.div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <Button
          type="button"
          size="icon"
          variant="outline"
          disabled={activeIndex === 0}
          onClick={() => select(activeIndex - 1)}
          aria-label="Previous feature"
          className="size-12 rounded-full border-problem text-problem hover:bg-problem hover:text-problem-foreground disabled:opacity-30"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </Button>
        <div className="flex gap-2" aria-label={`Feature ${activeIndex + 1} of ${features.length}`}>
          {features.map((feature, index) => (
            <button
              key={feature.title}
              type="button"
              className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ${index === activeIndex ? "w-8 bg-problem" : "w-2.5 bg-cta-muted/30"}`}
              onClick={() => select(index)}
              aria-label={`Show ${feature.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <Button
          type="button"
          size="icon"
          variant="outline"
          disabled={activeIndex === features.length - 1}
          onClick={() => select(activeIndex + 1)}
          aria-label="Next feature"
          className="size-12 rounded-full border-problem text-problem hover:bg-problem hover:text-problem-foreground disabled:opacity-30"
        >
          <ArrowRight className="size-5" aria-hidden="true" />
        </Button>
      </div>
      <p className="sr-only" aria-live="polite">
        {features[activeIndex].title} selected
      </p>
    </section>
  );
}

function ComingSoonPage() {
  const reduce = useReducedMotion();
  return (
    <div className="coming-page relative min-h-dvh overflow-x-clip bg-cta text-cta-foreground">
      <SiteHeader active="coming-soon" className="sticky top-0" />

      {/* floating background doodles */}
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
        <Doodle kind="apple" className="top-40 left-[6%] size-14" />
        <Doodle kind="carrot" tone="solution" className="top-72 right-[8%] size-16" delay={1} />
        <Doodle kind="spiral" className="top-[900px] left-[3%] size-12" delay={2} />
        <Doodle kind="star" tone="solution" className="top-[1500px] right-[4%] size-10" delay={0.6} />
        <Doodle kind="apple" tone="solution" className="top-[2100px] left-[5%] size-12" delay={1.6} />
        <Doodle kind="spiral" className="top-[2500px] right-[6%] size-14" delay={2.4} />
      </div>

      <main className="relative mx-auto w-[min(1160px,calc(100%-40px))] pb-24">
        <motion.section
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          className="mx-auto max-w-3xl pt-20 pb-24 text-center md:pt-28"
        >
          <ScribbleBadge />
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            More of foodXchange is on the{" "}
            <span className="relative inline-block">
              way
              <ScribbleUnderline className="-bottom-3 h-5" />
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-cta-muted">
            Discover what&apos;s coming next with an early preview of three future foodXchange
            features. Explore them first on the web, then continue the experience when the full
            foodXchange app launches.
          </p>
        </motion.section>

        <FeatureCarousel />

        <motion.section
          initial={reduce ? false : { opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          className="relative mt-32 overflow-hidden rounded-3xl bg-footer px-6 py-16 text-center text-footer-foreground md:px-12 md:py-20"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-solution" aria-hidden="true" />
          <Doodle kind="star" tone="solution" className="top-8 left-8 size-10" />
          <Doodle kind="spiral" className="right-10 bottom-8 size-12" delay={1} />
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Want to follow the{" "}
            <span className="relative inline-block">
              launch?
              <ScribbleUnderline className="-bottom-3 h-4" />
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-footer-muted">
            Join the Society or sign up for news, and you&apos;ll be among the first to hear when
            these next features become available.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-solution px-8 font-semibold text-solution-foreground hover:bg-solution/90"
            >
              <a href="/#membership">Explore membership</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-footer-foreground/30 bg-transparent px-8 font-semibold text-footer-foreground hover:bg-footer-foreground/10 hover:text-footer-foreground"
            >
              <a href="/about#newsletter">Sign up for news</a>
            </Button>
          </div>
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  );
}
