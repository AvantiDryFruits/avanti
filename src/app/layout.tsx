import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Avanti Dry Fruits — The Trust of Purity & Taste",
    template: "%s | Avanti Dry Fruits",
  },
  description:
    "Premium dry fruits, masala, farsan, namkeen, sweets and gift hampers from Avanti Dry Fruits, Mulund West, Mumbai. Order on WhatsApp.",
  icons: {
    icon: "/icon.svg",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Avanti Dry Fruits — The Trust of Purity & Taste",
    description:
      "Premium dry fruits, masala, farsan, namkeen, sweets and gift hampers from Avanti Dry Fruits, Mulund West, Mumbai. Order on WhatsApp.",
    images: [{ url: "/og-image.png", width: 715, height: 572, alt: "Avanti Dry Fruits" }],
    type: "website",
    siteName: "Avanti Dry Fruits",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-sans antialiased`}>
        {children}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="f51a5b8a-ee51-4d5c-9589-4f6f0ffb8345"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
