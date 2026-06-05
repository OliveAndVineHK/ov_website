"use client";

import { useState, useEffect } from "react";

interface AnimatedHeadlineProps {
  words: string[];
  className?: string;
  /** Dwell time per word in ms (includes the out + in transition). */
  interval?: number;
}

/* AnimatedHeadline v2 (2026-06-03) — elegant cross-fade + slide.
   The previous letter-by-letter "swirl" animation read as gimmicky;
   this version simply cross-fades each word with a soft 12px slide
   on the way in, 700ms each side, paused for the rest of `interval`.
   Honours prefers-reduced-motion (renders first word statically). */
export default function AnimatedHeadline({
  words,
  className = "",
  interval = 3800,
}: AnimatedHeadlineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  useEffect(() => {
    if (words.length === 0 || reduced) return;
    const OUT_MS = 600;
    const cycle = setInterval(() => {
      setIsVisible(false);
      window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, OUT_MS);
    }, interval);
    return () => clearInterval(cycle);
  }, [words.length, interval, reduced]);

  if (words.length === 0) return null;
  const word = words[currentIndex] ?? words[0];

  return (
    <h2
      className={`text-[36px] sm:text-[48px] md:text-[60px] lg:text-[74px] 2xl:text-[88px] font-normal text-white text-center leading-[1.1] tracking-[-0.01em] ${className}`}
    >
      <span
        key={`${currentIndex}-${word}`}
        className="inline-block"
        style={{
          opacity: reduced ? 1 : isVisible ? 1 : 0,
          transform: reduced
            ? "translateY(0)"
            : isVisible
            ? "translateY(0)"
            : "translateY(-14px)",
          transition: reduced
            ? "none"
            : "opacity 700ms cubic-bezier(0.4, 0, 0.2, 1), transform 700ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: reduced ? undefined : "opacity, transform",
        }}
      >
        {word}
      </span>
    </h2>
  );
}
