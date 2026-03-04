interface FooterProps {
  reservationUrl: string;
}

export default function Footer({ reservationUrl }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Rooms", href: "#rooms" },
    { label: "Amenities", href: "#amenities" },
    { label: "Location", href: "#location" },
    { label: "Book Now", href: reservationUrl },
  ];

  const socialLinks = [
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
        </svg>
      ),
    },
    {
      label: "Twitter",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="py-16 px-6 lg:px-12 border-t border-white/10" style={{ background: "var(--dark)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & tagline */}
          <div>
            <div className="mb-4">
              <span
                className="block text-3xl font-bold tracking-widest uppercase"
                style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)" }}
              >
                Hotel
              </span>
              <span
                className="block text-sm tracking-[0.3em] uppercase"
                style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
              >
                101
              </span>
            </div>
            <p
              className="text-sm leading-7 opacity-50 max-w-xs"
              style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
            >
              Where timeless elegance meets modern comfort. An unforgettable stay awaits.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs tracking-[0.3em] uppercase mb-6"
              style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
            >
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm opacity-60 hover:opacity-100 transition-opacity duration-300"
                    style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs tracking-[0.3em] uppercase mb-6"
              style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
            >
              Contact
            </h4>
            <ul className="flex flex-col gap-3 text-sm opacity-60">
              {["info@hotel101.com", "+1 (555) 101-0000", "123 Luxury Avenue, City"].map((item) => (
                <li
                  key={item}
                  style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs opacity-40 tracking-wide"
            style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
          >
            © {currentYear} Hotel 101. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="opacity-40 hover:opacity-100 transition-opacity duration-300"
                style={{ color: "var(--cream)" }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
