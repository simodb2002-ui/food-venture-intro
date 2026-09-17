import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import heroImage from "../assets/food-table-hero.jpg";
import brandMark from "../assets/fis-mark.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Food Investors Society | Better Food Choices" },
      {
        name: "description",
        content: "Food Investors Society brings people and capital together to make good food the easier choice.",
      },
      { property: "og:title", content: "Food Investors Society" },
      {
        property: "og:description",
        content: "We make good food the easier choice.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [phase, setPhase] = useState<"brand" | "tagline">("brand");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setPhase("tagline");
      return;
    }

    const timer = window.setTimeout(() => setPhase("tagline"), 2300);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <main className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-background">
      <img
        src={heroImage}
        alt="Friends sharing a table filled with wholesome food"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full scale-105 object-cover blur-[3px]"
      />
      <div className="absolute inset-0 bg-hero-overlay" aria-hidden="true" />

      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <p className="select-none whitespace-nowrap font-display text-[clamp(5rem,18vw,18rem)] font-black uppercase leading-none text-hero-ghost blur-[1px]">
          GOOD FOOD
        </p>
      </div>

      <section className="relative z-10 grid h-72 w-[min(92vw,64rem)] place-items-center text-center">
        <h1 className="sr-only">Food Investors Society</h1>
        <AnimatePresence mode="wait" initial={!reduceMotion}>
          {phase === "brand" ? (
            <motion.div
              key="brand"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute flex flex-col items-center gap-5 sm:flex-row sm:gap-8"
            >
              <img
                src={brandMark}
                alt=""
                width={250}
                height={420}
                className="h-32 w-auto object-contain drop-shadow-2xl sm:h-44"
              />
              <p className="max-w-lg text-left font-display text-4xl font-medium leading-[0.87] text-hero-foreground sm:text-6xl lg:text-7xl">
                food<br />investors<br />society
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="tagline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeOut" }}
              className="absolute max-w-5xl font-display text-[clamp(2.5rem,7vw,6.75rem)] font-bold uppercase leading-[0.95] text-hero-foreground"
            >
              We make good food<br className="hidden sm:block" /> the easier choice.
            </motion.p>
          )}
        </AnimatePresence>
      </section>

      <div className="absolute bottom-7 left-1/2 z-10 h-12 w-px -translate-x-1/2 bg-hero-foreground/55" aria-hidden="true" />
    </main>
  );
}
