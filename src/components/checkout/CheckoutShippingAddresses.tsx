"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SavedAddressCard from "@/components/checkout/SavedAddressCard";
import { COUNTRIES, US_STATES } from "@/lib/checkout-geo";
import { validateCheckoutStep, type FieldErrors } from "@/lib/checkout-validation";
import { useCartStore } from "@/stores/cart-store";
import type { CheckoutDraft } from "@/types/checkout";
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

export default function CheckoutShippingAddresses({
  fieldErrors,
  setFieldErrors,
}: Props) {
  const draft = useCartStore((s) => s.checkoutDraft);
  const updateCheckoutDraft = useCartStore((s) => s.updateCheckoutDraft);
  const savedAddresses = useCartStore((s) => s.savedAddresses);
  const selectedAddressId = useCartStore((s) => s.selectedAddressId);
  const selectCheckoutAddress = useCartStore((s) => s.selectCheckoutAddress);
  const clearCheckoutAddressSelection = useCartStore(
    (s) => s.clearCheckoutAddressSelection
  );
  const addSavedAddress = useCartStore((s) => s.addSavedAddress);
  const updateSavedAddress = useCartStore((s) => s.updateSavedAddress);
  const deleteSavedAddress = useCartStore((s) => s.deleteSavedAddress);
  const setDefaultSavedAddress = useCartStore((s) => s.setDefaultSavedAddress);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const autoSelectDoneRef = useRef(false);

  const touchShipping = (patch: Partial<CheckoutDraft>) => {
    clearCheckoutAddressSelection();
    updateCheckoutDraft(patch);
  };

  useEffect(() => {
    if (savedAddresses.length === 0) {
      autoSelectDoneRef.current = false;
      return;
    }
    if (autoSelectDoneRef.current) return;
    if (selectedAddressId) {
      autoSelectDoneRef.current = true;
      return;
    }
    if (draft.address?.trim() || draft.city?.trim()) {
      autoSelectDoneRef.current = true;
      return;
    }
    const preferred =
      savedAddresses.find((a) => a.isDefault) ?? savedAddresses[0];
    if (preferred) {
      selectCheckoutAddress(preferred.id);
      autoSelectDoneRef.current = true;
    }
  }, [savedAddresses, selectedAddressId, draft.address, draft.city, selectCheckoutAddress]);

  const d = draft;

  const handleSaveToBook = () => {
    const errs = {
      ...validateCheckoutStep(0, d),
      ...validateCheckoutStep(1, d),
    };
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    if (editingId) {
      updateSavedAddress(editingId, {
        fullName: d.fullName.trim(),
        phone: d.phone.trim(),
        address: d.address.trim(),
        city: d.city.trim(),
        state: d.state.trim(),
        zip: d.zip.trim(),
        country: d.country.trim(),
        isDefault: saveAsDefault,
      });
      setEditingId(null);
      selectCheckoutAddress(editingId);
    } else {
      const id = addSavedAddress({
        fullName: d.fullName.trim(),
        phone: d.phone.trim(),
        address: d.address.trim(),
        city: d.city.trim(),
        state: d.state.trim(),
        zip: d.zip.trim(),
        country: d.country.trim(),
        isDefault: saveAsDefault,
      });
      selectCheckoutAddress(id);
    }
    setSaveAsDefault(false);
  };

  const handleAddNew = () => {
    autoSelectDoneRef.current = true;
    setEditingId(null);
    setSaveAsDefault(false);
    clearCheckoutAddressSelection();
    updateCheckoutDraft({
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
    });
    setFieldErrors({});
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setSaveAsDefault(savedAddresses.find((a) => a.id === id)?.isDefault ?? false);
    selectCheckoutAddress(id);
    setFieldErrors({});
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Remove this address from your maison profile?")) return;
    deleteSavedAddress(id);
    if (editingId === id) {
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-serif text-2xl text-white tracking-wide">
          Shipping address
        </h2>
        <button
          type="button"
          onClick={handleAddNew}
          className="self-start text-[9px] font-bold uppercase tracking-[0.35em] text-primary/90 transition-colors hover:text-primary sm:self-auto"
        >
          + Add new address
        </button>
      </div>

      {savedAddresses.length > 0 && (
        <div>
          <p className="mb-4 text-[9px] uppercase tracking-[0.4em] text-white/35">
            Saved addresses
          </p>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
            <AnimatePresence mode="popLayout">
              {savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className="w-[min(88vw,320px)] shrink-0 snap-center sm:w-auto sm:shrink sm:snap-none"
                >
                  <SavedAddressCard
                    addr={addr}
                    selected={selectedAddressId === addr.id}
                    onSelect={() => {
                      setEditingId(null);
                      selectCheckoutAddress(addr.id);
                      setFieldErrors({});
                    }}
                    onEdit={() => handleEdit(addr.id)}
                    onDelete={() => handleDelete(addr.id)}
                    onSetDefault={() => setDefaultSavedAddress(addr.id)}
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
            {editingId ? "Edit address" : "Delivery details"}
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
          <Field id="ship-fullName" label="Full name" error={fieldErrors.fullName}>
            <input
              id="ship-fullName"
              autoComplete="name"
              value={d.fullName}
              onChange={(e) => touchShipping({ fullName: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
            />
          </Field>
          <Field id="ship-phone" label="Phone number" error={fieldErrors.phone}>
            <input
              id="ship-phone"
              type="tel"
              autoComplete="tel"
              value={d.phone}
              onChange={(e) => touchShipping({ phone: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
            />
          </Field>
          <Field id="address" label="Street address" error={fieldErrors.address}>
            <input
              id="address"
              autoComplete="street-address"
              value={d.address}
              onChange={(e) => touchShipping({ address: e.target.value })}
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
                onChange={(e) => touchShipping({ city: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
              />
            </Field>
            <Field id="state" label="State / province" error={fieldErrors.state}>
              <select
                id="state"
                value={d.state}
                onChange={(e) => touchShipping({ state: e.target.value })}
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
                onChange={(e) => touchShipping({ zip: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
              />
            </Field>
            <Field id="country" label="Country" error={fieldErrors.country}>
              <select
                id="country"
                value={d.country}
                onChange={(e) => touchShipping({ country: e.target.value })}
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

          <label className="flex cursor-pointer items-start gap-3 pt-2">
            <input
              type="checkbox"
              checked={saveAsDefault}
              onChange={(e) => setSaveAsDefault(e.target.checked)}
              className="mt-1 h-3.5 w-3.5 rounded border border-white/20 bg-transparent text-primary focus:ring-primary/40"
            />
            <span className="text-[11px] leading-relaxed text-white/45 tracking-wide">
              Set as default maison address when saving
            </span>
          </label>

          <motion.button
            type="button"
            layout
            whileTap={{ scale: 0.99 }}
            onClick={handleSaveToBook}
            className="w-full rounded-full border border-primary/35 bg-primary/10 py-3.5 text-[9px] font-bold uppercase tracking-[0.32em] text-primary transition-all duration-700 hover:bg-primary/15 hover:shadow-[0_0_36px_-14px_rgba(214,195,165,0.35)]"
          >
            {editingId ? "Update saved address" : "Save address to profile"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
