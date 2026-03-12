"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const cardSurfaces = [
  "radial-gradient(circle at 22% 18%, rgba(255,255,255,0.32), transparent 22%), linear-gradient(135deg, #a85c3a 0%, #e2b07a 46%, #f4e0c7 100%)",
  "radial-gradient(circle at 74% 24%, rgba(255,255,255,0.28), transparent 20%), linear-gradient(135deg, #1d3345 0%, #4c718c 45%, #dce5eb 100%)",
  "radial-gradient(circle at 24% 24%, rgba(255,255,255,0.24), transparent 18%), linear-gradient(135deg, #2d211b 0%, #6a4633 46%, #d8c1a3 100%)",
  "radial-gradient(circle at 75% 26%, rgba(255,255,255,0.22), transparent 18%), linear-gradient(135deg, #3b2a23 0%, #8f644f 46%, #efe0cf 100%)",
  "radial-gradient(circle at 28% 26%, rgba(255,255,255,0.26), transparent 18%), linear-gradient(135deg, #5a4028 0%, #a57958 46%, #f2d9bf 100%)",
  "radial-gradient(circle at 74% 26%, rgba(255,255,255,0.24), transparent 18%), linear-gradient(135deg, #23323b 0%, #567480 48%, #d6e1e5 100%)",
];

const AUTOPLAY_MS = 5000;

export default function Amenities() {
  const { t } = useLanguage();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(Date.now());

  const activeCategory = t.amenities.categories[activeCategoryIndex];
  const activeItems = activeCategory.items;
  const count = activeItems.length;

  const goTo = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, count - 1)));
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [count]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [count]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [count]);

  useEffect(() => {
    setActiveIndex(0);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [activeCategoryIndex]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isPlaying) { setProgress(0); return; }

    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const p = Math.min((Date.now() - startTimeRef.current) / AUTOPLAY_MS, 1);
      setProgress(p);
    }, 50);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, activeIndex]);

  return (
    <section id="amenities" className="py-16 overflow-hidden" style={{ background: "var(--dark)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px" style={{ background: "var(--gold)" }} />
          <span
            className="text-[0.92rem] tracking-[0.24em] uppercase"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)", fontWeight: 500 }}
          >
            {t.amenities.tag}
          </span>
        </div>

        <div className="mb-10">
          <h2
            className="text-[3.55rem] md:text-[4.7rem] font-light italic leading-[0.92] tracking-[-0.04em]"
            style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
          >
            {t.amenities.title1}{" "}
            <span style={{ color: "var(--gold)" }}>{t.amenities.title2}</span>
          </h2>
        </div>

        <div className="flex items-end gap-0 mb-10 border-b" style={{ borderColor: "var(--border-color)" }}>
          {t.amenities.categories.map((category, index) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategoryIndex(index)}
              className="relative px-6 py-4 text-left transition-all duration-300"
              style={{
                borderBottom: activeCategoryIndex === index ? "2px solid var(--gold)" : "2px solid transparent",
                marginBottom: "-1px",
              }}
            >
              <span
                className="text-[1.55rem] md:text-[1.85rem] font-light italic tracking-[-0.03em] transition-colors duration-300"
                style={{
                  color: activeCategoryIndex === index ? "var(--gold)" : "var(--cream)",
                  opacity: activeCategoryIndex === index ? 1 : 0.45,
                  fontFamily: "var(--font-cormorant)",
                }}
              >
                {category.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Gallery with left/right buttons overlapping the card */}
      <div className="relative w-full px-4 sm:px-6 lg:px-10">
        <div className="relative" style={{ height: "clamp(480px, 82vh, 900px)" }}>
          {/* Left button — white circle, black arrow, overlaps card left edge */}
          <button
            type="button"
            aria-label="Önceki"
            onClick={goPrev}
            className="absolute left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full shadow-md transition-all duration-200 hover:opacity-90 md:left-8 md:h-14 md:w-14"
            style={{
              background: "#fff",
              color: "#0d0d0d",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 md:h-6 md:w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.5 5.5-6 6 6 6" />
            </svg>
          </button>

          {/* Right button — white circle, black arrow, overlaps card right edge */}
          <button
            type="button"
            aria-label="Sonraki"
            onClick={goNext}
            className="absolute right-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full shadow-md transition-all duration-200 hover:opacity-90 md:right-8 md:h-14 md:w-14"
            style={{
              background: "#fff",
              color: "#0d0d0d",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 md:h-6 md:w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9.5 5.5 6 6-6 6" />
            </svg>
          </button>

          {/* Cards: single visible card, crossfade (no sliding) */}
          <div className="mx-14 h-full md:mx-16">
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
      </div>

      {/* Controls — unchanged */}
      <div className="flex items-center justify-center gap-3 mt-6">
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
              className="relative rounded-full overflow-hidden transition-all duration-500"
              style={{
                width: activeIndex === index ? "2.5rem" : "0.5rem",
                height: "0.5rem",
                background: activeIndex === index ? "var(--border-strong)" : "var(--border-color)",
              }}
            >
              {activeIndex === index && isPlaying && (
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${progress * 100}%`, background: "var(--gold)", transition: "width 50ms linear" }}
                />
              )}
              {activeIndex === index && !isPlaying && (
                <div className="absolute inset-0 rounded-full" style={{ background: "var(--gold)" }} />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label={isPlaying ? "Duraklat" : "Oynat"}
          onClick={() => setIsPlaying((p) => !p)}
          className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
          style={{ background: "var(--dark)", border: "1px solid var(--border-color)", color: "var(--cream)" }}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M8 5h2.5v14H8zm5.5 0H16v14h-2.5z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M8 5.14v13.72a.5.5 0 0 0 .76.43l10.94-6.86a.5.5 0 0 0 0-.86L8.76 4.71a.5.5 0 0 0-.76.43z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
