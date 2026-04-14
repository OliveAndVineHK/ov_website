"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { aboutPageTranslations } from "@/app/utils/pageAboutUtils";
import SectionReveal from "@/app/components/SectionReveal";
import HeroAccentLine from "@/app/components/HeroAccentLine";
import HeroTextReveal from "@/app/components/HeroTextReveal";
import TypewriterText from "@/app/components/TypewriterText";
import VimeoBackground from "@/app/components/VimeoBackground";
import GrowingLine from "@/app/components/GrowingLine";
import AnimatedCounter from "@/app/components/AnimatedCounter";
import ParallaxImage from "@/app/components/ParallaxImage";
import MagneticButton from "@/app/components/MagneticButton";
import CareerTimeline from "@/app/components/CareerTimeline";
import * as Icons from "@/app/utils/icons";

  headline: {
/* ════════════════════════ PAGE ════════════════════════ */

export default function AboutPage() {
  const { language } = useLanguage();
  const t = aboutPageTranslations;
  const l = (obj: { en: string; ko: string }) => (language === "KOR" ? obj.ko : obj.en);

  const founders = [t.founders.rebecca, t.founders.miyoung];

  return (
    <div className="min-h-screen bg-white">

      {/* ═══════ HERO — Vimeo cinematic background + text reveal ═══════ */}
      <section className="w-full relative overflow-hidden" style={{ minHeight: "90vh" }}>
        <VimeoBackground videoId="1182577957" overlayOpacity={0.45} />

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
            className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-bold text-white leading-[1.1] tracking-tight whitespace-pre-line"
            startDelay={400}
          />

          <HeroAccentLine color="#627F38" />

          <p className="text-sm sm:text-base md:text-lg lg:text-[20px] text-white/70 max-w-2xl mt-5 md:mt-6">
            <TypewriterText
              text={l(t.heroSubtitle)}
              speed={20}
              startDelay={1800}
            />
          </p>
        </div>

        <ScrollIndicator />
      </section>

      {/* ═══════ OUR STORY — full-bleed split with parallax image ═══════ */}
      <section className="w-full bg-[#F9F8F4]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <ParallaxImage
            src="/about/bg-about.png"
            alt="Olive & Vine advisory partnership"
            className="relative min-h-[350px] sm:min-h-[400px] lg:min-h-[600px]"
          />
          <div className="flex flex-col justify-center px-6 sm:px-8 md:px-10 lg:px-14 xl:px-20 py-14 md:py-20 lg:py-28">
            <SectionReveal>
              <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38]">
                {l(t.storyLabel)}
              </span>
            </SectionReveal>
            <SectionReveal delay={150}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#111B12] mt-5 md:mt-6 leading-tight whitespace-pre-line">
                {l(t.storyTitle)}
              </h2>
            </SectionReveal>
            <SectionReveal delay={300}>
              <GrowingLine className="max-w-[80px] mt-6 mb-6" />
            </SectionReveal>
            <SectionReveal delay={400}>
              <p className="text-base sm:text-lg md:text-xl text-[#111B12]/70 leading-relaxed max-w-xl text-justify">
                {l(t.storyBody)}
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ═══════ FOUNDERS — portrait showcase with tilt hover ═══════ */}
      <section className="w-full py-16 sm:py-20 md:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionReveal>
            <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38]">
              {l(t.leadershipLabel)}
            </span>
          </SectionReveal>
          <SectionReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#111B12] mt-5 md:mt-6 leading-tight whitespace-pre-line">
              {l(t.leadershipTitle)}
            </h2>
          </SectionReveal>
          <SectionReveal delay={200}>
            <p className="text-base sm:text-lg md:text-xl text-[#111B12]/70 leading-relaxed max-w-3xl mt-4 md:mt-5">
              {l(t.leadershipCulture)}
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mt-12 md:mt-16">
            {founders.map((founder, i) => (
              <FounderCard key={i} founder={founder} language={language} viewProfileLabel={l(t.viewProfile)} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PILLARS — dark section with bold type ═══════ */}
      <section className="w-full py-16 sm:py-20 md:py-28 lg:py-36 bg-[#111B12]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {[
            { title: t.pillar1Title, body: t.pillar1Body, accent: false },
            { title: t.pillar2Title, body: t.pillar2Body, accent: false },
            { title: t.pillar3Title, body: t.pillar3Body, accent: true },
          ].map((pillar, i) => (
            <div key={i} className={`py-10 md:py-14 ${i < 2 ? "border-b border-white/10" : ""}`}>
              <SectionReveal delay={i * 120}>
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 md:gap-8 lg:gap-16">
                  <div className="shrink-0 lg:w-[40%]">
                    <GrowingLine color={pillar.accent ? "#627F38" : "rgba(255,255,255,0.2)"} className="max-w-[60px] mb-4" />
                    <h3 className={`text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.05] ${pillar.accent ? "text-[#627F38]" : "text-white"}`}>
                      {l(pillar.title)}
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-white/50 leading-relaxed lg:pt-8">
                    {l(pillar.body)}
                  </p>
                </div>
              </SectionReveal>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ STATS — animated counters ═══════ */}
      <section className="w-full py-16 sm:py-20 md:py-28 lg:py-32 bg-[#495F2B]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {t.stats.map((stat, i) => (
              <SectionReveal key={i} delay={i * 100}>
                <div className="flex flex-col">
                  <p className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold text-white leading-none">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} delay={i * 150} />
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-white/50 mt-3">
                    {l(stat.label)}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="w-full py-16 sm:py-20 md:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <SectionReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-[#111B12] leading-tight">
              {l(t.ctaTitle)}
            </h2>
          </SectionReveal>
          <SectionReveal delay={200}>
            <MagneticButton className="mt-8 md:mt-10 inline-block">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-white leading-relaxed border border-[#495F2B] bg-[#495F2B] px-5 sm:px-6 py-2 hover:bg-[#627F38] hover:border-[#627F38] transition-all duration-300 cursor-pointer"
              >
                {l(t.ctaButton)}
                <Icons.CgArrowTopRight className="size-4" aria-hidden />
              </Link>
            </MagneticButton>
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
      <div className="w-[1px] h-10 bg-white/30 relative overflow-hidden">
        <div className="w-full h-1/2 bg-[#627F38] absolute scroll-pulse-anim" />
      </div>
      <style jsx>{`
        @keyframes scrollPulseKf { 0%, 100% { top: -50%; opacity: 0; } 50% { top: 100%; opacity: 1; } }
        .scroll-pulse-anim { animation: scrollPulseKf 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

/* ════════════════ Founder Card ════════════════ */

function FounderCard({
  founder,
  language,
  viewProfileLabel,
}: {
  founder: {
    name: { en: string; ko: string };
    role: { en: string; ko: string };
    credentials: { en: string; ko: string };
    image: string;
    imageHover: string;
    slug: string;
    bio: { en: string; ko: string };
    highlight: { en: string; ko: string };
    career: { company: { en: string; ko: string }; role: { en: string; ko: string }; location: { en: string; ko: string }; current: boolean }[];
  };
  language: string;
  viewProfileLabel: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const l = (obj: { en: string; ko: string }) => (language === "KOR" ? obj.ko : obj.en);

  return (
    <div>
      {/* ── Portrait Card ── */}
      <div
        className="relative w-full aspect-square mb-8 rounded-lg overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={isHovered ? founder.imageHover : founder.image}
          alt={l(founder.name)}
          fill
          className="object-cover"
          style={{ objectPosition: "center 15%" }}
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={90}
        />
      </div>

      {/* ── Founder info ── */}
      <SectionReveal>
        <p className="text-xs sm:text-sm font-semibold text-[#627F38] tracking-wider uppercase">
          {l(founder.role)}
        </p>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#111B12] leading-tight mt-1">
          {l(founder.name)}
        </h3>
        <p className="text-xs sm:text-sm text-[#111B12]/50 mt-1">
          {l(founder.credentials)}
        </p>
      </SectionReveal>

      <SectionReveal delay={100}>
        <p className="text-base md:text-lg text-[#111B12]/70 leading-relaxed mt-4">
          {l(founder.bio)}
        </p>
      </SectionReveal>

      <SectionReveal delay={150}>
        <div className="mt-5 p-4 bg-[#F9F8F4] rounded-lg">
          <p className="text-sm md:text-base font-semibold text-[#495F2B]">
            {l(founder.highlight)}
          </p>
        </div>
      </SectionReveal>

      <SectionReveal delay={250}>
        <CareerTimeline steps={founder.career} language={language} />
      </SectionReveal>

      <SectionReveal delay={300}>
        <div className="mt-6">
          <Link
            href={`/leadership/${founder.slug}`}
            className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-[#627F38] hover:text-[#495F2B] transition-colors duration-300"
          >
            {viewProfileLabel}
            <Icons.CgArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </SectionReveal>
    </div>
  );
}
