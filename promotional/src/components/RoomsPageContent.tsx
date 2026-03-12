"use client";

import Image from "next/image";
import Link from "next/link";
import { roomImages, roomsPageHeroImage } from "@/data/rooms";
import { useLanguage } from "./LanguageProvider";

interface RoomsPageContentProps {
  reservationUrl: string;
}

export default function RoomsPageContent({
  reservationUrl,
}: RoomsPageContentProps) {
  const { t } = useLanguage();

  const scrollToRoom = (slug: string) => {
    const element = document.getElementById(slug);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const targetTop =
      window.scrollY + rect.top - (window.innerHeight / 2 - rect.height / 2);

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });
  };

  return (
    <main style={{ background: "var(--background)" }}>
      <section className="px-6 pb-8 pt-32 lg:px-12 lg:pb-10">
        <div className="mx-auto max-w-7xl">
          <div
            className="relative overflow-hidden rounded-[2.75rem] border px-7 py-16 md:px-12 md:py-20"
            style={{
              borderColor: "var(--border-color)",
              background: "var(--dark-mid)",
              boxShadow: "0 30px 90px rgba(0,0,0,0.12)",
            }}
          >
            <div className="absolute inset-0">
              <Image
                src={roomsPageHeroImage}
                alt={t.rooms.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(44,33,26,0.88) 0%, rgba(44,33,26,0.55) 40%, rgba(44,33,26,0.3) 100%)",
                }}
              />
            </div>

            <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
              <span
                className="mb-5 inline-flex rounded-full px-4 py-2 text-[0.76rem] uppercase tracking-[0.28em]"
                style={{
                  color: "#fff",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontFamily: "var(--font-raleway)",
                }}
              >
                {t.rooms.pageTag}
              </span>

              <h1
                className="mb-5 text-[3.2rem] font-light italic leading-[0.9] tracking-[-0.04em] md:text-[5.3rem]"
                style={{ color: "#fff", fontFamily: "var(--font-cormorant)" }}
              >
                {t.rooms.title}
              </h1>

              <p
                className="mx-auto max-w-[42rem] text-[1.05rem] leading-[1.85] md:text-[1.2rem]"
                style={{ color: "rgba(255,255,255,0.84)", fontFamily: "var(--font-raleway)" }}
              >
                {t.rooms.pageDescription}
              </p>

              <div className="mt-8 grid w-full max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
                {t.rooms.items.map((room) => (
                  <button
                    key={room.slug}
                    type="button"
                    onClick={() => scrollToRoom(room.slug)}
                    className="w-full whitespace-nowrap rounded-full px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5 md:px-5 md:text-[0.8rem] lg:text-sm"
                    style={{
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.35)",
                      background: "rgba(255,255,255,0.08)",
                      boxShadow: "0 0 0 rgba(0,0,0,0)",
                      fontFamily: "var(--font-raleway)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--gold)";
                      e.currentTarget.style.borderColor = "var(--gold)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 28px rgba(168,92,58,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.35)";
                      e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
                    }}
                  >
                    {room.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div
            className="grid gap-6 rounded-[2.5rem] border p-7 md:grid-cols-[1.2fr_0.8fr] md:p-10"
            style={{
              borderColor: "var(--border-color)",
              background: "color-mix(in srgb, var(--dark-mid) 78%, transparent)",
            }}
          >
            <div>
              <span
                className="mb-4 inline-flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.24em]"
                style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
              >
                <span className="h-px w-10" style={{ background: "var(--gold)" }} />
                {t.rooms.pageCollection}
              </span>
              <h2
                className="text-[2.3rem] font-light italic md:text-[3.2rem]"
                style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
              >
                {t.rooms.highlightsTitle}
              </h2>
            </div>
            <p
              className="max-w-xl self-end"
              style={{ color: "var(--cream)", opacity: 0.74, fontFamily: "var(--font-raleway)" }}
            >
              {t.rooms.highlightsDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-6">
          {t.rooms.items.map((room, index) => (
            <article
              key={room.name}
              id={room.slug}
              className="overflow-hidden rounded-[2.5rem] border"
              style={{
                borderColor: "var(--border-color)",
                background: "var(--dark-mid)",
                boxShadow: "0 24px 70px rgba(0,0,0,0.08)",
              }}
            >
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div
                  className={`relative min-h-[340px] overflow-hidden md:min-h-[420px] ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Link href={`/odalar/${room.slug}`} className="block h-full w-full">
                    <Image
                      src={roomImages[index]}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                  </Link>
                </div>

                <div className="flex flex-col justify-between p-7 md:p-10 lg:p-12">
                  <div>
                    <span
                      className="mb-4 inline-flex rounded-full px-4 py-2 text-[0.76rem] uppercase tracking-[0.26em]"
                      style={{
                        color: "var(--gold)",
                        background: "var(--gold-tint)",
                        fontFamily: "var(--font-raleway)",
                      }}
                    >
                      {t.rooms.pageCollection}
                    </span>

                    <Link href={`/odalar/${room.slug}`}>
                      <h2
                        className="mb-4 text-[2.4rem] font-light italic tracking-[-0.04em] transition-opacity duration-300 hover:opacity-80 md:text-[3.4rem]"
                        style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
                      >
                        {room.name}
                      </h2>
                    </Link>

                    <p
                      className="max-w-2xl"
                      style={{ color: "var(--cream)", opacity: 0.76, fontFamily: "var(--font-raleway)" }}
                    >
                      {room.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                      {[room.size, room.occupancy, room.bed].map((detail) => (
                        <span
                          key={detail}
                          className="rounded-full px-4 py-2 text-[0.8rem] uppercase tracking-[0.14em]"
                          style={{
                            color: "var(--cream)",
                            border: "1px solid var(--border-color)",
                            fontFamily: "var(--font-raleway)",
                          }}
                        >
                          {detail}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {room.features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full px-4 py-2"
                          style={{
                            color: "var(--cream)",
                            background: "rgba(255,255,255,0.14)",
                            fontFamily: "var(--font-raleway)",
                          }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/odalar/${room.slug}`}
                      className="rounded-full px-7 py-3 text-sm uppercase tracking-[0.18em] transition-colors duration-300"
                      style={{
                        color: "var(--cream)",
                        border: "1px solid var(--border-color)",
                        fontFamily: "var(--font-raleway)",
                      }}
                    >
                      {t.rooms.detailsCta}
                    </Link>
                    <a
                      href={reservationUrl}
                      className="rounded-full px-7 py-3 text-sm uppercase tracking-[0.18em] transition-opacity duration-300 hover:opacity-90"
                      style={{
                        background: "var(--gold)",
                        color: "#fff",
                        fontFamily: "var(--font-raleway)",
                      }}
                    >
                      {t.rooms.reserveCta}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
