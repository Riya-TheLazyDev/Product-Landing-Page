import { useCallback, useEffect, useState } from "react";
import { productService, ProductQueryParams } from "@/services/productService";
import { Product } from "@/data/products";

export function useProducts(params?: ProductQueryParams) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await productService.getProducts(params);
    if (res.success && res.data) {
      setProducts(res.data);
    } else {
      setError(res.error || "Failed to load products");
      setProducts([]);
    }
    setLoading(false);
  }, [params?.category, params?.featured, params?.status, params?.search, params?.limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

export default useProducts;
