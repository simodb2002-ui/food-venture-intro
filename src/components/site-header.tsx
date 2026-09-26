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
          "absolute",
          badgePosition === "corner"
            ? "-right-0.5 -top-0.5 h-3 w-3 rounded-full bg-foreground text-background sm:h-3.5 sm:w-3.5"
            : "h-2.5 w-2.5 text-black sm:h-3 sm:w-3",
        )}
      />
    </span>
  );
}

const pageHeaders: Record<
  SiteHeaderProps["active"],
  { tagline: [string, string]; Icon: () => ReactNode } | null
> = {
  fis: {
    tagline: ["Invest in food", "Reap the wHealth"],
    Icon: () => <IconBadge Base={Heart} Badge={Plus} badgePosition="center" />,
  },
  app: {
    tagline: ["Build wHealth", "one bite at a time"],
    Icon: () => <Apple className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />,
  },
  "coming-soon": {
    tagline: ["Building a better", "food future"],
    Icon: () => <IconBadge Base={Hand} Badge={Sprout} badgePosition="corner" />,
  },
  join: {
    tagline: ["Invest together", "Grow our shared commonwHealth"],
    Icon: () => <IconBadge Base={BarChart3} Badge={ArrowUpRight} badgePosition="corner" />,
  },
  about: null,
};

export function SiteHeader({ active, className }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const header = pageHeaders[active];

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
            src={fisLockup.url}
            alt="Food Investors Society"
            className="h-10 w-auto bg-transparent object-contain mix-blend-multiply sm:h-12"
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

        {/* Fixed width (not content-based) so the nav's centered position never
            shifts between tabs, even when this tab has no tagline/icon (About). */}
        <div className="flex shrink-0 items-center justify-end gap-3 sm:w-80">
          {header && (
            <div className="hidden items-center gap-2 sm:flex sm:gap-3">
              <div className="text-right font-montserrat text-xs font-semibold leading-tight text-foreground sm:text-sm">
                <p className="whitespace-nowrap">{header.tagline[0]}</p>
                <p className="whitespace-nowrap">{header.tagline[1]}</p>
              </div>
              <header.Icon />
            </div>
          )}

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
