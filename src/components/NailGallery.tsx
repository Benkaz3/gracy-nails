"use client";

import Image from "next/image";
import { useState } from "react";

const INITIAL_COUNT = 6;

const nailImages = [
  { src: "/images/nails-sunflower-french.webp", alt: "Sunflower French tip nails" },
  { src: "/images/nails-pink-floral.webp", alt: "Pink floral accent nails" },
  { src: "/images/nails-blue-marble.webp", alt: "Blue marble nail art" },
  { src: "/images/nails-silver-glitter.webp", alt: "Silver glitter nails" },
  { src: "/images/nails-evil-eye.webp", alt: "Evil eye nail art" },
  { src: "/images/nails-olive-cat.webp", alt: "Olive green and white cat-themed nails" },
  { src: "/images/nails-pastel-plaid.webp", alt: "Pastel plaid nail design" },
  { src: "/images/nails-christmas-green-red.webp", alt: "Christmas green and red nail art" },
  { src: "/images/nails-pink-winter.webp", alt: "Pink winter snowflake nails" },
  { src: "/images/nails-red-half-moon.webp", alt: "Red half-moon nail design" },
  { src: "/images/nails-strawberry.webp", alt: "Strawberry nail art" },
  { src: "/images/nails-valentine-hearts.webp", alt: "Valentine red heart nails" },
  { src: "/images/nails-holiday-snowflake.webp", alt: "Holiday snowflake nail art" },
  { src: "/images/nails-candy-cane.webp", alt: "Candy cane holiday nails" },
  { src: "/images/nails-gold-christmas-tree.webp", alt: "Gold and green Christmas tree nails" },
  { src: "/images/nails-turquoise-tips.webp", alt: "Turquoise French tip nails" },
  { src: "/images/nails-white-gold-floral.webp", alt: "White and gold floral nails" },
  { src: "/images/nails-orange-mauve-stiletto.webp", alt: "Orange and mauve stiletto nails with glitter" },
];

export default function NailGallery() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? nailImages : nailImages.slice(0, INITIAL_COUNT);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((image) => (
          <div
            key={image.src}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant transition-shadow duration-300 [@media(hover:hover)]:hover:shadow-xl"
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

      {!showAll && nailImages.length > INITIAL_COUNT && (
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="px-8 py-3 rounded-full border border-gold-light/60 text-text-dark hover:bg-cream hover:border-gold/40 transition-all font-medium"
          >
            Show all designs ({nailImages.length - INITIAL_COUNT} more)
          </button>
        </div>
      )}
    </>
  );
}
