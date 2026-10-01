import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Mail, RotateCcw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "../about.css";
import fisMark from "@/assets/fis-mark.png";
import fisLogo from "@/assets/fis-logo-bridge.png";
import heroNoodlesImage from "@/assets/about/hero-noodles.webp";
import heroSlideGroupImage from "@/assets/about/hero-slide-group.webp";
import heroSlideFamilyImage from "@/assets/about/hero-slide-family.webp";
import heroSlideCloseupImage from "@/assets/about/hero-slide-closeup.webp";
import heroSlideTableImage from "@/assets/about/hero-slide-table.webp";
import heroSlideWomenImage from "@/assets/about/hero-slide-women.webp";
import heroSlideHeartImage from "@/assets/about/hero-slide-heart.svg";
import foodxLogo from "@/assets/about/foodx-logo.png.asset.json";
import fiona from "@/assets/about/fiona.jpg.asset.json";
import edwina from "@/assets/about/edwina.jpg.asset.json";
import ruk from "@/assets/about/ruk.png.asset.json";
import dani from "@/assets/about/dani.jpg.asset.json";
import lorraine from "@/assets/about/lorraine.webp.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About The Food Investors Society" },
      {
        name: "description",
        content:
          "Meet the community-owned co-operative behind foodXchange and our mission for a fairer, healthier food future.",
      },
      { property: "og:title", content: "About The Food Investors Society" },
      {
        property: "og:description",
        content:
          "The community-owned co-operative building foodXchange for a fairer, healthier food future.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const founders = [
  {
    name: "Fiona Pitt",
    role: "Executive Director",
    image: fiona.url,
    experience: "17 years as a Managing Director",
    note: "Adventurous spirit, creative thinker, relishes a challenge.",
    tone: "pink",
  },
  {
    name: "Edwina McGuirk",
    role: "Finance & Governance Director",
    image: edwina.url,
    experience: "15 years as a Company Secretary",
    note: "Highly dependable, with integrity and a thorough approach.",
    tone: "pink",
  },
  {
    name: "Ruk Cooray",
    role: "Technology Director",
    image: ruk.url,
    experience: "15 years in digital advertising operations",
    note: "Optimistic, people-focused, and committed to making things work.",
    tone: "pink",
  },
  {
    name: "Dani Waugh",
    role: "Information Security Lead",
    image: dani.url,
    experience: "7 years as a Chief Information Security Officer",
    note: "Intensely curious, with incredible energy and enthusiasm.",
    tone: "pink",
  },
  {
    name: "Lorraine Hirst",
    role: "Nutritionist · Health-Works CIC",
    image: lorraine.url,
    experience: "25 years in Public Health",
    note: "A passionate advocate for health equity and psychology-based nutrition.",
    tone: "pink",
  },
];

const milestones = [
  "Commissioning a full technical discovery",
  "Partnering with UK universities to build a proof-of-concept website and app",
  "Collaborating with community food networks",
  "Engaging public health experts, developers, and behaviour scientists",
  "Preparing for a limited market pilot and community share offer",
];

const headlineWords = [
  { text: "Building", className: "" },
  { text: "a", className: "" },
  { text: "Better", className: "pink-text" },
  { text: "Food", className: "pink-text" },
  { text: "Future.", className: "" },
];

function DrawnLeaf({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 36 36">
      <path d="M5 29C7 14 16 5 31 5c-1 14-9 24-24 25M8 28c6-7 11-12 20-19M17 19c-1-3-1-6 0-9M17 19c3 0 6 1 8 3" />
    </svg>
  );
}

type BowlTone = "coop" | "mission" | "vision";

// Exact SVG equivalent of the former CSS shape:
// border-radius: 50% 50% 48% 48% / 12% 12% 88% 88% on a 0-100 box,
// built from cubic beziers (not arcs) so it reproduces the same curve
// under the non-uniform per-instance stretch below (preserveAspectRatio="none").
const BOWL_BODY_PATH =
  "M50 0C77.61 0 100 5.37 100 12C100 60.6 78.51 100 52 100L48 100C21.49 100 0 60.6 0 12C0 5.37 22.39 0 50 0Z";

