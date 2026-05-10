"use client";

import { motion } from "framer-motion";
import BlogCard from "@/components/common/BlogCard";
import { blogs } from "@/mock/blogs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-20">
      <div className="container-page px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-bold mb-8 hover:gap-4 transition-all">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <h1 className="text-5xl md:text-8xl font-serif font-light text-white mb-6">
            The <span className="text-[#D4AF37]">Journal</span>
          </h1>
          <p className="text-white/40 text-sm md:text-base max-w-2xl leading-relaxed tracking-wide">
            Explore our collection of stories, insights, and editorial pieces on the art of perfumery and luxury design.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              <BlogCard {...blog} variant="small" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none -z-10" />
    </main>
  );
}
