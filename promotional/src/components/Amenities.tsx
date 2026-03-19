"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const cardSurfaces = [
  "radial-gradient(circle at 22% 18%, rgba(255,255,255,0.32), transparent 22%), linear-gradient(135deg, #a85c3a 0%, #e2b07a 46%, #f4e0c7 100%)",
  "radial-gradient(circle at 74% 24%, rgba(255,255,255,0.28), transparent 20%), linear-gradient(135deg, #1d3345 0%, #4c718c 45%, #dce5eb 100%)",
  "radial-gradient(circle at 24% 24%, rgba(255,255,255,0.24), transparent 18%), linear-gradient(135deg, #2d211b 0%, #6a4633 46%, #d8c1a3 100%)",
  "radial-gradient(circle at 75% 26%, rgba(255,255,255,0.22), transparent 18%), linear-gradient(135deg, #3b2a23 0%, #8f644f 46%, #efe0cf 100%)",
  "radial-gradient(circle at 28% 26%, rgba(255,255,255,0.26), transparent 18%), linear-gradient(135deg, #5a4028 0%, #a57958 46%, #f2d9bf 100%)",
  "radial-gradient(circle at 74% 26%, rgba(255,255,255,0.24), transparent 18%), linear-gradient(135deg, #23323b 0%, #567480 48%, #d6e1e5 100%)",
];

