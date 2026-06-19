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

/* v6 (2026-06-16): global reveal-speed knob. Every reveal duration
   (default or explicitly passed) is multiplied by REVEAL_SPEED so the
   rise/fade is slow enough to be perceived while the user is still
   scrolling. Tune this single number to retune the whole site. */
const REVEAL_SPEED = 1.8;

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

  /* v7 (2026-06-16): bidirectional reveal. The scroll listener stays
     active for the component's whole life (not just while hidden) and
     toggles `revealed` BOTH ways: revealed when the element is within /
     above the trigger line, hidden again when it drops back below the
     viewport. Scrolling down plays the reveal; scrolling back up reverses
     it; scrolling down again replays it.

     Fail-open is preserved: the trigger still flips to revealed whenever
     the element is in view (so content never stays stuck hidden), and
     reduced-motion users skip the listener entirely and stay visible. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // reduced motion — always visible, no toggling
    }

    let frame = 0;
    const check = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight || document.documentElement.clientHeight;
      // In view / scrolled past the top → revealed; still below → hidden.
      setRevealed(rect.top < viewH - 50);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(check);
    };

    /* Browser back/forward (and bfcache) restore the scroll position
       AFTER this effect mounts, often without firing a scroll event. A
       single mount-time check would read a stale position and leave the
       reveal frozen. So we re-check across the first several animation
       frames — the same restoration poll ScrollLinkedStagger uses — and
       re-run that poll on pageshow (bfcache restore). */
    let pollFrame = 0;
    let restoreFrames = 0;
    const restorePoll = () => {
      check();
      restoreFrames++;
      if (restoreFrames < 8) pollFrame = requestAnimationFrame(restorePoll);
      else pollFrame = 0;
    };
    const kickRestorePoll = () => {
      restoreFrames = 0;
      if (pollFrame) cancelAnimationFrame(pollFrame);
      pollFrame = requestAnimationFrame(restorePoll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pageshow", kickRestorePoll);

    // Initial check + restoration poll (catches back/forward navigation).
    check();
    kickRestorePoll();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (pollFrame) cancelAnimationFrame(pollFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pageshow", kickRestorePoll);
    };
  }, []);

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
        const itemDuration = Math.round(Math.max(300, duration) * REVEAL_SPEED);
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
        // Transition is applied in BOTH states so the reverse (revealed →
        // hidden, on scroll-up) animates as smoothly as the reveal. The
        // pre-paint mount hide (useLayoutEffect) avoids a first-frame flash.
        transition: `opacity ${Math.round(duration * REVEAL_SPEED)}ms ease-out ${delay}ms, transform ${Math.round(duration * REVEAL_SPEED)}ms ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
