"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Language, translations, Translations } from "@/translations";

interface LanguageContextType {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "tr",
  t: translations.tr,
  toggleLanguage: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr");

  useEffect(() => {
    const stored = localStorage.getItem("sarosvadi-lang") as Language | null;
    const initial = stored ?? "tr";
    setLanguage(initial);
    document.documentElement.lang = initial;
  }, []);

  const toggleLanguage = () => {
    const next: Language = language === "tr" ? "en" : "tr";
    setLanguage(next);
    document.documentElement.lang = next;
    localStorage.setItem("sarosvadi-lang", next);
  };

  return (
    <LanguageContext.Provider value={{ language, t: translations[language] as Translations, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
