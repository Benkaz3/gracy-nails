import Link from "next/link";

export default function BookingBanner() {
  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      {/* Soft decorative circles */}
      <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-blue-light/15" />
      <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-gold-light/15" />

      <div className="max-w-3xl mx-auto px-4 text-center relative">
        <p className="text-gold text-sm tracking-[0.25em] uppercase mb-4 font-medium">
          Your time to relax
        </p>
        <p className="font-heading text-3xl md:text-4xl text-text-dark mb-3">
          Ready to treat yourself?
        </p>
        <p className="text-text-muted mb-10 text-lg">
          Book online or give us a call — walk-ins welcome when available
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
            className="border border-gold/40 hover:border-gold text-gold hover:text-gold-dark px-10 py-4 rounded-full text-lg font-light tracking-wide transition-all"
          >
            Call 902-330-6261
          </a>
        </div>
      </div>
    </section>
  );
}
