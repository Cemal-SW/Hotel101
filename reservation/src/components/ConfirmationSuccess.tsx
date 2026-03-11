"use client";

import { useLanguage } from "./LanguageProvider";

interface ConfirmationSuccessProps {
  firstName: string;
  email: string;
  promotionalUrl: string;
}

export default function ConfirmationSuccess({ firstName, email, promotionalUrl }: ConfirmationSuccessProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center text-center py-16 px-6">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8" style={{ border: "2px solid var(--gold)", background: "var(--gold-tint)" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10" style={{ color: "var(--gold)" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>

      <p className="text-[0.95rem] tracking-[0.24em] uppercase mb-4" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
        {t.confirmation.tag}
      </p>

      <h2 className="text-[3.6rem] md:text-[4.7rem] font-light italic mb-6 tracking-[-0.045em]" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
        {t.confirmation.title}, {firstName}!
      </h2>

      <p className="max-w-xl text-[1.08rem] opacity-70 mb-4" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
        {t.confirmation.p1}{" "}
        <strong className="opacity-90">{email}</strong>
        {t.confirmation.p1b && <> {t.confirmation.p1b}</>}.
      </p>

      <p className="max-w-xl text-[1.04rem] opacity-50 mb-12" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
        {t.confirmation.p2}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a href={promotionalUrl} className="rounded-full px-10 py-4 text-[0.96rem] tracking-[0.18em] uppercase transition-all duration-300 hover:opacity-90" style={{ background: "var(--gold)", color: "#fff", fontFamily: "var(--font-raleway)" }}>
          {t.confirmation.backBtn}
        </a>
        <a href="mailto:info@sarosvadi.com" className="rounded-full px-10 py-4 border text-[0.96rem] tracking-[0.18em] uppercase transition-all duration-300 hover:bg-black/5" style={{ borderColor: "var(--border-color)", color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>
          {t.confirmation.contactBtn}
        </a>
      </div>
    </div>
  );
}
