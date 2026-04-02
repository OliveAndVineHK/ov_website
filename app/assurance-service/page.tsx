"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { assuranceServicePageTranslations } from "@/app/utils/pageAssuranceServiceUtils";
import { learnMoreTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import ServiceCTA from "@/app/components/ServiceCTA";
import ServiceBadge from "@/app/components/ServiceBadge";
import SectionReveal from "@/app/components/SectionReveal";
import HeroAccentLine from "@/app/components/HeroAccentLine";
import { ServiceAccentProvider } from "@/app/contexts/ServiceAccentContext";
import * as Icons from "@/app/utils/icons";
import { useState } from "react";
// Icon map is removed - using colored circles instead for compatibility

interface AuditProcedureItem {
  title: string;
  description: string;
}

interface AuditFlipCardProps {
  item: AuditProcedureItem;
  index: number;
}

function AuditFlipCard({ item, index }: AuditFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-64 cursor-pointer perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-300"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full bg-white border border-[#627F38]/30 rounded-lg p-6 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-10 h-10 rounded-full bg-[#627F38] mb-4" aria-hidden="true" />
          <h4 className="text-base md:text-lg font-bold text-[#111B12] mb-2">
            {item.title}
          </h4>
          <p className="text-xs text-[#111B12]/60">Tap to reveal</p>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full bg-[#495F2B] text-white rounded-lg p-6 flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="text-sm text-white text-center leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AssuranceServicePage() {
  const { language } = useLanguage();
  const t = assuranceServicePageTranslations;
  const heroTitle = language === "KOR" ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = language === "KOR" ? t.heroSubtitle.ko : t.heroSubtitle.en;
  const auditTitle = language === "KOR" ? t.auditTitle.ko : t.auditTitle.en;
  const externalAuditTitle = language === "KOR" ? t.externalAuditTitle.ko : t.externalAuditTitle.en;
  const externalAuditItems = language === "KOR" ? t.externalAuditItems.ko : t.externalAuditItems.en;
  const otherAssuranceTitle = language === "KOR" ? t.otherAssuranceTitle.ko : t.otherAssuranceTitle.en;
  const otherAssuranceItems = language === "KOR" ? t.otherAssuranceItems.ko : t.otherAssuranceItems.en;
  const assuranceServiceIntro = language === "KOR" ? t.assuranceServiceIntro.ko : t.assuranceServiceIntro.en;
  const whatIsExternalAuditTitle = language === "KOR" ? t.whatIsExternalAuditTitle.ko : t.whatIsExternalAuditTitle.en;
  const whatIsExternalAuditDescription = language === "KOR" ? t.whatIsExternalAuditDescription.ko : t.whatIsExternalAuditDescription.en;
  const whatIsOtherAssuranceTitle = language === "KOR" ? t.whatIsOtherAssuranceTitle.ko : t.whatIsOtherAssuranceTitle.en;
  const whatIsOtherAssuranceDescription = language === "KOR" ? t.whatIsOtherAssuranceDescription.ko : t.whatIsOtherAssuranceDescription.en;
  const auditPhilosophyDescription = language === "KOR" ? t.auditPhilosophyDescription.ko : t.auditPhilosophyDescription.en;
  const commonAuditProceduresTitle = language === "KOR" ? t.commonAuditProceduresTitle.ko : t.commonAuditProceduresTitle.en;
  const commonAuditProceduresDescription = language === "KOR" ? t.commonAuditProceduresDescription.ko : t.commonAuditProceduresDescription.en;
  const commonAuditProceduresItems = language === "KOR" ? t.commonAuditProceduresItems.ko : t.commonAuditProceduresItems.en;

  return (
    <ServiceAccentProvider serviceType="assurance">
      <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <iframe src="https://player.vimeo.com/video/1160105303?autoplay=1&loop=1&muted=1&background=1" className="absolute left-1/2 top-1/2 pointer-events-none w-full h-full min-w-full min-h-full"
            style={{width: "max(100%, 177.78vh)", minWidth: "100%", height: "max(100%, 56.25vw)", minHeight: "100%", transform: "translate(-50%, -50%) scale(1.15)",}} title="Assurance services background" allow="autoplay; fullscreen; picture-in-picture"/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-[1]" />
        <ServiceBadge />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-center justify-center text-center pb-0 min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[96px] font-light text-[#FFFFFF] mb-2 sm:mb-2.5 md:mb-3 leading-tight text-center w-full">
            {heroTitle}
          </h2>
          <HeroAccentLine color="#627F38" />
          <p className="text-xs sm:text-sm md:text-base lg:text-[20px] text-[#FFFFFF]/70 w-full text-center mt-4 sm:mt-5 md:mt-6">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Intro */}
      <SectionReveal>
        <section className="w-full pt-12 pb-4 sm:pt-14 sm:pb-5 md:pt-20 md:pb-6 lg:pt-24 lg:pb-6 xl:pt-30 xl:pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 text-justify">
            <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
              {assuranceServiceIntro.split("<br><br>").map((paragraph, i) => (
                <span key={i} className="block text-base lg:text-lg text-[#111B12] text-justify">
                  {paragraph}
                </span>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Service Explanation Cards */}
      <SectionReveal delay={100}>
        <section className="w-full pt-12 pb-4 sm:pt-14 sm:pb-5 md:pt-20 md:pb-6 lg:pt-24 lg:pb-6 xl:pt-30 xl:pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
              {/* External Audit Card */}
              <div className="bg-white border border-[#111B12]/10 rounded-lg p-6 md:p-8 lg:p-10 border-t-[4px] border-t-[#627F38]">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] mb-4 md:mb-5 lg:mb-6">
                  {whatIsExternalAuditTitle}
                </h3>
                <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
                  {whatIsExternalAuditDescription.split("<br><br>").map((paragraph, i) => (
                    <p key={i} className="text-base text-[#111B12] text-justify leading-relaxed m-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Other Assurance Card */}
              <div className="bg-white border border-[#111B12]/10 rounded-lg p-6 md:p-8 lg:p-10 border-l-[4px] border-l-[#627F38]">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] mb-4 md:mb-5 lg:mb-6">
                  {whatIsOtherAssuranceTitle}
                </h3>
                <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
                  {whatIsOtherAssuranceDescription.split("<br><br>").map((paragraph, i) => (
                    <p key={i} className="text-base text-[#111B12] text-justify leading-relaxed m-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Audit Services List - Numbered Items */}
      <SectionReveal delay={200}>
        <section className="w-full py-12 sm:py-14 md:py-20 lg:py-24 xl:py-30 relative overflow-hidden bg-[#F5F3E8]">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#F5F3E8]/80" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
              {/* External Audit Column */}
              <div className="flex flex-col">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] mb-6 md:mb-7 lg:mb-8 border-l-4 border-l-[#627F38] pl-4">
                  {externalAuditTitle}
                </h3>
                <ul className="flex flex-col gap-3 md:gap-4 list-none pl-0">
                  {externalAuditItems.map((item, i) => (
                    <li key={i} className="flex gap-3 leading-relaxed items-start">
                      <span className="inline-flex items-center justify-center flex-shrink-0 w-7 h-7 rounded-full bg-[#627F38] text-white text-xs font-bold mt-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base text-[#111B12] pt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other Assurance Column */}
              <div className="flex flex-col">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] mb-6 md:mb-7 lg:mb-8 border-l-4 border-l-[#627F38] pl-4">
                  {otherAssuranceTitle}
                </h3>
                <ul className="flex flex-col gap-3 md:gap-4 list-none pl-0">
                  {otherAssuranceItems.map((item, i) => (
                    <li key={i} className="flex gap-3 leading-relaxed items-start">
                      <span className="inline-flex items-center justify-center flex-shrink-0 w-7 h-7 rounded-full bg-[#627F38] text-white text-xs font-bold mt-0">
                        {String(externalAuditItems.length + i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base text-[#111B12] pt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Diagram + Philosophy */}
      <SectionReveal delay={300}>
        <section className="w-full py-12 sm:py-14 md:py-20 lg:py-24 xl:py-30 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
              {/* Diagram */}
              <div className="relative w-full max-h-[200px] sm:max-h-[250px] md:max-h-[300px] lg:max-h-[520px] flex items-center justify-center order-first lg:order-1">
                <Image
                  src="/services/au2.svg"
                  alt="Audit and assurance types diagram"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Philosophy Text */}
              <div className="w-full flex flex-col justify-center order-1 lg:order-2">
                <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 text-base text-[#111B12] leading-relaxed">
                  {auditPhilosophyDescription.split("<br><br>").map((paragraph, i) => (
                    <p key={i} className="m-0 text-base text-[#111B12] text-justify">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Common Audit Procedures - Flip Cards */}
      <SectionReveal delay={400}>
        <section className="w-full pt-12 pb-4 sm:pt-14 sm:pb-5 md:pt-20 md:pb-6 lg:pt-24 lg:pb-6 xl:pt-30 xl:pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] mb-4 md:mb-5 lg:mb-6 border-l-4 border-l-[#627F38] pl-4">
              {commonAuditProceduresTitle}
            </h3>
            <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 mb-8 md:mb-10 lg:mb-12">
              {commonAuditProceduresDescription.split("<br><br>").map((paragraph, i) => (
                <p key={i} className="text-base text-[#111B12] text-justify m-0">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* FlipCard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-6">
              {commonAuditProceduresItems.map((item, i) => {
                const isLastOdd = i === commonAuditProceduresItems.length - 1 && commonAuditProceduresItems.length % 3 === 1;
                return (
                  <div key={i} className={isLastOdd ? "lg:col-start-2" : ""}>
                    <AuditFlipCard item={item} index={i} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* CTA */}
      <div className="h-12 sm:h-16 md:h-20 lg:h-24 bg-white" />
      <ServiceCTA serviceType="assurance" />

      {/* Insights */}
      <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16 xl:py-[7.5rem] relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-start w-full">
          <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38]">
            {language === "KOR" ? learnMoreTranslations.title.ko : learnMoreTranslations.title.en}
          </span>
          <InsightCards language={language} translations={learnMoreTranslations.card} tagOverride={t.insightTag} action={<Link href="/insights" className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-[#111B12]/70 leading-relaxed rounded-full border border-[#111B12]/50 px-5 py-1.5 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer shrink-0">{language === "KOR" ? learnMoreTranslations.button.ko : learnMoreTranslations.button.en}<Icons.CgArrowTopRight className="size-4" aria-hidden /></Link>} />
        </div>
      </section>
    </div>
    </ServiceAccentProvider>
  );
}
