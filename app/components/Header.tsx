"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ToggleMenu from "./ToggleMenu";
import { getTranslatedPageName, getMenuLabel } from "../utils/pageUtils";
import { useLanguage } from "../contexts/LanguageContext";
import * as Icons from "../utils/icons";

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const pageName = getTranslatedPageName(pathname, language);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  /* Close the expanded menu when the user clicks outside the header,
     and on Escape. The X button still works (it lives inside the
     header). Effect only listens while the menu is open. */
  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointer = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isMenuOpen]);

  const toggleLanguage = () => {
    setLanguage(language === "KOR" ? "ENG" : "KOR");
  };

  const menuItems = [
    { href: "/", label: "Home" },
    { 
      href: "/about", 
      label: "About",
      hasDrawer: true,
      drawerItems: [
        { href: "/about", label: "About us" },
        { href: "/our-values", label: "Our-values" },
        { href: "/leadership", label: "Leadership" }
      ]
    },
    { href: "/services", label: "Services" },
    { href: "/insights", label: "Insights" },
    { href: "/contact", label: "Contact" },
  ].map(item => ({
    ...item,
    translatedLabel: getMenuLabel(item.label, language),
    drawerItems: item.hasDrawer ? item.drawerItems?.map(drawerItem => ({
      ...drawerItem,
      translatedLabel: getMenuLabel(drawerItem.label, language)
    })) : undefined
  }));


  return (
    <header ref={headerRef} className={`w-full bg-white sticky top-0 z-40 transition-all duration-300 relative ${isMenuOpen ? 'xl:bg-[#F9F8F3]' : ''}`}>
      {isMenuOpen && <div className="hidden xl:block absolute inset-0 bg-[#F9F8F3] z-0"></div>}
      <nav className={`relative z-10 flex flex-col max-w-7xl xl:max-w-none mx-auto p-2 xl:py-4 xl:px-0 transition-all duration-300 ${isMenuOpen ? 'bg-[#F9F8F3]' : 'bg-white'}`}>
        <div className="flex items-center justify-between xl:max-w-7xl xl:mx-auto xl:w-full xl:px-4">
          <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
            <Link href="/" className="flex-shrink-0">
              <Image className="cursor-pointer flex-shrink-0" src="/logo.png" alt="Olive & Vine Logo" width={30} height={30} priority/>
            </Link>
            <Link href="/" className="flex-shrink-0">
              <h1 className="font-lang-toggle text-lg sm:text-xl md:text-[26px] font-bold text-[#495F2B] cursor-pointer flex-shrink-0">OLIVE & VINE</h1>
            </Link>
            <span className="text-xs sm:text-sm md:text-base font-semibold text-[#495F2B] pl-2 sm:pl-4 md:pl-6 truncate">
              {pageName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleLanguage} className="font-lang-toggle text-sm md:text-base font-medium text-[#495F2B] hover:text-[#495F2B]/80 transition-all duration-300 cursor-pointer relative min-w-[3rem] hover:scale-110" aria-label={`Switch language to ${language === "KOR" ? "English" : "Korean"}`}>
              <span key={language} className="inline-block transition-all duration-300 ease-in-out transform group-hover:scale-110">
                {language}
              </span>
            </button>
            <ToggleMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
          </div>
        </div>
        <div className={`absolute top-full left-0 right-0 bg-[#F9F8F3] overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} toggle-menu-bg`} style={isMenuOpen ? { backgroundImage: 'url(/toggle-bg.svg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' } : {}}>
          {isMenuOpen && (
            <div className="max-w-7xl xl:max-w-none mx-auto xl:mx-0 px-2 xl:px-4 flex flex-col gap-2 py-4">
              <div className="xl:max-w-7xl xl:mx-auto xl:w-full xl:pl-[38px] xl:pr-0">
                {menuItems.map((item) => (
                  <div key={item.href}>
                    {item.hasDrawer ? (
                      <>
                        <div className="w-full text-left px-4 xl:px-0 py-2 text-[20px] font-medium text-[#495F2B]">
                          {item.translatedLabel}
                        </div>
                        {item.drawerItems && (
                          <div className="pl-4">
                            {item.drawerItems.map((drawerItem) => (
                              <a key={drawerItem.href} href={drawerItem.href} onClick={() => setIsMenuOpen(false)} className="block px-4 py-1 text-[16px] text-[#495F2B] hover:text-[#495F2B]/70 transition-colors focus:outline-none">{drawerItem.translatedLabel}</a>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <a href={item.href} onClick={() => setIsMenuOpen(false)} className="block px-4 xl:px-0 py-2 text-[20px] font-medium text-[#495F2B] hover:text-[#495F2B]/70 transition-colors focus:outline-none">{item.translatedLabel}</a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
