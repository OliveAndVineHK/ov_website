"use client";

import { useEffect, useLayoutEffect, useRef, useState, ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  stagger?: boolean;
  staggerSelector?: string;
  staggerStep?: number;
  /** Reveal direction.
      "up"   — element starts BELOW its final position and slides up (default)
      "down" — element starts ABOVE its final position and slides down */
  direction?: "up" | "down";
  duration?: number;
  distance?: number;
  className?: string;
}

/* useIsomorphicLayoutEffect — same as useLayoutEffect on the client,
   silent no-op on the server so SSR doesn't warn. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* SectionReveal v5 (S4 — default visible) — 2026-06-04
   ─────────────────────────────────────────────────────────────────

   THE PREVIOUS PROBLEM
   v1–v4 all started with `revealed = false` (opacity 0). On Next.js
   back-nav the component re-mounted in that hidden state, then
   relied on IntersectionObserver / scroll listeners to flip it to
   revealed. Edge cases in those listeners (scroll restoration
   jumping THROUGH the viewport, bfcache restore timing, etc.) left
   sections permanently invisible.

   S4 INVERTS THE DEFAULT
   Initial state is now `revealed = true` — the rendered HTML is
   always VISIBLE. SSR output is always visible. Hydration matches.

   Animation only fires for elements that are below the viewport
   when the component mounts. For those, we synchronously flip
   `revealed` to false inside useLayoutEffect (BEFORE paint), then
   set up a scroll listener that flips it back to true when the
   element scrolls into view.

   FAILURE MODE: VISIBLE
   If anything goes wrong (scroll restoration race, JS disabled,
   useLayoutEffect skipped, observer never fires) the default state
   wins: the section is shown. Worst case the user misses a fade —
   they never lose the content.
   ───────────────────────────────────────────────────────────────── */
export default function SectionReveal({
  children,
  delay = 0,
  stagger = false,
  staggerSelector = "li, .stagger-item",
  staggerStep = 80,
  direction = "up",
  duration = 350,
  distance = 20,
  className = "",
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(true);
  const restY = direction === "down" ? -distance : distance;

  /* useLayoutEffect runs synchronously after DOM commit, before
     paint. If the element is below the viewport on mount, we hide
     it here so the very first paint shows it hidden (no flash). */
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // Reduced motion — keep visible, no animation.
      return;
    }

    const rect = el.getBoundingClientRect();
    const viewH = window.innerHeight || document.documentElement.clientHeight;
    const isBelowViewport = rect.top > viewH - 50;

    if (isBelowViewport) {
      setRevealed(false);
    }
  }, []);

  /* When hidden, listen for scroll/resize/pageshow and reveal once
     the element enters the viewport. */
  useEffect(() => {
    if (revealed) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const check = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < viewH - 50) {
        setRevealed(true);
      }
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pageshow", onScroll);

    // Initial check in case the element became visible between
    // useLayoutEffect and now (e.g., scroll restoration landing).
    onScroll();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pageshow", onScroll);
    };
  }, [revealed]);

  /* Stagger children on transition to revealed. */
  useEffect(() => {
    if (!revealed || !stagger || !ref.current) return;
    const items = ref.current.querySelectorAll<HTMLElement>(staggerSelector);
    items.forEach((element, index) => {
      element.style.opacity = "0";
      element.style.transform = `translateY(${direction === "down" ? -10 : 10}px)`;
      element.style.transition = "none";
      requestAnimationFrame(() => {
        const staggerDelay = delay + index * staggerStep;
        const itemDuration = Math.max(300, duration);
        element.style.transition = `opacity ${itemDuration}ms ease-out ${staggerDelay}ms, transform ${itemDuration}ms ease-out ${staggerDelay}ms`;
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      });
    });
  }, [revealed, stagger, staggerSelector, staggerStep, direction, duration, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : `translateY(${restY}px)`,
        transition: revealed
          ? `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`
          : "none",
        willChange: revealed ? undefined : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
