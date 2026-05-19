import { apiClient, ApiResponse } from "./apiClient";
import { PRODUCTS, Product } from "@/data/products";

export const productService = {
  async getProducts(): Promise<ApiResponse<Product[]>> {
    return apiClient.request<Product[]>("/products", { method: "GET" }, PRODUCTS);
  },

  async getProductById(id: string | number): Promise<ApiResponse<Product>> {
    const found = PRODUCTS.find((p) => p.id.toString() === id.toString());
    if (found) {
      return apiClient.request<Product>(`/products/${id}`, { method: "GET" }, found);
    }
    return { success: false, error: `Product with ID ${id} not found` };
  },

  async createProduct(product: Omit<Product, "id">): Promise<ApiResponse<Product>> {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    // Simulate updating central state or sending to DB
    return apiClient.request<Product>("/products", { method: "POST" }, newProduct);
  },

  async updateProduct(id: string | number, updates: Partial<Product>): Promise<ApiResponse<Product>> {
    const found = PRODUCTS.find((p) => p.id.toString() === id.toString());
    if (found) {
      const updated = { ...found, ...updates };
      return apiClient.request<Product>(`/products/${id}`, { method: "PUT" }, updated);
    }
    return { success: false, error: `Product with ID ${id} not found` };
  },

  async deleteProduct(id: string | number): Promise<ApiResponse<{ id: string | number }>> {
    return apiClient.request<{ id: string | number }>(
      `/products/${id}`,
      { method: "DELETE" },
      { id }
    );
  },
};

export default productService;
