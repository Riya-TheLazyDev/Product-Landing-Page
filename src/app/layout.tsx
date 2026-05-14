import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "../index.css";
import Header from "@/components/layouts/components/Header";
import Footer from "@/components/layouts/components/Footer";
import CustomCursor from "@/components/common/CustomCursor";
import CartToast from "@/components/cart/CartToast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "ELEVARA | Luxury Skincare & Fragrance",
  description: "ELEVARA offers a cinematic collection of premium facial skincare and bespoke fragrances, meticulously crafted with liquid glass technology and botanical essences.",
  keywords: ["luxury skincare", "bespoke fragrances", "liquid glass technology", "premium beauty", "ELEVARA"],
  authors: [{ name: "ELEVARA" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
        {/* <CustomCursor /> */}
        <Header />
        <main>{children}</main>
        <Footer />
        <CartToast />
      </body>
    </html>
  );
}
