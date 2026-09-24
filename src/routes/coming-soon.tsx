import { createFileRoute } from "@tanstack/react-router";
import { ChefHat, ScanLine, UsersRound } from "lucide-react";

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

function ComingSoonPage() {
  return (
    <div className="coming-page">
      <SiteHeader active="coming-soon" className="sticky top-0" />
      <main>
        <section className="coming-intro">
          <p className="coming-kicker">The next chapter</p>
          <h1>More of foodXchange is on the way</h1>
          <p>
            Discover what&apos;s coming next with an early preview of three future foodXchange
            features. Explore them first on the web, then continue the experience when the full
            foodXchange app launches.
          </p>
        </section>

        <section className="coming-features" aria-label="Future foodXchange features">
          {features.map(({ title, Icon, image, alt, reverse, description, bullets }) => (
            <article key={title} className={`coming-card${reverse ? " is-reverse" : ""}`}>
              <div className="coming-image-wrap">
                <img src={image} alt={alt} loading="lazy" width={1200} height={912} />
                <span className="coming-badge">Coming soon</span>
              </div>
              <div className="coming-card-copy">
                <div className="coming-title-row">
                  <Icon aria-hidden="true" />
                  <h2>{title}</h2>
                </div>
                <p>{description}</p>
                <ul>
                  {bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>

        <section className="coming-cta">
          <p className="coming-kicker">Stay close</p>
          <h2>Want to follow the launch?</h2>
          <p>
            Join the Society or sign up for news, and you&apos;ll be among the first to hear when
            these next features become available.
          </p>
          <div className="coming-actions">
            <a className="coming-primary" href="/#membership">
              Explore membership
            </a>
            <a className="coming-secondary" href="/about#newsletter">
              Sign up for news
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
