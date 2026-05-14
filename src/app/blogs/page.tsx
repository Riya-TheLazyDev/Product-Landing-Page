"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import BlogCard from "@/components/common/BlogCard";
import { blogs } from "@/mock/blogs";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const categories = ["All", "Editorial", "Journal", "Artisan", "Design", "Trends", "Masterclass"];

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredBlog = blogs.find(b => b.isFeatured) || blogs[0];
  const trendingBlogs = blogs.filter(b => b.id !== featuredBlog.id).slice(0, 2);
  const remainingBlogs = blogs.filter(
    b => b.id !== featuredBlog.id && !trendingBlogs.includes(b) && (activeCategory === "All" || b.category === activeCategory)
  );

  return (
    <main className="min-h-screen bg-[#010102] pt-32 pb-32">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[800px] h-[500px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(214,195,165,0.03),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(214,195,165,0.02),transparent_70%)]" />
      </div>

      <div className="relative z-10 container-page px-6 lg:px-12 max-w-[90rem] mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <span className="subtitle-luxury block tracking-[0.55em] mb-6">
            Elevāra Journal
          </span>
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-serif font-light text-white leading-[0.9] mb-8 uppercase tracking-[-0.04em]">
            The Art of <br />
            <span className="italic text-white/90">Olfaction</span>
          </h1>
          <p className="text-white/60 max-w-2xl text-sm md:text-base leading-relaxed tracking-wide font-light">
            A curated editorial space exploring the profound intersections of scent, memory, craftsmanship, and modern luxury design.
          </p>
        </motion.div>

        {/* Featured Article */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-10">
            <Sparkles size={16} className="text-[#D4AF37]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              Featured Story
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <BlogCard {...featuredBlog} variant="large" />
          </motion.div>
        </section>

        {/* Trending & Categories */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          {/* Trending Stories */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-6">
              <h2 className="text-2xl font-serif text-white tracking-wide">Trending Editorials</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {trendingBlogs.map((blog, idx) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                >
                  <BlogCard {...blog} variant="small" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Categories Sidebar */}
          <div className="lg:col-span-4 lg:pt-0 pt-10">
            <div className="sticky top-40">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium mb-10">
                Explore by Category
              </h3>
              <ul className="space-y-4">
                {categories.map((cat, idx) => (
                  <motion.li
                    key={cat}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + idx * 0.05 }}
                  >
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`group flex items-center justify-between w-full py-4 border-b border-white/5 transition-colors duration-500 ${
                        activeCategory === cat ? "border-white/30" : "hover:border-white/20"
                      }`}
                    >
                      <span className={`text-sm md:text-base font-serif tracking-wide transition-colors duration-500 ${
                        activeCategory === cat ? "text-[#D4AF37]" : "text-white/70 group-hover:text-white"
                      }`}>
                        {cat}
                      </span>
                      <ArrowRight size={14} className={`transition-all duration-500 ${
                        activeCategory === cat ? "text-[#D4AF37] opacity-100" : "text-white/20 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2"
                      }`} />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Remaining Stories Grid */}
        <section>
          <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
            <h2 className="text-2xl font-serif text-white tracking-wide">
              {activeCategory === "All" ? "Latest Dispatches" : `${activeCategory} Dispatches`}
            </h2>
          </div>
          
          {remainingBlogs.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingBlogs.map((blog, idx) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                >
                  <BlogCard {...blog} variant="small" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-white/40 font-serif italic text-lg">No stories found in this category.</p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
