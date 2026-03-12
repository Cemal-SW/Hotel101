"use client";

import { useLanguage } from "./LanguageProvider";

export interface PaymentInfo {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface PaymentFormProps {
  paymentInfo: PaymentInfo;
  onChange: (field: keyof PaymentInfo, value: string) => void;
}

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function formatExpiryDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function formatCvv(value: string) {
  return value.replace(/\D/g, "").slice(0, 4);
}

export default function PaymentForm({ paymentInfo, onChange }: PaymentFormProps) {
  const { t } = useLanguage();
  const inputStyle = { borderColor: "var(--border-color)", color: "var(--cream)", fontFamily: "var(--font-raleway)" };
  const inputClass = "w-full rounded-[1.35rem] px-4 py-3.5 border bg-transparent text-[1rem] transition-colors duration-300 focus:border-[var(--gold)]";
  const inlineLabelRowClass = "mb-2.5 flex min-h-[1.5rem] items-center gap-2";
  const cardBrand = paymentInfo.cardNumber.startsWith("4")
    ? "VISA"
    : paymentInfo.cardNumber.startsWith("5")
      ? "MASTERCARD"
      : "SAROS PAY";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-2 text-[3rem] font-light italic tracking-[-0.04em] md:text-[3.6rem]" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
          {t.paymentForm.title}
        </h2>
        <p className="text-[1.1rem] opacity-60" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
          {t.paymentForm.subtitle}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.9rem] border p-5 md:p-6" style={{ borderColor: "var(--border-color)", background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))" }}>
          <div className="mb-5">
            <h3 className="text-[1.5rem] font-light italic tracking-[-0.03em] md:text-[1.7rem]" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
              {t.paymentForm.cardTitle}
            </h3>
            <p className="mt-1 text-[1rem] opacity-55" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
              {t.paymentForm.cardSubtitle}
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2.5 block text-[0.84rem] uppercase tracking-[0.18em] opacity-70" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
                {t.paymentForm.cardholderName}
              </label>
              <input
                type="text"
                value={paymentInfo.cardholderName}
                onChange={(e) => onChange("cardholderName", e.target.value)}
                className={inputClass}
                style={inputStyle}
                placeholder="Saros Vadi Guest"
              />
            </div>

            <div>
              <label className="mb-2.5 block text-[0.84rem] uppercase tracking-[0.18em] opacity-70" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
                {t.paymentForm.cardNumber}
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={paymentInfo.cardNumber}
                onChange={(e) => onChange("cardNumber", formatCardNumber(e.target.value))}
                className={inputClass}
                style={{ ...inputStyle, fontVariantNumeric: "lining-nums tabular-nums" }}
                placeholder="0000 0000 0000 0000"
              />

              <div className="mt-3 flex items-center gap-2">
                {[
                  { label: "VISA", active: cardBrand === "VISA" },
                  { label: "MC", active: cardBrand === "MASTERCARD" },
                  { label: "AMEX", active: false },
                ].map((brand) => (
                  <span
                    key={brand.label}
                    className="inline-flex min-w-14 items-center justify-center rounded-full px-3 py-1 text-[0.72rem] uppercase tracking-[0.16em]"
                    style={{
                      color: brand.active ? "#FFF8F0" : "var(--cream)",
                      background: brand.active ? "rgba(200, 126, 66, 0.3)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${brand.active ? "rgba(214,161,118,0.45)" : "rgba(255,255,255,0.08)"}`,
                      fontFamily: "var(--font-raleway)",
                      opacity: brand.active ? 1 : 0.52,
                    }}
                  >
                    {brand.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid items-end grid-cols-[minmax(0,1fr)_minmax(8.25rem,0.75fr)] gap-5">
              <div className="flex flex-col">
                <div className={inlineLabelRowClass}>
                  <label className="block text-[0.84rem] uppercase tracking-[0.18em] opacity-70" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
                    {t.paymentForm.expiryDate}
                  </label>
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  value={paymentInfo.expiryDate}
                  onChange={(e) => onChange("expiryDate", formatExpiryDate(e.target.value))}
                  className={inputClass}
                  style={{ ...inputStyle, fontVariantNumeric: "lining-nums tabular-nums" }}
                  placeholder="AA/YY"
                />
              </div>

              <div className="flex flex-col">
                <div className={inlineLabelRowClass}>
                  <label className="block text-[0.84rem] uppercase tracking-[0.18em] opacity-70" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
                    {t.paymentForm.cvv}
                  </label>
                  <span
                    title="Kartinizin arka yuzundeki guvenlik kodu"
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[0.72rem]"
                    style={{
                      color: "var(--gold)",
                      border: "1px solid rgba(200, 126, 66, 0.32)",
                      background: "rgba(200, 126, 66, 0.08)",
                      fontFamily: "var(--font-raleway)",
                    }}
                  >
                    i
                  </span>
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  value={paymentInfo.cvv}
                  onChange={(e) => onChange("cvv", formatCvv(e.target.value))}
                  className={inputClass}
                  style={{ ...inputStyle, fontVariantNumeric: "lining-nums tabular-nums" }}
                  placeholder="000"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div
            className="relative flex min-h-[23.5rem] flex-col overflow-hidden rounded-[2rem] border p-6"
            style={{
              borderColor: "rgba(214, 161, 118, 0.38)",
              background: "radial-gradient(circle at top left, rgba(233, 185, 145, 0.28), transparent 34%), linear-gradient(145deg, rgba(143, 87, 54, 0.92), rgba(44, 31, 24, 0.98))",
              boxShadow: "0 20px 45px rgba(0,0,0,0.24)",
            }}
          >
            <div
              className="absolute right-[-2.5rem] top-[-2.5rem] h-28 w-28 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%)" }}
            />

            <div className="mb-10 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-[0.78rem] uppercase tracking-[0.24em] opacity-70" style={{ color: "#F8F2EA", fontFamily: "var(--font-raleway)" }}>
                  Saros Vadi
                </p>
                <p className="text-[1.5rem] italic tracking-[-0.03em]" style={{ color: "#FFF8F0", fontFamily: "var(--font-cormorant)" }}>
                  Private Collection
                </p>
              </div>

              <div className="rounded-full px-3 py-1 text-[0.78rem] uppercase tracking-[0.18em]" style={{ color: "#FFF8F0", border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)", fontFamily: "var(--font-raleway)" }}>
                {cardBrand}
              </div>
            </div>

            <div className="mb-8 flex items-center gap-3">
              <div className="h-10 w-14 rounded-[0.8rem]" style={{ background: "linear-gradient(135deg, rgba(245, 221, 180, 0.9), rgba(190, 138, 88, 0.92))" }} />
              <div className="h-8 w-8 rounded-full border" style={{ borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)" }} />
            </div>

            <p className="mb-5 text-[1.55rem] tracking-[0.16em]" style={{ color: "#FFF8F0", fontFamily: "var(--font-raleway)", fontVariantNumeric: "lining-nums tabular-nums", textShadow: "0 2px 10px rgba(0,0,0,0.18)" }}>
              {paymentInfo.cardNumber || "0000 0000 0000 0000"}
            </p>

            <div className="mt-auto flex items-end justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[0.7rem] uppercase tracking-[0.18em] opacity-50" style={{ color: "#F8F2EA", fontFamily: "var(--font-raleway)" }}>
                  {t.paymentForm.cardholderName.replace(" *", "")}
                </p>
                <p className="truncate text-[1rem] uppercase tracking-[0.08em]" style={{ color: "#FFF8F0", fontFamily: "var(--font-raleway)" }}>
                  {paymentInfo.cardholderName || "CARDHOLDER NAME"}
                </p>
              </div>

              <div className="text-right">
                <p className="mb-1 text-[0.7rem] uppercase tracking-[0.18em] opacity-50" style={{ color: "#F8F2EA", fontFamily: "var(--font-raleway)" }}>
                  {t.paymentForm.expiryDate.replace(" *", "")}
                </p>
                <p className="text-[1rem] tracking-[0.08em]" style={{ color: "#FFF8F0", fontFamily: "var(--font-raleway)", fontVariantNumeric: "lining-nums tabular-nums" }}>
                  {paymentInfo.expiryDate || "00/00"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 rounded-[1.75rem] border px-4 py-4" style={{ borderColor: "rgba(200, 126, 66, 0.34)", background: "var(--gold-tint)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: "var(--gold)" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75 4.5 7.5v4.875c0 4.038 2.595 7.713 6.375 9 3.78-1.287 6.375-4.962 6.375-9V7.5L12 3.75Z" />
            </svg>
            <p className="text-[1.02rem] leading-7 opacity-60" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
              {t.paymentForm.secureNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
