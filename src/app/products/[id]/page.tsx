import React from "react";
import { notFound } from "next/navigation";
import { fetchProductByIdServer, fetchProductsServer } from "@/lib/productFetch";
import ProductDetailView from "./ProductDetailView";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProductByIdServer(id);

  if (!product) {
    notFound();
  }

  const allProducts = await fetchProductsServer();
  const relatedProducts = allProducts
    .filter((p) => p.id.toString() !== product.id.toString())
    .sort((a, b) => {
      if (a.category === product.category && b.category !== product.category) return -1;
      if (b.category === product.category && a.category !== product.category) return 1;
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    })
    .slice(0, 6);

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
}