export default function Amenities() {
  const { t } = useLanguage();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCategory = t.amenities.categories[activeCategoryIndex];
  const activeItems = activeCategory.items;
  const count = activeItems.length;

  const goTo = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, count - 1)));
  }, [count]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
  }, [count]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategoryIndex]);

  return (
    <section id="amenities" className="py-24 md:py-28 px-6 lg:px-12 overflow-hidden" style={{ background: "var(--dark)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <div className="w-12 h-px" style={{ background: "var(--gold)" }} />
          <span
            className="text-[0.92rem] tracking-[0.24em] uppercase"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)", fontWeight: 500 }}
          >
            {t.amenities.tag}
          </span>
        </div>

        <div className="mb-6 md:mb-8">
          <h2
            className="text-[3.55rem] md:text-[4.7rem] font-light italic leading-[0.92] tracking-[-0.04em]"
            style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
          >
            {t.amenities.title1}{" "}
            <span style={{ color: "var(--gold)" }}>{t.amenities.title2}</span>
          </h2>
        </div>

        {/* Buttons + gallery — blok sayfa ortasında */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-10 w-full">
          {/* Sol: kategori butonları */}
          <div className="flex flex-col gap-3 pt-1 md:pt-0 w-full max-w-[18rem] shrink-0">
            {t.amenities.categories.map((category, index) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategoryIndex(index)}
                className={`amenities-category-btn group w-full rounded-[1.5rem] border px-6 py-4 text-left
                  motion-safe:transition-[transform,box-shadow,border-color,background-color] motion-safe:duration-400 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]
                  hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
                  active:translate-y-0 active:scale-[0.99]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--dark)]
                  motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:hover:shadow-none
                  ${activeCategoryIndex === index ? "shadow-[0_8px_36px_rgba(0,0,0,0.06)] ring-1 ring-[var(--gold)]/35" : ""}`}
                style={{
                  borderColor: activeCategoryIndex === index ? "var(--gold)" : "var(--border-color)",
                  background: activeCategoryIndex === index ? "var(--gold-tint)" : "transparent",
                  animationDelay: `${index * 95}ms`,
                }}
              >
                <span
                  className="text-[1.45rem] md:text-[1.7rem] font-light italic tracking-[-0.03em] motion-safe:transition-[color,opacity,transform] motion-safe:duration-400 group-hover:translate-x-0.5"
                  style={{
                    color: activeCategoryIndex === index ? "var(--gold)" : "var(--cream)",
                    opacity: activeCategoryIndex === index ? 1 : 0.6,
                    fontFamily: "var(--font-cormorant)",
                  }}
                >
                  {category.title}
                </span>
              </button>
            ))}
          </div>

          {/* Sağ: galeri + dots */}
          <div className="relative w-full max-w-[min(100%,40rem)] md:max-w-[min(100%,44rem)] flex flex-col shrink-0 min-w-0">
          {/* 3:2 slot — sources 1500×1000 etc. + object-cover */}
          <div className="relative w-full aspect-[3/2]">
          {/* Left button — white circle, black arrow, overlaps card left edge */}
          <button
            type="button"
            aria-label="Önceki"
            onClick={goPrev}
            className="absolute left-6 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/40 shadow-md backdrop-blur-md transition-all duration-200 hover:bg-white/55 md:left-8 md:h-11 md:w-11"
            style={{ color: "#0d0d0d" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 md:h-5 md:w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.5 5.5-6 6 6 6" />
            </svg>
          </button>

          {/* Right button — white circle, black arrow, overlaps card right edge */}
          <button
            type="button"
            aria-label="Sonraki"
            onClick={goNext}
            className="absolute right-6 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/40 shadow-md backdrop-blur-md transition-all duration-200 hover:bg-white/55 md:right-8 md:h-11 md:w-11"
            style={{ color: "#0d0d0d" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 md:h-5 md:w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9.5 5.5 6 6-6 6" />
            </svg>
          </button>

          {/* Cards: single visible card, crossfade (no sliding) */}
          <div className="mx-11 h-full sm:mx-12 md:mx-14">
            {activeItems.map((item, index) => (
              <div
                key={`${activeCategory.id}-${item.title}`}
                className="absolute inset-0 overflow-hidden rounded-[1.5rem] transition-opacity duration-300"
                style={{
                  opacity: activeIndex === index ? 1 : 0,
                  pointerEvents: activeIndex === index ? "auto" : "none",
                }}
              >
                <div className="absolute inset-0" style={{ background: cardSurfaces[index % cardSurfaces.length] }} />
                {/* Gradient overlay with soft left/right fade so buttons sit in a carved, soft-edged area */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.35) 100%)",
                    maskImage: "linear-gradient(90deg, transparent 0, black 100px, black calc(100% - 100px), transparent 100%)",
                    WebkitMaskImage: "linear-gradient(90deg, transparent 0, black 100px, black calc(100% - 100px), transparent 100%)",
                    maskSize: "100% 100%",
                    WebkitMaskSize: "100% 100%",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                />

                <div
                  className="absolute top-4 left-5 sm:top-6 sm:left-7 text-[4rem] sm:text-[5.5rem] font-light leading-none select-none pointer-events-none"
                  style={{ color: "rgba(255,255,255,0.10)", fontFamily: "var(--font-cormorant)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-10 pointer-events-none">
                  <h3
                    className="text-[1.4rem] sm:text-[1.9rem] lg:text-[2.4rem] font-light italic leading-[1.1] tracking-[-0.03em] mb-2 max-w-xl"
                    style={{ color: "#fff", fontFamily: "var(--font-cormorant)", textShadow: "0 2px 16px rgba(0,0,0,0.45)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[0.85rem] sm:text-[0.95rem] leading-relaxed max-w-lg"
                    style={{ color: "rgba(255,255,255,0.78)", fontFamily: "var(--font-raleway)", fontWeight: 300, textShadow: "0 1px 10px rgba(0,0,0,0.3)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots — under gallery, same width as block above */}
        <div className="flex items-center justify-center mt-4 shrink-0 w-full">
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-2"
            style={{ background: "var(--dark)", border: "1px solid var(--border-color)" }}
          >
            {activeItems.map((item, index) => (
              <button
                key={`${activeCategory.id}-${item.title}-dot`}
                type="button"
                aria-label={item.title}
                onClick={() => goTo(index)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === index ? "2rem" : "0.5rem",
                  height: "0.5rem",
                  background: activeIndex === index ? "var(--gold)" : "var(--border-color)",
                }}
              />
            ))}
          </div>
        </div>
        </div>
        </div>
      </div>
    </section>
  );
}
