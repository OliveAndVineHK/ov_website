"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { footerTranslations, questionsTranslations } from "@/app/utils/pageUtils";
import * as Icons from "@/app/utils/icons";
import { createBgStyle } from "@/app/utils/styleUtils";

export default function Footer() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const isContactPage = pathname === "/contact";
  const isSubscribePage = pathname === "/subscribe";
  const showQuestionsSection = !isContactPage && !isSubscribePage;

  const [formData, setFormData] = useState({ name: "", contactNumber: "", email: "", title: "", message: "" });
  const updateField = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleFooterSubmit = () => {
    if (!formData.name.trim() || !formData.email.trim()) return;
    // TODO: API 연동 — POST /api/questions
    console.info("[Footer] Form submitted:", formData);
  };

  const toggleLanguage = () => setLanguage(language === "KOR" ? "ENG" : "KOR");
  const questionsBackgroundStyle = createBgStyle("/home/questions-bg.svg");

  return (
    <>
      {showQuestionsSection && (
        <section className="w-full py-12 md:py-28" style={questionsBackgroundStyle}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="w-full md:w-1/2 flex flex-col">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-white" dangerouslySetInnerHTML={{ __html: language === "KOR" ? questionsTranslations.title.ko : questionsTranslations.title.en }} />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="name" className="block text-sm text-white/70 mb-1">{language === "KOR" ? questionsTranslations.form.name.ko : questionsTranslations.form.name.en}</label>
                <input type="text" id="name" value={formData.name} onChange={updateField("name")} className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white pb-2" />
              </div>
              <div className="flex-1">
                <label htmlFor="contact-number" className="block text-sm text-white/70 mb-1">{language === "KOR" ? questionsTranslations.form.contactNumber.ko : questionsTranslations.form.contactNumber.en}</label>
                <input type="tel" id="contact-number" value={formData.contactNumber} onChange={updateField("contactNumber")} className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white pb-2" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="email" className="block text-sm text-white/70 mb-1">{language === "KOR" ? questionsTranslations.form.email.ko : questionsTranslations.form.email.en}</label>
                <input type="email" id="email" value={formData.email} onChange={updateField("email")} className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white pb-2" />
              </div>
              <div className="flex-1">
                <label htmlFor="title" className="block text-sm text-white/70 mb-1">{language === "KOR" ? questionsTranslations.form.title.ko : questionsTranslations.form.title.en}</label>
                <input type="text" id="title" value={formData.title} onChange={updateField("title")} className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white pb-2" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1">
                <label htmlFor="message" className="block text-sm text-white/70 mb-1">{language === "KOR" ? questionsTranslations.form.message.ko : questionsTranslations.form.message.en}</label>
                <textarea id="message" value={formData.message} onChange={updateField("message")} className="w-full min-h-[100px] sm:min-h-[120px] bg-transparent border-b border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white pb-2 resize-y" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-start mt-4">
              <div className="w-full sm:w-auto">
                <button type="button" onClick={handleFooterSubmit} className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-[#111B12]/70 leading-relaxed bg-white px-5 py-1.5 hover:bg-[#495F2B] hover:border-[#627F38] hover:text-white transition-all duration-300 cursor-pointer shrink-0">
                  {language === "KOR" ? questionsTranslations.button.ko : questionsTranslations.button.en}
                  <Icons.CgArrowTopRight className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          </div> 
        </div>
      </section>
      )}
      <section data-footer className="w-full pt-8 pb-6 sm:pt-12 sm:pb-6 md:pt-20 md:pb-6 lg:pt-28 lg:pb-6 bg-[#282A28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 lg:gap-12">
            <Link href="/" className="text-xs sm:text-sm md:text-[14px] text-white hover:text-[#627F38] transition-colors cursor-pointer">{language === "KOR" ? footerTranslations.navigation.home.ko : footerTranslations.navigation.home.en}</Link>
            <Link href="/about" className="text-xs sm:text-sm md:text-[14px] text-white hover:text-[#627F38] transition-colors cursor-pointer">{language === "KOR" ? footerTranslations.navigation.about.ko : footerTranslations.navigation.about.en}</Link>
            <Link href="/services" className="text-xs sm:text-sm md:text-[14px] text-white hover:text-[#627F38] transition-colors cursor-pointer">{language === "KOR" ? footerTranslations.navigation.services.ko : footerTranslations.navigation.services.en}</Link>
            <Link href="/insights" className="text-xs sm:text-sm md:text-[14px] text-white hover:text-[#627F38] transition-colors cursor-pointer">{language === "KOR" ? footerTranslations.navigation.insights.ko : footerTranslations.navigation.insights.en}</Link>
            <Link href="/contact" className="text-xs sm:text-sm md:text-[14px] text-white hover:text-[#627F38] transition-colors cursor-pointer">{language === "KOR" ? footerTranslations.navigation.contact.ko : footerTranslations.navigation.contact.en}</Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-3 sm:gap-4 mt-6 md:mt-0">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:justify-end">
            <Link href="/">
              <Image src="/logo-w.png" alt="Olive & Vine Logo" width={60} height={60} className="object-contain cursor-pointer w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px]" unoptimized />
            </Link>
            <Link href="/">
              <span className="font-lang-toggle text-lg sm:text-xl md:text-2xl lg:text-[50px] font-bold text-white cursor-pointer">Olive & Vine</span>
            </Link>
          </div>
          <div className="w-full flex flex-col sm:flex-row md:items-end md:justify-end gap-4 sm:gap-6 md:gap-26">
            <div className="flex flex-col">
              <p className="font-lang-toggle text-xs sm:text-sm md:text-[14px] text-white/80 leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: "contact@oliveandvinehk.com<br />+852 6042 3884<br />Room 580, Level 5, K11 Atelier<br />728 King's Road, Quarry Bay<br />Hong Kong" }} />
            </div>
            <div className="flex items-start sm:items-end">
              <button onClick={toggleLanguage} className="font-lang-toggle text-xs sm:text-sm md:text-base font-medium text-white hover:text-white/80 transition-all duration-300 cursor-pointer hover:scale-110" aria-label={`Switch language to ${language === "KOR" ? "English" : "Korean"}`}>
                <span key={language} className="inline-block transition-all duration-300 ease-in-out">
                  {language}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 pt-6 sm:pt-8 md:pt-10">
        <div className="border-t border-white/20 w-full"></div>
        <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 pt-4 sm:pt-6">
          <p className="font-lang-toggle text-xs sm:text-sm md:text-[14px] text-white/30 whitespace-nowrap">{language === "KOR" ? footerTranslations.copyright.ko : footerTranslations.copyright.en}</p>
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <button className="text-xs sm:text-sm md:text-[14px] text-white/30 hover:text-white transition-colors cursor-pointer whitespace-nowrap">{language === "KOR" ? footerTranslations.privacy.ko : footerTranslations.privacy.en}</button>
            <button className="text-xs sm:text-sm md:text-[14px] text-white/30 hover:text-white transition-colors cursor-pointer whitespace-nowrap">{language === "KOR" ? footerTranslations.terms.ko : footerTranslations.terms.en}</button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
