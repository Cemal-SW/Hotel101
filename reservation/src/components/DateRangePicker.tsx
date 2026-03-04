"use client";

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  onChange: (field: string, value: string | number) => void;
}

export default function DateRangePicker({
  checkIn,
  checkOut,
  adults,
  children,
  onChange,
}: DateRangePickerProps) {
  const today = new Date().toISOString().split("T")[0];

  const nightsCount =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.round(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  return (
    <div className="space-y-8">
      <div>
        <h2
          className="text-4xl font-light italic mb-2"
          style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
        >
          Plan Your Stay
        </h2>
        <p
          className="text-sm opacity-60"
          style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
        >
          Select your arrival and departure dates and number of guests.
        </p>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            Check-In Date
          </label>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => onChange("checkIn", e.target.value)}
            className="w-full px-4 py-3.5 border text-sm bg-transparent transition-colors duration-300"
            style={{
              borderColor: "rgba(255,255,255,0.15)",
              color: "var(--cream)",
              fontFamily: "var(--font-raleway)",
            }}
          />
        </div>

        <div>
          <label
            className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            Check-Out Date
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn || today}
            onChange={(e) => onChange("checkOut", e.target.value)}
            className="w-full px-4 py-3.5 border text-sm bg-transparent transition-colors duration-300"
            style={{
              borderColor: "rgba(255,255,255,0.15)",
              color: "var(--cream)",
              fontFamily: "var(--font-raleway)",
            }}
          />
        </div>
      </div>

      {/* Nights summary */}
      {nightsCount > 0 && (
        <div
          className="flex items-center gap-4 px-5 py-4 border-l-2"
          style={{ borderColor: "var(--gold)", background: "rgba(201,168,76,0.08)" }}
        >
          <div
            className="text-3xl font-light"
            style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)" }}
          >
            {nightsCount}
          </div>
          <div>
            <p
              className="text-sm"
              style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
            >
              {nightsCount === 1 ? "Night" : "Nights"}
            </p>
            <p
              className="text-xs opacity-50"
              style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
            >
              {new Date(checkIn).toLocaleDateString("en-US", { month: "short", day: "numeric" })} →{" "}
              {new Date(checkOut).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>
      )}

      {/* Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            Adults
          </label>
          <div className="flex items-center border" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
            <button
              type="button"
              onClick={() => onChange("adults", Math.max(1, adults - 1))}
              className="w-12 h-12 flex items-center justify-center text-xl transition-colors duration-200 hover:bg-white/5"
              style={{ color: "var(--gold)" }}
            >
              −
            </button>
            <span
              className="flex-1 text-center text-base"
              style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
            >
              {adults}
            </span>
            <button
              type="button"
              onClick={() => onChange("adults", Math.min(6, adults + 1))}
              className="w-12 h-12 flex items-center justify-center text-xl transition-colors duration-200 hover:bg-white/5"
              style={{ color: "var(--gold)" }}
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label
            className="block text-xs tracking-[0.2em] uppercase mb-3 opacity-70"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            Children
          </label>
          <div className="flex items-center border" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
            <button
              type="button"
              onClick={() => onChange("children", Math.max(0, children - 1))}
              className="w-12 h-12 flex items-center justify-center text-xl transition-colors duration-200 hover:bg-white/5"
              style={{ color: "var(--gold)" }}
            >
              −
            </button>
            <span
              className="flex-1 text-center text-base"
              style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
            >
              {children}
            </span>
            <button
              type="button"
              onClick={() => onChange("children", Math.min(4, children + 1))}
              className="w-12 h-12 flex items-center justify-center text-xl transition-colors duration-200 hover:bg-white/5"
              style={{ color: "var(--gold)" }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
