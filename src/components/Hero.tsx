import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-dvh min-h-[600px] flex items-center justify-center"
    >
      <Image
        src="/images/gracy-outdoor.webp"
        alt="Gracy Nails & Beauty Salon storefront"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55" />
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <p className="text-gold-light text-sm sm:text-base tracking-[0.3em] uppercase mb-4 font-light">
          Charlottetown, PEI
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg leading-tight">
          Gracy Nails
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-normal mt-1 text-white/90">
            & Beauty Salon
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-10 font-light text-white/85 max-w-2xl mx-auto">
          Your relaxation destination in downtown Charlottetown
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/booking"
            className="bg-gold hover:bg-gold-dark text-white px-10 py-4 rounded-full text-lg font-semibold tracking-wide transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            Book Your Appointment
          </Link>
          <a
            href="tel:9023306261"
            className="border border-white/50 hover:bg-white/15 text-white px-10 py-4 rounded-full text-lg font-light tracking-wide transition-all"
          >
            Call 902-330-6261
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 animate-bounce-gentle hidden md:block">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 10l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
