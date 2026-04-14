"use client";

import { useState, useEffect } from "react";

/**
 * Tracks scroll progress of an element relative to the viewport.
 * Returns 0→1 as the element scrolls from `startVH` to `endVH`.
 *
 * @param ref        — element to track
 * @param startVH    — viewport fraction (0–1) where progress begins (default 0.9 = near bottom)
 * @param endVH      — viewport fraction (0–1) where progress = 1 (default 0.1 = near top)
 * @param useCenter  — if true, tracks element center; if false, tracks element top
 */
export function useScrollProgress(
  ref: React.RefObject<HTMLElement | null>,
  startVH = 0.9,
  endVH = 0.1,
  useCenter = false,
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const wH = window.innerHeight;
      const anchor = useCenter ? rect.top + rect.height / 2 : rect.top;
      const startY = wH * startVH;
      const endY = wH * endVH;
      const raw = 1 - (anchor - endY) / (startY - endY);
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, startVH, endVH, useCenter]);

  return progress;
}
