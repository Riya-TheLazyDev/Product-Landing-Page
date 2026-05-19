export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.elevara.com/v1";
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("elevara-auth-token");
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("elevara-auth-token", token);
      } else {
        localStorage.removeItem("elevara-auth-token");
      }
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    return headers;
  }

  // Simulated request wrapper with API latency simulator
  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    mockResponse?: T
  ): Promise<ApiResponse<T>> {
    const simulateLatency = () => new Promise((resolve) => setTimeout(resolve, 250));
    await simulateLatency();

    // In a real-world system, we would perform:
    // try {
    //   const response = await fetch(`${this.baseUrl}${endpoint}`, {
    //     ...options,
    //     headers: { ...this.getHeaders(), ...options.headers },
    //   });
    //   const result = await response.json();
    //   if (!response.ok) throw new Error(result.message || "Request failed");
    //   return { success: true, data: result };
    // } catch (err: any) {
    //   return { success: false, error: err.message };
    // }

    // Returning simulated mock data with structured format:
    try {
      if (mockResponse !== undefined) {
        return {
          success: true,
          data: mockResponse,
          message: "Operation completed successfully (Simulated API)",
        };
      }
      throw new Error("No mock response provided for offline API client");
    } catch (err: any) {
      return {
        success: false,
        error: err.message || "An unknown network error occurred",
      };
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;
