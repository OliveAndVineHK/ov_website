"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { servicesTranslations } from "@/app/utils/pageUtils";
import { servicesPageTranslations } from "@/app/utils/pageServicesUtils";
import * as Icons from "@/app/utils/icons";

export default function Services() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const SERVICE_ROUTES: Record<string, string> = {
    corporate: "/corporate-service",
    accounting: "/accounting-service",
    assurance: "/assurance-service",
    tax: "/tax-service",
    service5: "/consulting-service",
    service6: "/hr-service",
  };

  const services = [
    { key: "corporate", image: "/home/os-corporate.svg", imageWhite: "/home/os-corporate-w.svg", imageSize: 156 },
    { key: "accounting", image: "/home/os-accounting.svg", imageWhite: "/home/os-accounting-w.svg", imageSize: 66 },
    { key: "assurance", image: "/home/os-assurance.svg", imageWhite: "/home/os-assurance-w.svg", imageSize: 80 },
    { key: "tax", image: "/home/os-tax.svg", imageWhite: "/home/os-tax-w.svg", imageSize: 66 },
    { key: "service5", image: "/home/os-consulting.svg", imageWhite: "/home/os-consulting-w.svg", imageSize: 80 },
    { key: "service6", image: "/home/os-hr.svg", imageWhite: "/home/os-hr-w.svg", imageSize: 80 },
  ];

  const toggleService = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionOpenBg = "rgba(233, 230, 213, 0.7)";

  const getServiceTranslation = (key: string) => {
    const homeTranslation = servicesTranslations[key as keyof typeof servicesTranslations];
    const servicesPageTranslation = servicesPageTranslations.services[key as keyof typeof servicesPageTranslations.services];
    
    if (!homeTranslation || typeof homeTranslation !== 'object' || !('title' in homeTranslation)) {
      return {
        title: { en: '', ko: '' },
        description: { en: '', ko: '' },
      };
    }
    
    return {
      title: homeTranslation.title,
      description: servicesPageTranslation ? { en: servicesPageTranslation.en, ko: servicesPageTranslation.ko } : homeTranslation.description,
    };
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-semibold text-[#495F2B]">
            {(language === "KOR" ? servicesTranslations.heading.ko : servicesTranslations.heading.en).split('\n').map((line, index, array) => (
              <span key={index}>
                {line}
                {index < array.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-[16px] text-[#111B12] leading-relaxed w-full text-justify mt-6 md:mt-8">
            {language === "KOR" ? servicesPageTranslations.description.ko : servicesPageTranslations.description.en}
          </p>
          <div className="w-full flex flex-col gap-4 mt-12 md:mt-16">
            {services.map((service, index) => {
              const isOpen = openIndex === index;
              const translation = getServiceTranslation(service.key);
              const serviceTitle = language === "KOR" ? translation.title.ko : translation.title.en;
              const serviceDescription = language === "KOR" ? translation.description.ko : translation.description.en;

              return (
                <div key={index} className={`w-full overflow-hidden transition-all duration-300 ${isOpen ? "border-0 rounded-tr-[30px]" : "border border-[#111B12]/50 bg-white hover:rounded-tr-[30px]"}`} style={isOpen ? { backgroundColor: accordionOpenBg } : undefined}>
                  <button onClick={() => toggleService(index)} className="w-full p-3 sm:p-4 md:p-6 flex items-center justify-between cursor-pointer gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 relative">
                        <Image src={service.image} alt={serviceTitle} fill className="object-contain" sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 56px" />
                      </div>
                      <span className="text-xl sm:text-xl md:text-2xl lg:text-[24px] text-[#111B12]/80 transition-all duration-300 truncate">{serviceTitle}</span>
                    </div>
                    <div className="flex items-center justify-center shrink-0">
                      {isOpen ? (
                        <Icons.CiCircleMinus className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#888D88]" />
                      ) : (
                        <Icons.CiCirclePlus className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#888D88]" />
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="p-4 sm:p-6 pt-0 sm:pt-0">
                      <div className="flex gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0" aria-hidden />
                        <div className="flex flex-col flex-1 min-w-0 w-full">
                          <p className="text-sm sm:text-base md:text-lg lg:text-[16px] text-[#111B12]/70 leading-relaxed mb-3 sm:mb-4 text-justify w-full" dangerouslySetInnerHTML={{__html: serviceDescription}} />
                          <div className="mt-3 sm:mt-4 flex justify-end w-full">
                            {SERVICE_ROUTES[service.key] ? (
                              <Link href={SERVICE_ROUTES[service.key]} className="text-sm sm:text-base md:text-[16px] text-[#627F38] font-medium hover:underline hover:text-[#627F38]/60 transition-all duration-300 cursor-pointer">
                                {language === "KOR" ? "더 알아보기" : "Learn more"}
                              </Link>
                            ) : (
                              <button className="text-sm sm:text-base md:text-[16px] text-[#627F38] font-medium hover:underline hover:text-[#627F38]/60 transition-all duration-300 cursor-pointer">
                                {language === "KOR" ? "더 알아보기" : "Learn more"}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}