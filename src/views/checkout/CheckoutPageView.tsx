"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import CartTrustStrip from "@/components/cart/CartTrustStrip";
import CheckoutOrderSummary from "@/components/checkout/CheckoutOrderSummary";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import { computeCartTotals } from "@/lib/cart-totals";
import { validateCheckoutStep, type FieldErrors } from "@/lib/checkout-validation";
import { useCartStore } from "@/stores/cart-store";

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "District of Columbia",
] as const;

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "France",
  "United Arab Emirates",
] as const;

const PRIMARY_LABELS = [
  "Continue to shipping",
  "Continue to payment",
  "Continue to review",
  "Place order",
] as const;

function formatCardNumber(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 19);
  return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-[10px] uppercase tracking-[0.35em] text-white/40 font-bold"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-[10px] text-red-400/90 tracking-wide">{error}</p>
      ) : null}
    </div>
  );
}

export default function CheckoutPageView() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const checkoutStep = useCartStore((s) => s.checkoutStep);
  const checkoutDraft = useCartStore((s) => s.checkoutDraft);
  const setCheckoutStep = useCartStore((s) => s.setCheckoutStep);
  const updateCheckoutDraft = useCartStore((s) => s.updateCheckoutDraft);
  const placeOrder = useCartStore((s) => s.placeOrder);
  const showToast = useCartStore((s) => s.showToast);

  const [hydrated, setHydrated] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const unsub = useCartStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );
    if (useCartStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (items.length === 0) router.replace("/cart");
  }, [hydrated, items.length, router]);

  const totals = useMemo(() => computeCartTotals(items), [items]);

  const tryAdvance = useCallback(() => {
    const errs = validateCheckoutStep(checkoutStep, checkoutDraft);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return false;
    if (checkoutStep < 3) {
      setCheckoutStep(checkoutStep + 1);
      setFieldErrors({});
      return true;
    }
    return true;
  }, [checkoutDraft, checkoutStep, setCheckoutStep]);

  const handlePrimary = async () => {
    if (checkoutStep < 3) {
      tryAdvance();
      return;
    }
    if (!termsAccepted) {
      setFieldErrors({ terms: "Please confirm to place your order." });
      return;
    }
    setFieldErrors({});
    setBusy(true);
    await new Promise((r) => setTimeout(r, 900));
    placeOrder();
    setBusy(false);
    router.push("/");
  };

  const handleExpress = () => {
    showToast("Express checkout — Apple Pay & more — arriving soon.");
  };

  const d = checkoutDraft;

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#03040a] pt-32 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border border-primary/30 border-t-primary" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#03040a] pt-32 flex items-center justify-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
          Returning to cart…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#03040a] pt-28 pb-24 px-4 md:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(214,195,165,0.07),transparent)] pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#070b18]/90 via-[#03040a] to-[#020205] pointer-events-none" />

      <div className="container-page">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-primary transition-colors mb-10 group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to cart
        </Link>

        <header className="mb-12 max-w-3xl">
          <p className="subtitle-luxury mb-4">Elevāra · Maison</p>
          <h1 className="title-luxury text-4xl sm:text-5xl md:text-6xl text-white mb-5">
            Checkout
          </h1>
          <p className="text-editorial text-[10px] sm:text-xs uppercase tracking-[0.35em]">
            Complete your order and experience luxury.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] xl:gap-16 items-start">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-[rgba(6,8,14,0.55)] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
          >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />
            <div className="relative px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
              <CheckoutStepper activeStep={checkoutStep} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={checkoutStep}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  {checkoutStep === 0 && (
                    <div className="space-y-8">
                      <h2 className="font-serif text-2xl text-white tracking-wide">
                        Contact information
                      </h2>
                      <Field id="email" label="Email address" error={fieldErrors.email}>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          value={d.email}
                          onChange={(e) =>
                            updateCheckoutDraft({ email: e.target.value })
                          }
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
                          placeholder="you@example.com"
                        />
                      </Field>
                      <Field
                        id="fullName"
                        label="Full name"
                        error={fieldErrors.fullName}
                      >
                        <input
                          id="fullName"
                          autoComplete="name"
                          value={d.fullName}
                          onChange={(e) =>
                            updateCheckoutDraft({ fullName: e.target.value })
                          }
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
                          placeholder="As shown on your identification"
                        />
                      </Field>
                      <Field id="phone" label="Phone number" error={fieldErrors.phone}>
                        <input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          value={d.phone}
                          onChange={(e) =>
                            updateCheckoutDraft({ phone: e.target.value })
                          }
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
                          placeholder="+1 (555) 000-0000"
                        />
                      </Field>
                      <label className="flex cursor-pointer items-start gap-3 pt-2">
                        <input
                          type="checkbox"
                          checked={d.saveInfo}
                          onChange={(e) =>
                            updateCheckoutDraft({ saveInfo: e.target.checked })
                          }
                          className="mt-1 h-3.5 w-3.5 rounded border border-white/20 bg-transparent text-primary focus:ring-primary/40"
                        />
                        <span className="text-[11px] leading-relaxed text-white/45 tracking-wide">
                          Save this information for next time
                        </span>
                      </label>
                    </div>
                  )}

                  {checkoutStep === 1 && (
                    <div className="space-y-8">
                      <h2 className="font-serif text-2xl text-white tracking-wide">
                        Shipping address
                      </h2>
                      <Field
                        id="address"
                        label="Street address"
                        error={fieldErrors.address}
                      >
                        <input
                          id="address"
                          autoComplete="street-address"
                          value={d.address}
                          onChange={(e) =>
                            updateCheckoutDraft({ address: e.target.value })
                          }
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
                          placeholder="Line 1"
                        />
                      </Field>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field id="city" label="City" error={fieldErrors.city}>
                          <input
                            id="city"
                            autoComplete="address-level2"
                            value={d.city}
                            onChange={(e) =>
                              updateCheckoutDraft({ city: e.target.value })
                            }
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
                          />
                        </Field>
                        <Field
                          id="state"
                          label="State / province"
                          error={fieldErrors.state}
                        >
                          <select
                            id="state"
                            value={d.state}
                            onChange={(e) =>
                              updateCheckoutDraft({ state: e.target.value })
                            }
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
                          >
                            <option value="">Select</option>
                            {US_STATES.map((s) => (
                              <option key={s} value={s} className="bg-[#0a0c14]">
                                {s}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field id="zip" label="ZIP / postal code" error={fieldErrors.zip}>
                          <input
                            id="zip"
                            autoComplete="postal-code"
                            value={d.zip}
                            onChange={(e) =>
                              updateCheckoutDraft({ zip: e.target.value })
                            }
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
                          />
                        </Field>
                        <Field
                          id="country"
                          label="Country"
                          error={fieldErrors.country}
                        >
                          <select
                            id="country"
                            value={d.country}
                            onChange={(e) =>
                              updateCheckoutDraft({ country: e.target.value })
                            }
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
                          >
                            {COUNTRIES.map((c) => (
                              <option key={c} value={c} className="bg-[#0a0c14]">
                                {c}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>
                    </div>
                  )}

                  {checkoutStep === 2 && (
                    <div className="space-y-8">
                      <h2 className="font-serif text-2xl text-white tracking-wide">
                        Payment
                      </h2>
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          checked={d.billingSameAsShipping}
                          onChange={(e) =>
                            updateCheckoutDraft({
                              billingSameAsShipping: e.target.checked,
                            })
                          }
                          className="mt-1 h-3.5 w-3.5 rounded border border-white/20 bg-transparent text-primary focus:ring-primary/40"
                        />
                        <span className="text-[11px] leading-relaxed text-white/45 tracking-wide">
                          Billing address matches shipping
                        </span>
                      </label>
                      <Field
                        id="cardName"
                        label="Name on card"
                        error={fieldErrors.cardName}
                      >
                        <input
                          id="cardName"
                          autoComplete="cc-name"
                          value={d.cardName}
                          onChange={(e) =>
                            updateCheckoutDraft({ cardName: e.target.value })
                          }
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
                        />
                      </Field>
                      <Field
                        id="cardNumber"
                        label="Card number"
                        error={fieldErrors.cardNumber}
                      >
                        <input
                          id="cardNumber"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          value={d.cardNumber}
                          onChange={(e) =>
                            updateCheckoutDraft({
                              cardNumber: formatCardNumber(e.target.value),
                            })
                          }
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25 tracking-widest"
                          placeholder="0000 0000 0000 0000"
                        />
                      </Field>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field
                          id="cardExpiry"
                          label="Expiry (MM / YY)"
                          error={fieldErrors.cardExpiry}
                        >
                          <input
                            id="cardExpiry"
                            autoComplete="cc-exp"
                            value={d.cardExpiry}
                            onChange={(e) =>
                              updateCheckoutDraft({
                                cardExpiry: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
                            placeholder="MM / YY"
                          />
                        </Field>
                        <Field id="cardCvc" label="Security code" error={fieldErrors.cardCvc}>
                          <input
                            id="cardCvc"
                            autoComplete="cc-csc"
                            value={d.cardCvc}
                            onChange={(e) =>
                              updateCheckoutDraft({
                                cardCvc: e.target.value.replace(/\D/g, "").slice(0, 4),
                              })
                            }
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
                            placeholder="CVC"
                          />
                        </Field>
                      </div>
                    </div>
                  )}

                  {checkoutStep === 3 && (
                    <div className="space-y-8">
                      <h2 className="font-serif text-2xl text-white tracking-wide">
                        Review
                      </h2>
                      <div className="grid gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-sm">
                        <div className="flex justify-between gap-4 text-white/45">
                          <span>Email</span>
                          <span className="text-white/85 text-right">{d.email}</span>
                        </div>
                        <div className="flex justify-between gap-4 text-white/45">
                          <span>Ship to</span>
                          <span className="text-white/85 text-right max-w-[60%]">
                            {d.fullName}
                            <br />
                            {d.address}
                            <br />
                            {d.city}, {d.state} {d.zip}
                            <br />
                            {d.country}
                          </span>
                        </div>
                        <div className="flex justify-between gap-4 text-white/45">
                          <span>Phone</span>
                          <span className="text-white/85">{d.phone}</span>
                        </div>
                        <div className="flex justify-between gap-4 text-white/45">
                          <span>Card</span>
                          <span className="text-white/85 tracking-widest">
                            {d.cardNumber.replace(/\s/g, "").length >= 4
                              ? `···· ${d.cardNumber.replace(/\s/g, "").slice(-4)}`
                              : "—"}
                          </span>
                        </div>
                      </div>
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => {
                            setTermsAccepted(e.target.checked);
                            if (e.target.checked) setFieldErrors({});
                          }}
                          className="mt-1 h-3.5 w-3.5 rounded border border-white/20 bg-transparent text-primary focus:ring-primary/40"
                        />
                        <span className="text-[11px] leading-relaxed text-white/45 tracking-wide">
                          I confirm my details are accurate and agree to the maison
                          terms of service.
                        </span>
                      </label>
                      {fieldErrors.terms ? (
                        <p className="text-[10px] text-red-400/90">{fieldErrors.terms}</p>
                      ) : null}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-10">
                <button
                  type="button"
                  disabled={checkoutStep === 0 || busy}
                  onClick={() => {
                    setCheckoutStep(checkoutStep - 1);
                    setFieldErrors({});
                  }}
                  className="text-[10px] uppercase tracking-[0.35em] text-white/35 transition-colors hover:text-primary disabled:opacity-25"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void handlePrimary()}
                  className="shine-sweep rounded-full border border-primary/35 bg-primary/10 px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.32em] text-primary transition-all duration-700 hover:bg-primary/15 hover:shadow-[0_0_40px_-12px_rgba(214,195,165,0.35)] disabled:opacity-40 lg:hidden"
                >
                  {checkoutStep >= 3
                    ? PRIMARY_LABELS[3]
                    : PRIMARY_LABELS[checkoutStep]}
                </button>
              </div>
            </div>
          </motion.section>

          <CheckoutOrderSummary
            totals={totals}
            step={checkoutStep}
            primaryLabel={
              checkoutStep === 0
                ? "Continue to shipping"
                : checkoutStep === 1
                  ? "Continue to payment"
                  : checkoutStep === 2
                    ? "Continue to review"
                    : "Place order"
            }
            onPrimary={() => void handlePrimary()}
            busy={busy}
            primaryDisabled={items.length === 0}
            onExpress={handleExpress}
          />
        </div>

        <CartTrustStrip />
      </div>
    </div>
  );
}
