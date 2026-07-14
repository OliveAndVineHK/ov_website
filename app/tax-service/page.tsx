"use client";

/* ──────────────────────────────────────────────────────────────
   Tax service page — rebuilt 2026-05-28
   Reference: briefs/2026-05-28-tax-rebuild.md
   Grammar:   01 hero → 02 explainer → 05 calendar → 07 related → 08 closing
   Rules:     decisions/2026-05-28-b-direction.md
              (no shadow, no blur, no scrim, no italic, no non-olive hues,
              no unicode glyph icons, no placeholder text)
   Closing block (insights row + QuestionsForm + Footer) is rendered by
   the shared <Footer/> in app/layout.tsx and the InsightCards section below.
   ────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { taxServicePageTranslations } from "@/app/utils/pageTaxServiceUtils";
import { learnMoreTranslations, servicesTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import SectionReveal from "@/app/components/SectionReveal";
import ScrollLinkedStagger from "@/app/components/ScrollLinkedStagger";
import ServiceIconMotion from "@/app/components/ServiceIconMotion";
import CurveMotif from "@/app/components/CurveMotif";
import { ServiceAccentProvider, serviceColorMap } from "@/app/contexts/ServiceAccentContext";
import { useHeroLight } from "@/app/hooks/useHeroLight";
import * as Icons from "@/app/utils/icons";

/* Per-service resting origin for the hero light.
   Source of truth: playbooks/section-01-hero.md "Per-service variation map".
   Tax = warm late-morning light from the top-right. */
const HERO_LIGHT_TAX = { defaultX: 82, defaultY: 15 };
const TAX_HERO_BASE = serviceColorMap.tax.heroBase;

/* ──────────────────────────────────────────────────────────────
   Pattern 05 helpers — calendar grid + category filter.

   Each event's category resolves to one olive-family tint (defined
   in pageTaxServiceUtils.ts → categories). Filtering by category
   shows / hides chips in the grid AND cards in the list below from
   the same `activeCategory` state.

   Months for the 4×3 grid render full names ("January") at lg and
   abbreviated ("JAN") below lg; both labels live in the markup,
   only one is shown per breakpoint via CSS. The whole grid is
   hidden below md — phone visitors see the cards only.
   ────────────────────────────────────────────────────────────── */
const MONTHS: Array<{ full: { en: string; ko: string }; short: { en: string; ko: string } }> = [
  { full: { en: "January",   ko: "1월" },  short: { en: "JAN", ko: "1월" } },
  { full: { en: "February",  ko: "2월" },  short: { en: "FEB", ko: "2월" } },
  { full: { en: "March",     ko: "3월" },  short: { en: "MAR", ko: "3월" } },
  { full: { en: "April",     ko: "4월" },  short: { en: "APR", ko: "4월" } },
  { full: { en: "May",       ko: "5월" },  short: { en: "MAY", ko: "5월" } },
  { full: { en: "June",      ko: "6월" },  short: { en: "JUN", ko: "6월" } },
  { full: { en: "July",      ko: "7월" },  short: { en: "JUL", ko: "7월" } },
  { full: { en: "August",    ko: "8월" },  short: { en: "AUG", ko: "8월" } },
  { full: { en: "September", ko: "9월" },  short: { en: "SEP", ko: "9월" } },
  { full: { en: "October",   ko: "10월" }, short: { en: "OCT", ko: "10월" } },
  { full: { en: "November",  ko: "11월" }, short: { en: "NOV", ko: "11월" } },
  { full: { en: "December",  ko: "12월" }, short: { en: "DEC", ko: "12월" } },
];

/* ──────────────────────────────────────────────────────────────
   Pattern 07 — related-services data.
   Reuses the homepage `servicesTranslations` copy; only the three most
   relevant siblings to Tax are surfaced (Accounting · Corporate · Consulting).
   ────────────────────────────────────────────────────────────── */
const RELATED_SERVICES = [
  /* v2 (2026-06-04): rebalanced — Tax's cyclic triad is Consulting
     (tax advisory), HR (payroll tax · IR56 overlap), Corporate
     (statutory tax filings). */
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
  {
    key: "corporate" as const,
    href: "/corporate-service",
    image: "/home/os-corporate.svg",
    imageWhite: "/home/os-corporate-w.svg",
    alt: "Corporate service icon",
  },
];

