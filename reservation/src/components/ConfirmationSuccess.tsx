interface ConfirmationSuccessProps {
  firstName: string;
  email: string;
  promotionalUrl: string;
}

export default function ConfirmationSuccess({
  firstName,
  email,
  promotionalUrl,
}: ConfirmationSuccessProps) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-6">
      {/* Success icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
        style={{ border: "2px solid var(--gold)", background: "rgba(201,168,76,0.1)" }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10" style={{ color: "var(--gold)" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>

      <p
        className="text-sm tracking-[0.3em] uppercase mb-4"
        style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
      >
        Reservation Confirmed
      </p>

      <h2
        className="text-5xl font-light italic mb-6"
        style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
      >
        Thank You, {firstName}!
      </h2>

      <p
        className="max-w-md text-base leading-8 opacity-70 mb-4"
        style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
      >
        Your reservation at Hotel 101 has been successfully confirmed. A confirmation email has been sent to{" "}
        <strong className="opacity-90">{email}</strong>.
      </p>

      <p
        className="max-w-md text-sm leading-7 opacity-50 mb-12"
        style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
      >
        Our team will be in touch with you shortly. We look forward to welcoming you and creating an unforgettable experience.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={promotionalUrl}
          className="px-10 py-4 text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90"
          style={{
            background: "var(--gold)",
            color: "var(--dark)",
            fontFamily: "var(--font-raleway)",
          }}
        >
          Back to Hotel 101
        </a>
        <a
          href="mailto:info@hotel101.com"
          className="px-10 py-4 border text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/5"
          style={{
            borderColor: "rgba(255,255,255,0.2)",
            color: "var(--cream)",
            fontFamily: "var(--font-raleway)",
          }}
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
