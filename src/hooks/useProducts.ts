import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import { Product } from "@/data/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productService
      .getProducts()
      .then((res) => {
        if (res.success && res.data) {
          setProducts(res.data);
        } else {
          setError(res.error || "Failed to load products");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load products");
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
}
export default useProducts;
