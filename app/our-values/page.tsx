"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { valuesPageTranslations } from "@/app/utils/pageValuesUtils";
import { useScrollProgress } from "@/app/hooks/useScrollProgress";
import SectionReveal from "@/app/components/SectionReveal";
import HeroAccentLine from "@/app/components/HeroAccentLine";
import HeroTextReveal from "@/app/components/HeroTextReveal";
import TypewriterText from "@/app/components/TypewriterText";
import VimeoBackground from "@/app/components/VimeoBackground";
import ScrollProgressBar from "@/app/components/ScrollProgressBar";
import GrowingLine from "@/app/components/GrowingLine";
import MagneticButton from "@/app/components/MagneticButton";
import * as Icons from "@/app/utils/icons";

/* ════════════════════════ PAGE ════════════════════════ */

export default function OurValuesPage() {
  const { language } = useLanguage();
  const t = valuesPageTranslations;
  const l = (obj: { en: string; ko: string }) => (language === "KOR" ? obj.ko : obj.en);

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgressBar />

      {/* ═══════ HERO — Vimeo cinematic background + text reveal ═══════ */}
      <section className="w-full relative overflow-hidden bg-[#111B12]" style={{ minHeight: "90vh" }}>
        <VimeoBackground videoId="1182577911" overlayOpacity={0.5} />

        {/* Content */}
        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col justify-center"
          style={{ minHeight: "90vh" }}
        >
          <SectionReveal>
            <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38] mb-4 md:mb-6 block">
              {l(t.pageTitle)}
            </span>
          </SectionReveal>

          <HeroTextReveal
            text={l(t.heroTitle)}
            className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-bold text-white leading-[1.1] tracking-tight"
            startDelay={400}
          />

          <HeroAccentLine color="#627F38" />

          <p className="text-sm sm:text-base md:text-lg lg:text-[20px] text-white/50 max-w-2xl mt-5 md:mt-6">
            <TypewriterText
              text={l(t.heroSubtitle)}
              speed={20}
              startDelay={1800}
            />
          </p>
        </div>

        <ScrollIndicator />
      </section>

      {/* ═══════ MISSION STATEMENT — simple, impactful ═══════ */}
      <section className="w-full py-20 md:py-32 lg:py-40">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <SectionReveal>
            <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38] block mb-8 md:mb-12">
              {l(t.missionLabel)}
            </span>
          </SectionReveal>
          <SectionReveal delay={200}>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#111B12] leading-snug">
              {l(t.missionStatement)}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════ VALUES — immersive editorial sections ═══════ */}
      {t.values.map((value, i) => (
        <ValueSection key={i} value={value} index={i} language={language} />
      ))}

      {/* ═══════ PROMISE — dark atmospheric closing ═══════ */}
      <section className="w-full py-16 sm:py-20 md:py-28 lg:py-36 bg-[#111B12] relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/value/bg-value.png"
            alt=""
            fill
            className="object-cover opacity-10"
            sizes="100vw"
            quality={95}
          />
        </div>
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom left, rgba(98,127,56,0.08) 0%, transparent 60%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <SectionReveal>
            <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38]">
              {l(t.promiseLabel)}
            </span>
          </SectionReveal>
          <SectionReveal delay={150}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-bold text-white mt-5 md:mt-6 leading-tight whitespace-pre-line">
              {l(t.promiseTitle)}
            </h2>
          </SectionReveal>
          <SectionReveal delay={300}>
            <GrowingLine className="max-w-[80px] mt-6 mb-6" />
          </SectionReveal>
          <SectionReveal delay={400}>
            <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-white/50 leading-relaxed max-w-3xl text-justify">
              {l(t.promiseBody)}
            </p>
          </SectionReveal>
          <SectionReveal delay={500}>
            <div className="mt-10 md:mt-12">
              <MagneticButton className="inline-block" strength={0.25}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-white leading-relaxed border border-[#495F2B] bg-[#495F2B] px-5 sm:px-6 py-2 hover:bg-[#627F38] hover:border-[#627F38] transition-all duration-300 cursor-pointer"
                >
                  {l(t.ctaButton)}
                  <Icons.CgArrowTopRight className="size-4" aria-hidden />
                </Link>
              </MagneticButton>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}

/* ════════════════ Scroll Indicator ════════════════ */

function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
      <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden">
        <div className="w-full h-1/2 bg-[#627F38] absolute scroll-pulse-values" />
      </div>
      <style jsx>{`
        @keyframes scrollPulseValues { 0%, 100% { top: -50%; opacity: 0; } 50% { top: 100%; opacity: 1; } }
        .scroll-pulse-values { animation: scrollPulseValues 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

/* ════════════════ Value Section ════════════════ */

function ValueSection({
  value,
  index,
  language,
}: {
  value: (typeof valuesPageTranslations.values)[0];
  index: number;
  language: string;
}) {
  const l = (obj: { en: string; ko: string }) => (language === "KOR" ? obj.ko : obj.en);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollP = useScrollProgress(sectionRef, 0.8, 0.2);

  const isDark = index % 2 !== 0;
  const bgClass = isDark ? "bg-[#111B12]" : "bg-[#F9F8F4]";
  const titleColor = isDark ? "text-white" : "text-[#111B12]";
  const bodyColor = isDark ? "text-white/50" : "text-[#111B12]/60";
  const lineColor = isDark ? "rgba(255,255,255,0.15)" : undefined;

  return (
    <section
      ref={sectionRef}
      className={`w-full py-20 sm:py-24 md:py-32 lg:py-40 ${bgClass} relative overflow-hidden`}
    >
      <div
        className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none select-none"
        style={{
          transform: `translate(${-80 + scrollP * 80}px, -50%)`,
          opacity: 0.04,
          transition: "transform 0.1s linear",
        }}
      >
        <span className={`text-[200px] sm:text-[280px] md:text-[360px] lg:text-[450px] font-bold leading-none ${isDark ? "text-white" : "text-[#111B12]"}`}>
          {value.number}
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 md:gap-10 lg:gap-20">
          <div className="shrink-0 lg:w-[35%]">
            <SectionReveal>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold text-[#627F38] opacity-40 leading-none block">
                {value.number}
              </span>
            </SectionReveal>
            <SectionReveal delay={150}>
              <GrowingLine color={lineColor} className="max-w-[60px] my-4 md:my-5" />
            </SectionReveal>
            <SectionReveal delay={250}>
              <h3 className={`text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold ${titleColor} leading-[1.05]`}>
                {l(value.title)}
              </h3>
            </SectionReveal>
          </div>

          <div className="flex-1 lg:pt-6">
            <SectionReveal delay={300}>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] font-semibold text-[#627F38] leading-snug">
                &ldquo;{l(value.statement)}&rdquo;
              </p>
            </SectionReveal>
            <SectionReveal delay={450}>
              <p className={`text-base sm:text-lg md:text-xl lg:text-[20px] ${bodyColor} leading-relaxed mt-5 md:mt-6 text-justify`}>
                {l(value.body)}
              </p>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
