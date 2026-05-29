"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import { useAuthStore, type AuthRole } from "@/stores/auth-store";
import { useMedia } from "@/hooks/useMedia";
import { resolveMediaUrl } from "@/services/mediaService";

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedMode = searchParams.get("mode");
  const redirect = searchParams.get("redirect");
  const [mode, setMode] = useState<AuthRole>(
    requestedMode === "admin" ? "admin" : "user"
  );
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(
    requestedMode === "admin" ? "admin@elevara.com" : "user@elevara.com"
  );
  const [password, setPassword] = useState(
    requestedMode === "admin" ? "admin123" : "elevara123"
  );
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const login = useAuthStore((s) => s.login);
  const signup = useAuthStore((s) => s.signup);

  const { bySection } = useMedia();
  const loginMedia = bySection.login_media;
  const loginUrl = resolveMediaUrl(loginMedia?.media_url, "/assets/Video.mp4");
  const loginQuote = loginMedia?.quote_text || "Scent held in shadow and light.";
  const quoteSizeClass =
    loginQuote.length > 180
      ? "text-3xl md:text-4xl"
      : loginQuote.length > 120
        ? "text-4xl md:text-5xl"
        : "text-6xl";

  const copy = useMemo(
    () =>
      mode === "admin"
        ? {
            eyebrow: "Admin Atelier",
            title: "Command the maison",
            body: "Secure access for products, orders, customers, content, and campaign intelligence.",
          }
        : {
            eyebrow: "Private Client",
            title: isSignup ? "Create your ritual" : "Return to your ritual",
            body: "Sign in to preserve your cart, wishlist, saved addresses, and order history.",
          },
    [isSignup, mode]
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await new Promise((r) => setTimeout(r, 450));
      const profile =
        isSignup && mode === "user"
          ? await signup(name, email, password)
          : await login(email, password, mode);
      const target =
        profile.role === "admin"
          ? redirect?.startsWith("/admin")
            ? redirect
            : "/admin/dashboard"
          : redirect && !redirect.startsWith("/admin")
            ? redirect
            : "/";
      router.replace(target);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  };

  const switchMode = (nextMode: AuthRole) => {
    setMode(nextMode);
    setIsSignup(false);
    setError("");
    setEmail(nextMode === "admin" ? "admin@elevara.com" : "user@elevara.com");
    setPassword(nextMode === "admin" ? "admin123" : "elevara123");
  };

  return (
    <main className="cinematic-page cinematic-section cinematic-section--b min-h-screen overflow-hidden pt-14">
      <div className="environment-scene environment-scene--rain" />
      <div className="container-page relative z-10 grid min-h-[calc(100vh-3.5rem)] items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden min-h-[680px] overflow-hidden rounded-[2rem] border border-white/[0.06] lg:block"
        >
          {loginMedia?.media_type === "image" ? (
            <img
              src={loginUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-55"
            />
          ) : (
            <video
              src={loginUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-55"
            />
          )}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_44%_at_62%_30%,rgba(195,75,165,0.16),transparent_62%),linear-gradient(180deg,rgba(8,4,18,0.2),rgba(3,1,8,0.92))]" />
          <div className="absolute bottom-10 left-10 right-10">
            <p className="subtitle-luxury mb-5">Elevara · Maison</p>
            <h1 className={`title-luxury mb-6 max-w-xl text-white ${quoteSizeClass}`}>
              {loginQuote}
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-white/62">
              A private portal for orders, saved rituals, and the quiet work of
              a luxury fragrance house.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-liquid glass-shine relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] p-6 sm:p-8 md:p-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_34%_at_50%_0%,rgba(214,195,165,0.09),transparent_64%),radial-gradient(ellipse_80%_36%_at_50%_100%,rgba(140,72,210,0.14),transparent_70%)]" />
          <div className="relative">
            <Link
              href="/"
              className="mb-10 inline-flex text-[10px] font-bold uppercase tracking-[0.42em] text-white/38 transition-colors hover:text-primary"
            >
              Elevara
            </Link>

            <div className="mb-8 flex rounded-full border border-white/[0.08] bg-black/20 p-1">
              {(["user", "admin"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => switchMode(item)}
                    className={`flex-1 rounded-full px-4 py-3 text-[9px] font-bold uppercase tracking-[0.32em] transition-all duration-700 ${
                    mode === item
                      ? "border border-primary/25 bg-primary/12 text-primary shadow-[0_18px_50px_-30px_rgba(214,195,165,0.32)]"
                      : "text-white/42 hover:text-primary"
                  }`}
                >
                  {item === "user" ? "User Login" : "Admin Login"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${mode}-${isSignup}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="subtitle-luxury mb-4">{copy.eyebrow}</p>
                <h2 className="title-luxury mb-5 text-4xl text-white md:text-5xl">
                  {copy.title}
                </h2>
                <p className="mb-9 text-sm leading-relaxed text-white/56">
                  {copy.body}
                </p>

                <form onSubmit={submit} className="space-y-5">
                  {isSignup && mode === "user" ? (
                    <label className="block">
                      <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.34em] text-white/35">
                        Name
                      </span>
                      <span className="relative block">
                        <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" size={15} />
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="auth-input w-full rounded-full border border-white/[0.08] bg-[#070a12]/85 py-4 pl-11 pr-4 text-sm text-white outline-none transition focus:border-primary/40 focus:bg-[#090d17]"
                          placeholder="Your name"
                          required
                        />
                      </span>
                    </label>
                  ) : null}

                  <label className="block">
                    <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.34em] text-white/35">
                      Email
                    </span>
                    <span className="relative block">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" size={15} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="auth-input w-full rounded-full border border-white/[0.08] bg-[#070a12]/85 py-4 pl-11 pr-4 text-sm text-white outline-none transition focus:border-primary/40 focus:bg-[#090d17]"
                        placeholder="name@example.com"
                        required
                      />
                    </span>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.34em] text-white/35">
                      Password
                    </span>
                    <span className="relative block">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" size={15} />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-input w-full rounded-full border border-white/[0.08] bg-[#070a12]/85 py-4 pl-11 pr-12 text-sm text-white outline-none transition focus:border-primary/40 focus:bg-[#090d17]"
                        placeholder="Password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 transition hover:text-primary"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </span>
                  </label>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.22em] text-white/38">
                    <label className="inline-flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="h-3 w-3 accent-primary"
                      />
                      Remember me
                    </label>
                    <button type="button" className="transition hover:text-primary">
                      Forgot password
                    </button>
                  </div>

                  {error ? (
                    <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-xs text-red-200">
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={busy}
                    className="btn-liquid w-full disabled:opacity-55"
                  >
                    {busy
                      ? "Opening..."
                      : mode === "admin"
                        ? "Enter dashboard"
                        : isSignup
                          ? "Create account"
                          : "Login"}
                  </button>
                </form>

                {mode === "user" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignup((v) => !v);
                      setError("");
                    }}
                    className="mt-8 w-full text-center text-[10px] font-bold uppercase tracking-[0.28em] text-white/42 transition hover:text-primary"
                  >
                    {isSignup
                      ? "Already have an account? Login"
                      : "Create a private client account"}
                  </button>
                ) : (
                  <p className="mt-8 text-center text-[10px] uppercase tracking-[0.24em] text-white/30">
                    Admin access is role protected.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="cinematic-page flex min-h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border border-primary/25 border-t-primary" />
        </div>
      }
    >
      <LoginPageInner />
    </Suspense>
  );
}
