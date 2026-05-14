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
    <section id="journal" className="section-padding bg-[#010101]">
      <div className="container-page">
        <div className="editorial-grid mb-16 md:mb-20">
          <div>
            <span className="subtitle-luxury mb-6 block">The Journal</span>
            <h2 className="title-luxury text-5xl md:text-7xl text-white">
              Olfactory <br /> 
              <span className="text-primary/25 italic">Stories</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm font-light leading-relaxed tracking-wide text-white/60 md:text-base max-w-sm">
              Explore the intricate world of Elevara through our curated collection of scent narratives and luxury insights.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Main Featured Post */}
          <motion.div 
            className="col-span-12 lg:col-span-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <BlogCard {...mainBlog} variant="large" />
          </motion.div>

          {/* Side Posts */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
            {sideBlogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + (idx * 0.2), ease: [0.16, 1, 0.3, 1] }}
              >
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
          className="mt-24 flex justify-center"
        >
          <Link href="/blogs" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white hover:text-primary transition-all py-3 border-b border-white/5 hover:border-primary/40">
            Read All Chronicles
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
