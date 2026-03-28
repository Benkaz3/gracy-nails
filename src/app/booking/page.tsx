import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment | Gracy Nails & Beauty Salon",
  description:
    "Book your appointment online at Gracy Nails & Beauty Salon in Charlottetown, PEI. Manicures, pedicures, biogel, lash extensions, and more.",
  alternates: {
    canonical: "/booking",
  },
  openGraph: {
    title: "Book an Appointment | Gracy Nails & Beauty Salon",
    description:
      "Book your appointment online at Gracy Nails & Beauty Salon in Charlottetown, PEI.",
    url: "https://gracynails.com/booking",
  },
};

export default function BookingPage() {
  return (
    <div className="pt-20 md:pt-24 pb-20 min-h-dvh bg-gray-soft">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-gold text-sm tracking-[0.25em] uppercase mb-4 font-medium">
            Schedule your visit
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-text-dark mb-3">
            Book an Appointment
          </h1>
          <div className="section-divider">
            <span className="text-gold-light text-lg">&#10045;</span>
          </div>
          <p className="text-text-muted">
            Prefer to call?{" "}
            <a
              href="tel:9023306261"
              className="text-gold hover:text-gold-dark font-semibold transition-colors"
            >
              902-330-6261
            </a>
          </p>
        </div>

        {/* Iframe with loading skeleton */}
        <div className="relative rounded-2xl overflow-hidden shadow-elegant bg-cream">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-0">
            <div className="w-8 h-8 border-3 border-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-text-muted text-sm">Loading booking system...</p>
          </div>

          <iframe
            src="https://bellebooking.com/center/8f5cb13eaa39d1e223d05751e550e332"
            width="100%"
            className="relative z-10 h-[600px] md:h-[800px] bg-white"
            style={{ border: 0 }}
            title="Book an appointment at Gracy Nails"
            allow="payment"
          />
        </div>

        <p className="text-center text-sm text-text-muted mt-6">
          If the booking form doesn&apos;t load,{" "}
          <a
            href="https://bellebooking.com/center/8f5cb13eaa39d1e223d05751e550e332"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-dark underline underline-offset-2 transition-colors"
          >
            click here to book directly
          </a>
          .
        </p>
      </div>
    </div>
  );
}
