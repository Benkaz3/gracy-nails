import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-text-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/">
              <Image
                src="/images/logo.webp"
                alt="Gracy Nails"
                width={120}
                height={70}
                className="h-11 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Nail art & beauty salon in downtown Charlottetown, PEI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2.5">
              <Link
                href="/services"
                className="text-gray-300 hover:text-gold transition-colors text-sm"
              >
                Services & Prices
              </Link>
              <Link
                href="/booking"
                className="text-gray-300 hover:text-gold transition-colors text-sm"
              >
                Book Online
              </Link>
              <Link
                href="/#about"
                className="text-gray-300 hover:text-gold transition-colors text-sm"
              >
                About Us
              </Link>
              <Link
                href="/#gallery"
                className="text-gray-300 hover:text-gold transition-colors text-sm"
              >
                Gallery
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-gray-300">
              <p>146 Prince Street</p>
              <p>Charlottetown, PEI, C1A4R6</p>
              <a
                href="tel:9023306261"
                className="hover:text-gold transition-colors"
              >
                902-330-6261
              </a>
              <a
                href="mailto:gracynailsbeauty@gmail.com"
                className="hover:text-gold transition-colors"
              >
                gracynailsbeauty@gmail.com
              </a>
            </div>
          </div>

          {/* Hours + Social */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4">
              Hours
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Mon – Sat: 9 AM – 7 PM
              <br />
              Sunday: Closed
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.facebook.com/gracynailsbeauty/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold transition-colors p-2 -m-2"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://www.instagram.com/gracynailsbeauty/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold transition-colors p-2 -m-2"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
            </div>
            <p className="text-gray-500 text-xs mt-5">
              Group bookings available for parties & events.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Gracy Nails & Beauty Salon. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
