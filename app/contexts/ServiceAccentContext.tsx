"use client";

import { createContext, useContext, ReactNode } from "react";

type ServiceType = "accounting" | "tax" | "corporate" | "consulting" | "hr" | "assurance";

type ServiceAccentColors = {
  primary: string;
  secondary: string;
  serviceName: string;
  serviceBadgeText: string;
};

const serviceColorMap: Record<ServiceType, ServiceAccentColors> = {
  accounting: {
    primary: "#495F2B",
    secondary: "#627F38",
    serviceName: "Accounting",
    serviceBadgeText: "ACCOUNTING",
  },
  tax: {
    primary: "#495F2B",
    secondary: "#627F38",
    serviceName: "Tax",
    serviceBadgeText: "TAX EXPERTISE",
  },
  corporate: {
    primary: "#495F2B",
    secondary: "#627F38",
    serviceName: "Corporate",
    serviceBadgeText: "CORPORATE STRATEGY",
  },
  consulting: {
    primary: "#495F2B",
    secondary: "#627F38",
    serviceName: "Consulting",
    serviceBadgeText: "STRATEGIC CONSULTING",
  },
  hr: {
    primary: "#495F2B",
    secondary: "#627F38",
    serviceName: "HR",
    serviceBadgeText: "PEOPLE MANAGEMENT",
  },
  assurance: {
    primary: "#495F2B",
    secondary: "#627F38",
    serviceName: "Assurance",
    serviceBadgeText: "ASSURANCE & AUDIT",
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
