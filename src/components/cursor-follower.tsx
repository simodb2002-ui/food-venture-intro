import { useEffect, useRef, useState } from "react";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Resolve any CSS colour string (incl. oklch) to RGBA via a 1px canvas. */
function createColorResolver() {
  const cache = new Map<string, [number, number, number, number]>();
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  return (color: string): [number, number, number, number] => {
    const cached = cache.get(color);
    if (cached) return cached;
    let result: [number, number, number, number] = [255, 255, 255, 0];
    if (ctx && color && color !== "transparent") {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const d = ctx.getImageData(0, 0, 1, 1).data;
      result = [d[0] ?? 255, d[1] ?? 255, d[2] ?? 255, (d[3] ?? 0) / 255];
    }
    cache.set(color, result);
    return result;
  };
}

function luminance(r: number, g: number, b: number) {
  const ch = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
}

export function CursorFollower() {
  const [mounted, setMounted] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const resolve = createColorResolver();

    let rafId: number | null = null;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let hasPointer = false;

    const isDarkAt = (x: number, y: number) => {
      let el = document.elementFromPoint(x, y) as HTMLElement | null;
      if (el?.closest("[data-cursor-dark]")) return true;
      while (el) {
        const bg = getComputedStyle(el).backgroundColor;
        const [r, g, b, a] = resolve(bg);
        if (a >= 0.5) return luminance(r, g, b) < 0.4;
        el = el.parentElement;
      }
      return false;
    };

    const updateColor = () => {
      if (!hasPointer) return;
      setOnDark(isDarkAt(targetX, targetY));
    };

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
      if (!hasPointer) {
        currentX = targetX;
        currentY = targetY;
        hasPointer = true;
      }
      updateColor();
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    let scrollTick = false;
    const onScroll = () => {
      if (scrollTick) return;
      scrollTick = true;
      requestAnimationFrame(() => {
        scrollTick = false;
        updateColor();
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("wheel", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("wheel", onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={dotRef}
      className={`cursor-follower${onDark ? " cursor-follower--dark" : ""}`}
      aria-hidden="true"
    />
  );
}
