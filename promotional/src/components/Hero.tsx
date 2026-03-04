import Image from "next/image";

interface HeroProps {
  reservationUrl: string;
}

export default function Hero({ reservationUrl }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
        alt="Hotel 101 luxury entrance"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Decorative top line */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-[var(--gold)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        <p
          className="text-sm tracking-[0.4em] uppercase mb-6 opacity-80"
          style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
        >
          Heart of the City
        </p>

        <h1
          className="text-7xl sm:text-8xl md:text-9xl font-light italic leading-none mb-2"
          style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
        >
          Hotel
        </h1>
        <h2
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-widest uppercase leading-none mb-8"
          style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)" }}
        >
          101
        </h2>

        <p
          className="max-w-md text-base font-light leading-relaxed mb-12 opacity-80"
          style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
        >
          Where timeless elegance meets modern comfort. An unforgettable stay awaits you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#rooms"
            className="px-10 py-4 text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90"
            style={{
              background: "var(--gold)",
              color: "var(--dark)",
              fontFamily: "var(--font-raleway)",
            }}
          >
            Explore Rooms
          </a>
          <a
            href={reservationUrl}
            className="px-10 py-4 border text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/10"
            style={{
              borderColor: "var(--cream)",
              color: "var(--cream)",
              fontFamily: "var(--font-raleway)",
            }}
          >
            Book Now
          </a>
        </div>
      </div>

      {/* Bottom decorative line + scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <p
          className="text-xs tracking-[0.3em] uppercase opacity-50"
          style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
        >
          Scroll
        </p>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--gold)] to-transparent opacity-60" />
      </div>
    </section>
  );
}
