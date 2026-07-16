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
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async () => {
    const hasEmpty = !name.trim() || !email.trim();
    setShowValidationErrors(hasEmpty);
    if (hasEmpty) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, contactNumber, title: titleValue, message }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("sent");
      setName("");
      setEmail("");
      setContactNumber("");
      setTitleValue("");
      setMessage("");
    } catch (err) {
      console.error("[Contact] Submit failed:", err);
      setStatus("error");
    }
  };

  const contactBackgroundStyle = createBgStyle("/contact/contact-bg.svg");

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-semibold text-[#495F2B]">
            {language === "KOR" ? "문의하기" : "Contact"}
          </h2>
        </div>
      </section>
      <section className="relative overflow-hidden w-full min-h-[45vh] sm:min-h-[40vh] md:min-h-[50vh] lg:min-h-[600px] py-12 md:py-16 flex flex-col" style={contactBackgroundStyle}>
        {/* Soft cream wash over the curve motif so the dark quote text stays
            comfortably legible where the olive curves cross it (opacity
            layering — no blur). */}
        <div aria-hidden className="absolute inset-0 bg-[#E9E6D5]/55 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 flex flex-1 flex-col items-end justify-end w-full">
          <div className="max-w-3xl">
            <p className="text-base sm:text-lg md:text-xl lg:text-[32px] text-[#111B12] leading-relaxed">
              {language === "KOR" ? "올리브 앤 바인은 진정성과 책임감을 바탕으로 고객을 깊이 이해하고 함께 고민하는 것을 중요하게 생각합니다. 동시에, 항상 객관성과 독립성을 유지하여 고객이 스스로 올바른 판단을 내릴 수 있도록 돕습니다." : "Our culture is built on integrity and only motivated by a collective commitment with strong compassion. We truly enjoy providing clients with unbiased and empowering service."}
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#111B12]/80">
            {language === "KOR" ? "문의 남기기" : "Connect with us"}
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
              <MenuItem value="Mr">Mr</MenuItem>
              <MenuItem value="Ms">Ms</MenuItem>
              <MenuItem value="Mrs">Mrs</MenuItem>
            </StyledTextField>
            <StyledTextField id="contact-message" label={language === "KOR" ? questionsTranslations.form.message.ko : questionsTranslations.form.message.en} multiline rows={2} value={message} onChange={(e) => setMessage(e.target.value)} sx={subscribeNoRadiusSx} />
            <div className="mt-3 sm:mt-4">
              <button type="button" onClick={handleSubmit} disabled={status === "sending"} className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-white leading-relaxed border border-[#495F2B] bg-[#495F2B] px-4 sm:px-5 py-1.5 hover:bg-[#627F38] hover:border-[#627F38] transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                {status === "sending"
                  ? language === "KOR" ? "전송 중..." : "Sending..."
                  : language === "KOR" ? questionsTranslations.button.ko : questionsTranslations.button.en}
                <Icons.CgArrowTopRight className="size-4" aria-hidden />
              </button>
              {status === "sent" && (
                <p className="mt-3 text-sm text-[#495F2B]">
                  {language === "KOR" ? "문의가 성공적으로 전송되었습니다. 감사합니다." : "Your message has been sent. Thank you."}
                </p>
              )}
              {status === "error" && (
                <p className="mt-3 text-sm text-[#8A2B2B]">
                  {language === "KOR" ? "전송에 실패했습니다. 잠시 후 다시 시도해 주세요." : "Something went wrong. Please try again later."}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
