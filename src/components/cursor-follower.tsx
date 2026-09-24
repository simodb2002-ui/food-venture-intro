import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTORS = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "[role='button']",
  "[role='link']",
  ".belief-card",
  ".founder-card",
  ".platform-badge",
  ".menu-button",
  ".scroll-cue",
  ".reveal-prompt",
  ".socials a",
].join(", ");

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function CursorFollower() {
  const [mounted, setMounted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [exploring, setExploring] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.18);
      currentY = lerp(currentY, targetY, 0.18);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest(INTERACTIVE_SELECTORS)));
      setExploring(Boolean(target?.closest(".hero-section")));
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const onScroll = () => setExploring(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={dotRef}
      className={`cursor-follower${hovering ? " cursor-follower--hover" : ""}${exploring ? " cursor-follower--explore" : ""}`}
      aria-hidden="true"
    >
      <span>Explore <small>our society</small></span>
    </div>
  );
}
