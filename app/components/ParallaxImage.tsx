"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

/** Image with subtle vertical parallax on scroll. */
export default function ParallaxImage({ src, alt, className = "" }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const wH = window.innerHeight;
        const visible = (wH - rect.top) / (wH + rect.height);
        setOffset((visible - 0.5) * 50);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ transform: `translateY(${offset}px) scale(1.15)`, transition: "transform 0.1s linear" }}
        sizes="(max-width: 1024px) 100vw, 50vw"
        quality={95}
      />
    </div>
  );
}