function BowlShape({ tone }: { tone: BowlTone }) {
  const clipId = `bowl-clip-${tone}`;
  return (
    <svg className="bowl-shape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <path d={BOWL_BODY_PATH} />
        </clipPath>
      </defs>
      <rect className="bowl-fill" x="0" width="100" clipPath={`url(#${clipId})`} />
      <path className="bowl-outline" d={BOWL_BODY_PATH} />
      {/* Equivalent of the former rim: a full ellipse, border-radius: 50% on a 0/0/100%/32% box */}
      <ellipse className="bowl-rim" cx="50" cy="16" rx="50" ry="16" />
    </svg>
  );
}

const bowls = [
  {
    tone: "vision" as BowlTone,
    title: "Vision",
    kicker: "Where we’re going",
    icon: "✳",
    content: (
      <>
        <p>
          A future where healthier food is easier to access, local food culture thrives, and
          communities share in the benefits of better food.
        </p>
        <p className="commonhealth">
          We call this{" "}
          <mark>
            Commonw<span className="text-problem">H</span>ealth
          </mark>{" "}
          — shared wealth, created through good food.
        </p>
      </>
    ),
  },
  {
    tone: "mission" as BowlTone,
    title: "Mission",
    kicker: "Our purpose",
    icon: "♥",
    content: (
      <>
        <p>
          To empower people and communities to make informed, affordable, and enjoyable food
          choices.
        </p>
        <ul>
          <li>Informed</li>
          <li>Affordable</li>
          <li>Enjoyable</li>
        </ul>
      </>
    ),
  },
  {
    tone: "coop" as BowlTone,
    title: "Why a Co-operative?",
    shortTitle: "Why a Co-op",
    kicker: "The model",
    icon: (
      <>
        1<span>=</span>1
      </>
    ),
    content: (
      <>
        <p>
          Our food system is heavily shaped by commercial interests. We believe the alternative must
          be owned by the people it serves. That’s why we chose a co-operative legal structure.
        </p>
        <div className="coop-seal">
          Community
          <br />
          <strong>owned</strong>
        </div>
      </>
    ),
  },
];

