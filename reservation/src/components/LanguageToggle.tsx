"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className="flex items-center gap-0.5 px-3 py-1.5 rounded-full transition-all duration-300"
      style={{
        fontFamily: "var(--font-raleway)",
        background: "var(--border-color)",
        border: "1px solid var(--border-color)",
      }}
    >
      <span
        className="text-xs font-semibold tracking-wider transition-colors duration-300"
        style={{ color: language === "tr" ? "var(--gold)" : "var(--cream)", opacity: language === "tr" ? 1 : 0.45 }}
      >
        TR
      </span>
      <span className="text-xs mx-0.5" style={{ color: "var(--border-strong)" }}>/</span>
      <span
        className="text-xs font-semibold tracking-wider transition-colors duration-300"
        style={{ color: language === "en" ? "var(--gold)" : "var(--cream)", opacity: language === "en" ? 1 : 0.45 }}
      >
        EN
      </span>
    </button>
  );
}
