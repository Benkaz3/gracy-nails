"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBookingBar() {
  const pathname = usePathname();

  if (pathname === "/booking") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-bottom">
      <div className="bg-white/95 border-t border-gray-100 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <Link
          href="/booking"
          className="block w-full bg-gold hover:bg-gold-dark text-white py-3.5 rounded-full text-center font-semibold tracking-wide transition-all text-base active:scale-[0.98] shadow-md"
        >
          Book Your Appointment
        </Link>
      </div>
    </div>
  );
}
