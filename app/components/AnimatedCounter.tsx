"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix: string;
  delay?: number;
}

/** Counts from 0 to target with easeOutQuart when scrolled into view. */
export default function AnimatedCounter({ target, suffix, delay = 0 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1600;
          const startTime = performance.now() + delay;
          const animate = (now: number) => {
            const elapsed = now - startTime;
            if (elapsed < 0) { requestAnimationFrame(animate); return; }
            const p = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            setCount(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, delay]);

  return <span ref={ref}>{count}{suffix}</span>;
}
