import { createFileRoute } from "@tanstack/react-router";
import { UserRound, UserRoundCheck } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

import appleDoodleImage from "@/assets/join/apple-doodle.svg";
import doodlePatternImage from "@/assets/join/doodle-pattern.svg";
import pancakeSurferBaseImage from "@/assets/join/pancake-surfer-base.png";
import pancakeSurferHairImage from "@/assets/join/pancake-surfer-hair.png";
import pancakeSurferWaveImage from "@/assets/join/pancake-surfer-wave.png";
import umbrellaBaseImage from "@/assets/join/umbrella-base.png";
import umbrellaRain0Image from "@/assets/join/umbrella-rain-0.png";
import umbrellaRain1Image from "@/assets/join/umbrella-rain-1.png";
import umbrellaRain2Image from "@/assets/join/umbrella-rain-2.png";
import umbrellaRain3Image from "@/assets/join/umbrella-rain-3.png";
import umbrellaRain4Image from "@/assets/join/umbrella-rain-4.png";
import umbrellaRain5Image from "@/assets/join/umbrella-rain-5.png";
import umbrellaRain6Image from "@/assets/join/umbrella-rain-6.png";
import umbrellaRain7Image from "@/assets/join/umbrella-rain-7.png";
import umbrellaRain8Image from "@/assets/join/umbrella-rain-8.png";
import umbrellaRain9Image from "@/assets/join/umbrella-rain-9.png";
import watermelonDoodleImage from "@/assets/join/watermelon-doodle.svg";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader, Strapline } from "@/components/site-header";
import "../coming-soon.css";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Become a Member | Food Investors Society" },
      {
        name: "description",
        content:
          "Join the Food Investors Society from £1 a year — one member, one vote, real ownership of foodXchange.",
      },
      { property: "og:title", content: "Join the Movement for a Better Food Future" },
      {
        property: "og:description",
        content:
          "Become a co-owner of foodXchange. Membership, supporter, volunteer and donation options.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JoinPage,
});

const spring = { type: "spring", stiffness: 110, damping: 16 } as const;

function Underline({ className = "" }: { className?: string }) {
  return (
    <svg
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
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.4, ease: "easeInOut" }}
      />
    </svg>
  );
}

