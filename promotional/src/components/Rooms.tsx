"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

const roomImages = [
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
];

const roomSizes = ["35 m²", "35 m²", "28 m²", "55 m²"];

interface RoomsProps {
  reservationUrl: string;
}

export default function Rooms({ reservationUrl }: RoomsProps) {
  const { t } = useLanguage();

  return (
    <section id="rooms" className="py-28 px-6 lg:px-12" style={{ background: "var(--dark-mid)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px" style={{ background: "var(--gold)" }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
            {t.rooms.tag}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="text-5xl md:text-6xl font-light italic leading-tight" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
            {t.rooms.title}
          </h2>
          <a
            href={reservationUrl}
            className="self-start md:self-auto text-sm tracking-[0.2em] uppercase border-b pb-1 transition-colors duration-300"
            style={{ color: "var(--gold)", borderColor: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            {t.rooms.viewAll}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.rooms.items.map((room, index) => (
            <div
              key={room.name}
              className="group overflow-hidden border transition-all duration-500"
              style={{ borderColor: "var(--border-color)", background: "var(--dark)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(168,92,58,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={roomImages[index]}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute top-4 right-4 px-3 py-1 text-xs tracking-[0.2em] uppercase"
                  style={{ background: "var(--gold)", color: "#fff", fontFamily: "var(--font-raleway)" }}
                >
                  {roomSizes[index]}
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-light italic mb-3" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
                  {room.name}
                </h3>
                <p className="text-sm leading-7 mb-6 opacity-65" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
                  {room.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {room.features.map((f) => (
                    <span key={f} className="text-xs px-3 py-1 border tracking-wide" style={{ borderColor: "var(--border-color)", color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>
                      {f}
                    </span>
                  ))}
                </div>

                <a
                  href={reservationUrl}
                  className="inline-block px-8 py-3 text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90"
                  style={{ background: "var(--gold)", color: "#fff", fontFamily: "var(--font-raleway)" }}
                >
                  {t.rooms.bookRoom}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
