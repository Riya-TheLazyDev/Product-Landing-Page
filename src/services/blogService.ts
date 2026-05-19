import { apiClient, ApiResponse } from "./apiClient";
import { BLOGS, Blog } from "@/data/blogs";

export const blogService = {
  async getBlogs(): Promise<ApiResponse<Blog[]>> {
    return apiClient.request<Blog[]>("/blogs", { method: "GET" }, BLOGS);
  },

  async getBlogBySlug(slug: string): Promise<ApiResponse<Blog>> {
    const found = BLOGS.find((b) => b.id === slug || b.title.toLowerCase().replace(/ /g, "-") === slug);
    if (found) {
      return apiClient.request<Blog>(`/blogs/${slug}`, { method: "GET" }, found);
    }
    return { success: false, error: `Blog post with slug/id ${slug} not found` };
  },

  async createBlog(blog: Omit<Blog, "id">): Promise<ApiResponse<Blog>> {
    const newBlog: Blog = {
      ...blog,
      id: Date.now().toString(),
    };
    return apiClient.request<Blog>("/blogs", { method: "POST" }, newBlog);
  },
};

export default blogService;
