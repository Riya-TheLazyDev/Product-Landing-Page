import apiClient, { ApiResponse } from "./apiClient";
import { getApiBaseUrl } from "@/lib/apiConfig";

export type MediaType = "image" | "video";

export interface MediaAsset {
  id: number;
  section_key: string;
  title: string;
  media_type: MediaType | null;
  media_url: string | null;
  quote_text: string | null;
  quote_author: string | null;
  created_at?: string;
  updated_at?: string;
}

export const MEDIA_SECTIONS = [
  { section_key: "website_favicon", title: "Website Favicon", supportsQuote: true },
  { section_key: "hero_background", title: "Hero Background", supportsQuote: true },
  { section_key: "story_media_1", title: "Story Media 1", supportsQuote: true },
  { section_key: "story_media_2", title: "Story Media 2", supportsQuote: true },
  { section_key: "shop_hero_background", title: "Shop Page Hero Background", supportsQuote: true },
  { section_key: "blog_hero", title: "Blog Hero", supportsQuote: true },
  { section_key: "loading_screen_logo", title: "Loading Screen Logo", supportsQuote: true },
  { section_key: "website_logo", title: "Website Logo", supportsQuote: true },
  { section_key: "login_media", title: "Login Page Media", supportsQuote: true },
] as const;

export const getMediaOrigin = () => getApiBaseUrl().replace(/\/api$/i, "");

export const resolveMediaUrl = (mediaUrl?: string | null, fallback = "") => {
  if (!mediaUrl) return fallback;
  if (/^https?:\/\//i.test(mediaUrl)) return mediaUrl;
  if (mediaUrl.startsWith("/uploads/")) return `${getMediaOrigin()}${mediaUrl}`;
  return mediaUrl;
};

const uploadRequest = async (url: string, formData: FormData, method: "post" | "put") => {
  const response = await apiClient.request<ApiResponse<MediaAsset>>({
    url,
    method,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return response.data;
};

export const mediaService = {
  async getMedia(): Promise<ApiResponse<MediaAsset[]>> {
    try {
      const response = await apiClient.get<ApiResponse<MediaAsset[]>>("/media");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to load media assets",
      };
    }
  },

  async uploadMedia(
    sectionKey: string,
    file: File,
    quote?: { quote_text?: string; quote_author?: string }
  ): Promise<ApiResponse<MediaAsset>> {
    try {
      const formData = new FormData();
      formData.append("section_key", sectionKey);
      formData.append("media", file);
      if (quote?.quote_text !== undefined) formData.append("quote_text", quote.quote_text);
      if (quote?.quote_author !== undefined) formData.append("quote_author", quote.quote_author);
      return await uploadRequest("/media/upload", formData, "post");
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to upload media",
      };
    }
  },

  async updateMedia(
    id: number,
    payload: { file?: File; quote_text?: string; quote_author?: string }
  ): Promise<ApiResponse<MediaAsset>> {
    try {
      if (payload.file) {
        const formData = new FormData();
        formData.append("media", payload.file);
        if (payload.quote_text !== undefined) formData.append("quote_text", payload.quote_text);
        if (payload.quote_author !== undefined) formData.append("quote_author", payload.quote_author);
        return await uploadRequest(`/media/${id}`, formData, "put");
      }

      const response = await apiClient.put<ApiResponse<MediaAsset>>(`/media/${id}`, {
        quote_text: payload.quote_text,
        quote_author: payload.quote_author,
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to update media",
      };
    }
  },

  async clearMedia(id: number): Promise<ApiResponse<MediaAsset>> {
    try {
      const response = await apiClient.delete<ApiResponse<MediaAsset>>(`/media/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to remove media",
      };
    }
  },
};

export default mediaService;
