import Image from "next/image";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <Link
      href="/booking"
      aria-label="Summer offer: receive a free giveaway gift with every bill over $30. Book your appointment."
      className="block pt-16 md:pt-20 hover:opacity-95 transition-opacity"
    >
      <Image
        src="/images/summer-promo-banner.webp"
        alt="Shine with Gracy this summer — receive a free giveaway gift with every bill over $30. Choose from lip balm, hand cream, cuticle oil, sunscreen, bath bomb, or facemask."
        width={2400}
        height={600}
        sizes="100vw"
        className="w-full h-auto"
        priority
      />
    </Link>
  );
}
