"use client";

import PageHero from "@/components/layouts/PageHero";
import heroImage from "@/assets/Shop_Hero.png";

export default function ShopHero() {
  return (
    <PageHero
      image={heroImage}
      eyebrow="Maison Collection"
      title={
        <>
          Fragrances for <span className="text-accent-gold">Every Mood</span>
        </>
      }
      description="Discover extrait compositions staged in liquid light — from mineral rain to resinous warmth, each held in obsidian glass."
    />
  );
}
