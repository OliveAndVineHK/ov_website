"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { learnMoreTranslations, servicesTranslations } from "@/app/utils/pageUtils";
import * as Icons from "@/app/utils/icons";
import InsightsPagination from "@/app/components/InsightsPagination";
import { InsightCardSubTags } from "@/app/components/InsightCards";
import { INSIGHT_LIST_CARDS, type InsightCardDefinition } from "@/app/utils/insightCardsConfig";

export default function Insights() {
  const { language } = useLanguage();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filterItems = [
    { key: "corporate", translationKey: "corporate" },
    { key: "accounting", translationKey: "accounting" },
    { key: "assurance", translationKey: "assurance" },
    { key: "tax", translationKey: "tax" },
    { key: "consulting", translationKey: "service5" },
    { key: "hr", translationKey: "service6" },
  ];

  const getServiceTitle = (key: string) => {
    const translation = servicesTranslations[key as keyof typeof servicesTranslations];
    if (translation && typeof translation === 'object' && 'title' in translation) {
      return language === "KOR" ? translation.title.ko : translation.title.en;
    }
    return "";
  };

  const getServiceTitleEn = (key: string) => {
    const translation = servicesTranslations[key as keyof typeof servicesTranslations];
    if (translation && typeof translation === 'object' && 'title' in translation) {
      return translation.title.en;
    }
    return "";
  };

  const filteredCards = useMemo(() => {
    return INSIGHT_LIST_CARDS.filter((card) => {
      if (selectedFilter === null) return true;
      const expectedTagEn = getServiceTitleEn(selectedFilter);
      return expectedTagEn && card.tag.en === expectedTagEn;
    }).sort((a, b) => {
      if (selectedFilter !== null) return 0;
      return (a.tag.en || "").localeCompare(b.tag.en || "", "en");
    });
  }, [selectedFilter]);

  const CARDS_PER_PAGE = 4;
  const pageCount = Math.max(1, Math.ceil(filteredCards.length / CARDS_PER_PAGE));
  const [currentPage, setCurrentPage] = useState(1);
  const pageCards = useMemo(() => {
    const start = (currentPage - 1) * CARDS_PER_PAGE;
    return filteredCards.slice(start, start + CARDS_PER_PAGE);
  }, [filteredCards, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter]);
  useEffect(() => {
    if (currentPage > pageCount && pageCount >= 1) setCurrentPage(pageCount);
  }, [pageCount, currentPage]);

  const renderCard = (card: InsightCardDefinition, index: number) => {
    const isKo = language === "KOR";
    const tagText = isKo ? card.tag.ko : card.tag.en;
    const titleText = isKo ? card.title.ko : card.title.en;
    const descText = isKo ? card.description.ko : card.description.en;
    const showTitleWithDesc = !!card.description.en;
    const cardContent = (
      <div className="w-full min-h-[500px] md:min-h-[500px] bg-white p-6 flex flex-col hover:bg-[#E5E5BD]/50 active:bg-[#648E3E]/20 hover:rounded-tr-[300px] transition-all duration-300 cursor-pointer group">
        <div className="w-[calc(100%+3rem)] h-[200px] sm:h-[240px] md:h-[280px] mb-6 sm:mb-8 md:mb-10 relative -mx-6 -mt-6 overflow-hidden group-hover:rounded-tr-[300px] transition-all duration-300">
          <Image src={card.image} alt={card.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          <div className="absolute inset-0 bg-[#E5E5BD]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
        <span className="text-base sm:text-lg md:text-xl lg:text-[18px] text-[#111B12]">{tagText}</span>
        <p
          className="text-lg sm:text-xl md:text-2xl lg:text-[26px] text-[#495F2B] leading-tight mt-2 group-hover:underline transition-all duration-300"
          dangerouslySetInnerHTML={{
            __html: showTitleWithDesc ? titleText + "<br />" + descText : titleText,
          }}
        />
        <InsightCardSubTags tags={card.subTags ?? []} language={language} />
      </div>
    );
    const key = card.href !== "#" ? card.href : `placeholder-${index}`;
    if (card.href !== "#") {
      return (
        <Link key={key} href={card.href}>
          {cardContent}
        </Link>
      );
    }
    return <div key={key}>{cardContent}</div>;
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#495F2B]">
            {(language === "KOR" ? learnMoreTranslations.heading.ko : learnMoreTranslations.heading.en).split('\n').map((line, index, array) => (
              <span key={index}>
                {line}
                {index < array.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>
      </section>
      <section className="w-full py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
          <div className="w-full flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="w-full md:w-1/3 flex flex-col gap-6">
              <div className={`w-full overflow-hidden transition-all duration-300 ${isFilterOpen ? "bg-white border border-[#111B12]/50 rounded-tr-[30px]" : "bg-white border border-[#111B12]/50 hover:rounded-tr-[30px]"}`}>
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="w-full p-3 sm:p-4 md:p-6 flex items-center justify-between cursor-pointer">
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[20px] font-medium text-[#111B12]">
                    {selectedFilter ? getServiceTitle(selectedFilter) : (language === "KOR" ? "전체" : "All")}
                  </span>
                  <div className="flex items-center justify-center shrink-0 w-[42px] h-[42px] rounded-full border border-[#888D88]">
                    <Icons.BiSolidChevronDown className={`w-5 h-5 text-[#888D88] transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isFilterOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                  {isFilterOpen && (
                    <>
                      <div className="border-t border-[#111B12]/30 w-full"></div>
                      <div className="p-3 sm:p-4 md:p-6 pt-3 sm:pt-4 md:pt-6 flex flex-col gap-2 sm:gap-3">
                        <button onClick={() => { setSelectedFilter(null); setIsFilterOpen(false); }} className="text-left text-sm sm:text-base md:text-lg text-[#111B12] hover:text-[#495F2B] hover:underline transition-all duration-300 cursor-pointer">{language === "KOR" ? "전체" : "All"}</button>
                        {filterItems.map((item) => (
                          <button key={item.key} onClick={() => { setSelectedFilter(item.translationKey); setIsFilterOpen(false); }} className="text-left text-sm sm:text-base md:text-lg text-[#111B12] hover:text-[#495F2B] hover:underline transition-all duration-300 cursor-pointer">{getServiceTitle(item.translationKey)}</button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {pageCards.map((card, index) => renderCard(card, index))}
              </div>
              <InsightsPagination count={pageCount} page={currentPage} onPageChange={setCurrentPage} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
