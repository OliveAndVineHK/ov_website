"use client";

import { useServiceAccent } from "@/app/contexts/ServiceAccentContext";

interface ServiceBadgeProps {
  className?: string;
}

export default function ServiceBadge({ className = "" }: ServiceBadgeProps) {
  const { colors } = useServiceAccent();

  return (
    <div
      className={`absolute top-6 left-6 md:top-8 md:left-8 z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs md:text-sm font-semibold tracking-wide ${className}`}
      style={{ backgroundColor: colors.primary }}
    >
      <span className="w-2 h-2 rounded-full bg-white"></span>
      {colors.serviceBadgeText}
    </div>
  );
}
