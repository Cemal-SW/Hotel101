"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

const cardLayouts = [
  { outer: "md:translate-y-6", mediaHeight: "h-44 md:h-52" },
  { outer: "md:-translate-y-3", mediaHeight: "h-48 md:h-[14.5rem]" },
  { outer: "md:translate-y-6", mediaHeight: "h-[10.5rem] md:h-48" },
  { outer: "md:-translate-y-3", mediaHeight: "h-[11.5rem] md:h-[13.5rem]" },
] as const;

const cardSurfaces = [
  "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02)), radial-gradient(circle at 28% 26%, rgba(255,255,255,0.28), transparent 22%), linear-gradient(135deg, #7a9bb3 0%, #b4c9d7 48%, #f0e5d4 100%)",
  "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02)), radial-gradient(circle at 74% 28%, rgba(255,255,255,0.22), transparent 20%), linear-gradient(135deg, #5a3926 0%, #ab7a4d 52%, #edd1ac 100%)",
  "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02)), radial-gradient(circle at 22% 24%, rgba(255,255,255,0.22), transparent 18%), linear-gradient(135deg, #31413b 0%, #6b8a71 48%, #dde7d7 100%)",
  "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02)), radial-gradient(circle at 72% 22%, rgba(255,255,255,0.2), transparent 18%), linear-gradient(135deg, #244057 0%, #5c7e95 48%, #dce8ef 100%)",
  "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02)), radial-gradient(circle at 24% 26%, rgba(255,255,255,0.2), transparent 18%), linear-gradient(135deg, #4b3a30 0%, #8a6a57 48%, #eadbca 100%)",
] as const;

interface LocationProps {
  reservationUrl: string;
}

export default function Location({ reservationUrl }: LocationProps) {
  const { t } = useLanguage();

  return (
    <section id="location" className="relative py-32 px-6 lg:px-12 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1920&q=80"
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
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
            >
              {t.location.tag}
            </span>
            <div className="w-12 h-px" style={{ background: "var(--gold)" }} />
          </div>

          <h2
            className="text-5xl md:text-6xl font-light italic leading-tight mb-6"
            style={{ color: "#F5EFE7", fontFamily: "var(--font-cormorant)" }}
          >
            {t.location.title}{" "}
            <span style={{ color: "var(--gold)" }}>{t.location.titleHighlight}</span>
          </h2>

          <p
            className="text-base leading-8 md:text-lg mb-12"
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
                className={`group overflow-hidden border p-2 transition-transform duration-500 hover:-translate-y-1 ${layout.outer}`}
                style={{
                  borderColor: "rgba(245,239,231,0.22)",
                  background: "rgba(24, 18, 14, 0.32)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className={`relative overflow-hidden border ${layout.mediaHeight}`}
                  style={{
                    borderColor: "rgba(245,239,231,0.22)",
                    background: cardSurfaces[index % cardSurfaces.length],
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(12,10,9,0.05) 0%, rgba(12,10,9,0.3) 100%)",
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
                    className="mb-2 text-[1.45rem] md:text-[1.7rem] font-light leading-tight"
                    style={{ color: "#E6DEC9", fontFamily: "var(--font-cormorant)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[12px] leading-6 md:text-[13px] md:leading-6"
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
            className="px-5 py-2 rounded-full text-sm tracking-[0.12em] uppercase font-medium transition-all duration-300 hover:opacity-90"
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
