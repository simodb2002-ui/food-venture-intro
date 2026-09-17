import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, Users } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import brandMark from "../assets/fis-mark.png";
import { Button } from "../components/ui/button";

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
  const [showPlatform, setShowPlatform] = useState(false);
  const [joined, setJoined] = useState(false);
  const scrollerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setPhase("tagline");
      return;
    }

    const timer = window.setTimeout(() => setPhase("tagline"), 2300);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  const revealPlatform = () => {
    setShowPlatform(true);
    window.setTimeout(() => {
      document.querySelector("#platform")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }, 50);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-center px-5">
        <div className="flex items-center gap-2 font-display text-xs font-bold uppercase text-foreground sm:text-sm">
          <img src={brandMark} alt="" className="h-8 w-auto" />
          Food Investors Society
        </div>
      </header>

      <main ref={scrollerRef} className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-background">
        <section className="relative flex h-screen w-full snap-start items-center justify-center overflow-hidden bg-background px-5">
          <div className="relative grid h-96 w-full max-w-6xl place-items-center text-center">
            <h1 className="sr-only">Food Investors Society</h1>
            <AnimatePresence mode="wait" initial={!reduceMotion}>
              {phase === "brand" ? (
                <motion.div
                  key="brand"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute flex flex-col items-center gap-5 sm:flex-row sm:gap-10"
                >
                  <img src={brandMark} alt="" width={250} height={420} className="h-64 w-auto object-contain sm:h-80" />
                  <p className="text-left font-display text-5xl font-medium leading-[0.87] text-foreground sm:text-7xl">
                    food<br />investors<br />society
                  </p>
                </motion.div>
              ) : (
                <motion.p
                  key="tagline"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeOut" }}
                  className="absolute w-full font-display text-[1.7rem] font-bold uppercase leading-[0.95] text-foreground sm:text-6xl lg:text-7xl"
                >
                  <span className="whitespace-nowrap">We make good food</span><br />the easier choice.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <ArrowDown className="absolute bottom-6 h-5 w-5 text-foreground/55" aria-hidden="true" />
        </section>

        <section className="relative flex h-screen w-full snap-start items-center overflow-hidden bg-problem px-6 pt-16 text-problem-foreground">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.55, once: true }}
              transition={{ duration: reduceMotion ? 0 : 0.6 }}
              className="relative z-20 text-center lg:text-left"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-widest">The problem</p>
              <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.92] sm:text-6xl">Our food environment is broken.</h2>
              <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed sm:text-lg lg:mx-0">
                Quick, cheap, and heavily marketed industrial foods surround us—driving poor health, obesity, and diabetes.
              </p>
              <p className="mt-5 inline-block border-y-2 border-current py-2 text-lg font-extrabold uppercase sm:text-xl">
                It&apos;s not willpower. It&apos;s the system.
              </p>
            </motion.div>

            <div className="relative mx-auto h-56 w-full max-w-md sm:h-72" aria-label="Image placeholders">
              {[
                { label: "processed food", rotate: -7, x: -48, y: 8 },
                { label: "fast food marketing", rotate: 6, x: 48, y: 10 },
                { label: "industrial snacks", rotate: 2, x: 0, y: -8 },
              ].map((card, index) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: 0, y: 60, rotate: 0 }}
                  whileInView={{ opacity: 1, x: card.x, y: card.y, rotate: card.rotate }}
                  viewport={{ amount: 0.5, once: true }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.13, duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }}
                  className="absolute inset-x-12 top-5 flex aspect-[4/3] items-center justify-center border-4 border-problem-foreground bg-placeholder p-8 text-center shadow-2xl"
                >
                  <span className="text-sm font-bold text-placeholder-foreground">(insert image: {card.label})</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex h-screen w-full snap-start items-center bg-solution px-6 pt-16 text-solution-foreground">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4, once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
            className="mx-auto w-full max-w-6xl text-center"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-widest">The movement</p>
            <h2 className="mx-auto max-w-4xl font-display text-4xl font-extrabold uppercase leading-[0.95] sm:text-6xl">
              Invest in better food. Share the rewards.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-relaxed sm:text-lg">
              foodXchange is a community-owned platform built by The Food Investors Society. We turn everyday eating into a people-powered investment in health, energy, and community.
            </p>

            <div className="mx-auto mt-7 grid max-w-4xl gap-3 text-left md:grid-cols-2">
              <Button onClick={revealPlatform} className="group h-auto min-h-36 items-start justify-between whitespace-normal border-2 border-solution-foreground bg-transparent p-5 text-left text-solution-foreground shadow-none hover:bg-solution-foreground hover:text-solution">
                <span>
                  <span className="block font-display text-xl font-extrabold">Explore foodXchange</span>
                  <span className="mt-2 block text-sm font-medium leading-relaxed">See how the platform helps people make clearer, fairer, healthier food choices.</span>
                </span>
                <ArrowRight className="mt-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button onClick={() => setJoined(true)} className="group h-auto min-h-36 items-start justify-between whitespace-normal border-2 border-solution-foreground bg-solution-foreground p-5 text-left text-solution shadow-none hover:bg-solution-foreground/90">
                <span>
                  <span className="block font-display text-xl font-extrabold">{joined ? "You’re part of it" : "Become a Member"}</span>
                  <span className="mt-2 block text-sm font-medium leading-relaxed">{joined ? "Thanks for raising your hand. Membership details are coming soon." : "Help shape a community-owned future and take active part in the Society."}</span>
                </span>
                {joined ? <Check className="mt-1 h-5 w-5" /> : <Users className="mt-1 h-5 w-5" />}
              </Button>
            </div>
          </motion.div>
        </section>

        {showPlatform && (
          <section id="platform" className="flex h-screen w-full snap-start items-center justify-center bg-platform px-6 pt-16 text-platform-foreground">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest">Inside foodXchange</p>
              <h2 className="font-display text-4xl font-extrabold uppercase sm:text-6xl">A clearer way to choose.</h2>
              <div className="mx-auto mt-8 grid min-h-64 place-items-center border-2 border-dashed border-platform-foreground/60 p-8">
                <p className="font-display text-xl font-bold">App interface coming here</p>
              </div>
            </motion.div>
          </section>
        )}
      </main>
    </>
  );
}
