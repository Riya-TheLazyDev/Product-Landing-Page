"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export interface BlogCardProps {
  id: string;
  title: string;
  publishedAt: string;
  author: string;
  image: string;
  excerpt: string;
  category: string;
  variant?: "large" | "small";
}

export default function BlogCard({
  id,
  title,
  publishedAt,
  author,
  image,
  excerpt,
  category,
  variant = "small",
}: BlogCardProps) {
  const isLarge = variant === "large";

  return (
    <Link href={`/blogs/${id}`}>
      <motion.article
        whileHover={{ y: -10 }}
        className={`group relative overflow-hidden rounded-[2rem] transition-all duration-500
          ${isLarge ? "h-[500px] md:h-[600px]" : "h-[280px] md:h-[300px]"}
          bg-black/60 backdrop-blur-md border border-white/[0.08] shadow-2xl
        `}
      >
        {/* Luxury Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        </div>

        {/* Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
            loading="lazy"
            sizes={isLarge ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
          />
          {/* Layered Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
          
          {/* Storm Blue / Champagne Gold Accent Glows */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-900/20 blur-[100px] rounded-full group-hover:bg-blue-800/30 transition-colors duration-700 z-10" />
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] rounded-full group-hover:bg-[#D4AF37]/10 transition-colors duration-700 z-10" />
        </div>

        {/* Content */}
        <div className={`relative z-30 h-full flex flex-col justify-end p-6 md:p-12 transition-transform duration-500 ${isLarge ? "max-w-2xl" : "max-w-full"}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-3 md:mb-4">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold backdrop-blur-md">
                {category}
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                {publishedAt}
              </span>
            </div>

            <h3 className={`${isLarge ? "text-2xl md:text-5xl" : "text-lg md:text-2xl"} font-serif font-light leading-tight mb-3 md:mb-4 text-white group-hover:text-[#D4AF37] transition-colors duration-500`}>
              {title}
            </h3>

            {isLarge && (
              <p className="hidden sm:block text-white/60 text-xs md:text-base mb-6 md:mb-8 leading-relaxed font-light tracking-wide line-clamp-2">
                {excerpt}
              </p>
            )}

            <div className="flex items-center gap-3 md:gap-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
                Read Story
              </span>
              <ArrowRight size={14} className="text-[#D4AF37]" />
            </div>
          </motion.div>
        </div>

        {/* Glowing Border on Hover */}
        <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/30 rounded-[2rem] transition-colors duration-500 z-40 pointer-events-none" />
      </motion.article>
    </Link>
  );
}

