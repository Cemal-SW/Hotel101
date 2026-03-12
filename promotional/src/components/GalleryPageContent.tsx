"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  hotelGalleryImages,
  type HotelGalleryCategory,
} from "@/data/hotelGallery";
import { useLanguage } from "./LanguageProvider";

export default function GalleryPageContent() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<HotelGalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const filterOptions: HotelGalleryCategory[] = [
    "all",
    "architecture",
    "interiors",
    "details",
    "outdoor",
  ];
  const filteredImages = useMemo(
    () =>
      activeFilter === "all"
        ? hotelGalleryImages
        : hotelGalleryImages.filter((image) => image.category === activeFilter),
    [activeFilter]
  );

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeFilter]);

  const showPreviousImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1
    );
  };

  const showNextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1
    );
  };

  return (
    <main className="pb-24" style={{ background: "var(--background)" }}>
      <section className="relative min-h-[72svh] overflow-hidden">
        <Image
          src={hotelGalleryImages[15]?.src ?? hotelGalleryImages[0].src}
          alt={t.gallery.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/46" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,14,10,0.2) 0%, rgba(20,14,10,0.38) 34%, rgba(20,14,10,0.76) 100%), linear-gradient(90deg, rgba(20,14,10,0.7) 0%, rgba(20,14,10,0.28) 48%, rgba(20,14,10,0.12) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto flex min-h-[72svh] max-w-7xl items-end px-6 pb-10 pt-28 md:px-10 md:pb-14 lg:px-12 lg:pb-16">
          <div className="max-w-3xl">
            <span
              className="mb-5 inline-flex rounded-full px-4 py-2 text-[0.78rem] uppercase tracking-[0.26em]"
              style={{
                color: "#fff",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.16)",
                fontFamily: "var(--font-raleway)",
              }}
            >
              {t.gallery.tag}
            </span>

            <h1
              className="mb-6 text-[3.25rem] font-light italic leading-[0.9] tracking-[-0.04em] md:text-[5.2rem]"
              style={{ color: "#fff", fontFamily: "var(--font-cormorant)" }}
            >
              {t.gallery.title}
            </h1>

            <p
              className="max-w-2xl"
              style={{
                color: "rgba(255,255,255,0.84)",
                fontFamily: "var(--font-raleway)",
              }}
            >
              {t.gallery.description}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-12">
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
              {t.gallery.collection}
            </span>
            <h2
              className="text-[2.3rem] font-light italic md:text-[3.2rem]"
              style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
            >
              {t.gallery.highlightsTitle}
            </h2>
          </div>
          <p
            className="max-w-xl self-end"
            style={{ color: "var(--cream)", opacity: 0.74, fontFamily: "var(--font-raleway)" }}
          >
            {t.gallery.highlightsDescription}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-12">
        <div className="mb-6 flex flex-wrap gap-3">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className="rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.16em] transition-all duration-300 md:text-sm"
              style={{
                color:
                  activeFilter === filter ? "#fff" : "var(--cream)",
                border: `1px solid ${
                  activeFilter === filter
                    ? "var(--gold)"
                    : "var(--border-color)"
                }`,
                background:
                  activeFilter === filter
                    ? "var(--gold)"
                    : "rgba(255,255,255,0.04)",
                fontFamily: "var(--font-raleway)",
                boxShadow:
                  activeFilter === filter
                    ? "0 12px 28px rgba(168,92,58,0.22)"
                    : "none",
              }}
            >
              {t.gallery.filters[filter]}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredImages.map((image, index) => {
            const isLarge = index % 7 === 0 || index % 7 === 4;

            return (
              <button
                key={`${activeFilter}-${image.src}`}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className={`group relative overflow-hidden rounded-[2.25rem] border text-left ${
                  isLarge ? "sm:col-span-2" : ""
                }`}
                style={{
                  borderColor: "var(--border-color)",
                  background: "var(--dark-mid)",
                  boxShadow: "0 22px 60px rgba(0,0,0,0.08)",
                }}
              >
                <div className={`relative w-full ${isLarge ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
                  <Image
                    src={image.src}
                    alt={`${t.gallery.title} ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-black/8 transition-colors duration-300 group-hover:bg-black/28" />
                <div className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.22)",
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.7}
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {lightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/82 p-4 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            aria-label="Close gallery preview"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Previous gallery preview"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.5 5.5-6 6 6 6" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Next gallery preview"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9.5 5.5 6 6-6 6" />
            </svg>
          </button>

          <div
            className="relative h-[78vh] w-full max-w-6xl overflow-hidden rounded-[2rem]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={filteredImages[lightboxIndex].src}
              alt={`${t.gallery.lightboxLabel} ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}
