import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Play } from "lucide-react";

import fisLogoFooter from "@/assets/fis-logo-footer.png";
import { Button } from "@/components/ui/button";

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
      ["Contact", "/about#footer"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/about#footer"],
      ["Terms & Conditions", "/about#footer"],
      ["Cookie Policy", "/about#footer"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer
      id="footer"
      data-cursor-dark
      className="border-t-8 border-cta-accent bg-footer px-6 py-16 font-display text-footer-foreground sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" aria-label="Food Investors Society home">
              <img
                src={fisLogoFooter}
                alt="Food Investors Society"
                className="h-20 w-auto bg-transparent object-contain"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-footer-muted">
              The UK&apos;s first community-owned digital food platform.
            </p>
            <div className="mt-6 flex gap-3" aria-label="Social links">
              {[
                { label: "Instagram", Icon: Instagram },
                { label: "LinkedIn", Icon: Linkedin },
                { label: "Video channel", Icon: Play },
              ].map(({ label, Icon }) => (
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
