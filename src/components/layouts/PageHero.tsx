"use client";

import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";

type PageHeroProps = {
  image: string | StaticImageData;
  mediaType?: "image" | "video" | null;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  priority?: boolean;
};

export default function PageHero({
  image,
  mediaType = "image",
  eyebrow,
  title,
  description,
  align = "left",
  priority = true,
}: PageHeroProps) {
  const centered = align === "center";

  return (
    <section className="page-hero-fullbleed -mt-14 pt-14 md:-mt-16 md:pt-16">
      <div className="page-hero-fullbleed__media">
        {mediaType === "video" && typeof image === "string" ? (
          <video
            src={image}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover object-center"
          />
        ) : typeof image === "string" && /^https?:\/\//i.test(image) ? (
          <img src={image} alt="" className="h-full w-full object-cover object-center" />
        ) : (
          <Image
            src={image}
            alt=""
            fill
            priority={priority}
            className="object-cover object-center"
            sizes="100vw"
          />
        )}
        <div className="page-hero-fullbleed__scrim" />
      </div>

      <div
        className={`page-hero-fullbleed__content ${centered ? "items-center text-center" : ""}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={centered ? "max-w-3xl" : "max-w-2xl"}
        >
          <span className="subtitle-luxury mb-6 block text-primary">{eyebrow}</span>
          <h1 className="heading-display mb-6 text-white drop-shadow-[0_12px_48px_rgba(0,0,0,0.8)]">
            {title}
          </h1>
          {description ? (
            <p
              className={`text-sm leading-relaxed text-white/78 md:text-base ${centered ? "mx-auto max-w-xl" : "max-w-lg"}`}
            >
              {description}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
