"use client";

import { useLanguage } from "./LanguageProvider";

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  onChange: (field: string, value: string | number) => void;
}

export default function DateRangePicker({ checkIn, checkOut, adults, children, onChange }: DateRangePickerProps) {
  const { t } = useLanguage();
  const today = new Date().toISOString().split("T")[0];

  const nightsCount = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

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
        {[
          { label: t.datePicker.checkIn, value: checkIn, field: "checkIn", min: today },
          { label: t.datePicker.checkOut, value: checkOut, field: "checkOut", min: checkIn || today },
        ].map(({ label, value, field, min }) => (
          <div key={field}>
            <label className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
              {label}
            </label>
            <input
              type="date"
              value={value}
              min={min}
              onChange={(e) => onChange(field, e.target.value)}
              className="w-full px-4 py-3.5 border text-sm bg-transparent transition-colors duration-300"
              style={{ borderColor: "var(--border-color)", color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
            />
          </div>
        ))}
      </div>

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
              {new Date(checkIn).toLocaleDateString(undefined, { month: "short", day: "numeric" })} →{" "}
              {new Date(checkOut).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>
      )}

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
              <button type="button" onClick={() => onChange(field, Math.max(min, value - 1))}
                className="w-12 h-12 flex items-center justify-center text-xl transition-colors duration-200 hover:bg-black/5"
                style={{ color: "var(--gold)" }}>−</button>
              <span className="flex-1 text-center text-base" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>{value}</span>
              <button type="button" onClick={() => onChange(field, Math.min(max, value + 1))}
                className="w-12 h-12 flex items-center justify-center text-xl transition-colors duration-200 hover:bg-black/5"
                style={{ color: "var(--gold)" }}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
