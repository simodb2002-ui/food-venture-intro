import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Mail, RotateCcw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { CursorFollower } from "@/components/cursor-follower";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "../about.css";
import fisLogo from "@/assets/about/fis-logo.png.asset.json";
import foodxLogo from "@/assets/about/foodx-logo.png.asset.json";
import communityMeal from "@/assets/about/pizza-party-hero.jpg.asset.json";
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

function DrawnSpark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 40 40">
      <path d="M20 2c0 11-5 18-18 18 13 0 18 7 18 18 0-11 5-18 18-18-13 0-18-7-18-18Z" />
    </svg>
  );
}

function DrawnLeaf({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 36 36">
      <path d="M5 29C7 14 16 5 31 5c-1 14-9 24-24 25M8 28c6-7 11-12 20-19M17 19c-1-3-1-6 0-9M17 19c3 0 6 1 8 3" />
    </svg>
  );
}

type BowlTone = "coop" | "mission" | "vision";

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
          We call this <mark>CommonwHealth</mark> — shared wealth, created through good food.
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
                      <span className="bowl-fill" />
                      <span className="bowl-rim" />

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

function AboutPage() {
  const storyRef = useRef<HTMLElement>(null);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMilestone(null);
        setIsBookOpen(false);
      }
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
      <CursorFollower />
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
                  {headlineWords.slice(0, 3).map((word) => (
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
            <div className="hero-visual">
              <div className="photo-frame">
                <img
                  src={communityMeal.url}
                  alt="Friends laughing together over pizza and snacks at a shared table"
                  width={1920}
                  height={1080}
                />
                <svg
                  className="organic-outline"
                  viewBox="0 0 600 720"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M72 32C188 4 417 13 531 82C594 120 570 235 580 337C591 447 603 607 508 674C419 737 210 716 92 674C11 645 25 497 19 372C13 244-15 81 72 32Z" />
                  <path d="M88 18C231-5 436 22 548 101C588 169 561 268 590 400C605 525 567 650 475 701" />
                </svg>
              </div>
              <svg className="steam-doodle" viewBox="0 0 90 130" aria-hidden="true">
                <path d="M27 121C3 90 65 83 31 55C4 34 50 20 43 3M62 117C42 88 89 75 61 46" />
              </svg>
              <svg className="brand-fruit" viewBox="0 0 84 84" aria-hidden="true">
                <path
                  className="brand-fruit-body"
                  d="M42 20C24 13 9 27 12 48C15 69 29 76 42 76C55 76 69 69 72 48C75 27 60 13 42 20Z"
                />
                <path
                  className="brand-fruit-stem"
                  d="M42 21C41 11 47 5 55 4M47 11C55 7 63 9 67 15C58 18 51 17 47 11Z"
                />
              </svg>
              <DrawnSpark className="hero-spark" />
            </div>
          </div>
        </section>

        <section id="platform" className="brand-bridge" data-reveal>
          <div className="section-inner bridge-inner">
            <div className="bridge-logo fis">
              <img src={fisLogo.url} alt="The Food Investors Society" />
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
            <AnimatePresence mode="wait" initial={false}>
              {!isBookOpen ? (
                <motion.div
                  key="cover"
                  className="recipe-book-closed"
                  initial={reduceMotion ? { opacity: 0, rotate: -15 } : { opacity: 0, rotate: -15, rotateY: -8, scale: 0.96 }}
                  animate={{ opacity: 1, rotate: -15, rotateY: 0, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0, rotate: -15 } : { opacity: 0, rotate: -15, rotateY: -72, x: -80 }}
                  transition={{ duration: reduceMotion ? 0.15 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    className="recipe-book-cover"
                    aria-expanded="false"
                    aria-controls="story-book-pages"
                    onClick={() => setIsBookOpen(true)}
                  >
                    <span className="recipe-cover-kicker">The Food Investors Society</span>
                    <span className="recipe-cover-title">Our Story:<br />The Recipe</span>
                    <span className="recipe-cover-mark" aria-hidden="true">✦</span>
                    <span className="recipe-cover-action">Open book <ArrowRight /></span>
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="pages"
                  id="story-book-pages"
                  className="recipe-book-pages is-open"
                  aria-label="Our Story: The Recipe"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scaleX: 0.72, rotateX: 5 }}
                  animate={{ opacity: 1, scaleX: 1, rotateX: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scaleX: 0.82 }}
                  transition={{ duration: reduceMotion ? 0.15 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="book-spine" aria-hidden="true" />
                  <div className="story-intro recipe-page recipe-page-left">
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
                    <div className="recipe-page-actions">
                      <Button asChild variant="movement" size="lg">
                        <Link to="/">
                          Join the movement <ArrowRight />
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => {
                          setActiveMilestone(null);
                          setIsBookOpen(false);
                        }}
                      >
                        Close book
                      </Button>
                    </div>
                  </div>
                  <div className="recipe-page recipe-page-right">
                    <p className="recipe-method-title">Method &amp; Ingredients for Change</p>
                    <ol className="timeline">
                      {milestones.map((milestone, index) => {
                        const isActive = activeMilestone === index;
                        return (
                          <li key={milestone} className={isActive ? "is-active" : ""}>
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <section id="founders" className="founders-section">
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
