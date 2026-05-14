"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SavedPaymentCard from "@/components/checkout/SavedPaymentCard";
import { cardDigitsLast4, formatCardNumber } from "@/lib/format-card-number";
import { validateCheckoutStep, type FieldErrors } from "@/lib/checkout-validation";
import { useCartStore } from "@/stores/cart-store";
import type { ReactNode } from "react";

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

type Props = {
  fieldErrors: FieldErrors;
  setFieldErrors: (e: FieldErrors) => void;
};

export default function CheckoutPaymentMethods({
  fieldErrors,
  setFieldErrors,
}: Props) {
  const draft = useCartStore((s) => s.checkoutDraft);
  const updateCheckoutDraft = useCartStore((s) => s.updateCheckoutDraft);
  const savedPaymentMethods = useCartStore((s) => s.savedPaymentMethods);
  const selectedPaymentId = useCartStore((s) => s.selectedPaymentId);
  const selectCheckoutPayment = useCartStore((s) => s.selectCheckoutPayment);
  const clearCheckoutPaymentSelection = useCartStore(
    (s) => s.clearCheckoutPaymentSelection
  );
  const addSavedPaymentMethod = useCartStore((s) => s.addSavedPaymentMethod);
  const updateSavedPaymentMethod = useCartStore((s) => s.updateSavedPaymentMethod);
  const deleteSavedPaymentMethod = useCartStore((s) => s.deleteSavedPaymentMethod);
  const setDefaultSavedPaymentMethod = useCartStore(
    (s) => s.setDefaultSavedPaymentMethod
  );
  const setSelectedPaymentId = useCartStore((s) => s.setSelectedPaymentId);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const autoSelectDoneRef = useRef(false);

  const touchPayment = (patch: Partial<typeof draft>) => {
    clearCheckoutPaymentSelection();
    updateCheckoutDraft(patch);
  };

  useEffect(() => {
    if (savedPaymentMethods.length === 0) {
      autoSelectDoneRef.current = false;
      return;
    }
    if (autoSelectDoneRef.current) return;
    if (selectedPaymentId) {
      autoSelectDoneRef.current = true;
      return;
    }
    const digits = draft.cardNumber.replace(/\s/g, "");
    if (digits.length >= 13) {
      autoSelectDoneRef.current = true;
      return;
    }
    const preferred =
      savedPaymentMethods.find((m) => m.isDefault) ?? savedPaymentMethods[0];
    if (preferred) {
      selectCheckoutPayment(preferred.id);
      autoSelectDoneRef.current = true;
    }
  }, [
    savedPaymentMethods,
    selectedPaymentId,
    draft.cardNumber,
    selectCheckoutPayment,
  ]);

  const d = draft;

  const handleSaveToBook = () => {
    const errs = validateCheckoutStep(2, d);
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    const last4 = cardDigitsLast4(d.cardNumber);
    if (editingId) {
      updateSavedPaymentMethod(editingId, {
        cardName: d.cardName.trim(),
        last4,
        cardExpiry: d.cardExpiry.trim(),
        billingSameAsShipping: d.billingSameAsShipping,
        isDefault: saveAsDefault,
      });
      setEditingId(null);
      setSelectedPaymentId(editingId);
    } else {
      const id = addSavedPaymentMethod({
        cardName: d.cardName.trim(),
        cardNumber: d.cardNumber,
        cardExpiry: d.cardExpiry.trim(),
        billingSameAsShipping: d.billingSameAsShipping,
        isDefault: saveAsDefault,
      });
      if (id) setSelectedPaymentId(id);
    }
    setSaveAsDefault(false);
  };

  const handleAddNew = () => {
    autoSelectDoneRef.current = true;
    setEditingId(null);
    setSaveAsDefault(false);
    clearCheckoutPaymentSelection();
    updateCheckoutDraft({
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      billingSameAsShipping: true,
    });
    setFieldErrors({});
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setSaveAsDefault(
      savedPaymentMethods.find((m) => m.id === id)?.isDefault ?? false
    );
    selectCheckoutPayment(id);
    setFieldErrors({});
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Remove this payment method from your maison profile?"))
      return;
    deleteSavedPaymentMethod(id);
    if (editingId === id) {
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-serif text-2xl text-white tracking-wide">Payment</h2>
        <button
          type="button"
          onClick={handleAddNew}
          className="self-start text-[9px] font-bold uppercase tracking-[0.35em] text-primary/90 transition-colors hover:text-primary sm:self-auto"
        >
          + New card
        </button>
      </div>

      {savedPaymentMethods.length > 0 && (
        <div>
          <p className="mb-4 text-[9px] uppercase tracking-[0.4em] text-white/35">
            Saved payment methods
          </p>
          <p className="mb-4 text-[10px] leading-relaxed text-white/35">
            For security, only the last four digits are stored. Enter your full card
            number and security code at checkout each time.
          </p>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
            <AnimatePresence mode="popLayout">
              {savedPaymentMethods.map((m) => (
                <div
                  key={m.id}
                  className="w-[min(88vw,320px)] shrink-0 snap-center sm:w-auto sm:shrink sm:snap-none"
                >
                  <SavedPaymentCard
                    method={m}
                    selected={selectedPaymentId === m.id}
                    onSelect={() => {
                      setEditingId(null);
                      selectCheckoutPayment(m.id);
                      setFieldErrors({});
                    }}
                    onEdit={() => handleEdit(m.id)}
                    onDelete={() => handleDelete(m.id)}
                    onSetDefault={() => setDefaultSavedPaymentMethod(m.id)}
                  />
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      <motion.div
        layout
        className="rounded-2xl border border-white/[0.06] bg-[rgba(3,3,6,0.55)] p-6 sm:p-8"
      >
        <div className="mb-6 flex flex-col gap-2 border-b border-white/[0.06] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-lg text-white/90">
            {editingId ? "Edit card" : "Card details"}
          </p>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFieldErrors({});
              }}
              className="text-[9px] uppercase tracking-[0.3em] text-white/35 hover:text-white/70"
            >
              Cancel edit
            </button>
          )}
        </div>

        <div className="space-y-6">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={d.billingSameAsShipping}
              onChange={(e) =>
                touchPayment({ billingSameAsShipping: e.target.checked })
              }
              className="mt-1 h-3.5 w-3.5 rounded border border-white/20 bg-transparent text-primary focus:ring-primary/40"
            />
            <span className="text-[11px] leading-relaxed text-white/45 tracking-wide">
              Billing address matches shipping
            </span>
          </label>
          <Field id="cardName" label="Name on card" error={fieldErrors.cardName}>
            <input
              id="cardName"
              autoComplete="cc-name"
              value={d.cardName}
              onChange={(e) => touchPayment({ cardName: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
            />
          </Field>
          <Field id="cardNumber" label="Card number" error={fieldErrors.cardNumber}>
            <input
              id="cardNumber"
              inputMode="numeric"
              autoComplete="cc-number"
              value={d.cardNumber}
              onChange={(e) =>
                touchPayment({
                  cardNumber: formatCardNumber(e.target.value),
                })
              }
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25 tracking-widest"
              placeholder="0000 0000 0000 0000"
            />
          </Field>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="cardExpiry" label="Expiry (MM / YY)" error={fieldErrors.cardExpiry}>
              <input
                id="cardExpiry"
                autoComplete="cc-exp"
                value={d.cardExpiry}
                onChange={(e) => touchPayment({ cardExpiry: e.target.value })}
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
                  touchPayment({
                    cardCvc: e.target.value.replace(/\D/g, "").slice(0, 4),
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
                placeholder="CVC"
              />
            </Field>
          </div>

          <label className="flex cursor-pointer items-start gap-3 pt-2">
            <input
              type="checkbox"
              checked={saveAsDefault}
              onChange={(e) => setSaveAsDefault(e.target.checked)}
              className="mt-1 h-3.5 w-3.5 rounded border border-white/20 bg-transparent text-primary focus:ring-primary/40"
            />
            <span className="text-[11px] leading-relaxed text-white/45 tracking-wide">
              Set as default payment when saving
            </span>
          </label>

          <motion.button
            type="button"
            layout
            whileTap={{ scale: 0.99 }}
            onClick={handleSaveToBook}
            className="w-full rounded-full border border-primary/35 bg-primary/10 py-3.5 text-[9px] font-bold uppercase tracking-[0.32em] text-primary transition-all duration-700 hover:bg-primary/15 hover:shadow-[0_0_36px_-14px_rgba(214,195,165,0.35)]"
          >
            {editingId ? "Update saved card" : "Save card to profile"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
