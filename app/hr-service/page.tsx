"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { hrServicePageTranslations } from "@/app/utils/pageHrServiceUtils";
import { learnMoreTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import ServiceCTA from "@/app/components/ServiceCTA";
import ServiceBadge from "@/app/components/ServiceBadge";
import SectionReveal from "@/app/components/SectionReveal";
import HeroAccentLine from "@/app/components/HeroAccentLine";
import { ServiceAccentProvider } from "@/app/contexts/ServiceAccentContext";
import * as Icons from "@/app/utils/icons";

export default function HrServicePage() {
  const { language } = useLanguage();
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const t = hrServicePageTranslations;
  const heroTitle = language === "KOR" ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = language === "KOR" ? t.heroSubtitle.ko : t.heroSubtitle.en;
  const cards = t.cards;
  const lang = language === "KOR" ? "ko" : "en";

  const topCards = [
    { key: "payroll" as const, ...cards.payroll },
    { key: "mpf" as const, ...cards.mpf },
  ];
  const bottomCards = [
    { key: "recruitment" as const, ...cards.recruitment },
    { key: "ir56" as const, ...cards.ir56 },
    { key: "compliance" as const, ...cards.compliance },
  ];

  return (
    <ServiceAccentProvider serviceType="hr">
      <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <iframe src="https://player.vimeo.com/video/1178766968?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=1" className="absolute left-1/2 top-1/2 pointer-events-none w-full h-full min-w-full min-h-full" style={{ width: "max(100%, 177.78vh)", minWidth: "100%", height: "max(100%, 56.25vw)", minHeight: "100%", transform: "translate(-50%, -50%) scale(1.15)" }} title="HR BG" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerPolicy="strict-origin-when-cross-origin" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-[1]" />
        <ServiceBadge />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-center justify-center text-center pb-0 min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[96px] font-light text-white mb-2 sm:mb-2.5 md:mb-3 leading-tight text-center w-full px-1 sm:px-0">
            {heroTitle}
          </h2>
          <HeroAccentLine color="#627F38" />
          <p className="text-sm sm:text-base md:text-lg lg:text-[20px] text-white w-full text-center max-w-2xl sm:max-w-none mx-auto px-1 sm:px-0 leading-relaxed mt-4 sm:mt-5 md:mt-6">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <SectionReveal delay={100}>
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-[#F0EEE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 md:gap-8 mb-6 md:mb-8">
            {topCards.map((card) => {
              const title = card.title[lang];
              const isPayroll = card.key === "payroll";
              const isMpf = card.key === "mpf";
              const desc = "description" in card ? card.description : null;
              const isList = desc && Array.isArray(desc.en);
              const descContent = desc ? (isList ? (desc[lang] as string[]).map((item, i) => <li key={i}>{item}</li>) : (desc[lang] as unknown as string)) : null;
              return (
                <div key={card.key} className={`flex flex-col bg-white rounded-tr-[28px] sm:rounded-tr-[32px] overflow-hidden border border-[#111B12]/20 hover:border-[#627F38]/50 transition-all duration-300 group cursor-pointer ${card.key === "payroll" ? "sm:col-span-2 sm:col-start-2" : "sm:col-span-2 sm:col-start-4"}`}>
                  <div className={`relative w-full aspect-[4/3] rounded-tr-[28px] sm:rounded-tr-[32px] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 flex-shrink-0 overflow-hidden ${isMpf ? "bg-[#D9732B]" : ""}`}>
                    {isPayroll && (
                      <>
                        <div className="absolute inset-0 rounded-tr-[28px] sm:rounded-tr-[32px] bg-cover bg-center bg-no-repeat opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-0" style={{ backgroundImage: "url(/hr/payroll%20admin%20hovered.svg)" }} aria-hidden />
                        <div className="absolute inset-0 rounded-tr-[28px] sm:rounded-tr-[32px] bg-[#495F2B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" aria-hidden />
                      </>
                    )}
                    {isMpf && (
                      <>
                        <div className="absolute inset-0 rounded-tr-[28px] sm:rounded-tr-[32px] bg-[#495F2B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" aria-hidden />
                        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10">
                          <Image src={(card as { image: string }).image} alt={title} fill className="object-contain" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-start p-4 sm:p-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-white text-left w-full">
                            <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">{descContent}</ul>
                          </div>
                        </div>
                      </>
                    )}
                    {isPayroll && (
                      <div className="relative z-10 text-white text-left w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {isList ? <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">{descContent}</ul> : <p className="text-sm sm:text-base leading-relaxed">{descContent}</p>}
                      </div>
                    )}
                  </div>
                  <div className="bg-white w-full h-[88px] flex flex-col justify-center pt-2 pb-2 text-center mx-auto shrink-0">
                    <h3 className="font-sans text-[20px] font-bold text-[#202020] mb-2">{title}</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {card.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full font-sans text-[12px] font-medium bg-[#9FD74F]/40 text-[#436A1F] group-hover:bg-[#9FD74F]/60 transition-colors duration-300">{tag.label[lang]}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {bottomCards.map((card) => {
              const title = card.title[lang];
              const desc = card.description;
              const isList = desc && Array.isArray(desc.en);
              const descContent = desc ? (isList ? (desc[lang] as string[]).map((item, i) => <li key={i}>{item}</li>) : null) : null;
              return (
                <div key={card.key} className="flex flex-col bg-white rounded-tr-[28px] sm:rounded-tr-[32px] overflow-hidden border border-[#111B12]/20 hover:border-[#627F38]/50 transition-all duration-300 group cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-tr-[28px] sm:rounded-tr-[32px]">
                    <Image src={card.image} alt={title} fill className="object-cover" />
                    <div className="absolute inset-0 rounded-tr-[28px] sm:rounded-tr-[32px] bg-[#495F2B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1]" aria-hidden />
                    <div className="absolute inset-0 flex items-center justify-start p-4 sm:p-6 z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ul className="list-disc list-inside space-y-1 text-white text-sm sm:text-base w-full">{descContent}</ul>
                    </div>
                  </div>
                  <div className="bg-white w-full h-[88px] flex flex-col justify-center pt-2 pb-2 text-center mx-auto shrink-0">
                    <h3 className="font-sans text-[20px] font-bold text-[#202020] mb-2">{title}</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {card.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full font-sans text-[12px] font-medium bg-[#9FD74F]/40 text-[#436A1F] group-hover:bg-[#9FD74F]/60 transition-colors duration-300">{tag.label[lang]}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      </SectionReveal>

      {/* FAQ */}
      <SectionReveal delay={200}>
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:gap-12 lg:gap-16 w-full">
            <div className="md:w-1/3 lg:w-1/4 flex-shrink-0 mb-6 md:mb-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-semibold text-[#111B12] mb-2">
                {lang === "ko" ? t.faq.title.ko : t.faq.title.en}
              </h2>
              <p className="text-sm sm:text-base font-medium text-[#111B12]">
                {lang === "ko" ? t.faq.subtitle.ko : t.faq.subtitle.en}
              </p>
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              {t.faq.items.map((item, index) => {
                const isOpen = faqOpenIndex === index;
                const question = lang === "ko" ? item.question.ko : item.question.en;
                const answer = lang === "ko" ? item.answer.ko : item.answer.en;
                return (
                  <div key={index} className={`border-b border-[#111B12]/20 last:border-b-0 transition-colors duration-300 ${isOpen ? 'bg-[#F5F3E8]/50' : ''}`}>
                    <button type="button" onClick={() => setFaqOpenIndex(isOpen ? null : index)} className="w-full py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 text-left cursor-pointer group">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-[#627F38] transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                          <Icons.BiSolidChevronRight className="w-full h-full" aria-hidden />
                        </div>
                        <span className="text-base sm:text-lg font-bold text-[#111B12]">{question}</span>
                      </div>
                      <div className="flex-shrink-0 flex items-center justify-center">
                        {isOpen ? (
                          <Icons.CiCircleMinus className="w-6 h-6 sm:w-7 sm:h-7 text-[#627F38]" aria-hidden />
                        ) : (
                          <Icons.CiCirclePlus className="w-6 h-6 sm:w-7 sm:h-7 text-[#888D88]" aria-hidden />
                        )}
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className={`pl-9 sm:pl-10 pr-0 pb-4 sm:pb-5 border-l-4 border-[#627F38]`}>
                        <p className="text-sm sm:text-base text-[#111B12]/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: answer }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      </SectionReveal>

      {/* CTA */}
      <div className="h-12 sm:h-16 md:h-20 lg:h-24 bg-white" />
      <ServiceCTA serviceType="hr" />

      {/* Insights */}
      <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16 xl:py-[7.5rem] relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-start w-full">
          <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38]">
            {language === "KOR" ? learnMoreTranslations.title.ko : learnMoreTranslations.title.en}
          </span>
          <InsightCards language={language} translations={learnMoreTranslations.card} tagOverride={t.insightTag} secondPageFirstCardMandatoryProvidentFund secondPageSecondCardIr56 action={<Link href="/insights" className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-[#111B12]/70 leading-relaxed rounded-full border border-[#111B12]/50 px-5 py-1.5 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer shrink-0">{language === "KOR" ? learnMoreTranslations.button.ko : learnMoreTranslations.button.en}<Icons.CgArrowTopRight className="size-4" aria-hidden /></Link>} />
        </div>
      </section>
    </div>
    </ServiceAccentProvider>
  );
}
