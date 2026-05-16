"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { blogs } from "@/mock/blogs";
import { ArrowLeft, Clock, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRef } from "react";
import BlogCard from "@/components/common/BlogCard";

export default function BlogDetailPage() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (!blog) {
    return (
      <div className="cinematic-page min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-white mb-4 font-serif">Story Not Found</h1>
          <Link href="/blogs" className="text-[#D4AF37] uppercase tracking-widest text-xs">Return to Journal</Link>
        </div>
      </div>
    );
  }

  const relatedBlogs = blogs.filter(b => b.id !== id).slice(0, 2);

  return (
    <main ref={containerRef} className="cinematic-page min-h-screen text-white selection:bg-[#D4AF37]/30">
      {/* Cinematic Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010102] via-[#010102]/60 to-[#010102]/20" />
        </motion.div>
        
        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-24">
          <div className="container-page px-6 lg:px-12 max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/blogs" className="group inline-flex items-center gap-4 text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-medium mb-12 transition-all">
                <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform duration-500" />
                Back to Journal
              </Link>
              
              <div className="flex flex-wrap items-center gap-6 mb-8 border-l border-[#D4AF37]/50 pl-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                  {blog.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50">
                  <Clock size={12} />
                  {blog.publishedAt}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  By {blog.author}
                </span>
              </div>

              <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-serif font-light leading-[1.05] tracking-tight mb-8">
                {blog.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Editorial Content Section */}
      <section className="cinematic-section cinematic-section--b relative z-20 py-24">
        <div className="container-page px-6 lg:px-12 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="prose prose-invert prose-lg md:prose-xl max-w-none"
          >
            <p className="text-2xl md:text-3xl text-white/90 leading-[1.6] font-serif font-light mb-16 italic">
              "{blog.excerpt}"
            </p>
            
            <div className="text-white/70 leading-[1.8] font-light tracking-wide space-y-12">
              <p className="first-letter:text-7xl first-letter:font-serif first-letter:text-[#D4AF37] first-letter:float-left first-letter:mr-6 first-letter:mt-2">
                {blog.content}
              </p>
              
              <p>
                As the night deepens, the olfactory profile shifts. What begins as a whisper of citrus transforms into a resonant chorus of amber and oud. This evolution is not by chance—it is the meticulous design of the master perfumer, balancing volatility with longevity to craft a scent that breathes with the wearer.
              </p>

              {/* Immersive Inline Visual */}
              <figure className="my-20 relative h-[60vh] w-full rounded-[2rem] overflow-hidden group">
                <Image
                  src={blog.image}
                  alt="Editorial visual"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20" />
              </figure>

              <h2 className="text-3xl md:text-4xl font-serif text-white tracking-wide mt-20 mb-10">
                The Architecture of Scent
              </h2>
              <p>
                Every premium fragrance is constructed like a piece of high architecture. The foundation must be unshakeable—often composed of rare woods and deep musks. Upon this, the heart notes build the structure, weaving floral and spicy elements into a cohesive narrative. Finally, the top notes crown the creation, offering that initial, breathtaking allure that captivates from the very first spritz.
              </p>

              {/* Luxury Quote Block */}
              <blockquote className="my-20 p-12 border border-white/5 bg-white/[0.02] rounded-3xl backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30" />
                <p className="text-2xl md:text-3xl font-serif text-white/90 italic leading-relaxed text-center">
                  "A true fragrance does not just smell beautiful—it alters the atmosphere of a room and the architecture of a memory."
                </p>
                <footer className="mt-8 text-center text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">
                  — {blog.author}
                </footer>
              </blockquote>
            </div>
          </motion.div>

          {/* Share & Actions */}
          <div className="mt-32 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Share Story</span>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/30 transition-all text-white/60 hover:text-white">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Stories */}
      <section className="cinematic-section cinematic-section--c relative overflow-hidden py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="container-page px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-4">Further Reading</h2>
              <p className="text-white/50 font-light tracking-wide">Continue your journey through our olfactory narratives.</p>
            </div>
            <Link href="/blogs" className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">
              View All Journal
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {relatedBlogs.map((relatedBlog, idx) => (
              <motion.div
                key={relatedBlog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
              >
                <BlogCard {...relatedBlog} variant="small" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
