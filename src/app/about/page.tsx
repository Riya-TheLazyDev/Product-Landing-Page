"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import PageHero from "@/components/layouts/PageHero";
import { useMedia } from "@/hooks/useMedia";
import { resolveMediaUrl } from "@/services/mediaService";

export default function AboutPage() {
  const { bySection } = useMedia();
  const storyMedia1 = bySection.story_media_1;
  const storyMedia2 = bySection.story_media_2;
  const storyQuote =
    storyMedia2?.quote_text ||
    "We measure our craft not by the ingredients we include, but by the memories they are capable of holding.";
  const storyAuthor = storyMedia2?.quote_author || "The Master Perfumer";
  const quoteSizeClass =
    storyQuote.length > 180
      ? "text-xl md:text-3xl"
      : storyQuote.length > 120
        ? "text-2xl md:text-4xl"
        : "text-3xl md:text-5xl";
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bannerY = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "18%"]);

  return (
    <main ref={containerRef} className="cinematic-page overflow-hidden text-white">
      <PageHero
        image="/assets/hero-brand.png"
        eyebrow="The Maison"
        align="center"
        title={
          <>
            Crafting <span className="text-accent-gold">Eternity</span>
          </>
        }
        description="Born from darkness. Distilled in light. A study in the silent power of true luxury."
      />

      <section className="cinematic-section cinematic-section--c relative py-24 md:py-32">
        <div className="container-page mx-auto max-w-5xl px-6 lg:px-12">
          <div className="grid items-center gap-16 md:grid-cols-2 md:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <h2 className="heading-section">
                The Architecture of{" "}
                <span className="text-accent-gold">Emotion</span>
              </h2>
              <div className="space-y-6 text-lg font-light leading-relaxed text-white/65">
                <p>
                  At Elevāra, we do not simply mix ingredients; we architect
                  emotions. Each fragrance is conceived as a sanctuary — a
                  private world carved out of scent.
                </p>
                <p>
                  Our philosophy is rooted in contrast between shadow and
                  illumination: nocturnal blooms anchored by primordial resins
                  aged in darkness.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-clear glass-clear--card relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src="/assets/product.jpeg"
                alt="Elevāra craftsmanship"
                fill
                className="object-cover"
              />
              {storyMedia1?.media_url ? (
                storyMedia1.media_type === "video" ? (
                  <video
                    src={resolveMediaUrl(storyMedia1.media_url)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={resolveMediaUrl(storyMedia1.media_url)}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative flex h-[70vh] min-h-[420px] items-center justify-center overflow-hidden">
        <motion.div style={{ y: bannerY }} className="absolute inset-0 z-0">
          <Image
            src="/assets/hero-brand.png"
            alt=""
            fill
            className="object-cover opacity-50"
          />
          {storyMedia2?.media_url ? (
            storyMedia2.media_type === "video" ? (
              <video
                src={resolveMediaUrl(storyMedia2.media_url)}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover opacity-50"
              />
            ) : (
              <img
                src={resolveMediaUrl(storyMedia2.media_url)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-50"
              />
            )
          ) : null}
          <div className="absolute inset-0 bg-black/55" />
        </motion.div>

        <div className="relative z-10 max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className={`mx-auto max-w-4xl break-words font-serif italic leading-relaxed text-white/92 ${quoteSizeClass}`}
          >
            &ldquo;{storyQuote}&rdquo;
          </motion.p>
          <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-primary">
            &mdash; {storyAuthor}
          </p>
        </div>
      </section>

      <section className="cinematic-section cinematic-section--b py-24 md:py-32">
        <div className="container-page mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-20 text-center md:mb-24">
            <span className="subtitle-luxury mb-4 block">The Process</span>
            <h2 className="heading-section">
              From Soil to <span className="text-accent-gold">Soul</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {[
              {
                title: "01. Sourcing",
                desc: "Midnight orchids, ancient oud — ingredients that refuse to compromise.",
              },
              {
                title: "02. Distillation",
                desc: "Cold-pressed, slow-aged extracts so complex notes unfold organically.",
              },
              {
                title: "03. Composition",
                desc: "Obsidian glass flacons, hand-polished and sealed with precision.",
              },
            ].map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="glass-clear glass-clear--card p-10"
              >
                <h3 className="mb-6 font-serif text-xl text-primary">{step.title}</h3>
                <p className="font-light leading-relaxed tracking-wide text-white/58">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
