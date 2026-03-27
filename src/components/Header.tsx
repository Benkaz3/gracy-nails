"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes, FaPhone } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.webp"
              alt="Gracy Nails"
              width={120}
              height={70}
              className="h-12 md:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-text-dark hover:text-gold transition-colors text-sm tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="bg-gold hover:bg-gold-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all hover:shadow-md active:scale-[0.97]"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile: phone + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="tel:9023306261"
              className="flex items-center gap-1.5 text-gold font-semibold text-sm px-3 py-2 rounded-full border border-gold/30 hover:bg-gold/5 transition-colors"
              aria-label="Call 902-330-6261"
            >
              <FaPhone size={12} />
              <span>902-330-6261</span>
            </a>
            <button
              className="text-text-dark p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden bg-white border-t overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[28rem]" : "max-h-0 border-t-0"
        }`}
      >
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col px-4 py-4 gap-1"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-text-dark hover:text-gold transition-colors text-base tracking-wide uppercase py-3 px-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="bg-gold hover:bg-gold-dark text-white px-6 py-3.5 rounded-full text-base font-semibold tracking-wide transition-all text-center mt-3 hover:shadow-md active:scale-[0.97]"
            onClick={() => setMenuOpen(false)}
          >
            Book Your Appointment
          </Link>
        </nav>
      </div>
    </header>
  );
}
