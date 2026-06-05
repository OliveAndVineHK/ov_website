"use client";

import { useEffect, useRef, ReactNode } from "react";

/* ScrollLinkedStagger — scroll-progress-driven sequential reveal.

   Unlike SectionReveal (which triggers a one-shot transition when the
   element enters the viewport), this component ties each child's reveal
   to the user's scroll position through the section. Scrolling further
   reveals more items; scrolling back hides them again. This produces the
   "items follow your scroll" feel used on the lifecycle/timeline grids.

   Children to be staggered must carry a data attribute (default
   data-scroll-item) so we can find them without coupling to tag names.

   range = [start, end] expressed as a fraction of the section's
   travel through the viewport (0 = section top hits viewport bottom,
   1 = section bottom hits viewport top). Defaults to [0.05, 0.55] —
   the staircase finishes a bit before the section scrolls fully past,
   so the last card is fully visible before it leaves the screen.

   `prefers-reduced-motion: reduce` short-circuits to all items shown.
   ────────────────────────────────────────────────────────────────── */

interface Props {
  children: ReactNode;
  itemSelector?: string;
  range?: [number, number];
  /** Slide distance in px. Items start above their final position by
      this amount (so they appear to fall into place). Default 24px. */
  distance?: number;
  className?: string;
}

export default function ScrollLinkedStagger({
  children,
  itemSelector = "[data-scroll-item]",
  range = [0.05, 0.55],
  distance = 24,
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll<HTMLElement>(itemSelector));
    if (items.length === 0) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      items.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
      return;
    }

    // Initialise hidden + ready to transition smoothly per-frame.
    items.forEach((el) => {
      el.style.willChange = "opacity, transform";
      el.style.transition = "opacity 200ms ease-out, transform 200ms ease-out";
      el.style.opacity = "0";
      el.style.transform = `translateY(-${distance}px)`;
    });

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight || document.documentElement.clientHeight;
      const sectionH = rect.height;

      // travelled = how far the section has scrolled through the viewport.
      // 0 when section top hits viewport bottom (just entering).
      // 1 when section bottom hits viewport top (just leaving).
      const travelled = (viewH - rect.top) / (viewH + sectionH);
      const clamped = Math.max(0, Math.min(1, travelled));

      const [rs, re] = range;
      const itemProgress = Math.max(0, Math.min(1, (clamped - rs) / (re - rs)));

      const n = items.length;
      items.forEach((el, i) => {
        const start = i / n;
        const end = (i + 1) / n;
        const local = Math.max(0, Math.min(1, (itemProgress - start) / (end - start)));
        el.style.opacity = String(local);
        el.style.transform = `translateY(${(-distance * (1 - local)).toFixed(2)}px)`;
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    // Run update across the first several animation frames so that
    // browser back-nav scroll restoration (which lands AFTER mount on
    // Next.js App Router) is captured even if it doesn't fire a scroll
    // event. Without this, items stay hidden on back-nav because the
    // single mount-time update() saw scroll=0.
    update();
    let restoreFrames = 0;
    const restorePoll = () => {
      update();
      restoreFrames++;
      if (restoreFrames < 6) {
        requestAnimationFrame(restorePoll);
      }
    };
    requestAnimationFrame(restorePoll);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // pageshow fires on bfcache restore — re-run to catch that path too
    window.addEventListener("pageshow", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pageshow", onScroll);
    };
  }, [itemSelector, range, distance]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
