import Image from "next/image";

export interface Room {
  id: string;
  name: string;
  size: string;
  pricePerNight: number;
  description: string;
  image: string;
  features: string[];
  capacity: number;
  roomCount: number;
  bedConfiguration: string;
  basePricePerNight: number;
  adultSupplementPerNight: number;
  childSupplementPerNight: number;
  extraAdults: number;
  extraChildren: number;
  recommendationTag?: string;
}

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  onSelect: (roomId: string) => void;
  nights: number;
  perNightLabel: string;
  nightsTotalLabel: string;
  capacityLabel: string;
  bedConfigurationLabel: string;
  roomCountLabel: string;
  adultSupplementLabel: string;
  childSupplementLabel: string;
}

export default function RoomCard({
  room,
  isSelected,
  onSelect,
  nights,
  perNightLabel,
  nightsTotalLabel,
  capacityLabel,
  bedConfigurationLabel,
  roomCountLabel,
  adultSupplementLabel,
  childSupplementLabel,
}: RoomCardProps) {
  return (
    <div
      onClick={() => onSelect(room.id)}
      className="group cursor-pointer overflow-hidden rounded-[2rem] border transition-all duration-400"
      style={{
        borderColor: isSelected ? "var(--gold)" : "var(--border-color)",
        background: isSelected ? "var(--gold-tint)" : "var(--dark-mid)",
      }}
    >
      <div className="relative h-52 overflow-hidden rounded-[1.55rem]">
        <Image src={room.image} alt={room.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute top-3 left-3 px-4 py-2 text-[1.05rem] tracking-[0.1em] uppercase" style={{ background: "var(--gold)", color: "#fff", fontFamily: "var(--font-raleway)", fontVariantNumeric: "lining-nums tabular-nums" }}>
          {room.roomCount} {roomCountLabel}
        </div>
        {room.recommendationTag ? (
          <div
            className="absolute bottom-3 left-3 rounded-full px-4 py-2 text-[0.78rem] uppercase tracking-[0.16em]"
            style={{
              background: "rgba(20, 16, 12, 0.58)",
              border: "1px solid rgba(255,255,255,0.16)",
              color: "#fff",
              fontFamily: "var(--font-raleway)",
              backdropFilter: "blur(12px)",
            }}
          >
            {room.recommendationTag}
          </div>
        ) : null}
        {isSelected && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--gold)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4" style={{ color: "#fff" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-[1.7rem] font-light italic tracking-[-0.03em]" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
            {room.name}
          </h3>
          <div className="text-right">
            <div className="text-[2.8rem] font-light" style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)", fontVariantNumeric: "lining-nums tabular-nums" }}>${room.pricePerNight}</div>
            <div className="text-[0.88rem] opacity-50" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>{perNightLabel}</div>
          </div>
        </div>

        <p className="mb-4 text-[1.05rem] opacity-60" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
          {room.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          <span
            className="rounded-full text-[0.86rem] px-3 py-1.5 border"
            style={{ borderColor: "rgba(200, 126, 66, 0.28)", color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            {capacityLabel}: {room.capacity}
          </span>
          <span
            className="rounded-full text-[0.86rem] px-3 py-1.5 border"
            style={{ borderColor: "rgba(200, 126, 66, 0.18)", color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
          >
            {bedConfigurationLabel}: {room.bedConfiguration}
          </span>
          <span
            className="rounded-full text-[0.86rem] px-3 py-1.5 border"
            style={{ borderColor: "rgba(200, 126, 66, 0.18)", color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
          >
            {room.roomCount} {roomCountLabel}
          </span>
          {room.features.map((f) => (
            <span key={f} className="rounded-full text-[0.86rem] px-3 py-1.5 border" style={{ borderColor: "var(--border-color)", color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>
              {f}
            </span>
          ))}
        </div>

        {(room.adultSupplementPerNight > 0 || room.childSupplementPerNight > 0) && (
          <div
            className="mb-5 rounded-[1.4rem] border px-4 py-3"
            style={{ borderColor: "rgba(200, 126, 66, 0.2)", background: "rgba(200, 126, 66, 0.06)" }}
          >
            {room.adultSupplementPerNight > 0 ? (
              <p className="text-[0.92rem] opacity-70" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontVariantNumeric: "lining-nums tabular-nums" }}>
                {adultSupplementLabel}: ${room.adultSupplementPerNight}
              </p>
            ) : null}
            {room.childSupplementPerNight > 0 ? (
              <p className="text-[0.92rem] opacity-70 mt-1" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontVariantNumeric: "lining-nums tabular-nums" }}>
                {childSupplementLabel}: ${room.childSupplementPerNight}
              </p>
            ) : null}
          </div>
        )}

        {nights > 0 && (
          <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
            <span className="text-[1.08rem] opacity-50 tracking-wide" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontVariantNumeric: "lining-nums tabular-nums" }}>
              {nights} {nightsTotalLabel}
            </span>
            <span className="text-[2rem] font-light" style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)", fontVariantNumeric: "lining-nums tabular-nums" }}>
              ${room.pricePerNight * nights}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
