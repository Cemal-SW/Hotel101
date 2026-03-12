"use client";

import { useLanguage } from "./LanguageProvider";
import RoomCard, { Room } from "./RoomCard";

interface RoomSelectorProps {
  selectedRoomId: string;
  onSelect: (roomId: string) => void;
  nights: number;
  rooms: Room[];
  totalGuests: number;
}

export default function RoomSelector({ selectedRoomId, onSelect, nights, rooms, totalGuests }: RoomSelectorProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[3rem] md:text-[3.6rem] font-light italic mb-2 tracking-[-0.04em]" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
          {t.roomSelector.title}
        </h2>
        <p className="opacity-60" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
          {t.roomSelector.subtitle}
        </p>
      </div>
      {rooms.length ? (
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
              capacityLabel={t.roomSelector.capacityLabel}
              bedConfigurationLabel={t.roomSelector.bedConfigurationLabel}
              roomCountLabel={t.roomSelector.roomCountLabel}
              adultSupplementLabel={t.roomSelector.adultSupplementLabel}
              childSupplementLabel={t.roomSelector.childSupplementLabel}
            />
          ))}
        </div>
      ) : (
        <div
          className="rounded-[2rem] border px-6 py-8"
          style={{ borderColor: "var(--border-color)", background: "var(--dark-mid)" }}
        >
          <p
            className="mb-2 text-[1.8rem] font-light italic tracking-[-0.03em]"
            style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
          >
            {t.roomSelector.noRoomsTitle}
          </p>
          <p
            className="opacity-60"
            style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
          >
            {t.roomSelector.noRoomsSubtitle.replace("{count}", String(totalGuests))}
          </p>
        </div>
      )}
    </div>
  );
}
