export default function Welcome() {
  const stats = [
    { value: "24", label: "Luxury Rooms" },
    { value: "15+", label: "Years of Excellence" },
    { value: "∞", label: "Experience" },
  ];

  return (
    <section id="welcome" className="py-28 px-6 lg:px-12 bg-[var(--dark)]">
      <div className="max-w-7xl mx-auto">
        {/* Section tag */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-px bg-[var(--gold)]" />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            Our Story
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text column */}
          <div>
            <h2
              className="text-5xl md:text-6xl font-light italic leading-tight mb-8"
              style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
            >
              Welcome to{" "}
              <span style={{ color: "var(--gold)" }}>An Extraordinary Tale</span>
            </h2>
            <p
              className="text-base leading-8 mb-6 opacity-75"
              style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
            >
              Discover the perfect harmony of history and luxury at Hotel 101. Nestled in the heart
              of the city, we are not just a hotel — we are a modern interpretation of a
              century-old legacy of hospitality.
            </p>
            <p
              className="text-base leading-8 opacity-75"
              style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
            >
              Carefully designed in every detail, our rooms envelop you in timeless elegance while
              offering all the comforts of today. Every stay is crafted to become a cherished
              memory.
            </p>
          </div>

          {/* Stats column */}
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center py-10 px-4 border border-white/10 hover:border-[var(--gold)]/40 transition-colors duration-500"
                style={{ background: "var(--dark-mid)" }}
              >
                <span
                  className="text-5xl font-light mb-3"
                  style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs tracking-[0.2em] uppercase opacity-70"
                  style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
