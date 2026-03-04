import Image from "next/image";

interface LocationProps {
  reservationUrl: string;
}

export default function Location({ reservationUrl }: LocationProps) {
  return (
    <section id="location" className="relative py-32 px-6 lg:px-12 overflow-hidden">
      {/* Background */}
      <Image
        src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1920&q=80"
        alt="Hotel location aerial view"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Decorative border */}
      <div className="absolute inset-8 border border-white/10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-[var(--gold)]" />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            Location
          </span>
          <div className="w-12 h-px bg-[var(--gold)]" />
        </div>

        <h2
          className="text-5xl md:text-6xl font-light italic leading-tight mb-6"
          style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
        >
          Center of <span style={{ color: "var(--gold)" }}>History</span>
        </h2>

        <p
          className="text-base leading-8 opacity-75 mb-10"
          style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
        >
          Positioned at the crossroads of culture and history, Hotel 101 places you moments
          away from the city's most iconic landmarks. Experience the world from our doorstep.
        </p>

        {/* Location highlights */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {["City Center", "Cultural District", "Fine Dining", "Shopping"].map((loc) => (
            <div key={loc} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
              <span
                className="text-sm tracking-wide opacity-70"
                style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
              >
                {loc}
              </span>
            </div>
          ))}
        </div>

        <a
          href={reservationUrl}
          className="inline-block px-12 py-4 text-sm tracking-[0.25em] uppercase transition-all duration-300 hover:opacity-90"
          style={{
            background: "var(--gold)",
            color: "var(--dark)",
            fontFamily: "var(--font-raleway)",
          }}
        >
          Book Now
        </a>
      </div>
    </section>
  );
}
