"use client";

/* ──────────────────────────────────────────────────────────────
   HR service page — rebuilt 2026-05-28
   Variant of Pattern 02: D — Image-led card grid
                            (5 offerings, each with its own /hr/ image
                             via the open-clause illustration substitution)
   Composition: 01 hero → 02 cards → FAQ → 07 → 08
   Hero light angle: 50% 80%  (warm hearth, bottom-center)
   Hero base:        --ov-olive-hearth (#6E7A33) — warm earthy tint
   Service icon:     "Orbit" motion
   ────────────────────────────────────────────────────────────── */

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { hrServicePageTranslations } from "@/app/utils/pageHrServiceUtils";
import { learnMoreTranslations, servicesTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import SectionReveal from "@/app/components/SectionReveal";
import ScrollLinkedStagger from "@/app/components/ScrollLinkedStagger";
import ServiceIconMotion from "@/app/components/ServiceIconMotion";
import CurveMotif from "@/app/components/CurveMotif";
import FaqAccordion from "@/app/components/FaqAccordion";
import { ServiceAccentProvider, serviceColorMap } from "@/app/contexts/ServiceAccentContext";
import { useHeroLight } from "@/app/hooks/useHeroLight";
import * as Icons from "@/app/utils/icons";

const HERO_LIGHT_HR = { defaultX: 50, defaultY: 80 };
const HR_HERO_BASE = serviceColorMap.hr.heroBase;

/* Per-card image map — uses the open clause: founder-supplied
   illustrations in /public/hr/ are wired into the Variant D cards.
   `fit` and `bg` are per-card because the assets are heterogeneous:
   most are wide panoramic illustrations that cover well on a cream
   surface; MPF.png is a small circular logo (152×152) that needs a
   white background and contain-fit so the circle isn't cropped. */
const CARD_IMAGE: Record<string, { src: string; fit: "cover" | "contain"; bg: string }> = {
  payroll:     { src: "/hr/payroll admin hovered.svg", fit: "cover",   bg: "#F9F8F4" },
  mpf:         { src: "/hr/MPF.png",                   fit: "contain", bg: "#FFFFFF" },
  recruitment: { src: "/hr/recruitment support.png",   fit: "cover",   bg: "#F9F8F4" },
  ir56:        { src: "/hr/employers tax return.png",  fit: "cover",   bg: "#F9F8F4" },
  compliance:  { src: "/hr/hr compliance.png",         fit: "cover",   bg: "#F9F8F4" },
};

const RELATED_SERVICES = [
  /* v2 (2026-06-04): rebalanced — HR's cyclic triad is Corporate
     (employment statutory), Accounting (payroll accounting),
     Assurance (HR / compliance audits). */
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
  {
    key: "assurance" as const,
    href: "/assurance-service",
    image: "/home/os-assurance.svg",
    imageWhite: "/home/os-assurance-w.svg",
    alt: "Assurance service icon",
  },
];

export default function HrServicePage() {
  const { language } = useLanguage();
  const t = hrServicePageTranslations;
  const isKo = language === "KOR";

  const heroRef = useHeroLight(HERO_LIGHT_HR);

  const heroTitle = isKo ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = isKo ? t.heroSubtitle.ko : t.heroSubtitle.en;

  const cardOrder: Array<keyof typeof t.cards> = ["payroll", "mpf", "recruitment", "ir56", "compliance"];

  return (
    <ServiceAccentProvider serviceType="hr">
      <main className="min-h-screen bg-white">

        {/* Pattern 01 — Split hero */}
        <section
          ref={heroRef}
          className="relative w-full overflow-hidden"
          style={{
            backgroundColor: HR_HERO_BASE,
            backgroundImage:
              "radial-gradient(ellipse 80% 90% at 50% 80%, rgba(229,229,189,0.22) 0%, rgba(229,229,189,0.07) 35%, transparent 65%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 py-16 sm:py-20 md:py-28 lg:py-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center min-h-[420px] md:min-h-[520px] lg:min-h-[600px]">
              <div className="md:col-span-7 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src="/home/os-hr-w.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="object-contain"
                    aria-hidden
                  />
                  <span className="text-[14px] sm:text-[15px] text-white/85 font-medium">
                    {isKo ? "서비스 · 06 / 인사" : "Service · 06 / HR"}
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
                    service="hr"
                    tone="light"
                    label="HR service icon — Orbit motion"
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

        {/* Pattern 02 Variant D — Image-led card grid */}
        <SectionReveal>
          <section className="relative w-full bg-white py-16 md:py-24 lg:py-28 overflow-hidden">
            <CurveMotif service="hr" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              {/* Top row — eyebrow + heading on the left, short lede on the
                  right. Same shape as Consulting / Assurance so the
                  page family has a recognisable rhythm.
                  Motion: slow from-top reveal on viewport entry. */}
              <SectionReveal direction="down" duration={700} distance={32}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-10 md:mb-14">
                  <div className="md:col-span-5">
                    <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-4">
                      {isKo ? "다루는 영역" : "What we handle"}
                    </span>
                    <h2 className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[32px] 2xl:text-[36px] font-normal text-[#111B12] leading-[1.25]">
                      {isKo
                        ? "급여, MPF, 비자까지 매월 반복되는 업무를 함께 처리합니다."
                        : "Payroll, MPF, visas — the work that recurs each month."}
                    </h2>
                  </div>
                  <div className="md:col-span-7 flex items-start">
                    <p className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/70 leading-[1.65]">
                      {isKo
                        ? "홍콩에서 사람을 고용한다는 것은 노동법, 세무, 출입국 규정을 동시에 다룬다는 의미입니다. 어느 한 부분이 어긋나면 나머지도 흔들리기 때문에, 다섯 영역을 한 팀에서 일관되게 관리해 드립니다."
                        : "Hiring in Hong Kong means handling labour law, tax, and immigration at the same time. Because one slip in any of them ripples into the others, we run all five areas from a single team."}
                    </p>
                  </div>
                </div>
              </SectionReveal>

              {/* Card grid — motion v2 mirrors consulting: scroll-driven
                  reveal so cards appear in DOM order (L→R, T→B on the
                  2/3-col grid) as the user scrolls through the section.
                  Range [0.05, 0.4] keeps the reveal completed well
                  before the user has scrolled past, so content is
                  readable while scrolling rather than only at the end. */}
              <ScrollLinkedStagger
                itemSelector="article"
                range={[0.05, 0.4]}
                distance={32}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {cardOrder.map((key) => {
                  const card = t.cards[key];
                  const title = isKo ? card.title.ko : card.title.en;
                  const items = isKo ? card.description.ko : card.description.en;
                  const img = CARD_IMAGE[key];
                  return (
                    <article
                      key={key}
                      className="flex flex-col bg-[#F9F8F4] border border-[#627F38] overflow-hidden"
                    >
                      {/* Image — fills the top of the card. Per-card bg
                          chosen to suit each asset (white for MPF's circular
                          logo; cream-card for the panoramic illustrations
                          so the image area is continuous with the card body). */}
                      <div
                        className="relative w-full aspect-[16/10] overflow-hidden"
                        style={{ backgroundColor: img.bg }}
                      >
                        <Image
                          src={img.src}
                          alt=""
                          aria-hidden
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className={img.fit === "contain" ? "object-contain" : "object-cover"}
                        />
                      </div>
                      <div className="flex flex-col gap-3 p-5 md:p-6 flex-grow">
                        <h3 className="text-[18px] md:text-[20px] 2xl:text-[22px] font-semibold text-[#111B12] leading-[1.3]">
                          {title}
                        </h3>
                        <ul className="flex flex-col gap-1.5 list-none pl-0">
                          {items.map((item, i) => (
                            <li key={i} className="flex gap-2 items-start text-[13px] md:text-[14px] 2xl:text-[16px] text-[#111B12]/75 leading-[1.5]">
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
                    </article>
                  );
                })}
              </ScrollLinkedStagger>
            </div>
          </section>
        </SectionReveal>

        {/* FAQ — reuses the existing FaqAccordion component.
            Layout v2 (2026-06-02): switched from centered max-w-4xl to
            the standard max-w-7xl 5/7 split used elsewhere on the page.
            Heading sits in the left column (sticky on lg+ so it stays
            visible while the user scans answers); the accordion fills
            the right column. On narrow viewports the heading stacks
            above the accordion. */}
        <SectionReveal>
          <section className="w-full bg-white py-12 md:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
                <div className="md:col-span-5">
                  <div className="lg:sticky lg:top-24">
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
          <section className="w-full bg-white py-12 md:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-3">
                {isKo ? "관련 서비스" : "Related services"}
              </span>
              <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.15] mb-10 md:mb-12">
                {isKo ? "함께 살펴보기" : "Explore alongside HR"}
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
