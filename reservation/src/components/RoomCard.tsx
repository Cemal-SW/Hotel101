import Image from "next/image";

export interface Room {
  id: string;
  name: string;
  size: string;
  pricePerNight: number;
  description: string;
  image: string;
  features: string[];
  maxGuests: number;
}

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  onSelect: (roomId: string) => void;
  nights: number;
  perNightLabel: string;
  nightsTotalLabel: string;
}

export default function RoomCard({ room, isSelected, onSelect, nights, perNightLabel, nightsTotalLabel }: RoomCardProps) {
  return (
    <div
      onClick={() => onSelect(room.id)}
      className="group cursor-pointer border transition-all duration-400 overflow-hidden"
      style={{
        borderColor: isSelected ? "var(--gold)" : "var(--border-color)",
        background: isSelected ? "var(--gold-tint)" : "var(--dark-mid)",
      }}
    >
      <div className="relative h-52 overflow-hidden">
        <Image src={room.image} alt={room.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute top-3 left-3 px-2.5 py-1 text-xs tracking-wider uppercase" style={{ background: "var(--gold)", color: "#fff", fontFamily: "var(--font-raleway)" }}>
          {room.size}
        </div>
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
          <h3 className="text-xl font-light italic" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
            {room.name}
          </h3>
          <div className="text-right">
            <div className="text-2xl font-light" style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)" }}>${room.pricePerNight}</div>
            <div className="text-xs opacity-50" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>{perNightLabel}</div>
          </div>
        </div>

        <p className="text-sm leading-6 mb-4 opacity-60" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
          {room.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {room.features.map((f) => (
            <span key={f} className="text-xs px-2.5 py-1 border" style={{ borderColor: "var(--border-color)", color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>
              {f}
            </span>
          ))}
        </div>

        {nights > 0 && (
          <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
            <span className="text-xs opacity-50 tracking-wide" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>
              {nights} {nightsTotalLabel}
            </span>
            <span className="text-lg font-light" style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)" }}>
              ${room.pricePerNight * nights}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
