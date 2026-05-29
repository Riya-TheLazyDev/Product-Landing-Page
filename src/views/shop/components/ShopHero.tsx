"use client";

import PageHero from "@/components/layouts/PageHero";
import heroImage from "@/assets/Shop_Hero.png";
import { useMedia } from "@/hooks/useMedia";
import { resolveMediaUrl } from "@/services/mediaService";

export default function ShopHero() {
  const { bySection } = useMedia();
  const shopBanner = bySection.shop_hero_background;
  const image = shopBanner?.media_url ? resolveMediaUrl(shopBanner.media_url) : heroImage;

  const shopQuote = shopBanner?.quote_text;
  const quoteSizeClass = shopQuote
    ? shopQuote.length > 180
      ? "text-3xl md:text-4xl"
      : shopQuote.length > 120
        ? "text-4xl md:text-5xl"
        : "text-5xl md:text-6xl"
    : "";

  return (
    <PageHero
      image={image}
      mediaType={shopBanner?.media_type}
      eyebrow="Maison Collection"
      title={
        shopQuote ? (
          <span className={`block leading-tight ${quoteSizeClass}`}>{shopQuote}</span>
        ) : (
          <>
            Fragrances for <span className="text-accent-gold">Every Mood</span>
          </>
        )
      }
      description="Discover extrait compositions staged in liquid light — from mineral rain to resinous warmth, each held in obsidian glass."
    />
  );
}
