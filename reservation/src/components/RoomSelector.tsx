import RoomCard, { Room } from "./RoomCard";

export const ROOMS: Room[] = [
  {
    id: "junior-suite-king",
    name: "Junior Suite King",
    size: "35 m²",
    pricePerNight: 280,
    description: "Elegant king room with panoramic city views and premium amenities.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    features: ["King Bed", "City View", "Mini Bar", "Rainfall Shower"],
    maxGuests: 2,
  },
  {
    id: "junior-suite-twin",
    name: "Junior Suite Twin",
    size: "35 m²",
    pricePerNight: 260,
    description: "Spacious twin room ideal for friends or colleagues traveling together.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    features: ["Twin Beds", "Garden View", "Work Desk", "Soaking Tub"],
    maxGuests: 2,
  },
  {
    id: "superior-king",
    name: "Superior King",
    size: "28 m²",
    pricePerNight: 210,
    description: "Refined comfort with a king bed and curated interior design details.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    features: ["King Bed", "Marble Bath", "Smart TV", "Espresso Machine"],
    maxGuests: 2,
  },
  {
    id: "deluxe-suite",
    name: "Deluxe Suite",
    size: "55 m²",
    pricePerNight: 480,
    description: "Our most spacious suite with a separate living area and private terrace.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    features: ["King Bed", "Private Terrace", "Living Room", "Butler Service"],
    maxGuests: 4,
  },
];

interface RoomSelectorProps {
  selectedRoomId: string;
  onSelect: (roomId: string) => void;
  nights: number;
}

export default function RoomSelector({ selectedRoomId, onSelect, nights }: RoomSelectorProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2
          className="text-4xl font-light italic mb-2"
          style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
        >
          Choose Your Room
        </h2>
        <p
          className="text-sm opacity-60"
          style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
        >
          Select the room type that best suits your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ROOMS.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            isSelected={selectedRoomId === room.id}
            onSelect={onSelect}
            nights={nights}
          />
        ))}
      </div>
    </div>
  );
}
