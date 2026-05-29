import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import apiClient from "@/services/apiClient";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export type AuthRole = "user" | "admin";

export type AuthProfile = {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
};

type StoredUser = AuthProfile & {
  password: string;
};

interface AuthState {
  // States
  profile: AuthProfile | null;
  token: string | null;
  role: AuthRole | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  users: StoredUser[];
  hydrated: boolean;

  // Actions
  login: (email: string, password: string, role: AuthRole) => Promise<AuthProfile>;
  logout: () => Promise<void>;
  setUser: (profile: AuthProfile | null) => void;
  setToken: (token: string | null) => void;
  clearAuth: () => void;
  setHydrated: () => void;
  signup: (name: string, email: string, password: string) => Promise<AuthProfile>;
}

const demoUsers: StoredUser[] = [
  {
    id: "usr-demo",
    name: "Maison Guest",
    email: "user@elevara.com",
    password: "elevara123",
    role: "user",
  },
  {
    id: "adm-demo",
    name: "Elevara Admin",
    email: "admin@elevara.com",
    password: "admin123",
    role: "admin",
  },
];

function syncAuthCookie(profile: AuthProfile | null) {
  if (typeof document === "undefined") return;
  if (!profile) {
    document.cookie = "elevara-auth=; path=/; max-age=0; SameSite=Lax";
    document.cookie = "elevara-role=; path=/; max-age=0; SameSite=Lax";
    return;
  }
  document.cookie = `elevara-auth=${profile.id}; path=/; max-age=2592000; SameSite=Lax`;
  document.cookie = `elevara-role=${profile.role}; path=/; max-age=2592000; SameSite=Lax`;
}

function syncAuthToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("elevara-auth-token", token);
  } else {
    localStorage.removeItem("elevara-auth-token");
  }
}

function syncUserCommerceSession(profile: AuthProfile | null) {
  if (profile?.id) {
    useCartStore.getState().loadForUser(profile.id);
    useWishlistStore.getState().loadForUser(profile.id);
    return;
  }

  useCartStore.getState().clearSession();
  useWishlistStore.getState().clearSession();
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial States
      profile: null,
      token: null,
      role: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      users: demoUsers,
      hydrated: false,
      activeUserId: null,

      setHydrated: () => set({ hydrated: true }),

      setUser: (profile) => {
        syncAuthCookie(profile);
        set({
          profile,
          role: profile?.role || null,
          isAuthenticated: !!profile,
          activeUserId: profile?.id || null,
        });
        syncUserCommerceSession(profile);
      },

      setToken: (token) => set({ token }),

      clearAuth: () => {
        syncAuthCookie(null);
        syncAuthToken(null);
        syncUserCommerceSession(null);
        set({
          profile: null,
          token: null,
          role: null,
          isAuthenticated: false,
          activeUserId: null,
          error: null,
        });
      },

      login: async (email, password, role) => {
        set({ loading: true, error: null });
        try {
          const response = await apiClient.post<{
            success: boolean;
            token?: string;
            user?: { id: number | string; name: string; email: string; role: AuthRole };
            error?: string;
          }>("/auth/login", { email, password });

          const data = response.data;
          if (!data.success || !data.token || !data.user) {
            const errMsg = data.error || "Email or password is incorrect.";
            set({ error: errMsg, loading: false });
            throw new Error(errMsg);
          }

          if (data.user.role !== role) {
            const errMsg =
              role === "admin"
                ? "Admin credentials were not recognized."
                : "Email or password is incorrect.";
            set({ error: errMsg, loading: false });
            throw new Error(errMsg);
          }

          const session: AuthProfile = {
            id: String(data.user.id),
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
          };

          // First update auth store state so activeUserId becomes available
          set((s) => ({
            profile: session,
            token: data.token,
            role: session.role,
            isAuthenticated: true,
            loading: false,
            activeUserId: session.id,
          }));
          // Then synchronize cart/wishlist with the now‑available user id
          syncAuthCookie(session);
          syncAuthToken(data.token);
          syncUserCommerceSession(session);
          return session;
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : "Login failed";
          set({ error: message, loading: false });
          throw err instanceof Error ? err : new Error(message);
        }
      },

      signup: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await apiClient.post<{
            success: boolean;
            token?: string;
            user?: { id: number | string; name: string; email: string; role: AuthRole };
            error?: string;
          }>("/auth/register", { name, email, password, role: "user" });

          const data = response.data;
          if (!data.success || !data.token || !data.user) {
            const errMsg = data.error || "Registration failed.";
            set({ error: errMsg, loading: false });
            throw new Error(errMsg);
          }

          const session: AuthProfile = {
            id: String(data.user.id),
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
          };

          // Update auth state first
          set((s) => ({
            profile: session,
            token: data.token,
            role: session.role,
            isAuthenticated: true,
            loading: false,
            activeUserId: session.id,
          }));
          // Then sync cart/wishlist
          syncAuthCookie(session);
          syncAuthToken(data.token);
          syncUserCommerceSession(session);
          return session;
        } catch (err: any) {
          const message = err.response?.data?.error || err.message || "Registration failed";
          set({ error: message, loading: false });
          throw new Error(message);
        }
      },

      logout: async () => {
        set({ loading: true });
        return new Promise((resolve) => {
          setTimeout(() => {
            get().clearAuth();
            set({ loading: false });
            resolve();
          }, 300);
        });
      },
    }),
    {
      name: "elevara-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
          profile: s.profile,
          token: s.token,
          role: s.role,
          isAuthenticated: s.isAuthenticated,
          users: s.users,
          activeUserId: s.activeUserId,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<AuthState>;
        const users = Array.isArray(p.users) ? p.users : demoUsers;
        const mergedUsers = [
          ...demoUsers,
          ...users.filter(
            (u) => !demoUsers.some((d) => d.email === u.email)
          ),
        ];
        syncAuthCookie(p.profile ?? null);
        if (p.token) syncAuthToken(p.token);
        syncUserCommerceSession(p.profile ?? null);
        return {
          ...current,
          ...p,
          users: mergedUsers,
          profile: p.profile ?? null,
          token: p.token ?? null,
          role: p.role ?? null,
          isAuthenticated: p.isAuthenticated ?? false,
          activeUserId: p.activeUserId ?? null,
          hydrated: true,
        };
      },
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    }
  )
);
