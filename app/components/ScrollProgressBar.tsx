"use client";

import { useState, useEffect } from "react";

/** Fixed 3px progress bar at top of page showing scroll progress. */
export default function ScrollProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        setPct(docH > 0 ? (window.scrollY / docH) * 100 : 0);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50 pointer-events-none">
      <div
        className="h-full bg-[#627F38] transition-[width] duration-75"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
