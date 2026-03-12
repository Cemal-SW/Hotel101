"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";

interface NavbarProps {
  reservationUrl: string;
}

export default function Navbar({ reservationUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [roomsMenuOpen, setRoomsMenuOpen] = useState(false);
  const [mobileRoomsOpen, setMobileRoomsOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isRoomDetailPage = pathname.startsWith("/odalar/") && pathname !== "/odalar";
  const usesHeroStyleAtTop = pathname === "/" || isRoomDetailPage;
  const isElevated = scrolled || !usesHeroStyleAtTop;
  const roomsMenuRef = useRef<HTMLDivElement | null>(null);
  const closeRoomsMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        roomsMenuRef.current &&
        !roomsMenuRef.current.contains(event.target as Node)
      ) {
        setRoomsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    return () => {
      if (closeRoomsMenuTimeoutRef.current) {
        clearTimeout(closeRoomsMenuTimeoutRef.current);
      }
    };
  }, []);

  const roomLinks = t.rooms.items.map((room) => ({
    label: room.name,
    href: `/odalar/${room.slug}`,
  }));

  const navLinks = [
    { label: t.nav.gallery, href: "/galeri" },
    { label: t.nav.amenities, href: isHomePage ? "#amenities" : "/#amenities", target: "amenities" },
    { label: t.nav.location, href: isHomePage ? "#location" : "/#location", target: "location" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  const openRoomsMenu = () => {
    if (closeRoomsMenuTimeoutRef.current) {
      clearTimeout(closeRoomsMenuTimeoutRef.current);
    }
    setRoomsMenuOpen(true);
  };

  const scheduleRoomsMenuClose = () => {
    if (closeRoomsMenuTimeoutRef.current) {
      clearTimeout(closeRoomsMenuTimeoutRef.current);
    }
    closeRoomsMenuTimeoutRef.current = setTimeout(() => {
      setRoomsMenuOpen(false);
    }, 180);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isElevated ? "var(--nav-bg)" : "transparent",
        backdropFilter: isElevated ? "blur(16px)" : "none",
        boxShadow: isElevated ? "0 1px 30px rgba(0,0,0,0.12)" : "none",
      }}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          onClick={(event) => {
            if (isHomePage) {
              event.preventDefault();
              scrollToTop();
            }
          }}
          className="flex flex-col items-start leading-tight"
        >
          <span
            className="text-2xl font-bold tracking-widest uppercase"
            style={{
              color: "var(--gold)",
              fontFamily: "var(--font-cormorant)",
              textShadow: isElevated ? "none" : "0 1px 12px rgba(0,0,0,0.6)",
            }}
          >
            Saros
          </span>
          <span
            className="text-xs tracking-[0.35em] uppercase"
            style={{
              color: isElevated ? "var(--cream)" : "#F5EFE7",
              fontFamily: "var(--font-raleway)",
              textShadow: isElevated ? "none" : "0 1px 8px rgba(0,0,0,0.6)",
            }}
          >
            Vadi
          </span>
        </Link>

        {/* Desktop nav — frosted glass pill */}
        <div
          className="hidden md:flex items-center gap-1.5 rounded-full px-5 py-2.5 lg:px-6 lg:py-3 transition-all duration-500"
          style={{
            background: isElevated ? "transparent" : "rgba(255, 255, 255, 0.12)",
            backdropFilter: isElevated ? "none" : "blur(20px)",
            border: isElevated ? "none" : "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: isElevated
              ? "none"
              : "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          <div
            ref={roomsMenuRef}
            className="relative pb-3 -mb-3"
            onMouseEnter={openRoomsMenu}
            onMouseLeave={scheduleRoomsMenuClose}
          >
            <div className="inline-flex items-center rounded-full transition-all duration-300 hover:bg-white/15">
              <Link
                href="/odalar"
                className="rounded-full pl-3.5 pr-2 py-2 text-[0.82rem] tracking-[0.12em] uppercase lg:pl-4.5 lg:text-[0.92rem]"
                style={{
                  color: isElevated ? "var(--cream)" : "#F5EFE7",
                  fontFamily: "var(--font-raleway)",
                }}
              >
                {t.nav.rooms}
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (roomsMenuOpen) {
                    setRoomsMenuOpen(false);
                    return;
                  }
                  openRoomsMenu();
                }}
                className="rounded-full pl-1 pr-3.5 py-2 lg:pr-4.5"
                aria-label="Odalar menusu"
                style={{
                  color: isElevated ? "var(--cream)" : "#F5EFE7",
                  fontFamily: "var(--font-raleway)",
                }}
              >
                <span
                  className={`block transition-transform duration-300 ${roomsMenuOpen ? "rotate-180" : ""}`}
                >
                  ▾
                </span>
              </button>
            </div>

            {roomsMenuOpen ? (
              <div
                className="absolute left-0 top-full min-w-[16rem] pt-3"
                onMouseEnter={openRoomsMenu}
                onMouseLeave={scheduleRoomsMenuClose}
              >
                <div
                  className="overflow-hidden rounded-[1.75rem] border py-2"
                  style={{
                    background: "var(--nav-bg)",
                    borderColor: "var(--border-color)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.16)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <Link
                    href="/odalar"
                    onClick={() => setRoomsMenuOpen(false)}
                    className="block px-5 py-3 text-[0.82rem] uppercase tracking-[0.12em] transition-colors duration-300 hover:bg-white/10"
                    style={{
                      color: "var(--gold)",
                      fontFamily: "var(--font-raleway)",
                    }}
                  >
                    {t.rooms.viewAll}
                  </Link>
                  {roomLinks.map((room) => (
                    <Link
                      key={room.href}
                      href={room.href}
                      onClick={() => setRoomsMenuOpen(false)}
                      className="block px-5 py-3 transition-colors duration-300 hover:bg-white/10"
                      style={{
                        color: "var(--cream)",
                        fontFamily: "var(--font-raleway)",
                      }}
                    >
                      {room.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(event) => {
                if (isHomePage && link.target) {
                  event.preventDefault();
                  scrollTo(link.target);
                }
              }}
              className="rounded-full px-3.5 py-2 text-[0.82rem] tracking-[0.12em] uppercase transition-all duration-300 hover:bg-white/15 lg:px-4.5 lg:text-[0.92rem]"
              style={{
                color: isElevated ? "var(--cream)" : "#F5EFE7",
                fontFamily: "var(--font-raleway)",
              }}
            >
              {link.label}
            </Link>
          ))}

          <div
            className="w-px h-4 mx-1"
            style={{
              background: isElevated
                ? "var(--border-color)"
                : "rgba(255,255,255,0.25)",
            }}
          />

          <LanguageToggle isOverVideo={!isElevated} />
          <ThemeToggle />

          <a
            href={reservationUrl}
            className="ml-1 rounded-full px-5 py-2 text-[0.82rem] tracking-[0.12em] uppercase font-medium transition-all duration-300 hover:opacity-90 lg:px-6 lg:py-2.5 lg:text-[0.92rem]"
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
          <LanguageToggle isOverVideo={!isElevated} />
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
              style={{ background: isElevated ? "var(--gold)" : "#F5EFE7" }}
            />
            <span
              className={`block w-6 h-px transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
              style={{ background: isElevated ? "var(--gold)" : "#F5EFE7" }}
            />
            <span
              className={`block w-6 h-px transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
              style={{ background: isElevated ? "var(--gold)" : "#F5EFE7" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-80 pb-6" : "max-h-0"
        }`}
        style={{
          background: "rgba(44, 33, 26, 0.9)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex flex-col items-center gap-6 pt-6">
          <div className="flex w-full max-w-xs flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2">
              <Link
                href="/odalar"
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.15em] uppercase"
                style={{ color: "#F5EFE7", fontFamily: "var(--font-raleway)" }}
              >
                {t.nav.rooms}
              </Link>
              <button
                type="button"
                onClick={() => setMobileRoomsOpen((prev) => !prev)}
                className="text-sm"
                aria-label="Odalar menusu"
                style={{ color: "#F5EFE7", fontFamily: "var(--font-raleway)" }}
              >
                <span className={`block transition-transform duration-300 ${mobileRoomsOpen ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>
            </div>

            {mobileRoomsOpen ? (
              <div
                className="flex w-full flex-col overflow-hidden rounded-[1.5rem] border"
                style={{ borderColor: "rgba(255,255,255,0.12)" }}
              >
                <Link
                  href="/odalar"
                  onClick={() => {
                    setMobileRoomsOpen(false);
                    setMenuOpen(false);
                  }}
                  className="px-5 py-3 text-center text-sm uppercase tracking-[0.12em]"
                  style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}
                >
                  {t.rooms.viewAll}
                </Link>
                {roomLinks.map((room) => (
                  <Link
                    key={room.href}
                    href={room.href}
                    onClick={() => {
                      setMobileRoomsOpen(false);
                      setMenuOpen(false);
                    }}
                    className="border-t px-5 py-3 text-center"
                    style={{
                      color: "#F5EFE7",
                      borderColor: "rgba(255,255,255,0.08)",
                      fontFamily: "var(--font-raleway)",
                    }}
                  >
                    {room.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(event) => {
                if (isHomePage && link.target) {
                  event.preventDefault();
                  scrollTo(link.target);
                }
                setMenuOpen(false);
              }}
              className="text-sm tracking-[0.15em] uppercase"
              style={{ color: "#F5EFE7", fontFamily: "var(--font-raleway)" }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={reservationUrl}
            className="px-8 py-3 rounded-full text-sm tracking-[0.15em] uppercase font-medium"
            style={{
              background: "var(--gold)",
              color: "#fff",
              fontFamily: "var(--font-raleway)",
            }}
          >
            {t.nav.bookNow}
          </a>
        </div>
      </div>
    </header>
  );
}
