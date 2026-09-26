import { createFileRoute } from "@tanstack/react-router";
import { UserRound, UserRoundCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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
        content: "Become a co-owner of foodXchange. Membership, supporter, volunteer and donation options.",
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
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`mt-0.5 size-5 shrink-0 ${className}`}>
      <path d="M3 13c3 2 5 5 6 7 3-7 7-12 12-16" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HoverFrame({ className = "stroke-problem" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] ${className}`}
    >
      <path
        className="scribble-draw"
        pathLength={1}
        d="M100 8C220 -4 320 0 362 22C392 38 394 70 390 100C384 190 386 290 384 330C382 366 356 390 316 392C230 400 130 398 70 386C34 378 10 354 14 316C20 240 16 130 22 68C26 32 55 12 100 8Z"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const tiers = [
  {
    title: "Community Member",
    Icon: UserRound,
    price: "£1",
    prefix: "From ",
    period: " / year",
    subtitle: "Annual Community Membership",
    tone: "solution" as const,
    features: [
      "News, updates & early insights on foodXchange",
      "Invitations to polls, consultations & community events",
      "One member, one vote",
    ],
  },
  {
    title: "Founder Member",
    Icon: UserRoundCheck,
    price: "£100",
    prefix: "",
    period: " / lifetime",
    subtitle: "Lifetime Community Membership",
    tone: "problem" as const,
    popular: true,
    features: [
      "Founders List recognition",
      "New features early access",
      "Invitations to exclusive member feedback sessions",
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

function JoinPage() {
  const reduce = useReducedMotion();
  const init = reduce ? false : "hidden";
  return (
    <div className="coming-page relative min-h-dvh overflow-x-clip bg-cta text-cta-foreground">
      <SiteHeader active="join" className="sticky top-0" />

      <main className="relative mx-auto w-[min(1160px,calc(100%-40px))] pb-24">
        {/* Intro */}
        <motion.section
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="mx-auto max-w-3xl pt-20 pb-24 md:pt-28"
        >
          <h1 className="text-center text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            Join the{" "}
            <span className="relative inline-block">
              Movement
              <Underline className="-bottom-3 h-5" />
            </span>{" "}
            for a Better Food Future
          </h1>
          <p className="mt-10 text-lg leading-relaxed text-cta-muted">
            foodXchange is built and owned by its members through{" "}
            <strong className="text-cta-foreground">The Food Investors Society</strong>, a non-profit UK
            Community Benefit Society. That means:
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
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Our Membership Options</h2>
            <p className="mt-5 text-lg leading-relaxed text-cta-muted">
              Every member has an equal vote and a say in shaping our priorities, and the future
              direction. Real ownership. Real influence. Collective change.
            </p>
          </div>
          <motion.div
            variants={container}
            initial={init}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto mt-16 grid max-w-4xl gap-10 md:grid-cols-2"
          >
            {tiers.map(({ title, Icon, price, prefix, period, subtitle, features, popular, tone }) => {
              const toneClasses =
                tone === "solution"
                  ? {
                      card: "bg-solution text-solution-foreground",
                      accent: "text-solution-foreground",
                      stroke: "stroke-solution-foreground",
                      muted: "text-solution-foreground/70",
                    }
                  : {
                      card: "bg-problem text-problem-foreground",
                      accent: "text-problem-foreground",
                      stroke: "stroke-problem-foreground",
                      muted: "text-problem-foreground/70",
                    };
              return (
                <motion.article
                  key={title}
                  variants={item}
                  className={`group relative rounded-3xl p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${toneClasses.card}`}
                >
                  <HoverFrame className={toneClasses.stroke} />
                  {popular && (
                    <span className="absolute -top-3 right-6 rounded-full bg-solution px-3 py-1 text-xs font-bold uppercase tracking-wider text-solution-foreground">
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
                  <p className={`mt-3 text-sm font-semibold uppercase tracking-wide ${toneClasses.muted}`}>
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
            })}
          </motion.div>
        </section>

        {/* Support */}
        <section>
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-5xl">
            Other Ways to Support Us
          </h2>
          <motion.div
            variants={container}
            initial={init}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-16 grid gap-8 md:grid-cols-3"
          >
            {support.map(({ title, description, bullets, body, cta }) => (
              <motion.article
                key={title}
                variants={item}
                className="group relative flex flex-col rounded-3xl border border-border bg-background/60 p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <HoverFrame />
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
      <SiteFooter />
    </div>
  );
}
