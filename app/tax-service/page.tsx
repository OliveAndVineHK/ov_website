"use client";

import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { taxServicePageTranslations } from "@/app/utils/pageTaxServiceUtils";
import { learnMoreTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import ServiceCTA from "@/app/components/ServiceCTA";
import ServiceBadge from "@/app/components/ServiceBadge";
import SectionReveal from "@/app/components/SectionReveal";
import HeroAccentLine from "@/app/components/HeroAccentLine";
import { ServiceAccentProvider } from "@/app/contexts/ServiceAccentContext";
import * as Icons from "@/app/utils/icons";
import { useState, useRef, useEffect } from "react";

interface TimelineItemData {
  month: { en: string; ko: string };
  event: { en: string; ko: string };
  description: { en: string; ko: string };
  category: string;
}

interface CategoryData {
  key: string;
  label: { en: string; ko: string };
  color: string;
}

function TimelineItemComponent({ item, index, language, categoryColor }: { item: TimelineItemData; index: number; language: string; categoryColor: string }) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const month = language === "KOR" ? item.month.ko : item.month.en;
  const event = language === "KOR" ? item.event.ko : item.event.en;
  const description = language === "KOR" ? item.description.ko : item.description.en;

  return (
    <div ref={ref} className="relative transition-all duration-500" style={{ opacity: isInView ? 1 : 0, transitionDelay: `${index * 100}ms` }}>
      {/* Timeline Dot with glow */}
      <div
        className="absolute top-1 w-5 h-5 rounded-full ring-4 ring-white shadow-sm transition-all duration-300"
        style={{
          left: "-1.4rem",
          backgroundColor: categoryColor,
          boxShadow: isInView ? `0 0 12px ${categoryColor}, 0 0 4px rgba(0,0,0,0.1)` : "0 2px 4px rgba(0,0,0,0.1)",
        }}
      />

      {/* Month Badge */}
      <div
        className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white uppercase tracking-wide mb-2 transition-all duration-300"
        style={{ backgroundColor: categoryColor }}
      >
        {month}
      </div>

      {/* Event Title */}
      <h4 className="text-lg md:text-xl font-bold text-[#111B12] mb-1.5">
        {event}
      </h4>

      {/* Description */}
      <p className="text-base md:text-lg text-[#111B12]/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function TaxServicePage() {
  const { language } = useLanguage();
  const t = taxServicePageTranslations;
  const [activeCategory, setActiveCategory] = useState("all");
  const heroTitle = language === "KOR" ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = language === "KOR" ? t.heroSubtitle.ko : t.heroSubtitle.en;
  const taxTitle = language === "KOR" ? t.taxTitle.ko : t.taxTitle.en;
  const profitsTaxTitle = language === "KOR" ? t.profitsTaxTitle.ko : t.profitsTaxTitle.en;
  const profitsTaxItems = language === "KOR" ? t.profitsTaxItems.ko : t.profitsTaxItems.en;
  const salariesTaxTitle = language === "KOR" ? t.salariesTaxTitle.ko : t.salariesTaxTitle.en;
  const salariesTaxItems = language === "KOR" ? t.salariesTaxItems.ko : t.salariesTaxItems.en;
  const taxAdvisoryTitle = language === "KOR" ? t.taxAdvisoryTitle.ko : t.taxAdvisoryTitle.en;
  const taxAdvisoryItems = language === "KOR" ? t.taxAdvisoryItems.ko : t.taxAdvisoryItems.en;
  const taxServiceIntro = language === "KOR" ? t.taxServiceIntro.ko : t.taxServiceIntro.en;

  const categories = t.taxTimeline.categories as CategoryData[];
  const getCategoryColor = (categoryKey: string): string => {
    const cat = categories.find((c) => c.key === categoryKey);
    return cat ? cat.color : "#627F38";
  };
  const filteredItems = activeCategory === "all"
    ? t.taxTimeline.items
    : t.taxTimeline.items.filter((item) => item.category === activeCategory);

  return (
    <ServiceAccentProvider serviceType="tax">
      <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <iframe src="https://player.vimeo.com/video/1160897627?autoplay=1&loop=1&muted=1&background=1" className="absolute left-1/2 top-1/2 pointer-events-none w-full h-full min-w-full min-h-full" style={{ width: "max(100%, 177.78vh)", minWidth: "100%", height: "max(100%, 56.25vw)", minHeight: "100%", transform: "translate(-50%, -50%) scale(1.15)" }} title="Tax services background" allow="autoplay; fullscreen; picture-in-picture" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-[1]" />
        <ServiceBadge />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-center justify-center text-center pb-0 min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[96px] font-light text-white mb-2 sm:mb-2.5 md:mb-3 leading-tight text-center w-full px-1 sm:px-0">
            {heroTitle}
          </h2>
          <HeroAccentLine color="#627F38" />
          <p className="text-sm sm:text-base md:text-lg lg:text-[20px] text-[#FFFFFF]/70 w-full text-center max-w-2xl sm:max-w-none mx-auto px-1 sm:px-0 leading-relaxed mt-4 sm:mt-5 md:mt-6">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Intro */}
      <SectionReveal>
        <section className="w-full pt-12 pb-4 sm:pt-14 sm:pb-5 md:pt-20 md:pb-6 lg:pt-24 lg:pb-6 xl:pt-30 xl:pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 text-justify">
            <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
              {taxServiceIntro.split("<br><br>").map((paragraph, i) => (
                <span key={i} className="block text-base sm:text-lg md:text-xl lg:text-[20px] text-[#111B12] text-justify">
                  {paragraph}
                </span>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Tax Service Categories */}
      <SectionReveal>
        <section className="w-full my-6 sm:my-8 md:my-12 lg:my-16 xl:my-20 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 relative overflow-hidden" style={{ backgroundImage: "url('/services/t1.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#F5F3E8]/60 z-0"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full relative z-10">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] mb-8 md:mb-10 lg:mb-12">
              {taxTitle}
            </h2>

            {/* Profits Tax Card */}
            <div className="mb-6 md:mb-8 lg:mb-10">
              <div className="bg-white/95 backdrop-blur-sm border-l-4 border-[#627F38] p-6 md:p-8 lg:p-10 rounded shadow-lg">
                <h3 className="text-lg md:text-xl font-bold text-[#111B12] mb-4">
                  {profitsTaxTitle}
                </h3>
                <p className="text-lg sm:text-xl md:text-[20px] text-[#111B12] mb-6 leading-relaxed text-justify">
                  {language === "KOR" ? t.profitsTaxDescription.ko : t.profitsTaxDescription.en}
                </p>
                <ul className="flex flex-col gap-3 md:gap-4 list-none pl-0">
                  {profitsTaxItems.map((item, i) => (
                    <li key={i} className="flex gap-2 leading-relaxed">
                      <span className="inline-block flex-shrink-0 w-2 h-2 rounded-full bg-[#627F38] mt-2"></span>
                      <span className="block text-base sm:text-lg md:text-[18px] text-[#111B12]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Salaries Tax Card */}
            <div className="mb-6 md:mb-8 lg:mb-10">
              <div className="bg-white/95 backdrop-blur-sm border-l-4 border-[#627F38] p-6 md:p-8 lg:p-10 rounded shadow-lg">
                <h3 className="text-lg md:text-xl font-bold text-[#111B12] mb-4">
                  {salariesTaxTitle}
                </h3>
                <p className="text-lg sm:text-xl md:text-[20px] text-[#111B12] mb-6 leading-relaxed text-justify">
                  {language === "KOR" ? t.salariesTaxDescription.ko : t.salariesTaxDescription.en}
                </p>
                <ul className="flex flex-col gap-3 md:gap-4 list-none pl-0">
                  {salariesTaxItems.map((item, i) => (
                    <li key={i} className="flex gap-2 leading-relaxed">
                      <span className="inline-block flex-shrink-0 w-2 h-2 rounded-full bg-[#627F38] mt-2"></span>
                      <span className="block text-base sm:text-lg md:text-[18px] text-[#111B12]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tax Advisory Card */}
            <div className="mb-0">
              <div className="bg-white/95 backdrop-blur-sm border-l-4 border-[#627F38] p-6 md:p-8 lg:p-10 rounded shadow-lg">
                <h3 className="text-lg md:text-xl font-bold text-[#111B12] mb-4">
                  {taxAdvisoryTitle}
                </h3>
                <p className="text-lg sm:text-xl md:text-[20px] text-[#111B12] mb-6 leading-relaxed text-justify">
                  {language === "KOR" ? t.taxAdvisoryDescription.ko : t.taxAdvisoryDescription.en}
                </p>
                <ul className="flex flex-col gap-3 md:gap-4 list-none pl-0">
                  {taxAdvisoryItems.map((item, i) => (
                    <li key={i} className="flex gap-2 leading-relaxed">
                      <span className="inline-block flex-shrink-0 w-2 h-2 rounded-full bg-[#627F38] mt-2"></span>
                      <span className="block text-base sm:text-lg md:text-[18px] text-[#111B12]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Enhanced Tax Timeline with Category Filter */}
      <SectionReveal delay={100}>
        <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] mb-6 md:mb-8 border-l-2 border-[#627F38] pl-4">
              {language === "KOR" ? "홍콩 세무 일정" : "Hong Kong Tax Calendar"}
            </h2>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 md:mb-10 lg:mb-14">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;
                const label = language === "KOR" ? cat.label.ko : cat.label.en;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className="px-4 py-2 rounded-full text-base md:text-lg font-medium transition-all duration-300 border cursor-pointer"
                    style={{
                      backgroundColor: isActive ? cat.color : "transparent",
                      color: isActive ? "#FFFFFF" : cat.color,
                      borderColor: cat.color,
                      boxShadow: isActive ? `0 2px 8px ${cat.color}40` : "none",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Timeline Column - Full Width */}
            <div className="relative pl-8 md:pl-10">
              {/* Vertical Timeline Line - color follows active category */}
              <div
                className="absolute left-3 md:left-4 top-0 bottom-0 w-0.5 transition-colors duration-300"
                style={{ backgroundColor: activeCategory === "all" ? "#627F38" : getCategoryColor(activeCategory) }}
              />

              {/* Timeline Items */}
              <div className="flex flex-col gap-8 md:gap-10 lg:gap-12">
                {filteredItems.map((item, index) => (
                  <TimelineItemComponent
                    key={`${item.category}-${index}`}
                    item={item as TimelineItemData}
                    index={index}
                    language={language}
                    categoryColor={getCategoryColor(item.category)}
                  />
                ))}
              </div>

              {/* Empty state when filter yields no results */}
              {filteredItems.length === 0 && (
                <p className="text-center text-[#111B12]/50 py-8">
                  {language === "KOR" ? "해당 카테고리에 일정이 없습니다." : "No events in this category."}
                </p>
              )}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* CTA */}
      <div className="h-12 sm:h-16 md:h-20 lg:h-24 bg-white" />
      <ServiceCTA serviceType="tax" />

      {/* Insights */}
      <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 2xl:py-[7.5rem] relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-start w-full">
          <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38]">
            {language === "KOR" ? learnMoreTranslations.title.ko : learnMoreTranslations.title.en}
          </span>
          <InsightCards language={language} translations={learnMoreTranslations.card} tagOverride={t.insightTag} action={<Link href="/insights" className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-[#111B12]/70 leading-relaxed rounded-full border border-[#111B12]/50 px-4 sm:px-5 py-2 sm:py-1.5 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer shrink-0 min-h-[44px] sm:min-h-0 items-center justify-center">{language === "KOR" ? learnMoreTranslations.button.ko : learnMoreTranslations.button.en}<Icons.CgArrowTopRight className="size-4" aria-hidden /></Link>} />
        </div>
      </section>
    </div>
    </ServiceAccentProvider>
  );
}
