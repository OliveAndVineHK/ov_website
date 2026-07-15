"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language is intentionally NOT persisted: every visit starts in English
// regardless of what the visitor chose last time. The toggle only lasts for
// the current session (in-memory state). localStorage read/write was removed
// on 2026-07-15 at the owner's request — do not re-add persistence without
// checking with the owner.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("ENG");

  useEffect(() => {
    document.documentElement.setAttribute("data-lang", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
