"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";
import { getDocumentPageName } from "../utils/pageUtils";

export default function PageTitle() {
  const pathname = usePathname();
  const { language } = useLanguage();

  useEffect(() => {
    const pageName = getDocumentPageName(pathname, language);
    const title = `${pageName} | Olive & Vine`;

    const setTitle = () => {
      if (document.title !== title) {
        document.title = title;
      }
    };

    setTitle();
    const timeout = setTimeout(setTitle, 0);
    const raf = requestAnimationFrame(setTitle);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [pathname, language]);

  return null;
}
