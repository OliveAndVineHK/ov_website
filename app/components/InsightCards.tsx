"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import Link from "next/link";
import Carousel from "@/app/components/Carousel";
import {
  type InsightSubTag,
  type InsightCardDefinition,
  FIVE_STEPS_CARD,
  INTRODUCTION_XERO_CARD,
  ACCOUNTING_KNOWLEDGE_CARD,
  AMENDMENT_CARD,
  INCORPORATION_CARD,
  CORPORATE_SECRETARY_CARD,
  DIVIDEND_LEGAL_CONSIDERATIONS_CARD,
  VAT_CARD,
  CORPORATE_TAX_CARD,
  DIGITAL_TRANSFORMATION_EFFICIENCY_CARD,
  DIGITAL_TRANSFORMATION_UX_CARD,
  BIG_DATA_DRIVEN_CARD,
  DIGITAL_TRANSFORMATION_TVP_CARD,
  LEGAL_CONSIDERATIONS_MA_CARD,
  TERMINATION_REGULATION_CARD,
  HYBRID_WORK_PERFORMANCE_CARD,
  LEAVE_POLICY_EXPLANATION_CARD,
  MANDATORY_PROVIDENT_FUND_CARD,
  IR56_CARD,
  PLACEHOLDER_CARD,
} from "@/app/utils/insightCardsConfig";

export type { InsightSubTag } from "@/app/utils/insightCardsConfig";

interface InsightCardData extends InsightCardDefinition {
  isPlaceholder: boolean;
}

/** Renders topic tags from config only. No fallback/default tags - each card gets tags from insightCardsConfig. */
export function InsightCardSubTags({ tags, language }: { tags: InsightSubTag[]; language: string }) {
  const list = Array.isArray(tags) ? tags : [];
  if (list.length === 0) return null;
  const isKo = language === "KOR";
  return (
    <div className="flex flex-wrap gap-2 mt-auto pt-4">
      {list.map((t, i) => (
        <span key={i} className="px-3 py-1 rounded-full text-[13px] font-medium text-[#111B12]/70 bg-[#F1F1DD]">
          {isKo ? t.ko : t.en}
        </span>
      ))}
    </div>
  );
}

interface InsightCardsProps {
  language: string;
  translations: {
    title: { en: string; ko: string };
    description: { en: string; ko: string };
  };
  tagOverride?: { en: string; ko: string };
  action?: ReactNode;
  firstCardPlaceholder?: boolean;
  placeholderHref?: string;
  placeholderContent?: {
    title: { en: string; ko: string };
    description?: { en: string; ko: string };
  };
  secondCardAmendment?: boolean;
  firstCardAmendment?: boolean;
  secondCardIncorporation?: boolean;
  thirdCardCorporateSecretary?: boolean;
  /** When true (e.g. on home page), first card in default carousel is Introduction to Xero (Accounting). */
  firstCardIntroductionXero?: boolean;
  /** When true (e.g. on home page), third card in default carousel is AI Business Automation (Consulting). */
  thirdCardConsulting?: boolean;
  /** When true (e.g. on home page), first card on the 2nd carousel page is Dividend and Legal Considerations (Tax). */
  secondPageFirstCardDividendLegal?: boolean;
  /** When true (e.g. on Consulting service page), first card on the 2nd carousel page is Big Data Driven. */
  secondPageFirstCardBigDataDriven?: boolean;
  /** When true with secondPageFirstCardBigDataDriven, second card on the 2nd carousel page is Digital Transformation (TVP). */
  secondPageSecondCardDigitalTransformationTVP?: boolean;
  /** When true with secondPageFirstCardBigDataDriven, third card on the 2nd carousel page is Legal Considerations in M&A. */
  secondPageThirdCardLegalConsiderationsMA?: boolean;
  /** When true (e.g. on HR service page), first card on the 2nd carousel page is Mandatory Provident Fund. */
  secondPageFirstCardMandatoryProvidentFund?: boolean;
  /** When true with secondPageFirstCardMandatoryProvidentFund, second card on the 2nd carousel page is IR56 (Employment Notification to IRD). */
  secondPageSecondCardIr56?: boolean;
}

