"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CollectionProductCard from "@/components/common/CollectionProductCard";
import { useProducts } from "@/hooks/useProducts";
import { toCollectionCardProps } from "@/lib/productMapper";

type ShopFilters = {
  category?: string;
};

export default function ShopGrid({
  filters,
  onCountChange,
}: {
  filters?: ShopFilters;
  onCountChange?: (count: number) => void;
}) {
  const category =
    filters?.category && filters.category !== "All" ? filters.category : undefined;

  const { products, loading, error } = useProducts(
    category ? { category } : undefined
  );

  useEffect(() => {
    if (!loading) onCountChange?.(products.length);
  }, [loading, products.length, onCountChange]);

  if (loading) {
    return (
      <div className="collection-grid collection-grid--shop">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="collection-card h-[320px] animate-pulse rounded-2xl bg-white/[0.03] border border-white/[0.05]"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-sm text-white/50 py-12">
        {error}
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-sm text-white/50 py-12">
        No products available at the moment.
      </p>
    );
  }

  return (
    <div className="collection-grid collection-grid--shop">
      <AnimatePresence mode="popLayout">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: (idx % 4) * 0.05 }}
          >
            <CollectionProductCard {...toCollectionCardProps(product)} glowIndex={idx} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
