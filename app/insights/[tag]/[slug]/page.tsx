"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FaqAccordion from "@/app/components/FaqAccordion";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { servicesTranslations } from "@/app/utils/pageUtils";
import { getInsightTranslations } from "@/app/utils/insightTranslations";
import * as Icons from "@/app/utils/icons";

interface InsightPageProps {
  params: Promise<{
    tag: string;
    slug: string;
  }>;
}

export default function InsightPage({ params }: InsightPageProps) {
  const { tag, slug } = use(params);
  
  return <InsightPageClient tag={tag} slug={slug} />;
}

function InsightPageClient({ tag, slug }: { tag: string; slug: string }) {
  const { language } = useLanguage();
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "";
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      setLinkCopied(false);
    }
  };

  const getServiceTitle = (key: string) => {
    const normalizedKey = key.toLowerCase();
    const translation = servicesTranslations[normalizedKey as keyof typeof servicesTranslations];
    if (translation && typeof translation === 'object' && 'title' in translation) {
      return language === "KOR" ? translation.title.ko : translation.title.en;
    }
    return "";
  };

  const normalizedTag = tag.toLowerCase();
  const isAmendment = normalizedTag === "corporate-service" && slug === "amendment";
  const isIncorporation = normalizedTag === "corporate-service" && slug === "incorporation";
  const isCorporateSecretary = normalizedTag === "corporate-service" && slug === "corporate-secretary";
  const isIntroductionXero = normalizedTag === "accounting" && slug === "introduction-xero";
  const isAccountingKnowledge = normalizedTag === "accounting" && slug === "accounting-knowledge";
  const isAiBusinessAutomation = normalizedTag === "consulting" && slug === "ai-business-automation";
  const isTaxDividendLegalConsiderations = normalizedTag === "tax" && slug === "dividend-legal-considerations";
  const isTaxVat = normalizedTag === "tax" && slug === "vat";
  const isTaxCorporateTax = normalizedTag === "tax" && slug === "corporate-tax";
  const isConsultingDigitalTransformation = normalizedTag === "consulting" && slug === "digital-transformation-efficiency-improvement";
  const isConsultingDigitalTransformationUX = normalizedTag === "consulting" && slug === "digital-transformation-ux-improvement";
  const isConsultingBigDataDriven = normalizedTag === "consulting" && slug === "big-data-driven";
  const isConsultingDigitalTransformationTVP = normalizedTag === "consulting" && slug === "digital-transformation-tvp";
  const isConsultingLegalConsiderationsMA = normalizedTag === "consulting" && slug === "legal-considerations-ma";
  const isHrTerminationRegulation = normalizedTag === "hr" && slug === "termination-regulation";
  const isHrHybridWorkPerformance = normalizedTag === "hr" && slug === "hybrid-work-performance";
  const isHrLeavePolicyExplanation = normalizedTag === "hr" && slug === "leave-policy-explanation";
  const isHrMandatoryProvidentFund = normalizedTag === "hr" && slug === "mandatory-provident-fund";
  const isHrIr56 = normalizedTag === "hr" && slug === "ir56";
  const isHrTaxClearanceDeparting = normalizedTag === "hr" && slug === "tax-clearance-departing-employees";
  const isHrWithholdingObligationsDeparting = normalizedTag === "hr" && slug === "withholding-obligations-departing-employees";
  const isTaxTwoTieredSalariesTax = normalizedTag === "tax" && slug === "two-tiered-salaries-tax";
  const isHrEmployersReturnBir56a = normalizedTag === "hr" && slug === "employers-return-bir56a";
  const isAmendmentLayout = isAmendment || isIncorporation || isCorporateSecretary || isHrTerminationRegulation || isHrMandatoryProvidentFund;
  const sectionLabel = (index: number) => (isAmendmentLayout || isTaxVat || isHrHybridWorkPerformance || isHrLeavePolicyExplanation ? "" : `${index + 1}. `);
  const translations = getInsightTranslations(tag, slug);
  const hasScopeAndBenefitsList = !!translations && "scopeAndBenefitsOfDigitalTransformationItems" in translations && Array.isArray((translations as { scopeAndBenefitsOfDigitalTransformationItems?: unknown[] }).scopeAndBenefitsOfDigitalTransformationItems);
  const pageTitle = translations
    ? (language === "KOR" ? translations.heroTitle.ko : translations.heroTitle.en)
    : getServiceTitle(normalizedTag);
  const heroTag = translations ? (language === "KOR" ? translations.heroTag.ko : translations.heroTag.en) : "";

  return (
    <div className="min-h-screen bg-white">
      {translations ? (
        <>
          <section className="w-full relative overflow-hidden h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] xl:h-[480px]">
            <div className="absolute inset-0 w-full h-full z-0">
              <Image src={isAmendment ? "/insights/amendment.jpg" : isIncorporation ? "/insights/incorporation.jpg" : isCorporateSecretary ? "/insights/corporate-secretary.jpg" : isHrTerminationRegulation ? "/insights/termination.jpg" : isHrHybridWorkPerformance ? "/insights/hybrid-work.jpg" : isHrLeavePolicyExplanation ? "/insights/leave-policy.jpg" : isHrMandatoryProvidentFund ? "/insights/mpf.jpg" : isHrIr56 ? "/insights/ir.jpg" : isHrTaxClearanceDeparting ? "/insights/tax-clearance.jpg" : isHrWithholdingObligationsDeparting ? "/insights/withholding-obligations.jpg" : isTaxTwoTieredSalariesTax ? "/insights/two-tiered-salaries-tax.jpg" : isHrEmployersReturnBir56a ? "/insights/employers-return-bir56a.jpg" : isIntroductionXero ? "/insights/introduction-xero.png" : isAccountingKnowledge ? "/insights/accounting-knowledge.jpg" : isTaxDividendLegalConsiderations ? "/insights/dividend.jpg" : isTaxVat ? "/insights/vat.jpg" : isTaxCorporateTax ? "/insights/corporate-tax.jpg" : isConsultingLegalConsiderationsMA ? "/insights/legal.jpg" : isConsultingDigitalTransformation ? "/insights/digital-transformation.jpg" : isConsultingDigitalTransformationUX ? "/insights/digital-ux.jpg" : isConsultingBigDataDriven ? "/insights/big-data.jpg" : isConsultingDigitalTransformationTVP ? "/insights/digital-trans.jpg" : "/insights/ai-automation.jpg"} alt="" fill className="object-cover object-center" priority />
            </div>
            {(isIntroductionXero || isAccountingKnowledge || isAiBusinessAutomation || isTaxDividendLegalConsiderations || isTaxVat || isTaxCorporateTax || isConsultingLegalConsiderationsMA || isConsultingDigitalTransformation || isConsultingDigitalTransformationUX || isConsultingBigDataDriven || isConsultingDigitalTransformationTVP || isAmendment || isIncorporation || isCorporateSecretary || isHrTerminationRegulation || isHrHybridWorkPerformance || isHrLeavePolicyExplanation || isHrMandatoryProvidentFund || isHrIr56 || isHrTaxClearanceDeparting || isHrWithholdingObligationsDeparting || isTaxTwoTieredSalariesTax || isHrEmployersReturnBir56a) && <div className="absolute inset-0 w-full h-full z-[1] bg-black/50" aria-hidden />}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-start justify-center h-full pt-6 sm:pt-8 md:pt-12 lg:pt-16 pb-6 sm:pb-8">
              <span className="text-sm sm:text-base md:text-lg lg:text-[20px] text-white/80 mb-1.5 sm:mb-2 md:mb-3 lg:mb-4">{heroTag}</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-[64px] font-base text-white mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3 leading-tight sm:leading-tight md:leading-tight [&_br]:block [&_br]:-mt-0.5 sm:[&_br]:-mt-1 md:[&_br]:-mt-1.5 lg:[&_br]:-mt-2" dangerouslySetInnerHTML={{ __html: pageTitle }} />
            </div>
          </section>
          <section className="w-full py-6 sm:py-8 md:py-12 lg:py-20 xl:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-12">
                <div className="flex flex-col justify-between gap-4 sm:gap-6 shrink-0 md:self-stretch">
                  <div className="flex flex-row gap-3 sm:gap-4 md:gap-6">
                    <button type="button" onClick={handleCopyLink} className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-[#111B12]/50 hover:border-[#627F38] hover:bg-[#627F38] transition-all duration-300 cursor-pointer group" aria-label={language === "KOR" ? "링크 복사" : "Copy link"}>
                      {linkCopied ? <Icons.FaCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#111B12] group-hover:text-white transition-colors" /> : <Icons.FaLink className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#111B12] group-hover:text-white transition-colors" />}
                    </button>
                    <Link href="/subscribe" className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-[#111B12]/50 hover:border-[#627F38] hover:bg-[#627F38] transition-all duration-300 cursor-pointer group" aria-label={language === "KOR" ? "구독하기" : "Subscribe"}>
                      <Icons.FiMail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#111B12] group-hover:text-white transition-colors" />
                    </Link>
                  </div>
                  <Link href="/insights" className="flex items-center gap-2 sm:gap-3 md:gap-4 group/link mt-auto min-h-[44px] sm:min-h-0">
                    <span className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] group-hover/link:text-[#627F38] transition-colors">{language === "KOR" ? "인사이트로 돌아가기" : "Back to insights"}</span>
                    <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full border border-[#111B12]/50 group-hover/link:border-[#627F38] group-hover/link:bg-[#627F38] transition-all duration-300 flex-shrink-0">
                      <Icons.BiSolidChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[#111B12] group-hover/link:text-white transition-colors" />
                    </span>
                  </Link>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="border-t border-[#111B12]/30 mb-4 sm:mb-5 md:mb-6"></div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? translations.inBrief.ko : translations.inBrief.en}</h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6"><span className="inline-block mr-2">•</span>{language === "KOR" ? translations.inBriefDescription.ko : translations.inBriefDescription.en}</p>
                  <div className="border-t border-[#111B12]/30 mb-4 sm:mb-5 md:mb-6"></div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] font-bold text-[#111B12] mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en}</h4>
                  {isAmendment ? (
                    <div
                      className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6 bg-center bg-no-repeat"
                      style={{
                        backgroundImage: "url(/insights/am-pc.png)",
                        backgroundSize: "40%",
                      }}
                      role="img"
                      aria-label={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en}
                    />
                  ) : isIncorporation ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/in-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                    </div>
                  ) : isCorporateSecretary ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/cs-bg.png" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                    </div>
                  ) : isHrTerminationRegulation ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/tr-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover object-[center_70%]" />
                    </div>
                  ) : isHrMandatoryProvidentFund ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/mpf-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                    </div>
                  ) : isIntroductionXero ? (
                    <>
                      <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                        <Image src="/insights/itx-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                      </div>
                      {("xeroKeyFeaturesTitle" in translations || "xeroKeyFeaturesDescription" in translations) && (
                        <>
                          {"xeroKeyFeaturesTitle" in translations && (
                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { xeroKeyFeaturesTitle: { en: string; ko: string } }).xeroKeyFeaturesTitle.ko : (translations as { xeroKeyFeaturesTitle: { en: string; ko: string } }).xeroKeyFeaturesTitle.en}</h3>
                          )}
                          {"xeroKeyFeaturesDescription" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">
                              {language === "KOR" ? (translations as { xeroKeyFeaturesDescription: { en: string; ko: string } }).xeroKeyFeaturesDescription.ko : (translations as { xeroKeyFeaturesDescription: { en: string; ko: string } }).xeroKeyFeaturesDescription.en}
                            </p>
                          )}
                        </>
                      )}
                    </>
                  ) : isTaxCorporateTax || isConsultingLegalConsiderationsMA ? (
                    <>
                      <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                        <Image src={isConsultingLegalConsiderationsMA ? "/insights/lc-bg.jpg" : "/insights/ct-bg.jpg"} alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                      </div>
                      {("xeroKeyFeaturesTitle" in translations || "xeroKeyFeaturesDescription" in translations) && (
                        <>
                          {"xeroKeyFeaturesTitle" in translations && (
                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { xeroKeyFeaturesTitle: { en: string; ko: string } }).xeroKeyFeaturesTitle.ko : (translations as { xeroKeyFeaturesTitle: { en: string; ko: string } }).xeroKeyFeaturesTitle.en}</h3>
                          )}
                          {"xeroKeyFeaturesDescription" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">
                              {language === "KOR" ? (translations as { xeroKeyFeaturesDescription: { en: string; ko: string } }).xeroKeyFeaturesDescription.ko : (translations as { xeroKeyFeaturesDescription: { en: string; ko: string } }).xeroKeyFeaturesDescription.en}
                            </p>
                          )}
                        </>
                      )}
                    </>
                  ) : isAccountingKnowledge ? (
                    <>
                      <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                        <Image src="/insights/ak-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                      </div>
                    </>
                  ) : isTaxDividendLegalConsiderations ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/dl-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                    </div>
                  ) : isConsultingDigitalTransformationTVP ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/dtr-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                    </div>
                  ) : isConsultingDigitalTransformation ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/dt-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                    </div>
                  ) : isConsultingDigitalTransformationUX ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/dx-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                    </div>
                  ) : isConsultingBigDataDriven ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/bd-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                    </div>
                  ) : isTaxVat ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/vt-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                    </div>
                  ) : isHrHybridWorkPerformance ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/hw-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                    </div>
                  ) : isHrLeavePolicyExplanation ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/lp-dg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                    </div>
                  ) : isHrIr56 ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/ir-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                    </div>
                  ) : isHrTaxClearanceDeparting ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/tc-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                    </div>
                  ) : isHrWithholdingObligationsDeparting ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/wo-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                    </div>
                  ) : isTaxTwoTieredSalariesTax ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/tst-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                    </div>
                  ) : isHrEmployersReturnBir56a ? (
                    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                      <Image src="/insights/employers-return-bir56a-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                    </div>
                  ) : (
                  <div className="w-full relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] mb-4 sm:mb-5 md:mb-6">
                    <Image src="/insights/ai-gen-bg.jpg" alt={language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en} fill className="object-cover" />
                  </div>
                  )}
                  {"importanceOfAI" in translations && (language === "KOR" ? (translations as { importanceOfAI: { en: string; ko: string } }).importanceOfAI.ko : (translations as { importanceOfAI: { en: string; ko: string } }).importanceOfAI.en) ? (
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { importanceOfAI: { en: string; ko: string } }).importanceOfAI.ko : (translations as { importanceOfAI: { en: string; ko: string } }).importanceOfAI.en}</h3>
                  ) : null}
                  {"importanceOfAIDescription" in translations && (
                    <>
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4 whitespace-pre-line">{language === "KOR" ? translations.importanceOfAIDescription.ko : translations.importanceOfAIDescription.en}</p>
                      {"importanceOfAIDescriptionParagraph2" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4 whitespace-pre-line">{language === "KOR" ? (translations as { importanceOfAIDescriptionParagraph2: { en: string; ko: string } }).importanceOfAIDescriptionParagraph2.ko : (translations as { importanceOfAIDescriptionParagraph2: { en: string; ko: string } }).importanceOfAIDescriptionParagraph2.en}</p>
                      )}
                      {"importanceOfAIDescriptionParagraph3" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6 whitespace-pre-line">{language === "KOR" ? (translations as { importanceOfAIDescriptionParagraph3: { en: string; ko: string } }).importanceOfAIDescriptionParagraph3.ko : (translations as { importanceOfAIDescriptionParagraph3: { en: string; ko: string } }).importanceOfAIDescriptionParagraph3.en}</p>
                      )}
                      {(isHrTerminationRegulation || isHrMandatoryProvidentFund) && "typesAndProceduresOfEmployeeDismissal" in translations && (
                        <>
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { typesAndProceduresOfEmployeeDismissal: { en: string; ko: string } }).typesAndProceduresOfEmployeeDismissal.ko : (translations as { typesAndProceduresOfEmployeeDismissal: { en: string; ko: string } }).typesAndProceduresOfEmployeeDismissal.en}</h3>
                          {"typesAndProceduresIntro" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { typesAndProceduresIntro: { en: string; ko: string } }).typesAndProceduresIntro.ko : (translations as { typesAndProceduresIntro: { en: string; ko: string } }).typesAndProceduresIntro.en}</p>
                          )}
                          {"typesAndProceduresCategory1Title" in translations && (
                            <>
                              <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2 sm:mb-2.5 md:mb-3">{language === "KOR" ? (translations as { typesAndProceduresCategory1Title: { en: string; ko: string } }).typesAndProceduresCategory1Title.ko : (translations as { typesAndProceduresCategory1Title: { en: string; ko: string } }).typesAndProceduresCategory1Title.en}</h4>
                              {"typesAndProceduresCategory1Description" in translations && (
                                <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { typesAndProceduresCategory1Description: { en: string; ko: string } }).typesAndProceduresCategory1Description.ko : (translations as { typesAndProceduresCategory1Description: { en: string; ko: string } }).typesAndProceduresCategory1Description.en}</p>
                              )}
                            </>
                          )}
                          {"typesAndProceduresCategory2Title" in translations && (
                            <>
                              <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2 sm:mb-2.5 md:mb-3">{language === "KOR" ? (translations as { typesAndProceduresCategory2Title: { en: string; ko: string } }).typesAndProceduresCategory2Title.ko : (translations as { typesAndProceduresCategory2Title: { en: string; ko: string } }).typesAndProceduresCategory2Title.en}</h4>
                              {"typesAndProceduresCategory2Description" in translations && (
                                <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-4">{language === "KOR" ? (translations as { typesAndProceduresCategory2Description: { en: string; ko: string } }).typesAndProceduresCategory2Description.ko : (translations as { typesAndProceduresCategory2Description: { en: string; ko: string } }).typesAndProceduresCategory2Description.en}</p>
                              )}
                              {"typesAndProceduresCategory2Bullets" in translations && Array.isArray((translations as { typesAndProceduresCategory2Bullets?: { label: { en: string; ko: string }; description: { en: string; ko: string } }[] }).typesAndProceduresCategory2Bullets) && (
                                <div className="pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6 space-y-3">
                                  {((translations as { typesAndProceduresCategory2Bullets: { label: { en: string; ko: string }; description: { en: string; ko: string } }[] }).typesAndProceduresCategory2Bullets).map((item, i) => {
                                    const labelText = language === "KOR" ? item.label.ko : item.label.en;
                                    const descText = language === "KOR" ? item.description.ko : item.description.en;
                                    return (
                                    <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                                      <span className="inline-block mr-2">•</span>
                                      {labelText ? <><span className="font-bold">{labelText}</span>{" "}</> : null}
                                      {descText}
                                    </p>
                                  ); })}
                                </div>
                              )}
                            </>
                          )}
                        </>
                      )}
                      {isHrIr56 && "ir56ExampleCaseScenarioTitle" in translations && (
                        <>
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { ir56ExampleCaseScenarioTitle: { en: string; ko: string } }).ir56ExampleCaseScenarioTitle.ko : (translations as { ir56ExampleCaseScenarioTitle: { en: string; ko: string } }).ir56ExampleCaseScenarioTitle.en}</h3>
                          {"ir56ExampleCaseScenarioParagraph1" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { ir56ExampleCaseScenarioParagraph1: { en: string; ko: string } }).ir56ExampleCaseScenarioParagraph1.ko : (translations as { ir56ExampleCaseScenarioParagraph1: { en: string; ko: string } }).ir56ExampleCaseScenarioParagraph1.en}</p>
                          )}
                          {"ir56ExampleCaseScenarioParagraph2" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { ir56ExampleCaseScenarioParagraph2: { en: string; ko: string } }).ir56ExampleCaseScenarioParagraph2.ko : (translations as { ir56ExampleCaseScenarioParagraph2: { en: string; ko: string } }).ir56ExampleCaseScenarioParagraph2.en}</p>
                          )}
                        </>
                      )}
                      {isHrIr56 && "ir56WhyImportantTitle" in translations && (
                        <>
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { ir56WhyImportantTitle: { en: string; ko: string } }).ir56WhyImportantTitle.ko : (translations as { ir56WhyImportantTitle: { en: string; ko: string } }).ir56WhyImportantTitle.en}</h3>
                          {"ir56WhyImportantIntro" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { ir56WhyImportantIntro: { en: string; ko: string } }).ir56WhyImportantIntro.ko : (translations as { ir56WhyImportantIntro: { en: string; ko: string } }).ir56WhyImportantIntro.en}</p>
                          )}
                          {"ir56WhyImportantBullets" in translations && Array.isArray((translations as { ir56WhyImportantBullets?: { label: { en: string; ko: string }; description: { en: string; ko: string } }[] }).ir56WhyImportantBullets) && (
                            <div className="pl-8 sm:pl-10 md:pl-12 space-y-3 mb-4 sm:mb-5 md:mb-6">
                              {((translations as { ir56WhyImportantBullets: { label: { en: string; ko: string }; description: { en: string; ko: string } }[] }).ir56WhyImportantBullets).map((item, i) => (
                                <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                                  <span className="inline-block mr-2">•</span>
                                  <span className="font-bold">{language === "KOR" ? item.label.ko : item.label.en}</span>{" "}
                                  {language === "KOR" ? item.description.ko : item.description.en}
                                </p>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                      {isHrIr56 && "ir56HowToProceedTitle" in translations && (
                        <>
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { ir56HowToProceedTitle: { en: string; ko: string } }).ir56HowToProceedTitle.ko : (translations as { ir56HowToProceedTitle: { en: string; ko: string } }).ir56HowToProceedTitle.en}</h3>
                          {"ir56HowToProceedDescription" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { ir56HowToProceedDescription: { en: string; ko: string } }).ir56HowToProceedDescription.ko : (translations as { ir56HowToProceedDescription: { en: string; ko: string } }).ir56HowToProceedDescription.en}</p>
                          )}
                        </>
                      )}
                      {isHrIr56 && "ir56InformationGatheringTitle" in translations && (
                        <>
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { ir56InformationGatheringTitle: { en: string; ko: string } }).ir56InformationGatheringTitle.ko : (translations as { ir56InformationGatheringTitle: { en: string; ko: string } }).ir56InformationGatheringTitle.en}</h3>
                          {"ir56InformationGatheringIntro" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { ir56InformationGatheringIntro: { en: string; ko: string } }).ir56InformationGatheringIntro.ko : (translations as { ir56InformationGatheringIntro: { en: string; ko: string } }).ir56InformationGatheringIntro.en}</p>
                          )}
                          {"ir56TypicallyRequiredInfoTitle" in translations && (
                            <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] font-normal text-[#111B12] mb-2 sm:mb-2.5 md:mb-3">{language === "KOR" ? (translations as { ir56TypicallyRequiredInfoTitle: { en: string; ko: string } }).ir56TypicallyRequiredInfoTitle.ko : (translations as { ir56TypicallyRequiredInfoTitle: { en: string; ko: string } }).ir56TypicallyRequiredInfoTitle.en}</h4>
                          )}
                          {"ir56InformationGatheringBullets" in translations && Array.isArray((translations as { ir56InformationGatheringBullets?: { en: string; ko: string }[] }).ir56InformationGatheringBullets) && (
                            <div className="pl-8 sm:pl-10 md:pl-12 space-y-2 mb-3 sm:mb-4">
                              {((translations as { ir56InformationGatheringBullets: { en: string; ko: string }[] }).ir56InformationGatheringBullets).map((item, i) => (
                                <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                                  <span className="inline-block mr-2">•</span>
                                  {language === "KOR" ? item.ko : item.en}
                                </p>
                              ))}
                            </div>
                          )}
                          {"ir56InformationGatheringNote" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[16px] text-[#998C3D] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { ir56InformationGatheringNote: { en: string; ko: string } }).ir56InformationGatheringNote.ko : (translations as { ir56InformationGatheringNote: { en: string; ko: string } }).ir56InformationGatheringNote.en}</p>
                          )}
                        </>
                      )}
                      {isHrIr56 && "ir56WhatAndWhenTitle" in translations && (
                        <>
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { ir56WhatAndWhenTitle: { en: string; ko: string } }).ir56WhatAndWhenTitle.ko : (translations as { ir56WhatAndWhenTitle: { en: string; ko: string } }).ir56WhatAndWhenTitle.en}</h3>
                          <div className="relative w-full aspect-[16/9] min-h-[200px] sm:min-h-[280px] md:min-h-[320px] mb-4 sm:mb-5 md:mb-6">
                            <Image src={language === "KOR" ? "/insights/el-kor.png" : "/insights/el-en.png"} alt={language === "KOR" ? (translations as { ir56WhatAndWhenTitle: { en: string; ko: string } }).ir56WhatAndWhenTitle.ko : (translations as { ir56WhatAndWhenTitle: { en: string; ko: string } }).ir56WhatAndWhenTitle.en} fill className="object-contain object-left-top" />
                          </div>
                        </>
                      )}
                      {isHrIr56 && "ir56EmploymentOnboardingTitle" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { ir56EmploymentOnboardingTitle: { en: string; ko: string } }).ir56EmploymentOnboardingTitle.ko : (translations as { ir56EmploymentOnboardingTitle: { en: string; ko: string } }).ir56EmploymentOnboardingTitle.en}</h4>
                          {"ir56EmploymentOnboardingParagraph1" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { ir56EmploymentOnboardingParagraph1: { en: string; ko: string } }).ir56EmploymentOnboardingParagraph1.ko : (translations as { ir56EmploymentOnboardingParagraph1: { en: string; ko: string } }).ir56EmploymentOnboardingParagraph1.en}</p>
                          )}
                          {"ir56EmploymentOnboardingParagraph2" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { ir56EmploymentOnboardingParagraph2: { en: string; ko: string } }).ir56EmploymentOnboardingParagraph2.ko : (translations as { ir56EmploymentOnboardingParagraph2: { en: string; ko: string } }).ir56EmploymentOnboardingParagraph2.en}</p>
                          )}
                        </>
                      )}
                      {isHrIr56 && "ir56AnnuallyAprilTitle" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { ir56AnnuallyAprilTitle: { en: string; ko: string } }).ir56AnnuallyAprilTitle.ko : (translations as { ir56AnnuallyAprilTitle: { en: string; ko: string } }).ir56AnnuallyAprilTitle.en}</h4>
                          {"ir56AnnuallyAprilParagraph" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { ir56AnnuallyAprilParagraph: { en: string; ko: string } }).ir56AnnuallyAprilParagraph.ko : (translations as { ir56AnnuallyAprilParagraph: { en: string; ko: string } }).ir56AnnuallyAprilParagraph.en}</p>
                          )}
                          {"ir56AnnuallyAprilExample" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[16px] text-[#998C3D] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { ir56AnnuallyAprilExample: { en: string; ko: string } }).ir56AnnuallyAprilExample.ko : (translations as { ir56AnnuallyAprilExample: { en: string; ko: string } }).ir56AnnuallyAprilExample.en}</p>
                          )}
                        </>
                      )}
                      {isHrIr56 && "ir56ResignationTitle" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { ir56ResignationTitle: { en: string; ko: string } }).ir56ResignationTitle.ko : (translations as { ir56ResignationTitle: { en: string; ko: string } }).ir56ResignationTitle.en}</h4>
                          {"ir56ResignationParagraph1" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { ir56ResignationParagraph1: { en: string; ko: string } }).ir56ResignationParagraph1.ko : (translations as { ir56ResignationParagraph1: { en: string; ko: string } }).ir56ResignationParagraph1.en}</p>
                          )}
                          {"ir56ResignationParagraph2" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { ir56ResignationParagraph2: { en: string; ko: string } }).ir56ResignationParagraph2.ko : (translations as { ir56ResignationParagraph2: { en: string; ko: string } }).ir56ResignationParagraph2.en}</p>
                          )}
                          {"ir56ResignationParagraph3" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { ir56ResignationParagraph3: { en: string; ko: string } }).ir56ResignationParagraph3.ko : (translations as { ir56ResignationParagraph3: { en: string; ko: string } }).ir56ResignationParagraph3.en}</p>
                          )}
                          {"ir56ResignationExample" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[16px] text-[#998C3D] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { ir56ResignationExample: { en: string; ko: string } }).ir56ResignationExample.ko : (translations as { ir56ResignationExample: { en: string; ko: string } }).ir56ResignationExample.en}</p>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {/* Tax Clearance for Departing Employees - Step-by-step workflow */}
                  {isHrTaxClearanceDeparting && "step1Title" in translations && (
                    <>
                      {"workflowTitle" in translations && (
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-4 sm:mb-5">{language === "KOR" ? (translations as { workflowTitle: { en: string; ko: string } }).workflowTitle.ko : (translations as { workflowTitle: { en: string; ko: string } }).workflowTitle.en}</h3>
                      )}
                      {(["step1Title","step2Title","step3Title","step4Title","step5Title","step6Title","step7Title","step8Title"] as const).map((stepKey, idx) => {
                        const stepNum = idx + 1;
                        const titleKey = `step${stepNum}Title` as keyof typeof translations;
                        const partyKey = `step${stepNum}ResponsibleParty` as keyof typeof translations;
                        const descKey = `step${stepNum}Description` as keyof typeof translations;
                        const warnTitleKey = "step2WarningTitle" as keyof typeof translations;
                        const warnDescKey = "step2WarningDescription" as keyof typeof translations;
                        const t = translations as unknown as Record<string, { en: string; ko: string }>;
                        return (
                          <div key={stepKey} className="mb-4 sm:mb-5">
                            {t[titleKey as string] && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-1.5">{language === "KOR" ? t[titleKey as string].ko : t[titleKey as string].en}</h4>}
                            {t[partyKey as string] && <p className="text-sm sm:text-base md:text-lg text-[#998C3D] italic pl-4 sm:pl-5 md:pl-6 mb-1.5">{language === "KOR" ? t[partyKey as string].ko : t[partyKey as string].en}</p>}
                            {t[descKey as string] && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12">{language === "KOR" ? t[descKey as string].ko : t[descKey as string].en}</p>}
                            {stepNum === 2 && t[warnTitleKey as string] && (
                              <div className="mt-3 ml-8 sm:ml-10 md:ml-12 p-3 sm:p-4 border-l-4 border-[#627F38] bg-[#f5f7f2]">
                                <p className="text-sm sm:text-base md:text-lg font-semibold text-[#627F38] mb-1">{language === "KOR" ? t[warnTitleKey as string].ko : t[warnTitleKey as string].en}</p>
                                {t[warnDescKey as string] && <p className="text-sm sm:text-base md:text-lg text-[#111B12] leading-relaxed">{language === "KOR" ? t[warnDescKey as string].ko : t[warnDescKey as string].en}</p>}
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {"summaryTableTitle" in translations && (
                        <div className="mb-5 sm:mb-6 md:mb-8">
                          <h3 className="text-sm sm:text-base md:text-lg lg:text-[24px] font-semibold text-[#627F38] mb-3">{language === "KOR" ? (translations as { summaryTableTitle: { en: string; ko: string } }).summaryTableTitle.ko : (translations as { summaryTableTitle: { en: string; ko: string } }).summaryTableTitle.en}</h3>
                          {"summaryTableRows" in translations && Array.isArray((translations as { summaryTableRows?: { step: { en: string; ko: string }; action: { en: string; ko: string }; responsible: { en: string; ko: string } }[] }).summaryTableRows) && (
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm sm:text-base md:text-lg border-collapse">
                                <thead>
                                  <tr className="bg-[#627F38] text-white">
                                    {"summaryTableHeaders" in translations && (
                                      <>
                                        <th className="text-left px-3 py-2 font-semibold">{language === "KOR" ? (translations as { summaryTableHeaders: { step: { en: string; ko: string }; action: { en: string; ko: string }; responsibleParty: { en: string; ko: string } } }).summaryTableHeaders.step.ko : (translations as { summaryTableHeaders: { step: { en: string; ko: string }; action: { en: string; ko: string }; responsibleParty: { en: string; ko: string } } }).summaryTableHeaders.step.en}</th>
                                        <th className="text-left px-3 py-2 font-semibold">{language === "KOR" ? (translations as { summaryTableHeaders: { step: { en: string; ko: string }; action: { en: string; ko: string }; responsibleParty: { en: string; ko: string } } }).summaryTableHeaders.action.ko : (translations as { summaryTableHeaders: { step: { en: string; ko: string }; action: { en: string; ko: string }; responsibleParty: { en: string; ko: string } } }).summaryTableHeaders.action.en}</th>
                                        <th className="text-left px-3 py-2 font-semibold">{language === "KOR" ? (translations as { summaryTableHeaders: { step: { en: string; ko: string }; action: { en: string; ko: string }; responsibleParty: { en: string; ko: string } } }).summaryTableHeaders.responsibleParty.ko : (translations as { summaryTableHeaders: { step: { en: string; ko: string }; action: { en: string; ko: string }; responsibleParty: { en: string; ko: string } } }).summaryTableHeaders.responsibleParty.en}</th>
                                      </>
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                  {((translations as { summaryTableRows: { step: { en: string; ko: string }; action: { en: string; ko: string }; responsible: { en: string; ko: string } }[] }).summaryTableRows).map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f5f7f2]"}>
                                      <td className="px-3 py-2 text-[#111B12]">{language === "KOR" ? row.step.ko : row.step.en}</td>
                                      <td className="px-3 py-2 text-[#111B12]">{language === "KOR" ? row.action.ko : row.action.en}</td>
                                      <td className="px-3 py-2 text-[#111B12]">{language === "KOR" ? row.responsible.ko : row.responsible.en}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                  {/* Withholding Obligations for Departing Employees - Section-based */}
                  {isHrWithholdingObligationsDeparting && "section1Title" in translations && (
                    <>
                      {/* Section 1 */}
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { section1Title: { en: string; ko: string } }).section1Title.ko : (translations as { section1Title: { en: string; ko: string } }).section1Title.en}</h3>
                      {"section1Description" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3">{language === "KOR" ? (translations as { section1Description: { en: string; ko: string } }).section1Description.ko : (translations as { section1Description: { en: string; ko: string } }).section1Description.en}</p>}
                      {"section1Conditions" in translations && Array.isArray((translations as { section1Conditions?: { label: { en: string; ko: string }; description: { en: string; ko: string } }[] }).section1Conditions) && (
                        <div className="pl-6 sm:pl-8 space-y-2 mb-3">
                          {((translations as { section1Conditions: { label: { en: string; ko: string }; description: { en: string; ko: string } }[] }).section1Conditions).map((c, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed"><span className="inline-block mr-2">•</span><span className="font-semibold">{language === "KOR" ? c.label.ko : c.label.en}:</span> {language === "KOR" ? c.description.ko : c.description.en}</p>
                          ))}
                        </div>
                      )}
                      {"section1Note" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[16px] text-[#998C3D] mb-5 sm:mb-6">{language === "KOR" ? (translations as { section1Note: { en: string; ko: string } }).section1Note.ko : (translations as { section1Note: { en: string; ko: string } }).section1Note.en}</p>}
                      {/* Section 2 */}
                      {"section2Title" in translations && <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { section2Title: { en: string; ko: string } }).section2Title.ko : (translations as { section2Title: { en: string; ko: string } }).section2Title.en}</h3>}
                      {"section2Description" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3">{language === "KOR" ? (translations as { section2Description: { en: string; ko: string } }).section2Description.ko : (translations as { section2Description: { en: string; ko: string } }).section2Description.en}</p>}
                      {"section2ReceiptDateTitle" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section2ReceiptDateTitle: { en: string; ko: string } }).section2ReceiptDateTitle.ko : (translations as { section2ReceiptDateTitle: { en: string; ko: string } }).section2ReceiptDateTitle.en}</h4>}
                      {"section2ReceiptDateDescription" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed pl-8 sm:pl-10 md:pl-12 mb-2">{language === "KOR" ? (translations as { section2ReceiptDateDescription: { en: string; ko: string } }).section2ReceiptDateDescription.ko : (translations as { section2ReceiptDateDescription: { en: string; ko: string } }).section2ReceiptDateDescription.en}</p>}
                      {"section2ReceiptMethods" in translations && Array.isArray((translations as { section2ReceiptMethods?: { en: string; ko: string }[] }).section2ReceiptMethods) && (
                        <div className="pl-8 sm:pl-10 md:pl-12 space-y-2 mb-2">
                          {((translations as { section2ReceiptMethods: { en: string; ko: string }[] }).section2ReceiptMethods).map((m, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed"><span className="inline-block mr-2">•</span>{language === "KOR" ? m.ko : m.en}</p>
                          ))}
                        </div>
                      )}
                      {"section2ReceiptNote" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[16px] text-[#998C3D] pl-8 sm:pl-10 md:pl-12 mb-4">{language === "KOR" ? (translations as { section2ReceiptNote: { en: string; ko: string } }).section2ReceiptNote.ko : (translations as { section2ReceiptNote: { en: string; ko: string } }).section2ReceiptNote.en}</p>}
                      {"section2ClearanceTimelineTitle" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section2ClearanceTimelineTitle: { en: string; ko: string } }).section2ClearanceTimelineTitle.ko : (translations as { section2ClearanceTimelineTitle: { en: string; ko: string } }).section2ClearanceTimelineTitle.en}</h4>}
                      {"section2ClearanceTimelineDescription" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3">{language === "KOR" ? (translations as { section2ClearanceTimelineDescription: { en: string; ko: string } }).section2ClearanceTimelineDescription.ko : (translations as { section2ClearanceTimelineDescription: { en: string; ko: string } }).section2ClearanceTimelineDescription.en}</p>}
                      {"section2ExposureTitle" in translations && (
                        <div className="mb-5 sm:mb-6 p-3 sm:p-4 border-l-4 border-[#627F38] bg-[#f5f7f2]">
                          <p className="text-sm sm:text-base md:text-lg font-semibold text-[#627F38] mb-1">{language === "KOR" ? (translations as { section2ExposureTitle: { en: string; ko: string } }).section2ExposureTitle.ko : (translations as { section2ExposureTitle: { en: string; ko: string } }).section2ExposureTitle.en}</p>
                          {"section2ExposureDescription" in translations && <p className="text-sm sm:text-base md:text-lg text-[#111B12] leading-relaxed">{language === "KOR" ? (translations as { section2ExposureDescription: { en: string; ko: string } }).section2ExposureDescription.ko : (translations as { section2ExposureDescription: { en: string; ko: string } }).section2ExposureDescription.en}</p>}
                        </div>
                      )}
                      {/* Section 3 */}
                      {"section3Title" in translations && <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { section3Title: { en: string; ko: string } }).section3Title.ko : (translations as { section3Title: { en: string; ko: string } }).section3Title.en}</h3>}
                      {"section3Items" in translations && Array.isArray((translations as { section3Items?: { en: string; ko: string }[] }).section3Items) && (
                        <div className="pl-8 sm:pl-10 md:pl-12 space-y-2 mb-5 sm:mb-6">
                          {((translations as { section3Items: { en: string; ko: string }[] }).section3Items).map((item, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed"><span className="inline-block mr-2">•</span>{language === "KOR" ? item.ko : item.en}</p>
                          ))}
                        </div>
                      )}
                      {/* Section 4 */}
                      {"section4Title" in translations && <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { section4Title: { en: string; ko: string } }).section4Title.ko : (translations as { section4Title: { en: string; ko: string } }).section4Title.en}</h3>}
                      {"section4Description" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-5 sm:mb-6">{language === "KOR" ? (translations as { section4Description: { en: string; ko: string } }).section4Description.ko : (translations as { section4Description: { en: string; ko: string } }).section4Description.en}</p>}
                      {/* Section 5 */}
                      {"section5Title" in translations && <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { section5Title: { en: string; ko: string } }).section5Title.ko : (translations as { section5Title: { en: string; ko: string } }).section5Title.en}</h3>}
                      {"section5Items" in translations && Array.isArray((translations as { section5Items?: { en: string; ko: string }[] }).section5Items) && (
                        <div className="pl-8 sm:pl-10 md:pl-12 space-y-2 mb-5 sm:mb-6">
                          {((translations as { section5Items: { en: string; ko: string }[] }).section5Items).map((item, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed"><span className="inline-block mr-2">•</span>{language === "KOR" ? item.ko : item.en}</p>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  {isTaxTwoTieredSalariesTax && "section1Title" in translations && (
                    <>
                      {/* Section 1 — How Calculated */}
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { section1Title: { en: string; ko: string } }).section1Title.ko : (translations as { section1Title: { en: string; ko: string } }).section1Title.en}</h3>
                      {"section1Description" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3">{language === "KOR" ? (translations as { section1Description: { en: string; ko: string } }).section1Description.ko : (translations as { section1Description: { en: string; ko: string } }).section1Description.en}</p>}
                      {"section1Method1Title" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section1Method1Title: { en: string; ko: string } }).section1Method1Title.ko : (translations as { section1Method1Title: { en: string; ko: string } }).section1Method1Title.en}</h4>}
                      {"section1ProgressiveRates" in translations && Array.isArray((translations as { section1ProgressiveRates?: { label: { en: string; ko: string }; rate: { en: string; ko: string } }[] }).section1ProgressiveRates) && (
                        <div className="pl-8 sm:pl-10 md:pl-12 space-y-1 mb-4">
                          {((translations as { section1ProgressiveRates: { label: { en: string; ko: string }; rate: { en: string; ko: string } }[] }).section1ProgressiveRates).map((r, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed"><span className="inline-block mr-2">•</span>{language === "KOR" ? r.label.ko : r.label.en} — {language === "KOR" ? r.rate.ko : r.rate.en}</p>
                          ))}
                        </div>
                      )}
                      {"section1Method2Title" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section1Method2Title: { en: string; ko: string } }).section1Method2Title.ko : (translations as { section1Method2Title: { en: string; ko: string } }).section1Method2Title.en}</h4>}
                      {"section1StandardRates" in translations && Array.isArray((translations as { section1StandardRates?: { label: { en: string; ko: string }; rate: { en: string; ko: string } }[] }).section1StandardRates) && (
                        <div className="pl-8 sm:pl-10 md:pl-12 space-y-1 mb-3">
                          {((translations as { section1StandardRates: { label: { en: string; ko: string }; rate: { en: string; ko: string } }[] }).section1StandardRates).map((r, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed"><span className="inline-block mr-2">•</span>{language === "KOR" ? r.label.ko : r.label.en} — {language === "KOR" ? r.rate.ko : r.rate.en}</p>
                          ))}
                        </div>
                      )}
                      {"section1Note" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[16px] text-[#998C3D] mb-5 sm:mb-6">{language === "KOR" ? (translations as { section1Note: { en: string; ko: string } }).section1Note.ko : (translations as { section1Note: { en: string; ko: string } }).section1Note.en}</p>}
                      {/* Section 2 — Two-Tiered Change */}
                      {"section2Title" in translations && <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { section2Title: { en: string; ko: string } }).section2Title.ko : (translations as { section2Title: { en: string; ko: string } }).section2Title.en}</h3>}
                      {"section2Description" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3">{language === "KOR" ? (translations as { section2Description: { en: string; ko: string } }).section2Description.ko : (translations as { section2Description: { en: string; ko: string } }).section2Description.en}</p>}
                      {"section2WhoAffectedTitle" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section2WhoAffectedTitle: { en: string; ko: string } }).section2WhoAffectedTitle.ko : (translations as { section2WhoAffectedTitle: { en: string; ko: string } }).section2WhoAffectedTitle.en}</h4>}
                      {"section2WhoAffectedItems" in translations && Array.isArray((translations as { section2WhoAffectedItems?: { en: string; ko: string }[] }).section2WhoAffectedItems) && (
                        <div className="pl-8 sm:pl-10 md:pl-12 space-y-2 mb-4">
                          {((translations as { section2WhoAffectedItems: { en: string; ko: string }[] }).section2WhoAffectedItems).map((item, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed"><span className="inline-block mr-2">•</span>{language === "KOR" ? item.ko : item.en}</p>
                          ))}
                        </div>
                      )}
                      {"section2EmployerTitle" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section2EmployerTitle: { en: string; ko: string } }).section2EmployerTitle.ko : (translations as { section2EmployerTitle: { en: string; ko: string } }).section2EmployerTitle.en}</h4>}
                      {"section2EmployerItems" in translations && Array.isArray((translations as { section2EmployerItems?: { en: string; ko: string }[] }).section2EmployerItems) && (
                        <div className="pl-8 sm:pl-10 md:pl-12 space-y-2 mb-5 sm:mb-6">
                          {((translations as { section2EmployerItems: { en: string; ko: string }[] }).section2EmployerItems).map((item, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed"><span className="inline-block mr-2">•</span>{language === "KOR" ? item.ko : item.en}</p>
                          ))}
                        </div>
                      )}
                      {/* Section 3 — Deductions & Allowances */}
                      {"section3Title" in translations && <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { section3Title: { en: string; ko: string } }).section3Title.ko : (translations as { section3Title: { en: string; ko: string } }).section3Title.en}</h3>}
                      {"section3DeductionsTitle" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section3DeductionsTitle: { en: string; ko: string } }).section3DeductionsTitle.ko : (translations as { section3DeductionsTitle: { en: string; ko: string } }).section3DeductionsTitle.en}</h4>}
                      {"section3DeductionItems" in translations && Array.isArray((translations as { section3DeductionItems?: { en: string; ko: string }[] }).section3DeductionItems) && (
                        <div className="pl-8 sm:pl-10 md:pl-12 space-y-2 mb-4">
                          {((translations as { section3DeductionItems: { en: string; ko: string }[] }).section3DeductionItems).map((item, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed"><span className="inline-block mr-2">•</span>{language === "KOR" ? item.ko : item.en}</p>
                          ))}
                        </div>
                      )}
                      {"section3AllowancesTitle" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section3AllowancesTitle: { en: string; ko: string } }).section3AllowancesTitle.ko : (translations as { section3AllowancesTitle: { en: string; ko: string } }).section3AllowancesTitle.en}</h4>}
                      {"section3AllowanceItems" in translations && Array.isArray((translations as { section3AllowanceItems?: { en: string; ko: string }[] }).section3AllowanceItems) && (
                        <div className="pl-8 sm:pl-10 md:pl-12 space-y-2 mb-5 sm:mb-6">
                          {((translations as { section3AllowanceItems: { en: string; ko: string }[] }).section3AllowanceItems).map((item, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed"><span className="inline-block mr-2">•</span>{language === "KOR" ? item.ko : item.en}</p>
                          ))}
                        </div>
                      )}
                      {/* Section 4 — Employer Reporting */}
                      {"section4Title" in translations && <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { section4Title: { en: string; ko: string } }).section4Title.ko : (translations as { section4Title: { en: string; ko: string } }).section4Title.en}</h3>}
                      {"section4Description" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3">{language === "KOR" ? (translations as { section4Description: { en: string; ko: string } }).section4Description.ko : (translations as { section4Description: { en: string; ko: string } }).section4Description.en}</p>}
                      {"section4Items" in translations && Array.isArray((translations as { section4Items?: { en: string; ko: string }[] }).section4Items) && (
                        <div className="pl-8 sm:pl-10 md:pl-12 space-y-2 mb-4">
                          {((translations as { section4Items: { en: string; ko: string }[] }).section4Items).map((item, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed"><span className="inline-block mr-2">•</span>{language === "KOR" ? item.ko : item.en}</p>
                          ))}
                        </div>
                      )}
                      {"section4ExposureTitle" in translations && (
                        <div className="border-l-4 border-[#627F38] pl-4 py-2 mb-5 sm:mb-6">
                          <p className="text-sm sm:text-base md:text-lg font-semibold text-[#627F38] mb-1">{language === "KOR" ? (translations as { section4ExposureTitle: { en: string; ko: string } }).section4ExposureTitle.ko : (translations as { section4ExposureTitle: { en: string; ko: string } }).section4ExposureTitle.en}</p>
                          {"section4ExposureDescription" in translations && <p className="text-sm sm:text-base md:text-lg text-[#111B12] leading-relaxed">{language === "KOR" ? (translations as { section4ExposureDescription: { en: string; ko: string } }).section4ExposureDescription.ko : (translations as { section4ExposureDescription: { en: string; ko: string } }).section4ExposureDescription.en}</p>}
                        </div>
                      )}
                    </>
                  )}
                  {isHrEmployersReturnBir56a && "section1Title" in translations && (
                    <>
                      {/* Section 1 — What Is the Annual Employer's Return? */}
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { section1Title: { en: string; ko: string } }).section1Title.ko : (translations as { section1Title: { en: string; ko: string } }).section1Title.en}</h3>
                      {"section1Description" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3">{language === "KOR" ? (translations as { section1Description: { en: string; ko: string } }).section1Description.ko : (translations as { section1Description: { en: string; ko: string } }).section1Description.en}</p>}
                      {"section1Ir56bDescription" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3">{language === "KOR" ? (translations as { section1Ir56bDescription: { en: string; ko: string } }).section1Ir56bDescription.ko : (translations as { section1Ir56bDescription: { en: string; ko: string } }).section1Ir56bDescription.en}</p>}
                      {"section1BlockExtensionNote" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[16px] text-[#998C3D] mb-3">{language === "KOR" ? (translations as { section1BlockExtensionNote: { en: string; ko: string } }).section1BlockExtensionNote.ko : (translations as { section1BlockExtensionNote: { en: string; ko: string } }).section1BlockExtensionNote.en}</p>}
                      {"section1NilFilingTitle" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section1NilFilingTitle: { en: string; ko: string } }).section1NilFilingTitle.ko : (translations as { section1NilFilingTitle: { en: string; ko: string } }).section1NilFilingTitle.en}</h4>}
                      {"section1NilFilingDescription" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-5 sm:mb-6">{language === "KOR" ? (translations as { section1NilFilingDescription: { en: string; ko: string } }).section1NilFilingDescription.ko : (translations as { section1NilFilingDescription: { en: string; ko: string } }).section1NilFilingDescription.en}</p>}
                      {/* Section 2 — Which Employees Must Be Reported */}
                      {"section2Title" in translations && <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { section2Title: { en: string; ko: string } }).section2Title.ko : (translations as { section2Title: { en: string; ko: string } }).section2Title.en}</h3>}
                      {"section2Description" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3">{language === "KOR" ? (translations as { section2Description: { en: string; ko: string } }).section2Description.ko : (translations as { section2Description: { en: string; ko: string } }).section2Description.en}</p>}
                      {"section2Items" in translations && Array.isArray((translations as { section2Items?: { en: string; ko: string }[] }).section2Items) && (
                        <div className="pl-8 sm:pl-10 md:pl-12 space-y-2 mb-4">
                          {((translations as { section2Items: { en: string; ko: string }[] }).section2Items).map((item, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed"><span className="inline-block mr-2">•</span>{language === "KOR" ? item.ko : item.en}</p>
                          ))}
                        </div>
                      )}
                      {"section2WhatToReportTitle" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section2WhatToReportTitle: { en: string; ko: string } }).section2WhatToReportTitle.ko : (translations as { section2WhatToReportTitle: { en: string; ko: string } }).section2WhatToReportTitle.en}</h4>}
                      {"section2WhatToReportDescription" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3">{language === "KOR" ? (translations as { section2WhatToReportDescription: { en: string; ko: string } }).section2WhatToReportDescription.ko : (translations as { section2WhatToReportDescription: { en: string; ko: string } }).section2WhatToReportDescription.en}</p>}
                      {"section2OverseasTitle" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section2OverseasTitle: { en: string; ko: string } }).section2OverseasTitle.ko : (translations as { section2OverseasTitle: { en: string; ko: string } }).section2OverseasTitle.en}</h4>}
                      {"section2OverseasDescription" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-5 sm:mb-6">{language === "KOR" ? (translations as { section2OverseasDescription: { en: string; ko: string } }).section2OverseasDescription.ko : (translations as { section2OverseasDescription: { en: string; ko: string } }).section2OverseasDescription.en}</p>}
                      {/* Section 3 — IR56 Form Family */}
                      {"section3Title" in translations && <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { section3Title: { en: string; ko: string } }).section3Title.ko : (translations as { section3Title: { en: string; ko: string } }).section3Title.en}</h3>}
                      {"section3Description" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3">{language === "KOR" ? (translations as { section3Description: { en: string; ko: string } }).section3Description.ko : (translations as { section3Description: { en: string; ko: string } }).section3Description.en}</p>}
                      {"section3FormItems" in translations && Array.isArray((translations as { section3FormItems?: { form: { en: string; ko: string }; purpose: { en: string; ko: string }; deadline: { en: string; ko: string } }[] }).section3FormItems) && (
                        <div className="pl-4 sm:pl-5 md:pl-6 space-y-3 mb-4">
                          {((translations as { section3FormItems: { form: { en: string; ko: string }; purpose: { en: string; ko: string }; deadline: { en: string; ko: string } }[] }).section3FormItems).map((item, i) => (
                            <div key={i} className="pl-4 border-l-2 border-[#627F38]">
                              <p className="text-sm sm:text-base md:text-lg font-semibold text-[#333333]">{language === "KOR" ? item.form.ko : item.form.en}</p>
                              <p className="text-sm sm:text-base md:text-lg text-[#111B12] leading-relaxed">{language === "KOR" ? item.purpose.ko : item.purpose.en}</p>
                              <p className="text-sm sm:text-base md:text-lg text-[#998C3D]">{language === "KOR" ? item.deadline.ko : item.deadline.en}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {"section3WithholdingTitle" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section3WithholdingTitle: { en: string; ko: string } }).section3WithholdingTitle.ko : (translations as { section3WithholdingTitle: { en: string; ko: string } }).section3WithholdingTitle.en}</h4>}
                      {"section3WithholdingDescription" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3">{language === "KOR" ? (translations as { section3WithholdingDescription: { en: string; ko: string } }).section3WithholdingDescription.ko : (translations as { section3WithholdingDescription: { en: string; ko: string } }).section3WithholdingDescription.en}</p>}
                      {"section3EmployeeCopyNote" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[16px] text-[#998C3D] mb-5 sm:mb-6">{language === "KOR" ? (translations as { section3EmployeeCopyNote: { en: string; ko: string } }).section3EmployeeCopyNote.ko : (translations as { section3EmployeeCopyNote: { en: string; ko: string } }).section3EmployeeCopyNote.en}</p>}
                      {/* Section 4 — How to File */}
                      {"section4Title" in translations && <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { section4Title: { en: string; ko: string } }).section4Title.ko : (translations as { section4Title: { en: string; ko: string } }).section4Title.en}</h3>}
                      {"section4Description" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3">{language === "KOR" ? (translations as { section4Description: { en: string; ko: string } }).section4Description.ko : (translations as { section4Description: { en: string; ko: string } }).section4Description.en}</p>}
                      {"section4EtaxTitle" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section4EtaxTitle: { en: string; ko: string } }).section4EtaxTitle.ko : (translations as { section4EtaxTitle: { en: string; ko: string } }).section4EtaxTitle.en}</h4>}
                      {"section4EtaxDescription" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3">{language === "KOR" ? (translations as { section4EtaxDescription: { en: string; ko: string } }).section4EtaxDescription.ko : (translations as { section4EtaxDescription: { en: string; ko: string } }).section4EtaxDescription.en}</p>}
                      {"section4PaperTitle" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section4PaperTitle: { en: string; ko: string } }).section4PaperTitle.ko : (translations as { section4PaperTitle: { en: string; ko: string } }).section4PaperTitle.en}</h4>}
                      {"section4PaperDescription" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3">{language === "KOR" ? (translations as { section4PaperDescription: { en: string; ko: string } }).section4PaperDescription.ko : (translations as { section4PaperDescription: { en: string; ko: string } }).section4PaperDescription.en}</p>}
                      {"section4NoReturnTitle" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section4NoReturnTitle: { en: string; ko: string } }).section4NoReturnTitle.ko : (translations as { section4NoReturnTitle: { en: string; ko: string } }).section4NoReturnTitle.en}</h4>}
                      {"section4NoReturnDescription" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3">{language === "KOR" ? (translations as { section4NoReturnDescription: { en: string; ko: string } }).section4NoReturnDescription.ko : (translations as { section4NoReturnDescription: { en: string; ko: string } }).section4NoReturnDescription.en}</p>}
                      {"section4CurrencyNote" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[16px] text-[#998C3D] mb-5 sm:mb-6">{language === "KOR" ? (translations as { section4CurrencyNote: { en: string; ko: string } }).section4CurrencyNote.ko : (translations as { section4CurrencyNote: { en: string; ko: string } }).section4CurrencyNote.en}</p>}
                      {/* Section 5 — Payroll Records */}
                      {"section5Title" in translations && <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { section5Title: { en: string; ko: string } }).section5Title.ko : (translations as { section5Title: { en: string; ko: string } }).section5Title.en}</h3>}
                      {"section5Description" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3">{language === "KOR" ? (translations as { section5Description: { en: string; ko: string } }).section5Description.ko : (translations as { section5Description: { en: string; ko: string } }).section5Description.en}</p>}
                      {"section5RecordItems" in translations && Array.isArray((translations as { section5RecordItems?: { en: string; ko: string }[] }).section5RecordItems) && (
                        <div className="pl-8 sm:pl-10 md:pl-12 space-y-2 mb-4">
                          {((translations as { section5RecordItems: { en: string; ko: string }[] }).section5RecordItems).map((item, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed"><span className="inline-block mr-2">•</span>{language === "KOR" ? item.ko : item.en}</p>
                          ))}
                        </div>
                      )}
                      {"section5ChangesNote" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[16px] text-[#998C3D] mb-5 sm:mb-6">{language === "KOR" ? (translations as { section5ChangesNote: { en: string; ko: string } }).section5ChangesNote.ko : (translations as { section5ChangesNote: { en: string; ko: string } }).section5ChangesNote.en}</p>}
                      {/* Section 6 — Penalties */}
                      {"section6Title" in translations && <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { section6Title: { en: string; ko: string } }).section6Title.ko : (translations as { section6Title: { en: string; ko: string } }).section6Title.en}</h3>}
                      {"section6Description" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3">{language === "KOR" ? (translations as { section6Description: { en: string; ko: string } }).section6Description.ko : (translations as { section6Description: { en: string; ko: string } }).section6Description.en}</p>}
                      {"section6LateFilingTitle" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section6LateFilingTitle: { en: string; ko: string } }).section6LateFilingTitle.ko : (translations as { section6LateFilingTitle: { en: string; ko: string } }).section6LateFilingTitle.en}</h4>}
                      {"section6LateFilingItems" in translations && Array.isArray((translations as { section6LateFilingItems?: { en: string; ko: string }[] }).section6LateFilingItems) && (
                        <div className="pl-8 sm:pl-10 md:pl-12 space-y-2 mb-4">
                          {((translations as { section6LateFilingItems: { en: string; ko: string }[] }).section6LateFilingItems).map((item, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed"><span className="inline-block mr-2">•</span>{language === "KOR" ? item.ko : item.en}</p>
                          ))}
                        </div>
                      )}
                      {"section6IncorrectTitle" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section6IncorrectTitle: { en: string; ko: string } }).section6IncorrectTitle.ko : (translations as { section6IncorrectTitle: { en: string; ko: string } }).section6IncorrectTitle.en}</h4>}
                      {"section6IncorrectItems" in translations && Array.isArray((translations as { section6IncorrectItems?: { en: string; ko: string }[] }).section6IncorrectItems) && (
                        <div className="pl-8 sm:pl-10 md:pl-12 space-y-2 mb-4">
                          {((translations as { section6IncorrectItems: { en: string; ko: string }[] }).section6IncorrectItems).map((item, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed"><span className="inline-block mr-2">•</span>{language === "KOR" ? item.ko : item.en}</p>
                          ))}
                        </div>
                      )}
                      {"section6ContinuedTitle" in translations && <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2">{language === "KOR" ? (translations as { section6ContinuedTitle: { en: string; ko: string } }).section6ContinuedTitle.ko : (translations as { section6ContinuedTitle: { en: string; ko: string } }).section6ContinuedTitle.en}</h4>}
                      {"section6ContinuedItems" in translations && Array.isArray((translations as { section6ContinuedItems?: { en: string; ko: string }[] }).section6ContinuedItems) && (
                        <div className="pl-8 sm:pl-10 md:pl-12 space-y-2 mb-4">
                          {((translations as { section6ContinuedItems: { en: string; ko: string }[] }).section6ContinuedItems).map((item, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed"><span className="inline-block mr-2">•</span>{language === "KOR" ? item.ko : item.en}</p>
                          ))}
                        </div>
                      )}
                      {"section6NilReminder" in translations && (
                        <div className="border-l-4 border-[#627F38] pl-4 py-2 mb-5 sm:mb-6">
                          <p className="text-sm sm:text-base md:text-lg text-[#111B12] leading-relaxed">{language === "KOR" ? (translations as { section6NilReminder: { en: string; ko: string } }).section6NilReminder.ko : (translations as { section6NilReminder: { en: string; ko: string } }).section6NilReminder.en}</p>
                        </div>
                      )}
                    </>
                  )}
                  {"whatIsVatTitle" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { whatIsVatTitle: { en: string; ko: string } }).whatIsVatTitle.ko : (translations as { whatIsVatTitle: { en: string; ko: string } }).whatIsVatTitle.en}</h3>
                      {"whatIsVatDescription" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { whatIsVatDescription: { en: string; ko: string } }).whatIsVatDescription.ko : (translations as { whatIsVatDescription: { en: string; ko: string } }).whatIsVatDescription.en}</p>
                      )}
                    </>
                  )}
                  {"reasonsForAbsenceOfVatTitle" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { reasonsForAbsenceOfVatTitle: { en: string; ko: string } }).reasonsForAbsenceOfVatTitle.ko : (translations as { reasonsForAbsenceOfVatTitle: { en: string; ko: string } }).reasonsForAbsenceOfVatTitle.en}</h3>
                      {"reasonsForAbsenceOfVatIntro" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { reasonsForAbsenceOfVatIntro: { en: string; ko: string } }).reasonsForAbsenceOfVatIntro.ko : (translations as { reasonsForAbsenceOfVatIntro: { en: string; ko: string } }).reasonsForAbsenceOfVatIntro.en}</p>
                      )}
                      {"reasonsForAbsenceOfVatLeadIn" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { reasonsForAbsenceOfVatLeadIn: { en: string; ko: string } }).reasonsForAbsenceOfVatLeadIn.ko : (translations as { reasonsForAbsenceOfVatLeadIn: { en: string; ko: string } }).reasonsForAbsenceOfVatLeadIn.en}</p>
                      )}
                      {"reasonsForAbsenceOfVat1Title" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { reasonsForAbsenceOfVat1Title: { en: string; ko: string } }).reasonsForAbsenceOfVat1Title.ko : (translations as { reasonsForAbsenceOfVat1Title: { en: string; ko: string } }).reasonsForAbsenceOfVat1Title.en}</h4>
                          {"reasonsForAbsenceOfVat1Description" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { reasonsForAbsenceOfVat1Description: { en: string; ko: string } }).reasonsForAbsenceOfVat1Description.ko : (translations as { reasonsForAbsenceOfVat1Description: { en: string; ko: string } }).reasonsForAbsenceOfVat1Description.en}</p>
                          )}
                        </>
                      )}
                      {"reasonsForAbsenceOfVat2Title" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { reasonsForAbsenceOfVat2Title: { en: string; ko: string } }).reasonsForAbsenceOfVat2Title.ko : (translations as { reasonsForAbsenceOfVat2Title: { en: string; ko: string } }).reasonsForAbsenceOfVat2Title.en}</h4>
                          {"reasonsForAbsenceOfVat2Description" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { reasonsForAbsenceOfVat2Description: { en: string; ko: string } }).reasonsForAbsenceOfVat2Description.ko : (translations as { reasonsForAbsenceOfVat2Description: { en: string; ko: string } }).reasonsForAbsenceOfVat2Description.en}</p>
                          )}
                        </>
                      )}
                      {"reasonsForAbsenceOfVat3Title" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { reasonsForAbsenceOfVat3Title: { en: string; ko: string } }).reasonsForAbsenceOfVat3Title.ko : (translations as { reasonsForAbsenceOfVat3Title: { en: string; ko: string } }).reasonsForAbsenceOfVat3Title.en}</h4>
                          {"reasonsForAbsenceOfVat3Description" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { reasonsForAbsenceOfVat3Description: { en: string; ko: string } }).reasonsForAbsenceOfVat3Description.ko : (translations as { reasonsForAbsenceOfVat3Description: { en: string; ko: string } }).reasonsForAbsenceOfVat3Description.en}</p>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {"hybridWorkWhatIsTitle" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { hybridWorkWhatIsTitle: { en: string; ko: string } }).hybridWorkWhatIsTitle.ko : (translations as { hybridWorkWhatIsTitle: { en: string; ko: string } }).hybridWorkWhatIsTitle.en}</h3>
                      {"hybridWorkWhatIsDescription" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { hybridWorkWhatIsDescription: { en: string; ko: string } }).hybridWorkWhatIsDescription.ko : (translations as { hybridWorkWhatIsDescription: { en: string; ko: string } }).hybridWorkWhatIsDescription.en}</p>
                      )}
                    </>
                  )}
                  {"hybridWorkChallengesTitle" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { hybridWorkChallengesTitle: { en: string; ko: string } }).hybridWorkChallengesTitle.ko : (translations as { hybridWorkChallengesTitle: { en: string; ko: string } }).hybridWorkChallengesTitle.en}</h3>
                      {"hybridWorkChallengesIntro" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { hybridWorkChallengesIntro: { en: string; ko: string } }).hybridWorkChallengesIntro.ko : (translations as { hybridWorkChallengesIntro: { en: string; ko: string } }).hybridWorkChallengesIntro.en}</p>
                      )}
                      {"hybridWorkChallenges1Title" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { hybridWorkChallenges1Title: { en: string; ko: string } }).hybridWorkChallenges1Title.ko : (translations as { hybridWorkChallenges1Title: { en: string; ko: string } }).hybridWorkChallenges1Title.en}</h4>
                          {"hybridWorkChallenges1Description" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { hybridWorkChallenges1Description: { en: string; ko: string } }).hybridWorkChallenges1Description.ko : (translations as { hybridWorkChallenges1Description: { en: string; ko: string } }).hybridWorkChallenges1Description.en}</p>
                          )}
                        </>
                      )}
                      {"hybridWorkChallenges2Title" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { hybridWorkChallenges2Title: { en: string; ko: string } }).hybridWorkChallenges2Title.ko : (translations as { hybridWorkChallenges2Title: { en: string; ko: string } }).hybridWorkChallenges2Title.en}</h4>
                          {"hybridWorkChallenges2Description" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { hybridWorkChallenges2Description: { en: string; ko: string } }).hybridWorkChallenges2Description.ko : (translations as { hybridWorkChallenges2Description: { en: string; ko: string } }).hybridWorkChallenges2Description.en}</p>
                          )}
                        </>
                      )}
                      {"hybridWorkChallenges3Title" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { hybridWorkChallenges3Title: { en: string; ko: string } }).hybridWorkChallenges3Title.ko : (translations as { hybridWorkChallenges3Title: { en: string; ko: string } }).hybridWorkChallenges3Title.en}</h4>
                          {"hybridWorkChallenges3Description" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { hybridWorkChallenges3Description: { en: string; ko: string } }).hybridWorkChallenges3Description.ko : (translations as { hybridWorkChallenges3Description: { en: string; ko: string } }).hybridWorkChallenges3Description.en}</p>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {"hybridWorkManagementStrategiesTitle" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { hybridWorkManagementStrategiesTitle: { en: string; ko: string } }).hybridWorkManagementStrategiesTitle.ko : (translations as { hybridWorkManagementStrategiesTitle: { en: string; ko: string } }).hybridWorkManagementStrategiesTitle.en}</h3>
                      {"hybridWorkManagementStrategiesIntro" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { hybridWorkManagementStrategiesIntro: { en: string; ko: string } }).hybridWorkManagementStrategiesIntro.ko : (translations as { hybridWorkManagementStrategiesIntro: { en: string; ko: string } }).hybridWorkManagementStrategiesIntro.en}</p>
                      )}
                      {"hybridWorkManagementStrategies1Title" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { hybridWorkManagementStrategies1Title: { en: string; ko: string } }).hybridWorkManagementStrategies1Title.ko : (translations as { hybridWorkManagementStrategies1Title: { en: string; ko: string } }).hybridWorkManagementStrategies1Title.en}</h4>
                          {"hybridWorkManagementStrategies1Description" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { hybridWorkManagementStrategies1Description: { en: string; ko: string } }).hybridWorkManagementStrategies1Description.ko : (translations as { hybridWorkManagementStrategies1Description: { en: string; ko: string } }).hybridWorkManagementStrategies1Description.en}</p>
                          )}
                        </>
                      )}
                      {"hybridWorkManagementStrategies2Title" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { hybridWorkManagementStrategies2Title: { en: string; ko: string } }).hybridWorkManagementStrategies2Title.ko : (translations as { hybridWorkManagementStrategies2Title: { en: string; ko: string } }).hybridWorkManagementStrategies2Title.en}</h4>
                          {"hybridWorkManagementStrategies2Description" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { hybridWorkManagementStrategies2Description: { en: string; ko: string } }).hybridWorkManagementStrategies2Description.ko : (translations as { hybridWorkManagementStrategies2Description: { en: string; ko: string } }).hybridWorkManagementStrategies2Description.en}</p>
                          )}
                        </>
                      )}
                      {"hybridWorkManagementStrategies3Title" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { hybridWorkManagementStrategies3Title: { en: string; ko: string } }).hybridWorkManagementStrategies3Title.ko : (translations as { hybridWorkManagementStrategies3Title: { en: string; ko: string } }).hybridWorkManagementStrategies3Title.en}</h4>
                          {"hybridWorkManagementStrategies3Description" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { hybridWorkManagementStrategies3Description: { en: string; ko: string } }).hybridWorkManagementStrategies3Description.ko : (translations as { hybridWorkManagementStrategies3Description: { en: string; ko: string } }).hybridWorkManagementStrategies3Description.en}</p>
                          )}
                        </>
                      )}
                      {"hybridWorkManagementStrategies4Title" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { hybridWorkManagementStrategies4Title: { en: string; ko: string } }).hybridWorkManagementStrategies4Title.ko : (translations as { hybridWorkManagementStrategies4Title: { en: string; ko: string } }).hybridWorkManagementStrategies4Title.en}</h4>
                          {"hybridWorkManagementStrategies4Description" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { hybridWorkManagementStrategies4Description: { en: string; ko: string } }).hybridWorkManagementStrategies4Description.ko : (translations as { hybridWorkManagementStrategies4Description: { en: string; ko: string } }).hybridWorkManagementStrategies4Description.en}</p>
                          )}
                        </>
                      )}
                      {"hybridWorkManagementStrategies5Title" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { hybridWorkManagementStrategies5Title: { en: string; ko: string } }).hybridWorkManagementStrategies5Title.ko : (translations as { hybridWorkManagementStrategies5Title: { en: string; ko: string } }).hybridWorkManagementStrategies5Title.en}</h4>
                          {"hybridWorkManagementStrategies5Description" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { hybridWorkManagementStrategies5Description: { en: string; ko: string } }).hybridWorkManagementStrategies5Description.ko : (translations as { hybridWorkManagementStrategies5Description: { en: string; ko: string } }).hybridWorkManagementStrategies5Description.en}</p>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {"whatAreRetainedProfitsDividendsTitle" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { whatAreRetainedProfitsDividendsTitle: { en: string; ko: string } }).whatAreRetainedProfitsDividendsTitle.ko : (translations as { whatAreRetainedProfitsDividendsTitle: { en: string; ko: string } }).whatAreRetainedProfitsDividendsTitle.en}</h3>
                      {"whatAreRetainedProfitsDividendsDescription" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { whatAreRetainedProfitsDividendsDescription: { en: string; ko: string } }).whatAreRetainedProfitsDividendsDescription.ko : (translations as { whatAreRetainedProfitsDividendsDescription: { en: string; ko: string } }).whatAreRetainedProfitsDividendsDescription.en}</p>
                      )}
                    </>
                  )}
                  {"dividendTreatmentInHongKongTitle" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { dividendTreatmentInHongKongTitle: { en: string; ko: string } }).dividendTreatmentInHongKongTitle.ko : (translations as { dividendTreatmentInHongKongTitle: { en: string; ko: string } }).dividendTreatmentInHongKongTitle.en}</h3>
                      {"dividendTreatmentInHongKongDescription" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6 whitespace-pre-line">{language === "KOR" ? (translations as { dividendTreatmentInHongKongDescription: { en: string; ko: string } }).dividendTreatmentInHongKongDescription.ko : (translations as { dividendTreatmentInHongKongDescription: { en: string; ko: string } }).dividendTreatmentInHongKongDescription.en}</p>
                      )}
                      {"scopeAndBenefitsOfDigitalTransformationItems" in translations && Array.isArray((translations as { scopeAndBenefitsOfDigitalTransformationItems?: { label: { en: string; ko: string }; description: { en: string; ko: string } }[] }).scopeAndBenefitsOfDigitalTransformationItems) && (
                        <ol className="list-decimal pl-6 sm:pl-8 md:pl-10 mb-4 sm:mb-5 md:mb-6 space-y-3 text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                          {((translations as { scopeAndBenefitsOfDigitalTransformationItems: { label: { en: string; ko: string }; description: { en: string; ko: string } }[] }).scopeAndBenefitsOfDigitalTransformationItems).map((item, i) => (
                            <li key={i} className="pl-2">
                              <span className="font-bold">{language === "KOR" ? item.label.ko : item.label.en}</span>{" "}
                              {language === "KOR" ? item.description.ko : item.description.en}
                            </li>
                          ))}
                        </ol>
                      )}
                    </>
                  )}
                  {"digitalizedApplicationCasesTitle" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { digitalizedApplicationCasesTitle: { en: string; ko: string } }).digitalizedApplicationCasesTitle.ko : (translations as { digitalizedApplicationCasesTitle: { en: string; ko: string } }).digitalizedApplicationCasesTitle.en}</h3>
                      {"digitalizedApplicationCasesIntro" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6 whitespace-pre-line">{language === "KOR" ? (translations as { digitalizedApplicationCasesIntro: { en: string; ko: string } }).digitalizedApplicationCasesIntro.ko : (translations as { digitalizedApplicationCasesIntro: { en: string; ko: string } }).digitalizedApplicationCasesIntro.en}</p>
                      )}
                      {"digitalizedApplicationCasesItems" in translations && Array.isArray((translations as { digitalizedApplicationCasesItems?: { label: { en: string; ko: string }; description: { en: string; ko: string } }[] }).digitalizedApplicationCasesItems) && (
                        <ol className="list-decimal pl-6 sm:pl-8 md:pl-10 mb-4 sm:mb-5 md:mb-6 space-y-3 text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                          {((translations as { digitalizedApplicationCasesItems: { label: { en: string; ko: string }; description: { en: string; ko: string } }[] }).digitalizedApplicationCasesItems).map((item, i) => (
                            <li key={i} className="pl-2">
                              <span className="font-bold">{language === "KOR" ? item.label.ko : item.label.en}</span>{" "}
                              {language === "KOR" ? item.description.ko : item.description.en}
                            </li>
                          ))}
                        </ol>
                      )}
                    </>
                  )}
                  {"modelArticlesSamples" in translations && Array.isArray((translations as { modelArticlesSamples?: { en: string; ko: string }[] }).modelArticlesSamples) && (
                    <>
                      <ul className="list-none pl-6 sm:pl-8 md:pl-10 mb-4 sm:mb-5 md:mb-6 space-y-2 text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                        {((translations as { modelArticlesSamples: { en: string; ko: string }[] }).modelArticlesSamples).map((item, i) => (
                          <li key={i} className="flex align-baseline">
                            <span className="inline-block min-w-0">{language === "KOR" ? item.ko : item.en}</span>
                          </li>
                        ))}
                      </ul>
                      {"modelArticlesConcluding" in translations && (translations as { modelArticlesConcluding?: { en: string; ko: string } }).modelArticlesConcluding && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">
                          {language === "KOR" ? (translations as { modelArticlesConcluding: { en: string; ko: string } }).modelArticlesConcluding.ko : (translations as { modelArticlesConcluding: { en: string; ko: string } }).modelArticlesConcluding.en}
                        </p>
                      )}
                    </>
                  )}
                  {"basicMAProceduresTitle" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { basicMAProceduresTitle: { en: string; ko: string } }).basicMAProceduresTitle.ko : (translations as { basicMAProceduresTitle: { en: string; ko: string } }).basicMAProceduresTitle.en}</h3>
                      {"basicMAProceduresDescription" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">
                          {(language === "KOR" ? (translations as { basicMAProceduresDescription: { en: string; ko: string } }).basicMAProceduresDescription.ko : (translations as { basicMAProceduresDescription: { en: string; ko: string } }).basicMAProceduresDescription.en)
                            .split(/(\(Acquisition\)|\(Merger\)|\(인수\)|\(합병\))/g)
                            .map((segment, i) => /^\((Acquisition|Merger|인수|합병)\)$/.test(segment) ? <span key={i} className="font-bold">{segment}</span> : segment)}
                        </p>
                      )}
                    </>
                  )}
                  {"benefitsOfAutomation" in translations && (
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? translations.benefitsOfAutomation.ko : translations.benefitsOfAutomation.en}</h3>
                  )}
                  {isCorporateSecretary && "whatIsCompanySecretaryParagraph1" in translations ? (
                    <div className="mb-4 sm:mb-5 md:mb-6 space-y-4">
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                        {language === "KOR" ? (translations as { whatIsCompanySecretaryParagraph1: { en: string; ko: string } }).whatIsCompanySecretaryParagraph1.ko : (translations as { whatIsCompanySecretaryParagraph1: { en: string; ko: string } }).whatIsCompanySecretaryParagraph1.en}
                      </p>
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                        {language === "KOR" ? (translations as { whatIsCompanySecretaryParagraph2: { en: string; ko: string } }).whatIsCompanySecretaryParagraph2.ko : (translations as { whatIsCompanySecretaryParagraph2: { en: string; ko: string } }).whatIsCompanySecretaryParagraph2.en}
                      </p>
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                        {language === "KOR" ? (translations as { whatIsCompanySecretaryParagraph3: { en: string; ko: string } }).whatIsCompanySecretaryParagraph3.ko : (translations as { whatIsCompanySecretaryParagraph3: { en: string; ko: string } }).whatIsCompanySecretaryParagraph3.en}
                      </p>
                    </div>
                  ) : (
                    <>
                  {"impactOnInternationalBusinessTitle" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { impactOnInternationalBusinessTitle: { en: string; ko: string } }).impactOnInternationalBusinessTitle.ko : (translations as { impactOnInternationalBusinessTitle: { en: string; ko: string } }).impactOnInternationalBusinessTitle.en}</h3>
                      {"impactOnInternationalBusinessDescription" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { impactOnInternationalBusinessDescription: { en: string; ko: string } }).impactOnInternationalBusinessDescription.ko : (translations as { impactOnInternationalBusinessDescription: { en: string; ko: string } }).impactOnInternationalBusinessDescription.en}</p>
                      )}
                      {"impactOnInternationalBusinessTransition" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { impactOnInternationalBusinessTransition: { en: string; ko: string } }).impactOnInternationalBusinessTransition.ko : (translations as { impactOnInternationalBusinessTransition: { en: string; ko: string } }).impactOnInternationalBusinessTransition.en}</p>
                      )}
                    </>
                  )}
                  {!hasScopeAndBenefitsList && "efficiencyEnhancement" in translations && (
                  <>
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{sectionLabel(0)}{language === "KOR" ? (translations as { efficiencyEnhancement: { en: string; ko: string } }).efficiencyEnhancement.ko : (translations as { efficiencyEnhancement: { en: string; ko: string } }).efficiencyEnhancement.en}</h4>
                  {"boardSupportBullets" in translations && Array.isArray((translations as { boardSupportBullets?: { en: string; ko: string }[] }).boardSupportBullets) ? (
                    ((translations as { boardSupportBullets: { en: string; ko: string }[] }).boardSupportBullets).map((item, idx) => {
                      const text = language === "KOR" ? item.ko : item.en;
                      const colonIndex = text.indexOf(':');
                      const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                      const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1) : text;
                      return (
                        <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4 whitespace-pre-line">
                          <span className="inline-block mr-2">•</span>
                          {colonIndex !== -1 ? (
                            <><span className="font-bold">{boldPart}</span>{restPart}</>
                          ) : (
                            text
                          )}
                        </p>
                      );
                    })
                  ) : (isIntroductionXero || isAiBusinessAutomation || isTaxCorporateTax) && "repetitiveTaskAutomationBullets" in translations ? (
                    (translations as { repetitiveTaskAutomationBullets: { en: string[]; ko: string[] } }).repetitiveTaskAutomationBullets[language === "KOR" ? "ko" : "en"].map((text, idx) => {
                      const colonIndex = text.indexOf(':');
                      const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                      const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1).trimStart() : text;
                      return (
                        <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                          <span className="inline-block mr-2">•</span>
                          {colonIndex !== -1 ? <><span className="font-bold">{boldPart}</span> {restPart}</> : text}
                        </p>
                      );
                    })
                  ) : isAccountingKnowledge && "balanceSheetBullets" in translations ? (
                    (translations as { balanceSheetBullets: { en: string; ko: string }[] }).balanceSheetBullets.map((item, idx) => {
                      const text = language === "KOR" ? item.ko : item.en;
                      const colonIndex = text.indexOf(':');
                      const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                      const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1) : text;
                      return (
                        <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4 whitespace-pre-line">
                          <span className="inline-block mr-2">•</span>
                          {colonIndex !== -1 ? (
                            <><span className="font-bold">{boldPart}</span>{restPart}</>
                          ) : (
                            text
                          )}
                        </p>
                      );
                    })
                  ) : (
                  "repetitiveTaskAutomation" in translations && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4 whitespace-pre-line">
                    {(isConsultingDigitalTransformationUX || isConsultingBigDataDriven) && <span className="inline-block mr-2">•</span>}
                    {(() => {
                      const item = (translations as { repetitiveTaskAutomation: { en: string; ko: string } }).repetitiveTaskAutomation;
                      const text = language === "KOR" ? item.ko : item.en;
                      if (isAmendmentLayout) return text;
                      const colonIndex = text.indexOf(':');
                      if (colonIndex !== -1) {
                        const boldPart = text.substring(0, colonIndex + 1);
                        const restPart = text.substring(colonIndex + 1);
                        return (
                          <>
                            <span className="font-bold">{boldPart}</span>
                            {restPart}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  )
                  )}
                  </>
                  )}
                  {isIncorporation && "choosingCompanyNameGuideLink" in translations && (
                    <p className="text-[14px] text-[#111B12] pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                      <a href="https://www.cr.gov.hk/en/companies_ordinance/docs/Guide_RegCompName-e.pdf" target="_blank" rel="noopener noreferrer" className="text-[#627F38] hover:underline">
                        {language === "KOR" ? (translations as { choosingCompanyNameGuideLink: { en: string; ko: string } }).choosingCompanyNameGuideLink.ko : (translations as { choosingCompanyNameGuideLink: { en: string; ko: string } }).choosingCompanyNameGuideLink.en}
                      </a>
                    </p>
                  )}
                    </>
                  )}
                  {isCorporateSecretary && "keyResponsibilities" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { keyResponsibilities: { en: string; ko: string } }).keyResponsibilities.ko : (translations as { keyResponsibilities: { en: string; ko: string } }).keyResponsibilities.en}</h3>
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">
                        {language === "KOR" ? (translations as { keyResponsibilitiesDescription: { en: string; ko: string } }).keyResponsibilitiesDescription.ko : (translations as { keyResponsibilitiesDescription: { en: string; ko: string } }).keyResponsibilitiesDescription.en}
                      </p>
                      {"legalCompliance" in translations && (
                        <div className="mb-4 sm:mb-5 md:mb-6 pl-4 sm:pl-5 md:pl-6">
                          <h4 className="text-sm sm:text-base md:text-lg lg:text-[24px] xl:text-[24px] font-bold text-[#111B12] mb-3 sm:mb-3.5 md:mb-4">
                            {language === "KOR" ? (translations as { legalCompliance: { en: string; ko: string } }).legalCompliance.ko : (translations as { legalCompliance: { en: string; ko: string } }).legalCompliance.en}
                          </h4>
                          <h5 className="text-sm sm:text-base md:text-lg lg:text-[18px] font-bold text-[#111B12]">
                            {language === "KOR" ? (translations as { annualReturnSubmission: { en: string; ko: string } }).annualReturnSubmission.ko : (translations as { annualReturnSubmission: { en: string; ko: string } }).annualReturnSubmission.en}
                          </h5>
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">
                            {language === "KOR" ? (translations as { annualReturnSubmissionDescription: { en: string; ko: string } }).annualReturnSubmissionDescription.ko : (translations as { annualReturnSubmissionDescription: { en: string; ko: string } }).annualReturnSubmissionDescription.en}
                          </p>
                          <h5 className="text-sm sm:text-base md:text-lg lg:text-[18px] font-bold text-[#111B12]">
                            {language === "KOR" ? (translations as { maintenanceOfStatutoryRegister: { en: string; ko: string } }).maintenanceOfStatutoryRegister.ko : (translations as { maintenanceOfStatutoryRegister: { en: string; ko: string } }).maintenanceOfStatutoryRegister.en}
                          </h5>
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">
                            {language === "KOR" ? (translations as { maintenanceOfStatutoryRegisterDescription: { en: string; ko: string } }).maintenanceOfStatutoryRegisterDescription.ko : (translations as { maintenanceOfStatutoryRegisterDescription: { en: string; ko: string } }).maintenanceOfStatutoryRegisterDescription.en}
                          </p>
                          <h5 className="text-sm sm:text-base md:text-lg lg:text-[18px] font-bold text-[#111B12]">
                            {language === "KOR" ? (translations as { notificationOfCompanyStructureChanges: { en: string; ko: string } }).notificationOfCompanyStructureChanges.ko : (translations as { notificationOfCompanyStructureChanges: { en: string; ko: string } }).notificationOfCompanyStructureChanges.en}
                          </h5>
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                            {language === "KOR" ? (translations as { notificationOfCompanyStructureChangesDescription: { en: string; ko: string } }).notificationOfCompanyStructureChangesDescription.ko : (translations as { notificationOfCompanyStructureChangesDescription: { en: string; ko: string } }).notificationOfCompanyStructureChangesDescription.en}
                          </p>
                        </div>
                      )}
                      {"boardSupport" in translations && (
                        <div className="mb-4 sm:mb-5 md:mb-6 pl-4 sm:pl-5 md:pl-6">
                          <h4 className="text-sm sm:text-base md:text-lg lg:text-[24px] xl:text-[24px] font-bold text-[#111B12] mb-3 sm:mb-3.5 md:mb-4">
                            {language === "KOR" ? (translations as { boardSupport: { en: string; ko: string } }).boardSupport.ko : (translations as { boardSupport: { en: string; ko: string } }).boardSupport.en}
                          </h4>
                          <h5 className="text-sm sm:text-base md:text-lg lg:text-[18px] font-bold text-[#111B12]">
                            {language === "KOR" ? (translations as { supportOfBoardMeetings: { en: string; ko: string } }).supportOfBoardMeetings.ko : (translations as { supportOfBoardMeetings: { en: string; ko: string } }).supportOfBoardMeetings.en}
                          </h5>
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">
                            {language === "KOR" ? (translations as { supportOfBoardMeetingsDescription: { en: string; ko: string } }).supportOfBoardMeetingsDescription.ko : (translations as { supportOfBoardMeetingsDescription: { en: string; ko: string } }).supportOfBoardMeetingsDescription.en}
                          </p>
                          <h5 className="text-sm sm:text-base md:text-lg lg:text-[18px] font-bold text-[#111B12]">
                            {language === "KOR" ? (translations as { preparationAndDistributionOfAgendas: { en: string; ko: string } }).preparationAndDistributionOfAgendas.ko : (translations as { preparationAndDistributionOfAgendas: { en: string; ko: string } }).preparationAndDistributionOfAgendas.en}
                          </h5>
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">
                            {language === "KOR" ? (translations as { preparationAndDistributionOfAgendasDescription: { en: string; ko: string } }).preparationAndDistributionOfAgendasDescription.ko : (translations as { preparationAndDistributionOfAgendasDescription: { en: string; ko: string } }).preparationAndDistributionOfAgendasDescription.en}
                          </p>
                          <h5 className="text-sm sm:text-base md:text-lg lg:text-[18px] font-bold text-[#111B12]">
                            {language === "KOR" ? (translations as { minutesPreparation: { en: string; ko: string } }).minutesPreparation.ko : (translations as { minutesPreparation: { en: string; ko: string } }).minutesPreparation.en}
                          </h5>
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                            {language === "KOR" ? (translations as { minutesPreparationDescription: { en: string; ko: string } }).minutesPreparationDescription.ko : (translations as { minutesPreparationDescription: { en: string; ko: string } }).minutesPreparationDescription.en}
                          </p>
                        </div>
                      )}
                      {"communication" in translations && (
                        <div className="mb-4 sm:mb-5 md:mb-6 pl-4 sm:pl-5 md:pl-6">
                          <h4 className="text-sm sm:text-base md:text-lg lg:text-[24px] xl:text-[24px] font-bold text-[#111B12] mb-3 sm:mb-3.5 md:mb-4">
                            {language === "KOR" ? (translations as { communication: { en: string; ko: string } }).communication.ko : (translations as { communication: { en: string; ko: string } }).communication.en}
                          </h4>
                          <h5 className="text-sm sm:text-base md:text-lg lg:text-[18px] font-bold text-[#111B12]">
                            {language === "KOR" ? (translations as { statutoryDocumentsForShareholders: { en: string; ko: string } }).statutoryDocumentsForShareholders.ko : (translations as { statutoryDocumentsForShareholders: { en: string; ko: string } }).statutoryDocumentsForShareholders.en}
                          </h5>
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">
                            {language === "KOR" ? (translations as { statutoryDocumentsForShareholdersDescription: { en: string; ko: string } }).statutoryDocumentsForShareholdersDescription.ko : (translations as { statutoryDocumentsForShareholdersDescription: { en: string; ko: string } }).statutoryDocumentsForShareholdersDescription.en}
                          </p>
                          <h5 className="text-sm sm:text-base md:text-lg lg:text-[18px] font-bold text-[#111B12]">
                            {language === "KOR" ? (translations as { regulatoryAuthoritiesAdministrativeCommunication: { en: string; ko: string } }).regulatoryAuthoritiesAdministrativeCommunication.ko : (translations as { regulatoryAuthoritiesAdministrativeCommunication: { en: string; ko: string } }).regulatoryAuthoritiesAdministrativeCommunication.en}
                          </h5>
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                            {language === "KOR" ? (translations as { regulatoryAuthoritiesAdministrativeCommunicationDescription: { en: string; ko: string } }).regulatoryAuthoritiesAdministrativeCommunicationDescription.ko : (translations as { regulatoryAuthoritiesAdministrativeCommunicationDescription: { en: string; ko: string } }).regulatoryAuthoritiesAdministrativeCommunicationDescription.en}
                          </p>
                        </div>
                      )}
                      {"benefitsAndLimitationsTitle" in translations && (
                        <>
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">
                            {language === "KOR" ? (translations as { benefitsAndLimitationsTitle: { en: string; ko: string } }).benefitsAndLimitationsTitle.ko : (translations as { benefitsAndLimitationsTitle: { en: string; ko: string } }).benefitsAndLimitationsTitle.en}
                          </h3>
                          {"benefitsAndLimitationsParagraph1" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">
                              {language === "KOR" ? (translations as { benefitsAndLimitationsParagraph1: { en: string; ko: string } }).benefitsAndLimitationsParagraph1.ko : (translations as { benefitsAndLimitationsParagraph1: { en: string; ko: string } }).benefitsAndLimitationsParagraph1.en}
                            </p>
                          )}
                          {"benefitsAndLimitationsParagraph2" in translations && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">
                              {language === "KOR" ? (translations as { benefitsAndLimitationsParagraph2: { en: string; ko: string } }).benefitsAndLimitationsParagraph2.ko : (translations as { benefitsAndLimitationsParagraph2: { en: string; ko: string } }).benefitsAndLimitationsParagraph2.en}
                            </p>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {!isCorporateSecretary && (
                    <>
                  {!isAmendmentLayout && "increasedProcessingSpeed" in translations && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                    <span className="inline-block mr-2">•</span>
                    {(() => {
                        const item = (translations as unknown as { increasedProcessingSpeed?: { en: string; ko: string } }).increasedProcessingSpeed;
                        const text = item ? (language === "KOR" ? item.ko : item.en) : "";
                      const colonIndex = text.indexOf(':');
                      if (colonIndex !== -1) {
                        const boldPart = text.substring(0, colonIndex + 1);
                        const restPart = text.substring(colonIndex + 1);
                        return (
                          <>
                            <span className="font-bold">{boldPart}</span>
                            {restPart}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  )}
                  {!hasScopeAndBenefitsList && "improvedAccuracy" in translations && (
                  <>
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{sectionLabel(1)}{language === "KOR" ? (translations as { improvedAccuracy: { en: string; ko: string } }).improvedAccuracy.ko : (translations as { improvedAccuracy: { en: string; ko: string } }).improvedAccuracy.en}</h4>
                  {"dataDrivenDecisionMakingBullets" in translations && Array.isArray((translations as { dataDrivenDecisionMakingBullets?: { en: string; ko: string }[] }).dataDrivenDecisionMakingBullets) ? (
                    ((translations as { dataDrivenDecisionMakingBullets: { en: string; ko: string }[] }).dataDrivenDecisionMakingBullets).map((item, idx) => {
                      const text = language === "KOR" ? item.ko : item.en;
                      const colonIndex = text.indexOf(':');
                      const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                      const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1) : text;
                      return (
                        <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4 whitespace-pre-line">
                          <span className="inline-block mr-2">•</span>
                          {colonIndex !== -1 ? (
                            <><span className="font-bold">{boldPart}</span>{restPart}</>
                          ) : (
                            text
                          )}
                        </p>
                      );
                    })
                  ) : (isIntroductionXero || isAiBusinessAutomation || isTaxCorporateTax) && "errorReductionBullets" in translations ? (
                    <>
                      {(translations as { errorReductionBullets: { en: string[]; ko: string[] } }).errorReductionBullets[language === "KOR" ? "ko" : "en"].map((text, idx) => {
                        const colonIndex = text.indexOf(':');
                        const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                        const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1).trimStart() : text;
                        return (
                          <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                            <span className="inline-block mr-2">•</span>
                            {colonIndex !== -1 ? <><span className="font-bold">{boldPart}</span> {restPart}</> : text}
                          </p>
                        );
                      })}
                      {isAiBusinessAutomation && "realTimeMonitoring" in translations && (() => {
                        const text = language === "KOR" ? (translations as { realTimeMonitoring: { en: string; ko: string } }).realTimeMonitoring.ko : (translations as { realTimeMonitoring: { en: string; ko: string } }).realTimeMonitoring.en;
                        const colonIndex = text.indexOf(':');
                        const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                        const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1).trimStart() : text;
                        return (
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                            <span className="inline-block mr-2">•</span>
                            {colonIndex !== -1 ? <><span className="font-bold">{boldPart}</span> {restPart}</> : text}
                          </p>
                        );
                      })()}
                    </>
                  ) : isAccountingKnowledge && "incomeStatementBullets" in translations ? (
                    (translations as { incomeStatementBullets: { en: string; ko: string }[] }).incomeStatementBullets.map((item, idx) => {
                      const text = language === "KOR" ? item.ko : item.en;
                      const colonIndex = text.indexOf(':');
                      const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                      const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1) : text;
                      return (
                        <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4 whitespace-pre-line">
                          <span className="inline-block mr-2">•</span>
                          {colonIndex !== -1 ? (
                            <><span className="font-bold">{boldPart}</span>{restPart}</>
                          ) : (
                            text
                          )}
                        </p>
                      );
                    })
                  ) : (
                  <>
                  {!isAmendmentLayout && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                    {(isConsultingDigitalTransformationUX || isConsultingBigDataDriven) && <span className="inline-block mr-2">•</span>}
                    {(() => {
                        const item = (translations as unknown as { errorReduction?: { en: string; ko: string } }).errorReduction;
                        const text = item ? (language === "KOR" ? item.ko : item.en) : "";
                      if (isTaxDividendLegalConsiderations || isTaxVat || isConsultingDigitalTransformation || isConsultingDigitalTransformationTVP) return text;
                      if (isConsultingLegalConsiderationsMA && text) {
                        return text.split(/(Non-Disclosure Agreement \(NDA\)|비밀 유지 계약\(NDA\))/g).map((segment, i) => /^(Non-Disclosure Agreement \(NDA\)|비밀 유지 계약\(NDA\))$/.test(segment) ? <span key={i} className="font-bold">{segment}</span> : segment);
                      }
                      const colonIndex = text.indexOf(':');
                      if (colonIndex !== -1) {
                        const boldPart = text.substring(0, colonIndex + 1);
                        const restPart = text.substring(colonIndex + 1);
                        return (
                          <>
                            <span className="font-bold">{boldPart}</span>
                            {restPart}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  )}
                  {"realTimeMonitoring" in translations && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                    {!isAmendmentLayout && <span className="inline-block mr-2">•</span>}
                    {(() => {
                      const text = language === "KOR" ? translations.realTimeMonitoring.ko : translations.realTimeMonitoring.en;
                      const colonIndex = text.indexOf(':');
                      if (colonIndex !== -1) {
                        const boldPart = text.substring(0, colonIndex + 1);
                        const restPart = text.substring(colonIndex + 1);
                        return (
                          <>
                            <span className="font-bold">{boldPart}</span>
                            {restPart}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  )}
                  </>
                  )}
                    </>
                  )}
                  </>
                  )}
                  {(isAmendment || isIncorporation || isHrTerminationRegulation) && "directorRelatedMatters" in translations && (translations as { directorRelatedMatters?: { en: string; ko: string }; directorRelatedMattersItems?: { en: string; ko: string }[] }).directorRelatedMatters && (
                    <>
                      <h4 className="text-base sm:text-lg md:text-xl lg:text-[20px] font-bold text-[#111B12] pl-8 sm:pl-10 md:pl-12 lg:pl-14 mb-3 sm:mb-3.5 md:mb-4">
                        {language === "KOR" ? (translations as { directorRelatedMatters: { en: string; ko: string } }).directorRelatedMatters.ko : (translations as { directorRelatedMatters: { en: string; ko: string } }).directorRelatedMatters.en}
                      </h4>
                      {"directorRelatedMattersDescription" in translations && (translations as { directorRelatedMattersDescription?: { en: string; ko: string } }).directorRelatedMattersDescription && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-10 sm:pl-12 md:pl-14 lg:pl-16 mb-4 sm:mb-5 md:mb-6 whitespace-pre-line">
                          {language === "KOR" ? (translations as { directorRelatedMattersDescription: { en: string; ko: string } }).directorRelatedMattersDescription.ko : (translations as { directorRelatedMattersDescription: { en: string; ko: string } }).directorRelatedMattersDescription.en}
                        </p>
                      )}
                      {!("directorRelatedMattersDescription" in translations) && "directorRelatedMattersItems" in translations && Array.isArray((translations as { directorRelatedMattersItems?: { en: string; ko: string }[] }).directorRelatedMattersItems) && ((translations as { directorRelatedMattersItems: { en: string; ko: string }[] }).directorRelatedMattersItems.length > 0) && (
                        <ul className="list-none pl-10 sm:pl-12 md:pl-14 lg:pl-16 mb-4 sm:mb-5 md:mb-6 space-y-2 text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                          {((translations as { directorRelatedMattersItems: { en: string; ko: string }[] }).directorRelatedMattersItems).map((item, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="inline-block flex-shrink-0">•</span>
                              <span>{language === "KOR" ? item.ko : item.en}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {(isAmendment || isIncorporation || isHrTerminationRegulation) && "shareholderRelatedMatters" in translations && (translations as { shareholderRelatedMatters?: { en: string; ko: string }; shareholderRelatedMattersItems?: { en: string; ko: string }[] }).shareholderRelatedMatters && (
                        <>
                          <h4 className="text-base sm:text-lg md:text-xl lg:text-[20px] font-bold text-[#111B12] pl-8 sm:pl-10 md:pl-12 lg:pl-14 mb-3 sm:mb-3.5 md:mb-4">
                            {language === "KOR" ? (translations as { shareholderRelatedMatters: { en: string; ko: string } }).shareholderRelatedMatters.ko : (translations as { shareholderRelatedMatters: { en: string; ko: string } }).shareholderRelatedMatters.en}
                          </h4>
                          {"shareholderRelatedMattersDescription" in translations && (translations as { shareholderRelatedMattersDescription?: { en: string; ko: string } }).shareholderRelatedMattersDescription && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-10 sm:pl-12 md:pl-14 lg:pl-16 mb-4 sm:mb-5 md:mb-6">
                              {language === "KOR" ? (translations as { shareholderRelatedMattersDescription: { en: string; ko: string } }).shareholderRelatedMattersDescription.ko : (translations as { shareholderRelatedMattersDescription: { en: string; ko: string } }).shareholderRelatedMattersDescription.en}
                            </p>
                          )}
                          {!("shareholderRelatedMattersDescription" in translations) && "shareholderRelatedMattersItems" in translations && Array.isArray((translations as { shareholderRelatedMattersItems?: { en: string; ko: string }[] }).shareholderRelatedMattersItems) && ((translations as { shareholderRelatedMattersItems: { en: string; ko: string }[] }).shareholderRelatedMattersItems.length > 0) && (
                            <ul className="list-none pl-10 sm:pl-12 md:pl-14 lg:pl-16 mb-4 sm:mb-5 md:mb-6 space-y-2 text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                              {((translations as { shareholderRelatedMattersItems: { en: string; ko: string }[] }).shareholderRelatedMattersItems).map((item, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="inline-block flex-shrink-0">•</span>
                                  <span>{language === "KOR" ? item.ko : item.en}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      )}
                      {(isAmendment || isIncorporation || isHrTerminationRegulation) && "shareAndDividendRelatedMatters" in translations && (translations as { shareAndDividendRelatedMatters?: { en: string; ko: string }; shareAndDividendRelatedMattersItems?: { en: string; ko: string }[] }).shareAndDividendRelatedMatters && (
                        <>
                          <h4 className="text-base sm:text-lg md:text-xl lg:text-[20px] font-bold text-[#111B12] pl-8 sm:pl-10 md:pl-12 lg:pl-14 mb-3 sm:mb-3.5 md:mb-4">
                            {language === "KOR" ? (translations as { shareAndDividendRelatedMatters: { en: string; ko: string } }).shareAndDividendRelatedMatters.ko : (translations as { shareAndDividendRelatedMatters: { en: string; ko: string } }).shareAndDividendRelatedMatters.en}
                          </h4>
                          {"shareAndDividendRelatedMattersDescription" in translations && (translations as { shareAndDividendRelatedMattersDescription?: { en: string; ko: string } }).shareAndDividendRelatedMattersDescription && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-10 sm:pl-12 md:pl-14 lg:pl-16 mb-4 sm:mb-5 md:mb-6">
                              {language === "KOR" ? (translations as { shareAndDividendRelatedMattersDescription: { en: string; ko: string } }).shareAndDividendRelatedMattersDescription.ko : (translations as { shareAndDividendRelatedMattersDescription: { en: string; ko: string } }).shareAndDividendRelatedMattersDescription.en}
                            </p>
                          )}
                          {"companySecretaryLicenseComment" in translations && (translations as { companySecretaryLicenseComment?: { en: string; ko: string } }).companySecretaryLicenseComment && (
                            <p className="text-[14px] text-[#111B12] leading-relaxed text-justify pl-10 sm:pl-12 md:pl-14 lg:pl-16 mb-4 sm:mb-5 md:mb-6">
                              {language === "KOR" ? (translations as { companySecretaryLicenseComment: { en: string; ko: string } }).companySecretaryLicenseComment.ko : (translations as { companySecretaryLicenseComment: { en: string; ko: string } }).companySecretaryLicenseComment.en}
                            </p>
                          )}
                          {!("shareAndDividendRelatedMattersDescription" in translations) && "shareAndDividendRelatedMattersItems" in translations && Array.isArray((translations as { shareAndDividendRelatedMattersItems?: { en: string; ko: string }[] }).shareAndDividendRelatedMattersItems) && ((translations as { shareAndDividendRelatedMattersItems: { en: string; ko: string }[] }).shareAndDividendRelatedMattersItems.length > 0) && (
                            <ul className="list-none pl-10 sm:pl-12 md:pl-14 lg:pl-16 mb-4 sm:mb-5 md:mb-6 space-y-2 text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                              {((translations as { shareAndDividendRelatedMattersItems: { en: string; ko: string }[] }).shareAndDividendRelatedMattersItems).map((item, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="inline-block flex-shrink-0">•</span>
                                  <span>{language === "KOR" ? item.ko : item.en}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      )}
                      {(isAmendment || isIncorporation || isHrTerminationRegulation) && "otherMatters" in translations && (translations as { otherMatters?: { en: string; ko: string }; otherMattersItems?: { en: string; ko: string }[] }).otherMatters && (
                        <>
                          <h4 className="text-base sm:text-lg md:text-xl lg:text-[20px] font-bold text-[#111B12] pl-8 sm:pl-10 md:pl-12 lg:pl-14 mb-3 sm:mb-3.5 md:mb-4">
                            {language === "KOR" ? (translations as { otherMatters: { en: string; ko: string } }).otherMatters.ko : (translations as { otherMatters: { en: string; ko: string } }).otherMatters.en}
                          </h4>
                          {"otherMattersDescription" in translations && (translations as { otherMattersDescription?: { en: string; ko: string } }).otherMattersDescription && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-10 sm:pl-12 md:pl-14 lg:pl-16 mb-4 sm:mb-5 md:mb-6 whitespace-pre-line">
                              {language === "KOR" ? (translations as { otherMattersDescription: { en: string; ko: string } }).otherMattersDescription.ko : (translations as { otherMattersDescription: { en: string; ko: string } }).otherMattersDescription.en}
                            </p>
                          )}
                          {!("otherMattersDescription" in translations) && "otherMattersItems" in translations && Array.isArray((translations as { otherMattersItems?: { en: string; ko: string }[] }).otherMattersItems) && ((translations as { otherMattersItems: { en: string; ko: string }[] }).otherMattersItems.length > 0) && (
                            <ul className="list-none pl-10 sm:pl-12 md:pl-14 lg:pl-16 mb-4 sm:mb-5 md:mb-6 space-y-2 text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                              {((translations as { otherMattersItems: { en: string; ko: string }[] }).otherMattersItems).map((item, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="inline-block flex-shrink-0">•</span>
                                  <span>{language === "KOR" ? item.ko : item.en}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      )}
                      {"companyObjectsAndBusinessDefinition" in translations && (translations as { companyObjectsAndBusinessDefinition?: { en: string; ko: string } }).companyObjectsAndBusinessDefinition && (
                        <>
                          <h4 className="text-base sm:text-lg md:text-xl lg:text-[20px] font-bold text-[#111B12] pl-8 sm:pl-10 md:pl-12 lg:pl-14 mb-3 sm:mb-3.5 md:mb-4">
                            {language === "KOR" ? (translations as { companyObjectsAndBusinessDefinition: { en: string; ko: string } }).companyObjectsAndBusinessDefinition.ko : (translations as { companyObjectsAndBusinessDefinition: { en: string; ko: string } }).companyObjectsAndBusinessDefinition.en}
                          </h4>
                          {"companyObjectsAndBusinessDefinitionDescription" in translations && (translations as { companyObjectsAndBusinessDefinitionDescription?: { en: string; ko: string } }).companyObjectsAndBusinessDefinitionDescription && (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-10 sm:pl-12 md:pl-14 lg:pl-16 mb-4">
                              {language === "KOR" ? (translations as { companyObjectsAndBusinessDefinitionDescription: { en: string; ko: string } }).companyObjectsAndBusinessDefinitionDescription.ko : (translations as { companyObjectsAndBusinessDefinitionDescription: { en: string; ko: string } }).companyObjectsAndBusinessDefinitionDescription.en}
                            </p>
                          )}
                          {"companyObjectsAndBusinessDefinitionLink" in translations && (translations as { companyObjectsAndBusinessDefinitionLink?: { en: string; ko: string } }).companyObjectsAndBusinessDefinitionLink && (
                            <p className="text-[14px] text-[#111B12] pl-10 sm:pl-12 md:pl-14 lg:pl-16 mb-4 sm:mb-5 md:mb-6">
                              <a href="https://www.censtatd.gov.hk/en/index_hsic2_code.html" target="_blank" rel="noopener noreferrer" className="text-[#627F38] hover:underline">
                                {language === "KOR" ? (translations as { companyObjectsAndBusinessDefinitionLink: { en: string; ko: string } }).companyObjectsAndBusinessDefinitionLink.ko : (translations as { companyObjectsAndBusinessDefinitionLink: { en: string; ko: string } }).companyObjectsAndBusinessDefinitionLink.en}
                              </a>
                            </p>
                          )}
                          {"companyArticlesOfAssociation" in translations && (translations as { companyArticlesOfAssociation?: { en: string; ko: string } }).companyArticlesOfAssociation && (
                            <>
                              <h4 className="text-base sm:text-lg md:text-xl lg:text-[20px] font-bold text-[#111B12] pl-8 sm:pl-10 md:pl-12 lg:pl-14 mb-3 sm:mb-3.5 md:mb-4">
                                {language === "KOR" ? (translations as { companyArticlesOfAssociation: { en: string; ko: string } }).companyArticlesOfAssociation.ko : (translations as { companyArticlesOfAssociation: { en: string; ko: string } }).companyArticlesOfAssociation.en}
                              </h4>
                              {"companyArticlesOfAssociationDescription" in translations && (translations as { companyArticlesOfAssociationDescription?: { en: string; ko: string } }).companyArticlesOfAssociationDescription && (
                                <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-10 sm:pl-12 md:pl-14 lg:pl-16 mb-4">
                                  {language === "KOR" ? (translations as { companyArticlesOfAssociationDescription: { en: string; ko: string } }).companyArticlesOfAssociationDescription.ko : (translations as { companyArticlesOfAssociationDescription: { en: string; ko: string } }).companyArticlesOfAssociationDescription.en}
                                </p>
                              )}
                              {"companyArticlesOfAssociationLink" in translations && (translations as { companyArticlesOfAssociationLink?: { en: string; ko: string } }).companyArticlesOfAssociationLink && (
                                <p className="text-[14px] text-[#111B12] pl-10 sm:pl-12 md:pl-14 lg:pl-16 mb-4">
                                  <Link href="/insights/corporate-service/amendment" className="text-[#627F38] hover:underline">
                                    {language === "KOR" ? (translations as { companyArticlesOfAssociationLink: { en: string; ko: string } }).companyArticlesOfAssociationLink.ko : (translations as { companyArticlesOfAssociationLink: { en: string; ko: string } }).companyArticlesOfAssociationLink.en}
                                  </Link>
                                </p>
                              )}
                            </>
                          )}
                          {"preparingSubmissionDocuments" in translations && (translations as { preparingSubmissionDocuments?: { en: string; ko: string } }).preparingSubmissionDocuments && (
                            <>
                              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">
                                {language === "KOR" ? (translations as { preparingSubmissionDocuments: { en: string; ko: string } }).preparingSubmissionDocuments.ko : (translations as { preparingSubmissionDocuments: { en: string; ko: string } }).preparingSubmissionDocuments.en}
                              </h3>
                              {"preparingSubmissionDocumentsDescription" in translations && (translations as { preparingSubmissionDocumentsDescription?: { en: string; ko: string } }).preparingSubmissionDocumentsDescription && (
                                <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-10 sm:pl-12 md:pl-14 lg:pl-16 mb-3 sm:mb-3.5 md:mb-4">
                                  {language === "KOR" ? (translations as { preparingSubmissionDocumentsDescription: { en: string; ko: string } }).preparingSubmissionDocumentsDescription.ko : (translations as { preparingSubmissionDocumentsDescription: { en: string; ko: string } }).preparingSubmissionDocumentsDescription.en}
                                </p>
                              )}
                              {"preparingSubmissionDocumentsItems" in translations && Array.isArray((translations as { preparingSubmissionDocumentsItems?: { en: string; ko: string }[] }).preparingSubmissionDocumentsItems) && ((translations as { preparingSubmissionDocumentsItems: { en: string; ko: string }[] }).preparingSubmissionDocumentsItems.length > 0) && (
                                <ol className="list-decimal pl-14 sm:pl-16 md:pl-20 lg:pl-24 mb-4 sm:mb-5 md:mb-6 space-y-2 text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                                  {((translations as { preparingSubmissionDocumentsItems: { en: string; ko: string }[] }).preparingSubmissionDocumentsItems).map((item, i) => (
                                    <li key={i} className="pl-3">{language === "KOR" ? item.ko : item.en}</li>
                                  ))}
                                </ol>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {!hasScopeAndBenefitsList && !isAmendmentLayout && ("costReduction" in translations || "collaborationToolsBullets" in translations || "laborCostSavings" in translations || (isAccountingKnowledge && "cashFlowStatementBullets" in translations)) && (
                    <>
                      <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{sectionLabel(2)}{"costReduction" in translations ? (language === "KOR" ? (translations as { costReduction: { en: string; ko: string } }).costReduction.ko : (translations as { costReduction: { en: string; ko: string } }).costReduction.en) : ""}</h4>
                  {"collaborationToolsBullets" in translations && Array.isArray((translations as { collaborationToolsBullets?: { en: string; ko: string }[] }).collaborationToolsBullets) ? (
                    ((translations as { collaborationToolsBullets: { en: string; ko: string }[] }).collaborationToolsBullets).map((item, idx) => {
                      const text = language === "KOR" ? item.ko : item.en;
                      const colonIndex = text.indexOf(':');
                      const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                      const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1) : text;
                      return (
                        <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4 whitespace-pre-line">
                          <span className="inline-block mr-2">•</span>
                          {colonIndex !== -1 ? (
                            <><span className="font-bold">{boldPart}</span>{restPart}</>
                          ) : (
                            text
                          )}
                        </p>
                      );
                    })
                  ) : (isIntroductionXero || isAiBusinessAutomation || isTaxCorporateTax) && "laborCostSavingsBullets" in translations ? (
                    <>
                      {(translations as { laborCostSavingsBullets: { en: string[]; ko: string[] } }).laborCostSavingsBullets[language === "KOR" ? "ko" : "en"].map((text, idx) => {
                        const colonIndex = text.indexOf(':');
                        const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                        const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1).trimStart() : text;
                        return (
                          <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                            <span className="inline-block mr-2">•</span>
                            {colonIndex !== -1 ? <><span className="font-bold">{boldPart}</span> {restPart}</> : text}
                          </p>
                        );
                      })}
                      {isAiBusinessAutomation && "operationalCostSavings" in translations && (() => {
                        const text = language === "KOR" ? (translations as { operationalCostSavings: { en: string; ko: string } }).operationalCostSavings.ko : (translations as { operationalCostSavings: { en: string; ko: string } }).operationalCostSavings.en;
                        const colonIndex = text.indexOf(':');
                        const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                        const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1).trimStart() : text;
                        return (
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                            <span className="inline-block mr-2">•</span>
                            {colonIndex !== -1 ? <><span className="font-bold">{boldPart}</span> {restPart}</> : text}
                          </p>
                        );
                      })()}
                    </>
                  ) : isAccountingKnowledge && "cashFlowStatementBullets" in translations ? (
                    (translations as { cashFlowStatementBullets: { en: string; ko: string }[] }).cashFlowStatementBullets.map((item, idx) => {
                      const text = language === "KOR" ? item.ko : item.en;
                      const colonIndex = text.indexOf(':');
                      const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                      const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1) : text;
                      return (
                        <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4 whitespace-pre-line">
                          <span className="inline-block mr-2">•</span>
                          {colonIndex !== -1 ? (
                            <><span className="font-bold">{boldPart}</span>{restPart}</>
                          ) : (
                            text
                          )}
                        </p>
                      );
                    })
                  ) : (
                  <>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                    {(isConsultingDigitalTransformationUX || isConsultingBigDataDriven) && <span className="inline-block mr-2">•</span>}
                    {(() => {
                          const item = (translations as { laborCostSavings?: { en: string; ko: string } }).laborCostSavings;
                          const text = item ? (language === "KOR" ? item.ko : item.en) : "";
                      const colonIndex = text.indexOf(':');
                      if (colonIndex !== -1) {
                        const boldPart = text.substring(0, colonIndex + 1);
                        const restPart = text.substring(colonIndex + 1);
                        return (
                          <>
                            <span className="font-bold">{boldPart}</span>
                            {restPart}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  {"operationalCostSavings" in translations && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">
                    <span className="inline-block mr-2">•</span>
                    {(() => {
                          const item = (translations as { operationalCostSavings?: { en: string; ko: string } }).operationalCostSavings;
                          const text = item ? (language === "KOR" ? item.ko : item.en) : "";
                      const colonIndex = text.indexOf(':');
                      if (colonIndex !== -1) {
                        const boldPart = text.substring(0, colonIndex + 1);
                        const restPart = text.substring(colonIndex + 1);
                        return (
                          <>
                            <span className="font-bold">{boldPart}</span>
                            {restPart}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  )}
                  </>
                  )}
                  {"multiUserSupport" in translations && (
                    <>
                      <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{sectionLabel(3)}{language === "KOR" ? (translations as { multiUserSupport: { en: string; ko: string } }).multiUserSupport.ko : (translations as { multiUserSupport: { en: string; ko: string } }).multiUserSupport.en}</h4>
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">
                        {!isConsultingLegalConsiderationsMA && <span className="inline-block mr-2">•</span>}
                        {isTaxCorporateTax && (() => { const t = language === "KOR" ? (translations as { multiUserSupportDescription: { en: string; ko: string } }).multiUserSupportDescription.ko : (translations as { multiUserSupportDescription: { en: string; ko: string } }).multiUserSupportDescription.en; const i = t.indexOf(":"); return i !== -1 ? <><span className="font-bold">{t.slice(0, i + 1)}</span>{t.slice(i + 1)}</> : t; })()}{!isTaxCorporateTax && (() => {
                          const desc = language === "KOR" ? (translations as { multiUserSupportDescription: { en: string; ko: string } }).multiUserSupportDescription.ko : (translations as { multiUserSupportDescription: { en: string; ko: string } }).multiUserSupportDescription.en;
                          if (isConsultingLegalConsiderationsMA && "multiUserSupportDescriptionBoldPart" in translations) {
                            const bold = language === "KOR" ? (translations as { multiUserSupportDescriptionBoldPart: { en: string; ko: string } }).multiUserSupportDescriptionBoldPart.ko : (translations as { multiUserSupportDescriptionBoldPart: { en: string; ko: string } }).multiUserSupportDescriptionBoldPart.en;
                            const idx = desc.indexOf(bold);
                            if (idx !== -1) return <>{desc.slice(0, idx)}<span className="font-bold">{bold}</span>{desc.slice(idx + bold.length)}</>;
                          }
                          return desc;
                        })()}
                      </p>
                    </>
                  )}
                  {"continuousUpdates" in translations && (
                    <>
                      <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{sectionLabel(4)}{language === "KOR" ? (translations as { continuousUpdates: { en: string; ko: string } }).continuousUpdates.ko : (translations as { continuousUpdates: { en: string; ko: string } }).continuousUpdates.en}</h4>
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">
                        {!isConsultingLegalConsiderationsMA && <span className="inline-block mr-2">•</span>}
                        {isTaxCorporateTax && (() => { const t = language === "KOR" ? (translations as { continuousUpdatesDescription: { en: string; ko: string } }).continuousUpdatesDescription.ko : (translations as { continuousUpdatesDescription: { en: string; ko: string } }).continuousUpdatesDescription.en; const i = t.indexOf(":"); return i !== -1 ? <><span className="font-bold">{t.slice(0, i + 1)}</span>{t.slice(i + 1)}</> : t; })()}{!isTaxCorporateTax && (language === "KOR" ? (translations as { continuousUpdatesDescription: { en: string; ko: string } }).continuousUpdatesDescription.ko : (translations as { continuousUpdatesDescription: { en: string; ko: string } }).continuousUpdatesDescription.en)}
                      </p>
                    </>
                  )}
                  {"maCompletionAndIntegrationTitle" in translations && (
                    <>
                      <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{sectionLabel(5)}{language === "KOR" ? (translations as { maCompletionAndIntegrationTitle: { en: string; ko: string } }).maCompletionAndIntegrationTitle.ko : (translations as { maCompletionAndIntegrationTitle: { en: string; ko: string } }).maCompletionAndIntegrationTitle.en}</h4>
                      {"maCompletionAndIntegrationDescription" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">
                          {language === "KOR" ? (translations as { maCompletionAndIntegrationDescription: { en: string; ko: string } }).maCompletionAndIntegrationDescription.ko : (translations as { maCompletionAndIntegrationDescription: { en: string; ko: string } }).maCompletionAndIntegrationDescription.en}
                        </p>
                      )}
                    </>
                  )}
                    </>
                  )}
                  {!isAmendmentLayout ? (
                    <>
                  {isAccountingKnowledge && "understandingFinancialStatementsIntro" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? translations.aiTaskAutomation.ko : translations.aiTaskAutomation.en}</h3>
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { understandingFinancialStatementsIntro: { en: string; ko: string } }).understandingFinancialStatementsIntro.ko : (translations as { understandingFinancialStatementsIntro: { en: string; ko: string } }).understandingFinancialStatementsIntro.en}</p>
                    </>
                  )}
                  {"realWorldCases" in translations && (
                  <>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { realWorldCases: { en: string; ko: string } }).realWorldCases.ko : (translations as { realWorldCases: { en: string; ko: string } }).realWorldCases.en}</h3>
                  {!isAccountingKnowledge && !isConsultingDigitalTransformationUX && "realWorldCasesDescription" in translations && <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? translations.realWorldCasesDescription.ko : translations.realWorldCasesDescription.en}</p>}
                  </>
                  )}
                  {isAccountingKnowledge && "importanceOfAnalysisBullets" in translations ? (
                    <>
                      {(translations as { importanceOfAnalysisBullets: { en: string; ko: string }[] }).importanceOfAnalysisBullets.map((item, idx) => {
                        const text = language === "KOR" ? item.ko : item.en;
                        const colonIndex = text.indexOf(':');
                        const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                        const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1).trimStart() : text;
                        const secondColonIndex = restPart.indexOf(':');
                        const subBoldPart = secondColonIndex !== -1 ? restPart.substring(0, secondColonIndex + 1) : "";
                        const subRestPart = secondColonIndex !== -1 ? restPart.substring(secondColonIndex + 1) : restPart;
                        return (
                          <div key={idx} className="mb-4 sm:mb-5 md:mb-6">
                            <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{idx + 1}. {colonIndex !== -1 ? boldPart.replace(':','').trim() : ""}</h4>
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 whitespace-pre-line">
                              {secondColonIndex !== -1 ? (
                                <><span className="inline-block mr-2">•</span><span className="font-bold">{subBoldPart}</span>{subRestPart}</>
                              ) : (
                                colonIndex !== -1 ? restPart : text
                              )}
                            </p>
                          </div>
                        );
                      })}
                      {"analysisTechniquesSections" in translations && (
                        <>
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { financialStatementAnalysisTechniquesTitle: { en: string; ko: string } }).financialStatementAnalysisTechniquesTitle.ko : (translations as { financialStatementAnalysisTechniquesTitle: { en: string; ko: string } }).financialStatementAnalysisTechniquesTitle.en}</h3>
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { financialStatementAnalysisTechniquesIntro: { en: string; ko: string } }).financialStatementAnalysisTechniquesIntro.ko : (translations as { financialStatementAnalysisTechniquesIntro: { en: string; ko: string } }).financialStatementAnalysisTechniquesIntro.en}</p>
                          {((translations as { analysisTechniquesSections: { sectionTitle: { en: string; ko: string }; bullets: { en: string; ko: string }[] }[] }).analysisTechniquesSections).map((section, sIdx) => (
                            <div key={sIdx} className="mb-4 sm:mb-5 md:mb-6">
                              <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{sIdx + 1}. {language === "KOR" ? section.sectionTitle.ko : section.sectionTitle.en}</h4>
                              <ul className="list-none pl-8 sm:pl-10 md:pl-12 space-y-2">
                                {section.bullets.map((bullet, bIdx) => {
                                  const text = language === "KOR" ? bullet.ko : bullet.en;
                                  const colonIndex = text.indexOf(':');
                                  const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                                  const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1) : text;
                                  return (
                                    <li key={bIdx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                                      <span className="inline-block mr-2">•</span>
                                      {colonIndex !== -1 ? <><span className="font-bold">{boldPart}</span>{restPart}</> : text}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  ) : (
                  <>
                  {((() => {
                    const cs = (translations as { customerService?: { en: string; ko: string } }).customerService;
                    const ci = (translations as { chatbotImplementation?: { en: string; ko: string } }).chatbotImplementation;
                    const hasCustomerService = "customerService" in translations && (cs?.en || cs?.ko);
                    const hasChatbotImpl = "chatbotImplementation" in translations && (ci?.en || ci?.ko);
                    return hasCustomerService || hasChatbotImpl;
                  })()) && (
                  <>
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{sectionLabel(0)}{"customerService" in translations ? (language === "KOR" ? (translations as { customerService: { en: string; ko: string } }).customerService.ko : (translations as { customerService: { en: string; ko: string } }).customerService.en) : ""}</h4>
                  {"manufacturingBullets" in translations && Array.isArray((translations as { manufacturingBullets?: { en: string; ko: string }[] }).manufacturingBullets) ? (
                    ((translations as { manufacturingBullets: { en: string; ko: string }[] }).manufacturingBullets).map((item, idx) => {
                      const text = language === "KOR" ? item.ko : item.en;
                      const colonIndex = text.indexOf(':');
                      const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                      const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1) : text;
                      return (
                        <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4 whitespace-pre-line">
                          <span className="inline-block mr-2">•</span>
                          {colonIndex !== -1 ? (
                            <><span className="font-bold">{boldPart}</span>{restPart}</>
                          ) : (
                            text
                          )}
                        </p>
                      );
                    })
                  ) : (isIntroductionXero || isAiBusinessAutomation) && "chatbotImplementationBullets" in translations ? (
                    (translations as { chatbotImplementationBullets: { en: string[]; ko: string[] } }).chatbotImplementationBullets[language === "KOR" ? "ko" : "en"].map((text, idx) => {
                      const colonIndex = text.indexOf(':');
                      const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                      const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1).trimStart() : text;
                      return (
                        <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                          <span className="inline-block mr-2">•</span>
                          {colonIndex !== -1 ? <><span className="font-bold">{boldPart}</span> {restPart}</> : text}
                        </p>
                      );
                    })
                  ) : (
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                    {(isConsultingDigitalTransformationUX || isConsultingBigDataDriven) && <span className="inline-block mr-2">•</span>}
                    {(() => {
                      const item = (translations as { chatbotImplementation?: { en: string; ko: string } }).chatbotImplementation;
                      const text = item ? (language === "KOR" ? item.ko : item.en) : "";
                      const colonIndex = text.indexOf(':');
                      if (colonIndex !== -1) {
                        const boldPart = text.substring(0, colonIndex + 1);
                        const restPart = text.substring(colonIndex + 1);
                        return (
                          <>
                            <span className="font-bold">{boldPart}</span>
                            {restPart}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  )}
                  {"customerDataAnalysis" in translations && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                    <span className="inline-block mr-2">•</span>
                    {(() => {
                      const item = (translations as { customerDataAnalysis?: { en: string; ko: string } }).customerDataAnalysis;
                      const text = item ? (language === "KOR" ? item.ko : item.en) : "";
                      const colonIndex = text.indexOf(':');
                      if (colonIndex !== -1) {
                        const boldPart = text.substring(0, colonIndex + 1);
                        const restPart = text.substring(colonIndex + 1);
                        return (
                          <>
                            <span className="font-bold">{boldPart}</span>
                            {restPart}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  )}
                  </>
                  )}
                  {((() => {
                    const m = (translations as { marketing?: { en: string; ko: string } }).marketing;
                    const tm = (translations as { targetedMarketing?: { en: string; ko: string } }).targetedMarketing;
                    const hasMarketing = "marketing" in translations && (m?.en || m?.ko);
                    const hasTargeted = "targetedMarketing" in translations && (tm?.en || tm?.ko);
                    return hasMarketing || hasTargeted;
                  })()) && (
                  <>
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{sectionLabel(1)}{"marketing" in translations ? (language === "KOR" ? (translations as { marketing: { en: string; ko: string } }).marketing.ko : (translations as { marketing: { en: string; ko: string } }).marketing.en) : ""}</h4>
                  {"financialServicesBullets" in translations && Array.isArray((translations as { financialServicesBullets?: { en: string; ko: string }[] }).financialServicesBullets) ? (
                    ((translations as { financialServicesBullets: { en: string; ko: string }[] }).financialServicesBullets).map((item, idx) => {
                      const text = language === "KOR" ? item.ko : item.en;
                      const colonIndex = text.indexOf(':');
                      const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                      const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1) : text;
                      return (
                        <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4 whitespace-pre-line">
                          <span className="inline-block mr-2">•</span>
                          {colonIndex !== -1 ? (
                            <><span className="font-bold">{boldPart}</span>{restPart}</>
                          ) : (
                            text
                          )}
                        </p>
                      );
                    })
                  ) : (isIntroductionXero || isAiBusinessAutomation) && "targetedMarketingBullets" in translations ? (
                    (translations as { targetedMarketingBullets: { en: string[]; ko: string[] } }).targetedMarketingBullets[language === "KOR" ? "ko" : "en"].map((text, idx) => {
                      const colonIndex = text.indexOf(':');
                      const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                      const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1).trimStart() : text;
                      return (
                        <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                          <span className="inline-block mr-2">•</span>
                          {colonIndex !== -1 ? <><span className="font-bold">{boldPart}</span> {restPart}</> : text}
                        </p>
                      );
                    })
                  ) : "targetedMarketing" in translations && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                    {(isConsultingDigitalTransformationUX || isConsultingBigDataDriven) && <span className="inline-block mr-2">•</span>}
                    {(() => {
                      const item = (translations as { targetedMarketing?: { en: string; ko: string } }).targetedMarketing;
                      const text = item ? (language === "KOR" ? item.ko : item.en) : "";
                      const colonIndex = text.indexOf(':');
                      if (colonIndex !== -1) {
                        const boldPart = text.substring(0, colonIndex + 1);
                        const restPart = text.substring(colonIndex + 1);
                        return (
                          <>
                            <span className="font-bold">{boldPart}</span>
                            {restPart}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  )}
                  </>
                  )}
                  {"risksAssociatedWithRetainedProfitsDividendsTitle" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { risksAssociatedWithRetainedProfitsDividendsTitle: { en: string; ko: string } }).risksAssociatedWithRetainedProfitsDividendsTitle.ko : (translations as { risksAssociatedWithRetainedProfitsDividendsTitle: { en: string; ko: string } }).risksAssociatedWithRetainedProfitsDividendsTitle.en}</h3>
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { risksAssociatedWithRetainedProfitsDividendsDescription: { en: string; ko: string } }).risksAssociatedWithRetainedProfitsDividendsDescription.ko : (translations as { risksAssociatedWithRetainedProfitsDividendsDescription: { en: string; ko: string } }).risksAssociatedWithRetainedProfitsDividendsDescription.en}</p>
                    </>
                  )}
                  {"predictiveAnalytics" in translations && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                    <span className="inline-block mr-2">•</span>
                    {(() => {
                      const item = (translations as { predictiveAnalytics?: { en: string; ko: string } }).predictiveAnalytics;
                      const text = item ? (language === "KOR" ? item.ko : item.en) : "";
                      const colonIndex = text.indexOf(':');
                      if (colonIndex !== -1) {
                        const boldPart = text.substring(0, colonIndex + 1);
                        const restPart = text.substring(colonIndex + 1);
                        return (
                          <>
                            <span className="font-bold">{boldPart}</span>
                            {restPart}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  )}
                  {"financialManagement" in translations && (
                  <>
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{sectionLabel(2)}{language === "KOR" ? (translations as { financialManagement: { en: string; ko: string } }).financialManagement.ko : (translations as { financialManagement: { en: string; ko: string } }).financialManagement.en}</h4>
                  {"logisticsBullets" in translations && Array.isArray((translations as { logisticsBullets?: { en: string; ko: string }[] }).logisticsBullets) ? (
                    ((translations as { logisticsBullets: { en: string; ko: string }[] }).logisticsBullets).map((item, idx) => {
                      const text = language === "KOR" ? item.ko : item.en;
                      const colonIndex = text.indexOf(':');
                      const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                      const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1) : text;
                      return (
                        <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4 whitespace-pre-line">
                          <span className="inline-block mr-2">•</span>
                          {colonIndex !== -1 ? (
                            <><span className="font-bold">{boldPart}</span>{restPart}</>
                          ) : (
                            text
                          )}
                        </p>
                      );
                    })
                  ) : (
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                    <span className="inline-block mr-2">•</span>
                    {(() => {
                      const item = (translations as { riskManagement?: { en: string; ko: string } }).riskManagement;
                      const text = item ? (language === "KOR" ? item.ko : item.en) : "";
                      const colonIndex = text.indexOf(':');
                      if (colonIndex !== -1) {
                        const boldPart = text.substring(0, colonIndex + 1);
                        const restPart = text.substring(colonIndex + 1);
                        return (
                          <>
                            <span className="font-bold">{boldPart}</span>
                            {restPart}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  )}
                  </>
                  )}
                  {"conclusionTitle" in translations && !isHrIr56 && !isHrTaxClearanceDeparting && !isHrWithholdingObligationsDeparting && !isTaxTwoTieredSalariesTax && !isHrEmployersReturnBir56a && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { conclusionTitle: { en: string; ko: string } }).conclusionTitle.ko : (translations as { conclusionTitle: { en: string; ko: string } }).conclusionTitle.en}</h3>
                      {"conclusionDescription" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { conclusionDescription: { en: string; ko: string } }).conclusionDescription.ko : (translations as { conclusionDescription: { en: string; ko: string } }).conclusionDescription.en}</p>
                      )}
                      {"conclusionParagraph2" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { conclusionParagraph2: { en: string; ko: string } }).conclusionParagraph2.ko : (translations as { conclusionParagraph2: { en: string; ko: string } }).conclusionParagraph2.en}</p>
                      )}
                    </>
                  )}
                  {"financialForecasting" in translations && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                    <span className="inline-block mr-2">•</span>
                    {(() => {
                      const item = (translations as { financialForecasting?: { en: string; ko: string } }).financialForecasting;
                      const text = item ? (language === "KOR" ? item.ko : item.en) : "";
                      const colonIndex = text.indexOf(':');
                      if (colonIndex !== -1) {
                        const boldPart = text.substring(0, colonIndex + 1);
                        const restPart = text.substring(colonIndex + 1);
                        return (
                          <>
                            <span className="font-bold">{boldPart}</span>
                            {restPart}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  )}
                  {"productionManagement" in translations && !isConsultingDigitalTransformationUX && !isConsultingBigDataDriven && (
                  <>
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{sectionLabel(3)}{language === "KOR" ? (translations as { productionManagement: { en: string; ko: string } }).productionManagement.ko : (translations as { productionManagement: { en: string; ko: string } }).productionManagement.en}</h4>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                    <span className="inline-block mr-2">•</span>
                    {(() => {
                      const item = (translations as { qualityControlAutomation?: { en: string; ko: string } }).qualityControlAutomation;
                      const text = item ? (language === "KOR" ? item.ko : item.en) : "";
                      const colonIndex = text.indexOf(':');
                      if (colonIndex !== -1) {
                        const boldPart = text.substring(0, colonIndex + 1);
                        const restPart = text.substring(colonIndex + 1);
                        return (
                          <>
                            <span className="font-bold">{boldPart}</span>
                            {restPart}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  </>
                  )}
                  {"predictiveMaintenance" in translations && !isConsultingDigitalTransformationUX && !isConsultingBigDataDriven && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                    <span className="inline-block mr-2">•</span>
                    {(() => {
                      const item = (translations as { predictiveMaintenance?: { en: string; ko: string } }).predictiveMaintenance;
                      const text = item ? (language === "KOR" ? item.ko : item.en) : "";
                      const colonIndex = text.indexOf(':');
                      if (colonIndex !== -1) {
                        const boldPart = text.substring(0, colonIndex + 1);
                        const restPart = text.substring(colonIndex + 1);
                        return (
                          <>
                            <span className="font-bold">{boldPart}</span>
                            {restPart}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  )}
                  {"humanResourcesManagement" in translations && (
                  <>
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{sectionLabel(4)}{language === "KOR" ? (translations as { humanResourcesManagement: { en: string; ko: string } }).humanResourcesManagement.ko : (translations as { humanResourcesManagement: { en: string; ko: string } }).humanResourcesManagement.en}</h4>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                    <span className="inline-block mr-2">•</span>
                    {(() => {
                      const item = (translations as { talentAcquisitionOptimization?: { en: string; ko: string } }).talentAcquisitionOptimization;
                      const text = item ? (language === "KOR" ? item.ko : item.en) : "";
                      const colonIndex = text.indexOf(':');
                      if (colonIndex !== -1) {
                        const boldPart = text.substring(0, colonIndex + 1);
                        const restPart = text.substring(colonIndex + 1);
                        return (
                          <>
                            <span className="font-bold">{boldPart}</span>
                            {restPart}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  </>
                  )}
                  {"xeroPricingPlansTitle" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { xeroPricingPlansTitle: { en: string; ko: string } }).xeroPricingPlansTitle.ko : (translations as { xeroPricingPlansTitle: { en: string; ko: string } }).xeroPricingPlansTitle.en}</h3>
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { xeroPricingPlansDescription: { en: string; ko: string } }).xeroPricingPlansDescription.ko : (translations as { xeroPricingPlansDescription: { en: string; ko: string } }).xeroPricingPlansDescription.en}</p>
                      {"xeroPricingStarter" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">1. {language === "KOR" ? (translations as { xeroPricingStarter: { en: string; ko: string } }).xeroPricingStarter.ko : (translations as { xeroPricingStarter: { en: string; ko: string } }).xeroPricingStarter.en}</h4>
                          {(isTaxCorporateTax || isConsultingLegalConsiderationsMA) && "financialStatementsAuditBullet1" in translations ? (
                            <>
                              <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4"><span className="inline-block mr-2">•</span>{(() => { const t = language === "KOR" ? (translations as { financialStatementsAuditBullet1: { en: string; ko: string } }).financialStatementsAuditBullet1.ko : (translations as { financialStatementsAuditBullet1: { en: string; ko: string } }).financialStatementsAuditBullet1.en; const i = t.indexOf(":"); return i !== -1 ? <><span className="font-bold">{t.slice(0, i + 1)}</span>{t.slice(i + 1)}</> : t; })()}</p>
                              <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4"><span className="inline-block mr-2">•</span>{(() => { const t = language === "KOR" ? (translations as { financialStatementsAuditBullet2: { en: string; ko: string } }).financialStatementsAuditBullet2.ko : (translations as { financialStatementsAuditBullet2: { en: string; ko: string } }).financialStatementsAuditBullet2.en; const i = t.indexOf(":"); return i !== -1 ? <><span className="font-bold">{t.slice(0, i + 1)}</span>{t.slice(i + 1)}</> : t; })()}</p>
                            </>
                          ) : (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4"><span className="inline-block mr-2">•</span>{language === "KOR" ? (translations as { xeroPricingStarterDescription: { en: string; ko: string } }).xeroPricingStarterDescription.ko : (translations as { xeroPricingStarterDescription: { en: string; ko: string } }).xeroPricingStarterDescription.en}</p>
                          )}
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">2. {language === "KOR" ? (translations as { xeroPricingStandard: { en: string; ko: string } }).xeroPricingStandard.ko : (translations as { xeroPricingStandard: { en: string; ko: string } }).xeroPricingStandard.en}</h4>
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4"><span className="inline-block mr-2">•</span>{isTaxCorporateTax && (() => { const t = language === "KOR" ? (translations as { xeroPricingStandardDescription: { en: string; ko: string } }).xeroPricingStandardDescription.ko : (translations as { xeroPricingStandardDescription: { en: string; ko: string } }).xeroPricingStandardDescription.en; const i = t.indexOf(":"); return i !== -1 ? <><span className="font-bold">{t.slice(0, i + 1)}</span>{t.slice(i + 1)}</> : t; })()}{!isTaxCorporateTax && (language === "KOR" ? (translations as { xeroPricingStandardDescription: { en: string; ko: string } }).xeroPricingStandardDescription.ko : (translations as { xeroPricingStandardDescription: { en: string; ko: string } }).xeroPricingStandardDescription.en)}</p>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">3. {language === "KOR" ? (translations as { xeroPricingPremium: { en: string; ko: string } }).xeroPricingPremium.ko : (translations as { xeroPricingPremium: { en: string; ko: string } }).xeroPricingPremium.en}</h4>
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6"><span className="inline-block mr-2">•</span>{isTaxCorporateTax && (() => { const t = language === "KOR" ? (translations as { xeroPricingPremiumDescription: { en: string; ko: string } }).xeroPricingPremiumDescription.ko : (translations as { xeroPricingPremiumDescription: { en: string; ko: string } }).xeroPricingPremiumDescription.en; const i = t.indexOf(":"); return i !== -1 ? <><span className="font-bold">{t.slice(0, i + 1)}</span>{t.slice(i + 1)}</> : t; })()}{!isTaxCorporateTax && (language === "KOR" ? (translations as { xeroPricingPremiumDescription: { en: string; ko: string } }).xeroPricingPremiumDescription.ko : (translations as { xeroPricingPremiumDescription: { en: string; ko: string } }).xeroPricingPremiumDescription.en)}</p>
                        </>
                      )}
                    </>
                  )}
                  {"xeroCustomerSupportTitle" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { xeroCustomerSupportTitle: { en: string; ko: string } }).xeroCustomerSupportTitle.ko : (translations as { xeroCustomerSupportTitle: { en: string; ko: string } }).xeroCustomerSupportTitle.en}</h3>
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { xeroCustomerSupportDescription: { en: string; ko: string } }).xeroCustomerSupportDescription.ko : (translations as { xeroCustomerSupportDescription: { en: string; ko: string } }).xeroCustomerSupportDescription.en}</p>
                      {"profitsTaxDeadlineTableRows" in translations && Array.isArray((translations as { profitsTaxDeadlineTableRows?: { col1: { en: string; ko: string }; col2: { en: string; ko: string }; col3: { en: string; ko: string } }[] }).profitsTaxDeadlineTableRows) && ((translations as { profitsTaxDeadlineTableRows: { col1: { en: string; ko: string }; col2: { en: string; ko: string }; col3: { en: string; ko: string } }[] }).profitsTaxDeadlineTableRows.length > 0) && (
                        <div className="overflow-x-auto mb-4 sm:mb-5 md:mb-6">
                          <table className="w-full min-w-[280px] text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12]">
                            <thead>
                              <tr className="bg-[#D8DB79]/70">
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-semibold">{language === "KOR" ? (translations as { profitsTaxDeadlineTableHeader?: { col1: { en: string; ko: string }; col2: { en: string; ko: string }; col3: { en: string; ko: string } } }).profitsTaxDeadlineTableHeader?.col1?.ko ?? "열 1" : (translations as { profitsTaxDeadlineTableHeader?: { col1: { en: string; ko: string }; col2: { en: string; ko: string }; col3: { en: string; ko: string } } }).profitsTaxDeadlineTableHeader?.col1?.en ?? "Column 1"}</th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-semibold">{language === "KOR" ? (translations as { profitsTaxDeadlineTableHeader?: { col1: { en: string; ko: string }; col2: { en: string; ko: string }; col3: { en: string; ko: string } } }).profitsTaxDeadlineTableHeader?.col2?.ko ?? "열 2" : (translations as { profitsTaxDeadlineTableHeader?: { col1: { en: string; ko: string }; col2: { en: string; ko: string }; col3: { en: string; ko: string } } }).profitsTaxDeadlineTableHeader?.col2?.en ?? "Column 2"}</th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-semibold">{language === "KOR" ? (translations as { profitsTaxDeadlineTableHeader?: { col1: { en: string; ko: string }; col2: { en: string; ko: string }; col3: { en: string; ko: string } } }).profitsTaxDeadlineTableHeader?.col3?.ko ?? "열 3" : (translations as { profitsTaxDeadlineTableHeader?: { col1: { en: string; ko: string }; col2: { en: string; ko: string }; col3: { en: string; ko: string } } }).profitsTaxDeadlineTableHeader?.col3?.en ?? "Column 3"}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {((translations as { profitsTaxDeadlineTableRows: { col1: { en: string; ko: string }; col2: { en: string; ko: string }; col3: { en: string; ko: string } }[] }).profitsTaxDeadlineTableRows).map((row, i) => (
                                <tr key={i} className={i % 2 === 1 ? "bg-[#F2F2F2]" : ""}>
                                  <td className="px-3 py-2 sm:px-4 sm:py-3">{language === "KOR" ? row.col1.ko : row.col1.en}</td>
                                  <td className="px-3 py-2 sm:px-4 sm:py-3">{language === "KOR" ? row.col2.ko : row.col2.en}</td>
                                  <td className="px-3 py-2 sm:px-4 sm:py-3">{language === "KOR" ? row.col3.ko : row.col3.en}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {"profitsTaxDeadlineTableNote" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { profitsTaxDeadlineTableNote: { en: string; ko: string } }).profitsTaxDeadlineTableNote.ko : (translations as { profitsTaxDeadlineTableNote: { en: string; ko: string } }).profitsTaxDeadlineTableNote.en}</p>
                      )}
                      {"xeroCustomerSupportTraining" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">1. {language === "KOR" ? (translations as { xeroCustomerSupportTraining: { en: string; ko: string } }).xeroCustomerSupportTraining.ko : (translations as { xeroCustomerSupportTraining: { en: string; ko: string } }).xeroCustomerSupportTraining.en}</h4>
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4"><span className="inline-block mr-2">•</span>{language === "KOR" ? (translations as { xeroCustomerSupportTrainingDescription: { en: string; ko: string } }).xeroCustomerSupportTrainingDescription.ko : (translations as { xeroCustomerSupportTrainingDescription: { en: string; ko: string } }).xeroCustomerSupportTrainingDescription.en}</p>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">2. {language === "KOR" ? (translations as { xeroCustomerSupportOnline: { en: string; ko: string } }).xeroCustomerSupportOnline.ko : (translations as { xeroCustomerSupportOnline: { en: string; ko: string } }).xeroCustomerSupportOnline.en}</h4>
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4"><span className="inline-block mr-2">•</span>{language === "KOR" ? (translations as { xeroCustomerSupportOnlineDescription: { en: string; ko: string } }).xeroCustomerSupportOnlineDescription.ko : (translations as { xeroCustomerSupportOnlineDescription: { en: string; ko: string } }).xeroCustomerSupportOnlineDescription.en}</p>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">3. {language === "KOR" ? (translations as { xeroCustomerSupportCommunity: { en: string; ko: string } }).xeroCustomerSupportCommunity.ko : (translations as { xeroCustomerSupportCommunity: { en: string; ko: string } }).xeroCustomerSupportCommunity.en}</h4>
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6"><span className="inline-block mr-2">•</span>{language === "KOR" ? (translations as { xeroCustomerSupportCommunityDescription: { en: string; ko: string } }).xeroCustomerSupportCommunityDescription.ko : (translations as { xeroCustomerSupportCommunityDescription: { en: string; ko: string } }).xeroCustomerSupportCommunityDescription.en}</p>
                        </>
                      )}
                    </>
                  )}
                  {"xeroTrainingProgramsTitle" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { xeroTrainingProgramsTitle: { en: string; ko: string } }).xeroTrainingProgramsTitle.ko : (translations as { xeroTrainingProgramsTitle: { en: string; ko: string } }).xeroTrainingProgramsTitle.en}</h3>
                      {"xeroTrainingProgramsDescription" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { xeroTrainingProgramsDescription: { en: string; ko: string } }).xeroTrainingProgramsDescription.ko : (translations as { xeroTrainingProgramsDescription: { en: string; ko: string } }).xeroTrainingProgramsDescription.en}</p>
                      )}
                      {"xeroTrainingOnlineCourses" in translations && (
                        <>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">1. {language === "KOR" ? (translations as { xeroTrainingOnlineCourses: { en: string; ko: string } }).xeroTrainingOnlineCourses.ko : (translations as { xeroTrainingOnlineCourses: { en: string; ko: string } }).xeroTrainingOnlineCourses.en}</h4>
                          {"ratioAnalysisBullets" in translations && Array.isArray((translations as { ratioAnalysisBullets?: { label: { en: string; ko: string }; description: { en: string; ko: string } }[] }).ratioAnalysisBullets) ? (
                            ((translations as { ratioAnalysisBullets: { label: { en: string; ko: string }; description: { en: string; ko: string } }[] }).ratioAnalysisBullets).map((item, idx) => (
                              <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                                <span className="inline-block mr-2">•</span>
                                <span className="font-bold">{language === "KOR" ? item.label.ko : item.label.en}</span>{" "}
                                {language === "KOR" ? item.description.ko : item.description.en}
                              </p>
                            ))
                          ) : (
                            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4"><span className="inline-block mr-2">•</span>{isTaxCorporateTax && (() => { const t = language === "KOR" ? (translations as { xeroTrainingOnlineCoursesDescription: { en: string; ko: string } }).xeroTrainingOnlineCoursesDescription.ko : (translations as { xeroTrainingOnlineCoursesDescription: { en: string; ko: string } }).xeroTrainingOnlineCoursesDescription.en; const i = t.indexOf(":"); return i !== -1 ? <><span className="font-bold">{t.slice(0, i + 1)}</span>{t.slice(i + 1)}</> : t; })()}{!isTaxCorporateTax && (language === "KOR" ? (translations as { xeroTrainingOnlineCoursesDescription: { en: string; ko: string } }).xeroTrainingOnlineCoursesDescription.ko : (translations as { xeroTrainingOnlineCoursesDescription: { en: string; ko: string } }).xeroTrainingOnlineCoursesDescription.en)}</p>
                          )}
                          {"xeroTrainingWebinars" in translations && (
                            <>
                              <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">2. {language === "KOR" ? (translations as { xeroTrainingWebinars: { en: string; ko: string } }).xeroTrainingWebinars.ko : (translations as { xeroTrainingWebinars: { en: string; ko: string } }).xeroTrainingWebinars.en}</h4>
                              <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4"><span className="inline-block mr-2">•</span>{isTaxCorporateTax && (() => { const t = language === "KOR" ? (translations as { xeroTrainingWebinarsDescription: { en: string; ko: string } }).xeroTrainingWebinarsDescription.ko : (translations as { xeroTrainingWebinarsDescription: { en: string; ko: string } }).xeroTrainingWebinarsDescription.en; const i = t.indexOf(":"); return i !== -1 ? <><span className="font-bold">{t.slice(0, i + 1)}</span>{t.slice(i + 1)}</> : t; })()}{!isTaxCorporateTax && (language === "KOR" ? (translations as { xeroTrainingWebinarsDescription: { en: string; ko: string } }).xeroTrainingWebinarsDescription.ko : (translations as { xeroTrainingWebinarsDescription: { en: string; ko: string } }).xeroTrainingWebinarsDescription.en)}</p>
                            </>
                          )}
                          {"xeroTrainingCertification" in translations && (
                            <>
                              <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">3. {language === "KOR" ? (translations as { xeroTrainingCertification: { en: string; ko: string } }).xeroTrainingCertification.ko : (translations as { xeroTrainingCertification: { en: string; ko: string } }).xeroTrainingCertification.en}</h4>
                              <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6"><span className="inline-block mr-2">•</span>{isTaxCorporateTax && (() => { const t = language === "KOR" ? (translations as { xeroTrainingCertificationDescription: { en: string; ko: string } }).xeroTrainingCertificationDescription.ko : (translations as { xeroTrainingCertificationDescription: { en: string; ko: string } }).xeroTrainingCertificationDescription.en; const i = t.indexOf(":"); return i !== -1 ? <><span className="font-bold">{t.slice(0, i + 1)}</span>{t.slice(i + 1)}</> : t; })()}{!isTaxCorporateTax && (language === "KOR" ? (translations as { xeroTrainingCertificationDescription: { en: string; ko: string } }).xeroTrainingCertificationDescription.ko : (translations as { xeroTrainingCertificationDescription: { en: string; ko: string } }).xeroTrainingCertificationDescription.en)}</p>
                            </>
                          )}
                          {"xeroTrainingAdditionalFiling" in translations && (
                            <>
                              <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">4. {language === "KOR" ? (translations as { xeroTrainingAdditionalFiling: { en: string; ko: string } }).xeroTrainingAdditionalFiling.ko : (translations as { xeroTrainingAdditionalFiling: { en: string; ko: string } }).xeroTrainingAdditionalFiling.en}</h4>
                              <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6"><span className="inline-block mr-2">•</span>{isTaxCorporateTax && (() => { const t = language === "KOR" ? (translations as { xeroTrainingAdditionalFilingDescription: { en: string; ko: string } }).xeroTrainingAdditionalFilingDescription.ko : (translations as { xeroTrainingAdditionalFilingDescription: { en: string; ko: string } }).xeroTrainingAdditionalFilingDescription.en; const i = t.indexOf(":"); return i !== -1 ? <><span className="font-bold">{t.slice(0, i + 1)}</span>{t.slice(i + 1)}</> : t; })()}{!isTaxCorporateTax && (language === "KOR" ? (translations as { xeroTrainingAdditionalFilingDescription: { en: string; ko: string } }).xeroTrainingAdditionalFilingDescription.ko : (translations as { xeroTrainingAdditionalFilingDescription: { en: string; ko: string } }).xeroTrainingAdditionalFilingDescription.en)}</p>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {"xeroLimitationsTitle" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { xeroLimitationsTitle: { en: string; ko: string } }).xeroLimitationsTitle.ko : (translations as { xeroLimitationsTitle: { en: string; ko: string } }).xeroLimitationsTitle.en}</h3>
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { xeroLimitationsDescription: { en: string; ko: string } }).xeroLimitationsDescription.ko : (translations as { xeroLimitationsDescription: { en: string; ko: string } }).xeroLimitationsDescription.en}</p>
                    </>
                  )}
                  {"employeeSatisfactionAnalysis" in translations && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">
                    <span className="inline-block mr-2">•</span>
                    {(() => {
                      const item = (translations as { employeeSatisfactionAnalysis?: { en: string; ko: string } }).employeeSatisfactionAnalysis;
                      const text = item ? (language === "KOR" ? item.ko : item.en) : "";
                      const colonIndex = text.indexOf(':');
                      if (colonIndex !== -1) {
                        const boldPart = text.substring(0, colonIndex + 1);
                        const restPart = text.substring(colonIndex + 1);
                        return (
                          <>
                            <span className="font-bold">{boldPart}</span>
                            {restPart}
                          </>
                        );
                      }
                      return text;
                    })()}
                  </p>
                  )}
                    </>
                  )}
                    </>
                  ) : (
                    <>
                  {(isAmendment || isIncorporation || isHrTerminationRegulation) && "realWorldCases" in translations && (
                    <>
                  {isHrTerminationRegulation && "monetaryCompensationOnDismissal" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { monetaryCompensationOnDismissal: { en: string; ko: string } }).monetaryCompensationOnDismissal.ko : (translations as { monetaryCompensationOnDismissal: { en: string; ko: string } }).monetaryCompensationOnDismissal.en}</h3>
                      {"monetaryCompensationIntro" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5">{language === "KOR" ? (translations as { monetaryCompensationIntro: { en: string; ko: string } }).monetaryCompensationIntro.ko : (translations as { monetaryCompensationIntro: { en: string; ko: string } }).monetaryCompensationIntro.en}</p>
                      )}
                      {"monetaryCompensationItems" in translations && Array.isArray((translations as { monetaryCompensationItems?: { title: { en: string; ko: string }; description: { en: string; ko: string }; bullets?: { label: { en: string; ko: string }; description: { en: string; ko: string } }[] }[] }).monetaryCompensationItems) && (
                        <div className="mb-4 sm:mb-5 md:mb-6 space-y-4">
                          {((translations as { monetaryCompensationItems: { title: { en: string; ko: string }; description: { en: string; ko: string }; bullets?: { label: { en: string; ko: string }; description: { en: string; ko: string } }[] }[] }).monetaryCompensationItems).map((item, i) => (
                            <div key={i}>
                              <h4 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[16px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2 sm:mb-2.5 md:mb-3">{language === "KOR" ? item.title.ko : item.title.en}</h4>
                              <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-2 sm:mb-3">{language === "KOR" ? item.description.ko : item.description.en}</p>
                              {item.bullets && Array.isArray(item.bullets) && item.bullets.length > 0 && (
                                <div className="pl-8 sm:pl-10 md:pl-12 mb-2 sm:mb-3 space-y-3">
                                  {item.bullets.map((bullet, bIdx) => {
                                    const labelText = language === "KOR" ? bullet.label.ko : bullet.label.en;
                                    const descText = language === "KOR" ? bullet.description.ko : bullet.description.en;
                                    return (
                                    <p key={bIdx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                                      <span className="inline-block mr-2">•</span>
                                      {labelText ? <><span className="font-bold">{labelText}</span>{" "}</> : null}
                                      {descText}
                                    </p>
                                  ); })}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  {isHrTerminationRegulation && "legalResponsibilitiesAndContractImportance" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { legalResponsibilitiesAndContractImportance: { en: string; ko: string } }).legalResponsibilitiesAndContractImportance.ko : (translations as { legalResponsibilitiesAndContractImportance: { en: string; ko: string } }).legalResponsibilitiesAndContractImportance.en}</h3>
                      {"legalResponsibilitiesIntro" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5">{language === "KOR" ? (translations as { legalResponsibilitiesIntro: { en: string; ko: string } }).legalResponsibilitiesIntro.ko : (translations as { legalResponsibilitiesIntro: { en: string; ko: string } }).legalResponsibilitiesIntro.en}</p>
                      )}
                      {"legalResponsibilitiesBullets" in translations && Array.isArray((translations as { legalResponsibilitiesBullets?: { label: { en: string; ko: string }; description: { en: string; ko: string } }[] }).legalResponsibilitiesBullets) && (
                        <div className="mb-4 sm:mb-5 md:mb-6 space-y-3">
                          {((translations as { legalResponsibilitiesBullets: { label: { en: string; ko: string }; description: { en: string; ko: string } }[] }).legalResponsibilitiesBullets).map((item, i) => (
                            <p key={i} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12">
                              <span className="inline-block mr-2">•</span>
                              <span className="font-bold">{language === "KOR" ? item.label.ko : item.label.en}</span>{" "}
                              {language === "KOR" ? item.description.ko : item.description.en}
                            </p>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  {isHrTerminationRegulation && "mpfMandatoryContributionsOnTermination" in translations && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { mpfMandatoryContributionsOnTermination: { en: string; ko: string } }).mpfMandatoryContributionsOnTermination.ko : (translations as { mpfMandatoryContributionsOnTermination: { en: string; ko: string } }).mpfMandatoryContributionsOnTermination.en}</h3>
                      {"mpfMandatoryContributionsOnTerminationDescription" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5">{language === "KOR" ? (translations as { mpfMandatoryContributionsOnTerminationDescription: { en: string; ko: string } }).mpfMandatoryContributionsOnTerminationDescription.ko : (translations as { mpfMandatoryContributionsOnTerminationDescription: { en: string; ko: string } }).mpfMandatoryContributionsOnTerminationDescription.en}</p>
                      )}
                    </>
                  )}
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { realWorldCases: { en: string; ko: string } }).realWorldCases.ko : (translations as { realWorldCases: { en: string; ko: string } }).realWorldCases.en}</h3>
                  {"realWorldCasesDescription" in translations && (translations as { realWorldCasesDescription: { en: string; ko: string } }).realWorldCasesDescription && (
                    <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6 whitespace-pre-line">{language === "KOR" ? (translations as { realWorldCasesDescription: { en: string; ko: string } }).realWorldCasesDescription.ko : (translations as { realWorldCasesDescription: { en: string; ko: string } }).realWorldCasesDescription.en}</p>
                  )}
                  {"costLabel" in translations && (translations as { costLabel?: { en: string; ko: string } }).costLabel && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { costLabel: { en: string; ko: string } }).costLabel.ko : (translations as { costLabel: { en: string; ko: string } }).costLabel.en}</h3>
                      {"costDescription" in translations && (translations as { costDescription?: { en: string; ko: string } }).costDescription && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">
                          {language === "KOR" ? (translations as { costDescription: { en: string; ko: string } }).costDescription.ko : (translations as { costDescription: { en: string; ko: string } }).costDescription.en}
                        </p>
                      )}
                      {"costTableRows" in translations && Array.isArray((translations as { costTableRows?: { col1: { en: string; ko: string }; col2: { en: string; ko: string } }[] }).costTableRows) && ((translations as { costTableRows: { col1: { en: string; ko: string }; col2: { en: string; ko: string } }[] }).costTableRows.length > 0) && (
                        <div className="overflow-x-auto mb-4 sm:mb-5 md:mb-6">
                          <table className="w-full min-w-[280px] text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12]">
                            <thead>
                              <tr className="bg-[#D8DB79]/70">
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-semibold">{language === "KOR" ? (translations as { costTableHeader?: { col1: { en: string; ko: string }; col2: { en: string; ko: string } } }).costTableHeader?.col1?.ko ?? "항목" : (translations as { costTableHeader?: { col1: { en: string; ko: string }; col2: { en: string; ko: string } } }).costTableHeader?.col1?.en ?? "Item"}</th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-semibold">{language === "KOR" ? (translations as { costTableHeader?: { col1: { en: string; ko: string }; col2: { en: string; ko: string } } }).costTableHeader?.col2?.ko ?? "금액" : (translations as { costTableHeader?: { col1: { en: string; ko: string }; col2: { en: string; ko: string } } }).costTableHeader?.col2?.en ?? "Amount"}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {((translations as { costTableRows: { col1: { en: string; ko: string }; col2: { en: string; ko: string } }[] }).costTableRows).map((row, i) => (
                                <tr key={i} className={i === 1 || i === 3 ? "bg-[#F2F2F2]" : ""}>
                                  <td className="px-3 py-2 sm:px-4 sm:py-3">{language === "KOR" ? row.col1.ko : row.col1.en}</td>
                                  <td className="px-3 py-2 sm:px-4 sm:py-3">{language === "KOR" ? row.col2.ko : row.col2.en}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {"costTableNotes" in translations && (translations as { costTableNotes?: { en: string; ko: string } }).costTableNotes && (
                        <p className="text-[14px] text-[#998C3D] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6 whitespace-pre-line">
                          {language === "KOR" ? (translations as { costTableNotes: { en: string; ko: string } }).costTableNotes.ko : (translations as { costTableNotes: { en: string; ko: string } }).costTableNotes.en}
                        </p>
                      )}
                    </>
                  )}
                  {"amendmentProcedureStepsIntro" in translations && (
                    <>
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { amendmentProcedureStepsIntro: { en: string; ko: string } }).amendmentProcedureStepsIntro.ko : (translations as { amendmentProcedureStepsIntro: { en: string; ko: string } }).amendmentProcedureStepsIntro.en}</p>
                      {"amendmentProcedureSteps" in translations && Array.isArray((translations as { amendmentProcedureSteps?: { en: string; ko: string }[] }).amendmentProcedureSteps) && (
                        <div className="pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-4 space-y-2 text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                          {((translations as { amendmentProcedureSteps: { en: string; ko: string }[] }).amendmentProcedureSteps).map((step, i) => (
                            <p key={i}>{language === "KOR" ? step.ko : step.en}</p>
                          ))}
                        </div>
                      )}
                      {"amendmentProcedureConcluding" in translations && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { amendmentProcedureConcluding: { en: string; ko: string } }).amendmentProcedureConcluding.ko : (translations as { amendmentProcedureConcluding: { en: string; ko: string } }).amendmentProcedureConcluding.en}</p>
                      )}
                    </>
                  )}
                    </>
                  )}
                </>
                )}
                {"additionalBigDataUseCasesTitle" in translations && (
                  <>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { additionalBigDataUseCasesTitle: { en: string; ko: string } }).additionalBigDataUseCasesTitle.ko : (translations as { additionalBigDataUseCasesTitle: { en: string; ko: string } }).additionalBigDataUseCasesTitle.en}</h3>
                    {"additionalBigDataUseCasesIntro" in translations && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { additionalBigDataUseCasesIntro: { en: string; ko: string } }).additionalBigDataUseCasesIntro.ko : (translations as { additionalBigDataUseCasesIntro: { en: string; ko: string } }).additionalBigDataUseCasesIntro.en}</p>
                    )}
                    {"additionalBigDataUseCases1Title" in translations && (
                      <>
                        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">1. {language === "KOR" ? (translations as { additionalBigDataUseCases1Title: { en: string; ko: string } }).additionalBigDataUseCases1Title.ko : (translations as { additionalBigDataUseCases1Title: { en: string; ko: string } }).additionalBigDataUseCases1Title.en}</h4>
                        {"additionalBigDataUseCases1Bullets" in translations && Array.isArray((translations as { additionalBigDataUseCases1Bullets?: { en: string; ko: string }[] }).additionalBigDataUseCases1Bullets) && ((translations as { additionalBigDataUseCases1Bullets: { en: string; ko: string }[] }).additionalBigDataUseCases1Bullets).map((item, idx) => {
                          const text = language === "KOR" ? item.ko : item.en;
                          const colonIndex = text.indexOf(":");
                          const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                          const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1) : text;
                          return (
                            <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                              <span className="inline-block mr-2">•</span>
                              {colonIndex !== -1 ? <><span className="font-bold">{boldPart}</span>{restPart}</> : text}
                            </p>
                          );
                        })}
                      </>
                    )}
                    {"additionalBigDataUseCases2Title" in translations && (
                      <>
                        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">2. {language === "KOR" ? (translations as { additionalBigDataUseCases2Title: { en: string; ko: string } }).additionalBigDataUseCases2Title.ko : (translations as { additionalBigDataUseCases2Title: { en: string; ko: string } }).additionalBigDataUseCases2Title.en}</h4>
                        {"additionalBigDataUseCases2Bullets" in translations && Array.isArray((translations as { additionalBigDataUseCases2Bullets?: { en: string; ko: string }[] }).additionalBigDataUseCases2Bullets) && ((translations as { additionalBigDataUseCases2Bullets: { en: string; ko: string }[] }).additionalBigDataUseCases2Bullets).map((item, idx) => {
                          const text = language === "KOR" ? item.ko : item.en;
                          const colonIndex = text.indexOf(":");
                          const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                          const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1) : text;
                          return (
                            <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                              <span className="inline-block mr-2">•</span>
                              {colonIndex !== -1 ? <><span className="font-bold">{boldPart}</span>{restPart}</> : text}
                            </p>
                          );
                        })}
                      </>
                    )}
                    {"additionalBigDataUseCases3Title" in translations && (
                      <>
                        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">3. {language === "KOR" ? (translations as { additionalBigDataUseCases3Title: { en: string; ko: string } }).additionalBigDataUseCases3Title.ko : (translations as { additionalBigDataUseCases3Title: { en: string; ko: string } }).additionalBigDataUseCases3Title.en}</h4>
                        {"additionalBigDataUseCases3Bullets" in translations && Array.isArray((translations as { additionalBigDataUseCases3Bullets?: { en: string; ko: string }[] }).additionalBigDataUseCases3Bullets) && ((translations as { additionalBigDataUseCases3Bullets: { en: string; ko: string }[] }).additionalBigDataUseCases3Bullets).map((item, idx) => {
                          const text = language === "KOR" ? item.ko : item.en;
                          const colonIndex = text.indexOf(":");
                          const boldPart = colonIndex !== -1 ? text.substring(0, colonIndex + 1) : "";
                          const restPart = colonIndex !== -1 ? text.substring(colonIndex + 1) : text;
                          return (
                            <p key={idx} className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-3 sm:mb-3.5 md:mb-4">
                              <span className="inline-block mr-2">•</span>
                              {colonIndex !== -1 ? <><span className="font-bold">{boldPart}</span>{restPart}</> : text}
                            </p>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
                {"leaveEntitlementsRegulationsTitle" in translations && (
                  <>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { leaveEntitlementsRegulationsTitle: { en: string; ko: string } }).leaveEntitlementsRegulationsTitle.ko : (translations as { leaveEntitlementsRegulationsTitle: { en: string; ko: string } }).leaveEntitlementsRegulationsTitle.en}</h3>
                    {"leaveEntitlementsRegulationsPaidAnnualTitle" in translations && (
                      <>
                        <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2 sm:mb-2.5 md:mb-3">{language === "KOR" ? (translations as { leaveEntitlementsRegulationsPaidAnnualTitle: { en: string; ko: string } }).leaveEntitlementsRegulationsPaidAnnualTitle.ko : (translations as { leaveEntitlementsRegulationsPaidAnnualTitle: { en: string; ko: string } }).leaveEntitlementsRegulationsPaidAnnualTitle.en}</h4>
                        {("leaveEntitlementsRegulationsPaidAnnualLabel" in translations || "leaveEntitlementsRegulationsPaidAnnualDescription" in translations) && (
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">
                            <span className="inline-block mr-2">•</span>
                            {"leaveEntitlementsRegulationsPaidAnnualLabel" in translations && <span className="font-bold">{language === "KOR" ? (translations as { leaveEntitlementsRegulationsPaidAnnualLabel: { en: string; ko: string } }).leaveEntitlementsRegulationsPaidAnnualLabel.ko : (translations as { leaveEntitlementsRegulationsPaidAnnualLabel: { en: string; ko: string } }).leaveEntitlementsRegulationsPaidAnnualLabel.en}</span>}
                            {" "}{"leaveEntitlementsRegulationsPaidAnnualDescription" in translations && (language === "KOR" ? (translations as { leaveEntitlementsRegulationsPaidAnnualDescription: { en: string; ko: string } }).leaveEntitlementsRegulationsPaidAnnualDescription.ko : (translations as { leaveEntitlementsRegulationsPaidAnnualDescription: { en: string; ko: string } }).leaveEntitlementsRegulationsPaidAnnualDescription.en)}
                          </p>
                        )}
                      </>
                    )}
                    {"leaveEntitlementsRegulationsSickTitle" in translations && (
                      <>
                        <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2 sm:mb-2.5 md:mb-3">{language === "KOR" ? (translations as { leaveEntitlementsRegulationsSickTitle: { en: string; ko: string } }).leaveEntitlementsRegulationsSickTitle.ko : (translations as { leaveEntitlementsRegulationsSickTitle: { en: string; ko: string } }).leaveEntitlementsRegulationsSickTitle.en}</h4>
                        {("leaveEntitlementsRegulationsSickLabel" in translations || "leaveEntitlementsRegulationsSickDescription" in translations) && (
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">
                            <span className="inline-block mr-2">•</span>
                            {"leaveEntitlementsRegulationsSickLabel" in translations && <span className="font-bold">{language === "KOR" ? (translations as { leaveEntitlementsRegulationsSickLabel: { en: string; ko: string } }).leaveEntitlementsRegulationsSickLabel.ko : (translations as { leaveEntitlementsRegulationsSickLabel: { en: string; ko: string } }).leaveEntitlementsRegulationsSickLabel.en}</span>}
                            {" "}{"leaveEntitlementsRegulationsSickDescription" in translations && (language === "KOR" ? (translations as { leaveEntitlementsRegulationsSickDescription: { en: string; ko: string } }).leaveEntitlementsRegulationsSickDescription.ko : (translations as { leaveEntitlementsRegulationsSickDescription: { en: string; ko: string } }).leaveEntitlementsRegulationsSickDescription.en)}
                          </p>
                        )}
                      </>
                    )}
                    {"leaveEntitlementsRegulationsMaternityTitle" in translations && (
                      <>
                        <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2 sm:mb-2.5 md:mb-3">{language === "KOR" ? (translations as { leaveEntitlementsRegulationsMaternityTitle: { en: string; ko: string } }).leaveEntitlementsRegulationsMaternityTitle.ko : (translations as { leaveEntitlementsRegulationsMaternityTitle: { en: string; ko: string } }).leaveEntitlementsRegulationsMaternityTitle.en}</h4>
                        {("leaveEntitlementsRegulationsMaternityLabel" in translations || "leaveEntitlementsRegulationsMaternityDescription" in translations) && (
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">
                            <span className="inline-block mr-2">•</span>
                            {"leaveEntitlementsRegulationsMaternityLabel" in translations && <span className="font-bold">{language === "KOR" ? (translations as { leaveEntitlementsRegulationsMaternityLabel: { en: string; ko: string } }).leaveEntitlementsRegulationsMaternityLabel.ko : (translations as { leaveEntitlementsRegulationsMaternityLabel: { en: string; ko: string } }).leaveEntitlementsRegulationsMaternityLabel.en}</span>}
                            {" "}{"leaveEntitlementsRegulationsMaternityDescription" in translations && (language === "KOR" ? (translations as { leaveEntitlementsRegulationsMaternityDescription: { en: string; ko: string } }).leaveEntitlementsRegulationsMaternityDescription.ko : (translations as { leaveEntitlementsRegulationsMaternityDescription: { en: string; ko: string } }).leaveEntitlementsRegulationsMaternityDescription.en)}
                          </p>
                        )}
                      </>
                    )}
                    {"leaveEntitlementsRegulationsOtherTitle" in translations && (
                      <>
                        <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2 sm:mb-2.5 md:mb-3">{language === "KOR" ? (translations as { leaveEntitlementsRegulationsOtherTitle: { en: string; ko: string } }).leaveEntitlementsRegulationsOtherTitle.ko : (translations as { leaveEntitlementsRegulationsOtherTitle: { en: string; ko: string } }).leaveEntitlementsRegulationsOtherTitle.en}</h4>
                        {("leaveEntitlementsRegulationsOtherLabel" in translations || "leaveEntitlementsRegulationsOtherDescription" in translations) && (
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">
                            <span className="inline-block mr-2">•</span>
                            {"leaveEntitlementsRegulationsOtherLabel" in translations && <span className="font-bold">{language === "KOR" ? (translations as { leaveEntitlementsRegulationsOtherLabel: { en: string; ko: string } }).leaveEntitlementsRegulationsOtherLabel.ko : (translations as { leaveEntitlementsRegulationsOtherLabel: { en: string; ko: string } }).leaveEntitlementsRegulationsOtherLabel.en}</span>}
                            {" "}{"leaveEntitlementsRegulationsOtherDescription" in translations && (language === "KOR" ? (translations as { leaveEntitlementsRegulationsOtherDescription: { en: string; ko: string } }).leaveEntitlementsRegulationsOtherDescription.ko : (translations as { leaveEntitlementsRegulationsOtherDescription: { en: string; ko: string } }).leaveEntitlementsRegulationsOtherDescription.en)}
                          </p>
                        )}
                      </>
                    )}
                  </>
                )}
                {"leaveApplicationTitle" in translations && (
                  <>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { leaveApplicationTitle: { en: string; ko: string } }).leaveApplicationTitle.ko : (translations as { leaveApplicationTitle: { en: string; ko: string } }).leaveApplicationTitle.en}</h3>
                    {"leaveApplicationDescription" in translations && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { leaveApplicationDescription: { en: string; ko: string } }).leaveApplicationDescription.ko : (translations as { leaveApplicationDescription: { en: string; ko: string } }).leaveApplicationDescription.en}</p>
                    )}
                  </>
                )}
                {"leaveApprovalTitle" in translations && (
                  <>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { leaveApprovalTitle: { en: string; ko: string } }).leaveApprovalTitle.ko : (translations as { leaveApprovalTitle: { en: string; ko: string } }).leaveApprovalTitle.en}</h3>
                    {"leaveApprovalConsiderationTitle" in translations && (
                      <>
                        <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2 sm:mb-2.5 md:mb-3">{language === "KOR" ? (translations as { leaveApprovalConsiderationTitle: { en: string; ko: string } }).leaveApprovalConsiderationTitle.ko : (translations as { leaveApprovalConsiderationTitle: { en: string; ko: string } }).leaveApprovalConsiderationTitle.en}</h4>
                        {("leaveApprovalConsiderationLabel" in translations || "leaveApprovalConsiderationDescription" in translations) && (
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">
                            <span className="inline-block mr-2">•</span>
                            {"leaveApprovalConsiderationLabel" in translations && <span className="font-bold">{language === "KOR" ? (translations as { leaveApprovalConsiderationLabel: { en: string; ko: string } }).leaveApprovalConsiderationLabel.ko : (translations as { leaveApprovalConsiderationLabel: { en: string; ko: string } }).leaveApprovalConsiderationLabel.en}</span>}
                            {" "}{"leaveApprovalConsiderationDescription" in translations && (language === "KOR" ? (translations as { leaveApprovalConsiderationDescription: { en: string; ko: string } }).leaveApprovalConsiderationDescription.ko : (translations as { leaveApprovalConsiderationDescription: { en: string; ko: string } }).leaveApprovalConsiderationDescription.en)}
                          </p>
                        )}
                      </>
                    )}
                    {"leaveApprovalReschedulingTitle" in translations && (
                      <>
                        <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-2 sm:mb-2.5 md:mb-3">{language === "KOR" ? (translations as { leaveApprovalReschedulingTitle: { en: string; ko: string } }).leaveApprovalReschedulingTitle.ko : (translations as { leaveApprovalReschedulingTitle: { en: string; ko: string } }).leaveApprovalReschedulingTitle.en}</h4>
                        {("leaveApprovalReschedulingLabel" in translations || "leaveApprovalReschedulingDescription" in translations) && (
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">
                            <span className="inline-block mr-2">•</span>
                            {"leaveApprovalReschedulingLabel" in translations && <span className="font-bold">{language === "KOR" ? (translations as { leaveApprovalReschedulingLabel: { en: string; ko: string } }).leaveApprovalReschedulingLabel.ko : (translations as { leaveApprovalReschedulingLabel: { en: string; ko: string } }).leaveApprovalReschedulingLabel.en}</span>}
                            {" "}{"leaveApprovalReschedulingDescription" in translations && (language === "KOR" ? (translations as { leaveApprovalReschedulingDescription: { en: string; ko: string } }).leaveApprovalReschedulingDescription.ko : (translations as { leaveApprovalReschedulingDescription: { en: string; ko: string } }).leaveApprovalReschedulingDescription.en)}
                          </p>
                        )}
                      </>
                    )}
                  </>
                )}
                {"changesToPreApprovedLeaveTitle" in translations && (
                  <>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { changesToPreApprovedLeaveTitle: { en: string; ko: string } }).changesToPreApprovedLeaveTitle.ko : (translations as { changesToPreApprovedLeaveTitle: { en: string; ko: string } }).changesToPreApprovedLeaveTitle.en}</h3>
                    {"changesToPreApprovedLeaveDescription" in translations && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { changesToPreApprovedLeaveDescription: { en: string; ko: string } }).changesToPreApprovedLeaveDescription.ko : (translations as { changesToPreApprovedLeaveDescription: { en: string; ko: string } }).changesToPreApprovedLeaveDescription.en}</p>
                    )}
                  </>
                )}
                {"leaveEntitlementsAndUsageTitle" in translations && (
                  <>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { leaveEntitlementsAndUsageTitle: { en: string; ko: string } }).leaveEntitlementsAndUsageTitle.ko : (translations as { leaveEntitlementsAndUsageTitle: { en: string; ko: string } }).leaveEntitlementsAndUsageTitle.en}</h3>
                    {"leaveEntitlementsAndUsageDescription" in translations && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { leaveEntitlementsAndUsageDescription: { en: string; ko: string } }).leaveEntitlementsAndUsageDescription.ko : (translations as { leaveEntitlementsAndUsageDescription: { en: string; ko: string } }).leaveEntitlementsAndUsageDescription.en}</p>
                    )}
                  </>
                )}
                {"whatIsMpfTitle" in translations && (
                  <>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { whatIsMpfTitle: { en: string; ko: string } }).whatIsMpfTitle.ko : (translations as { whatIsMpfTitle: { en: string; ko: string } }).whatIsMpfTitle.en}</h3>
                    {"whatIsMpfParagraph" in translations && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { whatIsMpfParagraph: { en: string; ko: string } }).whatIsMpfParagraph.ko : (translations as { whatIsMpfParagraph: { en: string; ko: string } }).whatIsMpfParagraph.en}</p>
                    )}
                  </>
                )}
                {"mpfEnrollmentEligibilityTitle" in translations && (
                  <>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { mpfEnrollmentEligibilityTitle: { en: string; ko: string } }).mpfEnrollmentEligibilityTitle.ko : (translations as { mpfEnrollmentEligibilityTitle: { en: string; ko: string } }).mpfEnrollmentEligibilityTitle.en}</h3>
                    {"mpfEnrollmentEligibilityParagraph" in translations && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { mpfEnrollmentEligibilityParagraph: { en: string; ko: string } }).mpfEnrollmentEligibilityParagraph.ko : (translations as { mpfEnrollmentEligibilityParagraph: { en: string; ko: string } }).mpfEnrollmentEligibilityParagraph.en}</p>
                    )}
                  </>
                )}
                {"mpfCalculationMethodTitle" in translations && (
                  <>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { mpfCalculationMethodTitle: { en: string; ko: string } }).mpfCalculationMethodTitle.ko : (translations as { mpfCalculationMethodTitle: { en: string; ko: string } }).mpfCalculationMethodTitle.en}</h3>
                    {"mpfCalculationMethodMandatoryTitle" in translations && (
                      <>
                        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { mpfCalculationMethodMandatoryTitle: { en: string; ko: string } }).mpfCalculationMethodMandatoryTitle.ko : (translations as { mpfCalculationMethodMandatoryTitle: { en: string; ko: string } }).mpfCalculationMethodMandatoryTitle.en}</h4>
                        {"mpfCalculationMethodMandatoryParagraph1" in translations && (
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-2 sm:mb-3">{language === "KOR" ? (translations as { mpfCalculationMethodMandatoryParagraph1: { en: string; ko: string } }).mpfCalculationMethodMandatoryParagraph1.ko : (translations as { mpfCalculationMethodMandatoryParagraph1: { en: string; ko: string } }).mpfCalculationMethodMandatoryParagraph1.en}</p>
                        )}
                        {"mpfCalculationMethodMandatoryParagraph2" in translations && (
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-2 sm:mb-3">{language === "KOR" ? (translations as { mpfCalculationMethodMandatoryParagraph2: { en: string; ko: string } }).mpfCalculationMethodMandatoryParagraph2.ko : (translations as { mpfCalculationMethodMandatoryParagraph2: { en: string; ko: string } }).mpfCalculationMethodMandatoryParagraph2.en}</p>
                        )}
                        {"mpfCalculationMethodMandatoryParagraph3" in translations && (
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { mpfCalculationMethodMandatoryParagraph3: { en: string; ko: string } }).mpfCalculationMethodMandatoryParagraph3.ko : (translations as { mpfCalculationMethodMandatoryParagraph3: { en: string; ko: string } }).mpfCalculationMethodMandatoryParagraph3.en}</p>
                        )}
                      </>
                    )}
                    {"mpfCalculationMethodVoluntaryTitle" in translations && (
                      <>
                        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { mpfCalculationMethodVoluntaryTitle: { en: string; ko: string } }).mpfCalculationMethodVoluntaryTitle.ko : (translations as { mpfCalculationMethodVoluntaryTitle: { en: string; ko: string } }).mpfCalculationMethodVoluntaryTitle.en}</h4>
                        {"mpfCalculationMethodVoluntaryParagraph" in translations && (
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { mpfCalculationMethodVoluntaryParagraph: { en: string; ko: string } }).mpfCalculationMethodVoluntaryParagraph.ko : (translations as { mpfCalculationMethodVoluntaryParagraph: { en: string; ko: string } }).mpfCalculationMethodVoluntaryParagraph.en}</p>
                        )}
                      </>
                    )}
                  </>
                )}
                {"otherMpfInfoTitle" in translations && (
                  <>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { otherMpfInfoTitle: { en: string; ko: string } }).otherMpfInfoTitle.ko : (translations as { otherMpfInfoTitle: { en: string; ko: string } }).otherMpfInfoTitle.en}</h3>
                    {"otherMpfInfoParagraph1" in translations && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { otherMpfInfoParagraph1: { en: string; ko: string } }).otherMpfInfoParagraph1.ko : (translations as { otherMpfInfoParagraph1: { en: string; ko: string } }).otherMpfInfoParagraph1.en}</p>
                    )}
                    {"otherMpfInfoParagraph2" in translations && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { otherMpfInfoParagraph2: { en: string; ko: string } }).otherMpfInfoParagraph2.ko : (translations as { otherMpfInfoParagraph2: { en: string; ko: string } }).otherMpfInfoParagraph2.en}</p>
                    )}
                  </>
                )}
                {"mpfTerminationTitle" in translations && (
                  <>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { mpfTerminationTitle: { en: string; ko: string } }).mpfTerminationTitle.ko : (translations as { mpfTerminationTitle: { en: string; ko: string } }).mpfTerminationTitle.en}</h3>
                    {"mpfTerminationNormalRetirementTitle" in translations && (
                      <>
                        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { mpfTerminationNormalRetirementTitle: { en: string; ko: string } }).mpfTerminationNormalRetirementTitle.ko : (translations as { mpfTerminationNormalRetirementTitle: { en: string; ko: string } }).mpfTerminationNormalRetirementTitle.en}</h4>
                        {"mpfTerminationNormalRetirementParagraph1" in translations && (
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-2 sm:mb-3">{language === "KOR" ? (translations as { mpfTerminationNormalRetirementParagraph1: { en: string; ko: string } }).mpfTerminationNormalRetirementParagraph1.ko : (translations as { mpfTerminationNormalRetirementParagraph1: { en: string; ko: string } }).mpfTerminationNormalRetirementParagraph1.en}</p>
                        )}
                        {"mpfTerminationNormalRetirementParagraph2" in translations && (
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { mpfTerminationNormalRetirementParagraph2: { en: string; ko: string } }).mpfTerminationNormalRetirementParagraph2.ko : (translations as { mpfTerminationNormalRetirementParagraph2: { en: string; ko: string } }).mpfTerminationNormalRetirementParagraph2.en}</p>
                        )}
                      </>
                    )}
                    {"mpfTerminationEarlyWithdrawalTitle" in translations && (
                      <>
                        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#333333] pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { mpfTerminationEarlyWithdrawalTitle: { en: string; ko: string } }).mpfTerminationEarlyWithdrawalTitle.ko : (translations as { mpfTerminationEarlyWithdrawalTitle: { en: string; ko: string } }).mpfTerminationEarlyWithdrawalTitle.en}</h4>
                        {"mpfTerminationEarlyWithdrawalIntro" in translations && (
                          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify pl-8 sm:pl-10 md:pl-12 mb-2 sm:mb-3">{language === "KOR" ? (translations as { mpfTerminationEarlyWithdrawalIntro: { en: string; ko: string } }).mpfTerminationEarlyWithdrawalIntro.ko : (translations as { mpfTerminationEarlyWithdrawalIntro: { en: string; ko: string } }).mpfTerminationEarlyWithdrawalIntro.en}</p>
                        )}
                        <ol className="list-decimal pl-10 sm:pl-12 md:pl-14 mb-4 sm:mb-5 md:mb-6 space-y-3 text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                          {"mpfTerminationEarlyRetirement" in translations && (
                            <li><span className="font-bold">{language === "KOR" ? (translations as { mpfTerminationEarlyRetirement: { en: string; ko: string } }).mpfTerminationEarlyRetirement.ko.split(":")[0] + ": " : (translations as { mpfTerminationEarlyRetirement: { en: string; ko: string } }).mpfTerminationEarlyRetirement.en.split(":")[0] + ": "}</span>{language === "KOR" ? (translations as { mpfTerminationEarlyRetirement: { en: string; ko: string } }).mpfTerminationEarlyRetirement.ko.split(":").slice(1).join(":").trim() : (translations as { mpfTerminationEarlyRetirement: { en: string; ko: string } }).mpfTerminationEarlyRetirement.en.split(":").slice(1).join(":").trim()}</li>
                          )}
                          {"mpfTerminationEmigrationOverseas" in translations && (
                            <li><span className="font-bold">{language === "KOR" ? (translations as { mpfTerminationEmigrationOverseas: { en: string; ko: string } }).mpfTerminationEmigrationOverseas.ko.split(":")[0] + ": " : (translations as { mpfTerminationEmigrationOverseas: { en: string; ko: string } }).mpfTerminationEmigrationOverseas.en.split(":")[0] + ": "}</span>{language === "KOR" ? (translations as { mpfTerminationEmigrationOverseas: { en: string; ko: string } }).mpfTerminationEmigrationOverseas.ko.split(":").slice(1).join(":").trim() : (translations as { mpfTerminationEmigrationOverseas: { en: string; ko: string } }).mpfTerminationEmigrationOverseas.en.split(":").slice(1).join(":").trim()}</li>
                          )}
                          {"mpfTerminationOtherCases" in translations && (
                            <li><span className="font-bold">{language === "KOR" ? (translations as { mpfTerminationOtherCases: { en: string; ko: string } }).mpfTerminationOtherCases.ko.split(":")[0] + ": " : (translations as { mpfTerminationOtherCases: { en: string; ko: string } }).mpfTerminationOtherCases.en.split(":")[0] + ": "}</span>{language === "KOR" ? (translations as { mpfTerminationOtherCases: { en: string; ko: string } }).mpfTerminationOtherCases.ko.split(":").slice(1).join(":").trim() : (translations as { mpfTerminationOtherCases: { en: string; ko: string } }).mpfTerminationOtherCases.en.split(":").slice(1).join(":").trim()}</li>
                          )}
                        </ol>
                      </>
                    )}
                  </>
                )}
                {"taxEffectsTitle" in translations && (
                  <>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { taxEffectsTitle: { en: string; ko: string } }).taxEffectsTitle.ko : (translations as { taxEffectsTitle: { en: string; ko: string } }).taxEffectsTitle.en}</h3>
                    {"taxEffectsParagraph1" in translations && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { taxEffectsParagraph1: { en: string; ko: string } }).taxEffectsParagraph1.ko : (translations as { taxEffectsParagraph1: { en: string; ko: string } }).taxEffectsParagraph1.en}</p>
                    )}
                    {"taxEffectsParagraph2" in translations && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { taxEffectsParagraph2: { en: string; ko: string } }).taxEffectsParagraph2.ko : (translations as { taxEffectsParagraph2: { en: string; ko: string } }).taxEffectsParagraph2.en}</p>
                    )}
                  </>
                )}
                {"mpfOffsettingTitle" in translations && (
                  <>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { mpfOffsettingTitle: { en: string; ko: string } }).mpfOffsettingTitle.ko : (translations as { mpfOffsettingTitle: { en: string; ko: string } }).mpfOffsettingTitle.en}</h3>
                    {"mpfOffsettingParagraph1" in translations && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { mpfOffsettingParagraph1: { en: string; ko: string } }).mpfOffsettingParagraph1.ko : (translations as { mpfOffsettingParagraph1: { en: string; ko: string } }).mpfOffsettingParagraph1.en}</p>
                    )}
                    {"mpfOffsettingParagraph2" in translations && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { mpfOffsettingParagraph2: { en: string; ko: string } }).mpfOffsettingParagraph2.ko : (translations as { mpfOffsettingParagraph2: { en: string; ko: string } }).mpfOffsettingParagraph2.en}</p>
                    )}
                    {"mpfOffsettingParagraph3" in translations && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { mpfOffsettingParagraph3: { en: string; ko: string } }).mpfOffsettingParagraph3.ko : (translations as { mpfOffsettingParagraph3: { en: string; ko: string } }).mpfOffsettingParagraph3.en}</p>
                    )}
                    {"mpfOffsettingParagraph4" in translations && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { mpfOffsettingParagraph4: { en: string; ko: string } }).mpfOffsettingParagraph4.ko : (translations as { mpfOffsettingParagraph4: { en: string; ko: string } }).mpfOffsettingParagraph4.en}</p>
                    )}
                  </>
                )}
                {(isAmendmentLayout || isHrIr56 || isHrTaxClearanceDeparting || isHrWithholdingObligationsDeparting || isTaxTwoTieredSalariesTax || isHrEmployersReturnBir56a) && "conclusionTitle" in translations && (
                  <>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? (translations as { conclusionTitle: { en: string; ko: string } }).conclusionTitle.ko : (translations as { conclusionTitle: { en: string; ko: string } }).conclusionTitle.en}</h3>
                    {"conclusionDescription" in translations && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { conclusionDescription: { en: string; ko: string } }).conclusionDescription.ko : (translations as { conclusionDescription: { en: string; ko: string } }).conclusionDescription.en}</p>
                    )}
                    {"conclusionParagraph2" in translations && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { conclusionParagraph2: { en: string; ko: string } }).conclusionParagraph2.ko : (translations as { conclusionParagraph2: { en: string; ko: string } }).conclusionParagraph2.en}</p>
                    )}
                  </>
                )}
                {"faqItems" in translations && Array.isArray((translations as { faqItems?: unknown[] }).faqItems) && (
                  <FaqAccordion
                    items={(translations as { faqItems: { question: { en: string; ko: string }; answer: { en: string; ko: string } }[] }).faqItems}
                    language={language}
                    title={(translations as { frequentlyAskedQuestions?: { en: string; ko: string } }).frequentlyAskedQuestions}
                  />
                )}
                  {"contactInformation" in translations && (
                  <>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">{language === "KOR" ? translations.contactInformation.ko : translations.contactInformation.en}</h3>
                  {"additionalInformationDescription" in translations && (translations as { additionalInformationDescription?: { en: string; ko: string } }).additionalInformationDescription ? (
                    <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">
                      {language === "KOR" ? (translations as { additionalInformationDescription: { en: string; ko: string } }).additionalInformationDescription.ko : (translations as { additionalInformationDescription: { en: string; ko: string } }).additionalInformationDescription.en}
                    </p>
                  ) : "inConclusionParagraph1" in translations ? (
                    <>
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { inConclusionParagraph1: { en: string; ko: string } }).inConclusionParagraph1.ko : (translations as { inConclusionParagraph1: { en: string; ko: string } }).inConclusionParagraph1.en}</p>
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-4">{language === "KOR" ? (translations as { inConclusionParagraph2: { en: string; ko: string } }).inConclusionParagraph2.ko : (translations as { inConclusionParagraph2: { en: string; ko: string } }).inConclusionParagraph2.en}</p>
                      <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6">{language === "KOR" ? (translations as { inConclusionParagraph3: { en: string; ko: string } }).inConclusionParagraph3.ko : (translations as { inConclusionParagraph3: { en: string; ko: string } }).inConclusionParagraph3.en}</p>
                    </>
                  ) : (
                  "contactInformationDescription" in translations && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#111B12] leading-relaxed text-justify">
                    {language === "KOR" ? (translations as { contactInformationDescription: { en: string; ko: string } }).contactInformationDescription.ko : (translations as { contactInformationDescription: { en: string; ko: string } }).contactInformationDescription.en}
                  </p>
                  )
                  )}
                  </>
                  )}
                  {"contactInformationDisclaimer" in translations && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-[16px] text-[#61598B] leading-relaxed text-justify mt-6 sm:mt-8 md:mt-12 lg:mt-16 xl:mt-20">
                    {language === "KOR" ? translations.contactInformationDisclaimer.ko : translations.contactInformationDisclaimer.en}
                  </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-start">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-base text-white leading-tight sm:leading-snug md:leading-normal">
              {pageTitle}
            </h2>
          </div>
        </section>
      )}
    </div>
  );
}
