"use client";

import { useState, useEffect, useRef } from "react";

interface StaggeredLineRevealProps {
  lines: string[];
  className?: string;
  delayMs?: number;
}

/** Lines fade + slide up one by one on viewport entry. */
export default function StaggeredLineReveal({ lines, className = "", delayMs = 200 }: StaggeredLineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="block transition-all"
          style={{
            transitionDuration: "700ms",
            transitionDelay: `${i * delayMs}ms`,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {line}
        </span>
      ))}
    </div>
  );
}
