"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products, type Product } from "@/mock/product";
import CollectionProductCard from "@/components/common/CollectionProductCard";

type Props = {
  sectionId?: string;
  /** Max products to show (home: 5) */
  limit?: number;
  /** Product list override */
  items?: Product[];
  showViewAll?: boolean;
  showExploreButton?: boolean;
  embedded?: boolean;
  children?: ReactNode;
};

export default function ProductCollectionsSection({
  sectionId = "shop",
  limit,
  items,
  showViewAll = true,
  showExploreButton = false,
  embedded = false,
  children,
}: Props) {
  const list = items ?? (limit != null ? products.slice(0, limit) : products);

  const inner = (
    <>
      <div className="collection-section__header">
        <div>
          <span className="subtitle-luxury mb-4 block text-left">
            Our Collections
          </span>
          <h2 className="heading-section text-left">
            Fragrances for{" "}
            <span className="text-mood-gradient">Every Mood</span>
          </h2>
        </div>
        {showViewAll ? (
          <Link href="/shop" className="collection-section__view-all">
            View All Collections
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        ) : null}
      </div>

      <div className="collection-panel">
        {children ?? (
          <div
            className={
              limit === 5
                ? "collection-grid collection-grid--home"
                : "collection-grid collection-grid--shop"
            }
          >
            {list.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.75,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <CollectionProductCard {...product} glowIndex={idx} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {showExploreButton ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="mt-12 flex justify-center md:mt-14"
        >
          <Link href="/shop" className="btn-liquid px-12 py-4 text-[10px] tracking-[0.34em]">
            Explore All Collection
          </Link>
        </motion.div>
      ) : null}
    </>
  );

  if (embedded) {
    return <div className="collection-section collection-section--embedded">{inner}</div>;
  }

  return (
    <section
      id={sectionId}
      className="cinematic-section cinematic-section--a collection-section section-padding relative overflow-hidden"
    >
      <div className="environment-scene environment-scene--waterfall" />
      <div className="container-page relative z-10">{inner}</div>
    </section>
  );
}
