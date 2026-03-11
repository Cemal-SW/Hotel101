"use client";

import { useLanguage } from "./LanguageProvider";

interface FooterProps {
  reservationUrl: string;
}

export default function Footer({ reservationUrl }: FooterProps) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: t.nav.rooms, href: "#rooms" },
    { label: t.nav.amenities, href: "#amenities" },
    { label: t.nav.location, href: "#location" },
    { label: t.nav.bookNow, href: reservationUrl },
  ];

  const socialLinks = [
    {
      label: "Instagram",
      href: "#",
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" /></svg>,
    },
    {
      label: "Facebook",
      href: "#",
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" /></svg>,
    },
  ];

  return (
    <footer className="py-16 px-6 lg:px-12 border-t" style={{ background: "var(--dark)", borderColor: "var(--border-color)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-4">
              <span className="block text-3xl font-bold tracking-widest uppercase" style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)" }}>
                Saros
              </span>
              <span className="block text-[1.02rem] tracking-[0.22em] uppercase" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 500 }}>
                Vadi
              </span>
            </div>
            <p className="text-[1.04rem] leading-[1.85] opacity-60 max-w-sm" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-[0.92rem] tracking-[0.24em] uppercase mb-6" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)", fontWeight: 500 }}>
              {t.footer.nav}
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[1.04rem] opacity-70 hover:opacity-100 transition-opacity duration-300" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.92rem] tracking-[0.24em] uppercase mb-6" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)", fontWeight: 500 }}>
              {t.footer.contact}
            </h4>
            <ul className="flex flex-col gap-3 text-[1.04rem] opacity-70 leading-[1.8]">
              {["info@sarosvadi.com", "+90 (555) 101-0000", "Saros Bay, Çanakkale, Türkiye"].map((item) => (
                <li key={item} style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)", fontWeight: 300 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--border-color)" }}>
          <p className="text-xs opacity-40 tracking-wide" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>
            © {currentYear} Saros Vadi. {t.footer.copyright}
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label} className="opacity-40 hover:opacity-100 transition-opacity duration-300" style={{ color: "var(--cream)" }}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
