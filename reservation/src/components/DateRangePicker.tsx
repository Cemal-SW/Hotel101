"use client";

import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { useLanguage } from "./LanguageProvider";

// Format a JS Date to dd.mm.yyyy
function toDisplay(date: Date | undefined): string {
  if (!date) return "";
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}.${m}.${y}`;
}

// Format a JS Date to YYYY-MM-DD (ISO) for internal state
function toISO(date: Date | undefined): string {
  if (!date) return "";
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${y}-${m}-${d}`;
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
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const locale = language === "tr" ? "tr-TR" : "en-US";

  // Reconstruct Date objects from ISO strings for DayPicker
  const fromDate = checkIn ? new Date(checkIn) : undefined;
  const toDate   = checkOut ? new Date(checkOut) : undefined;
  const range: DateRange = { from: fromDate, to: toDate };

  const nightsCount =
    fromDate && toDate
      ? Math.max(0, Math.round((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)))
      : 0;

  const handleSelect = (selected: DateRange | undefined) => {
    const from = selected?.from;
    const to   = selected?.to;
    onChange("checkIn",  toISO(from));
    onChange("checkOut", toISO(to));
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-4xl font-light italic mb-2" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
          {t.datePicker.title}
        </h2>
        <p className="text-sm opacity-60" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
          {t.datePicker.subtitle}
        </p>
      </div>

      {/* Selected date display */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: t.datePicker.checkIn,  date: fromDate },
          { label: t.datePicker.checkOut, date: toDate   },
        ].map(({ label, date }) => (
          <div key={label} className="px-4 py-3 border" style={{ borderColor: date ? "var(--gold)" : "var(--border-color)", background: date ? "var(--gold-tint)" : "transparent" }}>
            <p className="text-xs tracking-[0.2em] uppercase mb-1 opacity-60" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
              {label}
            </p>
            <p className="text-base" style={{ color: date ? "var(--cream)" : "var(--cream)", fontFamily: "var(--font-raleway)", opacity: date ? 1 : 0.3 }}>
              {date ? toDisplay(date) : t.datePicker.datePlaceholder}
            </p>
          </div>
        ))}
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
              {fromDate?.toLocaleDateString(locale, { month: "short", day: "numeric" })} →{" "}
              {toDate?.toLocaleDateString(locale, { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>
      )}

      {/* Calendar */}
      <style>{`
        .saros-calendar {
          width: 100%;
          font-family: var(--font-raleway);
        }
        .saros-calendar .rdp-month {
          width: 100%;
        }
        .saros-calendar .rdp-months {
          width: 100%;
          justify-content: center;
        }
        .saros-calendar .rdp-month_grid {
          width: 100%;
          border-collapse: separate;
          border-spacing: 2px;
        }
        .saros-calendar .rdp-month_caption {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.5rem 1rem;
        }
        .saros-calendar .rdp-caption_label {
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--cream);
          font-family: var(--font-raleway);
          font-weight: 500;
        }
        .saros-calendar .rdp-nav {
          display: flex;
          gap: 0.5rem;
        }
        .saros-calendar .rdp-button_previous,
        .saros-calendar .rdp-button_next {
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
          background: transparent;
          color: var(--cream);
          cursor: pointer;
          transition: all 0.2s;
          opacity: 0.7;
        }
        .saros-calendar .rdp-button_previous:hover,
        .saros-calendar .rdp-button_next:hover {
          border-color: var(--gold);
          color: var(--gold);
          opacity: 1;
        }
        .saros-calendar .rdp-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          margin-bottom: 0.25rem;
        }
        .saros-calendar .rdp-weekday {
          text-align: center;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.5rem 0;
          color: var(--gold);
          opacity: 0.6;
          font-family: var(--font-raleway);
        }
        .saros-calendar .rdp-week {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        }
        .saros-calendar .rdp-day {
          position: relative;
          text-align: center;
          padding: 0;
        }
        .saros-calendar .rdp-day_button {
          width: 100%;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          color: var(--cream);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          border-radius: 0;
          font-family: var(--font-raleway);
        }
        .saros-calendar .rdp-day_button:hover:not(:disabled) {
          background: var(--gold-tint);
          color: var(--gold);
        }
        .saros-calendar .rdp-outside .rdp-day_button {
          opacity: 0.2;
        }
        .saros-calendar .rdp-disabled .rdp-day_button {
          opacity: 0.15;
          cursor: not-allowed;
        }
        .saros-calendar .rdp-today .rdp-day_button {
          color: var(--gold);
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        /* Range start */
        .saros-calendar .rdp-range_start .rdp-day_button {
          background: var(--gold) !important;
          color: #fff !important;
          border-radius: 0;
        }
        /* Range end */
        .saros-calendar .rdp-range_end .rdp-day_button {
          background: var(--gold) !important;
          color: #fff !important;
          border-radius: 0;
        }
        /* Middle of range */
        .saros-calendar .rdp-range_middle .rdp-day_button {
          background: var(--gold-tint) !important;
          color: var(--gold) !important;
        }
        /* Single day selected (start = end) */
        .saros-calendar .rdp-selected .rdp-day_button {
          background: var(--gold);
          color: #fff;
        }
      `}</style>

      <div className="border" style={{ borderColor: "var(--border-color)", background: "var(--dark-mid)", padding: "1.25rem" }}>
        <DayPicker
          className="saros-calendar"
          mode="range"
          selected={range}
          onSelect={handleSelect}
          disabled={{ before: today }}
          showOutsideDays
        />
      </div>

      {/* Guest count */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { label: t.datePicker.adults,   value: adults,   field: "adults",   min: 1, max: 6 },
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
