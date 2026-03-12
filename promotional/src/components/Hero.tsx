"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

interface HeroProps {
  reservationUrl: string;
}

export default function Hero({ reservationUrl }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden pt-16 sm:min-h-[600px] sm:pt-[4.5rem] md:pt-20 lg:min-h-[680px] lg:pt-[5.5rem] xl:min-h-[700px] xl:pt-20">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
        aria-hidden="true"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center lg:-translate-y-6 xl:-translate-y-8">
        <p
          className="mb-5 rounded-full px-3.5 py-1.5 text-[11px] tracking-[0.44em] uppercase sm:mb-6 lg:mb-8"
          style={{
            color: "var(--gold)",
            fontFamily: "var(--font-raleway)",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(200,126,66,0.3)",
          }}
        >
          {t.hero.subtitle}
        </p>

        <h1
          className="mb-1 font-light italic leading-none tracking-[-0.045em]"
          style={{
            color: "#FFFFFF",
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(4.4rem, 11.5vw, 10.8rem)",
            textShadow: "0 2px 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.5)",
          }}
        >
          Saros
        </h1>
        <h2
          className="mb-7 font-bold uppercase leading-none tracking-[0.18em] sm:mb-8 lg:mb-10"
          style={{
            color: "var(--gold)",
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.3rem, 5.7vw, 5.9rem)",
            textShadow: "0 2px 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.6)",
          }}
        >
          Vadi
        </h2>

        <p
          className="mb-8 max-w-[44rem] text-center font-light italic leading-tight sm:mb-10 lg:mb-12"
          style={{
            color: "#FFFFFF",
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.2rem, 2.1vw, 2.15rem)",
            textShadow: "0 2px 24px rgba(0,0,0,0.75), 0 0 40px rgba(0,0,0,0.35)",
          }}
        >
          {t.hero.tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/odalar"
            className="rounded-full px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:opacity-90"
            style={{
              background: "var(--gold)",
              color: "#fff",
              fontFamily: "var(--font-raleway)",
              boxShadow: "0 4px 24px rgba(168,92,58,0.5)",
            }}
          >
            {t.hero.exploreRooms}
          </Link>
          <a
            href={reservationUrl}
            className="rounded-full px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300"
            style={{
              color: "#FFFFFF",
              fontFamily: "var(--font-raleway)",
              border: "1px solid rgba(255,255,255,0.6)",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            }}
          >
            {t.hero.bookNow}
          </a>
        </div>
      </div>
    </section>
  );
}
