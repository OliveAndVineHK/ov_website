"use client";

/* ──────────────────────────────────────────────────────────────
   Corporate service page — rebuilt 2026-05-28
   Variant of Pattern 02: E — Lifecycle 3-stage
                            (Start Up / In Business / Exit — F10 promoted)
   Plus a small "Digitalisation" philosophy callout below.
   Composition: 01 hero → 02 lifecycle → digitalisation → 07 → 08
   Hero light angle: 18% 18%  (eastern early-day)
   Hero base:        --ov-olive-rooted (#2E3F18) — deepest, structural
   Service icon:     "Embrace" motion
   ────────────────────────────────────────────────────────────── */

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { corporateServicePageTranslations } from "@/app/utils/pageCorporateServiceUtils";
import { learnMoreTranslations, servicesTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import SectionReveal from "@/app/components/SectionReveal";
import ScrollLinkedStagger from "@/app/components/ScrollLinkedStagger";
import ServiceIconMotion from "@/app/components/ServiceIconMotion";
import CurveMotif from "@/app/components/CurveMotif";
import { ServiceAccentProvider, serviceColorMap } from "@/app/contexts/ServiceAccentContext";
import { useHeroLight } from "@/app/hooks/useHeroLight";
import * as Icons from "@/app/utils/icons";

const HERO_LIGHT_CORPORATE = { defaultX: 18, defaultY: 18 };
const CORPORATE_HERO_BASE = serviceColorMap.corporate.heroBase;

const RELATED_SERVICES = [
  {
    key: "accounting" as const,
    href: "/accounting-service",
    image: "/home/os-accounting.svg",
    imageWhite: "/home/os-accounting-w.svg",
    alt: "Accounting service icon",
  },
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
];

export default function CorporateServicePage() {
  const { language } = useLanguage();
  const t = corporateServicePageTranslations;
  const isKo = language === "KOR";

  const heroRef = useHeroLight(HERO_LIGHT_CORPORATE);

  const heroTitle = isKo ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = isKo ? t.heroSubtitle.ko : t.heroSubtitle.en;

  /* Lifecycle 3-stage — Variant E.
     The lifecycle band tint progresses lightest → deepest across the
     three columns to read as a journey through time. */
  const lifecycle = [
    {
      label: isKo ? t.startUp.ko : t.startUp.en,
      description: isKo ? t.startUpDescription.ko : t.startUpDescription.en,
      items: isKo ? t.startUpItems.ko : t.startUpItems.en,
      band: "#E5E5BD",  // leaf-pale — beginning, lightest
    },
    {
      label: isKo ? t.inBusiness.ko : t.inBusiness.en,
      description: isKo ? t.inBusinessDescription.ko : t.inBusinessDescription.en,
      items: isKo ? t.inBusinessItems.ko : t.inBusinessItems.en,
      band: "#627F38",  // olive — the long middle
    },
    {
      label: isKo ? t.exit.ko : t.exit.en,
      description: isKo ? t.exitDescription.ko : t.exitDescription.en,
      items: isKo ? t.exitItems.ko : t.exitItems.en,
      band: "#495F2B",  // olive-deep — closing
    },
  ];

  const digitalisationTitle = isKo ? t.digitalisationTitle.ko : t.digitalisationTitle.en;
  const digitalisationDescription = isKo ? t.digitalisationDescription.ko : t.digitalisationDescription.en;

  return (
    <ServiceAccentProvider serviceType="corporate">
      <main className="min-h-screen bg-white">

        {/* Pattern 01 — Split hero */}
        <section
          ref={heroRef}
          className="relative w-full overflow-hidden"
          style={{
            backgroundColor: CORPORATE_HERO_BASE,
            backgroundImage:
              "radial-gradient(ellipse 80% 90% at 18% 18%, rgba(229,229,189,0.22) 0%, rgba(229,229,189,0.07) 35%, transparent 65%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 py-16 sm:py-20 md:py-28 lg:py-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center min-h-[420px] md:min-h-[520px] lg:min-h-[600px]">
              <div className="md:col-span-7 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src="/home/os-corporate-w.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="object-contain"
                    aria-hidden
                  />
                  <span className="text-[14px] sm:text-[15px] text-white/85 font-medium">
                    {isKo ? "서비스 · 01 / 기업 서비스" : "Service · 01 / Corporate"}
                  </span>
                </div>

                <h1 className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] xl:text-[96px] font-normal text-white leading-[1.05] tracking-[-0.01em]">
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
                    service="corporate"
                    tone="light"
                    label="Corporate service icon — Embrace motion"
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

        {/* Pattern 02 Variant E — Lifecycle 3-stage */}
        <SectionReveal>
          <section className="relative w-full bg-white py-16 md:py-24 lg:py-28 overflow-hidden">
            <CurveMotif service="corporate" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              {/* Heading row — slow from-top reveal. */}
              <SectionReveal direction="down" duration={700} distance={32}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-12 md:mb-16">
                  <div className="md:col-span-5">
                    <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-4">
                      {isKo ? "기업 생애 주기" : "Through every stage"}
                    </span>
                    <h2 className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[32px] 2xl:text-[36px] font-normal text-[#111B12] leading-[1.25]">
                      {isKo
                        ? "설립부터 운영, 정리까지 한 곳에서 관리해 드립니다."
                        : "Incorporation, trading, winding down — handled end to end."}
                    </h2>
                  </div>
                  <div className="md:col-span-7 flex items-start">
                    <p className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/70 leading-[1.65]">
                      {isKo
                        ? "대부분의 사무소는 회사 생애 주기의 한 시점에만 관여합니다. 저희는 설립, 운영, 정리 — 세 단계를 모두 함께하며, 단계가 바뀔 때마다 새로운 파트너를 찾을 필요가 없도록 합니다."
                        : "Most firms only show up at one moment of the corporate lifecycle. We stay with you across all three — incorporating the company, keeping it compliant while it trades, and winding it down cleanly when the time comes."}
                    </p>
                  </div>
                </div>
              </SectionReveal>

              {/* Lifecycle band — three columns. Each column has a thin
                  horizontal olive bar at the top whose tint progresses
                  through the lifecycle (light → mid → deep).
                  Scroll-driven stagger: Start Up → In Business → Exit
                  drop in one by one as the user scrolls through the
                  section, the speed tied to their scroll. */}
              <ScrollLinkedStagger
                className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
                range={[0.05, 0.35]}
                distance={36}
              >
                {lifecycle.map((stage, idx) => (
                  <div key={stage.label} data-scroll-item className="flex flex-col">
                    {/* Lifecycle band */}
                    <div
                      aria-hidden
                      className="h-[3px] w-full mb-6"
                      style={{ backgroundColor: stage.band }}
                    />
                    {/* Number + label */}
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-[12px] tracking-wide font-medium text-[#111B12]/50 uppercase">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[20px] md:text-[22px] font-semibold text-[#111B12] leading-[1.25]">
                        {stage.label}
                      </h3>
                    </div>
                    <p className="text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/70 leading-[1.6] mb-5">
                      {stage.description}
                    </p>
                    <ul className="flex flex-col gap-2 list-none pl-0">
                      {stage.items.map((item, i) => (
                        <li key={i} className="flex gap-2.5 items-start text-[13px] md:text-[14px] 2xl:text-[16px] text-[#111B12]/80 leading-[1.5]">
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
              </ScrollLinkedStagger>
            </div>
          </section>
        </SectionReveal>

        {/* Digitalisation — small philosophy callout.
            v2 (2026-06-03): t1.png (olive-ring banner) added as a
            left-side backdrop, providing a quiet decorative anchor for
            the section. Already pale on cream, so no tint filter — just
            opacity + radial-mask edge fade. */}
        <SectionReveal>
          <section className="relative w-full py-12 md:py-20 lg:py-24 overflow-hidden" style={{ backgroundColor: "#F0EEE2" }}>
            <div
              aria-hidden
              className="hidden md:block pointer-events-none absolute top-0 left-0 w-[520px] lg:w-[680px] 2xl:w-[820px] h-full"
              style={{
                backgroundImage: "url(/services/t1.png)",
                backgroundSize: "cover",
                backgroundPosition: "center right",
                backgroundRepeat: "no-repeat",
                opacity: 0.95,
                WebkitMaskImage:
                  "radial-gradient(ellipse 130% 130% at 0% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0) 95%)",
                maskImage:
                  "radial-gradient(ellipse 130% 130% at 0% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0) 95%)",
              }}
            />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
                <div className="md:col-span-5">
                  <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-4">
                    {isKo ? "철학" : "Philosophy"}
                  </span>
                  <h2 className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[32px] 2xl:text-[36px] font-normal text-[#111B12] leading-[1.25]">
                    {digitalisationTitle}
                  </h2>
                </div>
                <div className="md:col-span-7">
                  <p
                    className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/75 leading-[1.7]"
                    dangerouslySetInnerHTML={{ __html: digitalisationDescription }}
                  />
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
                {isKo ? "함께 살펴보기" : "Explore alongside Corporate"}
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
