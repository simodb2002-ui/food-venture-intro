import { Link } from "@tanstack/react-router";
import {
  Apple,
  ArrowUpRight,
  BarChart3,
  Hand,
  Heart,
  Menu,
  Plus,
  Sprout,
  X,
  type LucideIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";

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

/** Base icon with a small badge icon layered on top, for composite marks. */
function IconBadge({
  Base,
  Badge,
  badgePosition = "corner",
}: {
  Base: LucideIcon;
  Badge: LucideIcon;
  badgePosition?: "corner" | "center";
}) {
  return (
    <span className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center sm:h-7 sm:w-7">
      <Base className="h-full w-full" aria-hidden="true" />
      <Badge
        aria-hidden="true"
        className={cn(
          "absolute text-background",
          badgePosition === "corner"
            ? "-right-0.5 -top-0.5 h-3 w-3 rounded-full bg-foreground sm:h-3.5 sm:w-3.5"
            : "h-2.5 w-2.5 sm:h-3 sm:w-3",
        )}
      />
    </span>
  );
}

const pageHeaders: Record<
  SiteHeaderProps["active"],
  { title: string; tagline: [string, string]; Icon: () => ReactNode } | null
> = {
  fis: {
    title: "Our CommonwHealth",
    tagline: ["Invest in food", "Reap the wHealth"],
    Icon: () => <IconBadge Base={Heart} Badge={Plus} badgePosition="center" />,
  },
  app: {
    title: "foodXchange",
    tagline: ["Build wHealth", "one bite at a time"],
    Icon: () => <Apple className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />,
  },
  "coming-soon": {
    title: "What’s Coming Next",
    tagline: ["Building a better", "food future"],
    Icon: () => <IconBadge Base={Hand} Badge={Sprout} badgePosition="corner" />,
  },
  join: {
    title: "Become a Member",
    tagline: ["Invest together", "Grow our shared commonwHealth"],
    Icon: () => <IconBadge Base={BarChart3} Badge={ArrowUpRight} badgePosition="corner" />,
  },
  about: null,
};

export function SiteHeader({ active, className }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const header = pageHeaders[active];

  return (
    <header className={cn("z-50 bg-background/90 backdrop-blur-md", className)}>
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 border-b border-border px-4 py-2 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Food Investors Society home" className="shrink-0">
          <img
            src={fisLockup.url}
            alt="Food Investors Society"
            className="h-10 w-auto bg-transparent object-contain mix-blend-multiply sm:h-12"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 self-stretch font-montserrat text-sm font-bold text-foreground md:flex lg:gap-9"
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

      {header && (
        <div className="px-4 py-3 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <h2 className="font-montserrat text-lg font-bold text-foreground sm:text-2xl">
              {header.title}
            </h2>
            <div className="flex items-center gap-3">
              <div className="text-right font-montserrat text-[0.62rem] font-extrabold uppercase leading-tight text-foreground sm:text-xs">
                <p>{header.tagline[0]}</p>
                <p>{header.tagline[1]}</p>
              </div>
              <header.Icon />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
