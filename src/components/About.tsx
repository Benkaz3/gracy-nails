import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading with decorative divider */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-text-dark mb-3">
            About Us
          </h2>
          <div className="section-divider">
            <span className="text-gold-light text-lg">&#10045;</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-text-muted leading-relaxed mb-6 text-[1.05rem]">
              Gracy Nails and Beauty Salon is an artistic designed salon located
              in the heart of Charlottetown downtown at 146 Prince Street (the
              corner of Prince and Grafton St). Our key services include
              manicures, pedicures, nail polish, dip powder, biogel (no
              acrylic), and nail design. We also provide waxing, eyebrow
              tinting, and eyelash extension services.
            </p>
            <p className="text-text-muted leading-relaxed mb-6 text-[1.05rem]">
              Gracy provides a spa atmosphere with quietness, light meditation
              music, the aroma of essential oils, green plants, and a water
              fountain. Enjoy your best moments with relaxation and free drinks
              — coffee, tea, and pop.
            </p>
            <p className="text-text-muted leading-relaxed mb-8 text-[1.05rem]">
              We also offer group services for weddings, birthdays, and
              bachelorette parties. Our top priority is hygiene, cleanliness, and
              the health and wellness of every customer.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2.5 text-gold font-semibold">
                <span className="text-2xl">&#9749;</span>
                <span>Free drinks with every visit</span>
              </div>
              <Link
                href="/services"
                className="text-gold hover:text-gold-dark font-semibold underline underline-offset-4 decoration-gold/30 hover:decoration-gold transition-all"
              >
                View our services &rarr;
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-elegant">
              <Image
                src="/images/hanh-gracy-2.webp"
                alt="Hannah Hanh Nguyen, owner of Gracy Nails, inside her salon"
                width={600}
                height={450}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative accent behind image */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-gold-light/40 -z-10 hidden lg:block" />
          </div>
        </div>

        {/* Owner bio */}
        <div className="mt-20 bg-cream rounded-2xl p-8 md:p-14 relative overflow-hidden">
          {/* Subtle decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-light/10 rounded-bl-full" />
          <h3 className="font-heading text-2xl md:text-3xl mb-6 text-text-dark relative">
            Meet Hannah
          </h3>
          <p className="text-text-muted leading-relaxed mb-4 text-[1.05rem] relative">
            Hannah Hanh Nguyen, the owner of Gracy Nails, has more than 20 years
            of experience in tourism, hospitality, digital media, and operation
            management. After moving to Canada, Hannah pursued Business
            Administration at Holland College and chose to follow her
            entrepreneurial dream in nail art and beauty.
          </p>
          <p className="text-text-muted leading-relaxed text-[1.05rem] relative">
            Inspired by PEI&apos;s beautiful nature, Hannah combines her passion
            for art and painting with her hospitality expertise. As a mother of
            three, she understands the need for a relaxing escape — and created
            Gracy as a pampering place for busy women to take time for
            themselves.
          </p>
        </div>
      </div>
    </section>
  );
}
