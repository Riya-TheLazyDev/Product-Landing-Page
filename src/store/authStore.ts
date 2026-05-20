import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import apiClient from "@/services/apiClient";

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

      setHydrated: () => set({ hydrated: true }),

      setUser: (profile) => {
        syncAuthCookie(profile);
        set({
          profile,
          role: profile?.role || null,
          isAuthenticated: !!profile,
        });
      },

      setToken: (token) => set({ token }),

      clearAuth: () => {
        syncAuthCookie(null);
        syncAuthToken(null);
        set({
          profile: null,
          token: null,
          role: null,
          isAuthenticated: false,
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

          syncAuthCookie(session);
          syncAuthToken(data.token);
          set({
            profile: session,
            token: data.token,
            role: session.role,
            isAuthenticated: true,
            loading: false,
          });
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
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              const normalized = email.trim().toLowerCase();
              if (get().users.some((u) => u.email.toLowerCase() === normalized)) {
                const errMsg = "An account already exists for this email.";
                set({ error: errMsg, loading: false });
                reject(new Error(errMsg));
                return;
              }
              const session: AuthProfile = {
                id: `usr-${Date.now()}`,
                name: name.trim() || "Elevara Client",
                email: normalized,
                role: "user",
              };
              const row: StoredUser = { ...session, password };
              const mockToken = `jwt-mock-token-${Date.now()}`;
              syncAuthCookie(session);
              syncAuthToken(mockToken);
              set((s) => ({
                users: [...s.users, row],
                profile: session,
                token: mockToken,
                role: "user",
                isAuthenticated: true,
                loading: false,
              }));
              resolve(session);
            } catch (err: any) {
              set({ error: err.message || "Signup failed", loading: false });
              reject(err);
            }
          }, 400);
        });
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
        return {
          ...current,
          ...p,
          users: mergedUsers,
          profile: p.profile ?? null,
          token: p.token ?? null,
          role: p.role ?? null,
          isAuthenticated: p.isAuthenticated ?? false,
          hydrated: true,
        };
      },
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    }
  )
);
