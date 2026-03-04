"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
  reservationUrl: string;
}

export default function Navbar({ reservationUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Rooms", href: "#rooms" },
    { label: "Amenities", href: "#amenities" },
    { label: "Location", href: "#location" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0e0d0b]/95 backdrop-blur-md shadow-lg shadow-black/30" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start leading-tight group">
          <span
            className="text-2xl font-bold tracking-widest uppercase"
            style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)" }}
          >
            Hotel
          </span>
          <span
            className="text-sm tracking-[0.3em] uppercase"
            style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
          >
            101
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[var(--gold)]"
              style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={reservationUrl}
            className="px-6 py-2.5 border text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[var(--gold)] hover:border-[var(--gold)] hover:text-[var(--dark)]"
            style={{
              borderColor: "var(--gold)",
              color: "var(--gold)",
              fontFamily: "var(--font-raleway)",
            }}
          >
            Book Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            style={{ background: "var(--gold)" }}
          />
          <span
            className={`block w-6 h-px transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            style={{ background: "var(--gold)" }}
          />
          <span
            className={`block w-6 h-px transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            style={{ background: "var(--gold)" }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden bg-[#0e0d0b]/98 ${
          menuOpen ? "max-h-80 pb-6" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 pt-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-[0.15em] uppercase"
              style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={reservationUrl}
            className="px-8 py-3 border text-sm tracking-[0.15em] uppercase"
            style={{
              borderColor: "var(--gold)",
              color: "var(--gold)",
              fontFamily: "var(--font-raleway)",
            }}
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}
