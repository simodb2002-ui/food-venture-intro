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
  const [challengeProgress, setChallengeProgress] = useState(0);
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
      setChallengeActive(progress >= -0.1 && progress <= 3.9);
      setChallengeProgress(Math.min(4, Math.max(0, progress + 1)));
      setChallengeStage(Math.min(3, Math.max(0, Math.round(progress))));
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
          className="relative h-[400dvh] w-full shrink-0 bg-problem text-problem-foreground"
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
          <div
            className="pointer-events-none absolute inset-x-0 top-[300dvh] h-[100dvh] snap-start snap-always"
            aria-hidden="true"
          />

          <div className="sticky top-0 h-[100dvh] w-full overflow-hidden px-5 pt-16 sm:px-8">
            <AnimatePresence>
              {challengeActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-5 top-16 z-10 sm:inset-x-10"
                >
                  <div
                    className="mx-auto grid max-w-5xl grid-cols-4 gap-2"
                    role="progressbar"
                    aria-label="Challenge sequence progress"
                    aria-valuemin={0}
                    aria-valuemax={4}
                    aria-valuenow={challengeProgress}
                  >
                    {[0, 1, 2, 3].map((step) => (
                      <div key={step} className="h-px overflow-hidden bg-problem-foreground/30">
                        <motion.div
                          className="h-full origin-left bg-problem-foreground"
                          animate={{ scaleX: Math.min(1, Math.max(0, challengeProgress - step)) }}
                          transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative mx-auto h-full w-full max-w-6xl text-center">
              <motion.div
                initial={false}
                animate={{ opacity: challengeStage <= 1 ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                className="pointer-events-none absolute inset-x-0 top-[13%] sm:top-[15%]"
              >
                <p className="text-xs font-bold uppercase tracking-widest">
                  The challenge we&apos;re tackling
                </p>
              </motion.div>

              <motion.div
                initial={false}
                animate={{ opacity: challengeStage <= 1 ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                className="pointer-events-none absolute inset-x-0 top-[27%] flex h-[13rem] items-center justify-center sm:top-[25%] sm:h-[18rem]"
              >
                <h2 className="w-full text-balance font-display text-[2rem] font-extrabold uppercase leading-tight sm:text-5xl lg:text-6xl">
                  <span className="block">Heavily marketed food is</span>
                  <span className="block">Everywhere.</span>
                </h2>
              </motion.div>

              <AnimatePresence>
                {challengeStage === 1 && (
                  <motion.div
                    key="gif-scatter"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
                    className="pointer-events-none absolute inset-0 z-20"
                    aria-hidden="true"
                  >
                    {[
                      {
                        label: "(insert GIF 1)",
                        position: "left-[5%] top-[15%] rotate-[3deg]",
                        delay: 0,
                      },
                      {
                        label: "(insert GIF 2)",
                        position: "right-[4%] top-[38%] -rotate-[6deg]",
                        delay: 0.15,
                      },
                      {
                        label: "(insert GIF 3)",
                        position: "bottom-[13%] left-[11%] rotate-[4deg]",
                        delay: 0.3,
                      },
                      {
                        label: "(insert GIF 4)",
                        position: "bottom-[22%] right-[22%] -rotate-[3deg]",
                        delay: 0.45,
                      },
                    ].map((box) => (
                      <motion.div
                        key={box.label}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          delay: reduceMotion ? 0 : box.delay,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        className={`absolute grid h-24 w-32 place-items-center overflow-hidden rounded-md border-4 border-problem-foreground bg-placeholder p-2 text-center text-[0.62rem] font-bold normal-case leading-tight text-placeholder-foreground shadow-2xl sm:h-36 sm:w-52 sm:text-sm ${box.position}`}
                      >
                        {box.label}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute inset-0 flex items-center justify-center px-2 py-24">
                <AnimatePresence mode="wait" initial={false}>
                  {challengeStage === 2 && (
                    <motion.p
                      key="challenge-paragraph-one"
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reduceMotion ? 0 : -16 }}
                      transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}
                      className="max-w-5xl text-balance font-display text-2xl font-extrabold leading-tight sm:text-4xl lg:text-5xl"
                    >
                      Across the UK, people are surrounded by food that&apos;s quick, cheap, and
                      heavily promoted, but often not great for our health.
                    </motion.p>
                  )}

                  {challengeStage === 3 && (
                    <motion.div
                      key="challenge-paragraph-two"
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}
                      className="w-full"
                    >
                      <p className="mx-auto max-w-2xl text-balance text-base font-medium opacity-85 sm:text-xl">
                        Research shows heavily marketed industrial foods drive higher risks of poor
                        health, including obesity, heart disease, and Type 2 diabetes.
                      </p>
                      <div className="mt-6 sm:mt-10">
                        <p className="text-balance font-display text-3xl font-extrabold uppercase leading-tight sm:text-5xl lg:text-6xl">
                          It&apos;s not about willpower.
                        </p>
                        <p className="mx-auto mt-2 max-w-4xl text-balance font-display text-2xl font-extrabold uppercase leading-tight sm:mt-3 sm:text-4xl lg:text-5xl">
                          It&apos;s about what&apos;s available, convenient, and marketed most
                          loudly.
                        </p>
                      </div>
                      <p className="mt-6 inline-block rounded-full bg-problem-foreground px-5 py-2 font-display text-sm font-extrabold uppercase tracking-wide text-problem sm:mt-8 sm:text-base">
                        We&apos;re here for it.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
