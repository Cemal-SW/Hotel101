"use client";

import { useLanguage } from "./LanguageProvider";
import { Room } from "./RoomCard";
import { GuestInfo } from "./GuestForm";

interface BookingSummaryProps {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  room: Room | undefined;
  guestInfo: GuestInfo;
  nights: number;
}

export default function BookingSummary({ checkIn, checkOut, adults, children, room, guestInfo, nights }: BookingSummaryProps) {
  const { t, language } = useLanguage();
  const total = room ? room.pricePerNight * nights : 0;
  const taxes = Math.round(total * 0.12);
  const grandTotal = total + taxes;

  const locale = language === "tr" ? "tr-TR" : "en-US";
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(locale, { weekday: "short", year: "numeric", month: "long", day: "numeric" });

  const guestText = `${adults} ${adults !== 1 ? t.summary.adults : t.summary.adult}${children > 0 ? `, ${children} ${children !== 1 ? t.summary.children : t.summary.child}` : ""}`;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-light italic mb-2" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
          {t.summary.title}
        </h2>
        <p className="text-sm opacity-60" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
          {t.summary.subtitle}
        </p>
      </div>

      <div className="border" style={{ borderColor: "var(--border-color)", background: "var(--dark-mid)" }}>
        {/* Stay details */}
        <div className="p-6 border-b" style={{ borderColor: "var(--border-color)" }}>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
            {t.summary.stayDetails}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: t.summary.checkIn, value: formatDate(checkIn) },
              { label: t.summary.checkOut, value: formatDate(checkOut) },
              { label: t.summary.duration, value: `${nights} ${nights === 1 ? t.summary.night : t.summary.nights}` },
              { label: t.summary.guests, value: guestText },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs opacity-50 mb-1 tracking-wider uppercase" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>{label}</p>
                <p className="text-sm" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Room */}
        {room && (
          <div className="p-6 border-b" style={{ borderColor: "var(--border-color)" }}>
            <h3 className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>{t.summary.room}</h3>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-base italic" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>{room.name}</p>
                <p className="text-xs opacity-50 mt-1" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>{room.size}</p>
              </div>
              <p className="text-sm" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>${room.pricePerNight} / {language === "tr" ? "gece" : "night"}</p>
            </div>
          </div>
        )}

        {/* Guest info */}
        <div className="p-6 border-b" style={{ borderColor: "var(--border-color)" }}>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>{t.summary.guest}</h3>
          <p className="text-sm" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>{guestInfo.firstName} {guestInfo.lastName}</p>
          <p className="text-sm opacity-60 mt-1" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>{guestInfo.email}</p>
          <p className="text-sm opacity-60 mt-1" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>{guestInfo.phone}</p>
          {guestInfo.specialRequests && (
            <p className="text-sm opacity-50 mt-3 leading-6 italic" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
              &ldquo;{guestInfo.specialRequests}&rdquo;
            </p>
          )}
        </div>

        {/* Pricing */}
        <div className="p-6 space-y-3">
          <h3 className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>{t.summary.priceBreakdown}</h3>
          <div className="flex justify-between text-sm">
            <span className="opacity-60" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>${room?.pricePerNight ?? 0} × {nights} {language === "tr" ? "gece" : "nights"}</span>
            <span style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>${total}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="opacity-60" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>{t.summary.taxesFees}</span>
            <span style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>${taxes}</span>
          </div>
          <div className="flex justify-between pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
            <span className="text-base" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 500 }}>{t.summary.total}</span>
            <span className="text-2xl font-light" style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)" }}>${grandTotal}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 px-4 py-4 border-l-2" style={{ borderColor: "var(--gold)", background: "var(--gold-tint)" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--gold)" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <p className="text-sm opacity-60 leading-6" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
          {language === "tr" ? (
            <><strong className="opacity-90">{guestInfo.email}</strong> {t.summary.confirmNote1}</>
          ) : (
            <>{t.summary.confirmNote1}</>
          )}
        </p>
      </div>
    </div>
  );
}
