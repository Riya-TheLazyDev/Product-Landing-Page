"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

type AuthState = {
  profile: AuthProfile | null;
  users: StoredUser[];
  hydrated: boolean;
  login: (email: string, password: string, role: AuthRole) => AuthProfile;
  signup: (name: string, email: string, password: string) => AuthProfile;
  logout: () => void;
  setHydrated: () => void;
};

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
    document.cookie =
      "elevara-auth=; path=/; max-age=0; SameSite=Lax";
    document.cookie =
      "elevara-role=; path=/; max-age=0; SameSite=Lax";
    return;
  }
  document.cookie = `elevara-auth=${profile.id}; path=/; max-age=2592000; SameSite=Lax`;
  document.cookie = `elevara-role=${profile.role}; path=/; max-age=2592000; SameSite=Lax`;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      profile: null,
      users: demoUsers,
      hydrated: false,

      setHydrated: () => set({ hydrated: true }),

      login: (email, password, role) => {
        const normalized = email.trim().toLowerCase();
        const profile = get().users.find(
          (u) =>
            u.email.toLowerCase() === normalized &&
            u.password === password &&
            u.role === role
        );
        if (!profile) {
          throw new Error(
            role === "admin"
              ? "Admin credentials were not recognized."
              : "Email or password is incorrect."
          );
        }
        const session: AuthProfile = {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role,
        };
        syncAuthCookie(session);
        set({ profile: session, hydrated: true });
        return session;
      },

      signup: (name, email, password) => {
        const normalized = email.trim().toLowerCase();
        if (get().users.some((u) => u.email.toLowerCase() === normalized)) {
          throw new Error("An account already exists for this email.");
        }
        const session: AuthProfile = {
          id: `usr-${Date.now()}`,
          name: name.trim() || "Elevara Client",
          email: normalized,
          role: "user",
        };
        const row: StoredUser = { ...session, password };
        syncAuthCookie(session);
        set((s) => ({ users: [...s.users, row], profile: session, hydrated: true }));
        return session;
      },

      logout: () => {
        syncAuthCookie(null);
        set({ profile: null, hydrated: true });
      },
    }),
    {
      name: "elevara-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        profile: s.profile,
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
        return {
          ...current,
          ...p,
          users: mergedUsers,
          profile: p.profile ?? null,
          hydrated: true,
        };
      },
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    }
  )
);
