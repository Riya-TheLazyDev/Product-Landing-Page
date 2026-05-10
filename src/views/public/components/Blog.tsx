"use client";

import { motion } from "framer-motion";
import BlogCard from "../../../components/common/BlogCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogs } from "@/mock/blogs";

export default function BlogSection() {
  // Show only 3 featured blogs
  const featuredBlogs = blogs.slice(0, 3);
  const mainBlog = featuredBlogs[0];
  const sideBlogs = featuredBlogs.slice(1);

  return (
    <section className="py-32 relative overflow-hidden bg-[#050505]">
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-page relative z-10 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.2, 0, 0.2, 1] }}
          className="mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold mb-6 block">
            Editorial • Journal
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-serif font-light leading-tight text-white mb-4">
                The Scented <br /> <span className="text-[#D4AF37]">Chronicles</span>
              </h2>
              <p className="text-white/40 text-xs tracking-widest uppercase font-medium">
                Immersive stories from the world of Elevara
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Main Featured Post */}
          <motion.div 
            className="col-span-12 lg:col-span-7 xl:col-span-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.2, 0, 0.2, 1] }}
          >
            <BlogCard {...mainBlog} variant="large" />
          </motion.div>

          {/* Side Posts */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col gap-10 lg:gap-12">
            {sideBlogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + (idx * 0.2), ease: [0.2, 0, 0.2, 1] }}
                className="relative"
              >
                {/* Reference inspired circular indicators */}
                <div className={`absolute -top-6 left-6 w-12 h-12 rounded-full blur-xl opacity-50 
                  ${idx === 0 ? "bg-blue-500" : "bg-purple-500"}`} 
                />
                <div className={`absolute -top-4 left-8 w-4 h-4 rounded-full border border-white/20 z-20 
                  ${idx === 0 ? "bg-blue-600/30" : "bg-purple-600/30"}`} 
                />
                
                <BlogCard {...blog} variant="small" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <Link href="/blogs" className="group relative px-10 py-4 overflow-hidden rounded-full bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 hover:border-[#D4AF37]/50">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative flex items-center gap-3 text-xs uppercase tracking-[0.3em] font-bold text-white group-hover:text-[#D4AF37] transition-colors">
              Explore More Stories
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
