const amenities = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 21l-3-3m0 0-3 3m3-3v-6m-1.5-9.75H9.75a2.25 2.25 0 0 0-2.25 2.25v.75m7.5-3H14.25a2.25 2.25 0 0 0-2.25 2.25v.75m0 0h.008v.008H12v-.008Z" />
      </svg>
    ),
    title: "Gourmet Breakfast",
    description: "Curated breakfast and special treats served in our dining room or directly to your suite.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
      </svg>
    ),
    title: "High-Speed Wi-Fi",
    description: "Complimentary ultra-fast internet access throughout all areas of the hotel.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "VIP Transfer",
    description: "Comfortable and safe private transportation from the airport directly to our hotel.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: "Personal Concierge",
    description: "Dedicated personal assistant service to help plan and curate your entire stay.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    title: "Spa & Wellness",
    description: "Rejuvenate with our premium spa treatments, sauna, and wellness programs.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Multilingual Staff",
    description: "Our team speaks your language — available 24/7 to ensure a seamless experience.",
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="py-28 px-6 lg:px-12 bg-[var(--dark)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-[var(--gold)]" />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
          >
            Services
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2
            className="text-5xl md:text-6xl font-light italic leading-tight"
            style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
          >
            Special Tastes &amp;{" "}
            <br />
            <span style={{ color: "var(--gold)" }}>Personal Concierge</span>
          </h2>
        </div>

        {/* Amenities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {amenities.map((item) => (
            <div
              key={item.title}
              className="group p-10 transition-colors duration-500 hover:bg-[var(--dark-mid)]"
              style={{ background: "var(--dark)" }}
            >
              <div
                className="mb-6 transition-colors duration-300 group-hover:text-[var(--gold-light)]"
                style={{ color: "var(--gold)" }}
              >
                {item.icon}
              </div>
              <h3
                className="text-xl font-light mb-4"
                style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-7 opacity-60"
                style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
