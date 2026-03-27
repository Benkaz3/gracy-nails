import Image from "next/image";

const images = [
  { src: "/images/gracy-reception.webp", alt: "Reception desk with tulips" },
  { src: "/images/gracy-waiting-2.webp", alt: "Waiting area" },
  { src: "/images/gracy-pedi-chairs.webp", alt: "Pedicure chairs" },
  { src: "/images/gracy-nail-polish.webp", alt: "Nail polish collection" },
  { src: "/images/gracy-waiting.webp", alt: "Window seating with tulips" },
  { src: "/images/gracy-outdoor-2.webp", alt: "Salon exterior" },
  { src: "/images/hanh-gracy.webp", alt: "Hannah with her PEI-inspired painting" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-gray-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-text-dark mb-3">
            Our Salon
          </h2>
          <div className="section-divider">
            <span className="text-gold-light text-lg">&#10045;</span>
          </div>
          <p className="text-text-muted max-w-lg mx-auto">
            A spa atmosphere with essential oils, green plants, and a water fountain
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((image, idx) => (
            <div
              key={image.src}
              className={`group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant transition-shadow duration-300 [@media(hover:hover)]:hover:shadow-xl ${
                idx === images.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
