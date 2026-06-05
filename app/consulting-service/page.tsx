"use client";

/* ──────────────────────────────────────────────────────────────
   Consulting service page — rebuilt 2026-05-28
   Variant of Pattern 02: F — Numbered methodology cards (2-col grid)
                            Differentiated from Assurance's Variant C
                            (vertical timeline) so the two pages don't
                            read identically.
   Composition: 01 hero → 02 methodology cards → centered quote moment
                → adjunct offerings → 07 → 08
   Hero light angle: 72% 72%  (forward, afternoon)
   Hero base:        --ov-olive-active (#648E3E) — brightest tint
   Service icon:     "Ripple" motion
   ────────────────────────────────────────────────────────────── */

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { consultingServicePageTranslations } from "@/app/utils/pageConsultingServiceUtils";
import { learnMoreTranslations, servicesTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import SectionReveal from "@/app/components/SectionReveal";
import ScrollLinkedStagger from "@/app/components/ScrollLinkedStagger";
import ServiceIconMotion from "@/app/components/ServiceIconMotion";
import CurveMotif from "@/app/components/CurveMotif";
import { ServiceAccentProvider, serviceColorMap } from "@/app/contexts/ServiceAccentContext";
import { useHeroLight } from "@/app/hooks/useHeroLight";
import * as Icons from "@/app/utils/icons";

const HERO_LIGHT_CONSULTING = { defaultX: 72, defaultY: 72 };
const CONSULTING_HERO_BASE = serviceColorMap.consulting.heroBase;

/* Related services — for Consulting, the closest siblings are Corporate
   (governance work), Tax (advisory adjacency), and HR (Consulting already
   has an HR Service adjunct category, so it's a natural outbound link). */
const RELATED_SERVICES = [
  /* v2 (2026-06-04): rebalanced — Consulting's cyclic triad is HR
     (HR consulting), Corporate (M&A / governance transactions),
     Accounting (financial analysis). */
  {
    key: "service6" as const,
    href: "/hr-service",
    image: "/home/os-hr.svg",
    imageWhite: "/home/os-hr-w.svg",
    alt: "HR service icon",
  },
  {
    key: "corporate" as const,
    href: "/corporate-service",
    image: "/home/os-corporate.svg",
    imageWhite: "/home/os-corporate-w.svg",
    alt: "Corporate service icon",
  },
  {
    key: "accounting" as const,
    href: "/accounting-service",
    image: "/home/os-accounting.svg",
    imageWhite: "/home/os-accounting-w.svg",
    alt: "Accounting service icon",
  },
];

export default function ConsultingServicePage() {
  const { language } = useLanguage();
  const t = consultingServicePageTranslations;
  const isKo = language === "KOR";

  const heroRef = useHeroLight(HERO_LIGHT_CONSULTING);

  const heroTitle = isKo ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = isKo ? t.heroSubtitle.ko : t.heroSubtitle.en;
  const methodologyTitle = isKo ? t.methodologyTitle.ko : t.methodologyTitle.en;
  const methodologyDescription = isKo ? t.methodologyDescription.ko : t.methodologyDescription.en;
  const methodologyItems = isKo ? t.methodologyItems.ko : t.methodologyItems.en;
  const innovatingTitle = isKo ? t.innovatingTitle.ko : t.innovatingTitle.en;

  const adjunct = [
    {
      label: isKo ? t.internalTitle.ko : t.internalTitle.en,
      items: isKo ? t.internalItems.ko : t.internalItems.en,
    },
    {
      label: isKo ? t.hrServiceTitle.ko : t.hrServiceTitle.en,
      items: isKo ? t.hrServiceItems.ko : t.hrServiceItems.en,
    },
    {
      label: isKo ? t.othersTitle.ko : t.othersTitle.en,
      items: isKo ? t.othersItems.ko : t.othersItems.en,
    },
  ];

  return (
    <ServiceAccentProvider serviceType="consulting">
      <main className="min-h-screen bg-white">

        {/* Pattern 01 — Split hero */}
        <section
          ref={heroRef}
          className="relative w-full overflow-hidden"
          style={{
            backgroundColor: CONSULTING_HERO_BASE,
            backgroundImage:
              "radial-gradient(ellipse 80% 90% at 72% 72%, rgba(229,229,189,0.22) 0%, rgba(229,229,189,0.07) 35%, transparent 65%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 py-16 sm:py-20 md:py-28 lg:py-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center min-h-[420px] md:min-h-[520px] lg:min-h-[600px]">
              <div className="md:col-span-7 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src="/home/os-consulting-w.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="object-contain"
                    aria-hidden
                  />
                  <span className="text-[14px] sm:text-[15px] text-white/85 font-medium">
                    {isKo ? "서비스 · 05 / 컨설팅" : "Service · 05 / Consulting"}
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
                    service="consulting"
                    tone="light"
                    label="Consulting service icon — Ripple motion"
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

        {/* Pattern 02 Variant F — Numbered methodology cards (2-col grid)
            Replaces the vertical timeline that was too visually similar to
            Assurance's procedures section. Chunky 5 phases get card space.
            v3 (2026-06-03): a1.svg (olive circle-tile pattern) added at
            bottom-right — it fills the visual gap the 2+2+1 grid leaves
            beside the 5th card and ties the consulting page to the
            about-cluster's motif language. */}
        <SectionReveal>
          <section className="relative w-full bg-white py-16 md:py-24 lg:py-28 overflow-hidden">
            <CurveMotif service="consulting" />
            <div
              aria-hidden
              className="hidden md:block pointer-events-none absolute bottom-0 right-0 w-[380px] lg:w-[480px] 2xl:w-[580px] h-[360px] lg:h-[440px] 2xl:h-[520px]"
              style={{
                backgroundImage: "url(/services/a1.svg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                opacity: 0.32,
                WebkitMaskImage:
                  "radial-gradient(ellipse 110% 110% at 100% 100%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0) 85%)",
                maskImage:
                  "radial-gradient(ellipse 110% 110% at 100% 100%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0) 85%)",
              }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              {/* Eyebrow + lede (heading lives in the centered quote below)
                  Motion: slow from-top reveal on viewport entry. */}
              <SectionReveal direction="down" duration={700} distance={32}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-12 md:mb-16">
                  <div className="md:col-span-5">
                    <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-4">
                      {methodologyTitle}
                    </span>
                    <h2 className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[32px] 2xl:text-[36px] font-normal text-[#111B12] leading-[1.25]">
                      {isKo
                        ? "다섯 단계, 하나의 원칙."
                        : "Five steps, one discipline."}
                    </h2>
                  </div>
                  <div className="md:col-span-7 flex items-start">
                    <p className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/70 leading-[1.65]">
                      {methodologyDescription}
                    </p>
                  </div>
                </div>
              </SectionReveal>

              {/* 2-col card grid. 5 phases → 2+2+1 layout.
                  Motion v2 (2026-06-03): switched from one-shot stagger
                  to scroll-driven reveal. Each card rises into place as
                  the user scrolls through the section, so 1→5 paces with
                  the reader rather than firing all at once. Wide range
                  [0.05, 0.85] gives the staircase plenty of viewport
                  travel so it feels deliberately slow. */}
              <ScrollLinkedStagger
                itemSelector="article"
                range={[0.05, 0.4]}
                distance={32}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10"
              >
                {methodologyItems.map((phase, idx) => (
                  <article
                    key={idx}
                    className="flex flex-col p-6 md:p-8 lg:p-10 bg-[#F9F8F4] border border-[#627F38]"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <span
                        aria-hidden
                        className="inline-flex items-center justify-center shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full text-[12px] md:text-[13px] font-semibold"
                        style={{ backgroundColor: "#495F2B", color: "#FFFFFF" }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[17px] md:text-[19px] font-semibold text-[#111B12] leading-[1.3] pt-1.5">
                        {phase.title}
                      </h3>
                    </div>
                    <p className="text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/70 leading-[1.65]">
                      {phase.description}
                    </p>
                  </article>
                ))}
              </ScrollLinkedStagger>
            </div>
          </section>
        </SectionReveal>

        {/* Centered quote moment — a single-page Pattern 06 light-surface
            variant. References the old Consulting page's pull-quote layout.
            Large olive typographic quotation marks bracket the line. */}
        <SectionReveal>
          <section className="relative w-full py-20 md:py-28 lg:py-32 overflow-hidden" style={{ backgroundColor: "#F0EEE2" }}>
            {/* v5 (2026-06-03): diagonal quote arrangement — opening quote
                (q2) anchored top-left of the quote text, closing quote
                (q1) anchored bottom-right. Smaller glyphs sit beside the
                text rather than stacking above/below — feels tighter and
                more editorial. gradient.png as a soft olive wash behind
                the text gives the quote line a subtle "hue" lift.
                Sizes scale down on small viewports so the quote glyphs
                never look oversized. */}
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 md:px-6">
              <div className="relative max-w-3xl mx-auto px-10 sm:px-14 md:px-20 lg:px-24 py-12 md:py-16 lg:py-20">
                {/* Soft elliptical hue behind the text — scaled to the
                    quote's bounding box, low priority, fades to edges. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage: "url(/services/gradient.png)",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.9,
                  }}
                />
                {/* Top-left opening quote (q2 = opening "6"-shaped) */}
                <Image
                  src="/services/q2.svg"
                  alt=""
                  aria-hidden
                  width={151}
                  height={113}
                  className="absolute top-0 left-0 w-[44px] sm:w-[56px] md:w-[72px] lg:w-[88px] h-auto"
                />
                {/* Quote text */}
                <h2
                  className="relative text-[24px] sm:text-[30px] md:text-[38px] lg:text-[44px] font-normal text-[#111B12] leading-[1.3] text-center"
                  dangerouslySetInnerHTML={{ __html: innovatingTitle }}
                />
                {/* Bottom-right closing quote (q1 = closing "9"-shaped) */}
                <Image
                  src="/services/q1.svg"
                  alt=""
                  aria-hidden
                  width={151}
                  height={113}
                  className="absolute bottom-0 right-0 w-[44px] sm:w-[56px] md:w-[72px] lg:w-[88px] h-auto"
                />
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Adjunct offerings — three categories of supporting work.
            White surface (since the quote section above is cream-deep —
            keeps the rhythm of alternating surfaces). Not a full Pattern 02
            instance (no curve motif), just a quiet three-column list. */}
        <SectionReveal>
          <section className="w-full bg-white py-12 md:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              <h2 className="text-[22px] sm:text-[24px] md:text-[26px] font-normal text-[#111B12] leading-[1.25] mb-8 md:mb-10 max-w-3xl">
                {isKo
                  ? "함께 제공하는 보조 업무"
                  : "Other services we offer alongside."}
              </h2>
              {/* Three adjunct columns — scroll-driven top-to-bottom reveal.
                  Each column falls into place from above as the user
                  scrolls through the section. */}
              <ScrollLinkedStagger
                range={[0.05, 0.35]}
                distance={32}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
              >
                {adjunct.map((cat) => (
                  <div key={cat.label} data-scroll-item className="flex flex-col">
                    <h3 className="text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#495F2B] mb-3 pb-3" style={{ borderBottom: "1px solid rgba(17,27,18,0.15)" }}>
                      {cat.label}
                    </h3>
                    <ul className="flex flex-col gap-2 list-none pl-0">
                      {cat.items.map((item, i) => (
                        <li key={i} className="flex gap-2.5 items-start text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/75 leading-[1.55]">
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
                {isKo ? "함께 살펴보기" : "Explore alongside Consulting"}
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

        {/* Pattern 08 — Insights row (Footer renders the rest) */}
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
