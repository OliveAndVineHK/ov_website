"use client";

import { useState, useEffect, useRef } from "react";

interface GrowingLineProps {
  color?: string;
  className?: string;
}

/** Horizontal accent line that grows from left to right when scrolled into view. */
export default function GrowingLine({ color = "#627F38", className = "" }: GrowingLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`h-[2px] ${className}`}>
      <div
        className="h-full origin-left transition-transform duration-700 ease-out"
        style={{
          backgroundColor: color,
          transform: visible ? "scaleX(1)" : "scaleX(0)",
        }}
      />
    </div>
  );
}
