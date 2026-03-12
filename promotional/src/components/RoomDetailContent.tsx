"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getRoomMedia } from "@/data/rooms";
import { useLanguage } from "./LanguageProvider";

interface RoomDetailContentProps {
  slug: string;
  reservationUrl: string;
}

export default function RoomDetailContent({
  slug,
  reservationUrl,
}: RoomDetailContentProps) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [previousGalleryIndex, setPreviousGalleryIndex] = useState<number | null>(
    null
  );
  const [fadePreviousImage, setFadePreviousImage] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  const room = t.rooms.items.find((item) => item.slug === slug);
  const media = getRoomMedia(slug);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const galleryFadeTimeoutRef = useRef<number | null>(null);

  if (!room || !media) {
    return null;
  }

  const otherRooms = t.rooms.items.filter((item) => item.slug !== slug).slice(0, 3);
  const roomSpecs = [
    { label: t.rooms.sizeLabel, value: room.size },
    { label: t.rooms.capacityLabel, value: room.occupancy },
    { label: t.rooms.bedLabel, value: room.bed },
  ];

  useEffect(() => {
    setGalleryIndex(0);
    setPreviousGalleryIndex(null);
    setFadePreviousImage(false);
    setLightboxIndex(null);
  }, [slug]);

  useEffect(() => {
    return () => {
      if (galleryFadeTimeoutRef.current) {
        window.clearTimeout(galleryFadeTimeoutRef.current);
      }
    };
  }, []);

  const transitionToGalleryIndex = useCallback((nextIndex: number) => {
    setGalleryIndex((current) => {
      if (current === nextIndex) return current;

      setPreviousGalleryIndex(current);
      setFadePreviousImage(true);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFadePreviousImage(false);
        });
      });

      if (galleryFadeTimeoutRef.current) {
        window.clearTimeout(galleryFadeTimeoutRef.current);
      }

      galleryFadeTimeoutRef.current = window.setTimeout(() => {
        setPreviousGalleryIndex(null);
      }, 420);

      return nextIndex;
    });
  }, []);

  useEffect(() => {
    if (lightboxIndex !== null) return;

    const autoplayInterval = window.setInterval(() => {
      transitionToGalleryIndex(
        galleryIndex === media.gallery.length - 1 ? 0 : galleryIndex + 1
      );
    }, 4500);

    return () => window.clearInterval(autoplayInterval);
  }, [galleryIndex, lightboxIndex, media.gallery.length, transitionToGalleryIndex]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goToPreviousGalleryImage = () => {
    transitionToGalleryIndex(
      galleryIndex === 0 ? media.gallery.length - 1 : galleryIndex - 1
    );
  };

  const goToNextGalleryImage = () => {
    transitionToGalleryIndex(
      galleryIndex === media.gallery.length - 1 ? 0 : galleryIndex + 1
    );
  };

  const handleGalleryTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleGalleryTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const deltaX = touchStartX - touchEndX;
    setTouchStartX(null);

    if (Math.abs(deltaX) < 40) return;

    if (deltaX > 0) {
      goToNextGalleryImage();
      return;
    }

    goToPreviousGalleryImage();
  };

  const showPreviousLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === 0 ? media.gallery.length - 1 : lightboxIndex - 1
    );
  };

  const showNextLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === media.gallery.length - 1 ? 0 : lightboxIndex + 1
    );
  };
  const previousPreviewIndex =
    galleryIndex === 0 ? media.gallery.length - 1 : galleryIndex - 1;
  const nextPreviewIndex =
    galleryIndex === media.gallery.length - 1 ? 0 : galleryIndex + 1;

  return (
    <main className="pb-24" style={{ background: "var(--background)" }}>
      <section className="relative min-h-[100svh] overflow-hidden">
        <Image
          src={media.coverImage}
          alt={room.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/44" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,14,10,0.28) 0%, rgba(20,14,10,0.42) 32%, rgba(20,14,10,0.72) 100%), linear-gradient(90deg, rgba(20,14,10,0.74) 0%, rgba(20,14,10,0.38) 42%, rgba(20,14,10,0.12) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-end px-6 pb-10 pt-28 md:px-10 md:pb-14 lg:px-12 lg:pb-16">
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
              {t.rooms.pageCollection}
            </span>

            <h1
              className="mb-6 text-[3.25rem] font-light italic leading-[0.9] tracking-[-0.04em] md:text-[5.4rem] lg:text-[6.2rem]"
              style={{ color: "#fff", fontFamily: "var(--font-cormorant)" }}
            >
              {room.name}
            </h1>

            <div className="mb-7 grid gap-3 sm:grid-cols-3">
              {roomSpecs.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.6rem] border px-4 py-4 backdrop-blur-sm"
                  style={{
                    borderColor: "rgba(255,255,255,0.16)",
                    background: "rgba(255,255,255,0.08)",
                  }}
                >
                  <p
                    className="text-[0.78rem] uppercase tracking-[0.22em]"
                    style={{
                      color: "rgba(255,255,255,0.68)",
                      fontFamily: "var(--font-raleway)",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="mt-2"
                    style={{ color: "#fff", fontFamily: "var(--font-raleway)" }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={reservationUrl}
                className="inline-flex rounded-full px-7 py-3 text-sm uppercase tracking-[0.18em] transition-opacity duration-300 hover:opacity-90"
                style={{
                  background: "var(--gold)",
                  color: "#fff",
                  fontFamily: "var(--font-raleway)",
                }}
              >
                {t.rooms.reserveCta}
              </a>

              <Link
                href="/odalar"
                className="inline-flex rounded-full px-6 py-3 text-sm uppercase tracking-[0.18em] backdrop-blur-sm"
                style={{
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.08)",
                  fontFamily: "var(--font-raleway)",
                }}
              >
                {t.rooms.detailBack}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-8 px-6 pt-8 lg:px-12">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div
            className="rounded-[2.5rem] border p-8 md:p-10"
            style={{ borderColor: "var(--border-color)", background: "var(--dark-mid)" }}
          >
            <p
              className="mb-3 text-[0.82rem] uppercase tracking-[0.24em]"
              style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
            >
              {t.rooms.experienceTitle}
            </p>
            <p
              className="mb-6 text-[1.6rem] italic md:text-[2rem]"
              style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
            >
              "{room.quote}"
            </p>
            <div className="space-y-5">
              {room.details.map((paragraph) => (
                <p
                  key={paragraph}
                  style={{ color: "var(--cream)", opacity: 0.78, fontFamily: "var(--font-raleway)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div
            className="rounded-[2.5rem] border p-8 md:p-10"
            style={{ borderColor: "var(--border-color)", background: "var(--dark-mid)" }}
          >
            <p
              className="mb-5 text-[0.82rem] uppercase tracking-[0.24em]"
              style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
            >
              {t.rooms.amenitiesTitle}
            </p>
            <div className="flex flex-wrap gap-3">
              {room.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full px-4 py-2"
                  style={{
                    color: "var(--cream)",
                    border: "1px solid var(--border-color)",
                    fontFamily: "var(--font-raleway)",
                  }}
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section
          className="rounded-[2.5rem] border p-8 md:p-10"
          style={{ borderColor: "var(--border-color)", background: "var(--dark-mid)" }}
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <p
              className="text-[0.82rem] uppercase tracking-[0.24em]"
              style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
            >
              {t.rooms.galleryTitle}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous gallery image"
                onClick={goToPreviousGalleryImage}
                className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 hover:bg-white/10"
                style={{ borderColor: "var(--border-color)", color: "var(--cream)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.5 5.5-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next gallery image"
                onClick={goToNextGalleryImage}
                className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 hover:bg-white/10"
                style={{ borderColor: "var(--border-color)", color: "var(--cream)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.5 5.5 6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
          <div
            className="overflow-hidden"
            onTouchStart={handleGalleryTouchStart}
            onTouchEnd={handleGalleryTouchEnd}
          >
            <div className="flex items-stretch gap-3 md:gap-4">
              <button
                type="button"
                onClick={() => openLightbox(previousPreviewIndex)}
                className="group relative hidden overflow-hidden rounded-[1.6rem] md:block md:w-[10%] lg:w-[12%]"
                aria-label={`${room.name} image ${previousPreviewIndex + 1}`}
              >
                <div className="relative h-full min-h-[17rem] w-full">
                  <Image
                    src={media.gallery[previousPreviewIndex]}
                    alt={`${room.name} ${previousPreviewIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="12vw"
                  />
                </div>
                <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/20" />
              </button>

              <button
                type="button"
                onClick={() => openLightbox(galleryIndex)}
                className="group relative block flex-1 overflow-hidden rounded-[2rem]"
                aria-label={`${room.name} image ${galleryIndex + 1}`}
              >
                <div className="relative aspect-[16/8.5] w-full">
                  <Image
                    src={media.gallery[galleryIndex]}
                    alt={`${room.name} ${galleryIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 72vw"
                  />
                  {previousGalleryIndex !== null ? (
                    <Image
                      src={media.gallery[previousGalleryIndex]}
                      alt={`${room.name} ${previousGalleryIndex + 1}`}
                      fill
                      className="pointer-events-none object-cover"
                      style={{
                        opacity: fadePreviousImage ? 1 : 0,
                        transition: "opacity 420ms ease-out",
                      }}
                      sizes="(max-width: 768px) 100vw, 72vw"
                    />
                  ) : null}
                </div>
                <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{
                      color: "#fff",
                      background: "rgba(255,255,255,0.14)",
                      border: "1px solid rgba(255,255,255,0.22)",
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
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openLightbox(nextPreviewIndex)}
                className="group relative hidden overflow-hidden rounded-[1.6rem] md:block md:w-[10%] lg:w-[12%]"
                aria-label={`${room.name} image ${nextPreviewIndex + 1}`}
              >
                <div className="relative h-full min-h-[17rem] w-full">
                  <Image
                    src={media.gallery[nextPreviewIndex]}
                    alt={`${room.name} ${nextPreviewIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="12vw"
                  />
                </div>
                <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/20" />
              </button>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2">
            {media.gallery.map((image, index) => (
              <button
                key={`${image}-dot-${index}`}
                type="button"
                aria-label={`Go to gallery image ${index + 1}`}
                onClick={() => transitionToGalleryIndex(index)}
                className={`rounded-full transition-all duration-300 ${galleryIndex === index ? "w-10" : "w-2.5"}`}
                style={{
                  height: "0.38rem",
                  background: galleryIndex === index ? "var(--gold)" : "var(--border-strong)",
                  opacity: galleryIndex === index ? 1 : 0.8,
                }}
              />
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div
            className="rounded-[2.5rem] border p-8 md:p-10"
            style={{ borderColor: "var(--border-color)", background: "var(--dark-mid)" }}
          >
            <p
              className="mb-5 text-[0.82rem] uppercase tracking-[0.24em]"
              style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
            >
              {t.rooms.reservationTitle}
            </p>
            <p
              className="mb-6"
              style={{ color: "var(--cream)", opacity: 0.78, fontFamily: "var(--font-raleway)" }}
            >
              {t.rooms.reservationNote}
            </p>
            <div className="space-y-3">
              {[
                { label: t.rooms.checkIn, value: "14:00" },
                { label: t.rooms.checkOut, value: "12:00" },
                { label: t.rooms.cancellation, value: t.rooms.cancellationValue },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-[1.5rem] border px-4 py-3"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <span style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>
                    {item.label}
                  </span>
                  <span
                    style={{
                      color: "var(--cream)",
                      opacity: 0.8,
                      fontFamily: "var(--font-raleway)",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={reservationUrl}
              className="mt-6 inline-flex rounded-full px-7 py-3 text-sm uppercase tracking-[0.18em] transition-opacity duration-300 hover:opacity-90"
              style={{
                background: "var(--gold)",
                color: "#fff",
                fontFamily: "var(--font-raleway)",
              }}
            >
              {t.rooms.reserveCta}
            </a>

            <div className="mt-8">
              <p
                className="mb-3 text-[0.82rem] uppercase tracking-[0.2em]"
                style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
              >
                {t.rooms.contactPrompt}
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:+905551010000"
                  style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
                >
                  +90 (555) 101-0000
                </a>
                <a
                  href="mailto:info@sarosvadi.com"
                  style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
                >
                  info@sarosvadi.com
                </a>
              </div>
            </div>
          </div>

          <div
            className="rounded-[2.5rem] border p-8 md:p-10"
            style={{ borderColor: "var(--border-color)", background: "var(--dark-mid)" }}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <p
                className="text-[0.82rem] uppercase tracking-[0.24em]"
                style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
              >
                {t.rooms.otherOptionsTitle}
              </p>
              <Link
                href="/odalar"
                className="text-sm uppercase tracking-[0.18em]"
                style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
              >
                {t.rooms.allRooms}
              </Link>
            </div>

            <div className="space-y-4">
              {otherRooms.map((item) => (
                <Link
                  key={item.slug}
                  href={`/odalar/${item.slug}`}
                  className="flex items-center justify-between gap-4 rounded-[1.8rem] border px-5 py-5 transition-colors duration-300 hover:bg-white/5"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <div>
                    <h3
                      className="text-[1.6rem] italic"
                      style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="mt-1"
                      style={{ color: "var(--cream)", opacity: 0.68, fontFamily: "var(--font-raleway)" }}
                    >
                      {item.size} • {item.occupancy}
                    </p>
                  </div>
                  <span
                    className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em]"
                    style={{
                      color: "var(--cream)",
                      border: "1px solid var(--border-color)",
                      fontFamily: "var(--font-raleway)",
                    }}
                  >
                    {t.rooms.detailsCta}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      {lightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            type="button"
            aria-label="Close image preview"
            onClick={closeLightbox}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Previous preview image"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousLightboxImage();
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
            aria-label="Next preview image"
            onClick={(event) => {
              event.stopPropagation();
              showNextLightboxImage();
            }}
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9.5 5.5 6 6-6 6" />
            </svg>
          </button>

          <div
            className="relative h-[75vh] w-full max-w-6xl overflow-hidden rounded-[2rem]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={media.gallery[lightboxIndex]}
              alt={`${room.name} large preview ${lightboxIndex + 1}`}
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
