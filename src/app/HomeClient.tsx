"use client";

import dynamic from "next/dynamic";
import Hero from "@/views/public/components/Hero";

const ProductSection = dynamic(
  () => import("@/views/public/components/ProductSection"),
  {
    loading: () => <div className="h-96" />,
    ssr: false,
  },
);
const FragranceNotes = dynamic(
  () => import("@/views/public/components/FragranceNotes"),
  {
    ssr: false,
  },
);
const Collections = dynamic(
  () => import("@/views/public/components/Collections"),
  {
    ssr: false,
  },
);
const Features = dynamic(() => import("@/views/public/components/Features"), {
  ssr: false,
});
const BlogSection = dynamic(() => import("@/views/public/components/Blog"), {
  ssr: false,
});
const Subscribe = dynamic(() => import("@/views/public/components/Subscribe"), {
  ssr: false,
});

export default function HomeClient() {
  return (
    <>
      <Hero />
      <ProductSection />
      <FragranceNotes />
      <Collections />
      <Features />
      <BlogSection />
      <Subscribe />
    </>
  );
}
