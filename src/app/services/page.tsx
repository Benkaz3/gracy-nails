import type { Metadata } from "next";
import Link from "next/link";
import { serviceCategories, type ServiceCategory } from "@/data/services";

function buildServiceSchema(categories: ServiceCategory[]) {
  return {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: "Gracy Nails & Beauty Salon",
    url: "https://gracynails.com/services",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Nail & Beauty Services",
      itemListElement: categories.map((cat) => ({
        "@type": "OfferCatalog",
        name: cat.name,
        itemListElement: cat.services.map((svc) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: svc.name,
            ...(svc.description && { description: svc.description }),
          },
          price: svc.price.replace("$", ""),
          priceCurrency: "CAD",
        })),
      })),
    },
  };
}

export const metadata: Metadata = {
  title: "Services & Prices | Gracy Nails & Beauty Salon",
  description:
    "Full service menu and pricing for Gracy Nails — manicures, pedicures, biogel, dip powder, waxing, eyelash extensions, and more.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services & Prices | Gracy Nails & Beauty Salon",
    description:
      "Full service menu and pricing for Gracy Nails — manicures, pedicures, biogel, dip powder, waxing, eyelash extensions, and more.",
    url: "https://gracynails.com/services",
  },
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "");
}

export default function ServicesPage() {
  const jsonLd = buildServiceSchema(serviceCategories);

  return (
    <div className="pt-20 md:pt-24 pb-20 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <p className="text-gold text-sm tracking-[0.25em] uppercase mb-4 font-medium">
            What we offer
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-text-dark mb-3">
            Services & Prices
          </h1>
          <div className="section-divider">
            <span className="text-gold-light text-lg">&#10045;</span>
          </div>
          <p className="text-text-muted max-w-2xl mx-auto">
            Complimentary tea, coffee, water, or pop with every visit.
          </p>
        </div>

        {/* Quick nav */}
        <nav
          aria-label="Service categories"
          className="flex flex-wrap justify-center gap-2 mb-14 mt-8"
        >
          {serviceCategories.map((category) => (
            <a
              key={category.name}
              href={`#${slugify(category.name)}`}
              className="px-4 py-2 text-sm rounded-full border border-gold-light/60 text-text-dark hover:bg-cream hover:border-gold/40 transition-all"
            >
              {category.name}
            </a>
          ))}
        </nav>

        <div className="space-y-14">
          {serviceCategories.map((category) => (
            <div
              key={category.name}
              id={slugify(category.name)}
              className="scroll-mt-24"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-2xl md:text-3xl text-text-dark">
                  {category.name}
                </h2>
                <Link
                  href="/booking"
                  className="text-sm text-gold hover:text-gold-dark font-medium transition-colors hidden sm:inline-block"
                >
                  Book &rarr;
                </Link>
              </div>
              <div className="border-t border-gold-light/30">
                {category.services.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-4 px-3 border-b border-gray-100 last:border-0 hover:bg-cream/50 transition-colors rounded-lg -mx-3"
                  >
                    <div className="flex-1">
                      <span className="font-medium text-text-dark">
                        {service.name}
                      </span>
                      {service.description && (
                        <p className="text-sm text-text-muted mt-0.5">
                          {service.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-6 mt-1 sm:mt-0 sm:ml-4 shrink-0">
                      <span className="text-sm text-text-muted">
                        {service.duration}
                      </span>
                      <span className="font-semibold text-gold text-lg min-w-[60px] text-right">
                        {service.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Group booking note */}
        <div className="mt-20 bg-cream rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute -left-16 -top-16 w-48 h-48 rounded-full bg-blue-light/10" />
          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-gold-light/10" />
          <div className="relative">
            <p className="text-gold text-sm tracking-[0.25em] uppercase mb-3 font-medium">
              Celebrate together
            </p>
            <h3 className="font-heading text-2xl md:text-3xl text-text-dark mb-3">
              Private Group Bookings
            </h3>
            <p className="text-text-muted mb-8 max-w-lg mx-auto">
              Birthdays, bachelorette parties, and social events — book minimum
              1 week in advance with a minimum of 4 services. Free decoration
              included!
            </p>
            <Link
              href="/booking"
              className="inline-block bg-gold hover:bg-gold-dark text-white px-10 py-4 rounded-full font-semibold tracking-wide transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              Book Your Group
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
