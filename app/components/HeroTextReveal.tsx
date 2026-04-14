"use client";

import { useState, useEffect, useRef } from "react";

interface HeroTextRevealProps {
  /** Multi-line text separated by \n */
  text: string;
  className?: string;
  /** Delay before animation starts (ms) */
  startDelay?: number;
}

/**
 * Premium hero text animation inspired by top-tier firm sites.
 *
 * Each line is revealed via clip-path (slides up from behind a mask).
 * Within each line, characters are individually staggered for a fluid wave effect.
 * After reveal, a subtle gradient highlight sweeps across the text.
 *
 * Uses CSS only (no JS animation loop) for maximum performance.
 */
export default function HeroTextReveal({
  text,
  className = "",
  startDelay = 300,
}: HeroTextRevealProps) {
  const lines = text.split("\n");
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setTriggered(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  return (
    <div ref={ref} className={className} aria-label={text}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block overflow-hidden">
          {/* Clip mask — the inner span slides up into view */}
          <span
            className="block transition-transform"
            style={{
              transitionDuration: "900ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: `${lineIdx * 180}ms`,
              transform: triggered ? "translateY(0)" : "translateY(105%)",
            }}
          >
            {/* Character-level stagger for fluid wave */}
            {line.split("").map((char, charIdx) => (
              <span
                key={charIdx}
                className="inline-block transition-opacity"
                style={{
                  transitionDuration: "600ms",
                  transitionDelay: `${lineIdx * 180 + charIdx * 20 + 200}ms`,
                  opacity: triggered ? 1 : 0,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </span>
      ))}

      {/* Gradient sweep highlight — travels across text after reveal */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light transition-transform"
        style={{
          background: "linear-gradient(105deg, transparent 0%, rgba(98,127,56,0.15) 45%, rgba(255,255,255,0.08) 50%, transparent 55%)",
          transitionDuration: "1400ms",
          transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
          transitionDelay: `${lines.length * 180 + 400}ms`,
          transform: triggered ? "translateX(120%)" : "translateX(-120%)",
        }}
      />
    </div>
  );
}
