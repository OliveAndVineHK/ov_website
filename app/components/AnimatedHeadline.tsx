"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedHeadlineProps {
  words: string[];
  className?: string;
  /** Dwell time per word in ms (includes the out + in transition). */
  interval?: number;
}

/* AnimatedHeadline v4 (2026-06-04) — true cross-fade via CSS Grid stack.

   v3 used a single span that went opacity 1 → 0 → swap text → 0 → 1.
   That left a visible "blank" gap in the middle of the cycle and the
   transition felt abrupt — the user saw the change clearly.

   v4 renders BOTH the previous and current word at the same time
   during the swap (CSS Grid `grid-area: 1 / 1` stacks them). The
   outgoing word fades + slides up + blurs (.headline-word-out
   keyframe). The incoming word fades + slides up from below + un-
   blurs (.headline-word-in keyframe). The two animations overlap
   for the full 1.6s, producing a continuous "ticker" feel with no
   blank moment. React keys (`key={cycleId-prev}`/`key={cycleId-curr}`)
   ensure the keyframes re-run on every swap. */
export default function AnimatedHeadline({
  words,
  className = "",
  interval = 4400,
}: AnimatedHeadlineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [cycleId, setCycleId] = useState(0);
  const [reduced, setReduced] = useState(false);
  const clearPrevTimer = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  useEffect(() => {
    if (words.length === 0 || reduced) return;
    const cycle = setInterval(() => {
      setCurrentIndex((c) => {
        const next = (c + 1) % words.length;
        setPrevIndex(c);
        setCycleId((id) => id + 1);
        if (clearPrevTimer.current) window.clearTimeout(clearPrevTimer.current);
        // Drop the outgoing word from the DOM once the animation has
        // run; 1700ms slightly exceeds the 1600ms animation duration.
        clearPrevTimer.current = window.setTimeout(() => {
          setPrevIndex(null);
        }, 1700);
        return next;
      });
    }, interval);
    return () => {
      clearInterval(cycle);
      if (clearPrevTimer.current) window.clearTimeout(clearPrevTimer.current);
    };
  }, [words.length, interval, reduced]);

  if (words.length === 0) return null;
  const currentWord = words[currentIndex] ?? words[0];
  const prevWord = prevIndex !== null ? words[prevIndex] : null;

  return (
    <h2
      className={`text-[36px] sm:text-[48px] md:text-[60px] lg:text-[74px] 2xl:text-[88px] font-normal text-white text-center leading-[1.1] tracking-[-0.01em] ${className}`}
    >
      <span className="relative inline-grid">
        {prevWord !== null && (
          <span
            key={`prev-${cycleId}`}
            className={reduced ? "" : "headline-word-out"}
            style={{
              gridArea: "1 / 1",
              willChange: reduced ? undefined : "opacity, transform, filter",
            }}
          >
            {prevWord}
          </span>
        )}
        <span
          key={`curr-${cycleId}`}
          className={reduced ? "" : "headline-word-in"}
          style={{
            gridArea: "1 / 1",
            willChange: reduced ? undefined : "opacity, transform, filter",
          }}
        >
          {currentWord}
        </span>
      </span>
    </h2>
  );
}
