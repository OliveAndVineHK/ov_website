"use client";

/* ──────────────────────────────────────────────────────────────
   Full profile page — rebuilt 2026-05-30
   Cluster: about · per-founder profile
   Structure: per the founder reference (old site) — simple stacked
              layout, no fancy hero / no career timeline visual.
              Visual format: current brand tones (cream-deep surface,
              olive section headings, ink body, olive-dot bullets).
   Composition:
     1. Top "Back to Our Leadership" link
     2. Profile header — round photo (left) + name + creds + bio (right)
     3. Education
     4. Professional careers (bullet list)
     5. Language
     6. Key experience and expertise (bullet list)
     7. Bottom "Back to Our Leadership" link
     8. Closing — QuestionsForm + Footer via app/layout.tsx
   ────────────────────────────────────────────────────────────── */

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { getLeadershipProfile } from "@/app/utils/leadershipProfileTranslations";
import { aboutPageTranslations } from "@/app/utils/pageAboutUtils";
import * as Icons from "@/app/utils/icons";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function LeadershipProfilePage({ params }: Props) {
  const { slug } = use(params);
  return <ProfileClient slug={slug} />;
}

function ProfileClient({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const isKo = language === "KOR";
  const profile = getLeadershipProfile(slug);
  const founderKey = slug.toLowerCase() as keyof typeof aboutPageTranslations.founders;
  const founder = aboutPageTranslations.founders[founderKey];

  if (!profile || !founder) {
    return (
      <main className="min-h-screen" style={{ backgroundColor: "#F0EEE2" }}>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-6 py-20 md:py-28">
          <span className="block text-[14px] font-semibold text-[#627F38] mb-4">
            {isKo ? "프로필을 찾을 수 없습니다" : "Profile not found"}
          </span>
          <h1 className="text-[28px] md:text-[36px] font-normal text-[#111B12] leading-[1.2] mb-6">
            {isKo
              ? "해당하는 리더십 프로필이 없습니다."
              : "We couldn't find that leadership profile."}
          </h1>
          <Link
            href="/leadership"
            className="inline-flex items-center gap-1.5 text-[15px] text-[#495F2B] font-medium hover:text-[#436A1F] transition-colors duration-300"
          >
            <Icons.CgArrowLeft className="size-4" aria-hidden />
            {isKo ? "리더십으로 돌아가기" : "Back to Our Leadership"}
          </Link>
        </section>
      </main>
    );
  }

  const heroName = isKo ? profile.heroTitle.ko : profile.heroTitle.en;
  const heroCreds = isKo ? profile.heroSubtitle.ko : profile.heroSubtitle.en;
  const bioParagraphs = (isKo ? profile.inBriefDescription.ko : profile.inBriefDescription.en).split("\n\n");

  const educationList = isKo ? profile.educationItems.ko : profile.educationItems.en;
  const careers = isKo ? profile.professionalCareersItems.ko : profile.professionalCareersItems.en;
  const languages = (isKo ? profile.languageItems.ko : profile.languageItems.en).join(", ");
  const keyExperience = isKo ? profile.keyExperienceItems.ko : profile.keyExperienceItems.en;

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F0EEE2" }}>

      {/* ─── Top back link ─── */}
      <section className="w-full pt-8 md:pt-10 pb-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-6">
          <Link
            href="/leadership"
            className="inline-flex items-center gap-2 text-[13px] md:text-[14px] 2xl:text-[16px] text-[#111B12]/70 hover:text-[#495F2B] transition-colors duration-300"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-[#111B12]/30 group-hover:border-[#495F2B]">
              <Icons.CgArrowLeft className="size-3.5" aria-hidden />
            </span>
            {isKo ? "리더십으로 돌아가기" : "Back to Our Leadership"}
          </Link>
        </div>
      </section>

      {/* ─── Profile header — round photo + name + credentials + bio ─── */}
      <section className="w-full pt-10 pb-12 md:pt-14 md:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-12 items-start">
            {/* Round photo — uses the formal portrait (r1/m1) on the
                full profile page. The /leadership cards use the
                alternate portrait (imageHover, r2/m2), so navigating
                between the cards and the profile shows a different
                photo — adds visual interest, matches the founder
                preference shown in the old-site screenshot. */}
            <div className="shrink-0 mx-auto md:mx-0">
              <div className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden bg-[#F9F8F3]">
                <Image
                  src={profile.imagePath}
                  alt={heroName}
                  fill
                  priority
                  sizes="180px"
                  style={{ objectPosition: profile.imageObjectPosition }}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Name + creds + bio */}
            <div className="flex flex-col">
              <h1 className="text-[28px] md:text-[36px] lg:text-[40px] font-medium text-[#495F2B] leading-[1.2] tracking-[-0.01em]">
                {heroName}
              </h1>
              <p className="text-[13px] md:text-[14px] 2xl:text-[16px] text-[#111B12]/55 mt-2 mb-6 md:mb-8">
                {heroCreds}
              </p>
              <div className="flex flex-col gap-5">
                {bioParagraphs.map((p, i) => (
                  <p key={i} className="text-[15px] md:text-[16px] 2xl:text-[18px] text-[#111B12]/80 leading-[1.75]">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Body sections — stacked, simple ─── */}
      <section className="w-full pb-14 md:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-6">

          {/* Education — supports multi-entry list (Mi Young has 3) */}
          <div className="mb-10 md:mb-12">
            <h2 className="text-[20px] md:text-[22px] font-medium text-[#495F2B] mb-3">
              {isKo ? profile.educationTitle.ko : profile.educationTitle.en}
            </h2>
            <ul className="flex flex-col gap-2 list-none pl-0">
              {educationList.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 items-start text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/80 leading-[1.65]"
                >
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

          {/* Professional careers */}
          <div className="mb-10 md:mb-12">
            <h2 className="text-[20px] md:text-[22px] font-medium text-[#495F2B] mb-3">
              {isKo ? profile.professionalCareersTitle.ko : profile.professionalCareersTitle.en}
            </h2>
            <ul className="flex flex-col gap-2 list-none pl-0">
              {careers.map((item, i) => (
                <li key={i} className="flex gap-2.5 items-start text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/80 leading-[1.65]">
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

          {/* Language */}
          <div className="mb-10 md:mb-12">
            <h2 className="text-[20px] md:text-[22px] font-medium text-[#495F2B] mb-3">
              {isKo ? profile.languageTitle.ko : profile.languageTitle.en}
            </h2>
            <ul className="flex flex-col gap-2 list-none pl-0">
              <li className="flex gap-2.5 items-start text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/80 leading-[1.65]">
                <span
                  aria-hidden
                  className="inline-block shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                  style={{ backgroundColor: "#627F38" }}
                />
                <span>{languages}</span>
              </li>
            </ul>
          </div>

          {/* Key experience and expertise */}
          <div className="mb-12">
            <h2 className="text-[20px] md:text-[22px] font-medium text-[#495F2B] mb-4">
              {isKo ? profile.keyExperienceTitle.ko : profile.keyExperienceTitle.en}
            </h2>
            <ul className="flex flex-col gap-2 list-none pl-0">
              {keyExperience.map((item, i) => (
                <li key={i} className="flex gap-2.5 items-start text-[14px] md:text-[15px] 2xl:text-[17px] text-[#111B12]/80 leading-[1.65]">
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

        </div>
      </section>

      {/* ─── Bottom back link, subtle divider above ─── */}
      <section className="w-full pb-14 md:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-6 pt-8 md:pt-10 border-t border-[#111B12]/15">
          <Link
            href="/leadership"
            className="inline-flex items-center gap-2 text-[14px] md:text-[15px] 2xl:text-[17px] text-[#495F2B] font-medium hover:text-[#436A1F] transition-colors duration-300"
          >
            <Icons.CgArrowLeft className="size-4" aria-hidden />
            {isKo ? "리더십으로 돌아가기" : "Back to Our Leadership"}
          </Link>
        </div>
      </section>

    </main>
  );
}
