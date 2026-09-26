import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import fisLockup from "@/assets/food-investors-society-lockup.png.asset.json";
import { Button } from "@/components/ui/button";
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
        "z-50 border-b border-border bg-background/90 font-display backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Food Investors Society home" className="shrink-0">
          <img
            src={fisLockup.url}
            alt="Food Investors Society"
            className="h-10 w-auto bg-transparent object-contain mix-blend-multiply sm:h-12"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 self-stretch text-sm font-bold text-foreground md:flex lg:gap-9"
        >
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              aria-current={active === item.key ? "page" : undefined}
              className={cn(
                "relative flex h-full items-center whitespace-nowrap transition-opacity hover:opacity-60",
                active === item.key &&
                  "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-problem",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 flex-col items-end justify-center rounded-full border border-foreground px-4 py-2 text-right leading-tight text-foreground sm:flex sm:px-5">
          <span className="text-[0.62rem] font-extrabold uppercase sm:text-xs">Invest in food</span>
          <span className="text-[0.62rem] font-extrabold uppercase sm:text-xs">Reap the wHealth</span>
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

      {open && (
        <nav
          aria-label="Mobile navigation"
          className="grid border-t border-border bg-background px-4 py-2 text-sm font-bold text-foreground md:hidden"
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
