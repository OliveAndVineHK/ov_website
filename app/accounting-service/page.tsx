"use client";

/* ──────────────────────────────────────────────────────────────
   Accounting service page — rebuilt 2026-05-28
   Reference page:  app/tax-service/page.tsx
   Rules:           decisions/2026-05-28-b/c/d/e/f
   Grammar:         01 hero → 02 explainer → 07 related → 08 closing
                    (no Pattern 05; Accounting has no annual calendar)
   Hero light:      Accounting = 50% 8% (top-center, high balanced)
                    — per playbooks/section-01-hero.md variation map.
   Closing block:   shared <Footer/> renders QuestionsForm + dark chrome.
   ────────────────────────────────────────────────────────────── */

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { accountingServicePageTranslations } from "@/app/utils/pageAccountingServiceUtils";
import { learnMoreTranslations, servicesTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import SectionReveal from "@/app/components/SectionReveal";
import ScrollLinkedStagger from "@/app/components/ScrollLinkedStagger";
import ServiceIconMotion from "@/app/components/ServiceIconMotion";
import { ServiceAccentProvider, serviceColorMap } from "@/app/contexts/ServiceAccentContext";
import { useHeroLight } from "@/app/hooks/useHeroLight";
import * as Icons from "@/app/utils/icons";

/* Per-service resting origin for the hero light.
   Source of truth: playbooks/section-01-hero.md "Per-service variation map".
   Accounting = high, balanced light from the top-center. */
const HERO_LIGHT_ACCOUNTING = { defaultX: 50, defaultY: 8 };
const ACCOUNTING_HERO_BASE = serviceColorMap.accounting.heroBase;

/* Pattern 07 — related-services map.
   v2 (2026-06-04): re-balanced across all 6 service pages so each
   service appears as a related card exactly 3 times. From Accounting
   the natural triad is Assurance (audited), Tax (basis), Consulting
   (financial advisory). */
const RELATED_SERVICES = [
  {
    key: "assurance" as const,
    href: "/assurance-service",
    image: "/home/os-assurance.svg",
    imageWhite: "/home/os-assurance-w.svg",
    alt: "Assurance service icon",
  },
  {
    key: "tax" as const,
    href: "/tax-service",
    image: "/home/os-tax.svg",
    imageWhite: "/home/os-tax-w.svg",
    alt: "Tax service icon",
  },
  {
    key: "service5" as const,
    href: "/consulting-service",
    image: "/home/os-consulting.svg",
    imageWhite: "/home/os-consulting-w.svg",
    alt: "Consulting service icon",
  },
];

export default function AccountingServicePage() {
  const { language } = useLanguage();
  const t = accountingServicePageTranslations;
  const isKo = language === "KOR";

  /* Hero light — eases toward the cursor and back to Accounting's resting angle.
     Reduced-motion users and touch devices stay at rest. */
  const heroRef = useHeroLight(HERO_LIGHT_ACCOUNTING);

  /* Header copy */
  const heroTitle = isKo ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = isKo ? t.heroSubtitle.ko : t.heroSubtitle.en;

  /* Explainer — three sub-areas (Bookkeeping · Accounting · Private Accounting) */
  const subAreas = [
    {
      label: isKo ? t.bookkeepingTitle.ko : t.bookkeepingTitle.en,
      detail: isKo ? t.bookkeepingDescription.ko : t.bookkeepingDescription.en,
      items: isKo ? t.bookkeepingItems.ko : t.bookkeepingItems.en,
    },
    {
      label: isKo ? t.accountingSectionTitle.ko : t.accountingSectionTitle.en,
      detail: isKo ? t.accountingSectionDescription.ko : t.accountingSectionDescription.en,
      items: isKo ? t.accountingSectionItems.ko : t.accountingSectionItems.en,
    },
    {
      label: isKo ? t.privateaccountingTitle.ko : t.privateaccountingTitle.en,
      detail: isKo ? t.privateaccountingDescription.ko : t.privateaccountingDescription.en,
      items: isKo ? t.privateaccountingItems.ko : t.privateaccountingItems.en,
    },
  ];

  return (
    <ServiceAccentProvider serviceType="accounting">
      <main className="min-h-screen bg-white">

        {/* ────────────────────────────────────────────────────────
            Pattern 01 — Split hero with motion object

            Background: single-hue radial vignette (Decision C), cursor
            follow (Decision D), Accounting "Stack" motion (Decision E).
            Resting light angle 50% 8% per the playbook variation map.

            FLAGGED FOR FOUNDER: no Accounting-specific photograph in
            /public yet. The vignette is the documented fallback until
            a warm dark-leaning photo is supplied (a desk with open
            ledgers, or hands cross-checking columns).
            ──────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative w-full overflow-hidden"
          style={{
            backgroundColor: ACCOUNTING_HERO_BASE,
            // SSR / no-JS / reduced-motion resting state.
            backgroundImage:
              "radial-gradient(ellipse 80% 90% at 50% 8%, rgba(229,229,189,0.22) 0%, rgba(229,229,189,0.07) 35%, transparent 65%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 py-16 sm:py-20 md:py-28 lg:py-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center min-h-[420px] md:min-h-[520px] lg:min-h-[600px]">
              {/* Left — reading column */}
              <div className="md:col-span-7 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src="/home/os-accounting-w.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="object-contain"
                    aria-hidden
                  />
                  <span className="text-[14px] sm:text-[15px] text-white/85 font-medium">
                    {isKo ? "서비스 · 02 / 회계" : "Service · 02 / Accounting"}
                  </span>
                </div>

                <h1 className="text-[56px] sm:text-[72px] md:text-[88px] lg:text-[96px] 2xl:text-[112px] font-normal text-white leading-[1.05] tracking-[-0.01em]">
                  {heroTitle}
                </h1>

                <p className="mt-6 md:mt-8 max-w-xl text-[16px] sm:text-[18px] md:text-[20px] 2xl:text-[22px] text-white/85 leading-[1.55]">
                  {heroSubtitle}
                </p>

                <div className="mt-10">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[15px] text-white border border-white/50 rounded-full px-5 py-2 hover:bg-white hover:text-[#495F2B] hover:border-white transition-colors duration-300"
                  >
                    {isKo ? "대화 시작하기" : "Start a conversation"}
                    <Icons.CgArrowTopRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>

              {/* Right — Accounting "Stack" motion. Transparent SVG, hidden
                  below md (the small icon in the eyebrow carries the brand
                  mark on phone). */}
              <div className="hidden md:flex md:col-span-5 items-center justify-center md:justify-end">
                <div className="relative aspect-square flex items-center justify-center w-[220px] md:w-[260px] lg:w-[340px] xl:w-[400px] transition-all duration-300">
                  <ServiceIconMotion
                    service="accounting"
                    tone="light"
                    label="Accounting service icon — Stack motion"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Round-arrow CTA — bottom-right */}
          <Link
            href="/contact"
            aria-label={isKo ? "문의하기" : "Contact us"}
            className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 md:right-10 md:bottom-10 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white hover:text-[#495F2B] hover:border-white transition-colors duration-300"
          >
            <Icons.CgArrowTopRight className="size-6 md:size-7" aria-hidden />
          </Link>
        </section>

        {/* ────────────────────────────────────────────────────────
            Pattern 02 v2 — Diagram-led explainer (Decision H)
            Accounting curve = stacked horizontal arcs (echoes Stack motion).
            Accounting diagram = three layered plates (Bookkeeping →
            Accounting → Private Accounting).
            v3 (2026-06-03): b1.svg (filing-cabinet photo) added at top-
            right as a faded sepia-olive backdrop — thematically tied to
            bookkeeping/records, providing the "real" feel the page was
            missing. Heavily edge-faded so it never competes with text
            or the diagram below.
            ──────────────────────────────────────────────────────── */}
        <SectionReveal>
          <section className="relative w-full bg-white py-16 md:py-24 lg:py-28 overflow-hidden">
            {/* v8 (2026-06-04): same photo asset + effects, repositioned
                from bottom-LEFT → TOP-LEFT per user. Only `bottom-0` →
                `top-0` and mask anchor y flipped from 100% → 0%.
                Opacity, filter, size, fall-off — all unchanged. */}
            <div
              aria-hidden
              className="hidden md:block pointer-events-none absolute top-0 left-0 w-[360px] lg:w-[440px] 2xl:w-[520px] h-[380px] lg:h-[460px] 2xl:h-[540px]"
              style={{
                backgroundImage: "url(/services/b1.svg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                opacity: 0.42,
                filter: "grayscale(0.4) sepia(0.2) hue-rotate(40deg) saturate(0.85) brightness(1.08)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 110% at 35% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0) 80%)",
                maskImage:
                  "radial-gradient(ellipse 90% 110% at 35% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0) 80%)",
              }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              {/* Top row — heading left (col-5), description right (col-7).
                  Matches the consulting standard so the page family shares
                  one rhythm across services. The diagram has moved down
                  into its own band below this row.
                  Motion: slow from-top reveal on viewport entry. */}
              <SectionReveal direction="down" duration={700} distance={32}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-12 md:mb-16">
                  <div className="md:col-span-5">
                    <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-4">
                      {isKo ? "다루는 영역" : "What we handle"}
                    </span>
                    <h2 className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[32px] 2xl:text-[36px] font-normal text-[#111B12] leading-[1.25]">
                      {isKo
                        ? "세 단계, 한 권의 장부."
                        : "Three layers, one ledger."}
                    </h2>
                  </div>
                  <div className="md:col-span-7 flex items-start">
                    <p className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/70 leading-[1.65]">
                      {isKo
                        ? "부기로 기록을 정리하고, 회계로 의사결정에 필요한 정보를 만들며, 전담 회계로 외부 회계팀 역할까지 담당해 드립니다. 같은 장부 위에서 세 단계가 매끄럽게 이어집니다."
                        : "Bookkeeping records the base, accounting turns it into decisions, and private accounting takes ownership of the function. Three layers, but one ledger underneath."}
                    </p>
                  </div>
                </div>
              </SectionReveal>

              {/* v7 (2026-06-04): structure mirrors tax-service Pattern 02
                  exactly. Sub-areas stacked vertically in the RIGHT col-7,
                  left col-5 stays empty (placeholder div for grid). */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
                <div className="hidden md:block md:col-span-5" aria-hidden />
                <ScrollLinkedStagger
                  className="md:col-span-7 flex flex-col gap-10 md:gap-12"
                  range={[0.05, 0.4]}
                  distance={28}
                >
                  {subAreas.map((area) => (
                    <div key={area.label} data-scroll-item className="flex flex-col">
                      <h3 className="text-[18px] md:text-[20px] 2xl:text-[22px] font-semibold text-[#495F2B] mb-3">
                        {area.label}
                      </h3>
                      <p className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/70 leading-[1.6] mb-4">
                        {area.detail}
                      </p>
                      <ul className="flex flex-col gap-2.5 list-none pl-0">
                        {area.items.map((item, i) => (
                          <li key={i} className="flex gap-3 items-start text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/80 leading-[1.55]">
                            <span
                              aria-hidden
                              className="inline-block shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                              style={{ backgroundColor: "#627F38" }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ScrollLinkedStagger>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* ────────────────────────────────────────────────────────
            Pattern 07 — Related services
            For Accounting: Tax · Corporate · Assurance.
            Tile markup mirrors ServiceCards.tsx exactly — same NE-corner
            hover gesture, same dual-icon opacity swap.
            ──────────────────────────────────────────────────────── */}
        <SectionReveal>
          <section className="w-full bg-white py-16 md:py-24 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-3">
                {isKo ? "관련 서비스" : "Related services"}
              </span>
              <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.15] mb-10 md:mb-12">
                {isKo ? "함께 살펴보기" : "Explore alongside Accounting"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {RELATED_SERVICES.map((svc) => {
                  /* `servicesTranslations` uses `service5`/`service6` keys for
                     consulting/HR, but Tax / Corporate / Assurance map cleanly. */
                  const copy = servicesTranslations[svc.key];
                  return (
                    <Link
                      key={svc.key}
                      href={svc.href}
                      className="group w-full min-h-[330px] bg-[#F9F8F4] border border-[#627F38] p-6 flex flex-col hover:bg-[#627F38] hover:rounded-tr-[30px] transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex justify-start mb-4 relative">
                        <Image
                          src={svc.image}
                          alt={svc.alt}
                          width={80}
                          height={80}
                          className="object-contain group-hover:opacity-0 transition-opacity duration-300"
                        />
                        <Image
                          src={svc.imageWhite}
                          alt=""
                          aria-hidden
                          width={80}
                          height={80}
                          className="object-contain absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                      <h3 className="text-[24px] md:text-[28px] lg:text-[32px] text-[#111B12] group-hover:text-white transition-colors pt-8">
                        {isKo ? copy.title.ko : copy.title.en}
                      </h3>
                      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mt-4 md:mt-auto gap-4 md:gap-0">
                        <p className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/70 group-hover:text-white leading-relaxed transition-colors">
                          {isKo ? copy.description.ko : copy.description.en}
                        </p>
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#111B12]/70 group-hover:border-white group-hover:bg-white flex items-center justify-center transition-colors shrink-0 md:ml-4 self-end md:self-auto">
                          <Icons.CgArrowTopRight className="size-6 md:size-8 text-[#111B12]/70 group-hover:text-[#495F2B] transition-colors" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* ────────────────────────────────────────────────────────
            Pattern 08 — Universal closing
            Insights row here; QuestionsForm + dark Footer chrome render
            via the shared <Footer/> in app/layout.tsx.
            ──────────────────────────────────────────────────────── */}
        <section className="w-full bg-white py-12 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 flex flex-col items-start">
            <span className="text-[16px] md:text-[18px] 2xl:text-[20px] lg:text-[20px] font-semibold text-[#627F38]">
              {isKo ? learnMoreTranslations.title.ko : learnMoreTranslations.title.en}
            </span>
            <InsightCards
              language={language}
              translations={learnMoreTranslations.card}
              tagOverride={t.insightTag}
              action={
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-1.5 text-[15px] text-[#111B12]/70 leading-relaxed rounded-full border border-[#111B12]/50 px-5 py-1.5 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer shrink-0"
                >
                  {isKo ? learnMoreTranslations.button.ko : learnMoreTranslations.button.en}
                  <Icons.CgArrowTopRight className="size-4" aria-hidden />
                </Link>
              }
            />
          </div>
        </section>
      </main>
    </ServiceAccentProvider>
  );
}
