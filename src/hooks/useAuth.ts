import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const { profile, users, hydrated, login, signup, logout } = useAuthStore();

  return {
    user: profile,
    role: profile?.role || null,
    isAdmin: profile?.role === "admin",
    isAuthenticated: !!profile,
    users,
    hydrated,
    login,
    signup,
    logout,
  };
}
export default useAuth;
