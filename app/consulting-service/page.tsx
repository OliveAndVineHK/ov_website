"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { consultingServicePageTranslations } from "@/app/utils/pageConsultingServiceUtils";
import { learnMoreTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import ServiceCTA from "@/app/components/ServiceCTA";
import ServiceBadge from "@/app/components/ServiceBadge";
import SectionReveal from "@/app/components/SectionReveal";
import HeroAccentLine from "@/app/components/HeroAccentLine";
import { ServiceAccentProvider } from "@/app/contexts/ServiceAccentContext";
import * as Icons from "@/app/utils/icons";

export default function ConsultingServicePage() {
  const { language } = useLanguage();
  const t = consultingServicePageTranslations;
  const heroTitle = language === "KOR" ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = language === "KOR" ? t.heroSubtitle.ko : t.heroSubtitle.en;
  const sectionTitle = language === "KOR" ? t.sectionTitle.ko : t.sectionTitle.en;
  const internalTitle = language === "KOR" ? t.internalTitle.ko : t.internalTitle.en;
  const internalItems = language === "KOR" ? t.internalItems.ko : t.internalItems.en;
  const hrServiceTitle = language === "KOR" ? t.hrServiceTitle.ko : t.hrServiceTitle.en;
  const hrServiceItems = language === "KOR" ? t.hrServiceItems.ko : t.hrServiceItems.en;
  const othersTitle = language === "KOR" ? t.othersTitle.ko : t.othersTitle.en;
  const othersItems = language === "KOR" ? t.othersItems.ko : t.othersItems.en;
  const innovatingTitle = language === "KOR" ? t.innovatingTitle.ko : t.innovatingTitle.en;
  const consultingServiceIntro = language === "KOR" ? t.consultingServiceIntro.ko : t.consultingServiceIntro.en;
  const methodologyTitle = language === "KOR" ? t.methodologyTitle.ko : t.methodologyTitle.en;
  const methodologyDescription = language === "KOR" ? t.methodologyDescription.ko : t.methodologyDescription.en;
  const methodologyItems = language === "KOR" ? t.methodologyItems.ko : t.methodologyItems.en;

  return (
    <ServiceAccentProvider serviceType="consulting">
      <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <iframe src="https://player.vimeo.com/video/1160909295?autoplay=1&loop=1&muted=1&background=1" className="absolute left-1/2 top-1/2 pointer-events-none w-full h-full min-w-full min-h-full" style={{ width: "max(100%, 177.78vh)", minWidth: "100%", height: "max(100%, 56.25vw)", minHeight: "100%", transform: "translate(-50%, -50%) scale(1.15)" }} title="Consulting services background" allow="autoplay; fullscreen; picture-in-picture" />
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
            <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
              {consultingServiceIntro.split("<br><br>").map((paragraph, i) => (
                <span key={i} className="block text-base lg:text-lg text-[#111B12] text-justify">
                  {paragraph}
                </span>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Service Categories */}
      <SectionReveal>
        <section className="w-full py-12 sm:py-14 md:py-20 lg:py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')" }}>
          <div className="absolute inset-0 bg-[#F5F3E8]/85 z-0"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 relative z-10">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] mb-8 md:mb-10 lg:mb-12 border-l-4 border-[#627F38] pl-4">
              {sectionTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {/* Internal Services Card */}
              <div className="bg-white/95 backdrop-blur-sm border border-[#627F38]/30 rounded-lg p-6 md:p-7 lg:p-8 relative overflow-hidden shadow-md hover:shadow-lg hover:border-[#627F38]/50 hover:scale-[1.02] transition-all duration-300 group">
                <div className="absolute top-0 left-0 h-full w-1 bg-[#627F38]"></div>
                <div className="flex items-center gap-2 mb-4 md:mb-5">
                  <Icons.TbBuildingSkyscraper className="w-5 h-5 text-[#627F38]" aria-hidden />
                  <h3 className="text-base md:text-lg font-bold text-[#111B12] group-hover:text-[#627F38] transition-colors duration-300">
                    {internalTitle}
                  </h3>
                </div>
                <ul className="flex flex-col gap-3 md:gap-3 list-none pl-0">
                  {internalItems.map((item, i) => (
                    <li key={i} className="flex gap-2 leading-relaxed">
                      <Icons.TbCheck className="inline-block flex-shrink-0 w-5 h-5 text-[#9FD74F] mt-0.5" aria-hidden />
                      <span className="block text-sm md:text-base text-[#111B12]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* HR Service Card */}
              <div className="bg-white/95 backdrop-blur-sm border border-[#627F38]/30 rounded-lg p-6 md:p-7 lg:p-8 relative overflow-hidden shadow-md hover:shadow-lg hover:border-[#627F38]/50 hover:scale-[1.02] transition-all duration-300 group">
                <div className="absolute top-0 left-0 h-full w-1 bg-[#627F38]"></div>
                <div className="flex items-center gap-2 mb-4 md:mb-5">
                  <Icons.TbUsers className="w-5 h-5 text-[#627F38]" aria-hidden />
                  <h3 className="text-base md:text-lg font-bold text-[#111B12] group-hover:text-[#627F38] transition-colors duration-300">
                    {hrServiceTitle}
                  </h3>
                </div>
                <ul className="flex flex-col gap-3 md:gap-3 list-none pl-0">
                  {hrServiceItems.map((item, i) => (
                    <li key={i} className="flex gap-2 leading-relaxed">
                      <Icons.TbCheck className="inline-block flex-shrink-0 w-5 h-5 text-[#9FD74F] mt-0.5" aria-hidden />
                      <span className="block text-sm md:text-base text-[#111B12]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Others Card */}
              <div className="bg-white/95 backdrop-blur-sm border border-[#627F38]/30 rounded-lg p-6 md:p-7 lg:p-8 relative overflow-hidden shadow-md hover:shadow-lg hover:border-[#627F38]/50 hover:scale-[1.02] transition-all duration-300 group">
                <div className="absolute top-0 left-0 h-full w-1 bg-[#627F38]"></div>
                <div className="flex items-center gap-2 mb-4 md:mb-5">
                  <Icons.TbStar className="w-5 h-5 text-[#627F38]" aria-hidden />
                  <h3 className="text-base md:text-lg font-bold text-[#111B12] group-hover:text-[#627F38] transition-colors duration-300">
                    {othersTitle}
                  </h3>
                </div>
                <ul className="flex flex-col gap-3 md:gap-3 list-none pl-0">
                  {othersItems.map((item, i) => (
                    <li key={i} className="flex gap-2 leading-relaxed">
                      <Icons.TbCheck className="inline-block flex-shrink-0 w-5 h-5 text-[#9FD74F] mt-0.5" aria-hidden />
                      <span className="block text-sm md:text-base text-[#111B12]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Quote Section — clean cream bg */}
      <SectionReveal delay={100}>
        <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#F5F3E8] relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-center text-center w-full gap-4 sm:gap-5 md:gap-6">
            <Image src="/services/q2.svg" alt="" width={80} height={80} className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain opacity-60" aria-hidden />
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[48px] font-light text-[#111B12] leading-tight" dangerouslySetInnerHTML={{ __html: innovatingTitle }} />
            <Image src="/services/q1.svg" alt="" width={80} height={80} className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain opacity-60" aria-hidden />
          </div>
        </section>
      </SectionReveal>

      {/* Methodology */}
      <SectionReveal delay={200}>
        <section className="w-full pt-12 pb-4 sm:pt-14 sm:pb-5 md:pt-20 md:pb-6 lg:pt-24 lg:pb-6 xl:pt-30 xl:pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] mb-4 md:mb-5 lg:mb-6">
              {methodologyTitle}
            </h3>
            <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 mb-8 md:mb-10 lg:mb-12">
              {methodologyDescription.split("<br><br>").map((paragraph, i) => (
                <span key={i} className="block text-base text-[#111B12] text-justify">
                  {paragraph}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 relative">
              {/* Vertical connecting line for desktop */}
              <div className="hidden lg:block absolute left-1/2 top-12 bottom-0 w-px bg-[#627F38]/30 transform -translate-x-1/2" />

              {methodologyItems.map((item, i) => (
                <div key={i} className={`bg-white border border-[#111B12]/20 rounded-lg p-6 md:p-7 lg:p-8 relative hover:border-[#627F38] hover:shadow-lg hover:scale-[1.02] transition-all duration-300 stagger-item`}>
                  {/* Numbered Badge - Left Side */}
                  <div className="flex gap-4 md:gap-5 mb-4 md:mb-5">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#627F38] text-white text-sm md:text-base font-bold ring-2 ring-[#627F38]/20">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base md:text-lg lg:text-xl font-bold text-[#111B12]">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-[#111B12] leading-relaxed text-justify pl-0 md:pl-4">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* CTA */}
      <div className="h-12 sm:h-16 md:h-20 lg:h-24 bg-white" />
      <ServiceCTA serviceType="consulting" />

      {/* Insights */}
      <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16 xl:py-[7.5rem] relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-start w-full">
          <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38]">
            {language === "KOR" ? learnMoreTranslations.title.ko : learnMoreTranslations.title.en}
          </span>
          <InsightCards language={language} translations={learnMoreTranslations.card} tagOverride={t.insightTag} secondPageFirstCardBigDataDriven secondPageSecondCardDigitalTransformationTVP secondPageThirdCardLegalConsiderationsMA action={<Link href="/insights" className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-[#111B12]/70 leading-relaxed rounded-full border border-[#111B12]/50 px-5 py-1.5 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer shrink-0">{language === "KOR" ? learnMoreTranslations.button.ko : learnMoreTranslations.button.en}<Icons.CgArrowTopRight className="size-4" aria-hidden /></Link>} />
        </div>
      </section>
    </div>
    </ServiceAccentProvider>
  );
}
