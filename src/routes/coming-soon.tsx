import { createFileRoute } from "@tanstack/react-router";
import { Check, ChefHat, ScanLine, UsersRound } from "lucide-react";

import communityImage from "@/assets/coming-soon/community.jpg";
import cookImage from "@/assets/coming-soon/cook.jpg";
import foodX100Image from "@/assets/coming-soon/foodx100.jpg";
import { Button } from "@/components/ui/button";
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

function ComingSoonPage() {
  return (
    <div className="coming-page min-h-dvh bg-cta text-cta-foreground">
      <SiteHeader active="coming-soon" className="sticky top-0" />
      <main className="mx-auto w-[min(1160px,calc(100%-40px))] pb-24">
        <section className="mx-auto max-w-3xl pt-20 pb-16 text-center md:pt-28">
          <span className="inline-flex rounded-full bg-problem/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-problem">
            The next chapter
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            More of foodXchange is on the way
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cta-muted">
            Discover what&apos;s coming next with an early preview of three future foodXchange
            features. Explore them first on the web, then continue the experience when the full
            foodXchange app launches.
          </p>
        </section>

        <section className="flex flex-col gap-8" aria-label="Future foodXchange features">
          {features.map(({ title, Icon, image, alt, reverse, description, bullets }) => (
            <article
              key={title}
              className="group grid items-center gap-8 rounded-3xl border border-border/50 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md md:grid-cols-2 md:gap-12 md:p-10"
            >
              <div className={`overflow-hidden rounded-xl ${reverse ? "md:order-2" : ""}`}>
                <img
                  src={image}
                  alt={alt}
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-solution/15 text-solution-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cta-muted">
                    Coming soon
                  </span>
                </div>
                <h2 className="mt-6 text-3xl font-bold tracking-tight">{title}</h2>
                <p className="mt-4 text-base leading-relaxed text-cta-muted">{description}</p>
                <ul className="mt-6 space-y-3">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm font-medium leading-relaxed">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-problem text-problem-foreground">
                        <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>

        <section className="relative mt-16 overflow-hidden rounded-3xl bg-footer px-6 py-16 text-center text-footer-foreground md:px-12 md:py-20">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-solution" aria-hidden="true" />
          <span className="inline-flex rounded-full bg-footer-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-solution">
            Stay close
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
            Want to follow the launch?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-footer-muted">
            Join the Society or sign up for news, and you&apos;ll be among the first to hear when
            these next features become available.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-solution px-8 font-semibold text-solution-foreground hover:bg-solution/90"
            >
              <a href="/#membership">Explore membership</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-footer-foreground/30 bg-transparent px-8 font-semibold text-footer-foreground hover:bg-footer-foreground/10 hover:text-footer-foreground"
            >
              <a href="/about#newsletter">Sign up for news</a>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
