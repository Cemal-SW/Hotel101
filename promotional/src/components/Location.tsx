"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

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

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px" style={{ background: "var(--gold)" }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
            {t.location.tag}
          </span>
          <div className="w-12 h-px" style={{ background: "var(--gold)" }} />
        </div>

        <h2 className="text-5xl md:text-6xl font-light italic leading-tight mb-6" style={{ color: "#F5EFE7", fontFamily: "var(--font-cormorant)" }}>
          {t.location.title} <span style={{ color: "var(--gold)" }}>{t.location.titleHighlight}</span>
        </h2>

        <p className="text-base leading-8 mb-10" style={{ color: "rgba(245,239,231,0.75)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
          {t.location.description}
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {t.location.highlights.map((loc) => (
            <div key={loc} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
              <span className="text-sm tracking-wide" style={{ color: "rgba(245,239,231,0.7)", fontFamily: "var(--font-raleway)" }}>
                {loc}
              </span>
            </div>
          ))}
        </div>

        <a
          href={reservationUrl}
          className="inline-block px-12 py-4 text-sm tracking-[0.25em] uppercase transition-all duration-300 hover:opacity-90"
          style={{ background: "var(--gold)", color: "#fff", fontFamily: "var(--font-raleway)" }}
        >
          {t.location.bookNow}
        </a>
      </div>
    </section>
  );
}
