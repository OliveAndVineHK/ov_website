"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import InsightCards from "@/app/components/InsightCards";
import ServiceCards from "@/app/components/ServiceCards";
import AnimatedHeadline from "@/app/components/AnimatedHeadline";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { aboutUsTranslations, integrityTranslations, portfolioTranslations, learnMoreTranslations, complianceTranslations, heroWords, portfolioCardTranslations, servicesTranslations } from "@/app/utils/pageUtils";
import * as Icons from "@/app/utils/icons";
import { createBgStyle } from "@/app/utils/styleUtils";

const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_DURATION = 2000;

export default function Home() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "KOR" ? "ENG" : "KOR");
  };
  const WORDS = language === "KOR" ? heroWords.ko : heroWords.en;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(TYPING_SPEED);


  const handleTyping = useCallback(() => {
    const currentWord = WORDS[currentIndex];
    
    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        setTypingSpeed(TYPING_SPEED);
      } else {
        setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
      }
    } else {
      if (displayedText.length > 0) {
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        setTypingSpeed(DELETING_SPEED);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % WORDS.length);
        setTypingSpeed(TYPING_SPEED);
      }
    }
  }, [displayedText, isDeleting, currentIndex, WORDS]);

  useEffect(() => {
    setCurrentIndex(0);
    setDisplayedText("");
    setIsDeleting(false);
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [handleTyping, typingSpeed]);

  const heroBackgroundStyle = createBgStyle("/home/home-bg.png", { size: "contain" });
  const aboutBackgroundStyle = createBgStyle("/home/about-us.png");
  const integrityBackgroundStyle = createBgStyle("/home/integrity.png");

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full pb-12 md:pb-20 flex items-center justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="hero-background w-full flex items-center justify-center" style={heroBackgroundStyle}>
            <div className="flex flex-col items-start gap-4">
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white text-left">
                {displayedText}
                <span className="animate-blink" aria-hidden="true">|</span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24" style={aboutBackgroundStyle}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-start gap-4">
          <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38]">
            {language === "KOR" ? aboutUsTranslations.title.ko : aboutUsTranslations.title.en}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#111B12] mt-6 md:mt-8">Olive & Vine</h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-[24px] text-[#111B12] leading-relaxed max-w-3xl">
            {language === "KOR" ? aboutUsTranslations.description.ko : aboutUsTranslations.description.en}
          </p>
        </div>
      </section>
      <section className="w-full py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-start">
          <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38]">
            {language === "KOR" ? servicesTranslations.title.ko : servicesTranslations.title.en}
          </span>
          <div className="mt-6 md:mt-8 w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#111B12]">
              {(language === "KOR" ? servicesTranslations.heading.ko : servicesTranslations.heading.en).split('\n')[0]}
            </h2>
            <div className="flex flex-wrap items-end justify-between gap-4 mt-1 w-full">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#111B12]">
                {(language === "KOR" ? servicesTranslations.heading.ko : servicesTranslations.heading.en).split('\n')[1]}
              </h2>
              <Link href="/services" className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-[#111B12]/70 leading-relaxed rounded-full border border-[#111B12]/50 px-5 py-1.5 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer shrink-0">
                {language === "KOR" ? servicesTranslations.button.ko : servicesTranslations.button.en}
                <Icons.CgArrowTopRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
          <ServiceCards language={language} translations={servicesTranslations} />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 mb-12 md:mb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-start">
          <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38]">
            {language === "KOR" ? portfolioTranslations.title.ko : portfolioTranslations.title.en}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#111B12] mt-6 md:mt-8">
            {(language === "KOR" ? portfolioTranslations.heading.ko : portfolioTranslations.heading.en).split('\n').map((line, index, array) => (
              <span key={index}>
                {line}
                {index < array.length - 1 && <br />}
              </span>
            ))}
          </h2>
          {[
            { cols: "md:grid-cols-[7fr_8fr]", cards: [
              { bg: "/home/business-growth.svg", ...portfolioCardTranslations.startups },
              { bg: "/home/mission-driven.svg", ...portfolioCardTranslations.missionDriven },
            ]},
            { cols: "md:grid-cols-[12fr_8fr]", cards: [
              { bg: "/home/regional-operations.svg", ...portfolioCardTranslations.regionalOperations },
              { bg: "/home/new-ventures.svg", ...portfolioCardTranslations.newVentures },
            ]},
          ].map((row, ri) => (
            <div key={ri} className={`w-full grid grid-cols-1 ${row.cols} gap-6 ${ri === 0 ? "mt-8" : "mt-6"}`}>
              {row.cards.map((card, ci) => {
                const title = language === "KOR" ? card.title.ko : card.title.en;
                const desc = language === "KOR" ? card.description.ko : card.description.en;
                return (
                  <div key={ci} className="w-full min-h-64 md:h-100 relative overflow-hidden flex flex-col justify-end p-4 sm:p-5 md:p-6 cursor-pointer group">
                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110" style={{ backgroundImage: `url(${card.bg})` }} />
                    <h3 className="relative z-10 text-lg sm:text-2xl md:text-3xl lg:text-[36px] text-white leading-tight break-words">{title}</h3>
                    {desc && (
                      <p className="relative z-10 text-sm sm:text-base md:text-lg lg:text-[16px] font-light text-white leading-relaxed mt-3 md:mt-4 break-words line-clamp-4 lg:line-clamp-none">{desc}</p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
      <section className="w-full py-12 md:py-24" style={integrityBackgroundStyle}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center gap-8">
          <AnimatedHeadline
            words={language === "KOR" ? integrityTranslations.words.ko : integrityTranslations.words.en}
            interval={3000}
          />
          <p className="text-base sm:text-lg md:text-xl lg:text-[20px] text-white leading-relaxed max-w-5xl lg:max-w-[1100px] text-center" dangerouslySetInnerHTML={{ __html: language === "KOR" ? integrityTranslations.description.ko : integrityTranslations.description.en }} />
        </div>
      </section>
      <section className="w-full section-py mt-12 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-start">
          <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38]">
            {language === "KOR" ? learnMoreTranslations.title.ko : learnMoreTranslations.title.en}
          </span>
          <div className="mt-6 md:mt-8 w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#111B12]">
              {(language === "KOR" ? learnMoreTranslations.heading.ko : learnMoreTranslations.heading.en).split('\n')[0]}
            </h2>
            <div className="flex flex-wrap items-end justify-between gap-4 mt-1 w-full">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#111B12]">
                {(language === "KOR" ? learnMoreTranslations.heading.ko : learnMoreTranslations.heading.en).split('\n')[1]}
              </h2>
            </div>
          </div>
          <InsightCards language={language} translations={learnMoreTranslations.card} firstCardIntroductionXero secondCardAmendment thirdCardConsulting secondPageFirstCardDividendLegal action={<Link href="/insights" className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-[#111B12]/70 leading-relaxed rounded-full border border-[#111B12]/50 px-5 py-1.5 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer shrink-0">{language === "KOR" ? learnMoreTranslations.button.ko : learnMoreTranslations.button.en}<Icons.CgArrowTopRight className="size-4" aria-hidden /></Link>} />
        </div>
      </section>
      <section className="w-full py-8 sm:py-10 md:py-12 lg:py-14 bg-[#EFEFEF] mt-12 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-start">
          <p className="w-full text-xs sm:text-sm md:text-base lg:text-[14px] text-[#282A28] leading-relaxed">
            {language === "KOR" ? complianceTranslations.title.ko : complianceTranslations.title.en}<br />
            <span className="text-xs sm:text-sm md:text-base lg:text-[14px] text-[#282A28]">{language === "KOR" ? complianceTranslations.description.ko : complianceTranslations.description.en}</span>
          </p>
        </div>
      </section>
    </div>
  );
}
