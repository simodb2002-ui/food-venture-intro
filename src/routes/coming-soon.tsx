import { createFileRoute } from "@tanstack/react-router";
import { Check, ChefHat, Rocket, ScanLine, Sparkles, Star, UsersRound } from "lucide-react";
import { motion } from "motion/react";

import communityImage from "@/assets/coming-soon/community.jpg";
import cookImage from "@/assets/coming-soon/cook.jpg";
import foodX100Image from "@/assets/coming-soon/foodx100.jpg";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "../coming-soon.css";

export const Route = createFileRoute("/coming-soon")({
  head: () => ({
    meta: [
      { title: "Coming Soon | Food Investors Society" },
      {
        name: "description",
        content: "Preview FoodX100, FoodXCommunity and Cook — three future foodXchange features.",
      },
      { property: "og:title", content: "More of foodXchange is on the way" },
      {
        property: "og:description",
        content: "Explore an early preview of three future foodXchange features.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComingSoonPage,
});

const features = [
  {
    title: "FoodX100",
    Icon: ScanLine,
    image: foodX100Image,
    alt: "Man scanning a grocery product with his smartphone",
    description:
      "A miniature version of the foodXchange app database, designed as a simple trial so users can explore 100 products before the full experience launches.",
    bullets: [
      "Try a curated 100-product version of the wider app database",
      "Compare nutrition, ingredients, additives, and price",
      "See how foodXchange will make product choices clearer at a glance",
    ],
  },
  {
    title: "FoodXCommunity",
    Icon: UsersRound,
    image: communityImage,
    alt: "Outdoor local produce stall",
    reverse: true,
    description:
      "A local directory and discovery space for independent food businesses, community food projects, and neighbourhood initiatives working towards a better food system.",
    bullets: [
      "Discover local food projects and independent businesses",
      "Support community-rooted food activity in your area",
      "Make it easier to connect with good food near you",
    ],
  },
  {
    title: "Cook",
    Icon: ChefHat,
    image: cookImage,
    alt: "Cooking a colourful meal in a pan on a stove",
    description:
      "A practical space for recipes, cooking guidance, and kitchen shortcuts aimed at making everyday good food easier, faster, and more affordable.",
    bullets: [
      "Quick recipe ideas and meal inspiration",
      "Simple hacks to make cooking feel less overwhelming",
      "Practical support for building confidence in the kitchen",
    ],
  },
];

const floaters = [
  { Icon: ChefHat, cls: "left-[6%] top-[18%] size-10", delay: "0s" },
  { Icon: ScanLine, cls: "right-[8%] top-[28%] size-12", delay: "1.2s" },
  { Icon: UsersRound, cls: "left-[4%] top-[55%] size-11", delay: "2.4s" },
  { Icon: Sparkles, cls: "right-[5%] top-[62%] size-8", delay: "0.6s" },
  { Icon: Star, cls: "left-[48%] top-[10%] size-6", delay: "1.8s" },
  { Icon: Sparkles, cls: "left-[10%] top-[85%] size-7", delay: "3s" },
  { Icon: Star, cls: "right-[12%] top-[88%] size-6", delay: "2s" },
];

const masks = ["cs-arch aspect-[4/5]", "cs-blob aspect-square", "cs-rounded aspect-[4/3]"];

function ComingSoonPage() {
  return (
    <div className="coming-page min-h-dvh">
      <SiteHeader active="coming-soon" className="sticky top-0" />
      <div className="relative overflow-hidden">
        <div className="cs-orb pink left-[-8%] top-[8%] size-[420px]" aria-hidden="true" />
        <div className="cs-orb violet right-[-10%] top-[30%] size-[480px]" aria-hidden="true" />
        <div className="cs-orb gold left-[20%] top-[60%] size-[380px]" aria-hidden="true" />
        <div className="cs-orb pink right-[10%] top-[82%] size-[360px]" aria-hidden="true" />
        {floaters.map(({ Icon, cls, delay }, i) => (
          <Icon
            key={i}
            className={`cs-float hidden md:block ${cls}`}
            style={{ animationDelay: delay }}
            strokeWidth={1.4}
            aria-hidden="true"
          />
        ))}

        <main className="relative mx-auto w-[min(1160px,calc(100%-40px))] pb-24">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-3xl pt-20 pb-16 text-center md:pt-28"
          >
            <span className="cs-badge inline-flex">The next chapter</span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              More of <span className="cs-gradient-text">foodXchange</span> is{" "}
              <span className="cs-gradient-text">on the way</span>
            </h1>
            <p className="cs-muted mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
              Discover what&apos;s coming next with an early preview of three future foodXchange
              features. Explore them first on the web, then continue the experience when the full
              foodXchange app launches.
            </p>
          </motion.section>

          <section className="flex flex-col gap-14" aria-label="Future foodXchange features">
            {features.map(({ title, Icon, image, alt, reverse, description, bullets }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
                className="cs-card grid items-center gap-8 rounded-[2.5rem] p-6 md:grid-cols-2 md:gap-14 md:p-10"
              >
                <div className={`relative mx-auto w-full max-w-md ${reverse ? "md:order-2" : ""}`}>
                  {i === 2 && (
                    <span className="cs-sticker" aria-hidden="true">
                      Fresh
                      <br />
                      soon!
                    </span>
                  )}
                  <div className={`cs-mask ${masks[i]}`}>
                    <img
                      src={image}
                      alt={alt}
                      loading="lazy"
                      width={1200}
                      height={912}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="cs-icon grid size-11 place-items-center rounded-2xl">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="cs-badge">Coming soon</span>
                  </div>
                  <h2 className="mt-6 text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
                  <p className="cs-muted mt-4 text-base leading-relaxed">{description}</p>
                  <ul className="mt-6 space-y-3">
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm font-medium leading-relaxed">
                        <span className="cs-check mt-0.5 grid size-5 shrink-0 place-items-center rounded-full">
                          <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </section>

          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="cs-cta relative mt-20 overflow-hidden rounded-[2.5rem] px-6 py-16 text-center md:px-12 md:py-20"
          >
            <Rocket className="cs-float left-[8%] top-[20%] size-12 -rotate-12" aria-hidden="true" />
            <Sparkles className="cs-float right-[10%] top-[18%] size-9" style={{ animationDelay: "1s" }} aria-hidden="true" />
            <Star className="cs-float bottom-[15%] right-[18%] size-6" style={{ animationDelay: "2s" }} aria-hidden="true" />
            <span className="cs-badge inline-flex">Stay close</span>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight md:text-5xl">
              Want to follow the <span className="cs-gradient-text">launch?</span>
            </h2>
            <p className="cs-muted mx-auto mt-5 max-w-2xl text-lg leading-relaxed">
              Join the Society or sign up for news, and you&apos;ll be among the first to hear when
              these next features become available.
            </p>
            <div className="relative mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="/#membership" className="cs-btn-gold rounded-full px-8 py-3 font-bold">
                Explore membership
              </a>
              <a href="/about#newsletter" className="cs-btn-outline rounded-full px-8 py-3 font-semibold">
                Sign up for news
              </a>
            </div>
          </motion.section>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
