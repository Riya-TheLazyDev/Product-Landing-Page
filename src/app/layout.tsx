import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "../index.css";
import Header from "@/components/layouts/components/Header";
import Footer from "@/components/layouts/components/Footer";
import CustomCursor from "@/components/common/CustomCursor";

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
  title: "ELEVARA | Facial & Skincare",
  description: "Experience the future of skincare with our premium liquid glass collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
