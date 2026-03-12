"use client";

import { DayPicker } from "react-day-picker";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "./LanguageProvider";

export interface AdultGuestDetails {
  gender: string;
  firstName: string;
  lastName: string;
}

export interface ChildGuestDetails {
  firstName: string;
  lastName: string;
  birthDate: string;
}

export interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  adults: AdultGuestDetails[];
  children: ChildGuestDetails[];
}

export const createAdultGuest = (): AdultGuestDetails => ({
  gender: "",
  firstName: "",
  lastName: "",
});

export const createChildGuest = (): ChildGuestDetails => ({
  firstName: "",
  lastName: "",
  birthDate: "",
});

interface GuestFormProps {
  guestInfo: GuestInfo;
  onContactChange: (field: "firstName" | "lastName" | "email" | "phone" | "specialRequests", value: string) => void;
  onAdultChange: (index: number, field: keyof AdultGuestDetails, value: string) => void;
  onChildChange: (index: number, field: keyof ChildGuestDetails, value: string) => void;
  childBirthDateMin: string;
  childBirthDateMax: string;
}

interface GenderSelectProps {
  value: string;
  placeholder: string;
  femaleLabel: string;
  maleLabel: string;
  className: string;
  style: CSSProperties;
  onChange: (value: string) => void;
}

interface BirthDatePickerProps {
  value: string;
  min: string;
  max: string;
  placeholder: string;
  className: string;
  style: CSSProperties;
  onChange: (value: string) => void;
}

function toISODateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toDisplayDate(value: string) {
  if (!value) return "";

  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;

  return `${day}.${month}.${year}`;
}

function parseManualDateInput(value: string) {
  const normalized = value.trim().replace(/[/-]/g, ".");
  const match = normalized.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);

  if (!match) return null;

  const [, dayRaw, monthRaw, yearRaw] = match;
  const day = Number(dayRaw);
  const month = Number(monthRaw);
  const year = Number(yearRaw);
  const date = new Date(year, month - 1, day);

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return toISODateString(date);
}

function formatDateInputMask(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);

  if (digits.length <= 2) return day;
  if (digits.length <= 4) return `${day}.${month}`;
  return `${day}.${month}.${year}`;
}

