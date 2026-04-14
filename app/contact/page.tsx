"use client";

import { useState } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import * as Icons from "@/app/utils/icons";
import { MenuItem } from "@/app/utils/muiComponents";
import StyledTextField from "@/app/components/StyledTextField";
import { questionsTranslations } from "@/app/utils/pageUtils";
import { contactPageTranslations } from "@/app/utils/pageContactUtils";
import { subscribeNoRadiusSx, subscribeTitleSx } from "@/app/utils/subscribePageStyles";
import { createBgStyle } from "@/app/utils/styleUtils";

export default function Contact() {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [message, setMessage] = useState("");
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const handleSubmit = () => {
    const hasEmpty = !name.trim() || !email.trim();
    setShowValidationErrors(hasEmpty);
    if (hasEmpty) return;
    // TODO: API 연동 — POST /api/contact { name, email, contactNumber, title: titleValue, message }
    console.info("[Contact] Form submitted:", { name, email, contactNumber, title: titleValue, message });
  };

  const contactBackgroundStyle = createBgStyle("/contact/contact-bg.svg");

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-semibold text-[#495F2B]">
            {language === "KOR" ? "연락" : "Contact"}
          </h2>
        </div>
      </section>
      <section className="w-full min-h-[45vh] sm:min-h-[40vh] md:min-h-[50vh] lg:min-h-[600px] py-12 md:py-16 flex flex-col" style={contactBackgroundStyle}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-1 flex-col items-end justify-end w-full">
          <div className="max-w-3xl">
            <p className="text-base sm:text-lg md:text-xl lg:text-[32px] text-[#111B12] leading-relaxed">
              {language === "KOR" ? "우리의 문화는 무결성에 기반을 두고 있으며, 강한 연민을 가진 집단적 약속에 의해서만 동기 부여됩니다. 우리는 정말로 편견 없고 고객에게 권한을 부여하는 서비스를 제공하는 것을 즐깁니다." : "Our culture is built on integrity and only motivated by a collective commitment with strong compassion. We truly enjoy providing clients with unbiased and empowering service."}
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#111B12]/80">
            {language === "KOR" ? "우리와 연결하세요" : "Connect with us"}
          </h2>
          <div className="w-full max-w-2xl mt-6 sm:mt-8 md:mt-10 lg:mt-12 flex flex-col gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-[#111B12]/70 mb-1 sm:mb-2">
              {language === "KOR" ? contactPageTranslations.requiredFields.ko : contactPageTranslations.requiredFields.en}
            </p>
            <StyledTextField id="contact-name" label={language === "KOR" ? questionsTranslations.form.name.ko : questionsTranslations.form.name.en} value={name} onChange={(e) => setName(e.target.value)} error={showValidationErrors && !name.trim()} sx={subscribeNoRadiusSx} />
            <StyledTextField id="contact-email" label={language === "KOR" ? questionsTranslations.form.email.ko : questionsTranslations.form.email.en} type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={showValidationErrors && !email.trim()} sx={subscribeNoRadiusSx} />
            <StyledTextField id="contact-number" label={language === "KOR" ? questionsTranslations.form.contactNumber.ko : questionsTranslations.form.contactNumber.en} type="tel" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} sx={subscribeNoRadiusSx} />
            <StyledTextField id="contact-title" select label={language === "KOR" ? questionsTranslations.form.title.ko : questionsTranslations.form.title.en} value={titleValue} onChange={(e) => setTitleValue(e.target.value)} sx={{ ...subscribeTitleSx, "& .MuiSelect-select": { color: titleValue === "" ? "rgba(17, 27, 18, 0.5)" : "#111B12" } }}>
              <MenuItem value="">
                <em>{language === "KOR" ? questionsTranslations.form.title.ko : questionsTranslations.form.title.en}</em>
              </MenuItem>
              <MenuItem value="prefer-not-to-say">{language === "KOR" ? "말하기를 원하지 않음" : "Preferred not to say"}</MenuItem>
              <MenuItem value="Mr">Mr</MenuItem>
              <MenuItem value="Ms">Ms</MenuItem>
              <MenuItem value="Mrs">Mrs</MenuItem>
            </StyledTextField>
            <StyledTextField id="contact-message" label={language === "KOR" ? questionsTranslations.form.message.ko : questionsTranslations.form.message.en} multiline rows={2} value={message} onChange={(e) => setMessage(e.target.value)} sx={subscribeNoRadiusSx} />
            <div className="mt-3 sm:mt-4">
              <button type="button" onClick={handleSubmit} className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-white leading-relaxed border border-[#495F2B] bg-[#495F2B] px-4 sm:px-5 py-1.5 hover:bg-[#627F38] hover:border-[#627F38] transition-all duration-300 cursor-pointer">
                {language === "KOR" ? questionsTranslations.button.ko : questionsTranslations.button.en}
                <Icons.CgArrowTopRight className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
