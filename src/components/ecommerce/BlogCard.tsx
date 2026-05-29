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
  image,
  excerpt,
  category,
  variant = "small",
}: BlogCardProps) {
  const isLarge = variant === "large";
  const isVideo = /\.(mp4|webm)(\?.*)?$/i.test(image);

  return (
    <Link href={`/blogs/${id}`}>
      <motion.article
        whileHover={{ y: -6 }}
        className={`glass-clear glass-clear--card group relative overflow-hidden transition-all duration-700 ${
          isLarge
            ? "h-[380px] sm:h-[480px] md:h-[560px] lg:h-[600px]"
            : "h-[240px] sm:h-[280px] md:h-[300px]"
        }`}
      >
        <div className="absolute inset-0 z-0">
          {isVideo ? (
            <video
              src={image}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          ) : /^https?:\/\//i.test(image) ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
              sizes={isLarge ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        </div>

        <div
          className={`relative z-10 flex h-full flex-col justify-end p-6 md:p-10 ${isLarge ? "max-w-2xl" : ""}`}
        >
          <div className="mb-3 flex flex-wrap items-center gap-3 md:mb-4">
            <span className="glass-clear glass-clear--pill px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-primary">
              {category}
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/45">
              {publishedAt}
            </span>
          </div>

          <h3
            className={`mb-3 font-serif font-light leading-tight text-white transition-colors duration-500 group-hover:text-primary ${
              isLarge ? "text-2xl md:text-5xl" : "text-lg md:text-2xl"
            }`}
          >
            {title}
          </h3>

          {isLarge ? (
            <p className="mb-6 line-clamp-2 hidden text-sm font-light leading-relaxed tracking-wide text-white/62 sm:block">
              {excerpt}
            </p>
          ) : null}

          <div className="flex translate-y-2 items-center gap-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary">
              Read Story
            </span>
            <ArrowRight size={14} className="text-primary" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