function BirthDatePicker({ value, min, max, placeholder, className, style, onChange }: BirthDatePickerProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value ? toDisplayDate(value) : "");
  const [isDirty, setIsDirty] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedDate = value ? new Date(`${value}T00:00:00`) : undefined;
  const minDate = new Date(`${min}T00:00:00`);
  const maxDate = new Date(`${max}T00:00:00`);
  const minMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  const maxMonth = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
  const [visibleMonth, setVisibleMonth] = useState(selectedDate ?? maxDate);
  const locale = language === "tr" ? "tr-TR" : "en-US";
  const committedDisplayValue = value ? toDisplayDate(value) : "";
  const displayValue = isDirty ? inputValue : committedDisplayValue;
  const monthFieldLabel = language === "tr" ? "Ay" : "Month";
  const yearFieldLabel = language === "tr" ? "Yil" : "Year";
  const monthNames = Array.from({ length: 12 }, (_, index) =>
    new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date(2026, index, 1))
  );
  const yearOptions = Array.from(
    { length: maxDate.getFullYear() - minDate.getFullYear() + 1 },
    (_, index) => maxDate.getFullYear() - index
  );

  const clampMonth = (date: Date) => {
    const candidate = new Date(date.getFullYear(), date.getMonth(), 1);
    if (candidate < minMonth) return minMonth;
    if (candidate > maxMonth) return maxMonth;
    return candidate;
  };

  const commitManualInput = useCallback((draftValue: string) => {
    if (!draftValue.trim()) {
      onChange("");
      setInputValue("");
      setIsDirty(false);
      return;
    }

    const parsedValue = parseManualDateInput(draftValue);
    if (!parsedValue || parsedValue < min || parsedValue > max) {
      setInputValue(committedDisplayValue);
      setIsDirty(false);
      return;
    }

    onChange(parsedValue);
    setInputValue(toDisplayDate(parsedValue));
    setIsDirty(false);
    setVisibleMonth(new Date(`${parsedValue}T00:00:00`));
  }, [committedDisplayValue, max, min, onChange]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        commitManualInput(displayValue);
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [commitManualInput, displayValue]);

  const previousMonthDisabled = visibleMonth.getFullYear() === minMonth.getFullYear() && visibleMonth.getMonth() === minMonth.getMonth();
  const nextMonthDisabled = visibleMonth.getFullYear() === maxMonth.getFullYear() && visibleMonth.getMonth() === maxMonth.getMonth();

  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        inputMode="numeric"
        value={displayValue}
        onFocus={() => {
          setInputValue(committedDisplayValue);
          setIsDirty(true);
        }}
        onChange={(e) => {
          setIsDirty(true);
          setInputValue(formatDateInputMask(e.target.value));
        }}
        onBlur={() => commitManualInput(displayValue)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commitManualInput(displayValue);
            setIsOpen(false);
            (e.currentTarget as HTMLInputElement).blur();
          }
        }}
        placeholder={placeholder}
        maxLength={10}
        className={`${className} pr-14`}
        style={{ ...style, borderRadius: "999px", background: "rgba(255,255,255,0.03)" }}
      />
      <button
        type="button"
        aria-label="Dogum tarihi takvimini ac"
        onClick={() => {
          setVisibleMonth(selectedDate ?? maxDate);
          setIsOpen((open) => !open);
        }}
        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center"
        style={{ color: "var(--gold)" }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4.5 w-4.5 flex-shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3.75v2.25m7.5-2.25v2.25M4.5 8.25h15m-13.5 12h12a1.5 1.5 0 0 0 1.5-1.5V6.75a1.5 1.5 0 0 0-1.5-1.5h-12A1.5 1.5 0 0 0 4.5 6.75v12a1.5 1.5 0 0 0 1.5 1.5Z" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-20 mt-2 w-[19rem] overflow-hidden rounded-[1.6rem] border p-3 shadow-[0_20px_48px_rgba(0,0,0,0.24)] backdrop-blur-md"
          style={{
            borderColor: "var(--border-strong)",
            background: "var(--dark)",
            animation: "genderDropdownIn 180ms ease-out",
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setVisibleMonth((current) => clampMonth(new Date(current.getFullYear(), current.getMonth() - 1, 1)))}
              disabled={previousMonthDisabled}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-35"
              style={{ borderColor: "var(--border-color)", color: "var(--cream)", background: "var(--dark)" }}
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m12.5 4.5-5 5 5 5" />
              </svg>
            </button>

            <div className="grid flex-1 grid-cols-[1.2fr_0.9fr] gap-2">
              <label className="saros-birthdate-select-wrap">
                <span className="saros-birthdate-caption-label">{monthFieldLabel}</span>
                <select
                  value={visibleMonth.getMonth()}
                  onChange={(e) =>
                    setVisibleMonth((current) => clampMonth(new Date(current.getFullYear(), Number(e.target.value), 1)))
                  }
                  className="saros-birthdate-select"
                >
                  {monthNames.map((monthName, index) => {
                    const isDisabled =
                      (visibleMonth.getFullYear() === minDate.getFullYear() && index < minDate.getMonth()) ||
                      (visibleMonth.getFullYear() === maxDate.getFullYear() && index > maxDate.getMonth());

                    return (
                      <option key={monthName} value={index} disabled={isDisabled}>
                        {monthName}
                      </option>
                    );
                  })}
                </select>
              </label>

              <label className="saros-birthdate-select-wrap">
                <span className="saros-birthdate-caption-label">{yearFieldLabel}</span>
                <select
                  value={visibleMonth.getFullYear()}
                  onChange={(e) =>
                    setVisibleMonth((current) => clampMonth(new Date(Number(e.target.value), current.getMonth(), 1)))
                  }
                  className="saros-birthdate-select"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button
              type="button"
              onClick={() => setVisibleMonth((current) => clampMonth(new Date(current.getFullYear(), current.getMonth() + 1, 1)))}
              disabled={nextMonthDisabled}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-35"
              style={{ borderColor: "var(--border-color)", color: "var(--cream)", background: "var(--dark)" }}
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m7.5 4.5 5 5-5 5" />
              </svg>
            </button>
          </div>

          <DayPicker
            className="saros-birthdate-calendar"
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (!date) return;

              const isoValue = toISODateString(date);
              onChange(isoValue);
              setInputValue(toDisplayDate(isoValue));
              setIsDirty(false);
              setIsOpen(false);
            }}
            month={visibleMonth}
            onMonthChange={setVisibleMonth}
            startMonth={minDate}
            endMonth={maxDate}
            defaultMonth={selectedDate ?? maxDate}
            disabled={{ before: minDate, after: maxDate }}
            showOutsideDays
          />
        </div>
      )}
    </div>
  );
}

