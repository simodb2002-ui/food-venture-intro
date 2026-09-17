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
        content:
          "Food Investors Society brings people and capital together to make good food the easier choice.",
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
  const [challengeStage, setChallengeStage] = useState(0);
  const [challengeActive, setChallengeActive] = useState(false);
  const [showPlatform, setShowPlatform] = useState(false);
  const [joined, setJoined] = useState(false);
  const scrollerRef = useRef<HTMLElement>(null);
  const challengeRef = useRef<HTMLElement>(null);
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
    const challenge = challengeRef.current;
    if (!scroller || !challenge) return;

    const updateChallenge = () => {
      const panel = scroller.clientHeight;
      const progress = (scroller.scrollTop - challenge.offsetTop) / panel;
      setChallengeActive(progress >= -0.1 && progress <= 2.9);
      setChallengeStage(Math.min(2, Math.max(0, Math.round(progress))));
    };

    updateChallenge();
    scroller.addEventListener("scroll", updateChallenge, { passive: true });
    return () => scroller.removeEventListener("scroll", updateChallenge);
  }, []);

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
      document
        .querySelector("#fx-panel")
        ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    }, 150);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-center px-5">
        <div className="flex items-center gap-2 font-display text-xs font-bold uppercase text-foreground sm:text-sm">
          <img src={brandMark} alt="" className="h-8 w-auto" />
          Food Investors Society
        </div>
      </header>

      <main
        ref={scrollerRef}
        className="h-[100dvh] snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-background"
      >
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
                  <img
                    src={brandMark}
                    alt=""
                    width={250}
                    height={420}
                    className="h-64 w-auto object-contain sm:h-80"
                  />
                  <p className="text-left font-display text-5xl font-medium leading-[0.87] text-foreground sm:text-7xl">
                    food
                    <br />
                    investors
                    <br />
                    society
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
                  <span className="whitespace-nowrap">We make good food</span>
                  <br />
                  the easier choice.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <ArrowDown className="absolute bottom-6 h-5 w-5 text-foreground/55" aria-hidden="true" />
        </section>

        <section
          ref={challengeRef}
          className="relative h-[300dvh] w-full shrink-0 bg-problem text-problem-foreground"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[100dvh] snap-start snap-always"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-[100dvh] h-[100dvh] snap-start snap-always"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-[200dvh] h-[100dvh] snap-start snap-always"
            aria-hidden="true"
          />

          <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden px-5 pt-16 sm:px-8">
            <AnimatePresence>
              {challengeActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-5 top-16 z-10 sm:inset-x-10"
                >
                  <div
                    className="mx-auto grid max-w-5xl grid-cols-3 gap-2"
                    aria-label={`Challenge step ${challengeStage + 1} of 3`}
                  >
                    {[0, 1, 2].map((step) => (
                      <div key={step} className="h-px overflow-hidden bg-problem-foreground/30">
                        <motion.div
                          className="h-full origin-left bg-problem-foreground"
                          animate={{ scaleX: step <= challengeStage ? 1 : 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mx-auto mt-2 flex max-w-5xl justify-between text-[0.6rem] font-bold uppercase tracking-widest text-problem-foreground/75">
                    <span>Step 1</span>
                    <span>Step 2</span>
                    <span>Step 3</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mx-auto w-full max-w-6xl text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest sm:mb-5">
                The challenge
              </p>
              <AnimatePresence mode="wait" initial={false}>
                {challengeStage === 0 && (
                  <motion.div
                    key="challenge-one"
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -18 }}
                    transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}
                  >
                    <h2 className="mx-auto max-w-5xl text-balance font-display text-4xl font-extrabold uppercase leading-tight sm:text-6xl lg:text-7xl">
                      Heavily marketed food is everywhere.
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-balance text-sm font-medium leading-snug sm:mt-7 sm:text-lg">
                      Across the UK, people are surrounded by food that&apos;s quick, cheap, and
                      heavily promoted, but often not great for our health.
                    </p>
                  </motion.div>
                )}

                {challengeStage === 1 && (
                  <motion.div
                    key="challenge-two"
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -18 }}
                    transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}
                  >
                    <h2 className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-[0.24em] gap-y-2 text-balance font-display text-[2rem] font-extrabold uppercase leading-tight sm:text-5xl lg:text-6xl">
                      <span>Heavily</span>
                      <span>marketed</span>
                      <span>food</span>
                      <span>is</span>
                      <span className="inline-flex items-center justify-center gap-2 sm:gap-4">
                        <motion.span
                          initial={{ x: reduceMotion ? 0 : 40 }}
                          animate={{ x: 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.5 }}
                        >
                          Every
                        </motion.span>
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
                          className="grid aspect-[4/3] w-24 shrink-0 place-items-center rounded-md border-4 border-problem-foreground bg-placeholder p-2 text-center text-[0.62rem] font-bold normal-case leading-tight text-placeholder-foreground shadow-2xl sm:w-40 sm:text-sm lg:w-48"
                        >
                          (insert GIF)
                        </motion.span>
                        <motion.span
                          initial={{ x: reduceMotion ? 0 : -40 }}
                          animate={{ x: 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.5 }}
                        >
                          Where.
                        </motion.span>
                      </span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-balance text-xs font-medium leading-snug sm:mt-6 sm:text-base lg:text-lg">
                      Research makes it clear: the more heavily promoted industrial foods in our
                      diets, the higher our risk of poor health, including obesity, heart disease,
                      Type 2 diabetes and poor mental wellbeing.
                    </p>
                  </motion.div>
                )}

                {challengeStage === 2 && (
                  <motion.div
                    key="challenge-three"
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -18 }}
                    transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}
                  >
                    <motion.div
                      initial={{ scale: reduceMotion ? 0.7 : 1, opacity: 1 }}
                      animate={{ scale: 0.7, opacity: 0.65 }}
                      className="mx-auto mb-3 grid aspect-[4/3] w-20 place-items-center rounded-md border-4 border-problem-foreground bg-placeholder p-2 text-[0.6rem] font-bold text-placeholder-foreground shadow-xl sm:mb-5 sm:w-28 sm:text-xs"
                    >
                      (insert GIF)
                    </motion.div>
                    <h2 className="mx-auto max-w-5xl text-balance font-display text-4xl font-extrabold uppercase leading-tight sm:text-6xl lg:text-7xl">
                      It&apos;s not about willpower.
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-balance text-sm font-medium leading-snug sm:mt-7 sm:text-lg">
                      It&apos;s about what&apos;s available, convenient, and marketed most loudly.
                      We&apos;re here to make good food the easier choice.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
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
              foodXchange turns everyday eating into a people-powered investment in community
              health, energy, and shared wellbeing.
            </p>

            <div className="mx-auto mt-4 grid max-w-3xl gap-3 text-left sm:mt-7">
              <Button
                onClick={() => setJoined(true)}
                className="group h-auto min-h-0 items-stretch justify-between gap-4 whitespace-normal border-2 border-solution-foreground bg-solution-foreground p-3 text-left text-solution shadow-none hover:bg-solution-foreground/90 sm:p-4"
              >
                <span className="grid w-full grid-cols-[6rem_1fr] items-center gap-4">
                  <span className="grid aspect-[4/3] place-items-center bg-placeholder p-2 text-center text-xs font-bold text-placeholder-foreground">
                    (insert image: community member)
                  </span>
                  <span>
                    <span className="block font-display text-lg font-extrabold sm:text-xl">
                      {joined ? "You’re part of it" : "Become a Member"}
                    </span>
                    <span className="mt-1 block text-xs font-medium leading-relaxed sm:mt-2 sm:text-sm">
                      {joined
                        ? "Thanks for raising your hand. Membership details are coming soon."
                        : "Help shape a community-owned future for better food and take part in the Society."}
                    </span>
                  </span>
                </span>
                {joined ? <Check className="h-5 w-5" /> : <Users className="h-5 w-5" />}
              </Button>

              <div className="overflow-hidden rounded-md border-2 border-solution-foreground">
                <Button
                  onClick={revealPlatform}
                  className="group h-auto min-h-0 w-full items-stretch justify-between gap-4 whitespace-normal rounded-none border-0 bg-transparent p-3 text-left text-solution-foreground shadow-none hover:bg-transparent sm:p-4"
                >
                  <span className="grid w-full grid-cols-[6rem_1fr] items-center gap-4">
                    <span className="grid aspect-[4/3] place-items-center bg-placeholder p-2 text-center text-xs font-bold text-placeholder-foreground">
                      (insert image: platform preview)
                    </span>
                    <span>
                      <span className="block font-display text-lg font-extrabold sm:text-xl">
                        Explore foodXchange
                      </span>
                      <span className="mt-1 block text-xs font-medium leading-relaxed sm:mt-2 sm:text-sm">
                        See how the platform helps people make clearer, fairer, healthier food
                        choices.
                      </span>
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <AnimatePresence initial={false}>
                  {showPlatform && (
                    <motion.div
                      id="fx-panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="grid min-h-56 place-items-center border-t-2 border-solution-foreground bg-solution-foreground/10 p-8">
                        <p className="font-display text-lg font-bold text-solution-foreground sm:text-xl">
                          [foodXchange app interface breakdown - left blank]
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
