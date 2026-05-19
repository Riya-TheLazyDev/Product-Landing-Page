import { apiClient, ApiResponse } from "./apiClient";
import type { AuthProfile, AuthRole } from "@/store/authStore";

export const authService = {
  async login(email: string, password: string, role: AuthRole): Promise<ApiResponse<{ profile: AuthProfile; token: string }>> {
    const mockProfile: AuthProfile = {
      id: role === "admin" ? "adm-demo" : "usr-demo",
      name: role === "admin" ? "Elevara Admin" : "Maison Guest",
      email,
      role,
    };
    const mockToken = `jwt-mock-token-${Date.now()}`;
    apiClient.setToken(mockToken);
    
    return apiClient.request<{ profile: AuthProfile; token: string }>(
      "/auth/login",
      { method: "POST", body: JSON.stringify({ email, password, role }) },
      { profile: mockProfile, token: mockToken }
    );
  },

  async register(name: string, email: string): Promise<ApiResponse<{ profile: AuthProfile; token: string }>> {
    const mockProfile: AuthProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: "user",
    };
    const mockToken = `jwt-mock-token-${Date.now()}`;
    apiClient.setToken(mockToken);

    return apiClient.request<{ profile: AuthProfile; token: string }>(
      "/auth/register",
      { method: "POST", body: JSON.stringify({ name, email }) },
      { profile: mockProfile, token: mockToken }
    );
  },

  async logout(): Promise<ApiResponse<{ success: boolean }>> {
    apiClient.setToken(null);
    return apiClient.request<{ success: boolean }>("/auth/logout", { method: "POST" }, { success: true });
  },

  async getCurrentUser(): Promise<ApiResponse<AuthProfile | null>> {
    const token = apiClient.getToken();
    if (!token) return { success: true, data: null };
    
    // Simulate fetching user from JWT token details
    const mockProfile: AuthProfile = {
      id: "usr-demo",
      name: "Maison Guest",
      email: "user@elevara.com",
      role: "user",
    };
    return apiClient.request<AuthProfile | null>("/auth/me", { method: "GET" }, mockProfile);
  },
};

export default authService;
