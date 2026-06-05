"use client";

/* ──────────────────────────────────────────────────────────────
   Our Values page — rebuilt 2026-05-29
   Cluster: about · canonical home for values (Decision 0529)
   Composition: 01 hero → 06 mission → B(full, 5) values → 06 promise
                → cluster cross-link → 08
   Pattern B: uniform cream + large watermark numerals + italic
              pull-quote (the system's only italic exception, per
              Decision 0529).
   ────────────────────────────────────────────────────────────── */

import { useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { valuesPageTranslations } from "@/app/utils/pageValuesUtils";
import SectionReveal from "@/app/components/SectionReveal";
import { useScrollProgress } from "@/app/hooks/useScrollProgress";
import * as Icons from "@/app/utils/icons";

/* ──────────────────────────────────────────────────────────────
   ValueRow — extracted so each row can carry its own scroll-progress
   ref and drive the watermark numeral's horizontal parallax.
   Scrolling down: numeral drifts right; scrolling up: drifts back.
   Range -64px → +64px across viewport traversal.
   prefers-reduced-motion is honored by the hook (stays at 0).
   ────────────────────────────────────────────────────────────── */
function ValueRow({
  value,
  isKo,
  isLast,
}: {
  value: (typeof valuesPageTranslations.values)[number];
  isKo: boolean;
  isLast: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const progress = useScrollProgress(ref);
  const translateX = -64 + progress * 128;

  const title = isKo ? value.title.ko : value.title.en;
  const statement = isKo ? value.statement.ko : value.statement.en;
  const body = isKo ? value.body.ko : value.body.en;

  return (
    <article
      ref={ref}
      className="relative py-12 md:py-16 lg:py-20 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start"
    >
      <div
        aria-hidden
        className="md:col-span-3 leading-none font-normal select-none pointer-events-none will-change-transform"
        style={{
          fontSize: "clamp(120px, 18vw, 280px)",
          color: "#627F38",
          opacity: 0.18,
          letterSpacing: "-0.04em",
          transform: `translateX(${translateX}px)`,
          transition: "transform 120ms linear",
        }}
      >
        {value.number}
      </div>

      <div className="md:col-span-9 flex flex-col">
        <p
          className="text-[18px] md:text-[22px] lg:text-[24px] 2xl:text-[28px] text-[#495F2B] leading-[1.4] mb-5 md:mb-6"
          style={{ fontStyle: "italic" }}
        >
          &ldquo;{statement}&rdquo;
        </p>
        <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.2] mb-4">
          {title}
        </h2>
        <p className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/75 leading-[1.7] max-w-3xl 2xl:max-w-4xl">
          {body}
        </p>
      </div>

      {!isLast && (
        <div
          aria-hidden
          className="md:col-span-12 mt-8 md:mt-12"
          style={{ borderTop: "1px solid rgba(17,27,18,0.10)" }}
        />
      )}
    </article>
  );
}

const CROSS_LINKS = [
  { href: "/about", labelEn: "Our story", labelKo: "우리의 이야기" },
  { href: "/leadership", labelEn: "Our leadership", labelKo: "우리의 리더십" },
];

export default function OurValuesPage() {
  const { language } = useLanguage();
  const t = valuesPageTranslations;
  const isKo = language === "KOR";

  return (
    <main className="min-h-screen bg-white">

      {/* ─── Pattern 01 (about · v5) — lines only ─── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: "#F9F8F3",
          backgroundImage:
            "radial-gradient(ellipse 80% 80% at 70% 30%, rgba(229,229,189,0.50) 0%, rgba(229,229,189,0.12) 40%, transparent 70%)",
        }}
      >
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 w-full h-full hidden md:block"
          viewBox="0 0 1280 640"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <ellipse
            cx="980"
            cy="320"
            rx="320"
            ry="180"
            transform="rotate(-14 980 320)"
            stroke="#627F38"
            strokeOpacity="0.34"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <ellipse
            cx="1040"
            cy="320"
            rx="320"
            ry="180"
            transform="rotate(14 1040 320)"
            stroke="#627F38"
            strokeOpacity="0.24"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
          <path
            d="M -60 540 C 280 460, 580 520, 800 460 S 1180 420, 1360 480"
            stroke="#627F38"
            strokeOpacity="0.22"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-6 py-16 md:py-20 lg:py-24 min-h-[460px] md:min-h-[560px] lg:min-h-[640px] flex flex-col justify-center">
          <div className="flex flex-col max-w-3xl 2xl:max-w-5xl">
            <span className="text-[11px] md:text-[12px] 2xl:text-[14px] tracking-[0.22em] uppercase font-medium text-[#495F2B]/85 mb-6">
              {isKo ? "우리의 가치" : "Our Values"}
            </span>
            <h1 className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px] 2xl:text-[80px] font-normal text-[#495F2B] leading-[1.1] tracking-[-0.01em] md:whitespace-nowrap">
              {isKo
                ? "우리가 고수하는 다섯 가지 원칙"
                : "Five things we return to every day"}
            </h1>
            <p className="mt-6 md:mt-8 max-w-xl 2xl:max-w-2xl text-[15px] md:text-[17px] 2xl:text-[19px] text-[#111B12]/70 leading-[1.6]">
              {isKo
                ? "고객을 대하는 방식, 일을 마무리하는 방식, 동료와 협업하는 방식 — 매일같이 우리가 돌아오는 다섯 가지 원칙입니다."
                : "How we serve clients, how we finish work, how we treat each other — five principles we come back to every day."}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Pattern 06 — mission statement (full-bleed cream)
           SectionReveal moved INSIDE so the cream bg is static (no
           white flash during fade). */}
      <section className="w-full py-16 md:py-24 lg:py-28" style={{ backgroundColor: "#F9F8F3" }}>
        <SectionReveal>
          <div className="max-w-4xl 2xl:max-w-5xl mx-auto px-4 sm:px-6 md:px-6">
            <span className="block text-[14px] md:text-[15px] 2xl:text-[17px] font-semibold text-[#627F38] tracking-wide mb-4">
              {isKo ? t.missionLabel.ko : t.missionLabel.en}
            </span>
            <p className="text-[22px] sm:text-[26px] md:text-[30px] 2xl:text-[36px] text-[#111B12] leading-[1.45]">
              {isKo ? t.missionStatement.ko : t.missionStatement.en}
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* ─── Pattern B — Numbered values
           Bottom of section transitions toward leaf-pale via a radial
           wash positioned at the bottom edge → values list visually
           "warms" as the user reads downward, meeting the Promise
           section's top wash for a continuous tonal flow. */}
      <section
        className="relative w-full py-12 md:py-20 overflow-hidden"
        style={{
          backgroundColor: "#F0EEE2",
          backgroundImage:
            "radial-gradient(ellipse 160% 60% at 50% 100%, rgba(229,229,189,0.60) 0%, rgba(229,229,189,0.20) 35%, transparent 65%)",
        }}
      >
        {/* Decorative raster assets — positioned absolute, faded with a
            radial-gradient mask so they dissolve into the section toward
            text-bearing areas. Both desaturated and tinted toward olive
            so the file-cabinet photo (b1) reads as texture not subject.
            Hidden below md to keep mobile clean. */}
        {/* v3 (2026-06-03): photo backdrops (sa-2 / sa-3) removed — they
            were too literal in the editorial values context. Section
            reverts to the pure cream + leaf-pale wash treatment. */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
          {t.values.map((v, idx) => (
            <SectionReveal key={v.number}>
              <ValueRow
                value={v}
                isKo={isKo}
                isLast={idx === t.values.length - 1}
              />
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ─── Pattern 06 — promise (olive-deep, white text)
           Top of section has a leaf-pale wash that meets the values
           section's bottom wash → "kiss" transition, no hard line.
           Bottom stays solid olive-deep, anchoring before the
           cross-link (which now also uses olive-deep). */}
      <section
        className="w-full py-20 md:py-28 lg:py-32"
        style={{
          backgroundColor: "#495F2B",
          backgroundImage:
            "radial-gradient(ellipse 140% 50% at 50% 0%, rgba(229,229,189,0.22) 0%, rgba(229,229,189,0.06) 35%, transparent 65%)",
        }}
      >
        <SectionReveal>
          <div className="max-w-4xl 2xl:max-w-5xl mx-auto px-4 sm:px-6 md:px-6 text-center">
            <span className="block text-[14px] md:text-[15px] 2xl:text-[17px] font-semibold tracking-wide mb-5" style={{ color: "rgba(229,229,189,0.85)" }}>
              {isKo ? t.promiseLabel.ko : t.promiseLabel.en}
            </span>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] 2xl:text-[56px] font-normal text-white leading-[1.2] mb-6">
              {isKo ? t.promiseTitle.ko : t.promiseTitle.en}
            </h2>
            <p className="text-[16px] md:text-[18px] 2xl:text-[20px] text-white/85 leading-[1.7] max-w-3xl 2xl:max-w-4xl mx-auto">
              {isKo ? t.promiseBody.ko : t.promiseBody.en}
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[15px] 2xl:text-[17px] text-white border border-white/50 rounded-full px-6 py-2.5 hover:bg-white hover:text-[#495F2B] hover:border-white transition-colors duration-300"
              >
                {isKo ? t.ctaButton.ko : t.ctaButton.en}
                <Icons.CgArrowTopRight className="size-4 2xl:size-5" aria-hidden />
              </Link>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ─── Cluster cross-link — matches promise olive-deep, text white
           → no jarring return to white after the dark promise. The
           Footer's green QuestionsForm then sits naturally below. */}
      <section className="w-full py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#495F2B" }}>
        <SectionReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pt-8 md:pt-10 border-t border-white/15">
              <span className="text-[12px] 2xl:text-[14px] tracking-[0.15em] uppercase font-medium text-white/55">
                {isKo ? "다른 페이지" : "Continue with"}
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-2 sm:gap-x-10">
                {CROSS_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="inline-flex items-center gap-1.5 text-[15px] md:text-[16px] 2xl:text-[18px] text-white hover:text-[#E5E5BD] transition-colors duration-300"
                  >
                    {isKo ? l.labelKo : l.labelEn}
                    <Icons.CgArrowTopRight className="size-4 2xl:size-5" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

    </main>
  );
}
