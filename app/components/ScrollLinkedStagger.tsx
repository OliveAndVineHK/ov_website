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
      this amount (so they appear to fall into place).
      v2 (2026-06-16): bumped 24 → 34 so the rise reads as movement while
      the user scrolls (paired with the slower per-frame smoothing below). */
  distance?: number;
  className?: string;
}

export default function ScrollLinkedStagger({
  children,
  itemSelector = "[data-scroll-item]",
  range = [0.05, 0.55],
  distance = 34,
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
      el.style.transition = "opacity 340ms ease-out, transform 340ms ease-out";
      el.style.opacity = "0";
      el.style.transform = `translateY(-${distance}px)`;
    });

    let frame = 0;
    const update = () => {
      frame = 0;
      const viewH = window.innerHeight || document.documentElement.clientHeight;

      // v3 (2026-06-16): reveal is now decided PER ITEM by its own position
      // in the viewport, not by the section's scroll progress. The old
      // progress mapping meant that on a tall display the items below the
      // section heading were still tied to scroll=0 and stayed hidden on
      // first paint — content looked half-built. Now any item already on
      // screen at load shows immediately, while items further down still
      // rise in (and reverse on scroll-up) as they cross the trigger line.
      const trigger = viewH - 60;
      items.forEach((el) => {
        const revealed = el.getBoundingClientRect().top < trigger;
        el.style.opacity = revealed ? "1" : "0";
        el.style.transform = revealed ? "translateY(0)" : `translateY(-${distance}px)`;
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
