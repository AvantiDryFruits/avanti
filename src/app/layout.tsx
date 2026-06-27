import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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
      </body>
    </html>
  );
}
