"use client";

import ProductCollectionsSection from "@/components/common/ProductCollectionsSection";

export default function ProductSection() {
  return (
    <ProductCollectionsSection
      sectionId="shop"
      limit={5}
      showViewAll={false}
      showExploreButton
    />
  );
}
