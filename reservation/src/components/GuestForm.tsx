"use client";

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

const inputClass =
  "w-full px-4 py-3.5 border bg-transparent text-sm transition-colors duration-300 focus:border-[var(--gold)]";
const inputStyle = {
  borderColor: "rgba(255,255,255,0.15)",
  color: "var(--cream)",
  fontFamily: "var(--font-raleway)",
};

export default function GuestForm({ guestInfo, onChange }: GuestFormProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2
          className="text-4xl font-light italic mb-2"
          style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
        >
          Your Information
        </h2>
        <p
          className="text-sm opacity-60"
          style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
        >
          Please fill in your details to complete the reservation.
        </p>
      </div>

      <div className="space-y-6">
        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70"
              style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
            >
              First Name *
            </label>
            <input
              type="text"
              value={guestInfo.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              placeholder="John"
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label
              className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70"
              style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
            >
              Last Name *
            </label>
            <input
              type="text"
              value={guestInfo.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              placeholder="Doe"
              className={inputClass}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            Email Address *
          </label>
          <input
            type="email"
            value={guestInfo.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="john@example.com"
            className={inputClass}
            style={inputStyle}
          />
        </div>

        {/* Phone */}
        <div>
          <label
            className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            Phone Number *
          </label>
          <input
            type="tel"
            value={guestInfo.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            className={inputClass}
            style={inputStyle}
          />
        </div>

        {/* Special requests */}
        <div>
          <label
            className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            Special Requests
          </label>
          <textarea
            value={guestInfo.specialRequests}
            onChange={(e) => onChange("specialRequests", e.target.value)}
            rows={4}
            placeholder="Any special requests, dietary requirements, or occasions we should know about..."
            className={`${inputClass} resize-none`}
            style={inputStyle}
          />
        </div>

        {/* Policy note */}
        <div
          className="flex gap-3 px-4 py-4 border-l-2 text-sm"
          style={{ borderColor: "var(--gold)", background: "rgba(201,168,76,0.06)" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--gold)" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          <p
            className="opacity-60 leading-6"
            style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
          >
            Free cancellation up to 48 hours before check-in. Your reservation is confirmed via email after submission.
          </p>
        </div>
      </div>
    </div>
  );
}
