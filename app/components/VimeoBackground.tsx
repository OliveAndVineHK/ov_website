"use client";

import { useEffect, useRef, useState } from "react";

interface VimeoBackgroundProps {
  videoId: string;
  /** Overlay darkness 0-1 (default 0.45) */
  overlayOpacity?: number;
  className?: string;
}

/**
 * Full-bleed Vimeo background video.
 * Autoplay, muted, looped, no controls.
 * Falls back to a dark bg if the video fails to load.
 */
export default function VimeoBackground({
  videoId,
  overlayOpacity = 0.45,
  className = "",
}: VimeoBackgroundProps) {
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Mark as loaded after a short delay to allow fade-in
    const timer = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Vimeo iframe in background mode */}
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&muted=1&quality=1080p`}
        className="absolute w-[177.78vh] min-w-full h-[56.25vw] min-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: loaded ? 1 : 0 }}
        allow="autoplay; fullscreen"
        title="Background video"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,${overlayOpacity + 0.05}) 0%, rgba(0,0,0,${overlayOpacity - 0.15}) 40%, rgba(0,0,0,${overlayOpacity + 0.1}) 100%)`,
        }}
      />
    </div>
  );
}
