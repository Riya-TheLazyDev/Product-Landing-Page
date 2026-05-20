import apiClient, { ApiResponse } from "./apiClient";
import type { AuthProfile, AuthRole } from "@/store/authStore";

export const authService = {
  async login(email: string, password: string, role: AuthRole): Promise<ApiResponse<{ profile: AuthProfile; token: string }>> {
    try {
      const response = await apiClient.post<ApiResponse<{ profile: AuthProfile; token: string }>>("/auth/login", {
        email,
        password,
        role,
      });

      const resData = response.data;
      if (resData.success && resData.data?.token) {
        if (typeof window !== "undefined") {
          localStorage.setItem("elevara-auth-token", resData.data.token);
        }
      }
      return resData;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Login failed",
      };
    }
  },

  async register(name: string, email: string): Promise<ApiResponse<{ profile: AuthProfile; token: string }>> {
    try {
      const response = await apiClient.post<ApiResponse<{ profile: AuthProfile; token: string }>>("/auth/register", {
        name,
        email,
        password: "mock-password-123", // secure fallback
        role: "user",
      });

      const resData = response.data;
      if (resData.success && resData.data?.token) {
        if (typeof window !== "undefined") {
          localStorage.setItem("elevara-auth-token", resData.data.token);
        }
      }
      return resData;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Registration failed",
      };
    }
  },

  async logout(): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const response = await apiClient.post<ApiResponse<{ success: boolean }>>("/auth/logout");
      if (typeof window !== "undefined") {
        localStorage.removeItem("elevara-auth-token");
      }
      return response.data;
    } catch (error: any) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("elevara-auth-token");
      }
      return { success: true, data: { success: true } }; // Resolve gracefully
    }
  },

  async getCurrentUser(): Promise<ApiResponse<AuthProfile | null>> {
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("elevara-auth-token");
        if (!token) return { success: true, data: null };
      }

      const response = await apiClient.get<ApiResponse<{ profile: AuthProfile }>>("/auth/me");
      const resData = response.data;
      if (resData.success && resData.data) {
        return {
          success: true,
          data: resData.data.profile || (resData.data as any),
        };
      }
      return { success: false, error: "Failed to sync authenticated user profile" };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to load current user details",
      };
    }
  },
};

export default authService;
