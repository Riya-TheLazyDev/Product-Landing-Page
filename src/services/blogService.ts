import apiClient, { ApiResponse } from "./apiClient";
import { Blog } from "@/data/blogs";

export const blogService = {
  async getBlogs(): Promise<ApiResponse<Blog[]>> {
    try {
      const response = await apiClient.get<ApiResponse<Blog[]>>("/blogs");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to load blogs",
      };
    }
  },

  async getBlogBySlug(slug: string): Promise<ApiResponse<Blog>> {
    try {
      const response = await apiClient.get<ApiResponse<Blog>>(`/blogs/${slug}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || `Failed to fetch blog post ${slug}`,
      };
    }
  },

  async createBlog(blog: Omit<Blog, "id">): Promise<ApiResponse<Blog>> {
    try {
      const response = await apiClient.post<ApiResponse<Blog>>("/blogs", blog);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to create blog post",
      };
    }
  },
};

export default blogService;
