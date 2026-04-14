"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/app/hooks/useScrollProgress";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

/**
 * Word-by-word blur reveal driven by scroll position.
 * Uses element CENTER so long text blocks are fully revealed when centered in viewport.
 */
export default function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Track element CENTER: start at 75% viewport, complete at 35%
  const progress = useScrollProgress(containerRef, 0.75, 0.35, true);
  const words = text.split(" ");

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, i) => {
        const wp = i / (words.length - 1 || 1);
        const revealed = progress > wp;
        return (
          <span
            key={i}
            className="inline-block mr-[0.3em] transition-all duration-300"
            style={{
              opacity: revealed ? 1 : 0.1,
              filter: revealed ? "blur(0)" : "blur(3px)",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
