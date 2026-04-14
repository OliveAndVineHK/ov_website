"use client";

import { useState, useEffect, useRef } from "react";

interface CareerStep {
  company: { en: string; ko: string };
  role: { en: string; ko: string };
  location: { en: string; ko: string };
  current: boolean;
}

interface CareerTimelineProps {
  steps: CareerStep[];
  language: string;
  className?: string;
}

/**
 * Horizontal career timeline with scroll-triggered staggered reveal.
 * Each node appears sequentially with a connecting line that grows between them.
 * On mobile, switches to a vertical layout.
 */
export default function CareerTimeline({ steps, language, className = "" }: CareerTimelineProps) {
  const l = (obj: { en: string; ko: string }) => (language === "KOR" ? obj.ko : obj.en);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className}`}>
      {/* ── Desktop: horizontal ── */}
      <div className="hidden md:block relative">
        {/* Connecting line */}
        <div className="absolute top-[11px] left-0 right-0 h-[1px] bg-[#111B12]/10">
          <div
            className="h-full bg-[#627F38] origin-left transition-transform duration-1000 ease-out"
            style={{ transform: visible ? "scaleX(1)" : "scaleX(0)" }}
          />
        </div>

        <div className="flex items-start justify-between relative">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center relative transition-all"
              style={{
                flex: i === steps.length - 1 ? "0 0 auto" : "1 1 0",
                transitionDuration: "600ms",
                transitionDelay: `${i * 200 + 200}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
              }}
            >
              {/* Node dot */}
              <div
                className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-500 ${
                  step.current
                    ? "border-[#495F2B] bg-[#495F2B]"
                    : "border-[#627F38]/40 bg-white"
                }`}
                style={{ transitionDelay: `${i * 200 + 300}ms` }}
              >
                {step.current && (
                  <div className="w-[8px] h-[8px] rounded-full bg-white" />
                )}
                {!step.current && (
                  <div
                    className="w-[8px] h-[8px] rounded-full bg-[#627F38] transition-transform duration-300"
                    style={{
                      transitionDelay: `${i * 200 + 400}ms`,
                      transform: visible ? "scale(1)" : "scale(0)",
                    }}
                  />
                )}
              </div>

              {/* Company name */}
              <span className={`text-sm font-semibold mt-3 leading-tight ${step.current ? "text-[#495F2B]" : "text-[#111B12]"}`}>
                {l(step.company)}
              </span>

              {/* Role */}
              <span className="text-xs text-[#111B12]/50 mt-1 leading-tight max-w-[120px]">
                {l(step.role)}
              </span>

              {/* Location */}
              <span className="text-[10px] text-[#111B12]/35 mt-0.5">
                {l(step.location)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: vertical ── */}
      <div className="md:hidden relative pl-6">
        {/* Vertical connecting line */}
        <div className="absolute left-[10px] top-0 bottom-0 w-[1px] bg-[#111B12]/10">
          <div
            className="w-full bg-[#627F38] origin-top transition-transform duration-1000 ease-out"
            style={{
              height: "100%",
              transform: visible ? "scaleY(1)" : "scaleY(0)",
            }}
          />
        </div>

        <div className="flex flex-col gap-5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-4 relative transition-all"
              style={{
                transitionDuration: "600ms",
                transitionDelay: `${i * 150 + 200}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-8px)",
              }}
            >
              {/* Node dot — positioned on the vertical line */}
              <div
                className={`absolute -left-6 top-[2px] w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center shrink-0 ${
                  step.current
                    ? "border-[#495F2B] bg-[#495F2B]"
                    : "border-[#627F38]/40 bg-white"
                }`}
              >
                {step.current && <div className="w-[7px] h-[7px] rounded-full bg-white" />}
                {!step.current && (
                  <div
                    className="w-[7px] h-[7px] rounded-full bg-[#627F38] transition-transform duration-300"
                    style={{
                      transitionDelay: `${i * 150 + 300}ms`,
                      transform: visible ? "scale(1)" : "scale(0)",
                    }}
                  />
                )}
              </div>

              {/* Text */}
              <div>
                <span className={`text-sm font-semibold leading-tight block ${step.current ? "text-[#495F2B]" : "text-[#111B12]"}`}>
                  {l(step.company)}
                </span>
                <span className="text-xs text-[#111B12]/50 leading-tight block mt-0.5">
                  {l(step.role)} · {l(step.location)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
