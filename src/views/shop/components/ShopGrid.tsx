"use client";

import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/common/ProductCard";
import { products } from "@/mock/product";

export default function ShopGrid({ filters }: any) {
  // Use mock products and duplicate them for a fuller grid
  const displayProducts = [...products, ...products, ...products].slice(0, 12);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      <AnimatePresence mode="popLayout">
        {displayProducts.map((product, idx) => (
          <motion.div
            key={`${product.id}-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: (idx % 3) * 0.1 }}
          >
            <ProductCard {...product} id={idx + 1} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
