import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Bell, Check, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import brandMark from "../assets/fis-mark.png";
import fisLockupFull from "../assets/fis-lockup-full.png";
import { Button } from "../components/ui/button";
import { FoodXchangeMark } from "../components/foodxchange-mark";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { isReturningSiteVisit } from "../lib/site-visit";

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
  const [platformSlide, setPlatformSlide] = useState(0);
  const [joined, setJoined] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [freeScroll, setFreeScroll] = useState(false);
  const scrollerRef = useRef<HTMLElement>(null);
  const challengeRef = useRef<HTMLElement>(null);
  const solutionRef = useRef<HTMLElement>(null);
  const freeScrollRef = useRef(false);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    // Only the very first page loaded on the site this session should show
    // the logo-only intro before revealing the tagline and nav — landing on
    // another page first, then coming to "/", skips straight to the settled
    // state, same as coming back to "/" later.
    if (reduceMotion || isReturningSiteVisit) {
      setPhase("tagline");
      setShowNavigation(true);
      return;
    }

    const taglineTimer = window.setTimeout(() => setPhase("tagline"), 2300);
    const navigationTimer = window.setTimeout(() => setShowNavigation(true), 3100);
    return () => {
      window.clearTimeout(taglineTimer);
      window.clearTimeout(navigationTimer);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const challenge = challengeRef.current;
    const solution = solutionRef.current;
    if (!scroller || !challenge || !solution) return;

    const updateChallenge = () => {
      const panel = scroller.clientHeight;
      const progress = (scroller.scrollTop - challenge.offsetTop) / panel;
      if (scroller.scrollTop > 8) setShowNavigation(true);
      setChallengeActive(progress >= -0.1 && progress <= 5.9);
      setChallengeProgress(Math.min(6, Math.max(0, progress + 1)));
      setChallengeStage(Math.min(5, Math.max(0, Math.round(progress))));
      const shouldFreeScroll = scroller.scrollTop >= solution.offsetTop - panel;
      freeScrollRef.current = shouldFreeScroll;
      setFreeScroll(shouldFreeScroll);
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
      const solution = solutionRef.current;
      const releasePoint = solution ? solution.offsetTop - scroller.clientHeight : Infinity;
      if (freeScrollRef.current || scroller.scrollTop >= releasePoint - 2) return;
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

  const narrativeFocus = Math.min(1, Math.max(0, challengeProgress - 5));

  return (
    <>
      <AnimatePresence>
        {showNavigation && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-50"
          >
            <SiteHeader active="fis" />
          </motion.div>
        )}
      </AnimatePresence>

      <main
        ref={scrollerRef}
        className={`h-[100dvh] overflow-y-scroll scroll-smooth bg-background ${
          freeScroll ? "snap-none" : "snap-y snap-mandatory"
        }`}
      >
        <section
          id="hero"
          className="relative flex h-[100dvh] w-full shrink-0 snap-start snap-always items-center justify-center overflow-hidden bg-background px-5"
        >
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
                  className="absolute"
                >
                  <img
                    src={fisLockupFull}
                    alt=""
                    width={1144}
                    height={660}
                    className="h-64 w-auto object-contain sm:h-80"
                  />
                </motion.div>
              ) : (
                <motion.p
                  key="tagline"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeOut" }}
                  onAnimationComplete={() => setShowNavigation(true)}
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
          id="challenge"
          ref={challengeRef}
          className="relative h-[600dvh] w-full shrink-0 bg-problem text-problem-foreground"
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
          <div
            className="pointer-events-none absolute inset-x-0 top-[400dvh] h-[100dvh] snap-start snap-always"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-[500dvh] h-[100dvh] snap-start snap-always"
            aria-hidden="true"
          />
          <div className="sticky top-0 h-[100dvh] w-full overflow-hidden px-5 pt-16 sm:px-8">
            <motion.div
              className="absolute inset-0 bg-background"
              initial={false}
              animate={{ opacity: challengeStage >= 4 ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeInOut" }}
              aria-hidden="true"
            />
            <AnimatePresence>
              {challengeActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-5 top-16 z-10 sm:inset-x-10"
                >
                  <div
                    className="mx-auto grid max-w-5xl grid-cols-6 gap-2"
                    role="progressbar"
                    aria-label="Challenge sequence progress"
                    aria-valuemin={0}
                    aria-valuemax={6}
                    aria-valuenow={challengeProgress}
                  >
                    {[0, 1, 2, 3, 4, 5].map((step) => (
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
                      <p
                        lang="en"
                        className="prose-justify mx-auto max-w-2xl text-base font-medium opacity-85 sm:text-xl"
                      >
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

                  {challengeStage >= 4 && (
                    <motion.div
                      key="transition-paragraphs"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                      className="grid h-full w-full items-center gap-4 text-transition-foreground md:grid-cols-[45fr_55fr] md:gap-10 lg:gap-16"
                    >
                      <div className="flex items-center justify-center">
                        <FoodXchangeMark reduce={!!reduceMotion} className="h-56 w-auto md:h-72" />
                      </div>

                      <div className="flex flex-col justify-center text-left">
                        <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest md:text-left">
                          Our solution
                        </p>
                        <div className="grid min-h-[14rem] items-center md:min-h-[17rem]">
                          <motion.p
                            animate={{
                              opacity: 1 - narrativeFocus * 0.9,
                              filter: `blur(${narrativeFocus * 12}px)`,
                              scale: 1 - narrativeFocus * 0.04,
                              y: narrativeFocus * -18,
                            }}
                            transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
                            lang="en"
                            className="prose-justify col-start-1 row-start-1 text-lg font-medium leading-[1.3] md:text-xl"
                          >
                            <strong className="font-extrabold">foodXchange</strong> is a{" "}
                            <strong className="font-extrabold">community-owned platform</strong>{" "}
                            built by{" "}
                            <strong className="font-extrabold">The Food Investors Society</strong>.
                            Our co-operative was created to help people navigate a food environment
                            stacked against healthier choices, giving you the{" "}
                            <strong className="font-extrabold">clarity and confidence</strong> you
                            deserve. <strong className="font-extrabold">foodXchange</strong> turns
                            everyday eating into an investment in energy, wellbeing, and our shared{" "}
                            <strong className="font-extrabold">commonwHealth</strong>.
                          </motion.p>

                          <motion.p
                            animate={{
                              opacity: 0.1 + narrativeFocus * 0.9,
                              filter: `blur(${(1 - narrativeFocus) * 12}px)`,
                              scale: 0.96 + narrativeFocus * 0.04,
                              y: (1 - narrativeFocus) * 18,
                            }}
                            transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
                            lang="en"
                            className="prose-justify col-start-1 row-start-1 text-lg font-medium leading-[1.3] md:text-xl"
                          >
                            Together, we&apos;re growing a{" "}
                            <strong className="font-extrabold">people-powered food system</strong>{" "}
                            where <strong className="font-extrabold">better choices</strong> come
                            with <strong className="font-extrabold">better returns</strong>; for
                            you, your <strong className="font-extrabold">neighbourhood</strong> and
                            the <strong className="font-extrabold">wider community</strong>.
                          </motion.p>
                        </div>

                        <div className="mt-1 flex flex-wrap justify-center gap-3 md:mt-3">
                          <Button
                            onClick={revealPlatform}
                            className="h-11 rounded-full bg-foreground px-6 text-background hover:bg-foreground/85"
                          >
                            Learn about the app
                          </Button>
                          <Button
                            onClick={() => setJoined(true)}
                            aria-pressed={joined}
                            className="h-11 rounded-full bg-solution px-6 text-solution-foreground hover:bg-solution/85"
                          >
                            <Bell className="text-foreground" aria-hidden="true" />
                            Notify me
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <section
          id="solution"
          ref={solutionRef}
          className="flex min-h-[100dvh] w-full shrink-0 items-center bg-solution px-6 py-20 text-solution-foreground"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4, once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
            className="mx-auto w-full max-w-6xl text-center"
          >
            <h2 className="mx-auto max-w-4xl font-display text-3xl font-extrabold uppercase leading-[0.95] sm:text-6xl">
              Invest in better food. Share the rewards.
            </h2>
            <div className="mx-auto mt-6 grid max-w-3xl gap-4 text-left sm:mt-10">
              <Button
                id="membership"
                onClick={() => setJoined(true)}
                className="group h-auto min-h-32 items-stretch justify-between gap-4 whitespace-normal rounded-[2rem] border-2 border-solution-foreground bg-solution-foreground p-5 text-left text-solution shadow-none hover:bg-solution-foreground/90 sm:min-h-40 sm:p-6"
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

              <div className="overflow-hidden rounded-[2rem] border-2 border-solution-foreground">
                <Button
                  onClick={revealPlatform}
                  className="group h-auto min-h-32 w-full items-stretch justify-between gap-4 whitespace-normal rounded-[1.85rem] border-0 bg-transparent p-5 text-left text-solution-foreground shadow-none hover:bg-solution-foreground/10 sm:min-h-40 sm:p-6"
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
                      <div className="relative overflow-hidden border-t-2 border-solution-foreground bg-solution-foreground/10">
                        <motion.div
                          className="flex"
                          animate={{ x: `-${platformSlide * 100}%` }}
                          transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeInOut" }}
                        >
                          {[1, 2, 3, 4, 5].map((section) => (
                            <div
                              key={section}
                              className="grid min-h-64 w-full shrink-0 place-items-center px-14 py-10 sm:min-h-80 sm:px-20"
                            >
                              <p className="font-display text-lg font-bold text-solution-foreground sm:text-xl">
                                [foodXchange app interface breakdown {section} - left blank]
                              </p>
                            </div>
                          ))}
                        </motion.div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label="Show previous foodXchange section"
                          disabled={platformSlide === 0}
                          onClick={() => setPlatformSlide((current) => Math.max(0, current - 1))}
                          className={`absolute left-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full border border-solution-foreground bg-solution text-solution-foreground shadow-none transition-opacity hover:bg-solution/85 disabled:pointer-events-none disabled:opacity-0 sm:left-5 ${
                            platformSlide === 0 ? "opacity-0" : "opacity-100"
                          }`}
                        >
                          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label="Show next foodXchange section"
                          disabled={platformSlide === 4}
                          onClick={() => setPlatformSlide((current) => Math.min(4, current + 1))}
                            className="absolute right-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full border border-solution-foreground bg-solution text-solution-foreground shadow-none hover:bg-solution/85 disabled:opacity-20 sm:right-5"
                        >
                          <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </Button>

                        <div
                          className="absolute inset-x-0 bottom-5 flex justify-center gap-2"
                          role="tablist"
                          aria-label="foodXchange interface sections"
                        >
                          {[0, 1, 2, 3, 4].map((section) => (
                            <Button
                              key={section}
                              type="button"
                              variant="ghost"
                              size="icon"
                              role="tab"
                              aria-label={`Show foodXchange section ${section + 1}`}
                              aria-selected={platformSlide === section}
                              onClick={() => setPlatformSlide(section)}
                              className="h-5 w-5 rounded-full p-0 hover:bg-transparent"
                            >
                              <span
                                className={`h-2.5 w-2.5 rounded-full border border-solution-foreground transition-colors ${
                                  platformSlide === section
                                    ? "bg-solution-foreground"
                                    : "bg-transparent"
                                }`}
                              />
                            </Button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="join" className="w-full shrink-0 bg-footer text-footer-foreground">
          <div className="relative flex min-h-[78dvh] items-center justify-center overflow-hidden bg-cta px-6 py-28 text-cta-foreground sm:min-h-[82dvh]">
            <motion.img
              src={brandMark}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[-56px] left-[-64px] z-0 w-[270px] max-w-none bg-transparent object-contain mix-blend-multiply sm:bottom-auto sm:left-[-8vh] sm:top-[-12vh] sm:h-[112vh] sm:w-auto sm:max-w-[50vw]"
              animate={
                reduceMotion
                  ? undefined
                  : { x: [0, -40, 30, 100, 0], y: [0, -65, 0], rotate: [0, -6, 0] }
              }
              transition={
                reduceMotion ? undefined : { duration: 17, repeat: Infinity, ease: "easeInOut" }
              }
            />
            <motion.img
              src={brandMark}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-[-80px] top-[-56px] z-0 w-[300px] max-w-none bg-transparent object-contain opacity-75 blur-md mix-blend-multiply sm:right-[-8vh] sm:top-[-10vh] sm:h-[115vh] sm:w-auto sm:max-w-[54vw]"
              animate={
                reduceMotion
                  ? undefined
                  : { x: [0, 55, -25, 35, 0], y: [0, -30, 0], rotate: [0, 3, 0] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 21, repeat: Infinity, ease: "easeInOut", delay: 2 }
              }
            />

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.45, once: true }}
              transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
              className="relative z-10 mx-auto max-w-4xl text-center"
            >
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cta-accent text-cta-foreground">
                <Users className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cta-kicker">
                Our common future
              </p>
              <h2 className="mx-auto mb-4 max-w-3xl text-balance font-display text-4xl font-black leading-tight text-cta-foreground md:text-6xl">
                Join the Movement Transforming the Future of{" "}
                <span className="border-b-4 border-cta-accent text-cta-accent">Food</span>
              </h2>
              <p
                lang="en"
                className="prose-justify mx-auto mb-8 max-w-xl text-base font-medium leading-relaxed text-cta-muted md:text-lg"
              >
                Be part of a growing community creating a healthier, fairer and more sustainable
                food system.
              </p>
              <Button
                asChild
                className="h-auto rounded-full bg-cta-action px-8 py-4 font-semibold text-cta-action-foreground shadow-none hover:bg-cta-action-hover"
              >
                <a href="#membership">
                  Explore Membership Options <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </motion.div>
          </div>

          <SiteFooter />
        </section>
      </main>
    </>
  );
}
