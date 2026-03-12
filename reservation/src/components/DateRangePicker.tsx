"use client";

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
  childCount: number;
  onChange: (field: string, value: string | number) => void;
}

export default function DateRangePicker({ checkIn, checkOut, adults, childCount, onChange }: DateRangePickerProps) {
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
        <h2 className="text-[3rem] md:text-[3.6rem] font-light italic mb-2 tracking-[-0.04em]" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
          {t.datePicker.title}
        </h2>
        <p className="text-[1.1rem] opacity-60" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
          {t.datePicker.subtitle}
        </p>
      </div>

      {/* Selected date display */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: t.datePicker.checkIn,  date: fromDate },
          { label: t.datePicker.checkOut, date: toDate   },
        ].map(({ label, date }) => (
          <div key={label} className="rounded-[1.75rem] px-5 py-4 border" style={{ borderColor: date ? "var(--gold)" : "var(--border-color)", background: date ? "var(--gold-tint)" : "transparent" }}>
            <p className="mb-1 text-[0.88rem] tracking-[0.18em] uppercase opacity-60" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
              {label}
            </p>
            <p className="text-[1.42rem]" style={{ color: date ? "var(--cream)" : "var(--cream)", fontFamily: "var(--font-raleway)", opacity: date ? 1 : 0.3, fontVariantNumeric: "lining-nums tabular-nums" }}>
              {date ? toDisplay(date) : t.datePicker.datePlaceholder}
            </p>
          </div>
        ))}
      </div>

      {/* Nights summary */}
      {nightsCount > 0 && (
        <div className="flex items-center gap-4 rounded-[1.85rem] border px-5 py-4" style={{ borderColor: "rgba(200, 126, 66, 0.34)", background: "var(--gold-tint)" }}>
          <div className="text-[3.5rem] font-light" style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)", fontVariantNumeric: "lining-nums tabular-nums" }}>
            {nightsCount}
          </div>
          <div>
            <p className="text-[1.02rem]" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>
              {nightsCount === 1 ? t.datePicker.night : t.datePicker.nights}
            </p>
            <p className="text-[0.9rem] opacity-50" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
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
          font-size: 1.18rem;
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
          width: 2.9rem;
          height: 2.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
          background: transparent;
          color: var(--cream);
          cursor: pointer;
          transition: all 0.2s;
          opacity: 0.7;
          border-radius: 999px;
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
          font-size: 1rem;
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
          font-size: 1.3rem;
          color: var(--cream);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          border-radius: 1.5rem;
          font-family: var(--font-raleway);
          font-variant-numeric: lining-nums tabular-nums;
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
          border-radius: 1.5rem;
        }
        /* Range end */
        .saros-calendar .rdp-range_end .rdp-day_button {
          background: var(--gold) !important;
          color: #fff !important;
          border-radius: 1.5rem;
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

      <div className="rounded-[2rem] border" style={{ borderColor: "var(--border-color)", background: "var(--dark-mid)", padding: "1.5rem" }}>
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
          { label: t.datePicker.children, value: childCount, field: "children", min: 0, max: 4 },
        ].map(({ label, value, field, min, max }) => (
          <div key={field}>
            <label className="block text-[0.9rem] tracking-[0.18em] uppercase mb-3 opacity-70" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
              {label}
            </label>
            <div className="flex items-center overflow-hidden rounded-full border" style={{ borderColor: "var(--border-color)" }}>
              <button
                type="button"
                onClick={() => onChange(field, Math.max(min, value - 1))}
                className="flex h-[4.4rem] w-[4.4rem] items-center justify-center text-[2.1rem] transition-colors duration-200 hover:bg-black/5"
                style={{ color: "var(--gold)", touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
              >−</button>
              <span className="flex-1 text-center text-[1.32rem]" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontVariantNumeric: "lining-nums tabular-nums" }}>{value}</span>
              <button
                type="button"
                onClick={() => onChange(field, Math.min(max, value + 1))}
                className="flex h-[4.4rem] w-[4.4rem] items-center justify-center text-[2.1rem] transition-colors duration-200 hover:bg-black/5"
                style={{ color: "var(--gold)", touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
              >+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
