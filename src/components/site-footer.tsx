import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

import fisLogoFooter from "@/assets/fis-logo-footer.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerGroups = [
  {
    title: "Support us",
    links: [
      ["Join", "/join"],
      ["Become a Supporter", "/join"],
      ["Volunteer", "/join"],
      ["Donate", "/join"],
    ],
  },
  {
    title: "Information",
    links: [
      ["Our story", "/about#story"],
      ["Our people", "/about#founders"],
      ["Documents & Policies", "/about#footer"],
      ["FAQ", "/about#footer"],
      ["Contact", "/about#footer"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/about#footer"],
      ["Terms & Conditions", "/about#footer"],
      ["Cookie Policy", "/about#footer"],
      ["Cookie Settings", "/about#footer"],
    ],
  },
];

/** Lucide has no TikTok glyph, so this matches its stroke-icon proportions. */
function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.6 5.82c-1.02-.9-1.6-2.19-1.6-3.62h-3.14v13.44a2.6 2.6 0 1 1-2.6-2.6c.19 0 .38.02.56.05V9.9a5.75 5.75 0 0 0-.56-.03A5.77 5.77 0 1 0 15 15.64V9.4a7.16 7.16 0 0 0 4.19 1.34V7.6a4.4 4.4 0 0 1-2.6-1.78Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", Icon: Facebook },
  { label: "Instagram", Icon: Instagram },
  { label: "X", Icon: Twitter },
  { label: "TikTok", Icon: TikTokIcon },
  { label: "LinkedIn", Icon: Linkedin },
  { label: "YouTube", Icon: Youtube },
];

export function SiteFooter() {
  return (
    <footer
      id="footer"
      data-cursor-dark
      className="border-t-8 border-cta-accent bg-footer px-6 py-16 font-display text-footer-foreground sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Newsletter + supporters */}
        <div className="grid gap-12 border-b border-footer-foreground/10 pb-12 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-extrabold uppercase text-cta-accent">Stay in the Loop</h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-footer-muted">
              Join our monthly newsletter for Society updates, membership news, and ways to support
              a fairer food future.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                className="h-11 rounded-full border-footer-foreground/30 bg-footer-foreground/5 px-5 text-footer-foreground placeholder:text-footer-muted"
              />
              <Button
                type="submit"
                className="h-11 shrink-0 bg-footer-foreground px-6 text-footer hover:bg-footer-foreground/90"
              >
                Get updates
              </Button>
            </form>
            <p className="mt-3 text-xs text-footer-muted">
              Unsubscribe anytime. See our{" "}
              <a href="/about#footer" className="text-cta-accent hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase text-cta-accent">Our Supporters</h3>
            <div className="mt-6 flex flex-wrap gap-4" aria-label="Our supporters">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="h-16 w-16 shrink-0 rounded-full bg-footer-foreground/10"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-12 pt-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" aria-label="Food Investors Society home">
              <img
                src={fisLogoFooter}
                alt="Food Investors Society"
                className="h-20 w-auto bg-transparent object-contain"
              />
            </Link>
            <h3 className="mt-6 text-xs font-extrabold uppercase text-cta-accent">
              Stay Connected
            </h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-footer-muted">
              Follow our journey as we build the UK&apos;s first community-owned digital food
              platform.
            </p>
            <div className="mt-6 flex flex-wrap gap-3" aria-label="Social links">
              {socialLinks.map(({ label, Icon }) => (
                <Button
                  key={label}
                  asChild
                  variant="outline"
                  size="icon"
                  className="rounded-full border-footer-foreground/40 bg-transparent text-footer-foreground hover:bg-footer-foreground hover:text-footer"
                >
                  <a href="#footer" aria-label={label}>
                    <Icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-xs font-extrabold uppercase text-cta-accent">{group.title}</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      className="text-footer-muted transition-colors hover:text-footer-foreground"
                      href={href}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-footer-foreground/10 pt-8 text-xs text-footer-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 The Food Investors Society — All rights reserved.</p>
          <p>Community-owned. People-powered.</p>
        </div>
      </div>
    </footer>
  );
}
