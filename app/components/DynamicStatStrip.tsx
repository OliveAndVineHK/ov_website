"use client";

import { useEffect, useRef, useState } from "react";
import { useServiceAccent } from "@/app/contexts/ServiceAccentContext";

type ServiceType = "accounting" | "tax" | "corporate" | "consulting" | "hr" | "assurance";

interface Stat {
  value: string;
  label: string;
  labelKo: string;
}

const statsMap: Record<ServiceType, Stat[]> = {
  accounting: [
    { value: "500+", label: "Accounts Managed", labelKo: "Accounts Managed" },
    { value: "10M+", label: "Transactions Processed", labelKo: "Transactions Processed" },
    { value: "99.9%", label: "Accuracy Rate", labelKo: "Accuracy Rate" },
    { value: "95%", label: "Client Retention", labelKo: "Client Retention" },
  ],
  tax: [
    { value: "1,000+", label: "Returns Filed", labelKo: "Returns Filed" },
    { value: "$50M+", label: "Tax Savings", labelKo: "Tax Savings" },
    { value: "100%", label: "Compliance", labelKo: "Compliance" },
    { value: "15:1", label: "ROI Ratio", labelKo: "ROI Ratio" },
  ],
  corporate: [
    { value: "300+", label: "Companies Incorporated", labelKo: "Companies Incorporated" },
    { value: "100%", label: "Deadlines Met", labelKo: "Deadlines Met" },
    { value: "200+", label: "Governance Audits", labelKo: "Governance Audits" },
    { value: "98%", label: "Satisfaction", labelKo: "Satisfaction" },
  ],
  consulting: [
    { value: "150+", label: "Projects Delivered", labelKo: "Projects Delivered" },
    { value: "92%", label: "Success Rate", labelKo: "Success Rate" },
    { value: "20+", label: "Expert Consultants", labelKo: "Expert Consultants" },
    { value: "$100M+", label: "Value Delivered", labelKo: "Value Delivered" },
  ],
  hr: [
    { value: "5,000+", label: "Employees Managed", labelKo: "Employees Managed" },
    { value: "96%", label: "Retention Rate", labelKo: "Retention Rate" },
    { value: "99.99%", label: "Payroll Accuracy", labelKo: "Payroll Accuracy" },
    { value: "100%", label: "Benefits Coverage", labelKo: "Benefits Coverage" },
  ],
  assurance: [
    { value: "500+", label: "Audits Completed", labelKo: "Audits Completed" },
    { value: "Zero", label: "Restatements", labelKo: "Restatements" },
    { value: "99%", label: "Assurance Score", labelKo: "Assurance Score" },
    { value: "97%", label: "Client Confidence", labelKo: "Client Confidence" },
  ],
};

interface DynamicStatStripProps {
  serviceType: ServiceType;
  language?: string;
  accentColor?: string;
}

export default function DynamicStatStrip({
  serviceType,
  language = "ENG",
  accentColor,
}: DynamicStatStripProps) {
  const { colors } = useServiceAccent();
  const bgColor = accentColor || colors.primary;
  const stats = statsMap[serviceType];

  const [displayedStats, setDisplayedStats] = useState<Array<{ value: string; isComplete: boolean }>>(
    stats.map(() => ({ value: "0", isComplete: false }))
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateStats();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const animateStats = () => {
    stats.forEach((stat, index) => {
      const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ""));

      // Handle non-numeric values (e.g., "Zero", "N/A") — display directly without animation
      if (isNaN(numericValue)) {
        setDisplayedStats((prev) => {
          const updated = [...prev];
          updated[index] = {
            value: stat.value,
            isComplete: true,
          };
          return updated;
        });
        return;
      }

      const hasComma = stat.value.includes(",");
      const hasCurrency = stat.value.includes("$");
      const prefix = hasCurrency ? "$" : "";
      const suffix = stat.value.replace(/[0-9$,]/g, "");

      let currentValue = 0;
      const duration = 400;
      const startTime = Date.now();

      const updateValue = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        currentValue = Math.floor(progress * numericValue);

        let displayValue = prefix + currentValue.toString() + suffix;
        if (hasComma && currentValue > 999) {
          displayValue = prefix + currentValue.toLocaleString() + suffix;
        }

        setDisplayedStats((prev) => {
          const updated = [...prev];
          updated[index] = {
            value: displayValue,
            isComplete: progress === 1,
          };
          return updated;
        });

        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      };

      setTimeout(() => {
        requestAnimationFrame(updateValue);
      }, index * 80);
    });
  };

  const prefersReducedMotion = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  const shouldAnimate = !prefersReducedMotion();

  return (
    <section
      ref={containerRef}
      className="w-full py-3 sm:py-4"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
          {stats.map((stat, index) => {
            const displayValue = shouldAnimate ? displayedStats[index]?.value : stat.value;
            const label = language === "KOR" ? stat.labelKo : stat.label;

            return (
              <div key={index} className="transition-all duration-300">
                <span className="block text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  {displayValue || stat.value}
                </span>
                <span className="block text-sm md:text-base text-white/70 mt-1">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
