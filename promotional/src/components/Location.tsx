"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

const cardLayouts = [
  { outer: "md:translate-y-6", mediaHeight: "h-44 md:h-52" },
  { outer: "md:-translate-y-3", mediaHeight: "h-48 md:h-[14.5rem]" },
  { outer: "md:translate-y-6", mediaHeight: "h-[10.5rem] md:h-48" },
  { outer: "md:-translate-y-3", mediaHeight: "h-[11.5rem] md:h-[13.5rem]" },
] as const;

const cardImages = [
  "/media/hotel/hotel-01.jpeg",
  "/media/hotel/hotel-02.jpeg",
  "/media/hotel/hotel-03.jpeg",
  "/media/hotel/hotel-04.jpeg",
] as const;

interface LocationProps {
  reservationUrl: string;
}

export default function Location({ reservationUrl }: LocationProps) {
  const { t } = useLanguage();

  return (
    <section id="location" className="relative py-32 px-6 lg:px-12 overflow-hidden">
      <Image
        src="/media/hotel/hotel-16.jpg"
        alt="Saros Vadi location"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-8 border border-white/10 pointer-events-none" />

      <div className="relative z-10 max-w-[100rem] mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px" style={{ background: "var(--gold)" }} />
            <span
              className="text-[0.92rem] tracking-[0.24em] uppercase"
              style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)", fontWeight: 500 }}
            >
              {t.location.tag}
            </span>
            <div className="w-12 h-px" style={{ background: "var(--gold)" }} />
          </div>

          <h2
            className="text-[3.55rem] md:text-[4.7rem] font-light italic leading-[0.92] mb-6 tracking-[-0.04em]"
            style={{ color: "#F5EFE7", fontFamily: "var(--font-cormorant)" }}
          >
            {t.location.title}{" "}
            <span style={{ color: "var(--gold)" }}>{t.location.titleHighlight}</span>
          </h2>

          <p
            className="mb-12"
            style={{
              color: "rgba(245,239,231,0.76)",
              fontFamily: "var(--font-raleway)",
              fontWeight: 300,
            }}
          >
            {t.location.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-start md:gap-3">
          {t.location.cards.map((card, index) => {
            const layout = cardLayouts[index % cardLayouts.length];

            return (
              <article
                key={card.title}
                className={`group overflow-hidden rounded-[2rem] border p-2 transition-transform duration-500 hover:-translate-y-1 ${layout.outer}`}
                style={{
                  borderColor: "rgba(245,239,231,0.22)",
                  background: "rgba(24, 18, 14, 0.32)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className={`relative overflow-hidden rounded-[1.45rem] border ${layout.mediaHeight}`}
                  style={{
                    borderColor: "rgba(245,239,231,0.22)",
                    background: "rgba(24, 18, 14, 0.28)",
                  }}
                >
                  <Image
                    src={cardImages[index % cardImages.length]}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(12,10,9,0.08) 0%, rgba(12,10,9,0.42) 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-4 border"
                    style={{ borderColor: "rgba(245,239,231,0.28)" }}
                  />
                  <div
                    className="absolute left-3 top-3 text-[10px] tracking-[0.22em] uppercase"
                    style={{ color: "rgba(245,239,231,0.9)", fontFamily: "var(--font-raleway)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div
                    className="absolute bottom-3 right-3 text-3xl font-light italic opacity-25"
                    style={{ color: "#fff", fontFamily: "var(--font-cormorant)" }}
                  >
                    0{index + 1}
                  </div>
                </div>

                <div className="px-0.5 pb-0.5 pt-4 text-center">
                  <h3
                    className="mb-2 text-[1.65rem] md:text-[1.95rem] font-light italic leading-tight tracking-[-0.03em]"
                    style={{ color: "#E6DEC9", fontFamily: "var(--font-cormorant)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[0.98rem]"
                    style={{
                      color: "rgba(245,239,231,0.82)",
                      fontFamily: "var(--font-raleway)",
                      fontWeight: 300,
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={reservationUrl}
            className="px-7 py-3 rounded-full text-[0.95rem] tracking-[0.12em] uppercase font-medium transition-all duration-300 hover:opacity-90"
            style={{
              background: "var(--gold)",
              color: "#fff",
              fontFamily: "var(--font-raleway)",
              boxShadow: "0 2px 12px rgba(168,92,58,0.4)",
            }}
          >
            Rezervasyon Yap
          </a>
        </div>
      </div>
    </section>
  );
}