export default function TaxServicePage() {
  const { language } = useLanguage();
  const t = taxServicePageTranslations;
  const isKo = language === "KOR";

  /* Hero light — eases toward the cursor and back to the Tax resting angle.
     Reduced-motion users and touch devices stay at rest. */
  const heroRef = useHeroLight(HERO_LIGHT_TAX);

  /* Calendar filter — drives both the 4×3 month grid and the detail-card
     grid below from the same state. */
  type TaxCategory = (typeof t.taxTimeline.categories)[number];
  type TaxEvent = (typeof t.taxTimeline.items)[number];

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const categoryByKey = Object.fromEntries(
    t.taxTimeline.categories.map((c) => [c.key, c]),
  ) as Record<string, TaxCategory>;
  const filteredEvents: TaxEvent[] =
    activeCategory === "all"
      ? [...t.taxTimeline.items]
      : t.taxTimeline.items.filter((e) => e.category === activeCategory);
  const eventsByMonth: Record<number, TaxEvent[]> = {};
  for (const ev of filteredEvents) {
    const list = eventsByMonth[ev.monthIndex] ?? [];
    list.push(ev);
    eventsByMonth[ev.monthIndex] = list;
  }

  /* Header copy */
  const heroTitle = isKo ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = isKo ? t.heroSubtitle.ko : t.heroSubtitle.en;

  /* Explainer copy. The Employer's Return sub-area hyperlinks the phrase
     "HR Services" to the HR service page. */
  const employerDetailRaw = isKo
    ? t.employerReturnDescription.ko
    : t.employerReturnDescription.en;
  const [erBefore, erAfter = ""] = employerDetailRaw.split("HR Services");
  const employerDetail: ReactNode = (
    <>
      {erBefore}
      <Link
        href="/hr-service"
        className="text-[#495F2B] underline underline-offset-2 hover:text-[#648E3E] transition-colors"
      >
        HR Services
      </Link>
      {erAfter}
    </>
  );

  const subAreas: { label: string; detail: ReactNode; items: string[] }[] = [
    {
      label: isKo ? t.profitsTaxTitle.ko : t.profitsTaxTitle.en,
      detail: isKo ? t.profitsTaxDescription.ko : t.profitsTaxDescription.en,
      items: isKo ? t.profitsTaxItems.ko : t.profitsTaxItems.en,
    },
    {
      label: isKo ? t.salariesTaxTitle.ko : t.salariesTaxTitle.en,
      detail: isKo ? t.salariesTaxDescription.ko : t.salariesTaxDescription.en,
      items: isKo ? t.salariesTaxItems.ko : t.salariesTaxItems.en,
    },
    {
      label: isKo ? t.taxAdvisoryTitle.ko : t.taxAdvisoryTitle.en,
      detail: isKo ? t.taxAdvisoryDescription.ko : t.taxAdvisoryDescription.en,
      items: isKo ? t.taxAdvisoryItems.ko : t.taxAdvisoryItems.en,
    },
    {
      label: isKo ? t.employerReturnTitle.ko : t.employerReturnTitle.en,
      detail: employerDetail,
      items: [] as string[],
    },
  ];

  /* Firm-wide compliance commitment — rendered as a closing note under the
     explainer sub-areas (replaces the retired taxServiceIntro message). */
  const complianceNote = isKo ? t.complianceNote.ko : t.complianceNote.en;

  /* Calendar detail cards. In the "All" view (13 events) descriptions stay
     collapsed and are revealed together via the "Expand all" control; when a
     single category is selected the descriptions are shown by default (few
     enough cards to read at once). Open state resets when the filter changes. */
  const isAll = activeCategory === "all";
  const [openCards, setOpenCards] = useState<Set<string>>(new Set());
  const toggleCard = (id: string) => {
    setFocusedCardId(null);
    setOpenCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const allCardIds = filteredEvents.map(
    (it, i) => `card-${it.category}-${it.monthIndex}-${i}`,
  );
  const allOpen =
    allCardIds.length > 0 && allCardIds.every((id) => openCards.has(id));
  const toggleAll = () => setOpenCards(allOpen ? new Set() : new Set(allCardIds));

  /* Pill → card focus. Clicking a calendar-grid pill scrolls to its detail
     card, expands it, and dims the other cards until the focus is cleared
     (click the same pill again, toggle a card, or change the filter). */
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [focusedCardId, setFocusedCardId] = useState<string | null>(null);
  const [showBackToCalendar, setShowBackToCalendar] = useState(false);

  /* Per-cell pill overflow. A month cell shows at most 3 pills; cells with
     more (e.g. April in the "All" view) reveal the rest only when expanded. */
  const [expandedMonths, setExpandedMonths] = useState<Set<number>>(new Set());
  const toggleMonth = (idx: number) =>
    setExpandedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });

  const focusEventCard = (ev: TaxEvent) => {
    const index = filteredEvents.indexOf(ev);
    if (index < 0) return;
    const cardId = `card-${ev.category}-${ev.monthIndex}-${index}`;
    if (focusedCardId === cardId) {
      setFocusedCardId(null);
      return;
    }
    setFocusedCardId(cardId);
    // Only the focused card stays open — clicking another pill collapses the
    // previous one so the list never piles up multiple open cards.
    setOpenCards(new Set([cardId]));
    requestAnimationFrame(() =>
      cardRefs.current[cardId]?.scrollIntoView({ behavior: "smooth", block: "center" }),
    );
  };

  /* "Back to calendar" — scrolls the calendar grid back into view and clears
     the focus. Collapses the cards only when a card was focused (so it doesn't
     undo a manual "Expand all"). */
  const scrollToCalendar = () => {
    if (focusedCardId) setOpenCards(new Set());
    setFocusedCardId(null);
    calendarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* In the "All" view, show the back-to-calendar arrow once the grid is no
     longer fully visible (the user has scrolled down past it), and keep it
     until the calendar section itself scrolls out of view. The grid is
     desktop-only (display:none below md), so its rect is empty on mobile and
     the arrow stays off there. */
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      if (!isAll) {
        setShowBackToCalendar(false);
        return;
      }
      const grid = gridRef.current;
      const section = calendarRef.current;
      if (!grid || !section) return;
      const gridRect = grid.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const gridNotFullyVisible = gridRect.height > 0 && gridRect.top < 0;
      const stillInSection = sectionRect.bottom > 80;
      setShowBackToCalendar(gridNotFullyVisible && stillInSection);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(check);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isAll]);

  return (
    <ServiceAccentProvider serviceType="tax">
      <main className="min-h-screen bg-white">
        {/* ────────────────────────────────────────────────────────
            Pattern 01 — Split hero with motion object

            Background: single-hue radial vignette using only olive tokens
            (lighting, not an abstract gradient). Per-service variation is
            the angle / origin of the light — Tax uses a warm late-morning
            light from the top-right. See playbooks/section-01-hero.md for
            the per-service map.

            FLAGGED FOR FOUNDER:
              · No tax-specific photograph exists in /public yet.
                The radial vignette is the documented fallback until a
                warm, dark-leaning photo is supplied (a desk with a wall
                or desk calendar marking filing deadlines, or hands
                organizing tax documents).
              · No founder motion asset (.lottie / .json) exists in /public.
                The right column currently shows the brand os-tax-w.svg
                scaled up as a static object. Swap to the Lottie/JS export
                with a transparent background when ready (see playbook
                section-01-hero.md, rule 3).
            ──────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative w-full overflow-hidden"
          style={{
            backgroundColor: TAX_HERO_BASE,
            // SSR / no-JS / reduced-motion resting state. Once mounted,
            // useHeroLight owns this property and eases it toward the
            // cursor. Stops are leaf-pale @ low opacity → transparent so
            // only the per-service olive base shows through — single-hue.
            backgroundImage:
              "radial-gradient(ellipse 80% 90% at 82% 15%, rgba(229,229,189,0.22) 0%, rgba(229,229,189,0.07) 35%, transparent 65%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 py-16 sm:py-20 md:py-28 lg:py-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center min-h-[420px] md:min-h-[520px] lg:min-h-[600px]">
              {/* Left — reading column */}
              <div className="md:col-span-7 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src="/home/os-tax-w.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="object-contain"
                    aria-hidden
                  />
                  <span className="text-[14px] sm:text-[15px] text-white/85 font-medium">
                    {isKo ? "서비스 · 04 / 세무" : "Service · 04 / Tax"}
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
                    {isKo ? "문의하기" : "Start a conversation"}
                    <Icons.CgArrowTopRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>

              {/* Right — animated brand mark (the "Tilt" motion for Tax).
                  The SVG itself is transparent, so it sits cleanly on the
                  deep-olive hero without a visible bounding box.

                  Mobile behavior: the icon already lives in the eyebrow on the
                  left column, so duplicating it stacked below would be redundant.
                  Hide entirely below md (768px), then scale up progressively
                  through md → lg → xl breakpoints. */}
              <div className="hidden md:flex md:col-span-5 items-center justify-center md:justify-end">
                <div className="relative aspect-square flex items-center justify-center w-[220px] md:w-[260px] lg:w-[340px] xl:w-[400px] transition-all duration-300">
                  <ServiceIconMotion
                    service="tax"
                    tone="light"
                    label="Tax service icon — Tilt motion"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Round-arrow CTA — bottom-right of the hero */}
          <Link
            href="/contact"
            aria-label={isKo ? "문의하기" : "Contact us"}
            className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 md:right-10 md:bottom-10 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white hover:text-[#495F2B] hover:border-white transition-colors duration-300"
          >
            <Icons.CgArrowTopRight className="size-6 md:size-7" aria-hidden />
          </Link>
        </section>

        {/* ────────────────────────────────────────────────────────
            Pattern 02 — Two-column explainer ("What we handle")
            Tax variant: 2-col text-list with the per-service CurveMotif
            on the right edge. This is the original variant that ships on
            Tax; Accounting uses a different variant (diagram-led, see
            its page). Per Decision H amendment: Pattern 02 has per-service
            variants — not a universal template.
            ──────────────────────────────────────────────────────── */}
        <SectionReveal>
          <section className="relative w-full bg-white py-16 md:py-24 lg:py-28 overflow-hidden">
            <CurveMotif service="tax" />
            {/* c1.png (lighthouse) — confined to the left col-5 area.
                v5 (2026-06-03): widths reduced so the asset never bleeds
                under the right column's text (Tax Advisory etc.).
                Soft center-bottom mask + lighter opacity gives the
                a1-on-consulting "natural fade" look the user prefers
                — the photo is present as warm texture rather than a
                spotlit subject. */}
            <div
              aria-hidden
              className="hidden md:block pointer-events-none absolute bottom-0 left-0 w-[360px] lg:w-[440px] 2xl:w-[520px] h-[380px] lg:h-[460px] 2xl:h-[540px]"
              style={{
                backgroundImage: "url(/services/c1.png)",
                // 280% width pushes the asset's empty left half off-canvas.
                backgroundSize: "280% auto",
                backgroundPosition: "right center",
                backgroundRepeat: "no-repeat",
                opacity: 0.42,
                filter: "grayscale(0.55) sepia(0.3) hue-rotate(40deg) saturate(0.9) brightness(1.18)",
                // v2 mask (2026-06-04): smaller ellipse + faster fall-off
                // on the right edge so the photo dissolves cleanly into
                // the white section bg instead of leaving a hard line.
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 110% at 35% 100%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0) 80%)",
                maskImage:
                  "radial-gradient(ellipse 90% 110% at 35% 100%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0) 80%)",
              }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              {/* Heading row — slow "from top" reveal, both columns
                  appearing together when section enters viewport. */}
              <SectionReveal direction="down" duration={700} distance={32}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-12 md:mb-14">
                  {/* Left — eyebrow + heading */}
                  <div className="md:col-span-5">
                    <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-4">
                      {isKo ? "주요 업무 범위" : "What we handle"}
                    </span>
                    <h2 className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[32px] 2xl:text-[36px] font-normal text-[#111B12] leading-[1.25]">
                      {isKo
                        ? "다양한 영역, 하나의 파트너십"
                        : "Multiple areas, One Relationship"}
                    </h2>
                  </div>
                  {/* Right — short intro paragraph (matches consulting). */}
                  <div className="md:col-span-7 flex items-start">
                    <p className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/70 leading-[1.65] whitespace-pre-line text-justify">
                      {isKo
                        ? `홍콩의 세무는 법인, 개인, 그리고 부동산까지 여러 영역에 걸쳐 있으며, 이들은 서로 맞물려 작용합니다.
각 영역은 서로 다른 규정과 위험요소, 그리고 계획 수립 시 고려사항을 가지고 있지만, 절대적으로 독립적이지는 않습니다. 한 영역에서의 결정이 다른 영역에 직접적인 영향을 미칠 수 있으므로, 전체적인 정렬과 조화가 필수적 입니다.
효과적인 세무 관리는 단순히 세금 부담을 줄이는 데에 그치지 않습니다.
구조 전반과 시간의 흐름에 따른 영향을 함께 고려하는 종합적이고 미래지향적인 접근이 필요합니다.
신고 업무를 수행하고, 세무 구조를 검토·최적화하며, 국세청(IRD) 대응까지 포함하여 이러한 세 가지 관점을 하나로 통합해 관리합니다.
단순한 규제 준수를 넘어, 복잡한 구조 전반에 대한 명확성을 제공함으로써 일관되고 정보에 기반한 올바른 의사결정이 이루어 지도록 지원합니다.`
                        : `Hong Kong tax spans multiple dimensions — companies, individuals, and property. These dimensions often intersect.
Each area carries its own rules, risks, and planning considerations, yet they rarely operate in isolation. Decisions in one area can have direct implications for another, making alignment essential.
Effective tax management is not limited to reducing liabilities. It requires a holistic and forward‑looking approach, assessing implications across structures and over time.
We handle filings, optimise positions, and represent you before the Inland Revenue Department, ensuring that all three perspectives are considered together.
Our role is not only to manage compliance, but to bring clarity across structures, supporting consistent and well‑informed decision‑making within a single client relationship.`}
                    </p>
                  </div>
                </div>
              </SectionReveal>

              {/* Sub-areas — scroll-driven sequential reveal. Each
                  area drops in from above as the user scrolls through
                  the section. Indented under the right column to keep
                  the original visual alignment. */}
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
                      <p className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/70 leading-[1.6] mb-4 whitespace-pre-line text-justify">
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

              {/* Firm-wide compliance commitment — closing note aligned to
                  the right reading column, mirroring the sub-area indent. */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mt-12 md:mt-16">
                <div className="hidden md:block md:col-span-5" aria-hidden />
                <div className="md:col-span-7 border-t border-[#627F38]/30 pt-6">
                  <p className="text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/70 leading-[1.7] whitespace-pre-line text-justify">
                    {complianceNote}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* ────────────────────────────────────────────────────────
            Pattern 05 — Annual tax calendar (filterable 4×3 grid)

            Cream-deep surface. Filter pills under the h2 drive both
            the calendar grid AND the detail-card grid below from the
            same `activeCategory` state. Category colors are all within
            the olive family (the old purple / yellow assignments were
            the F04 violation Decision B cleaned up).

            Responsive behavior:
              · lg+ : month labels render as full names ("January")
              · md  : month labels switch to abbreviations ("JAN")
              · <md : the calendar grid is hidden entirely; phone
                      visitors see only the detail cards below.
            ──────────────────────────────────────────────────────── */}
        <SectionReveal>
          <section className="w-full py-16 md:py-24 lg:py-28" style={{ backgroundColor: "#F0EEE2" }}>
            <div ref={calendarRef} className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 scroll-mt-24">
              <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-3">
                {isKo ? "연간 일정" : "Annual rhythm"}
              </span>
              <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-normal text-[#111B12] leading-[1.1] mb-8 md:mb-10">
                {isKo ? "홍콩 세무 캘린더" : "Hong Kong tax calendar"}
              </h2>

              {/* Filter buttons — All / Profits Tax / Salaries Tax /
                  Employer's Return / General. Active button picks up its
                  category color from pageTaxServiceUtils.ts. */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 md:mb-12">
                {t.taxTimeline.categories.map((cat) => {
                  const isActive = activeCategory === cat.key;
                  const label = isKo ? cat.label.ko : cat.label.en;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat.key);
                        setOpenCards(new Set());
                        setFocusedCardId(null);
                        setExpandedMonths(new Set());
                      }}
                      aria-pressed={isActive}
                      className="inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] leading-none rounded-full border px-4 py-2 transition-colors duration-300 cursor-pointer"
                      style={
                        isActive
                          ? { backgroundColor: cat.color, color: cat.fg, borderColor: cat.color }
                          : { backgroundColor: "transparent", color: "#495F2B", borderColor: "#627F38" }
                      }
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* 4×3 month grid — hidden below md.
                  Borders use the same hairline language as the previous
                  rail (ink @15%). Container carries top + right borders;
                  each cell carries left + bottom — together they paint a
                  clean inner grid with no doubled lines. */}
              <div
                ref={gridRef}
                className="hidden md:block"
                style={{ borderTop: "1px solid rgba(17,27,18,0.15)", borderRight: "1px solid rgba(17,27,18,0.15)" }}
              >
                <div className="grid grid-cols-4 grid-rows-3">
                  {MONTHS.map((m, idx) => {
                    const monthEvents = eventsByMonth[idx] ?? [];
                    const expanded = expandedMonths.has(idx);
                    const shownEvents = expanded ? monthEvents : monthEvents.slice(0, 3);
                    const hiddenCount = monthEvents.length - shownEvents.length;
                    return (
                      <div
                        key={idx}
                        className="flex flex-col gap-3 p-4 md:p-5 min-h-[140px] lg:min-h-[160px]"
                        style={{
                          borderLeft: "1px solid rgba(17,27,18,0.15)",
                          borderBottom: "1px solid rgba(17,27,18,0.15)",
                        }}
                      >
                        <span className="text-[12px] tracking-wide font-medium text-[#111B12]/50 uppercase">
                          {/* Full at lg+, abbreviated below — only one is shown per breakpoint */}
                          <span className="hidden lg:inline">
                            {isKo ? m.full.ko : m.full.en}
                          </span>
                          <span className="lg:hidden">
                            {isKo ? m.short.ko : m.short.en}
                          </span>
                        </span>
                        <div className="flex flex-col gap-2">
                          {shownEvents.map((ev, i) => {
                            const cat = categoryByKey[ev.category];
                            const event = isKo ? ev.event.ko : ev.event.en;
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => focusEventCard(ev)}
                                className="inline-flex items-center justify-center text-center px-3 py-2 rounded-full text-[12px] leading-[1.3] font-medium cursor-pointer hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: cat?.color ?? "#627F38", color: cat?.fg ?? "#FFFFFF" }}
                                aria-label={isKo ? `${event} 상세 보기` : `View ${event} details`}
                              >
                                {event}
                              </button>
                            );
                          })}
                          {/* Overflow control — a cell holds at most 3 pills; the
                              rest reveal on click (e.g. April in the All view). */}
                          {monthEvents.length > 3 && (
                            <button
                              type="button"
                              onClick={() => toggleMonth(idx)}
                              aria-expanded={expanded}
                              className="inline-flex items-center justify-center gap-1 text-[11px] font-medium text-[#495F2B]/70 hover:text-[#495F2B] transition-colors cursor-pointer py-0.5"
                            >
                              {expanded ? (isKo ? "접기" : "Show less") : `+${hiddenCount} ···`}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Expand-all control — only shown in the "All" view, where the
                  descriptions are collapsed by default. */}
              {isAll && filteredEvents.length > 0 && (
                <div className="flex justify-end mt-10 md:mt-14">
                  <button
                    type="button"
                    onClick={toggleAll}
                    aria-expanded={allOpen}
                    className="inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] leading-none rounded-full border border-[#627F38] text-[#495F2B] px-4 py-2 hover:bg-[#627F38] hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    {allOpen
                      ? isKo ? "모두 접기" : "Collapse all"
                      : isKo ? "모두 펼치기" : "Expand all"}
                  </button>
                </div>
              )}

              {/* Detail cards. In the "All" view each description is collapsed
                  and revealed via the control above (or by clicking a card);
                  when a single category is selected the descriptions are shown
                  by default. Numbered within the filter result. */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-start ${
                  isAll ? "mt-6 md:mt-8" : "mt-10 md:mt-14"
                }`}
              >
                {filteredEvents.map((item, index) => {
                  const cat = categoryByKey[item.category];
                  const month = isKo ? item.month.ko : item.month.en;
                  const event = isKo ? item.event.ko : item.event.en;
                  const description = isKo ? item.description.ko : item.description.en;
                  const cardId = `card-${item.category}-${item.monthIndex}-${index}`;
                  const showDesc = !isAll || openCards.has(cardId);
                  const isFocused = focusedCardId === cardId;
                  const isDimmed = focusedCardId !== null && !isFocused;
                  const headerInner = (
                    <>
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-[13px] font-semibold"
                          style={{ backgroundColor: cat?.color ?? "#627F38", color: cat?.fg ?? "#FFFFFF" }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[12px] tracking-wide font-medium text-[#111B12]/50 uppercase">
                          {month}
                        </span>
                      </div>
                      <h3 className="text-[18px] md:text-[20px] 2xl:text-[22px] font-semibold text-[#111B12] leading-[1.3]">
                        {event}
                      </h3>
                    </>
                  );
                  return (
                    <div
                      key={cardId}
                      ref={(el) => {
                        cardRefs.current[cardId] = el;
                      }}
                      className={`flex flex-col transition-all duration-500 ${
                        isDimmed ? "opacity-[0.12]" : "opacity-100"
                      } ${
                        isFocused
                          ? "outline outline-1 outline-[#627F38]/25 outline-offset-8 rounded-sm"
                          : ""
                      }`}
                    >
                      {isAll ? (
                        <button
                          type="button"
                          onClick={() => toggleCard(cardId)}
                          aria-expanded={showDesc}
                          className="w-full flex flex-col gap-3 text-left cursor-pointer"
                        >
                          {headerInner}
                        </button>
                      ) : (
                        <div className="flex flex-col gap-3">{headerInner}</div>
                      )}
                      {showDesc && (
                        <p className="mt-3 text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/70 leading-[1.55] whitespace-pre-line text-justify">
                          {description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Empty-state safety: if filtering ever returns nothing
                  (it currently can't — every category has ≥1 event —
                  but a future schema change could). */}
              {filteredEvents.length === 0 && (
                <p className="text-center text-[#111B12]/50 py-8">
                  {isKo ? "해당 카테고리에 일정이 없습니다." : "No events in this category."}
                </p>
              )}

              {/* Footnote — annual reporting varies by company incorporation date */}
              <p className="mt-10 md:mt-12 text-[13px] text-[#111B12]/50">
                {isKo
                  ? "* 연례 보고 시기는 회사 설립일에 따라 달라집니다."
                  : "* Annual reporting timing varies by company incorporation date."}
              </p>
            </div>
          </section>
        </SectionReveal>

        {/* ────────────────────────────────────────────────────────
            Pattern 07 — Related services
            Three tiles. Cream-card surface, olive border, NE corner
            rounds to 30px on hover with full olive fill (the signature
            gesture), and the dark icon swaps to its white pair via
            opacity — no CSS filter.
            ──────────────────────────────────────────────────────── */}
        <SectionReveal>
          <section className="w-full bg-white py-16 md:py-24 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
              <span className="block text-[16px] md:text-[18px] 2xl:text-[20px] font-semibold text-[#627F38] mb-3">
                {isKo ? "관련 서비스" : "Related services"}
              </span>
              <h2 className="text-[28px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] font-normal text-[#111B12] leading-[1.15] mb-10 md:mb-12">
                {isKo ? "연계된 다른 서비스" : "Explore alongside Tax"}
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

        {/* ────────────────────────────────────────────────────────
            Pattern 08 — Universal closing
            1. Insights row (per-page; the only variation permitted)
            2. QuestionsForm — rendered by the shared <Footer/> in layout
            3. Footer chrome — rendered by the shared <Footer/>
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

        {/* Back-to-calendar button — appears when a pill has focused a card,
            OR (in the All view) once the grid has scrolled out of full view
            and until the calendar section is left. Sits above the global
            scroll-to-top FAB. No shadow (brand rule). */}
        {(focusedCardId || showBackToCalendar) && (
          <button
            type="button"
            onClick={scrollToCalendar}
            aria-label={isKo ? "캘린더로 돌아가기" : "Back to calendar"}
            className="fixed right-6 bottom-24 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#495F2B] text-white flex items-center justify-center hover:bg-[#627F38] transition-colors duration-300 cursor-pointer"
          >
            <Icons.BiSolidChevronUp className="size-6 md:size-7" aria-hidden />
          </button>
        )}
      </main>
    </ServiceAccentProvider>
  );
}
