"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import * as Icons from "@/app/utils/icons";
import { MenuItem } from "@/app/utils/muiComponents";
import StyledTextField from "@/app/components/StyledTextField";
import ComplianceSection from "@/app/components/ComplianceSection";
import { subscribePageTranslations } from "@/app/utils/pageSubscribeUtils";
import { subscribeNoRadiusSx, subscribeTitleSx } from "@/app/utils/subscribePageStyles";

export default function SubscribePage() {
  const { language } = useLanguage();
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [email, setEmail] = useState("");
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const handleSubmit = () => {
    const hasEmpty = !firstName.trim() || !surname.trim() || !titleValue.trim() || !email.trim();
    setShowValidationErrors(hasEmpty);
    if (hasEmpty) return;
    // TODO: API 연동 — POST /api/subscribe { firstName, surname, title: titleValue, email }
    // 성공 시 성공 메시지 표시, 실패 시 에러 핸들링
    console.info("[Subscribe] Form submitted:", { firstName, surname, title: titleValue, email });
  };

  const t = subscribePageTranslations;
  const isKo = language === "KOR";

  return (
    <>
      <main className="min-h-screen bg-white">
        <section className="w-full py-12 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 flex flex-col items-start">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#111B12]/80">{isKo ? "인사이트 구독" : "Subscribe to Insights"}</h2>
            <div className="w-full mt-6 sm:mt-8 md:mt-10 lg:mt-12 flex flex-col md:flex-row md:items-center gap-8 md:gap-12 lg:gap-16">
              <div className="w-full md:w-2/5 lg:w-2/5 flex-shrink-0 flex items-center justify-center aspect-square max-w-full md:max-w-none mx-auto md:mx-0 md:aspect-square md:min-h-0">
                <Image src="/subscribe/insight.png" alt="Subscribe to insights" width={400} height={400} className="w-full h-full object-contain min-w-0" sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
              <div className="w-full md:flex-1 flex flex-col items-center gap-3 sm:gap-4">
                <div className="w-full max-w-2xl flex flex-col gap-3 sm:gap-4">
                  <p className="text-xs sm:text-sm text-[#111B12]/70 mb-1 sm:mb-2">{isKo ? t.requiredFields.ko : t.requiredFields.en}</p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                    <div className="flex-1 min-w-0">
                      <StyledTextField id="subscribe-first-name" label={isKo ? t.form.firstName.ko : t.form.firstName.en} value={firstName} onChange={(e) => setFirstName(e.target.value)} error={showValidationErrors && !firstName.trim()} sx={subscribeNoRadiusSx} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <StyledTextField id="subscribe-surname" label={isKo ? t.form.surname.ko : t.form.surname.en} value={surname} onChange={(e) => setSurname(e.target.value)} error={showValidationErrors && !surname.trim()} sx={subscribeNoRadiusSx} />
                    </div>
                    <div className="w-full sm:w-32 shrink-0">
                      <StyledTextField id="subscribe-title" select label={isKo ? t.form.title.ko : t.form.title.en} value={titleValue} onChange={(e) => setTitleValue(e.target.value)} error={showValidationErrors && !titleValue.trim()} sx={{ ...subscribeTitleSx, "& .MuiSelect-select": { color: titleValue === "" ? "rgba(17, 27, 18, 0.5)" : "#111B12" } }}>
                        <MenuItem value=""><em>{isKo ? t.form.title.ko : t.form.title.en}</em></MenuItem>
                        <MenuItem value="Mr">Mr</MenuItem>
                        <MenuItem value="Ms">Ms</MenuItem>
                        <MenuItem value="Mrs">Mrs</MenuItem>
                      </StyledTextField>
                    </div>
                  </div>
                  <StyledTextField id="subscribe-email" label={isKo ? t.form.email.ko : t.form.email.en} type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={showValidationErrors && !email.trim()} sx={subscribeNoRadiusSx} />
                  <div className="mt-3 sm:mt-4">
                    <button type="button" onClick={handleSubmit} className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-white leading-relaxed border border-[#495F2B] bg-[#495F2B] px-4 sm:px-5 py-1.5 hover:bg-[#627F38] hover:border-[#627F38] transition-all duration-300 cursor-pointer">{isKo ? t.button.ko : t.button.en}<Icons.CgArrowTopRight className="size-4" aria-hidden /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ComplianceSection />
    </>
  );
}
