"use client";

import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { accountingServicePageTranslations } from "@/app/utils/pageAccountingServiceUtils";
import { learnMoreTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import ServiceCTA from "@/app/components/ServiceCTA";
import ServiceBadge from "@/app/components/ServiceBadge";
import SectionReveal from "@/app/components/SectionReveal";
import HeroAccentLine from "@/app/components/HeroAccentLine";
import { ServiceAccentProvider } from "@/app/contexts/ServiceAccentContext";
import * as Icons from "@/app/utils/icons";

export default function AccountingServicePage() {
  const { language } = useLanguage();
  const t = accountingServicePageTranslations;
  const heroTitle = language === "KOR" ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = language === "KOR" ? t.heroSubtitle.ko : t.heroSubtitle.en;
  const accountingServiceIntro = language === "KOR" ? t.accountingServiceIntro.ko : t.accountingServiceIntro.en;
  const bookkeepingTitle = language === "KOR" ? t.bookkeepingTitle.ko : t.bookkeepingTitle.en;
  const bookkeepingDescription = language === "KOR" ? t.bookkeepingDescription.ko : t.bookkeepingDescription.en;
  const bookkeepingItems = language === "KOR" ? t.bookkeepingItems.ko : t.bookkeepingItems.en;
  const accountingSectionTitle = language === "KOR" ? t.accountingSectionTitle.ko : t.accountingSectionTitle.en;
  const accountingSectionDescription = language === "KOR" ? t.accountingSectionDescription.ko : t.accountingSectionDescription.en;
  const accountingSectionItems = language === "KOR" ? t.accountingSectionItems.ko : t.accountingSectionItems.en;
  const privateaccountingTitle = language === "KOR" ? t.privateaccountingTitle.ko : t.privateaccountingTitle.en;
  const privateaccountingDescription = language === "KOR" ? t.privateaccountingDescription.ko : t.privateaccountingDescription.en;
  const privateaccountingItems = language === "KOR" ? t.privateaccountingItems.ko : t.privateaccountingItems.en;

  return (
    <ServiceAccentProvider serviceType="accounting">
      <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <iframe src="https://player.vimeo.com/video/1160084875?autoplay=1&loop=1&muted=1&background=1" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full h-full min-w-full min-h-full" style={{ width: "max(100%, 177.78vh)", minWidth: "100%", height: "max(100%, 56.25vw)", minHeight: "100%" }} title="Accounting services background" allow="autoplay; fullscreen; picture-in-picture" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-[1]" />
        <ServiceBadge />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-center justify-center text-center pb-0 min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[96px] font-light text-[#FFFFFF] mb-2 sm:mb-2.5 md:mb-3 leading-tight text-center w-full">
            {heroTitle}
          </h2>
          <HeroAccentLine color="#627F38" />
          <p className="text-sm sm:text-base md:text-lg lg:text-[20px] text-[#FFFFFF]/70 w-full text-center mt-4 sm:mt-5 md:mt-6">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Intro */}
      <SectionReveal>
        <section className="w-full pt-12 pb-4 sm:pt-14 sm:pb-5 md:pt-20 md:pb-6 lg:pt-24 lg:pb-6 xl:pt-30 xl:pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 text-justify">
            <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
              {accountingServiceIntro.split("<br><br>").map((paragraph, i) => (
                <span key={i} className="block text-base sm:text-lg md:text-xl lg:text-[20px] text-[#111B12] text-justify">
                  {paragraph}
                </span>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Unified Service Cards Grid - All Three Services */}
      <SectionReveal>
        <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
            {/* 3-Column Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {/* Bookkeeping Card */}
              <SectionReveal delay={0}>
                <div className="flex flex-col h-full bg-white border border-[#111B12]/10 rounded-lg overflow-hidden hover:border-[#627F38]/50 hover:shadow-lg transition-all duration-300">
                  {/* Image Section */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
                    <img src="/services/b1.svg" alt="" aria-hidden="true" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#495F2B]/0 hover:bg-[#495F2B]/40 transition-colors duration-300" />
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col gap-3 md:gap-4 p-5 md:p-6 lg:p-7 flex-grow">
                    <h3 className="text-2xl md:text-[26px] lg:text-[28px] font-semibold text-[#111B12] transition-colors duration-300 group-hover:text-[#627F38]">
                      {bookkeepingTitle}
                    </h3>
                    <p className="text-lg sm:text-xl md:text-[20px] text-[#111B12] leading-relaxed text-justify">
                      {bookkeepingDescription}
                    </p>

                    {/* Icon Feature Grid */}
                    <div className="pt-2 mt-auto">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-6 h-6 rounded-full bg-[#627F38] mb-1" />
                          <span className="text-base sm:text-lg text-[#111B12]/70">Bank Feeds</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="w-6 h-6 rounded-full bg-[#627F38] mb-1" />
                          <span className="text-base sm:text-lg text-[#111B12]/70">Invoices</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="w-6 h-6 rounded-full bg-[#627F38] mb-1" />
                          <span className="text-base sm:text-lg text-[#111B12]/70">Expenses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionReveal>

              {/* Accounting Card */}
              <SectionReveal delay={100}>
                <div className="flex flex-col h-full bg-white border border-[#111B12]/10 rounded-lg overflow-hidden hover:border-[#627F38]/50 hover:shadow-lg transition-all duration-300">
                  {/* Image Section */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
                    <img src="/services/a1.svg" alt="" aria-hidden="true" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#495F2B]/0 hover:bg-[#495F2B]/40 transition-colors duration-300" />
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col gap-3 md:gap-4 p-5 md:p-6 lg:p-7 flex-grow">
                    <h3 className="text-2xl md:text-[26px] lg:text-[28px] font-semibold text-[#111B12] transition-colors duration-300">
                      {accountingSectionTitle}
                    </h3>
                    <p className="text-lg sm:text-xl md:text-[20px] text-[#111B12] leading-relaxed text-justify">
                      {accountingSectionDescription}
                    </p>

                    {/* Icon Feature Grid */}
                    <div className="pt-2 mt-auto">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-6 h-6 rounded-full bg-[#627F38] mb-1" />
                          <span className="text-base sm:text-lg text-[#111B12]/70">Reports</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="w-6 h-6 rounded-full bg-[#627F38] mb-1" />
                          <span className="text-base sm:text-lg text-[#111B12]/70">Tax Prep</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="w-6 h-6 rounded-full bg-[#627F38] mb-1" />
                          <span className="text-base sm:text-lg text-[#111B12]/70">Analysis</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionReveal>

              {/* Private Accounting Card */}
              <SectionReveal delay={200}>
                <div className="flex flex-col h-full bg-white border border-[#111B12]/10 rounded-lg overflow-hidden hover:border-[#627F38]/50 hover:shadow-lg transition-all duration-300">
                  {/* Image Section */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80" alt="" aria-hidden="true" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#495F2B]/0 hover:bg-[#495F2B]/40 transition-colors duration-300" />
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col gap-3 md:gap-4 p-5 md:p-6 lg:p-7 flex-grow">
                    <h3 className="text-2xl md:text-[26px] lg:text-[28px] font-semibold text-[#111B12] transition-colors duration-300">
                      {privateaccountingTitle}
                    </h3>
                    <p className="text-lg sm:text-xl md:text-[20px] text-[#111B12] leading-relaxed text-justify">
                      {privateaccountingDescription}
                    </p>

                    {/* Icon Feature Grid */}
                    <div className="pt-2 mt-auto">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-6 h-6 rounded-full bg-[#627F38] mb-1" />
                          <span className="text-base sm:text-lg text-[#111B12]/70">Personal</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="w-6 h-6 rounded-full bg-[#627F38] mb-1" />
                          <span className="text-base sm:text-lg text-[#111B12]/70">Strategy</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="w-6 h-6 rounded-full bg-[#627F38] mb-1" />
                          <span className="text-base sm:text-lg text-[#111B12]/70">Growth</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* CTA */}
      <ServiceCTA serviceType="accounting" />

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
