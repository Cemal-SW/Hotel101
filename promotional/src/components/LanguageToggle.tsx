"use client";

import { useLanguage } from "./LanguageProvider";

interface LanguageToggleProps {
  isOverVideo?: boolean;
}

export default function LanguageToggle({ isOverVideo = false }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();

  const activeColor = "var(--gold)";
  const inactiveColor = isOverVideo ? "rgba(255,255,255,0.45)" : "var(--cream)";

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className="flex items-center gap-0.5 px-3 py-1.5 rounded-full transition-all duration-300"
      style={{
        fontFamily: "var(--font-raleway)",
        background: isOverVideo ? "rgba(255,255,255,0.1)" : "var(--border-color)",
        border: `1px solid ${isOverVideo ? "rgba(255,255,255,0.2)" : "var(--border-color)"}`,
      }}
    >
      <span
        className="text-xs font-semibold tracking-wider transition-colors duration-300"
        style={{ color: language === "tr" ? activeColor : inactiveColor }}
      >
        TR
      </span>
      <span
        className="text-xs mx-0.5"
        style={{ color: isOverVideo ? "rgba(255,255,255,0.25)" : "var(--border-strong)" }}
      >
        /
      </span>
      <span
        className="text-xs font-semibold tracking-wider transition-colors duration-300"
        style={{ color: language === "en" ? activeColor : inactiveColor }}
      >
        EN
      </span>
    </button>
  );
}
