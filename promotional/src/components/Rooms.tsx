import Image from "next/image";

interface RoomsProps {
  reservationUrl: string;
}

const rooms = [
  {
    name: "Junior Suite King",
    size: "35 m²",
    description: "Elegant king room with panoramic city views and premium amenities.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    features: ["King Bed", "City View", "Mini Bar", "Rainfall Shower"],
  },
  {
    name: "Junior Suite Twin",
    size: "35 m²",
    description: "Spacious twin room ideal for friends or colleagues traveling together.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    features: ["Twin Beds", "Garden View", "Work Desk", "Soaking Tub"],
  },
  {
    name: "Superior King",
    size: "28 m²",
    description: "Refined comfort with a king bed and curated interior design details.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    features: ["King Bed", "Marble Bath", "Smart TV", "Espresso Machine"],
  },
  {
    name: "Deluxe Suite",
    size: "55 m²",
    description: "Our most spacious suite with a separate living area and private terrace.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    features: ["King Bed", "Private Terrace", "Living Room", "Butler Service"],
  },
];

export default function Rooms({ reservationUrl }: RoomsProps) {
  return (
    <section id="rooms" className="py-28 px-6 lg:px-12" style={{ background: "var(--dark-mid)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-[var(--gold)]" />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            Accommodation
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2
            className="text-5xl md:text-6xl font-light italic leading-tight"
            style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
          >
            Rooms &amp; Suites
          </h2>
          <a
            href={reservationUrl}
            className="self-start md:self-auto text-sm tracking-[0.2em] uppercase border-b pb-1 transition-colors duration-300 hover:border-[var(--gold)]"
            style={{
              color: "var(--gold)",
              borderColor: "var(--gold)/40",
              fontFamily: "var(--font-raleway)",
            }}
          >
            View All Rooms →
          </a>
        </div>

        {/* Room grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <div
              key={room.name}
              className="group overflow-hidden border border-white/10 hover:border-[var(--gold)]/40 transition-all duration-500"
              style={{ background: "var(--dark)" }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Size badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1 text-xs tracking-[0.2em] uppercase"
                  style={{
                    background: "var(--gold)",
                    color: "var(--dark)",
                    fontFamily: "var(--font-raleway)",
                  }}
                >
                  {room.size}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3
                  className="text-2xl font-light italic mb-3"
                  style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
                >
                  {room.name}
                </h3>
                <p
                  className="text-sm leading-7 mb-6 opacity-65"
                  style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
                >
                  {room.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {room.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-3 py-1 border border-white/15 tracking-wide"
                      style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <a
                  href={reservationUrl}
                  className="inline-block px-8 py-3 text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90"
                  style={{
                    background: "var(--gold)",
                    color: "var(--dark)",
                    fontFamily: "var(--font-raleway)",
                  }}
                >
                  Book This Room
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