function StackedBowls() {
  const [selected, setSelected] = useState<BowlTone | null>(null);
  const [filling, setFilling] = useState<BowlTone | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  useEffect(() => {
    if (!filling) return;
    const timer = window.setTimeout(() => {
      setSelected(filling);
      setFilling(null);
    }, 430);
    return () => window.clearTimeout(timer);
  }, [filling]);

  return (
    <div
      className={`bowl-experience${selected ? " has-selection" : ""}`}
      onClick={() => setSelected(null)}
    >
      <div className="bowl-stack" aria-label="Our co-operative, mission and vision">
        {bowls.map((bowl) => {
          const isSelected = selected === bowl.tone;
          return (
            <motion.article
              layout
              key={bowl.tone}
              className={`stacked-bowl bowl-${bowl.tone}${isSelected ? " is-selected" : ""}${filling === bowl.tone ? " is-filling" : ""}`}
              transition={{ layout: { type: "spring", stiffness: 200, damping: 25, mass: 0.8 } }}
              onClick={(event) => {
                event.stopPropagation();
                if (!isSelected && !filling) setFilling(bowl.tone);
              }}
            >
              <AnimatePresence mode="sync" initial={false}>
                {isSelected ? (
                  <motion.div
                    key="plate"
                    className="bowl-plate"
                    initial={{ opacity: 0, rotateY: -78, scale: 0.82 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateY: 78, scale: 0.82 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
                  >
                    <motion.div
                      className="plate-content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <p className="card-kicker">{bowl.kicker}</p>
                      <h3>{bowl.title}</h3>
                      <div className="plate-copy">{bowl.content}</div>
                      <Button
                        type="button"
                        variant="ghost"
                        className="back-to-stack"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelected(null);
                        }}
                      >
                        <RotateCcw aria-hidden="true" /> Back to stack
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="bowl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      className="bowl-button"
                      aria-label={`Open ${bowl.title}`}
                      aria-pressed={false}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <BowlShape tone={bowl.tone} />

                      <span className="bowl-face-title">{bowl.shortTitle ?? bowl.title}</span>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
      <p className="bowl-instruction">Choose a bowl to explore</p>
    </div>
  );
}

const HERO_PHOTOS = [
  heroNoodlesImage,
  heroSlideGroupImage,
  heroSlideFamilyImage,
  heroSlideCloseupImage,
  heroSlideTableImage,
  heroSlideWomenImage,
];

function HeroPhotoCycle() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_PHOTOS.length);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <div className="hero-photo-card">
      <img src={HERO_PHOTOS[index]} alt="" className="hero-slide-photo" />
      <img src={heroSlideHeartImage} alt="" aria-hidden="true" className="hero-slide-heart" />
    </div>
  );
}

function AboutPage() {
  const storyRef = useRef<HTMLElement>(null);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMilestone(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          entry.target.classList.toggle("in-view", entry.isIntersecting);
        }),
      { threshold: 0.18 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    if (storyRef.current) observer.observe(storyRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="top" className="about-page">
      <SiteHeader active="about" className="sticky top-0" />
      <main>
        <section className="hero-section">
          <div className="hero-inner">
            <div className="tagline">
              <span className="tag-dot" />A community united for a healthier food future.
            </div>
            <div className="hero-copy">
              <p className="eyebrow">About the society</p>
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
                  },
                }}
              >
                <span className="headline-line headline-lead">
                  {headlineWords.slice(0, 1).map((word) => (
                    <motion.span
                      key={word.text}
                      className={`headline-word ${word.className}`}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                    >
                      {word.text}
                    </motion.span>
                  ))}
                </span>
                <span className="headline-line headline-lead">
                  {headlineWords.slice(1, 3).map((word) => (
                    <motion.span
                      key={word.text}
                      className={`headline-word ${word.className}`}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                    >
                      {word.text}
                    </motion.span>
                  ))}
                </span>
                <span className="headline-line headline-lead">
                  {headlineWords.slice(3, 5).map((word) => (
                    <motion.span
                      key={word.text}
                      className={`headline-word ${word.className}`}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                    >
                      {word.text}
                    </motion.span>
                  ))}
                </span>
                <span className="headline-line together-line">
                  <motion.span
                    className="headline-word orange-text"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                  >
                    Together.
                  </motion.span>
                  <motion.svg
                    className="together-underline"
                    viewBox="0 0 330 28"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M5 17C78 4 181 8 324 14C241 16 144 20 28 23"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.82, duration: 0.85, ease: "easeOut" }}
                    />
                  </motion.svg>
                </span>
              </motion.h1>
              <p className="hero-lede">
                We’re a community benefit society putting people back at the heart of food: with
                equal voices, shared value and better choices.
              </p>
              <Button asChild variant="outline" size="lg" className="scroll-cue">
                <a href="#platform">
                  <span>Meet the co-operative</span>
                  <ArrowDown />
                </a>
              </Button>
            </div>
            <div className="hero-visual hero-plate-visual">
              <HeroPhotoCycle />
            </div>
          </div>
        </section>

        <section id="platform" className="brand-bridge" data-reveal>
          <div className="section-inner bridge-inner">
            <div className="bridge-logo fis">
              <img src={fisLogo} alt="The Food Investors Society" />
              <small>Community-owned co-operative</small>
            </div>
            <svg className="bridge-line" viewBox="0 0 400 110" aria-hidden="true">
              <path d="M7 73C96 5 262 5 393 66L371 49L393 66L365 71" />
            </svg>
            <div className="bridge-logo foodx">
              <img src={foodxLogo.url} alt="foodXchange" />
              <small>Our digital food platform</small>
            </div>
          </div>
        </section>

        <motion.section
          className="statement-banner"
          data-cursor-dark
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
        >
          <div className="section-inner banner-inner">
            {["One community.", "One platform."].map((phrase) => (
              <motion.span
                key={phrase}
                className="banner-phrase"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                {phrase}
              </motion.span>
            ))}
          </div>
          <div className="banner-marquee" aria-label="A healthier food future we all own.">
            <div className="banner-track" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i}>A healthier food future we all own.</span>
              ))}
            </div>
          </div>
        </motion.section>

        <section className="beliefs-section">
          <div className="section-inner beliefs-layout">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">How we’re different</p>
              <h2>
                Built around people,
                <br />
                not commercial interests.
              </h2>
            </div>
            <StackedBowls />
          </div>
        </section>

        <section id="story" ref={storyRef} className="story-section">
          <div className="section-inner recipe-book-stage">
            <div className="recipe-book-pages" aria-label="Our Story: The Recipe">
              <span className="book-spine" aria-hidden="true" />
              <div className="story-intro recipe-page recipe-page-left" data-reveal>
                <p className="eyebrow">Our Story: The Recipe</p>
                <h2>
                  A conversation
                  <br />
                  became a movement.
                </h2>
                <svg className="recipe-scribble" viewBox="0 0 360 34" aria-hidden="true">
                  <path d="M6 17C91 5 188 29 352 13C243 26 125 7 28 25" />
                </svg>
                <p>
                  The co-founders came together with the belief that the UK needs a fairer, more
                  transparent food system. What began as a conversation about ultra-processed foods
                  and public health grew into a mission to create a platform for informed choice,
                  community power, and system change.
                </p>
                <Button asChild variant="movement" size="lg">
                  <Link to="/">
                    Join the movement <ArrowRight />
                  </Link>
                </Button>
              </div>
              <div className="recipe-page recipe-page-right">
                <p className="recipe-method-title">Method &amp; Ingredients for Change</p>
                <ol className="timeline">
                  {milestones.map((milestone, index) => {
                    const isActive = activeMilestone === index;
                    return (
                      <li key={milestone} className={isActive ? "is-active" : ""} data-reveal>
                        <Button
                          type="button"
                          variant="ghost"
                          className="recipe-step"
                          aria-expanded={isActive}
                          onClick={() => setActiveMilestone(isActive ? null : index)}
                        >
                          <span className="milestone-number">0{index + 1}</span>
                          <span className="milestone-copy">{milestone}</span>
                        </Button>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              className="recipe-note"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <p>{milestone}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <DrawnLeaf className="milestone-leaf" />
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section id="founders" className="founders-section">
          <motion.img
            src={fisMark}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-[-12%] top-[0px] -z-10 w-[360px] max-w-none object-contain mix-blend-multiply blur-xl sm:top-[-2vh] sm:h-[125vh] sm:w-auto sm:max-w-[62vw]"
            animate={
              reduceMotion ? undefined : { x: [0, 50, 90, 0], y: [0, 45, 90, 0], rotate: [0, 4, 0] }
            }
            transition={
              reduceMotion ? undefined : { duration: 19, repeat: Infinity, ease: "easeInOut" }
            }
          />
          <div className="section-inner">
            <div className="section-heading founders-heading" data-reveal>
              <div>
                <p className="eyebrow">Meet the founders</p>
                <h2>
                  Real people.
                  <br />
                  Shared purpose.
                </h2>
              </div>
              <p>
                Bringing decades of experience across leadership, technology, governance, security
                and public health.
              </p>
            </div>
            <div className="founder-grid">
              {founders.map((founder) => (
                <article
                  className={`founder-card tone-${founder.tone}`}
                  key={founder.name}
                  tabIndex={0}
                  data-reveal
                >
                  <div className="portrait-wrap">
                    <span className="portrait-halo" />
                    <img src={founder.image} alt={founder.name} />
                    <svg className="founder-doodle" viewBox="0 0 80 44" aria-hidden="true">
                      <path d="M8 31c12-26 22-22 28-2 6-29 21-29 35 1" />
                    </svg>
                  </div>
                  <h3>{founder.name}</h3>
                  <p className="founder-role">{founder.role}</p>
                  <div className="founder-detail">
                    <strong>{founder.experience}</strong>
                    <p>{founder.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="newsletter-section">
          <div className="section-inner newsletter-inner" data-reveal>
            <div>
              <p className="eyebrow">Stay in the loop</p>
              <h2>
                Good things
                <br />
                are growing.
              </h2>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email">
                Monthly Society updates, membership news and ways to support a fairer food future.
              </label>
              <div className="email-control">
                <Mail />
                <input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email address"
                  required
                />
                <Button type="submit" variant="movement" className="newsletter-submit">
                  Get updates <ArrowRight />
                </Button>
              </div>
              <small>Unsubscribe anytime. See our Privacy Policy.</small>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
