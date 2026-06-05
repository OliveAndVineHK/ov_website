"use client";

/* ──────────────────────────────────────────────────────────────
   Leadership page — rebuilt 2026-05-29
   Cluster: about · canonical home for founders (Decision 0529)
   Composition: 01 hero (cream + kinetic typo) → 06 culture quote
                → A(full) founder cards → cluster cross-link → 08 closing
   Hero: no dedicated leadership-firm photo exists, so the about
         cluster's *fallback* hero pattern (cream + cycling word) ships.
   Pattern A: 140px thumbnail + text per card; career timeline lives
              only on the Full profile (/leadership/[slug]) per
              Decision 0529.
   ────────────────────────────────────────────────────────────── */

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { leadershipPageTranslations } from "@/app/utils/pageLeadershipUtils";
import { aboutPageTranslations } from "@/app/utils/pageAboutUtils";
import SectionReveal from "@/app/components/SectionReveal";
import * as Icons from "@/app/utils/icons";

/* Cluster cross-link — within the about family, point at the other two
   pages (not at services). Decision 0529's "07 cross-link" override. */
const CROSS_LINKS = [
  { href: "/about", labelEn: "Our story", labelKo: "우리의 이야기" },
  { href: "/our-values", labelEn: "Our values", labelKo: "우리의 가치" },
];

