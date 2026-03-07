"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const icons = [
  <svg key="breakfast" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 21l-3-3m0 0-3 3m3-3v-6m-1.5-9.75H9.75a2.25 2.25 0 0 0-2.25 2.25v.75m7.5-3H14.25a2.25 2.25 0 0 0-2.25 2.25v.75m0 0h.008v.008H12v-.008Z" /></svg>,
  <svg key="wifi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" /></svg>,
  <svg key="transfer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>,
  <svg key="concierge" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>,
  <svg key="spa" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>,
  <svg key="multilingual" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
];

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
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frameId = 0;

    const updateActiveCard = () => {
      const cards = Array.from(
        track.querySelectorAll<HTMLElement>("[data-service-card='true']")
      );

      if (!cards.length) return;

      const viewportCenter = track.scrollLeft + track.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((current) =>
        current === closestIndex ? current : closestIndex
      );
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateActiveCard);
    };

    requestUpdate();
    track.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frameId);
      track.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [t.amenities.items]);

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    const cards = track?.querySelectorAll<HTMLElement>("[data-service-card='true']");
    const card = cards?.[index];

    if (!track || !card) return;

    track.scrollTo({
      left: Math.max(card.offsetLeft - 4, 0),
      behavior: "smooth",
    });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;

    const track = trackRef.current;
    if (!track) return;

    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = track.scrollLeft;
    setIsDragging(true);
    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const track = trackRef.current;
    if (!track) return;

    const deltaX = event.clientX - dragStartXRef.current;
    track.scrollLeft = dragStartScrollLeftRef.current - deltaX;
  };

  const stopDragging = (event?: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (event && track?.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);
  };

  return (
    <section id="amenities" className="py-28 px-6 lg:px-12 overflow-hidden" style={{ background: "var(--dark)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px" style={{ background: "var(--gold)" }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
            {t.amenities.tag}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="text-5xl md:text-6xl font-light italic leading-tight" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
            {t.amenities.title1}{" "}
            <br />
            <span style={{ color: "var(--gold)" }}>{t.amenities.title2}</span>
          </h2>
        </div>

        <div className="services-slider relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 md:w-12" style={{ background: "linear-gradient(90deg, var(--dark), transparent)" }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 md:w-12" style={{ background: "linear-gradient(270deg, var(--dark), transparent)" }} />

          <div
            ref={trackRef}
            className={`services-track flex gap-4 overflow-x-auto px-1 pb-5 md:gap-5 lg:px-0 ${isDragging ? "is-dragging" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            onPointerLeave={stopDragging}
          >
            {t.amenities.items.map((item, index) => (
              <article
                key={item.title}
                data-service-card="true"
                className="service-card group snap-start shrink-0 basis-[78vw] md:basis-[calc((100%-1.25rem)/2)] overflow-hidden rounded-[2rem]"
                style={{ background: "var(--dark-mid)" }}
              >
                <div
                  className="service-card-media relative aspect-[16/10] overflow-hidden"
                  style={{ background: cardSurfaces[index % cardSurfaces.length] }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.08) 100%)" }}
                  />
                  <div
                    className="service-card-glow absolute -right-12 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full blur-3xl"
                    style={{ background: "rgba(255,255,255,0.18)" }}
                  />
                  <div
                    className="absolute left-5 top-5 rounded-full px-4 py-2 text-[11px] tracking-[0.28em] uppercase"
                    style={{
                      background: "rgba(255,255,255,0.14)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "#fff",
                      fontFamily: "var(--font-raleway)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div
                    className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full backdrop-blur-md"
                    style={{
                      background: "rgba(20, 16, 12, 0.2)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "#fff",
                    }}
                  >
                    {icons[index]}
                  </div>
                  <div
                    className="absolute -bottom-8 left-6 text-[5.5rem] font-light leading-none opacity-15 md:text-[6.5rem]"
                    style={{ color: "#fff", fontFamily: "var(--font-cormorant)" }}
                  >
                    0{index + 1}
                  </div>
                </div>

                <div className="p-7 md:p-8">
                  <h3 className="mb-3 text-[1.75rem] md:text-[2rem] font-light" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
                    {item.title}
                  </h3>
                  <p className="max-w-[28rem] text-sm leading-7 md:text-[15px]" style={{ color: "var(--cream)", opacity: 0.7, fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-center gap-2">
            {t.amenities.items.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-label={`${item.title} kartina git`}
                onClick={() => scrollToCard(index)}
                className={`rounded-full transition-all duration-500 ${activeIndex === index ? "w-10" : "w-2"}`}
                style={{
                  height: "0.35rem",
                  background: activeIndex === index ? "var(--gold)" : "var(--border-strong)",
                  opacity: activeIndex === index ? 1 : 0.8,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
