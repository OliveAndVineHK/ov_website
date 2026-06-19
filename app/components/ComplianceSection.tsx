"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";
import { complianceTranslations } from "@/app/utils/pageUtils";

export default function ComplianceSection() {
  const { language } = useLanguage();
  return (
    <section className="w-full flex-shrink-0 py-8 sm:py-10 md:py-12 lg:py-14 bg-[#EFEFEF]" role="complementary" aria-label="Compliance and ethics notice">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-start">
        <p className="w-full text-xs sm:text-sm md:text-base lg:text-[14px] text-[#282A28] leading-relaxed text-justify">
          {language === "KOR" ? complianceTranslations.title.ko : complianceTranslations.title.en}
          <br />
          <span className="text-xs sm:text-sm md:text-base lg:text-[14px] text-[#282A28]">
            {language === "KOR" ? complianceTranslations.description.ko : complianceTranslations.description.en}
          </span>
        </p>
      </div>
    </section>
  );
}
