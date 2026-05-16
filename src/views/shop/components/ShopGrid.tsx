"use client";

import { motion, AnimatePresence } from "framer-motion";
import CollectionProductCard from "@/components/common/CollectionProductCard";
import { products } from "@/mock/product";

export default function ShopGrid({ filters }: { filters?: unknown }) {
  void filters;
  const displayProducts = [...products, ...products].slice(0, 12);

  return (
    <div className="collection-grid collection-grid--shop">
      <AnimatePresence mode="popLayout">
        {displayProducts.map((product, idx) => (
          <motion.div
            key={`${product.id}-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: (idx % 4) * 0.05 }}
          >
            <CollectionProductCard {...product} glowIndex={idx} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
