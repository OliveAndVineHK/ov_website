"use client";

/* ──────────────────────────────────────────────────────────────
   Home page — rebuilt 2026-06-03
   v2 changes:
   - Hero: typewriter dropped → static EN heading bottom-left,
     full-bleed leaf bg with bottom-left dark wash for legibility.
     Hero text stays English in both EN and KO modes (per spec).
   - About: "Olive & Vine" h2 → brand promise; trimmed description;
     "Read our story" link to /about. Layout untouched.
   - Integrity: AnimatedHeadline v2 (elegant cross-fade) carries
     the words Clarity / Integrity / Partnership.
   - All sections wrapped in SectionReveal so the page no longer
     feels static next to the rest of the site.
   - Eyebrow / h2 / body sizes harmonised with service + about
     cluster tokens.
   - Portfolio eyebrow re-labelled "Who we serve" (was "Portfolio").
   ────────────────────────────────────────────────────────────── */

import Link from "next/link";
import InsightCards from "@/app/components/InsightCards";
import ServiceCards from "@/app/components/ServiceCards";
import AnimatedHeadline from "@/app/components/AnimatedHeadline";
import SectionReveal from "@/app/components/SectionReveal";
import { useLanguage } from "@/app/contexts/LanguageContext";
import {
  aboutUsTranslations,
  integrityTranslations,
  portfolioTranslations,
  learnMoreTranslations,
  complianceTranslations,
  portfolioCardTranslations,
  servicesTranslations,
} from "@/app/utils/pageUtils";
import * as Icons from "@/app/utils/icons";
import { createBgStyle } from "@/app/utils/styleUtils";

