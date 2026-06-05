"use client";

import { createContext, useContext, ReactNode } from "react";

type ServiceType = "accounting" | "tax" | "corporate" | "consulting" | "hr" | "assurance";

type ServiceAccentColors = {
  primary: string;
  secondary: string;
  /** Hero base color — set as `background-color` on the hero section,
      with the leaf-pale radial vignette layered on top. Per-service
      tint is the Decision G differentiation knob. */
  heroBase: string;
  serviceName: string;
  serviceBadgeText: string;
};

/* Per-service hero base — all within the olive hue family.
   Decision G (2026-05-28) is the rationale; the existing 4 olive
   tokens are reused for 4 services and 3 new tokens (`-rooted`,
   `-hearth`, `-steady`) fill in for Corporate / HR / Assurance.
   Order is by lightness, lightest to darkest, for visual grouping. */
const serviceColorMap: Record<ServiceType, ServiceAccentColors> = {
  consulting: {
    primary: "#495F2B",
    secondary: "#627F38",
    heroBase: "#648E3E",     // --ov-olive-active — bright, forward
    serviceName: "Consulting",
    serviceBadgeText: "STRATEGIC CONSULTING",
  },
  hr: {
    primary: "#495F2B",
    secondary: "#627F38",
    heroBase: "#6E7A33",     // --ov-olive-hearth — warm earthy
    serviceName: "HR",
    serviceBadgeText: "PEOPLE MANAGEMENT",
  },
  accounting: {
    primary: "#495F2B",
    secondary: "#627F38",
    heroBase: "#627F38",     // --ov-olive — clean mid
    serviceName: "Accounting",
    serviceBadgeText: "ACCOUNTING",
  },
  tax: {
    primary: "#495F2B",
    secondary: "#627F38",
    heroBase: "#495F2B",     // --ov-olive-deep — warm earthy (current)
    serviceName: "Tax",
    serviceBadgeText: "TAX EXPERTISE",
  },
  assurance: {
    primary: "#495F2B",
    secondary: "#627F38",
    heroBase: "#3F4E22",     // --ov-olive-steady — cool deep
    serviceName: "Assurance",
    serviceBadgeText: "ASSURANCE & AUDIT",
  },
  corporate: {
    primary: "#495F2B",
    secondary: "#627F38",
    heroBase: "#2E3F18",     // --ov-olive-rooted — structural deep
    serviceName: "Corporate",
    serviceBadgeText: "CORPORATE STRATEGY",
  },
};

type ServiceAccentContextType = {
  serviceType: ServiceType;
  colors: ServiceAccentColors;
};

const ServiceAccentContext = createContext<ServiceAccentContextType | undefined>(undefined);

export function ServiceAccentProvider({
  children,
  serviceType,
}: {
  children: ReactNode;
  serviceType: ServiceType;
}) {
  const colors = serviceColorMap[serviceType];

  return (
    <ServiceAccentContext.Provider value={{ serviceType, colors }}>
      {children}
    </ServiceAccentContext.Provider>
  );
}

export function useServiceAccent() {
  const context = useContext(ServiceAccentContext);
  if (context === undefined) {
    throw new Error("useServiceAccent must be used within a ServiceAccentProvider");
  }
  return context;
}

export { type ServiceType, type ServiceAccentColors, serviceColorMap };
