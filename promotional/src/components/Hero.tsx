"use client";

import { useLanguage } from "./LanguageProvider";

interface HeroProps {
  reservationUrl: string;
}

export default function Hero({ reservationUrl }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
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

      <div className="absolute top-28 left-1/2 -translate-x-1/2">
        <div
          className="w-px h-16"
          style={{ background: "linear-gradient(to bottom, transparent, var(--gold))" }}
        />
      </div>

      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        <p
          className="mb-8 rounded-full px-3.5 py-1.5 text-[11px] tracking-[0.44em] uppercase"
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
          className="font-light italic leading-none mb-1 tracking-[-0.045em]"
          style={{
            color: "#FFFFFF",
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(5.4rem, 14.8vw, 10.8rem)",
            textShadow: "0 2px 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.5)",
          }}
        >
          Saros
        </h1>
        <h2
          className="font-bold tracking-[0.18em] uppercase leading-none mb-10"
          style={{
            color: "var(--gold)",
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.8rem, 7.6vw, 5.9rem)",
            textShadow: "0 2px 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.6)",
          }}
        >
          Vadi
        </h2>

        <p
          className="max-w-[44rem] text-center font-light italic leading-tight mb-12"
          style={{
            color: "#FFFFFF",
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.45rem, 2.8vw, 2.15rem)",
            textShadow: "0 2px 24px rgba(0,0,0,0.75), 0 0 40px rgba(0,0,0,0.35)",
          }}
        >
          {t.hero.tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() =>
              document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-full px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:opacity-90"
            style={{
              background: "var(--gold)",
              color: "#fff",
              fontFamily: "var(--font-raleway)",
              boxShadow: "0 4px 24px rgba(168,92,58,0.5)",
            }}
          >
            {t.hero.exploreRooms}
          </button>
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
