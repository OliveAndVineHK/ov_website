"use client";

/* ──────────────────────────────────────────────────────────────
   Assurance service page — rebuilt 2026-05-28
   Variant of Pattern 02: C — Numbered process timeline
                            (7 common audit procedures, sequential)
   Plus a "Two pillars" supporting section for External vs Other Assurance.
   Composition: 01 hero → 02 procedures → two-pillars → 07 → 08
   Hero light angle: 50% 12%  with narrower ellipse (focused, steady)
   Hero base:        --ov-olive-steady (#3F4E22) — cool deep, steady
   Service icon:     "Eclipse" motion
   ────────────────────────────────────────────────────────────── */

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { assuranceServicePageTranslations } from "@/app/utils/pageAssuranceServiceUtils";
import { learnMoreTranslations, servicesTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import SectionReveal from "@/app/components/SectionReveal";
import ScrollLinkedStagger from "@/app/components/ScrollLinkedStagger";
import ServiceIconMotion from "@/app/components/ServiceIconMotion";
import CurveMotif from "@/app/components/CurveMotif";
import { ServiceAccentProvider, serviceColorMap } from "@/app/contexts/ServiceAccentContext";
import { useHeroLight } from "@/app/hooks/useHeroLight";
import * as Icons from "@/app/utils/icons";

const HERO_LIGHT_ASSURANCE = { defaultX: 50, defaultY: 12, ellipse: "55% 95%" };
const ASSURANCE_HERO_BASE = serviceColorMap.assurance.heroBase;

/* Related — for Assurance, the closest siblings are Accounting (records
   they audit), Tax (parallel compliance discipline), Corporate (entity
   governance context). */
const RELATED_SERVICES = [
  /* v2 (2026-06-04): rebalanced — from Assurance the cyclic triad is
     Tax (compliance audits), Consulting (advisory transactions), HR
     (HR/payroll audits). */
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
  {
    key: "service6" as const,
    href: "/hr-service",
    image: "/home/os-hr.svg",
    imageWhite: "/home/os-hr-w.svg",
    alt: "HR service icon",
  },
];

export default function AssuranceServicePage() {
  const { language } = useLanguage();
  const t = assuranceServicePageTranslations;
  const isKo = language === "KOR";

  const heroRef = useHeroLight(HERO_LIGHT_ASSURANCE);

  const heroTitle = isKo ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = isKo ? t.heroSubtitle.ko : t.heroSubtitle.en;
  const proceduresTitle = isKo ? t.commonAuditProceduresTitle.ko : t.commonAuditProceduresTitle.en;
  const proceduresDescription = isKo ? t.commonAuditProceduresDescription.ko : t.commonAuditProceduresDescription.en;
  const proceduresItems = isKo ? t.commonAuditProceduresItems.ko : t.commonAuditProceduresItems.en;

  /* Two-pillars section content — External Audit vs Other Assurance. */
  const pillars = [
    {
      label: isKo ? t.externalAuditTitle.ko : t.externalAuditTitle.en,
      whatIs: isKo ? t.whatIsExternalAuditDescription.ko : t.whatIsExternalAuditDescription.en,
      items: isKo ? t.externalAuditItems.ko : t.externalAuditItems.en,
    },
    {
      label: isKo ? t.otherAssuranceTitle.ko : t.otherAssuranceTitle.en,
      whatIs: isKo ? t.whatIsOtherAssuranceDescription.ko : t.whatIsOtherAssuranceDescription.en,
      items: isKo ? t.otherAssuranceItems.ko : t.otherAssuranceItems.en,
    },
  ];

  return (
    <ServiceAccentProvider serviceType="assurance">
      <main className="min-h-screen bg-white">

        {/* Pattern 01 — Split hero with narrow ellipse */}
        <section
          ref={heroRef}
          className="relative w-full overflow-hidden"
          style={{
            backgroundColor: ASSURANCE_HERO_BASE,
            backgroundImage:
              "radial-gradient(ellipse 55% 95% at 50% 12%, rgba(229,229,189,0.22) 0%, rgba(229,229,189,0.07) 35%, transparent 65%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 py-16 sm:py-20 md:py-28 lg:py-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center min-h-[420px] md:min-h-[520px] lg:min-h-[600px]">
              <div className="md:col-span-7 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src="/home/os-assurance-w.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="object-contain"
                    aria-hidden
                  />
                  <span className="text-[14px] sm:text-[15px] text-white/85 font-medium">
                    {isKo ? "서비스 · 03 / Assurance" : "Service · 03 / Assurance"}
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

              <div className="hidden md:flex md:col-span-5 items-center justify-center md:justify-end">
                <div className="relative aspect-square flex items-center justify-center w-[220px] md:w-[260px] lg:w-[340px] xl:w-[400px] transition-all duration-300">
                  <ServiceIconMotion
                    service="assurance"
                    tone="light"
                    label="Assurance service icon — Eclipse motion"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            aria-label={isKo ? "문의하기" : "Contact us"}
            className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 md:right-10 md:bottom-10 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white hover:text-[#495F2B] hover:border-white transition-colors duration-300"
          >
            <Icons.CgArrowTopRight className="size-6 md:size-7" aria-hidden />
          </Link>
        </section>

        {/* Pattern 02 Variant C — 7 audit procedures as numbered timeline
            v2 motion (2026-06-02): replaced the one-shot 80ms stagger with
            a scroll-driven reveal. Each numbered phase falls into the
            timeline as the user scrolls through the section, naturally
            tracing 01 → 07 from top to bottom. Reduced-motion users see
            the final state. */}
        <section className="relative w-full bg-white py-16 md:py-24 lg:py-28 overflow-hidden">
          <CurveMotif service="assurance" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
            {/* Heading row — slow from-top reveal on viewport entry. */}
            <SectionReveal direction="down" duration={700} distance={32}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-14 md:mb-20">
                <div className="md:col-span-5">
                  <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-4">
                    {proceduresTitle}
                  </span>
                  <h2 className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[32px] 2xl:text-[36px] font-normal text-[#111B12] leading-[1.25]">
                    {isKo
                      ? "세 가지 원칙, 모든 감사에 적용됩니다."
                      : "Three principles, every engagement."}
                  </h2>
                </div>
                <div className="md:col-span-7 flex items-center">
                  <p className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/70 leading-[1.65]">
                    {proceduresDescription}
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* v3 (2026-06-04): au2.svg moved from a centered full-width
                band to a sticky right column. As the user scrolls
                through the 7-phase timeline on the left, au2 fades in
                progressively (scroll-linked) and stays in view via
                md:sticky md:top-32. Outer ScrollLinkedStagger uses a
                unique selector (data-scroll-au2) so it doesn't fight
                the inner stagger that animates the timeline items. */}
            <ScrollLinkedStagger
              itemSelector="[data-scroll-au2]"
              range={[0.02, 0.28]}
              distance={24}
              className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16"
            >
              {/* Left col — timeline. col-6 split (was col-7) gives the
                  au2 diagram on the right enough room to read clearly. */}
              <div className="md:col-span-6 relative">
                <div
                  aria-hidden
                  className="absolute left-[15px] md:left-[19px] top-3 bottom-3 w-px"
                  style={{ backgroundColor: "rgba(98,127,56,0.35)" }}
                />
                <ScrollLinkedStagger
                  range={[0.05, 0.45]}
                  distance={28}
                >
                  <ol className="relative flex flex-col gap-10 md:gap-12 list-none pl-0">
                    {proceduresItems.map((phase, idx) => (
                      <li
                        key={idx}
                        data-scroll-item
                        className="grid grid-cols-[auto_1fr] gap-5 md:gap-8 items-start"
                      >
                        <span
                          aria-hidden
                          className="inline-flex items-center justify-center w-[30px] h-[30px] md:w-[38px] md:h-[38px] rounded-full text-[12px] md:text-[13px] font-semibold relative z-10"
                          style={{ backgroundColor: "#495F2B", color: "#FFFFFF" }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="text-[18px] md:text-[20px] 2xl:text-[22px] font-semibold text-[#111B12] leading-[1.3] mb-2 md:mb-3">
                            {phase.title}
                          </h3>
                          <p className="text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/70 leading-[1.6]">
                            {phase.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </ScrollLinkedStagger>
              </div>

              {/* Right col — sticky au2. v5 (2026-06-04): filter removed
                  per user — original multi-hue bubbles read clearer
                  than the olive-monotone version. Size bumped further
                  so the diagram lands as visibly as the timeline beside
                  it. */}
              <div className="hidden md:block md:col-span-6">
                <div className="md:sticky md:top-[15vh] flex justify-end lg:translate-x-4 2xl:translate-x-10">
                  <Image
                    src="/services/au2.svg"
                    alt={isKo ? "감사 업무 영역 다이어그램" : "Audit work categories diagram"}
                    width={1280}
                    height={854}
                    data-scroll-au2
                    className="w-full max-w-[540px] lg:max-w-[700px] 2xl:max-w-[860px] h-auto"
                  />
                </div>
              </div>
            </ScrollLinkedStagger>
          </div>
        </section>

        {/* Two-pillars supporting section — External Audit vs Other Assurance.
            Cream-deep surface; 2-col with each pillar getting its own definition
            and bullet list. Quiet, no curve motif (already used Pattern 02 above). */}
        <SectionReveal>
          <section className="w-full py-12 md:py-20 lg:py-24" style={{ backgroundColor: "#F0EEE2" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              <h2 className="text-[22px] sm:text-[24px] md:text-[26px] font-normal text-[#111B12] leading-[1.25] mb-10 md:mb-12 max-w-3xl">
                {isKo
                  ? "두 갈래의 Assurance. 법정 감사와 그 외의 검증 업무로 나뉩니다."
                  : "Two pillars: statutory audits and the work that surrounds them."}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                {pillars.map((p) => (
                  <div key={p.label} className="flex flex-col">
                    <h3 className="text-[20px] md:text-[22px] font-semibold text-[#495F2B] mb-4 pb-3" style={{ borderBottom: "1px solid rgba(17,27,18,0.20)" }}>
                      {p.label}
                    </h3>
                    <p className="text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/75 leading-[1.65] mb-5">
                      {p.whatIs}
                    </p>
                    <ul className="flex flex-col gap-2 list-none pl-0">
                      {p.items.map((item, i) => (
                        <li key={i} className="flex gap-2.5 items-start text-[13px] md:text-[14px] 2xl:text-[16px] text-[#111B12]/80 leading-[1.55]">
                          <span
                            aria-hidden
                            className="inline-block shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                            style={{ backgroundColor: "#627F38" }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Pattern 07 — Related services */}
        <SectionReveal>
          <section className="w-full bg-white py-16 md:py-24 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-3">
                {isKo ? "관련 서비스" : "Related services"}
              </span>
              <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.15] mb-10 md:mb-12">
                {isKo ? "함께 살펴보기" : "Explore alongside Assurance"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {RELATED_SERVICES.map((svc) => {
                  const copy = servicesTranslations[svc.key];
                  return (
                    <Link
                      key={svc.key}
                      href={svc.href}
                      className="group w-full min-h-[330px] bg-[#F9F8F4] border border-[#627F38] p-6 flex flex-col hover:bg-[#627F38] hover:rounded-tr-[30px] transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex justify-start mb-4 relative">
                        <Image src={svc.image} alt={svc.alt} width={80} height={80} className="object-contain group-hover:opacity-0 transition-opacity duration-300" />
                        <Image src={svc.imageWhite} alt="" aria-hidden width={80} height={80} className="object-contain absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

        {/* Pattern 08 — Insights row */}
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
