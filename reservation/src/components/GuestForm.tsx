"use client";

import { useLanguage } from "./LanguageProvider";

export interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

interface GuestFormProps {
  guestInfo: GuestInfo;
  onChange: (field: keyof GuestInfo, value: string) => void;
}

export default function GuestForm({ guestInfo, onChange }: GuestFormProps) {
  const { t } = useLanguage();
  const inputStyle = { borderColor: "var(--border-color)", color: "var(--cream)", fontFamily: "var(--font-raleway)" };
  const inputClass = "w-full px-4 py-3.5 border bg-transparent text-sm transition-colors duration-300 focus:border-[var(--gold)]";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-light italic mb-2" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
          {t.guestForm.title}
        </h2>
        <p className="text-sm opacity-60" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
          {t.guestForm.subtitle}
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { label: t.guestForm.firstName, field: "firstName" as const, placeholder: "Ahmet", type: "text" },
            { label: t.guestForm.lastName, field: "lastName" as const, placeholder: "Yılmaz", type: "text" },
          ].map(({ label, field, placeholder, type }) => (
            <div key={field}>
              <label className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
                {label}
              </label>
              <input type={type} value={guestInfo[field]} onChange={(e) => onChange(field, e.target.value)} placeholder={placeholder} className={inputClass} style={inputStyle} />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
            {t.guestForm.email}
          </label>
          <input type="email" value={guestInfo.email} onChange={(e) => onChange("email", e.target.value)} placeholder="ahmet@ornek.com" className={inputClass} style={inputStyle} />
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
            {t.guestForm.phone}
          </label>
          <input type="tel" value={guestInfo.phone} onChange={(e) => onChange("phone", e.target.value)} placeholder="+90 (555) 000-0000" className={inputClass} style={inputStyle} />
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
            {t.guestForm.specialRequests}
          </label>
          <textarea value={guestInfo.specialRequests} onChange={(e) => onChange("specialRequests", e.target.value)} rows={4} placeholder={t.guestForm.specialRequestsPlaceholder} className={`${inputClass} resize-none`} style={inputStyle} />
        </div>

        <div className="flex gap-3 px-4 py-4 border-l-2 text-sm" style={{ borderColor: "var(--gold)", background: "var(--gold-tint)" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--gold)" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          <p className="opacity-60 leading-6" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
            {t.guestForm.policyNote}
          </p>
        </div>
      </div>
    </div>
  );
}
