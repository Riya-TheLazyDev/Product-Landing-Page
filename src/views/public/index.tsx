import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import Features from "./components/Features";
import BlogSection from "./components/Blog";
import Subscribe from "./components/Subscribe";

export default function PublicPage() {
  return (
    <>
      <Hero />
      <ProductSection />
      <Features />
      <BlogSection />
      <Subscribe />
    </>
  );
}
