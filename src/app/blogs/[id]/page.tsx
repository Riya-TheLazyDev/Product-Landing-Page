"use client";

import { motion } from "framer-motion";
import { blogs } from "@/mock/blogs";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-white mb-4">Post Not Found</h1>
          <Link href="/blogs" className="text-[#D4AF37] uppercase tracking-widest text-xs">Return to Journal</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-20">
          <div className="container-page px-6 lg:px-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link href="/blogs" className="inline-flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-bold mb-8 hover:gap-4 transition-all">
                <ArrowLeft size={14} />
                Back to Journal
              </Link>
              
              <div className="flex items-center gap-6 mb-6">
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/60">
                  <Clock size={12} className="text-[#D4AF37]" />
                  {blog.publishedAt}
                </span>
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/60">
                  <User size={12} className="text-[#D4AF37]" />
                  {blog.author}
                </span>
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/60">
                  <Tag size={12} className="text-[#D4AF37]" />
                  {blog.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-7xl font-serif font-light leading-tight mb-6">
                {blog.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container-page px-6 lg:px-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <p className="text-xl text-white/80 leading-relaxed font-serif italic mb-12 border-l-2 border-[#D4AF37] pl-8">
              {blog.excerpt}
            </p>
            
            <div className="text-white/70 leading-relaxed space-y-8 tracking-wide">
              <p>
                {blog.content}
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sedenim in ante. Donec sed eros 
                id ex dignissim molestie. Nullam quis elementum purus. Pellentesque habitant morbi 
                tristique senectus et netus et malesuada fames ac turpis egestas. 
              </p>
              <p>
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
                Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget 
                tortor risus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. 
              </p>
              <h2 className="text-2xl font-serif text-white mt-12 mb-6">The Essence of Quality</h2>
              <p>
                Nulla porttitor accumsan tincidunt. Quisque velit nisi, pretium ut lacinia in, elementum 
                id enim. Curabitur aliquet quam id dui posuere blandit. Curabitur aliquet quam id dui 
                posuere blandit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.
              </p>
            </div>
          </motion.div>

          {/* Author Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#D4AF37] to-blue-900 flex items-center justify-center text-3xl font-serif">
              {blog.author.charAt(0)}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-[#D4AF37] uppercase tracking-widest text-xs font-bold mb-2">About the Author</h4>
              <h3 className="text-2xl font-serif mb-4">{blog.author}</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                A leading expert in olfactory sciences and luxury brand strategy, sharing insights into 
                the evolving world of premium fragrance and experiential design.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Decoration */}
      <div className="h-64 bg-gradient-to-t from-[#D4AF37]/5 to-transparent" />
    </main>
  );
}
