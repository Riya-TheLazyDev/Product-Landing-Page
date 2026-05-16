"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore, type AuthRole } from "@/stores/auth-store";

type Props = {
  role: AuthRole;
  children: React.ReactNode;
};

export default function AuthGate({ role, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const profile = useAuthStore((s) => s.profile);
  const hydrated = useAuthStore((s) => s.hydrated);

  useEffect(() => {
    if (!hydrated) return;
    if (!profile || profile.role !== role) {
      const params = new URLSearchParams({
        mode: role,
        redirect: pathname,
      });
      router.replace(`/login?${params.toString()}`);
    }
  }, [hydrated, pathname, profile, role, router]);

  if (!hydrated || !profile || profile.role !== role) {
    return (
      <div className="cinematic-page flex min-h-screen items-center justify-center pt-20">
        <div className="h-10 w-10 animate-spin rounded-full border border-primary/25 border-t-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