export default function LeadershipPage() {
  const { language } = useLanguage();
  const t = leadershipPageTranslations;
  const founders = aboutPageTranslations.founders;
  const isKo = language === "KOR";

  return (
    <main className="min-h-screen bg-white">

      {/* ─── Pattern 01 (about · v5) — lines only, more flowing ───
           v5 reset: drop all fills, return to v3 base (cream + lighting
           + ink headline). Line composition refined — fewer elements,
           more confident calligraphic curves, rounded line caps.
           Strokes vary subtly in weight to feel hand-drawn, not
           tech-diagram. */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: "#F0EEE2",
          backgroundImage:
            "radial-gradient(ellipse 90% 110% at 100% 0%, rgba(229,229,189,0.55) 0%, rgba(229,229,189,0.15) 35%, transparent 65%)",
        }}
      >
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 w-full h-full hidden md:block"
          viewBox="0 0 1280 640"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {/* One long flowing calligraphic curve — varied curvature via
              multiple bezier segments so it reads as a drawn line, not
              a basic shape. Rounded cap for refinement. */}
          <path
            d="M -40 220 C 220 80, 420 80, 620 240 S 980 460, 1340 320"
            stroke="#627F38"
            strokeOpacity="0.34"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          {/* A second quieter curve, offset and partial — a companion
              that gives the composition rhythm. */}
          <path
            d="M 380 580 C 600 460, 880 460, 1180 540"
            stroke="#627F38"
            strokeOpacity="0.20"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
          {/* Single tilted ellipse upper-right — asymmetric, not a
              concentric pair. Adds counterweight without being basic. */}
          <ellipse
            cx="1100"
            cy="150"
            rx="220"
            ry="155"
            transform="rotate(-22 1100 150)"
            stroke="#627F38"
            strokeOpacity="0.24"
            strokeWidth="0.7"
          />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-6 py-16 md:py-20 lg:py-24 min-h-[460px] md:min-h-[560px] lg:min-h-[640px] flex flex-col justify-center">
          <div className="flex flex-col max-w-3xl">
            <span className="text-[11px] md:text-[12px] 2xl:text-[14px] tracking-[0.22em] uppercase font-medium text-[#627F38]/85 mb-6">
              {isKo ? "리더십" : "Leadership"}
            </span>
            <h1 className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-normal text-[#495F2B] leading-[1.1] tracking-[-0.01em]">
              {isKo ? "회사를 세운 사람들" : "The people who built this firm"}
            </h1>
            <p className="mt-6 md:mt-8 max-w-xl 2xl:max-w-2xl text-[15px] md:text-[17px] 2xl:text-[19px] text-[#111B12]/70 leading-[1.6]">
              {isKo
                ? "사무소의 방향을 정하고, 모든 업무 뒤에 수십 년의 경험을 함께 더하는 두 명의 공동 창업자를 소개합니다."
                : "Meet the two co-founders who set the firm's direction and bring decades of experience to every engagement."}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Pattern 06 — culture quote
           v5 (2026-06-04): outer container now max-w-7xl (matches the
           founder-cards + cross-link sections below for left-edge
           alignment at wide viewports — was max-w-4xl, floating
           awkwardly center). Inner editorial box stays max-w-4xl so
           the line length stays readable. Quote text bumped to
           consulting-quote sizes so it reads as a proper pull-moment.
           Motion: slow from-top SectionReveal (900ms, 40px distance)
           gives the "appearing from nothing" feel. Corner brackets
           kept; quote.svg single opener kept. */}
      <section className="relative w-full py-20 md:py-28 lg:py-32 overflow-hidden" style={{ backgroundColor: "#F0EEE2" }}>
        <SectionReveal direction="down" duration={900} distance={40}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
            <div className="relative max-w-4xl mx-auto px-6 py-12 sm:px-10 sm:py-14 md:px-16 md:py-18 lg:px-20 lg:py-20">
              {/* Subtle olive hue backdrop — same gradient.png used on
                  the consulting quote, gives the text a soft lift. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: "url(/services/gradient.png)",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  opacity: 0.7,
                }}
              />
              <span aria-hidden className="absolute top-0 left-0 w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" style={{ borderTop: "1px solid #495F2B", borderLeft: "1px solid #495F2B" }} />
              <span aria-hidden className="absolute top-0 right-0 w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" style={{ borderTop: "1px solid #495F2B", borderRight: "1px solid #495F2B" }} />
              <span aria-hidden className="absolute bottom-0 left-0 w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" style={{ borderBottom: "1px solid #495F2B", borderLeft: "1px solid #495F2B" }} />
              <span aria-hidden className="absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" style={{ borderBottom: "1px solid #495F2B", borderRight: "1px solid #495F2B" }} />

              <div className="relative flex items-start gap-4 sm:gap-5 md:gap-7 lg:gap-8">
                <Image
                  src="/leadership/quote.svg"
                  alt=""
                  aria-hidden
                  width={56}
                  height={56}
                  className="object-contain shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mt-1"
                />
                <p className="text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] 2xl:text-[44px] font-normal text-[#111B12] leading-[1.35]">
                  {isKo ? t.culture.ko : t.culture.en}
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ─── Pattern A — founder cards (140px thumb + text, 2-up) ─── */}
      <section className="w-full py-12 md:py-20 lg:py-24" style={{ backgroundColor: "#F9F8F3" }}>
        <SectionReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
            <span className="block text-[14px] md:text-[15px] 2xl:text-[17px] font-semibold text-[#627F38] mb-3 tracking-wide">
              {isKo ? "주요 리더십" : "Our Leadership"}
            </span>
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.2] mb-10 md:mb-14">
              {isKo ? "두 사람이 함께 시작했습니다." : "Two people, one firm."}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
              {(["rebecca", "miyoung"] as const).map((key) => {
                const f = founders[key];
                const name = isKo ? f.name.ko : f.name.en;
                const role = isKo ? f.role.ko : f.role.en;
                const creds = isKo ? f.credentials.ko : f.credentials.en;
                const bio = isKo ? f.bio.ko : f.bio.en;
                return (
                  <article key={key} className="flex flex-row items-start gap-5 md:gap-6">
                    {/* 140px thumbnail with NE corner gesture — uses hover
                        portraits (r2/m2) per founder preference. */}
                    <div className="shrink-0 relative w-[110px] h-[140px] md:w-[120px] md:h-[150px] overflow-hidden" style={{ borderTopRightRadius: "30px" }}>
                      <Image
                        src={f.imageHover}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 110px, 120px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#627F38] mb-2">
                        {role}
                      </span>
                      <h3 className="text-[20px] md:text-[22px] font-medium text-[#111B12] leading-[1.25] mb-1.5">
                        {name}
                      </h3>
                      <p className="text-[12px] md:text-[13px] text-[#111B12]/55 mb-4">
                        {creds}
                      </p>
                      <p className="text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/75 leading-[1.65] mb-5">
                        {bio}
                      </p>
                      <Link
                        href={`/leadership/${f.slug}`}
                        className="inline-flex items-center gap-1.5 text-[14px] md:text-[15px] 2xl:text-[17px] text-[#495F2B] font-medium hover:text-[#436A1F] transition-colors duration-300"
                      >
                        {isKo ? "프로필 자세히 보기" : "Full profile"}
                        <Icons.CgArrowTopRight className="size-4" aria-hidden />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ─── Cluster cross-link — bg matches the founder-cards section
           above (cream) for smooth flow through the page. */}
      <section className="w-full py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#F9F8F3" }}>
        <SectionReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pt-8 md:pt-10 border-t border-[#111B12]/15">
              <span className="text-[12px] tracking-[0.15em] uppercase font-medium text-[#111B12]/50">
                {isKo ? "다른 페이지" : "Continue with"}
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-2 sm:gap-x-10">
                {CROSS_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="inline-flex items-center gap-1.5 text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12] hover:text-[#495F2B] transition-colors duration-300"
                  >
                    {isKo ? l.labelKo : l.labelEn}
                    <Icons.CgArrowTopRight className="size-4" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Pattern 08 closing — QuestionsForm + Footer rendered by app/layout.tsx */}
    </main>
  );
}
