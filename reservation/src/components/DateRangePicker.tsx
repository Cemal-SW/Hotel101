"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

// Auto-format digits into dd.mm.yyyy as the user types
function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
}

// Convert dd.mm.yyyy → YYYY-MM-DD for internal use, returns "" if incomplete/invalid
function toISO(display: string): string {
  const parts = display.split(".");
  if (parts.length !== 3) return "";
  const [d, m, y] = parts;
  if (d.length !== 2 || m.length !== 2 || y.length !== 4) return "";
  const day = parseInt(d, 10);
  const month = parseInt(m, 10);
  const year = parseInt(y, 10);
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 2024) return "";
  return `${y}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// Convert YYYY-MM-DD → dd.mm.yyyy for display
function toDisplay(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  onChange: (field: string, value: string | number) => void;
}

export default function DateRangePicker({ checkIn, checkOut, adults, children, onChange }: DateRangePickerProps) {
  const { t, language } = useLanguage();

  // Local display state (dd.mm.yyyy strings) — decoupled from ISO state
  const [checkInDisplay, setCheckInDisplay] = useState(() => toDisplay(checkIn));
  const [checkOutDisplay, setCheckOutDisplay] = useState(() => toDisplay(checkOut));

  const nightsCount = checkIn && checkOut
    ? Math.max(0, Math.round(
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
      ))
    : 0;

  const locale = language === "tr" ? "tr-TR" : "en-US";

  const handleDateInput = (
    raw: string,
    setDisplay: (v: string) => void,
    field: string
  ) => {
    const formatted = formatDateInput(raw);
    setDisplay(formatted);
    const iso = toISO(formatted);
    onChange(field, iso); // "" until fully valid
  };

  const inputStyle = {
    borderColor: "var(--border-color)",
    color: "var(--cream)",
    fontFamily: "var(--font-raleway)",
    background: "transparent",
    touchAction: "manipulation" as const,
    WebkitTapHighlightColor: "transparent",
  };

  const inputClass =
    "w-full px-4 py-3.5 border text-sm transition-colors duration-300 outline-none focus:border-[var(--gold)]";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-light italic mb-2" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
          {t.datePicker.title}
        </h2>
        <p className="text-sm opacity-60" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
          {t.datePicker.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Check-In */}
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
            {t.datePicker.checkIn}
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder={t.datePicker.datePlaceholder}
            value={checkInDisplay}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            maxLength={10}
            onChange={(e) => handleDateInput(e.target.value, setCheckInDisplay, "checkIn")}
            className={inputClass}
            style={inputStyle}
          />
        </div>

        {/* Check-Out */}
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
            {t.datePicker.checkOut}
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder={t.datePicker.datePlaceholder}
            value={checkOutDisplay}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            maxLength={10}
            onChange={(e) => handleDateInput(e.target.value, setCheckOutDisplay, "checkOut")}
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Nights summary */}
      {nightsCount > 0 && (
        <div className="flex items-center gap-4 px-5 py-4 border-l-2" style={{ borderColor: "var(--gold)", background: "var(--gold-tint)" }}>
          <div className="text-3xl font-light" style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)" }}>
            {nightsCount}
          </div>
          <div>
            <p className="text-sm" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>
              {nightsCount === 1 ? t.datePicker.night : t.datePicker.nights}
            </p>
            <p className="text-xs opacity-50" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
              {new Date(checkIn).toLocaleDateString(locale, { month: "short", day: "numeric" })} →{" "}
              {new Date(checkOut).toLocaleDateString(locale, { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>
      )}

      {/* Guest count */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { label: t.datePicker.adults, value: adults, field: "adults", min: 1, max: 6 },
          { label: t.datePicker.children, value: children, field: "children", min: 0, max: 4 },
        ].map(({ label, value, field, min, max }) => (
          <div key={field}>
            <label className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
              {label}
            </label>
            <div className="flex items-center border" style={{ borderColor: "var(--border-color)" }}>
              <button
                type="button"
                onClick={() => onChange(field, Math.max(min, value - 1))}
                className="w-12 h-12 flex items-center justify-center text-xl transition-colors duration-200 hover:bg-black/5"
                style={{ color: "var(--gold)", touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
              >−</button>
              <span className="flex-1 text-center text-base" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>{value}</span>
              <button
                type="button"
                onClick={() => onChange(field, Math.min(max, value + 1))}
                className="w-12 h-12 flex items-center justify-center text-xl transition-colors duration-200 hover:bg-black/5"
                style={{ color: "var(--gold)", touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
              >+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
