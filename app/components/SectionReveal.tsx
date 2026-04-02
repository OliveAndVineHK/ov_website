"use client";

import { useEffect, useRef, ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  stagger?: boolean;
  className?: string;
}

export default function SectionReveal({
  children,
  delay = 0,
  stagger = false,
  className = "",
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  useEffect(() => {
    if (prefersReducedMotion()) {
      if (ref.current) {
        ref.current.style.opacity = "1";
        ref.current.style.transform = "translateY(0)";
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Set initial state
            if (ref.current) {
              ref.current.style.opacity = "0";
              ref.current.style.transform = "translateY(20px)";
              ref.current.style.transition = "none";
            }

            // Trigger animation after a frame
            requestAnimationFrame(() => {
              if (ref.current) {
                ref.current.style.transition = `opacity 350ms ease-out ${delay}ms, transform 350ms ease-out ${delay}ms`;
                ref.current.style.opacity = "1";
                ref.current.style.transform = "translateY(0)";
              }
            });

            // Handle staggered children if needed
            if (stagger && ref.current) {
              const listItems = ref.current.querySelectorAll("li, .stagger-item");
              listItems.forEach((item, index) => {
                const element = item as HTMLElement;
                element.style.opacity = "0";
                element.style.transform = "translateY(10px)";
                element.style.transition = "none";

                requestAnimationFrame(() => {
                  const staggerDelay = delay + index * 80;
                  element.style.transition = `opacity 300ms ease-out ${staggerDelay}ms, transform 300ms ease-out ${staggerDelay}ms`;
                  element.style.opacity = "1";
                  element.style.transform = "translateY(0)";
                });
              });
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, stagger]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: prefersReducedMotion() ? 1 : 0,
        transform: prefersReducedMotion() ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {children}
    </div>
  );
}
