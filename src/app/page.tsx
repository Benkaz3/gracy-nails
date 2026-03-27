import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import BookingBanner from "@/components/BookingBanner";
import Contact from "@/components/Contact";
import FadeIn from "@/components/FadeIn";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  name: "Gracy Nails & Beauty Salon",
  image: "https://gracynails.com/images/gracy-outdoor.webp",
  url: "https://gracynails.com",
  telephone: "+1-902-330-6261",
  email: "gracynailsbeauty@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "146 Prince Street",
    addressLocality: "Charlottetown",
    addressRegion: "PE",
    postalCode: "C1A4R6",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.2352,
    longitude: -63.1311,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  priceRange: "$$",
  sameAs: [
    "https://www.facebook.com/profile.php?id=100090193345540",
    "https://www.instagram.com/gracynailsbeauty/",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <FadeIn>
        <About />
      </FadeIn>
      <FadeIn>
        <Gallery />
      </FadeIn>
      <FadeIn>
        <BookingBanner />
      </FadeIn>
      <FadeIn>
        <Contact />
      </FadeIn>
    </>
  );
}
