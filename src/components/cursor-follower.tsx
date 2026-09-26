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

    /** Colour of a simple linear-gradient at the pointer, or null. */
    const gradientColorAt = (
      image: string,
      rect: DOMRect,
      x: number,
      y: number,
    ): [number, number, number, number] | null => {
      const start = image.indexOf("linear-gradient(");
      if (start === -1) return null;
      // Extract the gradient body, respecting nested parentheses.
      let depth = 0;
      let body = "";
      for (let i = start + "linear-gradient(".length; i < image.length; i++) {
        const ch = image[i]!;
        if (ch === "(") depth++;
        if (ch === ")") {
          if (depth === 0) break;
          depth--;
        }
        body += ch;
      }
      const parts: string[] = [];
      depth = 0;
      let buf = "";
      for (const ch of body) {
        if (ch === "(") depth++;
        if (ch === ")") depth--;
        if (ch === "," && depth === 0) {
          parts.push(buf.trim());
          buf = "";
        } else buf += ch;
      }
      if (buf.trim()) parts.push(buf.trim());

      let axis: "y" | "x" = "y";
      let reverse = false;
      const first = parts[0] ?? "";
      if (/^(to |\d|-?\d*\.?\d+deg|in )/.test(first)) {
        parts.shift();
        if (/to top|0deg|360deg/.test(first)) reverse = true;
        else if (/to right|90deg/.test(first)) axis = "x";
        else if (/to left|270deg/.test(first)) {
          axis = "x";
          reverse = true;
        } else if (/deg/.test(first) && !/180deg/.test(first)) return null;
      }

      const stops: { color: [number, number, number, number]; pos: number | null }[] = [];
      for (const part of parts) {
        const m = part.match(/^(.*?)(?:\s+(-?\d*\.?\d+)%)?(?:\s+(-?\d*\.?\d+)%)?$/);
        if (!m) continue;
        const color = resolve(m[1]!.trim());
        stops.push({ color, pos: m[2] !== undefined ? Number(m[2]) : null });
        if (m[3] !== undefined) stops.push({ color, pos: Number(m[3]) });
      }
      if (stops.length < 2) return null;
      if (stops[0]!.pos === null) stops[0]!.pos = 0;
      if (stops[stops.length - 1]!.pos === null) stops[stops.length - 1]!.pos = 100;
      for (let i = 1; i < stops.length - 1; i++) {
        if (stops[i]!.pos !== null) continue;
        let j = i;
        while (stops[j]!.pos === null) j++;
        const a = stops[i - 1]!.pos!;
        const bPos = stops[j]!.pos!;
        for (let k = i; k < j; k++) {
          stops[k]!.pos = a + ((bPos - a) * (k - i + 1)) / (j - i + 1);
        }
      }

      const size = axis === "y" ? rect.height : rect.width;
      if (size <= 0) return null;
      let pct = ((axis === "y" ? y - rect.top : x - rect.left) / size) * 100;
      if (reverse) pct = 100 - pct;

      if (pct <= stops[0]!.pos!) return stops[0]!.color;
      for (let i = 1; i < stops.length; i++) {
        const a = stops[i - 1]!;
        const b = stops[i]!;
        if (pct <= b.pos!) {
          const t = b.pos! === a.pos! ? 1 : (pct - a.pos!) / (b.pos! - a.pos!);
          return [
            lerp(a.color[0], b.color[0], t),
            lerp(a.color[1], b.color[1], t),
            lerp(a.color[2], b.color[2], t),
            lerp(a.color[3], b.color[3], t),
          ];
        }
      }
      return stops[stops.length - 1]!.color;
    };

    const isDarkAt = (x: number, y: number) => {
      let el = document.elementFromPoint(x, y) as HTMLElement | null;
      if (el?.closest("[data-cursor-dark]")) return true;
      while (el) {
        const style = getComputedStyle(el);
        const [r, g, b, a] = resolve(style.backgroundColor);
        if (a >= 0.5) return luminance(r, g, b) < 0.4;
        if (style.backgroundImage && style.backgroundImage !== "none") {
          const c = gradientColorAt(style.backgroundImage, el.getBoundingClientRect(), x, y);
          if (c && c[3] >= 0.5) return luminance(c[0], c[1], c[2]) < 0.4;
        }
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
