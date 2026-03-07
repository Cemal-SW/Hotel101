"use client";

import { useLanguage } from "./LanguageProvider";
import RoomCard, { Room } from "./RoomCard";

const BASE_ROOMS: Omit<Room, "name" | "description" | "features">[] = [
  { id: "junior-suite-king", size: "35 m²", pricePerNight: 280, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", maxGuests: 2 },
  { id: "junior-suite-twin", size: "35 m²", pricePerNight: 260, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80", maxGuests: 2 },
  { id: "superior-king",     size: "28 m²", pricePerNight: 210, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80", maxGuests: 2 },
  { id: "deluxe-suite",      size: "55 m²", pricePerNight: 480, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80", maxGuests: 4 },
];

interface RoomSelectorProps {
  selectedRoomId: string;
  onSelect: (roomId: string) => void;
  nights: number;
}

export default function RoomSelector({ selectedRoomId, onSelect, nights }: RoomSelectorProps) {
  const { t } = useLanguage();

  const rooms: Room[] = BASE_ROOMS.map((base, i) => ({
    ...base,
    name: t.roomSelector.items[i].name,
    description: t.roomSelector.items[i].description,
    features: [...t.roomSelector.items[i].features],
  }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-light italic mb-2" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
          {t.roomSelector.title}
        </h2>
        <p className="text-sm opacity-60" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
          {t.roomSelector.subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            isSelected={selectedRoomId === room.id}
            onSelect={onSelect}
            nights={nights}
            perNightLabel={t.roomSelector.perNight}
            nightsTotalLabel={t.roomSelector.nightsTotal}
          />
        ))}
      </div>
    </div>
  );
}
