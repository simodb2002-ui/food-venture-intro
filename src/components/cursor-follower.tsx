import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTORS = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "[role='button']",
  "[role='link']",
].join(", ");

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function CursorFollower() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [onDark, setOnDark] = useState(false);
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
      setVisible(true);
      setHovering(Boolean(target?.closest(INTERACTIVE_SELECTORS)));
      setOnDark(Boolean(target?.closest('[data-cursor="dark"]')));
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={dotRef}
      className={`cursor-follower${visible ? " cursor-follower--visible" : ""}${hovering ? " cursor-follower--hover" : ""}${onDark ? " cursor-follower--dark" : ""}`}
      aria-hidden="true"
    />
  );
}
