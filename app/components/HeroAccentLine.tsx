"use client";

interface HeroAccentLineProps {
  color: string;
}

export default function HeroAccentLine({ color }: HeroAccentLineProps) {
  return (
    <div
      className="h-1 mt-4 sm:mt-5 md:mt-6"
      style={{
        background: color,
        animation: "revealLine 600ms ease-out forwards",
        transformOrigin: "left",
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes revealLine {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
