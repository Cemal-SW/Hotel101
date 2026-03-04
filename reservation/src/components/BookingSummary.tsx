import { Room } from "./RoomCard";
import { GuestInfo } from "./GuestForm";

interface BookingSummaryProps {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  room: Room | undefined;
  guestInfo: GuestInfo;
  nights: number;
}

export default function BookingSummary({
  checkIn,
  checkOut,
  adults,
  children,
  room,
  guestInfo,
  nights,
}: BookingSummaryProps) {
  const total = room ? room.pricePerNight * nights : 0;
  const taxes = Math.round(total * 0.12);
  const grandTotal = total + taxes;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="space-y-8">
      <div>
        <h2
          className="text-4xl font-light italic mb-2"
          style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
        >
          Confirm Your Booking
        </h2>
        <p
          className="text-sm opacity-60"
          style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
        >
          Please review your reservation details before confirming.
        </p>
      </div>

      {/* Summary card */}
      <div
        className="border divide-y"
        style={{ borderColor: "rgba(255,255,255,0.12)", background: "var(--dark-mid)" }}
      >
        {/* Stay details */}
        <div className="p-6 space-y-4">
          <h3
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            Stay Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p
                className="text-xs opacity-50 mb-1 tracking-wider uppercase"
                style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
              >
                Check-In
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
              >
                {formatDate(checkIn)}
              </p>
            </div>
            <div>
              <p
                className="text-xs opacity-50 mb-1 tracking-wider uppercase"
                style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
              >
                Check-Out
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
              >
                {formatDate(checkOut)}
              </p>
            </div>
            <div>
              <p
                className="text-xs opacity-50 mb-1 tracking-wider uppercase"
                style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
              >
                Duration
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
              >
                {nights} {nights === 1 ? "Night" : "Nights"}
              </p>
            </div>
            <div>
              <p
                className="text-xs opacity-50 mb-1 tracking-wider uppercase"
                style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
              >
                Guests
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
              >
                {adults} Adult{adults !== 1 ? "s" : ""}
                {children > 0 ? `, ${children} Child${children !== 1 ? "ren" : ""}` : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Room */}
        {room && (
          <div className="p-6">
            <h3
              className="text-xs tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
            >
              Room
            </h3>
            <div className="flex justify-between items-start">
              <div>
                <p
                  className="text-base italic"
                  style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
                >
                  {room.name}
                </p>
                <p
                  className="text-xs opacity-50 mt-1"
                  style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
                >
                  {room.size}
                </p>
              </div>
              <p
                className="text-sm"
                style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
              >
                ${room.pricePerNight} / night
              </p>
            </div>
          </div>
        )}

        {/* Guest info */}
        <div className="p-6">
          <h3
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            Guest
          </h3>
          <p
            className="text-sm"
            style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
          >
            {guestInfo.firstName} {guestInfo.lastName}
          </p>
          <p
            className="text-sm opacity-60 mt-1"
            style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
          >
            {guestInfo.email}
          </p>
          <p
            className="text-sm opacity-60 mt-1"
            style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
          >
            {guestInfo.phone}
          </p>
          {guestInfo.specialRequests && (
            <p
              className="text-sm opacity-50 mt-3 leading-6 italic"
              style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
            >
              &ldquo;{guestInfo.specialRequests}&rdquo;
            </p>
          )}
        </div>

        {/* Pricing */}
        <div className="p-6 space-y-3">
          <h3
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            Price Breakdown
          </h3>
          <div className="flex justify-between text-sm">
            <span className="opacity-60" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>
              ${room?.pricePerNight ?? 0} × {nights} nights
            </span>
            <span style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>${total}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="opacity-60" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>
              Taxes & fees (12%)
            </span>
            <span style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>${taxes}</span>
          </div>
          <div
            className="flex justify-between pt-4 border-t"
            style={{ borderColor: "rgba(255,255,255,0.12)" }}
          >
            <span
              className="text-base"
              style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 500 }}
            >
              Total
            </span>
            <span
              className="text-2xl font-light"
              style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)" }}
            >
              ${grandTotal}
            </span>
          </div>
        </div>
      </div>

      {/* Confirmation note */}
      <div
        className="flex gap-3 px-4 py-4 border-l-2"
        style={{ borderColor: "var(--gold)", background: "rgba(201,168,76,0.06)" }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--gold)" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <p
          className="text-sm opacity-60 leading-6"
          style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
        >
          A confirmation email will be sent to <strong className="opacity-90">{guestInfo.email}</strong> after you confirm your reservation. Payment is collected at check-in.
        </p>
      </div>
    </div>
  );
}
