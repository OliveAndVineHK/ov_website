"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface HeroInteractionLayerProps {
  /** "light" = About Us (soft spotlight on bright image), "dark" = Our Values (glow + warm shift on dark image) */
  variant: "light" | "dark";
  className?: string;
}

/**
 * Full-coverage mouse interaction overlay for hero sections.
 *
 * Light variant (About Us):
 *   - Subtle radial spotlight that follows the cursor
 *   - Mouse XY parallax on children layers
 *   - Soft vignette that shifts with cursor
 *
 * Dark variant (Our Values):
 *   - Warm glow circle that follows cursor (flashlight in darkness)
 *   - Color temperature shift (cool left ↔ warm olive right)
 *   - Subtle grain texture overlay
 */
export default function HeroInteractionLayer({ variant, className = "" }: HeroInteractionLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 }); // normalized 0-1
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0.5, y: 0.5 });
  const currentRef = useRef({ x: 0.5, y: 0.5 });

  // Smooth interpolation via rAF
  const animate = useCallback(() => {
    const lerp = 0.08;
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;
    setMouse({ x: currentRef.current.x, y: currentRef.current.y });
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    targetRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  const mx = mouse.x * 100; // percentage
  const my = mouse.y * 100;

  if (variant === "light") {
    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 z-[2] pointer-events-auto ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Soft radial spotlight following cursor */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(ellipse 600px 500px at ${mx}% ${my}%, rgba(255,255,255,0.08) 0%, transparent 70%)`,
          }}
        />

        {/* Warm vignette that subtly shifts with cursor */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 70% at ${50 + (mouse.x - 0.5) * 15}% ${50 + (mouse.y - 0.5) * 15}%, transparent 30%, rgba(0,0,0,0.25) 100%)`,
          }}
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
      </div>
    );
  }

  // Dark variant (Our Values)
  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-[2] pointer-events-auto ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Cursor glow — warm spotlight in darkness */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(circle 350px at ${mx}% ${my}%, rgba(98,127,56,0.12) 0%, rgba(73,95,43,0.04) 40%, transparent 70%)`,
        }}
      />

      {/* Color temperature shift — cool left, warm olive right */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovering ? 0.6 : 0.3,
          background: `linear-gradient(${90 + (mouse.x - 0.5) * 30}deg, rgba(30,40,50,0.15) 0%, rgba(98,127,56,${0.03 + mouse.x * 0.04}) 100%)`,
        }}
      />

      {/* Ambient edge glow that moves */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 90% 80% at ${50 + (mouse.x - 0.5) * 20}% ${50 + (mouse.y - 0.5) * 20}%, transparent 40%, rgba(0,0,0,0.4) 100%)`,
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}