function Circle({
  children,
  strokeClassName = "stroke-problem",
}: {
  children: ReactNode;
  strokeClassName?: string;
}) {
  return (
    <span className="relative inline-block px-2">
      {children}
      <svg
        viewBox="0 0 120 60"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-x-2 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)] ${strokeClassName}`}
      >
        <motion.path
          d="M20 8c30-6 80-6 92 12 8 18-20 34-60 34S4 44 8 26C12 12 40 6 70 8"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </svg>
    </span>
  );
}

function Tick({ className = "stroke-problem" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`mt-0.5 size-5 shrink-0 ${className}`}
    >
      <path
        d="M3 13c3 2 5 5 6 7 3-7 7-12 12-16"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const tiers = [
  {
    title: "Founder Member",
    Icon: UserRoundCheck,
    price: "£100",
    prefix: "",
    period: " / lifetime",
    subtitle: "Lifetime Community Membership",
    tone: "solution" as const,
    popular: true,
    features: [
      "Founders List recognition",
      "New features early access",
      "Invitations to exclusive member feedback sessions",
      "One member, one vote",
    ],
  },
  {
    title: "Community Member",
    Icon: UserRound,
    price: "£1",
    prefix: "From ",
    period: " / year",
    subtitle: "Annual Community Membership",
    tone: "problem" as const,
    features: [
      "News, updates & early insights on foodXchange",
      "Invitations to polls, consultations & community events",
      "One member, one vote",
    ],
  },
];

const support = [
  {
    title: "Become a Supporter",
    description: "Show your support for a better food future",
    bullets: [
      "Your logo displayed on our website",
      "Recognition in campaign and promotional materials",
      "Society news and event invitations",
      "A visible way to show your support for our mission",
    ],
    cta: "Sign Up",
  },
  {
    title: "Join as a Volunteer",
    description: "For individuals offering time, skills, or expertise",
    bullets: [
      "Opportunities to apply your skills to a purpose-driven, national initiative",
      "Experience collaborating with an innovative, co-operative social enterprise",
      "Invitations to team calls, workshops, and networking events",
      "The satisfaction of helping launch foodXchange",
    ],
    cta: "Sign Up",
  },
  {
    title: "Donate",
    description: "Every donation, big or small, makes a real difference",
    body: "Donations help us fund development, support outreach, and keep key features free so that everyone can benefit, regardless of income.",
    cta: "Donate",
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: spring } };

const umbrellaRain = [
  { src: umbrellaRain0Image, left: 36.167, top: 0.663, width: 2.882, height: 8.619 },
  { src: umbrellaRain1Image, left: 52.161, top: 2.983, width: 2.594, height: 4.751 },
  { src: umbrellaRain2Image, left: 19.164, top: 5.304, width: 2.882, height: 5.746 },
  { src: umbrellaRain3Image, left: 66.282, top: 6.961, width: 2.738, height: 4.42 },
  { src: umbrellaRain4Image, left: 52.882, top: 12.044, width: 2.594, height: 3.204 },
  { src: umbrellaRain5Image, left: 67.003, top: 14.365, width: 2.594, height: 4.088 },
  { src: umbrellaRain6Image, left: 37.752, top: 14.917, width: 2.882, height: 7.072 },
  { src: umbrellaRain7Image, left: 6.916, top: 17.901, width: 2.738, height: 6.077 },
  { src: umbrellaRain8Image, left: 20.317, top: 17.901, width: 3.026, height: 8.84 },
  { src: umbrellaRain9Image, left: 5.331, top: 28.729, width: 2.882, height: 6.409 },
] as const;

/**
 * Umbrella doodle placed beside the membership/support boundary. Each rain
 * dash was cropped out of the source image into its own sprite so they can
 * flicker independently on staggered, randomized timers (a "raining"
 * shimmer) instead of all blinking in lockstep.
 */
function UmbrellaRain() {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-36 right-3 hidden w-48 lg:block lg:w-56"
    >
      <div className="relative" style={{ aspectRatio: "694 / 905" }}>
        {umbrellaRain.map((drop, index) => (
          <motion.img
            key={drop.src}
            src={drop.src}
            alt=""
            className="absolute"
            style={{
              left: `${drop.left}%`,
              top: `${drop.top}%`,
              width: `${drop.width}%`,
              height: `${drop.height}%`,
            }}
            initial={{ opacity: 0.25 }}
            animate={reduce ? undefined : { opacity: [0.25, 1, 0.25] }}
            transition={
              reduce
                ? undefined
                : {
                    duration: 1.4 + (index % 4) * 0.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (index * 0.63) % 2.6,
                  }
            }
          />
        ))}
        <img src={umbrellaBaseImage} alt="" className="absolute inset-0 h-full w-full" />
      </div>
    </div>
  );
}

function JoinPage() {
  const reduce = useReducedMotion();
  const init = reduce ? false : "hidden";
  const { scrollY } = useScroll();
  const doodleY = useTransform(scrollY, (value: number) => value * -0.5);

  return (
    <div className="coming-page relative min-h-dvh overflow-x-clip bg-footer text-footer-foreground">
      <SiteHeader active="join" className="sticky top-0" />
      <Strapline
        text={
          <>
            Invest together Grow our shared commonw<span className="text-problem">H</span>ealth
          </>
        }
        className="text-footer-foreground"
      />

      <div className="relative">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-70"
          style={{
            backgroundImage: `url(${doodlePatternImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            y: reduce ? 0 : doodleY,
          }}
        />
        <motion.img
          src={appleDoodleImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute z-0 w-[min(323px,28vw)] max-w-none opacity-70"
          style={{
            top: "70%",
            left: "-5%",
            y: reduce ? 0 : doodleY,
          }}
        />
        <img
          src={watermelonDoodleImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 z-0 w-[min(420px,42vw)] max-w-none opacity-70"
        />
        <main className="relative mx-auto w-[min(1160px,calc(100%-40px))] pb-24">
          {/* Intro */}
          <motion.section
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            className="mx-auto max-w-3xl pt-8 pb-24 md:pt-12"
          >
            <h1 className="text-center text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              Join the{" "}
              <span className="relative inline-block">
                Movement
                <Underline className="-bottom-3 h-5" />
              </span>{" "}
              for a Better Food Future
            </h1>
            <div className="relative mx-auto mt-8 w-full max-w-2xl md:max-w-4xl" aria-hidden="true">
              <img src={pancakeSurferBaseImage} alt="" className="h-auto w-full" />
              <motion.img
                src={pancakeSurferWaveImage}
                alt=""
                className="absolute inset-0 h-full w-full"
                style={{ transformOrigin: "55.2% 59.1%" }}
                animate={reduce ? undefined : { scaleX: [1, 1.12, 1], skewY: [0, -2.5, 0, 2.5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.img
                src={pancakeSurferHairImage}
                alt=""
                className="absolute inset-0 h-full w-full"
                style={{ transformOrigin: "47.7% 15.9%" }}
                animate={reduce ? undefined : { skewX: [0, 3, 0, -3, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <p className="mt-10 text-lg leading-relaxed text-footer-muted">
              foodXchange is built and owned by its members through{" "}
              <strong className="text-footer-foreground">The Food Investors Society</strong>, a
              non-profit UK Community Benefit Society. That means:
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "No profit-driven shareholders",
                "One member, one vote",
                "Full accountability and transparency",
                "A mission-first approach focused on health, fairness, and community benefit",
              ].map((b) => (
                <li key={b} className="flex gap-3 text-base font-medium md:text-lg">
                  <Tick />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg leading-relaxed">
              By joining, you&apos;re not just signing up. You&apos;re becoming a{" "}
              <span className="relative inline-block font-bold">
                co-owner
                <Underline className="-bottom-2 h-3" />
              </span>{" "}
              in a shared mission for change.
            </p>
          </motion.section>

          {/* Tiers */}
          <section id="membership" className="pb-28">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                Our Membership Options
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-footer-muted">
                Every member has an equal vote and a say in shaping our priorities, and the future
                direction. Real ownership. Real influence. Collective change.
              </p>
            </div>
            <motion.div
              variants={container}
              initial={init}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mx-auto mt-16 flex flex-wrap justify-center gap-10"
            >
              {tiers.map(
                ({ title, Icon, price, prefix, period, subtitle, features, popular, tone }) => {
                  const toneClasses =
                    tone === "solution"
                      ? {
                          card: "bg-solution/50 hover:bg-solution text-solution-foreground",
                          accent: "text-solution-foreground",
                          stroke: "stroke-solution-foreground",
                          muted: "text-solution-foreground/70",
                        }
                      : {
                          card: "bg-problem/45 hover:bg-problem text-problem-foreground",
                          accent: "text-problem-foreground",
                          stroke: "stroke-problem-foreground",
                          muted: "text-problem-foreground/70",
                        };
                  return (
                    <motion.article
                      key={title}
                      variants={item}
                      className={`group relative flex w-[22rem] min-h-[28rem] flex-col rounded-3xl p-8 shadow-md transition-all duration-300 hover:-translate-y-4 hover:shadow-xl ${toneClasses.card}`}
                    >
                      {popular && (
                        <span className="absolute -top-2.5 right-6 rounded-full bg-solution px-3 py-1 text-xs font-bold uppercase tracking-wider text-solution-foreground">
                          Most popular
                        </span>
                      )}
                      <Icon className={`size-8 ${toneClasses.accent}`} aria-hidden="true" />
                      <h3 className="mt-4 text-2xl font-bold">{title}</h3>
                      <p className="mt-4 text-lg">
                        {prefix}
                        <span className={`text-3xl font-extrabold ${toneClasses.accent}`}>
                          <Circle strokeClassName={toneClasses.stroke}>{price}</Circle>
                        </span>
                        <span className={toneClasses.muted}>{period}</span>
                      </p>
                      <p
                        className={`mt-3 text-sm font-semibold uppercase tracking-wide ${toneClasses.muted}`}
                      >
                        {subtitle}
                      </p>
                      <ul className="mt-6 space-y-3">
                        {features.map((f) => (
                          <li key={f} className="flex gap-3 text-sm font-medium md:text-base">
                            <Tick className={toneClasses.stroke} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </motion.article>
                  );
                },
              )}
            </motion.div>
          </section>

          {/* Support */}
          <section className="relative">
            <UmbrellaRain />
            <h2 className="text-center text-3xl font-bold tracking-tight md:text-5xl">
              Other Ways to Support Us
            </h2>
            <motion.div
              variants={container}
              initial={init}
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="mt-16 flex flex-wrap justify-center gap-8"
            >
              {support.map(({ title, description, bullets, body, cta }) => (
                <motion.article
                  key={title}
                  variants={item}
                  className="group relative flex w-[22rem] min-h-[28rem] flex-col rounded-3xl border border-footer-foreground/10 bg-background/5 p-8 shadow-sm ring-1 ring-transparent transition-all duration-300 hover:-translate-y-4 hover:shadow-xl hover:ring-white hover:backdrop-blur-md"
                >
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm text-cta-muted">{description}</p>
                  {bullets && (
                    <ul className="mt-6 space-y-3">
                      {bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm font-medium">
                          <Tick />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {body && <p className="mt-6 text-sm font-medium leading-relaxed">{body}</p>}
                  <Button
                    asChild
                    size="lg"
                    className="mt-auto self-center rounded-full bg-solution px-10 font-semibold text-solution-foreground hover:bg-solution/90 [margin-top:max(2rem,auto)]"
                  >
                    <a href="/about#newsletter">{cta}</a>
                  </Button>
                </motion.article>
              ))}
            </motion.div>
          </section>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
