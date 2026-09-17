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

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || reduceMotion) return;

    let locked = false;
    let unlockTimer = 0;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 4) return;
      event.preventDefault();
      if (locked) return;

      locked = true;
      const panel = scroller.clientHeight;
      const target = Math.round(scroller.scrollTop / panel) + (event.deltaY > 0 ? 1 : -1);
      const max = Math.round((scroller.scrollHeight - panel) / panel);
      scroller.scrollTo({ top: Math.min(Math.max(target, 0), max) * panel, behavior: "smooth" });

      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        locked = false;
      }, 750);
    };

    scroller.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      scroller.removeEventListener("wheel", onWheel);
      window.clearTimeout(unlockTimer);
    };
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

      <main ref={scrollerRef} className="h-[100dvh] snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-background">
        <section className="relative flex h-[100dvh] w-full shrink-0 snap-start snap-always items-center justify-center overflow-hidden bg-background px-5">
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

        <section className="relative flex h-[100dvh] w-full shrink-0 snap-start snap-always items-center justify-center overflow-hidden bg-problem px-6 pt-16 text-problem-foreground">
          <motion.div
            initial="hidden"
            whileInView="shown"
            viewport={{ amount: 0.5, once: true }}
            className="mx-auto w-full max-w-5xl text-center"
          >
            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0 } }}
              transition={{ duration: reduceMotion ? 0 : 0.6 }}
              className="mb-3 text-xs font-bold uppercase tracking-widest"
            >
              The challenge
            </motion.p>

            <motion.h2
              variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0 } }}
              transition={{ duration: reduceMotion ? 0 : 0.6 }}
              className="font-display text-3xl font-extrabold uppercase leading-[0.92] sm:text-6xl"
            >
              Our food environment is
              <span className="relative mt-2 flex min-h-[10rem] items-center justify-center sm:mt-4 sm:min-h-[14rem]">
                <motion.span
                  variants={{ hidden: { x: 0 }, shown: { x: reduceMotion ? 0 : -150 } }}
                  transition={{ delay: reduceMotion ? 0 : 1.2, duration: reduceMotion ? 0 : 0.7, ease: "easeOut" }}
                  className="relative z-10"
                >
                  Bro
                </motion.span>
                <motion.span
                  variants={{ hidden: { scale: 0, opacity: 0 }, shown: { scale: 1, opacity: 1 } }}
                  transition={{ delay: reduceMotion ? 0 : 1.35, duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
                  className="absolute grid aspect-[4/3] w-52 place-items-center rounded-2xl border-4 border-problem-foreground bg-placeholder text-center text-sm font-bold text-placeholder-foreground shadow-2xl sm:w-72"
                >
                  (insert GIF)
                </motion.span>
                <motion.span
                  variants={{ hidden: { x: 0 }, shown: { x: reduceMotion ? 0 : 150 } }}
                  transition={{ delay: reduceMotion ? 0 : 1.2, duration: reduceMotion ? 0 : 0.7, ease: "easeOut" }}
                  className="relative z-10"
                >
                  ken.
                </motion.span>
              </span>
            </motion.h2>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0 } }}
              transition={{ delay: reduceMotion ? 0 : 0.3, duration: reduceMotion ? 0 : 0.6 }}
              className="mx-auto mt-6 max-w-2xl text-sm font-medium leading-relaxed sm:mt-10 sm:text-lg"
            >
              Cheap, ultra-processed food is everywhere. It&apos;s not a lack of willpower—it&apos;s a system stacked against us.
            </motion.p>
          </motion.div>
        </section>


        <section className="flex h-[100dvh] w-full shrink-0 snap-start snap-always items-center bg-solution px-6 pt-16 text-solution-foreground">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4, once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
            className="mx-auto w-full max-w-6xl text-center"
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-widest sm:mb-3">The solution</p>
            <h2 className="mx-auto max-w-4xl font-display text-3xl font-extrabold uppercase leading-[0.95] sm:text-6xl">
              Invest in better food. Share the rewards.
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm font-medium leading-relaxed sm:mt-5 sm:text-lg">
              foodXchange turns everyday eating into a community-owned investment in health, energy, and shared wellbeing.
            </p>

            <div className="mx-auto mt-4 grid max-w-4xl gap-3 text-left sm:mt-7 md:grid-cols-2">
              <Button onClick={revealPlatform} className="group h-auto min-h-0 items-stretch justify-between gap-4 whitespace-normal border-2 border-solution-foreground bg-transparent p-3 text-left text-solution-foreground shadow-none hover:bg-solution-foreground hover:text-solution sm:p-4">
                <span className="grid w-full grid-cols-[6rem_1fr] items-center gap-4 md:grid-cols-1">
                  <span className="grid aspect-[4/3] place-items-center bg-placeholder p-2 text-center text-xs font-bold text-placeholder-foreground md:w-full">(insert image: platform preview)</span>
                  <span>
                    <span className="block font-display text-lg font-extrabold sm:text-xl">Explore foodXchange</span>
                    <span className="mt-1 block text-xs font-medium leading-relaxed sm:mt-2 sm:text-sm">See how the platform helps people make clearer, fairer, healthier choices.</span>
                  </span>
                </span>
                <ArrowRight className="mt-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button onClick={() => setJoined(true)} className="group h-auto min-h-0 items-stretch justify-between gap-4 whitespace-normal border-2 border-solution-foreground bg-solution-foreground p-3 text-left text-solution shadow-none hover:bg-solution-foreground/90 sm:p-4">
                <span className="grid w-full grid-cols-[6rem_1fr] items-center gap-4 md:grid-cols-1">
                  <span className="grid aspect-[4/3] place-items-center bg-placeholder p-2 text-center text-xs font-bold text-placeholder-foreground md:w-full">(insert image: community member)</span>
                  <span>
                    <span className="block font-display text-lg font-extrabold sm:text-xl">{joined ? "You’re part of it" : "Become a Member"}</span>
                    <span className="mt-1 block text-xs font-medium leading-relaxed sm:mt-2 sm:text-sm">{joined ? "Thanks for raising your hand. Membership details are coming soon." : "Help shape a community-owned future for better food and take part in the Society."}</span>
                  </span>
                </span>
                {joined ? <Check className="mt-1 h-5 w-5" /> : <Users className="mt-1 h-5 w-5" />}
              </Button>
            </div>
          </motion.div>
        </section>

        {showPlatform && (
          <section id="platform" className="flex h-[100dvh] w-full shrink-0 snap-start snap-always items-center justify-center bg-platform px-6 pt-16 text-platform-foreground">
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
