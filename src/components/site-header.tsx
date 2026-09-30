import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import fisLockup from "@/assets/fis-logo-transparent.png";
import { Button } from "@/components/ui/button";
import { FoodXchangeMark } from "@/components/foodxchange-mark";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  active: "fis" | "app" | "coming-soon" | "join" | "about";
  className?: string;
};

const navItems = [
  { label: "FIS", href: "/", key: "fis" },
  { label: "App", href: "/app", key: "app" },
  { label: "Coming Soon", href: "/coming-soon", key: "coming-soon" },
  { label: "Join", href: "/join", key: "join" },
  { label: "About", href: "/about", key: "about" },
] as const;

export function SiteHeader({ active, className }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "z-50 backdrop-blur-md",
        active === "about" ? "bg-white" : "bg-background/90",
        className,
      )}
    >
      <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-3 border-b border-border px-4 py-2 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Food Investors Society home" className="shrink-0">
          <img
            src={fisLockup}
            alt="Food Investors Society"
            className="h-10 w-auto object-contain sm:h-12"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center justify-center gap-6 self-stretch font-montserrat text-sm font-bold text-foreground md:flex md:flex-1 lg:gap-9"
        >
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              aria-current={active === item.key ? "page" : undefined}
              className="flex h-full items-center whitespace-nowrap transition-opacity hover:opacity-60"
            >
              <span
                className={cn(
                  "relative",
                  active === item.key &&
                    "after:absolute after:-bottom-1 after:inset-x-0 after:h-0.5 after:bg-problem",
                )}
              >
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-3">
          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-foreground px-3 py-2 sm:flex sm:gap-3 sm:px-5">
            <span className="whitespace-nowrap text-[0.52rem] font-extrabold uppercase leading-[0.85] text-foreground sm:text-[0.6rem]">
              Powered by
            </span>
            <span className="h-4 w-px bg-border" aria-hidden="true" />
            <span className="flex items-center gap-1.5">
              <FoodXchangeMark reduce basketColor="#0a0a0a" className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="whitespace-nowrap font-montserrat text-xs font-bold text-foreground sm:text-sm">
                foodXchange
              </span>
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile navigation"
          className="grid bg-background px-4 py-2 font-montserrat text-sm font-bold text-foreground md:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              aria-current={active === item.key ? "page" : undefined}
              className={cn(
                "border-b border-border/60 px-2 py-3 last:border-0",
                active === item.key && "text-problem",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/**
 * Pill shown just below the header on each page, carrying that page's
 * one-line strapline (mirrors the "About" page's hero tagline pill).
 *
 * Owns its own full-width row and the header's exact max-w-7xl/px
 * container, rather than being nested in each page's own (differently
 * sized) content column, so the pill lands in the identical spot below
 * the logo on every route — only its text and resulting width change.
 * The top padding (26px) matches the About page's own hero tagline
 * pill, measured at 90px from the viewport top (64px header + 26px),
 * so every route's pill sits on the same y-axis as About's.
 * `barClassName` is for the row (e.g. a background on pages where the
 * header floats over content); `className` styles the pill itself.
 */
export function Strapline({
  text,
  barClassName = "",
  className = "",
}: {
  text: ReactNode;
  barClassName?: string;
  className?: string;
}) {
  return (
    <div className={cn("w-full", barClassName)}>
      <div className="mx-auto max-w-7xl px-4 pt-[26px] pb-2 sm:px-6 lg:px-8">
        <div
          className={cn(
            "inline-flex items-center gap-2.5 rounded-full border-2 border-solution px-3.5 py-2 text-xs font-bold",
            className,
          )}
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-problem" aria-hidden="true" />
          {/* A real element, not a bare fragment: the pill is a gap-flex
              row, so an unwrapped fragment's children (the leading text,
              the pink "H" span, the trailing text) would each land as
              their own flex item and pick up the gap between them. */}
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}