function GenderSelect({ value, placeholder, femaleLabel, maleLabel, className, style, onChange }: GenderSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const options = [
    { value: "female", label: femaleLabel },
    { value: "male", label: maleLabel },
  ];

  const selectedLabel = options.find((option) => option.value === value)?.label ?? placeholder;

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`${className} flex items-center justify-between text-left`}
        style={style}
      >
        <span className={value ? "" : "opacity-45"}>{selectedLabel}</span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          style={{ color: "var(--gold)" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m5.5 7.5 4.5 4.5 4.5-4.5" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-[1.4rem] border p-2 shadow-[0_18px_45px_rgba(0,0,0,0.24)] backdrop-blur-md"
          style={{ borderColor: "var(--border-strong)", background: "var(--dark)" }}
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-full px-4 py-3 text-left text-[0.98rem] transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-raleway)",
                  background: isSelected ? "var(--gold-tint)" : "transparent",
                  animation: "genderDropdownIn 180ms ease-out",
                }}
              >
                <span style={{ color: "var(--cream)", fontWeight: 500 }}>{option.label}</span>
                {isSelected && (
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4" style={{ color: "var(--gold)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 10.5 3.25 3.25 7.75-8" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function GuestForm({
  guestInfo,
  onContactChange,
  onAdultChange,
  onChildChange,
  childBirthDateMin,
  childBirthDateMax,
}: GuestFormProps) {
  const { t } = useLanguage();
  const inputStyle = { borderColor: "var(--border-color)", color: "var(--cream)", fontFamily: "var(--font-raleway)" };
  const contactInputClass = "w-full rounded-[1.35rem] px-4 py-3 border bg-transparent text-[0.98rem] transition-colors duration-300 focus:border-[var(--gold)]";
  const guestInputClass = "w-full h-[3.7rem] rounded-[1.35rem] px-4 border bg-transparent text-[1rem] transition-colors duration-300 focus:border-[var(--gold)]";
  const labelClass = "block text-[0.84rem] tracking-[0.18em] uppercase mb-2.5 opacity-70";
  const cardStyle = { borderColor: "var(--border-color)", background: "rgba(255,255,255,0.02)" };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[3rem] md:text-[3.6rem] font-light italic mb-2 tracking-[-0.04em]" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
          {t.guestForm.title}
        </h2>
        <p className="text-[1.1rem] opacity-60" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
          {t.guestForm.subtitle}
        </p>
      </div>

      <div className="space-y-8">
        <div className="rounded-[1.9rem] border p-5 md:p-6" style={cardStyle}>
          <div className="mb-5">
            <h3 className="text-[1.5rem] md:text-[1.7rem] font-light italic tracking-[-0.03em]" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
              {t.guestForm.contactTitle}
            </h3>
            <p className="mt-1 text-[1rem] opacity-55" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
              {t.guestForm.contactSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[
              { label: t.guestForm.firstName, field: "firstName" as const, placeholder: "Ahmet", type: "text" },
              { label: t.guestForm.lastName, field: "lastName" as const, placeholder: "Yilmaz", type: "text" },
              { label: t.guestForm.email, field: "email" as const, placeholder: "ahmet@ornek.com", type: "email" },
              { label: t.guestForm.phone, field: "phone" as const, placeholder: "+90 (555) 000-0000", type: "tel" },
            ].map(({ label, field, placeholder, type }) => (
              <div key={field}>
                <label className={labelClass} style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
                  {label}
                </label>
                <input
                  type={type}
                  value={guestInfo[field]}
                  onChange={(e) => onContactChange(field, e.target.value)}
                  placeholder={placeholder}
                  className={contactInputClass}
                  style={inputStyle}
                />
              </div>
            ))}
          </div>

          <div className="mt-5">
            <label className={labelClass} style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
              {t.guestForm.specialRequests}
            </label>
            <textarea
              value={guestInfo.specialRequests}
              onChange={(e) => onContactChange("specialRequests", e.target.value)}
              rows={3}
              placeholder={t.guestForm.specialRequestsPlaceholder}
              className={`${contactInputClass} resize-none`}
              style={inputStyle}
            />
          </div>
        </div>

        <div className="rounded-[1.9rem] border p-5 md:p-6" style={cardStyle}>
          <div className="mb-6">
            <h3 className="text-[1.5rem] md:text-[1.7rem] font-light italic tracking-[-0.03em]" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
              {t.guestForm.guestsTitle}
            </h3>
            <p className="mt-1 text-[1rem] opacity-55" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
              {t.guestForm.guestsSubtitle}
            </p>
            {guestInfo.children.length > 0 && (
              <p className="mt-3 text-[0.96rem] opacity-60" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)", fontWeight: 400 }}>
                {t.guestForm.childAgeNote}
              </p>
            )}
          </div>

          <div className="space-y-5">
            {guestInfo.adults.map((adult, index) => (
              <div key={`adult-${index}`} className="rounded-[1.7rem] border p-4 md:p-5" style={{ borderColor: "var(--border-color)" }}>
                <p className="mb-4 text-[0.9rem] tracking-[0.2em] uppercase" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
                  {t.guestForm.adultGuest} {index + 1}
                </p>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <div>
                    <label className={labelClass} style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
                      {t.guestForm.gender}
                    </label>
                    <GenderSelect
                      value={adult.gender}
                      onChange={(value) => onAdultChange(index, "gender", value)}
                      placeholder={t.guestForm.genderPlaceholder}
                      femaleLabel={t.guestForm.female}
                      maleLabel={t.guestForm.male}
                      className={guestInputClass}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label className={labelClass} style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
                      {t.guestForm.firstName}
                    </label>
                    <input
                      type="text"
                      value={adult.firstName}
                      onChange={(e) => onAdultChange(index, "firstName", e.target.value)}
                      placeholder="Ahmet"
                      className={guestInputClass}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label className={labelClass} style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
                      {t.guestForm.lastName}
                    </label>
                    <input
                      type="text"
                      value={adult.lastName}
                      onChange={(e) => onAdultChange(index, "lastName", e.target.value)}
                      placeholder="Yilmaz"
                      className={guestInputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            ))}

            {guestInfo.children.map((child, index) => (
              <div key={`child-${index}`} className="rounded-[1.7rem] border p-4 md:p-5" style={{ borderColor: "var(--border-color)" }}>
                <p className="mb-4 text-[0.9rem] tracking-[0.2em] uppercase" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
                  {t.guestForm.childGuest} {index + 1}
                </p>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <div>
                    <label className={labelClass} style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
                      {t.guestForm.firstName}
                    </label>
                    <input
                      type="text"
                      value={child.firstName}
                      onChange={(e) => onChildChange(index, "firstName", e.target.value)}
                      placeholder="Ela"
                      className={guestInputClass}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label className={labelClass} style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
                      {t.guestForm.lastName}
                    </label>
                    <input
                      type="text"
                      value={child.lastName}
                      onChange={(e) => onChildChange(index, "lastName", e.target.value)}
                      placeholder="Yilmaz"
                      className={guestInputClass}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label className={labelClass} style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
                      {t.guestForm.birthDate}
                    </label>
                    <BirthDatePicker
                      key={`${child.birthDate}-${childBirthDateMin}-${childBirthDateMax}`}
                      value={child.birthDate}
                      onChange={(value) => onChildChange(index, "birthDate", value)}
                      min={childBirthDateMin}
                      max={childBirthDateMax}
                      placeholder={t.datePicker.datePlaceholder}
                      className={guestInputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 rounded-[1.75rem] border px-4 py-4 text-[1.02rem]" style={{ borderColor: "var(--border-strong)", background: "var(--gold-tint)" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--gold)" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          <p className="opacity-60 leading-6" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
            {t.guestForm.policyNote}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes genderDropdownIn {
          from {
            opacity: 0;
            transform: translateY(-6px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .saros-birthdate-calendar {
          width: 100%;
          font-family: var(--font-raleway);
        }

        .saros-birthdate-calendar .rdp-months {
          justify-content: center;
        }

        .saros-birthdate-calendar .rdp-month {
          width: 100%;
        }

        .saros-birthdate-calendar .rdp-month_grid {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0.2rem;
        }

        .saros-birthdate-calendar .rdp-month_caption {
          display: none;
        }

        .saros-birthdate-select-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .saros-birthdate-caption-label {
          padding-left: 0.55rem;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(43, 34, 28, 0.58);
          font-family: var(--font-raleway);
          font-weight: 700;
        }

        .saros-birthdate-select {
          width: 100%;
          appearance: none;
          border: 1px solid var(--border-color);
          border-radius: 999px;
          background: var(--dark);
          color: var(--cream);
          padding: 0.85rem 2.3rem 0.85rem 1rem;
          font-size: 0.94rem;
          letter-spacing: 0.02em;
          font-family: var(--font-raleway);
          font-weight: 600;
          background-image: linear-gradient(45deg, transparent 50%, var(--gold) 50%), linear-gradient(135deg, var(--gold) 50%, transparent 50%);
          background-position: calc(100% - 1.15rem) calc(50% - 0.12rem), calc(100% - 0.8rem) calc(50% - 0.12rem);
          background-size: 0.38rem 0.38rem, 0.38rem 0.38rem;
          background-repeat: no-repeat;
        }

        .saros-birthdate-select:focus {
          outline: none;
          border-color: var(--gold);
        }

        .saros-birthdate-calendar .rdp-nav {
          display: none;
        }

        .saros-birthdate-calendar .rdp-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          margin-bottom: 0.1rem;
        }

        .saros-birthdate-calendar .rdp-weekday {
          text-align: center;
          font-size: 0.76rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.3rem 0;
          color: var(--cream);
          opacity: 0.62;
          font-family: var(--font-raleway);
          font-weight: 600;
        }

        .saros-birthdate-calendar .rdp-week {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        }

        .saros-birthdate-calendar .rdp-day {
          text-align: center;
        }

        .saros-birthdate-calendar .rdp-day_button {
          width: 100%;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 999px;
          background: transparent;
          color: var(--cream);
          font-family: var(--font-raleway);
          font-size: 0.96rem;
          font-variant-numeric: lining-nums tabular-nums;
          cursor: pointer;
          transition: all 0.15s;
        }

        .saros-birthdate-calendar .rdp-day_button:hover:not(:disabled) {
          background: var(--gold-tint);
          color: var(--gold);
        }

        .saros-birthdate-calendar .rdp-disabled .rdp-day_button,
        .saros-birthdate-calendar .rdp-outside .rdp-day_button {
          opacity: 0.25;
          cursor: not-allowed;
        }

        .saros-birthdate-calendar .rdp-today .rdp-day_button {
          color: var(--gold);
          font-weight: 700;
        }

        .saros-birthdate-calendar .rdp-selected .rdp-day_button {
          background: var(--gold);
          color: #fff;
        }
      `}</style>
    </div>
  );
}
