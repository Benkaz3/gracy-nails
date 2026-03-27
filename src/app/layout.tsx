import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBookingBar from "@/components/MobileBookingBar";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gracynails.com"),
  title: "Gracy Nails & Beauty Salon | Charlottetown, PEI",
  description:
    "Artistic nail salon in downtown Charlottetown. Manicures, pedicures, biogel, dip powder, waxing, eyelash extensions. Spa atmosphere with free drinks.",
  openGraph: {
    title: "Gracy Nails & Beauty Salon | Charlottetown, PEI",
    description:
      "Artistic nail salon in downtown Charlottetown. Manicures, pedicures, biogel, dip powder, waxing, eyelash extensions.",
    url: "https://gracynails.com",
    siteName: "Gracy Nails & Beauty Salon",
    images: [
      {
        url: "/images/gracy-outdoor.webp",
        width: 1200,
        height: 630,
        alt: "Gracy Nails & Beauty Salon storefront",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gracy Nails & Beauty Salon | Charlottetown, PEI",
    description:
      "Artistic nail salon in downtown Charlottetown. Manicures, pedicures, biogel, dip powder, waxing, eyelash extensions.",
    images: ["/images/gracy-outdoor.webp"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileBookingBar />
      </body>
    </html>
  );
}
