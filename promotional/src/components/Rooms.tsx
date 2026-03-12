"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { roomImages } from "@/data/rooms";

export default function Rooms() {
  const { t } = useLanguage();
  // Slice to only show the first 3 items
  const items = t.rooms.items.slice(0, 3);

  return (
    <section id="rooms" className="py-28 overflow-hidden" style={{ background: "var(--dark-mid)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px" style={{ background: "var(--gold)" }} />
          <span
            className="text-[0.92rem] tracking-[0.24em] uppercase"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)", fontWeight: 500 }}
          >
            {t.rooms.tag}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <Link
            href="/odalar"
            className="text-[3.55rem] md:text-[4.7rem] font-light italic leading-[0.92] tracking-[-0.04em] transition-opacity duration-300 hover:opacity-80"
            style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
          >
            {t.rooms.title}
          </Link>
          <Link
            href="/odalar"
            className="self-start md:self-auto text-sm tracking-[0.2em] uppercase border-b pb-1 transition-colors duration-300"
            style={{ color: "var(--gold)", borderColor: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            {t.rooms.viewAll}
          </Link>
        </div>

        {/* Responsive grid for 3 items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((room, index) => (
            <Link
              key={room.slug}
              href={`/odalar/${room.slug}`}
              className="group relative overflow-hidden rounded-[1.5rem] border transition-all duration-500 block aspect-[4/5] md:aspect-[3/4]"
              style={{ borderColor: "var(--border-color)", background: "var(--dark)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; }}
            >
              <Image
                src={roomImages[index]}
                alt={room.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 34%, rgba(0,0,0,0.12) 58%, rgba(0,0,0,0.04) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h3
                  className="text-[1.8rem] md:text-[2.2rem] font-light italic tracking-[-0.03em]"
                  style={{ color: "#fff", fontFamily: "var(--font-cormorant)" }}
                >
                  {room.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
