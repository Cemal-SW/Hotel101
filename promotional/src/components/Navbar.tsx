"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";

interface NavbarProps {
  reservationUrl: string;
}

export default function Navbar({ reservationUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.rooms, target: "rooms" },
    { label: t.nav.amenities, target: "amenities" },
    { label: t.nav.location, target: "location" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 1px 30px rgba(0,0,0,0.12)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start leading-tight">
          <span
            className="text-2xl font-bold tracking-widest uppercase"
            style={{
              color: "var(--gold)",
              fontFamily: "var(--font-cormorant)",
              textShadow: scrolled ? "none" : "0 1px 12px rgba(0,0,0,0.6)",
            }}
          >
            Saros
          </span>
          <span
            className="text-xs tracking-[0.35em] uppercase"
            style={{
              color: scrolled ? "var(--cream)" : "#F5EFE7",
              fontFamily: "var(--font-raleway)",
              textShadow: scrolled ? "none" : "0 1px 8px rgba(0,0,0,0.6)",
            }}
          >
            Vadi
          </span>
        </Link>

        {/* Desktop nav — frosted glass pill */}
        <div
          className="hidden md:flex items-center gap-1 px-5 py-2.5 rounded-full transition-all duration-500"
          style={{
            background: scrolled ? "transparent" : "rgba(255, 255, 255, 0.12)",
            backdropFilter: scrolled ? "none" : "blur(20px)",
            border: scrolled ? "none" : "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: scrolled ? "none" : "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              className="px-4 py-1.5 text-sm tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:bg-white/15"
              style={{
                color: scrolled ? "var(--cream)" : "#F5EFE7",
                fontFamily: "var(--font-raleway)",
              }}
            >
              {link.label}
            </button>
          ))}

          <div className="w-px h-4 mx-1" style={{ background: scrolled ? "var(--border-color)" : "rgba(255,255,255,0.25)" }} />

          <LanguageToggle isOverVideo={!scrolled} />
          <ThemeToggle />

          <a
            href={reservationUrl}
            className="ml-1 px-5 py-2 rounded-full text-sm tracking-[0.12em] uppercase font-medium transition-all duration-300 hover:opacity-90"
            style={{
              background: "var(--gold)",
              color: "#fff",
              fontFamily: "var(--font-raleway)",
              boxShadow: "0 2px 12px rgba(168,92,58,0.4)",
            }}
          >
            {t.nav.bookNow}
          </a>
        </div>

        {/* Mobile: toggles + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle isOverVideo={!scrolled} />
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              style={{ background: scrolled ? "var(--gold)" : "#F5EFE7" }}
            />
            <span
              className={`block w-6 h-px transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              style={{ background: scrolled ? "var(--gold)" : "#F5EFE7" }}
            />
            <span
              className={`block w-6 h-px transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              style={{ background: scrolled ? "var(--gold)" : "#F5EFE7" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-80 pb-6" : "max-h-0"}`}
        style={{
          background: "rgba(44, 33, 26, 0.9)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex flex-col items-center gap-6 pt-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => { scrollTo(link.target); setMenuOpen(false); }}
              className="text-sm tracking-[0.15em] uppercase"
              style={{ color: "#F5EFE7", fontFamily: "var(--font-raleway)" }}
            >
              {link.label}
            </button>
          ))}
          <a
            href={reservationUrl}
            className="px-8 py-3 rounded-full text-sm tracking-[0.15em] uppercase font-medium"
            style={{ background: "var(--gold)", color: "#fff", fontFamily: "var(--font-raleway)" }}
          >
            {t.nav.bookNow}
          </a>
        </div>
      </div>
    </header>
  );
}
