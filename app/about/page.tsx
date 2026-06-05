"use client";

/* ──────────────────────────────────────────────────────────────
   About page — rebuilt 2026-05-29
   Cluster: about · the integrator (Decision 0529)
   Composition: 01 hero (photo + typewriter) → 03 our-story
                → A(teaser) founders → B(teaser, 3) values
                → 06 principle → cluster cross-link → 08
   Owns: story.  Teases: founders (→/leadership), values (→/our-values).
   ────────────────────────────────────────────────────────────── */

import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { aboutPageTranslations } from "@/app/utils/pageAboutUtils";
import SectionReveal from "@/app/components/SectionReveal";
import ScrollLinkedStagger from "@/app/components/ScrollLinkedStagger";
import * as Icons from "@/app/utils/icons";

const CROSS_LINKS = [
  { href: "/leadership", labelEn: "Our leadership", labelKo: "우리의 리더십" },
  { href: "/our-values", labelEn: "Our values", labelKo: "우리의 가치" },
];

export default function AboutPage() {
  const { language } = useLanguage();
  const t = aboutPageTranslations;
  const isKo = language === "KOR";

  /* The merged "values+pillars" section uses the pillar content
     (Trust / Excellence / Growth) rendered with the values numbering
     design, then links out to /our-values for the full canonical set. */
  const pillars = [
    { number: "1", title: isKo ? t.pillar1Title.ko : t.pillar1Title.en, body: isKo ? t.pillar1Body.ko : t.pillar1Body.en },
    { number: "2", title: isKo ? t.pillar2Title.ko : t.pillar2Title.en, body: isKo ? t.pillar2Body.ko : t.pillar2Body.en },
    { number: "3", title: isKo ? t.pillar3Title.ko : t.pillar3Title.en, body: isKo ? t.pillar3Body.ko : t.pillar3Body.en },
  ];

  return (
    <main
      className="min-h-screen bg-white"
      style={{ fontFamily: '"Nexon Lv1 Gothic", "Noto Sans KR", "Roboto", sans-serif' }}
    >

      {/* ─── Pattern 01 (about · v3) — cream-card + lower-left lighting ───
           /about: lightest cream tone (--ov-cream-card) + diagonal
           radial wash entering from the lower-left for a cinematic
           "narrative arrives from elsewhere" feel. Lines emphasize
           parallel diagonals → story motion. */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: "#F9F8F4",
          backgroundImage:
            "radial-gradient(ellipse 85% 100% at 0% 100%, rgba(229,229,189,0.50) 0%, rgba(229,229,189,0.12) 40%, transparent 70%)",
        }}
      >
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 w-full h-full hidden md:block"
          viewBox="0 0 1280 640"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {/* Multi-element variation per founder reference:
              concentric pair upper-right + long mid sweep + large
              partial circle anchoring the lower-left. */}
          {/* Concentric pair upper-right */}
          <circle cx="1100" cy="130" r="180" stroke="#627F38" strokeOpacity="0.26" strokeWidth="0.8" />
          <circle cx="1100" cy="130" r="105" stroke="#627F38" strokeOpacity="0.22" strokeWidth="0.7" />
          {/* Long calligraphic sweep crossing the middle band */}
          <path
            d="M -60 260 C 320 380, 760 420, 1340 320"
            stroke="#627F38"
            strokeOpacity="0.32"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          {/* Large partial circle anchoring the lower-left */}
          <circle cx="80" cy="640" r="380" stroke="#627F38" strokeOpacity="0.20" strokeWidth="0.7" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-6 py-16 md:py-20 lg:py-24 min-h-[460px] md:min-h-[560px] lg:min-h-[640px] flex flex-col justify-center">
          <div className="flex flex-col max-w-3xl">
            <span className="text-[11px] md:text-[12px] 2xl:text-[14px] tracking-[0.22em] uppercase font-medium text-[#627F38]/85 mb-6">
              {isKo ? "회사 소개" : "About us"}
            </span>
            <h1 className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-normal text-[#495F2B] leading-[1.1] mb-5 tracking-[-0.01em]">
              {isKo ? t.heroTitle.ko : t.heroTitle.en}
            </h1>
            <p className="max-w-xl text-[15px] md:text-[17px] text-[#111B12]/70 leading-[1.6]">
              {isKo ? t.heroSubtitle.ko : t.heroSubtitle.en}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Pattern 03 — Our story (text-led, no image; /about owns the story)
           Surface matches the hero tone (cream-card). A top-left
           leaf-pale wash mirrors the hero's lower-left wash so the
           gradient appears to continue across the section boundary —
           no white-line cut. */}
      <section
        className="relative w-full py-16 md:py-24 lg:py-28 overflow-hidden"
        style={{
          backgroundColor: "#F9F8F4",
          backgroundImage:
            "radial-gradient(ellipse 70% 100% at 0% 0%, rgba(229,229,189,0.45) 0%, rgba(229,229,189,0.12) 38%, transparent 68%)",
        }}
      >
        {/* Decorative au1.png — right-bleed olive tile pattern.
            Lives OUTSIDE the SectionReveal so the bg motif is always
            painted; only the reading content below animates in. */}
        <div
          aria-hidden
          className="hidden md:block pointer-events-none absolute top-0 right-0 w-[300px] lg:w-[380px] 2xl:w-[460px] h-full"
          style={{
            backgroundImage: "url(/services/au1.png)",
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
            opacity: 0.18,
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 95% at 100% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 85%)",
            maskImage:
              "radial-gradient(ellipse 85% 95% at 100% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 85%)",
          }}
        />
        <SectionReveal>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
              <div className="md:col-span-5">
                <span className="block text-[14px] md:text-[15px] 2xl:text-[17px] font-semibold text-[#627F38] tracking-wide mb-4">
                  {isKo ? t.storyLabel.ko : t.storyLabel.en}
                </span>
                <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.2]">
                  {(isKo ? t.storyTitle.ko : t.storyTitle.en)
                    .split("\n")
                    .map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                </h2>
              </div>
              <div className="md:col-span-7 flex items-start">
                <p className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/75 leading-[1.7]">
                  {isKo ? t.storyBody.ko : t.storyBody.en}
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ─── Pattern A (teaser · text-only) — founders link out, no photos ───
           Per founder direction: photos start from /leadership; /about
           teases by text alone. Two-up text rows, each a clickable
           card-like row that navigates to that founder's full profile. */}
      <section className="relative w-full py-12 md:py-20 lg:py-24 overflow-hidden" style={{ backgroundColor: "#F9F8F3" }}>
        {/* Decorative au1.png — outside the SectionReveal so the bg
            motif is always painted (no white flash during fade). */}
        <div
          aria-hidden
          className="hidden md:block pointer-events-none absolute top-0 right-0 w-[300px] lg:w-[380px] 2xl:w-[460px] h-full"
          style={{
            backgroundImage: "url(/services/au1.png)",
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
            opacity: 0.16,
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 95% at 100% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 85%)",
            maskImage:
              "radial-gradient(ellipse 85% 95% at 100% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 85%)",
          }}
        />
        <SectionReveal>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 md:mb-14 gap-4">
              <div>
                <span className="block text-[14px] md:text-[15px] 2xl:text-[17px] font-semibold text-[#627F38] tracking-wide mb-3">
                  {isKo ? t.leadershipLabel.ko : t.leadershipLabel.en}
                </span>
                <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.2]">
                  {(isKo ? t.leadershipTitle.ko : t.leadershipTitle.en)
                    .split("\n")
                    .map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                </h2>
              </div>
              <Link
                href="/leadership"
                className="inline-flex items-center gap-1.5 text-[14px] md:text-[15px] 2xl:text-[17px] text-[#495F2B] font-medium hover:text-[#436A1F] transition-colors duration-300 shrink-0"
              >
                {isKo ? "전체 리더십 보기" : "Meet the team"}
                <Icons.CgArrowTopRight className="size-4" aria-hidden />
              </Link>
            </div>

            <p className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/75 leading-[1.7] max-w-3xl mb-10">
              {isKo ? t.leadershipCulture.ko : t.leadershipCulture.en}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {(["rebecca", "miyoung"] as const).map((key) => {
                const f = t.founders[key];
                const name = isKo ? f.name.ko : f.name.en;
                const role = isKo ? f.role.ko : f.role.en;
                const creds = isKo ? f.credentials.ko : f.credentials.en;
                return (
                  <Link
                    key={key}
                    href={`/leadership/${f.slug}`}
                    className="group flex items-center justify-between gap-4 p-6 bg-white border border-[#627F38]/40 hover:border-[#495F2B] transition-colors duration-300"
                  >
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#627F38] mb-2">
                        {role}
                      </span>
                      <h3 className="text-[18px] md:text-[20px] 2xl:text-[22px] font-medium text-[#111B12] leading-[1.25] group-hover:text-[#495F2B] transition-colors duration-300">
                        {name}
                      </h3>
                      <p className="text-[12px] md:text-[13px] text-[#111B12]/55 mt-1">
                        {creds}
                      </p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#111B12]/40 group-hover:border-[#495F2B] group-hover:bg-[#495F2B] flex items-center justify-center transition-colors shrink-0">
                      <Icons.CgArrowTopRight className="size-5 text-[#111B12]/70 group-hover:text-white transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ─── Pattern B (merged · 3) — pillars content + values numbering design ───
           Replaces the duplicate "What we believe (teaser)" + "Three pillars".
           Uses the three pillars (Trust / Excellence / Growth) rendered
           with Pattern B's watermark-numeral + italic-pull-quote design,
           then links out to /our-values for the full canonical 5. */}
      <section className="w-full py-16 md:py-20 lg:py-24" style={{ backgroundColor: "#F0EEE2" }}>
        <SectionReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 md:mb-14 gap-4">
              <div>
                <span className="block text-[14px] md:text-[15px] 2xl:text-[17px] font-semibold text-[#627F38] tracking-wide mb-3">
                  {isKo ? "우리의 가치" : "What we believe"}
                </span>
                <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.2]">
                  {isKo
                    ? "선언이 아닌, 매일 실천하는 방식입니다."
                    : "Not statements on a wall — how we work."}
                </h2>
              </div>
              <Link
                href="/our-values"
                className="inline-flex items-center gap-1.5 text-[14px] md:text-[15px] 2xl:text-[17px] text-[#495F2B] font-medium hover:text-[#436A1F] transition-colors duration-300 shrink-0"
              >
                {isKo ? "전체 가치 보기" : "All values"}
                <Icons.CgArrowTopRight className="size-4" aria-hidden />
              </Link>
            </div>

            {/* Scroll-driven sequential reveal — the three pillars drop
                into place from above as the user scrolls through the
                section, in DOM order (1 → 2 → 3). Range [0.05, 0.4]
                matches the service-page card-grid pattern so the
                cluster feels consistent. */}
            <ScrollLinkedStagger
              itemSelector=".stagger-item"
              range={[0.05, 0.4]}
              distance={32}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
            >
              {pillars.map((p) => (
                <div key={p.number} className="stagger-item flex flex-col">
                  <span
                    aria-hidden
                    className="font-normal leading-none mb-4 select-none"
                    style={{
                      fontSize: "clamp(72px, 9vw, 110px)",
                      color: "#627F38",
                      opacity: 0.20,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {p.number}
                  </span>
                  {/* Pillar title rendered as the italic pull-quote — the
                      same brand exception Pattern B authorizes for the
                      values section. */}
                  <p
                    className="text-[18px] md:text-[20px] 2xl:text-[22px] lg:text-[22px] text-[#495F2B] leading-[1.35] mb-4"
                    style={{ fontStyle: "italic" }}
                  >
                    &ldquo;{p.title}&rdquo;
                  </p>
                  <p className="text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/75 leading-[1.7]">
                    {p.body}
                  </p>
                </div>
              ))}
            </ScrollLinkedStagger>
          </div>
        </SectionReveal>
      </section>

      {/* ─── Cluster cross-link — bg matches the pillars section above
           so the page flows continuously rather than snapping back to
           white before the Footer takes over. */}
      <section className="w-full py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#F0EEE2" }}>
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

    </main>
  );
}
