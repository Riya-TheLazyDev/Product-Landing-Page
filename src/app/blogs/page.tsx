"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import PageHero from "@/components/layouts/PageHero";
import BlogCard from "@/components/common/BlogCard";
import { blogs } from "@/mock/blogs";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useMedia } from "@/hooks/useMedia";
import { resolveMediaUrl } from "@/services/mediaService";

const categories = [
  "All",
  "Editorial",
  "Journal",
  "Artisan",
  "Design",
  "Trends",
  "Masterclass",
];

export default function BlogsPage() {
  const { bySection } = useMedia();
  const blogBanner = bySection.blog_hero;
  const [activeCategory, setActiveCategory] = useState("All");

  const blogQuote = blogBanner?.quote_text;
  const quoteSizeClass = blogQuote
    ? blogQuote.length > 180
      ? "text-3xl md:text-4xl"
      : blogQuote.length > 120
        ? "text-4xl md:text-5xl"
        : "text-5xl md:text-6xl"
    : "";

  const featuredBlog = blogs.find((b) => b.isFeatured) || blogs[0];
  const trendingBlogs = blogs.filter((b) => b.id !== featuredBlog.id).slice(0, 2);
  const remainingBlogs = blogs.filter(
    (b) =>
      b.id !== featuredBlog.id &&
      !trendingBlogs.includes(b) &&
      (activeCategory === "All" || b.category === activeCategory),
  );

  return (
    <main className="cinematic-page min-h-screen">
      <PageHero
        image={resolveMediaUrl(bySection.blog_hero?.media_url, "/assets/hero-brand.png")}
        mediaType={bySection.blog_hero?.media_type}
        eyebrow="Elevāra Journal"
        align="center"
        title={
          blogQuote ? (
            <span className={`block leading-tight ${quoteSizeClass}`}>{blogQuote}</span>
          ) : (
            <>
              The Art of <span className="text-accent-gold">Olfaction</span>
            </>
          )
        }
        description="A curated editorial space exploring scent, memory, craftsmanship, and modern luxury design."
      />

      <div className="cinematic-section cinematic-section--a relative z-10 pb-32 pt-16 md:pt-20">
        <div className="container-page relative z-10 max-w-[90rem] px-6 lg:px-12">
          <section className="mb-24">
            <div className="mb-10 flex items-center gap-3">
              <Sparkles size={16} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Featured Story
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <BlogCard {...featuredBlog} variant="large" />
            </motion.div>
          </section>

          <motion.div className="mb-32 grid gap-16 lg:grid-cols-12 lg:gap-24">
            <div className="lg:col-span-8">
              <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
                <h2 className="font-serif text-2xl tracking-wide text-white">
                  Trending Editorials
                </h2>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
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

            <aside className="lg:col-span-4">
              <div className="glass-clear glass-clear--card sticky top-28 p-8 md:p-10">
                <h3 className="mb-8 font-serif text-xl text-white">Categories</h3>
                <div className="flex flex-col gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`rounded-full px-5 py-3 text-left text-[9px] font-bold uppercase tracking-[0.32em] transition-all duration-500 ${
                        activeCategory === cat
                          ? "glass-clear text-primary"
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </motion.div>

          <section>
            <div className="mb-12 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
              <h2 className="font-serif text-3xl text-white md:text-4xl">
                Latest <span className="text-accent-gold">Entries</span>
              </h2>
              <p className="max-w-md text-sm font-light text-white/50">
                Filtered by{" "}
                <span className="text-primary">{activeCategory}</span>
              </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {remainingBlogs.map((blog, idx) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: (idx % 3) * 0.08 }}
                >
                  <BlogCard {...blog} />
                </motion.div>
              ))}
            </div>

            {remainingBlogs.length === 0 ? (
              <p className="py-20 text-center text-sm uppercase tracking-[0.3em] text-white/35">
                No stories in this category yet.
              </p>
            ) : null}
          </section>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24 flex justify-center"
          >
            <Link
              href="/"
              className="glass-clear glass-clear--pill inline-flex items-center gap-3 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.34em] text-white/80 transition hover:text-primary"
            >
              Return Home <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