export default function Home() {
  const { language } = useLanguage();
  const isKo = language === "KOR";

  const aboutBackgroundStyle = createBgStyle("/home/about-us.png");
  const integrityBackgroundStyle = createBgStyle("/home/integrity.png");

  return (
    <div className="min-h-screen bg-white">

      {/* ─── Hero — video bg, rounded corners, asymmetric notches.
           v7 (2026-06-04): smooth border-radius on all 4 corners +
           two white "notch" overlays at top-left and bottom-right
           per user. The notch overlays' inner corners are rounded
           too, so the cut reads as a soft step rather than a
           rectangular bite. Section's overflow-hidden clips the
           overlays' outer corner against the section's border-
           radius, so the outer edge inherits the smooth curve. */}
      <div className="w-full bg-white pt-3 md:pt-4 lg:pt-6 pb-3 md:pb-4 lg:pb-6 px-3 md:px-5 lg:px-8">
      <section
        className="relative w-full max-w-[1800px] mx-auto overflow-hidden rounded-[28px] md:rounded-[40px] lg:rounded-[56px] min-h-[560px] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[820px] flex"
      >
        {/* Video bg + dark wash — clipped by the section's rounded
            corners via overflow-hidden. */}
        <div aria-hidden className="absolute inset-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            // Static image fallback: while the video loads (or if it
            // fails to load on this browser) the leaf still-image
            // shows in its place so the hero never appears empty.
            poster="/home/home-bg.png"
          >
            <source src="/home/home-bg-movie.mp4" type="video/mp4" />
          </video>
          {/* Bottom-left dark wash for text legibility (radial-gradient
              only — linear-gradient is forbidden). */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 90% 100% at 0% 100%, rgba(17,27,18,0.60) 0%, rgba(17,27,18,0.25) 40%, transparent 72%)",
            }}
          />
        </div>

        {/* Notch overlays removed — uniform border-radius only.
            Asymmetric L-notches turned out too tricky to render
            correctly within the brand constraints; reverting to the
            simpler smooth rounded-corner card. */}

        {/* Content — flex justify-end aligns to bottom of section. */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-6 pt-24 pb-12 md:pb-16 lg:pb-20 flex flex-col justify-end">
          <SectionReveal direction="down" duration={800} distance={36}>
            <div className="flex flex-col max-w-3xl 2xl:max-w-5xl">
              <span className="text-[12px] md:text-[13px] 2xl:text-[15px] font-medium text-white/80 tracking-[0.22em] uppercase mb-6">
                Olive &amp; Vine · Hong Kong
              </span>
              <h1 className="text-[38px] sm:text-[52px] md:text-[64px] lg:text-[76px] 2xl:text-[88px] font-normal text-white leading-[1.05] tracking-[-0.01em]">
                Building
                <br />
                empowering
                <br />
                partnerships.
              </h1>
              <p className="mt-6 md:mt-8 max-w-xl text-[15px] sm:text-[16px] md:text-[18px] 2xl:text-[20px] text-white/85 leading-[1.55]">
                Accounting, tax, and advisory for businesses choosing Hong Kong.
              </p>
              <div className="mt-8 md:mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[15px] 2xl:text-[17px] text-white border border-white/55 rounded-full px-5 py-2 hover:bg-white hover:text-[#495F2B] hover:border-white transition-colors duration-300"
                >
                  Start a conversation
                  <Icons.CgArrowTopRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
      </div>

      {/* ─── About — brand promise (was "Olive & Vine" wordmark) ─── */}
      <SectionReveal>
        <section className="w-full py-16 md:py-24 lg:py-28" style={aboutBackgroundStyle}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 flex flex-col items-start">
            <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-4">
              {isKo ? aboutUsTranslations.title.ko : aboutUsTranslations.title.en}
            </span>
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.15] mb-6 md:mb-8">
              {isKo ? aboutUsTranslations.promise.ko : aboutUsTranslations.promise.en}
            </h2>
            <p className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/75 leading-[1.7] max-w-2xl mb-8">
              {isKo ? aboutUsTranslations.description.ko : aboutUsTranslations.description.en}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-[14px] md:text-[15px] 2xl:text-[17px] text-[#495F2B] font-medium hover:text-[#436A1F] transition-colors duration-300"
            >
              {isKo ? aboutUsTranslations.readMore.ko : aboutUsTranslations.readMore.en}
              <Icons.CgArrowTopRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>
      </SectionReveal>

      {/* ─── Services ─── */}
      <SectionReveal>
        <section className="w-full py-16 md:py-24 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 flex flex-col items-start">
            <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-3">
              {isKo ? servicesTranslations.title.ko : servicesTranslations.title.en}
            </span>
            <div className="w-full">
              <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.15]">
                {(isKo ? servicesTranslations.heading.ko : servicesTranslations.heading.en).split("\n")[0]}
              </h2>
              <div className="flex flex-wrap items-end justify-between gap-4 mt-1 w-full">
                <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.15]">
                  {(isKo ? servicesTranslations.heading.ko : servicesTranslations.heading.en).split("\n")[1]}
                </h2>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/70 leading-relaxed rounded-full border border-[#111B12]/50 px-5 py-1.5 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer shrink-0"
                >
                  {isKo ? servicesTranslations.button.ko : servicesTranslations.button.en}
                  <Icons.CgArrowTopRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
            <ServiceCards language={language} translations={servicesTranslations} />
          </div>
        </section>
      </SectionReveal>

      {/* ─── Who we serve (was "Portfolio") — asymmetric 2x2 ─── */}
      <SectionReveal>
        <section className="w-full py-16 md:py-24 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 flex flex-col items-start">
            <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-3">
              {isKo ? portfolioTranslations.title.ko : portfolioTranslations.title.en}
            </span>
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.15] mb-10 md:mb-12">
              {(isKo ? portfolioTranslations.heading.ko : portfolioTranslations.heading.en).split("\n").map((line, index, array) => (
                <span key={index}>
                  {line}
                  {index < array.length - 1 && <br />}
                </span>
              ))}
            </h2>
            {/* Asymmetric column ratios kept intentionally for editorial rhythm. */}
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
              <div key={ri} className={`w-full grid grid-cols-1 ${row.cols} gap-6 ${ri === 0 ? "mt-2" : "mt-6"}`}>
                {row.cards.map((card, ci) => {
                  const title = isKo ? card.title.ko : card.title.en;
                  const desc = isKo ? card.description.ko : card.description.en;
                  return (
                    <div key={ci} className="w-full min-h-64 md:h-100 relative overflow-hidden flex flex-col justify-end p-4 sm:p-5 md:p-6 cursor-pointer group">
                      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110" style={{ backgroundImage: `url(${card.bg})` }} />
                      <h3 className="relative z-10 text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] 2xl:text-[40px] font-normal text-white leading-[1.15] break-words">{title}</h3>
                      {desc && (
                        <p className="relative z-10 text-[14px] md:text-[15px] lg:text-[16px] 2xl:text-[18px] font-light text-white leading-[1.6] mt-3 md:mt-4 break-words line-clamp-4 lg:line-clamp-none">{desc}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* ─── Integrity — AnimatedHeadline v2 (Clarity / Integrity / Partnership) ─── */}
      <SectionReveal>
        <section className="w-full py-20 md:py-28 lg:py-32" style={integrityBackgroundStyle}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 flex flex-col items-center gap-8 md:gap-10">
            <AnimatedHeadline
              words={isKo ? integrityTranslations.words.ko : integrityTranslations.words.en}
              interval={3800}
            />
            <p
              className="text-[15px] md:text-[16px] lg:text-[18px] 2xl:text-[20px] text-white/90 leading-[1.7] max-w-3xl 2xl:max-w-4xl text-center"
              dangerouslySetInnerHTML={{ __html: isKo ? integrityTranslations.description.ko : integrityTranslations.description.en }}
            />
          </div>
        </section>
      </SectionReveal>

      {/* ─── Learn more — insights ─── */}
      <SectionReveal>
        <section className="w-full py-16 md:py-24 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 flex flex-col items-start">
            <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-3">
              {isKo ? learnMoreTranslations.title.ko : learnMoreTranslations.title.en}
            </span>
            <div className="w-full">
              <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.15]">
                {(isKo ? learnMoreTranslations.heading.ko : learnMoreTranslations.heading.en).split("\n")[0]}
              </h2>
              <div className="flex flex-wrap items-end justify-between gap-4 mt-1 w-full">
                <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.15]">
                  {(isKo ? learnMoreTranslations.heading.ko : learnMoreTranslations.heading.en).split("\n")[1]}
                </h2>
              </div>
            </div>
            <InsightCards
              language={language}
              translations={learnMoreTranslations.card}
              firstCardIntroductionXero
              secondCardAmendment
              thirdCardConsulting
              secondPageFirstCardDividendLegal
              action={
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-1.5 text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/70 leading-relaxed rounded-full border border-[#111B12]/50 px-5 py-1.5 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer shrink-0"
                >
                  {isKo ? learnMoreTranslations.button.ko : learnMoreTranslations.button.en}
                  <Icons.CgArrowTopRight className="size-4" aria-hidden />
                </Link>
              }
            />
          </div>
        </section>
      </SectionReveal>

      {/* ─── Compliance footer strip — unchanged ─── */}
      <section className="w-full py-8 sm:py-10 md:py-12 lg:py-14 bg-[#EFEFEF] mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 flex flex-col items-start">
          <p className="w-full text-[12px] md:text-[13px] 2xl:text-[15px] text-[#282A28] leading-[1.6]">
            {isKo ? complianceTranslations.title.ko : complianceTranslations.title.en}
            <br />
            <span className="text-[12px] md:text-[13px] 2xl:text-[15px] text-[#282A28]">
              {isKo ? complianceTranslations.description.ko : complianceTranslations.description.en}
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
