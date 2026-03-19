"use client";

import { useLanguage } from "./LanguageProvider";

export default function Welcome() {
  const { t } = useLanguage();

  const stats = [
    { value: "24", label: t.welcome.statRooms },
    { value: "15+", label: t.welcome.statYears },
    { value: "∞", label: t.welcome.statExp },
  ];

  return (
    <section id="welcome" className="py-24 md:py-28 px-6 lg:px-12" style={{ background: "var(--dark)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <div className="w-12 h-px" style={{ background: "var(--gold)" }} />
          <span className="text-[0.92rem] tracking-[0.24em] uppercase" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)", fontWeight: 500 }}>
            {t.welcome.tag}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            <h2
              className="text-[3.55rem] md:text-[4.7rem] font-light italic leading-[0.92] mb-6 tracking-[-0.04em]"
              style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
            >
              {t.welcome.title}{" "}
              <span style={{ color: "var(--gold)" }}>{t.welcome.titleHighlight}</span>
            </h2>
            <p className="mb-4 opacity-75" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
              {t.welcome.p1}
            </p>
            <p className="opacity-75" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
              {t.welcome.p2}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-[2rem] text-center py-7 md:py-8 px-4 border hover:border-[var(--gold)]/40 transition-colors duration-500"
                style={{ borderColor: "var(--border-color)", background: "var(--dark-mid)" }}
              >
                <span className="text-5xl font-light mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)" }}>
                  {stat.value}
                </span>
                <span className="text-xs tracking-[0.2em] uppercase opacity-70" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