export default function InsightCards({
  language,
  translations,
  tagOverride,
  action,
  firstCardPlaceholder,
  placeholderHref,
  placeholderContent,
  secondCardAmendment,
  firstCardAmendment,
  secondCardIncorporation,
  thirdCardCorporateSecretary,
  firstCardIntroductionXero,
  thirdCardConsulting,
  secondPageFirstCardDividendLegal,
  secondPageFirstCardBigDataDriven,
  secondPageSecondCardDigitalTransformationTVP,
  secondPageThirdCardLegalConsiderationsMA,
  secondPageFirstCardMandatoryProvidentFund,
  secondPageSecondCardIr56,
}: InsightCardsProps) {
  const tag = tagOverride ?? { en: "Accounting", ko: "회계" };

  /** Convert a card definition to InsightCardData — single helper replaces 19 repeated lines */
  const toCard = (def: InsightCardDefinition): InsightCardData => ({ ...def, isPlaceholder: false });

  const placeholderCard: InsightCardData = {
    image: PLACEHOLDER_CARD.image,
    alt: "Insight 1",
    href: placeholderHref ?? PLACEHOLDER_CARD.href,
    tag: tagOverride ?? tag,
    title: placeholderContent?.title ?? PLACEHOLDER_CARD.title,
    description: placeholderContent?.description ?? { en: "", ko: "" },
    isPlaceholder: true,
  };
  const genericCard = (n: number): InsightCardData => ({
    image: `/home/sa-${n}.png`,
    alt: `Insight ${n}`,
    href: "#",
    tag: tagOverride ?? translations.title,
    title: translations.description,
    description: translations.description,
    isPlaceholder: false,
  });

  /** All service insight cards — used for tag-based filtering */
  const ALL_CARD_DEFS = [
    FIVE_STEPS_CARD, INTRODUCTION_XERO_CARD, ACCOUNTING_KNOWLEDGE_CARD, AMENDMENT_CARD,
    INCORPORATION_CARD, CORPORATE_SECRETARY_CARD, DIVIDEND_LEGAL_CONSIDERATIONS_CARD,
    VAT_CARD, CORPORATE_TAX_CARD, DIGITAL_TRANSFORMATION_EFFICIENCY_CARD,
    DIGITAL_TRANSFORMATION_UX_CARD, BIG_DATA_DRIVEN_CARD, DIGITAL_TRANSFORMATION_TVP_CARD,
    LEGAL_CONSIDERATIONS_MA_CARD, TERMINATION_REGULATION_CARD, HYBRID_WORK_PERFORMANCE_CARD,
    LEAVE_POLICY_EXPLANATION_CARD, MANDATORY_PROVIDENT_FUND_CARD, IR56_CARD,
  ] as const;
  const allServiceCards: InsightCardData[] = ALL_CARD_DEFS.map(toCard);
  const servicePlaceholder = (): InsightCardData => ({
    ...PLACEHOLDER_CARD,
    tag: tagOverride ?? tag,
    title: PLACEHOLDER_CARD.title,
    description: { en: "", ko: "" },
    isPlaceholder: true,
  });
  const cardsFilteredByTag =
    tagOverride != null
      ? (() => {
          const matched = allServiceCards.filter((c) => c.tag.en === tagOverride.en);
          if (matched.length === 0) return [servicePlaceholder(), servicePlaceholder(), servicePlaceholder()];
          const pad = 3 - matched.length;
          return [...matched.slice(0, 3), ...Array.from({ length: pad }, servicePlaceholder)];
        })()
      : null;

  const cards = firstCardAmendment
    ? [
        toCard(AMENDMENT_CARD),
        secondCardIncorporation ? toCard(INCORPORATION_CARD) : firstCardPlaceholder ? placeholderCard : genericCard(2),
        thirdCardCorporateSecretary ? toCard(CORPORATE_SECRETARY_CARD) : genericCard(3),
      ]
    : cardsFilteredByTag ??
      [
        firstCardIntroductionXero
          ? toCard(INTRODUCTION_XERO_CARD)
          : {
              image: firstCardPlaceholder ? "/home/sa-1.png" : "/insights/ai-automation.jpg",
              alt: "Insight 1",
              href: firstCardPlaceholder && placeholderHref ? placeholderHref : "/insights/consulting/ai-business-automation",
              tag: firstCardPlaceholder ? (tagOverride ?? tag) : { en: "Consulting", ko: "컨설팅" },
              title: firstCardPlaceholder
                ? (placeholderContent?.title ?? { en: "Coming soon", ko: "곧 공개" })
                : { en: "AI Business Automation", ko: "AI 비즈니스 자동화" },
              description: firstCardPlaceholder
                ? (placeholderContent?.description ?? { en: "", ko: "" })
                : { en: "", ko: "" },
              isPlaceholder: !!firstCardPlaceholder,
              subTags: firstCardPlaceholder ? undefined : FIVE_STEPS_CARD.subTags,
            },
        {
          image: secondCardAmendment ? "/insights/amendment.jpg" : "/home/sa-2.png",
          alt: "Insight 2",
          href: secondCardAmendment ? "/insights/corporate-service/amendment" : "#",
          tag: secondCardAmendment ? { en: "Corporate Service", ko: "기업 서비스" } : (tagOverride ?? translations.title),
          title: secondCardAmendment ? { en: "Amendment", ko: "정관 변경" } : translations.description,
          description: secondCardAmendment ? { en: "", ko: "" } : translations.description,
          isPlaceholder: false,
          subTags: secondCardAmendment ? AMENDMENT_CARD.subTags : undefined,
        },
        thirdCardConsulting ? toCard(FIVE_STEPS_CARD) : genericCard(3),
      ];

  const placeholderPageCard = (img: string, alt: string) => ({
    image: img,
    alt,
    href: "#",
    tag: tagOverride ?? tag,
    title: { en: "Coming soon", ko: "곧 공개" },
    description: { en: "", ko: "" },
    isPlaceholder: true,
  });
  const ph2 = placeholderPageCard("/home/sa-2.png", "Coming soon 2");
  const ph3 = placeholderPageCard("/home/sa-3.png", "Coming soon 3");
  const page1Cards =
    secondPageFirstCardDividendLegal
      ? [toCard(DIVIDEND_LEGAL_CONSIDERATIONS_CARD), ph2, ph3]
      : secondPageFirstCardBigDataDriven
        ? [
            toCard(BIG_DATA_DRIVEN_CARD),
            secondPageSecondCardDigitalTransformationTVP ? toCard(DIGITAL_TRANSFORMATION_TVP_CARD) : ph2,
            secondPageThirdCardLegalConsiderationsMA ? toCard(LEGAL_CONSIDERATIONS_MA_CARD) : ph3,
          ]
        : secondPageFirstCardMandatoryProvidentFund
          ? [
              toCard(MANDATORY_PROVIDENT_FUND_CARD),
              secondPageSecondCardIr56 ? toCard(IR56_CARD) : ph2,
              ph3,
            ]
          : [placeholderPageCard("/home/sa-1.png", "Coming soon 1"), ph2, ph3];
  const page2Cards = [
    placeholderPageCard("/home/sa-1.png", "Coming soon 4"),
    placeholderPageCard("/home/sa-2.png", "Coming soon 5"),
    placeholderPageCard("/home/sa-3.png", "Coming soon 6"),
  ];
  const allPages = [cards, page1Cards, page2Cards];

  return (
    <Carousel
      pageCount={3}
      prevLabel={language === "KOR" ? "이전" : "Previous"}
      nextLabel={language === "KOR" ? "다음" : "Next"}
      dotsAriaLabel={language === "KOR" ? "캐러셀 페이지" : "Carousel pages"}
      pageLabel={(i) => (language === "KOR" ? `페이지 ${i + 1}` : `Page ${i + 1}`)}
      rightAction={action}
    >
      {(currentPage) => {
        const visibleCards = allPages[currentPage];
        return (
          <div className="w-full mt-8">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleCards.map((card, index) => {
                const isKo = language === "KOR";
                const titleText = isKo ? card.title.ko : card.title.en;
                const descText = isKo ? card.description.ko : card.description.en;
                const CardContent = (
                  <>
                    <div className="w-[calc(100%+3rem)] h-[200px] sm:h-[240px] md:h-[280px] mb-6 sm:mb-8 md:mb-10 relative -mx-6 -mt-6 overflow-hidden group-hover:rounded-tr-[300px] transition-all duration-300">
                      <Image src={card.image} alt={card.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                      <div className="absolute inset-0 bg-[#E5E5BD]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    <span className="text-base sm:text-lg md:text-xl lg:text-[18px] text-[#111B12]">
                      {isKo ? card.tag.ko : card.tag.en}
                    </span>
                    <p
                      className="text-lg sm:text-xl md:text-2xl lg:text-[26px] text-[#495F2B] leading-tight mt-2 group-hover:underline transition-all duration-300"
                      dangerouslySetInnerHTML={{
                        __html:
                          (index === 0 && !card.isPlaceholder) || card.isPlaceholder
                            ? titleText + (descText ? "<br />" + descText : "")
                            : titleText,
                      }}
                    />
                    <InsightCardSubTags tags={Array.isArray((card as InsightCardData).subTags) ? (card as InsightCardData).subTags! : []} language={language} />
                  </>
                );

                return (
                  <Link key={`${currentPage}-${index}`} href={card.href} className="w-full min-h-[500px] md:min-h-[500px] bg-white p-6 flex flex-col hover:bg-[#E5E5BD]/50 hover:rounded-tr-[300px] transition-all duration-300 cursor-pointer group">{CardContent}</Link>
                );
              })}
            </div>
          </div>
        );
      }}
    </Carousel>
  );
}
