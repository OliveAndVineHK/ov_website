"use client";

import { useState, useEffect, useRef } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  /** ms per character */
  speed?: number;
  /** Delay before typing starts (ms) */
  startDelay?: number;
  /** Show blinking cursor */
  showCursor?: boolean;
}

/**
 * Character-by-character typewriter reveal.
 * Cursor blinks at the end, then fades away after completion.
 */
export default function TypewriterText({
  text,
  className = "",
  speed = 25,
  startDelay = 1200,
  showCursor = true,
}: TypewriterTextProps) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    intervalRef.current = setInterval(() => {
      setDisplayedCount((prev) => {
        if (prev >= text.length) {
          clearInterval(intervalRef.current);
          setTimeout(() => setDone(true), 1500);
          return prev;
        }
        return prev + 1;
      });
    }, speed);
    return () => clearInterval(intervalRef.current);
  }, [started, text, speed]);

  return (
    <span className={className}>
      {text.slice(0, displayedCount)}
      {showCursor && (
        <span
          className="inline-block w-[2px] h-[0.9em] bg-current ml-0.5 align-middle transition-opacity duration-300"
          style={{
            opacity: done ? 0 : 1,
            animation: started && !done ? "typewriterBlink 0.8s steps(2) infinite" : "none",
          }}
        />
      )}
      <style jsx>{`
        @keyframes typewriterBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
