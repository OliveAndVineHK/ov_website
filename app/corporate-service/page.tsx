"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { corporateServicePageTranslations } from "@/app/utils/pageCorporateServiceUtils";
import { learnMoreTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import ServiceCTA from "@/app/components/ServiceCTA";
import ServiceBadge from "@/app/components/ServiceBadge";
import SectionReveal from "@/app/components/SectionReveal";
import HeroAccentLine from "@/app/components/HeroAccentLine";
import { ServiceAccentProvider } from "@/app/contexts/ServiceAccentContext";
import * as Icons from "@/app/utils/icons";

export default function CorporateServicePage() {
  const { language } = useLanguage();
  const t = corporateServicePageTranslations;
  const heroTitle = language === "KOR" ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = language === "KOR" ? t.heroSubtitle.ko : t.heroSubtitle.en;
  const section1Title = language === "KOR" ? t.whatIsCompanySecretary.ko : t.whatIsCompanySecretary.en;
  const section1Items = language === "KOR" ? t.whatIsItems.ko : t.whatIsItems.en;
  const section2Title = language === "KOR" ? t.keyResponsibilities.ko : t.keyResponsibilities.en;
  const section2Items = language === "KOR" ? t.keyResponsibilitiesItems.ko : t.keyResponsibilitiesItems.en;
  const startUpTitle = language === "KOR" ? t.startUp.ko : t.startUp.en;
  const startUpItems = language === "KOR" ? t.startUpItems.ko : t.startUpItems.en;
  const inBusinessTitle = language === "KOR" ? t.inBusiness.ko : t.inBusiness.en;
  const inBusinessItems = language === "KOR" ? t.inBusinessItems.ko : t.inBusinessItems.en;
  const exitTitle = language === "KOR" ? t.exit.ko : t.exit.en;
  const exitItems = language === "KOR" ? t.exitItems.ko : t.exitItems.en;
  const corporateServicesIntro = language === "KOR" ? t.corporateServicesIntro.ko : t.corporateServicesIntro.en;
  const startUpDescription = language === "KOR" ? t.startUpDescription.ko : t.startUpDescription.en;
  const inBusinessDescription = language === "KOR" ? t.inBusinessDescription.ko : t.inBusinessDescription.en;
  const exitDescription = language === "KOR" ? t.exitDescription.ko : t.exitDescription.en;
  const digitalisationTitle = language === "KOR" ? t.digitalisationTitle.ko : t.digitalisationTitle.en;
  const digitalisationDescription = language === "KOR" ? t.digitalisationDescription.ko : t.digitalisationDescription.en;

  return (
    <ServiceAccentProvider serviceType="corporate">
      <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <iframe src="https://player.vimeo.com/video/1160078682?autoplay=1&loop=1&muted=1&background=1" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full h-full min-w-full min-h-full" style={{ width: "max(100%, 177.78vh)", minWidth: "100%", height: "max(100%, 56.25vw)", minHeight: "100%" }} title="Corporate services background" allow="autoplay; fullscreen; picture-in-picture" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-[1]" />
        <ServiceBadge />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-center justify-center text-center pb-0 min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[96px] font-light text-white mb-2 sm:mb-2.5 md:mb-3 leading-tight text-center w-full">
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
            <span className="text-base lg:text-lg text-[#111B12]">
              {corporateServicesIntro}
            </span>
          </div>
        </section>
      </SectionReveal>

      {/* Company Secretary Info - Cream background with two panels */}
      <SectionReveal delay={100}>
      <section className="w-full pt-12 pb-12 sm:pt-14 sm:pb-14 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24 xl:pt-30 xl:pb-30 bg-[#F5F3E8] relative overflow-hidden">
        {/* Decorative SVG Background - Top Right */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] pointer-events-none" style={{ opacity: 0.12 }}>
          <Image
            src="/services/cs1.svg"
            alt=""
            width={600}
            height={600}
            className="w-full h-full object-contain"
            aria-hidden="true"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {/* What Is Panel */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-6 md:mb-8 lg:mb-10 border-l-4 border-[#627F38] pl-4">
                <Icons.TbUserCheck className="w-6 h-6 text-[#627F38] flex-shrink-0" aria-hidden />
                <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-[#111B12]">
                  {section1Title}
                </h3>
              </div>
              <ul className="flex flex-col gap-4 md:gap-5">
                {section1Items.map((item, i) => {
                  const colonIdx = item.indexOf(":");
                  const label = colonIdx >= 0 ? item.slice(0, colonIdx + 1) : "";
                  const rest = colonIdx >= 0 ? item.slice(colonIdx + 1).trimStart() : item;
                  return (
                    <li key={i} className="flex gap-3 leading-relaxed p-3 bg-white/40 rounded-lg hover:bg-white/70 transition-colors duration-300">
                      <Icons.TbCheck className="inline-block flex-shrink-0 w-5 h-5 text-[#9FD74F] mt-0" aria-hidden />
                      <span className="flex flex-col text-base text-[#111B12]">
                        {label ? (
                          <>
                            <strong className="font-bold">{label}</strong>
                            <span className="font-normal text-sm">{rest}</span>
                          </>
                        ) : (
                          item
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* Key Responsibilities Panel */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-6 md:mb-8 lg:mb-10 border-l-4 border-[#627F38] pl-4">
                <Icons.TbClipboardList className="w-6 h-6 text-[#627F38] flex-shrink-0" aria-hidden />
                <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-[#111B12]">
                  {section2Title}
                </h3>
              </div>
              <ul className="flex flex-col gap-4 md:gap-5">
                {section2Items.map((item, i) => {
                  const colonIdx = item.indexOf(":");
                  const label = colonIdx >= 0 ? item.slice(0, colonIdx + 1) : "";
                  const rest = colonIdx >= 0 ? item.slice(colonIdx + 1).trimStart() : item;
                  return (
                    <li key={i} className="flex gap-3 leading-relaxed p-3 bg-white/40 rounded-lg hover:bg-white/70 transition-colors duration-300">
                      <Icons.TbCheck className="inline-block flex-shrink-0 w-5 h-5 text-[#9FD74F] mt-0" aria-hidden />
                      <span className="flex flex-col text-base text-[#111B12]">
                        {label ? (
                          <>
                            <strong className="font-bold">{label}</strong>
                            <span className="font-normal text-sm">{rest}</span>
                          </>
                        ) : (
                          item
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
      </SectionReveal>

      {/* Business Lifecycle Timeline - Vertical */}
      <SectionReveal delay={200}>
      <section className="w-full py-12 sm:py-14 md:py-20 lg:py-24 xl:py-30 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical Timeline Line - Hidden on mobile, visible on md+ */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#627F38] transform -translate-x-1/2" />

            {/* Timeline Stages */}
            <div className="space-y-8 md:space-y-12 lg:space-y-16">
              {/* Stage 1: Start Up */}
              <div className="relative">
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 top-8 w-14 h-14 -translate-x-1/2 items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white border-4 border-[#627F38] flex items-center justify-center hover:ring-4 hover:ring-[#9FD74F]/30 transition-all duration-300">
                    <span className="text-base font-bold text-[#627F38]">01</span>
                  </div>
                </div>

                {/* Mobile Timeline Indicator */}
                <div className="md:hidden flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#627F38] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">01</span>
                  </div>
                </div>

                {/* Content Card */}
                <div className="md:w-1/2 md:pr-12">
                  <div className="bg-white border border-[#627F38]/30 rounded-lg p-6 md:p-8 hover:border-[#627F38] hover:shadow-lg transition-all duration-300" style={{ backgroundColor: 'rgba(159, 215, 79, 0.05)' }}>
                    <div className="flex items-start gap-3 mb-3 md:mb-4">
                      <Icons.TbRocket className="w-6 h-6 text-[#627F38] flex-shrink-0 mt-1" aria-hidden />
                      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#111B12]">
                        {startUpTitle}
                      </h3>
                    </div>
                    <p className="text-base text-[#111B12] text-justify mb-5 md:mb-6 lg:mb-7">
                      {startUpDescription}
                    </p>
                    <ul className="flex flex-col gap-2 md:gap-3">
                      {startUpItems.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <Icons.TbCheck className="inline-block flex-shrink-0 w-5 h-5 text-[#9FD74F] mt-0" aria-hidden />
                          <span className="block text-base text-[#111B12]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Stage 2: In Business */}
              <div className="relative">
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 top-8 w-14 h-14 -translate-x-1/2 items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white border-4 border-[#627F38] flex items-center justify-center hover:ring-4 hover:ring-[#9FD74F]/30 transition-all duration-300">
                    <span className="text-base font-bold text-[#627F38]">02</span>
                  </div>
                </div>

                {/* Mobile Timeline Indicator */}
                <div className="md:hidden flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#627F38] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">02</span>
                  </div>
                </div>

                {/* Content Card - Larger for middle stage */}
                <div className="md:w-1/2 md:ml-auto md:pl-12">
                  <div className="bg-white border border-[#627F38]/30 rounded-lg p-6 md:p-8 lg:p-10 hover:border-[#627F38] hover:shadow-lg transition-all duration-300" style={{ backgroundColor: '#F5F3E8' }}>
                    <div className="flex items-start gap-3 mb-3 md:mb-4">
                      <Icons.TbTrendingUp className="w-6 h-6 text-[#627F38] flex-shrink-0 mt-1" aria-hidden />
                      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#111B12]">
                        {inBusinessTitle}
                      </h3>
                    </div>
                    <p className="text-base text-[#111B12] text-justify mb-5 md:mb-6 lg:mb-7">
                      {inBusinessDescription}
                    </p>
                    <ul className="flex flex-col gap-2 md:gap-3">
                      {inBusinessItems.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <Icons.TbCheck className="inline-block flex-shrink-0 w-5 h-5 text-[#627F38] mt-0" aria-hidden />
                          <span className="block text-base text-[#111B12]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Stage 3: Exit */}
              <div className="relative">
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 top-8 w-14 h-14 -translate-x-1/2 items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white border-4 border-[#627F38] flex items-center justify-center hover:ring-4 hover:ring-[#9FD74F]/30 transition-all duration-300">
                    <span className="text-base font-bold text-[#627F38]">03</span>
                  </div>
                </div>

                {/* Mobile Timeline Indicator */}
                <div className="md:hidden flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#627F38] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">03</span>
                  </div>
                </div>

                {/* Content Card */}
                <div className="md:w-1/2 md:pr-12">
                  <div className="bg-white border border-[#627F38]/30 rounded-lg p-6 md:p-8 hover:border-[#627F38] hover:shadow-lg transition-all duration-300" style={{ backgroundColor: 'rgba(240, 238, 226, 0.5)' }}>
                    <div className="flex items-start gap-3 mb-3 md:mb-4">
                      <Icons.TbLogout className="w-6 h-6 text-[#627F38] flex-shrink-0 mt-1" aria-hidden />
                      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#111B12]">
                        {exitTitle}
                      </h3>
                    </div>
                    <p className="text-base text-[#111B12] text-justify mb-5 md:mb-6 lg:mb-7">
                      {exitDescription}
                    </p>
                    <ul className="flex flex-col gap-2 md:gap-3">
                      {exitItems.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <Icons.TbCheck className="inline-block flex-shrink-0 w-5 h-5 text-[#9FD74F] mt-0" aria-hidden />
                          <span className="block text-base text-[#111B12]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </SectionReveal>

      {/* Digitalisation */}
      <SectionReveal delay={300}>
      <section className="w-full pt-12 pb-12 sm:pt-14 sm:pb-14 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24 xl:pt-30 xl:pb-30 bg-[#F5F3E8] border-t border-[#627F38]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] mb-6 md:mb-8 lg:mb-10">
            {digitalisationTitle}
          </h3>

          {/* Icon Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10 lg:mb-12">
            <div className="flex flex-col items-center gap-2 text-center">
              <Icons.TbCloud className="w-8 h-8 md:w-10 md:h-10 text-[#627F38]" aria-hidden />
              <span className="text-xs md:text-sm font-semibold text-[#111B12]">Cloud</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Icons.TbRobot className="w-8 h-8 md:w-10 md:h-10 text-[#627F38]" aria-hidden />
              <span className="text-xs md:text-sm font-semibold text-[#111B12]">Automation</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Icons.TbPlugConnected className="w-8 h-8 md:w-10 md:h-10 text-[#627F38]" aria-hidden />
              <span className="text-xs md:text-sm font-semibold text-[#111B12]">Integration</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Icons.TbShield className="w-8 h-8 md:w-10 md:h-10 text-[#627F38]" aria-hidden />
              <span className="text-xs md:text-sm font-semibold text-[#111B12]">Security</span>
            </div>
          </div>

          <div className="flex flex-col gap-5 md:gap-6 lg:gap-7">
            {digitalisationDescription.split("<br><br>").map((paragraph, i) => (
              <span key={i} className="block text-base text-[#111B12] text-justify">
                {paragraph}
              </span>
            ))}
          </div>
        </div>
      </section>
      </SectionReveal>

      {/* CTA */}
      <div className="h-12 sm:h-16 md:h-20 lg:h-24 bg-white" />
      <ServiceCTA serviceType="corporate" />

      {/* Insights */}
      <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16 xl:py-[7.5rem] relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-start w-full">
          <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38]">
            {language === "KOR" ? learnMoreTranslations.title.ko : learnMoreTranslations.title.en}
          </span>
          <InsightCards language={language} translations={learnMoreTranslations.card} tagOverride={t.insightTag} firstCardAmendment secondCardIncorporation thirdCardCorporateSecretary action={<Link href="/insights" className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-[#111B12]/70 leading-relaxed rounded-full border border-[#111B12]/50 px-5 py-1.5 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer shrink-0">{language === "KOR" ? learnMoreTranslations.button.ko : learnMoreTranslations.button.en}<Icons.CgArrowTopRight className="size-4" aria-hidden /></Link>} />
        </div>
      </section>
    </div>
    </ServiceAccentProvider>
  );
}
