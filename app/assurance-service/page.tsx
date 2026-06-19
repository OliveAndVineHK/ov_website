"use client";

/* ──────────────────────────────────────────────────────────────
   Assurance service page — redesigned 2026-06-16
   Source of truth: Assurance.docx redesign brief (founder-authored).
   Composition: 01 hero → approach (intro · philosophy · value)
              → audit methodology (4-step vertical cards + supporting)
              → what we deliver (3 groups) → FAQ → 07 related → 08 insights
   Hero light angle: 50% 12% with narrow ellipse (focused, steady)
   Hero base:        serviceColorMap.assurance.heroBase
   Service icon:     "Eclipse" motion
   Design rules:     docs/design-system (no shadow/blur/linear-gradient,
                     single olive hue family, radial light only).
   ────────────────────────────────────────────────────────────── */

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { assuranceServicePageTranslations } from "@/app/utils/pageAssuranceServiceUtils";
import { learnMoreTranslations, servicesTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import FaqAccordion from "@/app/components/FaqAccordion";
import SectionReveal from "@/app/components/SectionReveal";
import ScrollLinkedStagger from "@/app/components/ScrollLinkedStagger";
import ServiceIconMotion from "@/app/components/ServiceIconMotion";
import CurveMotif from "@/app/components/CurveMotif";
import { ServiceAccentProvider, serviceColorMap } from "@/app/contexts/ServiceAccentContext";
import { useHeroLight } from "@/app/hooks/useHeroLight";
import * as Icons from "@/app/utils/icons";

const HERO_LIGHT_ASSURANCE = { defaultX: 50, defaultY: 12, ellipse: "55% 95%" };
const ASSURANCE_HERO_BASE = serviceColorMap.assurance.heroBase;

/* Related — for Assurance the cyclic triad is Tax (compliance audits),
   Consulting (advisory transactions), HR (HR/payroll audits). */
const RELATED_SERVICES = [
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

  /* Approach sub-blocks — Audit Philosophy + Value Beyond the Audit. */
  const approachBlocks = [
    {
      title: isKo ? t.auditPhilosophyTitle.ko : t.auditPhilosophyTitle.en,
      body: isKo ? t.auditPhilosophy.ko : t.auditPhilosophy.en,
    },
    {
      title: isKo ? t.valueBeyondTitle.ko : t.valueBeyondTitle.en,
      body: isKo ? t.valueBeyond.ko : t.valueBeyond.en,
    },
  ];

  /* Audit methodology — 4 vertical stacked steps. The numbered nodes
     progress light → deep down the journey (single olive hue family),
     mirroring the corporate lifecycle nodes. */
  const methodologySteps = isKo ? t.methodologySteps.ko : t.methodologySteps.en;
  const methodologyStepTints = [
    { band: "#E5E5BD", fg: "#495F2B" }, // leaf-pale — start
    { band: "#648E3E", fg: "#FFFFFF" },
    { band: "#627F38", fg: "#FFFFFF" },
    { band: "#495F2B", fg: "#FFFFFF" }, // olive-deep — completion
  ];

  /* What we deliver — three groups of bullets. */
  const deliverGroups = [
    {
      label: isKo ? t.externalAuditTitle.ko : t.externalAuditTitle.en,
      items: isKo ? t.externalAuditItems.ko : t.externalAuditItems.en,
    },
    {
      label: isKo ? t.otherAssuranceTitle.ko : t.otherAssuranceTitle.en,
      items: isKo ? t.otherAssuranceItems.ko : t.otherAssuranceItems.en,
    },
    {
      label: isKo ? t.advisoryTitle.ko : t.advisoryTitle.en,
      items: isKo ? t.advisoryItems.ko : t.advisoryItems.en,
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

        {/* ── Our approach — Introduction lead + Philosophy / Value blocks.
            Text-led (premium professional tone), CurveMotif on the right. */}
        <SectionReveal>
          <section className="relative w-full bg-white py-16 md:py-24 lg:py-28 overflow-hidden">
            <CurveMotif service="assurance" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              <SectionReveal direction="down" duration={700} distance={32}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-12 md:mb-14">
                  <div className="md:col-span-5">
                    <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-4">
                      {isKo ? t.approachEyebrow.ko : t.approachEyebrow.en}
                    </span>
                    <h2 className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[32px] 2xl:text-[36px] font-normal text-[#111B12] leading-[1.25]">
                      {isKo ? t.approachHeading.ko : t.approachHeading.en}
                    </h2>
                  </div>
                  <div className="md:col-span-7 flex items-start">
                    <p className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/70 leading-[1.7] whitespace-pre-line text-justify">
                      {isKo ? t.introduction.ko : t.introduction.en}
                    </p>
                  </div>
                </div>
              </SectionReveal>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
                <div className="hidden md:block md:col-span-5" aria-hidden />
                <ScrollLinkedStagger
                  className="md:col-span-7 flex flex-col gap-10 md:gap-12"
                  range={[0.05, 0.4]}
                  distance={28}
                >
                  {approachBlocks.map((block) => (
                    <div key={block.title} data-scroll-item className="flex flex-col">
                      <h3 className="text-[18px] md:text-[20px] 2xl:text-[22px] font-semibold text-[#495F2B] mb-3">
                        {block.title}
                      </h3>
                      <p className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/70 leading-[1.7] whitespace-pre-line text-justify">
                        {block.body}
                      </p>
                    </div>
                  ))}
                </ScrollLinkedStagger>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* ── Audit Methodology — 4-step vertical stacked cards + supporting
            paragraph block. Visually differentiated cream surface; structured
            and scannable (per the docx design brief). */}
        <SectionReveal>
          <section className="w-full py-16 md:py-24 lg:py-28" style={{ backgroundColor: "#F0EEE2" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              <SectionReveal direction="down" duration={700} distance={32}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-12 md:mb-16">
                  <div className="md:col-span-5">
                    <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-4">
                      {isKo ? t.methodologyEyebrow.ko : t.methodologyEyebrow.en}
                    </span>
                    <h2 className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[32px] 2xl:text-[36px] font-normal text-[#111B12] leading-[1.25]">
                      {isKo ? t.methodologyHeading.ko : t.methodologyHeading.en}
                    </h2>
                  </div>
                  <div className="md:col-span-7 flex items-start">
                    <p className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/70 leading-[1.7] whitespace-pre-line text-justify">
                      {isKo ? t.methodologyIntro.ko : t.methodologyIntro.en}
                    </p>
                  </div>
                </div>
              </SectionReveal>

              {/* 4-step numbered timeline — aligned to the right reading
                  column (col-7) so it lines up with the intro and supporting
                  paragraphs. A hairline connects the numbered nodes; no boxed
                  cards (keeps the cream surface uninterrupted). */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
                <div className="hidden md:block md:col-span-5" aria-hidden />
                <div className="md:col-span-7 relative">
                  <div
                    aria-hidden
                    className="absolute left-[15px] md:left-[19px] top-3 bottom-3 w-px"
                    style={{ backgroundColor: "rgba(98,127,56,0.35)" }}
                  />
                  <ScrollLinkedStagger range={[0.05, 0.45]} distance={28}>
                    <ol className="relative flex flex-col gap-10 md:gap-12 list-none pl-0">
                      {methodologySteps.map((step, idx) => (
                        <li
                          key={idx}
                          data-scroll-item
                          className="grid grid-cols-[auto_1fr] gap-5 md:gap-8 items-start"
                        >
                          <span
                            aria-hidden
                            className="inline-flex items-center justify-center w-[30px] h-[30px] md:w-[38px] md:h-[38px] rounded-full text-[12px] md:text-[13px] font-semibold relative z-10"
                            style={{
                              backgroundColor:
                                methodologyStepTints[idx % methodologyStepTints.length].band,
                              color:
                                methodologyStepTints[idx % methodologyStepTints.length].fg,
                            }}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h3 className="text-[18px] md:text-[20px] 2xl:text-[22px] font-semibold text-[#111B12] leading-[1.3] mb-2 md:mb-3">
                              {step.title}
                            </h3>
                            <p className="text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/70 leading-[1.6]">
                              {step.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </ScrollLinkedStagger>
                </div>
              </div>

              {/* Supporting paragraph block — clearly separated from the steps */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mt-12 md:mt-16">
                <div className="hidden md:block md:col-span-5" aria-hidden />
                <div className="md:col-span-7 border-t border-[#627F38]/30 pt-6">
                  <p className="text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/70 leading-[1.7] whitespace-pre-line text-justify">
                    {isKo ? t.methodologySupporting.ko : t.methodologySupporting.en}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* ── What We Deliver — three groups (External Audit · Other
            Assurance · Advisory). */}
        <SectionReveal>
          <section className="w-full bg-white py-16 md:py-24 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-3">
                {isKo ? t.deliverEyebrow.ko : t.deliverEyebrow.en}
              </span>
              <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.15] mb-10 md:mb-14">
                {isKo ? t.deliverHeading.ko : t.deliverHeading.en}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
                {deliverGroups.map((group) => (
                  <div key={group.label} className="flex flex-col">
                    <h3 className="text-[20px] md:text-[22px] font-semibold text-[#495F2B] mb-4 pb-3" style={{ borderBottom: "1px solid rgba(17,27,18,0.20)" }}>
                      {group.label}
                    </h3>
                    <ul className="flex flex-col gap-2.5 list-none pl-0">
                      {group.items.map((item, i) => (
                        <li key={i} className="flex gap-2.5 items-start text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/80 leading-[1.55]">
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
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* ── FAQ — reuses FaqAccordion (same asset as HR). 5/7 split with a
            sticky heading on the left, accordion on the right. */}
        <SectionReveal>
          <section className="w-full bg-white py-12 md:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
                <div className="md:col-span-5">
                  <div>
                    <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-3">
                      {isKo ? t.faq.title.ko : t.faq.title.en}
                    </span>
                    <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.15]">
                      {isKo ? t.faq.subtitle.ko : t.faq.subtitle.en}
                    </h2>
                  </div>
                </div>
                <div className="md:col-span-7">
                  <FaqAccordion items={t.faq.items} language={language} />
                </div>
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

              <div className="flex justify-end mt-10 md:mt-12">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/70 leading-relaxed rounded-full border border-[#111B12]/50 px-5 py-1.5 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer shrink-0"
                >
                  {isKo ? servicesTranslations.button.ko : servicesTranslations.button.en}
                  <Icons.CgArrowTopRight className="size-4" aria-hidden />
                </Link>
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
