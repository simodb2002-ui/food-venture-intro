import { createFileRoute } from "@tanstack/react-router";
import { ChefHat, ScanLine, UsersRound } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

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
const spring = { type: "spring", stiffness: 500, damping: 38, mass: 0.5 } as const;

function FeatureCarousel() {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["-16%", "16%"]);

  const scrollToCard = (index: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current;
    const card = track?.children.item(index);
    if (!(card instanceof HTMLElement)) return;
    card.scrollIntoView({ behavior, block: "nearest", inline: "center" });
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => scrollToCard(1, "instant"));
    return () => {
      cancelAnimationFrame(frame);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  const select = (nextIndex: number) => {
    const clamped = Math.max(0, Math.min(features.length - 1, nextIndex));
    setActiveIndex(clamped);
    scrollToCard(clamped);
  };

  const updateActiveFromScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    Array.from(track.children).forEach((child, index) => {
      if (!(child instanceof HTMLElement)) return;
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < nearestDistance) {
        nearest = index;
        nearestDistance = distance;
      }
    });
    setActiveIndex(nearest);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") select(activeIndex - 1);
    if (event.key === "ArrowRight") select(activeIndex + 1);
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Future foodXchange features"
      aria-roledescription="carousel"
      className="coming-carousel relative"
      onKeyDown={onKeyDown}
    >
      {/* giant pink parallax background type */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-6 z-0 flex items-start justify-center overflow-hidden select-none"
      >
        <motion.span
          className="inline-block min-w-max px-8 text-center whitespace-nowrap text-[clamp(4rem,13vw,12rem)] font-black uppercase leading-none tracking-normal text-problem/15"
          style={reduce ? {} : { x: marqueeX }}
        >
          {Array.from({ length: 6 })
            .map(() => "COMING\u00A0SOON")
            .join("\u00A0\u00A0\u00A0")}
        </motion.span>
      </div>
      <div
        ref={trackRef}
        className="coming-carousel-stage relative z-10"
        onScroll={() => updateActiveFromScroll()}
      >
        {features.map((feature, index) => {
          const { title, Icon, image, alt, description, bullets } = feature;
          const relative = index - activeIndex;
          const active = relative === 0;

          return (
            <motion.article
              key={title}
              aria-hidden={!active}
              className="coming-carousel-card"
              initial={false}
              animate={{
                scale: active ? 1.05 : 0.9,
                opacity: active ? 1 : 0.55,
              }}
              transition={reduce ? { duration: 0 } : spring}
              style={{ zIndex: active ? 10 : 5 - Math.abs(relative) }}
            >
              <button
                type="button"
                tabIndex={active ? 0 : -1}
                aria-label={active ? `${title} details` : `Show ${title}`}
                className="coming-carousel-card-button"
                onClick={() => {
                  if (!active) select(index);
                }}
              >
                <div className="px-5 py-6 text-left md:px-8 md:py-8">
                  <div className="flex items-center gap-3">
                    <Icon className="size-6 shrink-0 text-problem" aria-hidden="true" />
                    <ScribbleBadge />
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-cta-foreground sm:text-3xl md:text-4xl">
                    {title}
                  </h2>
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
                    <div
                      className="relative overflow-hidden"
                      style={{ borderRadius: blobs[index] }}
                    >
                      <img
                        src={image}
                        alt={alt}
                        width={1200}
                        height={912}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-cta-muted md:text-base">
                    {description}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2.5 text-xs font-medium leading-relaxed md:text-sm"
                      >
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
                </div>
              </button>
            </motion.article>
          );
        })}
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-center">
        <div className="flex gap-2" aria-label={`Feature ${activeIndex + 1} of ${features.length}`}>
          {features.map((feature, index) => (
            <span
              key={feature.title}
              className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ${index === activeIndex ? "w-8 bg-problem" : "w-2.5 bg-cta-muted/30"}`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {features[activeIndex]?.title ?? "Feature"} selected
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
        <Doodle
          kind="star"
          tone="solution"
          className="top-[1500px] right-[4%] size-10"
          delay={0.6}
        />
        <Doodle
          kind="apple"
          tone="solution"
          className="top-[2100px] left-[5%] size-12"
          delay={1.6}
        />
        <Doodle kind="spiral" className="top-[2500px] right-[6%] size-14" delay={2.4} />
      </div>

      <main className="relative mx-auto w-[min(1160px,calc(100%-40px))] pb-24">
        <motion.section
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          className="mx-auto max-w-3xl pt-20 pb-24 text-center md:pt-28"
        >
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            More of foodXchange
            <br />
            is on the{" "}
            <span className="relative inline-block">
              way
              <ScribbleUnderline className="-bottom-3 h-5" />
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-cta-muted">
            Discover what&apos;s coming next with an early preview of three future foodXchange
            features. Explore them first on the web, then continue{"\u00a0"}
            <br />
            the experience when the full
            foodXchange app launches.
          </p>
        </motion.section>

        <FeatureCarousel />

        <motion.section
          initial={reduce ? false : { opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          className="relative mt-16 overflow-hidden rounded-3xl bg-footer px-6 py-20 text-center text-footer-foreground md:px-16 md:py-28"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-solution" aria-hidden="true" />
          <Doodle kind="star" tone="solution" className="top-10 left-10 size-14" />
          <Doodle kind="spiral" className="right-12 bottom-10 size-16" delay={1} />
          <h2 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Want to follow the{" "}
            <span className="relative inline-block">
              launch?
              <ScribbleUnderline className="-bottom-3 h-5 md:h-6" />
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-footer-muted md:text-xl">
            Join the Society or sign up for news, and you&apos;ll be among the first to hear when
            these next features become available.
          </p>
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-solution px-10 text-base font-semibold text-solution-foreground hover:bg-solution/90 md:px-12 md:text-lg"
            >
              <a href="/#membership">Explore membership</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-footer-foreground/30 bg-transparent px-10 text-base font-semibold text-footer-foreground hover:bg-footer-foreground/10 hover:text-footer-foreground md:px-12 md:text-lg"
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
