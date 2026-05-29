"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import CartTrustStrip from "@/components/cart/CartTrustStrip";
import AuthGate from "@/components/auth/AuthGate";
import CheckoutContactProfiles from "@/components/checkout/CheckoutContactProfiles";
import CheckoutOrderSummary from "@/components/checkout/CheckoutOrderSummary";
import CheckoutPaymentMethods from "@/components/checkout/CheckoutPaymentMethods";
import CheckoutShippingAddresses from "@/components/checkout/CheckoutShippingAddresses";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import { computeCartTotals } from "@/lib/cart-totals";
import { validateCheckoutStep, type FieldErrors } from "@/lib/checkout-validation";
import { useCartStore } from "@/stores/cart-store";
import { orderService } from "@/services/orderService";

const PRIMARY_LABELS = [
  "Continue to shipping",
  "Continue to payment",
  "Continue to review",
  "Place order",
] as const;

export default function CheckoutPageView() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const checkoutStep = useCartStore((s) => s.checkoutStep);
  const checkoutDraft = useCartStore((s) => s.checkoutDraft);
  const selectedAddressId = useCartStore((s) => s.selectedAddressId);
  const selectedContactId = useCartStore((s) => s.selectedContactId);
  const selectedPaymentId = useCartStore((s) => s.selectedPaymentId);
  const savedPaymentMethods = useCartStore((s) => s.savedPaymentMethods);
  const setCheckoutStep = useCartStore((s) => s.setCheckoutStep);
  const clearCart = useCartStore((s) => s.clearCart);
  const resetCheckoutSession = useCartStore((s) => s.resetCheckoutSession);
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
    const fallback = window.setTimeout(() => setHydrated(true), 250);
    return () => {
      window.clearTimeout(fallback);
      unsub();
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (items.length === 0) router.replace("/cart");
  }, [hydrated, items.length, router]);

  const totals = useMemo(() => computeCartTotals(items), [items]);

  const cardReviewLine = useMemo(() => {
    const digits = checkoutDraft.cardNumber.replace(/\s/g, "");
    if (digits.length >= 4) {
      return `···· ${digits.slice(-4)}`;
    }
    if (selectedPaymentId) {
      const m = savedPaymentMethods.find((x) => x.id === selectedPaymentId);
      if (m?.last4) return `···· ${m.last4}`;
    }
    return "—";
  }, [
    checkoutDraft.cardNumber,
    selectedPaymentId,
    savedPaymentMethods,
  ]);

  const deliveryPreview = useMemo(() => {
    if (!checkoutDraft.address?.trim()) return undefined;
    return `${checkoutDraft.fullName} · ${checkoutDraft.city}, ${checkoutDraft.state} ${checkoutDraft.zip}`;
  }, [
    checkoutDraft.address,
    checkoutDraft.city,
    checkoutDraft.fullName,
    checkoutDraft.state,
    checkoutDraft.zip,
  ]);

  const tryAdvance = useCallback(() => {
    let errs: FieldErrors;
    if (checkoutStep === 1) {
      errs = {
        ...validateCheckoutStep(0, checkoutDraft),
        ...validateCheckoutStep(1, checkoutDraft),
      };
    } else {
      errs = validateCheckoutStep(checkoutStep, checkoutDraft);
    }
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

    const paymentMethod =
      checkoutDraft.cardNumber.replace(/\s/g, "").length >= 4 || selectedPaymentId
        ? "Card"
        : "COD";

    const res = await orderService.createOrder({
      items: items.map((line) => ({
        productId: line.productId,
        quantity: line.quantity,
      })),
      shippingAddress: {
        full_name: checkoutDraft.fullName.trim(),
        phone: checkoutDraft.phone.trim(),
        address_line_1: checkoutDraft.address.trim(),
        address_line_2: "",
        city: checkoutDraft.city.trim(),
        state: checkoutDraft.state.trim(),
        postal_code: checkoutDraft.zip.trim(),
        country: checkoutDraft.country.trim() || "India",
      },
      paymentMethod,
      idempotencyKey:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `order-${Date.now()}`,
      saveAddress: checkoutDraft.saveInfo,
    });

    setBusy(false);

    if (!res.success) {
      setFieldErrors({
        terms: res.error || "Could not place your order. Please try again.",
      });
      return;
    }

    clearCart();
    resetCheckoutSession();
    showToast("Merci — your Elevāra order is confirmed.");
    router.push("/orders");
  };

  const handleExpress = () => {
    showToast("Express checkout — Apple Pay & more — arriving soon.");
  };

  const d = checkoutDraft;

  if (!hydrated) {
    return (
      <div className="cinematic-page min-h-screen pt-32 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border border-primary/30 border-t-primary" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cinematic-page min-h-screen pt-32 flex items-center justify-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
          Returning to cart…
        </p>
      </div>
    );
  }

  return (
    <AuthGate role="user">
    <div className="cinematic-page cinematic-section cinematic-section--b min-h-screen pb-24 pt-28">
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
                    <CheckoutContactProfiles
                      fieldErrors={fieldErrors}
                      setFieldErrors={setFieldErrors}
                    />
                  )}

                  {checkoutStep === 1 && (
                    <CheckoutShippingAddresses
                      fieldErrors={fieldErrors}
                      setFieldErrors={setFieldErrors}
                    />
                  )}

                  {checkoutStep === 2 && (
                    <CheckoutPaymentMethods
                      fieldErrors={fieldErrors}
                      setFieldErrors={setFieldErrors}
                    />
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
                        {selectedContactId ? (
                          <div className="flex justify-between gap-4 text-white/45">
                            <span>Contact profile</span>
                            <span className="text-right text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
                              Maison saved
                            </span>
                          </div>
                        ) : null}
                        {selectedAddressId ? (
                          <div className="flex justify-between gap-4 text-white/45">
                            <span>Delivery profile</span>
                            <span className="text-right text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
                              Maison saved
                            </span>
                          </div>
                        ) : null}
                        {selectedPaymentId ? (
                          <div className="flex justify-between gap-4 text-white/45">
                            <span>Payment profile</span>
                            <span className="text-right text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
                              Maison saved
                            </span>
                          </div>
                        ) : null}
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
                            {cardReviewLine}
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
            deliveryPreview={deliveryPreview}
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
    </AuthGate>
  );
}
